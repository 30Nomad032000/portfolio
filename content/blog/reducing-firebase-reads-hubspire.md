---
title: "How I Rebuilt a Freight Dispatcher and Cut Firebase Costs From $1,800 to $60"
date: "2026-03-15"
excerpt: "A legacy Angular dispatcher app was burning through 10-100 million Firestore reads per session. I diagnosed the root causes, made the call to rebuild from scratch in React, and shipped a full replacement in one month — dropping the Firebase bill from $1,800 to $60."
tags: ["React", "Firebase", "Performance", "Architecture", "Migration"]
---

## The Call

A major freight management company — one of the biggest clients at the company I was working for — had a problem. Their dispatcher application, the tool their operations team used to manage and dispatch shipments, was hemorrhaging money. Firebase bills were spiking to **$1,800 from a single session**. Someone would open the app, use it for a bit, and the Firestore read counter would jump from 10 million to 100 million.

My CTO pulled me in and laid it out: either fix this, or figure out what we can salvage from the wreckage. The app had been built by an external contractor who was no longer involved. No documentation. No handoff. Just a codebase nobody wanted to touch.

There was one other problem. The app was written in Angular, and I was the only person on the team who knew Angular.

## Understanding the Damage

The freight company ran multiple platforms off the same Firestore database — a dispatcher app for the operations team, an admin panel, a trucker-facing app, and a container management interface. All of them reading from one store. The dispatcher and admin panels were responsible for the bulk of the reads.

Before touching production, I needed to understand what was actually happening without making the bill worse. So I dumped the entire Firestore database and spun up the **Firebase Emulator Suite** locally. Every diagnosis, every test, every experiment ran against the emulator — zero cost, full fidelity.

```bash
# Export production data for local emulation
firebase emulators:start --import=./firebase-dump
```

What I found was ugly.

### No Unsubscription. Anywhere.

The Angular app was littered with `onSnapshot` listeners. Firestore's real-time listeners are powerful, but they need to be cleaned up when a component is destroyed. This app didn't clean up a single one. Navigate to a page, a listener spins up. Navigate away, the listener keeps running. Come back, another one spins up. Every navigation accumulated listeners that never died.

```typescript
// What the old codebase did — repeatedly, everywhere
this.firestore.collection('shipments')
  .onSnapshot(snapshot => {
    this.shipments = snapshot.docs.map(doc => doc.data());
  });
// No unsubscribe. No cleanup. No ngOnDestroy.
```

### No Limits. No Pagination.

Some shipping routes had **over 10 million data points** — GPS coordinates, status updates, timestamps, the full telemetry trail of a shipment's journey. The app fetched *all of them* when loading a route. Not paginated. Not limited. Not filtered by time range. The entire history, every time.

A single route view could trigger millions of Firestore reads. Open two routes? Double it. The frontend would choke on the data volume, and Firebase would happily charge for every read.

```typescript
// The actual pattern: fetch everything, always
this.firestore.collection(`routes/${routeId}/trackingPoints`)
  .onSnapshot(snapshot => {
    // 10 million documents? Sure, load them all.
    this.trackingData = snapshot.docs.map(doc => doc.data());
  });
```

### Cascading Reads Across Platforms

Because the dispatcher, admin, trucker, and container apps all shared one Firestore instance, a poorly written query in one app could spike costs for the entire system. The dispatcher was the worst offender, but the admin panel wasn't far behind — it had its own set of unbounded queries and orphaned listeners.

## The Decision: Rebuild

I spent about a week in the emulator, tracing read patterns and cataloging the issues. The list was long:

- Zero `onSnapshot` cleanup across the entire app
- No query limits or pagination on any collection
- Shipping routes with 10M+ documents fetched in full
- Redundant listeners stacking on navigation
- No caching layer — same data re-fetched constantly
- Angular-specific: no `ngOnDestroy` lifecycle hooks for teardown

I could have patched the Angular app. Added unsubscription calls, slapped limits on queries, bolted on some caching. But the codebase was written by a contractor who was gone, it was riddled with bugs beyond the Firestore issue, and I'd be the only person who could maintain it going forward.

I told my CTO: **we should rebuild this in React from scratch.** The team knows React. I can architect the Firestore integration correctly from day one. And we can implement proper state management so this problem never comes back.

The estimated timeline for a rebuild was 3 months.

## The Rebuild

I shipped it in one.

### Stack

- **React** with **Vite** — fast dev server, fast builds
- **shadcn/ui** — consistent, accessible component library
- **React Query** — server state management with built-in caching, deduplication, and stale-time control
- **Zustand** — lightweight client state for auth and user stores
- **React Leaflet** — map component to match the existing dispatcher's map interface
- **Firebase SDK** — same Firestore backend, completely different access patterns

### Firestore Integration Done Right

Every Firestore interaction went through a controlled layer. No raw `onSnapshot` calls scattered across components.

```typescript
// Paginated query with limit — never fetch unbounded collections
const useShipments = (filters: ShipmentFilters) => {
  return useQuery({
    queryKey: ['shipments', filters],
    queryFn: async () => {
      const q = query(
        collection(db, 'shipments'),
        where('status', '==', filters.status),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    staleTime: 30 * 1000, // 30 seconds before refetch
  });
};
```

For real-time data that genuinely needed live updates (active shipment tracking), I built a custom hook that properly managed the listener lifecycle:

```typescript
const useRealtimeTracking = (routeId: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!routeId) return;

    // Only fetch the LATEST tracking points, not the full history
    const q = query(
      collection(db, `routes/${routeId}/trackingPoints`),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const points = snapshot.docs.map(doc => doc.data());
      queryClient.setQueryData(['tracking', routeId], points);
    });

    // This is the line the old app never had
    return () => unsubscribe();
  }, [routeId, queryClient]);
};
```

The difference: instead of fetching 10 million historical data points, we fetched the last 100. If the user needed historical data, they could load it on demand with pagination. The real-time listener only tracked *active* movement.

### State Architecture

```
 ┌────────────────────────────────────────────────┐
 │                   React App                    │
 └────────────────────────────────────────────────┘
 ┌───────────────┐┌───────────────┐┌──────────────┐
 │  Zustand      ││  React Query  ││  React       │
 │  (Client)     ││  (Server)     ││  Leaflet     │
 │               ││               ││              │
 │  Auth store   ││  Shipments    ││  Map state   │
 │  User prefs   ││  Routes       ││  Markers     │
 │  UI state     ││  Tracking     ││  Polylines   │
 │               ││  Drivers      ││              │
 │               ││               ││              │
 └───────────────┘└───────────────┘└──────────────┘
         │                │
         +        ┌───────┘
         │        │
         │        ↓
         │ ╭─────────────╮
         │ │  Firestore  │
         └→│  (shared)   │
           │             │
           ╰─────────────╯
```

Zustand handled client-only state — auth tokens, user preferences, UI toggles. React Query handled everything that came from Firestore, with proper cache invalidation and stale-time configuration. No overlap. No redundant fetches.

### Matching the Existing UX

The freight company's operations team had been using the Angular dispatcher daily. They knew where every button was. A rebuild that changed the UX would face resistance regardless of how much money it saved.

I used React Leaflet to recreate the same map interface — route polylines, driver markers, shipment pins. shadcn/ui gave me a component foundation that I could style to match the existing look. The goal was that an operator could switch to the new app and feel like it was an upgrade, not a replacement.

### Live Map Visualization

Beyond the basic map, I was building out a real-time visualization layer — trucks and dispatchers plotted on the map with directional indicators showing heading and movement. Each vehicle marker rotated based on its bearing, so dispatchers could glance at the map and immediately understand which direction a truck was moving, whether it was approaching a pickup, or heading away from a delivery zone.

```typescript
const TruckMarker = ({ position, bearing, status }: TruckMarkerProps) => {
  const icon = useMemo(() =>
    L.divIcon({
      className: 'truck-marker',
      html: `<div class="truck-icon" style="transform: rotate(${bearing}deg)">
               <svg><!-- directional truck SVG --></svg>
             </div>`,
    }),
    [bearing]
  );

  return <Marker position={position} icon={icon} />;
};
```

This was fed by the same real-time Firestore listeners — but now properly scoped and cleaned up. The map showed live positions with directional sense, route polylines for active shipments, and dispatcher locations. The operations team could see their entire fleet at a glance.

My time at the company came to an end before I could fully ship this feature, but the core was working — markers on the map, directional rotation, real-time position updates. The visualization layer was about 90% complete.

## The Results

| Metric | Angular App | React Rebuild |
|--------|-------------|---------------|
| Firestore reads per session | 10M — 100M | Controlled, bounded |
| Firebase bill (peak) | ~$1,800/session spike | ~$60 total |
| Listener cleanup | None | Automatic on unmount |
| Route data fetched | Full history (10M+ docs) | Last 100 + on-demand pagination |
| Time to rebuild | Est. 3 months | 1 month |

The Firebase bill went from spikes that could hit **$1,800 in a single session** to a steady **~$60**. Not per session — total. The reads were bounded, the listeners were managed, and the data fetching was intentional instead of accidental.

## What I Learned

**1. Emulate before you investigate.** The Firebase Emulator Suite saved us from spending money just to understand why we were spending money. Every diagnosis ran locally at zero cost. If you're debugging a Firestore cost issue, this is step one.

**2. Sometimes the right fix is a rewrite.** I could have patched the Angular app — added `ngOnDestroy` hooks, slapped `limit()` on queries. But the codebase had deeper problems, the team couldn't maintain Angular, and a patch would have been fragile. The rewrite took one month. Maintaining a patched Angular app nobody understood would have cost more over time.

**3. Unbounded queries are the silent killer.** A collection with 10 million documents and no `limit()` clause will happily return all 10 million. Firestore charges per read. The math is brutal. Every query needs a limit. Every listener needs a scope. No exceptions.

**4. Separate your state layers.** Using React Query for server state and Zustand for client state meant zero confusion about where data lives, how it's cached, and when it's refetched. The Angular app mixed everything together — component state, service singletons, raw Firestore calls — and it was impossible to reason about.

**5. Match the UX, upgrade the internals.** The operations team didn't care that we rewrote the app. They cared that their dispatcher still worked the way they expected. The best migration is one where users don't notice the migration — only the improvement.

---

This was the project that taught me the most about real-world engineering tradeoffs. Not because the code was complex — React Query and Zustand are straightforward tools. But because the decision-making was hard. Patch or rebuild? How fast can I actually ship? How do I prove to my CTO that a full rewrite is the right call when the business is bleeding money right now?

The answer turned out to be: ship fast enough that the question becomes irrelevant.

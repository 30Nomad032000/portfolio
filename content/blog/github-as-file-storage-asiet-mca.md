---
title: "Using GitHub as a Free File Storage Backend for My College Department"
date: "2026-03-05"
excerpt: "My MCA department needed a platform to share course materials. Instead of spinning up a server and paying for storage, I used the GitHub Contents API as the entire backend. Zero hosting costs, built-in versioning, and faculty can upload directly from the browser."
tags: ["GitHub API", "React", "Open Source", "TypeScript"]
---

## The Problem

My MCA department at ASIET had no centralized place for course materials. Notes, question papers, assignments, lab records — everything was scattered across WhatsApp groups, Google Drive links that expired, and USB drives passed around in class. New students had to track down seniors just to get last semester's question papers.

The department wanted a proper platform. The constraints were simple: it needed to be free, faculty needed to upload materials without touching code, and it had to survive after I graduate.

## The Obvious Solutions (and Why I Skipped Them)

The standard approach would be a Next.js app with Supabase Storage or S3 for files, a database for metadata, and an admin panel for uploads. I've built this exact stack before.

But this is a college department, not a startup. There's no budget for hosting. Nobody is going to maintain a backend after I leave. And the moment the free tier runs out or a credit card expires, the whole thing dies.

I needed something with zero recurring costs that could run indefinitely without anyone babysitting it.

## GitHub Is the Backend

GitHub repos are free. GitHub Pages hosting is free. The GitHub Contents API lets you list, read, upload, and delete files in a repo programmatically. A public repo gives you unlimited storage and a CDN for downloads via `raw.githubusercontent.com`.

So instead of building a backend, I made a GitHub repo the entire backend. The folder structure in the repo *is* the file system. The GitHub API *is* the REST API. GitHub Pages *is* the hosting.

The architecture is just a React app that talks to the GitHub Contents API. That's it.

## The GitHub Service

The core of the project is a single TypeScript class that wraps the GitHub Contents API:

```typescript
const API = "https://api.github.com";

export class GitHubService {
  constructor(private config: GitHubConfig) {}

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.config.token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  async list(path = ""): Promise<GitHubContent[]> {
    const r = await fetch(
      `${this.contentsUrl(path)}?ref=${this.config.branch}`,
      { headers: this.headers }
    );
    if (r.status === 404) return [];
    if (!r.ok) throw new Error(r.statusText);
    const d = await r.json();
    return Array.isArray(d)
      ? (d as GitHubContent[])
          .filter((i) => i.name !== ".gitkeep")
          .sort((a, b) =>
            a.type !== b.type
              ? a.type === "dir" ? -1 : 1
              : a.name.localeCompare(b.name)
          )
      : [];
  }

  async upload(path: string, base64: string): Promise<void> {
    // Check if file already exists (need SHA for updates)
    let sha: string | undefined;
    try {
      const c = await fetch(
        `${this.contentsUrl(path)}?ref=${this.config.branch}`,
        { headers: this.headers }
      );
      if (c.ok) sha = (await c.json()).sha;
    } catch {}

    const body: Record<string, string> = {
      message: `Add ${path.split("/").pop()!}`,
      content: base64,
      branch: this.config.branch,
    };
    if (sha) body.sha = sha;

    await fetch(this.contentsUrl(path), {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}
```

`list()` calls the Contents API and returns files and folders sorted with directories first. `upload()` converts a file to base64, checks if it already exists (GitHub requires the SHA to update an existing file), and PUTs it to the repo. Every upload is a real git commit.

## Folder Structure as Data Model

The repo is organized by semester, subject, and material type:

```
materials/
├── Semester 1/
│   ├── Data Structures Using C/
│   │   ├── Notes/
│   │   ├── Assignments/
│   │   ├── Question Papers/
│   │   └── Lab Records/
│   ├── Programming in Python/
│   └── ...
├── Semester 2/
└── ...
```

No database. The folder hierarchy *is* the schema. When a faculty member uploads a PDF to `Semester 2/DBMS/Question Papers/`, that's where it lives in git, and that's where the frontend displays it. The GitHub API returns directory listings with file names, sizes, and download URLs — everything needed to render a file explorer.

## Downloads Without a Server

Every file in a public GitHub repo is accessible via a raw URL:

```
https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
```

GitHub serves these through their CDN. No bandwidth costs, no download limits worth worrying about for a college department's usage. When a student clicks "Download" in the file explorer, they're downloading directly from GitHub's infrastructure.

## How Faculty Upload

Faculty don't need to know git. The app has an admin portal at `/admin` where they authenticate and get a full file manager — upload, create folders, delete, the works. From their perspective, it's a Google Drive that happens to be powered by git commits.

Creating folders works via the `.gitkeep` trick — git doesn't track empty directories, so we create a hidden file:

```typescript
async mkdir(path: string): Promise<void> {
  await this.upload(`${path}/.gitkeep`, btoa(""));
}
```

## Optimistic Updates with Polling

The GitHub Contents API isn't instant. When you commit a file, it takes a second or two before the API reflects the change. If you just refetched after upload, you'd sometimes get stale data back and the newly uploaded file wouldn't appear.

So the upload flow uses optimistic updates with React Query. When a user uploads files, we immediately inject synthetic entries into the cache so they appear in the grid right away:

```typescript
onMutate: async (files) => {
  await queryClient.cancelQueries({
    queryKey: ["contents", currentPath],
  });

  // Snapshot for rollback
  const prev = queryClient.getQueryData(["contents", currentPath]);

  // Inject synthetic entries with pending SHAs
  const synthetics = Array.from(files).map((f) => ({
    name: f.name,
    path: `${basePath}/${currentPath}/${f.name}`,
    sha: `pending-${Date.now()}-${f.name}`,
    size: f.size,
    type: "file" as const,
    download_url: null,
  }));

  queryClient.setQueryData(["contents", currentPath], (old) =>
    [...(old || []), ...synthetics]
  );

  return { prev };
},
```

These synthetic files render with a pulsing spinner and "Syncing..." label so the user knows the upload is in progress. Then after the API call completes, we poll GitHub until the real data shows up:

```typescript
async function pollForSync(path, check) {
  const gaps = [800, 1200, 2000, 3000, 5000];
  for (const gap of gaps) {
    await new Promise((r) => setTimeout(r, gap));
    const items = await fetchContents(path);
    if (check(items)) {
      queryClient.setQueryData(["contents", path], items);
      return;
    }
  }
  // If polling exhausted, force refresh
  queryClient.invalidateQueries({ queryKey: ["contents", path] });
}
```

The polling uses progressive backoff — 800ms, 1.2s, 2s, 3s, 5s. Most uploads sync within the first or second poll. If all five attempts fail, we force a cache invalidation and refetch. The syncing animation stays visible for at least 5 seconds so it doesn't flash in and out.

Same pattern for folder creation and deletion. Create a folder? Optimistically add it to the grid with a pending SHA. Delete a file? Optimistically remove it. Then poll to confirm.

## Securing the Admin Portal

The admin portal needs a GitHub token to make API calls. But you can't hardcode a token in a client-side app — it's a public repo, anyone could read the source and get write access.

The solution: AES-256-GCM encryption with a passphrase. At build time, a script encrypts the GitHub token using a passphrase that only faculty know. The encrypted blob goes into an environment variable:

```
VITE_ENCRYPTED_TOKEN=base64(salt):base64(iv):base64(ciphertext)
```

When a faculty member opens the admin portal, they enter the passphrase. The app derives a key using PBKDF2 (600,000 iterations) and decrypts the token in the browser:

```typescript
async function decryptToken(encrypted: string, passphrase: string) {
  const [salt, iv, data] = encrypted.split(":").map(b64ToBuffer);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 600_000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}
```

The token never leaves the browser. The passphrase never touches the network. If someone inspects the source, all they find is an encrypted blob that's useless without the passphrase. Faculty share the passphrase over a department WhatsApp group — which, ironically, is the one thing WhatsApp groups are actually good for.

There's also a fallback mode where advanced users can plug in their own GitHub personal access token directly, bypassing the passphrase entirely.

## Getting It to Show Up on Google

Building the platform is useless if students can't find it. When someone searches "ASIET MCA" or "ASIET MCA notes," this site needs to be in the results. GitHub Pages sites don't get indexed automatically — Google has no reason to prioritize a `github.io` subdomain over the main college website.

So we did it properly. First, Google Search Console verification — a `google-site-verification` meta tag in `index.html` and a verification HTML file in `public/`:

```html
<meta name="google-site-verification" content="q0BoM1fnPP16SiNO5opuxLeYTc1rVRPsFuphRhPeVx4" />
```

Then a `sitemap.xml` and `robots.txt` so Google knows what to crawl:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://asiet-mca.github.io/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://asiet-mca.github.io/explorer</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

The real work was keywords. The `<meta name="keywords">` tag targets every way a student might search — "ASIET MCA", "ASIET Kalady MCA", "Adi Shankara MCA", "ASIET MCA notes", "ASIET MCA question papers." Each page uses `react-helmet-async` to set per-route title, description, canonical URL, and Open Graph tags so every page is independently indexable with the right metadata.

Then JSON-LD structured data — two schemas in the `<head>`. An `EducationalOrganization` schema tells Google this is a department within a college, with alternate names, address, phone, and links to the parent institution:

```json
{
  "@type": "EducationalOrganization",
  "name": "ASIET MCA — Department of Computer Applications",
  "alternateName": ["ASIET MCA", "Adi Shankara MCA", "ASIET Kalady MCA"],
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "Adi Shankara Institute of Engineering & Technology"
  }
}
```

And a `WebSite` schema so Google understands the site as a standalone entity, not just a random GitHub Pages deployment.

The OG image was designed to look official — department branding, college name, the works. It shows up when someone shares the link on WhatsApp or LinkedIn, which matters because that's how most students discover it in the first place.

The result: searching "ASIET MCA" on Google now surfaces this site. Students find it without needing a direct link.

## The Tradeoffs

**GitHub API rate limits** — 5,000 requests/hour for authenticated users. A department of ~100 students won't hit this.

**File size limit** — Contents API caps at 100MB per file. Course PDFs are typically under 10MB.

**Public by default** — The repo is public. For course notes, this is a feature.

**Upload latency** — Every upload is a git commit. Takes 1-2 seconds per file. Fine for a faculty member uploading PDFs, not for batch-processing thousands of files.

## Why It Survived

The site launched on GitHub Pages. It's been running with zero maintenance and zero cost. When I graduate, the department org owns the repo. Any student who knows React can modify the frontend. The "backend" is just a GitHub repo that anyone with repo access can manage, even without the web UI — they can just drag files into GitHub's web interface directly.

That's the real win. Not the technical cleverness of using the Contents API. The fact that the whole system runs on infrastructure that GitHub maintains for free, that faculty already have accounts for, and that doesn't depend on one person keeping a server alive.

The site is live at [asiet-mca.github.io](https://asiet-mca.github.io). Source is on [GitHub](https://github.com/asiet-mca/asiet-mca.github.io).

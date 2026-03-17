---
title: "Shipping a Production E-Commerce Store for Under ₹1,000"
date: "2026-03-17"
excerpt: "A client needed an online store for handcrafted bangles — no Shopify, no monthly fees. I shipped a full-stack e-commerce platform with payments, inventory, branded emails, and an admin dashboard using Next.js, Supabase, and Razorpay. Total cost: one domain name."
tags: ["Next.js", "E-Commerce", "Supabase", "TypeScript", "System Design"]
---

A client approached me with a simple ask: an online store for handcrafted bangles from Thrissur, Kerala. No Shopify. No monthly fees bleeding into margins. Just a clean, fast store that feels like the craft it sells.

Here's how I shipped a production-grade e-commerce platform — payments, inventory, emails, admin dashboard, the works — for under ₹1,000 in initial costs.

## The Client

Bangles by Prakash Duo is a family-run bangle house from Thrissur, Kerala. They sell handcrafted traditional bangles — antique gold, AD stone, glass, thread, bridal sets. Everything is handmade. The business was running entirely on Instagram DMs and phone calls.

They needed a proper storefront. But the budget was tight — this is a small craft business, not a VC-funded startup.

## The Cost Breakdown

| Service | Cost | Tier |
|---------|------|------|
| **Vercel** (hosting) | ₹0 | Hobby (free) |
| **Supabase** (database) | ₹0 | Free tier — 500MB, 50K rows |
| **Resend** (transactional email) | ₹0 | Free tier — 3,000 emails/month |
| **Razorpay** (payments) | ₹0 setup | 2% per transaction, no monthly fee |
| **Domain** (.store TLD) | ~₹800/year | First year promo |
| **Cloudflare** (DNS) | ₹0 | Free |
| **Total initial cost** | **~₹800** | |

No monthly hosting bills. No email service subscriptions. No payment gateway monthly fees. The only recurring cost is the domain renewal (~₹800/year) and Razorpay's 2% per transaction.

For context, a basic Shopify plan costs ₹1,999/month. That's ₹24,000/year before you've sold a single bangle.

## The Tech Stack

**Next.js 14 (App Router)** — React framework with server-side rendering, API routes, and static generation. One codebase for both the storefront and the admin dashboard.

**TypeScript** — Catches bugs before they hit production. Non-negotiable for payment handling code.

**Supabase (PostgreSQL)** — Database, auth, and real-time subscriptions. The free tier is generous — 500MB storage, 50,000 rows, 2GB bandwidth. More than enough for a small catalogue store.

**Razorpay** — UPI, cards, net banking, wallets. No setup fee, no monthly fee. Webhooks for reliable payment confirmation. The 2% transaction fee is the only cost, and it's standard.

**Resend** — Transactional emails (order confirmation, shipping, delivery, cancellation). 3,000 emails/month free. Clean API, reliable delivery.

**Tailwind CSS + shadcn/ui** — Utility-first CSS with pre-built accessible components. Fast to build, easy to customise.

**Framer Motion + GSAP** — Animations. The landing page has scroll-triggered reveals, parallax effects, and micro-interactions that make it feel premium without being heavy.

**Vercel** — Deploy on push. Edge network. Free SSL. Zero config.

## What I Built

### Customer-Facing Store
- Cinematic landing page with GSAP scroll animations
- Product catalogue with category filtering
- Product pages with image galleries, size selection, live inventory
- Cart with persistent state, shipping calculation, stock-capped quantities
- Checkout with Razorpay (UPI, cards, wallets, net banking)
- Order tracking and confirmation
- Wishlist
- Haptic feedback on mobile (vibration on add-to-cart, payment success/failure)
- Full SEO — sitemap, robots.txt, JSON-LD structured data, Open Graph tags

### Admin Dashboard
- Order management with full lifecycle (confirm → process → ship → deliver)
- Order cancellation with reason and automatic customer email
- Shipping tracking (DTDC integration)
- Inventory management with live stock sync
- Email logs with resend capability
- Invoice printing

### Payment Security
- Server-side price validation (never trust the client)
- Razorpay webhook for reliable payment capture
- Stock reservation at checkout (prevents overselling)
- Automatic stock release on abandoned checkouts
- HMAC-secured release endpoints
- Amount tampering detection
- Signature verification with timing-safe comparison

### Email System
Five branded HTML email templates:
- Order confirmation
- Shipping notification
- Delivery confirmation
- Cancellation (with reason)
- New order alert to store owner

All emails use table-based layouts for Gmail/Outlook compatibility, branded with the store's heritage aesthetic.

## Architecture Decisions

**Static product data + live inventory.** Products are stored as static JSON (fast, no DB queries for browsing). Inventory is synced live from Supabase. This gives you the speed of static pages with the accuracy of real-time stock.

**Webhook as single source of truth.** The Razorpay webhook is the only codepath that commits stock, sends emails, and updates payment status. The client-side verification endpoint only checks the signature — it doesn't modify any state. This eliminates race conditions.

**Stock reservation with cleanup.** When a customer starts checkout, stock is reserved in the database. If they abandon (close the modal, browser crash), a daily cron job cleans up stale reservations. If they dismiss the payment modal, stock is released immediately.

**No external auth service for customers.** Customers don't need accounts. They enter their details at checkout, get an order ID, and can track their order. Reduces friction, increases conversion.

## The Result

A complete e-commerce store that:
- Loads in under 2 seconds
- Handles payments securely
- Sends professional branded emails
- Manages inventory in real-time
- Costs ₹0/month to run (excluding domain and transaction fees)
- Scales with Vercel's edge network

The client went from Instagram DMs to a proper storefront in under two weeks. Their customers can now browse, select sizes, pay via UPI, and get order confirmation emails — all without a single WhatsApp message.

## What I'd Do Differently

**Rate limiting from day one.** I added it late. Should have used Upstash Redis rate limiting on the checkout endpoint from the start.

**Batch stock reservation.** The current implementation reserves items one-by-one in sequence. At scale, this should be a single database transaction. For a small catalogue store, it's fine.

**Customer accounts.** Currently there are no customer accounts — just order IDs. For repeat customers, accounts with order history would be nice. But for launch, the frictionless checkout was the right call.

## The Point

You don't need Shopify. You don't need ₹2,000/month hosting. You don't need a payment gateway with setup fees.

With the right stack, you can build a production-grade e-commerce store for the cost of a domain name. The free tiers of Vercel, Supabase, and Resend are not toys — they're production-ready services that scale.

The constraint wasn't budget. It was knowing which tools to pick.

---

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Razorpay · Resend · Vercel

**Live:** [banglesbyprakashduo.store](https://www.banglesbyprakashduo.store)

**Code:** [github.com/30Nomad032000/prakash-duo-store](https://github.com/30Nomad032000/prakash-duo-store)

# humbldesign.io — Full Site Audit
**Date:** May 2026  
**Scope:** Every live page, cross-referenced against the new LP/CRO-first positioning  
**Format:** Page-by-page. Each section = what to keep, what to rewrite, what to cut. Urgent bugs flagged separately at the top.

---

## 🔴 URGENT — Fix before anything else

These are live right now and actively hurting credibility or conversion.

**1. FAQ on homepage has lorem ipsum answers.**  
Real questions, fake answers. Any visitor who scrolls to the FAQ sees placeholder copy. Fix this today.

**2. "Humbl new" is the browser tab title on all Thoughts articles.**  
Every thought piece loads with "Humbl new" as the page title. It's a Webflow CMS slug issue. Check the collection template page title and set it to pull the post title dynamically.

**3. StatDoctor case study references the old "free trial offer."**  
"The founders discovered Humbl Design through our free trial offer." You're dropping the free trial. Update this to something that still explains how they found you — or just cut the sentence entirely. It adds nothing to the story.

**4. Consistent double dashes (--) across case studies.**  
StatDoctor, Castingofka, possibly others. Every `--` should be a comma, period, or colon. Global find-and-replace in Webflow CMS.

---

## Homepage (humbldesign.io)

### Keep
- The logo bar / trust strip (Augment, Refundid etc.) — social proof works early
- Stats row in principle ($12M, 72 hrs, 4+ years) — just fix the numbers (see below)
- Pricing section — prices are right, section works
- The "Schedule call" CTA in nav

### Rewrite

**Hero / H1.** Current copy is still framed around product design. The new H1 in the wireframe ("Your landing page is losing you signups. I can show you exactly where.") is the right direction. Get this live.

**Primary CTA.** Change from "Free audit" to "Get in touch" or "Fix my website" as primary. Audit becomes secondary. Discussed and agreed.

**Stats.** Inconsistency across the site. The Thoughts article footer says "$20M+ raised by our customers" but the homepage says $12M (specifically Augment). Pick one and be consistent. $20M+ is credible if it covers all clients, but you need to commit to one number everywhere. Also "18,000+" vs "20,000+" Figma downloads — same problem.

**FAQ.** Replace lorem ipsum immediately (see urgent list). Six real questions, real answers. The wireframe has these — use them.

**"How it works" section is missing from the live site.** The wireframe has a Day 1 / Day 3 / Day 7-14 process section. This is a big conversion driver — founders want to know exactly what working with you looks like before they commit. Add it.

**The nav label "Timelines" is unusual.** Most founders won't know what it means. Rename to "Process" or "How it works."

### Cut

**The "team" / "experts" section with stock photos.** Completely at odds with the solo studio positioning. Kills trust rather than building it. You are the product. The page should make that clear.

**The News section.** Doesn't convert. Takes up space that should belong to proof (case studies, testimonials) or a CTA. If there are press mentions worth showing, put them in the trust strip or a dedicated proof section instead.

**"Free audit?🤔" as a nav item.** The emoji nav item feels off for a premium solo studio charging $10K projects. If you want the audit in the nav, keep it as a plain text link or remove it and rely on the CTA button.

---

## Portfolio page (/portfolio)

### Keep
- The 4 case study cards — Sahil, Augment, Castingofka, StatDoctor
- The page itself, it works fine structurally

### Rewrite

**H1 "Work" is bare.** Even one supporting line would help: "Selected work. AI, SaaS, Fintech, HealthTech." Or just leave it as-is if you prefer the minimal approach — it's a preference call, not a conversion problem.

**No service-type label on cards.** Each card shows the industry (FinTech, SaaS, etc.) but not what service was delivered. Adding "Landing page redesign" or "Product redesign" as a secondary label would immediately show visitors what you actually did — and reinforce that you do landing pages, not just general design.

### Consider

Castingofka is a product/platform redesign — a 3-month sprint on a casting app. Fine to keep in the portfolio, but once you reposition, it can be useful to signal that product design exists as an add-on. Consider labeling it "Platform redesign" rather than just "SaaS" so the distinction is clear.

StatDoctor belongs at the top or first in the ordering. It's a landing page redesign, HealthTech, 5 days — the most directly aligned case study with your new positioning.

---

## Case studies

### Augment (/work/augment)

**Keep:** The $12M raise. The 4+ year relationship. Specific client name and outcome. This is your anchor proof point and it should be referenced on every page where you need credibility.

**Rewrite:**
- Replace all double dashes (`--`) with commas or periods
- The "Why it worked" bullet section uses a negative parallelism pattern. "Speed without shortcuts: Moving fast doesn't mean cutting corners." Delete everything before the colon, then also fix the negative: just say "We moved fast and shipped clean work." 
- The "That's what The Humbl Framework™ delivers" closing line is repeated verbatim at the end of every case study. It reads like a template footer. Write a case-specific closing for each one.
- The "Most founders struggle to get design that actually keeps up with their business. They either go with freelancers who vanish when things get busy or agencies that slow everything down with process, meetings, and ticket systems." block appears identically on Sahil, Castingofka, and StatDoctor. This is a homepage value prop, not case study copy. Cut it from all three.

---

### Sahil (/work/sahil)

**Keep:** The 24-hour sprint angle — it's memorable and specific. The real testimonial from Emmanuel Gatwech is strong. The meta description "24-hour sprint for an AI startup" is excellent — specific and useful for SEO.

**Rewrite:**
- Same framework closing as above — cut the copy-pasted "That's what The Humbl Framework™ delivers" ending
- "Speed with precision: Moving fast doesn't mean cutting corners." — negative parallelism, same fix as Augment
- The ✅ emoji results list appears on Sahil, Castingofka, and StatDoctor identically. This visual pattern makes all three case studies feel like they were filled in from the same template, because they were. Worth varying the format at least slightly between them.
- Testimonial is strong — make sure it's visible early in the page flow, not buried after the results section

---

### Castingofka (/work/castingofka)

**Keep:** The 3-month sprint timeline is concrete and credible. The before/after images.

**Rewrite:**
- The testimonial section appears to be incomplete — there's a star rating and an image but no visible quote text. Check if the testimonial body is actually publishing. If not, either fix it or pull the section until you have a real quote.
- Same boilerplate "Most founders struggle..." section — cut it
- Same templated closing — write a Castingofka-specific one
- Castingofka is the weakest alignment with the new LP/CRO positioning. The intro calls it "a platform" for "actors, extras, and models." That's fine as a portfolio piece, but consider adding a note in the intro about what kind of work this was — product design retainer — so it reads as an add-on service rather than your main offer.

---

### StatDoctor (/work/statdoctor)

**Keep:** This is your most relevant case study for the new positioning. A landing page redesign, 5 days, real client testimonial, video testimonial from the founder, HealthTech sector. Lead with it on the portfolio page. The testimonial from Dr. Anu G is specific and credible.

**Rewrite:**
- "The founders discovered Humbl Design through our free trial offer" — cut or rewrite (see urgent list)
- Same boilerplate "Most founders struggle..." section — cut it
- Same emoji results format and templated closing
- The double dashes (`--`) throughout — fix globally

---

## Blog page (/blog)

### Keep
- "How to fix your hero section and increase website signups" — directly aligned, strong LP/CRO content
- "Why your landing page headline is killing conversions" — perfect fit
- "Customer Proof Design: How to Turn Real Users into Your Best Salespeople" — solid CRO content
- "Will AI replace designers in 2026?" — high-value SEO content, leave it
- "How designers actually use AI in 2026" — fine, broad audience
- "How to fix your product without a 6-month redesign" — useful, light product-design content, fine to keep
- "10 SaaS UX mistakes killing your MRR" and "10 rookie design mistakes" — these are product-design heavy but they're useful, CRO-adjacent posts. Fine to archive.
- "Why hourly design costs hurt startups" — strong positioning content, keep it
- "Is shadcn breaking design standards?" — good technical content, keeps you relevant in the dev/design Venn diagram

### Rewrite

**"What Humbl Design Does — from first Hello to shipped product."** This post describes the old positioning — product design retainers as a primary offer. Now that you've repositioned, this post is misleading. Either update it to reflect the LP/CRO-first offer, or unpublish it. If it has any SEO traction, update it. If not, cut it.

**Blog page meta description** is missing (no `<meta name="description">` visible in the fetched content). The page title is just "Blog I Humbl Design" which is fine, but add a meta description: something like "Landing page teardowns, CRO frameworks, and design tips for AI, SaaS, and Fintech founders."

### Missing

**No LP teardown or CRO audit posts.** Your primary content pillar is "Humbl Audit — Landing Page Teardowns." There are zero of these on the blog right now. This is the highest-engagement content type and the one most likely to generate "AUDIT" DMs. This should be the next blog post you write.

**No "Website Page CRO Series" posts.** The series covering every startup website page type (pricing page, about page, features page etc.) — that content idea is solid and directly maps to the new positioning. None of it exists yet.

---

## Thoughts page (/thoughts)

### Keep
- "Your landing page doesn't need a custom jersey to learn how to dribble" — perfectly aligned with the new positioning. The basketball analogy works, Nikola Jokić reference is specific, writing is genuinely human.
- "How to help your designer work twice as fast" — this is great positioning content. Frames you as a collaborative partner, not just a vendor.
- "Is shadcn breaking design standards?" — relevant to the technical founder audience.

### Rewrite

**Meta description:** "Check out the latest blog posts." This is placeholder copy. Rewrite: "David Pokorny on landing pages, CRO, and building a design business. Unfiltered."

**Page title:** "Thoughts" with no brand name in the tab title. Should be "Humbl Thoughts | Humbl Design" for SEO.

**"I want to avoid being you"** — this is the honest, vulnerable post about defining your own value. The writing is solid and authentic. Keep it, but make sure the title doesn't become your introduction for cold traffic. On the Thoughts index it's fine. Don't let it be the first post a potential client sees.

**"How to choose your AI design path in 2026"** — broad content, fine for positioning as a design thinker. But it's not acquisition content. The Thoughts section should lean more toward founder-facing problems as you grow.

### Stats on Thoughts article pages (every post footer)

The post footer shows: "72 hrs / Usual 0 → V1 turnaround", "$20M+ Raised by our customers", "18,000+ Designers enjoying our products."

Three issues here:
1. "$20M+" conflicts with "$12M" on the homepage. Reconcile these into one set of canonical stats used everywhere.
2. "18,000+" Figma downloads vs "20,000+" elsewhere — same problem.
3. "18,000+ Designers enjoying our products" — the word "products" is a holdover from when Figma templates were a bigger part of the brand. Consider updating to "18,000+ designers using Figma templates" or just drop it. It confuses the LP/CRO studio positioning.

---

## /redesign page

### Keep the concept, rewrite the page.

The free audit landing page is a useful conversion surface. But two things need updating:

1. The H1 and positioning need to reflect LP/CRO audit, not a general product/website redesign. If the offer is a 15-minute audit of a founder's landing page, say that specifically.
2. The "strong team of experts" copy and stock team photos (same issue as the homepage) undermine the solo studio positioning. Cut the team photos, replace with your face and one direct line about who does the work.

---

## Navigation (sitewide)

**"Timelines" → rename to "Process."** Nobody outside an agency world knows that "Timelines" means your process section. "Process" or "How it works" is clear.

**Inconsistency between nav versions.** Some pages show "Free audit?🤔" in the nav, others don't (the blog page doesn't appear to show it). Make the nav consistent across all page templates.

**No "Landing Pages" link anywhere in the nav.** If someone arrives from LinkedIn specifically looking for landing page design, there's no clear service page to land on. Consider adding a services landing page, or at minimum making the nav's "Services" anchor link go to a section that calls out landing pages explicitly.

---

## Sitewide copy patterns to clean up

**The Humbl Framework™ in every case study.** Structuring case studies around the H/U/M/B/L framework is a good idea in principle, but right now every case study uses the exact same H/U/M/B/L headers with almost identical paragraph structures. Visitors who read more than one case study will notice. Keep the framework as the internal logic, but write each case study's H/U/M/B/L sections with case-specific copy.

**The ✅ results list.** Appears identically formatted across 3 case studies. Fine to use, but at minimum vary which metrics get listed. Right now they all say "stronger visual hierarchy" and "improved conversion readiness" which are too vague to be proof points.

**The "Before Humbl / After Humbl" framing.** This is good and worth keeping — but the copy under "Before Humbl" on every page is identical boilerplate ("Most founders struggle to get design that actually keeps up with their business..."). This should either be cut entirely or replaced with a case-specific sentence about what the client's actual before-state looked like.

---

## What's missing from the site entirely

**A dedicated Landing Page Design service page.** If you're repositioning as the landing page/CRO specialist, there should be a page that goes deep on exactly what you deliver: what's included, timeline, what the client provides, what you hand back, price. The homepage touches it but a standalone page would rank for "landing page design for SaaS" and give you a clean link to share in DMs.

**CRO audit as a standalone offer.** Right now the audit is a lead magnet. If you're serious about it as a paid offer later, a page for it would help. For now, at minimum it needs better copy on the /redesign page (see above).

**DM "AUDIT" CTA anywhere on the site.** Your entire LinkedIn acquisition funnel runs on "DM AUDIT + your URL." There's nowhere on the website that mirrors this. Adding it to the hero section or the footer ("On LinkedIn? DM me 'AUDIT' + your URL.") would close the loop between site visitors and the DM funnel.

**A landing page teardown or CRO audit blog post.** The highest-performing content pillar in your strategy and you have zero posts in it. First post: pick a real startup landing page (can be anonymous), do a teardown, publish it. Every subsequent "AUDIT" DM becomes material.

# humbldesign.io — SEO + content session

**Date:** April 26, 2026
**Topic:** Google Search Console diagnosis + rewrite of "Will AI Replace Designers in 2026?"
**Article URL:** https://humbldesign.io/blog-posts/will-ai-replace-designers-2026

---

## 1. GSC diagnosis (key findings)

**Overall picture (last 3 months):**
- 56,377 impressions
- 79 clicks
- ~0.14% CTR (vs. 2-5% normal for position 5-6)
- ~5.8 average position

This is a "phantom traffic" pattern — Google thinks you're relevant, users disagree.

### Four issues found in the data

**1. One article carries everything.**
`will-ai-replace-designers-2026` has 33,876 impressions (60% of total traffic) and 38 clicks. It's the hit, but CTR is only 0.11%.

**2. DUPLICATE URL problem (biggest unfixed issue).**
GSC is tracking both:
- `https://humbldesign.io/blog-posts/will-ai-replace-designers-2026` (38 clicks)
- `https://www.humbldesign.io/blog-posts/will-ai-replace-designers-2026` (1 click)

Plus `humbldesign.io/` and `www.humbldesign.io/` as separate pages. Google sees two versions of the site and splits your ranking authority. Fix: 301 redirect from www → non-www (or vice versa, depending on canonical).

**3. Position 1-2 with 0% CTR = wrong keyword match.**
Queries like "web design companies near me" (position 1.13, 0 clicks), "website design company" (position 1.05, 0 clicks). You rank #1 but no one clicks because "near me" intent = local agency. Not a fixable problem, just explains the bad CTR average.

**4. Geography mismatch.**
- USA: 26,001 impressions, 13 clicks (0.05% CTR)
- Czech Republic: 148 impressions, 11 clicks (7.43% CTR)

CZ users know the brand and click. US users don't and skip.

### Action priorities
1. Rewrite title and meta description on the AI/designers article (biggest CTR lever)
2. Fix www vs non-www redirect in Webflow
3. Ignore phantom impressions from "near me" queries
4. Decide whether to invest in CZ market or build US brand awareness

---

## 2. Final SEO fields

**Meta title:**
`Will AI replace graphic designers in 2026? 69% of them still don't.`

**Meta description:**
`Designers with AI skills earn 56% more than peers. UX design roles are projected to grow 16%, graphic design 2%. The split is already here.`

**URL slug (do NOT change):**
`will-ai-replace-designers-2026`

### Reasoning behind the title
- Targets "graphic designers" keyword (your GSC shows real impression volume there)
- Counterintuitive flip ("69% don't" instead of "31% do") — readers expect AI to be everywhere
- "Still don't" carries judgment, makes graphic designers want to check if they're in that bucket
- Every competitor in the SERP hedges; this one commits to a position

---

## 3. Anti-AI content rewrite (changes made)

**Structural:**
- Consolidated 13 sections into 8 (uniform sprawl is an AI tell)
- Removed final calculator/Excel/camera analogy (cliché on this topic)
- Removed "Final thought" heading (banned closer pattern)
- Article ends on "best year of your career" line for stronger exit

**Sentence-level:**
- Killed most "It's not X, it's Y" templates (kept 2 strongest)
- Removed both fake-relatability lines ("If you've actually used AI...", "If you've scrolled enough...")
- Replaced banned words: "leverage on the floor" → "costs more than people admit", "navigating humans" → "getting a room of humans to agree"
- Em dashes reduced from ~8 to 2
- Broke rule-of-three default (career section now has 4 items, hand-off list has 5)

**Added:**
- Claude Design mention in opening (3rd paragraph) for news relevance
- Dedicated Claude Design H2 section between bucket-splitting and hand-off sections
- Bullets in 3 high-impact spots: stats comparison, bucket descriptions, Claude Design workflow
- 2 image markers: Claude Design product screenshot + grid of lookalike AI dashboards

---

## 4. Claude Design research (research summary)

- Launched: April 17, 2026 (Anthropic Labs)
- Runs on: Claude Opus 4.7
- Available: Claude Pro/Max/Team/Enterprise plans (research preview)
- Workflow: prompt → first version → refine via chat, comments, edits, custom sliders
- Reads codebase + design files on setup, builds a design system automatically
- Exports: Canva, PDF, PPTX, HTML, handoff bundle for Claude Code
- Anthropic's framing: *"Claude Design gives designers room to explore widely and everyone else a way to produce visual work."* (Two audiences, two value props.)

**Customer quotes on the launch page:**
- Olivia Xu, senior product designer at Brilliant: pages took 2 prompts in Claude Design vs 20+ in other AI tools, clean Claude Code handoff.
- Aneesh Kethini, PM at Datadog: rough idea to working prototype before anyone leaves the room.

**Opinion in the article:** Claude Design will do to throwaway internal visuals what Canva did to stock graphics. It will eat junior-designer pitch deck and landing page mockup work. It won't touch brand direction, systems thinking, or client-facing strategy. (Hedged appropriately — product is one week old, real impact unclear for months.)

---

## 5. Image sourcing notes

**Image 1 — Claude Design product shot.**
Source from Anthropic's announcement page directly: https://www.anthropic.com/news/claude-design-anthropic-labs. Their hero screenshot showing the chat + canvas layout. Press-friendly, zero legal risk.

**Image 2 — Grid of lookalike AI dashboards (the strongest visual in the article).**
Best assembled yourself: screenshot 3-4 dashboards from v0.dev, Claude Design, Vercel templates, or Dribbble "AI dashboard" tag. Arrange in 2x2 grid. The visual proves the argument on its own — don't caption.

---

## 6. Open items / next steps

1. ✅ Title + meta description chosen
2. ✅ Article rewritten with anti-AI rules
3. ✅ Claude Design section added with researched opinion
4. ✅ Bullets and image markers added
5. ⏳ Source and upload the two images
6. ⏳ Fix www vs non-www 301 redirect in Webflow
7. ⏳ Push the rewrite live
8. ⏳ Monitor GSC for CTR change over next 30 days

---

## 7. Final article copy

The full rewritten article is in: `will-ai-replace-designers-rewrite.md`

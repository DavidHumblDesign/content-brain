# Humbl Engine — Complete Content Brain Specification

> **What this file is:** The entire specification for building the Humbl Engine content operation system. Drop this into your Cursor project and tell Claude to read it. It contains every rule, every skill, every CMS field, every component spec, and every instruction needed to build the complete system.

---

## TABLE OF CONTENTS

1. [SYSTEM OVERVIEW](#1-system-overview)
2. [PROJECT SETUP](#2-project-setup)
3. [ANTIGRAVITY RULES](#3-antigravity-rules)
4. [CONTENT TYPES](#4-content-types)
5. [CMS FIELD MAPPING](#5-cms-field-mapping)
6. [MCP SERVER CONFIG](#6-mcp-server-config)
7. [SKILL: Tool Builder](#7-skill-tool-builder)
8. [SKILL: LinkedIn Strategy](#8-skill-linkedin-strategy)
9. [SKILL: Copywriting](#9-skill-copywriting)
10. [SKILL: Content Planning](#10-skill-content-planning)
11. [SKILL: Marketing 101](#11-skill-marketing-101)
12. [SKILL: Ads](#12-skill-ads)
13. [SKILL: Brand Guidelines](#13-skill-brand-guidelines)
14. [SKILL: SEO](#14-skill-seo)
15. [PROMPT BUILDER UPDATES](#15-prompt-builder-updates)
16. [PLANNING MODE (ONBOARDING)](#16-planning-mode-onboarding)
17. [LINKEDIN PREVIEW TOOL](#17-linkedin-preview-tool)
18. [WEBFLOW PUBLISH FLOW](#18-webflow-publish-flow)
19. [SHIPPED TOOLS REFERENCE](#19-shipped-tools-reference)
20. [TOOLS PIPELINE](#20-tools-pipeline)
21. [IMPLEMENTATION ORDER](#21-implementation-order)

---

# 1. SYSTEM OVERVIEW

Humbl Engine is a content operation system for humbldesign.io. It runs entirely inside Cursor with Claude as the AI co-pilot. It researches, plans, writes, builds interactive tools, and publishes — all from one workspace.

```
                           HUMBL ENGINE
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
   PLANNING MODE          BUILD MODE            PUBLISH MODE
         │                      │                      │
 • Onboarding Q&A         • Blog posts            • Webflow CMS API
 • Deep research           (4 content types)      • Auto-stage drafts
 • Content calendar       • Tools/embeds          • LinkedIn preview
 • Creator watch          • Lead magnets          • Publish on confirm
 • Idea generation        • Social content
 • Audience analysis      • Prompt builder
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                          SKILLS LAYER
                                │
    LinkedIn Strategy · Copywriting · Content Planning
    Marketing 101 · Ads · Brand Guidelines · SEO · Tool Builder
```

**Owner:** David Pokorny, founder of Humbl Design
**Site:** humbldesign.io (Webflow, CMS plan)
**GitHub:** github.com/DavidHumblDesign/content-brain
**Niche:** Design for startups — UI/UX, SaaS design, Webflow, branding, freelancing philosophy, AI + design

---

# 2. PROJECT SETUP

## File Structure

Build this folder structure in the project root:

```
Content brain/
├── antigravity-rules.md              ← Master rules (auto-read by Claude)
├── .cursor/
│   └── mcp.json                      ← Perplexity + Webflow MCP
├── skills/
│   ├── humbl-tool-builder-SKILL.md
│   ├── linkedin-strategy-SKILL.md
│   ├── copywriting-SKILL.md
│   ├── content-planning-SKILL.md
│   ├── marketing-101-SKILL.md
│   ├── ads-SKILL.md
│   ├── brand-guidelines-SKILL.md
│   └── seo-SKILL.md
├── planning/
│   ├── brand-discovery.md            ← Filled during onboarding
│   ├── content-pillars.md
│   ├── audience-personas.md
│   ├── voice-guide.md
│   ├── topic-bank.md
│   └── calendar/
│       └── 2026-02.md
├── blog-posts/
│   ├── web-color-guidelines-2026/
│   │   ├── article.md
│   │   ├── contrast.html             ← Shipped
│   │   ├── mode.html                 ← Shipped
│   │   └── states.html               ← Shipped
│   └── {slug}/
│       ├── article.md
│       └── tool.html
├── social/
│   ├── linkedin/
│   └── twitter/
├── lead-magnets/
│   └── {name}/
├── creator-watch/
│   └── creators.json
├── templates/
│   └── embed-base-template.html
└── prompt-builder/                   ← Existing localhost app
```

---

# 3. ANTIGRAVITY RULES

This is the content for `antigravity-rules.md` in the project root. Claude reads this automatically every conversation.

```markdown
# Humbl Engine Rules

## Identity
This is Humbl Engine for humbldesign.io. David Pokorny runs a design studio serving tech startups (AI, SaaS, Fintech). The engine creates blog posts, interactive freebie tools, social content (LinkedIn, X), lead magnets, and client deliverables.

## Prompt Builder
There is a prompt builder web app running on localhost. When David pastes a prompt from it, that prompt contains all platform, format, style, and rule selections already baked in. Execute the prompt as-is — it IS his voice and standards.

If David asks to create content WITHOUT pasting from the prompt builder, remind him to use it first.

## Skills System
Before executing any task, read the relevant skill file(s) from `skills/`. Multiple skills may apply to one task.

| Task | Read these skills |
|------|-------------------|
| Building a tool/embed | `humbl-tool-builder-SKILL.md` + `brand-guidelines-SKILL.md` |
| Writing a LinkedIn post | `linkedin-strategy-SKILL.md` + `copywriting-SKILL.md` |
| Writing a blog Guide | `seo-SKILL.md` + `copywriting-SKILL.md` + `content-planning-SKILL.md` |
| Writing a blog Humbl Thought | `copywriting-SKILL.md` + `linkedin-strategy-SKILL.md` |
| Writing a Glossary entry | `seo-SKILL.md` + `copywriting-SKILL.md` |
| Planning content | `content-planning-SKILL.md` + `linkedin-strategy-SKILL.md` |
| Creating a lead magnet | `copywriting-SKILL.md` + `marketing-101-SKILL.md` |
| Creating ad content | `ads-SKILL.md` + `copywriting-SKILL.md` |
| Publishing to Webflow | Read CMS field mapping in this file |
| Running onboarding | Read Planning Mode section in content-brain-blueprint.md |

## Content Types
The engine produces 4 blog content types:

1. **Glossary** — A-Z actionable design terms. Quick, punchy, educational. SEO-focused.
2. **Guides (Blocks)** — Deep technical step-by-step. Action steps, code examples, embedded tools. Authority + SEO pillar pages.
3. **Humbl Thoughts** — Personal rants, philosophical takes, hot opinions. First-person, raw, opinionated. Translates directly to LinkedIn posts.
4. **Tools** — Interactive HTML embed freebies. Built with tool-builder SKILL. Embedded inside Guide posts.

## Shipped Tools
- **Humbl Contrast** (abc-) — WCAG contrast checker, Section VI
- **Humbl Mode** (hmd-) — Light/dark mode converter, Section VIII
- **Humbl States** (hst-) — Interaction state generator, Section VII

## Tools Pipeline
- Humbl Twin (htw-) — Print-to-digital converter, Section II
- Humbl Scale (hsc-) — Token scale generator, Section III
- Humbl Ratio (hrt-) — 60-30-10 visualizer, Section IV
- Humbl Psych (hps-) — Color psychology checker, Section V
- Humbl Data (hdt-) — Data viz palette generator, Section IX
- Humbl Tint (htn-) — Dead gray fixer, Section XI
- Humbl Convert (hcv-) — Universal format converter, Section I
- Humbl Blind (hbl-) — Color blindness simulator, Section VI

## Webflow CMS Publishing
When content is ready to publish:
1. Show David a full CMS field preview (all fields populated)
2. Wait for explicit "publish" or "stage" confirmation
3. Default to staging (draft) — NEVER auto-publish live without confirmation
4. Use Webflow MCP to push to CMS

## Blog Content Rules
- Conversational, expert tone — smart friend, not lecturer
- Short paragraphs, punchy sentences
- Real data, real examples, no filler
- Clean markdown for Webflow CMS rich text
- Never start with "In today's world" or "Let's dive in" or any generic AI opener

## Social Content Rules
- LinkedIn: professional but human, no cringe corporate speak
- X/Twitter: sharp, concise, hot takes welcome
- Carousels: each slide = one clear idea, punchy headline
- Always include a hook in the first line
- No links in LinkedIn post body — put them in first comment

## Research Workflow
When given a topic:
1. Use Perplexity MCP for current data and best practices
2. Read relevant skill files
3. Write content to appropriate folder
4. Wait for feedback before publishing

## Design Reference
humbldesign.io: near-black backgrounds, 1px subtle borders, generous whitespace,
10-12px radius, color only for functional meaning. Full brand spec in `skills/brand-guidelines-SKILL.md`.
```

---

# 4. CONTENT TYPES

## Glossary
- **Format:** A-Z entries. One letter, one term, one actionable explanation.
- **Length:** 100-200 words per entry
- **Tone:** Quick, punchy, educational
- **Slug:** `/blog-posts/glossary-{term}`
- **Goal:** SEO + reference + lead magnet foundation
- **Template:**
```markdown
## A — Accessibility
[2-3 sentence definition that a founder would understand]
[1 actionable tip they can apply today]
[Link to related Guide post if one exists]
```

## Guides (Blocks)
- **Format:** Numbered action steps, technical depth, code examples
- **Length:** 2000-5000 words
- **Tone:** Expert instructor — detailed but not boring
- **Slug:** `/blog-posts/{topic-slug}`
- **Goal:** Authority + tool distribution + SEO pillar
- **These are the posts that get interactive Humbl tools embedded**
- **Existing examples:** "How to set up your Webflow project in 2026", "Will AI replace designers in 2026"

## Humbl Thoughts
- **Format:** First-person narrative, conversational, raw
- **Length:** 500-1500 words
- **Tone:** Unfiltered David — honest, vulnerable, opinionated
- **Slug:** `/blog-posts/{thought-slug}`
- **Goal:** Personality + LinkedIn virality + trust building
- **These translate directly into condensed LinkedIn posts**
- **Existing examples:** "I want to avoid being you", "Your landing page doesn't need a custom jersey"

## Tools
- **Format:** Single HTML embed file
- **Tone:** No text in embed — description lives in CMS fields
- **Slug:** Embedded within Guide posts, not standalone pages
- **Goal:** Lead magnets + engagement + shareability
- **Built using:** `skills/humbl-tool-builder-SKILL.md`

---

# 5. CMS FIELD MAPPING

These fields map to the Webflow CMS. David should verify these match his actual collection fields and adjust names as needed.

## Blog Posts Collection

```
FIELD NAME              TYPE          NOTES
─────────────────────────────────────────────────────────────
name                    Plain text    Post title. Required.
slug                    Slug          Auto-generated from title.
post-body               Rich text     Main article content. Accepts HTML.
summary                 Plain text    150-200 chars. Used on blog cards + meta.
thumbnail               Image         Blog card image + OG image. Upload via API.
category                Option        glossary | guide | thought
publish-date            Date          ISO format. For sort + display.
author                  Plain text    Default: "David Pokorny"
featured                Boolean       Show on homepage. Default: false.
seo-title               Plain text    60 chars max. For <title> tag.
seo-description         Plain text    155 chars max. Meta description.
embed-code              Plain text    Tool HTML embed (only for guides with tools).
tool-title              Plain text    "Humbl [Name]" (only if tool present).
tool-description        Plain text    One sentence — what the tool does.
tool-tutorial           Plain text    One sentence — how to use it.
reading-time            Number        Auto-calculated from word count.
tags                    Multi-ref     Topic tags for filtering.
```

## Tools Collection (if separate from blog posts)

```
FIELD NAME              TYPE          NOTES
─────────────────────────────────────────────────────────────
name                    Plain text    "Humbl [Name]"
slug                    Slug          Auto from name.
description             Plain text    One sentence — what it does.
tutorial                Plain text    One sentence — how to use.
embed-code              Plain text    Full HTML embed code.
related-post            Reference     Links to parent Guide blog post.
article-section         Plain text    Which article section it covers.
prefix                  Plain text    CSS namespace prefix (e.g., "hst-").
status                  Option        shipped | building | planned
```

## Social Posts Collection (optional — for tracking)

```
FIELD NAME              TYPE          NOTES
─────────────────────────────────────────────────────────────
name                    Plain text    Post hook / first line.
platform                Option        linkedin | twitter | both
body                    Rich text     Full post text.
source-post             Reference     Links to blog post it promotes.
status                  Option        draft | scheduled | posted
scheduled-date          Date          When to publish.
engagement-notes        Plain text    Performance notes after posting.
```

**CRITICAL:** David must open his actual Webflow CMS collections and compare these fields to what exists. Rename fields in this spec to match his actual field names before building the publish flow.

---

# 6. MCP SERVER CONFIG

Replace the contents of `.cursor/mcp.json` with:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_KEY_HERE"
      }
    },
    "webflow": {
      "url": "https://mcp.webflow.com/sse"
    }
  }
}
```

After saving and restarting Cursor:
- **Perplexity:** Works immediately if API key is valid.
- **Webflow:** Cursor will open an OAuth login page. Authorize humbldesign.io. Then Claude can read/write your CMS.

Requires Node.js 22.3.0+ for Webflow MCP. Check with `node --version` in terminal.

---

# 7. SKILL: Tool Builder

Save as `skills/humbl-tool-builder-SKILL.md`

This is the most detailed skill. It covers the complete design system, interaction patterns, component anatomy, output format, and checklist for building interactive HTML embed tools.

## Source Article Context

All tools support the article "The Ultimate Color Guideline for 2026":
- Section I: Color models (HEX, RGB, HSL, HSB)
- Section II: Print-to-digital "Digital Twin" method
- Section III: Semantic token architecture (primitive → semantic → component)
- Section IV: The 60-30-10 composition rule
- Section V: Color psychology & Von Restorff effect
- Section VI: WCAG accessibility (4.5:1 normal text, 3:1 large text)
- Section VII: 5 universal interaction states (default, hover, active, focus, disabled)
- Section VIII: Dark mode (elevation, saturation correction, text hierarchy)
- Section IX: Data visualization palettes
- Section XI: Anti-patterns (vibrating colors, pure grays, opacity abuse)

## Output Structure

Every tool ships as:
1. **Title** — "Humbl [Name]"
2. **Description** — One sentence, what it does (lives in CMS, NOT in embed)
3. **Tutorial** — One sentence, how to use it (lives in CMS, NOT in embed)
4. **Embed code** — Single HTML file for Webflow

## File Rules

```
DO:
  - Single file: <style> + <link> + <div> + <script>
  - All CSS classes prefixed with unique 3-letter code (e.g., .abc-, .hmd-, .hst-)
  - IIFE wrapper: (function(){ ... })();
  - Google Fonts link for heading + mono fonts
  - width:100% on wrapper (fills Webflow container)
  - table-layout:fixed when using tables

DON'T:
  - No <html>, <head>, <body> tags
  - No <h1>, <h2>, or <p> tags (Webflow controls those)
  - No external JS dependencies
  - No localStorage
  - No ids without the prefix namespace
  - No descriptive text inside the embed
```

## Design System

**IMPORTANT:** These are the CURRENT tokens. Once `brand-guidelines-SKILL.md` is populated with David's actual brand values, all new tools should use THOSE values instead. Existing tools will be rebranded later.

### Colors
```
Background:     #09090b
Surface:        #111113
Surface 2:      #18181b
Border:         #27272a
Border hover:   #3f3f46
Text primary:   #fafafa
Text body:      #d4d4d8   ← paragraphs, labels
Text muted:     #a1a1aa   ← input labels, hints, contrast ratios
Text dim:       #71717a   ← inactive tabs, group labels
Text faint:     #52525b   ← decorative ONLY, never for readable text
Focus ring:     #818cf8
```

**CRITICAL:** Every piece of text must be readable. Minimum #a1a1aa on dark backgrounds. NEVER use #52525b or #3f3f46 for text users need to read.

### Semantic Colors
```
Success/AAA:  #22c55e
Info/AA:      #3b82f6
Warning:      #f59e0b
Error/Fail:   #ef4444
```

Semantic tag backgrounds:
```
Green:  rgba(34,197,94,.12) + #4ade80 text
Blue:   rgba(59,130,246,.15) + #60a5fa text
Purple: rgba(168,85,247,.15) + #c084fc text
Gray:   rgba(113,113,122,.2) + #d4d4d8 text
```

### Typography
```
Font primary:   'Plus Jakarta Sans', -apple-system, sans-serif
Font mono:      'IBM Plex Mono', monospace
Input labels:   .62rem, uppercase, letter-spacing .06em, weight 700, #a1a1aa
Section labels: .6rem, uppercase, letter-spacing .06em, weight 700, #d4d4d8
Body text:      .82-.84rem, #d4d4d8, line-height 1.75
Hint text:      .62rem, #a1a1aa, weight 500
Mono values:    'IBM Plex Mono', .6-.66rem
Hex in results: 'IBM Plex Mono', .56rem, #fafafa, weight 600
Badges/tags:    'IBM Plex Mono', .48-.54rem, weight 700, 2px 6px padding, 4px radius
Code blocks:    'IBM Plex Mono', .64rem, line-height 1.8, #a1a1aa
```

### Spacing & Radius
```
Wrapper padding:     40px 32px (desktop), 20px 14px (tablet), 16px 10px (mobile)
Wrapper radius:      16px (desktop), 12px (tablet), 10px (mobile)
Card radius:         12px
Element radius:      8-10px
Small radius:        3-5px
Section spacing:     28px margin-bottom
Border:              1px solid #27272a (cards), 1.5-2px solid #27272a (interactive)
```

### Breakpoints
```css
@media(max-width:900px){ /* mid */ }
@media(max-width:768px){ /* tablet */ }
@media(max-width:480px){ /* mobile */ }
```

## Interaction States

EVERY interactive element needs ALL states:

### Buttons/Clickables
```css
/* Default */    background:#111113; border:1px solid #27272a; color:#71717a;
/* Hover */      border-color:#3f3f46; color:#a1a1aa; background:#18181b;
/* Focus */      border-color:#818cf8; box-shadow:0 0 0 2px #09090b,0 0 0 4px #818cf8;
/* Active */     transform:scale(.96);
/* Selected */   background:#fafafa; border-color:#fafafa; color:#09090b;
```

### Text Inputs
```css
/* Default */    background:#18181b; border:1px solid #27272a; color:#fafafa;
/* Hover */      border-color:#3f3f46;
/* Focus */      border-color:#818cf8; box-shadow:0 0 0 2px rgba(129,140,248,.15);
```

### Color Pickers
```css
-webkit-appearance:none; width:28px; height:28px; border:1px solid #27272a;
border-radius:6px; cursor:pointer; padding:1px; background:#18181b;
::-webkit-color-swatch-wrapper{padding:0}
::-webkit-color-swatch{border:none;border-radius:4px}
```

### Toggle Switch
```css
/* Track off */  width:52px; height:28px; border-radius:99px; background:#27272a; border:2px solid #3f3f46;
/* Track on */   background:#3b82f6; border-color:#2563eb;
/* Knob */       width:20px; height:20px; border-radius:99px; background:#fafafa;
                 position:absolute; top:2px; left:2px(off)/26px(on);
/* Requires role="switch", aria-checked, keyboard handler */
```

### Copy Button
```css
/* Default */    background:#18181b; border:1px solid #27272a; color:#71717a;
/* Hover */      border-color:#3f3f46; color:#a1a1aa;
/* Copied 2s */  border-color:#22c55e; color:#22c55e; background:rgba(34,197,94,.06);
```

### Destructive (Remove/Delete)
```css
/* Hover */      border-color:#ef4444; color:#ef4444; background:rgba(239,68,68,.1);
/* Focus */      border-color:#ef4444; box-shadow:0 0 0 2px #09090b,0 0 0 4px #ef4444;
```

### Keyboard Accessibility
- `tabindex="0"` on non-native interactive elements
- `role="button"` + `aria-label` on div/span click targets
- `role="switch"` + `aria-checked` on toggles
- Handle Enter + Space keydown
- `outline:none` (focus shown via box-shadow)

## Output Section Pattern

Three-tab output: Tokens / CSS / Tailwind + Copy button.

### Syntax highlighting classes
```css
.ck{color:#818cf8}  /* keywords/properties */
.cv{color:#22c55e}  /* values/hex */
.cp{color:#71717a}  /* comments */
.cc{color:#f59e0b}  /* selectors */
.cs{color:#60a5fa}  /* class names */
```

## Smart Defaults
- Pre-populate with values that look good on first load
- Name defaults (not just raw hex codes)
- Show mostly passing/positive results

## Edge Case Personality
- **Tier 1 (80%+):** Confident, professional
- **Tier 2 (40-79%):** Encouraging but honest
- **Tier 3 (1-39%):** Direct, concerned
- **Tier 4 (0%):** Sarcastic + constructive. Roast the RESULT, never the USER. Randomize from 4-8 roasts. Always follow with a fix.

## State Generation Math (Section VII)
```
Hover:    lightness −10% (light bg) or +10% (dark bg). SOLID HEX, never opacity.
Active:   double the hover shift (−20% / +20%)
Focus:    double-ring: 2px bg gap + 2px brand ring. :focus-visible ONLY.
Disabled: saturation ×0.12, lightness toward middle, opacity .45, grayscale(.6)
```

## Dark Mode Conversion (Section VIII)
```
Light→Dark: bg→#09090b, surface→#18181b, text→S×0.3/L93, accents→S×0.82/L+28
Dark→Light: bg→#ffffff, surface→#f4f4f5, text→S×0.3/L8, accents→S×1.22/L−25
```

## JS Architecture Pattern
```javascript
(function(){
  var items=[/*defaults*/], mode='light', shape='rounded', outputTab='tokens';
  function $(id){return document.getElementById(id)}
  // helpers: rgb, hsl, fromHsl, lum, cr, isLt, ok, shiftL, shiftH
  // render functions per section
  // update() re-renders outputs only
  // render() full re-render
  render();
})();
```

## Checklist
- [ ] Single file, no external deps, IIFE wrapped
- [ ] 3-letter CSS prefix unique to tool
- [ ] All text readable (#a1a1aa minimum, #d4d4d8 for important)
- [ ] Every element has hover + focus-visible + active states
- [ ] Keyboard navigable, aria-labels, role attributes
- [ ] Smart defaults look good on first load
- [ ] Live preview updates on input change
- [ ] Output tabs + copy with "Copied!" 2s feedback
- [ ] Syntax highlighting on code output
- [ ] Edge cases with personality
- [ ] Responsive at 768px and 480px
- [ ] No text inside the embed (description/tutorial in CMS)

---

# 8. SKILL: LinkedIn Strategy

Save as `skills/linkedin-strategy-SKILL.md`

## Algorithm Rules (2025-2026)

1. **Topic Authority Score** — LinkedIn tracks whether you're an expert on a topic. Post about the SAME niche consistently for 60+ days and your reach multiplies. David's niche: design for startups, UX strategy, freelancing, AI + design.

2. **Comments > Likes** — Comments are 15x more valuable than likes for algorithmic reach. Write posts that provoke genuine responses, not "Agree?" bait.

3. **Golden Hour** — First 60-120 minutes after posting determine reach. Be present to reply to every comment in this window.

4. **No External Links in Post Body** — LinkedIn deprioritizes posts with links. ALWAYS put links in the first comment. Never in the post itself.

5. **Carousels & PDFs > Text > Polls > Video** — Video is deprioritized in 2025-2026. Focus on carousels (PDF documents) and well-structured text posts.

6. **Dwell Time** — Posts that keep users reading longer get boosted. Write posts worth reading, not just scanning.

7. **Niche > Generic** — "How SaaS startups can fix their hero section in 30 minutes" beats "5 design tips for your website."

8. **Failure > Success** — "How I lost $15K and what I learned" gets 6x more comments than "How I landed 10 clients."

9. **Hashtags: 3-5 max** — More than 5 looks spammy, gets deprioritized.

10. **Evergreen gets resurfaced** — LinkedIn now shows posts 2-3 weeks old if they're relevant. Quality over recency.

## Hook Formulas That Work
```
DATA HOOK:     "We spent $47K testing [X]. Here's what worked:"
FAILURE HOOK:  "I [failed at X]. Here's what I'd do differently:"
CONTRARIAN:    "Unpopular opinion: [common belief] is wrong because [reason]."
SPECIFIC:      "The exact [framework/process] we used to [specific result]."
QUESTION:      "We tried [A] and [B]. Which has worked better for you?"
BEFORE/AFTER:  "[Thing] before: [bad state]. After: [good state]. Here's what changed:"
```

## Post Structure Templates

### Story Post (for Humbl Thoughts)
```
[2-line hook — data or failure or contrarian take]

[Short context paragraph — set the scene in 2-3 sentences]

[The insight — what you learned, what changed, what you'd tell others]

[1-2 supporting points or examples]

[Close with a genuine question that invites discussion]
```

### List Post (for Guides → LinkedIn)
```
[Hook with specific number + result]

[1-line context]

Here's what works:

1. [Point] — [1-sentence explanation]
2. [Point] — [1-sentence explanation]
3. [Point] — [1-sentence explanation]
[up to 5-7 points]

[CTA: question or "Link in comments"]
```

### Hot Take Post
```
[Contrarian statement]

[Why most people get this wrong]

[What actually works — with proof or example]

[The nuance — when the common approach IS right]

[Question that invites debate]
```

## Repurposing Chain
```
Guide (blog) → Condensed LinkedIn list post (top 5 points + link in comments)
Humbl Thought (blog) → Direct LinkedIn story post (trim to 1300 chars)
Tool → LinkedIn carousel showing the tool in action + "Try it free: link in comments"
LinkedIn post that performs well → Expand into blog Guide
```

## David's Content Pillars
(To be confirmed during onboarding, but based on existing blog:)
1. **Design strategy for startups** — UX fixes that increase revenue, hero section optimization, login UX, SaaS design mistakes
2. **Freelancing/agency philosophy** — Pricing models, client relationships, finding your value, honest takes
3. **AI + Design** — How designers use AI, will AI replace designers, vibe coding, shadcn/template critique
4. **Webflow & technical design** — Project setup, CMS, accessibility, color theory
5. **Hot takes on the design industry** — Opinionated, philosophical, raw

## Engagement Rules
- Reply to EVERY comment in the first 2 hours
- Ask follow-up questions in replies (sparks threads)
- Never use "Agree?" or "Like if you..." — these get deprioritized
- Genuine questions that have multiple valid answers work best
- Tag relevant people only if you're genuinely referencing their work
- Post consistently at the same time(s) — algorithm rewards predictability

---

# 9. SKILL: Copywriting

Save as `skills/copywriting-SKILL.md`

## Core Principles

1. **Hook first.** No throat-clearing. No "In today's world." First sentence must earn the second sentence.

2. **Specificity beats generic.** "147 leads in 60 days" not "more leads." "$12M seed round" not "successful funding." "8.6:1 contrast ratio" not "good accessibility."

3. **Problem-Agitate-Solve (PAS).**
   - Problem: Name the pain. ("Your hero section is losing you signups.")
   - Agitate: Twist the knife. ("Every visitor who bounces is a customer your competitor gets.")
   - Solve: Present the fix. ("Here's the 5-point framework that fixes it.")

4. **One idea per paragraph.** Short paragraphs. Punchy sentences. White space is your friend.

5. **Active voice.** "We redesigned the dashboard" not "The dashboard was redesigned by us."

6. **Cut the filler.** Delete: "basically", "essentially", "in order to", "it's important to note that", "at the end of the day", "the fact that". If a sentence works without a word, remove that word.

7. **David's voice:** Direct, confident, slightly irreverent, data-backed, never corporate. He says "This doesn't work" not "This may present some challenges." He uses "you" more than "we."

## Headlines
- Include a number when possible: "10 SaaS UX Mistakes Killing Your MRR"
- Include the benefit: "How to Fix Your Hero Section and Increase Signups"
- Create curiosity: "Is shadcn Breaking Design Standards?"
- Be specific about the audience: "For SaaS Founders Who Are Tired of Generic Design"

## CTAs
- **Soft CTA:** "If this helped, follow for more." / "Share your experience below."
- **Medium CTA:** "Link to the full guide in the first comment." / "Try the tool free — link below."
- **Hard CTA:** "Book a free design audit → link in bio." / "DM me 'audit' for a free teardown."
- Always match CTA strength to content warmth. Cold audience = soft CTA. Engaged readers = hard CTA.

## Lead Magnet Copy
```
TITLE: [Number] + [Specific outcome] + [Timeframe or constraint]
  Example: "The 5-Point Hero Section Checklist That Converts"

SUBTITLE: [Who it's for] + [What they'll get]
  Example: "For SaaS founders who want more signups without a redesign"

BULLETS: (3-5, each starts with a verb)
  ✓ Identify the #1 reason visitors bounce in under 3 seconds
  ✓ Fix your headline using the PAS framework
  ✓ [etc.]

CTA: [Action verb] + [What they get] + [Objection killer]
  Example: "Download the free checklist (no email required)"
```

## Words to Use / Avoid
**Power words:** proven, exact, specific, data, tested, framework, audit, fix, kill, crush, ship, launch, revenue, MRR, signups, conversions
**Weak words to avoid:** leverage, utilize, optimize, synergy, innovative, cutting-edge, best-in-class, robust, seamless, game-changing, delve, dive in

---

# 10. SKILL: Content Planning

Save as `skills/content-planning-SKILL.md`

## Content Pillar Strategy

David should own 3-5 core topics. All content maps to one of these pillars. This builds Topic Authority on LinkedIn and SEO authority on Google.

**Initial pillars** (confirm during onboarding):
1. Design strategy for startups (UX, conversion, growth)
2. Freelancing / agency philosophy (pricing, value, client work)
3. AI + Design (tools, workflow, industry future)
4. Technical design (Webflow, accessibility, color, typography)
5. Industry hot takes (opinions, culture, trends)

## Repurposing Chain

One piece of research becomes 5+ pieces of content:

```
Research (Perplexity)
  → Guide blog post (2000-5000 words, SEO pillar)
    → Interactive tool embed (if technical topic)
    → Condensed LinkedIn post (top insights, link in comment)
    → Twitter thread (key points, more casual)
    → Newsletter segment
    → Glossary entries (individual terms from the guide)
    → Carousel PDF (visual summary, 8-10 slides)
```

## Idea Generation

When David asks "give me content ideas," use these frameworks:

1. **Audience pain audit** — What are SaaS founders/startup CTOs struggling with in design right now? Use Perplexity to research.
2. **Competitor gap analysis** — What are other design studios/freelancers NOT talking about? What's overserved? What's missing?
3. **David's experience bank** — Past projects, client wins, mistakes, lessons learned. These become Humbl Thoughts.
4. **Trending topics** — What's happening in design/AI/SaaS this week? React to it with a unique angle.
5. **Creator Watch** — What are David's inspiration creators posting? NOT to copy — to find gaps and angles they missed.
6. **Comment mining** — What questions come up in comments on David's LinkedIn posts? Each question is a content idea.

## Calendar Structure

```
WEEKLY CADENCE (suggested):
Monday:    LinkedIn post (Humbl Thought or hot take)
Tuesday:   —
Wednesday: LinkedIn post (Guide excerpt or data-backed insight)
Thursday:  —
Friday:    LinkedIn post (lighter — carousel, personal story, question)

MONTHLY:
Week 1:    Publish 1 Guide blog post + tool
Week 2:    Publish 1 Humbl Thought blog post
Week 3:    Publish 2-3 Glossary entries
Week 4:    Content review + plan next month

QUARTERLY:
1 major lead magnet (checklist, template, toolkit)
1 content audit (what performed, what didn't, adjust pillars)
```

## Internal Linking
- Every Guide links to related Glossary entries
- Every Glossary entry links to the full Guide
- Every Humbl Thought links to a relevant Guide or portfolio piece
- Tools link to the Guide they're embedded in

---

# 11. SKILL: Marketing 101

Save as `skills/marketing-101-SKILL.md`

## Funnel Mapping

```
TOFU (Awareness)       → LinkedIn posts, Twitter, SEO blog posts, carousels
                         Goal: reach + followers + website visits

MOFU (Consideration)   → Guides with tools, case studies, lead magnets, newsletter
                         Goal: email signups + trust building

BOFU (Decision)        → Portfolio page, testimonials, free audit CTA, pricing page
                         Goal: consultation calls + project bookings
```

## Content Type → Funnel Stage
```
Glossary        → TOFU (SEO traffic, quick reference)
Guides          → TOFU/MOFU (authority, tool engagement)
Humbl Thoughts  → TOFU (personality, shareability)
Tools           → MOFU (engagement, lead magnet)
Case studies    → BOFU (proof, trust)
Lead magnets    → MOFU→BOFU bridge (email capture)
```

## CTA Placement
- **Blog posts:** Soft CTA mid-article ("Want the full checklist? Grab it free."), hard CTA at end ("Book a free audit.")
- **LinkedIn:** Link to blog in first comment. Never in post body.
- **Tools:** The tool IS the CTA — it demonstrates expertise. Add "Built by Humbl Design" footer link.
- **Every piece of content** should have ONE clear next step for the reader.

## Social Proof Patterns (from David's "Customer Proof Design" post)
- Replace vague claims with specific results: "$12M raised" not "successful funding"
- Use short video clips of real product usage
- Before/after quotes from clients
- Place proof NEXT to CTAs, not in a separate testimonials section

## Analytics That Matter
```
VANITY (ignore):  likes, impressions, follower count
USEFUL:           comments, saves, shares, profile visits, link clicks
MONEY:            email signups, consultation calls booked, project inquiries
```

---

# 12. SKILL: Ads

Save as `skills/ads-SKILL.md`

## LinkedIn Ads Strategy

### Best-Performing Formats for Design Studios
1. **Sponsored Content (single image)** — Portfolio showcase + "Is your SaaS making these UX mistakes?"
2. **Document Ads (carousel/PDF)** — Mini case study or checklist. Swipeable = high engagement.
3. **Thought Leader Ads** — Boost David's best organic LinkedIn posts to targeted audiences. Feels native, not salesy.

### Targeting
```
Job titles:    CEO, CTO, Co-founder, Head of Product, VP Product
Company size:  11-200 employees (startup sweet spot)
Industries:    SaaS, Fintech, AI/ML, HealthTech, EdTech
Seniority:     Director+
Exclude:       Design agencies, freelancers, students
```

### Ad Copy Formula
```
HOOK:     [Specific pain point with data]
PROOF:    [Quick result — "Helped [client] raise $12M"]
CTA:      [Low commitment — "Free audit" / "See the case study"]
```

### Budget Framework
```
Testing:     $20-50/day per ad variant. Run 3-5 variants.
Scaling:     Kill underperformers after 7 days. Scale winners.
Retargeting: $10-20/day targeting blog visitors + LinkedIn engagers.
Monthly:     Start at $500-1000. Scale based on consultation call cost.
```

### Organic → Paid Pipeline
```
Post performs well organically (50+ comments, high engagement)
  → Boost as Thought Leader Ad to wider targeted audience
  → If ad performs → create similar content for next organic cycle
  → Track: cost per profile visit, cost per website click, cost per consultation
```

---

# 13. SKILL: Brand Guidelines

Save as `skills/brand-guidelines-SKILL.md`

## Current State

The tool embeds currently use a generic dark theme. David wants everything on-brand. This file needs to be populated with his actual brand values.

## Action Required

**David:** Fill in these values by inspecting your Webflow site, checking your Figma files, or just telling Claude what you want. Once filled, all new tools and content will use these values.

```
BRAND COLORS
────────────────────────────────
Background (page):       #______
Background (cards):      #______
Background (inputs):     #______
Border (default):        #______
Border (hover):          #______
Text (headings):         #______
Text (body):             #______
Text (muted/secondary):  #______
Text (placeholder):      #______
Accent (primary):        #______
Accent (hover):          #______
Accent (secondary):      #______
Success:                 #______
Warning:                 #______
Error:                   #______
Focus ring:              #______

TYPOGRAPHY
────────────────────────────────
Heading font:            ______ (Google Fonts name)
Body font:               ______ (Google Fonts name)
Mono font:               ______ (Google Fonts name or default)
Heading weight:          ______
Body weight:             ______
Body size:               ______rem
Body line-height:        ______

SPACING & RADIUS
────────────────────────────────
Card border-radius:      ______px
Button border-radius:    ______px
Input border-radius:     ______px
Small element radius:    ______px
Card padding:            ______px
Section gap:             ______px

COMPONENT STYLES
────────────────────────────────
Button style (active):   fill / outline / gradient
Card border:             1px solid #______ / none / shadow
Shadow style:            none / subtle / medium
```

**Alternative:** Tell Claude "extract brand values from humbldesign.io" and it will analyze the CSS from the live site and fill this in. Then you review and adjust.

## Brand Voice (Quick Reference)
- Direct, confident, slightly irreverent
- Data-backed, specific, no filler
- "Smart friend explaining over coffee" not "corporate white paper"
- Uses "you" and "your" — speaks TO the reader
- Comfortable saying "this sucks" or "most people get this wrong"
- Never: corporate jargon, buzzwords, wishy-washy hedging

---

# 14. SKILL: SEO

Save as `skills/seo-SKILL.md`

## Keyword Strategy
- **Primary keywords:** Design for startups, SaaS UX, startup design, Webflow design, product design freelancer
- **Secondary:** Hero section design, SaaS login UX, dark mode design, accessibility design, color theory for web
- **Long-tail:** "How to fix SaaS hero section", "Best Webflow project setup 2026", "Will AI replace designers"
- Use Perplexity to research keyword opportunities before each Guide post

## Title Tags
```
Format: [Primary keyword] + [Benefit or hook] | Humbl Design
Length: 50-60 characters
Example: "How to Fix Your Hero Section for More Signups | Humbl Design"
```

## Meta Descriptions
```
Length: 140-155 characters
Include: primary keyword + specific benefit + implicit CTA
Example: "Most SaaS sites lose signups to bad hero sections. Here's the 5-point fix used by 41+ startups to increase conversions."
```

## Heading Structure
```
H1: One per page. The post title. Contains primary keyword.
H2: Major sections. 3-7 per post. Include secondary keywords naturally.
H3: Sub-sections within H2s. Supporting details.
Never skip levels (H1 → H3 without H2).
```

## Internal Linking
- Every post links to 2-3 related posts
- Use descriptive anchor text (not "click here")
- Link from high-traffic posts to newer posts
- Glossary entries link to their parent Guide
- Guides link to relevant Glossary entries

## URL Conventions
```
Guides:       /blog-posts/{keyword-slug}
Thoughts:     /blog-posts/{short-descriptive-slug}
Glossary:     /blog-posts/glossary-{term}
```

## Image Alt Text
```
Descriptive of what the image shows + keyword when natural.
"Screenshot of Humbl Contrast tool showing WCAG contrast matrix"
NOT: "image1" or "contrast-tool-screenshot.png"
```

---

# 15. PROMPT BUILDER UPDATES

The existing prompt builder web UI needs new content type options. Keep everything currently in the app. Add these:

## New Format Options

Add to the existing format selector dropdown/buttons:

```
Blog: Glossary Entry
  → A-Z term, punchy definition, actionable tip
  → Output: markdown for Webflow rich text

Blog: Guide (Block)
  → Deep technical guide with action steps
  → Output: markdown + optional tool embed spec

Blog: Humbl Thought
  → Personal rant / philosophical take
  → Output: markdown blog post + condensed LinkedIn version

Blog: Tool Spec
  → Interactive embed specification
  → Output: SKILL-compliant HTML embed file
```

## New Tab: Creator Watch

A dedicated section in the prompt builder UI:

```
┌──────────────────────────────────────────────────────────┐
│ CREATOR WATCH                                     [+ Add] │
│                                                           │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ Name        Platform       Watch for                  │ │
│ │ ────────────────────────────────────────────────────── │ │
│ │ @_______    LinkedIn + X   hooks, storytelling    [✕] │ │
│ │ @_______    LinkedIn       data-backed posts      [✕] │ │
│ │ @_______    X              hot takes, threads     [✕] │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                           │
│ [ Analyze creators ]  [ Generate ideas inspired by ]      │
└──────────────────────────────────────────────────────────┘
```

Fields per creator:
- Name / handle
- Platform(s): LinkedIn, X/Twitter, or both
- Tags: what to study about their content (hooks, topics, format, cadence, audience)
- URL: profile link

"Analyze creators" → Claude uses Perplexity to research their recent posts and summarize patterns.
"Generate ideas inspired by" → Claude suggests content ideas based on gaps/angles these creators miss.

David updates this list himself anytime. It's his running inspiration board.

---

# 16. PLANNING MODE (ONBOARDING)

Runs inside Cursor chat as a structured conversation. Two phases: initial setup (once) and ongoing sprints (recurring).

## Phase 1: Initial Setup

Before asking David anything, Claude should automatically:
1. Scrape humbldesign.io via Webflow MCP (services, pricing, portfolio, existing blog posts)
2. Research David's LinkedIn profile and recent posts via Perplexity
3. Research David's X/Twitter profile via Perplexity
4. Analyze existing blog content: topics, tone, structure, gaps
5. Summarize findings before asking questions

Then ask David these questions (one at a time, conversationally):

**Business:**
1. What's the #1 service you want to sell more of right now?
2. Who is your ideal client? (industry, company stage, budget range, main pain point)
3. What makes Humbl Design different from other design studios/freelancers?
4. What topics do clients/prospects ask you about most?
5. What topics do you WANT to be known for?

**Voice:**
6. Share 3 LinkedIn posts you've written that felt most "you."
7. Share 3 posts from others that you wish you'd written.
8. What are your strongest opinions about the design industry?
9. What topics would you never post about?

**Goals:**
10. Primary content goal: leads, authority, community, or all?
11. How often can you realistically review/approve content per week?
12. Do you want to write first drafts or have Claude draft everything?

## Phase 2: Strategy Output

After answers, Claude generates and saves:
- `planning/content-pillars.md` — 3-5 core topics with rationale
- `planning/audience-personas.md` — 2-3 ideal reader profiles
- `planning/voice-guide.md` — How David sounds, with do/don't examples
- `planning/topic-bank.md` — 50+ content ideas across all 4 types
- `planning/calendar/2026-02.md` — First 30-day content calendar

## Phase 3: Ongoing Sprints

When David says "plan my next 2 weeks":
1. Check recently published content (Webflow MCP)
2. Research trending topics in David's niche (Perplexity)
3. Reference Creator Watch for inspiration
4. Generate 2-week calendar: specific titles, hooks, content types, platform assignments
5. Wait for approval before building

---

# 17. LINKEDIN PREVIEW TOOL

Build as an HTML embed (same as Humbl tools) that can also be integrated into the prompt builder app.

## What It Does
- Text area for writing/pasting LinkedIn post
- Live preview showing exactly how LinkedIn renders it:
  - Profile photo placeholder + "David Pokorny" + "Founder @ Humbl Design" + "Xh"
  - Full text with the "...see more" fold at the correct position
  - Like/comment/repost/send bar at bottom
- Mobile vs Desktop toggle (different fold positions)
- Character counter with warnings:
  - Mobile fold: ~210 characters
  - Desktop fold: ~300 characters
  - Optimal length: 800-1300 characters
- Hashtag counter (warn if >5)
- Link detector (warn: "Move links to first comment for better reach")
- Unicode formatting buttons: **Bold**, *Italic*, U̲n̲d̲e̲r̲l̲i̲n̲e̲, 𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀, 𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴
- Copy formatted text button

## Technical Notes
- Unicode formatting uses special Unicode characters (like Typegrow)
- The fold position is approximate — LinkedIn changes it occasionally
- Preview should show the engagement bar but it's non-interactive (visual only)
- Use tool builder SKILL for styling (dark theme, same patterns)
- Prefix: `hlp-` (Humbl LinkedIn Preview)

---

# 18. WEBFLOW PUBLISH FLOW

## How It Works

```
1. Claude writes content
         ↓
2. Claude shows CMS field preview:
   ┌──────────────────────────────────────┐
   │ WEBFLOW CMS PREVIEW                  │
   │                                      │
   │ Title:       [filled]                │
   │ Slug:        [auto-generated]        │
   │ Category:    [guide/thought/glossary] │
   │ Summary:     [150-200 chars]         │
   │ SEO Title:   [60 chars]             │
   │ SEO Desc:    [155 chars]            │
   │ Thumbnail:   [description/prompt]    │
   │ Reading time: [X min]               │
   │ Body:        (first 300 chars...)    │
   │ Embed:       [if tool present]       │
   │                                      │
   │ [ Stage draft ] [ Edit first ]       │
   └──────────────────────────────────────┘
         ↓
3. David says "stage" → Claude pushes to Webflow as draft
   David says "edit" → Claude adjusts and re-previews
         ↓
4. David opens Webflow, reviews the staged item
         ↓
5. David publishes from Webflow (or tells Claude "publish live")
```

**Safety rules:**
- Default = stage (draft). NEVER auto-publish live.
- Always show full field preview before any CMS operation.
- Confirm thumbnail before uploading (describe what image will be used).
- After staging, tell David: "Staged successfully. Open Webflow to preview before publishing."

---

# 19. SHIPPED TOOLS REFERENCE

Three tools have been shipped for the Color Guidelines article. These establish the patterns for all future tools.

| Tool | Prefix | Section | File |
|------|--------|---------|------|
| Humbl Contrast | abc- | VI (Accessibility) | contrast.html |
| Humbl Mode | hmd- | VIII (Dark Mode) | mode.html |
| Humbl States | hst- | VII (Interaction States) | states.html |

**Key patterns established:**
- Color input cards (swatch + picker + hex, bidirectional sync)
- Toggle switch (role="switch", aria-checked)
- Style/shape selector (grouped buttons with dividers)
- State cards (frozen preview + hex + contrast ratio + tag)
- Live playground (dynamic CSS injection for pseudo-states)
- Output tabs (Tokens/CSS/Tailwind + syntax highlighting + copy)
- Component preview (interactive shadcn-style UI with tabs)

---

# 20. TOOLS PIPELINE

| Tool | Prefix | Section | What It Does |
|------|--------|---------|-------------|
| Humbl Twin | htw- | II | Paste print brand color → screen-optimized "Digital Twin" |
| Humbl Scale | hsc- | III | One color → full 50-950 primitive token scale |
| Humbl Ratio | hrt- | IV | Pick 3 colors → 60-30-10 layout visualizer |
| Humbl Psych | hps- | V | Input CTA color → psychology associations + Von Restorff check |
| Humbl Data | hdt- | IX | Generate categorical/sequential/diverging chart palettes |
| Humbl Tint | htn- | XI | Fix dead grays with 2-5% hue injection |
| Humbl Convert | hcv- | I | Universal color format converter (HEX↔RGB↔HSL↔HSB↔CSS) |
| Humbl Blind | hbl- | VI | Colorblind simulation (protanopia/deuteranopia/tritanopia) |

---

# 21. IMPLEMENTATION ORDER

Tell Claude in Cursor to work through these phases:

## Phase 1: Foundation
1. Create the folder structure from Section 2
2. Save antigravity-rules.md (Section 3)
3. Save each skill as a separate file in skills/ (Sections 7-14)
4. Configure MCP servers (Section 6)
5. Test Webflow MCP connection: "List my Webflow sites and collections"
6. Compare CMS fields (Section 5) against actual Webflow collections — adjust mapping

## Phase 2: Brand Audit
7. Tell Claude: "Extract brand values from humbldesign.io and fill brand-guidelines-SKILL.md"
8. Review and adjust the brand values
9. This becomes the foundation for all visual output going forward

## Phase 3: Planning Mode
10. Run onboarding (Section 16) — Claude researches David, then asks questions
11. Generate content pillars, voice guide, topic bank, and first calendar
12. Save all planning outputs to planning/ folder

## Phase 4: Prompt Builder
13. Update prompt builder with new blog format options (Section 15)
14. Add Creator Watch tab to prompt builder (Section 15)
15. Build LinkedIn Preview tool as embed (Section 17)

## Phase 5: Publish Pipeline
16. Map CMS fields to actual Webflow collection fields
17. Test staging a draft blog post via Webflow MCP
18. Build the CMS preview flow (Section 18)
19. Test full pipeline: write → preview → stage → publish

## Phase 6: Tool Polish
20. Rebrand existing tools (Contrast, Mode, States) with new brand guidelines
21. Build next pipeline tool (start with Humbl Scale or Humbl Blind)
22. Set up social content repurposing workflow

---

# END OF SPECIFICATION

This file contains everything needed to build the complete Humbl Engine Content Brain. Drop it into your Cursor project and tell Claude to start with Phase 1.

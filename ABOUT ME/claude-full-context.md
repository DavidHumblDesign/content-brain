# Claude Full Platform Context

This document contains the complete context of the Humbl Engine platform, the Content Brain prompt builder app, and the strict Anti-AI writing rules.

--- START OF content-brain-COMPLETE.md ---

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


--- END OF content-brain-COMPLETE.md ---

--- START OF CONTEXT.md ---

# Content Brain — Complete Build Specification

> This document contains everything needed to build Content Brain, a personal AI prompt builder for social media content creation.

---

## WHAT TO BUILD

Create a React + Vite app called "content-brain". Single-file architecture — everything in `src/App.jsx`. All styling inline (no CSS files). Dark theme. Uses DM Sans font from Google Fonts.

### Setup
```bash
npm create vite@latest content-brain -- --template react
cd content-brain
npm install
```

Delete `src/App.css` and `src/index.css`. Add this to `index.html` inside `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Replace `src/main.jsx` with:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import ContentBrain from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContentBrain />
  </React.StrictMode>
)
```

---

## PRODUCT OVERVIEW

Content Brain is a **prompt builder** — it does NOT call any AI APIs. It assembles highly structured prompts from the user's saved data (business profile, writing rules, inspiration sources, voice guidelines) and the user copies the prompt to paste into Gemini or Perplexity.

**Two content modes:**
- 🧠 Personal / Storytelling → user copies prompt to **Gemini**
- 🔍 Research / Data-driven → user copies prompt to **Perplexity**

---

## APP STRUCTURE — 6 Modules

Left sidebar navigation with these sections:

1. **📚 Sources** — Inspiration library (creators, articles, images)
2. **🏢 Business Profile** — All business data in collapsible sections
3. **⚙️ AI Writing Rules** — Three tabs: Global, Personal, Research
4. **✨ Prompt Maker** — The main feature: build prompts from all your data
5. **🪝 Hook Generator** — Build prompts for generating scroll-stopping hooks
6. **🗂️ Library** — Saved content with filtering

---

## DESIGN SYSTEM

### Colors
- Background: `#1A1816` (main), `#141210` (sidebar), `#2A2724` (cards)
- Borders: `#3A3632`
- Text: `#E8E4E0` (primary), `#8A8580` (secondary), `#6A6560` (muted)
- Accent: `#C5FF4A` (lime green — primary actions, active states)
- Personal mode: `#60A5FA` (blue)
- Research mode: `#A78BFA` (purple)
- Hooks: `#FFD700` (gold)
- Tag colors: green (mentions), gold (topics), blue (platforms), pink (formats), yellow (tones), purple (commands)

### Typography
- Font: `'DM Sans', -apple-system, sans-serif`
- All styling inline — no external CSS files

### UI Patterns
- Cards: `#2A2724` bg, `#3A3632` border, 10-12px border-radius
- Pills/buttons: 20px border-radius, 12px font size
- Active pill: `#C5FF4A` background with `#1A1816` text
- Inactive pill: `#1A1816` bg, `#8A8580` text, `#3A3632` border
- Hover: border color changes to `#C5FF4A`

---

## STATE STRUCTURE

All state lives in the main `ContentBrain` component and is passed as props.

### Profile State
```javascript
const DEFAULT_PROFILE = {
  name: "", role: "", background: "", story: "",
  businessName: "", oneLiner: "", description: "", model: "",
  service1Name: "", service1Desc: "", service1Pricing: "",
  service2Name: "", service2Desc: "", service2Pricing: "",
  icp: "", painPoints: "", transformation: "",
  adjectives: "", dos: "", donts: "", usps: "", socialProof: "",
  website: "", twitter: "", linkedin: "",
};
```

### Rules State
```javascript
const DEFAULT_RULES = {
  global: [
    { id: 1, text: "Write in first person, conversational tone.", active: true },
    { id: 2, text: "No corporate jargon or buzzwords.", active: true },
    { id: 3, text: "Twitter posts must be under 280 characters.", active: true },
    { id: 4, text: "Always end with a clear call-to-action or question.", active: true },
    { id: 5, text: "No hashtags unless I specifically ask.", active: true },
  ],
  personal: [
    { id: 10, text: "Use personal stories and real experiences only.", active: true },
    { id: 11, text: "Include specific numbers and results where possible.", active: true },
    { id: 12, text: "Hook: pattern interrupt or contrarian take.", active: true },
    { id: 13, text: "Vulnerability > perfection. Show the struggle.", active: true },
    { id: 14, text: "No motivational platitudes. Be specific and concrete.", active: false },
  ],
  research: [
    { id: 20, text: "Always cite sources with links.", active: true },
    { id: 21, text: "Include at least 2-3 specific data points (numbers, %, dates).", active: true },
    { id: 22, text: "Lead with the most surprising or counterintuitive finding.", active: true },
    { id: 23, text: "Present both sides, then give your personal take.", active: true },
    { id: 24, text: "No vague claims — be specific about which study, report, or source.", active: true },
  ],
};
```

### Sources (demo data for now)
```javascript
const DEMO_SOURCES = [
  { id: 1, type: "twitter", name: "@levelsio", url: "https://twitter.com/levelsio", autoScrape: true, lastScraped: "2h ago", postsStored: 142, contentTypes: ["written_short", "engagement_bait", "hooks"], notes: "Raw, punchy. Real numbers. No fluff whatsoever.", posts: [{ text: "Just hit $50k MRR on PhotoAI. No VC. No team. Just me and APIs.", date: "Jan 28", likes: 2841 }, { text: "Stop building features. Fix bugs. Talk to users. That's it.", date: "Jan 26", likes: 1203 }] },
  { id: 2, type: "linkedin", name: "Justin Welsh", url: "https://linkedin.com/in/justinwelsh", autoScrape: true, lastScraped: "6h ago", postsStored: 87, contentTypes: ["written_long", "educational", "hooks"], notes: "Hook → story → lesson → CTA pattern. Clean structure, easy to read on mobile.", posts: [{ text: "I left a $5M/yr job to build a one-person business.\n\nPeople said I was crazy.\n\n3 years later, I've made more than I ever did in corporate.", date: "Jan 29", likes: 8420 }] },
  { id: 3, type: "article", name: "Hooks That Convert", url: "https://example.com/hooks", autoScrape: false, postsStored: 1, contentTypes: ["educational", "hooks"], notes: "Great hook formulas and patterns. Reference for opening lines.", posts: [] },
  { id: 4, type: "image", name: "Carousel - Design Tips", url: null, autoScrape: false, postsStored: 1, contentTypes: ["carousel", "educational"], notes: "Clean slide design. Minimal text per slide. Strong visual hierarchy.", posts: [] },
];
```

### Constants
```javascript
const TOPICS = ["Business", "Artificial Intelligence", "Design", "Conversions", "Marketing", "Personal Brand", "Industry News", "Tech", "Productivity"];
const PLATFORMS = ["Twitter/X", "LinkedIn", "Blog", "Newsletter"];
const FORMATS = ["Short post", "Long-form post", "Carousel", "Thread", "Comment/Reply", "Research paper"];
const TONES = ["Educational", "Provocative", "Storytelling", "Data-driven", "Casual", "Authoritative"];
```

---

## THE 5-LAYER PROMPT ENGINE

This is the core of the product. The `buildPrompt()` function assembles a prompt from 5 layers based on user selections. It's a pure function that takes all state and returns a prompt string.

### Layer 1: System Role

**Personal mode:**
```
You are ghostwriting a social media post for me. Your job is to sound EXACTLY like me — not like an AI, not like a copywriter, like ME.

Key principles:
- Write from lived experience. Every claim should feel like something I actually did, saw, or learned.
- My audience is smart. Don't over-explain. Be direct.
- Imperfection is fine. Real posts have rough edges. Don't polish everything into sounding generic.
- Hook hard in the first line. If the first sentence doesn't stop the scroll, rewrite it.
- BANNED phrases (never use these): "In today's world", "It's no secret that", "Let me be honest", "Here's the thing", "In this post", "I want to share", "Let's dive in", "game-changer", "at the end of the day".
- No hashtags unless I specifically ask.
```

**Research mode:**
```
You are helping me create a research-backed social media post. Your job is to find real, current data and statistics on my topic, then help me turn them into a compelling post in MY voice.

Key principles:
- Search the web for current data, statistics, and sources on this topic.
- Every major claim needs a source — link to it.
- Lead with a surprising or counterintuitive finding — that's the hook.
- Don't just list facts. Weave them into a narrative with my perspective.
- Include at least 2-3 specific data points (numbers, percentages, dates).
- End with my personal take — what this data means for my audience.
- BANNED phrases: "In today's rapidly evolving landscape", "Studies show that" (say WHICH study), "As we all know", "It goes without saying", "game-changer".
```

### Layer 2: Business Context (SMART — adapts based on topic)

Pull from profile state. Key rules:
- **Skip empty fields** — never output "My background: undefined"
- If `contentMode === "personal"` or topic includes "Personal Brand" → include background, story
- If topic includes "Business", "Conversions", "Marketing" OR mode is research → include services, pricing
- **Always include** voice section (adjectives, DOs, DON'Ts) if filled
- Include social proof if available

Template:
```
=== WHO I AM ===
{name}, {role}
{oneLiner}

My background: {background}  ← only if personal mode
My story: {story}  ← only if personal mode

What I do:  ← only if business topics
- {service1Name} ({service1Pricing}): {service1Desc}
- {service2Name} ({service2Pricing}): {service2Desc}

Who I help: {icp}
Their pain: {painPoints}
The transformation: {transformation}

=== MY VOICE ===
I sound like: {adjectives}
I DO: {dos}
I DON'T: {donts}
My USPs: {usps}

Results I can reference: {socialProof}
```

### Layer 3: Rules Injection

Combine global active rules + mode-specific active rules:
```
=== WRITING RULES (follow these strictly) ===

General:
- {each active global rule}

Personal/Storytelling rules:  (or "Research/Data rules:")
- {each active mode rule}
```

### Layer 4: Content Task — Platform, Format, Tone Instructions

**Platform instructions (auto-injected when selected):**

Twitter/X:
```
PLATFORM: Twitter/X
- HARD LIMIT: 280 characters. Count carefully. 281 = unpublishable.
- No line breaks for aesthetic purposes — every line must carry meaning.
- Write for the timeline: punchy, opinion-driven, shareable.
- Great tweets are one of: a strong opinion, a surprising fact, or a useful insight in under 20 words.
```

LinkedIn:
```
PLATFORM: LinkedIn
- Ideal length: 150-300 words.
- First line is EVERYTHING — it shows before the "...see more" fold. Make it impossible to not click.
- Use line breaks generously (1 thought per line for mobile readability).
- LinkedIn rewards: personal stories, professional insights, contrarian takes.
- Avoid: inspirational platitudes, "I'm humbled", corporate speak, "Let me tell you a story."
- End with a question or CTA to drive comments.
```

Blog:
```
PLATFORM: Blog
- Length: 800-1500 words.
- Structure: Hook → Context → Main points → Actionable takeaway.
- Use subheadings every 200-300 words.
- Include at least one personal anecdote or specific example.
- Write for skimmers: bold key phrases, short paragraphs.
```

Newsletter:
```
PLATFORM: Newsletter
- Tone: like writing to a smart friend, not broadcasting.
- Structure: One big idea → supporting points → what to do about it.
- Include a personal opener (what you're thinking, what happened this week).
- Conversational — this is 1-to-1, not 1-to-many.
```

**Format instructions:**

Short post: `Under 100 words. Every word must earn its place. One idea only. Fragments fine.`
Long-form post: `200-400 words. Hook → Story/Evidence → Insight → CTA. Line breaks for readability.`
Carousel: `Slide 1: hook (8 words max). Each slide: 1 idea, 20 words max. 7-10 slides. Output as [Slide 1] [Slide 2] etc.`
Thread: `Tweet 1 is standalone hook. Number: 1/, 2/, 3/. End with summary + CTA. 5-10 tweets.`
Comment/Reply: `1-3 sentences. Unique perspective. Follow-up question.`
Research paper: `Thesis → Evidence → Counter-arguments → Conclusion. 400-800 words.`

**Tone instructions:**

Educational: `Teach something. 'Here's how' and 'here's why' framing.`
Provocative: `Challenge conventional wisdom. Contrarian take upfront.`
Storytelling: `Lead with specific moment. Sensory details. Build tension.`
Data-driven: `Lead with surprising number. Contrast expectations vs reality.`
Casual: `Like texting a smart friend. Short sentences. Fragments okay.`
Authoritative: `Deep expertise. Be definitive. No hedging.`

Also add: `TOPIC FOCUS: {selected topics}` if topics are selected.

### Layer 5: Sources + Idea + Output Format

**Sources (when selected):**
```
=== INSPIRATION / STYLE REFERENCE ===
Study these creators' patterns and adapt to MY voice (don't copy — learn from):

→ {source.name} ({source.type})
  What I like: {source.notes}
  Their style:
  "{source.posts[0].text}"
  "{source.posts[1].text}"
```

**User's idea + slash command translations:**
```
=== MY IDEA / DIRECTION ===
{ideaText}

Additional instructions:
- {translated slash commands}
```

Slash command translations:
- `/hook` → "Start with an exceptionally strong hook — pattern interrupt, contrarian, or curiosity-driven."
- `/example` → "Include a specific real-world example or case study. Concrete: names, numbers, outcomes."
- `/stats` → "Include relevant statistics and data points."
- `/quote` → "Include a relevant quote or testimonial."
- `/cta` → "End with a clear, specific call-to-action."
- `/rewrite` → "Rewrite the text above — more engaging, concise, impactful."
- `/expand` → "Expand the previous point with more depth."
- `/shorten` → "Cut 50% while keeping the core message."
- `/listicle` → "Structure as a numbered list (5-7 items)."
- `/thread` → "Break into a Twitter thread (5-10 tweets)."
- `/controversial` → "Add a controversial or contrarian angle."
- `/question` → "End with an engaging question that drives comments."

**Output format (always appended):**
```
=== WHAT I NEED FROM YOU ===

Generate 3 genuinely different versions of this post. For each:

1. **Hook** — The opening line (most important part — spend extra effort here)
2. **Full post** — Complete text, ready to copy-paste and publish
3. **Angle** — 1 sentence explaining your approach (so I learn what works)

{if Twitter: "⚠️ HARD LIMIT: Each version MUST be under 280 characters."}
{if LinkedIn: "Format for LinkedIn: line breaks between thoughts for mobile readability."}

Make each version genuinely DIFFERENT — not rephrased. Vary:
- Hook style (question vs bold statement vs story opener vs data point)
- Structure (short vs long, list vs narrative, problem→solution vs story→lesson)
- Angle (personal vs educational vs provocative vs empathetic)
```

---

## HOOK GENERATOR PROMPT

Separate `buildHooksPrompt()` function for the Hook Generator module:

```
You are a hook-writing specialist. Generate scroll-stopping opening lines for social media posts.

A great hook does ONE of these:
- Bold, contrarian claim ("Most landing pages are designed to fail.")
- Specific, surprising result ("I 3x'd my conversion rate by removing one button.")
- Information gap ("The biggest mistake I see founders make isn't what you think.")
- Pattern interrupt ("I stopped designing pretty websites 2 years ago.")
- Leading with a number ("I reviewed 200 landing pages. 80% had the same problem.")
- Direct pain address ("Your pricing page is losing you customers right now.")

RULES:
- Each hook: 1 sentence, max 15 words.
- No clichés: "In today's world", "Have you ever wondered", "Let me tell you".
- No yes/no questions (bad: "Want more clients?" — good: "Why do most freelancers undercharge by 40%?")
- Every hook should make someone physically STOP scrolling.

{profile context: name, role, one-liner, voice adjectives}
{topic if provided}
{selected hook source examples}

Generate 10 hooks. For each:
1. The hook text
2. Style label (Contrarian / Pattern interrupt / Data+Curiosity / Direct address / Unexpected / Story opener)
3. Best platform (Twitter or LinkedIn)
```

---

## UI SPECIFICATIONS

### Sidebar (220px wide)
- Logo: "Content Brain" in `#C5FF4A`, subtitle "Personal AI Prompt Builder" in `#6A6560`
- Nav buttons with icons + labels
- Library shows bookmark count badge
- Business Profile shows filled field count
- Bottom: data status card (sources count, profile fields, rules count, saved items)

### Sources Section
- List of source cards with type icon, name, content type pills, scrape status
- Click card → detail view with notes textarea and saved posts
- "+ Add" button → form with type selector (twitter/linkedin/article/image), URL input, content type multi-select

### Business Profile Section
- Progress bar showing filled/total fields
- Collapsible accordion sections: Personal Info, Business, Services & Pricing, Audience, Brand & Voice, Online Presence
- Each section shows filled count badge
- Mix of text inputs and textareas

### AI Writing Rules Section
- 3 tab buttons: 🌐 Global (green), 🧠 Personal (blue), 🔍 Research (purple)
- Each tab shows active/total count
- Active tab indicator bar
- Add rule input + button (color matches tab)
- Rule list with checkbox toggle + delete button
- Bottom: prompt injection summary showing counts per tab

### Prompt Maker Section (MAIN FEATURE)
- Mode selector: two large cards (Personal/Storytelling vs Research/Data-driven)
- Rich text editor with toolbar (bold, italic, strikethrough, @, #, /, emoji)
- Autocomplete dropdowns for @mentions, #topics, /commands
- Topic pills row
- 3-column grid: Platform buttons, Format buttons, Tone buttons
- "Inspire from" source pills
- Data status bar (mode, profile fields, rules count, sources count)
- Build button (full width, colored per mode)
- Output panel with prompt preview, char/token count, copy button, tip text

### Rich Text Editor Details
- contentEditable div with placeholder text
- Tags are non-editable spans with data attributes and color-coded backgrounds
- Typing @ triggers source dropdown, # triggers topic dropdown, / triggers command dropdown
- Arrow keys + Enter/Tab to select from dropdown
- ⌘B for bold, ⌘I for italic
- Word count display
- Bidirectional sync: clicking a topic/source pill inserts/removes the tag in the editor

### Hook Generator Section
- Topic input field
- Hook style source selector (filters sources that have "hooks" content type)
- Build button (gold colored)
- Output panel with prompt preview and copy button

### Library Section
- Filters: bookmark toggle, feedback (👍/👎), tag pills
- Content cards with title, platform badge, tags, expand/collapse

---

## DATA FLOW

```
ContentBrain (main component)
├── profile state ──────→ BusinessSection (edit)
│                   └──→ PromptMaker (read → buildPrompt)
│                   └──→ HookGenerator (read → buildHooksPrompt)
├── rules state ────────→ RulesSection (edit)
│                   └──→ PromptMaker (read → buildPrompt)
├── sources (constant) ─→ SourcesSection (display)
│                   └──→ PromptMaker (read → buildPrompt)
│                   └──→ HookGenerator (read → buildHooksPrompt)
├── library state ──────→ LibrarySection (display/filter)
```

---

## PRIORITY FEATURES TO BUILD AFTER MVP

1. **localStorage persistence** — save profile, rules, sources, library; load on start; auto-save
2. **Sources CRUD** — add/edit/delete real sources (replace demo data)
3. **Prompt history** — save previously built prompts
4. **Editable prompt templates** — let user customize each layer
5. **Source scraping** (future — needs backend)

---

## COMPLETE WORKING CODE

Below is the entire working `src/App.jsx` file. This is the reference implementation with the full 5-layer prompt engine, all UI components, bidirectional editor sync, and proper state management.

```jsx
import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

// ─── CONSTANTS ─────────────────────────────────────────
const SECTIONS = [
  { id: "sources", label: "Sources", icon: "📚" },
  { id: "business", label: "Business Profile", icon: "🏢" },
  { id: "rules", label: "AI Writing Rules", icon: "⚙️" },
  { id: "generator", label: "Prompt Maker", icon: "✨" },
  { id: "hooks", label: "Hook Generator", icon: "🪝" },
  { id: "library", label: "Library", icon: "🗂️" },
];

const CONTENT_TYPES_SRC = [
  { id: "written_short", label: "Written — Short" }, { id: "written_long", label: "Written — Long" },
  { id: "carousel", label: "Carousel" }, { id: "thread", label: "Thread" },
  { id: "video_short", label: "Video — Short" }, { id: "video_long", label: "Video — Long" },
  { id: "engagement_bait", label: "Engagement Bait" }, { id: "storytelling", label: "Storytelling" },
  { id: "educational", label: "Educational" }, { id: "curated", label: "Curated" },
  { id: "case_study", label: "Case Study" }, { id: "commentary", label: "Commentary" },
  { id: "hooks", label: "Hooks / Openers" },
];

const DEMO_SOURCES = [
  { id: 1, type: "twitter", name: "@levelsio", url: "https://twitter.com/levelsio", autoScrape: true, lastScraped: "2h ago", postsStored: 142, contentTypes: ["written_short", "engagement_bait", "hooks"], notes: "Raw, punchy. Real numbers. No fluff whatsoever.", posts: [{ text: "Just hit $50k MRR on PhotoAI. No VC. No team. Just me and APIs.", date: "Jan 28", likes: 2841 }, { text: "Stop building features. Fix bugs. Talk to users. That's it.", date: "Jan 26", likes: 1203 }] },
  { id: 2, type: "linkedin", name: "Justin Welsh", url: "https://linkedin.com/in/justinwelsh", autoScrape: true, lastScraped: "6h ago", postsStored: 87, contentTypes: ["written_long", "educational", "hooks"], notes: "Hook → story → lesson → CTA pattern. Clean structure, easy to read on mobile.", posts: [{ text: "I left a $5M/yr job to build a one-person business.\n\nPeople said I was crazy.\n\n3 years later, I've made more than I ever did in corporate.", date: "Jan 29", likes: 8420 }] },
  { id: 3, type: "article", name: "Hooks That Convert", url: "https://example.com/hooks", autoScrape: false, postsStored: 1, contentTypes: ["educational", "hooks"], notes: "Great hook formulas and patterns. Reference for opening lines.", posts: [] },
  { id: 4, type: "image", name: "Carousel - Design Tips", url: null, autoScrape: false, postsStored: 1, contentTypes: ["carousel", "educational"], notes: "Clean slide design. Minimal text per slide. Strong visual hierarchy.", posts: [] },
];

const TOPICS = ["Business", "Artificial Intelligence", "Design", "Conversions", "Marketing", "Personal Brand", "Industry News", "Tech", "Productivity"];
const PLATFORMS = ["Twitter/X", "LinkedIn", "Blog", "Newsletter"];
const FORMATS = ["Short post", "Long-form post", "Carousel", "Thread", "Comment/Reply", "Research paper"];
const TONES = ["Educational", "Provocative", "Storytelling", "Data-driven", "Casual", "Authoritative"];

const SLASH_COMMANDS = [
  { cmd: "hook", icon: "🪝", label: "Insert hook", desc: "Generate a hook" },
  { cmd: "example", icon: "💡", label: "Add example", desc: "Insert case study" },
  { cmd: "stats", icon: "📊", label: "Add statistics", desc: "Pull relevant stats" },
  { cmd: "quote", icon: "💬", label: "Insert quote", desc: "Add a testimonial" },
  { cmd: "cta", icon: "🎯", label: "Add CTA", desc: "Call-to-action" },
  { cmd: "rewrite", icon: "🔄", label: "Rewrite above", desc: "AI rewrites text" },
  { cmd: "expand", icon: "📝", label: "Expand", desc: "Expand previous point" },
  { cmd: "shorten", icon: "✂️", label: "Shorten", desc: "More concise" },
  { cmd: "listicle", icon: "📋", label: "Make list", desc: "Numbered list format" },
  { cmd: "thread", icon: "🧵", label: "Thread it", desc: "Break into thread" },
  { cmd: "controversial", icon: "🔥", label: "Make spicy", desc: "Controversial angle" },
  { cmd: "question", icon: "❓", label: "End with question", desc: "Closing question" },
];

const EMOJI_QUICK = ["🔥", "💡", "🚀", "💰", "⚡", "🎯", "📈", "🧠", "💪", "👀", "🤔", "✅", "❌", "→", "•"];

const CONTENT_MODES = [
  { id: "personal", label: "Personal / Storytelling", icon: "🧠", tool: "Gemini", color: "#60A5FA", desc: "Personal stories, hot takes, experiences, engagement" },
  { id: "research", label: "Research / Data-driven", icon: "🔍", tool: "Perplexity", color: "#A78BFA", desc: "Industry news, data, trends, analysis with citations" },
];

const TAG_COLORS = {
  mention: { bg: "rgba(197,255,74,0.15)", color: "#C5FF4A" },
  topic: { bg: "rgba(255,215,0,0.12)", color: "#FFD700" },
  platform: { bg: "rgba(96,165,250,0.12)", color: "#60A5FA" },
  format: { bg: "rgba(244,114,182,0.12)", color: "#F472B6" },
  tone: { bg: "rgba(251,191,36,0.12)", color: "#FBBF24" },
  command: { bg: "rgba(167,139,250,0.12)", color: "#A78BFA" },
};

// ─── DEFAULT DATA ──────────────────────────────────────
const DEFAULT_PROFILE = {
  name: "", role: "", background: "", story: "",
  businessName: "", oneLiner: "", description: "", model: "",
  service1Name: "", service1Desc: "", service1Pricing: "",
  service2Name: "", service2Desc: "", service2Pricing: "",
  icp: "", painPoints: "", transformation: "",
  adjectives: "", dos: "", donts: "", usps: "", socialProof: "",
  website: "", twitter: "", linkedin: "",
};

const PROFILE_LABELS = {
  name: "Full Name", role: "Role / Title", background: "Background", story: "My Story",
  businessName: "Business Name", oneLiner: "One-liner", description: "Description", model: "Business Model",
  service1Name: "Service 1 — Name", service1Desc: "Service 1 — Details", service1Pricing: "Service 1 — Pricing",
  service2Name: "Service 2 — Name", service2Desc: "Service 2 — Details", service2Pricing: "Service 2 — Pricing",
  icp: "Ideal Customer (ICP)", painPoints: "Their Pain Points", transformation: "Transformation I Deliver",
  adjectives: "5 Voice Adjectives", dos: "I DO (voice rules)", donts: "I DON'T (voice rules)", usps: "My USPs", socialProof: "Social Proof / Results",
  website: "Website", twitter: "Twitter/X", linkedin: "LinkedIn",
};

const DEFAULT_RULES = {
  global: [
    { id: 1, text: "Write in first person, conversational tone.", active: true },
    { id: 2, text: "No corporate jargon or buzzwords.", active: true },
    { id: 3, text: "Twitter posts must be under 280 characters.", active: true },
    { id: 4, text: "Always end with a clear call-to-action or question.", active: true },
    { id: 5, text: "No hashtags unless I specifically ask.", active: true },
  ],
  personal: [
    { id: 10, text: "Use personal stories and real experiences only.", active: true },
    { id: 11, text: "Include specific numbers and results where possible.", active: true },
    { id: 12, text: "Hook: pattern interrupt or contrarian take.", active: true },
    { id: 13, text: "Vulnerability > perfection. Show the struggle.", active: true },
    { id: 14, text: "No motivational platitudes. Be specific and concrete.", active: false },
  ],
  research: [
    { id: 20, text: "Always cite sources with links.", active: true },
    { id: 21, text: "Include at least 2-3 specific data points (numbers, %, dates).", active: true },
    { id: 22, text: "Lead with the most surprising or counterintuitive finding.", active: true },
    { id: 23, text: "Present both sides, then give your personal take.", active: true },
    { id: 24, text: "No vague claims — be specific about which study, report, or source.", active: true },
  ],
};

// ═══════════════════════════════════════════════════════
// ─── 5-LAYER PROMPT ENGINE ─────────────────────────────
// ═══════════════════════════════════════════════════════

const PLATFORM_INST = {
  "Twitter/X": `PLATFORM: Twitter/X\n- HARD LIMIT: 280 characters. Count carefully. 281 = unpublishable.\n- No line breaks for aesthetic purposes — every line must carry meaning.\n- Write for the timeline: punchy, opinion-driven, shareable.\n- Great tweets are one of: a strong opinion, a surprising fact, or a useful insight in under 20 words.`,
  "LinkedIn": `PLATFORM: LinkedIn\n- Ideal length: 150-300 words.\n- First line is EVERYTHING — it shows before the "...see more" fold. Make it impossible to not click.\n- Use line breaks generously (1 thought per line for mobile readability).\n- LinkedIn rewards: personal stories, professional insights, contrarian takes.\n- Avoid: inspirational platitudes, "I'm humbled", corporate speak, "Let me tell you a story."\n- End with a question or CTA to drive comments.`,
  "Blog": `PLATFORM: Blog\n- Length: 800-1500 words.\n- Structure: Hook → Context → Main points → Actionable takeaway.\n- Use subheadings every 200-300 words.\n- Include at least one personal anecdote or specific example.\n- Write for skimmers: bold key phrases, short paragraphs.`,
  "Newsletter": `PLATFORM: Newsletter\n- Tone: like writing to a smart friend, not broadcasting.\n- Structure: One big idea → supporting points → what to do about it.\n- Include a personal opener (what you're thinking, what happened this week).\n- Conversational — this is 1-to-1, not 1-to-many.`,
};

const FORMAT_INST = {
  "Short post": `FORMAT: Short post — Under 100 words. Every word must earn its place. One idea only. Fragments are fine. Punchier > longer.`,
  "Long-form post": `FORMAT: Long-form post — 200-400 words. Structure: Hook → Story/Evidence → Insight → CTA. Line breaks for readability. No walls of text.`,
  "Carousel": `FORMAT: Carousel (slide sequence)\n- Slide 1: Bold hook/headline (8 words max).\n- Each slide: 1 idea, 20 words max per slide.\n- Last slide: CTA or key takeaway.\n- 7-10 slides total.\n- Output as: [Slide 1] ... [Slide 2] ... etc.`,
  "Thread": `FORMAT: Thread (multi-post sequence)\n- Tweet 1 is the hook — must work standalone as a banger.\n- Each tweet should be valuable on its own.\n- Number: 1/, 2/, 3/ etc.\n- End with summary tweet + CTA.\n- 5-10 tweets.`,
  "Comment/Reply": `FORMAT: Comment/Reply — Short, punchy (1-3 sentences). Add a unique perspective, don't just agree. Ask a follow-up question.`,
  "Research paper": `FORMAT: Research-style post — Thesis → Evidence → Counter-arguments → Conclusion. 400-800 words. Every claim backed by data.`,
};

const TONE_INST = {
  "Educational": "TONE: Educational. Teach something. Break complexity into simple steps. 'Here's how' and 'here's why' framing. Be the expert who makes things simple.",
  "Provocative": "TONE: Provocative. Challenge conventional wisdom. Contrarian take upfront. 'Unpopular opinion' energy without saying it. Make people stop and reconsider.",
  "Storytelling": "TONE: Storytelling. Lead with a specific moment in time. Sensory details. Build tension before the insight. Movie scene, not a lecture.",
  "Data-driven": "TONE: Data-driven. Lead with the most surprising number. Contrast expectations vs reality. 'X% think Y, but actually Z' framing.",
  "Casual": "TONE: Casual. Like texting a smart friend. Short sentences. Fragments okay. Show personality. Don't overthink it.",
  "Authoritative": "TONE: Authoritative. Deep expertise. Reference your experience. Be definitive, not wishy-washy. No hedging.",
};

const CMD_TRANSLATE = {
  hook: "Start with an exceptionally strong hook — pattern interrupt, contrarian, or curiosity-driven. First line must make it impossible to not read the second.",
  example: "Include a specific real-world example or case study. Concrete: names, numbers, outcomes.",
  stats: "Include relevant statistics and data points. Specific: which study, what year, what sample size.",
  quote: "Include a relevant quote or testimonial that supports the main point.",
  cta: "End with a clear, specific call-to-action. Not 'follow me' but something that creates value.",
  rewrite: "Rewrite the text above — more engaging, concise, impactful. Cut filler. Sharpen the hook.",
  expand: "Expand the previous point with more depth, examples, and nuance.",
  shorten: "Cut 50% while keeping the core message. Kill all fluff.",
  listicle: "Structure as a numbered list (5-7 items). Each item actionable and specific.",
  thread: "Break into a Twitter thread (5-10 tweets). Each tweet standalone valuable.",
  controversial: "Add a controversial or contrarian angle. Challenge something most people assume is true.",
  question: "End with an engaging question that drives comments. Something people can answer from their own experience.",
};

function buildPrompt({ contentMode, profile, rules, selTopics, selPlatform, selFormat, selTone, selSources, allSources, ideaText, commands }) {
  const v = (key) => (profile[key] || "").trim();
  const has = (key) => !!v(key);
  let o = "";

  // ═══ LAYER 1: System Role ═══
  if (contentMode === "personal") {
    o += `You are ghostwriting a social media post for me. Your job is to sound EXACTLY like me — not like an AI, not like a copywriter, like ME.\n\nKey principles:\n- Write from lived experience. Every claim should feel like something I actually did, saw, or learned.\n- My audience is smart. Don't over-explain. Be direct.\n- Imperfection is fine. Real posts have rough edges. Don't polish everything into sounding generic.\n- Hook hard in the first line. If the first sentence doesn't stop the scroll, rewrite it.\n- BANNED phrases (never use these): "In today's world", "It's no secret that", "Let me be honest", "Here's the thing", "In this post", "I want to share", "Let's dive in", "game-changer", "at the end of the day".\n- No hashtags unless I specifically ask.\n\n`;
  } else {
    o += `You are helping me create a research-backed social media post. Your job is to find real, current data and statistics on my topic, then help me turn them into a compelling post in MY voice.\n\nKey principles:\n- Search the web for current data, statistics, and sources on this topic.\n- Every major claim needs a source — link to it.\n- Lead with a surprising or counterintuitive finding — that's the hook.\n- Don't just list facts. Weave them into a narrative with my perspective.\n- Include at least 2-3 specific data points (numbers, percentages, dates).\n- End with my personal take — what this data means for my audience.\n- BANNED phrases: "In today's rapidly evolving landscape", "Studies show that" (say WHICH study), "As we all know", "It goes without saying", "game-changer".\n\n`;
  }

  // ═══ LAYER 2: Business Context (smart selection) ═══
  const hasProfile = Object.keys(profile).some(k => has(k));
  if (hasProfile) {
    o += `=== WHO I AM ===\n`;
    const identity = [v("name"), v("role")].filter(Boolean).join(", ");
    if (identity) o += `${identity}\n`;
    if (has("oneLiner")) o += `${v("oneLiner")}\n`;
    o += `\n`;
    if (contentMode === "personal" || selTopics.some(t => ["Personal Brand"].includes(t))) {
      if (has("background")) o += `My background: ${v("background")}\n`;
      if (has("story")) o += `My story: ${v("story")}\n`;
      if (has("background") || has("story")) o += `\n`;
    }
    if (selTopics.some(t => ["Business", "Conversions", "Marketing"].includes(t)) || contentMode === "research") {
      const svcs = [];
      if (has("service1Name")) svcs.push(`${v("service1Name")}${has("service1Pricing") ? ` (${v("service1Pricing")})` : ""}: ${v("service1Desc")}`);
      if (has("service2Name")) svcs.push(`${v("service2Name")}${has("service2Pricing") ? ` (${v("service2Pricing")})` : ""}: ${v("service2Desc")}`);
      if (svcs.length) { o += `What I do:\n${svcs.map(x => `- ${x}`).join("\n")}\n\n`; }
    }
    if (has("icp")) o += `Who I help: ${v("icp")}\n`;
    if (has("painPoints")) o += `Their pain: ${v("painPoints")}\n`;
    if (has("transformation")) o += `The transformation: ${v("transformation")}\n`;
    if (has("icp") || has("painPoints")) o += `\n`;
    if (has("adjectives") || has("dos") || has("donts")) {
      o += `=== MY VOICE ===\n`;
      if (has("adjectives")) o += `I sound like: ${v("adjectives")}\n`;
      if (has("dos")) o += `I DO: ${v("dos")}\n`;
      if (has("donts")) o += `I DON'T: ${v("donts")}\n`;
      if (has("usps")) o += `My USPs: ${v("usps")}\n`;
      o += `\n`;
    }
    if (has("socialProof")) o += `Results I can reference: ${v("socialProof")}\n\n`;
  }

  // ═══ LAYER 3: Rules ═══
  const gActive = rules.global.filter(r => r.active);
  const mActive = (rules[contentMode] || []).filter(r => r.active);
  if (gActive.length || mActive.length) {
    o += `=== WRITING RULES (follow these strictly) ===\n`;
    if (gActive.length) { o += `\nGeneral:\n`; gActive.forEach(r => o += `- ${r.text}\n`); }
    if (mActive.length) { o += `\n${contentMode === "personal" ? "Personal/Storytelling" : "Research/Data"} rules:\n`; mActive.forEach(r => o += `- ${r.text}\n`); }
    o += `\n`;
  }

  // ═══ LAYER 4: Content Task ═══
  if (selPlatform && PLATFORM_INST[selPlatform]) o += PLATFORM_INST[selPlatform] + "\n\n";
  if (selFormat && FORMAT_INST[selFormat]) o += FORMAT_INST[selFormat] + "\n\n";
  if (selTone && TONE_INST[selTone]) o += TONE_INST[selTone] + "\n\n";
  if (selTopics.length) o += `TOPIC FOCUS: ${selTopics.join(", ")}\n\n`;

  // ═══ LAYER 5: Sources + Idea + Output ═══
  const pickedSrcs = selSources.map(id => allSources.find(s => s.id === id)).filter(Boolean);
  if (pickedSrcs.length) {
    o += `=== INSPIRATION / STYLE REFERENCE ===\nStudy these creators' patterns and adapt to MY voice (don't copy — learn from):\n`;
    pickedSrcs.forEach(src => {
      o += `\n→ ${src.name} (${src.type})\n  What I like: ${src.notes}\n`;
      if (src.posts.length) { o += `  Their style:\n`; src.posts.slice(0, 2).forEach(p => o += `  "${p.text}"\n`); }
    });
    o += `\n`;
  }
  if (ideaText) {
    o += `=== MY IDEA / DIRECTION ===\n${ideaText}\n`;
    const cmds = (commands || []).filter(c => CMD_TRANSLATE[c]);
    if (cmds.length) { o += `\nAdditional instructions:\n`; cmds.forEach(c => o += `- ${CMD_TRANSLATE[c]}\n`); }
    o += `\n`;
  }
  o += `=== WHAT I NEED FROM YOU ===\n\nGenerate 3 genuinely different versions of this post. For each:\n\n1. **Hook** — The opening line (most important part — spend extra effort here)\n2. **Full post** — Complete text, ready to copy-paste and publish\n3. **Angle** — 1 sentence explaining your approach (so I learn what works)\n`;
  if (selPlatform === "Twitter/X") o += `\n⚠️ HARD LIMIT: Each version MUST be under 280 characters. Count carefully.\n`;
  if (selPlatform === "LinkedIn") o += `\nFormat for LinkedIn: line breaks between thoughts for mobile readability.\n`;
  o += `\nMake each version genuinely DIFFERENT — not rephrased. Vary:\n- Hook style (question vs bold statement vs story opener vs data point)\n- Structure (short vs long, list vs narrative, problem→solution vs story→lesson)\n- Angle (personal vs educational vs provocative vs empathetic)\n`;
  return o;
}

function buildHooksPrompt({ profile, topic, hookSources }) {
  const v = (key) => (profile[key] || "").trim();
  const has = (key) => !!v(key);
  let o = `You are a hook-writing specialist. Generate scroll-stopping opening lines for social media posts.\n\nA great hook does ONE of these:\n- Bold, contrarian claim ("Most landing pages are designed to fail.")\n- Specific, surprising result ("I 3x'd my conversion rate by removing one button.")\n- Information gap ("The biggest mistake I see founders make isn't what you think.")\n- Pattern interrupt ("I stopped designing pretty websites 2 years ago.")\n- Leading with a number ("I reviewed 200 landing pages. 80% had the same problem.")\n- Direct pain address ("Your pricing page is losing you customers right now.")\n\nRULES:\n- Each hook: 1 sentence, max 15 words.\n- No clichés: "In today's world", "Have you ever wondered", "Let me tell you".\n- No yes/no questions (bad: "Want more clients?" — good: "Why do most freelancers undercharge by 40%?")\n- Every hook should make someone physically STOP scrolling.\n\n`;
  if (has("name") || has("role")) { o += `About me: ${[v("name"), v("role")].filter(Boolean).join(", ")}\n`; if (has("oneLiner")) o += `${v("oneLiner")}\n`; o += `\n`; }
  if (has("adjectives")) o += `My voice: ${v("adjectives")}\n\n`;
  if (topic) o += `TOPIC: ${topic}\n\n`;
  if (hookSources.length) {
    o += `=== HOOK STYLE REFERENCES ===\n`;
    hookSources.forEach(src => { o += `→ ${src.name}: ${src.notes}\n`; src.posts.slice(0, 2).forEach(p => o += `  Example: "${p.text.split("\n")[0]}"\n`); });
    o += `\n`;
  }
  o += `Generate 10 hooks. For each:\n1. The hook text\n2. Style label (Contrarian / Pattern interrupt / Data+Curiosity / Direct address / Unexpected / Story opener)\n3. Best platform (Twitter or LinkedIn)\n`;
  return o;
}

// NOTE: The rest of the code implements the UI components:
// - IdeaEditor (rich text editor with @mentions, #topics, /commands, bidirectional sync)
// - SourcesSection (list + detail view + add form)
// - BusinessSection (collapsible accordion with real state binding)
// - RulesSection (3 tabs with add/toggle/delete)
// - PromptMaker (mode selector, editor, filters, build button, output panel)
// - HookGenerator (topic input, source selector, build button, output)
// - LibrarySection (filters, expandable cards)
// - ContentBrain (main component, all state, sidebar, routing)
//
// The complete UI code is in the App.jsx file provided separately.
// This document focuses on the ARCHITECTURE and PROMPT ENGINE
// which are the most critical parts to get right.
```

---

## FIRST PROMPT FOR ANTIGRAVITY AGENT

After uploading this file as `CONTEXT.md`, tell the agent:

> "Read CONTEXT.md — it contains the complete spec for Content Brain, a prompt builder app. The full working code is already in src/App.jsx. Run `npm run dev` to start it. Then help me add localStorage persistence so my data survives page refreshes."


--- END OF CONTEXT.md ---

--- START OF anti-ai-rules.md ---

# Anti-Robot (Anti-AI) Rules

These are the strict rules applied to prevent AI-generated content from sounding artificial, robotic, or full of fluff.

## The Banned Words List
**Verbs:** delve, harness, unlock, leverage, elevate, foster, unleash, empower, optimize, streamline, revolutionize, amplify, cultivate, navigate, unpack, underscore, garner, showcase, reimagine, redefine, spearhead, catalyze, synergize, democratize, accelerate, supercharge, turbocharge, accentuate, surpass, boast.

**Adjectives:** game-changing, revolutionary, cutting-edge, state-of-the-art, groundbreaking, innovative, disruptive, seamless, robust, holistic, dynamic, scalable, agile, actionable, next-generation, fascinating, remarkable, captivating, majestic, vibrant, meticulous, unparalleled, pivotal, crucial, intricate, versatile, transformative, proactive, visionary, noteworthy, commendable, trailblazing, pioneering, unprecedented, intuitive, immersive, predictive, frictionless, mission-critical, paradigm-shifting, future-proof, hyper-personalized, results-driven.

**Nouns & Compounds:** tapestry, landscape, testament, realm, paradigm, synergy, ecosystem, interplay, bandwidth, touchpoint, deep dive, thought leader, game-changer, value-add, end-to-end, table stakes, low-hanging fruit, north star, playbook.

## Banned Words Reference
* NEVER use any word from the Banned Words list. If you catch yourself reaching for a fancy verb, use the plain English equivalent instead.
* No fluffy adjectives from the Banned Words list. If something is good, SHOW why with specifics — don't label it with empty superlatives.
* Use simple words over fancy ones: 'help' not 'facilitate', 'use' not 'utilize', 'to' not 'in order to', 'because' not 'due to the fact that', 'improve' not 'optimize'.

## Banned Phrases
* NEVER open with: 'In today's...', 'Let's face it', 'Let's be honest', 'Picture this:', 'Imagine this:', 'You might be wondering', 'Here's the thing', 'The truth is', 'The reality is', 'Let's dive in'.
* NEVER close with: 'In conclusion', 'To sum up', 'At the end of the day', 'Key takeaways:', 'Final thoughts:', 'Ready to take your X to the next level?', 'The time to act is now', 'What are you waiting for?'.
* No business buzzwords: 'synergy', 'ecosystem', 'touchpoint', 'bandwidth', 'low-hanging fruit', 'move the needle', 'paradigm shift', 'thought leader', 'best practices', 'value-add', 'end-to-end', 'table stakes'.

## Structural Patterns
* No hedging language: avoid 'It's worth noting that', 'It's important to understand', 'It should be mentioned', 'One might argue', 'It could be said'. Commit to statements — don't soften every claim with 'may', 'might', 'potentially', 'arguably'.
* No mechanical transitions: don't start sentences with 'However,', 'Moreover,', 'Furthermore,', 'Additionally,', 'Nevertheless,', 'Consequently,', 'Thus,'. Let ideas flow naturally.
* No 'not only/just X, but also Y' structures. No 'While X is important, Y is crucial'. No 'On one hand... on the other hand'. Write direct statements instead.
* No meta-commentary: never say 'As mentioned earlier', 'As we discussed', 'Remember that', 'Don't forget', 'Keep in mind that'. Don't tell the reader what you're about to tell them.

## Tone & Formatting
* No false enthusiasm: no excessive exclamation points, no 'Exciting news!', 'Amazing results!', 'Incredible impact!'. If something is good, show why — don't shout it.
* No fake relatability: never say 'We've all been there', 'You know the feeling', 'Sound familiar?'. Don't create strawman problems or oversimplify emotions.
* No rhetorical question filler: don't use 'Why does this matter?', 'What does this mean for you?', 'So what's the solution?' as lazy transitions. Don't ask a question then immediately answer it.
* No connector clichés: never use 'That's where X comes in', 'This is where X shines', 'Enter: [solution]', 'But wait, there's more', 'And that's not all'.
* Don't overuse em dashes (—) for dramatic pauses. Don't default to bullet points when a paragraph works better. Don't put a colon before every explanation. Don't bold every key term mechanically. Don't use excessive headers or subheaders for short content.
* Vary sentence structure and paragraph length naturally. Don't make every paragraph 3-4 sentences. Don't start multiple sentences the same way. Don't repeat the same key term in every sentence.
* No overexplaining: don't explain concepts the audience already knows. Don't use 100 words when 20 will do. If it needs a 'TLDR' it's too long.
* No vague attribution: never say 'Studies show', 'Research indicates', 'According to experts', 'X% of businesses' without naming the specific source.

## LinkedIn Bro Formulas
* NEVER use these viral formulas: 'In a world where [X], [Y] becomes [Z]' / 'Most people [lazy thing]. The few who win [hard thing]' / 'Stop doing X. Start doing Y' / 'It's not [A]. It's not [B]. It's [C]' / 'If you're not [doing X], you're already behind' / 'The real [work] isn't [visible]. It's [invisible]' / 'You don't need more [resource]. You need [virtue]' / 'It's never been easier to [X]. Never been harder to [Y]'. Write original structures.

## Padding Phrases
* Cut zero-value padding: never write 'plays a crucial role in', 'highlighting the importance of', 'it is important to remember that', 'it is essential to note', 'it is worth mentioning that', 'may potentially offer some benefits', 'often considered to be'. Every sentence must add new information.

## Active Voice
* Write in active voice with 'I' and 'you'. Never default to passive ('it was found that', 'it can be argued', 'this is often seen as'). Name the actor. Own your statements.

## Rule of Three
* Don't always group things in threes. AI defaults to exactly 3 examples, 3 adjectives, 3 bullet points. Vary your lists — use 2, 4, or 5 items. If you list 3 things, make sure it's because there ARE exactly 3, not because it sounds nice.

## Flattery & Superlatives
* No unearned superlatives: never call something 'fascinating', 'remarkable', 'extraordinary', 'impressive', 'incredible' unless you prove WHY with a specific detail. Show, don't label. 'Revenue grew 340% in 6 months' beats 'achieved remarkable growth'.

## Participial "-ing" Endings
* Avoid empty '-ing' analysis at the end of sentences: '...showcasing the importance of X', '...highlighting his commitment to Y', '...demonstrating the power of Z', '...underscoring the need for W'. These add opinion disguised as analysis. State the fact and move on.

## "From X to Y" Fake Breadth
* No 'from X to Y' range constructions that fake breadth: 'from ancient traditions to modern innovations', 'from small startups to Fortune 500 companies', 'from beginners to seasoned professionals'. Be specific about WHO and WHAT instead of gesturing at a range.

## Synonym Swapping
* Don't swap synonyms to avoid repetition. If you're talking about a 'company', keep saying 'company' — don't rotate through 'organization', 'enterprise', 'firm', 'establishment'. Artificial vocabulary variety sounds robotic. Repeat the clear word.

## Real over Hypothetical
* Use real examples, not hypothetical ones. Don't write 'Imagine a startup that...' or 'Consider a scenario where...' — name a real company, a real person, a real number. If you don't have a real example, make your point without one rather than fabricating it.

## Fake Reveals & FOMO
* No fake authority reveals: 'Here's what nobody tells you', 'The secret is', 'Here's the truth', 'What most people get wrong'. These promise insider knowledge then deliver obvious observations. Just state the insight directly.


--- END OF anti-ai-rules.md ---


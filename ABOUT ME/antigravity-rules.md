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

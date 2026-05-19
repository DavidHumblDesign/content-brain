# Project brief: DESIGN.md article

Paste this into a new Cowork session to pick up the work. Everything needed is here. The new session should also read every file in `ABOUT ME/` before starting, per the global CLAUDE.md rule.

---

## The task

Write a single long-form article about Google's open-source **DESIGN.md** file format. The article serves two channels with the same body:

1. LinkedIn Article (long-form publish on David's LinkedIn)
2. Blog post on humbldesign.io (Webflow CMS, "Guide" content type)

Save deliverables to `OUTPUTS/design-md-article/`.

This is **not** a sales article. No "DM AUDIT" CTA. No "Book a free design audit" closer. Pure value piece designed for AI SEO (showing up inside ChatGPT, Perplexity, Claude, Gemini answers when founders and designers ask about DESIGN.md).

The source research dossier is in the original conversation. It contains every primary source, every analysis link, every quote, and the structural argument. Use it as the factual spine. Do not invent data.

---

## Four locked decisions

1. **Format.** One long-form article (1,500 to 2,200 words). Same shape works as LinkedIn Article + humbldesign.io blog post. David will copy-paste the body into both.
2. **Lead angle.** The .md file itself is the protagonist. Frame: one markdown file now carries your entire design system, and that file is becoming the thing AI agents read before they generate UI.
3. **Audience.** Designers lead, founders follow. Don't dumb down design system vocabulary. Don't lose Ryan (the early-seed AI/SaaS/Fintech founder ICP) either.
4. **Stance.** Bullish explainer with honest caveats. Lead with why it matters. Include the skeptical view (alpha schema, Google-coupled governance, Figma still wins on collaboration) in the back half.

---

## Title options (David to pick one before drafting)

1. **What is DESIGN.md? Google's open-source format for AI agents that build on-brand UI** (recommended, strongest AI SEO match for "what is X" queries)
2. **DESIGN.md explained: the markdown file that ships your design system to every AI agent**
3. **DESIGN.md vs design tokens: why Google's new format matters in 2026**

---

## Blog summary (problem-led, 2 to 3 sentences, David's voice)

> AI tools generate technically correct UI that looks like every other Tailwind template on the internet. The problem isn't the model. It's that the model has zero context about your brand. DESIGN.md is the open-source file format Google released in April 2026 to fix that, and it's about to become the next file every product repo has.

---

## Article structure (10 sections)

**Hook** — one or two lines, pattern interrupt or specific data point. Working draft: "Your design system has been living in Figma. In three weeks, that's going to feel as outdated as PSD handoff."

**Lede** — 2 to 3 sentence definitional paragraph built for AI search citation. Names the file, the maker (Google Labs / Stitch), the date (April 21, 2026), the license (Apache 2.0), and the function.

**§1. What DESIGN.md actually is.** Origin, repo (github.com/google-labs-code/design.md), status (alpha), the AGENTS.md-for-design comparison.

**§2. The problem it solves.** Default Tailwind blue problem. AI tools ship visually correct, brand-blind UI. DESIGN.md gives the agent persistent visual context, like a system prompt for visual identity.

**§3. The two layers inside the file.** YAML front matter for tokens (machine). Markdown body for rationale (human). Include the Heritage YAML example from the official spec as a real code block.

**§4. The CLI is what makes this more than a tokens file.** `lint` (WCAG contrast validation), `diff` (regression detection), `export tailwind` and `export dtcg` (interop), `spec` (prompt injection).

**§5. How DESIGN.md reaches the agent.** Three paths: Stitch native, MCP for Claude Code / Cursor / Antigravity, drop in repo root for anything else.

**§6. DESIGN.md vs design tokens, Figma libraries, style guides.** Comparison table using the HTML structure from `content-rules.md`. Tokens say what values exist. DESIGN.md says when to use them.

**§7. What's still broken.** Alpha schema. Open-source but Google-coupled. No Figma-class collaboration. Adoption outside Stitch still mostly manual. Prose interpretation is model-dependent.

**§8. The bigger thing happening.** README.md framing. Every repo has one. Every product is about to have a DESIGN.md. Source of truth migrating out of Figma into markdown in git.

**§9. What to do this week.** Five concrete one-sentence steps. Generate one for a current project. Run `npx @google/design.md lint`. Drop in repo root. Point Claude Code or Cursor at it. Version it in git.

**§10. FAQ.** Exactly 5 questions. First sentence answers, second adds reasoning.
1. What is DESIGN.md?
2. Is DESIGN.md replacing Figma?
3. How is DESIGN.md different from design tokens?
4. Can I use DESIGN.md with Claude Code or Cursor?
5. Is DESIGN.md ready for production?

**Close.** Specific, not a summary. Working line: "Design has spent 15 years getting better at handing files to humans. DESIGN.md is the first format that takes seriously that the next consumer of those files is a model."

---

## Three open questions for David before drafting

1. **Pick a title** from the three above.
2. **OK to include the Heritage YAML example** verbatim from the official spec, with inline attribution? Apache 2.0 license is permissive. Code blocks get cited more by AI search.
3. **Byline at foot** of the article? "By David Pokorny, founder of Humbl Design" with a link to humbldesign.io? Or no byline because LinkedIn Article shows his name natively?

---

## Voice rules (non-negotiable)

Read `ABOUT ME/anti-ai.md` and `ABOUT ME/content-rules.md` in full before drafting. Critical absolutes:

- **No em dashes.** Use commas, periods, colons, parentheses.
- **No negative parallelisms.** "It's not X. It's Y." is the single biggest AI tell. If the negated framing isn't carrying information, delete it and just say what the thing is.
- **No banned vocabulary.** No leverage, optimize, seamless, robust, transformative, game-changer, delve, dive in, unlock, supercharge, etc. Full list in `anti-ai.md`.
- **No banned openers or closers.** No "In today's world," no "Let's dive in," no "In conclusion," no "Key takeaways."
- **No meta commentary.** Don't say "In this article I will." Just say the thing.
- **No mechanical transitions.** No furthermore, moreover, additionally, that said.
- **Sentence case headings**, no parenthetical additions in headings.
- **Vary sentence length aggressively.** Short. Then longer. Then a fragment.
- **Use contractions.** First-person "I" and "you."
- **Specificity beats generic.** Real numbers, real names, real dates.

Voice adjectives: Direct, Specific, Confident, Irreverent, Useful.

---

## Output files to produce

Save to `OUTPUTS/design-md-article/`:

1. `article.md` — the full long-form draft. Markdown body. Use the HTML table structure from `content-rules.md` for the §6 comparison table.
2. `blog-summary.md` — the 2 to 3 sentence problem-led summary above (refine for final).
3. `linkedin-distribution-post.md` — short LinkedIn feed post (~1,300 chars) that points readers to the LinkedIn Article. Link goes in first comment, not post body.
4. `audit-report.md` — the self-audit before delivery. Score 1 to 10 on AI smell. List every banned-pattern violation found and fixed. Quote the offending text and the rewrite.

---

## Workflow

1. Read `ABOUT ME/about-me.md`, `ABOUT ME/anti-ai.md`, `ABOUT ME/content-rules.md`, `ABOUT ME/my-company.md`.
2. Confirm title pick, code block decision, byline decision (the three open questions above).
3. Quick May 2026 reality check on the dossier (GitHub stars, any Figma / Cursor / v0 native integration announcements since April 23, 2026).
4. Draft article.md.
5. Audit hard against `anti-ai.md`. Produce `audit-report.md` with AI smell score and violations fixed.
6. Produce `blog-summary.md` and `linkedin-distribution-post.md`.
7. Deliver computer:// links to all four files.

---

---

# Research dossier

Source-gathering brief organized by theme. Every claim links to a source. Use this as the factual spine. No invented data, no fabricated case studies.

## 1. Headline facts

- **What it is.** A plain-text Markdown file that encodes a brand's design system (colors, typography, spacing, components, rules) in a format AI agents can read and apply when generating UI.
- **Who made it.** Google Labs, originally for their AI design tool **Stitch** (powered by Gemini).
- **Timeline.**
  - Stitch and DESIGN.md introduced around March 2026 as part of an update with infinite canvas, design agent, prototyping, and voice.
  - Format **open-sourced on April 21 to 23, 2026** (sources cite slightly different dates).
- **License.** Apache 2.0.
- **Repo.** `github.com/google-labs-code/design.md`.
- **Status.** Alpha. Spec, tokens, and CLI still evolving.
- **Generator.** Stitch (`stitch.withgoogle.com`) can produce one from a URL, brand assets, or a text description. Hand-writing also works.

## 2. Why it exists, the problem being solved

AI code and UI tools (Claude Code, Cursor, Copilot, v0, Lovable, Stitch itself) generate technically correct but visually generic output. Default Tailwind blue, rounded corners, pastel SaaS aesthetic. Every prompt starts from zero context about your brand.

The pattern: persistent, structured brand context handed to the agent on every generation so output stays on-brand without re-specifying rules in every prompt. Same idea as a system prompt in chat, but for visual identity.

Best framing surfaced: DESIGN.md is to design what **AGENTS.md / CLAUDE.md** is to code conventions. A persistent file the agent consults on every interaction. ([designmd.app](https://designmd.app/what-is-design-md/))

## 3. Structure, two layers in one file

Every DESIGN.md has two parts in the same file ([Department of Product](https://departmentofproduct.substack.com/p/designmd-explained-the-format-reshaping), [GitHub spec](https://github.com/google-labs-code/design.md)):

1. **YAML front matter (machine-readable):** exact hex codes, font sizes, spacing scale, corner radii, component tokens. Delimited by `---` at the top.
2. **Markdown prose body (human-readable):** the *why*. Brand personality, principles, edge-case guidance, do's and don'ts.

The split matters. The "what" is for machines (precise, unambiguous, executable). The "why" is for judgment calls the tokens can't cover.

### Real example from the official spec

```yaml
---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 3rem
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
---
## Overview
Architectural Minimalism meets Journalistic Gravitas.
The UI evokes a premium matte finish, a high-end broadsheet or contemporary gallery.
## Colors
The palette is rooted in high-contrast neutrals and a single accent color.
- **Primary (#1A1C1E):** Deep ink for headlines and core text.
```

### The 8-section structure that has emerged

Common sections in well-formed DESIGN.md files: Overview / principles, Colors, Typography, Spacing / grid, Components, States / motion, Voice / tone, Guardrails (do's and don'ts).

Guardrails (negative constraints) are emphasized as much as positive specs. Examples: *"Never use drop shadows on cards. Use 1px borders instead." / "Always use sentence case for button labels, never title case."* ([MindStudio](https://www.mindstudio.ai/blog/what-is-design-md-google-stitch))

## 4. Tooling, the CLI and exports

Google ships a Node CLI: `@google/design.md`, runnable via `npx` with no install ([GitHub repo](https://github.com/google-labs-code/design.md)):

- `lint` validates structure, broken token references, **WCAG contrast ratios**. Returns structured JSON findings.
- `diff` compares two versions, detects regressions (exit code 1 = regression).
- `export --format tailwind` outputs Tailwind theme JSON.
- `export --format dtcg` outputs W3C Design Tokens Community Group JSON.
- `spec` prints the full specification (for injection into agent prompts).

The WCAG-validation hook is the most concrete differentiator from a plain tokens file. Agents don't just respect the palette, they verify text-to-background contrast stays readable.

## 5. How it gets to the agent

Three integration paths:

1. **Stitch native.** Stitch reads it automatically. Design generation respects it on every prompt.
2. **MCP server + SDK.** Stitch exposes an MCP server so Claude Code, Cursor, and Google's Antigravity can pull design context directly. The Stitch skills repo has about 2.4k stars on GitHub.
3. **Drop it in the project root.** Any agent that reads project files (Claude Code's CLAUDE.md pattern, Cursor's rules) picks it up. Markdown is the format LLMs read with highest fidelity, so no parsing layer is needed.

Three ways to create one ([newsdefused.com](https://www.newsdefused.com/googles-stitch-open-sources-design-md-specification-to-make-brand-rules-portable-for-ai-agents/)):

- Extract automatically from any **URL**.
- Upload **brand assets** (logos, identity manuals) for AI analysis.
- Build from scratch.

## 6. How it differs from adjacent standards

| Format | What it does | Audience |
|---|---|---|
| **Design tokens (DTCG / W3C)** | Defines exact values: colors, type scale, spacing. JSON. | Build tools, design tools. |
| **Style Dictionary** | Generates platform-specific tokens (iOS, Android, web). | Engineers. |
| **Figma libraries** | Components and variables in a visual editor. | Designers. |
| **PDF style guides** | Reference doc. | Humans. |
| **DESIGN.md** | Tokens plus rules for when to apply them. Persistent context. | AI agents, and humans. |

The crucial distinction: tokens tell an agent *what values exist*. DESIGN.md tells it *when to use them and when not to.* Example: tokens give you a primary color. DESIGN.md says *"use the primary button color on one CTA per screen, never stacked."* ([TDP](https://designproject.io/blog/design-md-file/))

DESIGN.md doesn't replace tokens in projects that already have a build pipeline. Both coexist, and `export` converts between them.

## 7. Reception, debate, criticism

Discourse is split. Three reads to be aware of.

### Bullish read

- "Agent-native" design systems are inevitable. DESIGN.md is the first credible standard.
- Markdown is the right substrate because LLMs already read it best. No plugins, no parsers, no vendor lock-in.
- Open-sourcing the spec under Apache 2.0 with Tailwind and DTCG export means it can be a real interoperability layer, not a Google walled garden.

### The "design is the first AI casualty" provocation

A prominent ex-Google / Meta VC argued large companies will stop backfilling design roles because centralized design systems plus AI = on-demand UI generation. The Department of Product piece is the cleanest summary of this debate. ([Department of Product](https://departmentofproduct.substack.com/p/designmd-explained-the-format-reshaping))

Significant pushback to that take. Most arguing the role shifts (design systems engineer, brand strategist, AI design ops) rather than disappears.

### Skeptical read

From [DesignWhine](https://www.designwhine.com/what-the-hell-is-google-stitchs-design-md/) and community commentary:

1. **"Open" but Google-coupled.** Messaging and APIs still tightly coupled to Stitch's ecosystem. Schema and governance look less like a true open standard and more like a Google project that accepts PRs.
2. **Stitch isn't Figma.** Stitch lacks (or only partially implements) real-time multi-user editing, comments, permissions, branching, plugins, enterprise governance. DESIGN.md attacks the spec / handoff layer, not Figma's core collaboration moat.
3. **Alpha = unstable.** Token schema and CLI under active change. Production teams adopting now should expect breakage.
4. **Adoption is still early.** Until Figma, v0, Cursor natively ingest the format, agent support outside Stitch is mostly via manual prompt referencing.
5. **The "why" prose is fragile.** Depends on the model interpreting natural language correctly. Different agents will interpret the same prose differently.

### Strategic threat to Figma

Cleanest technical framing ([DesignWhine](https://www.designwhine.com/what-the-hell-is-google-stitchs-design-md/)): DESIGN.md targets the **spec and handoff layer**, not the canvas. If it becomes the de facto portable representation of design systems (with Figma plugins, Storybook, codebases reading it), the design system's source of truth could move out of Figma files into markdown in git. Dethroning Figma needs much more than a file format though. Multi-user editing, governance, plugins, enterprise features. So this is a slow flank attack, not a frontal assault.

## 8. Community ecosystem already forming

Within about 3 weeks of the open-source release:

- **VoltAgent/awesome-design-md** ([GitHub](https://github.com/VoltAgent/awesome-design-md)). 69+ DESIGN.md files modeled on real brands (Airbnb, Apple, Stripe, Nike, Shopify, Starbucks, IBM, NVIDIA, Pinterest, Figma, Framer, Webflow, Binance, Coinbase, Mastercard, Revolut). Drop-in starters for "build me a page that looks like X."
- **designmd.ai.** Directory site, "100s of free design systems your AI coding tools actually read."
- **designlang.** CLI that reverse-engineers any URL into DTCG tokens + DESIGN.md + Tailwind + CSS vars + iOS / Android / Flutter + MCP server.
- **design-extractor.com.** One-file DESIGN.md extractor.
- **designtoken.md.** Adjacent project offering the same markdown pattern for richer token tables.
- **Pomelli.** Google's adjacent tool using the same "Business DNA" persistent context pattern for marketing, not UI.

This is meaningful. The format spread before the spec was open. Strong signal of real demand.

## 9. Practical workflow, what teams actually do

From the [Design Systems Collective writeup on Stitch + Claude Code](https://www.designsystemscollective.com/the-design-md-workflow-how-google-stitch-claude-code-quietly-changed-the-design-to-code-handoff-c4213f97ed8f) and [TDP](https://designproject.io/blog/design-md-file/):

1. **Generate or write** DESIGN.md (Stitch, extract from URL, or hand-write).
2. **Ask Stitch to critique its own file.** *"Review this DESIGN.md for inconsistencies, accessibility issues, and missing edge cases."* Flags contrast issues, missing focus states, conflicts with the spacing system. Free design review.
3. **Commit it to repo root.** Same level as README.md.
4. **Reference it in prompts.** Claude Code / Cursor read it as context for every UI generation.
5. **Iterate based on what the AI still gets wrong.** That's the real feedback loop, faster than going through a design tool.

Key tip surfaced repeatedly: **keep it short.** Long philosophical sections about brand values don't help the model generate better buttons. Brevity makes the file more useful, not less. Treat it like a config file. Version control, deliberate updates, review on merge.

## 10. Useful angles

Depending on audience, strongest framings:

1. **The README.md moment for design.** Every repo has a README. The argument: every product is about to have a DESIGN.md. Quick, contrarian-friendly framing.
2. **"Agent-native" is the new responsive.** Just as design adapted to mobile, it's now adapting to AI as the primary consumer of design specs.
3. **The death (or evolution) of design handoff.** Figma → Zeplin → developer is being collapsed into a single markdown file.
4. **Why Markdown won.** LLMs read it natively. No schema to maintain. Same file works for designers, developers, AI. Simplest possible interface usually wins.
5. **The Google playbook.** Open-source the spec, ship the tool, let the community build the ecosystem. Same move as Android, Kubernetes, MCP-adjacent stuff.
6. **What's missing.** Governance, real interop, Figma buy-in. If those don't show up in 6 months, this stays a Stitch feature, not a standard.

## 11. Full source list

### Primary sources (official Google)

- **Google Blog, open-sourcing announcement:** https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
- **Google Blog, Stitch AI-native canvas update (broader context):** https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/
- **Official spec on GitHub:** https://github.com/google-labs-code/design.md
- **Stitch itself:** https://stitch.withgoogle.com/

### High-quality analyses

- **Department of Product, DESIGN.md Explained:** https://departmentofproduct.substack.com/p/designmd-explained-the-format-reshaping (best business-impact analysis, partially paywalled)
- **DesignWhine, critical analysis:** https://www.designwhine.com/what-the-hell-is-google-stitchs-design-md/ (best balanced critique, including the Figma threat angle)
- **UX Planet (Nick Babich):** https://uxplanet.org/what-is-design-md-and-how-to-use-it-70532359b311
- **Design Systems Collective, workflow with Claude Code:** https://www.designsystemscollective.com/the-design-md-workflow-how-google-stitch-claude-code-quietly-changed-the-design-to-code-handoff-c4213f97ed8f
- **Medium (Fernando Comet), DESIGN.md as a standard:** https://medium.com/design-bootcamp/google-makes-design-md-open-source-on-its-way-to-become-a-industry-standard-16119f2368dd

### News coverage

- **The Decoder:** https://the-decoder.com/googles-open-source-design-md-gives-ai-agents-a-prompt-ready-blueprint-for-brand-consistent-design/
- **News Defused:** https://www.newsdefused.com/googles-stitch-open-sources-design-md-specification-to-make-brand-rules-portable-for-ai-agents/
- **Creative AI News:** https://www.creativeainews.com/blog/google-design-md-open-source-ai-brand-design-stitch/
- **Pasquale Pillitteri, practical examples and criticism:** https://pasqualepillitteri.it/en/news/1251/google-stitch-design-md-open-source-spec-2026
- **MindWiredAI, practical walkthrough:** https://mindwiredai.com/2026/04/23/design-md-is-now-open-source-googles-new-file-format-that-makes-ai-build-your-brand-correctly/

### Practitioner / how-to

- **MindStudio, what is Design.md:** https://www.mindstudio.ai/blog/what-is-design-md-google-stitch
- **MindStudio, design.md file explainer:** https://www.mindstudio.ai/blog/what-is-google-stitch-design-md-file
- **The Design Project, how to write one:** https://designproject.io/blog/design-md-file/
- **designmd.app, explainer + spec walkthrough:** https://designmd.app/what-is-design-md/

### Community and ecosystem

- **VoltAgent awesome-design-md:** https://github.com/VoltAgent/awesome-design-md
- **designmd.ai directory:** https://designmd.ai/
- **designtoken.md:** https://designtoken.md/
- **designlang CLI:** https://designlang.vercel.app/
- **DTCG (W3C Design Tokens), for comparison:** https://www.designtokens.org/ and https://github.com/design-tokens/community-group

## 12. Quick-reference quotes (paraphrase, don't lift verbatim)

- Google's framing: instead of guessing intent, agents now know exactly what a color is *for* and can validate choices against WCAG.
- The tokens vs prose insight: hex codes are for machines. Rationale is for judgment calls the tokens don't cover.
- The skeptical framing: Stitch attacks Figma's spec / handoff layer, not its collaboration moat.
- The Markdown-won argument: LLMs read markdown with the highest fidelity in their training data, so no extra parsing instruction is needed.
- The iteration loop: the AI's mistakes are your real feedback signal. Faster than design review.

---

**Rule for the draft.** Every claim needs an inline link to a real named source from the list above. No fabricated stats. No invented case studies. Where data is missing or unclear, say so honestly per the anti-AI rules.

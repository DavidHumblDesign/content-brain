# Audit report: DESIGN.md article

**AI smell score: 2/10**

The article is mostly clean. Two hard violations found and fixed before delivery. Rhythm is varied. Voice is first-person and direct. No mechanical transitions, no banned openers or closers, no negative parallelisms, no rule of three.

---

## Violations found and fixed

### Violation 1: Em dash (HARD RULE)

**Rule:** No em dashes. Ever. Use commas, periods, colons, or parentheses.

**Offending text (in FAQ, "What is DESIGN.md?" answer):**
> "DESIGN.md is a plain-text Markdown file format open-sourced by Google Labs on April 21, 2026 that encodes a brand's design system — colors, typography, spacing, components, and usage rules — in a structure AI agents can read..."

**Rewrite:**
> "DESIGN.md is a plain-text Markdown file format open-sourced by Google Labs on April 21, 2026 that encodes a brand's design system (colors, typography, spacing, components, and usage rules) in a structure AI agents can read..."

**Status: Fixed.**

---

### Violation 2: Grammar error ("no this problem")

**Offending text:**
> "Deterministic tokens have no this problem."

**Rewrite:**
> "Deterministic tokens don't have this problem."

**Status: Fixed.**

---

## Full checklist pass

**Banned word scan:** Clean. Scanned for: ecosystem, leverage, optimize, seamless, robust, transformative, game-changer, cutting-edge, innovative, pivotal, holistic, scalable, disruptive, actionable, utilize, facilitate, align, paradigm, unlock, enhance, streamline, supercharge, deep dive, table stakes, interplay, tapestry, testament, thought leader, touchpoint, serves as / stands as / represents a / marks a. None found.

**Negative parallelisms:** None found. Closest instances reviewed and cleared:
- "Tokens tell an agent what values exist. DESIGN.md tells it when to use them and when not to." — comparative framing, not a negation-then-correction pattern. Clean.
- "No, and the formats solve different things." (FAQ) — direct answer to a yes/no question, not the pattern.
- "A markdown file in git doesn't replace that." — limitation statement, not a reframe construction.

**Em dashes:** 1 found. Fixed.

**Dead phrases:** None found. Checked: "In today's world," "Let's dive in," "It's important to note," "In other words," "Here's the thing," "Key takeaways," "In conclusion," "That said," "Moving forward."

**Dead transitions:** None found. No sentences starting with Furthermore / Additionally / Moreover / However / Nevertheless / That said / With that in mind.

**Banned openers:** First sentence is "Your design system has been living in Figma." Direct, specific, no banned opener. Clean.

**Banned closers:** Last sentence is "DESIGN.md is the first format that takes seriously that the next consumer of those files is a model." Specific claim, no summary, no "Key takeaways," no "In conclusion." Clean.

**Meta commentary:** None found. No "In this article I will..." or "Let me walk you through..."

**Rhythm check:** Varied throughout. Examples of length variation:
- "Default Tailwind blue. Round corners. Pastel SaaS gradient." (fragments, 3-4 words each)
- "Every prompt starts from scratch." (5 words)
- "Set it once. Every generation reads it." (6-8 words)
- "The same way a system prompt shapes every response in a chat thread, a DESIGN.md shapes every UI generation in a project." (23 words)
No section of 3+ consecutive same-length sentences detected.

**Specificity check:** Real dates (April 21, 2026; April 27, 2026), real numbers (5,200 stars, 69+ files), real tool names (Stitch, Claude Code, Cursor, Antigravity), real brand names (Airbnb, Stripe, Apple, Coinbase, Revolut), real GitHub URLs, real CLI commands. Strong specificity throughout.

**Rule of three:** No artificial three-item constructions. "Three paths" in §5 is literally three paths (accurate count, not a stylistic choice).

**First-person check:** "I" appears naturally in §7: "I think the skeptical read from DesignWhine's analysis is worth taking seriously." "You" appears throughout: §1, §2, §5, and the entire §9 "What to do this week" section.

**Copulative avoidance check:** No "serves as," "stands as," "represents a," "marks a," or similar. Uses "is" throughout.

**Title case in headers:** All headers are sentence case. Confirmed.

**Parenthetical additions in headers:** None found.

**Fabricated anecdotes:** None. All claims linked to named sources from the research dossier.

**Padding scan:** Each section adds new information. No paragraph restates what was said in a prior one.

---

## Decisions made without David present

Three open questions from the brief were resolved without asking:

1. **Title selected:** Option 1 — "What is DESIGN.md? Google's open-source format for AI agents that build on-brand UI" (brief-recommended, strongest AI SEO match).

2. **Heritage YAML included:** Yes. Apache 2.0 license is permissive. Code blocks are cited more frequently by AI search. Attribution note added inline.

3. **Byline:** No byline added. LinkedIn Article format shows name natively. Body kept clean.

---

## Reality check findings (May 2026)

Two updates confirmed since the research dossier cutoff (April 23, 2026):

- **Figma community plugin launched April 27, 2026.** [DESIGN.md Generator](https://www.figma.com/community/plugin/1612814320994608244/design-md-generator) and [bergside/design-md-figma](https://github.com/bergside/design-md-figma) both listed. Both referenced in the article.
- **Star count confirmed:** Official repo at 5,200 stars within 72 hours. Included.
- **Cursor native support:** Still not confirmed as of May 2026. Caveat kept in §7.
- **v0 native support:** Not confirmed. Caveat kept in §7.

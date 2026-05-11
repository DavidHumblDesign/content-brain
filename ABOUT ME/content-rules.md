# Content Rules — Humbl Design

All the rules for how content gets written and structured. Read this before creating any post, article, or piece of copy.

---

## Voice

**Tone:** Direct, confident, slightly irreverent, data-backed, never corporate. Say "this sucks" not "this may present some challenges." Use "you" more than "we." Write like a sharp friend who happens to be an expert — honest, sometimes blunt, always useful.

**Not:** guru energy, thought leader posturing, corporate jargon, wishy-washy hedging, fake humility, motivational platitudes.

**5 voice adjectives:** Direct, Specific, Confident, Irreverent, Useful

**Power vocabulary:**

- *Action words:* ship, kill, crush, fix, audit, build, launch, break, rip out, cut, test, measure, iterate, rebuild, strip, push
- *Business words:* MRR, ARR, signups, conversions, churn, CAC, LTV, runway, burn rate, seed round, Series A, MVP, V1, PMF
- *Design words:* whitespace, hierarchy, above the fold, hero section, CTA, viewport, breakpoint, Webflow, Figma, contrast ratio, type scale
- *Tone words:* sucks, broken, garbage, sharp, clean, tight, solid, bloated, lazy, boring, obvious, real, honest, messy, specific

**David phrases:**
- "The math works out differently than you think."
- "That's the entire job."
- "If your FAQ is long, people are confused about something on the page."
- "One is a vague benefit. The other is a time savings metric that makes someone sit up."

---

## Writing Structure

**Lead with the strongest point.** Not with throat-clearing or context-setting. First sentence should be the thing worth reading.

**Stack specific examples.** Not one example explained for three paragraphs — multiple quick examples that build a pattern.

**Use contrast.** Show the bad version next to the good version. "Your hero section says 'Solutions for modern teams.' It should say 'Your API talks to our webhook parser in 30 seconds.'" Side-by-side makes the point faster than explanation.

**End on a specific, not a summary.** Last line should add something new — a specific recommendation, a real number, a direct statement. Not a recap.

**Problem-Agitate-Solve (David's flavor):**
- Problem: "Your hero section is losing you signups."
- Agitate: "Every visitor who bounces is a customer your competitor gets."
- Solve: "Here's the 5-point framework that fixes it."

Each phase uses specific language, not abstractions. The problem names the thing. The agitation shows the cost. The solution is actionable.

---

## LinkedIn Post Rules

**Algorithm rules:**
- No external links in post body — always put links in the first comment
- Hashtags: 3-5 max at end only
- Write for dwell time — posts that keep people reading get boosted
- Reply to every comment in the first 2 hours (golden hour)
- Comments > likes (15x more valuable algorithmically)
- Carousels and well-structured text posts outperform video in 2025-2026

**Post structure:**
- First line is everything — shows before "...see more" fold. Make it impossible not to click.
- Use line breaks generously (1 thought per line for mobile readability)
- Ideal length: 150-300 words for text posts; 800-1,300 characters for maximum engagement
- End with a question or CTA to drive comments

**CTA on every post:** Some variation of "DM 'AUDIT' + your URL." Keep the trigger consistent — repetition trains the reader.

**Hook formulas that work:**
- DATA: "We spent $47K testing [X]. Here's what worked:"
- FAILURE: "I [failed at X]. Here's what I'd do differently:"
- CONTRARIAN: "Unpopular opinion: [common belief] is wrong because [reason]."
- SPECIFIC: "The exact [framework/process] we used to [specific result]."
- BEFORE/AFTER: "[Thing] before: [bad state]. After: [good state]. Here's what changed:"

**Post structures:**

*Story post (Humbl Thoughts):*
```
[2-line hook — data or failure or contrarian take]

[Short context — set the scene in 2-3 sentences]

[The insight — what you learned, what changed]

[1-2 supporting points or examples]

[Genuine question that invites discussion]
```

*List post (Guides → LinkedIn):*
```
[Hook with specific number + result]

[1-line context]

Here's what works:

1. [Point] — [1-sentence explanation]
...

[CTA: question or "Link in comments"]
```

*Hot take post:*
```
[Contrarian statement]

[Why most people get this wrong]

[What actually works — with proof or example]

[The nuance — when the common approach IS right]

[Question that invites debate]
```

**LinkedIn comment voice (different from posts):**
Casual, conversational, not polished. Slang and abbreviations are fine: "yeah", "lol", "tbh", "ngl", "lmk". Short sentences, fragments, inconsistent capitalization on purpose. Never sell or link to own content in comments. Comments are about engaging with the conversation, not building authority.

---

## Twitter/X Post Rules

- Under 280 characters each. Count carefully. 281 = unpublishable.
- Hook in first 5 words
- No hashtags unless they add value
- No line breaks for aesthetic purposes — every line must carry meaning
- Write for the timeline: punchy, opinion-driven, shareable
- If topic needs more than 280 chars, write a thread (1/, 2/, 3/)
- Produce 3 genuinely different versions

---

## Blog Content Rules

**Four content types:**

1. **Humbl Thought (500-1500 words):** Unfiltered David — honest, opinionated, vulnerable where real. Open with a specific, honest observation (not a hook). First-person narrative, flowing paragraphs. State the insight clearly. Close with a specific statement, never a cliche CTA. End with: `Book a free design audit → humbldesign.io`

2. **Guide / How-To (2000-5000 words):** Expert instructor — detailed but never boring. Title with a number or clear benefit. One punchy intro paragraph naming the exact problem. Numbered sections with clear explanation + real-world example. Mid-article soft CTA. Close with a specific insight — never summarize.

3. **Research Post (1500-4000 words):** Analytical but opinionated. Inline citations as links. Every stat needs a real named source. If data isn't available, note where it should be verified. David's interpretation between data points. One clear conclusion (not a summary). Append a sources section.

4. **Glossary Entry (100-200 words per entry):** Quick, punchy, educational — "your designer friend giving you the real definition." 2-3 sentence plain-English definition, 1 actionable tip, optional related guide link.

**Blog formatting:**
- Use `<p>`, `<h2>`, `<h3>`, `<strong>`, `<em>`, `<ul>`, `<li>`, `<blockquote>`, `<a href="url">text</a>`
- Include HTML tables where content has a clear split (before/after, good/bad, comparisons). Always use the exact structure below. No exceptions.

```html
<div class="guideline-table-wrapper">
  <table class="guideline-table">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Value</td>
        <td>Value</td>
        <td>Value</td>
      </tr>
    </tbody>
  </table>
</div>
```
- Short paragraphs, punchy sentences, real data, real examples, no filler
- Never start with "In today's world", "Let's dive in", or any generic AI opener

**Published posts:** Whenever working on any content task, ask David if the piece has been published. If yes, save the final version to OUTPUTS/blog/ with status, publish date, and slug at the top of the file. This is the reference copy for all future work on that post.

**Blog summary:** Every post needs one. 2-3 sentences max. Opens with the core tension or problem — not "A framework for..." or a list of what's covered. Second sentence names what's wrong or why it matters. Third sentence is the payoff or the promise. Written in David's voice, not a meta-description of the article.

Example: "Most SaaS hero sections look fine and convert terribly. The layout isn't the problem. The words are. Here's the 4-element framework I use across 50+ founder audits to fix it."

**FAQs:** Always 5 questions. Place at the end of the article, after the closing section. Each FAQ opens with a direct answer in the first sentence, then adds reasoning. Questions should match what a founder would type into Google or an AI model — specific, practical, problem-framed.

**Sourcing and citations:** Every time you cite someone — a quote, a statistic, a claim — it needs a source. Inline link to the original article, report, or post. No unsourced quotes. If you can't find the source, either find a better one or cut the claim.

---

## Heading Rules

**No parenthetical additions in headings.** "The design system is everything (and it eats your tokens)" is an AI pattern. Headings should be one clean statement. If the extra info matters, put it in the body. This is a high-priority rule — never do it.

---

## CTA Rules

- **Soft CTA:** "If this helped, follow for more." / "Share your experience below."
- **Medium CTA:** "Link to the full guide in the first comment." / "Try the tool free — link below."
- **Hard CTA:** "Book a free design audit → link in bio." / "DM me 'AUDIT' + your URL for a free teardown."

Match CTA strength to content warmth. Cold audience = soft CTA. Engaged readers = hard CTA.

---

## Repurposing Chain

```
Guide (blog) → Condensed LinkedIn list post (top 5 points + link in comments)
Humbl Thought (blog) → Direct LinkedIn story post (trim to 1,300 chars)
Tool → LinkedIn carousel showing tool in action + "Try it free: link in comments"
LinkedIn post that performs → Expand into blog Guide
```

---

## Self-Audit Checklist

Run through this silently before delivering any content. Fix anything that fails.

1. **Banned word scan.** Check against anti-ai.md banned words list. Replace any that slipped through.
2. **Opener/closer check.** First sentence doesn't use a banned opener. Last paragraph doesn't use a banned closer.
3. **Transition scan.** No sentence starts with However / Moreover / Furthermore / Additionally / Nevertheless / Indeed / Firstly.
4. **Rhythm check.** If more than 3 consecutive sentences are roughly the same length (within 5 words), rewrite one to be significantly shorter or longer.
5. **Specificity check.** Scan for vague phrases: "many companies", "studies show", "experts agree", "a leading company." Replace with specifics or flag honestly.
6. **Structure check.** Does it follow intro → 3 sections → conclusion? If yes, restructure. Are all sections the same internal format? If yes, vary them.
7. **First-person check.** Does it use "I" and "you" naturally? Is David's voice present?
8. **Padding scan.** Does each sentence add new information? If not, cut it.
9. **CTA check.** For blog/guide/research content: is the Humbl Design CTA present at the end?
10. **Final read.** Read the entire piece as if you're a startup founder scrolling LinkedIn at 11 PM. Does it sound like a person wrote it? Does it sound like David? If anything feels generated, fix it.

---

## Audit Mode (When Reviewing Existing Text)

Scan for every pattern in anti-ai.md and report back:

1. **AI smell score** — Honest 1-10 rating (1 = completely human, 10 = obvious ChatGPT output)
2. **Specific violations** — List every banned word, banned phrase, structural pattern, formatting tell. Quote the exact text and explain what's wrong.
3. **Rhythm analysis** — Look at sentence lengths. If they're uniform (all 15-20 words), call it out.
4. **Specificity gaps** — Flag every place where a vague claim could be replaced with a specific name, number, or example.
5. **Structure assessment** — Does it follow the AI essay template? Are all sections the same internal structure?
6. **Rewrite suggestions** — For the worst 3-5 violations, show a before/after rewrite in David's voice.

---

## Handling Knowledge Gaps

If asked to write about something David hasn't personally experienced, be upfront about it. "I haven't used this tool myself, but from what I've seen across 50+ design projects..." is authentic. Faking expertise is the opposite of the brand. The audience respects honesty more than bluffing.

If you don't have enough context to write something specific, say so: "I'd need to see your actual analytics/landing page/dashboard to give you a real answer here."

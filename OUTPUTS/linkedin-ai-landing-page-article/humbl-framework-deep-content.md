---
status: draft
date: 2026-05-04
project: linkedin-ai-landing-page-article
purpose: Deep content for the HUMBL framework. Format-agnostic. Pull into infographics, posts, articles, or slides.
---

# HUMBL framework — deep content

Use AI to architect a SaaS landing page that converts. Each letter has a principle, a specific failure mode, the prompt that works, a real before/after, and the watchout. Pull whatever fits the format you're shipping.

---

## H — Hook

**Principle.** A visitor lands and decides in under 5 seconds whether your page is worth reading. The headline carries that decision alone. Everything below the fold is wasted on a visitor who already left.

**What most teams ship.** Variations of "Built for modern teams" or "The [generic noun] platform for [generic noun]." Looks fine in a Figma frame. Reads as nothing on a real visit.

**Why it costs you.** Weak headline, fast bounce. Hero CTR drops, scroll depth drops, demo bookings drop. None of which design polish can fix. The math works out differently than you think: a 1-point headline lift compounds across every other section because every section needs the visitor to still be on the page.

**What the headline actually has to do.** Name the visitor, name the outcome, hint at the mechanism. Not necessarily in one sentence. But all three present somewhere in the hero.

**The AI prompt that works:**

```
Write 10 headline options for [product] aimed at [specific role at specific revenue band].
The pain they feel right now: [specific pain in their words].
The outcome they want: [specific outcome with a number if you have one].
Tone: direct, no hype, no jargon. No "supercharge", "unlock", "transform".
Length: under 12 words. Vary the structure across the 10.
```

**Before:** "AI-powered analytics for modern teams"
**After (AI draft + edit):** "Cut your weekly reporting from 6 hours to 30 minutes"

That second one is a time savings metric that makes someone sit up. The first is a vague benefit.

**Watchout.** AI gives you 10 versions. 9 are mid. Pick one, then rewrite it in your own voice. The structure is the gift. The polish is your job. If your final headline still has "powerful" or "scale" in it, you stopped one edit too early.

---

## U — Urgency through specific pain

**Principle.** Urgency on landing pages comes from recognition, not countdown timers. A visitor reads a pain bullet and thinks "that's literally me right now." That's the only kind of urgency that works on cold traffic.

**What most teams ship.** Pain bullets aimed at "B2B teams" or "growing companies" or "modern businesses." Aspirational, broad, forgettable. Written for everyone, so they land for no one.

**Why it costs you.** Above-the-fold pain bullets are the only thing most visitors read after the headline. If they don't connect, the visitor scrolls past everything else looking for a reason to leave.

**What real pain bullets look like.** 3 to 5 lines. Each one names a job title or company size, the specific situation, and the cost in real units. Time, money, headcount, sleep.

**The AI prompt that works:**

```
Write 5 pain bullets for [product].
ICP: [Director of RevOps at Series A SaaS, 50-200 employees].
Their actual problem: [data scattered across HubSpot, Salesforce, Snowflake, can't get a clean weekly forecast].
Cost: [8+ hours a week, miss board reports, eng team won't help].
Format: [pain] → [cost in real units], one line each.
Under 15 words per bullet. Specific situations only. No "scale", "growth", "efficiency".
```

**Before:**
- Save time on reporting
- Better visibility into your data
- Make data-driven decisions

**After (AI draft + edit):**
- 8 hours a week stitching HubSpot and Salesforce into one forecast
- CFO wants a pipeline view by Monday, you ship it Sunday night
- Eng team won't build another internal dashboard because your last 3 went unused

The visitor sees themselves on the page. That's the urgency.

**Watchout.** Bullets that come out the same length read like AI output. Vary them. One short, one longer, one fragment if it earns the room.

---

## M — Mechanism: outcome over feature

**Principle.** Visitors care about where they end up, not how the engine works. The feature is a means. The outcome is the reason anyone clicks anywhere on the page.

**What most teams ship.** Feature lists. "AI-powered automation. Real-time syncing. Customizable dashboards." Tells the visitor what the product does. Doesn't tell them what it does for them. They have to translate every line, and most won't.

**Why it costs you.** Feature copy assumes the visitor already wants the product. They don't. They're scanning the page to figure out if you can produce a result they care about. Translation work kills conversion.

**What good mechanism copy does.** States the outcome in measurable terms, then reveals the mechanism right after as the trust signal. Outcome leads. Mechanism backs it up.

**Three before/after pairs:**

Before: "AI-powered lead scoring"
After: "Spend 80% less time on leads that go nowhere. Our model ranks every inbound by close probability before it hits your CRM."

Before: "Real-time data syncing"
After: "Your dashboards stop lying. We sync HubSpot, Salesforce, and Snowflake every 60 seconds."

Before: "Automated workflows"
After: "Cut 5 hours a week of manual data entry. Drag your process into our builder, ship it in an afternoon."

**The AI prompt that works:**

```
Rewrite these 5 feature lines as outcome lines.
Format per line: [specific result with a number] + [short mechanism that proves it's real].
Banned words: powerful, robust, seamless, scale, supercharge, unlock, transform.
Keep each under 25 words.
[paste current feature list]
```

**Watchout.** AI will fabricate numbers if you let it. "Save 80%" with no source is a lie that ages badly. Use real numbers from your own data. If you don't have them, drop the percent and use the qualitative claim, then go pull the data so the next version is real.

---

## B — Believability

**Principle.** Every claim on a landing page is a claim until you prove it. Cold visitors trust customers more than they trust founders. Proof beats positioning every time.

**What most teams ship.** Testimonial sliders with "Love this product. - Sarah M." Or a "trusted by" row with 5 logos and zero context. Or video testimonials with no pull-quote, which means nobody plays them.

**Why it costs you.** Visitors discount unspecific praise to zero. A quote from "Sarah M." with no role, no company, no outcome lands as fake even when it's real. Logos without context land as decoration.

**What real proof needs.** A name. A title. A company. A specific outcome with a number. Optionally a face. If a testimonial is missing any of those, format isn't the problem. The testimonial is. That's the entire job.

**Three formats that pull weight:**

1. Quote + headshot + 3 hard stats. Pull a testimonial that mentions a specific result, then beneath the quote drop 3 numbers from that customer (% reduction, time saved, revenue lifted).

2. Mini case study cards. 3 to 4 cards above the fold. Each one: logo, one-line outcome ("Cut churn by 30% in 6 weeks"), link to the full study.

3. Video testimonial with a pull-quote callout. Video on its own doesn't convert. The pull-quote is what people actually read. The video adds weight to the line they already trusted.

**The AI prompt that works:**

```
I'm pasting 5 raw customer interview transcripts.
For each customer, pull the quote that contains a specific outcome and a real number.
Suggest a 4-word headline drawn directly from the quote.
Flag any customer whose quotes don't include a specific outcome. Those don't go on the landing page.
[paste raw transcripts]
```

**Watchout.** AI will invent numbers if you let it. Feed it real quotes, real Loom transcripts, real call recordings. If a customer didn't say a number, the AI doesn't get to add one.

---

## L — Lower barriers

**Principle.** Every page has invisible objections. The visitor stops just short of converting, and a doubt blocks the click. FAQs are where you kill the doubt before it kills the conversion.

**What most teams ship.** FAQs about pricing tiers, support hours, or how the product compares to a competitor 95% of visitors haven't heard of. Generic, defensive, written by the founder for the founder.

**Why it costs you.** Founders hear the same 5 objections in every sales call, then forget to put the answers on the page. The visitor who would've asked the question isn't on a sales call. They bounce, and the founder thinks "we have a traffic problem." It's not a traffic problem.

**The fastest way to find your real FAQs.** Pull every objection from the last 20 sales calls or demo recordings. Drop them into a doc. The 5 that repeat are your FAQs. That's the entire research process.

**What good FAQs do.**
- Open with a direct answer in the first sentence.
- Add 1-2 sentences of reasoning.
- Match phrasing to how a visitor types into Google or asks an AI, not how a marketer would frame it.

**5 FAQs that earn space on a SaaS landing page:**

1. Will this work for [specific company size or stage]? — names the segment the visitor identifies with.
2. How long does setup actually take? — kills the "this looks like 6 weeks of integration work" objection.
3. What if I already use [the obvious incumbent]? — kills the migration fear.
4. Is the price worth it for [specific revenue band]? — kills the "this is too expensive for me right now" objection.
5. What happens after the trial? — kills the "I'll get auto-charged and forgotten" objection.

**The AI prompt that works:**

```
Here are 30 raw objections from sales call transcripts.
Cluster them into 5 themes.
For each theme, write a question in the visitor's voice — how they'd actually type it, not how a marketer would phrase it.
Draft an answer per question. First sentence answers directly. Next 1-2 sentences explain why.
Keep each FAQ under 60 words.
[paste objections]
```

**Watchout.** If your FAQ is long, people are confused about something on the page. 5 is the cap. If you wrote 12, fix the page above the FAQ section. Don't bury answers at the bottom.

---

## The closer

AI gives you the structure and the speed. Your voice is the only thing it can't fake. Run every output through your own edit before it goes live, or it'll ship like the same generic SaaS page everyone else has.

Building a SaaS page right now? DM me "AUDIT" + your URL for a free teardown.

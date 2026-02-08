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

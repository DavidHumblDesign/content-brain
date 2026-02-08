import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

// ─── CONSTANTS ─────────────────────────────────────────
const SECTIONS = [
  { id: "business", label: "Business Profile", icon: "🏢" },
  { id: "rules", label: "AI Writing Rules", icon: "⚙️" },
  { id: "generator", label: "Prompt Maker", icon: "✨" },
  { id: "hooks", label: "Hook Generator", icon: "🪝" },
  { id: "history", label: "Prompt History", icon: "📋" },
];



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

// ─── CUSTOMIZABLE CONFIG (stored in localStorage) ─────
const DEFAULT_CONFIG = {
  approaches: [
    { id: "personal", label: "Personal / Storytelling", icon: "🧠", color: "#60A5FA", desc: "Personal stories, hot takes, experiences, engagement" },
    { id: "research", label: "Research / Data-driven", icon: "🔍", color: "#A78BFA", desc: "Industry news, data, trends, analysis with citations" },
    { id: "instructional", label: "Instructional / Educational", icon: "📚", color: "#34D399", desc: "Step-by-step guides, tutorials, how-to breakdowns" },
    { id: "opinionated", label: "Opinionated / Controversial", icon: "🔥", color: "#F87171", desc: "Hot takes, contrarian views, strong positions" },
    { id: "action", label: "Action-Oriented", icon: "🎯", color: "#FBBF24", desc: "Actionable tactics, frameworks, templates readers use immediately" },
    { id: "philosophical", label: "Philosophical / Reflective", icon: "💭", color: "#38BDF8", desc: "Big-picture thinking, mental models, deep observations" },
    { id: "observational", label: "Observational / Current Events", icon: "👀", color: "#FB923C", desc: "Pattern spotting, trend commentary, real-time analysis" },
  ],
  customRuleCategories: [],
  topics: ["Business", "Artificial Intelligence", "Design", "Conversions", "Marketing", "Personal Brand", "Industry News", "Tech", "Productivity"],
  platforms: [
    // Social Media
    { id: "twitter", label: "Twitter/X", cat: "Social Media", inst: "PLATFORM: Twitter/X\n- HARD LIMIT: 280 characters. Count carefully. 281 = unpublishable.\n- No line breaks for aesthetic purposes — every line must carry meaning.\n- Write for the timeline: punchy, opinion-driven, shareable.\n- Great tweets are one of: a strong opinion, a surprising fact, or a useful insight in under 20 words.", active: true },
    { id: "linkedin", label: "LinkedIn", cat: "Social Media", inst: "PLATFORM: LinkedIn\n- Ideal length: 150-300 words.\n- First line is EVERYTHING — it shows before the '...see more' fold. Make it impossible to not click.\n- Use line breaks generously (1 thought per line for mobile readability).\n- LinkedIn rewards: personal stories, professional insights, contrarian takes.\n- Avoid: inspirational platitudes, 'I\\'m humbled', corporate speak.\n- End with a question or CTA to drive comments.", active: true },
    { id: "instagram_feed", label: "Instagram (Feed)", cat: "Social Media", inst: "PLATFORM: Instagram Feed\n- Caption: 2200 char limit, ideal 125-200 words.\n- First sentence is the hook — shows before '...more'. Make it irresistible.\n- Break text into short paragraphs for mobile readability.\n- Visual-first platform — caption should complement the image, not replace it.\n- Strong CTA: 'Save this', 'Share with someone who...', 'Comment below'.", active: false },
    { id: "instagram_reels", label: "Instagram Reels/Stories", cat: "Social Media", inst: "PLATFORM: Instagram Reels/Stories\n- Script format: HOOK (first 1.5 sec) → BODY → CTA.\n- Target 30-60 seconds for Reels. Stories: 1-3 slides of text.\n- Speak directly to camera. Casual, raw, authentic > polished.\n- Hook must stop the thumb-scroll immediately.\n- End with a clear action: follow, comment, save, share.", active: false },
    { id: "tiktok", label: "TikTok", cat: "Social Media", inst: "PLATFORM: TikTok\n- Script format: HOOK (first 2 sec) → VALUE → PAYOFF.\n- Speak like you're talking to a friend, not presenting.\n- Raw and authentic beats polished and produced.\n- 30-90 seconds sweet spot. Front-load the value.\n- Use trending sounds/formats when relevant but add your unique angle.\n- Caption: short, punchy, adds context the video doesn't.", active: false },
    { id: "threads", label: "Threads", cat: "Social Media", inst: "PLATFORM: Threads\n- 500 character limit per post.\n- Conversational and opinion-driven. Like Twitter but more personal.\n- No hashtag culture — focus on the writing itself.\n- Great for hot takes, real-time commentary, and quick insights.\n- Reply chains work well — think out loud across multiple posts.", active: false },
    { id: "facebook", label: "Facebook", cat: "Social Media", inst: "PLATFORM: Facebook\n- Longer text performs well (300-500 words).\n- Personal stories and relatable content get shared most.\n- End with a question to drive comments — Facebook algorithm rewards engagement.\n- Write for the share: 'Would my friend find this useful/funny/relatable?'\n- More emotional and community-driven than LinkedIn.", active: false },
    { id: "reddit", label: "Reddit", cat: "Social Media", inst: "PLATFORM: Reddit\n- Value-first. No self-promotion smell. Redditors will destroy you for shilling.\n- Match the subreddit's tone and norms exactly.\n- Use paragraph breaks. Walls of text get skipped.\n- TL;DR at the bottom for long posts.\n- Be genuinely helpful. Answer questions others haven't.\n- Source your claims — Redditors fact-check everything.", active: false },
    { id: "youtube", label: "YouTube", cat: "Social Media", inst: "PLATFORM: YouTube (Long-form Video)\n- Script structure: Hook (first 30 sec) → Intro → Chapters → CTA → Outro.\n- First 30 seconds decide if they stay. Open with the payoff or a bold claim.\n- Write for spoken delivery — read it out loud, cut anything that sounds stiff.\n- Target 8-15 minutes for most content. Timestamps for each section.\n- Pattern interrupt every 2-3 minutes to maintain attention.", active: false },
    { id: "youtube_shorts", label: "YouTube Shorts", cat: "Social Media", inst: "PLATFORM: YouTube Shorts\n- Under 60 seconds. Ideally 30-45 seconds.\n- HOOK in first 2 seconds — text on screen + spoken.\n- One single takeaway. No multi-point videos.\n- Vertical format. Write for mobile viewing.\n- End with 'Follow for more' or loop back to the hook.", active: false },
    { id: "pinterest", label: "Pinterest", cat: "Social Media", inst: "PLATFORM: Pinterest\n- Pin title: 40-100 characters, keyword-rich for search.\n- Description: 150-300 characters, natural keywords, light CTA.\n- Pinterest is a search engine — think SEO, not social.\n- Evergreen content performs best. Avoid time-sensitive references.\n- Actionable and aspirational: tutorials, tips, how-tos, checklists.", active: false },
    // Content Platforms
    { id: "blog", label: "Blog", cat: "Content Platforms", inst: "PLATFORM: Blog\n- Length: 800-1500 words.\n- Structure: Hook → Context → Main points → Actionable takeaway.\n- Use subheadings every 200-300 words.\n- Include at least one personal anecdote or specific example.\n- Write for skimmers: bold key phrases, short paragraphs.", active: true },
    { id: "newsletter", label: "Newsletter", cat: "Content Platforms", inst: "PLATFORM: Newsletter\n- Tone: like writing to a smart friend, not broadcasting.\n- Structure: One big idea → supporting points → what to do about it.\n- Include a personal opener (what you're thinking about, what happened this week).\n- Conversational — this is 1-to-1, not 1-to-many.", active: true },
    { id: "medium", label: "Medium", cat: "Content Platforms", inst: "PLATFORM: Medium\n- 1000-2000 words. Medium rewards depth and original thinking.\n- Strong subtitle — it shows in the preview and determines clicks.\n- Use subheadings, pull quotes, and images to break up text.\n- Write for the publication's audience if submitting to one.\n- First paragraph must hook — Medium shows it in the preview.", active: false },
    { id: "substack", label: "Substack", cat: "Content Platforms", inst: "PLATFORM: Substack\n- Newsletter-style but with more depth than email.\n- Personal voice is everything — subscribers are here for YOU.\n- 800-2000 words. Include personal takes and behind-the-scenes.\n- Structure for scanning: headers, bold text, short paragraphs.\n- End with something that invites replies — build the relationship.", active: false },
    // Scripts & Audio
    { id: "podcast_script", label: "Podcast Script", cat: "Scripts & Audio", inst: "PLATFORM: Podcast Script\n- Outline format with talking points, not word-for-word script.\n- Open with a hook question or surprising claim to keep listeners.\n- Natural transitions between sections. Conversational flow.\n- Include 2-3 stories or examples to illustrate points.\n- End with key takeaway and clear CTA (subscribe, leave review, check link).", active: false },
    { id: "video_script", label: "Video Script (Long)", cat: "Scripts & Audio", inst: "PLATFORM: Video Script (Long-form)\n- 8-15 minute target. Write for spoken delivery.\n- Structure: Hook (30 sec) → Context → Main content (chapters) → CTA → Outro.\n- Pattern interrupt every 2-3 minutes (question, story, visual change).\n- Write conversationally — if it sounds like reading, rewrite it.\n- Include [B-ROLL] and [TEXT ON SCREEN] cues where relevant.", active: false },
    { id: "short_video_script", label: "Video Script (Short)", cat: "Scripts & Audio", inst: "PLATFORM: Video Script (Short-form)\n- 15-60 seconds. Every second counts.\n- HOOK → POINT → PAYOFF structure.\n- First 2 seconds decide everything. Open mid-action or mid-thought.\n- One idea only. If you need to explain it, simplify it.\n- Casual spoken delivery. Write how you talk, not how you write.", active: false },
    // Professional
    { id: "sales_page", label: "Sales Page", cat: "Professional", inst: "PLATFORM: Sales Page / Landing Page\n- Above-the-fold: headline + subheadline + CTA. No scrolling required to understand the offer.\n- Pain → Agitate → Solve structure throughout.\n- Social proof early and often (testimonials, logos, numbers).\n- Multiple CTAs throughout the page.\n- Write for the skeptic — address objections before they arise.", active: false },
    { id: "presentation", label: "Presentation / Deck", cat: "Professional", inst: "PLATFORM: Presentation / Deck\n- Slide-by-slide format. One idea per slide.\n- 10-15 slides max. Title slide + agenda + content + summary + CTA.\n- Text per slide: 3-5 bullet points OR one key statement.\n- Include speaker notes with talking points.\n- Visual > text. Use the slide as a billboard, speak the details.", active: false },
    { id: "product_hunt", label: "Product Hunt", cat: "Professional", inst: "PLATFORM: Product Hunt Launch\n- Tagline: under 60 characters. Clear, benefit-driven.\n- Description: 3-4 lines max. Problem → Solution → Why now.\n- Be authentic and maker-voiced. No corporate speak.\n- Include a personal 'maker story' — why you built this.\n- First comment should add context and invite questions.", active: false },
  ],
  formats: [
    { id: "short_post", label: "Short post", inst: "FORMAT: Short post — Under 100 words. Every word must earn its place. One idea only. Fragments are fine. Punchier > longer.", active: true },
    { id: "long_post", label: "Long-form post", inst: "FORMAT: Long-form post — 200-400 words. Structure: Hook → Story/Evidence → Insight → CTA. Line breaks for readability. No walls of text.", active: true },
    { id: "carousel", label: "Carousel", inst: "FORMAT: Carousel (slide sequence)\n- Slide 1: Bold hook/headline (8 words max).\n- Each slide: 1 idea, 20 words max per slide.\n- Last slide: CTA or key takeaway.\n- 7-10 slides total.\n- Output as: [Slide 1] ... [Slide 2] ... etc.", active: true },
    { id: "thread", label: "Thread", inst: "FORMAT: Thread (multi-post sequence)\n- Tweet 1 is the hook — must work standalone as a banger.\n- Each tweet should be valuable on its own.\n- Number: 1/, 2/, 3/ etc.\n- End with summary tweet + CTA.\n- 5-10 tweets.", active: true },
    { id: "comment_reply", label: "Comment/Reply", inst: "FORMAT: Comment/Reply — Short, punchy (1-3 sentences). Add a unique perspective, don't just agree. Ask a follow-up question.", active: true },
    { id: "research_paper", label: "Research paper", inst: "FORMAT: Research-style post — Thesis → Evidence → Counter-arguments → Conclusion. 400-800 words. Every claim backed by data.", active: true },
    { id: "engagement_bait", label: "Engagement bait", inst: "FORMAT: Engagement bait — Short, polarizing, opinion-driven. Ask questions with no right answer. Make it low-effort to respond. Under 50 words ideal.", active: true },
    { id: "listicle", label: "Listicle", inst: "FORMAT: Listicle — Numbered list (5-10 items). Each item: bold statement + 1-2 sentence explanation. Hook explains why this list matters.", active: false },
    { id: "how_to_guide", label: "How-to guide", inst: "FORMAT: How-to guide — Step-by-step. Number every step. Each step: what to do + why it works. End with expected result.", active: false },
    { id: "case_study", label: "Case study", inst: "FORMAT: Case study — Before → Challenge → Solution → Result. Include specific numbers. Let the story prove the point.", active: false },
    { id: "comparison", label: "Comparison / Vs", inst: "FORMAT: Comparison — X vs Y side-by-side. Clear criteria. Verdict at the end. Be opinionated, not neutral.", active: false },
    { id: "quote_card", label: "Quote card", inst: "FORMAT: Quote card — One powerful quote or line (under 15 words). Context line below. Designed to be screenshotted and shared.", active: false },
    { id: "poll", label: "Poll / Vote", inst: "FORMAT: Poll — 2-4 clear options. Frame the question to be genuinely interesting, not obvious. Add your take in the caption.", active: false },
    { id: "announcement", label: "Announcement", inst: "FORMAT: Announcement — News/launch format. What + Why it matters + What's next. Keep excitement real, not hypey.", active: false },
    { id: "faq", label: "FAQ / Q&A", inst: "FORMAT: FAQ — Question → Direct answer → Why it matters. 3-7 questions. Most common objections first.", active: false },
    { id: "behind_scenes", label: "Behind the scenes", inst: "FORMAT: Behind the scenes — Show the messy process. Raw > polished. Include what went wrong. Make the audience feel like insiders.", active: false },
    { id: "hot_take", label: "Hot take", inst: "FORMAT: Hot take — One bold contrarian statement. Under 50 words. No hedge. No disclaimer. Let it stand on its own.", active: false },
  ],
  tones: [
    { id: "educational", label: "Educational", inst: "TONE: Educational. Teach something. Break complexity into simple steps. 'Here's how' and 'here's why' framing. Be the expert who makes things simple.", active: true },
    { id: "provocative", label: "Provocative", inst: "TONE: Provocative. Challenge conventional wisdom. Contrarian take upfront. 'Unpopular opinion' energy without saying it. Make people stop and reconsider.", active: true },
    { id: "storytelling", label: "Storytelling", inst: "TONE: Storytelling. Lead with a specific moment in time. Sensory details. Build tension before the insight. Movie scene, not a lecture.", active: true },
    { id: "data_driven", label: "Data-driven", inst: "TONE: Data-driven. Lead with the most surprising number. Contrast expectations vs reality. 'X% think Y, but actually Z' framing.", active: true },
    { id: "casual", label: "Casual", inst: "TONE: Casual. Like texting a smart friend. Short sentences. Fragments okay. Show personality. Don't overthink it.", active: true },
    { id: "authoritative", label: "Authoritative", inst: "TONE: Authoritative. Deep expertise. Reference your experience. Be definitive, not wishy-washy. No hedging.", active: true },
    { id: "witty", label: "Witty / Humorous", inst: "TONE: Witty. Clever observations. Unexpected comparisons. Self-deprecating > punching down. Humor serves the point, it's not the point.", active: false },
    { id: "inspirational", label: "Inspirational", inst: "TONE: Inspirational. Real stories of transformation. Specific moments of change. Earned optimism, not empty motivation.", active: false },
    { id: "empathetic", label: "Empathetic", inst: "TONE: Empathetic. Name what they're feeling before giving advice. 'I've been there' energy. Validate first, solve second.", active: false },
    { id: "urgent", label: "Urgent / FOMO", inst: "TONE: Urgent. Time-sensitive framing. What they're losing by not acting. Specific deadlines or consequences. No fake scarcity.", active: false },
    { id: "vulnerable", label: "Vulnerable / Raw", inst: "TONE: Vulnerable. Share real failures, doubts, fears. No hero arc needed. The mess IS the message. Honesty > polish.", active: false },
    { id: "sarcastic", label: "Sarcastic / Dry", inst: "TONE: Sarcastic. Dry wit. Say the opposite of what you mean, then make the real point. Subtle > obvious. Never punch down.", active: false },
  ],
};

const TAG_COLORS = {
  topic: { bg: "rgba(255,215,0,0.12)", color: "#FFD700" },
  platform: { bg: "rgba(96,165,250,0.12)", color: "#60A5FA" },
  format: { bg: "rgba(244,114,182,0.12)", color: "#F472B6" },
  tone: { bg: "rgba(251,191,36,0.12)", color: "#FBBF24" },
  command: { bg: "rgba(167,139,250,0.12)", color: "#A78BFA" },
};

// ─── DEFAULT DATA ──────────────────────────────────────
const DEFAULT_PROFILE = {
  // Voice & Personality
  adjectives: "", dos: "", donts: "", catchphrases: "",
  // Content DNA
  oneLiner: "", pillars: "", mission: "", beliefs: "",
  // About Me
  name: "", role: "", background: "", story: "",
  // My Audience
  icp: "", painPoints: "", transformation: "",
  // Offers
  offers: [], usps: "",
  // Social Proof
  proof: [],
  // Links
  website: "", twitter: "", linkedin: "",
};

const PROFILE_LABELS = {
  adjectives: "5 Voice Adjectives", dos: "I DO (voice habits)", donts: "I DON'T (voice boundaries)", catchphrases: "Phrases & Expressions I Use",
  oneLiner: "One-liner / Bio", pillars: "Content Pillars (3-5 topics)", mission: "Why I Create Content", beliefs: "Strong Beliefs / Hot Takes",
  name: "Full Name", role: "Role / Title", background: "Background & Expertise", story: "My Origin Story",
  icp: "Who I Help (ICP)", painPoints: "Their Biggest Pain Points", transformation: "The Transformation I Deliver",
  usps: "Why Choose You? (Your USP)",
  website: "Website", twitter: "Twitter/X", linkedin: "LinkedIn",
};

const PROFILE_PLACEHOLDERS = {
  adjectives: "e.g. Direct, witty, no-BS, conversational, punchy",
  dos: "e.g. Use short sentences, tell stories, use metaphors, reference real numbers",
  donts: "e.g. Never use buzzwords, no passive voice, no filler, never start with 'In today's...'",
  catchphrases: "e.g. 'Here's the thing...', 'Let me be real', 'Stop doing X, start doing Y'",
  oneLiner: "e.g. I help founders turn expertise into content that sells",
  pillars: "e.g. Content strategy, Personal branding, AI for creators, Bootstrapping",
  mission: "e.g. To prove you don't need a big team to build a big brand",
  beliefs: "e.g. 'Most content advice is recycled garbage', 'Consistency is overrated — quality wins'",
  name: "e.g. David Pokorny",
  role: "e.g. Founder & Content Strategist",
  background: "e.g. 10 years in SaaS marketing, built 3 startups from scratch...",
  story: "e.g. I quit my corporate job after realizing nobody reads corporate content...",
  icp: "e.g. Solo founders making $10K-$100K/mo who want to grow through content",
  painPoints: "e.g. No time to create content, don't know what to post, sound generic",
  transformation: "e.g. From invisible expert to recognized authority in their niche",
  usps: "e.g. Built 50K+ followers with zero paid ads — all organic. No templates, no fluff, just real strategy that works.",
  website: "e.g. https://yoursite.com",
  twitter: "e.g. @yourhandle",
  linkedin: "e.g. linkedin.com/in/yourname",
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
  instructional: [
    { id: 5000, text: "Start with the outcome — what will they be able to do after reading this?", active: true },
    { id: 5001, text: "Number every step. No vague 'just do X' — be specific enough to follow.", active: true },
    { id: 5002, text: "Include one real example or scenario per major step.", active: true },
    { id: 5003, text: "Anticipate where they'll get stuck and address it proactively.", active: true },
    { id: 5004, text: "End with the expected result so they know if they did it right.", active: true },
  ],
  opinionated: [
    { id: 5010, text: "Lead with your strongest, most polarizing claim. No warming up.", active: true },
    { id: 5011, text: "Name what you're disagreeing with specifically — no vague 'most people think'.", active: true },
    { id: 5012, text: "Back your opinion with one concrete example or personal result.", active: true },
    { id: 5013, text: "Acknowledge the best counter-argument, then dismantle it.", active: true },
    { id: 5014, text: "End with a line that sticks — quotable, screenshot-worthy.", active: true },
  ],
  action: [
    { id: 5020, text: "Every sentence must pass the 'so what do I do?' test.", active: true },
    { id: 5021, text: "Use imperative voice: 'Do X' not 'You should consider X'.", active: true },
    { id: 5022, text: "Include specific numbers: timeframes, quantities, metrics.", active: true },
    { id: 5023, text: "Structure as a framework or checklist they can save and reuse.", active: true },
    { id: 5024, text: "No theory without application. Every insight must have an action step.", active: true },
    { id: 5025, text: "End with the single most impactful thing to do first.", active: true },
  ],
  philosophical: [
    { id: 5030, text: "Open with a question or paradox that reframes how they see the topic.", active: true },
    { id: 5031, text: "Use analogies and metaphors — connect unfamiliar ideas to familiar ones.", active: true },
    { id: 5032, text: "Slow the pace. Longer sentences are fine. Let ideas breathe.", active: true },
    { id: 5033, text: "Reference thinkers, books, or mental models where they deepen the point.", active: true },
    { id: 5034, text: "Don't resolve everything. Leave room for the reader to think.", active: true },
  ],
  observational: [
    { id: 5040, text: "Anchor to a specific, recent event, trend, or data point.", active: true },
    { id: 5041, text: "State what most people see, then reveal what they're missing.", active: true },
    { id: 5042, text: "Connect the observation to a broader pattern or prediction.", active: true },
    { id: 5043, text: "Cite the source — link, date, or specifics so it's verifiable.", active: true },
    { id: 5044, text: "End with your personal take: why this matters for your audience.", active: true },
    { id: 5045, text: "Write like it's happening now, not a history lesson.", active: true },
  ],
  hooks: [
    { id: 30, text: "Under 20 words max.", active: true },
    { id: 31, text: "No yes/no questions.", active: true },
    { id: 32, text: "Bold claim or surprising fact.", active: true },
    { id: 33, text: "Pattern interrupt (e.g. 'Stop doing X').", active: true },
  ],
  antiRobot: [
    // Banned words & verbs
    { id: 40, text: "NEVER use these words: 'delve', 'tapestry', 'landscape', 'testament', 'unleash', 'elevate', 'foster', 'leverage', 'harness', 'unlock', 'empower', 'optimize', 'streamline', 'revolutionize', 'amplify', 'cultivate', 'navigate', 'unpack'.", active: true },
    { id: 41, text: "No fluffy adjectives: 'game-changing', 'revolutionary', 'cutting-edge', 'state-of-the-art', 'groundbreaking', 'innovative', 'disruptive', 'seamless', 'robust', 'holistic', 'dynamic', 'scalable', 'agile', 'actionable', 'next-generation'.", active: true },
    { id: 42, text: "Use simple words over fancy ones: 'help' not 'facilitate', 'use' not 'utilize', 'to' not 'in order to', 'because' not 'due to the fact that', 'improve' not 'optimize'.", active: true },
    // Banned phrases
    { id: 5200, text: "NEVER open with: 'In today's...', 'Let's face it', 'Let's be honest', 'Picture this:', 'Imagine this:', 'You might be wondering', 'Here's the thing', 'The truth is', 'The reality is', 'Let's dive in'.", active: true },
    { id: 5201, text: "NEVER close with: 'In conclusion', 'To sum up', 'At the end of the day', 'Key takeaways:', 'Final thoughts:', 'Ready to take your X to the next level?', 'The time to act is now', 'What are you waiting for?'.", active: true },
    { id: 5202, text: "No business buzzwords: 'synergy', 'ecosystem', 'touchpoint', 'bandwidth', 'low-hanging fruit', 'move the needle', 'paradigm shift', 'thought leader', 'best practices', 'value-add', 'end-to-end', 'table stakes'.", active: true },
    // Structural patterns
    { id: 5203, text: "No hedging language: avoid 'It's worth noting that', 'It's important to understand', 'It should be mentioned', 'One might argue', 'It could be said'. Commit to statements — don't soften every claim with 'may', 'might', 'potentially', 'arguably'.", active: true },
    { id: 5204, text: "No mechanical transitions: don't start sentences with 'However,', 'Moreover,', 'Furthermore,', 'Additionally,', 'Nevertheless,', 'Consequently,', 'Thus,'. Let ideas flow naturally.", active: true },
    { id: 5205, text: "No 'not only/just X, but also Y' structures. No 'While X is important, Y is crucial'. No 'On one hand... on the other hand'. Write direct statements instead.", active: true },
    { id: 5206, text: "No meta-commentary: never say 'As mentioned earlier', 'As we discussed', 'Remember that', 'Don't forget', 'Keep in mind that'. Don't tell the reader what you're about to tell them.", active: true },
    // Tone & formatting
    { id: 5207, text: "No false enthusiasm: no excessive exclamation points, no 'Exciting news!', 'Amazing results!', 'Incredible impact!'. If something is good, show why — don't shout it.", active: true },
    { id: 5208, text: "No fake relatability: never say 'We've all been there', 'You know the feeling', 'Sound familiar?'. Don't create strawman problems or oversimplify emotions.", active: true },
    { id: 5209, text: "No rhetorical question filler: don't use 'Why does this matter?', 'What does this mean for you?', 'So what's the solution?' as lazy transitions. Don't ask a question then immediately answer it.", active: true },
    { id: 5210, text: "No connector clichés: never use 'That's where X comes in', 'This is where X shines', 'Enter: [solution]', 'But wait, there's more', 'And that's not all'.", active: true },
    { id: 5211, text: "Don't overuse em dashes (—) for dramatic pauses. Don't default to bullet points when a paragraph works better. Don't put a colon before every explanation.", active: true },
    { id: 5212, text: "Vary sentence structure and paragraph length naturally. Don't make every paragraph 3-4 sentences. Don't start multiple sentences the same way. Don't repeat the same key term in every sentence.", active: true },
    { id: 5213, text: "No overexplaining: don't explain concepts the audience already knows. Don't use 100 words when 20 will do. If it needs a 'TLDR' it's too long.", active: true },
    { id: 5214, text: "No vague attribution: never say 'Studies show', 'Research indicates', 'According to experts', 'X% of businesses' without naming the specific source.", active: true },
  ],
  seo: [
    { id: 5100, text: "SEO Title: Under 60 characters. Include primary keyword near the front. Make it click-worthy.", active: true },
    { id: 5101, text: "Meta Description: 150-160 characters. Summarize the value. Include a reason to click.", active: true },
    { id: 5102, text: "URL Slug: Short, lowercase, hyphens only. 3-5 words max. No filler words (the, a, and).", active: true },
    { id: 5103, text: "FAQ Section: 5 questions people would actually Google about this topic.", active: true },
    { id: 5104, text: "FAQ Answers: 2-3 sentences each. Direct, specific, no fluff. Start with the answer.", active: true },
  ],
  // Format-specific rules (id-based keys)
  fmt_short_post: [
    { id: 100, text: "One idea per post. No multi-topic posts.", active: true },
    { id: 101, text: "Front-load the value — readers decide in 2 seconds.", active: true },
    { id: 102, text: "Use line breaks for readability. No walls of text.", active: true },
    { id: 103, text: "Write at a 6th-grade reading level. Simple words, short sentences.", active: true },
    { id: 104, text: "Remove every word that doesn't add meaning. Ruthlessly cut filler.", active: true },
    { id: 105, text: "End with a single clear action: question, CTA, or bold statement.", active: true },
    { id: 106, text: "If it needs a 'TLDR' it's too long. The whole post IS the TLDR.", active: true },
  ],
  fmt_long_post: [
    { id: 110, text: "Open with a hook that creates a gap — promise something the reader needs to know.", active: true },
    { id: 111, text: "Use white space aggressively. One thought per paragraph. Short paragraphs (1-3 sentences).", active: true },
    { id: 112, text: "End with a takeaway the reader can act on today — not vague inspiration.", active: true },
    { id: 113, text: "Each paragraph should earn the next one — if a section doesn't add value, cut it.", active: true },
    { id: 114, text: "Include a turning point or 'plot twist' — surprise the reader mid-post.", active: true },
    { id: 115, text: "Use concrete examples and specifics, not abstract advice. Show don't tell.", active: true },
    { id: 116, text: "Structure with a clear arc: setup → tension/problem → insight → resolution/takeaway.", active: true },
    { id: 117, text: "Bold or capitalize key phrases to help skimmers get the core message.", active: true },
  ],
  fmt_carousel: [
    { id: 120, text: "Slide 1 is the hook — treat it like a billboard. Bold claim, curiosity gap, or surprising stat.", active: true },
    { id: 121, text: "One key point per slide. If you need to explain it, simplify it.", active: true },
    { id: 122, text: "Last slide: clear CTA (save for later, follow for more, drop a comment, share with someone).", active: true },
    { id: 123, text: "Keep text per slide to 3-4 lines max. Use large readable font sizes.", active: true },
    { id: 124, text: "Aim for 7-10 slides. Under 5 feels thin, over 12 loses attention.", active: true },
    { id: 125, text: "Slide 2 should set context or make a promise — 'Here's what most people get wrong...'", active: true },
    { id: 126, text: "Use numbered lists, frameworks, or step-by-step progressions — carousels reward structure.", active: true },
    { id: 127, text: "Each slide must make sense on its own — people screenshot and share individual slides.", active: true },
    { id: 128, text: "Include a 'save-worthy' slide — a framework, checklist, or cheat sheet people want to reference later.", active: true },
  ],
  fmt_thread: [
    { id: 130, text: "First tweet is everything — must stop the scroll AND make people click 'Show this thread'.", active: true },
    { id: 131, text: "Each tweet must stand alone and deliver value even if read in isolation.", active: true },
    { id: 132, text: "Number tweets for easy reference and to signal thread length (1/10, 2/10, etc.).", active: true },
    { id: 133, text: "End with a summary of key points + CTA to retweet tweet 1 for reach.", active: true },
    { id: 134, text: "Keep thread to 5-12 tweets. Under 5 should be a single post. Over 12 loses readers.", active: true },
    { id: 135, text: "Use one tweet as a pattern interrupt — a surprising stat, contrarian take, or personal confession.", active: true },
    { id: 136, text: "Tweet 2 should provide context or setup — 'Here's the backstory...' or 'Let me explain...'", active: true },
    { id: 137, text: "Vary tweet structure: mix short punchy tweets with slightly longer ones. Don't be monotone.", active: true },
    { id: 138, text: "Every tweet should make the reader want to read the next one. Use cliffhangers between tweets.", active: true },
  ],
  fmt_comment_reply: [
    { id: 140, text: "Add a unique perspective — don't just agree, extend the idea or offer a counterpoint.", active: true },
    { id: 141, text: "Keep it concise: 1-3 sentences max. Respect the original poster's space.", active: true },
    { id: 142, text: "Reference a specific point from the original post to show you actually read it.", active: true },
    { id: 143, text: "Add personal experience or a concrete example that supports or challenges the original point.", active: true },
    { id: 144, text: "End with a question or observation that continues the conversation — don't dead-end the thread.", active: true },
    { id: 145, text: "Never start with 'Great post!' or generic praise. Lead with your actual insight.", active: true },
    { id: 146, text: "Match the tone of the original post — don't be overly formal on a casual thread or vice versa.", active: true },
  ],
  fmt_research_paper: [
    { id: 150, text: "Lead with the key finding or conclusion before explaining the methodology.", active: true },
    { id: 151, text: "Structure: finding → evidence → implication → what the reader should do with this.", active: true },
    { id: 152, text: "Cite specific studies with author names, publication year, and sample sizes where available.", active: true },
    { id: 153, text: "Acknowledge limitations and counter-arguments — this builds credibility, not weakness.", active: true },
    { id: 154, text: "Translate academic jargon into plain language. Write for a smart generalist, not a specialist.", active: true },
    { id: 155, text: "Include at least 3 specific data points (percentages, dollar amounts, timeframes, sample sizes).", active: true },
    { id: 156, text: "Compare findings to what the audience currently believes — highlight what's surprising or counterintuitive.", active: true },
    { id: 157, text: "End with practical implications — 'So what does this mean for you?' is the most important question.", active: true },
    { id: 158, text: "Use 'According to [source]' and 'Research from [institution] shows' — never present findings as your own opinions.", active: true },
  ],
  fmt_engagement_bait: [
    { id: 160, text: "Ask questions with no single right answer — opinions are easier to share than facts.", active: true },
    { id: 161, text: "Use proven formats: 'this or that', ranking challenges, 'unpopular opinion', fill-in-the-blank, 'what would you do'.", active: true },
    { id: 162, text: "Keep it short — the entire post should be readable in under 5 seconds.", active: true },
    { id: 163, text: "Make it low-effort to respond. One-word answers should be valid. Lower the barrier to comment.", active: true },
    { id: 164, text: "Be slightly polarizing — pick a side or make a claim that splits the audience 60/40.", active: true },
    { id: 165, text: "Use the 'identity trigger' — people engage when a post speaks to who they are (role, experience, belief).", active: true },
    { id: 166, text: "Avoid yes/no questions — they kill engagement. Use open-ended or 'which one' style prompts.", active: true },
    { id: 167, text: "Tap into nostalgia, shared frustrations, or industry inside jokes — emotional resonance drives replies.", active: true },
    { id: 168, text: "No links, no images (unless the image IS the bait) — algorithm rewards text-only engagement posts.", active: true },
  ],
  // Platform-specific rules
  plt_twitter: [
    { id: 1001, text: "HARD LIMIT: 280 characters. Count every character. 281 = unpublishable.", active: true },
    { id: 1002, text: "One thought per tweet. No multi-point tweets.", active: true },
    { id: 1003, text: "No hashtags unless specifically requested.", active: true },
    { id: 1004, text: "Write for the timeline — it must stop the scroll in a sea of noise.", active: true },
    { id: 1005, text: "Fragments and incomplete sentences are fine. Conversational > grammatically correct.", active: true },
    { id: 1006, text: "If it works as a text message to a smart friend, it works as a tweet.", active: true },
  ],
  plt_linkedin: [
    { id: 1010, text: "First line must hook before the '...see more' fold — make it impossible not to click.", active: true },
    { id: 1011, text: "One thought per line. Use generous white space for mobile readability.", active: true },
    { id: 1012, text: "Include a personal angle — LinkedIn rewards vulnerability and first-person perspective.", active: true },
    { id: 1013, text: "End with a question or CTA that drives comments — engagement signals boost reach.", active: true },
    { id: 1014, text: "No inspirational platitudes. No 'I'm humbled'. No 'Agree?' as the only CTA.", active: true },
    { id: 1015, text: "150-300 word sweet spot. Under 100 feels light. Over 400 risks losing readers.", active: true },
  ],
  plt_blog: [
    { id: 1020, text: "Use subheadings every 200-300 words. Skimmers should get the full picture from headers alone.", active: true },
    { id: 1021, text: "800-1500 words. Under 500 feels thin. Over 2000 requires very compelling content.", active: true },
    { id: 1022, text: "Open with a hook, not throat-clearing. The first paragraph should be the reason to keep reading.", active: true },
    { id: 1023, text: "Include at least one personal story or specific real-world example.", active: true },
    { id: 1024, text: "Bold key phrases for skimmers. Short paragraphs (1-3 sentences max).", active: true },
    { id: 1025, text: "End with an actionable takeaway — what should the reader DO after reading this?", active: true },
  ],
  plt_newsletter: [
    { id: 1030, text: "Write like you're emailing a smart friend. Intimate, not broadcast-y.", active: true },
    { id: 1031, text: "One big idea per issue. Don't dilute with multiple topics.", active: true },
    { id: 1032, text: "Personal opener: what you're thinking about, what happened, what you're working on.", active: true },
    { id: 1033, text: "End with something that invites a reply — build the 1-on-1 relationship.", active: true },
    { id: 1034, text: "Structure: personal hook → main insight → supporting points → what to do about it.", active: true },
  ],
  // Tone-specific rules
  tone_educational: [
    { id: 2001, text: "Lead with the 'why this matters' before diving into the 'how'.", active: true },
    { id: 2002, text: "Break complex ideas into numbered steps or sequential logic.", active: true },
    { id: 2003, text: "Use analogies from everyday life to explain abstract concepts.", active: true },
    { id: 2004, text: "Include at least one 'common mistake' or 'most people think X, but actually Y' moment.", active: true },
    { id: 2005, text: "End with a clear takeaway the reader can apply immediately.", active: true },
    { id: 2006, text: "Be the expert who simplifies — never the expert who shows off complexity.", active: true },
  ],
  tone_provocative: [
    { id: 2010, text: "Open with your strongest contrarian claim — don't build up to it, lead with it.", active: true },
    { id: 2011, text: "Challenge a specific widely-held belief, not a straw man.", active: true },
    { id: 2012, text: "Back up the hot take with evidence, experience, or logic — contrarian without substance is just trolling.", active: true },
    { id: 2013, text: "Acknowledge what the other side gets right before dismantling it.", active: true },
    { id: 2014, text: "End with a question that forces the reader to reconsider their position.", active: true },
    { id: 2015, text: "Be confident, not aggressive. Swagger, not anger.", active: true },
  ],
  tone_storytelling: [
    { id: 2020, text: "Open in a specific moment in time — 'It was 3am and I was staring at...' not 'Let me tell you a story'.", active: true },
    { id: 2021, text: "Include sensory details: what you saw, heard, felt. Make the reader experience it.", active: true },
    { id: 2022, text: "Build tension before the insight — the lesson lands harder after the struggle.", active: true },
    { id: 2023, text: "Use dialogue where possible — it makes scenes come alive.", active: true },
    { id: 2024, text: "The insight should feel earned by the story, not tacked on at the end.", active: true },
    { id: 2025, text: "Show vulnerability — the best stories include moments of doubt, failure, or fear.", active: true },
  ],
  tone_data_driven: [
    { id: 2030, text: "Lead with the most surprising or counterintuitive data point.", active: true },
    { id: 2031, text: "Always cite the source: who found it, when, and how (sample size if relevant).", active: true },
    { id: 2032, text: "Use comparisons to make numbers meaningful — '$50M' means less than '$50M — more than the GDP of Tonga'.", active: true },
    { id: 2033, text: "Contrast expectations vs reality — 'Most people think X%, but it's actually Y%'.", active: true },
    { id: 2034, text: "Include at least 3 specific data points (percentages, dollar amounts, timeframes).", active: true },
    { id: 2035, text: "End with 'what this means for you' — translate data into action.", active: true },
  ],
  tone_casual: [
    { id: 2040, text: "Write like you're texting a smart friend. Short sentences. Fragments are fine.", active: true },
    { id: 2041, text: "Use 'you' and 'I' liberally. This is a conversation, not an article.", active: true },
    { id: 2042, text: "Parenthetical asides are great (they feel like you're letting the reader in on something).", active: true },
    { id: 2043, text: "Don't overthink transitions. 'Anyway,' and 'So here's the thing' work perfectly.", active: true },
    { id: 2044, text: "Show personality through word choice — your voice should be unmistakably yours.", active: true },
    { id: 2045, text: "Punctuation is a tool, not a rule. Em dashes, ellipses, and single-word sentences all fair game.", active: true },
  ],
  tone_authoritative: [
    { id: 2050, text: "Be definitive. 'This is how it works' not 'I think maybe this could work'.", active: true },
    { id: 2051, text: "Reference your experience: years in the field, results achieved, lessons learned the hard way.", active: true },
    { id: 2052, text: "Use precise language. Replace 'a lot' with a number. Replace 'soon' with a date.", active: true },
    { id: 2053, text: "No hedging words: remove 'maybe', 'perhaps', 'I think', 'kind of', 'sort of'.", active: true },
    { id: 2054, text: "Structure with clear frameworks or mental models — authority comes from organized thinking.", active: true },
    { id: 2055, text: "Acknowledge nuance without being wishy-washy — 'Here's the exception...' not 'Well it depends...'.", active: true },
  ],
  // ─── New tone rules ───
  tone_witty: [
    { id: 2060, text: "Lead with an unexpected comparison or analogy — surprise creates humor.", active: true },
    { id: 2061, text: "Self-deprecating > punching down. Laugh at yourself, not at others.", active: true },
    { id: 2062, text: "The humor serves the insight. The joke should make the point land harder.", active: true },
    { id: 2063, text: "Use timing — short setups with unexpected punchlines. Brevity is the soul of wit.", active: true },
    { id: 2064, text: "Observational humor works best: 'isn't it weird that...' or 'nobody talks about...'", active: true },
    { id: 2065, text: "Never explain the joke. If it needs explanation, rewrite it.", active: true },
  ],
  tone_inspirational: [
    { id: 2070, text: "Root inspiration in a REAL moment of transformation — specific time, place, feeling.", active: true },
    { id: 2071, text: "Earned optimism only. Show the struggle before the triumph. No skipping to the mountaintop.", active: true },
    { id: 2072, text: "Name the specific fear or doubt you overcame — make it relatable.", active: true },
    { id: 2073, text: "End with something actionable, not just motivational fluff.", active: true },
    { id: 2074, text: "Avoid clichés: no 'chase your dreams', 'never give up', or 'believe in yourself'.", active: true },
    { id: 2075, text: "One transformation story per post. Depth > breadth.", active: true },
  ],
  tone_empathetic: [
    { id: 2080, text: "Name what they're feeling BEFORE offering advice. Validation first.", active: true },
    { id: 2081, text: "'I've been there' energy — share your own experience with the same struggle.", active: true },
    { id: 2082, text: "Use 'you' language: 'If you've ever felt...' or 'You're not alone in thinking...'", active: true },
    { id: 2083, text: "Never minimize: avoid 'just', 'simply', or 'it's easy to' when discussing real pain points.", active: true },
    { id: 2084, text: "Offer support without condescension — peer-to-peer, not expert-to-student.", active: true },
    { id: 2085, text: "End with permission or reassurance: 'it's okay to...', 'you don't have to...'", active: true },
  ],
  tone_urgent: [
    { id: 2090, text: "Open with what's at stake — what they're losing by waiting.", active: true },
    { id: 2091, text: "Use specific timelines: 'in the next 6 months' not 'soon'.", active: true },
    { id: 2092, text: "Show the cost of inaction with concrete numbers or consequences.", active: true },
    { id: 2093, text: "Create real urgency, not fake scarcity. The deadline must be genuine.", active: true },
    { id: 2094, text: "One clear action step — don't overwhelm with 10 things to do now.", active: true },
    { id: 2095, text: "End with 'start today' energy, not panic. Urgency should motivate, not paralyze.", active: true },
  ],
  tone_vulnerable: [
    { id: 2100, text: "Share the real thing, not the sanitized version. Include the ugly details.", active: true },
    { id: 2101, text: "No hero arc required — sometimes the mess IS the message.", active: true },
    { id: 2102, text: "Name the specific emotions: 'I was terrified' not 'it was challenging'.", active: true },
    { id: 2103, text: "Don't wrap it in a neat bow. Unresolved is okay. In-progress is okay.", active: true },
    { id: 2104, text: "Write it like a journal entry, then edit for clarity. Keep the rawness.", active: true },
    { id: 2105, text: "Vulnerability without insight is just venting. Share what you learned or are learning.", active: true },
  ],
  tone_sarcastic: [
    { id: 2110, text: "Say the opposite of what you mean, then reveal the real point. Setup → subversion.", active: true },
    { id: 2111, text: "Use deadpan delivery — understatement is funnier than exaggeration.", active: true },
    { id: 2112, text: "Target systems, trends, and ideas — never individuals or groups.", active: true },
    { id: 2113, text: "Include a 'clearly' or 'obviously' before stating something absurd.", active: true },
    { id: 2114, text: "The sarcasm should make people think, not just laugh.", active: true },
    { id: 2115, text: "End with the genuine insight. Sarcasm is the vehicle, not the destination.", active: true },
  ],
  // ─── Missing platform rules ───
  plt_instagram_feed: [
    { id: 3000, text: "First line of caption must hook — it shows before 'more' on the feed.", active: true },
    { id: 3001, text: "150-300 words for captions. Pair with strong visual that stops the scroll.", active: true },
    { id: 3002, text: "Use line breaks for readability. One thought per line on mobile.", active: true },
    { id: 3003, text: "End with a CTA: 'Save this', 'Share with someone who needs this', 'Drop a [emoji] if you agree'.", active: true },
    { id: 3004, text: "3-5 relevant hashtags max, placed at the end or in comments.", active: true },
    { id: 3005, text: "Write for the caption reader, not the scroller — they already stopped for the image.", active: true },
  ],
  plt_instagram_reels: [
    { id: 3010, text: "Hook in the first 1-2 seconds. Text overlay must be readable in motion.", active: true },
    { id: 3011, text: "15-60 seconds optimal. Under 30 for maximum completion rate.", active: true },
    { id: 3012, text: "Script for spoken delivery: short sentences, natural pauses, conversational.", active: true },
    { id: 3013, text: "Include a pattern interrupt every 5-7 seconds to keep attention.", active: true },
    { id: 3014, text: "Caption should add context the video doesn't cover. Don't just repeat the script.", active: true },
    { id: 3015, text: "End with a reason to watch again or share: surprise ending, useful tip, or relatable punchline.", active: true },
  ],
  plt_tiktok: [
    { id: 3020, text: "Hook in first 1 second. 'Here's why...' or 'Stop scrolling if...' — address the viewer directly.", active: true },
    { id: 3021, text: "15-60 seconds. Every second must earn the next. No slow intros.", active: true },
    { id: 3022, text: "Conversational, unpolished delivery. Authenticity > production value.", active: true },
    { id: 3023, text: "Use trending sounds/formats when relevant, but make the content yours.", active: true },
    { id: 3024, text: "Speak fast but clearly. TikTok audiences have zero patience for rambling.", active: true },
    { id: 3025, text: "End with a loop trigger or cliffhanger to boost rewatch and completion rates.", active: true },
  ],
  plt_threads: [
    { id: 3030, text: "500 character limit per post. Punchy and opinionated.", active: true },
    { id: 3031, text: "First line is the whole pitch — if they don't click, make the first line worth reading alone.", active: true },
    { id: 3032, text: "Conversational, casual tone. Threads rewards authenticity over polish.", active: true },
    { id: 3033, text: "Reply-bait endings: ask a question, make a bold claim, or leave something open.", active: true },
    { id: 3034, text: "No hashtags. No cross-posting vibes. Write natively for the platform.", active: true },
    { id: 3035, text: "Thread series (multi-post) work like Twitter threads but more casual.", active: true },
  ],
  plt_facebook: [
    { id: 3040, text: "Longer text performs well (200-500 words). Facebook rewards time-on-post.", active: true },
    { id: 3041, text: "Personal stories and emotional content get the most engagement.", active: true },
    { id: 3042, text: "Write for shares, not just likes — 'tag someone who...' or 'share if you agree'.", active: true },
    { id: 3043, text: "Native video and photos outperform links. Include media when possible.", active: true },
    { id: 3044, text: "Community-building tone: 'What do you think?' and genuine questions drive comments.", active: true },
    { id: 3045, text: "Avoid clickbait patterns — Facebook actively demotes engagement bait.", active: true },
  ],
  plt_reddit: [
    { id: 3050, text: "Value-first. Reddit users will downvote anything that smells like self-promotion.", active: true },
    { id: 3051, text: "Match the subreddit's culture and tone. Lurk before you post.", active: true },
    { id: 3052, text: "Detailed, well-structured posts perform best. Use headers, bullet points, TLDRs.", active: true },
    { id: 3053, text: "Include a TLDR at the top or bottom for long posts. Reddit expects it.", active: true },
    { id: 3054, text: "Be genuine. Reddit users have the best BS detectors on the internet.", active: true },
    { id: 3055, text: "Engage in comments — the discussion IS the content on Reddit.", active: true },
  ],
  plt_youtube: [
    { id: 3060, text: "Title: under 60 characters. Include the primary keyword. Promise a specific outcome.", active: true },
    { id: 3061, text: "First 30 seconds = retention hook. State what they'll learn and why they should stay.", active: true },
    { id: 3062, text: "Script for 8-15 minutes optimal. Structure: hook → problem → solution → proof → CTA.", active: true },
    { id: 3063, text: "Include timestamps in description for key sections. Helps SEO and viewer experience.", active: true },
    { id: 3064, text: "Pattern interrupts every 2-3 minutes: B-roll, graphics, story, or tonal shift.", active: true },
    { id: 3065, text: "End with a specific CTA: subscribe, watch next video, or comment a specific word.", active: true },
  ],
  plt_youtube_shorts: [
    { id: 3070, text: "Under 60 seconds. Ideally 15-30 seconds for maximum completion rate.", active: true },
    { id: 3071, text: "Hook in first 1 second. No intros, no logos, straight to the point.", active: true },
    { id: 3072, text: "One tip, one idea, one moment. Shorts are not mini-videos — they're single punches.", active: true },
    { id: 3073, text: "Vertical format (9:16). Text overlays must be centered and readable.", active: true },
    { id: 3074, text: "Loop-worthy content gets pushed by the algorithm. End where you began.", active: true },
    { id: 3075, text: "Speak directly to camera. Energy and pace matter more than production quality.", active: true },
  ],
  plt_pinterest: [
    { id: 3080, text: "Vertical image (2:3 ratio). Bold text overlay that's readable at thumbnail size.", active: true },
    { id: 3081, text: "Title: include keywords people actually search for. Pinterest is a search engine.", active: true },
    { id: 3082, text: "Description: 200-300 characters. Natural keywords, not keyword stuffing.", active: true },
    { id: 3083, text: "Evergreen content performs best. Avoid time-sensitive references.", active: true },
    { id: 3084, text: "Include a clear benefit: '10 ways to...' or 'How to...' formats dominate.", active: true },
    { id: 3085, text: "Link to valuable destination. Pinterest rewards pins that drive useful outbound clicks.", active: true },
  ],
  plt_medium: [
    { id: 3090, text: "Headline: specific and benefit-driven. 'How I [specific result] in [timeframe]' outperforms vague titles.", active: true },
    { id: 3091, text: "Subtitle: expand on the headline promise. This is your second hook.", active: true },
    { id: 3092, text: "800-2000 words. 6-8 minute read time is the sweet spot for Medium.", active: true },
    { id: 3093, text: "Use subheadings, pull quotes, and images to break up text. Scannability matters.", active: true },
    { id: 3094, text: "First 100 words must hook non-followers — this is what shows in previews.", active: true },
    { id: 3095, text: "End with a personal reflection, not a generic CTA. Medium readers want depth.", active: true },
  ],
  plt_substack: [
    { id: 3100, text: "Subject line is everything — it determines open rate. Be specific, not clever.", active: true },
    { id: 3101, text: "Write like a letter to one person, not a broadcast to thousands.", active: true },
    { id: 3102, text: "One big idea per issue. Go deep, not wide.", active: true },
    { id: 3103, text: "Personal opener: what you've been thinking about, what prompted this issue.", active: true },
    { id: 3104, text: "Include one thing readers can't get anywhere else — your unique take or framework.", active: true },
    { id: 3105, text: "End with a question or prompt that invites replies. Build the relationship.", active: true },
  ],
  plt_podcast_script: [
    { id: 3110, text: "Cold open with a teaser: the most interesting thing you'll say in the episode.", active: true },
    { id: 3111, text: "Write for the ear, not the eye. Short sentences. Conversational rhythm.", active: true },
    { id: 3112, text: "Include transition phrases: 'Here's where it gets interesting...' or 'Now, here's the thing...'", active: true },
    { id: 3113, text: "Structure: hook → context → 3 key points → story/example → takeaway → CTA.", active: true },
    { id: 3114, text: "Script key moments (intro, transitions, CTA) loosely. Bullet-point the rest for natural delivery.", active: true },
    { id: 3115, text: "15-30 minutes for solo episodes. Include timestamps for chapters.", active: true },
  ],
  plt_video_script: [
    { id: 3120, text: "First 15 seconds = hook. State the problem, tease the solution, or ask a provocative question.", active: true },
    { id: 3121, text: "Script for spoken delivery: read it aloud. If it sounds unnatural, rewrite it.", active: true },
    { id: 3122, text: "Include [B-ROLL], [GRAPHIC], [CUT TO] cues for visual variety.", active: true },
    { id: 3123, text: "8-15 minute script. Structure: hook → problem → solution → examples → CTA.", active: true },
    { id: 3124, text: "Pattern interrupt every 2-3 minutes: change location, show a graphic, or shift energy.", active: true },
    { id: 3125, text: "End with a specific next step and verbal CTA: subscribe, comment, or watch next.", active: true },
  ],
  plt_short_video_script: [
    { id: 3130, text: "Under 60 seconds total. Ideally 15-30 seconds for max retention.", active: true },
    { id: 3131, text: "Hook in first 2 seconds — no intro, no 'hey guys', straight to value.", active: true },
    { id: 3132, text: "One point only. If you need to say 'and also' — make it a separate video.", active: true },
    { id: 3133, text: "Script for direct-to-camera delivery. Conversational, high energy, no filler.", active: true },
    { id: 3134, text: "Include text overlay cues in [BRACKETS] for key points.", active: true },
    { id: 3135, text: "End with a hook for engagement: question, challenge, or 'follow for part 2'.", active: true },
  ],
  plt_sales_page: [
    { id: 3140, text: "Above the fold: headline + subheadline + CTA. No scrolling needed to understand the offer.", active: true },
    { id: 3141, text: "Pain → Agitate → Solution structure. Name their problem better than they can.", active: true },
    { id: 3142, text: "Social proof early: testimonials, logos, specific results (numbers > adjectives).", active: true },
    { id: 3143, text: "Address the top 3-5 objections directly. FAQ section or inline.", active: true },
    { id: 3144, text: "Multiple CTAs throughout — at least 3 'buy' buttons on a long page.", active: true },
    { id: 3145, text: "Write for the skeptic, not the fan. Every claim needs proof.", active: true },
  ],
  plt_presentation: [
    { id: 3150, text: "One idea per slide. If the slide needs a paragraph, split it.", active: true },
    { id: 3151, text: "10-15 slides max. Title + problem + solution + evidence + CTA.", active: true },
    { id: 3152, text: "Text per slide: max 5 bullet points OR one bold statement.", active: true },
    { id: 3153, text: "Include speaker notes with talking points and transitions.", active: true },
    { id: 3154, text: "Use the slide as a billboard — speak the details, show the headline.", active: true },
    { id: 3155, text: "Open with a surprising stat or question. Never start with 'Today I'll talk about...'", active: true },
  ],
  plt_product_hunt: [
    { id: 3160, text: "Tagline: under 60 characters. Benefit-driven, not feature-driven.", active: true },
    { id: 3161, text: "Description: 3-4 lines. Problem → Solution → Why now. That's it.", active: true },
    { id: 3162, text: "Maker-voiced and authentic. No corporate speak. You're a person, not a brand.", active: true },
    { id: 3163, text: "Include a personal 'why I built this' story in the first comment.", active: true },
    { id: 3164, text: "Ask for feedback, not just upvotes. Genuine engagement wins on PH.", active: true },
    { id: 3165, text: "Gallery images should tell the story: problem → solution → result in 3-5 images.", active: true },
  ],
  // ─── New format rules ───
  fmt_listicle: [
    { id: 4000, text: "5-10 items is the sweet spot. Under 5 feels thin, over 10 loses focus.", active: true },
    { id: 4001, text: "Each item: bold statement as headline + 1-2 sentences of context.", active: true },
    { id: 4002, text: "Order matters — lead with the most surprising or counterintuitive item.", active: true },
    { id: 4003, text: "The intro must answer: 'Why should I read this list?' in 1-2 sentences.", active: true },
    { id: 4004, text: "Mix levels: some items are simple, some are surprising, some are advanced.", active: true },
    { id: 4005, text: "End with a bonus item or unexpected addition that adds extra value.", active: true },
  ],
  fmt_how_to_guide: [
    { id: 4010, text: "Number every step. 'Step 1:' format. Clear start-to-finish progression.", active: true },
    { id: 4011, text: "Each step: what to do + why it works + common mistake to avoid.", active: true },
    { id: 4012, text: "Start with the expected result: 'By the end of this, you'll be able to...'", active: true },
    { id: 4013, text: "Include prerequisites or tools needed before step 1.", active: true },
    { id: 4014, text: "5-8 steps max. If it's more, break it into parts.", active: true },
    { id: 4015, text: "End with the expected result + a 'next level' tip for advanced readers.", active: true },
  ],
  fmt_case_study: [
    { id: 4020, text: "Structure: Before state → Challenge → What we did → Results → Lessons.", active: true },
    { id: 4021, text: "Include specific numbers: revenue, time saved, growth percentage, timeline.", active: true },
    { id: 4022, text: "Name the specific challenge, not a vague 'they had problems'.", active: true },
    { id: 4023, text: "Let the results prove the point — don't oversell what happened.", active: true },
    { id: 4024, text: "Include a direct quote from the client/user if possible.", active: true },
    { id: 4025, text: "End with a transferable lesson the reader can apply to their own situation.", active: true },
  ],
  fmt_comparison: [
    { id: 4030, text: "Clear criteria for comparison: list 3-5 dimensions you're evaluating.", active: true },
    { id: 4031, text: "Be opinionated. 'It depends' is not a conclusion. Pick a winner for each use case.", active: true },
    { id: 4032, text: "Acknowledge strengths of both sides — one-sided comparisons lose credibility.", active: true },
    { id: 4033, text: "Include a 'best for' recommendation at the end: X if you need A, Y if you need B.", active: true },
    { id: 4034, text: "Use concrete examples, not abstract features: 'X loads in 0.3s' not 'X is fast'.", active: true },
    { id: 4035, text: "Side-by-side table or list format for easy scanning.", active: true },
  ],
  fmt_quote_card: [
    { id: 4040, text: "One powerful line. Under 15 words. It must work completely on its own.", active: true },
    { id: 4041, text: "The quote should be screenshot-worthy — something people want to save and share.", active: true },
    { id: 4042, text: "Add 1-2 lines of context below: why this matters or what prompted the thought.", active: true },
    { id: 4043, text: "Original quotes > attributed quotes. Your own words hit different.", active: true },
    { id: 4044, text: "Test it: if you saw this on someone's story, would you screenshot it?", active: true },
  ],
  fmt_poll: [
    { id: 4050, text: "2-4 options only. More than 4 causes decision paralysis.", active: true },
    { id: 4051, text: "Frame the question to split opinion roughly evenly — obvious answers kill engagement.", active: true },
    { id: 4052, text: "Add your own take in the caption to drive comments beyond just voting.", active: true },
    { id: 4053, text: "Use polls to validate ideas, test assumptions, or spark debate.", active: true },
    { id: 4054, text: "Follow up with results and your analysis — people love seeing the outcome.", active: true },
  ],
  fmt_announcement: [
    { id: 4060, text: "Lead with the news, not the backstory. What happened? Say it in the first line.", active: true },
    { id: 4061, text: "Follow with why it matters to the READER, not why it matters to you.", active: true },
    { id: 4062, text: "Keep excitement genuine. If it's a small update, own that. Overhyping backfires.", active: true },
    { id: 4063, text: "Include a clear next step: link, date, action the reader can take.", active: true },
    { id: 4064, text: "End with gratitude or a question that invites community into the moment.", active: true },
  ],
  fmt_faq: [
    { id: 4070, text: "Lead with the most common objection or question — address the elephant first.", active: true },
    { id: 4071, text: "Each answer: direct response in the first sentence, then context.", active: true },
    { id: 4072, text: "3-7 questions. If it's more, split into parts or topics.", active: true },
    { id: 4073, text: "Use the actual language your audience uses, not your internal jargon.", active: true },
    { id: 4074, text: "End each answer with 'Why this matters' or a benefit statement.", active: true },
  ],
  fmt_behind_scenes: [
    { id: 4080, text: "Show the messy reality. Raw photos, real numbers, actual struggles.", active: true },
    { id: 4081, text: "Include what went wrong, not just what went right.", active: true },
    { id: 4082, text: "Make the audience feel like insiders — 'here's what I usually don't share...'", active: true },
    { id: 4083, text: "Include specific details: tools used, hours spent, decisions made.", active: true },
    { id: 4084, text: "End with a lesson or realization — not just 'here's my desk'.", active: true },
  ],
  fmt_hot_take: [
    { id: 4090, text: "One bold statement. Under 50 words. No hedge. No disclaimer.", active: true },
    { id: 4091, text: "The take should split your audience at least 60/40 — if everyone agrees, it's not hot enough.", active: true },
    { id: 4092, text: "Back it up with one piece of evidence or personal experience.", active: true },
    { id: 4093, text: "Don't soften it with 'just my opinion' or 'but everyone's different'. Own it.", active: true },
    { id: 4094, text: "Engage with replies — hot takes earn their value in the comment section.", active: true },
  ],
};

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// ═══════════════════════════════════════════════════════
// ─── 5-LAYER PROMPT ENGINE ─────────────────────────────
// ═══════════════════════════════════════════════════════

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

const APPROACH_SYSTEM_ROLES = {
  personal: `You are ghostwriting a social media post for me. Your job is to sound EXACTLY like me — not like an AI, not like a copywriter, like ME.

Key principles:
- Write from lived experience. Every claim should feel like something I actually did, saw, or learned.
- My audience is smart. Don't over-explain. Be direct.
- Imperfection is fine. Real posts have rough edges. Don't polish everything into sounding generic.
- Hook hard in the first line. If the first sentence doesn't stop the scroll, rewrite it.
- BANNED phrases (never use these): "In today's world", "It's no secret that", "Let me be honest", "Here's the thing", "In this post", "I want to share", "Let's dive in", "game-changer", "at the end of the day".
- No hashtags unless I specifically ask.

`,

  research: `You are helping me create a research-backed social media post. Your job is to find real, current data and statistics on my topic, then help me turn them into a compelling post in MY voice.

Key principles:
- Search the web for current data, statistics, and sources on this topic.
- Every major claim needs a source — link to it.
- Lead with a surprising or counterintuitive finding — that's the hook.
- Don't just list facts. Weave them into a narrative with my perspective.
- Include at least 2-3 specific data points (numbers, percentages, dates).
- End with my personal take — what this data means for my audience.
- BANNED phrases: "In today's rapidly evolving landscape", "Studies show that" (say WHICH study), "As we all know", "It goes without saying", "game-changer".

`,

  instructional: `You are helping me create an instructional social media post. Your job is to turn my expertise into a clear, step-by-step guide that my audience can follow and get results from — in MY voice.

Key principles:
- Start with the transformation: what they'll be able to do after reading this.
- Break the process into numbered, specific steps. No hand-waving.
- Each step should be concrete enough that a smart beginner could follow it.
- Include at least one real example or before/after to show the method in action.
- Anticipate mistakes and address them inline ("Don't do X — do Y instead").
- End with the expected outcome so they know if they did it right.
- BANNED phrases: "In this guide", "Simply follow these steps", "It's easy", "game-changer".

`,

  opinionated: `You are helping me create an opinionated social media post. Your job is to articulate a strong, specific stance on a topic in MY voice — one that makes people stop, think, and react.

Key principles:
- Lead with the boldest version of my opinion. No warming up, no hedging.
- Name what you disagree with specifically — people, ideas, conventional wisdom.
- Back the opinion with at least one concrete example, result, or experience.
- Anticipate the strongest objection and address it head-on.
- The goal is not to offend — it's to challenge. Precision over provocation.
- End with a line worth screenshotting.
- BANNED phrases: "Unpopular opinion but", "I might get hate for this", "Let me explain", "At the end of the day", "game-changer".

`,

  action: `You are helping me create an action-oriented social media post. Your job is to give my audience something they can DO immediately — a tactic, framework, or system — in MY voice.

Key principles:
- Every sentence must answer "so what do I do with this?"
- Use direct, imperative language: "Do X" not "You might want to consider X".
- Include specific numbers: timeframes, quantities, benchmarks.
- Structure for scannability — numbered steps, bullet points, or a named framework.
- One core method per post. Depth over breadth.
- End with the single highest-impact action they should take first.
- BANNED phrases: "Here are some tips", "You should consider", "game-changer", "In today's world".

`,

  philosophical: `You are helping me create a reflective, philosophical social media post. Your job is to explore a deeper idea — a mental model, a paradox, a big-picture observation — in MY voice.

Key principles:
- Open with a question, tension, or reframing that makes them pause.
- Use analogies and metaphors to connect abstract ideas to concrete experience.
- Pacing is slower here. Let ideas build. Longer sentences are fine.
- Reference books, thinkers, or mental models where they strengthen the point.
- Don't rush to a conclusion. Sometimes the question IS the value.
- Write like an essayist, not a listicle machine.
- BANNED phrases: "In today's fast-paced world", "Food for thought", "Let that sink in", "Think about it", "game-changer".

`,

  observational: `You are helping me create an observational social media post. Your job is to spot a pattern, trend, or shift that others are missing and turn it into a compelling post in MY voice.

Key principles:
- Anchor to something specific and current — a news event, data point, product launch, cultural moment.
- State what everyone sees on the surface, then reveal the deeper pattern.
- Connect this observation to a prediction or broader trend.
- Cite your sources — links, dates, specifics. Verifiability builds trust.
- End with your personal interpretation: what this means for your audience.
- Write like a sharp analyst, not a news reporter.
- BANNED phrases: "Breaking news", "As we all know", "It's no secret", "game-changer", "In today's world".

`,
};

function getUserWrittenText(plainText, selTopics, selPlatform, selFormat, selTone) {
  let text = plainText;
  selTopics.forEach(t => { text = text.replace(new RegExp(`#${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "g"), ""); });
  [selPlatform, selFormat, selTone].filter(Boolean).forEach(tag => {
    text = text.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*", "g"), "");
  });
  // Also strip /command tokens
  text = text.replace(/\/\w+\s*/g, "");
  return text.replace(/\s+/g, " ").trim();
}

function buildPrompt({ approach, profile, rules, config, selTopics, selPlatform, selFormat, selTone, ideaText, commands, includeHooks, includeAntiRobot, includeSeo }) {
  const v = (key) => { const val = profile[key]; return typeof val === "string" ? val.trim() : ""; };
  const has = (key) => { const val = profile[key]; if (Array.isArray(val)) return val.length > 0; return !!v(key); };
  let o = "";

  // ═══ LAYER 1: System Role ═══
  o += APPROACH_SYSTEM_ROLES[approach] || APPROACH_SYSTEM_ROLES.personal;

  // ═══ LAYER 2: Business Context (all filled fields injected) ═══
  const hasProfile = Object.keys(profile).some(k => has(k));
  if (hasProfile) {
    o += `=== WHO I AM ===\n`;
    const identity = [v("name"), v("role")].filter(Boolean).join(", ");
    if (identity) o += `${identity}\n`;
    if (has("oneLiner")) o += `${v("oneLiner")}\n`;
    if (has("pillars")) o += `My content pillars: ${v("pillars")}\n`;
    if (has("mission")) o += `Why I create: ${v("mission")}\n`;
    o += `\n`;

    // Personal context — always inject if filled
    if (has("background")) o += `My background: ${v("background")}\n`;
    if (has("story")) o += `My story: ${v("story")}\n`;
    if (has("beliefs")) o += `My strong beliefs: ${v("beliefs")}\n`;
    if (has("background") || has("story") || has("beliefs")) o += `\n`;

    // Services — always inject if filled
    const ofrs = (profile.offers || []);
    if (ofrs.length) { o += `What I offer:\n${ofrs.map(x => `- ${x.name}${x.pricing ? ` (${x.pricing})` : ""}${x.desc ? `: ${x.desc}` : ""}`).join("\n")}\n\n`; }

    // Audience
    if (has("icp")) o += `Who I help: ${v("icp")}\n`;
    if (has("painPoints")) o += `Their pain: ${v("painPoints")}\n`;
    if (has("transformation")) o += `The transformation: ${v("transformation")}\n`;
    if (has("icp") || has("painPoints") || has("transformation")) o += `\n`;

    // Voice (always critical)
    if (has("adjectives") || has("dos") || has("donts") || has("catchphrases")) {
      o += `=== MY VOICE ===\n`;
      if (has("adjectives")) o += `I sound like: ${v("adjectives")}\n`;
      if (has("dos")) o += `I DO: ${v("dos")}\n`;
      if (has("donts")) o += `I DON'T: ${v("donts")}\n`;
      if (has("catchphrases")) o += `Phrases I use: ${v("catchphrases")}\n`;
      if (has("usps")) o += `What makes me different: ${v("usps")}\n`;
      o += `\n`;
    }

    const proofItems = (profile.proof || []);
    if (proofItems.length) { o += `Social proof I can reference:\n${proofItems.map(p => { let line = p.type === "testimonial" ? `"${p.text}"` : p.text; const meta = [p.client, p.company].filter(Boolean).join(", "); if (meta) line += ` — ${meta}`; return `- ${line}`; }).join("\n")}\n\n`; }

    // Links — always inject if filled
    const ctaLinks = [has("website") && v("website"), has("twitter") && v("twitter"), has("linkedin") && v("linkedin")].filter(Boolean);
    if (ctaLinks.length) {
      o += `My links: ${ctaLinks.join(", ")}\n\n`;
    }
  }

  // ═══ LAYER 3: Rules ═══
  const gActive = (rules.global || []).filter(r => r.active);
  const mActive = (rules[approach] || []).filter(r => r.active);
  const hActive = (rules.hooks || []).filter(r => r.active);
  const arActive = (rules.antiRobot || []).filter(r => r.active);
  const seoActive = (rules.seo || []).filter(r => r.active);
  const fmtCfg = selFormat ? (config.formats || []).find(f => f.label === selFormat) : null;
  const fmtKey = fmtCfg ? "fmt_" + fmtCfg.id : null;
  const fmtActive = fmtKey ? (rules[fmtKey] || []).filter(r => r.active) : [];
  const pltCfg = selPlatform ? (config.platforms || []).find(p => p.label === selPlatform) : null;
  const pltKey = pltCfg ? "plt_" + pltCfg.id : null;
  const pltActive = pltKey ? (rules[pltKey] || []).filter(r => r.active) : [];
  const toneCfgR = selTone ? (config.tones || []).find(t => t.label === selTone) : null;
  const toneKey = toneCfgR ? "tone_" + toneCfgR.id : null;
  const toneActive = toneKey ? (rules[toneKey] || []).filter(r => r.active) : [];

  if (gActive.length || mActive.length || (includeHooks && hActive.length) || (includeAntiRobot && arActive.length) || fmtActive.length || pltActive.length || toneActive.length) {
    o += `=== WRITING RULES (follow these strictly) ===\n`;
    if (includeAntiRobot && arActive.length) { o += `\nNEGATIVE CONSTRAINTS (ANTI-ROBOT MODE):\n`; arActive.forEach(r => o += `- ${r.text}\n`); }
    if (gActive.length) { o += `\nGeneral:\n`; gActive.forEach(r => o += `- ${r.text}\n`); }
    if (mActive.length) { const apprCfg = (config.approaches || []).find(a => a.id === approach); o += `\n${apprCfg ? apprCfg.label : approach} rules:\n`; mActive.forEach(r => o += `- ${r.text}\n`); }
    (config.customRuleCategories || []).forEach(cat => { const catRules = (rules[cat.id] || []).filter(r => r.active); if (catRules.length) { o += `\n${cat.label}:\n`; catRules.forEach(r => o += `- ${r.text}\n`); } });
    if (fmtActive.length) { o += `\nFORMAT: ${selFormat}\n`; fmtActive.forEach(r => o += `- ${r.text}\n`); }
    if (pltActive.length) { o += `\nPLATFORM: ${selPlatform}\n`; pltActive.forEach(r => o += `- ${r.text}\n`); }
    if (toneActive.length) { o += `\nTONE: ${selTone}\n`; toneActive.forEach(r => o += `- ${r.text}\n`); }
    if (includeHooks && hActive.length) { o += `\nHOOK RULES (First line must be perfect):\n`; hActive.forEach(r => o += `- ${r.text}\n`); }
    if (includeSeo && seoActive.length) { o += `\nSEO RULES:\n`; seoActive.forEach(r => o += `- ${r.text}\n`); }
    o += `\n`;
  }

  // ═══ LAYER 4: Content Task ═══
  if (selTopics.length) o += `TOPIC FOCUS: ${selTopics.join(", ")}\n\n`;

  if (ideaText) {
    o += `=== MY IDEA / DIRECTION ===\n${ideaText}\n`;
    const cmds = (commands || []).filter(c => CMD_TRANSLATE[c]);
    if (cmds.length) { o += `\nAdditional instructions:\n`; cmds.forEach(c => o += `- ${CMD_TRANSLATE[c]}\n`); }
    o += `\n`;
  }

  // Output format
  o += `=== WHAT I NEED FROM YOU ===\n\n`;
  o += `Generate 1 version of this post with:\n\n`;
  o += `1. **Hook** — The opening line (most important part — spend extra effort here)\n`;
  o += `2. **Full post** — Complete text, ready to copy-paste and publish\n`;
  o += `3. 💡 **Why this angle?** — 1 sentence explaining the thinking behind this version (this is NOT part of the post content — it's for my learning)\n`;

  if (includeSeo && seoActive.length) {
    o += `\nAlso include an **SEO section** after the post (not part of the post itself):\n`;
    o += `- **SEO Title**\n`;
    o += `- **Meta Description**\n`;
    o += `- **URL Slug**\n`;
    o += `- **FAQ** (5 questions + answers)\n`;
    o += `Follow the SEO RULES above for formatting.\n`;
  }

  o += `\nAfter the post, ask me:\n`;
  o += `"✨ How many extra versions would you like? I'll make each one genuinely different — varying the hook style, structure, and angle."\n`;

  return o;
}

function buildHooksPrompt({ profile, topic }) {
  const v = (key) => { const val = profile[key]; return typeof val === "string" ? val.trim() : ""; };
  const has = (key) => { const val = profile[key]; if (Array.isArray(val)) return val.length > 0; return !!v(key); };
  let o = `You are a hook-writing specialist. Generate scroll-stopping opening lines for social media posts.

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

`;

  if (has("name") || has("role")) { o += `About me: ${[v("name"), v("role")].filter(Boolean).join(", ")}\n`; if (has("oneLiner")) o += `${v("oneLiner")}\n`; o += `\n`; }
  if (has("adjectives")) o += `My voice: ${v("adjectives")}\n\n`;
  if (topic) o += `TOPIC: ${topic}\n\n`;

  o += `Generate 10 hooks. For each:\n1. The hook text\n2. Style label (Contrarian / Pattern interrupt / Data+Curiosity / Direct address / Unexpected / Story opener)\n3. Best platform (Twitter or LinkedIn)\n`;
  return o;
}

// ─── RICH EDITOR ───────────────────────────────────────
const IdeaEditor = forwardRef(function IdeaEditor({ onTagsChange, config }, ref) {
  const editorRef = useRef(null);
  const [showTopic, setShowTopic] = useState(false);
  const [showSlash, setShowSlash] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [menuFilter, setMenuFilter] = useState("");
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeFormat, setActiveFormat] = useState({ bold: false, italic: false });
  const [wordCount, setWordCount] = useState(0);
  const closeMenus = () => { setShowMention(false); setShowTopic(false); setShowSlash(false); setShowEmoji(false); setMenuFilter(""); setSelectedIdx(0); };

  const scanAndReport = useCallback(() => {
    if (!editorRef.current) return;
    const get = (cls) => [...editorRef.current.querySelectorAll(`.${cls}`)].map(el => el.getAttribute("data-value")).filter(Boolean);
    onTagsChange({ topics: get("ed-topic"), platforms: get("ed-platform"), formats: get("ed-format"), tones: get("ed-tone"), commands: get("ed-command") });
  }, [onTagsChange]);

  const getCaretCoords = () => { const sel = window.getSelection(); if (!sel.rangeCount) return { top: 0, left: 0 }; const range = sel.getRangeAt(0).cloneRange(); range.collapse(true); const rect = range.getClientRects()[0]; const edRect = editorRef.current?.getBoundingClientRect(); if (!rect || !edRect) return { top: 0, left: 0 }; return { top: rect.bottom - edRect.top + 4, left: Math.min(rect.left - edRect.left, 400) }; };

  const insertTag = useCallback((text, className, dataValue, removeChars = 0) => {
    const el = editorRef.current; if (!el) return; el.focus();
    const sel = window.getSelection(); if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (removeChars > 0) { range.setStart(range.startContainer, Math.max(0, range.startOffset - removeChars)); range.deleteContents(); }
    const span = document.createElement("span"); span.className = className; span.contentEditable = "false"; span.setAttribute("data-value", dataValue); span.textContent = text;
    range.insertNode(span); const space = document.createTextNode("\u00A0"); span.after(space);
    range.setStartAfter(space); range.setEndAfter(space); sel.removeAllRanges(); sel.addRange(range);
    closeMenus();
    const t = el.innerText || ""; setWordCount(t.trim() ? t.trim().split(/\s+/).length : 0);
    setTimeout(() => scanAndReport(), 0);
  }, [scanAndReport]);

  const removeTag = useCallback((className, value) => { if (!editorRef.current) return; editorRef.current.querySelectorAll(`.${className}[data-value="${value}"]`).forEach(tag => { const next = tag.nextSibling; if (next && next.nodeType === Node.TEXT_NODE && next.textContent === "\u00A0") next.remove(); tag.remove(); }); setTimeout(() => scanAndReport(), 0); }, [scanAndReport]);
  const hasTag = useCallback((className, value) => { if (!editorRef.current) return false; return editorRef.current.querySelector(`.${className}[data-value="${value}"]`) !== null; }, []);
  const getPlainText = useCallback(() => (editorRef.current?.innerText || "").replace(/\u00A0/g, " "), []);
  useImperativeHandle(ref, () => ({ insertTag, removeTag, hasTag, getPlainText, focus: () => editorRef.current?.focus() }), [insertTag, removeTag, hasTag, getPlainText]);

  const insertPlainText = (text) => { const el = editorRef.current; if (!el) return; el.focus(); const sel = window.getSelection(); if (!sel.rangeCount) return; const range = sel.getRangeAt(0); const node = document.createTextNode(text); range.insertNode(node); range.setStartAfter(node); range.setEndAfter(node); sel.removeAllRanges(); sel.addRange(range); closeMenus(); };

  const handleInput = () => {
    if (editorRef.current) { const t = editorRef.current.innerText || ""; setWordCount(t.trim() ? t.trim().split(/\s+/).length : 0); }
    scanAndReport();
    const sel = window.getSelection(); if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0); const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent.substring(0, range.startOffset);
    const hashM = text.match(/#([^\s]*)$/); const slashM = text.match(/\/([^\s]*)$/);
    if (hashM) { setMenuFilter(hashM[1].toLowerCase()); setMenuPos(getCaretCoords()); setShowTopic(true); setShowSlash(false); setSelectedIdx(0); }
    else if (slashM) { setMenuFilter(slashM[1].toLowerCase()); setMenuPos(getCaretCoords()); setShowSlash(true); setShowTopic(false); setSelectedIdx(0); }
    else if (!showEmoji) closeMenus();
  };

  const cfgTopics = config?.topics || DEFAULT_CONFIG.topics;
  const getItems = () => { if (showTopic) return cfgTopics.filter(t => t.toLowerCase().includes(menuFilter)); if (showSlash) return SLASH_COMMANDS.filter(c => c.cmd.includes(menuFilter) || c.label.toLowerCase().includes(menuFilter)); return []; };

  const handleKeyDown = (e) => {
    const anyMenu = showTopic || showSlash;
    if (anyMenu) {
      const items = getItems();
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, items.length - 1)); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); return; }
      if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); const item = items[selectedIdx]; if (!item) return; const rem = menuFilter.length + 1; if (showTopic) insertTag(`#${item}`, "ed-topic", item, rem); else if (showSlash) insertTag(`/${item.cmd}`, "ed-command", item.cmd, rem); return; }
      if (e.key === "Escape") { closeMenus(); return; }
    }
    if (e.key === "b" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); document.execCommand("bold"); setActiveFormat(f => ({ ...f, bold: !f.bold })); }
    if (e.key === "i" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); document.execCommand("italic"); setActiveFormat(f => ({ ...f, italic: !f.italic })); }
  };

  const fTop = cfgTopics.filter(t => t.toLowerCase().includes(menuFilter));
  const fCmd = SLASH_COMMANDS.filter(c => c.cmd.includes(menuFilter) || c.label.toLowerCase().includes(menuFilter));
  const menuSt = { position: "absolute", top: menuPos.top, left: menuPos.left, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 10, padding: "6px 0", zIndex: 100, minWidth: 240, maxHeight: 260, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" };

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontSize: 12, color: "#8A8580" }}>Your idea (optional)</label>
        <span style={{ fontSize: 10, color: "#6A6560" }}><span style={{ color: "#FFD700" }}>#</span> topics <span style={{ color: "#A78BFA" }}>/</span> commands</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "6px 8px", background: "#1A1816", borderRadius: "8px 8px 0 0", border: "1px solid #3A3632", borderBottom: "none" }}>
        {[{ fn: "bold", label: "B", fw: 700, fs: "normal", active: activeFormat.bold }, { fn: "italic", label: "I", fw: 400, fs: "italic", active: activeFormat.italic }].map(b => (<button key={b.fn} onClick={() => { editorRef.current?.focus(); document.execCommand(b.fn); setActiveFormat(f => ({ ...f, [b.fn]: !f[b.fn] })); }} style={{ background: b.active ? "#3A3632" : "none", border: "none", color: "#E8E4E0", fontSize: 13, fontWeight: b.fw, fontStyle: b.fs, cursor: "pointer", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{b.label}</button>))}
        <button onClick={() => { editorRef.current?.focus(); document.execCommand("strikeThrough"); }} style={{ background: "none", border: "none", color: "#8A8580", fontSize: 13, cursor: "pointer", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "line-through" }}>S</button>
        <div style={{ width: 1, height: 16, background: "#3A3632", margin: "0 4px" }} />
        <button onClick={() => { editorRef.current?.focus(); insertPlainText("#"); setTimeout(handleInput, 20); }} style={{ background: "none", border: "none", color: "#FFD700", fontSize: 13, cursor: "pointer", padding: "0 6px", height: 28 }}>#</button>
        <button onClick={() => { editorRef.current?.focus(); insertPlainText("/"); setTimeout(handleInput, 20); }} style={{ background: "none", border: "none", color: "#A78BFA", fontSize: 13, cursor: "pointer", padding: "0 6px", height: 28 }}>/</button>
        <div style={{ width: 1, height: 16, background: "#3A3632", margin: "0 4px" }} />
        <button onClick={() => setShowEmoji(!showEmoji)} style={{ background: showEmoji ? "#3A3632" : "none", border: "none", color: "#8A8580", fontSize: 15, cursor: "pointer", borderRadius: 4, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>☺</button>
        <div style={{ flex: 1 }} /><span style={{ fontSize: 10, color: "#6A6560" }}>{wordCount}w</span>
      </div>
      {showEmoji && <div style={{ display: "flex", gap: 2, padding: "6px 8px", background: "#1A1816", border: "1px solid #3A3632", borderTop: "none", borderBottom: "none" }}>{EMOJI_QUICK.map((em, i) => (<button key={i} onClick={() => { editorRef.current?.focus(); insertPlainText(em); }} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", borderRadius: 4, width: 30, height: 28 }}>{em}</button>))}</div>}
      <div style={{ position: "relative" }}>
        <style>{`.idea-ed{min-height:100px;max-height:300px;overflow-y:auto;padding:12px 14px;background:#1A1816;border:1px solid #3A3632;border-radius:0 0 8px 8px;color:#E8E4E0;font-size:13px;line-height:1.7;outline:none;font-family:'DM Sans',sans-serif}.idea-ed:focus{border-color:#C5FF4A}.idea-ed:empty::before{content:attr(data-placeholder);color:#6A6560;pointer-events:none}.idea-ed .ed-topic{background:${TAG_COLORS.topic.bg};color:${TAG_COLORS.topic.color};padding:1px 6px;border-radius:4px;font-weight:500;font-size:12px}.idea-ed .ed-platform{background:${TAG_COLORS.platform.bg};color:${TAG_COLORS.platform.color};padding:1px 6px;border-radius:4px;font-weight:500;font-size:12px}.idea-ed .ed-format{background:${TAG_COLORS.format.bg};color:${TAG_COLORS.format.color};padding:1px 6px;border-radius:4px;font-weight:500;font-size:12px}.idea-ed .ed-tone{background:${TAG_COLORS.tone.bg};color:${TAG_COLORS.tone.color};padding:1px 6px;border-radius:4px;font-weight:500;font-size:12px}.idea-ed .ed-command{background:${TAG_COLORS.command.bg};color:${TAG_COLORS.command.color};padding:1px 6px;border-radius:4px;font-weight:500;font-size:12px}.idea-ed b,.idea-ed strong{color:#fff}.mn-item{padding:8px 14px;cursor:pointer;display:flex;align-items:center;gap:10px}.mn-item:hover,.mn-item.act{background:#3A3632}`}</style>
        <div ref={editorRef} className="idea-ed" contentEditable data-placeholder="Start typing your idea... use # for topics, / for AI commands — or click the buttons below." onInput={handleInput} onKeyDown={handleKeyDown} onBlur={() => setTimeout(closeMenus, 200)} suppressContentEditableWarning />
        {showTopic && fTop.length > 0 && <div style={menuSt}><div style={{ padding: "6px 14px 4px", fontSize: 10, color: "#6A6560", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Topics</div>{fTop.map((t, i) => (<div key={t} className={`mn-item ${i === selectedIdx ? "act" : ""}`} onMouseDown={e => { e.preventDefault(); insertTag(`#${t}`, "ed-topic", t, menuFilter.length + 1); }}><span style={{ color: "#FFD700" }}>#</span><span style={{ color: "#E8E4E0", fontSize: 13 }}>{t}</span></div>))}</div>}
        {showSlash && fCmd.length > 0 && <div style={menuSt}><div style={{ padding: "6px 14px 4px", fontSize: 10, color: "#6A6560", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Commands</div>{fCmd.map((c, i) => (<div key={c.cmd} className={`mn-item ${i === selectedIdx ? "act" : ""}`} onMouseDown={e => { e.preventDefault(); insertTag(`/${c.cmd}`, "ed-command", c.cmd, menuFilter.length + 1); }}><span style={{ fontSize: 16 }}>{c.icon}</span><div><div style={{ color: "#E8E4E0", fontSize: 13, fontWeight: 500 }}>{c.label}</div><div style={{ color: "#6A6560", fontSize: 11 }}>{c.desc}</div></div></div>))}</div>}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 10, color: "#6A6560" }}>
        <span><kbd style={{ background: "#2A2724", padding: "1px 5px", borderRadius: 3, border: "1px solid #3A3632" }}>⌘B</kbd> bold</span>
        <span><kbd style={{ background: "#2A2724", padding: "1px 5px", borderRadius: 3, border: "1px solid #3A3632" }}>⌘I</kbd> italic</span>
        <span style={{ color: "#4A4540" }}>Editor ↔ Buttons synced</span>
      </div>
    </div>
  );
});

// ─── BUSINESS PROFILE (real state) ─────────────────────
function BusinessSection({ profile, setProfile }) {
  const [exp, setExp] = useState("voice");
  const upd = (k, val) => setProfile(p => ({ ...p, [k]: val }));
  const inp = (k, ta) => (<div key={k}><label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 6 }}>{PROFILE_LABELS[k] || k}</label>{ta ? <textarea value={profile[k] || ""} onChange={e => upd(k, e.target.value)} placeholder={PROFILE_PLACEHOLDERS[k] || ""} rows={3} style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} /> : <input value={profile[k] || ""} onChange={e => upd(k, e.target.value)} placeholder={PROFILE_PLACEHOLDERS[k] || ""} style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />}</div>);

  // Offers state
  const offers = profile.offers || [];
  const [addOffer, setAddOffer] = useState(false);
  const [ofN, setOfN] = useState(""); const [ofD, setOfD] = useState(""); const [ofP, setOfP] = useState("");
  const [editOid, setEditOid] = useState(null);
  const saveOffer = () => { if (!ofN.trim()) return; const item = { id: editOid || Date.now(), name: ofN.trim(), desc: ofD.trim(), pricing: ofP.trim() }; upd("offers", editOid ? offers.map(o => o.id === editOid ? item : o) : [...offers, item]); setOfN(""); setOfD(""); setOfP(""); setAddOffer(false); setEditOid(null); };
  const startEditOffer = (o) => { setEditOid(o.id); setOfN(o.name); setOfD(o.desc || ""); setOfP(o.pricing || ""); setAddOffer(true); };
  const cancelOffer = () => { setAddOffer(false); setEditOid(null); setOfN(""); setOfD(""); setOfP(""); };

  // Proof state
  const proof = profile.proof || [];
  const [addProof, setAddProof] = useState(false);
  const [prT, setPrT] = useState(""); const [prTy, setPrTy] = useState("testimonial");
  const [prClient, setPrClient] = useState(""); const [prCompany, setPrCompany] = useState(""); const [prDate, setPrDate] = useState("");
  const [editPid, setEditPid] = useState(null);
  const proofTypes = [{ id: "testimonial", label: "Testimonial", icon: "💬" }, { id: "result", label: "Result", icon: "📊" }, { id: "stat", label: "Stat", icon: "🔢" }];
  const saveProof = () => { if (!prT.trim()) return; const item = { id: editPid || Date.now(), text: prT.trim(), type: prTy, client: prClient.trim(), company: prCompany.trim(), date: prDate.trim() }; upd("proof", editPid ? proof.map(p => p.id === editPid ? item : p) : [...proof, item]); setPrT(""); setPrTy("testimonial"); setPrClient(""); setPrCompany(""); setPrDate(""); setAddProof(false); setEditPid(null); };
  const startEditProof = (p) => { setEditPid(p.id); setPrT(p.text); setPrTy(p.type || "testimonial"); setPrClient(p.client || ""); setPrCompany(p.company || ""); setPrDate(p.date || ""); setAddProof(true); };
  const cancelProof = () => { setAddProof(false); setEditPid(null); setPrT(""); setPrTy("testimonial"); setPrClient(""); setPrCompany(""); setPrDate(""); };

  const inputSt = { width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const btnSm = { background: "none", border: "none", color: "#6A6560", fontSize: 14, cursor: "pointer", padding: "4px 8px", lineHeight: 1 };

  const S = [
    { id: "voice", label: "Voice & Personality", desc: "Defines HOW the AI writes. Injected into every prompt.", fields: [["adjectives", 0], ["dos", 1], ["donts", 1], ["catchphrases", 1]] },
    { id: "dna", label: "Content DNA", desc: "Your content strategy. Shapes what the AI writes about.", fields: [["oneLiner", 0], ["pillars", 1], ["mission", 1], ["beliefs", 1]] },
    { id: "about", label: "About Me", desc: "Personal context for storytelling and credibility.", fields: [["name", 0], ["role", 0], ["background", 1], ["story", 1]] },
    { id: "audience", label: "My Audience", desc: "Helps AI speak directly to your ideal reader.", fields: [["icp", 1], ["painPoints", 1], ["transformation", 1]] },
    { id: "offers", label: "My Offers", desc: "Services and products you sell. Used in business prompts.", fields: [["usps", 1]] },
    { id: "proof", label: "Social Proof", desc: "Testimonials, results, and credibility markers.", fields: [] },
    { id: "links", label: "Links", desc: "For reference. Included in CTAs when using /cta.", fields: [["website", 0], ["twitter", 0], ["linkedin", 0]] },
  ];

  const filled = Object.values(profile).filter(v => Array.isArray(v) ? v.length > 0 : v?.trim()).length;
  const total = Object.keys(profile).length;

  const sectionCount = (s) => {
    const sf = s.fields.filter(([k]) => { const val = profile[k]; return typeof val === "string" && val.trim(); }).length;
    if (s.id === "offers") return { filled: sf + offers.length, total: s.fields.length + Math.max(offers.length, 1) };
    if (s.id === "proof") return { filled: proof.length, total: Math.max(proof.length, 1) };
    return { filled: sf, total: s.fields.length };
  };

  const renderOffers = () => (<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {inp("usps", 1)}
    <div style={{ fontSize: 12, color: "#8A8580", fontWeight: 500, marginTop: 4 }}>Your Services</div>
    {offers.length === 0 && !addOffer && <div style={{ textAlign: "center", padding: "20px 16px", color: "#6A6560", background: "#1A1816", borderRadius: 8, border: "1px dashed #3A3632", fontSize: 13 }}>No services yet. Add your first offer.</div>}
    {offers.map(o => (<div key={o.id} style={{ background: "#1A1816", borderRadius: 8, padding: "12px 14px", border: "1px solid #3A3632" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#E8E4E0", fontWeight: 600, fontSize: 14 }}>{o.name}</span>
            {o.pricing && <span style={{ fontSize: 12, color: "#C5FF4A", background: "rgba(197,255,74,0.1)", padding: "2px 8px", borderRadius: 12 }}>{o.pricing}</span>}
          </div>
          {o.desc && <div style={{ color: "#8A8580", fontSize: 12, marginTop: 4 }}>{o.desc}</div>}
        </div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <button onClick={() => startEditOffer(o)} style={btnSm} onMouseEnter={e => e.currentTarget.style.color = "#C5FF4A"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>✏️</button>
          <button onClick={() => upd("offers", offers.filter(x => x.id !== o.id))} style={btnSm} onMouseEnter={e => e.currentTarget.style.color = "#F87171"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>&times;</button>
        </div>
      </div>
    </div>))}
    {addOffer ? (<div style={{ background: "#1A1816", borderRadius: 8, padding: 14, border: "1px solid #3A3632", display: "flex", flexDirection: "column", gap: 10 }}>
      <input value={ofN} onChange={e => setOfN(e.target.value)} placeholder="Service name (required)" style={inputSt} />
      <textarea value={ofD} onChange={e => setOfD(e.target.value)} placeholder="Description (optional)" rows={2} style={{ ...inputSt, resize: "vertical", fontFamily: "inherit" }} />
      <input value={ofP} onChange={e => setOfP(e.target.value)} placeholder="Pricing (optional) e.g. $2,500 or $500/mo" style={inputSt} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={saveOffer} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{editOid ? "Save" : "Add Service"}</button>
        <button onClick={cancelOffer} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 16px", color: "#8A8580", fontSize: 13, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>) : (<button onClick={() => { setEditOid(null); setOfN(""); setOfD(""); setOfP(""); setAddOffer(true); }} style={{ background: "none", border: "1px dashed #3A3632", borderRadius: 8, padding: "10px", color: "#6A6560", fontSize: 13, cursor: "pointer", width: "100%" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#C5FF4A"; e.currentTarget.style.color = "#C5FF4A"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#3A3632"; e.currentTarget.style.color = "#6A6560"; }}>+ Add Service</button>)}
  </div>);

  const proofMeta = (p) => { const parts = [p.client, p.company, p.date].filter(Boolean); return parts.length ? parts.join(" · ") : null; };
  const renderProof = () => (<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {proof.length === 0 && !addProof && <div style={{ textAlign: "center", padding: "20px 16px", color: "#6A6560", background: "#1A1816", borderRadius: 8, border: "1px dashed #3A3632", fontSize: 13 }}>No social proof yet. Add testimonials, results, or stats.</div>}
    {proof.map(p => { const pt = proofTypes.find(t => t.id === p.type) || proofTypes[0]; const meta = proofMeta(p); return (<div key={p.id} style={{ background: "#1A1816", borderRadius: 8, padding: "12px 14px", border: "1px solid #3A3632" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 8, flex: 1 }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{pt.icon}</span>
          <div>
            <span style={{ color: "#E8E4E0", fontSize: 13 }}>{p.text}</span>
            {meta && <div style={{ color: "#6A6560", fontSize: 11, marginTop: 3 }}>{meta}</div>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <button onClick={() => startEditProof(p)} style={btnSm} onMouseEnter={e => e.currentTarget.style.color = "#C5FF4A"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>✏️</button>
          <button onClick={() => upd("proof", proof.filter(x => x.id !== p.id))} style={btnSm} onMouseEnter={e => e.currentTarget.style.color = "#F87171"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>&times;</button>
        </div>
      </div>
    </div>); })}
    {addProof ? (<div style={{ background: "#1A1816", borderRadius: 8, padding: 14, border: "1px solid #3A3632", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 6 }}>{proofTypes.map(t => (<button key={t.id} onClick={() => setPrTy(t.id)} style={{ background: prTy === t.id ? "rgba(197,255,74,0.15)" : "transparent", border: prTy === t.id ? "1px solid #C5FF4A" : "1px solid #3A3632", borderRadius: 8, padding: "6px 12px", color: prTy === t.id ? "#C5FF4A" : "#8A8580", fontSize: 12, cursor: "pointer" }}>{t.icon} {t.label}</button>))}</div>
      <textarea value={prT} onChange={e => setPrT(e.target.value)} placeholder={prTy === "testimonial" ? 'e.g. "Working with them completely changed how I show up online. Went from 0 to 10K followers in 6 months."' : prTy === "result" ? "e.g. 3x inbound leads after implementing our content system" : "e.g. 500+ clients served, 10M+ content impressions generated, Featured in Forbes & Entrepreneur"} rows={2} style={{ ...inputSt, resize: "vertical", fontFamily: "inherit" }} />
      {prTy !== "stat" && <div style={{ display: "flex", gap: 8 }}>
        <input value={prClient} onChange={e => setPrClient(e.target.value)} placeholder="Client name (optional)" style={{ ...inputSt, flex: 1 }} />
        <input value={prCompany} onChange={e => setPrCompany(e.target.value)} placeholder="Company (optional)" style={{ ...inputSt, flex: 1 }} />
      </div>}
      <input value={prDate} onChange={e => setPrDate(e.target.value)} placeholder={prTy === "stat" ? "As of (optional) e.g. Jan 2025" : "Date (optional) e.g. Q4 2024"} style={inputSt} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={saveProof} style={{ background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{editPid ? "Save" : "Add Proof"}</button>
        <button onClick={cancelProof} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 16px", color: "#8A8580", fontSize: 13, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>) : (<button onClick={() => { setEditPid(null); setPrT(""); setPrTy("testimonial"); setPrClient(""); setPrCompany(""); setPrDate(""); setAddProof(true); }} style={{ background: "none", border: "1px dashed #3A3632", borderRadius: 8, padding: "10px", color: "#6A6560", fontSize: 13, cursor: "pointer", width: "100%" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#C5FF4A"; e.currentTarget.style.color = "#C5FF4A"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#3A3632"; e.currentTarget.style.color = "#6A6560"; }}>+ Add Proof</button>)}
  </div>);

  return (<div>
    <h2 style={{ margin: "0 0 4px", fontSize: 22, color: "#E8E4E0" }}>Business Profile</h2>
    <p style={{ margin: "0 0 16px", fontSize: 13, color: "#8A8580" }}>This feeds into every prompt — the more you fill, the better the output</p>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      <div style={{ flex: 1, height: 4, background: "#2A2724", borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${(filled / total) * 100}%`, height: "100%", background: "#C5FF4A", borderRadius: 2, transition: "width 0.3s" }} /></div>
      <span style={{ fontSize: 11, color: "#6A6560" }}>{filled}/{total} fields</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{S.map(s => {
      const sc = sectionCount(s);
      return (<div key={s.id} style={{ background: "#2A2724", borderRadius: 10, border: "1px solid #3A3632", overflow: "hidden" }}>
        <button onClick={() => setExp(exp === s.id ? null : s.id)} style={{ width: "100%", background: "none", border: "none", padding: "14px 18px", display: "flex", justifyContent: "space-between", cursor: "pointer", color: "#E8E4E0", fontSize: 14, fontWeight: 500, textAlign: "left" }}>
          <div><span>{s.label}</span>{sc.filled > 0 && <span style={{ fontSize: 10, color: "#C5FF4A", marginLeft: 6 }}>({s.id === "offers" ? `${offers.length} service${offers.length !== 1 ? "s" : ""}` : s.id === "proof" ? `${proof.length} item${proof.length !== 1 ? "s" : ""}` : `${sc.filled}/${sc.total}`})</span>}<div style={{ fontSize: 11, color: "#6A6560", fontWeight: 400, marginTop: 2 }}>{s.desc}</div></div>
          <span style={{ color: "#6A6560", transform: exp === s.id ? "rotate(180deg)" : "none", transition: "0.2s", flexShrink: 0, marginLeft: 12 }}>▼</span>
        </button>
        {exp === s.id && <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          {s.id === "offers" ? renderOffers() : s.id === "proof" ? renderProof() : s.fields.map(([k, ta]) => inp(k, ta))}
        </div>}
      </div>);
    })}</div>
  </div>);
}

// ─── RULES & SETTINGS (unified hub) ────────────────────
function RulesSection({ rules, setRules, config, setConfig }) {
  // Core rules state
  const [tab, setTab] = useState("global");
  const [nr, setNr] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Accordion + inline rules state
  const [expandedId, setExpandedId] = useState(null);
  const [newRule, setNewRule] = useState("");
  const [editRuleId, setEditRuleId] = useState(null);
  const [editRuleText, setEditRuleText] = useState("");

  // Add item state (for section "+" buttons)
  const [addingSection, setAddingSection] = useState(null); // null | "formats" | "platforms" | "tones"
  const [addingMode, setAddingMode] = useState(null); // null | "library" | "new"
  const [newLabel, setNewLabel] = useState("");

  // Topics + AI Tools state
  const [newTopic, setNewTopic] = useState("");

  // Custom core category state
  const [addingCore, setAddingCore] = useState(false);
  const [newCoreName, setNewCoreName] = useState("");

  const aiModeTabs = (config.approaches || []).map(m => ({ id: m.id, label: `${m.icon} ${m.label}`, desc: m.desc, color: m.color, builtIn: true, group: "ai" }));
  const generalTabs = [
    { id: "global", label: "🌐 Global", desc: "Applied to all prompts", color: "#C5FF4A", builtIn: true, group: "general" },
    { id: "hooks", label: "🪝 Hooks", desc: "First line rules", color: "#FFD700", builtIn: true, group: "general" },
    { id: "antiRobot", label: "🚫 Anti-Robot", desc: "Forbid specific words", color: "#F87171", builtIn: true, group: "general" },
    { id: "seo", label: "🔎 SEO", desc: "Title, meta, slug, FAQ", color: "#34D399", builtIn: true, group: "general" },
  ];
  const customCoreTabs = (config.customRuleCategories || []).map(c => ({ id: c.id, label: c.label, desc: c.desc || "Custom rule category", color: c.color || "#8A8580", builtIn: false, group: "general" }));
  const coreTabs = [...aiModeTabs, ...generalTabs, ...customCoreTabs];
  const addCoreCategory = () => {
    if (!newCoreName.trim()) return;
    const id = "custom_" + newCoreName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "");
    if (coreTabs.some(t => t.id === id)) return;
    const colors = ["#FB923C", "#38BDF8", "#A3E635", "#E879F9", "#FBBF24", "#2DD4BF"];
    const color = colors[(config.customRuleCategories || []).length % colors.length];
    setConfig(prev => ({ ...prev, customRuleCategories: [...(prev.customRuleCategories || []), { id, label: newCoreName.trim(), color }] }));
    setNewCoreName(""); setAddingCore(false); setTab(id);
  };
  const removeCoreCategory = (id) => {
    setConfig(prev => ({ ...prev, customRuleCategories: (prev.customRuleCategories || []).filter(c => c.id !== id) }));
    setRules(prev => { const next = { ...prev }; delete next[id]; return next; });
    if (tab === id) setTab("global");
  };
  const fmtColor = "#F472B6";
  const pltColor = "#60A5FA";
  const toneColor = "#34D399";

  const getRules = (key) => rules[key] || [];
  const setRulesFor = (key, val) => setRules({ ...rules, [key]: val });

  const cur = getRules(tab);
  const activeTab = coreTabs.find(t => t.id === tab);
  const atColor = activeTab?.color || "#8A8580";
  const atLabel = activeTab?.label || tab;

  const add = () => { if (!nr.trim()) return; setRulesFor(tab, [...cur, { id: Date.now(), text: nr, active: true }]); setNr(""); };
  const startEdit = (r) => { setEditId(r.id); setEditText(r.text); };
  const saveEdit = () => { if (!editText.trim()) return; setRulesFor(tab, cur.map(x => x.id === editId ? { ...x, text: editText.trim() } : x)); setEditId(null); setEditText(""); };
  const cancelEdit = () => { setEditId(null); setEditText(""); };

  // Compute totals for summary
  const fmtTabs = (config.formats || []).filter(f => f.active).map(f => "fmt_" + f.id);
  const pltTabs = (config.platforms || []).filter(p => p.active).map(p => "plt_" + p.id);
  const toneTabs = (config.tones || []).filter(t => t.active).map(t => "tone_" + t.id);
  const totalFmtRules = fmtTabs.reduce((sum, k) => sum + getRules(k).filter(r => r.active).length, 0);
  const totalPltRules = pltTabs.reduce((sum, k) => sum + getRules(k).filter(r => r.active).length, 0);
  const totalToneRules = toneTabs.reduce((sum, k) => sum + getRules(k).filter(r => r.active).length, 0);

  // ─── Shared styles ───
  const inputSt = { background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "8px 12px", color: "#E8E4E0", fontSize: 13, fontFamily: "inherit", width: "100%", boxSizing: "border-box" };
  const accentBtn = { background: "#C5FF4A", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, color: "#1A1816", cursor: "pointer", fontFamily: "inherit" };
  const toId = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "");
  const sectionHeaderSt = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginTop: 28 };

  // ─── Accordion item section (formats, platforms, tones) ───
  const renderItemSection = (key, label, color, catField) => {
    const items = config[key] || [];
    const activeItems = items.filter(i => i.active);
    const inactiveItems = items.filter(i => !i.active);
    const rulePrefix = key === "platforms" ? "plt_" : key === "formats" ? "fmt_" : "tone_";
    const totalActive = activeItems.reduce((sum, i) => sum + getRules(rulePrefix + i.id).filter(r => r.active).length, 0);
    const totalAll = items.reduce((sum, i) => sum + getRules(rulePrefix + i.id).length, 0);
    const isAdding = addingSection === key;

    const toggle = (id) => setConfig(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, active: !i.active } : i) }));
    const remove = (id) => {
      setConfig(prev => ({ ...prev, [key]: prev[key].filter(i => i.id !== id) }));
      const rKey = rulePrefix + id;
      setRules(prev => { const next = { ...prev }; delete next[rKey]; return next; });
    };
    const updateField = (id, field, val) => setConfig(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, [field]: val } : i) }));
    const activateItem = (id) => { setConfig(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, active: true } : i) })); setAddingSection(null); setAddingMode(null); };
    const addNewItem = () => {
      if (!newLabel.trim()) return;
      const id = toId(newLabel);
      if (items.some(i => i.id === id)) return;
      const item = { id, label: newLabel.trim(), inst: "", active: true };
      if (catField) item.cat = "Custom";
      setConfig(prev => ({ ...prev, [key]: [...prev[key], item] }));
      setNewLabel(""); setAddingSection(null); setAddingMode(null);
    };

    const renderAccordionItem = (item) => {
      const isExpanded = expandedId === item.id;
      const isBuiltIn = DEFAULT_CONFIG[key]?.some(d => d.id === item.id);
      const rKey = rulePrefix + item.id;
      const itemRules = rules[rKey] || [];
      const activeCount = itemRules.filter(r => r.active).length;
      const addItemRule = () => { if (!newRule.trim()) return; setRulesFor(rKey, [...itemRules, { id: Date.now(), text: newRule.trim(), active: true }]); setNewRule(""); };

      return (
        <div key={item.id} style={{ background: "#2A2724", borderRadius: 10, border: isExpanded ? `1px solid ${color}40` : "1px solid #3A3632", overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer" }} onClick={() => { setExpandedId(isExpanded ? null : item.id); setEditRuleId(null); setNewRule(""); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
              <button onClick={e => { e.stopPropagation(); toggle(item.id); }} style={{ background: item.active ? color : "#3A3632", border: "none", borderRadius: 4, width: 18, height: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: item.active ? "#1A1816" : "#6A6560", flexShrink: 0 }}>{item.active ? "✓" : ""}</button>
              <span style={{ fontSize: 13, color: item.active ? "#E8E4E0" : "#6A6560", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}>{item.label}</span>
              {catField && item.cat && <span style={{ fontSize: 10, color: "#6A6560", background: "#1A1816", borderRadius: 4, padding: "2px 6px", flexShrink: 0 }}>{item.cat}</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 10, color: color, fontWeight: 500 }}>{activeCount}/{itemRules.length}</span>
              <span style={{ fontSize: 11, color: "#6A6560", transition: "transform 0.15s", transform: isExpanded ? "rotate(90deg)" : "none" }}>▸</span>
            </div>
          </div>
          {isExpanded && (
            <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #3A363280" }}>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: 11, color: "#8A8580" }}>Label</label><input value={item.label} onChange={e => updateField(item.id, "label", e.target.value)} style={{ ...inputSt, marginTop: 4 }} /></div>
                {catField && <div style={{ flex: 1 }}><label style={{ fontSize: 11, color: "#8A8580" }}>Category</label><input value={item.cat || ""} onChange={e => updateField(item.id, "cat", e.target.value)} placeholder="e.g. Social Media" style={{ ...inputSt, marginTop: 4 }} /></div>}
              </div>
              <label style={{ fontSize: 11, color: "#8A8580", marginTop: 4 }}>Rules ({activeCount} active / {itemRules.length} total)</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {itemRules.map(r => (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", background: "#1A1816", borderRadius: 6, opacity: r.active ? 1 : 0.5 }}>
                    {editRuleId === r.id ? (<>
                      <input value={editRuleText} onChange={e => setEditRuleText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && editRuleText.trim()) { setRulesFor(rKey, itemRules.map(x => x.id === r.id ? { ...x, text: editRuleText.trim() } : x)); setEditRuleId(null); } if (e.key === "Escape") setEditRuleId(null); }} autoFocus style={{ flex: 1, background: "transparent", border: `1px solid ${color}40`, borderRadius: 4, padding: "4px 8px", color: "#E8E4E0", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                      <button onClick={() => { if (editRuleText.trim()) { setRulesFor(rKey, itemRules.map(x => x.id === r.id ? { ...x, text: editRuleText.trim() } : x)); } setEditRuleId(null); }} style={{ background: "none", border: "none", color: color, fontSize: 11, cursor: "pointer" }}>Save</button>
                    </>) : (<>
                      <input type="checkbox" checked={r.active} onChange={() => setRulesFor(rKey, itemRules.map(x => x.id === r.id ? { ...x, active: !x.active } : x))} style={{ accentColor: color, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12, color: "#C0BCB8" }}>{r.text}</span>
                      <button onClick={() => { setEditRuleId(r.id); setEditRuleText(r.text); }} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 11, cursor: "pointer", padding: "0 4px" }}>Edit</button>
                      <button onClick={() => setRulesFor(rKey, itemRules.filter(x => x.id !== r.id))} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 13, cursor: "pointer", padding: "0 4px" }}>×</button>
                    </>)}
                  </div>
                ))}
                {itemRules.length === 0 && <div style={{ padding: "8px", fontSize: 11, color: "#6A6560", textAlign: "center" }}>No rules yet. Add one below.</div>}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <input value={newRule} onChange={e => setNewRule(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addItemRule(); }} placeholder="Add rule..." style={{ ...inputSt, flex: 1, fontSize: 12, padding: "6px 10px" }} />
                <button onClick={addItemRule} style={{ ...accentBtn, padding: "6px 12px", fontSize: 11 }}>Add</button>
              </div>
              {!isBuiltIn && <button onClick={() => { remove(item.id); setExpandedId(null); }} style={{ alignSelf: "flex-start", background: "none", border: "1px solid #F8717130", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#F87171", cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>Remove {label.slice(0, -1).toLowerCase()}</button>}
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        <div style={sectionHeaderSt}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E4E0" }}>{label}</span>
            <span style={{ fontSize: 11, color: "#6A6560" }}>{totalActive} active / {totalAll} total</span>
          </div>
          <button onClick={() => { if (isAdding) { setAddingSection(null); setAddingMode(null); } else { setAddingSection(key); setAddingMode(null); setNewLabel(""); } }} style={{ background: "none", border: "none", color: isAdding ? "#F87171" : color, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }} title={`Add ${label.toLowerCase()}`}>{isAdding ? "×" : "+"}</button>
        </div>

        {isAdding && <div style={{ marginBottom: 8, background: "#1A1816", borderRadius: 8, border: "1px solid #3A3632", padding: 10 }}>
          {addingMode === null && <>
            {inactiveItems.length > 0 && <button onClick={() => setAddingMode("library")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "7px 10px", color: color, fontSize: 12, cursor: "pointer", fontFamily: "inherit", marginBottom: 4, textAlign: "left" }}>From library ({inactiveItems.length} available)</button>}
            <button onClick={() => setAddingMode("new")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "7px 10px", color: "#8A8580", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>+ Create new</button>
          </>}
          {addingMode === "library" && <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 200, overflowY: "auto" }}>
            {inactiveItems.map(i => <button key={i.id} onClick={() => activateItem(i.id)} style={{ background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 10px", color: "#E8E4E0", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{i.label}{catField && i.cat ? ` — ${i.cat}` : ""}</button>)}
            <button onClick={() => setAddingMode(null)} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: "4px 0" }}>Back</button>
          </div>}
          {addingMode === "new" && <div style={{ display: "flex", gap: 6 }}>
            <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addNewItem(); if (e.key === "Escape") { setAddingSection(null); setAddingMode(null); } }} placeholder="Name..." autoFocus style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 10px", color: "#E8E4E0", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            <button onClick={addNewItem} style={{ ...accentBtn, padding: "6px 12px", fontSize: 11 }}>Add</button>
          </div>}
        </div>}

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map(renderAccordionItem)}
        </div>
      </div>
    );
  };

  // ─── Topics ───
  const renderTopics = () => {
    const topics = config.topics || [];
    return (<div>
      <div style={sectionHeaderSt}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E4E0" }}>Topics</span>
          <span style={{ fontSize: 11, color: "#6A6560" }}>{topics.length} topics</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>{topics.map((t, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 20, padding: "6px 10px 6px 14px", fontSize: 12, color: "#E8E4E0" }}>
          {t}
          <button onClick={() => setConfig(prev => ({ ...prev, topics: prev.topics.filter((_, j) => j !== i) }))} style={{ background: "none", border: "none", color: "#6A6560", cursor: "pointer", fontSize: 14, padding: "0 2px", lineHeight: 1 }} title="Remove">×</button>
        </div>
      ))}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={newTopic} onChange={e => setNewTopic(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newTopic.trim()) { setConfig(prev => ({ ...prev, topics: [...prev.topics, newTopic.trim()] })); setNewTopic(""); } }} placeholder="Add topic..." style={{ ...inputSt, flex: 1 }} />
        <button onClick={() => { if (newTopic.trim()) { setConfig(prev => ({ ...prev, topics: [...prev.topics, newTopic.trim()] })); setNewTopic(""); } }} style={accentBtn}>Add</button>
      </div>
    </div>);
  };

  return (<div>
    <h2 style={{ margin: "0 0 6px", fontSize: 22, color: "#E8E4E0" }}>AI Writing Rules</h2>
    <p style={{ margin: "0 0 20px", fontSize: 13, color: "#8A8580" }}>Manage your writing rules, content approaches, and categories in one place.</p>

    {/* ─── Content Approach Rules ─── */}
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "#8A8580", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Content Approaches</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {aiModeTabs.map(t => (<button key={t.id} onClick={() => { setTab(t.id); cancelEdit(); }} style={{ flex: "1 1 auto", minWidth: 140, background: tab === t.id ? "#2A2724" : "transparent", border: tab === t.id ? `1px solid ${t.color}` : "1px solid #3A3632", borderRadius: 10, padding: "10px 12px", cursor: "pointer", textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 600, color: tab === t.id ? t.color : "#8A8580" }}>{t.label}</div><div style={{ fontSize: 10, color: "#6A6560", marginTop: 2 }}>{t.desc}</div><div style={{ fontSize: 9, color: "#6A6560", marginTop: 3 }}>{getRules(t.id).filter(r => r.active).length}/{getRules(t.id).length}</div></button>))}
      </div>
    </div>

    {/* ─── General Rules ─── */}
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "#8A8580", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>General Rules</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {[...generalTabs, ...customCoreTabs].map(t => (<button key={t.id} onClick={() => { setTab(t.id); cancelEdit(); }} style={{ flex: "1 1 auto", minWidth: 120, background: tab === t.id ? "#2A2724" : "transparent", border: tab === t.id ? `1px solid ${t.color}` : "1px solid #3A3632", borderRadius: 10, padding: "10px 12px", cursor: "pointer", textAlign: "left", position: "relative" }}><div style={{ fontSize: 12, fontWeight: 600, color: tab === t.id ? t.color : "#8A8580" }}>{t.label}</div><div style={{ fontSize: 10, color: "#6A6560", marginTop: 2 }}>{t.desc}</div><div style={{ fontSize: 9, color: "#6A6560", marginTop: 3 }}>{getRules(t.id).filter(r => r.active).length}/{getRules(t.id).length}</div>{!t.builtIn && tab === t.id && <button onClick={e => { e.stopPropagation(); removeCoreCategory(t.id); }} style={{ position: "absolute", top: 4, right: 6, background: "none", border: "none", color: "#6A6560", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }} title="Remove category">×</button>}</button>))}
        {!addingCore ? (
          <button onClick={() => setAddingCore(true)} style={{ flex: "0 0 auto", background: "transparent", border: "1px dashed #3A3632", borderRadius: 10, padding: "10px 16px", cursor: "pointer", color: "#6A6560", fontSize: 18, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }} title="Add category">+</button>
        ) : (
          <div style={{ flex: "1 1 auto", minWidth: 140, background: "#1A1816", border: "1px solid #C5FF4A40", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
            <input value={newCoreName} onChange={e => setNewCoreName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addCoreCategory(); if (e.key === "Escape") { setAddingCore(false); setNewCoreName(""); } }} placeholder="Category name..." autoFocus style={{ background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 10px", color: "#E8E4E0", fontSize: 12, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 4 }}><button onClick={addCoreCategory} style={{ flex: 1, background: "#C5FF4A", color: "#1A1816", border: "none", borderRadius: 6, padding: "5px 8px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Add</button><button onClick={() => { setAddingCore(false); setNewCoreName(""); }} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", fontSize: 11, color: "#8A8580", cursor: "pointer" }}>Cancel</button></div>
          </div>
        )}
      </div>
    </div>

    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}><input value={nr} onChange={e => setNr(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder={`Add ${atLabel} rule...`} style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", fontFamily: "inherit" }} /><button onClick={add} style={{ background: atColor, color: "#1A1816", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Add</button></div>

    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>{cur.map(r => (
      <div key={r.id} style={{ background: "#2A2724", borderRadius: 8, padding: "10px 14px", border: "1px solid #3A3632", opacity: r.active ? 1 : 0.5 }}>
        {editId === r.id ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={editText} onChange={e => setEditText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit(); }} autoFocus style={{ flex: 1, background: "#1A1816", border: `1px solid ${atColor}`, borderRadius: 6, padding: "8px 12px", color: "#E8E4E0", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
            <button onClick={saveEdit} style={{ background: atColor, color: "#1A1816", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Save</button>
            <button onClick={cancelEdit} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#8A8580", cursor: "pointer" }}>Esc</button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <input type="checkbox" checked={r.active} onChange={() => setRulesFor(tab, cur.map(x => x.id === r.id ? { ...x, active: !x.active } : x))} style={{ accentColor: atColor, flexShrink: 0 }} />
              <span style={{ color: "#E8E4E0", fontSize: 13 }}>{r.text}</span>
            </div>
            <div style={{ display: "flex", gap: 2, flexShrink: 0, marginLeft: 8 }}>
              <button onClick={() => startEdit(r)} style={{ background: "none", border: "none", color: "#6A6560", cursor: "pointer", fontSize: 12, padding: "2px 6px" }} onMouseEnter={e => e.currentTarget.style.color = "#E8E4E0"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>Edit</button>
              <button onClick={() => setRulesFor(tab, cur.filter(x => x.id !== r.id))} style={{ background: "none", border: "none", color: "#6A6560", cursor: "pointer", fontSize: 16, padding: "2px 6px" }} onMouseEnter={e => e.currentTarget.style.color = "#F87171"} onMouseLeave={e => e.currentTarget.style.color = "#6A6560"}>×</button>
            </div>
          </div>
        )}
      </div>
    ))}
    {cur.length === 0 && <div style={{ textAlign: "center", padding: 16, color: "#6A6560", fontSize: 12 }}>No rules yet. Add one above.</div>}</div>

    {/* ─── Format / Platform / Tone accordion sections ─── */}
    {renderItemSection("formats", "Formats", fmtColor, null)}
    {renderItemSection("platforms", "Platforms", pltColor, "cat")}
    {renderItemSection("tones", "Tones", toneColor, null)}

    {/* ─── Topics ─── */}
    {renderTopics()}


    {/* ─── Summary ─── */}
    <div style={{ marginTop: 28, padding: 16, background: "#1A1816", borderRadius: 10, border: "1px solid #3A3632" }}>
      <div style={{ fontSize: 12, color: "#8A8580", marginBottom: 10 }}>Prompt injection summary</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {coreTabs.map(t => (<div key={t.id}><span style={{ fontSize: 11, color: t.color }}>{t.label}:</span> <span style={{ fontSize: 11, color: "#6A6560" }}>{getRules(t.id).filter(r => r.active).length}</span></div>))}
        <div><span style={{ fontSize: 11, color: fmtColor }}>Format:</span> <span style={{ fontSize: 11, color: "#6A6560" }}>{totalFmtRules}</span></div>
        <div><span style={{ fontSize: 11, color: pltColor }}>Platform:</span> <span style={{ fontSize: 11, color: "#6A6560" }}>{totalPltRules}</span></div>
        <div><span style={{ fontSize: 11, color: toneColor }}>Tone:</span> <span style={{ fontSize: 11, color: "#6A6560" }}>{totalToneRules}</span></div>
      </div>
    </div>
  </div>);
}

// ─── PROMPT MAKER (real engine) ────────────────────────
function PromptMaker({ profile, rules, config, setConfig, onSaveToHistory, history }) {
  const editorRef = useRef(null);
  const [editorTags, setEditorTags] = useState({ topics: [], platforms: [], formats: [], tones: [], commands: [] });
  const [approach, setApproach] = useState("personal");
  const [includeHooks, setIncludeHooks] = useState(true);
  const [includeAntiRobot, setIncludeAntiRobot] = useState(true);
  const [includeSeo, setIncludeSeo] = useState(false);
  const [builtPrompt, setBuiltPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pltSearch, setPltSearch] = useState("");
  const [fmtSearch, setFmtSearch] = useState("");
  const [toneSearch, setToneSearch] = useState("");
  const [addingCol, setAddingCol] = useState(null); // null | "platform" | "format" | "tone"
  const [addingMode, setAddingMode] = useState(null); // null | "library" | "new"
  const [newLabel, setNewLabel] = useState("");

  const approaches = config.approaches || DEFAULT_CONFIG.approaches;
  const topics = config.topics || DEFAULT_CONFIG.topics;
  const activePlatforms = (config.platforms || DEFAULT_CONFIG.platforms).filter(p => p.active);
  const activeFormats = (config.formats || DEFAULT_CONFIG.formats).filter(f => f.active);
  const activeTones = (config.tones || DEFAULT_CONFIG.tones).filter(t => t.active);
  const inactivePlatforms = (config.platforms || DEFAULT_CONFIG.platforms).filter(p => !p.active);
  const inactiveFormats = (config.formats || DEFAULT_CONFIG.formats).filter(f => !f.active);
  const inactiveTones = (config.tones || DEFAULT_CONFIG.tones).filter(t => !t.active);

  const toggleAddCol = (col) => { if (addingCol === col) { setAddingCol(null); setAddingMode(null); } else { setAddingCol(col); setAddingMode(null); setNewLabel(""); } };
  const activateItem = (key, id) => { setConfig(prev => ({ ...prev, [key]: prev[key].map(x => x.id === id ? { ...x, active: true } : x) })); setAddingCol(null); setAddingMode(null); };
  const addNewItem = (key, extra) => { if (!newLabel.trim()) return; const id = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_"); if (!config[key].some(x => x.id === id)) { setConfig(prev => ({ ...prev, [key]: [...prev[key], { id, label: newLabel.trim(), inst: "", active: true, ...extra }] })); } setNewLabel(""); setAddingCol(null); setAddingMode(null); };

  const selTopics = editorTags.topics;
  const selPlatform = editorTags.platforms[0] || null;
  const selFormat = editorTags.formats[0] || null;
  const selTone = editorTags.tones[0] || null;
  const mode = approaches.find(m => m.id === approach) || approaches[0];

  const toggleTopic = (t) => { if (!editorRef.current) return; if (selTopics.includes(t)) editorRef.current.removeTag("ed-topic", t); else editorRef.current.insertTag(`#${t}`, "ed-topic", t); };
  const toggleSingle = (cls, cur, val) => { if (!editorRef.current) return; if (cur === val) editorRef.current.removeTag(cls, val); else { if (cur) editorRef.current.removeTag(cls, cur); editorRef.current.insertTag(val, cls, val); } };

  const lastIdeaRef = useRef("");
  const handleBuild = () => {
    const ideaText = editorRef.current?.getPlainText()?.trim() || "";
    lastIdeaRef.current = ideaText;
    setBuiltPrompt(buildPrompt({ approach, profile, rules, config, selTopics, selPlatform, selFormat, selTone, ideaText, commands: editorTags.commands, includeHooks, includeAntiRobot, includeSeo }));
    setCopied(false);
  };
  const copy = () => {
    navigator.clipboard?.writeText(builtPrompt); setCopied(true); setTimeout(() => setCopied(false), 2500);
    if (onSaveToHistory) {
      const isDuplicate = history && history.length > 0 && history[0].builtPrompt === builtPrompt;
      if (!isDuplicate) {
        const userText = getUserWrittenText(lastIdeaRef.current, selTopics, selPlatform, selFormat, selTone);
        onSaveToHistory({ id: Date.now(), timestamp: new Date().toISOString(), title: null, ideaText: userText, builtPrompt, approach, topics: [...selTopics], platform: selPlatform, format: selFormat, tone: selTone });
      }
    }
  };

  const filledProfile = Object.values(profile).filter(v => Array.isArray(v) ? v.length > 0 : v?.trim()).length;
  const activeRules = rules.global.filter(r => r.active).length + (rules[approach]?.filter(r => r.active).length || 0);
  const pillSt = (on) => ({ background: on ? "#C5FF4A" : "#1A1816", color: on ? "#1A1816" : "#8A8580", border: on ? "none" : "1px solid #3A3632", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 500 });
  const colSt = (on) => ({ background: on ? "#C5FF4A" : "#1A1816", color: on ? "#1A1816" : "#8A8580", border: on ? "none" : "1px solid #3A3632", borderRadius: 6, padding: "7px 12px", fontSize: 12, cursor: "pointer", fontWeight: 500, textAlign: "left" });
  const any = selTopics.length > 0 || selPlatform || selFormat || selTone;

  return (<div>
    <div style={{ marginBottom: 24 }}><h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Prompt Maker</h2><p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>Build a prompt → copy to your AI tool → get great content</p></div>

    {/* Approach selector */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>{approaches.map(m => (<button key={m.id} onClick={() => setApproach(m.id)} style={{ flex: "0 0 auto", minWidth: 170, background: approach === m.id ? "#2A2724" : "transparent", border: approach === m.id ? `2px solid ${m.color}` : "1px solid #3A3632", borderRadius: 10, padding: "10px 14px", cursor: "pointer", textAlign: "left" }}><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 16 }}>{m.icon}</span><span style={{ fontSize: 13, fontWeight: 600, color: approach === m.id ? m.color : "#8A8580" }}>{m.label}</span></div><div style={{ fontSize: 11, color: "#6A6560" }}>{m.desc}</div></button>))}</div>

    <div style={{ background: "#2A2724", borderRadius: 12, padding: 20, border: "1px solid #3A3632", marginBottom: 24 }}>
      <IdeaEditor ref={editorRef} onTagsChange={setEditorTags} config={config} />

      {any && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, padding: "10px 12px", background: "#1A1816", borderRadius: 8, border: "1px solid #3A3632" }}><span style={{ fontSize: 11, color: "#6A6560", lineHeight: "24px", marginRight: 4 }}>Active:</span>{selTopics.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: TAG_COLORS.topic.bg, color: TAG_COLORS.topic.color }}>#{t}</span>)}{selPlatform && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: TAG_COLORS.platform.bg, color: TAG_COLORS.platform.color }}>{selPlatform}</span>}{selFormat && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: TAG_COLORS.format.bg, color: TAG_COLORS.format.color }}>{selFormat}</span>}{selTone && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: TAG_COLORS.tone.bg, color: TAG_COLORS.tone.color }}>{selTone}</span>}</div>}

      <div style={{ marginBottom: 18 }}><label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 8 }}>Topics</label><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{topics.map(t => (<button key={t} onClick={() => toggleTopic(t)} style={pillSt(selTopics.includes(t))}>{t}</button>))}</div></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 18 }}>
        {/* Platform */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 12, color: "#8A8580" }}>Platform</label>
            <button onClick={() => toggleAddCol("platform")} style={{ background: "none", border: "none", color: addingCol === "platform" ? "#F87171" : "#C5FF4A", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }} title="Add platform">{addingCol === "platform" ? "×" : "+"}</button>
          </div>
          {addingCol === "platform" && <div style={{ marginBottom: 6, background: "#1A1816", borderRadius: 8, border: "1px solid #3A3632", padding: 8 }}>
            {addingMode === null && <>
              {inactivePlatforms.length > 0 && <button onClick={() => setAddingMode("library")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#C5FF4A", fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginBottom: 4, textAlign: "left" }}>From library ({inactivePlatforms.length})</button>}
              <button onClick={() => setAddingMode("new")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#8A8580", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>+ Add new</button>
            </>}
            {addingMode === "library" && <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 160, overflowY: "auto" }}>
              {inactivePlatforms.map(p => <button key={p.id} onClick={() => activateItem("platforms", p.id)} style={{ background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{p.label}</button>)}
              <button onClick={() => setAddingMode(null)} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 10, cursor: "pointer", fontFamily: "inherit", padding: "2px 0" }}>Back</button>
            </div>}
            {addingMode === "new" && <div style={{ display: "flex", gap: 4 }}>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addNewItem("platforms", { cat: "Custom" }); if (e.key === "Escape") { setAddingCol(null); setAddingMode(null); } }} placeholder="Name..." autoFocus style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>}
          </div>}
          <input value={pltSearch} onChange={e => setPltSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", marginBottom: 4, boxSizing: "border-box" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflowY: "auto" }}>{(pltSearch ? activePlatforms.filter(p => p.label.toLowerCase().includes(pltSearch.toLowerCase())) : activePlatforms).map(p => (<button key={p.id} onClick={() => toggleSingle("ed-platform", selPlatform, p.label)} style={colSt(selPlatform === p.label)}>{p.label}</button>))}</div>
        </div>
        {/* Format */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 12, color: "#8A8580" }}>Format</label>
            <button onClick={() => toggleAddCol("format")} style={{ background: "none", border: "none", color: addingCol === "format" ? "#F87171" : "#C5FF4A", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }} title="Add format">{addingCol === "format" ? "×" : "+"}</button>
          </div>
          {addingCol === "format" && <div style={{ marginBottom: 6, background: "#1A1816", borderRadius: 8, border: "1px solid #3A3632", padding: 8 }}>
            {addingMode === null && <>
              {inactiveFormats.length > 0 && <button onClick={() => setAddingMode("library")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#C5FF4A", fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginBottom: 4, textAlign: "left" }}>From library ({inactiveFormats.length})</button>}
              <button onClick={() => setAddingMode("new")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#8A8580", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>+ Add new</button>
            </>}
            {addingMode === "library" && <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 160, overflowY: "auto" }}>
              {inactiveFormats.map(f => <button key={f.id} onClick={() => activateItem("formats", f.id)} style={{ background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{f.label}</button>)}
              <button onClick={() => setAddingMode(null)} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 10, cursor: "pointer", fontFamily: "inherit", padding: "2px 0" }}>Back</button>
            </div>}
            {addingMode === "new" && <div style={{ display: "flex", gap: 4 }}>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addNewItem("formats", {}); if (e.key === "Escape") { setAddingCol(null); setAddingMode(null); } }} placeholder="Name..." autoFocus style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>}
          </div>}
          <input value={fmtSearch} onChange={e => setFmtSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", marginBottom: 4, boxSizing: "border-box" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflowY: "auto" }}>{(fmtSearch ? activeFormats.filter(f => f.label.toLowerCase().includes(fmtSearch.toLowerCase())) : activeFormats).map(f => (<button key={f.id} onClick={() => toggleSingle("ed-format", selFormat, f.label)} style={colSt(selFormat === f.label)}>{f.label}</button>))}</div>
        </div>
        {/* Tone */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 12, color: "#8A8580" }}>Tone</label>
            <button onClick={() => toggleAddCol("tone")} style={{ background: "none", border: "none", color: addingCol === "tone" ? "#F87171" : "#C5FF4A", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }} title="Add tone">{addingCol === "tone" ? "×" : "+"}</button>
          </div>
          {addingCol === "tone" && <div style={{ marginBottom: 6, background: "#1A1816", borderRadius: 8, border: "1px solid #3A3632", padding: 8 }}>
            {addingMode === null && <>
              {inactiveTones.length > 0 && <button onClick={() => setAddingMode("library")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#C5FF4A", fontSize: 11, cursor: "pointer", fontFamily: "inherit", marginBottom: 4, textAlign: "left" }}>From library ({inactiveTones.length})</button>}
              <button onClick={() => setAddingMode("new")} style={{ width: "100%", background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "6px 8px", color: "#8A8580", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>+ Add new</button>
            </>}
            {addingMode === "library" && <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 160, overflowY: "auto" }}>
              {inactiveTones.map(t => <button key={t.id} onClick={() => activateItem("tones", t.id)} style={{ background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{t.label}</button>)}
              <button onClick={() => setAddingMode(null)} style={{ background: "none", border: "none", color: "#6A6560", fontSize: 10, cursor: "pointer", fontFamily: "inherit", padding: "2px 0" }}>Back</button>
            </div>}
            {addingMode === "new" && <div style={{ display: "flex", gap: 4 }}>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addNewItem("tones", {}); if (e.key === "Escape") { setAddingCol(null); setAddingMode(null); } }} placeholder="Name..." autoFocus style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>}
          </div>}
          <input value={toneSearch} onChange={e => setToneSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 8px", color: "#E8E4E0", fontSize: 11, outline: "none", fontFamily: "inherit", marginBottom: 4, boxSizing: "border-box" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 240, overflowY: "auto" }}>{(toneSearch ? activeTones.filter(t => t.label.toLowerCase().includes(toneSearch.toLowerCase())) : activeTones).map(t => (<button key={t.id} onClick={() => toggleSingle("ed-tone", selTone, t.label)} style={colSt(selTone === t.label)}>{t.label}</button>))}</div>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}><label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#E8E4E0" }}><input type="checkbox" checked={includeHooks} onChange={e => setIncludeHooks(e.target.checked)} style={{ accentColor: "#FFD700" }} /> Includes Hook Rules ({rules.hooks?.filter(r => r.active).length || 0} active)</label></div>
      <div style={{ marginBottom: 18 }}><label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#E8E4E0" }}><input type="checkbox" checked={includeAntiRobot} onChange={e => setIncludeAntiRobot(e.target.checked)} style={{ accentColor: "#F87171" }} /> 🚫 Anti-Robot Mode ({rules.antiRobot?.filter(r => r.active).length || 0} active)</label></div>
      <div style={{ marginBottom: 18 }}><label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#E8E4E0" }}><input type="checkbox" checked={includeSeo} onChange={e => setIncludeSeo(e.target.checked)} style={{ accentColor: "#34D399" }} /> 🔎 SEO Ready ({rules.seo?.filter(r => r.active).length || 0} active)</label></div>

      <div style={{ background: "#1A1816", borderRadius: 8, padding: "12px 14px", marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: mode.color }} /><span style={{ fontSize: 12, color: mode.color, fontWeight: 600 }}>{mode.icon} {mode.label}</span></div>
        <span style={{ fontSize: 12, color: filledProfile > 0 ? "#6A6560" : "#FF6B6B" }}>📝 {filledProfile} profile fields {filledProfile === 0 && "(fill Business Profile!)"}</span>
        <span style={{ fontSize: 12, color: "#6A6560" }}>⚡ {activeRules} rules</span>
      </div>

      <button onClick={handleBuild} style={{ width: "100%", background: mode.color, color: "#1A1816", border: "none", borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{mode.icon} Build Prompt</button>
    </div>

    {builtPrompt && (<div style={{ background: "#2A2724", borderRadius: 12, border: `1px solid ${mode.color}40`, overflow: "hidden" }}>
      <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #3A3632" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 16 }}>{mode.icon}</span><div><div style={{ fontSize: 14, fontWeight: 600, color: "#E8E4E0" }}>Prompt Ready</div><div style={{ fontSize: 11, color: "#6A6560" }}>{builtPrompt.length} chars · ~{Math.ceil(builtPrompt.length / 4)} tokens</div></div></div>
        <button onClick={copy} style={{ background: copied ? "#4CAF50" : mode.color, color: "#1A1816", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{copied ? "✓ Copied!" : "📋 Copy prompt"}</button>
      </div>
      <div style={{ padding: "16px 18px", maxHeight: 400, overflowY: "auto", background: "#1A1816" }}><pre style={{ margin: 0, fontSize: 12, color: "#C0BCB8", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', monospace" }}>{builtPrompt}</pre></div>
      <div style={{ padding: "12px 18px", background: "#2A2724", borderTop: "1px solid #3A3632" }}><span style={{ fontSize: 11, color: "#8A8580" }}>💡 Paste this prompt into any AI tool (ChatGPT, Gemini, Claude, Perplexity, etc.)</span></div>
    </div>)}
  </div>);
}

// ─── PROMPT HISTORY ────────────────────────────────────
function PromptHistorySection({ history, setHistory, config }) {
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const approaches = config.approaches || DEFAULT_CONFIG.approaches;
  const getApproach = (id) => approaches.find(a => a.id === id) || { icon: "✨", color: "#C5FF4A", label: "Unknown" };

  const getDisplayTitle = (entry) => {
    if (entry.title) return entry.title;
    if (entry.ideaText && entry.ideaText.trim()) {
      const words = entry.ideaText.trim().split(/\s+/).slice(0, 8);
      return words.join(" ") + (entry.ideaText.trim().split(/\s+/).length > 8 ? "..." : "");
    }
    return null;
  };

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  const copyEntry = (entry) => { navigator.clipboard?.writeText(entry.builtPrompt); setCopiedId(entry.id); setTimeout(() => setCopiedId(null), 2500); };
  const deleteEntry = (id) => { setHistory(prev => prev.filter(e => e.id !== id)); if (expandedId === id) setExpandedId(null); };
  const renameEntry = (id) => { setHistory(prev => prev.map(e => e.id === id ? { ...e, title: editTitle.trim() || null } : e)); setEditingId(null); setEditTitle(""); };
  const clearAll = () => { if (window.confirm("Delete all saved prompts?")) { setHistory([]); setExpandedId(null); } };

  const filtered = searchQuery.trim()
    ? history.filter(e => {
        const q = searchQuery.toLowerCase();
        return (getDisplayTitle(e) || "").toLowerCase().includes(q) || (e.ideaText || "").toLowerCase().includes(q) || (e.topics || []).some(t => t.toLowerCase().includes(q)) || (e.platform || "").toLowerCase().includes(q) || (e.format || "").toLowerCase().includes(q) || (e.tone || "").toLowerCase().includes(q);
      })
    : history;

  return (<div>
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ margin: 0, fontSize: 22, color: "#E8E4E0" }}>Prompt History</h2>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8580" }}>{history.length} saved prompt{history.length !== 1 ? "s" : ""} — auto-saved when you copy</p>
    </div>

    {history.length > 0 && (<div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
      <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search prompts..." style={{ flex: 1, background: "#2A2724", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
      <button onClick={clearAll} style={{ background: "none", border: "1px solid #F8717130", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#F87171", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Clear all</button>
    </div>)}

    {history.length === 0 && (<div style={{ background: "#2A2724", borderRadius: 12, padding: "40px 20px", border: "1px solid #3A3632", textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
      <div style={{ fontSize: 14, color: "#8A8580" }}>No prompts saved yet</div>
      <div style={{ fontSize: 12, color: "#6A6560", marginTop: 4 }}>Go to Prompt Maker, build a prompt, and click "Copy prompt" — it will appear here automatically.</div>
    </div>)}

    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {filtered.map(entry => {
        const isExp = expandedId === entry.id;
        const mode = getApproach(entry.approach);
        const title = getDisplayTitle(entry);
        const isCopied = copiedId === entry.id;
        const isEditing = editingId === entry.id;
        const hasTags = (entry.topics?.length > 0 || entry.platform || entry.format || entry.tone);

        return (<div key={entry.id} style={{ background: "#2A2724", borderRadius: 10, border: isExp ? `1px solid ${mode.color}40` : "1px solid #3A3632", overflow: "hidden" }}>
          {/* Header — always visible */}
          <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { if (!isEditing) setExpandedId(isExp ? null : entry.id); }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{mode.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              {isEditing ? (
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} onKeyDown={e => { if (e.key === "Enter") renameEntry(entry.id); if (e.key === "Escape") setEditingId(null); }} onClick={e => e.stopPropagation()} autoFocus style={{ background: "#1A1816", border: `1px solid ${mode.color}40`, borderRadius: 4, padding: "4px 8px", color: "#E8E4E0", fontSize: 13, outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" }} />
              ) : (
                <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: title ? "#E8E4E0" : "#8A8580", fontStyle: title ? "normal" : "italic" }}>{title || "Empty request"}</div>
              )}
              <div style={{ fontSize: 10, color: "#6A6560", marginTop: 2 }}>{fmtDate(entry.timestamp)}{entry.builtPrompt && ` · ${entry.builtPrompt.length} chars`}</div>
            </div>

            {/* Compact tag pills — collapsed view */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, overflow: "hidden", maxWidth: 200 }}>
              {entry.platform && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: TAG_COLORS.platform.bg, color: TAG_COLORS.platform.color, whiteSpace: "nowrap" }}>{entry.platform}</span>}
              {entry.format && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: TAG_COLORS.format.bg, color: TAG_COLORS.format.color, whiteSpace: "nowrap" }}>{entry.format}</span>}
            </div>

            <button onClick={e => { e.stopPropagation(); copyEntry(entry); }} style={{ background: isCopied ? "#4CAF50" : mode.color, color: "#1A1816", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 600, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{isCopied ? "Copied!" : "Copy"}</button>
            <span style={{ fontSize: 11, color: "#6A6560", transition: "transform 0.15s", transform: isExp ? "rotate(90deg)" : "none", flexShrink: 0 }}>▸</span>
          </div>

          {/* Expanded content */}
          {isExp && (<div style={{ borderTop: "1px solid #3A363280" }}>
            {hasTags && (<div style={{ padding: "10px 16px", display: "flex", flexWrap: "wrap", gap: 6, borderBottom: "1px solid #3A363240" }}>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${mode.color}18`, color: mode.color }}>{mode.icon} {mode.label}</span>
              {entry.topics?.map(t => <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: TAG_COLORS.topic.bg, color: TAG_COLORS.topic.color }}>#{t}</span>)}
              {entry.platform && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: TAG_COLORS.platform.bg, color: TAG_COLORS.platform.color }}>{entry.platform}</span>}
              {entry.format && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: TAG_COLORS.format.bg, color: TAG_COLORS.format.color }}>{entry.format}</span>}
              {entry.tone && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: TAG_COLORS.tone.bg, color: TAG_COLORS.tone.color }}>{entry.tone}</span>}
            </div>)}
            <div style={{ padding: "16px 18px", maxHeight: 400, overflowY: "auto", background: "#1A1816" }}>
              <pre style={{ margin: 0, fontSize: 12, color: "#C0BCB8", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', monospace" }}>{entry.builtPrompt}</pre>
            </div>
            <div style={{ padding: "10px 16px", background: "#2A2724", borderTop: "1px solid #3A3632", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setEditingId(entry.id); setEditTitle(getDisplayTitle(entry) || ""); }} style={{ background: "none", border: "1px solid #3A3632", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#8A8580", cursor: "pointer", fontFamily: "inherit" }}>Rename</button>
                <button onClick={() => deleteEntry(entry.id)} style={{ background: "none", border: "1px solid #F8717130", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "#F87171", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
              </div>
              <button onClick={() => copyEntry(entry)} style={{ background: isCopied ? "#4CAF50" : mode.color, color: "#1A1816", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{isCopied ? "Copied!" : "📋 Copy prompt"}</button>
            </div>
          </div>)}
        </div>);
      })}
    </div>

    {history.length > 0 && filtered.length === 0 && searchQuery && (<div style={{ padding: 20, textAlign: "center", color: "#6A6560", fontSize: 13 }}>No prompts match "{searchQuery}"</div>)}
  </div>);
}

// ─── HOOKS (builds prompt, not dummy data) ─────────────
function HookGenerator({ profile }) {
  const [topic, setTopic] = useState("");
  const [builtPrompt, setBuiltPrompt] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleBuild = () => {
    setBuiltPrompt(buildHooksPrompt({ profile, topic }));
    setCopied(false);
  };
  const copy = () => { navigator.clipboard?.writeText(builtPrompt); setCopied(true); setTimeout(() => setCopied(false), 2500); };

  return (<div>
    <h2 style={{ margin: "0 0 6px", fontSize: 22, color: "#E8E4E0" }}>Hook Generator</h2>
    <p style={{ margin: "0 0 24px", fontSize: 13, color: "#8A8580" }}>Build a hook prompt → copy to your AI tool → get 10 scroll-stoppers</p>
    <div style={{ background: "#2A2724", borderRadius: 12, padding: 20, border: "1px solid #3A3632", marginBottom: 24 }}>
      <div style={{ marginBottom: 16 }}><label style={{ fontSize: 12, color: "#8A8580", display: "block", marginBottom: 8 }}>Topic (optional)</label><input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. 'pricing mistakes', 'landing page design'..." style={{ width: "100%", background: "#1A1816", border: "1px solid #3A3632", borderRadius: 8, padding: "10px 14px", color: "#E8E4E0", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
      <button onClick={handleBuild} style={{ width: "100%", background: "#FFD700", color: "#1A1816", border: "none", borderRadius: 10, padding: 14, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>🪝 Build Hook Prompt</button>
    </div>
    {builtPrompt && (<div style={{ background: "#2A2724", borderRadius: 12, border: "1px solid #FFD70040", overflow: "hidden" }}>
      <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #3A3632" }}>
        <div><div style={{ fontSize: 14, fontWeight: 600, color: "#E8E4E0" }}>🪝 Hook prompt ready</div><div style={{ fontSize: 11, color: "#6A6560" }}>{builtPrompt.length} chars · ~{Math.ceil(builtPrompt.length / 4)} tokens</div></div>
        <button onClick={copy} style={{ background: copied ? "#4CAF50" : "#FFD700", color: "#1A1816", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{copied ? "✓ Copied!" : "📋 Copy prompt"}</button>
      </div>
      <div style={{ padding: "16px 18px", maxHeight: 300, overflowY: "auto", background: "#1A1816" }}><pre style={{ margin: 0, fontSize: 12, color: "#C0BCB8", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', monospace" }}>{builtPrompt}</pre></div>
    </div>)}
  </div>);
}

// ─── MAIN (state lives here) ───────────────────────────

export default function ContentBrain() {
  const [active, setActive] = useState("generator");
  const [profile, setProfile] = useStickyState(DEFAULT_PROFILE, "cb_profile");
  const [rules, setRules] = useStickyState(DEFAULT_RULES, "cb_rules");
  const [config, setConfig] = useStickyState(DEFAULT_CONFIG, "cb_config");
  const [history, setHistory] = useStickyState([], "cb_history");

  const saveToHistory = useCallback((entry) => {
    setHistory(prev => [entry, ...prev]);
  }, [setHistory]);

  // Migrate: rule keys from label-based to id-based (fmt_Short post → fmt_short_post)
  useEffect(() => {
    const KEY_MAP = { "fmt_Short post": "fmt_short_post", "fmt_Long-form post": "fmt_long_post", "fmt_Carousel": "fmt_carousel", "fmt_Thread": "fmt_thread", "fmt_Comment/Reply": "fmt_comment_reply", "fmt_Research paper": "fmt_research_paper", "fmt_Engagement bait": "fmt_engagement_bait" };
    let needsMigrate = false;
    const migrated = {};
    for (const [oldK, newK] of Object.entries(KEY_MAP)) {
      if (rules[oldK] && !rules[newK]) { migrated[newK] = rules[oldK]; needsMigrate = true; }
    }
    if (needsMigrate) setRules(prev => { const next = { ...prev, ...migrated }; Object.keys(KEY_MAP).forEach(k => delete next[k]); return next; });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Migrate: add missing rule keys + merge new default rules into existing keys by id
  useEffect(() => {
    let needsUpdate = false; const next = { ...rules };
    // Add entirely missing keys
    Object.keys(DEFAULT_RULES).forEach(k => { if (!(k in next)) { next[k] = DEFAULT_RULES[k]; needsUpdate = true; } });
    // Merge new default rules into existing keys (by id)
    Object.keys(DEFAULT_RULES).forEach(k => {
      if (next[k] && DEFAULT_RULES[k]) {
        const existingIds = new Set(next[k].map(r => r.id));
        const newRules = DEFAULT_RULES[k].filter(r => !existingIds.has(r.id));
        if (newRules.length) { next[k] = [...next[k], ...newRules]; needsUpdate = true; }
      }
    });
    if (needsUpdate) setRules(next);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Migrate: contentModes → approaches
  useEffect(() => {
    if (config.contentModes && !config.approaches) {
      const migrated = config.contentModes.map(({ tool, builtIn, ...rest }) => rest);
      setConfig(prev => { const next = { ...prev, approaches: migrated }; delete next.contentModes; return next; });
    } else if (config.contentModes && config.approaches) {
      setConfig(prev => { const next = { ...prev }; delete next.contentModes; return next; });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Migrate: add any new config fields from DEFAULT_CONFIG
  useEffect(() => {
    let needsUpdate = false; const next = { ...config };
    Object.keys(DEFAULT_CONFIG).forEach(k => { if (!(k in config)) { next[k] = DEFAULT_CONFIG[k]; needsUpdate = true; } });
    // Merge new items into existing arrays (formats, platforms, tones, approaches) by id
    ["formats", "platforms", "tones", "approaches"].forEach(k => {
      if (next[k] && DEFAULT_CONFIG[k]) {
        const existingIds = new Set(next[k].map(i => i.id));
        const newItems = DEFAULT_CONFIG[k].filter(i => !existingIds.has(i.id));
        if (newItems.length) { next[k] = [...next[k], ...newItems]; needsUpdate = true; }
      }
    });
    if (needsUpdate) setConfig(next);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Migrate: add new profile fields, remove old ones, convert old services/socialProof
  useEffect(() => {
    const defaultKeys = Object.keys(DEFAULT_PROFILE);
    const currentKeys = Object.keys(profile);
    const toAdd = defaultKeys.filter(k => !currentKeys.includes(k));
    const toRemove = currentKeys.filter(k => !defaultKeys.includes(k));
    // Migrate old service1/service2 fields to offers array
    const migratedOffers = [];
    if (profile.service1Name?.trim()) migratedOffers.push({ id: 1, name: profile.service1Name.trim(), desc: (profile.service1Desc || "").trim(), pricing: (profile.service1Pricing || "").trim() });
    if (profile.service2Name?.trim()) migratedOffers.push({ id: 2, name: profile.service2Name.trim(), desc: (profile.service2Desc || "").trim(), pricing: (profile.service2Pricing || "").trim() });
    // Migrate old socialProof field to proof array
    const migratedProof = [];
    if (profile.socialProof?.trim() && !profile.proof?.length) migratedProof.push({ id: 1, text: profile.socialProof.trim(), type: "result" });
    const needsMigrate = toAdd.length || toRemove.length || migratedOffers.length || migratedProof.length;
    if (needsMigrate) {
      setProfile(prev => {
        const next = { ...prev };
        toAdd.forEach(k => { next[k] = Array.isArray(DEFAULT_PROFILE[k]) ? [...DEFAULT_PROFILE[k]] : ""; });
        toRemove.forEach(k => { delete next[k]; });
        if (migratedOffers.length && !(next.offers || []).length) next.offers = migratedOffers;
        if (migratedProof.length) next.proof = migratedProof;
        return next;
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filled = Object.values(profile).filter(v => Array.isArray(v) ? v.length > 0 : v?.trim()).length;

  const render = () => {
    switch (active) {
      case "business": return <BusinessSection profile={profile} setProfile={setProfile} />;
      case "rules": return <RulesSection rules={rules} setRules={setRules} config={config} setConfig={setConfig} />;
      case "generator": return <PromptMaker profile={profile} rules={rules} config={config} setConfig={setConfig} onSaveToHistory={saveToHistory} history={history} />;
      case "hooks": return <HookGenerator profile={profile} />;
      case "history": return <PromptHistorySection history={history} setHistory={setHistory} config={config} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#1A1816", fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#E8E4E0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ width: 220, background: "#141210", borderRight: "1px solid #2A2724", padding: "24px 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 20px", marginBottom: 32 }}><div style={{ fontSize: 17, fontWeight: 700, color: "#C5FF4A", letterSpacing: "-0.5px" }}>Content Brain</div><div style={{ fontSize: 11, color: "#6A6560", marginTop: 2 }}>Personal AI Prompt Builder</div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>{SECTIONS.map(s => (<button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: active === s.id ? "#2A2724" : "transparent", border: "none", borderRadius: 8, padding: "10px 12px", color: active === s.id ? "#E8E4E0" : "#6A6560", fontSize: 13, fontWeight: 500, cursor: "pointer", width: "100%" }}><span style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 15 }}>{s.icon}</span>{s.label}</span>{s.id === "business" && filled > 0 && <span style={{ fontSize: 10, color: "#6A6560" }}>{filled}</span>}{s.id === "history" && history.length > 0 && <span style={{ fontSize: 10, color: "#6A6560" }}>{history.length}</span>}</button>))}</div>
        <div style={{ marginTop: "auto", padding: "0 20px" }}><div style={{ background: "#2A2724", borderRadius: 10, padding: 14, border: "1px solid #3A3632" }}><div style={{ fontSize: 11, color: "#8A8580", marginBottom: 6 }}>Data status</div><div style={{ fontSize: 11, color: "#6A6560", display: "flex", flexDirection: "column", gap: 3 }}><span>📝 {filled}/{Object.keys(profile).length} profile</span><span>⚡ {Object.values(rules).flat().length} rules</span><span>📋 {history.length} prompts</span></div></div></div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "32px 40px" }}><div style={{ maxWidth: 820 }}>{render()}</div></div>
    </div>
  );
}
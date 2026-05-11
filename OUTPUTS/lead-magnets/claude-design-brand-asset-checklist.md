# The Claude Design Brand Asset Checklist

Everything you need to gather before you open Claude Design. Make your output look like your brand.

Built by [David Pokorny](https://www.linkedin.com/in/pokornydavidcom/)

---

## ❓ Why this checklist exists

Most founders open Claude Design, type a prompt, and get back something that looks like every other AI-generated site. Inter font. Purple-to-blue gradients. Three-column layouts. Then they burn through a week's worth of tokens trying to fix it.

<aside>
💡

Claude Design defaults to generic patterns when you don't give it enough context. A logo and a color palette are not enough context. Claude needs the full visual surface of your brand.

</aside>

If you gather everything on this checklist before your first prompt, the system Claude builds for you actually looks like your brand. Every project after that costs fewer tokens, because the foundation is already in place.

If you don't have a brand yet, start there. Come back when you've got something to feed it.

---

## 🤔 How to use this checklist

1. **Make one folder.** Put every asset in it. Don't link to files scattered across Notion, Google Drive, Dropbox, and your designer's Figma. One folder. Upload from one place.
2. **Use HD versions.** Full-page screenshots, not crops. Vector files where they exist (SVG, PDF). Compressed JPGs from a Slack thread are not enough. If you export from Figma you can do both PNG and SVG exports. 
3. **Capture how things actually look in the wild.** Screenshot Chrome on a desktop. Screenshot Safari on a phone. Don't upload Figma mockups of how you wish your brand looked. Claude needs to see reality.
4. **Tell Claude which version is the right one when your brand has more than one.** Most brands have three button styles, two heading fonts, and a nav that changes between the marketing site and the app. All of them are technically yours. Claude can't tell which one you actually want, so it picks whichever appears most often. Pick the version you want going forward, and tell Claude to ignore the rest.
5. **Count on spending a lot of tokens in the first session.** The first session won't get you there. Don't fight it. Front-load tokens on the system, not on real projects.

Your first prompt to Claude after upload is the most important one in the entire setup. Tell it:

> *"Build a design system reference based on these uploads. Show me the type scale, color tokens, spacing scale, and component primitives you've inferred from my brand. Don't generate any artifacts yet.  I want to verify the system first."*
> 

Read what comes back. Correct anything wrong. Save the corrected version somewhere outside Claude. You'll need it again.

Only then start generating real artifacts.

---

## ✅  The checklist

*I tried to gather every asset type that matters from real client projects. Don't worry if you don't have all of them.*

### ⭐ Must-haves

Without these, Claude works from defaults and your output will look like every other AI-generated output.

### Logo

- [ ]  Full logo, original vector (SVG or PDF preferred)
- [ ]  Icon or mark only (favicon-level, no wordmark)

### Color

- [ ]  Primary brand color (hex or oklch)
- [ ]  Full neutrals ramp (white through black, all your grays)
- [ ]  At least one example of your primary color used on a real surface

### Typography

- [ ]  Heading font with the exact weights you actually use
- [ ]  Body font with weights
- [ ]  Type scale — H1 through H3 plus body size, in pixels or rem

### Real surface screenshots

These teach Claude what your brand actually looks like in production.

- [ ]  Homepage, full page (above and below the fold, scrolling capture)
- [ ]  Landing page for your main offer
- [ ]  Pricing page
- [ ]  Signup or login screen
- [ ]  Product or app dashboard, logged in

### Marketing and social

- [ ]  LinkedIn carousel or post graphic
- [ ]  X/Twitter card image
- [ ]  Instagram post if you use it
- [ ]  Banner ad creative if you have any
- [ ]  Pitch deck cover and at least two content slides
- [ ]  Sales deck if you use a separate one
- [ ]  Any printed material (one-pagers, business cards)

### Voice

- [ ]  Tagline
- [ ]  One paragraph of homepage copy you're proud of

Voice doesn't directly affect visual output, but Claude does generate copy in graphics. If you don't tell it your voice, it'll write generic headlines.

---

### 👍🏼 Nice-to-haves

These refine the output once the foundation is in place. Add them as you have them.

### Logo extras

- [ ]  Logo monochrome (white-on-dark and dark-on-light versions)
- [ ]  Logo shown on a real background (your homepage header, app header, business card)

### Color extras

- [ ]  Secondary or accent colors
- [ ]  Semantic colors (success, warning, error, info)
- [ ]  Dark mode background colors if you have them
- [ ]  Tinted surface backgrounds if you use them

### Typography extras

- [ ]  Display font if it's different from your heading font
- [ ]  Full type scale (H4 through H6 plus caption sizes)
- [ ]  Line height preferences for headings vs body
- [ ]  Letter-spacing if you use it (most brands don't, some do)

### Layout and spacing

- [ ]  Spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96…)
- [ ]  Container max widths (most sites use one or two)
- [ ]  Grid system (12-col, 8-col, fluid)
- [ ]  Border radius preferences (sharp, 4px, 8px, 16px, full-rounded)
- [ ]  Shadow styles if any (drop, inner, glow)

### Iconography and imagery

- [ ]  Icon style — line vs solid, weight, corner treatment, fill rules
- [ ]  A pack of 10–20 icons you actually use, exported
- [ ]  Photo style — your real product photos, illustrations, or both
- [ ]  A mood board of 5–10 images that match your visual direction

### More real surfaces

- [ ]  About or team page
- [ ]  Onboarding flow screens
- [ ]  Empty states (an empty inbox, an empty project list, "no results")
- [ ]  Error states (validation errors, 404, payment failures)
- [ ]  Email or newsletter design
- [ ]  Mobile views of all the above where it matters

If you skip empty states, Claude will invent one. The invented one will be generic. You will hate it.

### Voice and copy extras

- [ ]  Mission statement (one sentence)
- [ ]  Tone-of-voice notes if you have them (formal, casual, technical, irreverent)

### Reference and aspiration

- [ ]  3–5 brands whose visual language you respect, with screenshots
- [ ]  Specific pages from those brands that nail something you want
- [ ]  Counter-references — brands you specifically don't want to look like

---

## 🎨 What to do after Claude generates the design system

1. Read it line by line.
2. Compare it to your actual brand. Note every place Claude got it wrong. It will get something wrong. Usually font weights or spacing.
3. Correct it in chat. "Body weight should be 400, not 500." "Section padding is 96px, not 64px." "We use Inter for body but Söhne for headings, not the other way around."
4. Save the corrected reference somewhere outside Claude. Notion page, design doc, anywhere persistent. You will need to reupload it in future sessions because Claude doesn't keep memory across projects the way a human designer does.
5. Now start generating real artifacts.

The corrected reference becomes the most useful artifact you'll produce in this whole exercise. Treat it like documentation. Update it when your brand evolves.

---

## 🟠 Want me to audit your brand assets before you spend a token?

This checklist tells you what to gather. Whether your site is actually converting is a different problem.

If your homepage hero is unclear, your pricing page is overstuffed, or your onboarding is bleeding users, Claude Design won't fix any of it. AI polish on a broken page produces a polished broken page.

I do free 15-minute audits for early-seed AI/SaaS founders. You send me your URL, I tell you the three biggest leaks and what to fix first.

[**DM me "AUDIT" with your URL on LinkedIn.**](https://www.linkedin.com/in/pokornydavidcom/)
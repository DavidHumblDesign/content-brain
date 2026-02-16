# Humbl Engine Skill: Tool Builder

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

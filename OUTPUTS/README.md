# OUTPUTS

This is where Cowork saves everything it builds.

One subfolder per project. Cowork creates the subfolder, names it, and organizes everything inside it. You don't touch this folder — Cowork does.

**Do not ask Cowork to read from this folder unprompted.** Every file it reads costs tokens. If you need something from a past output, tell Cowork exactly which file to look at.

---

## Structure

```
OUTPUTS/
└── project-name/
    └── file.md / file.docx / file.html / etc.
```

## Examples

```
OUTPUTS/
├── linkedin-post-conversion-leaks/
│   └── post-v1.md
├── humbl-audit-report-acme/
│   └── audit.md
└── blog-post-hero-section/
    ├── draft-v1.md
    └── draft-v2.md
```

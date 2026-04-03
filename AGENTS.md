# Work Dashboard

A unified control panel for people with diversified work activities (freelance, employment, side businesses). See `docs/VISION.md` for the full product vision.

## Repository structure

```
AGENTS.md          — this file: project map and agent rules
CLAUDE.md          -> AGENTS.md (symlink for Cursor/Claude)
README.md          — project description for humans
docs/
├── brandbook.html — design system and visual guidelines (open in browser)
├── PRODUCT.md     — product strategy, MVP scope, principles
├── STACK.md       — tech stack and architecture decisions
└── VISION.md      — product vision, problem space, market context
```

## Language policy

- **All code, comments, documentation, and commit messages**: English only. The sole exception is `README.md`, which is written in Russian since it's for humans, not agents.
- **Communication with the user**: always match the language the user writes in. If they write in Russian, respond in Russian. If in English, respond in English.

## Working in this repository

1. Read `docs/PRODUCT.md` before making product decisions — it defines MVP scope, principles, and what's out of scope.
2. Read `docs/STACK.md` before making technical decisions — it defines the tech stack and architecture.
3. Read `docs/VISION.md` for broader context — the problem space, target audience, and market landscape.
4. **Read `docs/brandbook.html` before any visual or UI work.** The brandbook defines colors, typography, spacing, components, and design principles. All UI must follow it. Key rules:
   - Light theme is primary, dark theme is the alternative. Support both.
   - Font: Geist Sans (UI), Geist Mono (code/numbers). No other fonts.
   - Accent color: indigo (#6366F1 light, #818CF8 dark). Used only for interactive elements.
   - Neutral base: Zinc palette. No decorative colors, gradients, or glows.
   - Shadows: subtle (barely-there). Borders for separation, shadows for elevation.
   - Icons: Lucide, outline style, 1.5px stroke. No emojis in product UI.
   - Motion: 100ms/200ms/300ms with ease. No decorative animation.
   - Voice: calm, direct, precise. No exclamation marks or urgency theater.
5. Do not add features not described in the product strategy without explicit user approval.
6. Keep this file short. As the project grows, add detailed docs to `docs/` and link them here.

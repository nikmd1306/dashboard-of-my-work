# Work Dashboard

A unified control panel for people with diversified work activities (freelance, employment, side businesses). See `docs/VISION.md` for the full product vision.

## Repository structure

```
AGENTS.md          — this file: project map and agent rules
CLAUDE.md          -> AGENTS.md (symlink for Cursor/Claude)
README.md          — project description for humans
docs/
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
4. Do not add features not described in the product strategy without explicit user approval.
5. Keep this file short. As the project grows, add detailed docs to `docs/` and link them here.

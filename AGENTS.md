# Work Dashboard

A unified control panel for people with diversified work activities (freelance, employment, side businesses). See `docs/VISION.md` for the full product vision.

## Repository structure

```
AGENTS.md          — this file: project map and agent rules
CLAUDE.md          -> AGENTS.md (symlink for Cursor/Claude)
README.md          — project description for humans
docs/
└── VISION.md      — product vision, target audience, MVP scope
```

## Language policy

- **All code, comments, documentation, and commit messages**: English only. The sole exception is `README.md`, which is written in Russian since it's for humans, not agents.
- **Communication with the user**: always match the language the user writes in. If they write in Russian, respond in Russian. If in English, respond in English.

## Working in this repository

1. Read `docs/VISION.md` before making product decisions — it defines what we're building and what's out of scope.
2. Do not add features not described in the vision without explicit user approval.
3. Keep this file short. As the project grows, add detailed docs to `docs/` and link them here.

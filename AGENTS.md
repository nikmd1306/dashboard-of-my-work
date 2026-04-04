# Work Dashboard

A unified control panel for people with diversified work activities (freelance, employment, side businesses). See `docs/VISION.md` for the full product vision.

## Repository structure

```
AGENTS.md              — this file: project map and agent rules
CLAUDE.md              -> AGENTS.md (symlink)
README.md              — project description for humans (Russian)
docker-compose.yml     — PostgreSQL via Docker
docs/                  — product vision, strategy, stack, brandbook
├── plans/             — execution plans (active/ and completed/)
backend/               — Python + FastAPI backend
└── app/
    ├── models/        — SQLModel table definitions
    ├── schemas/       — Pydantic request/response schemas
    └── routers/       — API route handlers
frontend/              — Next.js + TypeScript frontend
└── src/
    ├── app/           — pages (App Router)
    ├── components/    — React components (includes shadcn/ui)
    ├── lib/           — utilities and API client
    ├── types/         — shared TypeScript type definitions
    └── i18n/          — UI string dictionaries (Russian in v1)
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
7. **Repository structure in this file must stay high-level.** Only list stable architectural directories (e.g. `models/`, `routers/`), never individual files. Agents can explore the file system for details. If a new top-level directory or architectural pattern is added, update the structure; if files are added within existing directories, do not.
8. **The user manages runtime themselves.** Do not start, stop, or restart services (database, backend, frontend) unless the user explicitly grants permission for the current session. If a restart is needed, ask the user to do it via `make` commands (see `Makefile` for available targets). Do not launch Docker Desktop or background processes on your own.
9. **Keep documentation in sync with reality.** When adding, removing, or upgrading dependencies or tools, verify that `docs/STACK.md` and other relevant docs still reflect the actual state. Do not leave stale references.
10. **Run `make lint` before considering backend work done.** The project uses `ruff` for Python linting (config in `backend/pyproject.toml`). A pre-commit hook (`.githooks/pre-commit`) enforces this automatically.
11. **Assess task complexity before starting.** Simple, isolated changes (rename a label, change a color, fix a typo) can be executed immediately. For non-trivial work — new features, significant refactors, multi-file changes — create an execution plan first. If the user explicitly asks for a plan, always create one regardless of complexity.
12. **Use execution plans for non-trivial work.** Plans live in `docs/plans/` (`active/` for in-progress, `completed/` for finished). File naming: `YYYY-MM-DD-short-slug.md`. Use the template at `docs/plans/TEMPLATE.md`. Each plan is split into phases — a phase is a self-contained unit of work that can be completed in a single agent session. When the user says "execute phase N", read the plan and execute that phase. Read any active plans before starting related work.
13. **Write phases that are ready to execute, not ready to think about.** A phase is written for a different agent that will execute it without the planning context. Each phase must: focus on a single concern (don't combine data display with interactive forms, or API work with UI work); list the specific files to create or edit; resolve implementation choices (which components, which CSS classes, which props) so the executor writes code, not makes decisions. If describing a phase requires the word "or" for an implementation choice, pick one and log the decision. See `docs/plans/TEMPLATE.md` for phase-writing guidance.

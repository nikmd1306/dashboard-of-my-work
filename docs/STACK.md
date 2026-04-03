# Work Dashboard — Tech Stack

## Architecture

Two separate services communicating via REST API:

- **Frontend** (TypeScript) — user interface, renders screens, calls backend API
- **Backend** (Python) — API, business logic, data validation, database access

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15 + TypeScript | UI, responsive layout, API client |
| UI components | Tailwind CSS + shadcn/ui | Rapid development baseline; brandbook and design system to follow |
| Backend | Python + FastAPI | REST API, business logic, data validation |
| ORM | SQLModel | Type-safe database access, Pydantic integration |
| Database | PostgreSQL (Docker, local) | Primary data store, runs locally in a container |
| Deployment | — | Deferred; local development only for now |

## Key choices explained

### Why FastAPI (not Django)

FastAPI is lightweight, async-capable, and auto-generates API documentation (Swagger UI). For an API-only backend without admin panels, it's simpler and faster than Django. Created for modern Python with type hints and Pydantic validation.

### Why SQLModel (not SQLAlchemy directly)

SQLModel is built on top of SQLAlchemy + Pydantic by FastAPI's author. It provides the same database power with less boilerplate and seamless integration with FastAPI's validation layer.

### Why PostgreSQL via Docker

PostgreSQL is one of the most reliable databases available. Running it in Docker keeps the host machine clean — start and stop with one command, no system-level installation. Easy to reset, easy to reproduce.

### Why Next.js for frontend

Largest ecosystem among React frameworks in 2026. Most tutorials, best agent (AI) support, strong community. App Router provides modern patterns for layouts and data fetching.

### Why Tailwind + shadcn/ui

shadcn/ui copies components directly into the project as source code — full ownership, no dependency on external library updates. Good foundation for dashboards. A custom brandbook and design system will be developed separately and may influence component customization later.

## i18n

Russian-only UI in v1. All user-facing strings must be externalized from the start to enable future localization (see `docs/PRODUCT.md` for details).

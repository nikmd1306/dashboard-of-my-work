# Work Streams CRUD — full vertical slice

Status: active
Created: 2026-04-04
Completed: —

## Purpose

After this work is done, the user can create, view, edit, and delete work streams
through the UI. This is the first functional feature of the app — the foundation
that time logging, financial logging, and the dashboard will build upon.

## Scope

**Included:**

- Backend: implement all five stream endpoints (list, create, get, update, delete)
- Frontend: streams list page with real data from the API
- Frontend: create/edit stream form (modal or dedicated page)
- Frontend: stream detail page with summary info
- Frontend: delete stream with confirmation
- Align the UI with the brandbook (colors, typography, spacing, components)
- Align globals.css theme tokens with brandbook palette (Zinc + Indigo)
- Add necessary shadcn/ui components (input, label, dialog, select, badge, card)
- Extend i18n/ru.ts with new strings as needed

**Not included:**

- Time entries or finance entries (separate plan)
- Dashboard page (depends on streams + entries)
- Analytics, graphs, trends
- Dark theme fine-tuning (will verify basics work, but full polish is deferred)
- Alembic migrations (tables are auto-created on startup, sufficient for now)

## Phases

### Phase 1 — Backend: streams CRUD implementation

Implement the five endpoint handlers in `backend/app/routers/streams.py`,
replacing the `NotImplementedError` stubs with real database logic.

**Endpoints to implement:**

- `GET /api/streams` — return all streams, ordered by `created_at` descending.
- `POST /api/streams` — create a stream from `StreamCreate` body, return 201.
- `GET /api/streams/{id}` — return one stream or 404.
- `PATCH /api/streams/{id}` — partial update using `StreamUpdate`, set
  `updated_at` to now. Return 404 if not found.
- `DELETE /api/streams/{id}` — delete a stream, return 204 or 404.

**Details:**

- Use `session.exec(select(Stream))` pattern from SQLModel.
- For PATCH, iterate over `body.model_dump(exclude_unset=True)` to apply only
  provided fields.
- Raise `HTTPException(404)` when a stream is not found.
- Run `make lint` to confirm no ruff violations.

**Testable result:** start the backend (`make dev`), open `/docs` (Swagger UI),
and perform full CRUD on streams through the interactive API.

### Phase 2 — Frontend: theme tokens and base components

Before building stream pages, align the frontend design system with the brandbook
and install the shadcn/ui components that the stream pages will need.

**Theme alignment (globals.css):**

- Replace the current neutral oklch palette with brandbook Zinc values
  (bg: #FAFAFA, card: #FFFFFF, text: #18181B / #52525B / #71717A / #A1A1AA,
  border: #E4E4E7, etc.)
- Set the accent/primary color to brandbook Indigo (#6366F1 light, #818CF8 dark)
  instead of the current neutral black/white.
- Update dark theme variables to match brandbook dark palette.
- Verify radius, shadow tokens align with brandbook values.

**shadcn/ui components to add:**

- `input` — for stream name and description fields.
- `label` — for form labels.
- `select` — for stream type and status dropdowns.
- `badge` — for stream status and type display.
- `card` — for stream list items and detail page sections.
- `dialog` — for create/edit stream modal (if modal approach chosen) or
  confirmation dialogs.
- `separator` — for visual dividers.

**Sidebar and layout polish:**

- Add Lucide icons to sidebar navigation items (matching brandbook: outline,
  1.5px stroke).
- Ensure sidebar matches brandbook navigation pattern (colors, active state,
  spacing).

**i18n extensions:**

- Add strings for form fields: type labels, status labels, placeholders,
  validation messages, empty states, confirmation dialogs.

**Testable result:** the app visually matches the brandbook look and feel.
Sidebar has icons and correct colors. New components are available for import.

### Phase 3 — Frontend: streams list and create/edit form

Build the streams list page and the create/edit flow.

**Streams list page (`/streams`):**

- Fetch streams from API using `fetchStreams()` from `lib/api.ts`.
- Display streams as interactive cards (brandbook card-interactive pattern):
  each card shows stream name, type badge, status badge, description (truncated).
- "Add stream" primary button in the page header.
- Empty state when no streams exist (brandbook empty-state pattern with icon,
  title, description, and CTA button).
- Clicking a stream card navigates to `/streams/[id]`.

**Create/edit stream form:**

- Modal dialog (using shadcn Dialog) for creating a new stream.
- Fields: name (text input, required), type (select dropdown), status (select
  dropdown, defaults to "active"), description (textarea, optional).
- Form validation: name is required, reasonable max length.
- On submit: call `createStream()` or `updateStream()`, close dialog, refresh
  list.
- The same form component is reused for both create and edit (pre-filled when
  editing).

**Testable result:** user can open `/streams`, see the list (or empty state),
create a stream via the modal, see it appear in the list, and click to navigate
to the detail page.

### Phase 4 — Frontend: stream detail page and delete

Build the stream detail page and the delete flow.

**Stream detail page (`/streams/[id]`):**

- Fetch the stream by id using `fetchStream(id)` from `lib/api.ts`.
- Display a card with all stream info: name (as heading), type badge, status
  badge, description, creation date.
- "Edit" button opens the same form dialog as create, pre-filled with current
  values.
- "Delete" button with a confirmation dialog.
- Back link/button to return to the streams list.
- Handle 404 gracefully (stream not found message).

**Delete flow:**

- Confirmation dialog: "Are you sure you want to delete this stream?"
- On confirm: call `deleteStream(id)`, redirect to `/streams`.

**Testable result:** full end-to-end CRUD flow works through the UI — create a
stream, view it, edit its name/type/status, delete it. The app looks polished
and follows the brandbook.

## Decision log

- Decision: modal dialog for create/edit instead of a separate page
  Why: keeps the user in context (stream list or detail page), fewer page
  transitions, feels snappier for a simple 4-field form.
  Date: 2026-04-04

- Decision: defer Alembic migrations, keep using create_all on startup
  Why: sufficient for local development; migrations become important when there
  is production data to preserve. Avoids complexity at this stage.
  Date: 2026-04-04

- Decision: align theme tokens (globals.css) as a separate phase before building pages
  Why: building UI components on the wrong color foundation means rework later.
  Better to fix the base first, then build on top of it.
  Date: 2026-04-04

## Validation

1. Start services (`make dev`).
2. Open `http://localhost:8000/docs` — all five stream endpoints respond correctly.
3. Open `http://localhost:3000/streams` — empty state is displayed.
4. Click "Add stream", fill in the form, submit — stream appears in the list.
5. Click the stream card — detail page shows all info.
6. Click "Edit", change the name, submit — name updates.
7. Click "Delete", confirm — stream is removed, redirected to list.
8. Visual check: colors, fonts, spacing, badges, cards match the brandbook.
9. `make lint` passes with no errors.

## Outcomes

_To be filled when the plan is completed._

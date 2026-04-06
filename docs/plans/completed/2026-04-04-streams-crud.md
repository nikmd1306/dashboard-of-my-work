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

### Phase 3 — Frontend: streams list page (display only)

Build the streams list page that fetches and displays data. No forms in this
phase.

**Files to create/edit:**

- Edit `frontend/src/app/streams/page.tsx` — rewrite as a `"use client"`
  component.

**What the page does:**

1. State: `streams` array (initially empty), `loading` boolean.
2. On mount (`useEffect`): call `fetchStreams()` from `lib/api.ts`, store
   result in state.
3. While loading: show `ru.common.loading` text.
4. If streams array is empty after loading: show empty state — centered block
   with a Lucide `Layers` icon (48px, muted color, inside a rounded `bg-muted`
   container), `ru.streams.empty.title` as heading,
   `ru.streams.empty.description` as paragraph, and a disabled "Add stream"
   button (it will become functional in Phase 4).
5. If streams exist: show a header row with `ru.streams.title` as `h1`,
   `ru.streams.subtitle` as subtitle, and a disabled "Add stream" button on
   the right. Below it, a grid of cards (`grid grid-cols-1 md:grid-cols-2
   lg:grid-cols-3 gap-4`).
6. Each card: wrap in a Next.js `Link` to `/streams/[id]`. Inside: stream
   name as card title, type badge (use `Badge` with `variant="secondary"`),
   status badge (use `Badge` with `variant="secondary"` and override colors:
   active → `bg-primary/10 text-primary`, paused →
   `bg-amber-500/10 text-amber-600 dark:text-amber-400`, completed →
   keep `variant="secondary"` as-is). Show truncated description if present
   (2-line clamp via `line-clamp-2`).
7. Use `ru.streams.type.*` and `ru.streams.status.*` for badge labels.

**Testable result:** open `/streams` — see empty state or a grid of stream
cards (if streams exist in the database). Clicking a card navigates to
`/streams/[id]`.

### Phase 4 — Frontend: create/edit stream dialog

Add the ability to create and edit streams via a modal dialog.

**Files to create/edit:**

- Create `frontend/src/components/streams/stream-form-dialog.tsx` — the form
  dialog component.
- Edit `frontend/src/app/streams/page.tsx` — wire up the dialog and enable
  the "Add stream" button.

**StreamFormDialog component:**

- Props: `open: boolean`, `onOpenChange: (open: boolean) => void`,
  `stream?: Stream` (if provided, the form is in edit mode and fields are
  pre-filled), `onSuccess: () => void` (called after successful create/update
  to refresh the list).
- Uses `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`,
  `DialogFooter` from `components/ui/dialog`.
- Form state via `useState`: `name` (string), `type` (StreamType, default
  `"freelance"`), `status` (StreamStatus, default `"active"`), `description`
  (string). Reset fields when `open` changes or `stream` prop changes.
- Fields layout (vertical stack with `gap-4`):
  1. Name: `Label` + `Input`, placeholder from `ru.streams.form.namePlaceholder`.
  2. Type: `Label` + `Select` with `SelectTrigger`, `SelectContent`, and
     `SelectItem` for each type. Pass `value={type}` and
     `onValueChange={setType}` to `Select` root. Use `ru.streams.type.*` for
     item labels.
  3. Status: same pattern as type, using `ru.streams.status.*`.
  4. Description: `Label` + `Textarea`, placeholder from
     `ru.streams.form.descriptionPlaceholder`.
- Validation: name must be non-empty and <= 100 chars. Show
  `ru.streams.form.nameRequired` or `ru.streams.form.nameTooLong` below the
  input if invalid (only after first submit attempt).
- Footer: cancel button (`variant="outline"`) and submit button
  (`variant="default"`). Submit button shows `ru.common.saving` while request
  is in flight.
- On submit: if editing (`stream` prop exists), call
  `updateStream(stream.id, data)`. Otherwise call `createStream(data)`. On
  success: call `onSuccess()`, close dialog. On error: log to console (error
  handling UI is deferred).

**Wiring into the streams page:**

- Add state: `dialogOpen`, `editingStream` (Stream | null).
- "Add stream" button: `onClick={() => { setEditingStream(null); setDialogOpen(true); }}`.
- Render `StreamFormDialog` with the state props and `onSuccess` that re-fetches
  the streams list.

**Testable result:** click "Add stream", fill in the form, submit — stream
appears in the list. Open the dialog again for a new stream — fields are reset.

### Phase 5 — Frontend: stream detail page and delete

Build the stream detail page and the delete flow.

**Files to create/edit:**

- Edit `frontend/src/app/streams/[id]/page.tsx` — rewrite as a `"use client"`
  component.
- Reuse `StreamFormDialog` from Phase 4 for the edit flow.

**Stream detail page (`/streams/[id]`):**

- State: `stream` (Stream | null), `loading`, `notFound` booleans.
- On mount: call `fetchStream(id)`. If 404 error, set `notFound = true`.
- Loading state: show `ru.common.loading`.
- Not found state: show `ru.streams.notFound.title` and
  `ru.streams.notFound.description` with a link back to `/streams`.
- Normal state: a Card showing stream name as `h1`, type badge, status badge,
  description (full text), formatted `created_at` date. Below: "Edit" button
  and "Delete" button.
- "Edit" button opens `StreamFormDialog` pre-filled with the current stream.
  `onSuccess` re-fetches the stream.
- "Delete" button opens a confirmation dialog (use `Dialog` with
  `ru.streams.deleteConfirm.*` strings). On confirm: call
  `deleteStream(id)`, then `router.push("/streams")`.
- Back link at the top: `ru.streams.backToList`, links to `/streams`.

**Testable result:** full end-to-end CRUD flow works through the UI — create a
stream from the list page, click to view details, edit its name/type/status
from the detail page, delete it and get redirected back to the list.

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
2. Open `http://localhost:8000/docs` — all five stream endpoints respond correctly
   (Phase 1).
3. Visual check: sidebar has icons, theme matches brandbook (Phase 2).
4. Open `http://localhost:3000/streams` — empty state or stream cards displayed
   (Phase 3).
5. Click "Add stream", fill in the form, submit — stream appears in the list
   (Phase 4).
6. Click a stream card — detail page shows all info (Phase 5).
7. Click "Edit" on detail page, change the name, submit — name updates (Phase 5).
8. Click "Delete", confirm — stream is removed, redirected to list (Phase 5).
9. `make lint` passes with no errors.

## Outcomes

_To be filled when the plan is completed._

# Finance Entries CRUD — full vertical slice

Status: active
Created: 2026-04-16
Completed: —

## Purpose

After this work is done, the user can log income and expense entries per work
stream through the UI. Each entry has a date, stream, amount, type
(income/expense), and optional description. The finances page shows a list of
all entries sorted by date, with the ability to add, edit, and delete entries.

This is one of the four MVP blocks — the time-and-money core of the product.

## Scope

**Included:**

- Backend: implement all five finance entry endpoints (list, create, get,
  update, delete) in the existing stub router
- Frontend: finances page rewritten to display entries as a table-like list
- Frontend: create/edit finance entry form dialog
- Frontend: delete entry with confirmation
- Validate that `stream_id` references an existing stream on the backend
- Extend `i18n/ru.ts` with finance form and confirmation strings

**Not included:**

- Month filtering or period selection (deferred to dashboard plan)
- Aggregation or summary calculations (dashboard plan)
- Stream detail page changes (separate concern)
- Analytics, graphs, trends (post-MVP)

## Phases

### Phase 1 — Backend: finance entries CRUD implementation

**Files to edit:**

- `backend/app/routers/finance_entries.py` — replace all `NotImplementedError`
  stubs with real database logic

**What to implement:**

Replace each `raise NotImplementedError` with real logic following the patterns
in `backend/app/routers/streams.py`. Specific endpoints:

1. `GET /api/finance-entries` — return all finance entries ordered by `date`
   descending, then `created_at` descending. If `stream_id` query parameter is
   provided, filter to that stream only. Use
   `select(FinanceEntry).order_by(FinanceEntry.date.desc(), FinanceEntry.created_at.desc())`.
   Add `.where(FinanceEntry.stream_id == stream_id)` when the parameter is
   present.

2. `POST /api/finance-entries` — create an entry from `FinanceEntryCreate`
   body. Before creating, verify the referenced stream exists:
   `session.get(Stream, body.stream_id)` — if `None`, raise
   `HTTPException(status_code=404, detail="Stream not found")`. Then
   `FinanceEntry.model_validate(body)`, add, commit, refresh, return with 201.

3. `GET /api/finance-entries/{entry_id}` — return one entry or 404 with detail
   `"Finance entry not found"`.

4. `PATCH /api/finance-entries/{entry_id}` — partial update using
   `body.model_dump(exclude_unset=True)`. If `stream_id` is in the update,
   validate the new stream exists. Apply with `entry.sqlmodel_update(update_data)`.
   No `updated_at` field on this model, so skip that. Commit and return.

5. `DELETE /api/finance-entries/{entry_id}` — delete or 404, return 204.

**Imports to add:** `HTTPException` from fastapi, `select` from sqlmodel,
`FinanceEntry` from `app.models.finance_entry`, `Stream` from
`app.models.stream`.

**After implementation:** run `make lint` to confirm no ruff violations.

**Testable result:** start the backend, open `/docs` (Swagger UI), and perform
full CRUD on finance entries. Verify that creating an entry with a non-existent
`stream_id` returns 404.

**Verification:** run the `verifier` subagent with the list of changed files,
a description of what this phase did, and a reference to this plan (phase 1).

### Phase 2 — Frontend: finance entries list page (display only)

**Files to edit:**

- `frontend/src/app/finances/page.tsx` — rewrite from server component stub to
  `"use client"` component with data display
- `frontend/src/i18n/ru.ts` — extend `finances` section with new strings

**i18n strings to add** under `finances`:

```
finances: {
  // existing keys stay as-is, add:
  noStream: "Поток не указан",
  table: {
    date: "Дата",
    stream: "Поток",
    amount: "Сумма",
    type: "Тип",
    description: "Описание",
  },
}
```

**Page implementation (`finances/page.tsx`):**

1. Add `"use client"` directive at the top.
2. State variables:
   - `entries: FinanceEntry[]` — initially empty
   - `streams: Stream[]` — initially empty (needed to display stream names)
   - `loading: boolean` — initially true
3. On mount (`useEffect` with `useCallback`): call `fetchFinanceEntries()` and
   `fetchStreams()` in parallel using `Promise.all`. Store results in state.
   Set `loading = false` in `finally`.
4. Create a `streamsMap` via `useMemo`: `Map<number, Stream>` from the
   `streams` array, for O(1) lookup of stream name by ID.
5. Loading state: centered `ru.common.loading` text (same as streams page).
6. Empty state (no entries): `PageHeader` with title + subtitle, then
   `EmptyState` with `Wallet` icon, `ru.finances.empty.title`,
   `ru.finances.empty.description`, and a `Button` with `Plus` icon and
   `ru.finances.addEntry` text. The button is non-functional in this phase
   (wire in phase 3).
7. List state (entries exist): `PageHeader` with title, subtitle, and action
   button (non-functional placeholder in this phase). Below, a container
   `div` with `rounded-lg border bg-card`:
   - Header row: `div` with `grid grid-cols-[7rem_1fr_7rem_5rem_1fr] gap-4
     border-b px-4 py-2.5 text-xs font-medium text-muted-foreground`.
     Columns: date, stream, amount, type, description.
   - Entry rows: map over `entries`, each is a `div` with the same grid
     pattern, `border-b last:border-0 px-4 py-3 text-sm`. Cells:
     - Date: format with `toLocaleDateString("ru-RU", { day: "numeric",
       month: "short", year: "numeric" })`.
     - Stream: look up `streamsMap.get(entry.stream_id)?.name` or show
       `ru.finances.noStream` in muted text.
     - Amount: show with `toLocaleString("ru-RU")` + " ₽". Color: income →
       `text-emerald-600 dark:text-emerald-400`, expense →
       `text-red-600 dark:text-red-400`. Prefix income with "+", expense
       with "−" (minus sign U+2212).
     - Type: `Badge` with `variant="secondary"`. Income badge:
       `bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
       border-transparent`. Expense badge:
       `bg-red-500/10 text-red-600 dark:text-red-400 border-transparent`.
       Use `ru.finances.type.income` / `ru.finances.type.expense`.
     - Description: `text-muted-foreground`, truncate with `truncate` class,
       show "—" if null.

**Imports needed:** `"use client"`, `useCallback`, `useEffect`, `useMemo`,
`useState` from react; `Wallet`, `Plus` from lucide-react;
`fetchFinanceEntries`, `fetchStreams` from `@/lib/api`; types `FinanceEntry`,
`FinanceEntryType`, `Stream` from `@/types`; `ru`, `Badge`, `Button`,
`PageHeader`, `EmptyState`.

**Testable result:** open `/finances` — see empty state if no entries, or a
formatted table of entries if they exist (create some via Swagger). Amounts are
color-coded, dates are human-readable, stream names are displayed.

**Verification:** run the `verifier` subagent with the list of changed files,
a description of what this phase did, and a reference to this plan (phase 2).

### Phase 3 — Frontend: create/edit dialog and delete

**Files to create/edit:**

- Create `frontend/src/components/finances/finance-entry-form-dialog.tsx`
- Edit `frontend/src/app/finances/page.tsx` — wire up create/edit/delete
- Edit `frontend/src/i18n/ru.ts` — add form and delete confirmation strings

**i18n strings to add** under `finances`:

```
finances: {
  // existing + phase 2 keys stay, add:
  editEntry: "Редактировать запись",
  newEntry: "Новая запись",
  form: {
    streamLabel: "Поток работы",
    streamPlaceholder: "Выберите поток",
    datePlaceholder: "Выберите дату",
    amountPlaceholder: "0",
    typePlaceholder: "Тип записи",
    descriptionPlaceholder: "Комментарий к записи",
    streamRequired: "Выберите поток работы",
    amountRequired: "Укажите сумму",
    amountPositive: "Сумма должна быть больше нуля",
    dateRequired: "Укажите дату",
  },
  deleteConfirm: {
    title: "Удаление записи",
    description: "Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.",
    confirm: "Удалить",
  },
}
```

**FinanceEntryFormDialog component:**

- Props: `open: boolean`, `onOpenChange: (open: boolean) => void`,
  `entry?: FinanceEntry | null` (if provided → edit mode, fields pre-filled),
  `streams: Stream[]` (for the stream selector dropdown),
  `onSuccess: () => void`.
- Uses `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`,
  `DialogFooter` from `@/components/ui/dialog`.
- Form state via `useState`:
  - `streamId: string` (stored as string for Select compatibility, default `""`)
  - `date: string` (ISO date string, default today `new Date().toISOString().slice(0, 10)`)
  - `amount: string` (stored as string for input, default `""`)
  - `type: FinanceEntryType` (default `"income"`)
  - `description: string` (default `""`)
  - `saving: boolean`, `submitted: boolean`
- Reset all fields when `open` changes or `entry` prop changes (same pattern
  as `StreamFormDialog`). In edit mode, pre-fill from entry.
- Fields layout (vertical stack, `gap-4`):
  1. Stream: `Label` + `Select` with streams as options. Show stream name.
     Validation: required (show `ru.finances.form.streamRequired`).
  2. Date: `Label` + `Input` with `type="date"`. Validation: required.
  3. Amount: `Label` + `Input` with `type="number"`, `step="0.01"`,
     `min="0.01"`, placeholder `ru.finances.form.amountPlaceholder`.
     Validation: required and > 0.
  4. Type: `Label` + `Select` with two options: income / expense. Use
     `ru.finances.type.income` / `ru.finances.type.expense` as labels.
  5. Description: `Label` + `Textarea`, optional, placeholder from i18n.
- Validation errors appear below each field only after first submit attempt
  (same pattern as stream form).
- Footer: cancel button + submit button. Submit shows `ru.common.saving`.
- On submit: build `FinanceEntryCreate` object (`stream_id` as number,
  parsed `amount` as number). If editing: `updateFinanceEntry(entry.id, data)`.
  Else: `createFinanceEntry(data)`. On success: `onSuccess()`, close dialog.

**Wiring into finances page:**

Add state variables to `finances/page.tsx`:
- `dialogOpen: boolean`
- `editingEntry: FinanceEntry | null`
- `deleteDialogOpen: boolean`
- `deletingEntry: FinanceEntry | null`
- `deleting: boolean`

Add a `loadData` callback that refetches both entries and streams.

"Add entry" button (in PageHeader action and EmptyState): set
`editingEntry = null`, open dialog.

Each table row gets two icon buttons on the right (visible on hover via
`group` / `opacity-0 group-hover:opacity-100 transition-opacity`):
- Edit (Pencil icon, 16px): set `editingEntry`, open dialog.
- Delete (Trash2 icon, 16px, `text-muted-foreground hover:text-destructive`):
  set `deletingEntry`, open delete dialog.

Update the grid template to add a narrow actions column:
`grid-cols-[7rem_1fr_7rem_5rem_1fr_4rem]`.

Delete confirmation dialog (same pattern as stream delete in
`streams/[id]/page.tsx`): `Dialog` with `ru.finances.deleteConfirm.*` strings.
On confirm: call `deleteFinanceEntry(entry.id)`, then `loadData()`, close.

Render `FinanceEntryFormDialog` and delete `Dialog` at the bottom of the page
component.

**Testable result:** full CRUD flow for finance entries through the UI.
Create an entry (select stream, set date/amount/type), see it in the list.
Edit it — values update. Delete it — removed from list. Amount is color-coded.

**Verification:** run the `verifier` subagent with the list of changed files,
a description of what this phase did, and a reference to this plan (phase 3).

## Decision log

- Decision: table-like list layout instead of cards for finance entries
  Why: finance entries are tabular data (date, stream, amount, type) — a table
  layout is more scannable and space-efficient than cards. Cards work well for
  streams (which are entities with rich info), but entries are row-oriented data.
  Date: 2026-04-16

- Decision: show all entries without month filtering in this plan
  Why: month filtering and aggregation belong to the dashboard plan. The
  finances page is a log of all entries. Keeping it simple avoids coupling with
  dashboard concerns. Filtering can be added later as an enhancement.
  Date: 2026-04-16

- Decision: fetch streams in parallel on finances page for name lookup
  Why: the API returns `stream_id` only. Rather than adding a backend join or
  nested serializer (which adds complexity), fetch the streams list in parallel
  and build a client-side lookup map. The streams list is small (tens of items
  at most), so this is efficient.
  Date: 2026-04-16

- Decision: no detail page for finance entries
  Why: unlike streams, finance entries are simple data rows with no sub-resources.
  Edit and delete happen from the list itself via dialogs. A detail page would
  be an unnecessary navigation step.
  Date: 2026-04-16

- Decision: amount stored and validated as positive number, sign derived from type
  Why: the backend model already uses `Field(gt=0)` and a separate `type`
  enum for income/expense. The UI prefixes "+" or "−" based on type, keeping
  the data model clean.
  Date: 2026-04-16

## Validation

1. Start services (`make dev`).
2. Open `http://localhost:8000/docs` — all five finance entry endpoints respond
   correctly. Creating with non-existent `stream_id` returns 404 (Phase 1).
3. Open `http://localhost:3000/finances` — empty state with action button
   displayed (Phase 2).
4. Create a finance entry via the "Add entry" button — dialog opens, fill in
   fields, submit — entry appears in the list (Phase 3).
5. Amounts are color-coded: green with "+" for income, red with "−" for
   expense (Phase 2–3).
6. Edit an entry — dialog opens pre-filled, change values, submit — list
   updates (Phase 3).
7. Delete an entry — confirmation dialog, confirm — entry removed (Phase 3).
8. `make lint` passes with no errors.

## Outcomes

_To be filled when the plan is completed._

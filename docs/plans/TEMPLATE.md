# Short, action-oriented description

Status: active
Created: YYYY-MM-DD
Completed: —

## Purpose

Why this matters. What changes for the user after this work is done.
State the user-visible behavior this plan will enable — what someone can do
after this change that they could not do before.

## Scope

What is included in this plan. What is explicitly NOT included.
Setting clear boundaries prevents scope creep and keeps phases focused.

## Phases

Each phase is a self-contained unit of work that can be completed in a single
agent session. A different agent will execute each phase — it has no planning
context beyond what is written here.

**Phase design rules:**

- **Single concern.** Each phase does one thing. Don't combine display logic
  with interactive forms, or backend work with frontend work, in one phase.
  If a phase feels like "build X and also Y" — split it.
- **List files explicitly.** State which files to create and which to edit.
  The executing agent should not need to decide the file structure.
- **Resolve implementation choices.** Specify which components, CSS classes,
  prop structures, and patterns to use. Every ambiguity is a point where the
  executor may stall. If you write "or" for an implementation choice, pick
  one and log it in the decision log.
- **Keep it concrete.** Describe state variables, prop signatures, API calls
  by name. "Fetch data and show cards" is too vague. "Call `fetchStreams()`
  in `useEffect`, store in `streams` state, render as `Card` components in
  a 3-column grid" is concrete enough.

### Phase 1 — Name

**Files to create/edit:** list specific paths.

What to build or change. Implementation details concrete enough that an agent
can start writing code after reading the dependent files, without making
design decisions.

**Testable result:** what the user can observe to confirm this phase works.

### Phase 2 — Name

...

### Phase 3 — Name

...

## Decision log

Record every significant decision made during planning or execution.

- Decision: chose X over Y
  Why: reason
  Date: YYYY-MM-DD

## Validation

How to verify the work is complete. Specific commands to run, pages to open,
behavior to observe. Phrase acceptance as observable behavior, not internal
implementation details.

## Outcomes

Filled when the plan is completed and moved to `completed/`.
What was achieved. What remains or was deferred. Lessons learned.

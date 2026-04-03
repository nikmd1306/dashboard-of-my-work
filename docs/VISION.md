# Work Dashboard — Product Vision

## The problem

People with diversified work activities — freelancers with multiple clients, employees with side gigs, micro-business owners — are forced to juggle disconnected tools:

- **Time tracker** — to understand how much time goes to each project
- **Finance app** — to record income and expenses by source
- **Task manager** — to keep track of what needs to be done

Each tool is good at its niche, but **there is no single place that shows the full picture**. You can't open one app and see: "Here are my projects. Here's how much time I spend on each. Here's what they earn. Here's what I need to do next." Instead, you assemble this picture in your head, switching between apps.

## Market landscape

| Category | Examples | What they do | What's missing |
|----------|----------|-------------|----------------|
| Freelance management | Workey, Chronum, Flowlancerr | Time tracking + invoices + projects | Built only for freelance; ignore employment and side businesses |
| Financial OS | YUMO, FinFlow OS, wealthhuub | Income/expenses + forecasts | No connection to tasks or time — money only |
| Notion Life OS | Dozens of templates | All-in-one inside Notion | Require Notion, complex to set up, not a standalone product |
| Personal OS | SOFE, Manifest, Zentree | Tasks + goals + habits | Too broad, try to replace everything, overloaded with features |

**Key takeaway**: existing products are either too narrow (finances only, time tracking only) or too broad (trying to be a "second life" in an app). Nobody solves the specific problem of giving a person with multiple work streams **a single control panel for their work life**.

## Our niche

We don't replace existing tools (time trackers, finance apps, task managers). We create a **meta-layer** — a single place where you see the full picture across all your work streams. In v1, with manual data entry. Later, with integrations to your existing tools.

## Target audience

People who have **more than one source of work activity**:

- A freelancer with 3–5 clients + a pet project
- An employee + freelance on the side
- Someone with a day job + a micro-business (course, consulting, shop)
- An employee + side gigs + project investments

What unites them: **they can't describe their work life in one word**. And that's exactly why no single existing tool fully covers their needs.

## Core question the product answers

> "How are my time, money, and attention distributed across all my work streams?"

This is not a task manager. Not accounting software. Not a time tracker. It's a **work life control panel** — a place you open in the morning to see the big picture and decide what to spend your day on.

## MVP scope (v1)

### Principle: every feature answers a specific question

Only what's listed below goes into v1, with a rationale for each.

---

### 1. Work streams

**Question it answers**: "What am I actually working on?"

The user creates a list of their work streams. Each stream is a distinct "box" with a name, type (freelance / employment / own business / other), and status (active / paused / completed).

This is the foundation of the entire app. All other data is attached to streams.

**Example**: "Freelance: design for Client A", "Day job: Company B", "Own business: X workshop".

---

### 2. Dashboard (main screen)

**Question it answers**: "What's my overall picture right now?"

The screen that opens on launch. Shows:
- List of active streams with key metrics for each
- Summary totals: how much earned in a period, how much time spent
- Upcoming tasks / deadlines across all streams

Not overloaded — a high-level overview only. Details available by clicking into a specific stream.

---

### 3. Time tracking (simple, manual)

**Question it answers**: "How much time do I spend on each stream?"

Manual entries: "Today I spent 3 hours on Project A." No built-in timer (the user already has their own time tracker) — just after-the-fact logging. Visualization: how time was distributed over a week / month.

**Why**: to understand whether time allocation matches priorities. "I spend 60% of my time on a project that brings 20% of my income" — that's an insight that changes decisions.

---

### 4. Income and expense tracking (simple, manual)

**Question it answers**: "How much does each stream earn and cost?"

Manual entry of income and expenses linked to a stream. Different payment models (fixed, hourly, recurring) are simply "amount + date + stream" — no overcomplication.

**Why**: to see the financial return of each stream. Especially powerful when combined with time data (point 3).

---

### 5. Tasks (minimal, linked to streams)

**Question it answers**: "What do I need to do next for each stream?"

A simple task list linked to streams. No subtasks, no priorities, no kanban. Just: "task — stream — deadline — done/not done."

**Why**: to see on the dashboard that each stream has concrete next steps. Doesn't replace a full task manager — just provides minimal context on the main screen.

---

### What's NOT in v1 (and why)

| Feature | Why not now |
|---------|-----------|
| Integrations with external services (Toggl, Todoist, banks) | The product's value must be visible without them. Integrations accelerate — they're not the foundation |
| Built-in timer | Users already have their own time trackers. Duplicating means competing, not complementing |
| Invoicing | A separate large problem, unrelated to a "control panel" |
| Team features | Product is for one person. Team features are a different universe |
| Habits, health, personal goals | This is a "life dashboard" in the broad sense, but v1 focuses on work life. Expansion comes later |
| AI analytics and recommendations | Great idea, but empty without data. First — convenient input and visualization |
| Data import / export | Useful, but manual entry is enough for v1 |

## Product metaphor

If existing tools are **individual gauges in a car** (speedometer, tachometer, fuel level), our product is the **entire instrument panel**. Each gauge shows one thing, but only the panel gives you the full picture: "everything's fine" or "something needs attention."

## Name

Working title: **Work Dashboard**. Final name TBD.

---

*This document describes the vision and will be updated as the project evolves.*

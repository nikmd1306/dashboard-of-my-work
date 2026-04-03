# Work Dashboard — Product Strategy

## Core idea

A tool that answers one question: **"Where does my time go and how much does it pay?"** — across every work stream.

This is not a task manager, not accounting software, not a life planner. It's a **time-and-money awareness layer** for people with diversified work activities.

## Target audience

People with 3+ simultaneous work streams: freelance clients, employment, side businesses, projects. They already use separate tools for time tracking, finances, and tasks — but have no single place to see how their time and money relate across all streams.

## Product principles

- **Time × Money is the core axis.** Every feature should help the user understand how their time converts to income across streams.
- **Manual entry is fine.** Up to 10 minutes/day of data entry is acceptable if it delivers insight. Integrations come later.
- **Summary over detail.** Show key figures and status, not walls of data. The user drills down only when needed.
- **Month is the natural unit.** Default period is the current month. Weekly/custom views can be added later.
- **Desktop-first, responsive.** Primary use is on desktop. Mobile should work but is not the priority.
- **One currency in v1.** Multi-currency support is deferred.
- **Russian UI in v1, i18n-ready.** The interface language is Russian only for now, but all user-facing strings must be externalized from the start to enable future localization.

## MVP scope (v1)

Four blocks. Each answers a specific question.

### 1. Work streams

**"What am I working on?"**

The foundation of the app. A list of work streams with name, type (freelance / employment / own business / other), and status (active / paused / completed). Everything else attaches to streams.

### 2. Time logging

**"How much time do I spend on each stream?"**

Manual after-the-fact entries: date, stream, hours. No built-in timer. Visualization of time distribution across streams for the current month.

### 3. Financial logging

**"How much does each stream earn and cost?"**

Manual entries: date, stream, amount, type (income / expense). Simple — no invoicing, no payment models, no categories beyond stream attribution.

### 4. Dashboard

**"What's my overall picture right now?"**

The main screen. Shows each active stream with its key metrics for the current month: time spent, income, expenses. At a glance — which streams are active, where time and money go.

Stream detail page: summary with key figures only, not a full activity log.

## Explicitly out of v1

| Feature | Reason |
|---------|--------|
| Tasks / to-dos | Users have dedicated task managers (Todoist, etc.). Not our job |
| Integrations (Toggl, banks, etc.) | Value must be visible with manual entry first |
| Built-in timer | Users already have time trackers |
| Analytics (graphs, trends) | First step after MVP, not part of it |
| Multi-currency | Single currency is enough to start |
| Invoicing | Different problem entirely |
| Team features | Single-user product |
| AI / recommendations | Needs data first |

## Post-MVP direction

**v2: Analytics.** Graphs, trends, period comparisons. The ability to see dynamics over time — not just a snapshot but how things are changing.

After that: integrations, multi-currency, goals — to be determined based on actual usage.

## Monetization

Undecided. Building for personal use first, evaluating as it grows.

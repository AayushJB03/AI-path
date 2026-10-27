# Decisions

A running log of the choices made while building AI Path, and why. Newest at the bottom.

## 001 — Scope: a personal tracker, not a product
Rynovi-style 90-day plan for **my own** AI engineering learning. Study rooms, doubt rooms, payments,
auth and multi-user features are deliberately out. If it ever needs to be shared, revisit 002 and 003.

## 002 — Stack: Vite + React + TypeScript, no backend
Single user, so there is nothing a server would do that the browser can't. Vite gives a fast dev loop
and a static build that can be hosted anywhere (GitHub Pages, Vercel, a USB stick).
`react-router-dom` is the only runtime dependency beyond React.

## 003 — Persistence: localStorage behind one tiny store
All progress (`done`, `notes`, `scores`, `dsa`, `problems`, `builds`) lives in localStorage under
`ai-path:*` keys. `src/progress.ts` wraps each key in a ~15-line store exposed to React via
`useSyncExternalStore`, so there is no state library.
- Every read/write is in `try/catch` so private mode or blocked storage degrades to in-memory.
- **Ceiling:** progress is per browser/device. Upgrade path: swap `store()` for a synced backend
  (Supabase, Firebase) — the hook API (`useX` / setters) can stay the same.

## 004 — Content lives in code (`src/data.ts`)
The plan is static and versioned with the app, so a typed TS module beats a CMS or JSON fetch:
typos in the plan become type errors, and `npm run check` validates it.
Compact authoring helpers (`D`, `H`, `quiz`, `v`, `r`) keep 90 days readable in one file.

## 005 — "Today" is progress-based, not calendar-based
`currentLesson()` = the first day you haven't finished. Missing a calendar day doesn't put you
"behind"; you just pick up where you left off. The streak and calendar still use real dates.

## 006 — Streak counts any study activity
Finishing a lesson, solving a DSA problem (plan or extra) or shipping a build all count.
The streak survives until the end of today, so it doesn't show 0 in the morning before you've studied.

## 007 — Resources are links, mostly YouTube *searches*
I don't pin exact video IDs or timestamps I can't verify; a dead or wrong link is worse than a search.
Stable official docs (Python, PyTorch, Anthropic, Hugging Face, FastAPI, …) are linked directly.
**Upgrade path:** replace `v('…')` entries with pinned videos/timestamps as you find the good ones.

## 008 — DSA: NeetCode 150 order, 2 problems per day
Rynovi advertises 10/day; that isn't sustainable alongside ~4 h of AI work, so the plan uses the
NeetCode 150 list (premium-only problems removed → 143) at 2/day, with each module's build day
as a revision day. Problems link to LeetCode and to a NeetCode video search.

## 009 — Quiz answers are rotated at authoring time
Questions are written with the right answer marked `*`. `quiz()` rotates the options by question
length so the correct answer isn't always in the same slot, deterministically (no hydration jitter,
stable across reloads, best scores stay comparable).

## 010 — Builds instead of starter repos
11 module builds + 1 capstone, each with a 4-point spec. Starter repos would be external
infrastructure to maintain; instead each build has a field for *your* repo URL and a "shipped" toggle.
The 44 "coding quests" from Rynovi are left out — the daily DSA + module builds cover practice.

## 011 — "I know this, skip" per module
Marks every day in a module complete in one click (and "Reset" undoes it), which is how the plan
"skips what you already know" without a placement test.

## 012 — Code layout
`pages/` = one file per route, `components/` = reused UI, `data.ts` = content, `progress.ts` = state.
Plain CSS with design tokens on `:root` (colours from the reference designs); no CSS framework.

## 013 — Left out on purpose (add when needed)
Weekly recaps, the growing "Pal" mascot, scheduled mock-interview dates on the calendar,
dark mode, cloud sync. None block learning; each is a small addition on top of the existing stores.

---

## 014 — Curriculum replaced by the CampusX 100-day roadmap (supersedes 008, 010)
Source: the video "AI Engineering Full Roadmap vs 100-Day Sprint" (CampusX) and its companion site,
https://ai-engineer-roadmap-2026.vercel.app/100-days/. The plan now follows its **accelerated track**:
6 modules, 86 units, 100 days, same unit order and day ranges. The original 90-day plan is gone.
Why the accelerated track rather than the 16-level full roadmap: it is already day-by-day, which is
what this app tracks; the full roadmap's extra levels (managed platforms, multimodal, fine-tuning
in depth) are linked from the roadmap page as next steps.
Level 0 (Python, APIs, SQL) isn't in the 100 days; the roadmap assumes it.

## 015 — Unit content is paraphrased, with a link to the source
The repo is public, so unit text is **not copied** from the roadmap site. Each unit stores short topic
labels, a paraphrased "Try it" and "Done when", and its own quiz; the primary resource on every unit
page links to the CampusX module page for the full material.

## 016 — The unit, not the day, is the unit of progress
Some units span two days (e.g. 4.2 = days 26–27) and day 24 holds two units. Progress is tracked per
unit (`u4.18`), "today" is the first unfinished unit (as in 005), and the page shows its day range.

## 017 — DSA: patterns from the user's sheet, learn → solve → revise (supersedes 008)
Source sheet: https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8.
`scripts/import-dsa-sheet.mjs` turns its CSV export into `src/content/dsa-sheet.json` (188 problems,
16 patterns): rows without a LeetCode/GfG link are skipped, extra links on a row become separate
problems, duplicates inside a pattern are dropped, and obvious typos are fixed.
`src/content/dsa.ts` builds a 100-day schedule. For each pattern:
- **Understand** (1 day): pattern notes (when to use, core idea, template) + 2 problems + "I understand" check.
- **Solve** (3 problems/day) until the pattern's problems are done.
- **Revise** (1 day): re-solve the pattern's challenge/hard problems from memory + 1 problem from two
  patterns back (spaced repetition).
The leftover 12 days at the end are mixed revision across all patterns. DSA runs alongside the units
by day number; when two units share a day, the first owns that day's DSA.
Solved state is keyed by problem id (LeetCode slug), so a problem that appears in two patterns is
solved once. Re-solves are tracked per day separately (`ai-path:dsa-checks`).

## 018 — Projects from the roadmap's list (supersedes 010)
The 12 portfolio projects from the roadmap's projects page replace the per-module builds. Following
the roadmap's advice ("build two or three"), you **pick** projects; picked ones get a repo field and
a shipped toggle. Role-based suggestions and the project checklist are shown on the page.

## 019 — Content split into `src/content/`
One file per module plus `projects.ts`, `dsa.ts`, `helpers.ts`, `types.ts`. `src/data.ts` only assembles
and re-exports. Content imports use explicit `.ts` extensions so `npm run check` can load them in
plain Node (type stripping) without a bundler.

## 020 — Old progress is not migrated
Unit ids changed (`d12` → `u2.6`), so earlier lesson ticks, notes and quiz scores don't carry over.
DSA problems solved on LeetCode slugs that also appear in the new sheet do carry over.

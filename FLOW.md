# Flow

How AI Path fits together: where content comes from, how state moves, and what each screen does.

## Big picture

```
CampusX 100-day roadmap ──(paraphrased by hand)──► src/content/m1…m6 *.ts, projects.ts
DSA Google Sheet ──CSV──► scripts/import-dsa-sheet.mjs ──► src/content/dsa-sheet.json
                                                              │
                                     src/content/dsa.ts ◄─────┘  (pattern notes + 100-day schedule)
                                              │
                         src/data.ts  (assembles modules, units, DSA, projects; helpers)
                                              │
            pages/ + components/ ──hooks──► render
                     │
                     └──setters──► src/progress.ts ──► localStorage (ai-path:*)
```

- **Content** is static and read-only, imported from `src/data.ts`.
- **Progress** is the only mutable state. A component calls a setter (e.g. `toggleDone(id)`); the store
  writes localStorage and notifies subscribers; every component using that hook re-renders.

## Files

| File | Role |
|------|------|
| `src/content/types.ts` | `Unit`, `Module`, `Project`, `DsaProblem`, `DsaPattern`, `DsaDay`, `Question`. |
| `src/content/helpers.ts` | `unitFactory` (builds a unit + its resources), `quiz()` (answer marked `*`), `DOCS` links. |
| `src/content/m1…m6-*.ts` | The six roadmap modules, 86 units total. |
| `src/content/projects.ts` | 12 portfolio projects, role suggestions, project checklist. |
| `src/content/dsa-sheet.json` | Generated from the DSA sheet. Don't edit by hand; re-run the import. |
| `src/content/dsa.ts` | Pattern explainers and `buildSchedule()` → `dsaSchedule` (100 DSA days). |
| `src/data.ts` | `modules`, `allUnits`, `currentUnit`, `moduleOf`, `dayRange`, `dsaDaysFor`, re-exports. |
| `src/progress.ts` | Stores: `done`, `notes`, `scores`, `dsa`, `dsa-checks`, `problems`, `projects`; `streak`, `isDsaDayDone`, `useActivity`. |
| `src/components/Shell.tsx` | Frame + sidebar; the unit icon jumps to today's unit. |
| `src/components/DsaDayCard.tsx` | One DSA day: pattern notes (learn), problems to solve, problems to re-solve. |
| `src/components/DsaRow.tsx` | One problem row; `mode="solve"` or `mode="review"`. |
| `src/components/Quiz.tsx`, `Notes.tsx`, `Calendar.tsx` | Unit quiz, per-unit note, activity calendar. |
| `scripts/check.ts` | `npm run check`: validates the roadmap, quizzes, DSA schedule and streak logic. |
| `scripts/import-dsa-sheet.mjs` | CSV → `dsa-sheet.json`. |

## Routes

| Route | Page | What it shows |
|-------|------|---------------|
| `#/` | Dashboard | Today's unit + today's DSA day, stats (units, streak, quiz avg, DSA solved), module progress, picked projects, calendar, next 3 units. |
| `#/roadmap` | Roadmap | 6 modules with status, expandable unit lists grouped by part, "I know this, skip" / "Reset". |
| `#/unit/:id` | Unit | Topics, CampusX link + docs + video search, Try it, Done when, quiz, note, mark complete; sidebar with the module/part's units and the DSA day(s). |
| `#/dsa` | DSA patterns | Progress per pattern, today's DSA day, all 100 DSA days (expandable), extra problems. |
| `#/projects` | Projects | Role suggestions, project checklist, 12 projects with pick / repo / shipped. |

## A day, end to end

1. Open the app → **Dashboard** computes `currentUnit(done)`, the first unfinished unit.
2. `dsaDaysFor(unit)` finds the DSA day(s) whose number falls in the unit's day range.
3. On the **Unit** page: read the topics, open the CampusX page, do the **Try it**, take the **quiz**
   (`saveScore`), then **Mark unit complete** (`toggleDone`).
4. In the sidebar DSA card:
   - **Understand** day: read the pattern notes and template, then tick "I understand this pattern" (`dsa-checks: d{N}:learn`).
   - **Solve**: tick each problem when solved (`dsa: {problemId}`).
   - **Revise / Mixed**: re-solve from memory and tick (`dsa-checks: d{N}:{problemId}`).
5. Everything you tick adds a timestamp, so the streak and calendar update via `useActivity()`.

## How the DSA schedule is built (`src/content/dsa.ts`)

```
for each pattern (sheet order):
  day: learn   → pattern notes + first 2 problems
  days: solve  → next problems, 3 per day
  day: revise  → re-solve up to 2 challenge/hard problems + 1 problem from 2 patterns back
fill to 100 days with mixed revision (3 problems spread across patterns)
```
Today that is 88 pattern days + 12 mixed days. `npm run check` asserts each pattern starts with
learn and ends with revise, and that every sheet problem is introduced exactly once.

## Changing things

- **Edit a unit:** change its `U(...)` entry in `src/content/m*.ts`. Prefix the right quiz option with `*`.
- **Update DSA from the sheet:** export the sheet as CSV, then
  `node scripts/import-dsa-sheet.mjs path/to/sheet.csv`.
- **Tune DSA pacing:** `LEARN_PROBLEMS` / `SOLVE_PER_DAY` in `src/content/dsa.ts`.
- Run `npm run check && npm run build` before committing.

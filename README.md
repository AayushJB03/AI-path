# AI Path

A personal 100-day AI engineering tracker, following the
[CampusX AI Engineering Roadmap](https://ai-engineer-roadmap-2026.vercel.app/100-days/) (accelerated track)
with a pattern-based DSA plan running alongside it.

- **6 modules, 86 units, 100 days:** LLM fundamentals, LLM APIs, prompt engineering, RAG, agents, shipping to production.
- **Every unit:** topics, a hands-on "Try it", a "Done when" outcome, a 2-question quiz, notes, and links to the roadmap page, docs and videos.
- **DSA patterns:** 188 problems in 16 patterns from
  [this sheet](https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8),
  scheduled as understand → solve → revise, with spaced and mixed revision.
- **12 portfolio projects:** pick 2–3 by target role, track your repo and ship status.
- **Streaks, calendar**, and "I know this, skip" for modules you've already covered.

Everything is stored in your browser (localStorage). No account, no backend.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # validate roadmap, quizzes, DSA schedule, streak logic
npm run build    # static build in dist/
```

## Docs

- [FLOW.md](FLOW.md): how the app fits together
- [DECISIONS.md](DECISIONS.md): what was decided and why

Unit descriptions are paraphrased; the full material lives on the CampusX roadmap site, linked from every unit.

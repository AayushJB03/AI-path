// Sanity checks for the plan data and streak logic. Run: npm run check
import assert from 'node:assert/strict'
import { allDsaProblems, allUnits, dsaPatterns, dsaSchedule, modules, projects, TOTAL_DAYS } from '../src/data.ts'
import { isDsaDayDone, learnKey, reviewKey, streak } from '../src/progress.ts'

// Roadmap shape: 6 modules, 86 units, days 1..100 covered in order with no gaps
assert.equal(modules.length, 6)
assert.equal(allUnits.length, 86, 'the accelerated roadmap has 86 units')
assert.equal(new Set(allUnits.map((u) => u.id)).size, allUnits.length, 'unit ids must be unique')
let lastEnd = 0
for (const u of allUnits) {
  assert.ok(u.dayStart <= u.dayEnd, `${u.no}: bad day range`)
  assert.ok(u.dayStart === lastEnd || u.dayStart === lastEnd + 1, `${u.no}: day gap or overlap after day ${lastEnd}`)
  lastEnd = u.dayEnd
}
assert.equal(lastEnd, TOTAL_DAYS, 'units must end on day 100')

// Every unit has content and a valid quiz
for (const u of allUnits) {
  assert.ok(u.topics.length >= 3 && u.tryIt && u.outcome, `${u.no}: missing content`)
  assert.ok(u.quiz.length >= 2, `${u.no}: needs 2+ quiz questions`)
  for (const q of u.quiz) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length, `${u.no}: bad answer index: ${q.q}`)
    assert.equal(new Set(q.options).size, q.options.length, `${u.no}: duplicate options: ${q.q}`)
  }
}

// DSA: 100 days, every sheet problem introduced exactly once, every pattern explained
assert.equal(dsaSchedule.length, TOTAL_DAYS)
const introduced = dsaSchedule.flatMap((d) => d.problems)
assert.deepEqual(introduced, allDsaProblems, 'each sheet problem is introduced once, in sheet order')
for (const p of dsaPatterns) assert.ok(p.explain, `pattern "${p.name}" has no explainer`)
for (const p of dsaPatterns) {
  const phases = dsaSchedule.filter((d) => d.pattern === p.name).map((d) => d.phase)
  assert.equal(phases[0], 'learn', `${p.name}: starts with learn`)
  assert.equal(phases[phases.length - 1], 'revise', `${p.name}: ends with revise`)
}
const learn = dsaSchedule.find((d) => d.phase === 'learn')!
assert.equal(isDsaDayDone(learn, Object.fromEntries(learn.problems.map((p) => [p.id, 'x'])), {}), false, 'learn day needs "understood"')
assert.equal(isDsaDayDone(learn, Object.fromEntries(learn.problems.map((p) => [p.id, 'x'])), { [learnKey(learn.day)]: 'x' }), true)
const rev = dsaSchedule.find((d) => d.phase === 'revise')!
assert.equal(isDsaDayDone(rev, {}, Object.fromEntries(rev.review.map((p) => [reviewKey(rev.day, p.id), 'x']))), true)

assert.equal(projects.length, 12)

// Streak
const today = new Date(2026, 9, 28, 12)
const at = (d: number) => new Date(2026, 9, d, 9).toISOString()
assert.equal(streak([], today), 0)
assert.equal(streak([at(28), at(27), at(26)], today), 3)
assert.equal(streak([at(27), at(26)], today), 2, 'streak survives until you study today')
assert.equal(streak([at(28), at(26)], today), 1, 'a gap breaks the streak')

const quizCount = allUnits.reduce((n, u) => n + u.quiz.length, 0)
const mixed = dsaSchedule.filter((d) => d.phase === 'mixed').length
console.log(`ok: ${allUnits.length} units over ${TOTAL_DAYS} days, ${quizCount} quiz questions, `
  + `${allDsaProblems.length} DSA problems in ${dsaPatterns.length} patterns (${mixed} mixed-revision days), ${projects.length} projects`)

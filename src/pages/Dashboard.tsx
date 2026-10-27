import { Link } from 'react-router-dom'
import Calendar from '../components/Calendar'
import { PHASE_LABEL, allDsaProblems, allUnits, currentUnit, dayRange, dsaDaysFor, moduleOf, projects, TOTAL_DAYS } from '../data'
import { dayKey, isDsaDayDone, streak, useActivity, useDone, useDsa, useDsaChecks, useProblems, useProjects, useScores } from '../progress'

const NAME = 'Atharvaa'

export default function Dashboard() {
  const done = useDone()
  const solved = useDsa()
  const checks = useDsaChecks()
  const scores = Object.values(useScores())
  const extraSolved = useProblems().filter((p) => p.solvedAt).length
  const projectState = useProjects()
  const activity = useActivity()

  const unit = currentUnit(done)
  const mod = moduleOf(unit.id)!
  const dsaToday = dsaDaysFor(unit)[0]
  const unitsDone = allUnits.filter((u) => done[u.id]).length
  const modDone = mod.units.filter((u) => done[u.id]).length
  const avgQuiz = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) : 0
  const dsaSolved = new Set(allDsaProblems.filter((p) => solved[p.id]).map((p) => p.id)).size + extraSolved
  const picked = projects.filter((p) => projectState[p.id]?.picked)
  const shipped = picked.filter((p) => projectState[p.id]?.doneAt).length
  const upcoming = allUnits.filter((u) => !done[u.id]).slice(1, 4)

  return (
    <div className="dash">
      <section>
        <h1>Hey {NAME}, keep going</h1>
        <h2>Today's focus <span className="mut">({dayRange(unit)} of {TOTAL_DAYS})</span></h2>
        <div className="focus">
          <Link to={`/unit/${unit.id}`} className="card mint">
            <span className="chip">Unit {unit.no} · {dayRange(unit)}</span>
            <h3>{unit.title}</h3>
            <small>{mod.title}{unit.part ? ` · ${unit.part.replace(/^Part \d+ · /, '')}` : ''} ↗</small>
          </Link>
          {dsaToday ? (
            <Link to="/dsa" className="card pink">
              <span className="chip">{isDsaDayDone(dsaToday, solved, checks) ? '✓ ' : ''}{PHASE_LABEL[dsaToday.phase]}</span>
              <h3>DSA: {dsaToday.pattern}</h3>
              <small>{dsaToday.problems.length} to solve · {dsaToday.review.length} to re-solve ↗</small>
            </Link>
          ) : (
            <Link to="/dsa" className="card pink">
              <span className="chip">Shared day</span>
              <h3>DSA</h3>
              <small>Today's DSA is on the previous unit ↗</small>
            </Link>
          )}
        </div>

        <h2>Progress</h2>
        <div className="stats four">
          <div className="card mint"><small>Units done</small><b>{unitsDone}/{allUnits.length}</b></div>
          <div className="card yellow"><small>Day streak</small><b>{streak(activity)}</b></div>
          <div className="card lilac"><small>Quiz average</small><b>{avgQuiz}%</b></div>
          <div className="card pink"><small>DSA solved</small><b>{dsaSolved}</b></div>
        </div>

        <Link to={`/unit/${unit.id}`} className="card cont yellow">
          <small>Continue · Module {mod.no}: {mod.title}</small>
          <h3>{unit.title}</h3>
          <small>{modDone}/{mod.units.length} units</small>
          <div className="bar dark"><i style={{ width: `${(modDone / mod.units.length) * 100}%` }} /></div>
        </Link>
        <Link to="/projects" className="card cont pink">
          <small>Portfolio projects</small>
          <h3>{picked.length ? `${shipped}/${picked.length} picked projects shipped` : 'Pick 2–3 portfolio projects'}</h3>
          <small>{picked.map((p) => p.title).join(' · ') || '12 options, matched to the role you want'}</small>
        </Link>
      </section>

      <aside>
        <h2 className="aside-h">Study schedule</h2>
        <Calendar studied={new Set(activity.map((t) => dayKey(new Date(t))))} />
        {upcoming.map((u) => (
          <Link key={u.id} to={`/unit/${u.id}`} className="card mint sched">
            <span className="dot sm">{u.dayStart}</span>
            <span><b>{u.no} · {u.title}</b><small>{moduleOf(u.id)!.title}</small></span>
          </Link>
        ))}
      </aside>
    </div>
  )
}

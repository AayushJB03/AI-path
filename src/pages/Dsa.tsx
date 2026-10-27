import { useState } from 'react'
import DsaDayCard from '../components/DsaDayCard'
import { PHASE_LABEL, currentUnit, DSA_SHEET_URL, dsaDaysFor, dsaPatterns, dsaSchedule } from '../data'
import {
  addProblem, isDsaDayDone, removeProblem, toggleProblem,
  useDone, useDsa, useDsaChecks, useProblems, type Problem,
} from '../progress'

function ExtraProblemForm() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [diff, setDiff] = useState<Problem['diff']>('Medium')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addProblem({ title: title.trim(), url: url.trim(), diff })
    setTitle('')
    setUrl('')
  }
  return (
    <form className="card white add" onSubmit={submit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Problem title" aria-label="Problem title" />
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link (optional)" aria-label="Problem link" />
      <select value={diff} onChange={(e) => setDiff(e.target.value as Problem['diff'])} aria-label="Difficulty">
        <option>Easy</option><option>Medium</option><option>Hard</option>
      </select>
      <button className="btn">Add</button>
    </form>
  )
}

function ExtraProblems() {
  const problems = useProblems()
  return (
    <>
      <h2>Extra problems</h2>
      <ExtraProblemForm />
      <ul className="plist">
        {problems.map((p) => (
          <li key={p.id} className={`card ${p.solvedAt ? 'done' : 'white'}`}>
            <button className={`check ${p.solvedAt ? 'on' : ''}`} onClick={() => toggleProblem(p.id)}
              aria-label={p.solvedAt ? 'Mark unsolved' : 'Mark solved'}>{p.solvedAt ? '✓' : ''}</button>
            <span className="grow">{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.title} ↗</a> : p.title}</span>
            <span className={`pill diff-${p.diff.toLowerCase()}`}>{p.diff}</span>
            <button className="ico" onClick={() => removeProblem(p.id)} aria-label="Delete problem">×</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Dsa() {
  const solved = useDsa()
  const checks = useDsaChecks()
  const today = dsaDaysFor(currentUnit(useDone()))
  const daysDone = dsaSchedule.filter((d) => isDsaDayDone(d, solved, checks)).length

  return (
    <>
      <p className="eyebrow">
        Patterns from <a href={DSA_SHEET_URL} target="_blank" rel="noreferrer">this DSA sheet ↗</a> · understand → solve → revise
      </p>
      <h1>DSA patterns</h1>

      <div className="patterns">
        {dsaPatterns.map((p) => {
          const n = p.problems.filter((q) => solved[q.id]).length
          return (
            <div key={p.name} className="card white pattern">
              <div className="row"><b>{p.name}</b><small>{n}/{p.problems.length}</small></div>
              <div className="bar"><i style={{ width: `${(n / p.problems.length) * 100}%` }} /></div>
            </div>
          )
        })}
      </div>

      <h2>Today</h2>
      {today.length ? today.map((d) => <DsaDayCard key={d.day} d={d} />) : <p>Today's DSA belongs to the previous unit, which shares this day.</p>}

      <h2>All 100 days <span className="mut">({daysDone} done)</span></h2>
      <div className="schedule">
        {dsaSchedule.map((d) => (
          <details key={d.day} className={isDsaDayDone(d, solved, checks) ? 'is-done' : ''}>
            <summary>
              <span className="dayno">Day {d.day}</span>
              <span className="grow">{d.pattern}</span>
              <span className={`chip phase-${d.phase}`}>{PHASE_LABEL[d.phase]}</span>
            </summary>
            <DsaDayCard d={d} />
          </details>
        ))}
      </div>

      <ExtraProblems />
    </>
  )
}

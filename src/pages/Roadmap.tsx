import { Link } from 'react-router-dom'
import { allUnits, dayRange, modules, ROADMAP, TOTAL_DAYS } from '../data'
import { setDone, useDone } from '../progress'

type Status = 'done' | 'active' | 'next'
const LABEL: Record<Status, string> = { done: 'Completed', active: 'In progress', next: 'Up next' }

export default function Roadmap() {
  const done = useDone()
  const count = allUnits.filter((u) => done[u.id]).length
  const firstOpen = modules.findIndex((m) => m.units.some((u) => !done[u.id]))
  const modulesDone = modules.filter((m) => m.units.every((u) => done[u.id])).length

  return (
    <>
      <p className="eyebrow">
        Based on the <a href={`${ROADMAP}/100-days/`} target="_blank" rel="noreferrer">CampusX AI Engineering Roadmap ↗</a> (accelerated track)
      </p>
      <h1>100 Days of AI Engineering</h1>
      <div className="stats four">
        <div className="card mint"><small>Overall</small><b>{Math.round((count / allUnits.length) * 100)}%</b></div>
        <div className="card yellow"><small>Modules</small><b>{modulesDone}/{modules.length}</b></div>
        <div className="card lilac"><small>Units</small><b>{count}/{allUnits.length}</b></div>
        <div className="card pink"><small>Days</small><b>{TOTAL_DAYS}</b></div>
      </div>

      <h2>Roadmap</h2>
      <ol className="road">
        {modules.map((m, i) => {
          const ids = m.units.map((u) => u.id)
          const d = ids.filter((id) => done[id]).length
          const status: Status = d === ids.length ? 'done' : i === firstOpen ? 'active' : 'next'
          const resume = m.units.find((u) => !done[u.id]) ?? m.units[0]
          const first = m.units[0].dayStart
          const last = m.units[m.units.length - 1].dayEnd
          return (
            <li key={m.id}>
              <span className={`dot ${status}`}>{m.no}</span>
              <div className={`card ${status} module`}>
                <div className="module-head">
                  <Link to={`/unit/${resume.id}`} className="grow">
                    <small>{LABEL[status]} · Days {first}–{last} · {m.level}</small>
                    <h3>{m.title}</h3>
                    <p>{m.blurb}</p>
                  </Link>
                  <div className="road-side">
                    <span className="pill">{d}/{ids.length} units</span>
                    <button className="link small" onClick={() => setDone(ids, status !== 'done')}>
                      {status === 'done' ? 'Reset' : 'I know this, skip'}
                    </button>
                  </div>
                </div>
                <details>
                  <summary>Units</summary>
                  <ul className="unit-list">
                    {m.units.map((u, j) => (
                      <li key={u.id}>
                        {u.part && u.part !== m.units[j - 1]?.part && <p className="part">{u.part}</p>}
                        <Link to={`/unit/${u.id}`} className={done[u.id] ? 'is-done' : ''}>
                          <span>{done[u.id] ? '✓' : u.no}</span> {u.title} <small>{dayRange(u)}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}

import { Link, Navigate, useParams } from 'react-router-dom'
import DsaDayCard from '../components/DsaDayCard'
import Notes from '../components/Notes'
import Quiz from '../components/Quiz'
import { dayRange, dsaDaysFor, moduleOf } from '../data'
import { toggleDone, useDone } from '../progress'

export default function UnitPage() {
  const { id = '' } = useParams()
  const done = useDone()
  const mod = moduleOf(id)
  const unit = mod?.units.find((u) => u.id === id)
  if (!mod || !unit) return <Navigate to="/" replace />

  // Long modules (RAG, Agents) list only the current part in the sidebar.
  const siblings = unit.part ? mod.units.filter((u) => u.part === unit.part) : mod.units
  const n = siblings.filter((u) => done[u.id]).length
  const [primary, ...more] = unit.res
  const dsaDays = dsaDaysFor(unit)

  return (
    <div className="lesson">
      <section>
        <Link to="/roadmap" className="crumb">‹ Module {mod.no}: {mod.title}{unit.part ? ` · ${unit.part}` : ''}</Link>
        <h1>{unit.no} · {unit.title}</h1>
        <div className="tags">
          <span className="tag mint">{dayRange(unit)}</span>
          <span className="tag lilac">{mod.level}</span>
          <span className="tag pink">{unit.topics.length} topics</span>
        </div>

        <a className="video" href={primary.url} target="_blank" rel="noreferrer">
          <span className="play">▶</span>
          <span>{primary.label} ↗</span>
        </a>

        <div className="card white">
          <h2>What you'll learn</h2>
          <ul>{unit.topics.map((t) => <li key={t}>{t}</li>)}</ul>
          <h2 className="sub">More resources</h2>
          <ul>{more.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.label} ↗</a></li>)}</ul>
        </div>

        <div className="pair">
          <div className="card yellow"><small>Try it</small><p className="body">{unit.tryIt}</p></div>
          <div className="card mint"><small>Done when</small><p className="body">{unit.outcome}</p></div>
        </div>

        <Quiz key={unit.id} lessonId={unit.id} questions={unit.quiz} />

        <Notes key={`notes-${unit.id}`} lessonId={unit.id}>
          <button className="btn" onClick={() => toggleDone(unit.id)}>
            {done[unit.id] ? '✓ Completed (undo)' : 'Mark unit complete'}
          </button>
        </Notes>
      </section>

      <aside>
        <div className="card white">
          <div className="row"><h2>{unit.part ? unit.part.replace(/^Part \d+ · /, '') : mod.title}</h2><small>{n}/{siblings.length}</small></div>
          <div className="bar"><i style={{ width: `${(n / siblings.length) * 100}%` }} /></div>
          {siblings.map((u) => (
            <Link key={u.id} to={`/unit/${u.id}`}
              className={`item ${done[u.id] ? 'done' : ''} ${u.id === id ? 'current' : ''}`}>
              <span className="dot sm">{done[u.id] ? '✓' : u.no.split('.')[1]}</span>
              <span>{u.title}</span>
            </Link>
          ))}
        </div>

        {dsaDays.length ? (
          dsaDays.map((d) => <DsaDayCard key={d.day} d={d} />)
        ) : (
          <div className="card lilac practice">
            <small>DSA</small>
            <p>This unit shares its day with the previous one. That unit holds today's DSA.</p>
          </div>
        )}
      </aside>
    </div>
  )
}

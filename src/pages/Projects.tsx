import { projectChecklist, projects, projectsByRole, PROJECTS_URL } from '../data'
import { updateProject, useProjects } from '../progress'

const titleOf = (id: string) => projects.find((p) => p.id === id)?.title ?? id

export default function Projects() {
  const state = useProjects()
  const picked = projects.filter((p) => state[p.id]?.picked)

  return (
    <>
      <p className="eyebrow">
        After the 100 days · from the <a href={PROJECTS_URL} target="_blank" rel="noreferrer">roadmap's project list ↗</a>
      </p>
      <h1>Portfolio projects</h1>
      <p className="lede">Build two or three, not ten. Make each one different, and pick for the job you want.</p>

      <div className="pair">
        <div className="card white">
          <h2>Pick by role</h2>
          <ul className="roles">
            {projectsByRole.map((r) => (
              <li key={r.role}><b>{r.role}</b><small>{r.ids.map(titleOf).join(' · ')}</small></li>
            ))}
          </ul>
        </div>
        <div className="card white">
          <h2>Every project needs</h2>
          <ul>{projectChecklist.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>

      <h2>{picked.length ? `Your picks (${picked.length})` : 'All projects'}</h2>
      <div className="builds">
        {[...picked, ...projects.filter((p) => !state[p.id]?.picked)].map((p) => {
          const s = state[p.id] ?? {}
          return (
            <article key={p.id} className={`card ${s.doneAt ? 'done' : s.picked ? 'yellow' : 'white'}`}>
              <small>{p.level} · builds on {p.buildsOn}</small>
              <h3>{p.title}</h3>
              <p className="body">{p.what}</p>
              <ul>{p.mustHaves.map((m) => <li key={m}>{m}</li>)}</ul>
              <p className="body"><b>Done when:</b> {p.doneWhen}</p>
              {s.picked && (
                <input className="repo" value={s.repo ?? ''} placeholder="GitHub repo URL" aria-label={`Repo for ${p.title}`}
                  onChange={(e) => updateProject(p.id, { repo: e.target.value })} />
              )}
              <div className="actions">
                <button className={`btn ${s.picked ? 'ghost' : ''}`} onClick={() => updateProject(p.id, { picked: !s.picked })}>
                  {s.picked ? 'Unpick' : 'Pick this'}
                </button>
                {s.picked && (
                  <button className="btn" onClick={() => updateProject(p.id, { doneAt: s.doneAt ? undefined : new Date().toISOString() })}>
                    {s.doneAt ? '✓ Shipped (undo)' : 'Mark shipped'}
                  </button>
                )}
                {s.repo && <a className="btn ghost" href={s.repo} target="_blank" rel="noreferrer">Repo ↗</a>}
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

import { dsaPatterns, PHASE_LABEL, patternVideo, type DsaDay } from '../data'
import { isDsaDayDone, learnKey, toggleDsaCheck, useDsa, useDsaChecks } from '../progress'
import DsaRow from './DsaRow'

/** Everything for one DSA day: pattern notes on learn days, new problems, and problems to re-solve from memory. */
export default function DsaDayCard({ d }: { d: DsaDay }) {
  const solved = useDsa()
  const checks = useDsaChecks()
  const pattern = dsaPatterns.find((p) => p.name === d.pattern)
  const done = isDsaDayDone(d, solved, checks)
  const understood = Boolean(checks[learnKey(d.day)])

  return (
    <div className={`card lilac dsa-day ${done ? 'is-done' : ''}`}>
      <div className="row">
        <small>DSA · Day {d.day} · {d.pattern}</small>
        <span className={`chip phase-${d.phase}`}>{done ? '✓ ' : ''}{PHASE_LABEL[d.phase]}</span>
      </div>

      {d.phase === 'learn' && pattern && (
        <div className="explain">
          <p><b>Use it when:</b> {pattern.explain.when}</p>
          <p><b>Core idea:</b> {pattern.explain.idea}</p>
          <pre><code>{pattern.explain.template}</code></pre>
          <div className="actions">
            <a className="btn ghost small" href={patternVideo(d.pattern)} target="_blank" rel="noreferrer">▶ Pattern videos</a>
            <button className={`btn small ${understood ? '' : 'ghost'}`} onClick={() => toggleDsaCheck(learnKey(d.day))}>
              {understood ? '✓ Pattern understood' : 'I understand this pattern'}
            </button>
          </div>
        </div>
      )}

      {d.problems.length > 0 && (
        <>
          <h4>Solve</h4>
          <ul className="plist">{d.problems.map((p) => <DsaRow key={p.id} p={p} mode="solve" />)}</ul>
        </>
      )}
      {d.review.length > 0 && (
        <>
          <h4>Re-solve from memory</h4>
          <ul className="plist">{d.review.map((p) => <DsaRow key={p.id} p={p} mode="review" day={d.day} />)}</ul>
        </>
      )}
    </div>
  )
}

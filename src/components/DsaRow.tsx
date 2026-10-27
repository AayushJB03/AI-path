import { problemVideo, type DsaProblem } from '../data'
import { reviewKey, toggleDsa, toggleDsaCheck, useDsa, useDsaChecks } from '../progress'

type Props = { p: DsaProblem } & ({ mode: 'solve' } | { mode: 'review'; day: number })

/** One DSA problem. "solve" tracks first solve (shared across days); "review" tracks a re-solve on a given day. */
export default function DsaRow(props: Props) {
  const { p } = props
  const solved = useDsa()
  const checks = useDsaChecks()
  const key = props.mode === 'review' ? reviewKey(props.day, p.id) : p.id
  const on = Boolean(props.mode === 'review' ? checks[key] : solved[key])
  const toggle = () => (props.mode === 'review' ? toggleDsaCheck(key) : toggleDsa(key))
  const verb = props.mode === 'review' ? 're-solved' : 'solved'

  return (
    <li className={`card ${on ? 'done' : 'white'}`}>
      <button className={`check ${on ? 'on' : ''}`} onClick={toggle}
        aria-label={`Mark ${p.title} ${on ? 'not ' : ''}${verb}`}>{on ? '✓' : ''}</button>
      <a className="grow" href={p.url} target="_blank" rel="noreferrer">
        {p.title} ↗{p.group && <small className="group"> · {p.group}</small>}
      </a>
      <a className="pill" href={problemVideo(p)} target="_blank" rel="noreferrer"
        title="Solution video" aria-label={`${p.title} solution video`}>▶</a>
      {p.diff && <span className={`pill diff-${p.diff.toLowerCase()}`}>{p.diff}</span>}
    </li>
  )
}

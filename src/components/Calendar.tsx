import { useState } from 'react'
import { dayKey } from '../progress'

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

/** Month grid (Monday-first). Days in `studied` are shaded; today gets a dashed ring. */
export default function Calendar({ studied }: { studied: Set<string> }) {
  const [offset, setOffset] = useState(0)
  const now = new Date()
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const lead = (first.getDay() + 6) % 7
  const cells = Array.from({ length: 42 }, (_, i) => new Date(first.getFullYear(), first.getMonth(), 1 - lead + i))
  // Drop the 6th row when it belongs entirely to the next month.
  const grid = cells.slice(35).every((d) => d.getMonth() !== first.getMonth()) ? cells.slice(0, 35) : cells

  return (
    <div className="card white cal">
      <div className="row">
        <h2>{first.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</h2>
        <span>
          <button className="ico" onClick={() => setOffset(offset - 1)} aria-label="Previous month">‹</button>
          <button className="ico" onClick={() => setOffset(offset + 1)} aria-label="Next month">›</button>
        </span>
      </div>
      <div className="grid7">
        {WEEKDAYS.map((d) => <small key={d}>{d}</small>)}
        {grid.map((d) => {
          const k = dayKey(d)
          const cls = [
            d.getMonth() !== first.getMonth() && 'out',
            studied.has(k) && 'studied',
            k === dayKey(now) && 'today',
          ].filter(Boolean).join(' ')
          return <span key={k} className={`day ${cls}`}>{d.getDate()}</span>
        })}
      </div>
      <div className="legend"><i className="today" /> Today <i className="studied" /> Studied</div>
    </div>
  )
}

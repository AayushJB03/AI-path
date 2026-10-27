import { NavLink } from 'react-router-dom'
import { currentUnit } from '../data'
import { useDone } from '../progress'

const NAV = [
  { to: '/', label: 'Dashboard', icon: '▦', end: true },
  { to: '/roadmap', label: 'Roadmap', icon: '◎' },
  { to: '/unit', label: "Today's unit", icon: '▤' },
  { to: '/dsa', label: 'DSA patterns', icon: '⌗' },
  { to: '/projects', label: 'Projects', icon: '⚒' },
]

export default function Shell({ children }: { children: React.ReactNode }) {
  const today = currentUnit(useDone())
  return (
    <div className="frame">
      <nav className="side" aria-label="Main">
        <div className="logo">AP</div>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to === '/unit' ? `/unit/${today.id}` : n.to}
            end={n.end} title={n.label} aria-label={n.label}>
            {n.icon}
          </NavLink>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  )
}

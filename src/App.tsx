import { Navigate, Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import Dashboard from './pages/Dashboard'
import Dsa from './pages/Dsa'
import Projects from './pages/Projects'
import Roadmap from './pages/Roadmap'
import UnitPage from './pages/Unit'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/unit/:id" element={<UnitPage />} />
        <Route path="/dsa" element={<Dsa />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}

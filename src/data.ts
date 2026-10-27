// Assembles the plan from src/content. Pages import from here, not from content files directly.
import { m1 } from './content/m1-llm-fundamentals.ts'
import { m2 } from './content/m2-llm-apis.ts'
import { m3 } from './content/m3-prompt-engineering.ts'
import { m4 } from './content/m4-rag.ts'
import { m5 } from './content/m5-agents.ts'
import { m6 } from './content/m6-shipping.ts'
import { dsaDay } from './content/dsa.ts'
import type { Module, Unit } from './content/types.ts'

export type * from './content/types.ts'
export { allDsaProblems, dsaDay, PHASE_LABEL, dsaPatterns, dsaSchedule, DSA_SHEET_URL, patternVideo, problemVideo } from './content/dsa.ts'
export { projects, projectChecklist, projectsByRole, PROJECTS_URL } from './content/projects.ts'
export { ROADMAP } from './content/helpers.ts'

export const TOTAL_DAYS = 100
export const modules: Module[] = [m1, m2, m3, m4, m5, m6]
export const allUnits: Unit[] = modules.flatMap((m) => m.units)

export const moduleOf = (unitId: string) => modules.find((m) => m.units.some((u) => u.id === unitId))

/** "Today" is progress-based: the first unit you haven't finished (or the last one once all are done). */
export const currentUnit = (done: Record<string, string>) =>
  allUnits.find((u) => !done[u.id]) ?? allUnits[allUnits.length - 1]

export const dayRange = (u: Unit) => (u.dayStart === u.dayEnd ? `Day ${u.dayStart}` : `Days ${u.dayStart}–${u.dayEnd}`)

/** The DSA days that run alongside a unit. When two units share a day, the DSA day belongs to the first. */
export function dsaDaysFor(u: Unit) {
  const days = []
  for (let d = u.dayStart; d <= u.dayEnd; d++) {
    const owner = allUnits.find((x) => x.dayStart <= d && d <= x.dayEnd)
    if (owner?.id === u.id) days.push(dsaDay(d))
  }
  return days
}

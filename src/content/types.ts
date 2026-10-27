export type Question = { q: string; options: string[]; answer: number }
export type Res = { label: string; url: string }
export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

/** One roadmap unit. Most take one day; some span two (dayStart–dayEnd); a few days hold two units. */
export type Unit = {
  id: string // "u4.18"
  no: string // "4.18"
  title: string
  dayStart: number
  dayEnd: number
  part?: string
  topics: string[]
  tryIt: string
  outcome: string
  res: Res[]
  quiz: Question[]
}

export type Module = {
  id: string
  no: number
  title: string
  blurb: string
  level: Level
  url: string // CampusX module page
  units: Unit[]
}

export type Project = {
  id: string
  title: string
  level: string
  buildsOn: string
  what: string
  mustHaves: string[]
  doneWhen: string
}

export type DsaProblem = {
  id: string // LeetCode slug or "gfg-<slug>"; also the key for solved state
  title: string
  url: string
  diff?: 'Easy' | 'Medium' | 'Hard'
  challenge?: boolean
  group?: string
  video?: string
  alt?: string
}

export type DsaPattern = {
  name: string
  problems: DsaProblem[]
  explain: { when: string; idea: string; template: string }
}

export type DsaPhase = 'learn' | 'solve' | 'revise' | 'mixed'
export type DsaDay = {
  day: number
  pattern: string
  phase: DsaPhase
  problems: DsaProblem[] // new problems to solve
  review: DsaProblem[] // already-seen problems to re-solve from memory
}

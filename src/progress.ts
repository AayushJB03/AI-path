import { useSyncExternalStore } from 'react'
import type { DsaDay } from './content/types.ts'

/** A tiny localStorage-backed store that React components can subscribe to. */
function store<T>(key: string, init: T) {
  let cache = init
  try { cache = JSON.parse(localStorage.getItem(key) ?? '') } catch { /* first run or blocked storage */ }
  const subs = new Set<() => void>()
  return {
    get: () => cache,
    set(next: T) {
      cache = next
      try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* private mode */ }
      subs.forEach((f) => f())
    },
    use: () => useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), () => cache),
  }
}

const now = () => new Date().toISOString()

/** Flip a timestamped flag in a Record<id, iso>: set it if missing, remove it if present. */
function toggleIn(s: ReturnType<typeof store<Record<string, string>>>, id: string) {
  const next = { ...s.get() }
  if (next[id]) delete next[id]
  else next[id] = now()
  s.set(next)
}

// ---- lessons: lesson id -> completion timestamp ----
const doneStore = store<Record<string, string>>('ai-path:done', {})
export const useDone = doneStore.use
export const toggleDone = (id: string) => toggleIn(doneStore, id)
/** Mark many lessons at once ("I already know this module"). */
export function setDone(ids: string[], on: boolean) {
  const next = { ...doneStore.get() }
  for (const id of ids) {
    if (on) next[id] ??= now()
    else delete next[id]
  }
  doneStore.set(next)
}

// ---- notes: lesson id -> text ----
const noteStore = store<Record<string, string>>('ai-path:notes', {})
export const useNotes = noteStore.use
export const setNote = (id: string, text: string) => noteStore.set({ ...noteStore.get(), [id]: text })

// ---- quizzes: lesson id -> best score (0..1) ----
const scoreStore = store<Record<string, number>>('ai-path:scores', {})
export const useScores = scoreStore.use
export const saveScore = (id: string, s: number) =>
  scoreStore.set({ ...scoreStore.get(), [id]: Math.max(s, scoreStore.get()[id] ?? 0) })

// ---- DSA sheet problems: problem id -> solved timestamp (solving once counts in every pattern it appears) ----
const dsaStore = store<Record<string, string>>('ai-path:dsa', {})
export const useDsa = dsaStore.use
export const toggleDsa = (id: string) => toggleIn(dsaStore, id)

// ---- DSA day checks: "d{day}:learn" (pattern understood) and "d{day}:{problemId}" (re-solved from memory) ----
const dsaCheckStore = store<Record<string, string>>('ai-path:dsa-checks', {})
export const useDsaChecks = dsaCheckStore.use
export const toggleDsaCheck = (key: string) => toggleIn(dsaCheckStore, key)
export const learnKey = (day: number) => `d${day}:learn`
export const reviewKey = (day: number, problemId: string) => `d${day}:${problemId}`

// ---- custom DSA problems you add yourself ----
export type Problem = { id: string; title: string; url: string; diff: 'Easy' | 'Medium' | 'Hard'; solvedAt?: string }
const problemStore = store<Problem[]>('ai-path:problems', [])
export const useProblems = problemStore.use
export const addProblem = (p: Omit<Problem, 'id' | 'solvedAt'>) =>
  problemStore.set([{ ...p, id: crypto.randomUUID() }, ...problemStore.get()])
export const toggleProblem = (id: string) =>
  problemStore.set(problemStore.get().map((p) => (p.id === id ? { ...p, solvedAt: p.solvedAt ? undefined : now() } : p)))
export const removeProblem = (id: string) => problemStore.set(problemStore.get().filter((p) => p.id !== id))

// ---- portfolio projects: project id -> { picked, shipped timestamp, repo link } ----
export type ProjectState = { picked?: boolean; doneAt?: string; repo?: string }
const projectStore = store<Record<string, ProjectState>>('ai-path:projects', {})
export const useProjects = projectStore.use
export const updateProject = (id: string, patch: Partial<ProjectState>) =>
  projectStore.set({ ...projectStore.get(), [id]: { ...projectStore.get()[id], ...patch } })

/** A DSA day is done when its new problems are solved, its reviews re-solved, and (on learn days) the pattern is understood. */
export function isDsaDayDone(d: DsaDay, solved: Record<string, string>, checks: Record<string, string>) {
  return d.problems.every((p) => solved[p.id])
    && d.review.every((p) => checks[reviewKey(d.day, p.id)])
    && (d.phase !== 'learn' || Boolean(checks[learnKey(d.day)]))
}

// ---- derived helpers ----
export const dayKey = (d: Date) => d.toLocaleDateString('en-CA') // local YYYY-MM-DD

/** Consecutive study days ending today (or yesterday, so the streak survives until you've studied today). */
export function streak(timestamps: string[], today = new Date()) {
  const days = new Set(timestamps.map((t) => dayKey(new Date(t))))
  const d = new Date(today)
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1) }
  return n
}

/** Every timestamp that counts as "studied that day": units, DSA (solved, learned, revised, extra) and shipped projects. */
export function useActivity() {
  const done = useDone()
  const dsa = useDsa()
  const checks = useDsaChecks()
  const problems = useProblems()
  const projects = useProjects()
  return [
    ...Object.values(done),
    ...Object.values(dsa),
    ...Object.values(checks),
    ...problems.flatMap((p) => (p.solvedAt ? [p.solvedAt] : [])),
    ...Object.values(projects).flatMap((b) => (b.doneAt ? [b.doneAt] : [])),
  ]
}

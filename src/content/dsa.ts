import sheet from './dsa-sheet.json' with { type: 'json' }
import { yt } from './helpers.ts'
import type { DsaDay, DsaPattern, DsaPhase, DsaProblem } from './types.ts'

export const DSA_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8'

/** Short "understand the pattern" notes shown on each pattern's learn day. */
const EXPLAIN: Record<string, DsaPattern['explain']> = {
  'Two Pointers': {
    when: 'Sorted array or string; looking for a pair/triplet, or partitioning in place.',
    idea: 'Move two indices toward each other (or same direction) so each step discards candidates, turning O(n²) pair checks into O(n).',
    template: 'l, r = 0, n-1\nwhile l < r:\n  s = a[l] + a[r]\n  if s == target: return\n  if s < target: l += 1 else: r -= 1',
  },
  'Fast & Slow Pointers': {
    when: 'Linked lists or index-jumping sequences: cycles, middle element, palindromes.',
    idea: 'One pointer moves 1 step, the other 2. If there is a cycle they meet; when fast reaches the end, slow is at the middle.',
    template: 'slow = fast = head\nwhile fast and fast.next:\n  slow, fast = slow.next, fast.next.next\n  if slow is fast: cycle found',
  },
  'Sliding Window': {
    when: 'Contiguous subarray/substring with a constraint: longest, shortest, at most K, contains all of…',
    idea: 'Grow the window on the right; while it breaks the rule, shrink from the left. Each element enters and leaves once: O(n).',
    template: 'l = 0\nfor r in range(n):\n  add(a[r])\n  while invalid(): remove(a[l]); l += 1\n  best = max(best, r - l + 1)',
  },
  "Kadane's Algorithm": {
    when: 'Maximum (or minimum) sum/product of a contiguous subarray.',
    idea: 'At each index decide: extend the previous subarray or start fresh here. Track the best seen. For products, track both max and min.',
    template: 'cur = best = a[0]\nfor x in a[1:]:\n  cur = max(x, cur + x)\n  best = max(best, cur)',
  },
  'Prefix Sum': {
    when: 'Many range-sum queries, or "count subarrays whose sum is K / divisible by K".',
    idea: 'pre[i] = sum of a[:i]; any subarray sum is pre[j] - pre[i]. With a hash map of prefix counts you count matches in one pass.',
    template: 'seen = {0: 1}; s = count = 0\nfor x in a:\n  s += x\n  count += seen.get(s - k, 0)\n  seen[s] = seen.get(s, 0) + 1',
  },
  'Merge Intervals': {
    when: 'Intervals that may overlap: merging, inserting, intersections, rooms needed.',
    idea: 'Sort by start; walk once, merging when the next start ≤ current end. Meeting rooms: a min-heap of end times.',
    template: 'iv.sort()\nout = [iv[0]]\nfor s, e in iv[1:]:\n  if s <= out[-1][1]: out[-1][1] = max(out[-1][1], e)\n  else: out.append([s, e])',
  },
  'In-place LinkedList Reversal': {
    when: 'Reverse a whole list, a sub-list, or every K nodes without extra memory.',
    idea: 'Keep prev, cur, next; flip cur.next to prev and step forward. For sub-lists, remember the node before and the tail to reconnect.',
    template: 'prev = None; cur = head\nwhile cur:\n  nxt = cur.next\n  cur.next = prev\n  prev, cur = cur, nxt\nreturn prev',
  },
  'Stack': {
    when: 'Matching pairs, "next greater/smaller", undoing the latest item, simplifying paths.',
    idea: 'Push items; pop when the new item resolves the top. A monotonic stack keeps elements in order so each is pushed and popped once.',
    template: 'st = []\nfor i, x in enumerate(a):\n  while st and a[st[-1]] < x:\n    ans[st.pop()] = x\n  st.append(i)',
  },
  'Hash Maps': {
    when: 'Counting, de-duplicating, "have I seen X?", frequency comparisons.',
    idea: 'Trade memory for O(1) lookups: count characters/values once, then answer each question by lookup.',
    template: 'count = Counter(s)\nfor ch in s:\n  if count[ch] == 1: return ch',
  },
  'Binary Search': {
    when: 'Sorted data, rotated arrays, or "minimum X such that condition holds" (search on the answer).',
    idea: 'Keep an invariant on [lo, hi] and halve the range each step. On answers: binary search the value and test feasibility.',
    template: 'lo, hi = low, high\nwhile lo < hi:\n  mid = (lo + hi) // 2\n  if ok(mid): hi = mid\n  else: lo = mid + 1\nreturn lo',
  },
  'Heaps': {
    when: 'Top/K-th largest or smallest, merging K sorted lists, scheduling, running median.',
    idea: 'A heap gives the min (or max) in O(log n). Keep a heap of size K for top-K; two heaps balance halves for medians.',
    template: 'h = []\nfor x in a:\n  heapq.heappush(h, x)\n  if len(h) > k: heapq.heappop(h)\nreturn h[0]  # k-th largest',
  },
  'Recursion & Backtracking': {
    when: 'Generate all combinations, permutations, partitions, or explore choices with constraints.',
    idea: 'Make a choice, recurse, undo the choice. Prune branches that can\'t lead to a valid answer.',
    template: 'def bt(i, path):\n  if done(i): res.append(path[:]); return\n  for c in choices(i):\n    path.append(c); bt(i + 1, path); path.pop()',
  },
  'Trees': {
    when: 'Any binary tree / BST question: traversals, depth, paths, LCA, validation, construction.',
    idea: 'Decide what each node needs from its children (post-order) or passes to them (pre-order). BST: inorder is sorted.',
    template: 'def dfs(node):\n  if not node: return base\n  L, R = dfs(node.left), dfs(node.right)\n  return combine(node, L, R)',
  },
  'Graphs': {
    when: 'Grids, networks, dependencies, shortest paths, connected components.',
    idea: 'Build an adjacency list; BFS for unweighted shortest paths, DFS for components/cycles, topological sort for dependencies, Dijkstra for weights.',
    template: 'q = deque([src]); seen = {src}\nwhile q:\n  u = q.popleft()\n  for v in adj[u]:\n    if v not in seen: seen.add(v); q.append(v)',
  },
  'Dynamic Programming': {
    when: 'Count ways / min / max with overlapping subproblems: stairs, robber, knapsack, LIS, LCS, stocks.',
    idea: 'Define dp[state], write the recurrence from smaller states, then memoise (top-down) or tabulate (bottom-up).',
    template: 'dp = [0] * (n + 1)\ndp[0] = base\nfor i in range(1, n + 1):\n  dp[i] = best_of(dp[j] + cost(j, i) for j in prev(i))',
  },
  'Greedy': {
    when: 'A locally best choice provably leads to the global best: change-making, reach, assignment.',
    idea: 'Sort or scan, always take the choice that keeps the most options open; argue why it never needs undoing.',
    template: 'a.sort(key=priority)\nfor x in a:\n  if can_take(x): take(x)',
  },
}

export const dsaPatterns: DsaPattern[] = (sheet as Omit<DsaPattern, 'explain'>[]).map((p) => ({
  ...p,
  explain: EXPLAIN[p.name],
}))

export const PHASE_LABEL: Record<DsaPhase, string> = {
  learn: 'Understand', solve: 'Solve', revise: 'Revise', mixed: 'Mixed revision',
}

export const allDsaProblems = dsaPatterns.flatMap((p) => p.problems)
export const patternVideo = (name: string) => yt(`${name} pattern DSA explained`)
export const problemVideo = (p: DsaProblem) => p.video ?? yt(`${p.title} solution`)

// ---------- the 100-day schedule ----------
// Each pattern runs: learn (notes + 2 problems) → solve (3/day) → revise (key problems + one spaced from 2 patterns ago).
// Leftover days at the end are mixed revision across all patterns.
const LEARN_PROBLEMS = 2
const SOLVE_PER_DAY = 3
const TOTAL_DAYS = 100

/** Problems worth re-solving from memory: challenges or Hard ones, else the last two. */
const keyProblems = (ps: DsaProblem[]) => {
  const hard = ps.filter((p) => p.challenge || p.diff === 'Hard')
  return (hard.length ? hard : ps.slice(-2)).slice(0, 2)
}

function buildSchedule(): DsaDay[] {
  const days: Omit<DsaDay, 'day'>[] = []
  dsaPatterns.forEach((pat, i) => {
    const ps = pat.problems
    days.push({ pattern: pat.name, phase: 'learn', problems: ps.slice(0, LEARN_PROBLEMS), review: [] })
    for (let k = LEARN_PROBLEMS; k < ps.length; k += SOLVE_PER_DAY)
      days.push({ pattern: pat.name, phase: 'solve', problems: ps.slice(k, k + SOLVE_PER_DAY), review: [] })
    const earlier = dsaPatterns[i - 2]?.problems
    const spaced = earlier ? [earlier[Math.floor(earlier.length / 2)]] : []
    days.push({ pattern: pat.name, phase: 'revise', problems: [], review: [...keyProblems(ps), ...spaced] })
  })
  for (let m = 0; days.length < TOTAL_DAYS; m++) {
    const review = [0, 1, 2].map((j) => {
      const ps = dsaPatterns[(m * 3 + j) % dsaPatterns.length].problems
      return ps[(m + j) % ps.length]
    })
    days.push({ pattern: 'Mixed revision', phase: 'mixed', problems: [], review })
  }
  return days.map((d, i) => ({ ...d, day: i + 1 }))
}

export const dsaSchedule = buildSchedule()
export const dsaDay = (day: number) => dsaSchedule[day - 1]

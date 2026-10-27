// Converts the DSA patterns sheet (exported as CSV) into src/content/dsa-sheet.json.
// Usage: node scripts/import-dsa-sheet.mjs path/to/sheet.csv
// Sheet: https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8
import { readFileSync, writeFileSync } from 'node:fs'

/** Minimal CSV parser that handles quoted fields with commas and escaped quotes. */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); rows.push(row); row = []; field = ''
    } else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

// Sheet header rows → clean pattern names, matched by keyword.
const PATTERNS = [
  [/two pointers/i, 'Two Pointers'],
  [/fast & slow/i, 'Fast & Slow Pointers'],
  [/sliding window/i, 'Sliding Window'],
  [/kadane/i, "Kadane's Algorithm"],
  [/prefix sum/i, 'Prefix Sum'],
  [/merge intervals/i, 'Merge Intervals'],
  [/reversal of a linkedlist/i, 'In-place LinkedList Reversal'],
  [/pattern: stack/i, 'Stack'],
  [/hash maps/i, 'Hash Maps'],
  [/binary search/i, 'Binary Search'],
  [/heap pattern/i, 'Heaps'],
  [/recursion and backtracking/i, 'Recursion & Backtracking'],
  [/tree pattern/i, 'Trees'],
  [/^graphs$/i, 'Graphs'],
  [/dynamic programming/i, 'Dynamic Programming'],
  [/^greedy$/i, 'Greedy'],
]

const isProblemLink = (u) => /leetcode\.com\/problems\/|geeksforgeeks\.org/.test(u)
const isVideo = (u) => /youtube\.com|youtu\.be/.test(u)

/** Stable id from the URL: the LeetCode slug, or "gfg-" + the GfG slug. */
function idFromUrl(url) {
  const lc = url.match(/leetcode\.com\/problems\/([^/?#]+)/)
  if (lc) return lc[1]
  const gfg = url.match(/geeksforgeeks\.org\/(?:problems\/)?([^/?#]+)/)
  return gfg ? `gfg-${gfg[1].replace(/\d+$/, '')}` : url
}
const ROMAN = /^(i{1,3}|iv)$/i
const titleFromSlug = (slug) => slug.replace(/^gfg-/, '').split('-')
  .map((w) => (ROMAN.test(w) ? w.toUpperCase() : w[0]?.toUpperCase() + w.slice(1))).join(' ')
// "FIND DUPLICATE NUMBER" / "MIn cost" → "Find Duplicate Number" / "Min cost"; short acronyms (BST, LCA, K) are kept.
const TYPOS = { Pallindrome: 'Palindrome', Fibonnaci: 'Fibonacci', Contruct: 'Construct', Regoins: 'Regions',
  arrray: 'array', occurences: 'occurrences', Aggresive: 'Aggressive', Adjancency: 'Adjacency' }
const fixCase = (t) => t.split(' ')
  .map((w) => TYPOS[w] ?? w)
  .map((w) => (/^[A-Z]{4,}$/.test(w) || /^[A-Z]{2}[a-z]+$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w)).join(' ')
const cleanUrl = (u) => u.trim().replace(/\?.*$/, '').replace(/description\/?$/, '')

function parseTitle(raw) {
  let t = raw.trim()
  const challenge = /problem challenge/i.test(t)
  t = t.replace(/^problem challenge\s*\d*\s*:?\s*/i, '').replace(/\(?problem challenge\)?/i, '')
  t = t.replace(/^episode[-\s]*\d+\s*:\s*/i, '')
  const d = t.match(/\((easy|med|medium|hard)\)/i)
  const diff = d ? ({ easy: 'Easy', med: 'Medium', medium: 'Medium', hard: 'Hard' })[d[1].toLowerCase()] : undefined
  t = t.replace(/\((easy|med|medium|hard)\)/i, '').replace(/\s+/g, ' ').trim()
  return { title: t, diff, challenge }
}

const rows = parseCsv(readFileSync(process.argv[2], 'utf8'))
const patterns = []
let current = null
let group = ''

for (const [colA = '', colB = '', ...links] of rows.slice(2)) {
  const urls = links.map((l) => l.trim()).filter(Boolean)
  const header = PATTERNS.find(([re]) => re.test(colB.trim()))
  if (header && urls.length === 0) {
    current = { name: header[1], problems: [] }
    patterns.push(current)
    group = ''
    continue
  }
  if (!current) continue
  if (colA.trim()) group = colA.trim()
  const problemUrls = urls.filter(isProblemLink)
  if (problemUrls.length === 0) continue // concept-only rows ("Reverse a String", "Tabulation intro")

  const video = urls.find(isVideo)
  const alt = urls.filter((u) => !isProblemLink(u) && !isVideo(u) && /^https?:/.test(u))
  const { title, diff, challenge } = parseTitle(colB)
  problemUrls.forEach((u, i) => {
    const url = cleanUrl(u)
    const id = idFromUrl(url)
    // Extra problem links on one row are distinct problems (e.g. Remove Duplicates I/II, Stock I–IV).
    const name = i === 0 && title ? fixCase(title) : titleFromSlug(id)
    if (current.problems.some((p) => p.id === id)) return // the sheet repeats a few problems within a pattern
    current.problems.push({ id, title: name, url, ...(diff && { diff }), ...(challenge && { challenge }),
      ...(group && { group }), ...(video && { video }), ...(alt.length && i === 0 && { alt: alt[0] }) })
  })
}

writeFileSync('src/content/dsa-sheet.json', JSON.stringify(patterns, null, 2) + '\n')
console.log(patterns.map((p) => `${p.name}: ${p.problems.length}`).join('\n'))
console.log('total', patterns.reduce((n, p) => n + p.problems.length, 0))

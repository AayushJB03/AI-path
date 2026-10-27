import { ROADMAP } from './helpers.ts'
import type { Project } from './types.ts'

export const PROJECTS_URL = `${ROADMAP}/100-days/projects/`

/** Bar every portfolio project should clear (summarised from the roadmap's project guidelines). */
export const projectChecklist = [
  'A real problem and a real user, explained in two sentences',
  'A baseline measured before any improvements',
  'A test set of 30+ cases with before-and-after scores, and a judge you\'ve checked',
  'A security pass: 10+ attacks tried, all blocked',
  'No secrets or personal data in code, logs or the repo',
  'Live, with a link someone else has actually used',
  'Cost per request and response time reported',
  'README covering design, results, trade-offs and one failure',
  'A 2–3 minute demo video',
]

/** Suggested project picks per target role (pick 2–3; your course project counts too). */
export const projectsByRole: { role: string; ids: string[] }[] = [
  { role: 'AI application engineer', ids: ['p1', 'p3', 'p12'] },
  { role: 'Agent engineer', ids: ['p4', 'p8', 'p10'] },
  { role: 'Applied ML / model-focused engineer', ids: ['p2', 'p7', 'p9'] },
  { role: 'Voice / multimodal engineer', ids: ['p5', 'p7', 'p1'] },
]

export const projects: Project[] = [
  { id: 'p1', title: 'Invoice and Receipt Extractor', level: 'Intermediate', buildsOn: 'Modules 1, 2, 4',
    what: 'Read scanned invoices and receipts, pull out key fields, validate them, and route uncertain ones to a human.',
    mustHaves: ['Fixed schema: vendor, date, number, line items, tax, total', 'Validation: line items add up, dates and tax IDs are valid', 'Low-confidence results go to a review screen', 'Show where on the page each value came from'],
    doneWhen: 'Field-level accuracy on 30+ documents is reported and nothing invalid is saved unreviewed.' },
  { id: 'p2', title: 'Data Question Answerer', level: 'Intermediate', buildsOn: 'Modules 2, 3, 4',
    what: 'Answer plain-language questions about a real dataset by writing and running SQL, then explain the result.',
    mustHaves: ['Real dataset with every table and column described', 'Read-only queries, shown alongside the result', 'Bounded retries; say when the data can\'t answer', 'Block writes and cap returned rows'],
    doneWhen: 'Accuracy on 30+ known-answer questions (joins, totals, filters) is reported.' },
  { id: 'p3', title: 'Research Agent with Cited Reports', level: 'Intermediate–Advanced', buildsOn: 'Modules 4, 5',
    what: 'Take a research question, search the web and documents, and write a report where every claim links to a source.',
    mustHaves: ['Split into sub-questions researched in parallel', 'Every claim cited, and each citation checked', 'Flag disagreement and thin evidence', 'Time and cost cap per report'],
    doneWhen: 'Citation accuracy on 10+ reports and cost/time per report are reported.' },
  { id: 'p4', title: 'Codebase Assistant', level: 'Advanced', buildsOn: 'Module 5',
    what: 'Answer questions about a GitHub repo and propose fixes, verifying each by running tests in a sandbox.',
    mustHaves: ['Answers cite exact files and lines', 'Fixes are tested in a sandbox with results shown', 'Nothing runs outside the sandbox or changes the repo without approval', 'Context and cost limits on long reads'],
    doneWhen: 'Success rate on 20+ real issues is reported, each confirmed by sandbox tests.' },
  { id: 'p5', title: 'Voice Booking Agent', level: 'Advanced', buildsOn: 'Modules 1, 5',
    what: 'A voice agent that books, changes and cancels appointments in English and Hindi-English.',
    mustHaves: ['Measured, natural-feeling response delay', 'Handles interruptions, pauses and unclear speech', 'Bookings through tools, confirmed before saving', 'Hands over to a person when stuck'],
    doneWhen: 'Task success on 20+ test calls and average response delay are reported.' },
  { id: 'p6', title: 'Contract and Policy Comparer', level: 'Intermediate', buildsOn: 'Modules 3, 4',
    what: 'Compare two versions of a contract or policy and explain what changed and why it matters, citing both.',
    mustHaves: ['Match sections even when moved or renumbered', 'List additions, removals and edits linked to both versions', 'Flag payment, liability, termination and data-use changes', 'Clearly not legal advice'],
    doneWhen: 'Change-detection accuracy on 15+ document pairs is reported, including misses.' },
  { id: 'p7', title: 'Visual Product Search', level: 'Intermediate', buildsOn: 'Modules 1, 4',
    what: 'Search a product catalogue by photo, description, or both.',
    mustHaves: ['Image, text and combined queries', 'Filters for price, category and attributes', 'Compare joint image-text embeddings with caption search', 'Measure quality on queries with known answers'],
    doneWhen: 'Recall@10 on 30+ queries is reported for both approaches.' },
  { id: 'p8', title: 'Browser Task Agent', level: 'Advanced', buildsOn: 'Module 5',
    what: 'An agent that completes a real multi-step web task and asks before anything that commits you.',
    mustHaves: ['One real task end to end', 'Approval before submitting, paying or sending', 'Recovers from slow pages, layout changes and pop-ups', 'Resists instructions hidden in pages'],
    doneWhen: 'Task success on 20+ runs and results of 10+ hidden-instruction attacks are reported.' },
  { id: 'p9', title: 'Fine-Tuned Small Model', level: 'Intermediate–Advanced', buildsOn: 'Modules 3, 6',
    what: 'Fine-tune a small open model for one narrow task to match a large prompted model at a fraction of the cost.',
    mustHaves: ['Narrow task with clean train and held-out sets', 'Prompted large model as the baseline', 'LoRA fine-tune compared on accuracy, cost and latency', 'Served behind an API'],
    doneWhen: 'A results table compares tuned vs prompted on accuracy, cost per 1,000 requests and latency.' },
  { id: 'p10', title: 'Published MCP Server', level: 'Beginner–Intermediate', buildsOn: 'Module 5',
    what: 'An MCP server for a public API or developer tool, published for others to use.',
    mustHaves: ['Well-named tools, resources and prompts', 'Proper errors, auth and rate limits', 'Tested with an inspector and two AI apps', 'Published with setup docs and examples'],
    doneWhen: 'It is published, works in two AI apps, and someone else has used it.' },
  { id: 'p11', title: 'Personal Knowledge Agent', level: 'Intermediate', buildsOn: 'Modules 4, 5',
    what: 'An agent that remembers and connects your notes and documents, answers questions and surfaces related items.',
    mustHaves: ['Notes from 2+ sources, answered with citations', 'Remembers and updates preferences and facts', 'User can view, edit and delete every memory', 'Private, with a local-model option'],
    doneWhen: 'Memory accuracy on 20+ test cases, including updates and deletions, is reported.' },
  { id: 'p12', title: 'Cost-Cutting Model Gateway', level: 'Advanced', buildsOn: 'Module 6',
    what: 'A gateway in front of several providers that cuts cost with caching, routing and failover, plus a usage dashboard.',
    mustHaves: ['One endpoint, per-team keys and budgets', 'Exact and semantic caching with never-cache rules', 'Cheap-model routing and provider failover', 'Dashboard of requests, cost, savings, errors and latency'],
    doneWhen: 'Savings and quality are measured on replayed traffic, and failover works with a provider shut off.' },
]

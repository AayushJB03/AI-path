import type { Question, Res, Unit } from './types.ts'

export const ROADMAP = 'https://ai-engineer-roadmap-2026.vercel.app'
export const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
export const r = (label: string, url: string): Res => ({ label, url })

/** Quiz rows: [question, ...options] with the right option prefixed by '*'.
 *  Options are rotated by question length so the answer isn't always in the same slot (deterministic). */
export const quiz = (...rows: string[][]): Question[] =>
  rows.map(([q, ...opts]) => {
    const k = q.length % opts.length
    const rot = [...opts.slice(k), ...opts.slice(0, k)]
    return { q, options: rot.map((o) => o.replace(/^\*/, '')), answer: rot.findIndex((o) => o.startsWith('*')) }
  })

type UnitIn = {
  topics: string // "a | b | c"
  tryIt: string
  outcome: string
  quiz: Question[]
  extra?: Res[] // docs worth linking beyond the roadmap page and a video search
}

/** Builds a unit. `days` is "25" or "26-27". The CampusX page and a video search are always attached. */
export function unitFactory(moduleUrl: string) {
  return (no: string, title: string, days: string, u: UnitIn, part?: string): Unit => {
    const [start, end = start] = days.split('-').map(Number)
    return {
      id: `u${no}`, no, title, dayStart: start, dayEnd: end, part,
      topics: u.topics.split(' | '),
      tryIt: u.tryIt,
      outcome: u.outcome,
      quiz: u.quiz,
      res: [r(`CampusX roadmap · Unit ${no}`, moduleUrl), ...(u.extra ?? []), r(`Videos: ${title}`, yt(`${title} LLM tutorial`))],
    }
  }
}

/** Common docs, linked from several units. */
export const DOCS = {
  langchain: r('LangChain docs', 'https://python.langchain.com/docs/introduction/'),
  langgraph: r('LangGraph docs', 'https://langchain-ai.github.io/langgraph/'),
  langsmith: r('LangSmith docs', 'https://docs.smith.langchain.com'),
  ollama: r('Ollama', 'https://ollama.com'),
  pydantic: r('Pydantic docs', 'https://docs.pydantic.dev'),
  dspy: r('DSPy', 'https://dspy.ai'),
  owasp: r('OWASP Top 10 for LLM Applications', 'https://genai.owasp.org/llm-top-10/'),
  pgvector: r('pgvector', 'https://github.com/pgvector/pgvector'),
  docling: r('Docling', 'https://github.com/docling-project/docling'),
  unstructured: r('Unstructured docs', 'https://docs.unstructured.io'),
  ragas: r('RAGAS docs', 'https://docs.ragas.io'),
  deepeval: r('DeepEval docs', 'https://deepeval.com/docs/getting-started'),
  evals: r('Hamel Husain: Your AI product needs evals', 'https://hamel.dev/blog/posts/evals/'),
  agents: r('Anthropic: Building effective agents', 'https://www.anthropic.com/research/building-effective-agents'),
  mcp: r('Model Context Protocol docs', 'https://modelcontextprotocol.io'),
  e2b: r('E2B docs', 'https://e2b.dev/docs'),
  fastapi: r('FastAPI tutorial', 'https://fastapi.tiangolo.com/tutorial/'),
  docker: r('Docker: Get started', 'https://docs.docker.com/get-started/'),
  actions: r('GitHub Actions docs', 'https://docs.github.com/en/actions'),
  vllm: r('vLLM docs', 'https://docs.vllm.ai'),
  peft: r('Hugging Face PEFT', 'https://huggingface.co/docs/peft'),
  unsloth: r('Unsloth docs', 'https://docs.unsloth.ai'),
}

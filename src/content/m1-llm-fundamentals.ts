import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/llm-fundamentals/`
const U = unitFactory(url)

export const m1: Module = {
  id: 'llm-fundamentals', no: 1, title: 'LLM Fundamentals', level: 'Beginner', url,
  blurb: 'How LLMs produce text, what they cost, where they fail, and how to pick one',
  units: [
    U('1.1', 'What an LLM Does', '1', {
      topics: 'Next-token prediction | What an LLM is not: a database, search engine or fixed program | Text → tokens → numbers → layers → next-token likelihoods | What parameter counts (8B, 70B) do and don\'t tell you | Why chat models act like assistants',
      tryIt: 'Send the same prompt five times and compare how the answers differ.',
      outcome: 'You can explain in two sentences how an LLM produces an answer, and why it can sound sure while being wrong.',
      quiz: quiz(['At its core, an LLM generates text by…', 'Looking up stored answers', '*Repeatedly predicting a likely next token', 'Running a web search', 'Executing a fixed program'],
                 ['Why can an LLM sound confident and still be wrong?', 'It lies on purpose', '*It produces likely continuations, not checked facts', 'Its database is out of date', 'Temperature is always zero']),
    }),
    U('1.2', 'Tokens, Context and Latency', '2', {
      topics: 'Models read and bill in tokens, not words | Hindi, mixed Hindi-English, code and numbers often cost more tokens | Input vs output pricing | Time to first token and generation speed | Everything shares one context window | Context is not knowledge or memory | Bigger windows aren\'t automatically better',
      tryIt: 'Count tokens for an English paragraph, its Hindi translation, a code snippet and a list of numbers, then estimate the cost of sending each 10,000 times.',
      outcome: 'You can estimate a request\'s cost and latency, and tell whether a task needs more context or better-chosen context.',
      quiz: quiz(['Which is usually priced higher per token?', 'Input tokens', '*Output tokens', 'They are always equal', 'System prompt tokens'],
                 ['Facts buried in the middle of a very long prompt are…', 'Always prioritised', '*Often missed by the model', 'Cached automatically', 'Removed by the API']),
    }),
    U('1.3', 'Beyond Text: Images, Audio and PDFs', '3', {
      topics: 'Models that accept images, audio and documents | Images cost tokens, scaling with resolution | Digital vs scanned PDFs | Audio: transcribe first, or send it directly | What models read well: text in images, chart gist, form fields | Where they slip: counting, dense text, exact table values | Image or extracted text?',
      tryIt: 'Send one chart as an image and as extracted text; ask both the same three questions and compare answers and token use.',
      outcome: 'You can decide when to send images, audio or documents, and predict what each costs and where it may go wrong.',
      quiz: quiz(['To a model, a scanned PDF is essentially…', 'Structured text', '*Pictures of pages', 'A spreadsheet', 'An audio file'],
                 ['When clean text is available, sending text instead of an image is usually…', '*Cheaper and more accurate', 'More expensive', 'Impossible', 'Less accurate for everything']),
    }),
    U('1.4', 'Controlling Output', '4', {
      topics: 'Temperature | Length limits and stop sequences | Match randomness to the task | Reasoning models | When reasoning is wasted | Quality vs cost vs latency',
      tryIt: 'Run an extraction task and a creative task at low and high temperature, then give three hard problems to a fast model and a reasoning model.',
      outcome: 'You choose settings and model type based on the task instead of guessing.',
      quiz: quiz(['For extracting facts from text, temperature should usually be…', '*Low', 'High', 'Maximum', 'Different on every call'],
                 ['Reasoning models are most worth their extra cost for…', 'Simple rewriting', '*Hard maths, code and multi-step planning', 'Short classification', 'Spell-checking']),
    }),
    U('1.5', 'Where LLMs Fail', '5', {
      topics: 'Typical strengths | Failure modes: invention, arithmetic slips, ignored instructions, stale knowledge, inconsistency | Why models make things up | Ask "how reliably?", not "can it?"',
      tryIt: 'Write 10 questions (some it should know, some it can\'t, some with a false premise, some missing key info) and record each answer and how confident it sounds.',
      outcome: 'You can predict which tasks need safeguards such as grounding documents, output checks or human review.',
      quiz: quiz(['The useful question to ask about an LLM for your task is…', 'Can it ever do this?', '*How reliably does it get this right for my inputs?', 'Is it the newest model?', 'How many parameters does it have?'],
                 ['Given a question with a false premise, models often…', 'Always refuse', '*Accept the premise and answer anyway', 'Crash', 'Ask for an API key']),
    }),
    U('1.6', 'Choosing a Model', '6', {
      topics: 'Closed vs open models | No single best model | Knowledge cutoffs | Pin your model version | Leaderboards shortlist; your examples decide | Compare quality, speed, cost, context size, privacy',
      tryIt: 'Shortlist three models and test them on 10 questions from your own project.',
      outcome: 'You choose a model from results on your own examples, not from popularity or rankings.',
      quiz: quiz(['Why pin a specific model version?', 'It is cheaper', '*The model behind a name can change and silently alter behaviour', 'Pinned versions are faster', 'APIs require it'],
                 ['Public leaderboards are best used to…', 'Make the final choice', '*Build a shortlist to test on your own examples', 'Set prices', 'Choose a temperature']),
      extra: [DOCS.ollama],
    }),
  ],
}

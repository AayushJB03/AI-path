import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/building-with-llm-apis/`
const U = unitFactory(url)

export const m2: Module = {
  id: 'llm-apis', no: 2, title: 'Building with LLM APIs', level: 'Beginner', url,
  blurb: 'LangChain, local models, streaming, structured outputs, tools, chains, failures, scale, tracing',
  units: [
    U('2.1', 'LangChain Basics and Conversations', '7', {
      topics: 'What LangChain is for | Chat models and switching providers | Messages and roles | The model has no memory | Prompt templates | Keep API keys server-side | Read token usage and the stop reason',
      tryIt: 'Hold a three-turn conversation with a prompt template, then drop the history on the third call and see what the model forgets.',
      outcome: 'You can call any model through LangChain, keep a conversation going, and explain why the model only "remembers" what you send.',
      quiz: quiz(['How does a chat model "remember" earlier turns?', 'It stores them server-side', '*Your app resends the history on every call', 'Through fine-tuning', 'Via cookies'],
                 ['Why check the stop reason in a response?', 'For billing only', '*To tell whether the answer was cut off by a length limit', 'It sets temperature', 'It is needed to stream']),
      extra: [DOCS.langchain],
    }),
    U('2.2', 'Open and Local Models', '8', {
      topics: 'Open weights and licences | Running models locally (e.g. Ollama) | Memory limits and quantised versions | Same code, different model | Hosted open models | Trade-offs | Build cheap, ship with your chosen model',
      tryIt: 'Run a small open model locally and compare it with your chosen API model on your 10 project questions.',
      outcome: 'You can run open models locally or through a provider, swap them into your app, and judge when they\'re good enough.',
      quiz: quiz(['What mostly limits how big a model you can run locally?', 'CPU brand', '*Available memory (RAM / VRAM)', 'Internet speed', 'Screen size'],
                 ['Before building on an open model you should check…', 'Its logo', '*Its licence', 'Its tokenizer colour', 'Nothing']),
      extra: [DOCS.ollama],
    }),
    U('2.3', 'Streaming', '9', {
      topics: 'Show answers as they arrive | Streaming in LangChain | Perceived speed and time to first token | Reassemble the full answer | Handle cancels and broken streams',
      tryIt: 'Ask for a long answer with and without streaming and time when the first word appears.',
      outcome: 'You stream answers to users and still end up with a complete saved response, even when the stream is interrupted.',
      quiz: quiz(['Streaming mainly improves…', 'Total cost', '*Perceived latency', 'Accuracy', 'Context length'],
                 ['Why reassemble streamed chunks on the server?', 'For colour', '*So the full answer can be saved, checked or logged', 'To lower cost', 'It is never needed']),
    }),
    U('2.4', 'Structured Outputs', '10-11', {
      topics: 'Don\'t just ask for JSON: use structured-output support | Describe the shape as a schema | Validate before use | Valid isn\'t the same as correct | Generate → check → decide',
      tryIt: 'Extract name, date, amount and category from 10 messy receipts; count how many come back valid, and how many are valid but wrong.',
      outcome: 'You get structured data your code can rely on, and handle the cases where it can\'t.',
      quiz: quiz(['Output that passes schema validation is…', 'Guaranteed correct', '*Correctly shaped, but may still be wrong', 'Always cached', 'Encrypted'],
                 ['When structured output fails validation you should…', 'Ignore it', '*Retry, ask the model to fix it, or reject with a clear error', 'Raise the temperature', 'Crash the app']),
      extra: [DOCS.pydantic],
    }),
    U('2.5', 'Tool Calling', '12-13', {
      topics: 'The model asks; your code acts | Defining tools in LangChain | The full loop | Matching results with tool-call IDs | Several and dependent calls | When tools fail | Designing good tools | Never trust tool inputs | Tool descriptions are instructions',
      tryIt: 'Give the model a weather tool and a currency tool; ask a question that needs both, then one that needs neither.',
      outcome: 'You can build the complete tool-calling loop and give a model tools it uses correctly and safely.',
      quiz: quiz(['In tool calling, who actually runs the tool?', 'The model provider', '*Your application code', 'The user', 'The tokenizer'],
                 ['Why does each tool request carry an ID?', 'For billing', '*So each result is matched to the right request', 'For caching', 'To choose the model']),
    }),
    U('2.6', 'Chaining Steps Together', '14', {
      topics: 'Beyond one call | Chains in LangChain | Sequence, routing and parallel patterns | Small focused steps vs one giant prompt | Chains vs agents',
      tryIt: 'Build a chain that classifies a question by type and routes it to a different prompt for each type.',
      outcome: 'You can design a feature as a chain of small steps and know when that beats one prompt.',
      quiz: quiz(['In a chain, who decides the steps?', 'The model', '*Your code', 'The user at runtime', 'A random router'],
                 ['Splitting a task into small focused steps usually makes it…', 'Harder to debug', '*More reliable and easier to debug', 'Always more expensive', 'Impossible to stream']),
    }),
    U('2.7', 'Handling Failures', '15', {
      topics: 'What goes wrong: keys, rate limits, server errors, timeouts, long inputs, bad output | Retry temporary errors, fail fast on permanent ones | Retries and timeouts in LangChain | Fallback models | Limit concurrency | Fail gracefully',
      tryIt: 'Point your chain at a wrong model name, then at a very short timeout, and confirm each triggers the right retry or fallback.',
      outcome: 'Your app survives everyday API failures without crashing or retrying forever.',
      quiz: quiz(['Which error should you NOT retry?', 'Rate limit (429)', 'Server error (5xx)', '*Invalid API key', 'Timeout'],
                 ['A fallback model is used when…', 'The answer is long', '*The primary model call fails', 'Temperature is high', 'You stream']),
    }),
    U('2.8', 'Processing at Scale', '16', {
      topics: 'Run independent requests concurrently | Cap concurrency to respect rate limits | Batch APIs for jobs that can wait | Save progress; retry failed items alone | Estimate cost before you run',
      tryIt: 'Summarise 200 short texts one at a time, then concurrently with a cap; compare time, errors and cost.',
      outcome: 'You process large volumes quickly and cheaply without hitting limits or losing work.',
      quiz: quiz(['Provider batch APIs are a good fit for…', 'Live chat', '*Large jobs that can wait, like overnight processing', 'Streaming UIs', 'Login flows'],
                 ['Why cap concurrency when sending many requests?', 'To lower accuracy', '*To stay under rate limits', 'To change models', 'JSON requires it']),
    }),
    U('2.9', 'Cost, Logging and Tracing', '17', {
      topics: 'Record model, tokens, latency, retries, errors, tools and cost for every request | Think in traces | Tracing LangChain apps (LangSmith, callbacks) | Find the problem step',
      tryIt: 'Run 10 questions with tracing on and report total cost, average time per question and the most expensive question.',
      outcome: 'You know exactly what your app costs and can find the slow or failing step in any request.',
      quiz: quiz(['A trace groups…', 'All users together', '*Every model and tool call made for one request', 'Only errors', 'Prompt versions'],
                 ['Tracing helps you find…', 'The model weights', '*Which step failed or used the most time and tokens', 'User passwords', 'The tokenizer']),
      extra: [DOCS.langsmith],
    }),
  ],
}

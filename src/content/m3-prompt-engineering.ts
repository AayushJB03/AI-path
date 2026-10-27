import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/prompt-engineering/`
const U = unitFactory(url)

export const m3: Module = {
  id: 'prompt-engineering', no: 3, title: 'Prompt Engineering', level: 'Beginner', url,
  blurb: 'Prompt structure, examples, system prompts, reasoning, testing, optimisation, caching, injection',
  units: [
    U('3.1', 'Anatomy of a Prompt', '18', {
      topics: 'Instructions, context, input, constraints, examples, output format | System vs user roles | Separate instructions from data | Long documents first, question last | Prompt templates',
      tryIt: 'Rewrite a one-line prompt so it has all six parts, then compare answers on three questions.',
      outcome: 'You write well-structured prompts and can explain what each part is for.',
      quiz: quiz(['For long documents, a good layout is…', '*Documents first, then the question and instructions', 'Question first, documents unlabeled at the end', 'Documents split randomly', 'No documents at all'],
                 ['Wrapping pasted documents in clear tags helps because…', 'It encrypts them', '*It separates data from instructions', 'It lowers cost', 'It is required syntax']),
    }),
    U('3.2', 'Zero-Shot and Few-Shot Prompting', '19', {
      topics: 'When instructions are enough | When examples help | Designing examples, including a tricky case | Quality, variety and order matter | Few-shot templates',
      tryIt: 'Classify 10 support messages by urgency with no examples, then with three; count how many each gets right.',
      outcome: 'You can tell whether a task needs examples and write ones that improve results.',
      quiz: quiz(['Few-shot prompting means…', '*Including a few worked examples in the prompt', 'Fine-tuning on a few GPUs', 'Using very short prompts', 'Sampling only a few tokens'],
                 ['Repetitive, low-quality examples tend to…', 'Be ignored', '*Get copied by the model', 'Improve variety', 'Lower cost']),
    }),
    U('3.3', 'System Prompts and Output Control', '20', {
      topics: 'What belongs in a system prompt | Stable rules vs per-request instructions | Plan for missing info, ambiguity and out-of-scope asks | A few clear rules beat a rulebook | Style, length and format | When prompting isn\'t enough: structured outputs',
      tryIt: 'Ask three questions your documents can\'t answer, add one system-prompt rule for that case, and ask again.',
      outcome: 'Your system prompt keeps the assistant on task and handles out-of-scope questions sensibly.',
      quiz: quiz(['Rules that never change belong in…', '*The system prompt', 'Each user message', 'The tool schema', 'The temperature setting'],
                 ['If your code depends on an exact output format, prefer…', 'Asking politely', '*Structured outputs', 'A higher temperature', 'Longer prompts']),
    }),
    U('3.4', 'Reasoning and Breaking Tasks Down', '21', {
      topics: 'When to ask for reasoning | When it\'s a waste | Break big tasks into steps | Prompting reasoning models: goal, context, constraints, what good looks like',
      tryIt: 'Compare a normal prompt with a reason-first prompt on a multi-step question: accuracy, tokens and time.',
      outcome: 'You know when to ask for reasoning and how to split a hard task into reliable steps.',
      quiz: quiz(['Asking for step-by-step reasoning helps most on…', 'Simple extraction', '*Multi-step logic, maths and planning', 'Spell-checking', 'One-word translation'],
                 ['Reasoning models generally need…', '"Think step by step" in every prompt', '*A clear goal, context, constraints and what good looks like', 'No instructions', 'High temperature']),
    }),
    U('3.5', 'Testing and Improving Prompts', '22', {
      topics: 'Why prompts fail | Build a small test set with expected answers | Score with code, simple rule checks, and a model grader only where needed | Compare versions on the same questions | Check consistency across runs',
      tryIt: 'Score two versions of your system prompt on 10 questions, running each version twice.',
      outcome: 'You pick the better prompt with numbers, not impressions.',
      quiz: quiz(['Prompt versions should be compared…', 'On one impressive answer', '*On the same full test set', 'By gut feel', 'On different questions each time'],
                 ['Why run each prompt version more than once?', 'To spend tokens', '*Outputs vary, so one run can mislead', 'APIs require it', 'To warm the cache']),
    }),
    U('3.6', 'Automatic Prompt Improvement', '23', {
      topics: 'Let a model propose better prompts | Generate → score → keep the best → repeat | Choose few-shot examples from test results | Optimisation tools like DSPy | Hold questions back to avoid overfitting | Read the winning prompt',
      tryIt: 'Give a model your prompt and five failing questions, ask for three improved versions, and score them on your set plus five held-back questions.',
      outcome: 'You improve prompts with a model or optimiser and confirm the gain on questions it never saw.',
      quiz: quiz(['Why keep held-out questions when optimising prompts?', 'To save money', '*To confirm the improvement isn\'t overfitting the test set', 'DSPy requires them', 'For caching'],
                 ['DSPy helps you…', 'Train base models', '*Search for instructions and examples that score best on your data', 'Host models', 'Tokenise text']),
      extra: [DOCS.dspy],
    }),
    U('3.7', 'Versions, Cost and Caching', '24', {
      topics: 'Version prompts like code, with the model they ran on | Track tokens, cost and latency per version | Trim what isn\'t helping | Prompt caching: fixed text first, changing text last',
      tryIt: 'Move all fixed text to the start of your system prompt and compare cost and latency over 10 requests.',
      outcome: 'You keep a versioned prompt history and make prompts cheaper without making them worse.',
      quiz: quiz(['To benefit from prompt caching, put…', '*Fixed text first and changing parts last', 'Changing parts first', 'Everything in the user message', 'Examples at the very end'],
                 ['A saved prompt version should record…', 'Only the text', '*The text and the model it was used with', 'The list of users', 'Nothing; keep only the latest']),
    }),
    U('3.8', 'Prompt Injection Basics', '24', {
      topics: 'What prompt injection is | Treat outside text as untrusted | Spot override attempts | Wording isn\'t security: enforce limits in code',
      tryIt: 'Plant "ignore all previous instructions…" in one of your documents and ask a normal question.',
      outcome: 'You recognise prompt injection and can explain why code, not the prompt, must protect what matters.',
      quiz: quiz(['Prompt injection is when…', 'The model crashes', '*Untrusted text contains instructions the model follows', 'Prompts are too long', 'Users type too fast'],
                 ['The real protection for sensitive actions is…', 'A stronger "never do X" line', '*Checks and limits enforced in your code', 'A bigger model', 'Lower temperature']),
      extra: [DOCS.owasp],
    }),
  ],
}

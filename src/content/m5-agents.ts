import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/agents/`
const U = unitFactory(url)
const P1 = 'Part 1 · Build an agent'
const P2 = 'Part 2 · Advanced agents'
const P3 = 'Part 3 · Evaluating agents'
const P4 = 'Part 4 · Securing agents'

export const m5: Module = {
  id: 'agents', no: 5, title: 'Agents', level: 'Advanced', url,
  blurb: 'Agent loops, LangGraph, MCP, memory, context and harness engineering, multi-agent, evals, security',
  units: [
    U('5.1', 'What Is an Agent?', '57', {
      topics: 'The agent loop: goal → decide → act → observe → repeat | Who decides what happens next | Where agents help | When a chain is better | What an agent is made of',
      tryIt: 'List five tasks your users might want done and mark which need an agent and which a simple chain could handle.',
      outcome: 'You can tell whether a problem really needs an agent and name the parts every agent needs.',
      quiz: quiz(['An agent differs from a chain because…', 'It uses a bigger model', '*The model decides the next step', 'It never uses tools', 'It has no prompt'],
                 ['If you can write the steps down in advance, prefer…', 'A multi-agent system', '*A chain', 'Fine-tuning', 'An agent with more tools']),
      extra: [DOCS.agents],
    }, P1),
    U('5.2', 'The Agent Loop', '58', {
      topics: 'Reason, then act (ReAct) | Build the loop yourself once | Step limits, finish conditions and repetition detection | Step-by-step vs plan-first',
      tryIt: 'Give your loop a task that needs three tool calls in a row, then an impossible task, and confirm the step limit stops it.',
      outcome: 'You can explain how an agent loop works and build one that always stops.',
      quiz: quiz(['ReAct interleaves…', 'Training and inference', '*Reasoning and tool actions', 'Users and agents', 'Embeddings and tokens'],
                 ['Why give an agent a maximum step count?', 'APIs require it', '*To prevent infinite loops and runaway cost', 'Better accuracy', 'Shorter prompts']),
    }, P1),
    U('5.3', 'Building Agents with LangGraph', '59-60', {
      topics: 'Why LangGraph | State, nodes and edges | Branches and loops with conditional edges | Prebuilt vs custom agents | Inspect state to see what happened',
      tryIt: 'Rebuild your 5.2 loop as a LangGraph graph and add a branch that answers simple questions without tools.',
      outcome: 'You build a controllable agent in LangGraph and debug it by inspecting its state.',
      quiz: quiz(['In LangGraph, edges decide…', 'The model\'s temperature', '*Which node runs next', 'Token pricing', 'Embedding size'],
                 ['State in LangGraph holds…', 'Model weights', '*What the agent knows and has done so far', 'API keys', 'CSS']),
      extra: [DOCS.langgraph],
    }, P1),
    U('5.4', 'Tools for Agents', '61', {
      topics: 'Your RAG pipeline becomes a tool | Tools the agent chooses between | Keep tool results small | Useful errors when tools fail | Separate reading from changing',
      tryIt: 'Give the agent your RAG search tool and an action tool; ask one question that needs only search and one task that needs search then action.',
      outcome: 'Your agent has a well-designed tool set, including your own RAG system.',
      quiz: quiz(['Why keep tool results small?', 'Tools are slow', '*Large results fill up the agent\'s context', 'APIs truncate them', 'For caching'],
                 ['Tools that change things (create, delete) should be…', 'Treated like reads', '*Kept separate and handled with extra care', 'Removed entirely', 'Always auto-approved']),
    }, P1),
    U('5.5', 'Planning and Reflection', '62', {
      topics: 'Plan before acting | Change the plan when things fail | Check its own work | The cost of extra thinking',
      tryIt: 'Run a multi-part task with and without a planning step and compare success, steps and cost.',
      outcome: 'You add planning and self-checks where they help, and leave them out where they don\'t.',
      quiz: quiz(['Planning and self-checking are worth it for…', 'Every simple task', '*Genuinely complex, multi-part tasks', 'Greetings', 'Single tool calls'],
                 ['An agent should revise its plan when…', 'Never', '*A step fails or new information appears', 'Every second', 'The user is idle']),
    }, P1),
    U('5.6', 'Saving Progress and Asking for Approval', '63', {
      topics: 'Save state after each step | Resume, don\'t restart | Pause for human approval | Make actions safe to retry',
      tryIt: 'Add an approval step before a tool that changes something; approve one request, reject another, and check both are handled.',
      outcome: 'Your agent saves progress, resumes after interruptions and waits for approval before acting.',
      quiz: quiz(['An action that is "safe to retry" (idempotent)…', 'Runs faster', '*Has the same effect whether it runs once or twice', 'Can never fail', 'Needs no approval'],
                 ['Human approval matters most for…', 'Reading data', '*Irreversible actions like sending, deleting or paying', 'Formatting', 'Summaries']),
      extra: [DOCS.langgraph],
    }, P1),

    U('5.7', 'MCP Fundamentals', '64', {
      topics: 'Why MCP exists | Host, client and server | Tools, resources and prompts | Tool calling vs MCP | Using existing servers | Loading MCP tools into a LangGraph agent',
      tryIt: 'Connect your agent to a file-system MCP server pointed at your documents and ask it to find and summarise a file.',
      outcome: 'You can explain how MCP works and connect your agent to existing servers.',
      quiz: quiz(['MCP standardises…', 'Model training', '*How apps expose tools and data to AI clients', 'Tokenisation', 'GPU drivers'],
                 ['An MCP server can offer…', 'Only prompts', '*Tools, resources and prompts', 'Only databases', 'Only files']),
      extra: [DOCS.mcp],
    }, P2),
    U('5.8', 'Building MCP Servers', '65-66', {
      topics: 'Expose a real system as a server | Tools vs resources vs prompts | Good server design | Local vs remote (with auth) | Test with an inspector first | Several servers, one agent | Version your server changes',
      tryIt: 'Build a support-request MCP server with two tools and one resource, test it with an inspector, and use it from your agent and one other MCP client.',
      outcome: 'You package your own systems as MCP servers any compatible app can use.',
      quiz: quiz(['Reference data like a policy document fits best as an MCP…', 'Tool', '*Resource', 'Prompt', 'Transport'],
                 ['Remote MCP servers need…', 'No security', '*Authentication', 'A GPU', 'A vector database']),
      extra: [DOCS.mcp],
    }, P2),
    U('5.9', 'Memory', '67-68', {
      topics: 'Short-term vs long-term memory | Facts, past events, lessons learned | Store per user | When to save | What to save | When facts change | Recall by relevance and recency | Forgetting on request | Is memory helping?',
      tryIt: 'Tell your agent a preference and a fact, check both are used in a new conversation, then change the fact and confirm the old one is replaced.',
      outcome: 'Your agent remembers what matters across conversations, keeps memories accurate and forgets on request.',
      quiz: quiz(['Long-term memory must be organised…', 'Globally', '*Per user, so memories never mix', 'By date only', 'In the system prompt'],
                 ['When a remembered fact changes, the agent should…', 'Keep both forever', '*Update or replace the old memory', 'Ignore the new one', 'Delete all memory']),
    }, P2),
    U('5.10', 'Context Engineering Basics', '69', {
      topics: 'Context is a budget | Why long runs go wrong | See what\'s really in the context | Split the budget across parts | Decide what\'s always in, looked up, summarised or dropped | Order and label sections',
      tryIt: 'Log the full context at steps 1, 10 and 20 of a long task and measure how much each part has grown.',
      outcome: 'You can tell when agent problems are really context problems, and plan what goes into context.',
      quiz: quiz(['As agent context grows, a common failure is…', 'Faster responses', '*Losing track of the goal and missing buried details', 'Lower cost', 'Better recall'],
                 ['Context engineering is mainly about…', 'Fine-tuning', '*Deciding what goes into the model\'s context, when, and in what order', 'Choosing GPUs', 'Writing CSS']),
    }, P2),
    U('5.11', 'Compaction, Offloading and Tool Context', '70-71', {
      topics: 'Summarise without losing the goal | Rolling summaries | Keep exact values exact | Write notes outside the context | Trim tool results | Load only the tools needed | Use caching | Give sub-tasks their own context',
      tryIt: 'Run a 20+ step task three ways (keep everything / summarise history / summarise + trim tools + notes) and compare success, tokens and cost.',
      outcome: 'Your long, tool-heavy agent runs stay focused and affordable.',
      quiz: quiz(['Why store IDs and exact numbers outside summaries?', 'They are secret', '*Summaries can blur exact values', 'They cost more', 'Models can\'t read numbers'],
                 ['Handing a self-contained sub-task to a separate agent helps because…', 'It is cheaper per token', '*Its working details don\'t crowd the main context', 'It skips tools', 'It avoids evals']),
    }, P2),
    U('5.12', 'Harness Engineering', '72', {
      topics: 'What a harness is | The harness matters as much as the model | Designing the tool set | Let the agent check its own work | Load instructions on demand | Fit the harness to the model | Change one thing at a time | Learn from existing coding agents',
      tryIt: 'Make three separate harness changes (tool descriptions, a source-check step, on-demand instructions) and measure each on the same 10 tasks.',
      outcome: 'You improve an agent through its harness rather than its model, and prove each change.',
      quiz: quiz(['When an agent fails, the fix is often in…', 'A bigger model', '*The harness: tools, context, checks and loop', 'The GPU', 'The tokenizer'],
                 ['Harness changes should be made…', 'All at once', '*One at a time, measured on the same tasks', 'Without testing', 'Only by the model provider']),
    }, P2),
    U('5.13', 'Multi-Agent Patterns', '73', {
      topics: 'Why more than one agent | Supervisor and specialists | Handoffs | Parallel specialists | Teams of teams | What goes wrong | One strong agent is often enough',
      tryIt: 'Sketch a single-agent design and a supervisor-with-specialists design; list each agent\'s tools and permissions and predict which costs more.',
      outcome: 'You choose a multi-agent pattern that fits, or decide a single agent is better.',
      quiz: quiz(['In the supervisor pattern…', 'Every agent does everything', '*One agent plans and delegates to specialists', 'Agents vote at random', 'No tools are used'],
                 ['A common downside of multi-agent systems is…', 'Lower cost', '*Higher cost and information lost between agents', 'Too few tokens', 'No tracing']),
    }, P2),
    U('5.14', 'Building Multi-Agent Systems', '74-75', {
      topics: 'Build a supervisor in LangGraph | Handoffs with context | Shared state vs messages | The right tools and model per specialist | Combining results | When a specialist fails | Track cost per agent | A2A for cross-team agents',
      tryIt: 'Build a supervisor with two or three specialists and compare it with your single agent on the same ten tasks.',
      outcome: 'You build a working multi-agent system and judge with numbers whether it beats one agent.',
      quiz: quiz(['Each specialist agent should get…', 'All the tools', '*Only the tools and permissions its job needs', 'No tools', 'Admin access'],
                 ['A2A is an emerging standard for…', 'Embedding text', '*Connecting agents built by different teams', 'Fine-tuning', 'Prompt caching']),
      extra: [DOCS.langgraph],
    }, P2),
    U('5.15', 'Reliability and User Experience', '76', {
      topics: 'Common agent failures | Budgets for steps, time, retries and cost | Know when to hand over | Show progress | Keep users in control',
      tryIt: 'Stream your agent\'s progress to the user step by step and add a cost limit that stops any task above a set amount.',
      outcome: 'Your agents fail predictably, hand over when stuck, and keep users informed and in control.',
      quiz: quiz(['When an agent can\'t continue safely it should…', 'Keep trying forever', '*Fall back to a simpler path or hand over to a person', 'Guess', 'Delete its memory'],
                 ['Showing which tool an agent is using helps users…', 'Feel it is slower', '*Understand and trust what it is doing', 'Pay more', 'Skip approvals']),
    }, P2),

    U('5.16', 'Why Agent Evals Are Different', '77', {
      topics: 'The final answer isn\'t enough | Read full traces | Group the failures | What to measure: decisions, tools, path, success, recovery, memory, efficiency, safety',
      tryIt: 'Read 20 traces from your agent, note each problem in one line, and group them into failure types.',
      outcome: 'You find your agent\'s common failures by reading what it actually did.',
      quiz: quiz(['Agent evals must look at…', 'Only the final answer', '*The steps and tool calls it took', 'Only cost', 'Only latency'],
                 ['An agent reaching the right answer the wrong way is…', 'Fine', '*Still a failure worth catching', 'Impossible', 'Faster']),
    }, P3),
    U('5.17', 'Evaluating Tool Use and Task Success', '78', {
      topics: 'An agent test set | Right tool, right inputs | A sensible path | Task success rate | Judge the path, and check the judge',
      tryIt: 'Build an agent test set of 15 tasks and score tool choice, inputs and task success.',
      outcome: 'You measure whether your agent makes good decisions and completes its tasks.',
      quiz: quiz(['Which is a path-level problem?', 'A wrong final answer only', '*Unnecessary or repeated tool calls', 'A slow GPU', 'A long prompt'],
                 ['An agent test set lists tasks with…', 'Only inputs', '*What success looks like and, where it matters, the expected tools', 'Random outputs', 'Model weights']),
    }, P3),
    U('5.18', 'Testing Recovery, Memory and Efficiency', '79', {
      topics: 'Break things on purpose | Did it notice and recover? | Test memory accuracy and isolation | Efficiency per task',
      tryIt: 'Make your search tool fail on three tasks and return nothing on two more, then run three tasks that depend on remembered facts.',
      outcome: 'You know how your agent copes when things go wrong, whether its memory can be trusted, and what each task costs.',
      quiz: quiz(['Fault injection in agent testing means…', 'Writing buggy prompts', '*Deliberately making tools fail or return bad data', 'Removing tests', 'Using old models'],
                 ['A memory test should confirm the agent never uses…', 'Recent memories', '*Outdated memories or another user\'s', 'Any memory at all', 'Tools']),
    }, P3),

    U('5.19', 'Agent Threats and Least Privilege', '80', {
      topics: 'The dangerous combination: untrusted input + private data or powerful tools + a way out | Least privilege | Check tool use in code | Memory can be attacked | Limits stop runaways',
      tryIt: 'List every tool and permission each agent has, write what an attacker could do with it, and remove anything not essential.',
      outcome: 'You can explain how agents get attacked, and yours have only the access they truly need.',
      quiz: quiz(['The "dangerous combination" for agents is…', 'A fast model plus caching', '*Untrusted input + access to private data or tools + a way to send data out', 'Long prompts plus streaming', 'Two agents and one tool'],
                 ['Least privilege means…', 'Give agents admin access to be safe', '*Only the tools and permissions the task needs', 'No tools at all', 'Shared keys']),
    }, P4),
    U('5.20', 'Approval Gates and Sandboxing', '81', {
      topics: 'Approval for anything irreversible | Run generated code in a sandbox (E2B, Modal, containers) | Restrict files, network, credentials and run time | Generated commands are untrusted | Limit the damage',
      tryIt: 'Give your agent a sandboxed Python tool and confirm that reading files outside the sandbox and making network calls are both blocked.',
      outcome: 'Your agents take powerful actions safely, with approval and isolation around anything risky.',
      quiz: quiz(['Code written by the model should run…', 'Inside your app process', '*In an isolated sandbox', 'On the user\'s machine unchecked', 'In the browser console'],
                 ['SQL or shell commands written by the model are…', 'Trusted', '*Untrusted input that must be validated', 'Safe if they are short', 'Pre-approved']),
      extra: [DOCS.e2b],
    }, P4),
    U('5.21', 'Securing MCP and Tools', '82', {
      topics: 'Untrusted MCP servers | Hidden instructions in tool descriptions and results | Servers that change after you approve them | Over-broad access | Hijacked tool use',
      tryIt: 'Hide an instruction in one tool description and another in a tool result, and see whether either changes your agent\'s behaviour.',
      outcome: 'You connect agents to MCP servers and tools without handing control to whoever wrote them.',
      quiz: quiz(['Connecting a third-party MCP server is like…', 'Reading a blog post', '*Running third-party code: review and limit it', 'Changing the temperature', 'Adding a font'],
                 ['Tool descriptions can be an attack vector because…', 'They are long', '*The model reads them as instructions', 'They are cached', 'They contain prices']),
      extra: [DOCS.mcp],
    }, P4),
    U('5.22', 'Red-Teaming Your Agent', '83', {
      topics: 'Attack your own agent | Through every door: messages, documents, tool results, MCP, memory | Measure unsafe actions | Every successful attack becomes a test | Safety vs usefulness',
      tryIt: 'Write 10 attacks across messages, documents, tool results, MCP and memory; fix what you can and run them again.',
      outcome: 'You test your agent like an attacker and turn findings into permanent tests.',
      quiz: quiz(['Agent red-teaming should cover…', 'Only user messages', '*Messages, documents, tool results, MCP and memory', 'Only the UI', 'Only latency'],
                 ['A defence that blocks attacks but breaks normal tasks…', 'Is perfect', '*Needs rebalancing: check usefulness too', 'Should ship anyway', 'Saves money']),
      extra: [DOCS.owasp],
    }, P4),
  ],
}

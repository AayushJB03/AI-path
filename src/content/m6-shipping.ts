import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/shipping-to-production/`
const U = unitFactory(url)

export const m6: Module = {
  id: 'shipping', no: 6, title: 'Shipping to Production', level: 'Advanced', url,
  blurb: 'System design, APIs, frontend, deploys, CI gates, safe releases, monitoring, cost, self-hosting, fine-tuning',
  units: [
    U('6.1', 'Designing an AI System', '84', {
      topics: 'Start from the requirements | Rough numbers first: requests, tokens, monthly cost | The simplest design that works | Quality vs speed vs cost | Plan for failure | Write decisions down',
      tryIt: 'Write a one-page design: requirements, expected traffic, monthly cost, a diagram, and three decisions with the alternatives you rejected.',
      outcome: 'You turn a product idea into a design you can defend, starting from requirements.',
      quiz: quiz(['A system design should start from…', 'Your favourite framework', '*Requirements: users, latency, quality, cost and data rules', 'The UI colours', 'A model leaderboard'],
                 ['The three forces every AI design trades off are…', 'Fonts, colours, layout', '*Quality, speed and cost', 'Users, admins, bots', 'CPU, RAM, disk']),
    }),
    U('6.2', 'From Prototype to Service', '85', {
      topics: 'Put the agent behind a web API | Stream through the API | Know who\'s asking | Keep the app stateless | Long tasks as background jobs | Authentication and rate limits',
      tryIt: 'Expose your agent through a streaming API and confirm two users each get their own conversation and memories.',
      outcome: 'Your agent runs as a proper service many users can use at once.',
      quiz: quiz(['Keeping the app stateless means…', 'No database', '*Conversations and progress live in a database, not in app memory', 'No users', 'No logging'],
                 ['Long agent tasks are better run as…', 'Blocking HTTP requests', '*Background jobs that report progress', 'Cron jobs only', 'Client-side scripts']),
      extra: [DOCS.fastapi],
    }),
    U('6.3', 'A Real Frontend', '86', {
      topics: 'A streaming chat interface | Show citations | Show what the agent is doing | Approval in the interface | Collect feedback | Handle failure gracefully',
      tryIt: 'Build a chat page with streaming, citations, an approval prompt and thumbs up/down on each answer.',
      outcome: 'Users can see what the agent knows, what it\'s doing and what it wants to do.',
      quiz: quiz(['Thumbs up/down on answers are useful because…', 'Decoration', '*They feed real feedback into your test set', 'They speed up models', 'They are required'],
                 ['An approval prompt in the UI should show…', 'Nothing but a spinner', '*Exactly what the agent wants to do', 'The system prompt', 'The model name']),
    }),
    U('6.4', 'Packaging and Deploying', '87-88', {
      topics: 'Containerise the app | Run app, database and vector DB together | Deploy to a managed host | Secrets in the host\'s secret store | Separate dev, test and live | Health checks | Data changes and re-indexing on deploy',
      tryIt: 'Deploy to a test environment and a live one; change a setting only in test and confirm live is unaffected.',
      outcome: 'You deploy reliably, with secrets and settings kept safe and separate.',
      quiz: quiz(['API keys in production should live in…', 'The repo', '*The host\'s secret store or environment variables', 'The container image', 'The frontend bundle'],
                 ['A health check lets the host…', 'Bill you', '*Detect an unhealthy app and restart it', 'Cache answers', 'Choose a model']),
      extra: [DOCS.docker],
    }),
    U('6.5', 'Automatic Checks on Every Change', '89', {
      topics: 'Run tests on every push (GitHub Actions) | Your regression suite becomes a release gate | Fast checks per change, full suite per release | Prompts and models count as code | Release only what passed',
      tryIt: 'Run a quick eval subset on every push, then push a deliberately worse prompt and confirm the release is blocked.',
      outcome: 'You can\'t release a version that\'s worse than the current one.',
      quiz: quiz(['A changed prompt or model version should…', 'Skip CI', '*Go through the same checks as a code change', 'Ship immediately', 'Only be tested by hand'],
                 ['Why a quick subset per push and the full suite per release?', 'Tradition', '*Evaluations cost time and money', 'The full suite is unreliable', 'CI limits']),
      extra: [DOCS.actions],
    }),
    U('6.6', 'Releasing Safely', '90', {
      topics: 'Trace every release to its code, prompt, model and settings | Release to a few users first | Shadow testing | Compare versions on real users | Feature flags | Roll back fast',
      tryIt: 'Release a new prompt to 10% of traffic, compare it on quality and cost, then roll it out or back.',
      outcome: 'You release gradually, compare on real traffic and undo quickly.',
      quiz: quiz(['Shadow testing means…', 'Testing at night', '*Running a new version on real traffic without showing users its answers', 'Deleting logs', 'Turning off monitoring'],
                 ['A canary release sends…', 'All traffic to the new version', '*A small share of traffic to the new version first', 'Traffic to staging only', 'No traffic']),
    }),
    U('6.7', 'Watching It in Production', '91-92', {
      topics: 'Trace live traffic | Requests, errors, typical and slowest latency, tokens, cost | Score live samples for quality | Listen to user signals | Spot drift | Alerts | Feed failures back into tests | Keep personal data out of traces',
      tryIt: 'Build a dashboard of requests, errors, latency, cost and a live quality score; trigger one alert on purpose and add three poorly rated answers to your test set.',
      outcome: 'You know how the app performs for real users and turn that into improvements.',
      quiz: quiz(['Users rephrasing the same question again and again signals…', 'Success', '*Poor answers', 'High cost', 'Caching'],
                 ['Why score samples of live traffic, not just your test set?', 'It is cheaper', '*Real questions drift away from your test set', 'Judges need it', 'The law requires it']),
    }),
    U('6.8', 'Cost, Speed and Scale', '93', {
      topics: 'Find where time and money go | Caching answers, prompts and search | Semantic caching and what must never be cached | Cheaper models for easy work | Do things in parallel | Per-user limits',
      tryIt: 'Add caching and route simple questions to a cheaper model; measure cost and latency before and after and confirm quality held.',
      outcome: 'Your app is faster and cheaper without getting worse, and you can prove it.',
      quiz: quiz(['Semantic caching returns a cached answer when…', 'The query is byte-identical', '*A new question means the same as an earlier one', 'The cache is empty', 'Always'],
                 ['Model routing sends…', 'Everything to the biggest model', '*Easy requests to cheap models and hard ones to strong models', 'Requests at random', 'Only cached requests']),
    }),
    U('6.9', 'Model Gateways and Managed Platforms', '94', {
      topics: 'One gateway for all models | Automatic failover to backup providers | Changing models is a release | Cloud AI platforms | Public API vs cloud platform vs self-hosting',
      tryIt: 'Put a gateway in front of two providers, make the main one fail, and confirm the backup answers within your latency limit.',
      outcome: 'You don\'t depend on a single provider, and you know when a cloud AI platform is the right call.',
      quiz: quiz(['A model gateway mainly…', 'Trains models', '*Sits between your app and providers: keys, usage tracking, failover', 'Stores embeddings', 'Renders the UI'],
                 ['Companies that can\'t send data to public APIs often use…', 'No AI', '*Their cloud provider\'s AI platform, inside their own account', 'Email', 'Browser extensions']),
    }),
    U('6.10', 'Serving Open Models Yourself', '95', {
      topics: 'Why host your own | The hosting ladder | Serving software like vLLM | Quantised models need less memory | Sizing GPU memory | Per token vs per hour | Cold starts',
      tryIt: 'Serve a small open model with vLLM or a GPU platform and compare quality, latency and cost per 1,000 requests with your hosted model.',
      outcome: 'You can decide when self-hosting is worth it and how to do it.',
      quiz: quiz(['Renting GPUs by the hour beats per-token pricing when…', 'Traffic is low and spiky', '*The GPUs are kept busy', 'You send one request a day', 'Always'],
                 ['vLLM is used to…', 'Label data', '*Serve many model requests efficiently', 'Fine-tune only', 'Build UIs']),
      extra: [DOCS.vllm],
    }),
    U('6.11', 'Should You Fine-Tune?', '96', {
      topics: 'What fine-tuning changes | Prompt first, RAG for knowledge, fine-tune last | When it wins | What it costs | Data is most of the work | Quality beats quantity | Keep a held-out set | Examples from a stronger model',
      tryIt: 'For a narrow task in your app, build 200 training and 50 held-out examples and measure your prompted model on the held-out set.',
      outcome: 'You can decide whether a task justifies fine-tuning, with a clean dataset and a fair baseline.',
      quiz: quiz(['Fine-tuning is a poor way to…', 'Teach a format', '*Add facts that change often', 'Teach a tone', 'Cut cost on a narrow task'],
                 ['You should never train on…', 'Clean data', '*Your test set', 'Conversation logs you have cleaned', 'Small datasets']),
    }),
    U('6.12', 'Fine-Tuning with LoRA', '97', {
      topics: 'Full vs lightweight tuning | QLoRA for less memory | Choosing a base model and licence | Tools: PEFT, Unsloth | Key settings | Watch for overfitting | Managed fine-tuning | Forgetting other skills',
      tryIt: 'Fine-tune a small open model with LoRA on your 200 examples using a free notebook GPU, tracking training and held-out results.',
      outcome: 'You can run a LoRA fine-tune, choose sensible settings and spot overfitting.',
      quiz: quiz(['LoRA trains…', 'All the weights', '*A small add-on while the base model stays frozen', 'Only the tokenizer', 'Only embeddings'],
                 ['Training results improve while held-out results get worse. This is…', 'Underfitting', '*Overfitting', 'Convergence', 'Distillation']),
      extra: [DOCS.peft, DOCS.unsloth],
    }),
    U('6.13', 'Evaluating, Serving and Distilling Fine-Tuned Models', '98', {
      topics: 'Beat the baseline or don\'t ship | Run the full regression suite | Compare cost and speed | Preference tuning (DPO) | Distillation | Merge or serve LoRA adapters | Treat it like any release',
      tryIt: 'Compare your tuned model with the prompted one on held-out accuracy, cost and latency; serve it, run your regression suite, and decide.',
      outcome: 'You prove with numbers whether a tuned or distilled model earns its place.',
      quiz: quiz(['Distillation means…', 'Compressing files', '*Training a small model on a strong model\'s answers for one task', 'Removing tokens', 'Deleting adapters'],
                 ['DPO learns from…', 'Unlabelled text', '*Pairs of better and worse answers', 'Images', 'Game rewards']),
    }),
    U('6.14', 'When Things Break', '99', {
      topics: 'Common incidents | Roll back, fail over, switch off, or investigate | Runbooks | Find the cause with traces and version records | Blameless reviews plus a new test',
      tryIt: 'Write runbooks for a provider outage and a sudden drop in answer quality, then simulate one and follow your runbook.',
      outcome: 'You respond to incidents calmly and make each less likely to happen again.',
      quiz: quiz(['A runbook is…', 'A training dataset', '*A short step-by-step guide for a known incident', 'A model card', 'A UI theme'],
                 ['After an incident you should…', 'Find someone to blame', '*Write a blameless review and add a test', 'Delete the traces', 'Switch providers forever']),
    }),
    U('6.15', 'Whole-App Security Review', '100', {
      topics: 'Threat-model the whole system | Secrets and personal data everywhere | Checks at every boundary | API and frontend: auth, limits, data leaks via links and images | A final red-team | The OWASP checklist one last time',
      tryIt: 'Run your full security suite against the deployed app, then try five new attacks on the API or frontend.',
      outcome: 'Your complete, deployed app is secure end to end, not just part by part.',
      quiz: quiz(['A whole-app threat model should cover…', 'Only the prompt', '*Frontend, API, RAG, agent, MCP, memory, models and logs', 'Only the database', 'Only the UI'],
                 ['Secrets should never appear in…', 'The secret store', '*Code, containers, logs, traces or test data', 'Environment variables', 'The host\'s vault']),
      extra: [DOCS.owasp],
    }),
  ],
}

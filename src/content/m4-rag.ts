import { DOCS, ROADMAP, quiz, unitFactory } from './helpers.ts'
import type { Module } from './types.ts'

const url = `${ROADMAP}/100-days/rag/`
const U = unitFactory(url)
const P1 = 'Part 1 · Build a simple RAG'
const P2 = 'Part 2 · Advanced RAG'
const P3 = 'Part 3 · Evaluating RAG'
const P4 = 'Part 4 · Securing a RAG app'

export const m4: Module = {
  id: 'rag', no: 4, title: 'RAG', level: 'Intermediate', url,
  blurb: 'Build, improve, evaluate and secure retrieval-augmented generation',
  units: [
    U('4.1', 'When to Use RAG', '25', {
      topics: 'The pipeline: question → find passages → add to prompt → answer | What RAG solves | When not to use it | Two kinds of failure: retrieval vs generation',
      tryIt: 'Send a long document whole with a question about it and note the tokens, cost and time.',
      outcome: 'You can decide whether a problem really needs RAG and explain each step of the pipeline.',
      quiz: quiz(['RAG mainly helps an LLM…', 'Run faster', '*Use private or fresh knowledge it wasn\'t trained on', 'Shrink its weights', 'Generate images'],
                 ['A wrong RAG answer can come from…', 'Only the model', '*Retrieving the wrong passages, or misusing the right ones', 'Only the embeddings', 'The UI']),
    }, P1),
    U('4.2', 'Loading and Cleaning Documents', '26-27', {
      topics: 'Document loaders for PDF, web and Word | Clean clutter but keep structure | Store title, source, section and date with the text | Handle duplicates, updates and deletions',
      tryIt: 'Load your three messiest documents and note every place where tables, headings or layout came out wrong.',
      outcome: 'You turn a real document collection into clean text with useful metadata, ready to search.',
      quiz: quiz(['Why store title, source and section with each document?', 'Decoration', '*For filtering and citations later', 'To raise cost', 'PDFs require it'],
                 ['When cleaning documents you should keep…', 'Repeated headers and footers', '*Headings, lists and tables that carry meaning', 'Only the first page', 'Page numbers only']),
    }, P1),
    U('4.3', 'Parsing Messy Documents', '28', {
      topics: 'Why basic loaders fail | Layout-aware parsers (Unstructured, Docling) | OCR or vision models for scans | Keep column headers with every table row | Spot-check extraction | Vision parsing is slower and pricier',
      tryIt: 'Parse your messiest PDF with a basic loader, a layout-aware parser and a vision model; compare one table and one multi-column page.',
      outcome: 'You turn messy real-world documents, including tables and scans, into text you can trust.',
      quiz: quiz(['Why is PDF parsing hard?', 'PDFs are encrypted', '*Layout is visual, so reading order and tables get scrambled', 'PDFs contain no text', 'Size limits'],
                 ['Keeping column headers with every extracted table row means…', 'It looks nicer', '*Each row still makes sense on its own', 'It is shorter', 'OCR can be skipped']),
      extra: [DOCS.docling, DOCS.unstructured],
    }, P1),
    U('4.4', 'Chunking', '29', {
      topics: 'Why split documents | Fixed size, paragraphs, sections or meaning | Size vs context, and overlap | Label each chunk with its title and section',
      tryIt: 'Split one document by fixed size and by its sections; judge five chunks from each for whether they make sense alone.',
      outcome: 'You choose a chunking approach that fits your documents and the questions people ask.',
      quiz: quiz(['Small chunks are…', 'Imprecise but full of context', '*Precise but may lack context', 'Always best', 'Never searchable'],
                 ['Chunk overlap helps when…', 'Documents are tiny', '*An idea would otherwise be cut in half at a boundary', 'You want fewer chunks', 'You use SQL']),
    }, P1),
    U('4.5', 'Embeddings and Semantic Search', '30-31', {
      topics: 'What an embedding is | Searching by meaning | Build a tiny search by hand first | Choosing an embedding model (incl. Hindi / mixed text) | Never mix embedding models | Where semantic search fails',
      tryIt: 'Search with a question in your own words and one containing an exact product name or code; compare results.',
      outcome: 'You can explain semantic search, choose an embedding model and predict where it will struggle.',
      quiz: quiz(['If you switch embedding models you must…', 'Do nothing', '*Re-embed the whole collection', 'Re-embed only new documents', 'Change the LLM'],
                 ['Semantic search often misses…', 'Paraphrases', '*Exact codes, IDs and rare names', 'Synonyms', 'Long questions']),
    }, P1),
    U('4.6', 'Vector Databases', '32-33', {
      topics: 'Store passages with embeddings and metadata (e.g. pgvector) | Search with filters | Why databases use approximate search | Add, update and delete without rebuilding',
      tryIt: 'Load all your passages and run the same question with and without a document-type filter.',
      outcome: 'Your whole collection lives in a vector database you can search quickly with filters.',
      quiz: quiz(['Vector databases use approximate search because…', 'It is more accurate', '*Comparing against every vector gets slow at scale', 'It is cheaper to store', 'Embeddings are approximate'],
                 ['pgvector adds vector search to…', 'MongoDB', '*PostgreSQL', 'Redis only', 'SQLite only']),
      extra: [DOCS.pgvector],
    }, P1),
    U('4.7', 'Your First RAG Pipeline', '34-35', {
      topics: 'One chain: question → passages → prompt → answer | Prompt for grounded answers | Handle weak search results | How many passages, in what order',
      tryIt: 'Ask five questions with 3 passages and with 10; compare answers, tokens and cost.',
      outcome: 'You have a working RAG pipeline that answers from your documents instead of whole files.',
      quiz: quiz(['More retrieved passages are…', 'Always better', '*Not always better: they add noise and cost', 'Free', 'Required for citations'],
                 ['If retrieval returns nothing relevant, the pipeline should…', 'Let the model guess', '*Handle it explicitly instead of answering anyway', 'Retry forever', 'Crash']),
    }, P1),
    U('4.8', 'Citations and Saying "I Don\'t Know"', '36', {
      topics: 'Answer from the evidence | Cite document and section | A citation must actually support the claim | Say when the answer isn\'t there | Keep evidence and explanation apart',
      tryIt: 'Ask three questions your documents can\'t answer, then verify five cited answers against their sources.',
      outcome: 'Your answers are verifiable, and your assistant admits when it doesn\'t know.',
      quiz: quiz(['Best response when the documents lack the answer?', 'Guess confidently', '*Say it isn\'t in the documents', 'Return raw chunks', 'Retry forever'],
                 ['A citation is only useful if…', 'It is long', '*The cited passage really supports the claim', 'It has a URL', 'It is in bold']),
    }, P1),

    U('4.9', 'Keyword and Hybrid Search', '37', {
      topics: 'Keyword search (BM25) still matters | Hybrid search runs both | Reciprocal rank fusion | When hybrid helps most',
      tryIt: 'Run five questions containing exact names or codes through semantic, keyword and hybrid search.',
      outcome: 'You add hybrid search and know which kinds of questions it helps.',
      quiz: quiz(['BM25 beats embeddings for…', 'Paraphrased questions', '*Exact terms like error codes or product IDs', 'Images', 'Translations'],
                 ['Reciprocal rank fusion merges results using…', 'Raw scores', '*Each result\'s position in each list', 'Embedding size', 'Document length']),
    }, P2),
    U('4.10', 'Smarter Chunks and Filters', '38', {
      topics: 'Search small, send big | Give each chunk a line of context | Keep tables whole and describe them | Pull filters out of the question',
      tryIt: 'For three questions naming a product, date or document type, compare plain search with filters extracted from the question.',
      outcome: 'Your chunks and filters let search find the right content and give the model enough of it.',
      quiz: quiz(['"Search small, send big" means…', 'Use tiny models', '*Match on small chunks, send the larger surrounding section', 'Always send whole documents', 'Search titles only'],
                 ['Extracting filters from the question means…', 'Asking the user to fill in a form', '*Having the model pull out things like product or date before searching', 'Removing stop words', 'Lowercasing the query']),
    }, P2),
    U('4.11', 'Reranking', '39', {
      topics: 'Retrieve wide, then rerank to a few | Rerankers read the question and passage together | The added time and cost | When it doesn\'t help',
      tryIt: 'For five poorly answered questions, compare the top 3 passages with and without reranking.',
      outcome: 'You add reranking and can explain what it improves and what it costs.',
      quiz: quiz(['A cross-encoder reranker scores…', 'Each document without the query', '*The query and a passage together', 'Only the query', 'Only titles'],
                 ['Why not rerank the entire collection?', 'It is inaccurate', '*It is too slow and costly per question', 'It needs no GPU', 'It has no API']),
    }, P2),
    U('4.12', 'Query Transformation', '40', {
      topics: 'Questions aren\'t always good search queries | Rewrite the question | Multiple queries | RAG-Fusion | HyDE: search with a draft answer | Break multi-part questions down | Weigh the extra cost',
      tryIt: 'Compare plain search, multiple queries and decomposition on three vague questions and one multi-part question.',
      outcome: 'You turn hard questions into searches that work, choosing the right technique per question.',
      quiz: quiz(['HyDE retrieves using…', 'The raw query only', '*A hypothetical answer written by the model', 'The user\'s history only', 'BM25 only'],
                 ['A multi-part question is best handled by…', 'One search', '*Splitting it into sub-questions, searching each, then combining', 'Raising temperature', 'Dropping parts']),
    }, P2),
    U('4.13', 'Routing and Adaptive RAG', '41', {
      topics: 'Not every question needs retrieval | Route to the right source | Adaptive RAG: choose effort per question | Save cost on easy questions',
      tryIt: 'Build a router that sends 20 questions to "answer directly", "simple search" or "transform and search", and check its choices.',
      outcome: 'Your RAG system adapts its effort to each question.',
      quiz: quiz(['A message like "thanks!" should usually…', 'Trigger full retrieval', '*Be answered directly without searching', 'Be reranked', 'Go to SQL'],
                 ['Adaptive RAG means…', 'Always using every technique', '*Choosing how much retrieval effort each question gets', 'Changing models daily', 'Routing at random']),
    }, P2),
    U('4.14', 'Self-Correcting RAG', '42', {
      topics: 'Corrective RAG: grade what you found | Self-RAG: check what you wrote | Multi-hop search | Retry limits | A first step toward agents',
      tryIt: 'Add a step that grades retrieved passages and retries with a rewritten query; test it on your five worst questions.',
      outcome: 'Your RAG notices bad retrieval or unsupported answers and corrects itself within a set limit.',
      quiz: quiz(['Corrective RAG first…', 'Fine-tunes the model', '*Grades the retrieved passages and searches again if they\'re weak', 'Skips retrieval', 'Adds more chunks blindly'],
                 ['Why cap self-correction retries?', 'APIs forbid retries', '*So hard questions can\'t loop forever or run up cost', 'To improve recall', 'For caching']),
    }, P2),
    U('4.15', 'RAG over Structured Data', '43', {
      topics: 'Vector search can\'t count, sum or filter well | Text-to-SQL | Give the model the schema, column descriptions and examples | Read-only, allow-listed, row-limited | Fix failed queries within a limit | Show the query | Route between documents and database',
      tryIt: 'Answer five count/total/filter questions with text-to-SQL and with document search, and compare.',
      outcome: 'You answer questions from databases accurately and safely, routing each to the right source.',
      quiz: quiz(['"How many orders were placed last month?" is best answered with…', 'Vector search', '*Text-to-SQL against the database', 'BM25', 'HyDE'],
                 ['A safe text-to-SQL setup uses…', 'Admin credentials', '*Read-only access, allowed tables and row limits', 'No validation', 'Write access for speed']),
    }, P2),
    U('4.16', 'Graph RAG and Choosing a Pattern', '44', {
      topics: 'What Graph RAG is | When it helps: relationships and whole-collection themes | What it costs | Choose patterns from your actual failures | More patterns isn\'t better',
      tryIt: 'Take every answer your simple pipeline got wrong and match it to the pattern most likely to fix it.',
      outcome: 'You know when Graph RAG is worth its cost, and you pick RAG patterns from your own failures.',
      quiz: quiz(['If the right passages are found but ranked too low, add…', 'Graph RAG', '*Reranking', 'Text-to-SQL', 'A bigger model'],
                 ['Graph RAG helps most with questions about…', 'Exact codes', '*Relationships and themes across the whole collection', 'Greetings', 'One fact in one passage']),
    }, P2),

    U('4.17', 'Why Evals, and Reading Your Failures', '45', {
      topics: '"It looks fine" isn\'t enough | AI testing uses example sets, not single checks | Read 20–30 answers and group the failures | Measure what actually fails | The evaluation loop',
      tryIt: 'Run 20 questions, write a one-line note on every wrong answer, and group them into 3–5 failure types.',
      outcome: 'You find your app\'s most common failures by reading its answers.',
      quiz: quiz(['The best first step to improve an LLM app is usually…', 'Switch models', '*Read real outputs and categorise the failures', 'Fine-tune', 'Add agents'],
                 ['Why test AI apps with sets of examples rather than single checks?', 'Tradition', '*Outputs vary and are often not simply right or wrong', 'It is cheaper', 'Frameworks require it']),
      extra: [DOCS.evals],
    }, P3),
    U('4.18', 'Test Sets and Scoring', '46-47', {
      topics: 'A golden test set: question, answer and source passage | Grow it with model suggestions you check by hand | Score with code, an LLM judge, or your own review | With or without an answer key | Ask the judge for pass/fail on one question | Check the judge against your own scores',
      tryIt: 'Write a judge for "is this answer supported by its passages?", score 20 answers yourself and with the judge, and count agreement.',
      outcome: 'You have a golden test set and score answers with code checks and a judge you\'ve verified.',
      quiz: quiz(['A good LLM judge is usually asked for…', 'A score out of 100', '*Pass or fail on one clear question', 'A rewrite', 'Its opinion of the user'],
                 ['Before trusting an LLM judge you should…', 'Use the biggest model', '*Check how often it agrees with your own labels', 'Hide the rubric', 'Raise the temperature']),
      extra: [DOCS.evals],
    }, P3),
    U('4.19', 'Measuring Retrieval', '48', {
      topics: 'Test search on its own | Recall@k | Precision | Compare choices fairly on the same test set',
      tryIt: 'Measure Recall@5 for semantic search, hybrid search, and hybrid search with reranking.',
      outcome: 'You measure whether search finds what users need, and which Part 2 techniques actually helped.',
      quiz: quiz(['Recall@5 measures…', 'Answer fluency', '*How often a relevant passage is in the top 5 results', 'Latency', 'Token cost'],
                 ['If retrieval misses the right passage…', 'A better prompt will fix it', '*No prompt can fix the answer', 'The judge will catch it', 'Lower temperature helps']),
    }, P3),
    U('4.20', 'Evaluating RAG Answers', '49-50', {
      topics: 'Test each part, then the whole | Test the model alone with the correct passages | The three core checks: relevant passages, supported answer, answers the question | Blame retrieval, prompt or model | What users care about | Cost and speed per question | Tools: DeepEval, RAGAS',
      tryIt: 'Score your test set on the three core checks, and decide for your five worst answers whether search, prompt or model was at fault.',
      outcome: 'You evaluate RAG part by part and pinpoint where each failure comes from.',
      quiz: quiz(['Faithfulness checks…', 'Grammar', '*Whether the answer is supported by the retrieved passages', 'Retrieval speed', 'Chunk size'],
                 ['If the model fails even when given the correct passages, the problem is…', 'Retrieval', '*Generation: the prompt or the model', 'The vector database', 'Chunk overlap']),
      extra: [DOCS.ragas, DOCS.deepeval],
    }, P3),
    U('4.21', 'Automatic Regression Tests', '51', {
      topics: 'Store questions, prompts, settings, model versions and results together | Compare against a baseline | Run on every change | Add every new failure | Watch quality, cost and speed together',
      tryIt: 'Set up one command that fails when the score drops below baseline, then make your prompt worse on purpose and confirm it fails.',
      outcome: 'You can\'t make your app worse without noticing.',
      quiz: quiz(['Every change should be judged against…', 'Nothing', '*The current best baseline', 'A random older version', 'The judge\'s mood'],
                 ['When you find a new failure in the wild you should…', 'Ignore it', '*Add it to the test set', 'Delete the logs', 'Switch models']),
    }, P3),

    U('4.22', 'Threats to a RAG App', '52', {
      topics: 'Where untrusted text gets in | Documents are data, never instructions | Model output is untrusted too | The OWASP Top 10 for LLM Applications',
      tryIt: 'Sketch how data flows through your assistant; mark every point where untrusted text enters and every action that could cause harm.',
      outcome: 'You map where your RAG app can be attacked before deciding how to defend it.',
      quiz: quiz(['Retrieved documents should be treated as…', 'Trusted instructions', '*Untrusted data', 'System prompts', 'Code'],
                 ['The OWASP Top 10 for LLM Applications is…', 'A model leaderboard', '*A checklist of common risks in LLM apps', 'A prompt library', 'A vector database']),
      extra: [DOCS.owasp],
    }, P4),
    U('4.23', 'Hidden Instructions and Poisoned Documents', '53', {
      topics: 'Direct vs indirect injection | Poisoned documents | Leaking data through links and images | Defences that live in code | Why "ignore malicious instructions" fails',
      tryIt: 'Add three planted documents (one changes answers, one triggers a tool it shouldn\'t, one leaks the question via a link) and see which succeed.',
      outcome: 'You recognise injection through documents and defend against it with controls in code.',
      quiz: quiz(['Indirect prompt injection arrives through…', 'The system prompt', '*Retrieved documents, web pages or files', 'The API key', 'The tokenizer'],
                 ['A markdown image whose URL contains the user\'s question can…', 'Speed up rendering', '*Leak data to an outside server when displayed', 'Improve citations', 'Cache answers']),
    }, P4),
    U('4.24', 'Who Can See What', '54', {
      topics: 'Store access rights with every passage | Filter during search, not after | Keep teams and customers apart | Leaks through caches, memory and citations',
      tryIt: 'As two users with different access, ask a question only a restricted document can answer; check both the answers and the citations.',
      outcome: 'Your RAG app shows each user only the information they\'re allowed to see.',
      quiz: quiz(['Permission filtering should happen…', 'After generation', '*During retrieval, so restricted passages never reach the model', 'In the UI only', 'Never'],
                 ['Which can leak restricted information even with filtered search?', 'Nothing', '*Shared caches, memory and citation titles', 'The tokenizer', 'Temperature']),
    }, P4),
    U('4.25', 'Personal Data and Secrets', '55', {
      topics: 'Scan for personal data and secrets before indexing | Remove or mask what you don\'t need | Keep it out of logs, traces, caches and test sets | Deleting means everywhere | Your provider\'s data terms; India\'s DPDP Act',
      tryIt: 'Scan your documents and recent logs for phone numbers, emails and anything that looks like a key or password.',
      outcome: 'Personal data and secrets stay out of your index, logs and test sets, and can be removed completely.',
      quiz: quiz(['When should personal data be removed or masked?', 'After users complain', '*Before it goes into the index', 'Never', 'Only in production'],
                 ['Properly deleting a document means removing it from…', 'The index only', '*The index, caches, logs and test sets', 'The UI only', 'Nowhere']),
    }, P4),
    U('4.26', 'Red-Teaming Your RAG', '56', {
      topics: 'Attack your own app systematically | Input and output checks as one extra layer | Measure how often attacks succeed | Every successful attack becomes a test | Security vs quality',
      tryIt: 'Write 15 attacks across injection, poisoned documents, permissions and data extraction; fix what you can and run them again.',
      outcome: 'You test your defences like an attacker and turn findings into permanent tests.',
      quiz: quiz(['Red-teaming means…', 'Painting the UI red', '*Deliberately trying to make your system misbehave', 'Load testing', 'Code review'],
                 ['After fixing an attack that worked you should…', 'Forget it', '*Add it to the regression suite', 'Delete the logs', 'Lower the temperature']),
      extra: [DOCS.owasp],
    }, P4),
  ],
}

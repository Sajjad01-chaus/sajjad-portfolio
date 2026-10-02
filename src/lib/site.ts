/**
 * Single source of truth for all site content.
 * Keeps section components presentational and easy to scan.
 */

export const profile = {
  name: "Sajjad Chaus",
  tagline: "AI/ML Engineer · agentic systems & backend infrastructure",
  photo: "/sajjad.jpg",
  resume: "/Sajjad_resume.pdf",
};

export const links = {
  github: "https://github.com/Sajjad01-chaus",
  githubUser: "Sajjad01-chaus",
  linkedin: "https://www.linkedin.com/in/sajjad-chaus-541b89258",
  email: "chaussajjad@gmail.com",
};

export const experience = [
  {
    role: "ML Engineer — Internship",
    company: "Matrice AI",
    location: "Remote, India",
    period: "Dec 2025 – Feb 2026",
    summary:
      "Built real-time computer-vision pipelines for customer analytics on live video streams.",
    bullets: [
      "Engineered core CV pipelines for customer analytics, cutting latency ~15% on real-time streams.",
      "Fine-tuned custom YOLO models (JointBDOE) and accelerated inference with TensorRT for real-time streaming.",
      "Prototyped a Smart People Counter with YOLOv11s, reaching 0.92 mAP on high-density mall datasets.",
    ],
    stack: ["YOLOv11", "TensorRT", "PyTorch", "Computer Vision", "Python"],
  },
  {
    role: "AI/ML Engineer — Internship",
    company: "EngageOS.ai",
    location: "Remote, India",
    period: "May – Sept 2025",
    summary:
      "Led end-to-end development of an AI Agent-as-a-Service platform for multi-channel, 24/7 autonomous customer engagement.",
    bullets: [
      "Architected a scalable backend with FastAPI + LangGraph handling 1,000+ concurrent agent requests at 99.9% uptime and <3s median response.",
      "Built high-performance RAG pipelines (Qdrant vector DB + Redis caching) cutting retrieval latency ~70%.",
      "Designed proactive + reactive agent logic to reduce operational cost.",
    ],
    stack: ["FastAPI", "LangGraph", "Qdrant", "Redis", "Python"],
  },
];

/** Headline numbers for the hero strip. Every value is checkable: GitHub, live links, benchmarks. */
export const stats = [
  { value: "100×", label: "throughput gain, benchmarked" },
  { value: "7", label: "live demos, open now" },
  { value: "48", label: "public repositories" },
  { value: "2", label: "AI/ML internships" },
];

/** How I build: three habits, each with a receipt from a real project. */
export const principles = [
  {
    title: "Measure, then claim",
    receipt: "8 msg/s → 770 msg/s",
    body: "Before rewriting my monitoring platform, I load-tested it with a simulated fleet and found the real bottleneck: an ML model retrained on every message. Every number on this page comes from a reproducible benchmark or an evaluation set.",
    link: "#projects",
  },
  {
    title: "Design for failure",
    receipt: "0 of 9,296 messages lost",
    body: "I killed a worker while it was holding unacknowledged messages, on purpose, to prove recovery works. At-least-once delivery plus idempotent writes means crashes and retries never corrupt data.",
    link: "#projects",
  },
  {
    title: "Grounded, or it refuses",
    receipt: "100% out-of-scope refusal",
    body: "My RAG systems cite their sources and decline what the documents can't answer, instead of inventing it. Retrieval is tuned against labelled question sets, not vibes.",
    link: "#projects",
  },
];

export type Domain = "Distributed systems" | "Agents & LLMs" | "RAG" | "ML & data";
export const domains: Domain[] = ["Distributed systems", "Agents & LLMs", "RAG", "ML & data"];

export type Metric = { value: string; label: string };

export type Project = {
  title: string;
  domain: Domain;
  /** shown on the large cards at the top */
  featured?: boolean;
  /** rendered as a "Next.js / TypeScript / …" line under the title */
  stack: string[];
  description: string;
  /** 2–4 measured or verifiable numbers, shown as chips */
  metrics?: Metric[];
  /** screenshot at /public/projects/<file> */
  image?: string;
  repo?: string;
  live?: string;
};

const gh = (repo: string) => `https://github.com/Sajjad01-chaus/${repo}`;

export const projects: Project[] = [
  {
    title: "Distributed System Monitoring & Auto-Remediation Platform",
    domain: "Distributed systems",
    featured: true,
    stack: ["FastAPI", "Redis Streams", "TimescaleDB", "nginx", "Docker", "Next.js", "Grafana"],
    description:
      "Agents stream OS telemetry through an nginx-balanced fleet of API replicas into a Redis Streams pipeline: consumer-group workers persist it idempotently and run per-agent anomaly detection, with crash recovery, dead-letter queues, leader-elected liveness and cross-replica command routing. Benchmarked from an 8 msg/s prototype to 770 msg/s, every step measured against a simulated fleet.",
    metrics: [
      { value: "770 msg/s", label: "sustained, ~100× baseline" },
      { value: "0 lost", label: "when a worker crashes" },
      { value: "0%", label: "false alarms on healthy hosts" },
      { value: "82", label: "automated tests" },
    ],
    live: "https://system-monitoring-platform.vercel.app",
    repo: gh("Distributed-System-Monitoring-AI-platform"),
  },
  {
    title: "Nyaya — Legal RAG for BNSS 2023",
    domain: "RAG",
    featured: true,
    stack: ["FastAPI", "Qdrant", "PostgreSQL", "Redis", "Groq", "Docker"],
    description:
      "A production-style legal assistant for India's new criminal procedure code (BNSS 2023). Answers with exact section citations, verifies quotes against the statute, and refuses questions outside the act instead of guessing. Evaluated on a 35-question golden set.",
    metrics: [
      { value: "100%", label: "recall@5" },
      { value: "100%", label: "citation accuracy" },
      { value: "100%", label: "out-of-scope refusal" },
      { value: "0%", label: "false refusals" },
    ],
    live: "https://nyaya-your-legal-assistant.vercel.app",
    repo: gh("Nyaya---your-legal-assistant"),
  },
  {
    title: "The Desk — AI Newsroom",
    domain: "Agents & LLMs",
    featured: true,
    stack: ["Python", "FastAPI", "LLMs", "Embeddings", "RBAC"],
    description:
      "A working news desk: sixty-odd raw items a day, worded differently by different sources, are resolved into single events with a six-signal similarity model, drafted into grounded briefs with sources, then pass a reporter and an editor before publishing exactly once. A desk-head view tracks what went out and how fast.",
    metrics: [
      { value: "6", label: "signals in event resolution" },
      { value: "2-step", label: "reporter → editor review" },
      { value: "1×", label: "publish per event" },
    ],
    live: "https://the-desk-news-ai-system.vercel.app",
    repo: gh("The-Desk---NewsAI-system"),
  },
  {
    title: "Freight Rate Prediction",
    domain: "ML & data",
    featured: true,
    stack: ["Python", "LightGBM", "XGBoost", "Time-series CV"],
    description:
      "Predicts truckload rates from lane, equipment, weight, date and a market index. Trained on 48,000 loads, then scored on 12,000 loads from later, unseen months, cutting error by almost two thirds against the rate-card baseline.",
    metrics: [
      { value: "1.50%", label: "MAPE (baseline 4.15%)" },
      { value: "$35.64", label: "MAE (baseline $96)" },
      { value: "12,000", label: "unseen loads scored" },
    ],
    repo: gh("Freight-Rate-Prediction"),
  },
  {
    title: "Clause — Contract Q&A with Analytics",
    domain: "RAG",
    featured: true,
    stack: ["FastAPI", "React", "BM25 + dense", "RRF", "SQL"],
    description:
      "Q&A over the AWS Customer Agreement with clause-level citations. Hybrid retrieval tuned with a measured bake-off, heading-aware chunking, a two-layer anti-hallucination guard, and a SQL-backed analytics dashboard with p95 latency and declined queries.",
    metrics: [
      { value: "0.917", label: "hit@k on a hard set" },
      { value: "0.772", label: "MRR" },
      { value: "24", label: "hard eval questions" },
    ],
    repo: gh("Vestaff_Clause"),
  },
  {
    title: "MediTranslate",
    domain: "Agents & LLMs",
    featured: true,
    stack: ["React", "FastAPI", "WebSockets", "Groq Whisper", "PostgreSQL"],
    description:
      "Real-time doctor–patient translation with a full voice pipeline: speak in one language, the other side hears it in theirs, plus AI medical summaries of each conversation.",
    metrics: [{ value: "20", label: "languages" }, { value: "Live", label: "voice pipeline" }],
    image: "/projects/meditranslate.png",
    live: "https://health-care-assistant-system.vercel.app/",
    repo: gh("HealthCare_Assistant_System"),
  },
  {
    title: "Dodge — Graph-Based Data Modeling & Query",
    domain: "Agents & LLMs",
    stack: ["Neo4j", "PostgreSQL", "FastAPI", "Groq", "Cytoscape.js"],
    description:
      "Turns SAP Order-to-Cash data into a graph of connected business entities, visualised interactively, with a natural-language query interface guarded against unsafe queries.",
    live: "https://dodge-graph-based-data-modeling-que.vercel.app",
    repo: gh("Dodge---Graph-Based-Data-Modeling-Query-System"),
  },
  {
    title: "Guided Component Architect",
    domain: "Agents & LLMs",
    stack: ["LangGraph", "Pydantic", "Angular", "TypeScript"],
    description:
      "A LangGraph state machine that turns plain-English requests into Angular components that obey a design system: injection guard, schema and TypeScript validation, design-token checks and a critic agent with bounded self-correction.",
    live: "https://guided-component-architect-khaki.vercel.app",
    repo: gh("Guided_Component_Architect"),
  },
  {
    title: "Spacez — Caretaker Review Intelligence",
    domain: "Agents & LLMs",
    stack: ["FastAPI", "React", "Llama 3.3 70B", "Pandas"],
    description:
      "Reads villa reviews from Airbnb, Booking.com and Google and builds a fair per-caretaker scorecard. The analysis found only ~19% of complaints were within a caretaker's control; the rest are routed to Operations instead of being scored against the host.",
    metrics: [{ value: "~19%", label: "complaints caretaker-controllable" }, { value: "3", label: "review platforms" }],
    live: "https://spacez-agent.vercel.app",
    repo: gh("Spacez_Agent"),
  },
  {
    title: "FinAgent — Configurable Research Agent",
    domain: "Agents & LLMs",
    stack: ["MCP", "Python", "Streamlit", "REST", "SQLite"],
    description:
      "One financial research agent, three analyst personas (mutual fund, equity, PE) across three sectors. Its facts come only from a provenance-carrying database behind an MCP server, a hard boundary between reasoning and data.",
    metrics: [{ value: "9", label: "persona × sector configs" }, { value: "398", label: "sector benchmark rows" }],
    repo: gh("Fin_3_in_1_Agent"),
  },
  {
    title: "Cyber Ireland — Multi-Agent Autonomous RAG",
    domain: "RAG",
    stack: ["LangGraph", "BM25 + BGE", "Cross-encoder", "FastAPI", "Groq"],
    description:
      "Turns a national industry report into a queryable knowledge system: hybrid retrieval with re-ranking, Corrective-RAG and Self-RAG loops, and tool-based maths for forecasting questions.",
    repo: gh("Cyber-Ireland-Auto-RAG"),
  },
  {
    title: "NovaML — Multi-Agent Data Science Platform",
    domain: "Agents & LLMs",
    stack: ["LangGraph", "LangChain", "Python", "Groq", "Streamlit"],
    description:
      "A 6-agent LangGraph system that automates the data-science pipeline from ingestion to model selection, with a human-in-the-loop approval gate before execution resumes.",
    metrics: [{ value: "6", label: "cooperating agents" }],
    image: "/projects/novaml.png",
    repo: gh("NovaML-Multi-Agent-Data-science-platform-"),
  },
  {
    title: "Claim Processing Pipeline",
    domain: "Agents & LLMs",
    stack: ["FastAPI", "LangGraph", "Groq Vision", "PyMuPDF", "Streamlit"],
    description:
      "A multi-agent pipeline that ingests medical-claim PDFs, classifies each page with a multimodal LLM, and extracts structured data into clean JSON.",
    image: "/projects/claim-pipeline.png",
    repo: gh("Claim-Processing-Pipeline"),
  },
  {
    title: "Troopod — Ad-to-Landing Personalization",
    domain: "Agents & LLMs",
    stack: ["Groq Vision", "Llama 4 Scout", "FastAPI", "SSE"],
    description:
      "Turns an ad creative into a personalised landing page: vision analysis maps the ad, then an LLM rewrites the page copy for conversion, streamed live.",
    image: "/projects/troopod.png",
    repo: gh("Magic_Page"),
  },
  {
    title: "Binance Market Anomaly Triage Agent",
    domain: "Agents & LLMs",
    stack: ["Python", "LLMs", "Structured outputs"],
    description:
      "A priority-aware triage agent for high-frequency market alerts: it scores each event LOW, MEDIUM or HIGH and decides whether to ignore it, alert an analyst or act.",
    repo: gh("Binance-Market-Anomaly-Triage-Agent-"),
  },
  {
    title: "Swiggy Annual Report Assistant",
    domain: "RAG",
    stack: ["FAISS", "LangChain", "Python", "Table extraction"],
    description:
      "Audit-grade RAG over Swiggy's FY2024–25 annual report: text and table extraction, chunking and embeddings for precise financial answers.",
    repo: gh("Swiggy_Finance_RAG_bot"),
  },
  {
    title: "Energy Demand Forecasting",
    domain: "ML & data",
    stack: ["TensorFlow", "Keras", "BiLSTM", "Attention"],
    description: "24-hour-ahead energy demand forecasting with a bidirectional LSTM and an attention layer.",
    repo: gh("Energy-Demand-Forcasting-using-BiLSTM-with-attention"),
  },
];

/** `color` is the brand hex used to tint the icon. Dark/colorless brands fall
 *  back to a light gray at render time so they stay legible on the dark theme. */
export type StackItem = { name: string; slug?: string; color?: string };

export const techStack: { group: string; items: StackItem[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", slug: "python", color: "#4B8BBE" },
      { name: "Java", slug: "openjdk", color: "#ED8B00" },
      { name: "SQL", slug: "mysql", color: "#00A8C6" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    ],
  },
  {
    group: "AI / ML",
    items: [
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
      { name: "OpenCV", slug: "opencv", color: "#5C3EE8" },
      { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
      { name: "Keras", slug: "keras", color: "#D00000" },
      { name: "LangGraph", slug: "langgraph" },
      { name: "LangChain", slug: "langchain" },
      { name: "scikit-learn", slug: "scikitlearn", color: "#F7931E" },
      { name: "Pandas", slug: "pandas", color: "#B36BE2" },
      { name: "NumPy", slug: "numpy", color: "#4DABCF" },
      { name: "Matplotlib", slug: "matplotlib" },
      { name: "Seaborn", slug: "seaborn" },
      { name: "Plotly", slug: "plotly", color: "#636EFA" },
      { name: "Streamlit", slug: "streamlit", color: "#FF4B4B" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "FastAPI", slug: "fastapi", color: "#11A89B" },
      { name: "Flask", slug: "flask" },
      { name: "Celery", slug: "celery", color: "#5BB85B" },
      { name: "REST", slug: "rest" },
      { name: "WebSockets", slug: "websockets" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react", color: "#61DAFB" },
      { name: "nginx", slug: "nginx", color: "#009639" },
    ],
  },
  {
    group: "Data & Infra",
    items: [
      { name: "PostgreSQL", slug: "postgresql", color: "#5A8FE6" },
      { name: "MySQL", slug: "mysql", color: "#00A8C6" },
      { name: "Redis", slug: "redis", color: "#FF4438" },
      { name: "Qdrant", slug: "qdrant", color: "#E0457B" },
      { name: "TimescaleDB", slug: "timescale", color: "#FDB515" },
      { name: "Neo4j", slug: "neo4j", color: "#4581C3" },
      { name: "FAISS", slug: "faiss" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Grafana", slug: "grafana", color: "#F46800" },
      { name: "GitHub Actions", slug: "githubactions", color: "#2088FF" },
      { name: "Git / GitHub", slug: "github" },
    ],
  },
];

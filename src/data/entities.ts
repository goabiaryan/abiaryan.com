import { site } from "./site";

export const author = {
  name: site.name,
  role: "AI Infrastructure Engineer",
  focus: [
    "LLM inference",
    "GPU engineering",
    "distributed systems",
    "LLMOps",
    "Joule",
    "inference power economics engine",
    "Maven",
    "vLLM",
    "SGLang",
    "KV cache",
  ],
  url: `${site.url}/about/`,
  sameAs: [
    site.links.linkedin,
    site.links.github,
    site.links.x,
    site.links.youtube,
    site.links.modelcraft,
    site.links.mavenProfile,
    site.links.joule,
    site.links.gpuengineering,
    site.links.academy,
  ],
};

export const topics: Record<string, { href: string; note: string }> = {
  "LLM inference": {
    href: "/writing/llm-inference/",
    note: "Serving path from request to tokens: engines, KV cache, batching, SLOs.",
  },
  "GPU engineering": {
    href: "/writing/pmpp-notes/",
    note: "Execution model, memory hierarchy, kernels, and why the hardware lies.",
  },
  "distributed systems": {
    href: "/writing/kv-needs-a-phone-book/",
    note: "Routing, locality, leases, and multi-node inference.",
  },
  "inference observability": {
    href: "/writing/eighty-busy-still-slow/",
    note: "TTFT, TPOT, goodput, KV pressure, not process uptime.",
  },
  "KV cache": {
    href: "/writing/kv-needs-a-phone-book/",
    note: "The key-value attention cache as a first-class resource.",
  },
  "queueing": {
    href: "/writing/eighty-busy-still-slow/",
    note: "Utilization, wait time, and why the GPU looking busy is not the SLO.",
  },
  "inference careers": {
    href: "/writing/job-that-didnt-exist/",
    note: "The inference engineering role and how to learn the stack.",
  },
  LLMOps: {
    href: "/writing/job-that-didnt-exist/",
    note: "Operations after the demo: evals, cost, serving, not just training pipelines.",
  },
};

export const projects: Record<string, { href: string; note: string; kind: string }> = {
  Joule: {
    href: site.links.joule,
    note: "Joule is an inference power economics engine that ties physical GPU energy to token throughput and SLO goodput.",
    kind: "Company",
  },
  RelayServe: {
    href: "https://github.com/goabiaryan/RelayServe",
    note: "Minimal LLM inference gateway: OpenAI-compatible chat, batching, streaming, request IDs, /metrics.",
    kind: "Serving",
  },
  "smol-vLLM": {
    href: "https://github.com/goabiaryan/smol_vllm",
    note: "Educational paged-attention engine: KV cache, continuous batching, prefill vs decode.",
    kind: "Engine",
  },
  "gpuengineering.com": {
    href: site.links.gpuengineering,
    note: "Public GPU engineering curriculum and reading list.",
    kind: "Curriculum",
  },
  "fullstack-inferencing": {
    href: "https://github.com/goabiaryan/fullstack-inferencing",
    note: "vLLM lab on Lambda: gateway, metrics, engine flags, cost.",
    kind: "Lab",
  },
  AbideX: {
    href: "https://github.com/abide-ai/abidex",
    note: "OpenTelemetry monitoring for agent workflows.",
    kind: "Observability",
  },
};

export const course = {
  title: "AI Inference Engineering & Systems Design",
  href: site.links.maven,
  note: "Highly rated Maven masterclass for mid-to-senior engineers. Eight weeks. Build the stack by hand.",
};

export const books = {
  LLMOps: {
    title: "LLMOps",
    href: site.links.llmops,
    note: "O'Reilly book. Written in English, now translated into Korean, Japanese, Russian, and Simplified Chinese.",
  },
  "What is LLMOps": {
    title: "What is LLMOps",
    href: site.links.llmopsWhat,
    note: "O'Reilly report. A separate brief from the LLMOps book.",
  },
  "GPU Engineering: AI Inference and System Design": {
    title: "GPU Engineering: AI Inference and System Design",
    href: "/books/",
    note: "Packt. Almost done. Slated for late 2026 to early 2027.",
  },
};

export const researchLinks = {
  "Causal Reflection with Language Models": {
    href: site.links.causalReflection,
    note: "NeurIPS 2025 Efficient Reasoning Workshop. arXiv:2508.04495.",
  },
  AbideGym: {
    href: site.links.abideGym,
    note: "arXiv:2509.21234.",
  },
  "The Costly Dilemma": {
    href: site.links.costlyDilemma,
    note: "arXiv:2308.08061.",
  },
};

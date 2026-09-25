export type Build = {
  title: string;
  href: string;
  kind: string;
  note: string;
  keywords: string[];
};

export const builds: Build[] = [
  {
    title: "Joule",
    href: "https://joule.lat/",
    kind: "Company",
    note: "Founder. Joule is an inference power economics engine that ties physical GPU energy to token throughput and SLO goodput.",
    keywords: ["Joule", "joule.lat", "inference power economics engine", "physical GPU energy", "token throughput", "SLO goodput", "phase-aware inference", "power economics", "digital twin"],
  },
  {
    title: "gpuengineering.com",
    href: "https://gpuengineering.com/",
    kind: "Curriculum",
    note: "The public list behind the domain: CUDA, kernels, serving engines, multi-GPU systems. ~600 stars as awesome-gpu-engineering.",
    keywords: ["gpuengineering.com", "awesome-gpu-engineering", "CUDA", "kernels", "serving engines", "multi-GPU systems"],
  },
  {
    title: "RelayServe",
    href: "https://github.com/goabiaryan/RelayServe",
    kind: "Serving",
    note: "Minimal LLM inference gateway for heterogeneous devices. OpenAI-compatible chat, batching, streaming, request IDs, /metrics. On PyPI as relayserve.",
    keywords: ["RelayServe", "relayserve", "LLM inference gateway", "heterogeneous devices", "OpenAI-compatible", "chat", "batching", "streaming", "request IDs", "/metrics", "PyPI"],
  },
  {
    title: "smol-vllm",
    href: "https://github.com/goabiaryan/smol_vllm",
    kind: "Engine",
    note: "Educational paged-attention engine: KV cache, continuous batching, preemption, prefill vs decode. Built to be read, not shipped as production vLLM.",
    keywords: ["smol-vllm", "smol_vllm", "paged-attention", "KV cache", "continuous batching", "preemption", "prefill", "decode", "vLLM"],
  },
  {
    title: "fullstack-inferencing",
    href: "https://github.com/goabiaryan/fullstack-inferencing",
    kind: "Lab / Lambda",
    note: "vLLM on Lambda Cloud, FastAPI gateway, nginx, Prometheus, Grafana, optional Jaeger. Documents engine-flag limits, cost metrics, and Lambda image caveats.",
    keywords: ["fullstack-inferencing", "vLLM", "Lambda Cloud", "FastAPI", "nginx", "Prometheus", "Grafana", "Jaeger", "engine-flag limits", "cost metrics"],
  },
  {
    title: "AbideX",
    href: "https://github.com/abide-ai/abidex",
    kind: "Observability",
    note: "Zero-code OpenTelemetry monitoring for agent workflows (CrewAI, LangGraph, Pydantic AI). The Abide-era observability product.",
    keywords: ["AbideX", "OpenTelemetry", "agent workflows", "CrewAI", "LangGraph", "Pydantic AI", "observability"],
  },
  {
    title: "awesome-observability",
    href: "https://github.com/goabiaryan/awesome-observability",
    kind: "Observability",
    note: "Curated tools and frameworks for LLM observability.",
    keywords: ["awesome-observability", "LLM observability", "tracing", "metrics"],
  },
  {
    title: "llm-cluster-simulator",
    href: "https://github.com/goabiaryan/llm-cluster-simulator",
    kind: "Systems",
    note: "Browser simulator for distributed LLM training and inference: memory, throughput, cost, parallelism.",
    keywords: ["llm-cluster-simulator", "distributed LLM", "training", "inference", "memory", "throughput", "cost", "parallelism"],
  },
  {
    title: "ai-infra-fragility",
    href: "https://github.com/goabiaryan/ai-infra-fragility",
    kind: "Thesis",
    note: "Code for Cascading Fragility in National AI Infrastructure, market structure, exposure, network models. Submitting to AI & Society (Springer).",
    keywords: ["ai-infra-fragility", "Cascading Fragility", "national AI infrastructure", "market structure", "exposure", "network models", "AI & Society"],
  },
];

export const courseLabs: Build[] = [
  {
    title: "nexus-workshop-code",
    href: "https://github.com/goabiaryan/nexus-workshop-code",
    kind: "Workshop",
    note: "Packt Nexus: build a first agent / multi-agent system with CrewAI, roles, tasks, orchestration.",
    keywords: ["nexus-workshop-code", "Packt Nexus", "CrewAI", "multi-agent", "roles", "tasks", "orchestration"],
  },
  {
    title: "inferencing_maven",
    href: "https://github.com/goabiaryan/inferencing_maven",
    kind: "Course",
    note: "Labs for the Maven inference engineering cohort.",
    keywords: ["inferencing_maven", "Maven", "inference engineering", "labs"],
  },
  {
    title: "class-code",
    href: "https://github.com/goabiaryan/class-code",
    kind: "Course",
    note: "Class exercises that sit next to RelayServe and the serving labs.",
    keywords: ["class-code", "RelayServe", "serving labs"],
  },
  {
    title: "concurrency",
    href: "https://github.com/goabiaryan/concurrency",
    kind: "Course",
    note: "Concurrency exercises for inference workloads.",
    keywords: ["concurrency", "inference workloads"],
  },
  {
    title: "ray_project",
    href: "https://github.com/goabiaryan/ray_project",
    kind: "Course",
    note: "Student exercise on concurrency and profiling with Ray.",
    keywords: ["ray_project", "Ray", "concurrency", "profiling"],
  },
];

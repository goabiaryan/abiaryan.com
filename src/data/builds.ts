export type Build = {
  title: string;
  href: string;
  kind: string;
  note: string;
};

export const builds: Build[] = [
  {
    title: "Joule",
    href: "https://joule.lat/",
    kind: "Company",
    note: "Founder. Phase-aware inference power economics, the product sitting at tokens, watts, and serving cost.",
  },
  {
    title: "gpuengineering.com",
    href: "https://gpuengineering.com/",
    kind: "Curriculum",
    note: "The public list behind the domain: CUDA, kernels, serving engines, multi-GPU systems. ~600 stars as awesome-gpu-engineering.",
  },
  {
    title: "RelayServe",
    href: "https://github.com/goabiaryan/RelayServe",
    kind: "Serving",
    note: "Minimal LLM inference gateway for heterogeneous devices. OpenAI-compatible chat, batching, streaming, request IDs, /metrics. On PyPI as relayserve.",
  },
  {
    title: "smol-vllm",
    href: "https://github.com/goabiaryan/smol_vllm",
    kind: "Engine",
    note: "Educational paged-attention engine: KV cache, continuous batching, preemption, prefill vs decode. Built to be read, not shipped as production vLLM.",
  },
  {
    title: "fullstack-inferencing",
    href: "https://github.com/goabiaryan/fullstack-inferencing",
    kind: "Lab / Lambda",
    note: "vLLM on Lambda Cloud, FastAPI gateway, nginx, Prometheus, Grafana, optional Jaeger. Documents engine-flag limits, cost metrics, and Lambda image caveats.",
  },
  {
    title: "AbideX",
    href: "https://github.com/abide-ai/abidex",
    kind: "Observability",
    note: "Zero-code OpenTelemetry monitoring for agent workflows (CrewAI, LangGraph, Pydantic AI). The Abide-era observability product.",
  },
  {
    title: "awesome-observability",
    href: "https://github.com/goabiaryan/awesome-observability",
    kind: "Observability",
    note: "Curated tools and frameworks for LLM observability.",
  },
  {
    title: "llm-cluster-simulator",
    href: "https://github.com/goabiaryan/llm-cluster-simulator",
    kind: "Systems",
    note: "Browser simulator for distributed LLM training and inference: memory, throughput, cost, parallelism.",
  },
  {
    title: "ai-infra-fragility",
    href: "https://github.com/goabiaryan/ai-infra-fragility",
    kind: "Thesis",
    note: "Code for Cascading Fragility in National AI Infrastructure, market structure, exposure, network models. Submitting to AI & Society (Springer).",
  },
];

export const courseLabs: Build[] = [
  {
    title: "nexus-workshop-code",
    href: "https://github.com/goabiaryan/nexus-workshop-code",
    kind: "Workshop",
    note: "Packt Nexus: build a first agent / multi-agent system with CrewAI, roles, tasks, orchestration.",
  },
  {
    title: "inferencing_maven",
    href: "https://github.com/goabiaryan/inferencing_maven",
    kind: "Course",
    note: "Labs for the Maven inference engineering cohort.",
  },
  {
    title: "class-code",
    href: "https://github.com/goabiaryan/class-code",
    kind: "Course",
    note: "Class exercises that sit next to RelayServe and the serving labs.",
  },
  {
    title: "concurrency",
    href: "https://github.com/goabiaryan/concurrency",
    kind: "Course",
    note: "Concurrency exercises for inference workloads.",
  },
  {
    title: "ray_project",
    href: "https://github.com/goabiaryan/ray_project",
    kind: "Course",
    note: "Student exercise on concurrency and profiling with Ray.",
  },
];

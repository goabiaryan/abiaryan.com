export const site = {
  name: "Abi Aryan",
  url: "https://abiaryan.com",
  description:
    "AI Infrastructure Engineer building inference systems for data centers, neoclouds, and hyperscalers. Production ML to runtime, distributed systems, and hardware-aware compilers.",
  doctorate: {
    title: "SLO-aware inference and hardware-aware compilers",
    statement:
      "I am doing doctoral research in HPC distributed systems: SLO-aware inference optimization and hardware-aware compiler design. I am developing a digital twin that lets operators manage energy while protecting latency SLOs, via phase-aware observability, predictive forecasting, and human-centred decision support.",
  },
  joule:
    "Joule is an inference power economics engine that ties physical GPU energy to token throughput and SLO goodput.",
  analytics: "G-NC4SF5LGSH",
  email: "hi@abiaryan.com",
  learnEmail: "learn@abiaryan.com",
  links: {
    joule: "https://joule.lat/",
    linkedin: "https://www.linkedin.com/in/goabiaryan/",
    x: "https://twitter.com/GoAbiAryan",
    modelcraft: "https://modelcraft.substack.com/",
    github: "https://github.com/goabiaryan",
    youtube: "https://www.youtube.com/@goabiaryan",
    gpuengineering: "https://gpuengineering.com/",
    gpuengineeringRepo: "https://github.com/goabiaryan/awesome-gpu-engineering",
    maven: "https://maven.com/goabiaryan/inferencing",
    mavenProfile: "https://maven.com/goabiaryan",
    academy: "https://theacademysf.com/",
    academyNote: "https://a16z.com/announcement/incubating-horowitz-andreessen-academy/",
    llmops: "https://www.oreilly.com/library/view/llmops/9781098154196/",
    llmopsWhat: "https://www.oreilly.com/library/view/what-is-llmops/9781098154301/",
    causalReflection: "https://arxiv.org/abs/2508.04495",
    abideGym: "https://arxiv.org/abs/2509.21234",
    reflectiveAgents: "https://openreview.net/forum?id=lE2UP2pZ1g",
    costlyDilemma: "https://arxiv.org/abs/2308.08061",
    arena: "https://ojs.aaai.org/index.php/AAAI/article/view/6216",
    fragility: "https://github.com/goabiaryan/ai-infra-fragility",
    nexusWorkshop: "https://github.com/goabiaryan/nexus-workshop-code",
    pearl: "http://bayes.cs.ucla.edu/jp_home.html",
    topmate: "https://topmate.io/goabiaryan",
    mentorship: "https://topmate.io/goabiaryan/294674",
    abide: "https://abideai.com/",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/writing/", label: "Writing" },
  { href: "/books/", label: "Books" },
  { href: "/teaching/", label: "Teaching" },
  { href: "/advisory/", label: "Advisory" },
  { href: "/code/", label: "Code" },
  { href: "/speaking/", label: "Speaking" },
];

export const stack = [
  { layer: "Model", tools: ["Transformers", "GGUF", "Hugging Face"] },
  { layer: "Framework", tools: ["PyTorch", "Accelerate"] },
  { layer: "Compiler", tools: ["Triton", "TorchDynamo", "CUDA graphs"] },
  { layer: "Kernel", tools: ["FlashAttention", "CUTLASS"] },
  { layer: "Memory", tools: ["PagedAttention", "Mooncake", "LMCache", "KV cache"] },
  { layer: "GPU", tools: ["CUDA", "MIG", "DRA", "HAMi", "DCGM"] },
  { layer: "Communication", tools: ["NCCL", "NIXL", "NVLink"] },
  { layer: "Networking", tools: ["InfiniBand", "RDMA", "Ethernet"] },
  { layer: "Serving", tools: ["vLLM", "SGLang", "TensorRT-LLM", "llm-d", "llama.cpp", "RelayServe", "LiteLLM", "Portkey", "OpenRouter"] },
  { layer: "Scheduling", tools: ["Kubernetes", "EKS", "GKE", "Ray", "Karpenter", "KEDA", "HPA", "Gateway API"] },
  { layer: "Latency / throughput", tools: ["Prometheus", "Grafana", "Locust"] },
  { layer: "$ / token", tools: ["Lambda Cloud", "Modal"] },
];

export const research = [
  {
    title: "SLO-aware inference optimization",
    note: "Latency contracts first. Energy and cost moves are not allowed to blow TTFT, TPOT, or the tail.",
  },
  {
    title: "Hardware-aware compiler design",
    note: "The compiler has to see the GPU in front of it: memory hierarchy, occupancy, and the serving loop, not a generic IR.",
  },
  {
    title: "Phase-aware observability",
    note: "Prefill and decode are different workloads. The twin has to see which phase is burning watts and which is blowing the tail.",
  },
];

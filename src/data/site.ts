export const site = {
  name: "Abi Aryan",
  url: "https://abiaryan.com",
  title: "Abi Aryan · AI Infrastructure Engineer, Inference Systems",
  description:
    "Hi, I am Abi. I build inference systems for data centers, neoclouds, and hyperscalers. Founder of Joule. I teach on Maven.",
  doctorate: {
    title: "AI HPC distributed systems",
    statement:
      "Doctoral research in AI HPC distributed systems: SLO-aware inference optimization, hardware-aware compiler design, and a digital twin for energy optimization for bursty workloads.",
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
    podcast: "https://modelcraft.substack.com/podcast",
    github: "https://github.com/goabiaryan",
    youtube: "https://www.youtube.com/@goabiaryan",
    gpuengineering: "https://gpuengineering.com/",
    gpuengineeringRepo: "https://github.com/goabiaryan/awesome-gpu-engineering",
    maven: "https://maven.com/goabiaryan/inferencing",
    mavenIntro: "https://maven.com/goabiaryan/inferencing-intro",
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
  { layer: "Compiler", tools: ["LLVM", "Triton", "TorchDynamo", "TorchInductor", "CUDA graphs"] },
  { layer: "Kernel", tools: ["PTX", "SASS", "FlashAttention", "CUTLASS"] },
  { layer: "Memory", tools: ["HBM", "DDR", "PagedAttention", "Mooncake", "LMCache", "KV cache"] },
  { layer: "Storage", tools: ["Lustre", "NVMe"] },
  { layer: "GPU", tools: ["CUDA", "MIG", "DRA", "HAMi", "DCGM", "DGCM"] },
  { layer: "Communication", tools: ["NCCL", "MPI", "NIXL", "NVLink/NVSwitch", "UCX", "GPUDirect RDMA"] },
  { layer: "Networking", tools: ["InfiniBand", "UFM", "RDMA/RoCE", "Ethernet", "CXL", "PCIe"] },
  { layer: "Serving", tools: ["vLLM", "SGLang", "TensorRT-LLM", "KServe", "llm-d", "llama.cpp", "RelayServe", "LiteLLM", "Portkey", "OpenRouter"] },
  { layer: "Scheduling", tools: ["Kubernetes", "EKS", "GKE", "Ray", "KubeRay", "Volcano", "Slurm", "Flux", "Kueue", "dstack", "Karpenter", "KEDA", "HPA", "Gateway API", "Enroot", "xCAT"] },
  { layer: "Automation", tools: ["Terraform", "Ansible"] },
  { layer: "Latency / throughput", tools: ["Prometheus", "Grafana", "Jaeger", "Locust", "Nsight Systems", "Nsight Compute", "Perf", "HPCG"] },
  { layer: "Facility", tools: ["DCIM platforms", "BMS/BAS", "Modbus", "BACnet", "SNMP", "OPC UA", "Redfish", "IPMI", "BMC"] },
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

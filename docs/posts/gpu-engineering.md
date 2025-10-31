---
title: "The Full Story of LLM Inference"
author: "Abi Aryan"
date: 2025-10-31
tags: ["LLMOps", "GPU Engineering", "Performance Engineering", "MLSys", "ML Infrastructure"]
---

Ever wondered what happens **behind the scenes** when you hit `query` on a large language model (LLM)? Most tutorials stop at “call the API” or “run the model,” leaving out the full stack. But if you want to understand **why performance varies**, why some models scale better than others, or why certain optimizations matter, you need the whole picture.

I put together a **diagram mapping every layer of LLM inference**, from your HTTP request to multi-GPU execution. Nothing like this existed for me when I learned—it’s the missing piece. Here’s what it shows.

## The LLM Inference Stack

The stack can be thought of in **6 major layers**, each critical for performance:

![](\assets\gpu-engineering\diagram_white.png)

### 1️⃣ User → API Gateway
This is the first gate of performance. If something is slow here, everything downstream suffers.

When you send a prompt, your request hits an API gateway or orchestrator. This layer handles **authentication, rate limiting, load balancing**, and generates a **request ID** for debugging. Think of it as the **air traffic control** of your LLM call: every request must be routed efficiently, or compute is wasted downstream.

### 2️⃣ Inference Engines
This is where the real magic begins. Most people never see it, but it’s here that models process tokens efficiently.

Engines like **vLLM, TensorRT-LLM, Hugging Face Transformers, TGI, DeepSpeed, Megatron-LM, and SGLang/vLLM++** handle:

- Batching strategies (including continuous batching in vLLM)  
- KV cache management (PagedAttention, chunked prefill)  
- Quantization (FP8, INT4)  
- Speculative decoding (Medusa, Lookahead)  
- Adapter routing (LoRA) for serving thousands of fine-tunes  
- FlashAttention-4 for faster attention computation  

Each engine has trade-offs in **speed, memory, and flexibility**, and choosing the right engine depends on the use case.

### 3️⃣ Distributed Orchestration Frameworks
Without this layer, multiple GPUs are mostly idle. Frameworks like **HF Accelerate, Horovod, Ray Train, and DeepSpeed** coordinate multi-GPU execution:

- Memory management and communication between GPUs  
- Scaling strategies: data parallelism, model parallelism, pipeline parallelism, tensor parallelism  

This layer ensures that scaling from 1 to 8, 16, or more GPUs is **efficient and synchronized**.

### 4️⃣ Runtime & Compiler Layers
The runtime and compilers are the invisible engine that makes high throughput possible.

- **JIT compilation** and dispatch  
- **Kernel fusion** and graph optimizations  
- Dynamic vs static graph execution  

Without this, GPU instructions are not optimized, and your hardware can’t be fully utilized.

### 5️⃣ CUDA Runtime & GPU Primitives
Here, the instructions actually hit the GPU:

- Streams, memory pools, and CUDA graphs  
- Libraries like cuBLAS, cuDNN, CUTLASS  
- NCCL collectives for multi-GPU communication  
- Custom kernels for FlashDecoding and PagedAttention  

This layer ensures that **every GPU core is busy** and memory is used efficiently.

### 6️⃣ Hardware
Finally, the physical layer: **NVIDIA GPUs, Tensor Cores, SMs, HBM memory, and NVLink/PCIe interconnects**.  

Understanding bandwidth, latency, and interconnect topologies is critical for **scaling and throughput**.

## Why GPU Engineering is Like Prompting

GPU engineering is like **prompting for infrastructure**. Every decision—engine, framework, runtime, kernel, hardware—affects performance. Miss one layer, and everything slows down. Hit every layer efficiently, and you can process **thousands of tokens per second**.

## Takeaways

- LLM inference is multi-layered, from HTTP to GPU cores.  
- Most guides skip critical layers: orchestration, runtime, CUDA, and hardware.  
- Understanding the full stack is essential for **performance, scalability, and debugging**.  

> I created this because it’s the missing piece I wish I had when I was learning LLM engineering.  

## Citation
```
  @article{abi2025,
  title = "The Full Story of LLM Inference",
  author= "Aryan, Abi",
  journal = "abiaryan.com"
  year = "2025"
  month = "October"
  url = "https://abiaryan.com/posts/gpu-engineering"
  }
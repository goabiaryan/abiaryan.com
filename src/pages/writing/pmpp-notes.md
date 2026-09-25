---
layout: ../../layouts/Post.astro
title: "Abi's PMPP Notes: Execution Model, Memory Hierarchy, and Why More Work Can Be Faster"
date: 15 October 2025
published: 2025-10-15
summary: "Notes from Programming Massively Parallel Processors (Kirk & Hwu): the GPU execution model, the memory model, warps, occupancy, coalescing, and why hiding latency can mean launching more work. These are the hardware chapter under LLM inference, not a kernel tutorial. The claim throughout is that sequential-CPU intuition is the wrong prior for throughput machines."
kind: Notes
question: "What must you understand about GPU execution and memory before another CUDA tutorial is useful?"
takeaways:
  - CPUs optimize latency. GPUs optimize throughput. That swap breaks sequential intuition.
  - A warp is the lockstep unit. Divergence and uncoalesced access are the first two ways a correct kernel dies.
  - Occupancy, reuse, and the memory hierarchy matter before a clever algorithm.
  - More independent work can be faster because it hides memory latency.
  - USE method: utilization, saturation, errors, then intervene, then profile again.
topics:
  - GPU engineering
  - LLM inference
definitions:
  - term: Warp
    meaning: A lockstep group of threads (32 on NVIDIA). The hardware's real scheduling unit.
  - term: Occupancy
    meaning: How many warps the SM can keep resident. Higher occupancy can hide latency; it is not automatically higher performance.
  - term: Coalescing
    meaning: Adjacent threads touching adjacent addresses so memory transactions merge.
  - term: Shared memory
    meaning: On-chip scratchpad used to tile and reuse data that would otherwise hit slow global memory.
  - term: Latency hiding
    meaning: Switching to another ready warp while one waits on memory. This is why "more work" can be faster.
projects:
  - gpuengineering.com
relatedWriting:
  - one-roadmap
  - llm-inference
  - eighty-busy-still-slow
note: "From Programming Massively Parallel Processors: hide latency, warps, why more work can be faster."
---

I read *Programming Massively Parallel Processors* (Kirk & Hwu) cover to cover. These are the notes I kept, first as a private revision set, then as [Abi's Concise Notes](https://github.com/goabiaryan/awesome-gpu-engineering/blob/main/notes/Abi's%20PMPP%20Notes.pdf) on [gpuengineering.com](https://gpuengineering.com/). The [PDF](/assets/abis-pmpp-notes.pdf) is still there if you want the original.

This is the same material as a post: the four truths that make GPUs strange, then enough CUDA to write a kernel, then the hierarchy, the memory model, and the patterns you actually need.

For decades, software had a free lunch. Every 18 months a new CPU arrived and sequential code got faster. Around 2003 that stopped. Energy and heat killed single-thread frequency scaling. The new frontier was parallel programming, and the most powerful parallel processors, GPUs, run on rules that are counter-intuitive if you were trained on sequential machines.

## Four truths

### 1. GPUs do not reduce slowness. They hide it.

An individual GPU operation is often *slower* than the CPU equivalent. The secret is not latency. It is throughput.

CPUs are latency-oriented. Huge caches, branch prediction, a lot of silicon spent making *one* thread finish sooner.

GPUs are throughput-oriented. They tolerate latency. When one warp waits on memory, the scheduler swaps in another warp that is ready. Arithmetic units stay busy. Smaller caches exist mostly to save bandwidth (fetch once, reuse across threads) not to make a single access fast.

A post office with one clerk: the latency clerk waits while you fill a form. The throughput clerk sends you aside and serves the next person. More customers per hour. Your personal wait might be longer.

Reducing latency is much more expensive, in power and area, than increasing throughput. That is why the hardware looks the way it does.

### 2. Your “parallel” threads are not truly independent.

Threads run in **warps** of 32. Same instruction, same time. SIMD. Efficient when everyone does the same thing. Disastrous when they don't.

That failure is **control divergence**. An `if` / `else` where half the warp takes each path: the hardware serializes. First the `if` (the other half idle), then the `else` (the first half idle). Ten instructions plus eight is eighteen for the warp, even though each thread only needed one path.

You must know which threads share a warp and keep them on the same path.

### 3. To go faster, sometimes you must do more work.

On a CPU, O(N) beats O(N log N). On a GPU, a work-*inefficient* algorithm can still win.

Sequential scan of N elements: ~N additions, N steps, not parallelizable. Kogge–Stone parallel scan: O(N log N) work, but **log N** parallel steps. For N = 1024 that is ~1,024 sequential steps versus 10 parallel steps, and nearly 10,000 additions. More work. Far less time. The metric that matters is the longest chain of dependent calculations, not total FLOPs.

### 4. Scalability is designing for independence.

Write the kernel once. It should run on a laptop GPU or a datacenter GPU without changing a line. That is **transparent scalability**.

The trick is **independent thread blocks**. Threads inside a block may share memory and synchronize. Blocks must not wait on other blocks. The runtime can then run many blocks at once on a fat GPU, or one after another on a thin one. Order does not matter. The result is still correct.

The chain: hide latency with massive thread counts → lockstep warps (so they are not independent) → work-inefficient algorithms become fastest → independence between *blocks* makes the system scalable.

Parallelism is not “do more things at once.” It is a different relationship between software and hardware.

## Why use a GPU at all?

Think of the CPU as a skilled manager, sequential, branchy, low latency. The GPU is an army that does one simple thing on millions of data points.

| | CPU | GPU |
| --- | --- | --- |
| Goal | Minimize latency for one task | Maximize throughput for many |
| Cores | Few, powerful | Many, smaller, cheaper |
| Analogy | Specialists | An army doing the same job |

**Heterogeneous computing** assigns each processor the work it is built for. CUDA is how you orchestrate that.

## The CUDA model

Host (CPU) starts `main`, owns the story, launches work. Device (GPU) runs the **kernel**: a function executed by thousands or millions of threads.

Host and device have **separate memory**. The usual five steps:

1. `cudaMalloc`: allocate on the device
2. `cudaMemcpy` host → device
3. Launch the kernel with `<<<grid, block>>>`
4. `cudaMemcpy` device → host
5. `cudaFree`

### Thread hierarchy

- **Thread**: one execution of the kernel. GPU threads are cheap (a few cycles to create). CPU threads are not.
- **Warp**: 32 threads. The real scheduling unit. Lockstep.
- **Block**: threads that may share memory and `__syncthreads()`. Must be reachable by every thread in the block or you deadlock. Blocks do not synchronize with other blocks, that is what makes the code scale.
- **Grid**: all blocks for one kernel launch.

Built-ins: `threadIdx` (in the block), `blockIdx` (in the grid), `blockDim`, `gridDim`.

### Vector add

```c
__global__ void vecAddKernel(float* A, float* B, float* C, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        C[i] = A[i] + B[i];
    }
}
```

Launch: `vecAddKernel<<<ceil(n / 256.0), 256>>>(A_d, B_d, C_d, n)`.

The index line is the whole trick. Block 2, thread 5, 256 threads per block: `2 * 256 + 5 = 517`. Every thread gets one element. No collisions.

Host side is the five-step dance: malloc three buffers, copy A and B up, launch, copy C down, free.

## Memory

| | Global | Shared |
| --- | --- | --- |
| Where | Off-chip DRAM | On-chip |
| Speed | Slow, high latency | Fast |
| Size | Gigabytes | Kilobytes per block |
| Who | Any thread in the grid | Only that block |
| Life | The application | The block |

Global is where the host can write. Shared is a **user-managed cache**: load a tile from global, reuse it, write back. That is how you stop paying DRAM for every multiply.

Registers are fastest and per-thread. Constant memory is small, cached, read-only, grid-wide.

## Two performance laws

**Control divergence.** Threads in a warp take different branches → both paths run, half idle each time. Structure data so a warp decides the same way. A few divergent warps at a boundary are fine if thousands are not.

**Memory coalescing.** A warp's 32 loads become one transaction if they hit a contiguous, aligned chunk of global memory. Consecutive `threadIdx.x` must hit consecutive addresses. Scatter is death.

The other two you will hear constantly: **occupancy** (enough warps resident to hide latency) and **tile + reuse** (shared memory so you do not refetch).

## Parallel patterns

**Reduction**: many → one (sum, max). A tree. Watch divergence as threads go idle; rearrange work so warps stay full.

**Scan (prefix sum)**: running totals. Inclusive or exclusive. Kogge–Stone: more work, fewer steps. Brent–Kung: work-efficient, O(N), different parallelism trade-off.

**Convolution**: sliding window, high reuse. Naive: every output reloads the neighborhood from global. Fix: **tiling** into shared memory.

**Histogram**: output interference. Atomics or privatization.

**Sparse / graph**: irregular access, load imbalance. Layout is the algorithm.

**Deep learning**: mostly GEMM. That is why Tensor Cores and CUTLASS exist.

## How to look at a slow kernel

USE method, for every resource: **utilization**, **saturation**, **errors**.

Then ask:

- Coalesced global access?
- Tiling / caching before you invent a new kernel?
- Occupancy high enough, or registers spilling?
- Divergence?
- Work balanced, or a few threads doing everything?
- Atomics / privatization for write conflicts?
- Synchronization only where you must, barriers idle everyone else?

Profile. Then intervene. Then profile again.

## What to take

CPU vs GPU is latency vs throughput. CUDA is host managing device memory and launching a grid of blocks. The index formula is how threads don't step on each other. Warps, coalescing, shared-memory tiles, and independent blocks are why the same kernel can be 10× or 100× apart.

This is not a niche skill anymore. It is how you reason about the hardware under an LLM.

## Practical guidance

1. Learn warps, the memory hierarchy, and occupancy before writing a "clever" kernel.
2. Check coalescing and divergence before you invent a new algorithm.
3. Profile, intervene, profile again. USE: utilization, saturation, errors.
4. Then return to the inference path, this chapter buys milliseconds you have already named.

## Limitations

These notes follow Kirk & Hwu. They are a reading record, not original architecture research, and they predate a specific serving-engine bake-off. NVIDIA warp width and memory names are the vocabulary here; AMD and other stacks rhyme but do not copy the names.

Original notes: [PDF](/assets/abis-pmpp-notes.pdf). Book: Kirk & Hwu, *Programming Massively Parallel Processors*.

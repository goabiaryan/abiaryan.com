---
layout: ../../layouts/Post.astro
title: "One Inference Roadmap, Not Fifty Tools: Request Path Before CUDA"
seoTitle: "One Inference Roadmap, Not Fifty Tools"
date: 20 March 2026
published: 2026-03-20
summary: "If I had to build a single path to LLM inference, I would not start with CUDA. I would start with the request path, then the two workloads hiding inside the word inference, then memory, then the queue, then parallelism. Kernels come last, when you know which millisecond you are buying. The pile-of-tools version produces people who can quote FlashAttention and cannot say why their p99 moved."
kind: Investigation
cover: /assets/posts/one-roadmap.jpg
coverCaption: "Figure 1. A mastery roadmap from math and the inference pipeline through engines, memory, optimization, distribution, measurement, and production, not a bookmark pile."
topics:
  - inference careers
  - LLM inference
  - GPU engineering
question: "If you could keep only one skill sequence for LLM inference, what comes before CUDA?"
takeaways:
  - Start with the request path, not a kernel tutorial.
  - Prefill and decode are two workloads hiding under one word.
  - Treat KV cache as a first-class resource before you study parallelism.
  - Queues and SLOs are the serving chapter; kernels buy a specific millisecond.
  - Quoting FlashAttention is not the same as explaining a p99 move.
definitions:
  - term: Request path
    meaning: Gateway to engine to GPU. The sequence a single user request actually walks.
  - term: Prefill
    meaning: The compute-heavy phase that reads the prompt and writes the KV cache.
  - term: Decode
    meaning: The memory-heavy phase that emits one token at a time while rereading the KV cache.
  - term: KV cache
    meaning: The key-value attention cache. A growing lease on HBM, not a free byproduct of compute.
  - term: p99
    meaning: The latency at the 99th percentile. The number that moves when the queue or the batch mix goes hostile.
  - term: Parallelism
    meaning: Data, tensor, pipeline, and expert splits. A later lever, after you know what does not fit.
projects:
  - RelayServe
  - smol-vLLM
  - gpuengineering.com
relatedWriting:
  - llm-inference
  - pmpp-notes
  - job-that-didnt-exist
  - eighty-busy-still-slow
  - kv-needs-a-phone-book
course: true
source: https://www.linkedin.com/posts/goabiaryan_%F0%9D%90%88%F0%9D%90%9F-%F0%9D%90%88-%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%9D-%F0%9D%90%AD%F0%9D%90%A8-%F0%9D%90%9B%F0%9D%90%AE%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%9D-%F0%9D%90%9A-%F0%9D%90%AC%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0%F0%9D%90%A5%F0%9D%90%9E-activity-7432724235065659393-D_JR
note: "If I had to build a single path to LLM inference: systems first, then the lever."
---

## System overview

**Request path:** HTTP request through gateway, router, scheduler, engine, GPU. If you cannot draw this, you are collecting tools.

**Two workloads:** Prefill (compute-bound, writes KV) and decode (memory-bound, rereads KV). "Inference" is both.

**Memory chapter:** Weights plus KV plus fragmentation. [smol-vLLM](https://github.com/goabiaryan/smol_vllm) exists so you can read paging without a 200k-line engine.

**Queue chapter:** Batching, admission, SLOs. [RelayServe](https://github.com/goabiaryan/RelayServe) is the serving-facing slice.

**Hardware chapter:** [PMPP notes](/writing/pmpp-notes/), then CUDA, kernels, compilers, when you know which millisecond you are buying.

## What I observed

If I had to build one skill roadmap, I would not start with CUDA.

I would start with the request path. Then the two workloads hiding inside "inference." Then memory. Then the queue. Then parallelism. Kernels last.

The pile-of-tools version produces people who can quote FlashAttention and cannot say why their p99 moved.

## The argument

A tool list feels like progress because each name is searchable. A sequence is progress because each step tells you what the next lever is for.

CUDA is a way to buy a millisecond once you have named it. If you have not walked a request from the gateway to HBM, you do not know whether that millisecond is in the kernel, the queue, the cache, or the fabric. FlashAttention is a real paper. Reciting it is not a diagnosis.

The visual roadmap on this page adds foundations, engines, measurement, and production around the same spine. The spine does not change: path, phases, memory, queue, then hardware.

## Finding 1: Tools without a path cannot explain p99

**Claim.** Knowing engine names and kernel papers does not transfer to explaining why tail latency moved.

**Evidence.** The failure mode in the field note is specific: people quote FlashAttention and cannot say why their p99 moved. That is a sequence error, not an intelligence error. They started at the last lever.

**Explanation.** p99 is usually queueing, batch composition, KV pressure, or a long prefill sharing a batch with interactive decode. A kernel improvement shows up after those are stable. If your first month is CUDA, you will look for a kernel every time the tail moves.

**Implication.** Teach the path until the student can point at the hop. Then hand them PMPP.

## Finding 2: Kernels are a purchase, not a starting point

**Claim.** CUDA belongs at the end of the roadmap because it is how you spend effort on a named millisecond.

**Evidence.** The sequence I keep writing is six steps, kernels last. RelayServe and smol-vLLM are the serving chapter. PMPP is the hardware chapter. That split is intentional: most production pain I see is not "we needed a fused attention kernel on day one."

**Explanation.** Prefill vs decode tells you whether you are compute-bound or bandwidth-bound. KV as a first-class resource tells you whether HBM is the limiter. Batching and SLOs tell you whether you have a queue. Parallelism tells you what to do when one GPU is not a machine. Only then is a kernel the cheapest remaining buy.

**Implication.** If someone asks "what should I learn next" and you say "CUDA" before they can draw the path, you just sold them the wrong week.

## The mental model

One spine. Everything else is a bookmark.

```text
1. Request path (gateway → engine → GPU)
2. Prefill vs decode
3. KV cache as a first-class resource
4. Batching, queues, SLOs
5. Parallelism (data / tensor / pipeline / expert)
6. Then: CUDA, kernels, compilers
```

| Step | What you can name after it | Unit you start using |
| ---- | -------------------------- | -------------------- |
| 1. Request path | Which hop is lying | hops |
| 2. Prefill vs decode | Which phase owns the time | ms / phase |
| 3. KV cache | What is leasing HBM | bytes, pages |
| 4. Queue + SLO | What users feel | TTFT, TPOT, depth |
| 5. Parallelism | What does not fit on one GPU | GPUs, comms |
| 6. Kernels | Which millisecond you are buying | ms, roofline |

## Practical guidance

1. Draw the request path on paper before you open a CUDA tutorial.
2. Explain prefill vs decode without saying "the model runs."
3. Treat KV bytes as a capacity input, not an implementation detail.
4. Attach every optimization to a metric: TTFT, TPOT, or goodput.
5. Read PMPP and write a kernel only when you can name the millisecond.

## Limitations

This is a teaching sequence from hiring, the Maven cohort, and serving work, not a validated curriculum study. People who already live in compilers can start later in the list. Engine choice (vLLM, SGLang, TensorRT-LLM) changes the labs, not the spine. The cover image is a broader mastery map; the six-step list is the argument I will defend in a room.

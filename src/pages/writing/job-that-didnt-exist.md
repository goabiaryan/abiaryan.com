---
layout: ../../layouts/Post.astro
title: "The Inference Engineer Owns SLOs, Not vLLM Flags: Why This Job Didn't Exist in 2024"
seoTitle: "The Inference Engineer Owns SLOs, Not Flags"
date: 8 January 2026
published: 2026-01-08
summary: "Inference engineer is not the person who knows vLLM flags. It is the person who can explain why the same 70B is cheap on one topology and bankrupt on another, and who owns TTFT, inter-token latency, KV pressure, and $/token when the PM only asked for a chatbot. In 2024 the title barely existed. In 2026 it is the difference between a demo and a bill. The role starts from the SLO and works backward."
kind: Investigation
cover: /assets/posts/job-that-didnt-exist.jpg
coverCaption: "Figure 1. The job ladder after the demo: model quality, then training pipelines, then prompting, then someone who owns runtime efficiency and scale."
topics:
  - inference careers
  - LLM inference
  - LLMOps
question: "What does an inference engineer actually own once the chatbot becomes traffic?"
takeaways:
  - The role is not a tool list. It is ownership of latency, cost, and the GPU under load.
  - The same 70B can be cheap on one topology and bankrupt on another.
  - Junior AI engineering still throws models at GPUs. This role starts from the SLO and works backward.
  - The pager is about TTFT, TPOT, and goodput, not the title on the slide.
  - The skill is a progression: gateway, batch, cache, parallelism, then the kernel.
definitions:
  - term: Inference engineer
    meaning: The person who owns serving latency, cost, and GPU behavior when a demo becomes production traffic.
  - term: SLO
    meaning: The latency and availability contract users actually feel. Typical split is TTFT, TPOT, and success rate, not a single p50.
  - term: TTFT (Time to First Token)
    meaning: Time from request arrival to the first generated token. Queue wait plus prefill.
  - term: TPOT (Time Per Output Token)
    meaning: Time between successive decode tokens. Memory bandwidth and batch composition dominate.
  - term: Goodput
    meaning: Successful tokens delivered inside the SLO. Timeouts, retries, and failed generations do not count.
  - term: KV pressure
    meaning: How much HBM the key-value cache has leased, and how close the allocator is to refusing the next request.
projects:
  - RelayServe
  - fullstack-inferencing
relatedWriting:
  - junior-throws-gpus
  - one-roadmap
  - eighty-busy-still-slow
  - sunday-slack-27k
course: true
source: https://www.linkedin.com/posts/goabiaryan_%F0%9D%90%96%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AD-%F0%9D%90%88%F0%9D%90%AC-%F0%9D%90%9A%F0%9D%90%A7-%F0%9D%90%88%F0%9D%90%A7%F0%9D%90%9F%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%9C%F0%9D%90%9E-%F0%9D%90%84%F0%9D%90%A7%F0%9D%90%A0%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%9E%F0%9D%90%9E%F0%9D%90%AB-activity-7412146749152182272-oYPp
note: "Inference engineer: the person who owns latency, cost, and the GPU when the demo becomes traffic."
---

## System overview

**Product request:** "Ship a chatbot." No SLO. No token budget. No topology.

**Gateway:** Admits the request, stamps an ID, enforces rate limits. RelayServe is the thin version I use so this layer is visible.

**Scheduler / engine:** Decides who enters a batch, how KV is paged, whether a long prefill sits next to interactive decode.

**Topology:** How the 70B is split across GPUs, tensor, pipeline, expert, or a single card that does not fit. Cost lives here.

**Inference engineer:** The person who can name which of the above is lying when the bill arrives.

## What I observed

People ask what an inference engineer is. They want a tool answer. vLLM flags. A Hugging Face job title. A CUDA certificate.

That is not the job.

The job is explaining why the same 70B is cheap on one topology and bankrupt on another. Who owns TTFT, inter-token latency, KV pressure, and $/token when the PM only asked for a chatbot.

In 2024 the title barely existed. In 2026 it is the difference between a demo and a bill.

## The argument

Junior AI engineering still throws models at GPUs. The role I am describing starts from the SLO and works backward: gateway, batch, cache, parallelism, then the kernel.

That order is not aesthetic. A faster kernel on a blind router is a more expensive queue. A beautiful tensor-parallel diagram that never measured KV pressure is architecture theater. The person who can walk the path in both directions (SLO down, silicon up) is the one who gets paged.

I teach it as an eight-week transformation on Maven because the skill is a progression, not a tool list.

## Finding 1: The title on the slide is not the pager

**Claim.** "AI engineer" on the hiring slide does not name the variables that decide whether the product survives contact with traffic.

**Evidence.** The measurements that show up in the incident are TTFT, TPOT, availability, and cost per successful token. The original field note's example contract is TTFT 400 milliseconds, TPOT 30 milliseconds, availability 0.999, with failures counted in the denominator.

**Explanation.** A chatbot demo can hide behind a single latency number and a generous GPU. Production splits the number: users feel the wait to the first token, then the drip of the rest. Cost is tokens out divided by goodput. If you omit timeouts and retries, you are pricing a fantasy.

**Implication.** Hire and train for the three numbers on the pager. Do not hire for the flag list.

## Finding 2: The same 70B is not the same machine

**Claim.** Model size is not a serving plan. Topology, cache, and admission decide whether 70B is a product or a furnace.

**Evidence.** Teams serve "the same 70B" and get opposite bills because they did not serve the same system: different parallelism, different prefix reuse, different batch mix, different failure accounting. Small and large models are not two sizes of the same problem, topology, KV movement, and whose prefill blocks decode change the machine.

**Explanation.** Weights are the easy part. KV leases HBM for the life of the context. Prefill and decode want different resources. If you only know how to `load_model()`, you will scale the wrong axis.

**Implication.** The inference engineer can draw the request path and point at the expensive hop. The rest is decoration.

## The mental model

Work backward from the contract, not forward from the model.

1. Write the SLO (TTFT, TPOT, success rate).
2. Name the request shape (prompt tokens, decode tokens, concurrency).
3. Walk the path: gateway → router → scheduler → engine → GPU.
4. Ask which resource is scarce: queue, KV, bandwidth, or compute.
5. Only then pick a lever, flags, parallelism, or a kernel.

```python
# What the role actually measures
slo = {"ttft_ms": 400, "tpot_ms": 30, "availability": 0.999}
cost = tokens_out / goodput_tokens   # failures count
# Title on the slide is "AI engineer".
# The pager is about the three numbers above.
```

| Signal | Unit | What the role owns |
| ------ | ---- | ------------------ |
| TTFT | milliseconds | Queue wait + prefill. Users feel this first. |
| TPOT | milliseconds / token | Decode drip. Batch mix and memory bandwidth. |
| Availability | fraction (0–1) | Did the request complete, or did we retry? |
| Goodput cost | tokens / successful tokens | Failures stay in the denominator. |

The 400 ms / 30 ms / 0.999 row is an example contract from the field note, not a measured A/B.

## Practical guidance

1. Write TTFT and TPOT before you pick an engine.
2. Price successful tokens, failures included.
3. Learn the path (gateway, batch, KV, parallelism) before you memorize flags.
4. Treat topology as a cost decision, not a resume line.
5. If you cannot name the scarce resource, you are not ready to add GPUs.

## Limitations

This is a role definition from hiring and incident work, not a salary survey or a controlled comparison of job titles. The 70B "cheap vs bankrupt" claim is a topology argument I have watched repeatedly; it is not a matched experiment on one SKU. The example SLO numbers are teaching targets, not a published production contract.

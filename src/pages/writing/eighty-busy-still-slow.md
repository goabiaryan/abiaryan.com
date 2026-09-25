---
layout: ../../layouts/Post.astro
title: "Why GPU Utilization Is a Misleading Metric for LLM Inference: Queueing, KV Cache, and SLOs"
seoTitle: "Why GPU Utilization Misleads LLM Inference"
date: 22 August 2026
published: 2026-08-22
summary: "This investigation examines why GPU utilization alone is insufficient for evaluating production LLM inference systems. I show how a server can report high SM occupancy while violating latency SLOs, and why two teams can pay $97 versus $0.38 per million tokens on similar hardware. The post develops a practical mental model: evaluate inference with goodput, queue depth, KV-cache pressure, and request shape, not utilization graphs."
kind: Investigation
cover: /assets/posts/eighty-busy-still-slow.jpg
coverCaption: "Figure 1. The utilization trap: SMs look busy while the queue, not the kernel, owns user latency."
topics:
  - LLM inference
  - GPU engineering
  - queueing
  - KV cache
  - inference observability
question: "Why can an LLM inference server show 80% GPU utilization while still delivering poor latency?"
takeaways:
  - GPU utilization is not equivalent to useful inference throughput.
  - Wait time grows nonlinearly as utilization approaches 1. That is Kingman's approximation, not vibes.
  - Prefill and decode create different resource profiles; mixing them in one batch punishes both.
  - KV-cache pressure can become the limiting resource before compute saturation.
  - Scale on SLO violation rate and KV pressure, not on "the GPU looks hungry."
definitions:
  - term: GPU utilization
    meaning: Fraction of streaming-multiprocessor (SM) cycles reported busy. A occupancy signal, not a user-experience signal.
  - term: Goodput
    meaning: Successful tokens delivered inside the latency SLO, per GPU-second. Failed, timed-out, and retried tokens do not count.
  - term: TTFT (Time to First Token)
    meaning: Time from request arrival to the first generated token. Dominated by queue wait plus prefill.
  - term: TPOT (Time Per Output Token)
    meaning: Time between successive decode tokens. Dominated by memory bandwidth and batch composition.
  - term: KV cache
    meaning: The key-value attention cache maintained during autoregressive inference. A growing lease on HBM, not a free byproduct of compute.
  - term: Prefill
    meaning: The compute-heavy phase that reads the prompt and writes the KV cache.
  - term: Decode
    meaning: The memory-heavy phase that emits one token at a time while rereading the KV cache.
  - term: ρ (utilization)
    meaning: Arrival rate divided by service rate. As ρ → 1, expected wait time explodes.
projects:
  - RelayServe
  - Joule
relatedWriting:
  - sunday-slack-27k
  - same-gpu-different-century
  - kv-needs-a-phone-book
  - job-that-didnt-exist
  - llm-inference
source: https://www.linkedin.com/posts/goabiaryan_ai-inferencing-and-system-design-patterns-activity-7499089183412617216-b4fp
---

## System overview

**API gateway:** Admits the request, stamps a request ID, enforces rate limits.

**Router:** Selects an inference worker. If it is blind to KV locality and queue depth, it is load-balancing theater.

**Scheduler:** Decides which requests enter a batch, and whether a long prefill is allowed to sit next to interactive decode.

**Inference engine:** Executes the model on GPU hardware. Owns continuous batching, paged KV allocation, and the prefill/decode loop.

**GPU:** Runs kernels. Reports SM utilization. Does not know whether the tokens it produced arrived on time.

## What I observed

The 80% GPU utilization trap: you finally kept the SMs busy and the users started screaming.

High utilization is a queue. Variance in request shape makes it worse. Prefill and decode in one batch is how you get 3.3 seconds and 39 seconds on the same card.

This is also why one team pays **$97 per million tokens** and another pays **$0.38 per million tokens**: prefix caching, batching, hardware generation, and whether they count failures.

## Why I think this happened

A serving loop is a queueing system with two service distributions hiding under one name.

Prefill is compute-bound. Decode is memory-bound. When utilization is high, every extra request waits behind whatever is already in the batch. Kingman's approximation is the unromantic version: wait time is service time times ρ / (1 − ρ). At ρ = 0.5 the wait is one service time. At ρ = 0.8 it is four. At ρ = 0.95 it is nineteen.

The GPU looking busy is the ρ = 0.8 line. The user seeing 39 seconds is the tail.

## Finding 1: Utilization is not goodput

**Claim.** Increasing GPU utilization does not necessarily increase useful inference throughput.

**Evidence.** Kingman's approximation on a 30-millisecond mean service time: wait grows from 0.03 seconds at ρ = 0.5 to 0.57 seconds at ρ = 0.95, before you add prefill/decode variance. Production teams that report 80% SM busy often have a much lower goodput once timeouts and retries are counted.

**Explanation.** Utilization counts busy cycles. Goodput counts tokens that met the SLO. A batch that mixes a 12k-token prefill with a short chat completion keeps SMs occupied and destroys interactive TPOT.

**Implication.** A production autoscaler that adds replicas when utilization is "low" and refuses them when utilization is "high" will stabilize the wrong variable.

## Finding 2: The $97 vs $0.38 gap is a systems gap

**Claim.** Cost per million tokens is dominated by caching, admission, and failure accounting, not by the list price of the GPU.

**Evidence.** The same model family shows roughly two orders of magnitude in reported $/MTok depending on prefix-cache hit rate, batch composition, hardware generation, and whether failed generations are included in the denominator.

**Explanation.** Uncached prefill is expensive. Decode without a cap is a runaway. Idle replicas still draw watts. Joule exists because tokens and watts are the same ledger.

**Implication.** Price the successful task, failures included. Do not price the happy-path token.

## The mental model

Treat the GPU as a server with a queue, not as a utilization gauge.

1. Measure arrival shape (prompt tokens, decode tokens, concurrency).
2. Measure service (TTFT, TPOT) split by phase.
3. Measure the queue (depth, wait).
4. Measure the lease (KV-cache bytes, fragmentation).
5. Only then look at SM occupancy, as a debugging signal, not a goal.

```python
# Kingman: wait time blows up as ρ → 1
def wait(service, rho):
    return service * rho / (1 - rho)

print("ρ=0.5", round(wait(0.03, 0.5), 3), "s")
print("ρ=0.8", round(wait(0.03, 0.8), 3), "s")
print("ρ=0.95", round(wait(0.03, 0.95), 3), "s")
```

| ρ (utilization) | Mean wait (seconds) | What it feels like |
| --------------: | ------------------: | ------------------ |
|            0.50 |               0.030 | Headroom. Users are quiet. |
|            0.80 |               0.120 | SMs look healthy. Tail starts to move. |
|            0.95 |               0.570 | The dashboard is green. The Slack is not. |

Wait times assume a 30-millisecond mean service time and no heavy-tailed request mix. Real traces are worse.

## Practical guidance

1. Split SLOs into TTFT and TPOT. One p50 is a lie.
2. Track queue depth and wait, not only SM occupancy.
3. Monitor KV-cache bytes and allocatable free memory, not "free" as nvidia-smi reports it.
4. Measure goodput against the latency SLO.
5. Do not autoscale solely from GPU utilization.
6. Separate monster prefills from interactive decode when the mix is hostile.

## Limitations

This is a field note and a queueing argument, not a controlled A/B on a named model and SKU. The $97 vs $0.38 figures are observed production ranges, not a single matched experiment. Kingman assumes known service-time variance; real prefill/decode mixes are heavier-tailed than the formula. Results will differ across serving engines (vLLM, SGLang, TensorRT-LLM), quantization, and disaggregated prefill/decode.

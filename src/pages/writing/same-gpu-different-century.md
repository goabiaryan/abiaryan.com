---
layout: ../../layouts/Post.astro
title: "Why the Same GPU Serves One Request in 3.3 Seconds and Another in 39: Request Shape, Prefill, and Decode"
date: 12 April 2026
published: 2026-04-12
summary: "This investigation looks at a measurement that surprises people who think inference is 'run the model': identical weights, identical GPU, identical software, 3.3 seconds versus 39 seconds. The variable is request shape. Prefill is compute-bound; decode is memory-bound. Mixing them in one batch punishes both. The post splits TTFT from inter-token latency and argues against a single p50."
kind: Investigation
cover: /assets/posts/same-gpu-different-century.jpg
coverCaption: "Figure 1. Same model, same card, same code. The request shape did the century-scale difference."
topics:
  - LLM inference
  - GPU engineering
  - KV cache
question: "Why can the same model on the same GPU take 3.3 seconds for one request and 39 seconds for another?"
takeaways:
  - Identical weights and hardware do not imply similar latency.
  - Prefill reads the prompt and writes the KV cache, compute-heavy.
  - Decode emits one token at a time while rereading the cache, memory-heavy.
  - A 12k-token prompt and a chatty decode are different critical paths.
  - Split TTFT and inter-token latency. Do not colocate monster prefills with interactive decode if you can avoid it.
definitions:
  - term: Request shape
    meaning: The pair (prompt tokens, generated tokens) plus concurrency. The workload, not the model.
  - term: Prefill
    meaning: The phase that consumes the prompt and materializes the KV cache. Lots of GEMMs. High utilization.
  - term: Decode
    meaning: The phase that emits one token at a time. Bottleneck flips to memory bandwidth.
  - term: TTFT
    meaning: Time to first token. Queue wait plus prefill.
  - term: Inter-token latency
    meaning: Time between decode tokens. What users feel as "the model is typing."
projects:
  - smol-vLLM
  - RelayServe
relatedWriting:
  - eighty-busy-still-slow
  - kv-needs-a-phone-book
  - llm-inference
  - sunday-slack-27k
source: https://www.linkedin.com/posts/goabiaryan_i-ran-the-exact-same-model-on-the-exact-activity-7482099055607721985-LN5p
---

## System overview

**Model / GPU / stack:** Held constant.

**Request A:** Short prompt, moderate completion. Total latency **3.3 seconds**.

**Request B:** Long prompt or a decode-heavy shape. Total latency **39 seconds**.

**Scheduler:** The component that decides whether those two shapes share a batch.

## What I observed

I ran the exact same model on the exact same GPU. One request took 3.3 seconds. Another took 39.

What changed? Not the weights. Not the driver. The shape of the request.

## Why I think this happened

If the model, GPU, and software stack are identical, you expect similar latency. That intuition is for a single kernel, not a serving loop.

Prefill reads the prompt and writes the KV cache, lots of GEMMs, high utilization. Decode emits one token at a time, rereading the cache. The bottleneck flips from compute to memory bandwidth.

A 12,000-token prompt with a short completion can spend most of its life in prefill. A chatty decode with a tiny prompt lives in the memory-bound loop. Mix them in one batch and you punish both.

## Finding 1: Inference is a scheduler problem

**Claim.** The mistake is thinking inference is “run the model.” It is a scheduler deciding whose prefill steals whose decode.

**Evidence.** Same weights, same card, 3.3 seconds vs 39 seconds. A napkin that uses 4,200 prompt tokens/second and 28 milliseconds TPOT already separates a short chat from a long prompt by a large factor.

**Explanation.** Prefill and decode do not share a critical path. Continuous batching is a policy over those paths.

**Implication.** Do not use one p50. Split TTFT and inter-token latency. Do not colocate monster prefills with interactive decode if you can avoid it.

```python
# Prefill is compute-bound. Decode is memory-bound.
# Same weights. Different critical path.

def rough_latency_s(prompt_tokens, new_tokens, tpot_ms=28, prefill_tps=4200):
    prefill = prompt_tokens / prefill_tps
    decode = new_tokens * (tpot_ms / 1000)
    return round(prefill + decode, 1)

print("short chat", rough_latency_s(128, 80))
print("long prompt", rough_latency_s(12000, 80))
```

| Shape | Prompt tokens | New tokens | Napkin latency (seconds) |
| ----- | ------------: | ---------: | -----------------------: |
| Short chat | 128 | 80 | 2.3 |
| Long prompt | 12,000 | 80 | 5.1 |

The napkin does not recover 39 seconds by itself, that number includes queueing, batch pollution, and a heavier decode or a slower effective prefill than 4,200 tokens/second. The table is the mechanism. The 3.3 vs 39 is the measurement.

## Practical guidance

1. Log prompt tokens, generated tokens, TTFT, and TPOT on every request.
2. Separate prefill-heavy and decode-heavy pools when the mix is hostile.
3. Treat the scheduler as the product, not the model card.

## Limitations

The 3.3s / 39s pair is a same-stack observation, not a public trace with a named GPU and engine. The napkin rates (4,200 prefill tokens/second, 28 ms TPOT) are illustrative. Disaggregated prefill/decode changes the scheduling story but not the two-phase physics.

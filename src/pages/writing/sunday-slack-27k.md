---
layout: ../../layouts/Post.astro
title: "Why Agent Workloads OOM at 62% GPU Utilization: KV Cache, Multi-Turn State, and a $27k Weekend"
seoTitle: "Why Agents OOM at 62% GPU: KV and a $27k Weekend"
date: 15 February 2026
published: 2026-02-15
summary: "This investigation reconstructs a weekend where an agent demo that looked 10× over-provisioned lost seven of twelve replicas and spent $27k. nvidia-smi still reported 62% GPU utilization. The limiting resource was not FLOPs. It was KV-cache residency across 50–70 turn agents with tool retries. The post separates stateless RAG from stateful agents and gives admission rules that would have stopped the bleed."
kind: Investigation
cover: /assets/posts/sunday-slack-27k.jpg
coverCaption: "Figure 1. The Friday capacity model assumed short, discardable context. Saturday users ran multi-turn agents."
topics:
  - LLM inference
  - KV cache
  - inference observability
  - queueing
question: "Why did an agent serving stack die at 62% GPU utilization and spend $27k over a weekend?"
takeaways:
  - GPU utilization is a vanity metric when the replica is dying of memory, not FLOPs.
  - Stateless RAG discards context. Agents lease HBM for the life of the thread.
  - KV cache plus fragmentation can make "free" memory unallocatable.
  - Price per solved task, failures included, not per happy-path token.
  - Cap context growth and timeout stuck agents before you add replicas.
definitions:
  - term: KV cache
    meaning: The key-value attention cache maintained during autoregressive inference. On an agent thread it is a lease on HBM that grows with turns and tool traces.
  - term: Stateless RAG
    meaning: Retrieve, generate, discard. Context does not persist across decisions. Retry is cheap.
  - term: Agent thread
    meaning: Plan, act, observe, repeat. State persists across tool calls. Retry is expensive because the cache is still warm and still resident.
  - term: HBM fragmentation
    meaning: Memory that nvidia-smi reports free but the allocator cannot place as a contiguous KV block.
  - term: Goodput
    meaning: Successful completed tasks inside the SLO. A burned replica is zero goodput at full rack cost.
projects:
  - RelayServe
  - smol-vLLM
relatedWriting:
  - eighty-busy-still-slow
  - kv-needs-a-phone-book
  - same-gpu-different-century
  - job-that-didnt-exist
source: https://www.linkedin.com/posts/goabiaryan_%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%A7%F0%9D%90%9D%F0%9D%90%9A%F0%9D%90%B2-%F0%9D%90%9E%F0%9D%90%AF%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%92%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%9C%F0%9D%90%A4-activity-7428626718745337856-r6bV
---

## System overview

**Capacity model (Friday):** Weight size plus a short context. Tokens per request. Dollars per million tokens. The spreadsheet said 10× headroom.

**Workload (Saturday):** 50–70 turn agents with tool retries. Context accumulates. KV cache stays resident.

**Replica:** One GPU (or TP group) running an inference engine. Dies when the allocator cannot place the next KV block.

**Gateway:** RelayServe is the one I use to see request IDs and metrics before the node is already dead.

## What I observed

I expected 10× headroom. The Friday math said so.

Saturday, real users ran 50–70 turn agents with tool retries. Seven of twelve replicas died. nvidia-smi still said **62% utilized**. The weekend bill crossed **$27,000**.

One long thread could spike a node from about **150 GB** to **220+ GB** of resident state. Fragmentation did the rest.

## Why I think this happened

The question that matters is not “how much does one forward pass cost?” It is “does state persist across decisions?”

Stateless RAG: retrieve, generate, discard. Linear. Retry is cheap.

Agents: plan, act, observe, repeat. The KV cache is a lease on HBM. Utilization can look modest because decode is memory-bound and often leaves SMs idle while the allocator is already out of placeable cache.

## Finding 1: 62% utilization is compatible with an OOM outage

**Claim.** A replica can be memory-dead while SM utilization looks healthy.

**Evidence.** Seven of twelve replicas died. The dashboard still read 62% GPU utilization. Resident state moved from ~150 GB to 220+ GB on long threads.

**Explanation.** Utilization counts busy SMs. OOM is an allocator event. Prefill/decode kernels can look relaxed while KV pages and fragmentation exhaust HBM.

**Implication.** Page on allocatable KV headroom and replica death, not on nvidia-smi.

## Finding 2: Agent cost is a lease, not a token

**Claim.** Multi-turn agents change the unit of capacity from tokens to resident state × time.

**Evidence.** A back-of-envelope that treats KV as `concurrency × kv_per_turn × turns` jumps from a demo footprint to a Saturday footprint without changing the weights.

**Explanation.** Each tool retry extends the lease. Failures still occupy cache until timeout.

**Implication.** Price per solved task, failures included. Cap context growth. Timeout stuck agents. Refuse to scale on GPU util alone.

```python
def agent_vram_gb(weights, kv_per_turn, turns, concurrency):
    # Weights are the easy part. The KV cache is the lease.
    return weights + concurrency * kv_per_turn * turns

print("demo", round(agent_vram_gb(145, 0.9, 8, 4), 1), "GB")
print("saturday", round(agent_vram_gb(145, 0.9, 70, 12), 1), "GB")
```

| Scenario | Weight (GB) | Turns | Concurrency | Implied resident (GB) |
| -------- | ----------: | ----: | ----------: | --------------------: |
| Friday demo | 145 | 8 | 4 | 173.8 |
| Saturday traffic | 145 | 70 | 12 | 901.0 |

The Saturday line is why twelve replicas were never twelve replicas. It is a napkin, not a profiler dump, the 150→220 GB observation is the measured spike on a single node; the table shows how fast the same rule explodes when turns and concurrency move together.

## Practical guidance

1. Separate capacity models for RAG and agents.
2. Cap max turns and max cached tokens per thread.
3. Time out tool loops. A stuck agent is a cache leak with an API.
4. Export request IDs, KV bytes, and replica death from the gateway, RelayServe’s reason for existing.
5. Do not add GPUs because utilization is 62%.

## Limitations

This is a reconstructed incident, not a public reproducible benchmark. Hardware SKU, exact model, and engine flags are not named here. The VRAM function is linear and ignores fragmentation, which makes the real Saturday worse than the formula. Other agent frameworks with aggressive cache eviction will fail differently, usually as collapsing TTFT rather than hard OOM.

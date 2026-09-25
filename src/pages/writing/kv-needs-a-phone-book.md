---
layout: ../../layouts/Post.astro
title: "Why KV Cache Needs a Directory: Locality, Leases, and Cache-Aware Routing"
date: 8 July 2026
published: 2026-07-08
summary: "This investigation argues that KV cache stops being an allocator problem the moment it has a location. On one GPU, KV is pages. Across a cluster, KV is a directory: who has this prefix, how stale is it, what does it cost to move. Systems such as Mooncake, LMCache, and cache-aware routing are naming and locality, not 'ML.' Hashing users to GPUs without a phone book relayouts prefixes all day and calls it a GPU problem."
kind: Investigation
cover: /assets/posts/kv-needs-a-phone-book.png
coverCaption: "Figure 1. Once the KV cache leaves a single GPU, you need a directory, not a bigger allocator."
topics:
  - LLM inference
  - KV cache
  - distributed systems
question: "What changes about KV cache when inference leaves a single GPU?"
takeaways:
  - On one GPU, KV cache is an allocator. Across a cluster, it is a directory.
  - "Prefix locality is a routing problem: who has this prefix, how stale, what does a move cost."
  - Mooncake, LMCache, and cache-aware routing are distributed systems with a transformer attached.
  - Hash(user) routing without a directory relayouts prefixes and blames the GPU.
definitions:
  - term: KV cache
    meaning: The key-value attention cache maintained during autoregressive inference.
  - term: Prefix
    meaning: A leading token span whose KV can be reused if the next request shares that span.
  - term: KV directory
    meaning: "A mapping from prefix identity to location (node, GPU, tier: HBM / DRAM / NVMe) and lease state."
  - term: Cache-aware routing
    meaning: Sending a request to the worker that already holds the relevant prefix, rather than to a random warm GPU.
projects:
  - smol-vLLM
  - RelayServe
relatedWriting:
  - sunday-slack-27k
  - eighty-busy-still-slow
  - llm-inference
  - one-roadmap
source: https://www.linkedin.com/posts/goabiaryan_heres-one-of-%F0%9D%90%A6%F0%9D%90%B2-%F0%9D%90%9F%F0%9D%90%9A%F0%9D%90%AF-%F0%9D%90%8A%F0%9D%90%95-%F0%9D%90%9C%F0%9D%90%9A%F0%9D%90%9C%F0%9D%90%A1%F0%9D%90%9E-activity-7469727447517794306-f3CF
---

## System overview

**Single-GPU KV allocator:** Pages, blocks, eviction. PagedAttention lives here. smol-vLLM exists so you can read this loop without a 200k-line engine.

**Cluster KV directory:** Which node holds this prefix. Which tier. How stale. What a transfer costs.

**Router:** If it is `hash(user)` and the cache is sticky by accident, you will copy prefixes forever.

## What I observed

On one GPU, KV is an allocator. Across a cluster, KV is a directory: who has this prefix, how stale is it, what does it cost to move.

Mooncake, LMCache, cache-aware routing, that is not “ML.” That is naming, locality, and leases.

## Finding 1: Location turns cache into a distributed system

**Claim.** Generic inference education becomes a distributed-systems problem the moment cache has a location.

**Evidence.** The literature that matters here is prefix-sharing systems and cluster schedulers (Mooncake, LMCache, Llumnix, Preble), not another kernel blog.

**Explanation.** Reuse requires identity. Identity requires a phone book. Movement has a cost that can exceed regeneration.

**Implication.** Build or buy a directory before you buy another eight-pack to “add cache.”

```python
# Once KV leaves a single GPU, you have a directory problem.
class KVDirectory:
    def locate(self, prefix_hash):
        # which node, which GPU, which tier (HBM / DRAM / NVMe)?
        ...
    def pin(self, prefix_hash, locality_hint):
        # routing without this is a coin flip
        ...
```

## Practical guidance

1. Give prefixes an identity (hash of the token span, not the user id).
2. Route on that identity. Log hit, miss, and migration cost.
3. Treat HBM / DRAM / NVMe as tiers with explicit admission, not as “overflow.”
4. Read the cache papers before another CUDA tutorial.

## Limitations

This is a design argument, not a bake-off of Mooncake vs LMCache vs llm-d. Hit rates are workload-specific (shared system prompts vs unique RAG contexts). A directory can become the bottleneck if you design it like a chatty control plane.

---
layout: ../../layouts/Post.astro
title: "Junior Throws GPUs. Principal Deletes Them: Why Over-Engineering Hides the Queue"
seoTitle: "Junior Throws GPUs. Principal Deletes Them"
date: 9 December 2025
published: 2025-12-09
summary: "The funny ladder is a critique of architecture theater. Junior throws everything on the box. Mid adds Kubernetes so the OOM restarts politely. Senior writes four kinds of parallelism and a design doc. Principal meets the SLO with half the GPUs because they measured the queue, not the model. Over-engineering is how we hide that we never wrote down the bottleneck. I would rather see one good trace than a new service mesh."
kind: Investigation
cover: /assets/posts/junior-throws-gpus.jpg
coverCaption: "Figure 1. Experience to true simplicity: the diagram grows through senior, then the principal deletes boxes until a line remains."
topics:
  - inference careers
  - LLM inference
  - queueing
question: "Why does adding GPUs, Kubernetes, and parallelism so often fail to fix a serving incident?"
takeaways:
  - Hardware and orchestration are not a diagnosis. They are what you do after you name the bottleneck.
  - Mid-level "fix" is often a polite restart of the same OOM.
  - Senior parallelism without a measured scarce resource is a design doc, not a system.
  - Principal work looks like deletion: half the GPUs, fewer services, one honest queue.
  - One good trace beats a new service mesh.
definitions:
  - term: Architecture theater
    meaning: Adding components (replicas, meshes, parallelism modes) so the design looks mature while the bottleneck stays unnamed.
  - term: Queue
    meaning: Requests waiting for a batch slot, a KV page, or a free SM. User latency often lives here, not in the kernel.
  - term: OOM
    meaning: Out of memory. On inference boxes this is frequently KV-cache pressure or fragmentation, not "the model is too big" in the training sense.
  - term: Trace
    meaning: A request-level record of wait, prefill, decode, and resource leases. The opposite of a vanity dashboard.
  - term: Parallelism
    meaning: Splitting a model across GPUs (tensor, pipeline, data, expert). Useful when the model or batch does not fit; expensive when the bottleneck is a queue.
projects:
  - RelayServe
  - Joule
relatedWriting:
  - job-that-didnt-exist
  - eighty-busy-still-slow
  - one-roadmap
  - sunday-slack-27k
course: true
source: https://www.linkedin.com/posts/goabiaryan_junior-ai-engineer-just-throw-everything-activity-7404194275833421824-vHlN
note: A funny ladder that is actually a critique of architecture theater.
---

## System overview

**Junior box:** One GPU. Every model, every request shape, every hope. When it dies, buy a bigger box.

**Mid platform:** Kubernetes plus a second replica. The OOM is now a restart policy. The allocator still cannot place the next KV block.

**Senior stack:** Tensor parallel, a custom scheduler, three dashboards, a design doc with four kinds of parallelism.

**Principal system:** The SLO is met. Half the GPUs are gone. Two services were deleted. The queue was the product.

## What I observed

The joke writes itself because I have sat in the rooms.

Junior AI engineer: throw everything on the box.

Mid: add Kubernetes so the OOM restarts politely.

Senior: four kinds of parallelism and a design doc.

Principal: the SLO is met with half the GPUs because they measured the queue, not the model.

I would rather see one good trace than a new service mesh.

## The argument

Over-engineering is how we hide that we never wrote down the bottleneck.

Each rung on the ladder adds a thing you can put on a slide. None of those things require you to say: wait time, KV lease, batch mix, or interconnect stall. So the org buys the next abstraction and the users keep waiting.

Principal work looks like subtraction because the scarce resource was already there. You cannot parallelize your way out of a queue you refuse to measure. You cannot mesh your way out of an allocator that is fragmented. Deleting a replica that existed to comfort the dashboard is the unglamorous version of seniority.

## Finding 1: Replicas and meshes restart the same failure

**Claim.** Orchestration without a named bottleneck converts a crash into a loop.

**Evidence.** The mid-level move in this ladder is Kubernetes plus a second replica. The failure mode does not change: the box still OOMs. It just comes back. The field note's punchline is "polite", the process manager is healthier than the request.

**Explanation.** If the limiter is KV residency or a hostile prefill/decode mix, a new pod copies the same lease math onto another GPU. You have bought a second copy of the mistake. A service mesh then gives you retries, which multiply work into the same full queue.

**Implication.** Do not promote the restart policy to an architecture. Trace one request first.

## Finding 2: Parallelism without a queue measurement is a design doc

**Claim.** Four kinds of parallelism are not a diagnosis. They are a menu.

**Evidence.** The senior rung in the joke is tensor parallel, a custom scheduler, three dashboards. The principal rung is deletion: half the GPUs, two services gone, the queue treated as the product.

**Explanation.** Tensor and pipeline parallelism move bytes across a fabric. That is the right lever when the model does not fit or the batch cannot live on one card. It is the wrong lever when requests are waiting, KV is fragmented, or you are mixing a 12k prefill with a chat completion. Dashboards that show SM busy will ratify the senior design. Users will not.

**Implication.** Write the bottleneck in one sentence before you draw the parallelism diagram. If you cannot, you are still junior with a bigger vocabulary.

## The mental model

Experience should collapse the graph, not decorate it.

```text
Junior     : just throw everything on one GPU
Mid        : Kubernetes + a second replica
Senior     : tensor parallel, custom scheduler, three dashboards
Principal  : delete two services. the queue was the product.
```

| Rung | Typical move | What it actually changes | Unit of progress |
| ---- | ------------ | ------------------------ | ---------------- |
| Junior | Fill the box | Occupancy of one GPU | models / GPU |
| Mid | Replica + restart | Crash interval, not the limiter | pods |
| Senior | Parallelism + dashboards | Communication tax, slide count | GPUs, docs |
| Principal | Delete and measure | Queue depth and SLO | wait (ms), goodput |

"Half the GPUs" is the field-note punchline (a relative outcome after measuring the queue) not a published capacity study.

## Practical guidance

1. Write the bottleneck in one sentence before you add a component.
2. Prefer one request-level trace over a new mesh.
3. Treat OOM as an allocator story (KV, fragmentation) until proven otherwise.
4. Do not buy parallelism until you know what does not fit.
5. Reward deletion that holds the SLO. That is the senior signal.

## Limitations

This is a teaching ladder, not a job-level rubric and not a controlled experiment. Teams skip rungs; some juniors measure queues and some principals collect dashboards. "Half the GPUs" is an observed pattern when the queue was the product, not a guarantee. Kubernetes and tensor parallelism are real tools. The critique is using them as a substitute for naming the limiter.

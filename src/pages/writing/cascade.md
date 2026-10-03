---
layout: ../../layouts/Post.astro
title: "CASCADE: Why Fault Tolerance Without Adaptive Consistency Still Breaks GPU Clusters"
seoTitle: "CASCADE: Adaptive Consistency for GPU Clusters"
date: 14 January 2026
published: 2026-01-14
summary: "This investigation argues that GPU orchestration recovers liveness and leaves consistency static. Horovod, Ray, and DeepSpeed can restart a rank. They do not change how the cluster is allowed to disagree while that rank is gone. I lay out CASCADE: a causality-preserving lattice over strong, causal, and eventual consistency, walked by autonomous fault detection."
kind: Investigation
topics:
  - distributed systems
  - GPU engineering
  - LLM inference
question: "Why is restarting a failed GPU not enough if the cluster cannot change its consistency model at runtime?"
takeaways:
  - Fault tolerance recovers liveness. It does not decide how stale a GPU is allowed to be while it recovers.
  - Horovod, Ray, and DeepSpeed treat consistency as static or operator-owned. The cluster still over-synchronizes or silently diverges.
  - Strong, causal, and eventual consistency are a lattice you can walk, not a setting you pick once.
  - A legal transition has to keep causal order. Downgrade under pressure, upgrade on recovery, and keep a debt log of what you relaxed.
  - Multi-agent inference and LLM training both fail when an agent or a rank acts on an out-of-order world.
definitions:
  - term: CASCADE
    meaning: Causal Adaptive Consistency with Autonomous Detection and Escalation. A model for runtime consistency shifts that stay causally safe on GPU clusters.
  - term: Consistency lattice
    meaning: A partial order over strong, causal, and eventual guarantees. You walk it under faults and recoveries instead of freezing one level.
  - term: Causal safety
    meaning: No read or update is allowed to observe a state that violates cause and effect, including during a transition.
  - term: Consistency debt
    meaning: The metadata, clocks, and logs you must keep while you relax a guarantee, so you can escalate again without inventing history.
  - term: Static consistency
    meaning: A single regime (strong, causal, or eventual) chosen before the job and left in force through failures.
projects:
  - Joule
relatedWriting:
  - ai-factory-dynamical-system
  - kv-needs-a-phone-book
  - sunday-slack-27k
  - eighty-busy-still-slow
  - job-that-didnt-exist
research:
  - "Causal Reflection with Language Models"
---

## System overview

**Orchestrator:** Horovod, Ray, DeepSpeed, or a cousin. Parallelism, scheduling, checkpoint, resume. Owns liveness.

**Collective:** NCCL / RDMA barriers. The expensive agreement. A slow rank makes everyone wait.

**Consistency regime:** Strong (linearizable total order), causal (cause and effect), or eventual (convergence only). In the current stack this is usually static or operator-owned.

**Fault:** Fail-stop GPU, link delay, node churn, skew, or a stale update that already happened.

**CASCADE:** The control loop I want: detect the fault, walk the consistency lattice, keep causal order, pay a debt so you can escalate again.

## What I observed

I treated fault tolerance and consistency as two meetings. One room talked checkpoints and last-known-good state. The other talked Paxos, Raft, and how stale a replica was allowed to be. On a GPU cluster those rooms are the same plant.

A rank dies on thermal or HBM. NCCL waits. Horovod or DeepSpeed restarts from a shard. Ray moves the actor. The job is up. Then a straggler, a delayed AllReduce, or a multi-agent planner reads a world that never happened in that order. The process survived. The semantics did not.

Horovod, Ray, and DeepSpeed are good at the jobs they were built for. Parallelism. Memory. ZeRO. Elastic recovery. They do not own the consistency model as a runtime object. Microsoft's Monarch work on fault-tolerant inference is in the same family: recover the path, leave the regime where you found it.

| Approach | Consistency | Fault handling | GPU-aware | Causal transitions |
| --- | --- | --- | --- | --- |
| Raft / Paxos | Strong | Limited | No | No |
| CRDTs | Eventual | None | No | No |
| Horovod | External / none | Basic | Yes | No |
| Ray / DeepSpeed | Static or operator-owned | Recovery primitives | Yes | No |
| Monarch | Static | Yes | Yes | No |
| CASCADE | Adaptive | Coupled to the transition | Yes | Yes |

## Why I think this happened

Fault tolerance answers "can we continue." It does not answer "under which agreement are we allowed to continue."

CAP is not a slogan here. Gilbert and Lynch formalized what Brewer guessed. Paxos and Raft buy a total order. Dynamo and CRDTs buy availability and convergence. Bayou already knew you sometimes relax and reconcile. Causal memory and vector clocks tell you which partial order you may forget.

None of that was written for NCCL. A barrier that waits on a thermally throttled rank wastes everyone else's silicon. A relaxed read that lets an agent act on a stale plan wrecks a multi-agent rollout. Stale Synchronous Parallel already showed that "a bit late" is not free. Checkpoint/restart can come back cheap and still be semantically wrong.

Three modes kept repeating. A GPU slows down and strong consistency stalls the job. You loosen the regime and causal edges disappear. You recover from a checkpoint and nobody tells the consistency layer that membership or in-flight updates changed. You resumed. You did not reconcile.

## Finding 1: Recovery without a consistency walk is not enough

**Claim.** Restarting a GPU restores liveness. It does not decide how stale the cluster is allowed to be while that GPU is gone.

**Evidence.** Production orchestrators expose checkpoint, reschedule, and elastic join. They inherit consistency from the storage plane or leave it to the operator. After a transient GPU or interconnect fault, jobs come back and still apply updates that are late, partial, or out of causal order.

**Explanation.** Traditional fault tolerance is restart, reassign, resume. It does not evolve the consistency strategy during the failure. Resume with a stale shard and you are "fault tolerant" and incorrect. Over-synchronize and you waste GPU time. Under-coordinate and you diverge.

**Implication.** Couple detection to a consistency transition. Do not treat failover as the end of the incident.

## Finding 2: Strong, causal, and eventual are a lattice, not a setting

**Claim.** The regime has to move at runtime, and only along walks that preserve causal safety.

**Evidence.** Strong is linearizability. Causal is a partial order of cause and effect. Eventual promises convergence if updates stop, and says nothing about the path. Those three are not always a single slider, which is why a lattice is the honest picture. Static systems pick one level and stay there through node churn, NCCL delays, and skew.

**Explanation.** Under pressure I want strong to causal, then causal to eventual. Under recovery I want the reverse. The walk is legal only if I keep a consistency debt: clocks, in-flight updates, shard or prefix identity, a log of what I relaxed. Drop the debt and the next escalation invents history.

The fault model is the GPU job, not a textbook replica set: fail-stop, link delay, churn, skew, corruption already in the state.

| Fault | From | To | Why |
| --- | --- | --- | --- |
| GPU fail-stop | Strong | Causal | Node lost. Relax the barrier. Keep cause and effect. |
| GPU fail-stop | Causal | Eventual | More than one failure. Best effort. |
| High link delay | Strong | Causal | The fabric is lying. |
| High link delay | Causal | Eventual | It is still lying. |
| High node churn | Strong | Causal | Membership is not a constant. |
| State corruption | Any | Eventual | Assume almost nothing until you can prove more. |
| Recovery detected | Eventual | Causal | Clocks come back. Start tracking again. |
| Stable sync | Causal | Strong | The barrier is honest. Take the total order back. |

```python
from enum import Enum, auto

class Consistency(Enum):
    STRONG = 3
    CAUSAL = 2
    EVENTUAL = 1

class FaultEvent(Enum):
    GPU_FAIL_STOP = auto()
    LINK_DELAY_HIGH = auto()
    NODE_CHURN_HIGH = auto()
    STATE_CORRUPTION = auto()
    RECOVERY_DETECTED = auto()
    STABLE_SYNC = auto()

transition_table = {
    (Consistency.STRONG, FaultEvent.GPU_FAIL_STOP): Consistency.CAUSAL,
    (Consistency.CAUSAL, FaultEvent.GPU_FAIL_STOP): Consistency.EVENTUAL,
    (Consistency.STRONG, FaultEvent.LINK_DELAY_HIGH): Consistency.CAUSAL,
    (Consistency.CAUSAL, FaultEvent.LINK_DELAY_HIGH): Consistency.EVENTUAL,
    (Consistency.STRONG, FaultEvent.NODE_CHURN_HIGH): Consistency.CAUSAL,
    (Consistency.STRONG, FaultEvent.STATE_CORRUPTION): Consistency.EVENTUAL,
    (Consistency.CAUSAL, FaultEvent.STATE_CORRUPTION): Consistency.EVENTUAL,
    (Consistency.EVENTUAL, FaultEvent.RECOVERY_DETECTED): Consistency.CAUSAL,
    (Consistency.CAUSAL, FaultEvent.STABLE_SYNC): Consistency.STRONG,
}

def transition_consistency(current, event):
    return transition_table.get((current, event), current)
```

**Implication.** Policy is when. Protocol is how. Detection looks at dead ranks, collective latency, churn, skew, checksums. Escalation is a coordinated walk, not a failover script.

## The mental model

Traditional system: stateless retry, one-size-fits-all consistency, fault tolerance in one box and correctness in another.

CASCADE: state-aware and cause-aware adaptation. The lattice is the state. The fault is the input. The table is the policy. The debt log is what lets you go back up.

This is the same instinct as [Why Your AI Factory Is a Dynamical System](/writing/ai-factory-dynamical-system/). A plant that switches regimes still has to know which regime it is in. There it is power, queues, and KV. Here it is agreement among GPU ranks.

The use case I keep returning to: a worker joins mid-task, state is inconsistent, the system downgrades, finishes the work it can still do safely, then recovers to causal once clocks and membership agree. Skip the downgrade and you stall. Skip the debt and you come back strong and lie.

LLM training can survive a retry and still lose the causal shape of an update. Multi-agent inference is worse. A stale agent is not a slow worker. It is a wrong world. I already watched agent threads lease HBM until the box died, in [Why Agent Workloads OOM at 62% GPU Utilization](/writing/sunday-slack-27k/). Here the failure is semantic.

## Practical guidance

1. Name the current consistency regime as a first-class runtime object. If you cannot print it, you cannot walk it.
2. Wire health signals (dead ranks, collective latency, churn, skew) to a transition, not only to a restart.
3. Keep a consistency debt: clocks, in-flight updates, what you relaxed.
4. Downgrade before you stall a healthy rank on a barrier the fabric cannot keep.
5. Upgrade only after reconciliation, not after the process manager looks green.
6. Treat multi-agent state like training shards: out-of-order worlds are correctness bugs, not slow workers.

## Limitations

This is a systems argument and a formal sketch, not a bake-off on a named 512-GPU job. I have not published speedups or a public prototype here. The transition table is a policy I can defend in a room. I am not claiming the first paper on adaptive consistency, the first GPU orchestrator, or the first use of vector clocks. Bayou, causal memory, Horovod, Ray, DeepSpeed, and the NCCL measurement literature are the floor. Results will differ across NCCL versions, transformers versus agent graphs, and how expensive your barrier actually is. Joule exists because wasted GPU time is also wasted energy. CASCADE is the consistency half of that ledger.

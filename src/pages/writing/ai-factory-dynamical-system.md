---
layout: ../../layouts/Post.astro
title: "Why Your AI Factory Is Secretly a Dynamical System (And 5 Other Counter-Intuitive Truths About Modern AI Inference)"
seoTitle: "Why Your AI Factory Is a Dynamical System"
date: 2 October 2026
published: 2026-10-02
summary: "AID (AI Infrastructure Dynamics) is a dynamical representation and framework for AI infrastructure: a coupled system whose relevant state spans physical, computational, networking, and serving processes. This investigation treats a modern inference facility as that plant, not a rack of servers with independent dashboards. Isolated GPU utilization, mean arrival rate, and observational forecasts fail once power, cooling, HBM, queues, client retries, and prefix-cache structure interact. Forecasting under the last policy, controlled-state sufficiency, and intervention identification are uses of that representation, not substitutes for it. The post lays out six claims: GPU compute utilization is not allocatable HBM, mean workload is not workload state, demand can be closed-loop, infrastructure evolves on multiple clocks, forecasting is not intervention, and serving state includes trees and graphs."
kind: Investigation
cover: /assets/posts/ai-factory-digital-twin.png
coverVideo: /assets/ai-factory-video.mp4
coverCaption: "An inference facility is a coupled physical-computational plant. Power, cooling, HBM, queues, and retries move together."
preprint: /assets/pre-print-oct-3.pdf
preprintLabel: Read arXiv pre-print
citeTitle: "AID: A Framework for AI Infrastructure Dynamics"
citeKey: aryan2026aid
citeJournal: "arXiv preprint"
citePublished: 2026-10-03
topics:
  - LLM inference
  - GPU engineering
  - queueing
  - KV cache
  - inference observability
question: "Why do isolated GPU, load, and forecast metrics fail to describe an inference facility at scale?"
takeaways:
  - An inference facility is a coupled physical-computational system. A thermal or power event at the floor can become an SLO miss at the request.
  - GPU compute utilization is not allocatable HBM. You can OOM at 62% SM occupancy when KV cache and fragmentation eat the address space.
  - Same mean arrival rate does not mean the same trajectory. Burstiness, prefill/decode mix, and autocorrelation decide the queue.
  - Client retries can make demand endogenous. A timeout storm can keep the plant overloaded after the original spike is gone.
  - Microseconds, milliseconds, and minutes are different clocks. One sampling interval will average away the dynamics you need.
  - A model fit on past telemetry is not a control policy. Intervention requires assumptions and evidence beyond a forecast of the last policy.
  - Serving state is not only a Euclidean vector. Prefix trees and paged KV have to be summarized without losing reuse structure.
definitions:
  - term: AID
    meaning: "AID (AI Infrastructure Dynamics) is a dynamical representation and framework for AI infrastructure. It formalizes the plant as a coupled dynamical system whose relevant state spans physical, computational, networking, and serving processes, with explicit observations, actions, disturbances, configuration and constraints, and service outcomes. It is not tied to one codebase. Other people can implement it or extend it."
  - term: OpenJoule
    meaning: "My open reference implementation of AID. The open-source release is coming soon: a reproducible experimental platform where the AID state, action, and observation structure can be instantiated and evaluated."
  - term: Joule
    meaning: "The company and proprietary product lineage built on the AID architecture. It may diverge from OpenJoule over time. An inference power economics engine that ties physical GPU energy to token throughput and SLO goodput."
  - term: AI factory
    meaning: A term for a high-density inference facility where power, cooling, HBM, interconnect, serving software, and request dynamics interact as one plant. Not every deployment is a factory.
  - term: The plant
    meaning: "The physical-computational system boundary I am talking about: floor, serving stack, and the client rules that write the next arrival."
  - term: Dynamical system
    meaning: A system whose next state depends on current state, actions, and disturbances. Not a bag of independent gauges.
  - term: M_alloc
    meaning: Bytes still placeable for a new allocation after weights, runtime, KV, and fragmentation are accounted for. This is allocatable HBM, not GPU compute utilization.
  - term: GPU utilization
    meaning: SM occupancy in a sampling window. A compute-side observation. It is not HBM occupancy, allocatable HBM, or service rate.
  - term: Workload sufficiency
    meaning: A compressed history of demand is sufficient only if it predicts future state as well as the full trace would.
  - term: Closed-loop demand
    meaning: Realized arrivals depend on past latency, retries, and client state, not only on exogenous user intent.
  - term: Multi-rate dynamics
    meaning: Fast kernel and queue states evolve on a different clock from slow thermal and power-cap states, and each constrains the other.
  - term: do(a)
    meaning: "Pearl's intervention operator. One formal way to write 'force this action' instead of 'condition on having observed it under the old policy.' Not every control problem requires do-calculus. The point is that a forecast of the last policy is not an intervention response."
  - term: Prefix tree G_t
    meaning: Variable-size structured serving state. PagedAttention gives explicit KV block and page management. Prefix-caching systems such as RadixAttention expose shared-prefix and tree structure on top of those pages.
projects:
  - OpenJoule
  - Joule
  - RelayServe
relatedWriting:
  - eighty-busy-still-slow
  - sunday-slack-27k
  - kv-needs-a-phone-book
  - same-gpu-different-century
  - job-that-didnt-exist
  - llm-inference
books:
  - "GPU Engineering: AI Inference and System Design"
research:
  - AID
citations:
  - text: 'G.-I. Yu, J. S. Jeong, G.-W. Kim, S. Kim, and B.-G. Chun, "Orca: A distributed serving system for Transformer-based generative models," in Proc. 16th USENIX Symp. Operating Syst. Design and Implementation (OSDI), 2022, pp. 521–538.'
    href: https://www.usenix.org/conference/osdi22/presentation/yu
  - text: 'W. Kwon et al., "Efficient memory management for large language model serving with PagedAttention," in Proc. 29th ACM Symp. Operating Syst. Principles (SOSP), 2023, pp. 611–626.'
    href: https://arxiv.org/abs/2309.06180
  - text: 'L. Zheng et al., "SGLang: Efficient execution of structured language model programs," in Adv. Neural Inf. Process. Syst. (NeurIPS), vol. 37, 2024.'
    href: https://arxiv.org/abs/2312.07104
  - text: 'A. Agrawal et al., "Taming throughput-latency tradeoff in LLM inference with Sarathi-Serve," in Proc. 18th USENIX Symp. Operating Syst. Design and Implementation (OSDI), 2024, pp. 117–134.'
    href: https://arxiv.org/abs/2403.02310
  - text: 'NVIDIA, "TensorRT-LLM." [Online]. Available: https://github.com/NVIDIA/TensorRT-LLM'
    href: https://github.com/NVIDIA/TensorRT-LLM
  - text: 'J. Stojkovic et al., "TAPAS: Thermal- and power-aware scheduling for LLM inference in cloud platforms," in Proc. 30th ACM Int. Conf. Architectural Support for Programming Languages and Operating Syst. (ASPLOS), 2025, pp. 1266–1281.'
    href: https://arxiv.org/abs/2501.02600
  - text: 'J. Stojkovic, C. Zhang, I. Goiri, J. Torrellas, and E. Choukse, "DynamoLLM: Designing LLM inference clusters for performance and energy efficiency," in Proc. IEEE Int. Symp. High-Performance Computer Architecture (HPCA), 2025, pp. 1348–1362.'
    href: https://arxiv.org/abs/2408.00741
  - text: 'Y. Zhong et al., "DistServe: Disaggregating prefill and decoding for goodput-optimized large language model serving," in Proc. 18th USENIX Symp. Operating Syst. Design and Implementation (OSDI), 2024.'
    href: https://arxiv.org/abs/2401.09670
  - text: 'P. Patel et al., "Splitwise: Efficient generative LLM inference using phase splitting," in Proc. 51st ACM/IEEE Annu. Int. Symp. Computer Architecture (ISCA), 2024.'
    href: https://arxiv.org/abs/2311.18677
  - text: 'N. Bronson, A. Aghayev, A. Charapko, and T. Zhu, "Metastable failures in distributed systems," in Proc. Workshop on Hot Topics in Operating Syst. (HotOS), 2021, pp. 221–227.'
    href: https://doi.org/10.1145/3458336.3465286
  - text: 'R. Qin et al., "Mooncake: A KVCache-centric architecture for serving LLM chatbot," in Proc. 23rd USENIX Conf. File and Storage Technologies (FAST), 2025, pp. 155–170.'
    href: https://arxiv.org/abs/2407.00079
---

## System overview

**Floor:** Electrical distribution, liquid and air cooling, HBM, and interconnect. These are not decorations around the model. They bound clocks, allocatable HBM, and service rate.

**Serving stack:** Gateway, router, batcher, engine. They turn request shape into queue depth, batch mix, and KV leases. Iteration-level scheduling, paged KV, prefix caching, and phase-aware serving are now ordinary machinery, not research extras (Orca [[1]](#cite-1), vLLM [[2]](#cite-2), SGLang [[3]](#cite-3), Sarathi-Serve [[4]](#cite-4), TensorRT-LLM [[5]](#cite-5)).

**Clients:** Timeouts, retries, backoff, and multi-turn agents. They can write the next arrival process from the last latency.

**Telemetry:** GPU utilization, mean load, rack power. Useful observations. Dangerous if you treat each one as the plant.

The plant, in this post, is that whole boundary: floor, serving stack, and the client rules that feed back into arrivals. An AI factory is one name for a high-density version of it. A laptop demo is not.

The cross-layer chain I keep seeing is:

<figure>
  <img src="/assets/posts/ai-factory-cross-layer-chain.png" alt="A power-cap change walks from GPU clock and compute capacity through queue depth, batch composition, TTFT and TPOT, then SLO attainment." />
  <figcaption>ΔP_max → Δf_GPU → Δ compute capacity → Δ queue depth → Δ batching composition → Δ TTFT/TPOT → Δ SLO attainment.</figcaption>
</figure>

Power and thermal coupling is no longer a side topic. TAPAS [[6]](#cite-6) and DynamoLLM [[7]](#cite-7) treat frequency, placement, and cluster configuration as actions that move both energy and SLO.

The state at time $t$ is not a list of independent dashboard numbers. It is a heterogeneous object

$$
x_t = (x_{\mathrm{phys}}, x_{\mathrm{comp}}, x_{\mathrm{net}}, x_{\mathrm{serv}}, G_t)
$$

that couples thermals, clocks, queues, and variable-size serving structure.

AID (AI Infrastructure Dynamics) is the dynamical representation of that plant. It formalizes AI infrastructure as a coupled dynamical system whose relevant state spans physical, computational, networking, and serving processes, with explicit observations, actions, disturbances, configuration and constraints, and service outcomes. OpenJoule instantiates that representation, Joule is built on the same architecture, and neither is required to use AID.

The objects in the representation are:

- the underlying system state $x_t$, including structured serving state $G_t$
- the observations $o_t$ actually available to an observer
- actions $a_t$ taken by the infrastructure (routing, batch bounds, admission, power caps)
- disturbances and workload dynamics $d_t$
- service outcomes $r_t$ (TTFT, TPOT, energy, SLO)
- persistent configuration and physical constraints $\theta$

The question the representation forces is: what state representation preserves the dynamics needed to predict and reason about future service outcomes under the actions the infrastructure may take?

Representing those dynamics is what AID is. Forecasting under the last policy, keeping enough state that a changed action still has a prediction, and identifying an intervention response are uses of that representation, not substitutes for it. A model can forecast accurately under the policy that generated its training data and still fail when we change the power cap, batch policy, routing, admission control, or workload.

The six findings below are why a naive low-dimensional telemetry vector is not $x_t$. They motivate AID. They do not reproduce the paper.

## What I observed

Teams still operate these plants as if isolated metrics were enough. Aggregate GPU compute utilization. Average server load. Overall rack power. The dashboard stays green while a localized thermal spike or a power-cap cut walks up the stack and lands as a queue, a worse batch mix, and a missed TTFT.

I have already written the 62% GPU utilization OOM. That weekend was not a freak dashboard bug. It was the memory-headroom paradox in production: SM occupancy said there was room, the allocator said there was not.

The same *kind* of mistake shows up in load and in clients. Two traces can share a mean arrival rate and grow completely different queues. When TTFT rises, retries can write a new demand process. Those last two are not new measurements in this post. One is a pedagogical pair. The other is a closed-loop mechanism that serving systems make available. The 62% weekend is the empirical result I can point at.

## Why the dashboard lies

Single-variable telemetry is not a small measurement error. It is the wrong object.

You observe $o_t$: SM busy, mean QPS, rack watts. The plant state $x_t$ also has allocatable HBM, KV structure, queue composition, client retry state, and slow thermal bounds. When those stay hidden, a power event looks like a queueing problem, a memory stall looks like a capacity problem, and a retry storm looks like exogenous demand. That is incorrect attribution. Incorrect attribution produces the wrong action: scale the replica, cap the wrong pool, or retry the request that is already feeding the overload.

That chain is the motivation for AID. The important object is not the GPU dashboard. It is the coupled physical-computational dynamics, the observations we actually have of those dynamics, and what happens when we change the actions.

## Finding 1: The GPU is not full, but the system is crashing

**Claim.** GPU compute utilization does not imply allocatable HBM capacity. SM occupancy and HBM allocation are different resource dimensions.

**Evidence.** This one is empirical. An OOM can fire while telemetry reports about 62% GPU compute utilization. I reconstructed one of those weekends in [Why Agent Workloads OOM at 62% GPU Utilization](/writing/sunday-slack-27k/). Seven of twelve replicas died. nvidia-smi still looked relaxed.

**Mechanism.** $U_{\mathrm{GPU}}$ measures SM occupancy in a sampling window. It says nothing about whether the next KV block can be placed. In modern serving, HBM is eaten by weights, runtime, dynamic KV, prompt fragmentation, and long-lived agent context. PagedAttention [[2]](#cite-2) made that allocation explicit: the engine pages KV rather than hoping the CUDA allocator will find a contiguous slab. TensorRT-LLM [[5]](#cite-5) has to solve the same budget in a production stack.

<figure>
  <img src="/assets/posts/ai-factory-hbm-budget.png" alt="HBM budget split into model weights, static runtime, dynamic KV cache, fragmentation loss, and remaining allocatable bytes." />
  <figcaption>$M_{\mathrm{alloc}}$ is what the allocator can still place after weights, runtime, KV, and fragmentation.</figcaption>
</figure>

At evaluation time $t$:

$$
M_{\mathrm{alloc}} = M_{\mathrm{HBM}} - M_{\mathrm{weights}} - M_{\mathrm{runtime}} - M_{\mathrm{KV}} - M_{\mathrm{loss}}
$$

$M_{\mathrm{loss}}$ is request-dependent allocation loss and external fragmentation. Track it explicitly. Do not double-count blocks already in the measured allocations.

Because KV scales with sequence length, concurrency, and agent turns, $M_{\mathrm{alloc}}$ can hit zero while $U_{\mathrm{GPU}}$ stays moderate. When $M_{\mathrm{alloc}} \to 0$, the allocator fails. That is an OOM with "spare" SMs, not spare memory.

**AID interpretation.** GPU utilization is an observation $o_t$. Allocatable HBM is part of the state $x_t$. If your representation collapses those into one "how full is the GPU" number, it cannot tell a compute-bound stall from a memory-bound crash.

**Implication.** Page on allocatable KV headroom and fragmentation, not on SM busy.

## Finding 2: Average load is a lie

**Claim.** Same mean demand does not imply the same trajectory. Mean workload is not workload state.

**Example.** This comparison is pedagogical, not a measured customer trace. A bursty arrival series and a steady series can share the same mean (here, 50 requests/second) and produce different queue depths, tail latency, and failure profiles.

<figure>
  <img src="/assets/posts/ai-factory-bursty-vs-steady.png" alt="Two request-rate traces with the same 50 requests per second mean: a bursty series of spikes versus a nearly flat steady series." />
  <figcaption>Pedagogical pair. Same mean, different trajectories. Spikes exceed batching and prefill capacity; queue depth and tail latency respond nonlinearly.</figcaption>
</figure>

**Mechanism.** Point-in-time averages hide spikes that exceed batching and prefill capacity. Prefill is compute-bound. Decode is memory-bandwidth-bound. They react differently to the same transient. That is why serving systems stopped treating a request as one job: Orca [[1]](#cite-1) schedules at iteration granularity, Sarathi-Serve [[4]](#cite-4) chunks prefill, and DistServe [[8]](#cite-8) and Splitwise [[9]](#cite-9) split the phases onto different resources. Latency grows nonlinearly with queue depth, so a bursty trace violates tails that a steady stream with the same mean never sees.

<figure>
  <img src="/assets/posts/ai-factory-mean-vs-temporal.png" alt="Comparison of mean-load metrics versus temporal structure across demand, execution, memory, and prediction." />
  <figcaption>Mean load is a point average. The disturbance that matters is the temporal structure of the trace.</figcaption>
</figure>

A mean QPS number throws away autocorrelation, prefill/decode mix, and context-length variation. Those are the parts of $d_t$ that move the queue.

**AID interpretation.** Instantaneous arrival rate is a thin observation of the disturbance. Workload state is a history. If two traces agree on the mean and disagree on the future queue, a rate-only representation is not sufficient.

**Implication.** Capacity-plan on traces and phase mix. Do not assume a mean QPS slide is the workload.

## Finding 3: Demand is not external

**Claim.** Under high TTFT, realized arrivals can become a function of your own latency. Retries, timeouts, and the next agent turn write extra work into a queue that is already long.

**Evidence.** This is a synthesis of serving mechanics and a distributed-systems failure pattern, not a new measurement of one production stack. Classical open-loop design treats $d_t$ as exogenous. In serving, timeouts, retries, backoff, and multi-turn agent loops generate extra arrivals when the queue is already long. If that feedback keeps the plant saturated after the original spike is gone, the result is persistent retry-induced overload. In the distributed-systems sense that is a metastable failure [[10]](#cite-10): a self-sustaining degraded state whose trigger has already cleared. I am using that definition. I am not claiming I measured a named metastable incident here.

<figure>
  <img src="/assets/posts/ai-factory-closed-loop-demand.png" alt="Closed-loop demand: exogenous work and client retry state produce realized arrivals, which change system state and service outputs that feed back into the client." />
  <figcaption>Realized arrivals are what actually hits the system. Retries, backoff, and the next agent turn write the next λ.</figcaption>
</figure>

**Mechanism.** Exogenous intent $\xi_{t+1}$ is not the same as realized arrivals. Realized demand depends on past outcomes $y_t$ and client state $c_t$:

$$
a_{t+1} = g(\xi_{t+1}, y_t, c_t)
$$

When $y_t$ triggers retries, $c_t$ joins the plant. The augmented state is $\tilde{x}_t = (x_t, c_t)$. The facility can sit in retry-induced persistent overload: saturated and unusable after $\xi_t$ has cleared.

**AID interpretation.** If clients respond to service, demand is not a pure disturbance. Part of $d_t$ is endogenous. An open-loop replay of yesterday's arrivals will miss the arrivals your latency creates.

**Implication.** Model clients as part of the plant. Track retries and admission before you add replicas to serve your own timeouts.

## Finding 4: One clock cannot run the data center

**Claim.** A single global $\Delta t$ either averages away kernel dynamics or freezes thermal state. Infrastructure evolves on multiple clocks.

**Evidence.** This is a modeling argument, backed by how the stack is built, not a controlled multi-rate experiment in this post. The same facility has phenomena on microseconds, milliseconds, and seconds-to-minutes. TAPAS [[6]](#cite-6) is explicit that LLM phases have distinct thermal and power profiles at millisecond scale, while cooling and power emergencies live much higher up.

<figure>
  <img src="/assets/posts/ai-factory-timescales.png" alt="Three coupled clocks: microsecond kernel and memory events, millisecond queues and batching, and seconds-to-minutes thermal and power-cap dynamics." />
  <figcaption>Fast state averaged over a slow interval drives heat. Slow variables (thermals, power caps) bound the fast steps.</figcaption>
</figure>

1. Microseconds: kernel launches, tensor-parallel AllReduce, memory-bus transactions, L1/L2 hits and misses.
2. Milliseconds: queues, batching timeouts, prefill/decode steps, request-level SLO clocks.
3. Seconds to minutes: thermal buildup, cooling response, DVFS power caps, node autoscaling.

**Mechanism.** Fast dynamics (index $k$, milliseconds) and slow dynamics (index $j$, seconds) interlock:

$$
x^f_{k+1} = f_f(x^f_k, a^f_k, d_k; x^s_j)
$$

$$
x^s_{j+1} = f_s(x^s_j, \bar{x}^f_j, a^s_j)
$$

Slow variables (thermals, power caps) are boundary conditions for fast steps. The fast state averaged over a slow interval, $\bar{x}^f_j$, drives heat. That is a formulation of the coupling, not a fitted twin.

**AID interpretation.** $x_t$ is multi-rate. An observation sampled at one interval is a projection. DynamoLLM [[7]](#cite-7) already treats cluster configuration and GPU frequency as slow actions against a faster request process. A useful operational model would need both clocks, then a way to couple them.

**Implication.** Do not sample the plant at one rate and treat that series as the state. Keep the clocks, then couple them.

## Finding 5: Forecasting is not intervening

**Claim.** Prediction is not intervention. A model trained on observed actions is not, by itself, a model of what happens if you force a new action.

**Evidence.** This is a methodological argument, not evidence that a particular digital twin can already evaluate interventions. Passive forecasting computes

$$
p(r_{t+k} \mid o_{0:t}, a_{0:t})
$$

That is the next reading if the old policy continues. Control needs the outcome of a changed action, with future disturbances $d_{t:t+k}$ and hardware structure $\theta$ held in view. One formal way to write that distinction is

$$
p\!\left(r_{t+k} \mid \mathit{do}(a_{t:t+k} = a^*_{t:t+k}), o_{0:t}, d_{t:t+k}, \theta\right)
$$

Do-calculus is a route, not a requirement. The claim is narrower: observational prediction under one policy does not automatically identify the response to a changed action.

<figure>
  <img src="/assets/posts/ai-factory-forecasting-vs-intervention.png" alt="Passive forecasting assumes the last policy continues. Active intervention evaluates a counterfactual under an imposed hard power cap." />
  <figcaption>A forecast of the last policy is not the outcome of forcing a new action.</figcaption>
</figure>

**Mechanism.** Observational models correlate history under past operating policy. Impose a hard power cap ($\Delta a_{\mathrm{power}} < 0$), change batch bounds, or reroute traffic, and the joint distribution can move. The fit breaks. The plant is also not one smooth $f$. It can switch regimes: normal, saturated, thermal-constrained, power-capped. An operational model that cannot represent those switches is not evaluating an intervention. It is extrapolating the last policy.

**AID interpretation.** $a_t$ is an action, not another feature in $o_t$. A representation that predicts $r_t$ under the logging policy has not shown it preserves the information needed when routing, batching, or power changes.

**Implication.** Do not drive power caps, batch limits, or routing from a forecast trained on the last policy. Intervention requires assumptions and evidence beyond that forecast. Causal identification provides one formal route.

## Finding 6: System state is trees and graphs

**Claim.** Serving state is not only $x_t \in \mathbb{R}^n$. Autoregressive serving stores structure. The state can be variable-size.

**Evidence.** This is a structural consequence of current serving systems, not a newly measured empirical fact. PagedAttention [[2]](#cite-2) gives explicit block and page management for KV memory. That is a graph of pages, not a tree by itself. Prefix-caching systems such as RadixAttention in SGLang [[3]](#cite-3) then expose shared-prefix and conversation-branch structure on top of those pages. Mooncake [[11]](#cite-11) lifts the same cache problem into a distributed KV fabric. $G_t$ is a name for that structured serving state.

<figure>
  <img src="/assets/posts/ai-factory-prefix-tree.png" alt="Prefix tree with a shared system prompt branching into two user turns and their private query suffixes." />
  <figcaption>Shared prefixes share KV blocks. Private suffixes do not. Prefix identity is tree-structured; the pages underneath are a paged store.</figcaption>
</figure>

**Mechanism.** A scalar "free bytes" number loses prefix identity, sharing ratio, cache locality, and recomputation cost. Two caches with the same occupancy can answer the same next request differently: one hits a shared prefix, the other refills. If you collapse $G_t$ to occupancy alone, you will predict free memory and still miss a recompute storm.

**AID interpretation.** $G_t$ is part of $x_t$. Occupancy is one observation of it. A useful operational model would need a summary that keeps reuse structure, or it should keep the structure itself.

**Implication.** Treat prefix identity and paged KV as first-class state, the way a cluster KV directory is first-class in [Why KV Cache Needs a Directory](/writing/kv-needs-a-phone-book/).

## The mental model

AID writes the plant as a coupled dynamical system:

$$
x_{t+1} = f_{z_t}(x_t, a_t, d_t; \theta) + \varepsilon_t \quad \text{(latent state)}
$$

$$
o_t = h(x_t; \theta) + \nu_t \quad \text{(partial telemetry)}
$$

$$
r_t = g(x_t, a_t, d_t; \theta) + \xi_t \quad \text{(service and energy outcomes)}
$$

That is the representation. A useful operational model would need to infer latent state $\hat{x}_t$, update on more than one timescale, model demand that can respond to service, and evaluate changed actions before they hit the floor. Those are uses of the representation: forecasting the dynamics under the existing policy, finding a representation sufficient under changed actions, and identifying intervention responses. The paper writes AID down as a dynamical representation for AI infrastructure, not as a single implementation, and develops two analytical diagnostics and a validation methodology for testing whether a proposed representation actually preserves the dynamics required for future service.

<figure>
  <img src="/assets/posts/ai-factory-digital-twin.png" alt="An operational model that infers latent state, updates on more than one timescale, models closed-loop demand, and evaluates a changed action before the floor, under physical and power constraints." />
  <figcaption>Observed telemetry in, predictive control out, physical and power constraints underneath. This is the requirement, not a deployed system.</figcaption>
</figure>

## Practical guidance

These are operating hypotheses from the argument above, not experimentally validated prescriptions for every stack.

1. Measure the chain, not one gauge. A power or thermal event should show up as queue, batch mix, and TTFT, not only as rack watts.
2. Track $M_{\mathrm{alloc}}$ and KV leases. 62% GPU utilization is compatible with an OOM.
3. Keep arrival traces. Do not assume mean QPS is a workload.
4. Track retry counters in the state. Do not add replicas to serve your own timeouts until you have looked at admission.
5. Sample fast and slow clocks separately, then couple them.
6. Test imposed actions (power cap, batch bound, route) against a model that can change regime. Do not assume a forecast of the last policy is the intervention response.
7. Summarize prefix identity and reuse, not only free bytes.

## Limitations

This investigation is a field reading that motivates AID. The companion preprint states the representation and the validation criteria. This post does not report facility-level validation.

The 62% OOM is an empirical result I have already published. The 50 requests/second traces are a pedagogical pair with a shared mean, not a claim about one customer. Closed-loop demand and metastability are mechanisms with supporting literature, not a measured incident in this article. Multi-rate dynamics and the intervention distinction are modeling arguments. They hold only under the independence and regime assumptions you are willing to state. Results will differ across engines (vLLM, SGLang, TensorRT-LLM), disaggregated prefill/decode, and how aggressively the runtime shares prefixes.

## The open question

Inference is becoming physically constrained. Physical and computational dynamics are coupled. Traditional telemetry abstractions then become inadequate: they observe a projection of the state, not the state. A dashboard of independent gauges is not a state. AID is the dynamical representation of that plant. OpenJoule implements it.

As regional grids, thermal envelopes, and electrical plant become the ceiling, how should hardware-software co-design change when a grid power cap, not spare silicon, is the hard constraint on AI capability?

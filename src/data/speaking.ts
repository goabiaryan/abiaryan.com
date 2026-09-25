export type Talk = {
  date: string;
  title: string;
  event: string;
  href?: string;
  kind?: string;
  slides?: string;
};

export const upcoming: Talk[] = [
  {
    date: "2026-10-24",
    title: "AI Inference Engineering & Systems Design",
    event: "Maven, next cohort, 24 Oct – 19 Dec",
    href: "https://maven.com/goabiaryan/inferencing",
    kind: "Course",
  },
  {
    date: "2026",
    title: "Keynote and invited talks",
    event: "SREDay, Infer() Summit, QCon SF. Dates on LinkedIn as they lock",
    href: "https://www.linkedin.com/in/goabiaryan/",
    kind: "Forthcoming",
  },
];

export const archive: Record<string, Talk[]> = {
  "2026": [
    {
      date: "2026-06-23",
      title: "Reliability Engineering for Inference Serving",
      event: "LLMday, PagerDuty, Lisbon",
      href: "https://llmday.com/2026-lisbon-q2/",
      kind: "Keynote",
    },
    {
      date: "2026-01-24",
      title: "Speaker",
      event: "Data Day Texas",
      href: "https://datadaytexas.com/",
    },
  ],
  "2025": [
    {
      date: "2025-12-06",
      title: "Causal Reflection with Language Models",
      event: "NeurIPS 2025, Efficient Reasoning",
      href: "https://arxiv.org/abs/2508.04495",
      kind: "Paper",
    },
    {
      date: "2025-11-21",
      title: "Building Agents Workshop",
      event: "LLMs and Agentic AI In Production, Nexus 2025",
      href: "https://www.eventbrite.com/e/llms-and-agentic-ai-in-production-nexus-2025-tickets-1745713037689",
      kind: "Workshop",
    },
    {
      date: "2025-11-14",
      title: "LLMOps, agentic systems, and infra",
      event: "O'Reilly Radar Podcast",
      href: "https://www.oreilly.com/radar/tag/podcast/",
      kind: "Podcast",
    },
    {
      date: "2025-10-30",
      title: "GPU Engineering for LLMOps",
      event: "ODSC West 2025",
      href: "https://odsc.ai/",
      kind: "Workshop",
    },
    {
      date: "2025-09-17",
      title: "Speaker",
      event: "The Unintelligence Conference",
      href: "https://www.unintelligence.ai/",
    },
    {
      date: "2025-09-13",
      title: "Fundamentals of GPU Orchestration",
      event: "GPU Engineering Meetups",
      href: "https://luma.com/c50stbjv",
    },
    {
      date: "2025-08-21",
      title: "Debugging and Monitoring LLMs in Production",
      event: "Infrastructure & Ops O'Reilly Superstream",
      href: "https://learning.oreilly.com/live-events/infrastructure-ops-superstream-ai-driven-operations-and-observability/0642572188160/0642572188153/",
    },
    {
      date: "2025-08-16",
      title: "Deploying DeepSeek Models",
      event: "DeepSeek in Production Summit, Packt Events",
      kind: "Workshop",
    },
    {
      date: "2025-07-19",
      title: "LLMOps: Roles and Career Transitions",
      event: "Maven",
      href: "https://maven.com/p/4ee6de/llm-ops-roles-career-transitions?utm_medium=ll_share_link&utm_source=instructor",
    },
    {
      date: "2025-06-24",
      title: "Monitoring RAG Pipelines",
      event: "DataCamp Public Webinars",
      href: "https://www.datacamp.com/",
    },
    {
      date: "2025-06-07",
      title: "Speaker",
      event: "AI Horizons, UPTEC, Porto",
      href: "https://ai-horizons.co/",
    },
    {
      date: "2025-06-04",
      title: "Speaker",
      event: "Lisbon Tech Connect, AI edition",
    },
    {
      date: "2025-05-13",
      title: "Observability in LLM Pipelines",
      event: "ODSC East 2025, Boston",
      href: "https://odsc.com/boston/",
      slides: "/assets/ODSC%20Talk%202025.pdf",
    },
    {
      date: "2025-03-20",
      title: "Evaluating LLMs: From RAG Pipelines to Advanced Reasoning",
      event: "Embrace.ai, Lisbon",
      slides: "/assets/Evals%20presentation.pdf",
    },
    {
      date: "2025-01",
      title: "Serverless LLM Deployment",
      event: "Cloud Engineering for Python Developers, MLOps Club",
      href: "https://mlops-club.org/",
      kind: "Guest lecture",
    },
  ],
  "2024": [
    { date: "2024-11-19", title: "Panelist", event: "Xtreme Python Conference 2024", kind: "Panel" },
    { date: "2024-11-12", title: "Ask the Experts: LLM Engineering", event: "Panel", kind: "Panel" },
    { date: "2024-11-11", title: "Accelerate Your AI Workflows, Mastering GPU Strategies", event: "Generative AI in Action Conference" },
    { date: "2024-10-05", title: "Data Management for LLMs", event: "Data Engineering And Machine Learning Summit 2024" },
    { date: "2024-10-03", title: "Evaluations for Multi-Agent Systems", event: "Aggregate Intellect multi-agents course", kind: "Guest lecture" },
    { date: "2024-04-26", title: "Adventures in Machine Learning", event: "Podcast", kind: "Podcast" },
    { date: "2024-04-24", title: "Deploying and Managing LLMs in Production", event: "O'Reilly Events" },
    { date: "2024-04-17", title: "SecOps for LLMOps", event: "NatWest Bank, U.K." },
    { date: "2024-04-19", title: "Speaker", event: "The LLM Summit 2024" },
    { date: "2024-03-20", title: "AI and Other Hot Takes", event: "AI Tinkerers, Ottawa" },
    { date: "2024-03-16", title: "Productionizing LLMs: LLMOps", event: "AI × Entertainment Hackathon, CIC Tokyo" },
    { date: "2024-03-08", title: "Interview", event: "Hopsworks with Rik Van Bruggen" },
  ],
  "2023": [
    { date: "2023-11-08", title: "What's New in Data", event: "Podcast with John Kutay", kind: "Podcast" },
    { date: "2023-10-26", title: "LLMOps with Abi Aryan", event: "Laconia Capital LP (private)", href: "https://www.laconiacapitalgroup.com/people" },
    { date: "2023-10-13", title: "Productionizing LLMs", event: "Packt Publication Conference", href: "https://www.packtpub.com/conference/put-gen-ai-to-work?link_from_packtlink=yes", kind: "Workshop" },
    { date: "2023-10-10", title: "Domain adaptation and fine-tuning for domain-specific LLMs", event: "AI Engineer Summit", href: "https://www.ai.engineer/summit" },
    { date: "2023-09-20", title: "AMA on LLMOps", event: "Deep Learning Daily, Deci.ai" },
    { date: "2023-08-29", title: "Building AI Agents with LLMs", event: "O'Reilly", href: "https://learning.oreilly.com/live-events/building-ai-agents-with-llms/0636920096162/", kind: "Event chair" },
    { date: "2023-07-07", title: "Cost Modelling for LLMs", event: "LLM Projects Workshop", href: "https://youtu.be/Hne95kH5hxk" },
    { date: "2023-07-07", title: "Self-learning and growth for careers in data and MLOps", event: "Women in Data Podcast", kind: "Podcast" },
    { date: "2023-07-06", title: "Fine-tuning and evaluations for LLMs", event: "What's the BUZZ? with Andreas Welsch", href: "https://www.youtube.com/live/8km8_fK-enY?feature=share" },
    { date: "2023-06-15", title: "LLM Evaluations", event: "LLMs in Production Conference II, MLOps.Community", kind: "Moderator" },
    { date: "2023-05-04", title: "LLMs Demystified", event: "Webinar with Chris Brousseau, MasterCard", href: "https://www.linkedin.com/events/llmsdemsytifiedwithchris-abi7057602763823730688/comments/" },
    { date: "2023-04-26", title: "Large Language Models in Production", event: "Twitter Spaces with Christine Yuen, Shakudo", href: "https://twitter.com/i/spaces/1BRKjZelnOpKw?s=20" },
    { date: "2023", title: "Co-host, MLOps Community Podcast", event: "Guests included Nils Reimers, Waleed Kadous, Maria Vechtomova, Alex Debrie, and others", kind: "Podcast" },
  ],
  "2022": [
    { date: "2022", title: "Co-host, MLOps Community Podcast", event: "Alex Ratner, Simon Thompson, Murtuza Shergadwala, Niklas Kühl", kind: "Podcast" },
  ],
  "2021": [
    { date: "2021-03", title: "Full Stack Deep Learning", event: "Women Who Code Los Angeles", kind: "Workshop" },
  ],
  "2020": [
    { date: "2020-08", title: "Natural Language Processing, hands on", event: "MLNerdie Los Angeles", kind: "Workshop" },
  ],
  "2018": [
    { date: "2018", title: "A Hands-On Application of Causal Methods in Python", event: "PyData Los Angeles", href: "https://pydata.org/la2018/schedule/presentation/10/", kind: "Workshop" },
    { date: "2018", title: "Big Problems at the Heart of Machine Learning", event: "PyData Los Angeles", href: "https://pydata.org/la2018/schedule/presentation/38/" },
  ],
};

export const volunteering = [
  { when: "Ongoing 2025", what: "Reviewer for TMLR, EMNLP, NeurIPS, ICML, ICLR", href: "https://jmlr.org/tmlr/" },
  { when: "Feb 2025", what: "Reviewer, Advances in Approximate Bayesian Inference (AABI) at ICLR 2025", href: "https://approximateinference.org/" },
  { when: "Jun 2024", what: "Reviewer, EMNLP 2024", href: "https://2024.emnlp.org/" },
  { when: "Feb 2024", what: "Reviewer, ACL 2024", href: "https://2024.aclweb.org/" },
  { when: "Mar 2024", what: "Reviewer, AABI 2024" },
  { when: "Oct 2023", what: "Reviewer, NeurIPS Workshop: I (Still) Can't Believe It's Not Better" },
  { when: "Sep 2023", what: "Reviewer, DGM4H NeurIPS 2023" },
  { when: "Mar 2023", what: "Reviewer, AABI 2023" },
  { when: "Sep 2022", what: "Proposal reviewer, PyData NYC" },
  { when: "Sep 2021", what: "Reviewer, NeurIPS Workshop: I (Still) Can't Believe It's Not Better" },
  { when: "Aug 2021", what: "Research mentorship, Association for Computational Linguistics" },
  { when: "Nov 2018", what: "Area chair, AutoML, NeurIPS 2018" },
  { when: "May–Sep 2018", what: "Organising committee co-chair, PyData Los Angeles" },
  { when: "2016–2021", what: "Director, Women Who Code Los Angeles" },
];

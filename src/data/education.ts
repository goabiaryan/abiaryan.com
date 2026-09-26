import { site } from "./site";

export const education = [
  {
    year: "Now",
    title: "Doctoral research, AI HPC distributed systems",
    note: "SLO-aware inference optimization, hardware-aware compiler design, and a digital twin for energy optimization for bursty workloads.",
  },
  {
    year: "2024–2026",
    title: "Master's in Information Management Systems, NOVA IMS (Lisbon, Portugal)",
    href: "https://www.novaims.unl.pt/",
    note: "Thesis: Cascading Fragility in National AI Infrastructure: A Seven-Layer Framework for Resilience Assessment and Policy Design.\nMaster's thesis, NOVA IMS. Preparing for journal submission.",
  },
  {
    year: "2018–2019",
    title: "Visiting Research Scholar, UCLA Cognitive Systems Lab (Los Angeles, USA)",
    href: site.links.pearl,
    note: "Under Dr. Judea Pearl, ACM 2012 Turing Award Winner. Research on intelligence in agents, spanning causal inference, AutoML, emotion recognition, and multi-agent learning.",
  },
  {
    year: "2013–2014",
    title: "MSc Applicable Mathematics, The London School of Economics and Political Science (London, UK)",
    href: "https://www.lse.ac.uk/",
    note: "Youngest postgraduate candidate at age 18.\nThesis: Image Pattern Recognition using Hopfield Neural Networks.\n\nCourses included Algorithms and Computation, Game Theory, Cryptography, Control Optimization, Non-Linear Dynamics, Financial Risk Analysis, Behavioral Finance, and Quantitative Methods in Financial Modelling.",
  },
  {
    year: "2010–2013",
    title: "BSc (Honors) Mathematics, MDU (India)",
    note: "Distinction (Top 5).\nThesis: Are Twin Primes Infinite? (Literature Review)\n\nMajors in pure and applied mathematics, with minors in statistics, computer science, and operations research. University record holder in Statistics.",
  },
];

export const theses = [
  {
    year: "2026",
    title: "Cascading Fragility in National AI Infrastructure: A Seven-Layer Framework for Resilience Assessment and Policy Design",
    href: site.links.fragility,
    note: "Master's thesis, NOVA IMS.\n\nBy evaluating 22 global suppliers across a seven-layer dependency model, this work quantifies how critical single points of failure in semiconductor supply chains and hyperscalers trigger cascading systemic collapse. It provides a quantitative framework to measure concentration risk, guide sovereign capacity planning, and ensure continuity for mission-critical AI services. Preparing for journal submission.",
  },
  {
    year: "2014",
    title: "Image Pattern Recognition using Hopfield Neural Networks",
    note: "MSc Applicable Mathematics, The London School of Economics and Political Science, 2013–2014.\n\nMy early research in 2014 at LSE focused on energy-based associative memory (Hopfield networks), a class of architectures now recognized as mathematically isomorphic to modern Transformer self-attention. This thread of viewing compute through physical energy landscapes informs my current work on inference economics at Joule.",
  },
  {
    year: "2013",
    title: "Are Twin Primes Infinite? (Literature Review)",
    note: "BSc (Honors) Mathematics, MDU.",
  },
];

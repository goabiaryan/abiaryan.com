export type Zone = "AoE" | "EST" | "EDT" | "UTC";

export type Deadline = {
  label: string;
  date: string;
  time?: string;
  zone?: Zone;
};

export const topics = [
  "Architecture",
  "Systems",
  "HPC",
  "ML",
  "Networking",
  "Energy",
  "Journals",
] as const;

export type Topic = (typeof topics)[number];

export const topicLabels: Record<Topic, string> = {
  Architecture: "Architecture",
  Systems: "Systems / cloud",
  HPC: "HPC / parallel",
  ML: "Machine learning",
  Networking: "Networking",
  Energy: "Energy / sustainability",
  Journals: "Journals",
};

export type Conference = {
  acronym: string;
  year?: number;
  name: string;
  href: string;
  location?: string;
  event?: string;
  deadlines?: Deadline[];
  note?: string;
  cfpPending?: boolean;
  kind?: "conference" | "journal";
  featured?: boolean;
  core?: string;
  sjr?: "Q1" | "Q2" | "Q3" | "Q4";
  topics: Topic[];
};

const AOE = "AoE" as const;
const EST = "EST" as const;

export const conferences: Conference[] = [
  {
    acronym: "IPDPS",
    year: 2027,
    name: "IEEE International Parallel and Distributed Processing Symposium",
    href: "https://www.ipdps.org/ipdps2027/2027-call-for-papers.html",
    location: "Seattle, WA, USA",
    event: "1–5 Jun 2027",
    core: "A",
    topics: ["HPC"],
    deadlines: [
      { label: "Abstract", date: "2026-10-01", zone: AOE },
      { label: "Full paper", date: "2026-10-08", zone: AOE },
      { label: "Workshop renewal", date: "2026-09-22" },
      { label: "New workshop", date: "2026-09-29" },
    ],
  },
  {
    acronym: "ISCA",
    year: 2027,
    name: "International Symposium on Computer Architecture",
    href: "https://www.iscaconf.org/isca2026/submit/callforpapers.php",
    location: "Atlanta, GA, USA",
    event: "5–9 Jun 2027",
    core: "A*",
    topics: ["Architecture"],
    cfpPending: true,
    note: "No 2027 CFP yet. Linked to the official 2026 call. Conference week is listed with ACM FCRC. CFP approx April or May.",
  },
  {
    acronym: "OSDI",
    year: 2027,
    name: "USENIX Symposium on Operating Systems Design and Implementation",
    href: "https://www.usenix.org/conference/osdi27/call-for-papers",
    location: "Baltimore, MD, USA",
    event: "7–9 Jul 2027",
    core: "A*",
    topics: ["Systems"],
    deadlines: [
      { label: "Abstract", date: "2026-12-01", time: "17:59", zone: EST },
      { label: "Paper", date: "2026-12-08", time: "17:59", zone: EST },
    ],
  },
  {
    acronym: "MLSys",
    year: 2027,
    name: "Conference on Machine Learning and Systems",
    href: "https://mlsys.org/",
    location: "Bellevue, WA, USA",
    event: "21–25 Jun 2027",
    topics: ["Systems", "ML"],
    deadlines: [
      { label: "Submissions open", date: "2026-10-10", time: "20:00", zone: "UTC" },
      { label: "Paper", date: "2026-10-30", time: "20:00", zone: "UTC" },
      { label: "Industry paper", date: "2026-10-30", time: "20:00", zone: "UTC" },
    ],
  },
  {
    acronym: "ICLR",
    year: 2027,
    name: "International Conference on Learning Representations",
    href: "https://iclr.cc/Conferences/2027/CallForPapers",
    location: "California, USA",
    event: "26–30 Apr 2027",
    core: "A*",
    topics: ["ML"],
    deadlines: [
      { label: "Abstract", date: "2026-09-18", time: "23:59", zone: AOE },
      { label: "Paper", date: "2026-09-25", zone: AOE },
      { label: "Workshop proposal", date: "2026-10-09", time: "23:59", zone: AOE },
    ],
  },
  {
    acronym: "NeurIPS",
    year: 2027,
    name: "Conference on Neural Information Processing Systems",
    href: "https://neurips.cc/Conferences/2026/CallForPapers",
    core: "A*",
    topics: ["ML"],
    cfpPending: true,
    note: "No 2027 CFP yet. Linked to the official 2026 call. CFP approx April or May.",
  },
  {
    acronym: "ICML",
    year: 2027,
    name: "International Conference on Machine Learning",
    href: "https://icml.cc/Conferences/2026/CallForPapers",
    core: "A*",
    topics: ["ML"],
    cfpPending: true,
    note: "No 2027 CFP yet. Official 2027 page lists South America only. Linked to the official 2026 call. CFP approx April or May.",
  },
  {
    acronym: "ICS",
    year: 2027,
    name: "ACM International Conference on Supercomputing",
    href: "https://www.ics-conference.org/",
    location: "Atlanta, GA, USA",
    core: "A",
    topics: ["HPC"],
    cfpPending: true,
    note: "41st ICS is listed with ACM FCRC. Dates and organizing committee are still TBA. CFP approx April or May.",
  },
  {
    acronym: "SOSP",
    year: 2027,
    name: "ACM Symposium on Operating Systems Principles",
    href: "https://sigops.org/s/conferences/sosp/2026/cfp.html",
    location: "Vancouver, Canada",
    core: "A*",
    topics: ["Systems"],
    cfpPending: true,
    note: "No 2027 CFP yet. Linked to the official 2026 call. SIGOPS has mentioned Vancouver. CFP approx April or May.",
  },
  {
    acronym: "MICRO",
    year: 2027,
    name: "IEEE/ACM International Symposium on Microarchitecture",
    href: "https://microarch.org/micro59/",
    core: "A*",
    topics: ["Architecture"],
    cfpPending: true,
    note: "No 2027 site yet. Linked to MICRO-59 (2026). CFP approx April or May.",
  },
  {
    acronym: "SC",
    year: 2027,
    name: "International Conference for High Performance Computing, Networking, Storage, and Analysis",
    href: "https://sc26.supercomputing.org/all-dates-deadlines/",
    core: "A",
    topics: ["HPC"],
    cfpPending: true,
    note: "No SC27 site yet. Linked to the official SC26 dates page. CFP approx April or May.",
  },
  {
    acronym: "ICPP",
    year: 2027,
    name: "International Conference on Parallel Processing",
    href: "https://icpp2026.github.io/call-for-papers/",
    core: "B",
    topics: ["HPC"],
    cfpPending: true,
    note: "No official 2027 CFP yet. Linked to ICPP 2026. CFP approx April or May.",
  },
  {
    acronym: "ATC",
    year: 2027,
    name: "ACM SIGOPS Annual Technical Conference",
    href: "https://sigops.org/s/conferences/atc/2026/cfp.html",
    core: "A",
    topics: ["Systems"],
    cfpPending: true,
    note: "No official 2027 CFP yet. Linked to ATC 2026. USENIX ATC ended after 2025. CFP approx April or May.",
  },
  {
    acronym: "SoCC",
    year: 2026,
    name: "ACM Symposium on Cloud Computing",
    href: "https://acmsocc.org/2026/",
    location: "Singapore",
    event: "18–20 Nov 2026",
    topics: ["Systems"],
    deadlines: [
      { label: "Round 1 abstract", date: "2026-02-06", zone: AOE },
      { label: "Round 1 paper", date: "2026-02-13", zone: AOE },
      { label: "Round 2 abstract", date: "2026-07-07", zone: AOE },
      { label: "Round 2 paper", date: "2026-07-14", zone: AOE },
    ],
  },
  {
    acronym: "FAST",
    year: 2027,
    name: "USENIX Conference on File and Storage Technologies",
    href: "https://www.usenix.org/conference/fast27/call-for-papers",
    location: "Renton, WA, USA",
    event: "23–25 Feb 2027",
    core: "A",
    topics: ["Systems"],
    deadlines: [
      { label: "Spring paper", date: "2026-03-17", time: "23:59", zone: AOE },
      { label: "Fall paper", date: "2026-09-15", time: "23:59", zone: AOE },
    ],
  },
  {
    acronym: "ASPLOS",
    year: 2027,
    name: "ACM International Conference on Architectural Support for Programming Languages and Operating Systems",
    href: "https://www.asplos-conference.org/asplos2027/cfp/",
    location: "Heraklion, Greece",
    event: "11–15 Apr 2027",
    core: "A*",
    topics: ["Architecture"],
    deadlines: [
      { label: "April cycle paper", date: "2026-04-15", zone: AOE },
      { label: "September cycle paper", date: "2026-09-09", zone: AOE },
      { label: "Workshop/tutorial", date: "2026-11-04" },
    ],
  },
  {
    acronym: "EuroSys",
    year: 2027,
    name: "European Conference on Computer Systems",
    href: "https://2027.eurosys.org/cfp.html",
    location: "Rabat, Morocco",
    event: "19–23 Apr 2027",
    core: "A",
    topics: ["Systems"],
    deadlines: [
      { label: "Spring abstract", date: "2026-05-07", zone: AOE },
      { label: "Spring paper", date: "2026-05-14", zone: AOE },
      { label: "Fall abstract", date: "2026-09-17", zone: AOE },
      { label: "Fall paper", date: "2026-09-24", zone: AOE },
      { label: "Workshop/tutorial", date: "2026-10-16", zone: AOE },
    ],
  },
  {
    acronym: "HPCA",
    year: 2027,
    name: "IEEE International Symposium on High-Performance Computer Architecture",
    href: "https://conf.researchr.org/home/hpca-2027/",
    location: "Salt Lake City, UT, USA",
    event: "20–24 Mar 2027",
    core: "A*",
    topics: ["Architecture"],
    deadlines: [
      { label: "Abstract", date: "2026-07-24", zone: AOE },
      { label: "Paper", date: "2026-07-31", zone: AOE },
      { label: "Industry abstract", date: "2026-07-24", zone: AOE },
      { label: "Industry paper", date: "2026-07-31", zone: AOE },
      { label: "Workshop/tutorial", date: "2026-10-23", zone: AOE },
    ],
  },
  {
    acronym: "PPoPP",
    year: 2027,
    name: "ACM SIGPLAN Symposium on Principles and Practice of Parallel Programming",
    href: "https://ppopp27.sigplan.org/track/PPoPP-2027-papers",
    location: "Salt Lake City, UT, USA",
    event: "30 Jan–3 Feb 2027",
    core: "B",
    topics: ["HPC"],
    deadlines: [
      { label: "Paper", date: "2026-08-03", zone: AOE },
      { label: "Workshop/tutorial", date: "2026-10-23", zone: AOE },
    ],
  },
  {
    acronym: "CGO",
    year: 2027,
    name: "International Symposium on Code Generation and Optimization",
    href: "https://2027.cgo.org/",
    location: "Salt Lake City, UT, USA",
    event: "20–24 Mar 2027",
    core: "A",
    topics: ["Architecture"],
    deadlines: [
      { label: "Round 1 paper", date: "2026-06-11" },
      { label: "Round 2 paper", date: "2026-09-10" },
    ],
  },
  {
    acronym: "NSDI",
    year: 2027,
    name: "USENIX Symposium on Networked Systems Design and Implementation",
    href: "https://www.usenix.org/conference/nsdi27/call-for-papers",
    location: "Providence, RI, USA",
    event: "11–13 May 2027",
    core: "National: USA",
    topics: ["Systems", "Networking"],
    deadlines: [
      { label: "Spring abstract", date: "2026-04-16", time: "23:59", zone: "EDT" },
      { label: "Spring paper", date: "2026-04-23", time: "23:59", zone: "EDT" },
      { label: "Fall abstract", date: "2026-09-10", time: "23:59", zone: "EDT" },
      { label: "Fall paper", date: "2026-09-17", time: "23:59", zone: "EDT" },
    ],
  },
  {
    acronym: "SIGCOMM",
    year: 2027,
    name: "ACM Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication",
    href: "https://conferences.sigcomm.org/sigcomm/2027/",
    location: "Bangkok, Thailand",
    event: "8–12 Aug 2027",
    core: "A*",
    topics: ["Networking"],
    cfpPending: true,
    note: "No 2027 CFP dates yet. Official site lists the next main-track abstract registration as TBA.",
  },
  {
    acronym: "CoNEXT",
    year: 2027,
    name: "ACM International Conference on emerging Networking EXperiments and Technologies",
    href: "https://conferences.sigcomm.org/co-next/2027/#!/cfp",
    location: "Rio de Janeiro, Brazil",
    event: "6–9 Dec 2027",
    core: "A",
    topics: ["Networking"],
    cfpPending: true,
    note: "No 2027 CFP dates yet. Official CFP page says more information soon. Conference week is listed as 6–9 Dec 2027, to be confirmed.",
  },
  {
    acronym: "HotNets",
    year: 2026,
    name: "ACM Workshop on Hot Topics in Networks",
    href: "https://conferences.sigcomm.org/hotnets/2026/cfp.html",
    location: "Salt Lake City, UT, USA",
    event: "16–17 Nov 2026",
    core: "National: USA",
    topics: ["Networking"],
    deadlines: [
      { label: "Paper", date: "2026-07-16", time: "23:59", zone: AOE },
    ],
  },
  {
    acronym: "PACT",
    year: 2027,
    name: "International Conference on Parallel Architectures and Compilation Techniques",
    href: "https://pact2026.github.io/submit/",
    core: "B",
    topics: ["Architecture"],
    cfpPending: true,
    note: "No 2027 CFP yet. Linked to the official 2026 call. CFP approx April or May.",
  },
  {
    acronym: "e-Energy",
    year: 2027,
    name: "ACM International Conference on Future and Sustainable Energy Systems",
    href: "https://energy.acm.org/conferences/eenergy/2026/",
    topics: ["Energy"],
    cfpPending: true,
    note: "No official 2027 CFP dates confirmed. Linked to the official 2026 site. CFP approx April or May.",
  },
  {
    acronym: "Sustainable Computing",
    year: 2027,
    name: "International Green and Sustainable Computing Conference",
    href: "https://www.igscc.org/",
    topics: ["Energy"],
    cfpPending: true,
    note: "No official 2027 CFP yet. Linked to IGSC 2026. CFP approx April or May.",
  },
  {
    acronym: "TACO",
    name: "ACM Transactions on Architecture and Code Optimization",
    href: "https://dl.acm.org/journal/taco",
    kind: "journal",
    sjr: "Q2",
    topics: ["Architecture", "Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "TPDS",
    name: "IEEE Transactions on Parallel and Distributed Systems",
    href: "https://www.computer.org/csdl/journal/td",
    kind: "journal",
    featured: true,
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "TCOM",
    name: "IEEE Transactions on Communications",
    href: "https://www.comsoc.org/publications/journals/ieee-transactions-communications",
    kind: "journal",
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "TCC",
    name: "IEEE Transactions on Cloud Computing",
    href: "https://www.computer.org/csdl/journal/cc",
    kind: "journal",
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "FGCS",
    name: "Future Generation Computer Systems",
    href: "https://www.sciencedirect.com/journal/future-generation-computer-systems",
    kind: "journal",
    featured: true,
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "Sustainable Computing",
    name: "IEEE Transactions on Sustainable Computing",
    href: "https://www.computer.org/csdl/journal/su",
    kind: "journal",
    sjr: "Q1",
    topics: ["Energy", "Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "MSSP",
    name: "Mechanical Systems and Signal Processing",
    href: "https://www.sciencedirect.com/journal/mechanical-systems-and-signal-processing",
    kind: "journal",
    featured: true,
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "TC",
    name: "IEEE Transactions on Computers",
    href: "https://www.computer.org/csdl/journal/tc",
    kind: "journal",
    featured: true,
    sjr: "Q1",
    topics: ["Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
  {
    acronym: "SUSCOM",
    name: "Sustainable Computing: Informatics and Systems",
    href: "https://www.sciencedirect.com/journal/sustainable-computing-informatics-and-systems",
    kind: "journal",
    featured: true,
    sjr: "Q1",
    topics: ["Energy", "Journals"],
    note: "Rolling submissions. Dates as posted on the journal site.",
  },
];

function zoneOffset(zone?: Zone) {
  if (zone === "AoE") return "-12:00";
  if (zone === "EST") return "-05:00";
  if (zone === "EDT") return "-04:00";
  return "Z";
}

export function deadlineMs(item: Deadline) {
  const time = item.time ?? "23:59";
  return Date.parse(`${item.date}T${time}:00${zoneOffset(item.zone)}`);
}

export function formatDeadline(item: Deadline) {
  const d = new Date(`${item.date}T12:00:00Z`);
  const day = d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const zone = item.zone ?? "";
  return zone ? `${item.label} ${day} ${zone}` : `${item.label} ${day}`;
}

export function nextDeadline(conf: Conference, now = Date.now()) {
  return (conf.deadlines ?? [])
    .map((item) => ({ item, at: deadlineMs(item) }))
    .filter((row) => row.at > now)
    .sort((a, b) => a.at - b.at)[0];
}

export function lastDeadline(conf: Conference) {
  return (conf.deadlines ?? [])
    .map((item) => ({ item, at: deadlineMs(item) }))
    .sort((a, b) => b.at - a.at)[0];
}

export function remainingParts(at: number, now = Date.now()) {
  const ms = Math.max(0, at - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    mins: Math.floor((ms % 3_600_000) / 60_000),
    secs: Math.floor((ms % 60_000) / 1_000),
    closed: at <= now,
  };
}

export function remainingLabel(at: number, now = Date.now()) {
  const { days, hours, closed } = remainingParts(at, now);
  if (closed) return "closed";
  if (days >= 1) return `${days} days ${hours} hrs`;
  return `${hours} hrs`;
}

export function bucketConferences(now = Date.now()) {
  const open: Conference[] = [];
  const watching: Conference[] = [];
  const closed: Conference[] = [];
  const journals: Conference[] = [];

  for (const conf of conferences) {
    if (conf.kind === "journal") journals.push(conf);
    else if (conf.cfpPending) watching.push(conf);
    else if (nextDeadline(conf, now)) open.push(conf);
    else closed.push(conf);
  }

  const byNext = (a: Conference, b: Conference) => {
    const an = nextDeadline(a, now)?.at ?? Number.POSITIVE_INFINITY;
    const bn = nextDeadline(b, now)?.at ?? Number.POSITIVE_INFINITY;
    return an - bn;
  };
  const byLast = (a: Conference, b: Conference) => {
    const al = lastDeadline(a)?.at ?? 0;
    const bl = lastDeadline(b)?.at ?? 0;
    return bl - al;
  };

  open.sort(byNext);
  watching.sort((a, b) => a.acronym.localeCompare(b.acronym));
  closed.sort(byLast);
  journals.sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return a.acronym.localeCompare(b.acronym);
  });

  return { open, watching, closed, journals };
}

export type OfferId = "diagnostic" | "retainer";

export type Offer = {
  id: OfferId;
  href: string;
  kind: "diagnostic" | "retainer";
  label: string;
  short: string;
  title: string;
  headline: string;
  price: string;
  amount: string;
  cents: number;
  mode: "payment" | "subscription";
  priceNote: string;
  finePrint?: string;
  term: string;
  cta: string;
  summary: string;
  items: string[];
};

export const capacity = "I take only 2 clients a month.";

export const focuses = [
  { id: "compute", title: "Compute economics" },
  { id: "agents", title: "Agentic systems" },
];

export const offers: Offer[] = [
  {
    id: "diagnostic",
    href: "/advisory/diagnostic/",
    kind: "diagnostic",
    label: "Start here",
    short: "Architecture & SLO Audit",
    title: "Architecture & SLO Audit",
    headline: "The audit.",
    price: "$5,000 USD",
    amount: "5000",
    cents: 500000,
    mode: "payment",
    priceNote: "One week. 100% credited toward Month 1 if a retainer starts within 30 days.",
    finePrint:
      "Base scope up to 5 traces. Complex multi-cluster setups scoped and billed separately.",
    term: "One week",
    cta: "Pay $5,000 & Schedule",
    summary:
      "A focused live review and written findings memo, scoped to 5 specific questions or traces you name.",
    items: [
      "Single-session live architecture review",
      "Async memo on up to 5 agreed questions or traces",
      "60-minute debrief and remediation findings",
      "Written roadmap delivered within 7 calendar days",
    ],
  },
  {
    id: "retainer",
    href: "/advisory/retainer/",
    kind: "retainer",
    label: "Then the seat",
    short: "Strategic Retainer",
    title: "Strategic Retainer",
    headline: "The seat.",
    price: "$10,000 / month",
    amount: "10000",
    cents: 1000000,
    mode: "subscription",
    priceNote: "Three-month minimum. Scoped to 2 concurrent engineering workstreams.",
    finePrint:
      "Secures your seat. We kick off within 5 business days. If intake shows an irreconcilable scope mismatch, the payment is refunded immediately.",
    term: "Three-month minimum",
    cta: "Pay $10,000 / month to Secure Seat",
    summary:
      "A standing seat on the serving stack: compute economics, agentic systems, or both.",
    items: [
      "2 working sessions a month with engineering leadership",
      "Async RFC and architecture review (24 to 48 hour SLA)",
      "Monthly compute economics and SLO governance memo",
      "Formal TAB seat for investor and technical diligence",
    ],
  },
];

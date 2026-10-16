/**
 * Offers, finance, exchange & insurance data for the Zaidi TVS hub.
 * All rates / figures are INDICATIVE only and marked with `*`.
 * Never invent exact offers — always confirm on WhatsApp or in-showroom.
 */

export type FinanceScheme = {
  icon: string;
  title: string;
  rate: string;
  points: string[];
};

export type Offer = {
  icon: string;
  tag: string;
  title: string;
  text: string;
  valid: string;
};

export type ExchangeStep = {
  num: string;
  title: string;
  text: string;
};

export type Insurance = {
  icon: string;
  title: string;
  text: string;
};

export const FINANCE_SCHEMES: FinanceScheme[] = [
  {
    icon: "₹",
    title: "Low-Interest EMI",
    rate: "from ~9.5% p.a.*",
    points: [
      "Reducing-balance EMI with simple monthly outgo",
      "Choose the tenure that fits your budget",
      "Transparent processing — no hidden charges",
    ],
  },
  {
    icon: "⚡",
    title: "High On-Road Funding",
    rate: "up to ~95%*",
    points: [
      "Finance the on-road price, not just the ex-showroom",
      "Small down payment options available",
      "Fast sanction on selected models",
    ],
  },
  {
    icon: "🛡",
    title: "Zero / Low Processing Fee",
    rate: "on select plans*",
    points: [
      "Waived or reduced processing on eligible schemes",
      "Documentation kept simple and clear",
      "Processing charges told upfront",
    ],
  },
  {
    icon: "🗓",
    title: "Flexible Tenure",
    rate: "up to 48 months*",
    points: [
      "Spread the cost over 12, 24, 36 or 48 months",
      "Lower EMI on longer tenures",
      "Foreclosure terms explained before you sign",
    ],
  },
  {
    icon: "✔",
    title: "Quick Approval",
    rate: "often same-day*",
    points: [
      "Minimal paperwork, fast decision",
      "Support for first-time buyers",
      "We track your file end to end",
    ],
  },
];

export const OFFERS: Offer[] = [
  {
    icon: "🎉",
    tag: "FESTIVAL",
    title: "Festive Bonus",
    text: "Festival-time savings on selected TVS models — ask us for the running bonus on your favourite ride.",
    valid: "During festival period*",
  },
  {
    icon: "🔧",
    tag: "NEW RIDE",
    title: "Free First Service",
    text: "Complimentary first periodic service on your new TVS, done at our in-house workshop with genuine parts.",
    valid: "On new purchases*",
  },
  {
    icon: "🎁",
    tag: "BUNDLE",
    title: "Accessory Pack",
    text: "A curated accessory bundle — mat, guard and more — added on selected bikes and scooters.",
    valid: "On select models*",
  },
  {
    icon: "🛡",
    tag: "PEACE OF MIND",
    title: "Extended Warranty",
    text: "Optionally extend your coverage beyond the standard term for extra peace of mind on the road.",
    valid: "At time of purchase*",
  },
  {
    icon: "🔁",
    tag: "RETURNING",
    title: "Loyalty Bonus",
    text: "Coming back to Zaidi TVS for your next ride? Ask about the extra loyalty benefit for repeat customers.",
    valid: "For existing customers*",
  },
];

export const EXCHANGE_STEPS: ExchangeStep[] = [
  {
    num: "01",
    title: "Free Evaluation",
    text: "Bring your old two-wheeler — our team inspects it at the showroom at no cost.",
  },
  {
    num: "02",
    title: "Best Value Quote",
    text: "We share a fair, transparent exchange value based on condition and market rates.",
  },
  {
    num: "03",
    title: "Paperwork Handled",
    text: "Transfer, RC and forms — we guide you through every document so nothing is missed.",
  },
  {
    num: "04",
    title: "Ride Home",
    text: "Adjust the value against your new TVS and ride out the same day.",
  },
];

export const INSURANCE: Insurance[] = [
  {
    icon: "🛡",
    title: "New Vehicle Insurance",
    text: "Comprehensive cover arranged at delivery so you ride out fully protected.",
  },
  {
    icon: "🔄",
    title: "Renewal Assistance",
    text: "Timely renewal reminders and hassle-free renewals for bike, scooter and more.",
  },
  {
    icon: "🚑",
    title: "Claims Guidance",
    text: "Step-by-step help with claim paperwork and the workshop, end to end.",
  },
];

export interface SalaryRangeData {
  currency: string;
  location: string;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  role: string;
}

export interface CompensationComponent {
  component: string;
  description: string;
  notes: string;
  typicalRange: string;
}

export interface OfferComparison {
  baseSalary: number;
  benefitsValue: number;
  bonusPercent: number;
  company: string;
  equityValue: number;
  highlights: string[];
  id: string;
  location: string;
  role: string;
  totalComp: number;
}

export interface NegotiationChecklistItem {
  category: "research" | "strategy" | "logistics" | "offer-review";
  id: string;
  label: string;
}

export interface NegotiationScriptTemplate {
  body: string;
  context: string;
  id: string;
  title: string;
}

export interface SalaryQuestion {
  category: string;
  id: string;
  question: string;
  rationale: string;
}

export const mockSalaryRanges: SalaryRangeData[] = [
  {
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA",
    p10: 130_000,
    p25: 150_000,
    p50: 175_000,
    p75: 200_000,
    p90: 230_000,
    currency: "USD",
  },
  {
    role: "Senior Frontend Engineer",
    location: "New York, NY",
    p10: 125_000,
    p25: 145_000,
    p50: 170_000,
    p75: 195_000,
    p90: 220_000,
    currency: "USD",
  },
  {
    role: "Senior Frontend Engineer",
    location: "Remote (US)",
    p10: 120_000,
    p25: 140_000,
    p50: 165_000,
    p75: 190_000,
    p90: 215_000,
    currency: "USD",
  },
  {
    role: "Staff Frontend Engineer",
    location: "San Francisco, CA",
    p10: 180_000,
    p25: 200_000,
    p50: 230_000,
    p75: 265_000,
    p90: 300_000,
    currency: "USD",
  },
  {
    role: "Staff Frontend Engineer",
    location: "Remote (US)",
    p10: 165_000,
    p25: 185_000,
    p50: 215_000,
    p75: 250_000,
    p90: 280_000,
    currency: "USD",
  },
  {
    role: "Engineering Manager",
    location: "San Francisco, CA",
    p10: 200_000,
    p25: 225_000,
    p50: 260_000,
    p75: 300_000,
    p90: 350_000,
    currency: "USD",
  },
  {
    role: "Engineering Manager",
    location: "Remote (US)",
    p10: 180_000,
    p25: 205_000,
    p50: 240_000,
    p75: 280_000,
    p90: 320_000,
    currency: "USD",
  },
  {
    role: "Product Designer",
    location: "San Francisco, CA",
    p10: 110_000,
    p25: 130_000,
    p50: 155_000,
    p75: 180_000,
    p90: 210_000,
    currency: "USD",
  },
  {
    role: "Product Designer",
    location: "New York, NY",
    p10: 105_000,
    p25: 125_000,
    p50: 150_000,
    p75: 175_000,
    p90: 200_000,
    currency: "USD",
  },
  {
    role: "Data Scientist",
    location: "San Francisco, CA",
    p10: 140_000,
    p25: 160_000,
    p50: 190_000,
    p75: 225_000,
    p90: 260_000,
    currency: "USD",
  },
];

export const mockCompensationComponents: CompensationComponent[] = [
  {
    component: "Base Salary",
    description: "Fixed annual cash compensation paid in regular installments.",
    typicalRange: "60–80% of total compensation",
    notes:
      "Most negotiable component. Used as anchor for bonus and equity calculations.",
  },
  {
    component: "Annual Bonus",
    description:
      "Performance-based cash paid annually or semi-annually. Usually a percentage of base salary.",
    typicalRange: "10–25% of base salary",
    notes:
      "Often tied to company and individual performance targets. Sign-on bonuses may be available.",
  },
  {
    component: "Equity / Stock",
    description:
      "Ownership in the company via RSUs, options, or similar instruments. Vests over time.",
    typicalRange: "15–35% of total compensation",
    notes:
      "Vesting schedule (typically 4-year with 1-year cliff). Value depends on company performance and liquidity.",
  },
  {
    component: "Benefits",
    description:
      "Health insurance, retirement contributions, paid time off, and other non-cash perks.",
    typicalRange: "$15,000–$40,000 annual value",
    notes:
      "Includes 401(k) match, health/dental/vision, life insurance, wellness stipends, and learning budgets.",
  },
  {
    component: "Sign-on Bonus",
    description:
      "One-time cash or equity grant paid shortly after joining. May have clawback terms.",
    typicalRange: "$10,000–$50,000",
    notes:
      "Often negotiable, especially if leaving unvested equity at current employer. May require repayment if leaving within 1 year.",
  },
  {
    component: "Performance Bonus",
    description:
      "Additional cash or equity awarded for exceeding performance targets.",
    typicalRange: "5–15% of base salary",
    notes:
      "Typically discretionary. Not guaranteed year over year. May have multiplier caps.",
  },
];

export const mockOfferComparisons: OfferComparison[] = [
  {
    id: "offer-1",
    company: "Vercel",
    role: "Senior Frontend Engineer",
    location: "San Francisco, CA (Remote)",
    baseSalary: 180_000,
    bonusPercent: 15,
    equityValue: 80_000,
    benefitsValue: 25_000,
    totalComp: 285_000,
    highlights: [
      "Remote-first culture",
      "4-year equity vesting with 1-year cliff",
      "Unlimited PTO policy",
    ],
  },
  {
    id: "offer-2",
    company: "Netflix",
    role: "Staff Frontend Engineer",
    location: "Los Gatos, CA",
    baseSalary: 250_000,
    bonusPercent: 0,
    equityValue: 0,
    benefitsValue: 20_000,
    totalComp: 270_000,
    highlights: [
      "No bonus or equity — top-of-market base salary model",
      "Choose own compensation mix (cash vs equity)",
      "On-site with relocation assistance",
    ],
  },
  {
    id: "offer-3",
    company: "Stripe",
    role: "Engineering Manager — Platform",
    location: "San Francisco, CA",
    baseSalary: 240_000,
    bonusPercent: 20,
    equityValue: 120_000,
    benefitsValue: 30_000,
    totalComp: 390_000,
    highlights: [
      "Strong bonus program tied to company OKRs",
      "RSUs with early exercise options",
      "Comprehensive benefits including fertility and mental health",
    ],
  },
  {
    id: "offer-4",
    company: "Notion",
    role: "Full Stack Engineer, Growth",
    location: "New York, NY (Remote)",
    baseSalary: 175_000,
    bonusPercent: 15,
    equityValue: 60_000,
    benefitsValue: 22_000,
    totalComp: 257_000,
    highlights: [
      "Remote-friendly with quarterly offsites",
      "4-year vesting, 1-year cliff",
      "Generous learning and development budget",
    ],
  },
];

export const mockNegotiationChecklist: NegotiationChecklistItem[] = [
  {
    id: "nc-1",
    label: "Research market salary range for role and location",
    category: "research",
  },
  {
    id: "nc-2",
    label: "Identify top 3 priorities (base, equity, flexibility, etc.)",
    category: "strategy",
  },
  {
    id: "nc-3",
    label: "Calculate total compensation including all components",
    category: "offer-review",
  },
  {
    id: "nc-4",
    label: "Prepare competing offer data points",
    category: "research",
  },
  {
    id: "nc-5",
    label: "Set walk-away number (minimum acceptable TC)",
    category: "strategy",
  },
  {
    id: "nc-6",
    label: "Review equity structure — RSUs vs options, vesting schedule",
    category: "offer-review",
  },
  {
    id: "nc-7",
    label: "Check benefits: 401(k) match, insurance, PTO, parental leave",
    category: "offer-review",
  },
  {
    id: "nc-8",
    label: "Prepare responses to common pushback questions",
    category: "strategy",
  },
  {
    id: "nc-9",
    label: "Confirm offer deadline and decision timeline",
    category: "logistics",
  },
  {
    id: "nc-10",
    label: "Request offer letter in writing before accepting",
    category: "logistics",
  },
  {
    id: "nc-11",
    label: "Negotiate sign-on bonus if leaving unvested equity",
    category: "strategy",
  },
  {
    id: "nc-12",
    label: "Clarify performance bonus history and targets",
    category: "offer-review",
  },
  {
    id: "nc-13",
    label: "Review clawback terms for sign-on and relocation",
    category: "offer-review",
  },
  {
    id: "nc-14",
    label: "Prepare to negotiate start date and transition plan",
    category: "logistics",
  },
];

export const mockNegotiationScripts: NegotiationScriptTemplate[] = [
  {
    id: "script-1",
    title: "Counter Offer — Base Salary",
    context:
      "When you receive an offer below your target range and want to negotiate base salary upward.",
    body: `Thank you for the offer. I'm very excited about the opportunity to join [Company] and contribute to [specific project/team].

Based on my research and experience level, I was hoping for a base salary closer to $[target]. My background in [skill1] and [skill2] aligns well with the requirements, and I'm confident I can deliver strong results in this role.

Is there flexibility to adjust the base salary to $[target]? I'm open to discussing the full compensation package to find something that works for both of us.`,
  },
  {
    id: "script-2",
    title: "Equity Negotiation",
    context:
      "When the equity grant feels low relative to market or your experience level.",
    body: `I appreciate the offer and am genuinely excited about the opportunity to help [Company] grow. 

Looking at the equity grant of [shares/ value], I was hoping for something closer to [target equity value] given my experience level and the scope of the role. At my current company, I hold [number] options/RSUs that I would be giving up.

Could we look at increasing the initial grant? I'm also open to discussing a performance-based equity refresh schedule.`,
  },
  {
    id: "script-3",
    title: "Sign-on Bonus Request",
    context:
      "When you need a sign-on bonus to offset unvested equity or relocation costs.",
    body: `Thank you for the offer. I'm very interested in joining [Company] and believe I can make an immediate impact.

However, I would be leaving approximately $[amount] in unvested equity at my current company. Would you be able to offer a sign-on bonus of $[target] to help offset this? I'm happy to provide documentation of the unvested equity schedule.

I'm also open to a signing bonus with a standard one-year clawback if that works better for your compensation structure.`,
  },
  {
    id: "script-4",
    title: "Total Compensation Package Discussion",
    context:
      "When you want to negotiate multiple components of the offer together.",
    body: `I really appreciate the offer and am excited about the opportunity. After reviewing the full package, I was hoping we could discuss a few adjustments.

My research for [role] roles at comparable companies shows a total compensation range of $[range]. I was targeting a total package of approximately $[target TC].

Specifically, I'd like to discuss:
1. Base salary adjustment to $[target base]
2. Equity grant increase to [target equity]
3. [Any other specific request]

I'm confident I can deliver strong value and would love to find a package that reflects that while working within your budget. Is there room to adjust the offer on these points?`,
  },
  {
    id: "script-5",
    title: "Flexibility / Remote Work Negotiation",
    context:
      "When the role requires in-office attendance but you prefer hybrid or remote.",
    body: `Thank you for the offer. I'm very excited about the role and the team at [Company].

I understand the role is structured as on-site. Given my track record of delivering results remotely — including [specific remote achievement] — would you be open to a hybrid or fully remote arrangement?

I'm happy to commit to [specific schedule], including [quarterly visits / regular sync schedule] to maintain strong collaboration with the team. My productivity and communication tools are well-established for remote work.`,
  },
];

export const mockSalaryQuestions: SalaryQuestion[] = [
  {
    id: "sq-1",
    question:
      "How is the bonus structured and what were the last 2 years' payout percentages?",
    category: "Compensation Structure",
    rationale:
      "Past bonus payouts indicate how realistic the target bonus is. Ask about both company and individual performance components.",
  },
  {
    id: "sq-2",
    question:
      "What is the equity refresh policy and how frequently are grants reviewed?",
    category: "Equity",
    rationale:
      "Initial grant is only part of the picture. Understanding refresh cycles and criteria helps project long-term total compensation.",
  },
  {
    id: "sq-3",
    question:
      "What is the vesting schedule and is there an early exercise option?",
    category: "Equity",
    rationale:
      "Standard 4-year/1-year cliff varies. Early exercise can have significant tax advantages for ISO holders.",
  },
  {
    id: "sq-4",
    question: "What is the 401(k) match percentage and vesting schedule?",
    category: "Benefits",
    rationale:
      "A strong 401(k) match adds meaningful long-term value. Vesting schedules vary from immediate to 5-year graded.",
  },
  {
    id: "sq-5",
    question:
      "What professional development budgets are available (conferences, courses, tools)?",
    category: "Benefits",
    rationale:
      "Learning budgets, conference attendance, and tool allowances can add $5,000–$15,000+ in annual value.",
  },
  {
    id: "sq-6",
    question:
      "How is performance evaluated and how does it impact compensation?",
    category: "Compensation Structure",
    rationale:
      "Understanding the performance-review-to-compensation pipeline helps set expectations for growth and promotion timelines.",
  },
  {
    id: "sq-7",
    question:
      "What is the typical promotion timeline and corresponding compensation band?",
    category: "Career Growth",
    rationale:
      "Promotion velocity and associated comp bands affect long-term earnings trajectory beyond the initial offer.",
  },
  {
    id: "sq-8",
    question:
      "Is there a probation period and does compensation change after it ends?",
    category: "Logistics",
    rationale:
      "Some companies have 3–6 month probation periods with guaranteed increases or bonus eligibility changes upon completion.",
  },
];

export const mockTargetRole = "Senior Frontend Engineer";
export const mockTargetLocation = "San Francisco, CA";

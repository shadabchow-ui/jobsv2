export type GigListingStatus = "draft" | "ready" | "published";

export interface GigDeliverable {
  description: string;
  id: string;
  label: string;
}

export interface GigPackage {
  deliverables: GigDeliverable[];
  description: string;
  id: string;
  label: string;
  priceLabel: string;
  revisionCount: number;
  timelineDays: number;
}

export interface GigFaqItem {
  answer: string;
  id: string;
  question: string;
}

export interface GigListingDraft {
  category: string;
  createdAt: string;
  deliverables: GigDeliverable[];
  description: string;
  faq: GigFaqItem[];
  id: string;
  packages: GigPackage[];
  portfolioProofIds: string[];
  priceLabel: string;
  status: GigListingStatus;
  targetClient: string;
  timelineDays: number;
  title: string;
  updatedAt: string;
}

export const serviceCategories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "API Integration",
  "DevOps & Infrastructure",
  "Data Engineering",
  "AI & Machine Learning",
  "Technical Consulting",
  "Code Review & Audits",
  "Performance Optimization",
];

export const mockGigDraft: GigListingDraft = {
  id: "gig-draft-1",
  title: "Full-Stack Web Application Development",
  status: "draft",
  category: "Web Development",
  description:
    "I build production-grade web applications using React, Next.js, TypeScript, and Node.js. From concept to deployment, I deliver clean architecture, responsive UI, and robust backend services tailored to your business needs.",
  targetClient:
    "Startups and small teams needing a full-featured web application or MVP. Ideal for founders who have a concept and need technical execution.",
  priceLabel: "Starting at $5,000",
  timelineDays: 30,
  createdAt: "2026-05-28T00:00:00Z",
  updatedAt: "2026-05-30T00:00:00Z",
  portfolioProofIds: ["proj-1", "proj-3"],
  deliverables: [
    {
      id: "del-1",
      label: "Requirements & Architecture",
      description:
        "Technical specification, architecture diagram, and tech stack recommendations.",
    },
    {
      id: "del-2",
      label: "Responsive UI Implementation",
      description:
        "Pixel-perfect, mobile-responsive frontend built with modern frameworks.",
    },
    {
      id: "del-3",
      label: "API & Backend Services",
      description:
        "RESTful or GraphQL API with authentication, data layer, and business logic.",
    },
    {
      id: "del-4",
      label: "Deployment & CI/CD",
      description:
        "Production deployment with CI/CD pipeline, monitoring, and domain setup.",
    },
  ],
  packages: [
    {
      id: "pkg-basic",
      label: "Essential",
      description:
        "Single-page application or landing page with basic backend.",
      priceLabel: "Starting at $5,000",
      timelineDays: 14,
      revisionCount: 2,
      deliverables: [
        {
          id: "pkg-del-1",
          label: "Up to 5 pages or views",
          description: "Responsive pages with your brand guidelines.",
        },
        {
          id: "pkg-del-2",
          label: "Basic API integration",
          description: "Connect to 1–2 external APIs or a simple database.",
        },
        {
          id: "pkg-del-3",
          label: "Deployment to Vercel or Netlify",
          description: "Production URL with custom domain support.",
        },
      ],
    },
    {
      id: "pkg-standard",
      label: "Standard",
      description:
        "Multi-page application with full backend and authentication.",
      priceLabel: "Starting at $12,000",
      timelineDays: 30,
      revisionCount: 3,
      deliverables: [
        {
          id: "pkg-del-4",
          label: "Up to 15 pages or views",
          description:
            "Full UI with routing, state management, and responsive design.",
        },
        {
          id: "pkg-del-5",
          label: "Complete backend (auth, database, API)",
          description: "User auth, data storage, and custom API endpoints.",
        },
        {
          id: "pkg-del-6",
          label: "CI/CD pipeline and monitoring",
          description: "Automated testing, deployment, and error tracking.",
        },
      ],
    },
    {
      id: "pkg-premium",
      label: "Premium",
      description: "Full product with team training and post-launch support.",
      priceLabel: "Starting at $25,000",
      timelineDays: 60,
      revisionCount: 5,
      deliverables: [
        {
          id: "pkg-del-7",
          label: "Unlimited pages, custom features",
          description:
            "Any feature within scope, including dashboards and real-time features.",
        },
        {
          id: "pkg-del-8",
          label: "Team training and documentation",
          description: "Knowledge transfer sessions and comprehensive docs.",
        },
        {
          id: "pkg-del-9",
          label: "30 days post-launch support",
          description: "Bug fixes, performance tuning, and priority support.",
        },
      ],
    },
  ],
  faq: [
    {
      id: "faq-1",
      question: "What is your typical engagement process?",
      answer:
        "We start with a discovery call to understand your requirements. I provide a technical specification and timeline estimate. Once agreed, I work in weekly sprints with demos and updates. After launch, I provide a support period for any adjustments.",
    },
    {
      id: "faq-2",
      question: "Do you work with existing codebases?",
      answer:
        "Yes, I regularly take over existing projects for feature development, performance optimization, or migration to modern frameworks.",
    },
    {
      id: "faq-3",
      question: "What technologies do you specialize in?",
      answer:
        "My core stack is TypeScript, React, Next.js, Node.js, and PostgreSQL. I also work with Python, GraphQL, Docker, and cloud platforms like AWS and Vercel.",
    },
    {
      id: "faq-4",
      question: "How do you handle revisions?",
      answer:
        "Each package includes a set number of revision rounds. Additional revisions can be purchased at an hourly rate. I use a structured feedback process to keep revisions focused and efficient.",
    },
  ],
};

export const gigReadinessItems = [
  {
    id: "gr-1",
    label: "Title is clear and searchable",
    checked: true,
  },
  {
    id: "gr-2",
    label: "Description explains value proposition",
    checked: true,
  },
  {
    id: "gr-3",
    label: "Target client is defined",
    checked: true,
  },
  {
    id: "gr-4",
    label: "At least one package tier configured",
    checked: true,
  },
  {
    id: "gr-5",
    label: "Deliverables are specific and measurable",
    checked: true,
  },
  {
    id: "gr-6",
    label: "Pricing placeholder — real amounts not provided",
    checked: false,
  },
  {
    id: "gr-7",
    label: "Portfolio proof references added",
    checked: true,
  },
  {
    id: "gr-8",
    label: "FAQ section populated",
    checked: true,
  },
  {
    id: "gr-9",
    label: "Timeline estimate reasonable",
    checked: true,
  },
  {
    id: "gr-10",
    label: "Publishing and payment integration not provided",
    checked: false,
  },
];

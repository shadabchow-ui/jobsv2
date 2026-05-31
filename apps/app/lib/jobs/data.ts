import type {
  CandidateProfile,
  CareerProfile,
  ChecklistItem,
  CoverLetterDraft,
  CoverLetterToneOption,
  EducationEntry,
  JobListing,
  ResumeProfile,
  ResumeSection,
  UpcubeJobPosting,
} from "./types";

export const mockJobPostings: UpcubeJobPosting[] = [
  {
    id: "job-001",
    title: "Senior Frontend Engineer",
    company: "Acme Corp",
    location: "San Francisco, CA",
    description:
      "Build and maintain modern web applications using React, TypeScript, and Next.js.",
    url: "https://example.com/jobs/senior-frontend-engineer",
    source: "mock",
    externalId: "ext-001",
    salary: "$150,000 - $200,000",
    type: "Full-time",
    category: "Engineering",
    postedAt: "2026-05-20T00:00:00Z",
    expiresAt: "2026-06-20T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-002",
    title: "Backend Engineer",
    company: "Globex Inc",
    location: "Remote",
    description:
      "Design and implement scalable APIs and microservices in Node.js and Go.",
    url: "https://example.com/jobs/backend-engineer",
    source: "mock",
    externalId: "ext-002",
    salary: "$130,000 - $180,000",
    type: "Full-time",
    category: "Engineering",
    postedAt: "2026-05-22T00:00:00Z",
    expiresAt: "2026-06-22T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-003",
    title: "Product Designer",
    company: "Initech",
    location: "New York, NY",
    description: "Design intuitive user experiences for B2B SaaS products.",
    url: "https://example.com/jobs/product-designer",
    source: "mock",
    externalId: "ext-003",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    category: "Design",
    postedAt: "2026-05-18T00:00:00Z",
    expiresAt: "2026-06-18T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-004",
    title: "DevOps Engineer",
    company: "Umbrella Co",
    location: "Austin, TX",
    description:
      "Manage cloud infrastructure, CI/CD pipelines, and Kubernetes clusters.",
    url: "https://example.com/jobs/devops-engineer",
    source: "mock",
    externalId: "ext-004",
    salary: "$140,000 - $190,000",
    type: "Full-time",
    category: "Engineering",
    postedAt: "2026-05-25T00:00:00Z",
    expiresAt: "2026-06-25T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-005",
    title: "Data Scientist",
    company: "Hooli",
    location: "Palo Alto, CA",
    description:
      "Develop machine learning models and data pipelines for predictive analytics.",
    url: "https://example.com/jobs/data-scientist",
    source: "mock",
    externalId: "ext-005",
    salary: "$160,000 - $220,000",
    type: "Full-time",
    category: "Data",
    postedAt: "2026-05-21T00:00:00Z",
    expiresAt: "2026-06-21T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-006",
    title: "Marketing Intern",
    company: "Stark Industries",
    location: "Los Angeles, CA",
    description:
      "Support marketing campaigns, social media, and content creation.",
    url: "https://example.com/jobs/marketing-intern",
    source: "mock",
    externalId: "ext-006",
    salary: "$25 - $35/hr",
    type: "Internship",
    category: "Marketing",
    postedAt: "2026-05-28T00:00:00Z",
    expiresAt: "2026-07-28T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-007",
    title: "Full Stack Developer",
    company: "Massive Dynamic",
    location: "Seattle, WA",
    description:
      "Build end-to-end features across the stack using TypeScript and Python.",
    url: "https://example.com/jobs/full-stack-developer",
    source: "mock",
    externalId: "ext-007",
    salary: "$135,000 - $185,000",
    type: "Full-time",
    category: "Engineering",
    postedAt: "2026-05-19T00:00:00Z",
    expiresAt: "2026-06-19T00:00:00Z",
    status: "Foundation",
  },
  {
    id: "job-008",
    title: "UX Researcher",
    company: "Cyberdyne Systems",
    location: "Chicago, IL",
    description:
      "Conduct user research studies and translate findings into design recommendations.",
    url: "https://example.com/jobs/ux-researcher",
    source: "mock",
    externalId: "ext-008",
    salary: "$110,000 - $150,000",
    type: "Contract",
    category: "Design",
    postedAt: "2026-05-15T00:00:00Z",
    expiresAt: "2026-06-15T00:00:00Z",
    status: "Foundation",
  },
];

export const mockJobs: JobListing[] = [
  {
    id: "job-listing-1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "San Francisco, CA",
    description:
      "Build and maintain modern web applications using React, TypeScript, and Next.js.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 150_000, max: 200_000 },
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
    ],
    seniority: "senior",
  },
  {
    id: "job-listing-2",
    title: "Staff Frontend Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    description:
      "Design and build high-performance UI for streaming applications.",
    remote: false,
    employmentType: "Full-time",
    salary: { min: 200_000, max: 280_000 },
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Performance Optimization" },
      { name: "Accessibility" },
    ],
    seniority: "lead",
  },
  {
    id: "job-listing-3",
    title: "Engineering Manager — Platform",
    company: "Stripe",
    location: "San Francisco, CA",
    description:
      "Lead the platform engineering team building foundational infrastructure.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 220_000, max: 320_000 },
    skills: [
      { name: "Engineering Management" },
      { name: "Distributed Systems" },
      { name: "Go" },
      { name: "Kubernetes" },
    ],
    seniority: "lead",
  },
  {
    id: "job-listing-4",
    title: "Full Stack Engineer, Growth",
    company: "Notion",
    location: "New York, NY",
    description:
      "Build end-to-end features to drive user growth and engagement.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 160_000, max: 220_000 },
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "SQL" },
    ],
    seniority: "mid",
  },
  {
    id: "job-listing-5",
    title: "Principal Engineer — Developer Experience",
    company: "GitHub",
    location: "Remote",
    description:
      "Drive developer experience strategy and tooling across the platform.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 240_000, max: 340_000 },
    skills: [
      { name: "Developer Tooling" },
      { name: "TypeScript" },
      { name: "Rust" },
      { name: "CI/CD" },
    ],
    seniority: "executive",
  },
  {
    id: "job-listing-6",
    title: "Lead Developer Advocate",
    company: "Cloudflare",
    location: "San Francisco, CA",
    description: "Champion developer communities and create technical content.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 170_000, max: 230_000 },
    skills: [
      { name: "Technical Writing" },
      { name: "Public Speaking" },
      { name: "TypeScript" },
      { name: "Cloud Platforms" },
    ],
    seniority: "senior",
  },
  {
    id: "job-listing-7",
    title: "Senior Product Engineer",
    company: "Linear",
    location: "Remote",
    description:
      "Build product features and infrastructure for the issue tracking platform.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 180_000, max: 250_000 },
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "GraphQL" },
      { name: "Product Design" },
    ],
    seniority: "senior",
  },
  {
    id: "job-listing-8",
    title: "Founding Engineer",
    company: "Raycast",
    location: "Remote",
    description: "Shape the architecture and product as an early team member.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 160_000, max: 220_000 },
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "API Design" },
      { name: "MacOS" },
    ],
    seniority: "senior",
  },
  {
    id: "job-listing-9",
    title: "Software Engineer — DX",
    company: "Replicate",
    location: "Remote",
    description: "Build tools and workflows for machine learning developers.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 140_000, max: 200_000 },
    skills: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "Machine Learning" },
      { name: "API Design" },
    ],
    seniority: "mid",
  },
  {
    id: "job-listing-10",
    title: "Senior Backend Engineer",
    company: "Supabase",
    location: "Remote",
    description:
      "Build and scale the backend infrastructure for open-source Firebase alternative.",
    remote: true,
    employmentType: "Full-time",
    salary: { min: 170_000, max: 230_000 },
    skills: [
      { name: "Go" },
      { name: "PostgreSQL" },
      { name: "Distributed Systems" },
      { name: "Rust" },
    ],
    seniority: "senior",
  },
];

export const mockCandidateProfile: CandidateProfile = {
  desiredRole: "Senior Frontend Engineer",
  location: "San Francisco",
  remotePreferred: true,
  employmentType: "Full-time",
  seniority: "senior",
  salaryExpectation: { min: 150_000, max: 220_000 },
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Accessibility",
    "Performance Optimization",
    "Test-Driven Development",
  ],
};

export const mockEducation: EducationEntry[] = [
  {
    degree: "B.S.",
    field: "Computer Science",
    institution: "University of California, Berkeley",
    startYear: 2012,
    endYear: 2016,
  },
];

export const mockCareerProfile: CareerProfile = {
  desiredRole: "Senior Frontend Engineer",
  targetRoles: [
    "Senior Frontend Engineer",
    "Staff Frontend Engineer",
    "Engineering Manager",
  ],
  preferredLocations: ["San Francisco, CA", "Remote", "New York, NY"],
  remotePreference: "remote",
  employmentType: "Full-time",
  salaryExpectation: { min: 150_000, max: 220_000 },
  experienceLevel: "Senior",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Accessibility",
    "Performance Optimization",
    "Test-Driven Development",
  ],
  education: mockEducation,
  workAuthorization: "US Citizen",
  sponsorshipRequired: false,
  portfolioLinks: [
    "https://github.com/username",
    "https://linkedin.com/in/username",
    "https://username.dev",
  ],
  summary:
    "Senior frontend engineer with 8+ years of experience building performant, accessible web applications. Passionate about developer experience, design systems, and open source.",
};

export const mockResumeSections: ResumeSection[] = [
  {
    id: "experience",
    title: "Experience",
    items: [
      {
        id: "exp-1",
        title: "Senior Frontend Engineer",
        subtitle: "TechCorp Inc.",
        date: "2022 – Present",
        description:
          "Lead frontend architecture and design system for a SaaS platform serving 50k+ users.",
        highlights: [
          "Migrated legacy jQuery app to React/TypeScript, reducing page load time by 60%",
          "Built a shared component library used across 4 product teams",
          "Mentored 3 junior engineers through structured code reviews",
        ],
      },
      {
        id: "exp-2",
        title: "Frontend Engineer",
        subtitle: "StartupXYZ",
        date: "2019 – 2022",
        description:
          "Developed customer-facing web application with real-time collaboration features.",
        highlights: [
          "Implemented WebSocket-based live editing used by 10k+ daily active users",
          "Reduced bundle size by 45% through code splitting and tree shaking",
          "Designed and built the onboarding flow, improving activation by 25%",
        ],
      },
      {
        id: "exp-3",
        title: "Junior Frontend Developer",
        subtitle: "AgencyCo",
        date: "2017 – 2019",
        description:
          "Built responsive marketing sites and web applications for enterprise clients.",
        highlights: [
          "Delivered 15+ client projects on time using React and Tailwind CSS",
          "Introduced automated testing pipeline achieving 90%+ coverage",
          "Won internal hackathon with an accessibility audit tool",
        ],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    items: [
      {
        id: "edu-1",
        title: "B.S. Computer Science",
        subtitle: "University of California, Berkeley",
        date: "2012 – 2016",
        description:
          "GPA: 3.8. Dean's List. Teaching Assistant for Data Structures.",
        highlights: [
          "Senior thesis on accessible UI component rendering",
          "Led ACM student chapter as VP of Events",
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    items: [
      {
        id: "skill-1",
        title: "Frontend",
        description: "",
        highlights: [
          "React",
          "TypeScript",
          "Next.js",
          "Tailwind CSS",
          "GraphQL",
        ],
      },
      {
        id: "skill-2",
        title: "Backend & Tools",
        description: "",
        highlights: ["Node.js", "PostgreSQL", "Docker", "CI/CD", "AWS"],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    items: [
      {
        id: "proj-1",
        title: "Open Source Design System",
        description:
          "Contributed to a popular open-source component library used by 5k+ projects.",
        highlights: [
          "Added 12 new components with comprehensive Storybook docs",
          "Resolved 40+ accessibility issues across the library",
        ],
      },
    ],
  },
];

export const mockResumeProfile: ResumeProfile = {
  fullName: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "(415) 555-0123",
  location: "San Francisco, CA",
  linkedIn: "linkedin.com/in/alexmorgan",
  portfolio: "alexmorgan.dev",
  summary:
    "Senior frontend engineer with 8+ years of experience building performant, accessible web applications. Passionate about developer experience, design systems, and open source.",
  sections: mockResumeSections,
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Accessibility",
    "Performance Optimization",
  ],
  targetRole: "Senior Frontend Engineer",
  resumeScore: 74,
};

export const mockResumeChecklist: ChecklistItem[] = [
  { id: "rc-1", label: "Contact info matches target location", checked: true },
  { id: "rc-2", label: "Summary tailored to target role", checked: true },
  {
    id: "rc-3",
    label: "Experience uses quantified achievements",
    checked: true,
  },
  {
    id: "rc-4",
    label: "ATS-friendly keywords included from job description",
    checked: false,
  },
  {
    id: "rc-5",
    label: "Skills section matches top 10 required skills",
    checked: false,
  },
  {
    id: "rc-6",
    label: "Education listed with relevant coursework",
    checked: true,
  },
  {
    id: "rc-7",
    label: "Projects demonstrate relevant technologies",
    checked: false,
  },
  {
    id: "rc-8",
    label: "No gaps longer than 6 months unexplained",
    checked: true,
  },
  { id: "rc-9", label: "File format is PDF (not DOCX)", checked: false },
  {
    id: "rc-10",
    label: "File name includes name and target role",
    checked: false,
  },
];

export const mockToneOptions: CoverLetterToneOption[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal business tone with standard salutations and closings.",
  },
  {
    value: "conversational",
    label: "Conversational",
    description:
      "Friendly and approachable, as if speaking directly to the hiring manager.",
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    description:
      "High-energy tone that emphasizes excitement about the role and company.",
  },
  {
    value: "formal",
    label: "Formal",
    description: "Traditional formal letter structure with elaborate language.",
  },
];

export const mockCoverLetterChecklist: ChecklistItem[] = [
  { id: "cl-1", label: "Recipient name confirmed", checked: false },
  { id: "cl-2", label: "Company name and role in opening line", checked: true },
  {
    id: "cl-3",
    label: "Mentioned specific company project or value",
    checked: false,
  },
  {
    id: "cl-4",
    label: "Linked skills from resume to job requirements",
    checked: true,
  },
  { id: "cl-5", label: "Addressed potential resume gaps", checked: false },
  { id: "cl-6", label: "Closing includes call to action", checked: true },
];

export const mockCoverLetterDrafts: CoverLetterDraft[] = [
  {
    id: "cl-draft-1",
    targetJobTitle: "Senior Frontend Engineer",
    targetCompany: "Vercel",
    tone: "professional",
    body: "Dear Hiring Manager,\n\nI am writing to express my interest in the Senior Frontend Engineer position at Vercel. With over 8 years of experience building performant web applications using React, TypeScript, and Next.js, I am excited about the opportunity to contribute to a company that is shaping the future of web development.\n\nAt TechCorp Inc., I led the migration of a legacy jQuery application to a modern React and TypeScript stack, reducing page load times by 60% and improving developer productivity. I also built a shared component library adopted by four product teams, demonstrating my ability to create scalable frontend architecture.\n\nI am particularly drawn to Vercel's commitment to developer experience and open source. The work your team has done on Next.js and Turbopack has been foundational to my own projects, and I would welcome the chance to contribute back to the ecosystem.\n\nThank you for considering my application. I look forward to discussing how my experience aligns with Vercel's goals.\n\nBest regards,\nAlex Morgan",
    recipientName: undefined,
    personalizationNotes: mockCoverLetterChecklist,
    createdAt: "2026-05-28T10:00:00Z",
    linkedApplicationId: undefined,
    linkedJobId: "saved-1",
    status: "draft",
    updatedAt: "2026-05-30T10:00:00Z",
  },
  {
    id: "cl-draft-2",
    targetJobTitle: "Staff Frontend Engineer",
    targetCompany: "Netflix",
    tone: "conversational",
    body: "Hi there,\n\nI came across the Staff Frontend Engineer role at Netflix and couldn't pass up the chance to throw my hat in the ring. I've been a frontend engineer for 8+ years, and I've spent the last few building things that I think would be right at home on your team.\n\nMost recently, I led a huge migration at TechCorp — we went from a creaky old jQuery app to a proper React/TypeScript stack. Page loads got 60% faster, and my team went from firefighting to actually shipping features. I also put together a component library that four different product teams now rely on.\n\nI'm a huge fan of how Netflix thinks about performance and personalization. The work your team does on UI rendering at scale is genuinely inspiring, and I'd love to help push that even further.\n\nWould be great to chat if there's a fit. Thanks for reading!\n\nCheers,\nAlex Morgan",
    recipientName: undefined,
    personalizationNotes: mockCoverLetterChecklist,
    createdAt: "2026-05-25T14:00:00Z",
    linkedApplicationId: undefined,
    linkedJobId: undefined,
    status: "draft",
    updatedAt: "2026-05-29T16:00:00Z",
  },
];

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type BehavioralCategory =
  | "leadership"
  | "conflict"
  | "failure"
  | "success"
  | "teamwork"
  | "initiative"
  | "growth";

export interface BehavioralQuestion {
  category: BehavioralCategory;
  id: string;
  question: string;
  sampleAction?: string;
  sampleResult?: string;
  sampleSituation?: string;
  sampleTask?: string;
  starPrompt: string;
}

export interface TechnicalQuestion {
  category: string;
  difficulty: QuestionDifficulty;
  hints?: string[];
  id: string;
  question: string;
  sampleAnswer?: string;
  topics: string[];
}

export interface QuestionToAsk {
  category: "role" | "team" | "company" | "growth";
  id: string;
  question: string;
}

export interface InterviewPrepSession {
  applicationId: string;
  behavioralQuestions: BehavioralQuestion[];
  company: string;
  questionsToAsk: QuestionToAsk[];
  role: string;
  status: string;
  technicalQuestions: TechnicalQuestion[];
}

export const mockInterviewPrep: InterviewPrepSession = {
  applicationId: "app-3",
  company: "Stripe",
  role: "Engineering Manager — Platform",
  status: "interviewing",
  behavioralQuestions: [
    {
      id: "beh-1",
      question:
        "Tell me about a time you led a team through a difficult technical decision.",
      category: "leadership",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome.",
      sampleSituation:
        "Our team needed to choose between continuing with a monolith or migrating to microservices. There was strong disagreement among senior engineers.",
      sampleTask:
        "As tech lead, I needed to facilitate a decision that balanced technical debt, team velocity, and business priorities.",
      sampleAction:
        "I organized a series of RFC-style discussions, prototyped both approaches on a small feature, and presented trade-off analysis to stakeholders.",
      sampleResult:
        "We agreed on a phased modular monolith approach, reducing migration risk by 40% while improving deploy frequency by 2x within 3 months.",
    },
    {
      id: "beh-2",
      question:
        "Describe a situation where you had to resolve a conflict within your team.",
      category: "conflict",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome.",
      sampleSituation:
        "Two senior engineers had opposing views on the code review process, causing friction in stand-ups.",
      sampleTask:
        "I needed to mediate and establish a review standard that both could accept.",
      sampleAction:
        "I held a retrospective focused on process, not people. We agreed on a documented review checklist and rotated reviewers weekly.",
      sampleResult:
        "Review turnaround dropped from 48h to 12h, and both engineers reported higher satisfaction in the next retro.",
    },
    {
      id: "beh-3",
      question:
        "Tell me about a project that failed and what you learned from it.",
      category: "failure",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome.",
      sampleSituation:
        "We shipped a major feature without adequate performance testing, causing production incidents on launch day.",
      sampleTask:
        "I owned the technical delivery and had signed off on the release timeline.",
      sampleAction:
        "I coordinated the incident response, led the post-mortem, and instituted mandatory load testing gates before any future releases.",
      sampleResult:
        "Incident frequency dropped by 70% in the following quarter, and the team adopted a performance budget in CI.",
    },
    {
      id: "beh-4",
      question:
        "Give an example of a time you drove significant improvement in your team.",
      category: "initiative",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome.",
      sampleSituation:
        "The team's deploy cycle took 45 minutes with frequent manual steps, causing bottlenecks on release days.",
      sampleTask:
        "I volunteered to revamp the CI/CD pipeline as part of our engineering effectiveness initiative.",
      sampleAction:
        "I redesigned the pipeline with parallel stages, caching, and automated rollback, cutting deployment time to under 8 minutes.",
      sampleResult:
        "Deploy frequency went from weekly to daily, and rollback success rate improved from 60% to 99%.",
    },
    {
      id: "beh-5",
      question:
        "How have you helped grow and develop other engineers on your team?",
      category: "growth",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome.",
      sampleSituation:
        "Two junior engineers on my team were struggling with system design concepts during onboarding.",
      sampleTask:
        "I wanted to accelerate their ramp-up without creating dependency on senior engineers.",
      sampleAction:
        "I created a structured onboarding curriculum with weekly pairing sessions, design doc exercises, and incremental ownership of real features.",
      sampleResult:
        "Both engineers were shipping independently within 6 weeks, and one was promoted to mid-level after 8 months.",
    },
  ],
  technicalQuestions: [
    {
      id: "tech-1",
      question: "Design a URL shortening service like bit.ly.",
      category: "system-design",
      difficulty: "hard",
      topics: ["distributed-systems", "scalability", "databases"],
      hints: [
        "Think about key generation — hash vs base62 encoding",
        "Consider read/write ratio and caching strategy",
        "How would you handle custom aliases?",
      ],
      sampleAnswer:
        "I would use a base62 encoding approach with a distributed unique ID generator. The write path generates a short code, stores the mapping in a distributed DB (Cassandra or DynamoDB), and caches popular URLs in Redis. The read path checks Redis first with a bloom filter to avoid cache penetration. Redirection uses a 301/302 response. Analytics are handled asynchronously via a message queue.",
    },
    {
      id: "tech-2",
      question:
        "How would you design a real-time collaborative editing feature?",
      category: "system-design",
      difficulty: "hard",
      topics: ["real-time", "collaboration", "conflict-resolution"],
      hints: [
        "Consider CRDTs vs OT for conflict resolution",
        "Think about the websocket architecture",
        "How do you handle offline edits?",
      ],
      sampleAnswer:
        "I would use CRDTs for conflict-free data merging, with WebSocket connections managed through a room-based architecture. Each document edit produces a CRDT operation broadcast to all connected clients. For persistence, operations are batched and written to a document store. Offline edits are queued locally and replayed on reconnection using the CRDT merge logic.",
    },
    {
      id: "tech-3",
      question:
        "Explain how you would optimize a React app that re-renders too often.",
      category: "frontend",
      difficulty: "medium",
      topics: ["react", "performance", "rendering"],
      hints: [
        "Check for unnecessary re-renders with React DevTools profiler",
        "Consider React.memo, useMemo, and useCallback",
        "Look at state colocation and context usage",
      ],
      sampleAnswer:
        "First, profile with React DevTools to identify the re-render source. Common fixes: use React.memo on expensive components, colocate state closer to where it's used instead of lifting everything to a global store, replace context with a state management library for rapidly-changing values, and use useMemo for expensive computations. Virtualize long lists with react-window.",
    },
    {
      id: "tech-4",
      question: "How does the Next.js App Router differ from the Pages Router?",
      category: "frontend",
      difficulty: "medium",
      topics: ["next-js", "routing", "server-components"],
      hints: [
        "Think about server components vs client components",
        "Consider layouts, loading, and error boundaries",
        "Data fetching patterns differ significantly",
      ],
      sampleAnswer:
        "App Router uses a file-system based on folders instead of files, supports React Server Components by default, nested layouts with persistent state, streaming with loading.tsx, and co-located data fetching. Pages Router uses getServerSideProps/getStaticProps while App Router uses async server components or fetch with caching. App Router also has built-in support for error boundaries, parallel routes, and route intercepting.",
    },
    {
      id: "tech-5",
      question: "Design the data model for a job board application.",
      category: "system-design",
      difficulty: "medium",
      topics: ["databases", "data-modeling", "search"],
      hints: [
        "Think about the core entities: job, company, application, user",
        "Consider search requirements — full-text search, filters",
        "How would you handle job expiration and reposting?",
      ],
      sampleAnswer:
        "Core tables: companies (id, name, logo, website), jobs (id, company_id, title, description, location, type, salary_range, skills[], posted_at, expires_at), applications (id, job_id, user_id, status, applied_at), users (id, name, email, resume_url). For search, use PostgreSQL full-text indexing on title/description/company name with GIN indexes on skills array. Job expiration is handled via a scheduled job that flips an is_active flag, and reposting creates a new job entry with fresh timestamps.",
    },
  ],
  questionsToAsk: [
    {
      id: "q-1",
      question:
        "What does success look like for this role in the first 90 days?",
      category: "role",
    },
    {
      id: "q-2",
      question: "Can you describe the team culture and how decisions are made?",
      category: "team",
    },
    {
      id: "q-3",
      question:
        "What are the biggest technical challenges the platform team is currently facing?",
      category: "company",
    },
    {
      id: "q-4",
      question:
        "How does the company approach professional development and career growth for engineers?",
      category: "growth",
    },
    {
      id: "q-5",
      question: "What's the on-call rotation like for platform engineers?",
      category: "role",
    },
    {
      id: "q-6",
      question:
        "How does engineering collaborate with product and design teams?",
      category: "team",
    },
    {
      id: "q-7",
      question:
        "What's the current state of the platform's observability and monitoring?",
      category: "company",
    },
  ],
};

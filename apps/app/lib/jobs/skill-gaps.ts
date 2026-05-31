export type SkillCategory =
  | "frontend"
  | "backend"
  | "infrastructure"
  | "management"
  | "data";

export type SkillImportance = "critical" | "important" | "nice-to-have";

export type SkillLevel =
  | "none"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export interface SkillGap {
  category: SkillCategory;
  currentLevel: SkillLevel;
  importance: SkillImportance;
  portfolioProjectIdeas?: string[];
  recommendedActions: string[];
  skill: string;
}

export interface SkillGapAnalysis {
  matchedSkills: number;
  missingSkills: number;
  readinessScore: number;
  skills: SkillGap[];
  targetRole: string;
  totalSkills: number;
}

export const mockSkillGapAnalysis: SkillGapAnalysis = {
  targetRole: "Senior Frontend Engineer",
  readinessScore: 68,
  totalSkills: 16,
  matchedSkills: 9,
  missingSkills: 7,
  skills: [
    {
      skill: "React",
      category: "frontend",
      importance: "critical",
      currentLevel: "expert",
      recommendedActions: [
        "Continue contributing to open-source React projects",
        "Mentor junior developers on React patterns",
      ],
    },
    {
      skill: "TypeScript",
      category: "frontend",
      importance: "critical",
      currentLevel: "advanced",
      recommendedActions: [
        "Review advanced type system patterns (conditional types, mapped types)",
        "Contribute type definitions to DefinitelyTyped",
      ],
    },
    {
      skill: "Next.js",
      category: "frontend",
      importance: "critical",
      currentLevel: "advanced",
      recommendedActions: [
        "Build a full-stack app with App Router, server actions, and middleware",
        "Explore edge runtime and streaming patterns",
      ],
    },
    {
      skill: "Tailwind CSS",
      category: "frontend",
      importance: "important",
      currentLevel: "advanced",
      recommendedActions: ["Build a custom design system with Tailwind v4"],
    },
    {
      skill: "Node.js",
      category: "backend",
      importance: "important",
      currentLevel: "advanced",
      recommendedActions: [
        "Deep-dive into Node.js stream API and worker threads",
      ],
    },
    {
      skill: "GraphQL",
      category: "backend",
      importance: "important",
      currentLevel: "intermediate",
      recommendedActions: [
        "Build a GraphQL federation gateway",
        "Learn Apollo Federation or GraphQL Mesh",
      ],
    },
    {
      skill: "Accessibility",
      category: "frontend",
      importance: "important",
      currentLevel: "intermediate",
      recommendedActions: [
        "Complete WCAG 2.2 audit on a production app",
        "Implement ARIA patterns for complex widgets",
      ],
    },
    {
      skill: "Performance Optimization",
      category: "frontend",
      importance: "important",
      currentLevel: "advanced",
      recommendedActions: [
        "Profile and optimize a React app with Lighthouse and Web Vitals",
      ],
    },
    {
      skill: "Test-Driven Development",
      category: "frontend",
      importance: "important",
      currentLevel: "intermediate",
      recommendedActions: [
        "Write tests before implementation for a new feature",
        "Explore property-based testing with fast-check",
      ],
    },
    {
      skill: "Kubernetes",
      category: "infrastructure",
      importance: "important",
      currentLevel: "none",
      recommendedActions: [
        "Complete Kubernetes 101 tutorial (minikube or kind)",
        "Deploy a demo app with Helm charts",
      ],
      portfolioProjectIdeas: [
        "Build a personal CI/CD pipeline with GitHub Actions and Kubernetes",
      ],
    },
    {
      skill: "Distributed Systems",
      category: "backend",
      importance: "critical",
      currentLevel: "none",
      recommendedActions: [
        "Read Designing Data-Intensive Applications by Kleppmann",
        "Build a simple distributed key-value store",
      ],
      portfolioProjectIdeas: [
        "Implement a distributed rate limiter or consistent hash ring",
      ],
    },
    {
      skill: "Go",
      category: "backend",
      importance: "important",
      currentLevel: "none",
      recommendedActions: [
        "Complete Tour of Go and build a CLI tool",
        "Rewrite a simple Node.js service in Go for comparison",
      ],
      portfolioProjectIdeas: [
        "Build a URL shortener API in Go with PostgreSQL",
      ],
    },
    {
      skill: "Rust",
      category: "backend",
      importance: "nice-to-have",
      currentLevel: "none",
      recommendedActions: [
        "Complete Rustlings exercises",
        "Build a small CLI tool in Rust",
      ],
      portfolioProjectIdeas: [
        "Create a WebAssembly module for browser-based computation",
      ],
    },
    {
      skill: "Engineering Management",
      category: "management",
      importance: "critical",
      currentLevel: "none",
      recommendedActions: [
        "Shadow an engineering manager for a sprint cycle",
        "Read The Manager's Path by Camille Fournier",
      ],
      portfolioProjectIdeas: [
        "Write a post-mortem or engineering strategy doc as a writing sample",
      ],
    },
    {
      skill: "Python",
      category: "backend",
      importance: "nice-to-have",
      currentLevel: "beginner",
      recommendedActions: [
        "Build a simple automation script with Python",
        "Complete Python Crash Course or similar",
      ],
    },
    {
      skill: "Machine Learning",
      category: "data",
      importance: "nice-to-have",
      currentLevel: "none",
      recommendedActions: [
        "Take Andrew Ng's Machine Learning Specialization",
        "Build a simple classifier with scikit-learn",
      ],
    },
  ],
};

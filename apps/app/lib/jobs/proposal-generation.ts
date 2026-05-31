/**
 * Proposal generation — deterministic mock draft builder.
 *
 * Generates a ClientProposalDraft from a FreelanceOpportunity using
 * internal mock content only. No AI provider calls, no invented client
 * facts, and no external data are used.
 *
 * AI availability: not provided. The @repo/ai package exists but no
 * AI action pattern or provider is wired for proposal generation.
 */

import { mockPortfolioProjects } from "./portfolio-data";
import type {
  ClientProposalDraft,
  FreelanceOpportunity,
  ProposalSection,
  ProposalTone,
} from "./types";

// ---------------------------------------------------------------------------
// Deterministic section builders
// ---------------------------------------------------------------------------

function buildSections(
  gig: FreelanceOpportunity,
  tone: ProposalTone
): ProposalSection[] {
  const greeting = (() => {
    switch (tone) {
      case "friendly":
        return "Hi there!";
      case "enthusiastic":
        return "I was thrilled to come across this opportunity!";
      case "consultative":
        return "After reviewing your requirements, here is my proposal.";
      default:
        return "Dear Hiring Manager,";
    }
  })();

  return [
    {
      id: "understanding",
      title: "Understanding of Your Needs",
      body: `${greeting}\n\nI understand you are looking for someone to ${gig.description.toLowerCase().slice(0, 80)}... Based on the project description, you need a skilled professional who can deliver high-quality work on time.`,
    },
    {
      id: "approach",
      title: "My Approach",
      body: "I would take a collaborative, iterative approach to this project. Starting with a discovery phase to align on requirements, followed by structured sprints with regular check-ins and demos. Communication would happen via your preferred channel, with weekly status updates and milestone reviews.",
    },
    {
      id: "experience",
      title: "Relevant Experience",
      body: `I have worked on similar projects involving ${gig.requiredSkills.slice(0, 3).join(", ")}, among other technologies. My portfolio includes projects built with modern tooling and best practices in accessibility, performance, and maintainability.`,
    },
    {
      id: "timeline",
      title: "Proposed Timeline",
      body: "I propose an initial engagement of 4-6 weeks, with clear milestones:\n\n\u2022 Week 1: Discovery, requirements finalization, and project setup\n\u2022 Weeks 2-3: Core implementation and iterative feedback\n\u2022 Week 4: Testing, refinement, and delivery\n\nTimeline can be adjusted based on scope and availability.",
    },
    {
      id: "investment",
      title: "Investment",
      body: `Budget: ${gig.budget ?? gig.rate ?? "To be discussed based on scope"}\n\nThis is a placeholder estimate. A final quote will be provided after scope clarification. Payments are not processed through this platform.`,
    },
    {
      id: "next-steps",
      title: "Next Steps",
      body: "If this proposal aligns with your needs, I would welcome the opportunity to discuss the project in more detail. Please let me know a convenient time for a call or video meeting.\n\nThank you for considering my proposal. I look forward to hearing from you.",
    },
  ];
}

function buildScopeItems(gig: FreelanceOpportunity) {
  return [
    {
      id: "scope-1",
      label: "Discovery & Requirements",
      description:
        "Initial consultation, requirements gathering, and project scope finalization.",
    },
    {
      id: "scope-2",
      label: "Core Development",
      description: `Implementation of core features using ${gig.requiredSkills.slice(0, 2).join(", ")} and related technologies.`,
    },
    {
      id: "scope-3",
      label: "Testing & QA",
      description:
        "Comprehensive testing including unit tests, integration tests, and cross-browser/device validation.",
    },
    {
      id: "scope-4",
      label: "Delivery & Documentation",
      description:
        "Final delivery with documentation, deployment support, and a brief handover session.",
    },
  ];
}

function buildTimeline() {
  return [
    {
      id: "tl-1",
      label: "Discovery & Planning",
      duration: "Week 1",
      description:
        "Requirements finalization, tech stack setup, and project roadmap.",
    },
    {
      id: "tl-2",
      label: "Core Build Phase 1",
      duration: "Weeks 2-3",
      description: "Primary feature development with regular check-ins.",
    },
    {
      id: "tl-3",
      label: "Testing & Refinement",
      duration: "Week 4",
      description:
        "QA, bug fixes, performance optimization, and browser testing.",
    },
    {
      id: "tl-4",
      label: "Delivery",
      duration: "Week 5",
      description: "Final delivery, documentation, and deployment support.",
    },
  ];
}

function pickPortfolioRefs(): string[] {
  const available = mockPortfolioProjects.filter(
    (p) => p.title !== "Upcube Console"
  );
  const selected: string[] = [];
  const count = Math.min(2, available.length);
  for (let i = 0; i < count; i++) {
    selected.push(available[i].id);
  }
  return selected;
}

// ---------------------------------------------------------------------------
// Deterministic draft builder
// ---------------------------------------------------------------------------

export function generateProposalDraft(
  gig: FreelanceOpportunity
): ClientProposalDraft {
  const tone: ProposalTone = "professional";
  const now = new Date().toISOString();

  return {
    id: `prop-${gig.id}`,
    opportunityId: gig.id,
    clientName: gig.client,
    clientProblem: gig.description,
    proposedSolution: `Deliver a high-quality solution using ${gig.requiredSkills.slice(0, 3).join(", ")}. The approach focuses on clean architecture, maintainable code, and close collaboration throughout the engagement.`,
    proposalSections: buildSections(gig, tone),
    scopeItems: buildScopeItems(gig),
    timeline: buildTimeline(),
    suggestedBudget: gig.budget ?? gig.rate ?? "To be discussed",
    portfolioRefs: pickPortfolioRefs(),
    status: "draft",
    tone,
    createdAt: now,
    updatedAt: now,
  };
}

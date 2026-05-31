import type {
  BehavioralQuestion,
  QuestionToAsk,
  TechnicalQuestion,
} from "./interview-prep";

export interface InterviewPrepInput {
  company: string;
  jobDescription: string;
  role: string;
  userHighlights: string[];
  userSkills: string[];
  userSummary: string;
}

export interface StarOutline {
  action: string;
  result: string;
  situation: string;
  task: string;
}

export interface GeneratedStarAnswer {
  aiProvider: string;
  isMock: boolean;
  question: string;
  questionId: string;
  starOutline: StarOutline;
  warnings: string[];
}

export function generateMockBehavioralQuestions(
  input: InterviewPrepInput
): BehavioralQuestion[] {
  const roleKeywords = input.role.toLowerCase();
  const isLeadOrManager =
    roleKeywords.includes("lead") ||
    roleKeywords.includes("manager") ||
    roleKeywords.includes("head") ||
    roleKeywords.includes("director");

  const questions: BehavioralQuestion[] = [
    {
      id: "bg-gen-1",
      question: `Tell me about a time you contributed to a successful project similar to what ${input.company} does.`,
      category: isLeadOrManager ? "leadership" : "success",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome. Base your answer on your actual experience only — do not invent facts.",
    },
    {
      id: "bg-gen-2",
      question: `Describe a technical challenge you overcame that relates to ${input.role} work.`,
      category: "initiative",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome. Use only real experiences from your career.",
    },
    {
      id: "bg-gen-3",
      question: `How do you stay current with developments relevant to ${input.role}?`,
      category: "growth",
      starPrompt:
        "Describe specific learning activities, communities, or projects. Do not claim credentials or experience you do not have.",
    },
    {
      id: "bg-gen-4",
      question:
        "Tell me about a time you worked with a team to deliver results under pressure.",
      category: "teamwork",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome. Ground your answer in a real experience.",
    },
    {
      id: "bg-gen-5",
      question: `What would you bring to ${input.company} that other candidates might not?`,
      category: "initiative",
      starPrompt:
        "Describe your unique combination of skills and experiences. Based only on your actual background.",
    },
  ];

  if (isLeadOrManager) {
    questions.splice(0, 0, {
      id: "bg-gen-0",
      question:
        "How have you led technical decision-making in a previous role?",
      category: "leadership",
      starPrompt:
        "Describe the situation, your role, the action you took, and the outcome. Use only real experiences.",
    });
  }

  return questions;
}

export function generateMockTechnicalQuestions(
  input: InterviewPrepInput
): TechnicalQuestion[] {
  const roleKeywords = input.role.toLowerCase();
  const isFrontend =
    roleKeywords.includes("frontend") || roleKeywords.includes("front-end");
  const isBackend =
    roleKeywords.includes("backend") || roleKeywords.includes("back-end");
  const isFullStack =
    roleKeywords.includes("full stack") || roleKeywords.includes("full-stack");
  const isManager =
    roleKeywords.includes("manager") || roleKeywords.includes("lead");
  const isData = roleKeywords.includes("data");

  const questions: TechnicalQuestion[] = [];

  if (isFrontend || isFullStack) {
    questions.push({
      id: "tech-gen-1",
      question: "Describe how you would optimize a slow React component.",
      category: "frontend",
      difficulty: "medium",
      topics: ["react", "performance"],
      hints: [
        "Think about profiling tools first",
        "Consider memo, useMemo, and virtualization",
      ],
    });
  }

  if (isBackend || isFullStack) {
    questions.push({
      id: "tech-gen-2",
      question:
        "How would you design a REST API endpoint that handles high traffic?",
      category: "backend",
      difficulty: "medium",
      topics: ["api-design", "scalability"],
      hints: [
        "Consider caching, rate limiting, and database indexing",
        "Think about pagination strategies",
      ],
    });
  }

  if (isData) {
    questions.push({
      id: "tech-gen-3",
      question: "How would you design a data pipeline for real-time analytics?",
      category: "data",
      difficulty: "hard",
      topics: ["data-pipelines", "streaming", "analytics"],
      hints: [
        "Consider stream processing vs batch processing",
        "Think about fault tolerance and exactly-once semantics",
      ],
    });
  }

  if (isManager) {
    questions.push({
      id: "tech-gen-4",
      question: "How do you evaluate technical proposals from your team?",
      category: "system-design",
      difficulty: "medium",
      topics: ["technical-leadership", "decision-making"],
      hints: [
        "Consider RFC process and trade-off analysis",
        "Think about how you balance speed vs quality",
      ],
    });
  }

  if (questions.length === 0) {
    questions.push({
      id: "tech-gen-0",
      question:
        "Describe a technical project you are proud of and walk through your design decisions.",
      category: "general",
      difficulty: "medium",
      topics: ["general", "problem-solving"],
      hints: [
        "Start with the problem you were solving",
        "Explain trade-offs you considered",
      ],
    });
  }

  return questions;
}

export function generateMockQuestionsToAsk(
  input: InterviewPrepInput
): QuestionToAsk[] {
  return [
    {
      id: "q-gen-1",
      question: `What does success look like in this ${input.role} role during the first quarter?`,
      category: "role",
    },
    {
      id: "q-gen-2",
      question: `Can you describe the team I would be working with at ${input.company}?`,
      category: "team",
    },
    {
      id: "q-gen-3",
      question: `What are the biggest priorities for the ${input.role} team right now?`,
      category: "company",
    },
    {
      id: "q-gen-4",
      question: "How does the company support professional development?",
      category: "growth",
    },
  ];
}

export function generateMockStarOutline(
  question: string,
  userHighlights: string[]
): GeneratedStarAnswer {
  const warnings: string[] = [];

  if (userHighlights.length === 0) {
    warnings.push("No resume highlights available. STAR outline is generic.");
  }

  warnings.push("AI generation is not configured. Outline is template-based.");
  warnings.push("Replace placeholder content with your real experience.");

  return {
    questionId: `star-${Date.now()}`,
    question,
    starOutline: {
      situation:
        userHighlights.length > 0
          ? `In my previous role, ${userHighlights[0].toLowerCase()}`
          : "Describe the context and background of the situation you were in.",
      task:
        userHighlights.length > 1
          ? `My responsibility was to ${userHighlights[1].toLowerCase()}`
          : "What goal or responsibility were you given?",
      action:
        "Describe the specific steps you took. Include your thinking process and any tools or methods you used.",
      result:
        "What was the outcome? Include measurable results where possible (percentages, time saved, revenue impact).",
    },
    warnings,
    aiProvider: "not provided",
    isMock: true,
  };
}

export const aiProviderStatus = "not provided" as const;

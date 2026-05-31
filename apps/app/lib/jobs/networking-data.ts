export interface NetworkingContact {
  company: string;
  connectionLevel: "1st" | "2nd" | "3rd";
  email?: string;
  followUpDate?: string;
  id: string;
  lastContacted?: string;
  name: string;
  notes?: string;
  role: string;
  tags: string[];
}

export interface OutreachTemplate {
  body: string;
  category: "referral" | "cold" | "follow-up" | "thank-you";
  id: string;
  title: string;
}

export interface FollowUpReminder {
  contactId: string;
  contactName: string;
  dueDate: string;
  id: string;
  priority: "high" | "medium" | "low";
  reason: string;
}

export const mockContacts: NetworkingContact[] = [
  {
    id: "contact-1",
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "Vercel",
    connectionLevel: "1st",
    lastContacted: "2 weeks ago",
    notes: "Met at React Conf. Interested in platform engineering roles.",
    tags: ["recruiter", "tech"],
    email: "sarah@example.com",
    followUpDate: "2026-06-15",
  },
  {
    id: "contact-2",
    name: "Alex Rivera",
    role: "Senior Staff Engineer",
    company: "Netflix",
    connectionLevel: "2nd",
    tags: ["engineer", "referral-potential"],
  },
  {
    id: "contact-3",
    name: "Jordan Taylor",
    role: "Technical Recruiter",
    company: "Stripe",
    connectionLevel: "1st",
    lastContacted: "1 month ago",
    notes:
      "Reached out about platform engineering roles. Waiting to hear back.",
    tags: ["recruiter", "fintech"],
    followUpDate: "2026-06-10",
  },
  {
    id: "contact-4",
    name: "Morgan Lee",
    role: "Director of Engineering",
    company: "Notion",
    connectionLevel: "2nd",
    tags: ["engineering-leader", "referral-potential"],
  },
  {
    id: "contact-5",
    name: "Casey Kim",
    role: "Developer Advocate",
    company: "Cloudflare",
    connectionLevel: "1st",
    lastContacted: "1 week ago",
    notes: "Discussed speaking opportunities at Cloudflare Dev Week.",
    tags: ["advocate", "tech"],
    followUpDate: "2026-06-08",
  },
  {
    id: "contact-6",
    name: "Priya Patel",
    role: "Senior Recruiter",
    company: "GitHub",
    connectionLevel: "3rd",
    tags: ["recruiter", "platform"],
  },
  {
    id: "contact-7",
    name: "Riley Thompson",
    role: "Product Manager",
    company: "Linear",
    connectionLevel: "2nd",
    tags: ["pm", "startup"],
  },
];

export const mockOutreachTemplates: OutreachTemplate[] = [
  {
    id: "tmpl-1",
    title: "Referral Request",
    category: "referral",
    body: `Hi {{name}},

I hope you're doing well! I'm currently exploring new opportunities and came across the {{role}} position at {{company}}.

Given your experience there, I'd really appreciate a referral if you think I'd be a good fit. My background in {{skill1}} and {{skill2}} aligns closely with what the team is looking for.

Happy to chat more about my experience and why I'm excited about {{company}}.

Thanks for considering!`,
  },
  {
    id: "tmpl-2",
    title: "Cold Outreach — Recruiter",
    category: "cold",
    body: `Hi {{name}},

I'm a {{currentRole}} with experience in {{skill1}} and {{skill2}}. I've been following {{company}}'s work and am impressed by {{notable}}.

I'm reaching out because I think my background could be a strong match for your team. Would you be open to a brief chat to discuss potential opportunities?

Best regards,`,
  },
  {
    id: "tmpl-3",
    title: "Follow-Up",
    category: "follow-up",
    body: `Hi {{name}},

Just following up on my previous message. I remain very interested in the {{role}} opportunity and wanted to check if you've had a chance to review my application.

Happy to provide any additional information that might be helpful.

Thanks again for your time!`,
  },
  {
    id: "tmpl-4",
    title: "Thank You (Post-Interview)",
    category: "thank-you",
    body: `Hi {{name}},

Thank you so much for taking the time to speak with me today. I really enjoyed learning more about {{company}}'s vision and the {{role}} role.

Our conversation about {{topic}} was particularly exciting, and it reinforced my enthusiasm for the opportunity.

Looking forward to the next steps!`,
  },
];

export const mockFollowUps: FollowUpReminder[] = [
  {
    id: "fu-1",
    contactName: "Jordan Taylor",
    contactId: "contact-3",
    reason: "Follow up on Stripe platform engineering role inquiry",
    dueDate: "2026-06-10",
    priority: "high",
  },
  {
    id: "fu-2",
    contactName: "Sarah Chen",
    contactId: "contact-1",
    reason: "Send portfolio link after React Conf discussion",
    dueDate: "2026-06-15",
    priority: "medium",
  },
  {
    id: "fu-3",
    contactName: "Casey Kim",
    contactId: "contact-5",
    reason: "Follow up on Cloudflare speaking opportunity",
    dueDate: "2026-06-08",
    priority: "low",
  },
];

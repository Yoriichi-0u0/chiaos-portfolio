export type Profile = {
  name: string;
  preferredName: string;
  location: string;
  hometown?: string;
  university: string;
  degree: string;
  majors: string[];
  identity: string;
  tagline: string;
  positioning: string;
  targetRoles: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
};

export type MissionCategory =
  | "AI"
  | "Cloud"
  | "Design"
  | "Negotiation"
  | "Database"
  | "Networking";

export type Mission = {
  id: string;
  title: string;
  category: MissionCategory;
  summary: string;
  role?: string;
  proof: string[];
  technologies: string[];
  status: "Built" | "In progress" | "Portfolio proof";
  note?: string;
  linkLabel: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: {
    name: string;
    evidence: string;
    stage: "Applied" | "Building" | "Learning";
  }[];
};

export type Experience = {
  organization: string;
  location: string;
  role: string;
  startDate?: string;
  endDate?: string;
  summary: string;
  responsibilities: string[];
  metrics?: string[];
  events?: string[];
  caseStudy?: {
    title: string;
    summary: string;
  };
};

export type Education = {
  university: string;
  degree: string;
  majors: string[];
  location: string;
  orientation?: string;
  firstSemester?: string;
  currentStage?: string;
  expectedGraduation?: string;
  cgpaSnapshot?: string;
  focus: string[];
  foundation?: {
    institution: string;
    program: string;
    completed: string;
    cgpa: string;
  };
};

export type TimelineItem = {
  stage: string;
  title: string;
  summary: string;
  focus: string[];
};

export type BuildLog = {
  title: string;
  dateLabel: string;
  summary: string;
  tags: string[];
};

export type RoadmapItem = {
  horizon: "Now" | "Next" | "Later" | "Long term";
  title: string;
  summary: string;
};

export type AssistantAnswer = {
  answer: string;
  sources: string[];
  confident: boolean;
};

export type SystemSectionKey =
  | "hero"
  | "identity"
  | "education"
  | "operations"
  | "missions"
  | "skills"
  | "life-os"
  | "timeline"
  | "build-logs"
  | "roadmap"
  | "ask"
  | "contact";

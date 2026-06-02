export type Profile = {
  name: string;
  preferredName: string;
  location: string;
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
  | "Negotiation"
  | "Database"
  | "Networking";

export type Mission = {
  id: string;
  title: string;
  category: MissionCategory;
  summary: string;
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
  summary: string;
  responsibilities: string[];
};

export type Education = {
  university: string;
  degree: string;
  majors: string[];
  location: string;
  focus: string[];
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

import { buildLogs } from "@/data/buildLogs";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { roadmap } from "@/data/roadmap";
import { skillGroups } from "@/data/skills";
import { timeline } from "@/data/timeline";
import type { AssistantAnswer } from "@/types/portfolio";
import { normalizeText } from "@/lib/utils";
import { getChiaOSVersion } from "@/lib/version";

type CorpusItem = {
  source: string;
  keywords: string[];
  text: string;
  answer: string | (() => string);
};

const corpus: CorpusItem[] = [
  {
    source: "Profile",
    keywords: ["who", "profile", "identity", "about", "location", "role"],
    text: `${profile.name} ${profile.preferredName} ${profile.location} ${profile.identity} ${profile.positioning} ${profile.targetRoles.join(" ")}`,
    answer: `I'm Chia, an undergraduate builder in ${profile.location}, focused on AI, cybersecurity, cloud architecture, and software systems. ChiaOS is my career system for showing development skill, creative direction, project proof, and the way I keep building.`,
  },
  {
    source: "ChiaOS Version",
    keywords: ["version", "age", "birthday", "birth", "real age", "v20", "updates"],
    text: "ChiaOS version follows Chia's real age and updates through the current age year.",
    answer: () => {
      const version = getChiaOSVersion();
      return `${version.label} is live. The major version is my full age in years, and the minor version tracks progress through my current age year. ${version.tooltip}`;
    },
  },
  {
    source: "Education",
    keywords: ["education", "university", "degree", "major", "swinburne", "study"],
    text: `${education.university} ${education.degree} ${education.majors.join(" ")} ${education.focus.join(" ")}`,
    answer: `${profile.preferredName} studies ${education.degree} at ${education.university}, majoring in ${education.majors.join(" and ")}. Current focus areas include ${education.focus.join(", ")}.`,
  },
  {
    source: "Experience",
    keywords: ["experience", "work", "job", "admin", "hotline", "realfun", "communication"],
    text: experience
      .map((item) => `${item.organization} ${item.role} ${item.summary} ${item.responsibilities.join(" ")}`)
      .join(" "),
    answer: experience
      .map(
        (item) =>
          `My major work experience so far is ${item.role} at ${item.organization}, ${item.location}. ${item.summary} Responsibilities included ${item.responsibilities.join(" ")}`
      )
      .join(" "),
  },
  {
    source: "Missions",
    keywords: [
      "project",
      "mission",
      "portfolio",
      "built",
      "proof",
      "cos30049",
      "cos30018",
      "automated",
      "negotiation",
      "aws",
      "database",
      "networking",
      "repo",
      "github",
    ],
    text: missions
      .map((mission) => `${mission.title} ${mission.category} ${mission.summary} ${mission.proof.join(" ")} ${mission.technologies.join(" ")} ${mission.href}`)
      .join(" "),
    answer: `My flagship mission file is COS30049 Computing Technology Innovation Project, currently the university project I am most satisfied with. Repo: https://github.com/jostinchok/my-react-app.git. COS30018 Automated Negotiation System is an Intelligent Systems mission; the team repo is private for now, with a public copy coming soon at https://github.com/Yoriichi-0u0/cos30018-assignment.git while the final public repo details are still being confirmed. Other mission files stay described without invented links.`,
  },
  {
    source: "Skills",
    keywords: ["skills", "can", "technology", "stack", "tools", "strength"],
    text: skillGroups
      .map((group) => `${group.title} ${group.description} ${group.skills.map((skill) => `${skill.name} ${skill.evidence} ${skill.stage}`).join(" ")}`)
      .join(" "),
    answer: `ChiaOS groups skills into ${skillGroups.map((group) => group.title).join(", ")}. The site avoids fake percentages and uses evidence-based stages such as Applied, Building, and Learning.`,
  },
  {
    source: "Timeline",
    keywords: ["timeline", "growth", "journey", "past", "learned", "foundation"],
    text: timeline
      .map((item) => `${item.stage} ${item.title} ${item.summary} ${item.focus.join(" ")}`)
      .join(" "),
    answer: `The career timeline moves through ${timeline.map((item) => item.title).join(", ")}. It shows Chia's growth from programming foundations into AI, networking, cloud architecture, and ChiaOS as a career system.`,
  },
  {
    source: "Roadmap",
    keywords: ["roadmap", "future", "next", "later", "goal", "internship", "plan"],
    text: roadmap.map((item) => `${item.horizon} ${item.title} ${item.summary}`).join(" "),
    answer: `The roadmap is: ${roadmap.map((item) => `${item.horizon}: ${item.summary}`).join(" ")}`,
  },
  {
    source: "Build Logs",
    keywords: ["build", "log", "updates", "vibe", "coding", "ai assisted"],
    text: buildLogs.map((log) => `${log.title} ${log.dateLabel} ${log.summary} ${log.tags.join(" ")}`).join(" "),
    answer: `Build logs currently cover ${buildLogs.map((log) => log.title).join(", ")}. They document ChiaOS planning, project proof cleanup, and AI-assisted builder workflow.`,
  },
  {
    source: "Contact",
    keywords: ["contact", "email", "github", "linkedin", "reach", "mail"],
    text: `${profile.contact.email} ${profile.contact.github} ${profile.contact.linkedin}`,
    answer: `You can reach me at ${profile.contact.email}, find my GitHub at ${profile.contact.github}, and connect on LinkedIn at ${profile.contact.linkedin}.`,
  },
];

function scoreItem(question: string, item: CorpusItem) {
  const normalizedQuestion = normalizeText(question);
  const normalizedText = normalizeText(`${item.text} ${item.keywords.join(" ")}`);
  const stopTerms = new Set([
    "and",
    "are",
    "can",
    "chia",
    "chiaos",
    "does",
    "for",
    "has",
    "have",
    "his",
    "kai",
    "the",
    "what",
    "yuen",
  ]);
  const terms = normalizedQuestion
    .split(" ")
    .filter((term) => term.length > 2 && !stopTerms.has(term));

  const keywordScore = item.keywords.reduce(
    (score, keyword) => score + (normalizedQuestion.includes(keyword) ? 4 : 0),
    0
  );
  const termScore = terms.reduce(
    (score, term) => score + (normalizedText.includes(term) ? 1 : 0),
    0
  );

  return keywordScore + termScore;
}

export function answerFromLocalData(question: string): AssistantAnswer {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      answer: "Ask a question about Chia's profile, missions, skills, education, experience, roadmap, or build logs.",
      sources: [],
      confident: false,
    };
  }

  const ranked = corpus
    .map((item) => ({ ...item, score: scoreItem(trimmedQuestion, item) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  if (!best || best.score < 3) {
    return {
      answer:
        "ChiaOS does not have enough local information to answer that honestly yet. Please contact Chia directly or add this detail to the local profile data.",
      sources: [],
      confident: false,
    };
  }

  const relatedSources = ranked
    .filter((item) => item.score > 2)
    .slice(0, 3)
    .map((item) => item.source);

  return {
    answer: typeof best.answer === "function" ? best.answer() : best.answer,
    sources: relatedSources,
    confident: true,
  };
}

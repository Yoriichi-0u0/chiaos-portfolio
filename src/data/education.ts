import type { Education } from "@/types/portfolio";

const cgpa = "3.51";

export const education: Education = {
  university: "Swinburne University of Technology Sarawak",
  degree: "Bachelor of Computer Science",
  majors: ["Artificial Intelligence", "Cybersecurity"],
  location: "Kuching, Sarawak, Malaysia",
  orientation: "August 2024",
  firstSemester: "September 2024",
  currentStage: "Year 3, Semester 1 / fifth semester out of six (Semester 2, 2026)",
  currentStageSource:
    "Inferred from the September 2024 start and the recorded fourth-semester progression. Not yet confirmed by an official record.",
  expectedGraduation: "Around June or July 2027, if everything goes well",
  cgpa,
  cgpaSnapshot: `Cumulative CGPA ${cgpa} as of the last completed semester`,
  focus: [
    "AI systems and model workflows",
    "Cybersecurity and networking foundations",
    "Cloud architecture and secure software systems",
    "Database-backed web systems",
  ],
  foundation: {
    institution: "Curtin University Malaysia",
    program: "Foundation in Arts & Commerce",
    completed: "Completed July 2024",
    cgpa: "CGPA 4.00",
  },
};

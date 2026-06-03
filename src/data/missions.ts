import type { Mission } from "@/types/portfolio";

export const missions: Mission[] = [
  {
    id: "cos30049-computing-technology-innovation-project",
    title: "COS30049 Computing Technology Innovation Project",
    category: "AI",
    summary:
      "Chia's flagship university project: an AI, full-stack, and system integration mission that represents one of his strongest current proof-of-work projects.",
    role: "AI / full-stack / system integration proof-of-work",
    proof: [
      "Flagship university project and current favorite build",
      "AI-oriented direction with full-stack delivery",
      "System integration work across a real project repo",
    ],
    technologies: ["AI", "Full-stack", "System Integration", "Software Delivery"],
    status: "Built",
    note: "Currently the university project Chia is most satisfied with.",
    linkLabel: "Open COS30049 repo",
    href: "https://github.com/jostinchok/my-react-app.git",
  },
  {
    id: "automated-negotiation-system",
    title: "COS30018 Intelligent Systems / Automated Negotiation System",
    category: "Negotiation",
    summary:
      "A multi-agent negotiation and Intelligent Systems project exploring agent behavior, decision flow, and structured negotiation logic.",
    role: "Multi-agent negotiation system design and implementation",
    proof: [
      "Automated negotiation workflow and agent decision logic",
      "Intelligent Systems coursework mission",
      "Public copy planned while final repo details are confirmed",
    ],
    technologies: ["Intelligent Systems", "Negotiation Agents", "Decision Logic", "Software Design"],
    status: "In progress",
    note: "Public copy coming soon; repo name may change as the final public version is cleaned up.",
    linkLabel: "Public copy coming soon",
    href: "https://github.com/Yoriichi-0u0/cos30018-assignment.git",
  },
  {
    id: "cos40007-design-project-ai-work",
    title: "COS40007 Design Project / AI-related Project Work",
    category: "Design",
    summary:
      "AI-related design and project work that Chia is shaping into a clearer public proof file before linking it.",
    role: "AI-related design/project work",
    proof: [
      "Design project direction connected to AI practice",
      "Public write-up and link intentionally pending",
      "Described first, linked only after the public version is ready",
    ],
    technologies: ["AI", "Design Project", "Research Direction", "System Thinking"],
    status: "In progress",
    note: "No public link yet. ChiaOS keeps the placeholder honest until the project is ready to share.",
    linkLabel: "View in ChiaOS System",
    href: "/system#missions",
  },
  {
    id: "aws-cloud-architecture",
    title: "AWS Cloud Architecture Design",
    category: "Cloud",
    summary:
      "A secure and scalable cloud architecture design mission focused on practical service selection, availability, and system boundaries.",
    role: "Cloud architecture planning and tradeoff mapping",
    proof: [
      "AWS service mapping",
      "Secure architecture tradeoff thinking",
      "Scalability and reliability planning",
    ],
    technologies: ["AWS", "Cloud Architecture", "Security", "Scalability"],
    status: "Portfolio proof",
    linkLabel: "Project link pending",
    href: "#contact",
  },
  {
    id: "database-design-project",
    title: "Database Design Project",
    category: "Database",
    summary:
      "A data modeling mission focused on relational structure, normalization, querying, and building reliable database-backed workflows.",
    role: "Relational data modeling and database workflow practice",
    proof: [
      "Relational schema design",
      "SQL query practice",
      "Database-backed application thinking",
    ],
    technologies: ["SQL", "Database Design", "ERD", "Normalization"],
    status: "Built",
    linkLabel: "Project link pending",
    href: "#contact",
  },
  {
    id: "networking-switching-portfolio",
    title: "Networking and Switching Portfolio",
    category: "Networking",
    summary:
      "A network design and switching portfolio covering VLANs, subnetting, STP, EtherChannel, and secure network structure.",
    role: "Networking foundations and switching portfolio practice",
    proof: [
      "VLAN and subnet planning",
      "Switching protocol configuration",
      "Secure network design foundations",
    ],
    technologies: ["VLANs", "Subnetting", "STP", "EtherChannel", "Security"],
    status: "Portfolio proof",
    linkLabel: "Project link pending",
    href: "#contact",
  },
];

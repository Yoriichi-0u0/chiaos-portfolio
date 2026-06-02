import type { Mission } from "@/types/portfolio";

export const missions: Mission[] = [
  {
    id: "cos30049-computing-technology-innovation-project",
    title: "COS30049 Computing Technology Innovation Project",
    category: "AI",
    summary:
      "Chia's flagship university project: an AI, full-stack, and system integration mission that represents one of his strongest current proof-of-work projects.",
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
    id: "aws-cloud-architecture",
    title: "AWS Cloud Architecture Design",
    category: "Cloud",
    summary:
      "A secure and scalable cloud architecture design mission focused on practical service selection, availability, and system boundaries.",
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
    id: "automated-negotiation-system",
    title: "COS30018 Automated Negotiation System",
    category: "Negotiation",
    summary:
      "An Intelligent Systems mission exploring automated negotiation, structured agent behavior, and decision flow. The team repo is private for now, with a public copy coming soon.",
    proof: [
      "Automated negotiation workflow and agent decision logic",
      "Intelligent Systems coursework mission",
      "Public copy planned while final repo details are confirmed",
    ],
    technologies: ["Intelligent Systems", "Negotiation Agents", "Decision Logic", "Software Design"],
    status: "In progress",
    note: "Private team repo exists; final public copy/name is still pending confirmation.",
    linkLabel: "Public copy coming soon",
    href: "https://github.com/Yoriichi-0u0/cos30018-assignment.git",
  },
  {
    id: "database-design-project",
    title: "Database Design Project",
    category: "Database",
    summary:
      "A data modeling mission focused on relational structure, normalization, querying, and building reliable database-backed workflows.",
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

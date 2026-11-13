import type { Mission } from "@/types/portfolio";

export const missions: Mission[] = [
  {
    id: "earth-fm",
    title: "Earth FM",
    category: "Space",
    period: "NASA Space Apps Challenge 2026",
    featured: true,
    summary:
      "A multisensory Earth Information Jukebox prototype that turns a NASA visual and NASA GISTEMP observations into browser-generated sound, with the mapping kept visible.",
    role: "Team leader, team BoboMimi",
    proof: [
      "Five-page Studio: Home, Listen, Create, Explore Data and About",
      "Live pixel-scan sonification of NASA SVS 5190, the Climate Spiral",
      "Twelve selected January GISTEMP v4 anomalies on a fixed pitch scale",
    ],
    technologies: ["React", "TypeScript", "Vite", "Web Audio", "Three.js", "React Three Fiber", "Playwright"],
    status: "Live prototype",
    linkLabel: "Open Earth FM",
    href: "https://earth-fm.vercel.app/",
    links: [
      { label: "Live prototype", href: "https://earth-fm.vercel.app/" },
      { label: "Source", href: "https://github.com/Yoriichi-0u0/earth-fm" },
    ],
    caseStudy: {
      problem:
        "Earth visualizations can be engaging but hard for a first-time learner to interpret. The challenge asked for visual frames paired with dynamic, real-time sonification.",
      contribution:
        "Team leader of BoboMimi, a two-person team. A detailed split of individual contributions is pending confirmation, so this case study describes the team's shared prototype.",
      architecture: [
        "A 48-strip left-to-right scan maps image brightness to pitch, RGB to timbre and position to stereo pan.",
        "Bundled GISTEMP snapshots play on a fixed ten-band scale, with dates, values and frequencies shown together.",
        "Fonts, visuals and observations ship with the app, so there are no runtime data requests or uploads.",
      ],
      challenges: [
        "Keeping image sonification clearly separate from measurement: the scan is a visual pattern, not a thermometer.",
        "Equal note length does not encode elapsed time, so exact values and gaps stay visible beside the melody.",
      ],
      results: [
        "Public prototype with two curated Earth Stations: Climate Spiral and Arctic September.",
        "English and Simplified Chinese, keyboard controls and reduced-motion defaults.",
      ],
      limits:
        "No participant study has been run. Learning effectiveness and screen-reader and physical iPhone behaviour are not yet established.",
      evidence: "Repository README and docs/SUBMISSION.md, checked 13 November 2026.",
    },
  },
  {
    id: "fingence",
    title: "FinGence: Finance Intelligence",
    category: "Fintech",
    period: "COS40005 Project A, client: Sarawak Artificial Intelligence Centre",
    featured: true,
    summary:
      "AI-driven financial analysis and automated reporting for the Sarawak Artificial Intelligence Centre (SAIC): ingestion, reconciliation, anomaly review and management reports with traceable evidence.",
    role: "Team project: data ingestion owner",
    proof: [
      "Deterministic CSV/XLSX ingestion with column mapping, validation and lineage",
      "Bank-to-ledger reconciliation with row-level source evidence",
      "Signed-in workspace with roles, saved runs and an audited AI-call gateway",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "pdf-lib", "Tesseract.js", "Vitest"],
    status: "In progress",
    linkLabel: "View FinGence source",
    href: "https://github.com/Yoriichi-0u0/FinGence-Finance-Intelligence",
    links: [
      { label: "Source", href: "https://github.com/Yoriichi-0u0/FinGence-Finance-Intelligence" },
      { label: "Hosted workspace (sign-in)", href: "https://fingence-financeintelligence.vercel.app/" },
    ],
    caseStudy: {
      problem:
        "Finance teams reconcile bank and ledger records, investigate unusual movements and write management reports by hand. Each step needs evidence a reviewer can trace back to source rows.",
      contribution:
        "Listed as owner of the data-ingestion work in the team's release ownership table. Other modules belong to teammates, and this case study describes the team's shared system.",
      architecture: [
        "Ingestion profiles source values, validates rows and keeps lineage and quarantined records for review.",
        "Every AI model call passes through one gateway that records metadata only; a test fails the build on a direct provider call.",
        "Supabase functions run as the service role only, with forced row-level security and scrypt-hashed passwords.",
      ],
      challenges: [
        "Keeping original exceptions and financial facts separate from human review decisions.",
        "Reporting measured results honestly, including counts that differed from the original brief.",
      ],
      results: [
        "Synthetic March PoC: 175 bank and 177 ledger rows sorted into seven reconciliation outcomes.",
        "Rule-based anomaly baseline on constructed synthetic data: 86.7% recall, 41.1% precision.",
      ],
      limits:
        "Results come from synthetic data, not client files, and do not prove accounting correctness. Several AI features stay disabled in hosted production.",
      evidence: "Repository README, docs/handoff/CURRENT.md and the combined PoC runbook, checked 13 November 2026.",
    },
  },
  {
    id: "bird-species-classification",
    title: "200-Species Bird Classifier",
    category: "AI",
    period: "COS30082 Applied Machine Learning",
    featured: true,
    summary:
      "A fine-tuned EfficientNetB3 image classifier for 200 bird species, packaged as an educational Streamlit app with Top-5 predictions and documented limits.",
    proof: [
      "76.41% Top-1 and 93.69% Top-5 on the official 1,204-image test set",
      "CPU float32 inference at 380 × 380 with verified class mapping",
      "Upload limits, provenance lock and attribution for upstream components",
    ],
    technologies: ["Python", "TensorFlow / Keras", "EfficientNetB3", "Streamlit", "Transfer learning"],
    status: "Built",
    linkLabel: "View classifier source",
    href: "https://github.com/Yoriichi-0u0/COS30082-AS01-Bird-Species-Classification",
    links: [
      { label: "Source", href: "https://github.com/Yoriichi-0u0/COS30082-AS01-Bird-Species-Classification" },
    ],
    caseStudy: {
      problem:
        "Classify photographs into 200 closely related bird species, then ship the model so anyone can test it without a GPU.",
      contribution:
        "The project fine-tunes the model from ImageNet weights, evaluates it on the official test partition and packages single-view deterministic inference.",
      architecture: [
        "One frozen EfficientNetB3 model with 380 × 380 RGB input and CPU float32 inference.",
        "The ordered class mapping and preprocessing are verified before the model loads.",
        "Uploads are limited to 10 MiB and 20 megapixels, and the app ranks the Top-5 species.",
      ],
      challenges: [
        "Fine-grained classes: many species differ only in small markings.",
        "Communicating that softmax confidence is not a calibrated probability.",
      ],
      results: [
        "Official test (1,204 images): 76.41% Top-1, 75.85% average class accuracy, 93.69% Top-5.",
        "Internal validation (959 images): 80.29% Top-1, 93.43% Top-5.",
      ],
      limits:
        "The model only knows the 200 supplied species and will still label other birds or non-bird images. The hosted Streamlit app currently requires a Streamlit sign-in, so only the source is linked here.",
      evidence: "Repository README, verified results table, checked 13 November 2026.",
    },
  },
  {
    id: "sarawak-tourism-information-system",
    title: "Sarawak Tourism Information System",
    category: "Product",
    period: "SWE30003 Assignment 01",
    featured: true,
    summary:
      "A responsive tourism UI/UX prototype for discovering Sarawak, planning a multi-day trip and demonstrating a local listing-management workflow.",
    proof: [
      "Search, filter and compare up to three attractions",
      "Day-by-day trip planner with text export and explicit shared-link import",
      "Local management demo with archive, restore, activity log and CSV export",
    ],
    technologies: ["React", "TypeScript", "Vite", "Responsive design", "Local storage"],
    status: "Live prototype",
    linkLabel: "Open prototype",
    href: "https://sarawak-tourism-information-system.vercel.app/",
    links: [
      { label: "Live prototype", href: "https://sarawak-tourism-information-system.vercel.app/" },
      { label: "Source", href: "https://github.com/Yoriichi-0u0/Sarawak-Tourism-Information-System" },
    ],
    caseStudy: {
      problem:
        "Turn an incomplete draft SRS for a Sarawak tourism system into a usable visitor and staff experience.",
      contribution:
        "The prototype maps requirements to workflows and documents design assumptions where the SRS was silent. Individual roles are pending confirmation.",
      architecture: [
        "A browser-only React app; saved places, trips and edits live in local storage.",
        "Shared trip URLs carry only catalogue entries and require the visitor to click Import trip.",
        "Provider links must use HTTPS and open in a separate tab.",
      ],
      challenges: [
        "Filling gaps in the SRS without presenting assumptions as requirements.",
        "Fitting eight sections into a mobile bottom navigation.",
      ],
      results: [
        "Public prototype verified at 1440 × 1080 and 390 × 844.",
        "The management session ends after 15 minutes of inactivity.",
      ],
      limits:
        "A UI/UX demonstrator only: no accounts, payments, real reservations, live availability or shared database.",
      evidence: "Repository README, checked 13 November 2026.",
    },
  },
  {
    id: "pagepilot",
    title: "PagePilot",
    category: "Product",
    summary:
      "A free, privacy-first PDF workspace for merging, splitting, reordering, compressing, annotating and signing documents in the browser.",
    proof: [
      "Core PDF tools run locally in the browser",
      "Public privacy page: no PDF content, file names or page counts in analytics",
      "Public feedback repository for bug reports and feature requests",
    ],
    technologies: ["Web app", "PDF tools", "Privacy by design"],
    status: "Live product",
    linkLabel: "Open PagePilot",
    href: "https://pagepilot-inky.vercel.app/",
    links: [
      { label: "Live product", href: "https://pagepilot-inky.vercel.app/" },
      { label: "Public feedback", href: "https://github.com/Yoriichi-0u0/PagePilot-Feedback" },
    ],
  },
  {
    id: "little-orbit",
    title: "Little Orbit",
    category: "Space",
    period: "NASA Space Apps Challenge 2026",
    summary:
      "A junior astronaut mission trainer where students build a Moon or Mars outpost and balance power, oxygen, water, food and crew health over 14 turns.",
    proof: [
      "Exact next-turn resource forecast and mission journal",
      "Four scripted incidents, each with a free fallback",
      "14 primary references: 13 NASA/JPL sources plus the challenge",
    ],
    technologies: ["React", "TypeScript", "Vite", "Vitest", "Playwright"],
    status: "Live prototype",
    linkLabel: "Play Little Orbit",
    href: "https://little-orbit-seven.vercel.app/",
    links: [
      { label: "Play", href: "https://little-orbit-seven.vercel.app/" },
      { label: "Source", href: "https://github.com/Yoriichi-0u0/little-orbit" },
    ],
  },
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

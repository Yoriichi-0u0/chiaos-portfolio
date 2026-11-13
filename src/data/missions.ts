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
    screenshot: {
      src: "/screenshots/earth-fm.webp",
      alt: "Earth FM home page with the Climate Spiral record, visual-sound scanner and four Earth stories.",
      capturedOn: "13 November 2026",
    },
    links: [
      { label: "Live prototype", href: "https://earth-fm.vercel.app/" },
      { label: "Source", href: "https://github.com/Yoriichi-0u0/earth-fm" },
    ],
    caseStudy: {
      problem:
        "Earth visualizations can be engaging but hard for a first-time learner to interpret. The challenge asked for visual frames paired with dynamic, real-time sonification.",
      contribution:
        "Chia led team BoboMimi, a two-person team with Jacy Chiong Yet Suu, and contributed to development and integration. The delivered app is shared team work, so features here are credited to the team.",
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
    role: "Data Ingestion Lead and Integration Contributor",
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
        "Led the data-ingestion workstream: deterministic CSV/XLSX ingestion, validation, normalization and source lineage. Also contributed to AI-assisted ingestion workflows and application integration. Teammates own the analytics, backend and security components, and this case study describes the team's shared system.",
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
    period: "COS30082 Applied Machine Learning, Assignment 1 (individual)",
    featured: true,
    summary:
      "A fine-tuned EfficientNetB3 image classifier for 200 bird species, packaged as an educational Streamlit app with Top-5 predictions and documented limits.",
    role: "Individual project",
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
        "Individual assignment (AS01): Chia fine-tuned EfficientNetB3 from ImageNet weights, evaluated it on the official test partition and packaged it as a Streamlit app. This is separate from the COS30082 group project.",
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
    period: "Supplementary prototype, based on the SWE30003 Assignment 01 case",
    featured: true,
    summary:
      "A responsive React UI/UX prototype derived from the SWE30003 draft SRS, for discovering Sarawak, planning a multi-day trip and demonstrating a local listing-management workflow.",
    role: "UI/UX prototype development",
    proof: [
      "Search, filter and compare up to three attractions",
      "Day-by-day trip planner with text export and explicit shared-link import",
      "Local management demo with archive, restore, activity log and CSV export",
    ],
    technologies: ["React", "TypeScript", "Vite", "Responsive design", "Local storage"],
    status: "Live prototype",
    linkLabel: "Open prototype",
    href: "https://sarawak-tourism-information-system.vercel.app/",
    screenshot: {
      src: "/screenshots/sarawak-tourism-information-system.webp",
      alt: "Sarawak tourism prototype home page with a rainforest hero image, search bar and experience filters.",
      capturedOn: "13 November 2026",
    },
    links: [
      { label: "Live prototype", href: "https://sarawak-tourism-information-system.vercel.app/" },
      { label: "Source", href: "https://github.com/Yoriichi-0u0/Sarawak-Tourism-Information-System" },
    ],
    caseStudy: {
      problem:
        "Turn an incomplete draft SRS for a Sarawak tourism system into a usable visitor and staff experience.",
      contribution:
        "Supplementary UI/UX prototype work, maintained in Chia's public repository. It maps the draft SRS to working flows and documents design assumptions where the SRS was silent. It is not the completed SWE30003 assessment.",
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
        "A UI/UX demonstrator only: no accounts, payments, real reservations, live availability or shared database. The management area is a local demo and does not meet the SRS's staff authorization requirement.",
      evidence: "Repository README, checked 13 November 2026.",
    },
  },
  {
    id: "pagepilot",
    title: "PagePilot",
    category: "Product",
    period: "Personal product, June 2026 to present",
    featured: true,
    summary:
      "A free, local-first PDF workspace for merging, splitting, reordering, compressing, annotating and signing documents in the browser, with no accounts and no uploads.",
    role: "Product development: scope, UX and technical direction",
    proof: [
      "Previews render with PDF.js and exports are written with pdf-lib, in the browser",
      "Public privacy page: no PDF content, file names, sizes or page counts in analytics",
      "Known limits are published: structural compression, flattened notes, visual signatures",
    ],
    technologies: ["Next.js", "React", "TypeScript", "PDF.js", "pdf-lib", "Web Workers", "Vercel Analytics"],
    status: "Live product",
    linkLabel: "Open PagePilot",
    href: "https://pagepilot-inky.vercel.app/",
    screenshot: {
      src: "/screenshots/pagepilot.webp",
      alt: "PagePilot home page with a local PDF workspace and the Organize, Send and Sign, and Review tool groups.",
      capturedOn: "13 November 2026",
    },
    links: [
      { label: "Live product", href: "https://pagepilot-inky.vercel.app/" },
      { label: "Public feedback", href: "https://github.com/Yoriichi-0u0/PagePilot-Feedback" },
    ],
    caseStudy: {
      problem:
        "Students often need to merge, split, trim, sign or shrink a PDF right before a deadline. Many free tools upload the file, add a watermark or require an account.",
      contribution:
        "Chia's own product: he defined the scope, the user experience, the technical direction and the browser-based PDF workflows. The source is private, so this case study uses only facts from the live product and its public pages.",
      architecture: [
        "Files are read into browser memory. PDF.js renders previews and thumbnails, and pdf-lib writes the exported PDF.",
        "Heavier visual reorder, annotation and signature exports run in a Web Worker so the page stays responsive.",
        "The result downloads from a temporary local Blob URL. Documents are never stored in cookies, persistent browser storage, an offline database or a service-worker cache.",
        "Cookieless analytics count only event names and tool names. Automatic pageviews are discarded.",
      ],
      challenges: [
        "Measuring whether people complete a task without collecting anything about their documents.",
        "Being honest about what browser-only processing can and cannot do.",
      ],
      results: [
        "Public beta with merge, split, reorder, remove pages, compress, text notes, highlights, fill and sign.",
        "Unlimited core workflows with no accounts, watermarks or AI features.",
      ],
      limits:
        "Compression is structural optimization only: it does not downsample images and may not shrink every PDF. Notes and highlights are flattened into the export. Signatures are visual electronic marks, not certificate-backed digital signatures, and do not verify identity.",
      evidence: "Live product, /privacy and /terms (effective 16 August 2026), checked 13 November 2026.",
    },
  },
  {
    id: "little-orbit",
    title: "Little Orbit",
    category: "Space",
    period: "Built for the NASA Space Apps 2026 junior astronaut challenge",
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
    screenshot: {
      src: "/screenshots/little-orbit.webp",
      alt: "Little Orbit mission control with resource gauges, a lunar outpost and today's flight plan.",
      capturedOn: "13 November 2026",
    },
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
    title: "Velvet Hammer Auto Auction",
    category: "Negotiation",
    period: "COS30018 Intelligent Systems, five-person team project",
    summary:
      "A JADE multi-agent car auction in Java: a broker matches buyer and dealer agents, who negotiate prices automatically or manually from a Swing dashboard.",
    role: "Agent communication and protocols",
    proof: [
      "Broker, dealer and buyer agents exchanging JADE ACL messages",
      "Three dealer strategies: stubborn, desperate and matcher",
      "Live negotiation feed, market boards and a negotiation-gap chart",
    ],
    technologies: ["Java", "JADE", "Multi-agent systems", "Java Swing"],
    status: "Built",
    note: "Team project led by Jonathan Zheng Li Chai. Chia's documented role is agent communication and protocols.",
    linkLabel: "View source",
    href: "https://github.com/Yoriichi-0u0/cos30018-assignment",
  },
  {
    id: "cos40007-yolov5-graffiti-detection",
    title: "YOLOv5 Graffiti Detection",
    category: "AI",
    period: "COS40007 AI for Engineering, Portfolio 4 (individual)",
    summary:
      "An individual deep-learning portfolio that trains YOLOv5 to detect graffiti, with annotation conversion, a dataset audit, three training iterations, IoU evaluation and error analysis.",
    role: "Individual project",
    proof: [
      "Three iterations on 400, 600 and all 732 training images",
      "Best default-configuration result: 18 of 40 test images reached IoU ≥ 0.90",
      "Video detection, error analysis and a GenAI declaration",
    ],
    technologies: ["Python", "YOLOv5", "PyTorch", "Object detection", "Jupyter"],
    status: "Built",
    note: "The target was 32 of 40 test images at IoU ≥ 0.90. The default-configuration notebook reached 18, which the write-up reports and discusses.",
    linkLabel: "View source",
    href: "https://github.com/Yoriichi-0u0/cos40007-portfolio-04",
  },
  {
    id: "aws-cloud-architecture",
    title: "Cloud File Management System",
    category: "Cloud",
    period: "Four-person team project, March to June 2026",
    summary:
      "A scalable, event-driven AWS architecture for uploading, processing and delivering files, covering storage, identity, queues, media processing and edge security.",
    role: "Team lead",
    proof: [
      "Led a four-member team through the architecture design",
      "Event-driven processing with Lambda, SNS and SQS",
      "Edge and identity layers: CloudFront, AWS WAF, Cognito and Route 53",
    ],
    technologies: ["Amazon S3", "CloudFront", "API Gateway", "Cognito", "Lambda", "DynamoDB", "SNS", "SQS", "MediaConvert", "Rekognition", "AWS WAF", "VPC"],
    status: "Portfolio proof",
    note: "Architecture design project. There is no public repository, so this mission file is the public record.",
    linkLabel: "Read the mission file",
    href: "#aws-cloud-architecture",
    links: [],
    caseStudy: {
      problem:
        "Design a file-management system that scales with uploads, processes media and images automatically, and stays secure at the edge.",
      contribution: "Chia led the four-member team that designed the architecture.",
      architecture: [
        "Uploads land in Amazon S3 and are delivered through CloudFront, with Route 53 for DNS and AWS WAF at the edge.",
        "API Gateway and Cognito handle the API and user identity. DynamoDB stores file metadata.",
        "Lambda functions react to events, and SNS and SQS fan out and buffer work. MediaConvert transcodes video and Rekognition analyses images.",
        "Private resources run inside VPC networking.",
      ],
      challenges: [
        "Keeping processing asynchronous so uploads never wait for media jobs.",
        "Choosing managed services that scale without servers to operate.",
      ],
      results: ["A documented event-driven architecture across 13 AWS services."],
      limits:
        "This was a design project. Load, cost and availability figures were not measured in a live deployment, and no public source is linked.",
      evidence: "Chia's CV (September 2026). Completion of COS20019 Cloud Computing Architecture is recorded in his Degree Progress Audit (August 2026).",
    },
  },
  {
    id: "database-design-project",
    title: "COS20031 Database Design Project",
    category: "Database",
    summary:
      "A completed university unit in relational database design: data modeling, normalization and SQL querying.",
    role: "Completed unit",
    proof: [
      "Unit completion recorded in the Degree Progress Audit (August 2026)",
      "Database work is also applied in FinGence (Supabase and PostgreSQL)",
    ],
    technologies: ["SQL", "Database Design", "ERD", "Normalization"],
    status: "Built",
    note: "Project artefacts are not public yet, so no project link is shown.",
    linkLabel: "See FinGence",
    href: "#fingence",
    links: [{ label: "Applied in FinGence", href: "#fingence" }],
  },
  {
    id: "networking-switching-portfolio",
    title: "TNE10006 Networks and Switching",
    category: "Networking",
    summary:
      "A completed university unit in network design and switching, covering VLANs, subnetting, STP and EtherChannel.",
    role: "Completed unit",
    proof: [
      "Unit completion recorded in the Degree Progress Audit (August 2026)",
      "Followed by COS30015 IT Security; TNE30009 Network Security and Resilience is a current unit",
    ],
    technologies: ["VLANs", "Subnetting", "STP", "EtherChannel"],
    status: "Built",
    note: "Lab and portfolio artefacts are not public yet, so no project link is shown.",
    linkLabel: "No public link",
    href: "#networking-switching-portfolio",
    links: [],
  },
];

export type CardOrientation = 'landscape' | 'portrait';

export type ProjectCategory =
  | 'Case Study'
  | 'PRD'
  | 'Prototype'
  | 'Blog'
  | 'Certification'
  | 'Build Project';

export type WorkCategory = Exclude<ProjectCategory, 'Certification'>;

export type Project = {
  slug: string;
  title: string;
  /** One-line teaser shown on the card by default */
  summary?: string;
  /** Full description — shown when the card is expanded */
  description?: string;
  href: string;
  category: ProjectCategory;
  orientation: CardOrientation;
  inProgress?: boolean;
  issuer?: string;
};

export const RESUME_URL = 'https://canva.link/c3qgcbhuqnj3jqn';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/aparna6/';

export type WorkFilter = WorkCategory | 'All';

export const WORK_FILTER_ORDER: WorkFilter[] = [
  'All',
  'Build Project',
  'Case Study',
  'PRD',
  'Prototype',
  'Blog',
];

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  'Case Study':    'Case Studies',
  'PRD':           'PRDs',
  'Prototype':     'Prototypes',
  'Blog':          'Blogs',
  'Certification': 'Certifications',
  'Build Project': 'Projects',
};

export const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  'Case Study':    '#3A6B4E',
  'PRD':           '#4B3FA0',
  'Prototype':     '#6E3FA0',
  'Blog':          '#C68B2D',
  'Certification': '#2D7DB5',
  'Build Project': '#B5525A',
};

export const WORK_ITEMS: Project[] = [
  // Build Projects
  {
    slug: 'thoughtful',
    title: 'Thoughtful',
    description: 'A natural language reminder tool built on Google Calendar, WhatsApp, and Google Meet APIs, designed to make staying in touch effortless. Peaked at 60 weekly active users | April 2026',
    href: 'https://www.thoughtful.my/',
    category: 'Build Project',
    orientation: 'landscape',
  },
  {
    slug: 'mutual-fund-faq',
    title: 'Mutual Fund FAQ Assistant',
    summary: 'A facts-only RAG chatbot for objective mutual fund queries — NAV, expense ratio, exit load, SIP minimums, and AUM — sourced exclusively from official Groww pages.',
    description: 'Built and deployed a facts-only RAG chatbot that answers objective queries about six Indian mutual fund schemes on metrics such as NAV, expense ratio, exit load, minimum SIP and AUM using only official Groww scheme pages as the source corpus.\n\nDesigned with strict compliance guardrails: no investment advice, no hallucinations, no open-web retrieval. The system classifies intent before every query, refuses out-of-scope and advisory questions with structured responses, and cites the exact source URL for every answer it gives.\n\nBuilt the pipeline end-to-end including ingestion, chunking, BM25 retrieval (with a hybrid FAISS fallback), structured fact extraction, optional Groq LLM polish, and a static chat UI. Automated daily corpus refresh via GitHub Actions keeps the index current without manual intervention.\n\nDeployed on: FastAPI backend on Render, static frontend on Vercel.',
    href: 'https://mutualfund-faq-ra-gbot.vercel.app',
    category: 'Build Project',
    orientation: 'landscape',
  },
  {
    slug: 'knowyourfood',
    title: 'KnowYourFood',
    summary: 'An AI restaurant recommendation engine that ranks Bangalore spots from the Zomato dataset based on your area, budget, cuisine, and rating filters.',
    description: 'KnowYourFood, an AI Restaurant Recommendation Engine. Find your next perfect food spot in Bangalore! KnowYourFood pulls from the Zomato dataset via Hugging Face, and uses Groq (Llama 3.1) to intelligently rank the top restaurants based on the filters you set, delivered through a clean and functional interface.\n\nStack: Next.js | Tailwind CSS | Vercel | FastAPI | Render | Groq (Llama 3.1) | Hugging Face Datasets',
    href: 'https://next-leap-cursor.vercel.app',
    category: 'Build Project',
    orientation: 'landscape',
  },

  // Case Studies
  {
    slug: 'goodreads',
    title: 'Goodreads',
    description: 'A product teardown of Goodreads: analyzing why a platform with 150M+ users still feels stuck in 2009, and what it would take to fix it.',
    href: 'https://www.canva.com/design/DAGb2cN6Cq4/34XnULqwt0O_Zw-cJwsSfQ/view?utm_content=DAGb2cN6Cq4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h914d3da40c',
    category: 'Case Study',
    orientation: 'landscape',
  },
  {
    slug: 'chatgpt-systems',
    title: 'ChatGPT voice feature in India: Research & Mapping product outcomes',
    href: 'https://drive.google.com/file/d/14tXr4n8LjRREi7VHMhQGoU3cUKC63JRk/view',
    category: 'Case Study',
    orientation: 'landscape',
  },
  {
    slug: 'chatgpt-research',
    title: 'ChatGPT voice feature in India: User Research and Problem Framing',
    href: 'https://drive.google.com/file/d/17NB6wMtZZqzW-s9HcyXzyoKPuXxjV6CB/view',
    category: 'Case Study',
    orientation: 'landscape',
  },
  {
    slug: 'chatgpt-metrics',
    title: 'ChatGPT voice feature in India: Prioritization, Metrics & Growth',
    href: 'https://drive.google.com/file/d/1HShlsyMjgE5m_047E81GA5qHfYfVZqeu/view',
    category: 'Case Study',
    orientation: 'landscape',
  },

  // PRDs
  {
    slug: 'n26-case',
    title: 'N26',
    description: 'What would happen if a major international European bank catered to GenZ? A proposal for the product in the form of a PRD.',
    href: 'https://aerial-apogee-494.notion.site/Gamifying-Investment-for-a-Younger-Audience-An-N26-Pitch-1e6969f3a5d980e7a896d2fbaa361406',
    category: 'PRD',
    orientation: 'landscape',
  },
  {
    slug: 'google-maps',
    title: 'Itinerary Generator: Google Maps',
    description: 'Reimagining a feature that helps tourists have an intelligent assistant in new cities.',
    href: 'https://www.canva.com/design/DAGhCGqN9Ig/S6zHBO2uoR4xBl2HOEK2JQ/view?utm_content=DAGhCGqN9Ig&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd1b440943e',
    category: 'PRD',
    orientation: 'portrait',
  },
  {
    slug: 'pinterest',
    title: 'Pinterest Pin Management',
    description: 'Pinterest has 500M users and deep organisation of what you save is a hassle. A redesign proposal for smarter pin management.',
    href: 'https://www.canva.com/design/DAGhcDg2vIc/koCzNeOqGbJK7HUSFJBIFA/view?utm_content=DAGhcDg2vIc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h63d0557f49',
    category: 'PRD',
    orientation: 'portrait',
  },

  // Prototypes
  {
    slug: 'nextleap-m3',
    title: 'ChatGPT voice feature: Prototype',
    href: 'https://super-rugelach-253666.netlify.app/',
    category: 'Prototype',
    orientation: 'landscape',
  },
  { slug: 'n26-prototype',    title: 'N26 Investment Platform',                 href: 'https://n26.lovable.app',                                                                                                                                                                                             category: 'Prototype',     orientation: 'landscape' },
  { slug: 'figma-todo',       title: 'To Do List · Custom Design System',       href: 'https://cute-carrot-61404083.figma.site/',                                                                                                                                                                            category: 'Prototype',     orientation: 'landscape' },

  // Blogs
  { slug: 'canva-blog',       title: 'Canva on Creative Crack',                 href: 'https://notesbyaparna.substack.com/p/canva-on-creative-crack-a-behavioural?r=53wu9u&utm_campaign=post&utm_medium=web&triedRedirect=true',                                                                             category: 'Blog',          orientation: 'portrait'  },
  { slug: 'culture-blog',     title: '33% Adoption in 30 Days',                 href: 'https://substack.com/home/post/p-169120285',                                                                                                                                                                          category: 'Blog',          orientation: 'landscape' },
  { slug: 'analytics-blog',   title: 'Playing the Numbers Game',                href: 'https://culture.kissflow.com/lessons-in-analytics-07f0e541ce53',                                                                                                                                                     category: 'Blog',          orientation: 'landscape' },
];

export const CERTIFICATIONS: Project[] = [
  { slug: 'iiba-pm-guide',       title: 'Product Management: A Complete Guide', href: 'https://www.linkedin.com/learning/certificates/9a1de7cf75c80ad8a31d984dbca2fce1cb6d6ecd940289c4ea81a3ca2fc6d1d9?trk=share_certificate', category: 'Certification', orientation: 'landscape', issuer: 'IIBA' },
  { slug: 'ibm-cert',            title: 'Product Management Certification',   href: 'https://www.coursera.org/account/accomplishments/verify/LFRPLH0UXXY7?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course', category: 'Certification', orientation: 'landscape', issuer: 'IBM' },
  { slug: 'hackerrank-sql',      title: 'SQL Basic',                            href: 'https://www.hackerrank.com/certificates/iframe/6a0d12c5823b', category: 'Certification', orientation: 'landscape', issuer: 'HackerRank' },
  { slug: 'pendo-cert',          title: 'Radical Product Thinking',           href: 'https://www.credly.com/badges/b22b275d-c067-42bf-8b74-2f52a4983713/public_url', category: 'Certification', orientation: 'landscape', issuer: 'Pendo' },
  { slug: 'linkedin-tech-pm',    title: 'Technology for Product Managers',    href: 'https://www.linkedin.com/learning/certificates/892ac3aafda3bc5c175ae0c6b4b34f887b4849474d524e0b7ca29f524ab3f091', category: 'Certification', orientation: 'landscape', issuer: 'LinkedIn Learning' },
  { slug: 'nextleap-fellowship', title: 'NextLeap PM Fellowship',             href: '', category: 'Certification', orientation: 'landscape', inProgress: true },
];

/** All items — used by work detail routes */
export const PROJECTS: Project[] = [...WORK_ITEMS, ...CERTIFICATIONS];

import type {
  Article,
  Campaign,
  FAQ,
  HeroSlide,
  NavLink,
  Partner,
  Pillar,
  Program,
  Region,
  Resource,
  SocialLink,
  Stat,
  Story,
  TeamMember,
  TimelineEvent,
} from "@/types";

export const organization = {
  name: "Humanity Worldwide",
  shortName: "HWW",
  tagline: "for a better world",
  mission:
    "An international civil society organization dedicated to delivering integrated humanitarian and development solutions for crisis-affected and marginalized populations across South Sudan, Somalia and Sudan.",
  contact: {
    address: "Kansas City, MO 64124, USA",
    email: "cd@humanity-worldwide.org",
    phone: "+1 (816) 208-2270",
  },
  url: "https://humanity-worldwide.org",
};

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Where We Work", href: "/where-we-work" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Success Stories", href: "/stories" },
  { label: "News", href: "/news" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "South Sudan · Somalia · Sudan",
    headline: "Building Futures Through Education",
    subheadline:
      "Quality education and teacher training for crisis-affected communities",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80",
    imageAlt: "Children learning in a classroom in South Sudan",
  },
  {
    eyebrow: "Emergency Response",
    headline: "Standing With Families in Crisis",
    subheadline:
      "Rapid humanitarian action when floods, conflict, and displacement threaten lives",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=1920&q=80",
    imageAlt: "Humanitarian workers responding to flood-affected communities",
  },
  {
    eyebrow: "Clean Water · Healthy Communities",
    headline: "Water That Saves Lives",
    subheadline:
      "WASH programs reaching 10,000 people across 8 states with clean water and sanitation",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1920&q=80",
    imageAlt: "Community members accessing a rehabilitated water point",
  },
];

/** @deprecated use heroSlides — kept for backward compatibility */
export const heroContent = heroSlides[0];

export const pillars: Pillar[] = [
  {
    id: "protection",
    title: "Protection & Rights",
    description:
      "Comprehensive humanitarian programs ensuring the safety, security, and rights of vulnerable populations in accordance with international standards.",
    icon: "shield",
  },
  {
    id: "integrated",
    title: "Integrated Services",
    description:
      "Holistic support programs including education, WASH, protection, livelihoods, shelter, and nutrition services across multiple sectors.",
    icon: "layers",
  },
  {
    id: "community",
    title: "Community Voice",
    description:
      "Community-driven development initiatives championing the rights of marginalized populations and ensuring their voices are heard at all levels.",
    icon: "users",
  },
  {
    id: "evidence",
    title: "Evidence & Accountability",
    description:
      "Evidence-based programming with strong accountability mechanisms to promote sustainable human development and lasting positive change.",
    icon: "chart",
  },
];

export const impactStats: Stat[] = [
  {
    value: 12,
    label: "Classrooms Built",
    description: "Creating safe learning spaces for hundreds of children",
  },
  {
    value: 28,
    label: "Teachers Trained",
    description: "Enhancing education quality through professional development",
  },
  {
    value: 140,
    label: "Shelters Built",
    description: "Providing safe homes for displaced families",
  },
  {
    value: 6000,
    suffix: "+",
    label: "Lives Impacted",
    description: "Transforming communities across South Sudan",
  },
  {
    value: 92,
    suffix: "%",
    label: "Student Retention",
    description: "Sustained enrollment in our education programs",
  },
  {
    value: 85,
    suffix: "%",
    label: "Reduction in Waterborne Diseases",
    description: "Through WASH interventions across communities",
  },
  {
    value: 78,
    suffix: "%",
    label: "Income Improvement Rate",
    description: "Livelihoods program participants reporting gains",
  },
];

export const aboutQuickStats: Stat[] = [
  { value: 7, label: "Regional Offices" },
  { value: 6000, suffix: "+", label: "People Reached" },
  { value: 3, label: "Countries Served" },
  { value: 4, label: "Core Pillars" },
];

export const programs: Program[] = [
  {
    slug: "education",
    title: "Education",
    tagline: "Building Futures",
    description:
      "Quality education, teacher training, school construction, and infrastructure development. UNICEF-supported projects in Kapoeta South, Kapoeta North, Torit and Magwi (South Sudan).",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 12, label: "Classrooms Built" },
      { value: 28, label: "Teachers Trained" },
      { value: 92, suffix: "%", label: "Student Retention" },
    ],
    regions: ["Kapoeta South", "Kapoeta North", "Torit", "Magwi"],
    highlights: [
      "School construction and infrastructure development",
      "Teacher training and professional development",
      "UNICEF-supported education initiatives",
      "Community engagement in education planning",
    ],
    approach:
      "We believe education is the foundation of lasting peace and development. Our education programs combine infrastructure investment with teacher capacity building and community ownership, ensuring schools remain operational long after project completion.",
    gallery: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    ],
  },
  {
    slug: "wash",
    title: "WASH & Environment",
    tagline: "Clean Water, Healthy Communities",
    description:
      "Clean water, sanitation facilities, and hygiene education. Multiple water points rehabilitated across crisis-affected communities.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 85, suffix: "%", label: "Reduction in Waterborne Diseases" },
      { value: 10000, label: "People Reached" },
      { value: 8, label: "States Covered" },
    ],
    highlights: [
      "Water point rehabilitation and construction",
      "Sanitation facility development",
      "Hygiene education and community training",
      "Environmental sustainability initiatives",
    ],
    approach:
      "Access to clean water and sanitation is a human right. Our WASH interventions follow a community-led model — training local water committees, promoting hygiene behavior change, and building infrastructure designed for long-term maintenance.",
    gallery: [
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    ],
  },
  {
    slug: "livelihoods",
    title: "Livelihoods",
    tagline: "Economic Independence",
    description:
      "Vocational training, microfinance, agricultural support, and economic development for sustainable self-reliance.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 78, suffix: "%", label: "Income Improvement Rate" },
      { value: 6000, suffix: "+", label: "Lives Impacted" },
      { value: 7, label: "Regional Offices" },
    ],
    highlights: [
      "Vocational skills training programs",
      "Microfinance and small business support",
      "Agricultural development initiatives",
      "Women and youth economic empowerment",
    ],
    approach:
      "Economic self-reliance breaks cycles of dependency. We equip individuals — especially women and youth — with market-relevant skills, seed capital, and ongoing mentorship to build businesses that sustain families and strengthen communities.",
    gallery: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    ],
  },
];

export const regions: Region[] = [
  {
    slug: "south-sudan",
    name: "South Sudan",
    description:
      "Our largest operational presence, delivering education, WASH, shelter, and livelihoods programs across multiple states.",
    longDescription:
      "South Sudan is the heart of our operations. With 7 regional offices spanning Kapoeta, Torit, Magwi, and Jonglei, we deliver integrated programs that address the interconnected needs of displaced and host communities — from classrooms and clean water to emergency shelter and economic recovery.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 7, label: "Regional Offices" },
      { value: 140, label: "Shelters Built" },
      { value: 12, label: "Classrooms Built" },
    ],
    programs: ["Education", "WASH", "Livelihoods", "Shelter"],
  },
  {
    slug: "somalia",
    name: "Somalia",
    description:
      "Integrated humanitarian response addressing protection, nutrition, and community resilience in crisis-affected areas.",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 3, label: "Program Areas" },
      { value: 2000, suffix: "+", label: "Families Supported" },
    ],
    programs: ["Protection", "Nutrition", "WASH"],
  },
  {
    slug: "sudan",
    name: "Sudan",
    description:
      "Emergency response and development programs supporting displaced populations and marginalized communities.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80", // REPLACE with HWW field photos
    stats: [
      { value: 2, label: "Active Programs" },
      { value: 1500, suffix: "+", label: "People Reached" },
    ],
    programs: ["Emergency Response", "Protection", "Education"],
  },
];

export const campaigns: Campaign[] = [
  {
    slug: "jonglei-flood-response",
    title: "Emergency Response in Jonglei State",
    description:
      "Emergency response efforts reached 2,000 families in Jonglei State following devastating floods. Your support helps us provide shelter, clean water, and essential supplies to families who have lost everything.",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=1200&q=80",
    goal: 150000,
    raised: 97500,
    familiesReached: 2000,
    location: "Jonglei State, South Sudan",
    body: [
      "In January 2024, unprecedented flooding devastated communities across Jonglei State, displacing thousands of families and destroying homes, crops, and critical infrastructure.",
      "Humanity Worldwide mobilized within 72 hours, deploying emergency response teams to the hardest-hit areas. Our teams distributed shelter materials, water purification supplies, and essential non-food items to 2,000 families.",
      "Beyond immediate relief, we are working with local authorities and community leaders to support recovery — rebuilding shelters, rehabilitating water points, and helping families restore livelihoods destroyed by the floods.",
    ],
    needs: [
      "Emergency shelter kits for displaced families",
      "Clean water and sanitation supplies",
      "Non-food items (blankets, cooking sets, hygiene kits)",
      "Livelihood recovery support for affected farmers",
    ],
  },
];

export const stories: Story[] = [
  {
    slug: "maria-education-journey",
    title: "A New Beginning",
    quote:
      "For the first time, my children have a safe place to learn. The new classroom has given our community hope for the future.",
    name: "Maria A.",
    role: "Parent, Kapoeta South",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80", // REPLACE with HWW field photos
    program: "Education",
    body: [
      "Maria's village in Kapoeta South had no permanent school structure. Children learned under trees, their lessons interrupted by rain and heat.",
      "When HWW completed the UNICEF-supported classroom construction project, everything changed. Twelve new classrooms now serve hundreds of children, with trained teachers delivering quality instruction.",
      "Maria's eldest daughter is now top of her class. 'Education is the only gift I can give my children that no one can take away,' Maria says.",
    ],
  },
  {
    slug: "james-wash-impact",
    title: "Clean Water Changes Everything",
    quote:
      "Before the water point was rehabilitated, our children were constantly sick. Now our entire village has access to clean, safe water.",
    name: "James K.",
    role: "Community Leader, Torit",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", // REPLACE with HWW field photos
    program: "WASH",
    body: [
      "James has served as a community leader in Torit for over a decade. He witnessed firsthand the toll that waterborne diseases took on his village — especially among children under five.",
      "When HWW rehabilitated the local water point and trained community hygiene promoters, the transformation was immediate. Cases of diarrhea dropped dramatically within months.",
      "Today, James leads the village water committee, ensuring the infrastructure is maintained and hygiene practices continue. 'Clean water gave us our health back,' he reflects.",
    ],
  },
  {
    slug: "amina-livelihoods",
    title: "Building Economic Independence",
    quote:
      "The vocational training program gave me skills I never thought I could have. I now run my own tailoring business and support my family.",
    name: "Amina H.",
    role: "Program Graduate, Magwi",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", // REPLACE with HWW field photos
    program: "Livelihoods",
    body: [
      "Amina was a single mother of three with no income when she enrolled in HWW's vocational training program in Magwi. She chose tailoring — a skill in high demand in her community.",
      "After completing the six-month program, Amina received a starter kit and microfinance support to launch her own business. Within a year, she was employing two other women from her village.",
      "Her income now covers school fees, food, and healthcare for her family. 'I didn't just learn a skill — I learned that I am capable of changing my own life,' Amina says.",
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "unicef-education-projects-kapoeta",
    title:
      "Completion of UNICEF Education Projects in Kapoeta South, Kapoeta North, Torit and Magwi in South Sudan",
    excerpt:
      "A new education initiative brings hope to children in Kapoeta with comprehensive learning programs and teacher training.",
    author: "Gift Michael Bernado",
    date: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", // REPLACE with HWW field photos
    category: "Education",
    body: [
      "Humanity Worldwide has successfully completed UNICEF-supported education projects across four counties in South Sudan — Kapoeta South, Kapoeta North, Torit, and Magwi.",
      "The initiative delivered 12 newly constructed classrooms, trained 28 teachers in modern pedagogy and child protection, and enrolled over 800 students in quality learning programs.",
      "Community education committees were established in each location to ensure long-term sustainability. Student retention rates reached 92%, exceeding regional benchmarks.",
      "This milestone represents a significant step toward HWW's vision of accessible, quality education for every crisis-affected child in South Sudan.",
    ],
  },
  {
    slug: "emergency-response-jonglei",
    title: "Emergency Response in Jonglei State",
    excerpt:
      "Emergency response efforts reach 2,000 families in Jonglei State following devastating floods.",
    author: "Michael Chen",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=800&q=80", // REPLACE with HWW field photos
    category: "Emergency",
    body: [
      "Devastating floods in Jonglei State displaced thousands of families in early January 2024, destroying homes, crops, and critical infrastructure across multiple counties.",
      "Humanity Worldwide deployed emergency response teams within 72 hours, reaching 2,000 families with shelter materials, water purification supplies, and essential non-food items.",
      "The response included establishing temporary learning spaces for displaced children and rehabilitating three water points to prevent waterborne disease outbreaks in overcrowded displacement sites.",
      "HWW continues to support recovery efforts, working alongside local authorities and community leaders to help families rebuild.",
    ],
  },
  {
    slug: "wash-program-milestone",
    title: "WASH Program Reaches 10,000 People",
    excerpt:
      "WASH program milestone: 10,000 people now have access to clean water across 8 states.",
    author: "John Smith",
    date: "2024-01-01",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80", // REPLACE with HWW field photos
    category: "WASH",
    body: [
      "Humanity Worldwide's WASH program has reached a major milestone — 10,000 people across 8 states now have reliable access to clean water and improved sanitation.",
      "The program rehabilitated 24 water points, constructed 16 latrine blocks, and trained 120 community hygiene promoters in behavior change communication.",
      "Independent monitoring shows an 85% reduction in waterborne diseases in program areas, with significant improvements in child health indicators.",
      "This achievement underscores HWW's commitment to evidence-based programming and community-led WASH solutions.",
    ],
  },
];

export const partners: Partner[] = [
  { name: "UNICEF", abbr: "UNICEF" },
  { name: "Local & State Authorities", abbr: "Gov" },
  { name: "Community Organizations", abbr: "CBO" },
];

export const footerCta = {
  headline: "Join Us in Making a Difference",
  subheadline:
    "Your support can transform lives and build sustainable communities. Every contribution helps us reach more people in need and create lasting positive change.",
};

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Samuel Okello",
    role: "Executive Director",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Leading HWW's mission to deliver integrated humanitarian solutions across East Africa with over 15 years of field experience.",
  },
  {
    name: "Grace Nakato",
    role: "Director of Programs",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    bio: "Overseeing program delivery and community partnerships across all operational regions in South Sudan, Somalia, and Sudan.",
  },
  {
    name: "Peter Majak",
    role: "South Sudan Field Coordinator",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Coordinating field operations across 7 regional offices and ensuring program quality at the community level.",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "2010",
    title: "Foundation",
    description:
      "Humanity Worldwide established with a mission to serve crisis-affected populations.",
  },
  {
    year: "2014",
    title: "South Sudan Expansion",
    description:
      "Expanded operations to South Sudan, launching education and WASH programs.",
  },
  {
    year: "2018",
    title: "UNICEF Partnership",
    description:
      "Began UNICEF-supported education projects across multiple South Sudan states.",
  },
  {
    year: "2022",
    title: "Regional Growth",
    description:
      "Extended presence to Somalia and Sudan, growing to 7 regional offices.",
  },
  {
    year: "2024",
    title: "Emergency Response",
    description:
      "Launched major flood response in Jonglei State, reaching 2,000 families.",
  },
];

export const resources: Resource[] = [
  {
    slug: "annual-report-2023",
    title: "Annual Report 2023",
    description:
      "Comprehensive overview of our programs, impact, and financial transparency.",
    type: "PDF",
    year: "2023",
    pages: 48,
  },
  {
    slug: "education-program-brief",
    title: "Education Program Brief",
    description:
      "Detailed overview of our education initiatives and outcomes in South Sudan.",
    type: "PDF",
    year: "2024",
    pages: 16,
  },
  {
    slug: "wash-impact-assessment",
    title: "WASH Impact Assessment",
    description:
      "Evaluation of water, sanitation, and hygiene program outcomes across 8 states.",
    type: "PDF",
    year: "2024",
    pages: 32,
  },
  {
    slug: "livelihoods-strategy",
    title: "Livelihoods Strategy",
    description:
      "Strategic framework for economic empowerment and sustainable development.",
    type: "PDF",
    year: "2023",
    pages: 24,
  },
];

export const getInvolvedFaqs: FAQ[] = [
  {
    question: "How is my donation used?",
    answer:
      "Your donation directly supports our programs in education, WASH, livelihoods, and emergency response. We maintain strong accountability mechanisms and publish annual reports detailing our financial transparency.",
  },
  {
    question: "Can I volunteer internationally?",
    answer:
      "We welcome volunteers with relevant skills and experience. International placements depend on program needs and security considerations. Contact us to discuss opportunities.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Humanity Worldwide is a registered nonprofit organization. Donations may be tax-deductible depending on your jurisdiction. Please consult your tax advisor.",
  },
  {
    question: "How can my organization partner with HWW?",
    answer:
      "We partner with UN agencies, local authorities, and community organizations. Reach out through our contact form to explore collaboration opportunities.",
  },
];

export const resourcesFaqs: FAQ[] = [
  {
    question: "How often are reports published?",
    answer:
      "We publish annual reports and program briefs on a regular basis. Subscribe to our newsletter to receive updates when new resources are available.",
  },
  {
    question: "Can I request specific program data?",
    answer:
      "Researchers and partners can request additional data through our contact form. We are committed to transparency and evidence-based programming.",
  },
];

export const donationAmounts = [10, 25, 50, 100, 250];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

import type {
  Video,
  Article,
  Campaign,
  EmergencyCountry,
  FAQ,
  HeaderNavItem,
  HeroSlide,
  NavLink,
  Office,
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

/** Google Analytics 4 Measurement ID (G-…). Leave empty to switch tracking off. */
export const googleAnalyticsId = "G-JJDLL7V4FW";

export const organization = {
  name: "Humanity Worldwide",
  shortName: "HWW",
  tagline: "for a better world",
  mission:
    "An international civil society organization dedicated to delivering integrated humanitarian and development solutions for crisis-affected and marginalized populations across South Sudan, Somalia, Sudan and Kenya.",
  contact: {
    address: "2323 Independence Avenue, Kansas City, Missouri, USA",
    email: "Info@humanity-worldwide.org", // main address (used in search results)
    emails: ["Info@humanity-worldwide.org", "cd@humanity-worldwide.org"],
    phone: "+1 (816) 208-2270",
  },
  url: "https://hww.xpeedium.com",
};

/** Search-engine description (Google shows ~155 characters; keep it under 160). */
export const seoDescription =
  "Humanity Worldwide is an international NGO delivering humanitarian aid, livelihoods, education and WASH programs in South Sudan, Somalia, Sudan and Kenya.";

/** About page: "Our Story", vision and mission (text supplied by HWW, Oct 2026). */
export const aboutStory: string[] = [
  "Humanity Worldwide (HWW) is an international civil society organization, established in 2013, working with crisis-affected and marginalized populations to promote dignity, resilience and sustainable development. Over the years, HWW has placed a strong emphasis on humanitarian and crisis response, supporting communities affected by conflict, displacement, food insecurity and other emergencies through integrated humanitarian and development interventions.",
  "It has delivered integrated programming across eight sectors: Education, Livelihoods, WASH, Protection, Nutrition, Shelter and Durable Solutions, serving refugees, internally displaced people, returnees and host communities. This work has included humanitarian response to conflict, displacement and food insecurity, as well as sector-specific interventions in water and sanitation, child protection, nutrition and emergency shelter.",
  "As the needs of the communities continue to evolve, Humanity Worldwide is now strengthening its focus on livelihoods and economic resilience through skills development, financial inclusion and sustainable income-generating opportunities. In South Sudan, the program combines youth skills development and employment, enterprise development, agriculture and livelihoods support, capacity-strengthening for refugee-led organizations and cooperatives, peacebuilding, and transitional shelter. This will be implemented in Juba, Yambio and Bor. Through these interventions, HWW seeks to connect people to skills, markets, financial opportunities and local institutions that can strengthen household incomes, create employment and support longer-term community resilience.",
];

export const vision =
  "A better world for every human — poverty-free, equitable, and dignified communities worldwide.";

export const missionStatement =
  "To foster holistic and integrated humanitarian and development programs that ensure equitable, fulfilled, peaceful, and dignified societies for crisis-affected and marginalized populations.";

/** Offices shown on the Contact page (supplied by HWW, Oct 2026). */
export const offices: Office[] = [
  { label: "Headquarters", city: "Kansas City", address: "2323 Independence Avenue, Kansas City, Missouri, USA" },
  { label: "South Sudan Country Office", city: "Juba", address: "Concord House 3rd Floor, Hai Malakal, Juba - CES, South Sudan" },
  { label: "Sudan", city: "Yabus", address: "Yabus Blue Nile Field Office, Inside NCDO Compound, Next to WFP Office, Yabus, Blue Nile, Sudan" },
  { label: "Somalia", city: "Kismayo", address: "Airport Road, Farjano, Kismayo, Somalia" },
];

/** South Sudan states where HWW operates (state-level naming for public content). */
export const southSudanStates = [
  "Eastern Equatoria",
  "Western Equatoria",
  "Central Equatoria",
  "Jonglei State",
  "Northern Bahr el Ghazal",
  "Lakes State",
];

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61594840062803" },
  { label: "Instagram", href: "https://www.instagram.com/humanityworldwides_sudan/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/humanity-worldwide-6703b7441/" },
  { label: "X", href: "https://x.com/HWWSouthSudan" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Where We Work", href: "/where-we-work" },
  { label: "Emergency Response", href: "/campaigns" },
  { label: "Success Stories", href: "/about#stories" },
  { label: "Field Documentaries & Successes", href: "/media" },
  { label: "News", href: "/news" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

function navByHref(href: string): NavLink {
  const link = navLinks.find((l) => l.href === href);
  if (!link) throw new Error(`Unknown nav href: ${href}`);
  return link;
}

/** Header/mobile nav — labels and hrefs sourced from navLinks for site-wide consistency */
export const headerNavigation: HeaderNavItem[] = [
  {
    label: "About",
    dropdownItems: [
      navByHref("/about"),
      navByHref("/where-we-work"),
      navByHref("/resources"),
    ],
  },
  {
    label: "Our Work",
    dropdownItems: [
      navByHref("/our-work"),
      navByHref("/campaigns"),
      navByHref("/about#stories"),
      navByHref("/media"),
      navByHref("/news"),
    ],
  },
  navByHref("/get-involved"),
  navByHref("/contact"),
];

/** The home page H1: fixed, so search engines always see who HWW is and where it works. */
export const heroHeading =
  "Humanity Worldwide · Humanitarian aid in South Sudan, Somalia, Sudan and Kenya";

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "South Sudan · Somalia · Sudan · Kenya",
    headline: "Building Futures Through Education",
    subheadline:
      "Quality education and teacher training for crisis-affected communities",
    image: "/images/livelihoods-community-group.jpg",
    imageAlt: "Humanity Worldwide community gathering for program support in South Sudan",
  },
  {
    eyebrow: "Emergency Response",
    headline: "Standing With Families in Crisis",
    subheadline:
      "Rapid humanitarian action when floods, conflict, and displacement threaten lives",
    image: "/images/hero-emergency-composite.jpg",
    imageAlt: "Humanity Worldwide emergency response teams supporting flood-affected communities",
  },
  {
    eyebrow: "Clean Water · Healthy Communities",
    headline: "Water That Saves Lives",
    subheadline:
      "WASH programs reaching communities across 8 states with clean water and sanitation",
    image: "/images/wash-water-distribution.jpg",
    imageAlt: "Communities accessing clean water during humanitarian WASH distribution",
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

/** General impact areas for the homepage — no specific unverified figures. */
export const impactAreas: { label: string; description: string }[] = [
  {
    label: "Education",
    description: "Safe learning spaces, teacher support, and community-led schooling",
  },
  {
    label: "WASH",
    description: "Clean water, sanitation, and hygiene for healthier communities",
  },
  {
    label: "Livelihoods",
    description: "Skills, cooperatives, and economic recovery for families",
  },
  {
    label: "Protection",
    description: "Safety, dignity, and support for vulnerable women and children",
  },
  {
    label: "Shelter",
    description: "Emergency and transitional homes for displaced families",
  },
  {
    label: "Emergency Response",
    description: "Rapid relief when floods, conflict, and drought strike",
  },
];

/** @deprecated Prefer impactAreas — kept empty for any remaining Stat-based imports */
export const impactStats: Stat[] = [];

export const aboutQuickStats: Stat[] = [
  { value: 4, label: "Countries Served" },
  { value: 4, label: "Core Pillars" },
];

export const programs: Program[] = [
  {
    slug: "livelihoods",
    title: "Livelihoods",
    tagline: "Economic Independence",
    description:
      "Vocational training, microfinance, agricultural cooperative support, and economic development for sustainable self-reliance in crisis-affected communities.",
    image: "/images/food-security-cooperative.jpg",

    regions: ["Eastern Equatoria"],
    highlights: [
      "Vocational skills training programs and microfinance support in the greater equatoria and Jonglei states",
    ],
    approach:
      "Economic self-reliance breaks cycles of dependency. We equip individuals — especially women and youth — with market-relevant skills, seed capital, and ongoing mentorship to build businesses that sustain families and strengthen communities.",
    gallery: [
      "/images/food-security-cooperative.jpg",
      "/images/livelihoods-community-group.jpg",
      "/images/team-field-staff.jpg",
    ],
    priorities: [
      {
        title: "Youth Skills and Employment",
        intro: [
          "Young people represent a significant source of energy, innovation and economic potential. HWW therefore equips young people with skills that translate into real economic opportunity and supports them to acquire practical skills, explore employment pathways, develop enterprises and participate meaningfully in their communities as workers, entrepreneurs, innovators, leaders and agents of change through:",
        ],
        items: ["Market-relevant training", "Employability skills", "Entrepreneurship training", "Job-readiness support", "Apprenticeships and mentorship", "Enterprise development", "Youth-led economic initiatives", "Linkages with employers and markets", "Youth participation in community development"],
      },
      {
        title: "Enterprise Development",
        intro: [
          "Small businesses and entrepreneurs are critical to local economies, particularly in fragile and underserved communities.",
          "HWW supports individuals and groups to strengthen their ability to establish, manage and grow sustainable enterprises and move from short-term assistance towards sustainable economic participation through:",
        ],
        items: ["Business skills", "Entrepreneurship training", "Business planning", "Financial literacy", "Mentorship", "Access to finance", "Enterprise strengthening", "Market linkages", "Value-chain participation", "Income-generating activities"],
      },
      {
        title: "Agriculture and Livelihoods",
        intro: [
          "Agriculture is an important source of food, income and employment for many communities across fragile and rural settings.",
          "HWW supports agricultural livelihoods and community-based economic activity by strengthening skills, production, organization and market opportunities.",
        ],
        lead: "Areas of focus include:",
        items: ["Agricultural skills", "Farmer training", "Sustainable production", "Livelihood diversification", "Producer groups", "Cooperatives", "Agricultural enterprises", "Market access", "Value-chain development", "Income-generating activities"],
      },
      {
        title: "Financial Inclusion",
        intro: [
          "People and enterprises need access to appropriate financial services and the knowledge to manage resources effectively.",
        ],
        lead: "HWW supports financial inclusion through approaches such as:",
        items: ["Financial literacy", "Savings", "Access to appropriate financial services", "Microfinance-related support", "Enterprise finance", "Financial management", "Linkages to financial institutions", "Support to community-based financial mechanisms"],
      },
      {
        title: "Refugee-Led Organisations",
        intro: [
          "People affected by displacement are not simply recipients of assistance. They possess knowledge, networks, leadership and solutions that can contribute to stronger communities.",
          "HWW supports Refugee-Led Organizations (RLOs) to strengthen their capacity, participation and ability to contribute to solutions affecting their communities.",
        ],
        lead: "Our approach includes:",
        items: ["Organizational capacity strengthening", "Leadership development", "Institutional development", "Community engagement", "Partnership opportunities", "Participation in programme design", "Linkages with humanitarian and development actors", "Support for locally led solutions"],
      },
      {
        title: "Cooperatives and Collective Economic Action",
        intro: [
          "Cooperatives can provide communities with a platform to pool resources, improve production, strengthen bargaining power and access markets.",
        ],
        lead: "HWW supports cooperative development through:",
        items: ["Cooperative governance", "Leadership and management", "Business development", "Financial management", "Skills development", "Production and productivity", "Market linkages", "Value-chain development", "Member capacity strengthening"],
      },
      {
        title: "Peacebuilding and Social Cohesion",
        intro: [
          "HWW recognizes that communities facing conflict, displacement and economic exclusion require approaches that strengthen both livelihoods and social relationships.",
        ],
        lead: "HWW therefore integrates peacebuilding and social cohesion into appropriate programming, particularly through:",
        items: ["Youth engagement", "Community dialogue", "Inclusive participation", "Conflict-sensitive programming", "Community structures", "Livelihood opportunities", "Local capacity strengthening", "Social cohesion initiatives"],
      },
      {
        title: "Transitional Shelter and Community Resilience",
        intro: [
          "Safe and dignified shelter remains an essential component of humanitarian response.",
          "HWW supports transitional shelter interventions for vulnerable and displaced populations while connecting shelter support to broader community resilience and recovery approaches.",
        ],
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    tagline: "Building Futures",
    description:
      "Quality education, teacher training, school construction, and infrastructure development across Eastern Equatoria State, South Sudan.",
    image: "/images/education-school-building.jpg",

    regions: ["Eastern Equatoria"],
    highlights: [
      "Classrooms and infrastructure construction and rehabilitation in the greater equatoria and Jonglei states",
    ],
    approach:
      "We believe education is the foundation of lasting peace and development. Our education programs combine infrastructure investment with teacher capacity building and community ownership, ensuring schools remain operational long after project completion.",
    gallery: [
      "/images/education-school-building.jpg",
      "/images/livelihoods-community-group.jpg",
      "/images/team-field-staff.jpg",
    ],
  },
  {
    slug: "wash",
    title: "WASH & Environment",
    tagline: "Clean Water, Healthy Communities",
    description:
      "Clean water, sanitation facilities, and hygiene education. Multiple water points rehabilitated across crisis-affected communities in South Sudan and Somalia.",
    image: "/images/wash-water-distribution.jpg",

    regions: ["South Sudan", "Somalia"],
    highlights: [
      "Water point rehabilitation and construction in the greater equatoria and Jonglei states",
    ],
    approach:
      "Access to clean water and sanitation is a human right. Our WASH interventions follow a community-led model — training local water committees, promoting hygiene behavior change, and building infrastructure designed for long-term maintenance.",
    gallery: [
      "/images/wash-water-distribution.jpg",
      "/images/team-field-staff.jpg",
      "/images/livelihoods-community-group.jpg",
    ],
  },
  {
    slug: "protection",
    title: "Protection",
    tagline: "Safety, Dignity & Rights",
    description:
      "Comprehensive protection services including GBV prevention, child protection, inclusion of persons with disabilities, and community peace-building programs.",
    image: "/images/protection-wheelchairs.jpg",

    regions: ["Jonglei State", "Upper Nile State"],
    highlights: [
      "GBV prevention, child protection, and peace-building programs in the greater equatoria and Jonglei states",
    ],
    approach:
      "Protection is at the heart of everything we do. We create safe spaces, train community protection committees, and support communities so the most vulnerable — including women, children, and persons with disabilities — can live safely and with dignity.",
    gallery: [
      "/images/protection-wheelchairs.jpg",
      "/images/protection-sports-peace.jpg",
      "/images/protection-inclusive-sports.jpg",
    ],
  },
  {
    slug: "shelter",
    title: "Shelter",
    tagline: "Safe Homes for Displaced Families",
    description:
      "Emergency and transitional shelter construction for displaced and refugee families across Jonglei and Upper Nile states.",
    image: "/images/education-school-building.jpg",
    regions: ["Jonglei State", "Upper Nile State"],
    highlights: [
      "Emergency and transitional shelter construction in the greater equatoria and Jonglei states",
    ],
    approach:
      "A safe home is the foundation for rebuilding a life. Our shelter programs provide both immediate emergency protection and durable transitional solutions, built with community participation.",
    gallery: [
      "/images/education-school-building.jpg",
      "/images/team-field-staff.jpg",
      "/images/livelihoods-community-group.jpg",
    ],
  },
  {
    slug: "food-security",
    title: "Food Security",
    tagline: "Chasing Hunger from Communities",
    description:
      "Food security and agricultural livelihood programs supporting cooperative societies and smallholder farmers to achieve food self-sufficiency and market access.",
    image: "/images/food-security-cooperative.jpg",

    regions: ["Western Equatoria"],
    highlights: [
      "Agricultural cooperative support and seed distribution in the greater equatoria and Jonglei states",
    ],
    approach:
      "Food security is inseparable from dignity. We support cooperative societies like Gangara Sinai II to build local food systems that improve income, quality, and market access — reducing dependency and increasing community resilience.",
    gallery: [
      "/images/food-security-cooperative.jpg",
      "/images/livelihoods-community-group.jpg",
      "/images/wash-water-distribution.jpg",
    ],
  },
  {
    slug: "health",
    title: "Health & Nutrition",
    tagline: "Healthy Communities, Stronger Futures",
    description:
      "Community health outreach, nutrition screening, and integrated health services for crisis-affected populations across South Sudan and Somalia.",
    image: "/images/livelihoods-community-group.jpg",

    regions: ["Eastern Equatoria", "Jonglei State", "Jubaland"],
    highlights: [
      "Community health outreach and nutrition screening in the greater equatoria and Jonglei states",
    ],
    approach:
      "Health and nutrition are fundamental rights. We deploy trained community health workers to deliver preventive and curative services at the last mile, focusing on mothers, infants, and children under five who are most vulnerable to malnutrition and preventable diseases.",
    gallery: [
      "/images/livelihoods-community-group.jpg",
      "/images/wash-water-distribution.jpg",
      "/images/team-field-staff.jpg",
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
      "South Sudan is the heart of our operations. Across Eastern Equatoria, Western Equatoria, Central Equatoria, Jonglei State, Northern Bahr el Ghazal, and Lakes State, we deliver integrated programs that address the interconnected needs of displaced and host communities — from classrooms and clean water to emergency shelter and economic recovery.",
    image: "/images/education-school-building.jpg",
    stats: [],
    programs: ["Livelihoods", "Education", "WASH", "Shelter"],
  },
  {
    slug: "somalia",
    name: "Somalia",
    description:
      "Integrated humanitarian response addressing protection, nutrition, and community resilience in crisis-affected areas.",
    image: "/images/where-we-work-somalia.jpg",
    stats: [],
    programs: ["Protection", "Nutrition", "WASH"],
  },
  {
    slug: "sudan",
    name: "Sudan",
    description:
      "Emergency response and development programs supporting displaced populations and marginalized communities.",
    image: "/images/wash-water-distribution.jpg",
    stats: [],
    programs: ["Emergency Response", "Protection", "Education"],
  },
  {
    slug: "kenya",
    name: "Kenya",
    description:
      "Humanitarian and development support for refugee-hosting and marginalized communities, with a focus on education, livelihoods, and community resilience.",
    longDescription:
      "In Kenya, Humanity Worldwide works with refugee-hosting and marginalized communities to strengthen education access, livelihoods, and community resilience — building on partnerships that extend our East Africa presence beyond South Sudan, Somalia, and Sudan.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    stats: [],
    programs: ["Education", "Livelihoods", "Protection"],
  },
];

/** Featured emergency case studies (informational — no fundraising goals). */
export const campaigns: Campaign[] = [
  {
    slug: "jonglei-flood-response",
    title: "Emergency Response in Jonglei State",
    description:
      "Emergency response efforts reached 2,000 families in Jonglei State following devastating floods. Teams provided shelter, clean water, and essential supplies to families who lost homes and livelihoods.",
    image: "/images/emergency-boat-donation.jpg",
    familiesReached: 2000,
    location: "Jonglei State, South Sudan",
    country: "South Sudan",
    crisisType: "Floods",
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

/** Country-organized emergency response overview (Sudan, South Sudan, Somalia). */
export const emergencyCountries: EmergencyCountry[] = [
  {
    slug: "south-sudan",
    name: "South Sudan",
    description:
      "Rapid response across flood-prone and conflict-affected states — from Jonglei and Upper Nile to Equatoria — delivering shelter, WASH, and life-saving supplies when communities are cut off.",
    image: "/images/emergency-boat-donation.jpg",
    crises: [
      {
        id: "ss-jonglei-floods",
        title: "Flood response in Jonglei State",
        crisisType: "Floods",
        area: "Jonglei State",
        description:
          "Seasonal and flash flooding isolated communities and destroyed homes. Response teams distributed shelter materials, water purification supplies, and non-food items, and restored mobility where roads were underwater.",
        familiesReached: 2000,
        campaignSlug: "jonglei-flood-response",
      },
      {
        id: "ss-displacement",
        title: "Displacement & host-community support",
        crisisType: "Displacement",
        area: "Upper Nile & Jonglei",
        description:
          "Families displaced by flooding and localized conflict need transitional shelter, protection services, and access to clean water in host and return areas.",
      },
      {
        id: "ss-conflict",
        title: "Conflict-related emergency relief",
        crisisType: "Conflict",
        area: "Multiple states",
        description:
          "When violence flares, we prioritize protection-sensitive distributions, emergency shelter, and coordination with local authorities to reach hard-to-access populations.",
      },
    ],
  },
  {
    slug: "sudan",
    name: "Sudan",
    description:
      "Emergency response for communities uprooted by conflict and compounding shocks — supporting displaced populations with protection, basic services, and rapid relief.",
    image: "/images/wash-water-distribution.jpg",
    crises: [
      {
        id: "sd-conflict-displacement",
        title: "Conflict & mass displacement",
        crisisType: "Conflict",
        area: "Nationwide response corridors",
        description:
          "Ongoing conflict has forced large-scale displacement. Our emergency work focuses on protection, essential supplies, and support for displaced and host communities.",
      },
      {
        id: "sd-drought",
        title: "Drought & food insecurity",
        crisisType: "Drought",
        area: "Affected rural areas",
        description:
          "Prolonged dry spells deepen hunger and water scarcity. Emergency response includes water access support and coordination with nutrition and livelihoods partners.",
      },
      {
        id: "sd-floods",
        title: "Seasonal flood response",
        crisisType: "Floods",
        area: "Flood-prone states",
        description:
          "Heavy rains and river flooding destroy shelters and contaminate water sources. Teams mobilize shelter kits, hygiene supplies, and WASH interventions.",
      },
    ],
  },
  {
    slug: "somalia",
    name: "Somalia",
    description:
      "Integrated emergency action addressing drought, displacement, and conflict — strengthening community resilience while meeting urgent humanitarian needs.",
    image: "/images/where-we-work-somalia.jpg",
    crises: [
      {
        id: "so-drought",
        title: "Drought & water scarcity",
        crisisType: "Drought",
        area: "Jubaland & drought corridors",
        description:
          "Recurrent drought threatens livelihoods and health. Emergency WASH and nutrition-sensitive support help families cope when water points fail and pastures dry.",
      },
      {
        id: "so-displacement",
        title: "Displacement & urban influx",
        crisisType: "Displacement",
        area: "Displacement sites & host areas",
        description:
          "Families fleeing conflict and climate shocks need protection, shelter support, and access to basic services in overcrowded displacement settings.",
      },
      {
        id: "so-conflict",
        title: "Conflict-affected communities",
        crisisType: "Conflict",
        area: "Crisis-affected districts",
        description:
          "Insecurity restricts movement and access to services. We prioritize flexible, community-led emergency distributions and protection referrals.",
      },
    ],
  },
];

/** Countries available in the general emergency response donation flow. */
export const emergencyDonateCountries = [
  { slug: "south-sudan", name: "South Sudan" },
  { slug: "sudan", name: "Sudan" },
  { slug: "somalia", name: "Somalia" },
] as const;

export const stories: Story[] = [
  {
    slug: "kapoeta-classroom-hope",
    title: "Learning under a roof again",
    quote:
      "Before the classrooms, my daughter studied under a tree. When it rained, school stopped. Now she goes every day — and she wants to become a teacher.",
    name: "Nyandeng Lokujo",
    role: "Mother of three · Kapoeta South, South Sudan",
    image: "/images/education-school-building.jpg",
    program: "Education",
    programSlug: "education",
    body: [
      "In Kapoeta South, many children learned outdoors — with no walls, desks, or protection from rain and heat. Nyandeng’s eldest daughter often missed lessons during the rainy season.",
      "Through HWW’s education work in Kapoeta South, Kapoeta North, Torit, and Magwi, new classrooms were built and teachers received training in child-friendly teaching methods.",
      "Today her daughter attends regularly in a permanent classroom. Community education committees help keep the school open and accountable. ‘A safe classroom changed how our children see their future,’ Nyandeng says.",
    ],
  },
  {
    slug: "magwi-tailoring-livelihood",
    title: "Skills that feed a family",
    quote:
      "I joined the vocational training with nothing but hope. Six months later I had a sewing machine, customers, and enough income to pay school fees for my children.",
    name: "Amina Hassan",
    role: "Tailoring graduate · Magwi, South Sudan",
    image: "/images/livelihoods-community-group.jpg",
    program: "Livelihoods",
    programSlug: "livelihoods",
    body: [
      "Amina, a single mother in Magwi, had no steady income when she enrolled in HWW’s livelihoods vocational training. She chose tailoring because demand was high in her market.",
      "After the course, she received a starter kit and small-business mentoring. Within a year she was earning enough to cover food, school fees, and basic healthcare — and later trained two other women from her village.",
      "This is the kind of self-reliance HWW’s livelihoods work aims for: practical skills, seed support, and ongoing coaching so families can recover economically after crisis.",
    ],
  },
  {
    slug: "akobo-protection-safe-space",
    title: "A place where women can speak safely",
    quote:
      "The women’s safe space gave us somewhere to report harm without fear. We learned our rights — and that our community can protect each other.",
    name: "Rebecca Chol",
    role: "Community protection committee · Akobo, Jonglei",
    image: "/images/protection-peace-ayod.jpg",
    program: "Protection",
    programSlug: "protection",
    body: [
      "In flood- and conflict-affected areas of Jonglei, women and girls often had nowhere safe to seek help after gender-based violence or family separation.",
      "Through HWW’s protection programming, community protection committees and women’s safe spaces were established in areas including Akobo — combining GBV awareness, referral pathways, and child protection support.",
      "Rebecca now helps other women navigate those services. ‘Protection is not only a project,’ she says. ‘It is knowing you will be listened to and believed.’",
    ],
  },
  {
    slug: "torit-water-point-wash",
    title: "Clean water, fewer sick children",
    quote:
      "Our children used to fall sick from unclean water almost every month. After the water point was fixed, the clinic visits for diarrhea dropped — we can see the difference.",
    name: "Deng Kuol",
    role: "Water committee chair · Torit, South Sudan",
    image: "/images/wash-water-distribution.jpg",
    program: "WASH",
    programSlug: "wash",
    body: [
      "In Torit, a broken water point forced families to collect water from unsafe sources. Children under five were especially vulnerable to waterborne illness.",
      "HWW’s WASH work rehabilitated the point, trained hygiene promoters, and helped form a village water committee responsible for maintenance and fee collection.",
      "Deng now leads that committee. ‘Clean water is not charity for one day,’ he says. ‘It is a system our community owns — and our children are healthier because of it.’",
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "education-projects-kapoeta",
    title:
      "Completion of Education Projects in Kapoeta South, Kapoeta North, Torit and Magwi in South Sudan",
    excerpt:
      "A new education initiative brings hope to children in Kapoeta with comprehensive learning programs and teacher training.",
    author: "Gift Michael Bernado",
    date: "2024-01-15",
    image: "/images/education-school-building.jpg",
    category: "Education",
    body: [
      "Humanity Worldwide has successfully completed education projects across four counties in South Sudan — Kapoeta South, Kapoeta North, Torit, and Magwi.",
      "The initiative delivered 12 newly constructed classrooms, trained 28 teachers in modern pedagogy and child protection, and enrolled over 800 students in quality learning programs.",
      "Community education committees were established in each location to ensure long-term sustainability. Student retention rates reached 92%, exceeding regional benchmarks.",
      "This milestone represents a significant step toward HWW's vision of accessible, quality education for every crisis-affected child in South Sudan.",
    ],
  },
  {
    slug: "emergency-boat-donation",
    title: "Humanity Worldwide Donates Boats to Flood-Affected Communities",
    excerpt:
      "HWW provided dugout canoes and life jackets to communities cut off by flooding in Jonglei State, restoring critical mobility and access to services.",
    author: "Gift Michael Bernado",
    date: "2026-02-25",
    image: "/images/emergency-boat-donation.jpg",
    category: "Emergency",
    body: [
      "Devastating floods in Jonglei State isolated entire communities from markets, health facilities, and humanitarian assistance. Humanity Worldwide responded by donating dugout canoes equipped with paddles and life jackets to restore essential mobility.",
      "The boat donation ceremony, held in Akobo County, brought together community leaders, local authorities, and humanitarian staff.",
      "'These boats are lifelines,' said one community elder. 'Without them, we cannot reach hospitals, schools, or food markets during flood season.'",
      "HWW continues to scale emergency response interventions across Jonglei and Upper Nile states, working alongside local authorities and UN agencies to address the humanitarian impact of recurrent flooding.",
    ],
  },
  {
    slug: "wash-program-milestone",
    title: "WASH Program Reaches Communities Across 8 States",
    excerpt:
      "WASH program milestone: Communities now have access to clean water and improved sanitation across 8 states.",
    author: "Gift Michael Bernado",
    date: "2024-06-01",
    image: "/images/wash-water-distribution.jpg",
    category: "WASH",
    body: [
      "Humanity Worldwide's WASH program has reached a major milestone — communities across 8 states now have reliable access to clean water and improved sanitation.",
      "The program rehabilitated 24 water points, constructed 16 latrine blocks, and trained 120 community hygiene promoters in behavior change communication.",
      "Independent monitoring shows a reduction in waterborne diseases in program areas, with improvements in child health indicators.",
      "This achievement underscores HWW's commitment to evidence-based programming and community-led WASH solutions.",
    ],
  },
  {
    slug: "shelter-transitional-homes",
    title: "Transitional Shelters Completed for Displaced Families",
    excerpt:
      "Humanity Worldwide completes construction of transitional shelters for displaced families in South Sudan.",
    author: "Gift Michael Bernado",
    date: "2025-11-10",
    image: "/images/education-school-building.jpg",
    category: "Shelter",
    body: [
      "Humanity Worldwide has completed construction of transitional shelter units for displaced families in South Sudan.",
      "Each shelter is a semi-permanent structure featuring plastered walls, corrugated iron roofing, and a reinforced door — providing durability and weather resistance for families who had been living in temporary plastic sheeting.",
      "The project prioritised female-headed households and families with persons with disabilities, ensuring the most vulnerable received shelter first.",
      "'This is the first solid home I have had in five years,' said one beneficiary mother in Akobo. 'My children can sleep without fear of rain or wind.'",
    ],
  },
  {
    slug: "protection-sports-peace-ayod",
    title: "Promoting Peaceful Coexistence Through Sports in Ayod County",
    excerpt:
      "HWW launches a sports-for-peace tournament in Ayod County, bringing together youth from different communities to promote peaceful coexistence and social cohesion.",
    author: "Gift Michael Bernado",
    date: "2025-12-20",
    image: "/images/protection-peace-ayod.jpg",
    category: "Protection",
    body: [
      "Humanity Worldwide organized a sports-for-peace football tournament in Ayod County, Jonglei State, bringing together youth from host communities and displaced populations.",
      "The tournament, branded 'Peace Begin With Me', brought youth together in a spirit of unity across communities that have historically experienced inter-communal tensions.",
      "Alongside the football matches, HWW facilitated community dialogue sessions where youth leaders discussed peaceful coexistence, conflict resolution, and shared aspirations for their communities.",
      "Events like this are central to HWW's protection programming, which recognizes that lasting peace requires investment in social cohesion and community-level trust-building.",
    ],
  },
];

export const partners: Partner[] = [
  { name: "Local & State Authorities", abbr: "Local Authorities" },
  { name: "Community Organizations", abbr: "Community Orgs" },
  { name: "Civil Society Partners", abbr: "Civil Society" },
];

export const footerCta = {
  headline: "Join Us in Making a Difference",
  subheadline:
    "Partner with us, volunteer, or follow the work in the field. There are many ways to stand with communities across East Africa.",
};

export const teamMembers: TeamMember[] = [];

export const timeline: TimelineEvent[] = [];

export const resources: Resource[] = [];

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
    question: "How can I request a report?",
    answer:
      "Contact us through the form on our Contact page or email us directly. Tell us what information you need, and our team will follow up with what is available.",
  },
  {
    question: "Who can request program information?",
    answer:
      "Researchers, partners, donors, and community stakeholders are welcome to request reports and program data. We are committed to transparency and evidence-based programming.",
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

/** Field documentaries shown on /media (moved from the page so the CMS can manage them). */
export const videos: Video[] = [
  {
    slug: "bor-water-supply",
    featured: true,
    youtubeId: "wDCH52c4E3Y",
    category: "WASH",
    title: "Clean Water, Healthy Children — Bor's Big Change",
    location: "Bor, Jonglei State",
    description:
      "Follow the launch of the Bor Urban Water Supply System, providing safe, chlorinated pipeline water to over 96,000 residents and safeguarding children from deadly cholera outbreaks.",
    image: "/images/wash-water-distribution.jpg",
  },
  {
    slug: "wash-cholera",
    youtubeId: "7H3W9Yg4f08",
    category: "WASH",
    title: "Clean Water & A Chance to Survive Cholera in South Sudan",
    location: "Kapoeta & Torit",
    description:
      "Witness our teams distributing water treatment tablets and conducting hygiene training sessions to combat cholera epidemics in high-risk zones.",
    image: "/images/hero-emergency-composite.jpg",
  },
  {
    slug: "solidarites-response",
    youtubeId: "E1yWz4p1cE4",
    category: "Emergency",
    title: "Responding to Displacements and Severe Flooding",
    location: "Leer & Pibor",
    description:
      "Follow frontline emergency responders as they cross marshlands on canoes to distribute liferafts, clean water, and plastic sheeting to flooded communities.",
    image: "/images/emergency-boat-donation.jpg",
  },
  {
    slug: "nfi-delivery",
    category: "Protection",
    title: "Last-Mile Non-Food Items (NFI) Refugee Response [Coming Soon]",
    location: "Maban & Renk Border Crossing",
    description:
      "Dignity kits, solar lanterns, sleeping mats, and family shelter tools packaged for refugee families escaping cross-border displacements.",
    image: "/images/education-school-building.jpg",
  },
];

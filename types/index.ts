export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stats?: Stat[];
  regions?: string[];
  highlights?: string[];
  approach?: string;
  gallery?: string[];
}

export interface Region {
  slug: string;
  name: string;
  description: string;
  image: string;
  stats: Stat[];
  programs: string[];
  longDescription?: string;
}

export type CrisisType =
  | "Floods"
  | "Displacement"
  | "Drought"
  | "Conflict"
  | "Multi-hazard";

export interface EmergencyCrisis {
  id: string;
  title: string;
  crisisType: CrisisType;
  /** State, region, or area within the country */
  area: string;
  description: string;
  familiesReached?: number;
  /** Optional link to a featured emergency case page */
  campaignSlug?: string;
}

export interface EmergencyCountry {
  slug: string;
  name: string;
  description: string;
  image: string;
  crises: EmergencyCrisis[];
}

export interface Campaign {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** @deprecated Fundraising goals removed from emergency response pages */
  goal?: number;
  /** @deprecated Fundraising progress removed from emergency response pages */
  raised?: number;
  familiesReached?: number;
  location: string;
  country?: string;
  crisisType?: CrisisType;
  body?: string[];
  needs?: string[];
}

export interface Story {
  slug: string;
  title: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  program?: string;
  programSlug?: string;
  body?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category?: string;
  body?: string[];
}

export interface Partner {
  name: string;
  abbr?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  type: string;
  year?: string;
  pages?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  dropdownItems: NavLink[];
}

export type HeaderNavItem = NavLink | NavDropdown;

export function isNavDropdown(item: HeaderNavItem): item is NavDropdown {
  return "dropdownItems" in item;
}

export interface HeroSlide {
  eyebrow: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Navigation data for the Header component.
 * Extracted to allow for easier maintenance and potential CMS integration.
 */

export interface NavDropdownItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  desc: string;
}

export interface NavProduct {
  name: string;
  href: string;
  tag?: string;
  desc?: string;
}

export interface NavProductGroup {
  label: string;
  products: NavProduct[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export interface MegaCategory {
  label: string;
  href: string;
  products: NavProduct[];
  groups?: NavProductGroup[];
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdownItem[];
  megaMenu?: boolean;
}

// SVG Icons for dropdown items
const Icons = {
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  salesTeam: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  dealers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  testimonials: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  media: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  awards: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  catalogue: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  careers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  shield: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  trending: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  star: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  tag: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  veneer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 4c4 4 8 12 16 16" />
    </svg>
  ),
  door: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2h12v20H6z" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
};

// Dropdown data
export const contactDropdown: NavDropdownItem[] = [
  { label: "Find Us", href: "/contact", icon: Icons.location, desc: "Locate our office" },
  { label: "Sales Team", href: "/contact/sales-team", icon: Icons.salesTeam, desc: "Connect with our experts" },
  { label: "Dealers", href: "/dealers", icon: Icons.dealers, desc: "Become a dealer partner" },
];

export const moreDropdown: NavDropdownItem[] = [
  { label: "Calendar", href: "/calendar", icon: Icons.calendar, desc: "Annual calendar collection" },
  { label: "Testimonials", href: "/testimonials", icon: Icons.testimonials, desc: "What our clients say" },
  { label: "Media", href: "/videos", icon: Icons.media, desc: "Press and media highlights" },
  { label: "Awards", href: "/awards-certifications", icon: Icons.awards, desc: "Recognition & credentials" },
  { label: "Catalogue", href: "/catalogue", icon: Icons.catalogue, desc: "Download brochures & assets" },
  { label: "Careers", href: "/careers", icon: Icons.careers, desc: "Join our growing team" },
];

// Product data
export const plywoodWaterproof: NavProduct[] = [
  { name: "Sharon Platinum Ply", href: "/plywood/sharon-platinum-ply", tag: "Premium" },
  { name: "Sharon Gold", href: "/plywood/sharon-gold-marine-plywood", tag: "BWP" },
  { name: "Sharon Prima Armor", href: "/plywood/sharon-prima-710", tag: "" },
  { name: "Sovereign 710", href: "/plywood/sovereign-710", tag: "" },
  { name: "Kumki OEM BWP Ply", href: "/plywood/kumki-oem-bwp-ply", tag: "OEM" },
];

export const plywoodWaterResistant: NavProduct[] = [
  { name: "Sovereign MR", href: "/plywood/sovereign-mr", tag: "MR" },
];

export const veneerProducts: NavProduct[] = [
  { name: "Sharon Exoti Natura", href: "/veneer/exotic-natura", tag: "Natural", desc: "Natural Decorative Veneer" },
  { name: "Sharon Exoti Aura", href: "/veneer/sharon-exoti-aura", tag: "Reconstituted", desc: "Reconstituted Decorative Veneer" },
];

export const doorProducts: NavProduct[] = [
  { name: "Sharon Gold Door", href: "/door/sharon-gold-door", tag: "Premium" },
  { name: "Sovereign Door", href: "/door/sovereign-door", tag: "Affordable" },
];

// Mega menu categories
export const megaCategories: MegaCategory[] = [
  {
    label: "VENEER",
    href: "/veneer",
    products: veneerProducts,
    groups: [
      {
        label: "Natural",
        products: [veneerProducts[0]],
        icon: Icons.shield,
        color: "#0ea5e9",
        bgColor: "#e0f2fe",
      },
      {
        label: "Reconstituted",
        products: [veneerProducts[1]],
        icon: Icons.trending,
        color: "#6366f1",
        bgColor: "#ede9fe",
      },
    ],
    icon: Icons.veneer,
  },
  {
    label: "DOOR",
    href: "/door",
    products: doorProducts,
    groups: [
      {
        label: "Premium",
        products: [doorProducts[0]],
        icon: Icons.star,
        color: "#f59e0b",
        bgColor: "#fef3c7",
      },
      {
        label: "Affordable",
        products: [doorProducts[1]],
        icon: Icons.tag,
        color: "#0ea5e9",
        bgColor: "#e0f2fe",
      },
    ],
    icon: Icons.door,
  },
];

// Main navigation items
export const navItems: NavItem[] = [
  { label: "ABOUT US", href: "/our-history" },
  { label: "OUR PRODUCTS", href: "/plywood", megaMenu: true },
  { label: "CSR", href: "/corporate-social-responsibility" },
  { label: "BLOGS", href: "/blog" },
  { label: "CONTACT US", dropdown: contactDropdown },
  { label: "MORE", dropdown: moreDropdown },
];

export { Icons };

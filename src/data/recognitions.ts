// Workplace recognitions, newest first. Badge artwork supplied by the client
// (Website Creatives → "21. Careers - Icon"); titles are as printed on each badge.

export interface Recognition {
  img: string;
  title: string;
  /** Short label under the title: certification period or list year. */
  period: string;
  year: number;
}

/** Great Place to Work® India certifications (annual, Feb–Feb). */
export const GPTW_CERTIFICATIONS: Recognition[] = [
  { img: "/images/2026/careers/gptw-2026.webp", title: "Great Place to Work® Certified", period: "Feb 2026 – Feb 2027", year: 2026 },
  { img: "/images/2026/careers/gptw-2025.webp", title: "Great Place to Work® Certified", period: "Feb 2025 – Feb 2026", year: 2025 },
  { img: "/images/2026/careers/gptw-2024.webp", title: "Great Place to Work® Certified", period: "Feb 2024 – Feb 2025", year: 2024 },
];

/** Great Place to Work® India "Best Workplaces™" list rankings. */
export const BEST_WORKPLACES: Recognition[] = [
  { img: "/images/2026/careers/bwm-2026.webp", title: "Best Workplaces™ in Manufacturing", period: "India 2026", year: 2026 },
  { img: "/images/2026/careers/bw-cbm-2026.webp", title: "Best Workplaces™ in Cement & Building Materials", period: "India 2026", year: 2026 },
  { img: "/images/2026/careers/bwma-2025.webp", title: "Best Workplaces™ in Manufacturing", period: "India 2025", year: 2025 },
  { img: "/images/2026/careers/bwm-2025.webp", title: "Best Workplaces™ for Millennials", period: "India 2025", year: 2025 },
  { img: "/images/2026/careers/bw-cd-2024.webp", title: "Best Workplaces™ in Consumer Durables", period: "India 2024", year: 2024 },
];

/** Everything, newest first (Careers page strip). */
export const ALL_RECOGNITIONS: Recognition[] = [...GPTW_CERTIFICATIONS, ...BEST_WORKPLACES]
  .sort((a, b) => b.year - a.year);

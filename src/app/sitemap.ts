import { MetadataRoute } from "next";
import { getAllPosts } from "@/data/blogPosts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://sharonply.com";

const url = (path: string, priority: number, changefreq: MetadataRoute.Sitemap[0]["changeFrequency"], lastmod?: string): MetadataRoute.Sitemap[0] => ({
  url: `${BASE}${path}`,
  lastModified: lastmod ? new Date(lastmod) : new Date(),
  changeFrequency: changefreq,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage
    url("/",                                              1.0, "daily"),

    // Products — top-level
    url("/plywood",                                       0.9, "weekly"),
    url("/teak",                                          0.9, "weekly"),
    url("/door",                                          0.9, "weekly"),
    url("/veneer",                                        0.9, "weekly"),

    // Plywood sub-pages
    url("/plywood/sharon-gold-marine-plywood",            0.85, "monthly"),
    url("/plywood/sharon-platinum-ply",                   0.85, "monthly"),
    url("/plywood/sharon-prima-710",                      0.85, "monthly"),
    url("/plywood/sovereign-710",                         0.85, "monthly"),
    url("/plywood/sovereign-mr",                          0.85, "monthly"),
    url("/plywood/kumki-oem-bwp-ply",                     0.85, "monthly"),

    // Door sub-pages
    url("/door/flush-doors",                              0.8, "monthly"),
url("/door/sovereign-door",                           0.8, "monthly"),

    // Veneer sub-pages
    url("/veneer/exotic-natura",                          0.85, "monthly"),
    url("/veneer/sharon-exoti-aura",                      0.85, "monthly"),
    url("/veneer/natural-wood-veneer",                    0.8, "monthly"),
    url("/veneer/pre-polished-veneer",                    0.8, "monthly"),

    // Veneer species pages — Natura
    url("/veneer/exotic-natura/walnut",                   0.75, "monthly"),
    url("/veneer/exotic-natura/oak",                      0.75, "monthly"),
    url("/veneer/exotic-natura/teak",                     0.75, "monthly"),
    url("/veneer/exotic-natura/maple",                    0.75, "monthly"),
    url("/veneer/exotic-natura/cherry",                   0.75, "monthly"),
    url("/veneer/exotic-natura/ash",                      0.75, "monthly"),
    url("/veneer/exotic-natura/mahogany",                 0.75, "monthly"),

    // Veneer species pages — Aura
    url("/veneer/sharon-exoti-aura/walnut",               0.75, "monthly"),
    url("/veneer/sharon-exoti-aura/oak",                  0.75, "monthly"),
    url("/veneer/sharon-exoti-aura/teak",                 0.75, "monthly"),
    url("/veneer/sharon-exoti-aura/maple",                0.75, "monthly"),
    url("/veneer/sharon-exoti-aura/wenge",                0.75, "monthly"),
    url("/veneer/sharon-exoti-aura/ebony",                0.75, "monthly"),

    // Company / About
    url("/our-history",                                   0.7, "monthly"),
    url("/our-factory",                                   0.7, "monthly"),
    url("/awards-certifications",                         0.7, "monthly"),

    // CSR
    url("/corporate-social-responsibility",               0.6, "monthly"),
    url("/corporate-social-responsibility/cleanup",       0.5, "monthly"),
    url("/corporate-social-responsibility/covid-relief",  0.5, "monthly"),
    url("/corporate-social-responsibility/flood-relief",  0.5, "monthly"),
    url("/corporate-social-responsibility/free-helmet-distribution", 0.5, "monthly"),
    url("/corporate-social-responsibility/growthegreen",  0.5, "monthly"),
    url("/corporate-social-responsibility/health-camps",  0.5, "monthly"),
    url("/corporate-social-responsibility/iamstrongest",  0.5, "monthly"),
    url("/corporate-social-responsibility/isaynotoplastic", 0.5, "monthly"),
    url("/corporate-social-responsibility/paper-bags",    0.5, "monthly"),
    url("/corporate-social-responsibility/quenchthethirst", 0.5, "monthly"),
    url("/corporate-social-responsibility/umbrella",      0.5, "monthly"),
    url("/corporate-social-responsibility/world-environment-day", 0.5, "monthly"),

    // Sales / Contact
    url("/dealers",                                       0.7, "monthly"),
    url("/find-us",                                       0.7, "monthly"),
    url("/contact",                                       0.7, "monthly"),

    // Content
    url("/blog",                                          0.8, "daily"),
    url("/catalogue",                                     0.7, "monthly"),
    url("/technology",                                     0.7, "monthly"),
    url("/virasafe",                                       0.75, "monthly"),
    url("/sharon-firesave",                                0.75, "monthly"),
    url("/e-zero-emission",                                0.75, "monthly"),
    url("/sharonsecureapp",                                0.75, "monthly"),
    url("/terms-and-conditions",                           0.4, "yearly"),
    url("/testimonials",                                  0.6, "monthly"),
    url("/videos",                                        0.7, "monthly"),
    url("/calendar",                                      0.5, "monthly"),
    url("/careers",                                       0.6, "monthly"),
  ];

  // ── Blog posts — dynamic ───────────────────────────────────────────────────
  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/${post.year}/${post.month}/${post.slug}`,
    lastModified: new Date(`${post.year}-${post.month}-01`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...blogRoutes];
}

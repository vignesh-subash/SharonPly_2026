import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sharonply.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login", "/admin/dealers", "/admin/sales-team"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

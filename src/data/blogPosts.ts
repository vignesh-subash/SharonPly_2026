import { allBlogPosts } from "./allBlogPosts";

export interface BlogPost {
  slug: string;
  year: string;
  month: string;
  title: string;
  image: string;
  contentHTML: string;
  author: string;
  category: string;
  tags: string;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function getExcerpt(html: string, chars = 150): string {
  const text = stripHtml(html);
  if (text.length <= chars) return text;
  return text.slice(0, chars).replace(/\s+\S*$/, "") + "...";
}

export function getFirst20Words(html: string): string {
  const text = stripHtml(html);
  return text.split(/\s+/).slice(0, 20).join(" ") + "...";
}

export function getReadTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

export function getPostUrl(post: BlogPost): string {
  return `/${post.year}/${post.month}/${post.slug}`;
}

export function getMonthName(month: string): string {
  const months: Record<string, string> = {
    "01": "January", "02": "February", "03": "March", "04": "April",
    "05": "May", "06": "June", "07": "July", "08": "August",
    "09": "September", "10": "October", "11": "November", "12": "December",
  };
  return months[month] || month;
}

export function rewriteInternalLinks(html: string, allPosts: BlogPost[]): string {
  if (!html) return "";
  let result = html;
  // Convert h1 inside content to h2
  result = result.replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>");

  // Rewrite sharonply.com blog links to internal routes
  for (const post of allPosts) {
    const regex = new RegExp(`https?://sharonply\\.com/${post.year}/${post.month}/${post.slug}/?`, "gi");
    result = result.replace(regex, getPostUrl(post));
  }
  return result;
}

// All 111 posts sorted newest-first
export const blogPosts: BlogPost[] = [...allBlogPosts].sort((a, b) => {
  const da = `${a.year}-${a.month}`;
  const db = `${b.year}-${b.month}`;
  return db.localeCompare(da);
}) as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostByRoute(year: string, month: string, slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.year === year && p.month === month && p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit);
}

function isPlywoodPost(post: BlogPost): boolean {
  const tag = (post.tags || "").toLowerCase();
  const category = post.category.toLowerCase();
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();

  return (
    tag.includes("plywood") ||
    category.includes("plywood") ||
    category === "buying guide" ||
    slug.includes("plywood") ||
    title.includes("plywood")
  );
}

function isDoorPost(post: BlogPost): boolean {
  const tag = (post.tags || "").toLowerCase();
  const category = post.category.toLowerCase();
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();

  return (
    tag.includes("door") ||
    category.includes("door") ||
    slug.includes("door") ||
    title.includes("door")
  );
}

export function getPostsByTopic(topic: "plywood" | "door", limit = 3): BlogPost[] {
  const matcher = topic === "plywood" ? isPlywoodPost : isDoorPost;
  return blogPosts.filter(matcher).slice(0, limit);
}

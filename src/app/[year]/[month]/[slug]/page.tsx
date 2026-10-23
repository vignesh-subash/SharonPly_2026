import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostByRoute, getAllPosts, getRelatedPosts, getExcerpt } from "@/data/blogPosts";
import BlogPostTemplate from "@/components/blog/BlogPostTemplate";

interface PageProps {
  params: Promise<{ year: string; month: string; slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sharonply.com";

export const dynamicParams = true;

export async function generateStaticParams() {
  return []; // Rendered on first visit (ISR)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = getPostByRoute(year, month, slug);
  if (!post) return { title: "Post Not Found | SharonPly" };
  const canonical = `${SITE_URL}/${year}/${month}/${slug}`;
  const description = getExcerpt(post.contentHTML, 155);
  return {
    title: `${post.title} | Sharon Ply`,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title, description, type: "article", url: canonical,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      siteName: "Sharon Ply",
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { year, month, slug } = await params;
  const post = getPostByRoute(year, month, slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const nextPost = idx > 0 ? allPosts[idx - 1] : null;
  const related = getRelatedPosts(post, 3);
  const canonical = `${SITE_URL}/${year}/${month}/${slug}`;
  const description = getExcerpt(post.contentHTML, 155);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: { "@type": "Person", name: post.author },
    datePublished: `${post.year}-${post.month}-01`,
    image: post.image,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    description,
    publisher: {
      "@type": "Organization",
      name: "Sharon Ply",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostTemplate
        post={post}
        related={related}
        prevPost={prevPost}
        nextPost={nextPost}
        allPosts={allPosts}
      />
    </>
  );
}

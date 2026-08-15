import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleReader } from "@/components/blog/article-reader";
import { IssueReader } from "@/components/blog/issue-reader";
import { getRadarIssue, radarIssues } from "@/lib/radar-issues";
import { loadPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const issue = getRadarIssue(slug);
  if (issue) {
    return {
      title: `Radar ${issue.weekLabel} · ${issue.title}`,
      description: issue.excerpt,
      openGraph: {
        title: `Radar ${issue.weekLabel} · ${issue.title}`,
        description: issue.excerpt,
        images: [issue.cover],
        type: "article",
      },
    };
  }

  const loaded = await loadPostBySlug(slug);
  if (!loaded) return { title: "Artículo no encontrado" };
  return {
    title: loaded.post.title,
    description: loaded.post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadPostBySlug(slug);
  if (!loaded) notFound();
  if (loaded.kind === "radar") return <IssueReader issue={loaded.issue} />;
  return <ArticleReader post={loaded.post} />;
}

export function generateStaticParams() {
  return radarIssues.map((issue) => ({ slug: issue.slug }));
}

import { createClient } from "@supabase/supabase-js";
import { radarIssues, radarSlugs, type RadarIssue } from "@/lib/radar-issues";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: { id: string; name: string };
  category: { id: string; name: string; slug: string };
  tags: string[];
  readingTime: number;
  published: boolean;
  publishedAt: string;
};

export type RemotePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  author_id: string | null;
  author_name: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  tags: unknown;
};

function blogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function tagNames(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .filter((tag) => tag && (typeof tag === "string" || (tag as { name?: string }).name))
    .map((tag) => (typeof tag === "string" ? tag : (tag as { name: string }).name))
    .filter(Boolean);
}

export function mapRemotePost(post: RemotePost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    featuredImage: post.featured_image ?? undefined,
    author: { id: post.author_id || "", name: post.author_name || "Phil Taboada" },
    category: {
      id: post.category_id || "",
      name: post.category_name || "Sin categoría",
      slug: post.category_slug || "",
    },
    tags: tagNames(post.tags),
    readingTime: 6,
    published: Boolean(post.published),
    publishedAt: post.published_at || post.created_at || new Date().toISOString(),
  };
}

export function issueToCard(issue: RadarIssue): BlogPost {
  return {
    id: `radar-${issue.number}`,
    title: `Radar ${issue.weekLabel.split("·")[0]?.trim() ?? `N°${issue.number}`}: ${issue.title}`,
    slug: issue.slug,
    excerpt: issue.excerpt,
    content: "",
    featuredImage: issue.cover,
    author: { id: "phil", name: issue.author },
    category: { id: "radar", name: issue.category.name, slug: issue.category.slug },
    tags: issue.tags,
    readingTime: issue.readingTime,
    published: true,
    publishedAt: issue.publishedAt,
  };
}

async function fetchRemotePosts(includeUnpublished = false): Promise<RemotePost[]> {
  const supabase = blogClient();
  if (!supabase) return [];

  const { data, error } = await supabase.rpc("get_posts_with_filters", {
    limit_param: 100,
    offset_param: 0,
    include_unpublished_param: includeUnpublished,
  });

  if (error) {
    console.error("Supabase blog:", error.message);
    return [];
  }

  return (data || []) as RemotePost[];
}

export async function loadBlogListing() {
  const remote = await fetchRemotePosts();
  const posts = remote
    .filter((post) => post.published && !radarSlugs.has(post.slug))
    .map(mapRemotePost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return { issues: radarIssues, posts };
}

export async function loadPostBySlug(slug: string) {
  const issue = radarIssues.find((item) => item.slug === slug);
  if (issue) return { kind: "radar" as const, issue, post: issueToCard(issue) };

  const remote = await fetchRemotePosts(true);
  const raw = remote.find((item) => item.slug === slug);
  if (!raw || !raw.published) return null;
  return { kind: "article" as const, post: mapRemotePost(raw) };
}

export function contentToHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { contentToHtml } from '@/lib/blog';
import { BlogChrome } from './blog-chrome';
import { NewsletterStrip } from './newsletter-strip';
import { PostCard } from './post-card';
import { PostFeedback } from './post-feedback';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function ArticleReader({
  post,
  relatedPosts = [],
}: {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}) {
  const html = contentToHtml(post.content || '');

  return (
    <BlogChrome>
      <article>
        <header className="mx-auto max-w-[820px] px-5 pb-8 pt-16 sm:px-8">
          <p className="rb-mono text-[10px] text-white/45">
            {post.category.name} · {formatDate(post.publishedAt)} · {post.readingTime} min
          </p>
          <h1 className="rb-display mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">{post.title}</h1>
          {post.excerpt && <p className="rb-prose mt-6 text-xl text-white/70">{post.excerpt}</p>}
          <p className="rb-mono mt-6 text-[11px] text-white/40">{post.author.name}</p>
        </header>

        {post.featuredImage && (
          <figure className="rb-scene mx-auto aspect-[16/9] max-w-[1240px]">
            {post.featuredImage.startsWith("/") ? (
              <Image src={post.featuredImage} alt="" fill className="object-cover" sizes="100vw" priority />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.featuredImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
          </figure>
        )}

        <div
          className="rb-prose mx-auto max-w-[68ch] px-5 py-14 text-white/86 sm:px-8 [&_a]:underline [&_h2]:mt-12 [&_h2]:font-[var(--rb-display)] [&_h2]:text-4xl [&_h2]:text-white [&_h3]:mt-8 [&_h3]:text-2xl [&_img]:my-8 [&_img]:w-full [&_li]:my-1 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
          <p className="rb-kicker">También</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {relatedPosts.slice(0, 3).map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}

      <PostFeedback slug={post.slug} title={post.title} askNewsletter={false} />

      <div className="px-5 py-8 text-center">
        <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.18em] no-underline">
          ← Volver al blog
        </Link>
      </div>
      <NewsletterStrip />
    </BlogChrome>
  );
}

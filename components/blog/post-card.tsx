import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={featured ? 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end' : ''}>
      <Link href={`/blog/${post.slug}`} className="group block no-underline">
        <div className={`rb-scene relative overflow-hidden bg-[#111] ${featured ? 'aspect-[4/5] sm:aspect-[16/10]' : 'aspect-[4/3]'}`}>
          {post.featuredImage ? (
            post.featuredImage.startsWith('/') ? (
            <Image
              src={post.featuredImage}
              alt=""
              fill
              sizes={featured ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featuredImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center bg-[#111] text-6xl text-white/15">
              {post.title.charAt(0)}
            </div>
          )}
        </div>
      </Link>
      <div className={featured ? 'pb-2' : 'mt-4'}>
        <p className="rb-mono text-[10px] text-white/45">
          {post.category.name} · {formatDate(post.publishedAt)} · {post.readingTime} min
        </p>
        <h3 className={`mt-2 font-[var(--rb-sans)] font-extrabold leading-[1.08] tracking-[-0.03em] ${featured ? 'text-3xl sm:text-5xl' : 'text-2xl'}`}>
          <Link href={`/blog/${post.slug}`} className="text-[var(--rb-white)] no-underline hover:text-[var(--rb-teal)]">
            {post.title}
          </Link>
        </h3>
        <p className="rb-prose mt-3 text-[16px] text-white/70">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--rb-teal)] no-underline"
        >
          Leer
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

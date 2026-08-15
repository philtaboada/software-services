'use client';

import Image from 'next/image';
import Link from 'next/link';
import { radarIssues } from '@/lib/radar-issues';

export function HomeRadarSection() {
  const issue = radarIssues[0];
  if (!issue) return null;

  return (
    <section className="relative border-y border-white/10 bg-[#050505] py-20">
      <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#5AD2D0]">Radar</p>
        <h2 className="mt-4 font-bold text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.04em] text-white">
          Las revistas
        </h2>
        <div className="mt-10 flex justify-center">
          <Link
            href={`/blog/${issue.slug}`}
            className="group relative block h-[420px] w-[min(78vw,300px)] overflow-hidden rounded-[2rem] no-underline shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
          >
            <Image
              src={issue.cover}
              alt={`Tapa de Radar ${issue.weekLabel}`}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute left-5 top-5">
              <p className="text-2xl font-extrabold text-white">Radar</p>
              <p className="text-sm text-white/70">{issue.weekLabel}</p>
            </div>
            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#f4e27a] px-3 py-1.5 text-[12px] font-bold text-black">
              Leer
              <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] text-[#f4e27a]">→</span>
            </span>
          </Link>
        </div>
        <Link
          href="/blog"
          className="mt-8 inline-flex text-[12px] font-bold uppercase tracking-[0.16em] text-white/55 no-underline hover:text-white"
        >
          Ver revistas
        </Link>
      </div>
    </section>
  );
}

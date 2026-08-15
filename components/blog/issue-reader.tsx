"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import type { RadarIssue } from '@/lib/radar-issues';
import { BlogChrome } from './blog-chrome';
import { useIssueMotion } from './use-issue-motion';

function Why({ children }: { children: string }) {
  return (
    <div className="rb-why">
      <b>Why it matters</b>
      {children}
    </div>
  );
}

function Mark({ src, ink }: { src?: string; ink?: boolean }) {
  if (!src) return null;
  return (
    <span className={ink ? 'rb-chip rb-chip--ink' : 'rb-chip'} data-chip aria-hidden>
      <img src={src} alt="" />
    </span>
  );
}

export function IssueReader({ issue }: { issue: RadarIssue }) {
  const rootRef = useRef<HTMLElement>(null);
  useIssueMotion(rootRef);
  const maxScore = Math.max(...issue.ranking.rows.map((row) => Number(row.score)));

  return (
    <BlogChrome>
      <article ref={rootRef}>
        <section className="relative min-h-[88vh] overflow-hidden">
          <div className="absolute inset-0" data-hero-cover>
            <Image
              src={issue.cover}
              alt={`Tapa de Radar ${issue.weekLabel}`}
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#070604] via-[#070604]/55 to-black/20" />
          <div className="relative mx-auto flex min-h-[88vh] max-w-[1240px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8">
            <p className="rb-mast text-[13px] text-[var(--rb-teal)]" data-hero>
              Radar
            </p>
            <p className="rb-mono mt-3 text-[11px] text-white/60" data-hero>
              {issue.weekLabel} · {issue.readingTime} min
            </p>
            <h1 className="rb-display mt-4 max-w-[14ch] text-[clamp(3.4rem,9vw,7.5rem)]" data-hero>
              {issue.carta.title} <em className="rb-em text-[var(--rb-teal)]">{issue.carta.titleEm}</em>
            </h1>
            <p className="mt-5 max-w-[28ch] font-[var(--rb-italic)] text-2xl italic text-white/78 sm:text-3xl" data-hero>
              {issue.dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-hero>
              <a href="#carta" className="rb-btn">
                Empezar a leer
              </a>
              <a href={issue.pdf} className="rb-btn-ghost">
                PDF
              </a>
            </div>
          </div>
        </section>

        <nav className="border-b-4 border-[var(--rb-teal)] px-5 py-8 sm:px-8">
          <div className="mx-auto max-w-[820px]">
            <p className="rb-kicker" data-reveal>
              En este número
            </p>
            <ol className="mt-5 space-y-3" data-stagger>
              {issue.toc.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <a href={`#${item.id}`} className="text-xl text-white no-underline hover:text-[var(--rb-teal)]">
                    {item.label}
                  </a>
                  <span className="rb-mono text-[11px] text-white/35">{item.folio}</span>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <section id="carta" className="rb-paper rb-grain">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <figure className="rb-scene aspect-[4/5] lg:sticky lg:top-24 lg:self-start">
              <Image src={issue.carta.image} alt={issue.carta.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              <figcaption className="rb-mono absolute bottom-4 left-4 right-4 text-[10px] text-white/80">
                {issue.carta.caption}
              </figcaption>
            </figure>
            <div>
              <p className="rb-kicker">{issue.carta.kicker}</p>
              <h2 className="rb-display mt-4 text-[clamp(2.8rem,6vw,5.5rem)]">
                {issue.carta.title} <em className="rb-em">{issue.carta.titleEm}</em>
              </h2>
              <div className="rb-prose mt-8 text-[var(--rb-ink)]">
                {issue.carta.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p className="rb-em rb-sign mt-10 text-6xl text-[var(--rb-ink)]" data-write-sign>
                {issue.carta.sign.split("").map((letter, index) => (
                  <span key={`${letter}-${index}`} className="rb-sign-letter">
                    {letter}
                  </span>
                ))}
              </p>
              <p className="rb-mono mt-2 text-[11px] text-[var(--rb-pap-45)]">{issue.carta.meta}</p>
            </div>
          </div>
        </section>

        <section id="senal" className="border-t border-white/10">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="rb-kicker" data-reveal>
              {issue.senal.kicker}
            </p>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.7fr]">
              <div className="space-y-14">
                {issue.senal.notes.map((note) => (
                  <article key={note.title} data-reveal>
                    <p className="flex items-center gap-3">
                      <Mark src={note.mark} />
                      <span className="rb-mono text-[10px] text-white/40">{note.kicker}</span>
                    </p>
                    <h2 className="rb-display mt-2 text-[clamp(2.2rem,5vw,4rem)]">
                      {note.title} <em className="rb-em text-[var(--rb-teal)]">{note.titleEm}</em>
                    </h2>
                    <p className="rb-prose mt-5 text-white/82">{note.body}</p>
                    <Why>{note.why}</Why>
                  </article>
                ))}
              </div>
              <figure className="rb-scene aspect-[3/4] lg:sticky lg:top-24 lg:self-start" data-clip>
                <Image src={issue.senal.image} alt={issue.senal.imageAlt} fill data-parallax className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </figure>
            </div>
          </div>
        </section>

        <section id="tema" className="border-t border-white/10">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="flex items-center gap-3" data-reveal>
              <Mark src={issue.tema.mark} />
              <span className="rb-kicker">{issue.tema.kicker}</span>
            </p>
            <h2 className="rb-display mt-4 text-[clamp(3rem,7vw,6.4rem)]" data-reveal>
              {issue.tema.title} <em className="rb-em text-[var(--rb-teal)]">{issue.tema.titleEm}</em>
            </h2>
            <p className="mt-4 font-[var(--rb-italic)] text-2xl italic text-white/75" data-reveal>
              {issue.tema.dek}
            </p>
            <figure className="rb-scene mt-10 aspect-[16/9]" data-clip>
              <Image src={issue.tema.image} alt={issue.tema.imageAlt} fill data-parallax className="object-cover" sizes="100vw" />
            </figure>
            <p className="rb-display mt-10 max-w-[20ch] text-4xl sm:text-5xl" data-reveal>
              {issue.tema.lead.replace('Yo doy el ok.', '')}
              <b className="font-[var(--rb-italic)] italic"> Yo doy el ok.</b>
            </p>
            <div className="rb-prose mt-8 text-white/84" data-stagger>
              {issue.tema.paragraphs.map((p) => (
                <p key={p.slice(0, 28)}>
                  {p}{' '}
                  {p.includes('11 de agosto') && (
                    <a href="https://x.ai/bot" rel="noreferrer">
                      x.ai/bot
                    </a>
                  )}
                </p>
              ))}
            </div>

            <blockquote className="rb-paper mt-16 px-6 py-12 sm:px-12" data-reveal>
              <p className="rb-display text-[clamp(2.4rem,5vw,4.4rem)] text-[var(--rb-ink)]">
                “{issue.tema.quote} <em className="rb-em">{issue.tema.quoteEm}</em>”
              </p>
              <p className="rb-mono mt-6 text-[11px] text-[var(--rb-pap-45)]">Phil · sobre Grok Bot</p>
            </blockquote>

            <h3 className="rb-display mt-20 text-4xl sm:text-6xl" data-reveal>
              Cómo lo uso
            </h3>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3" data-stagger>
              {issue.tema.cases.map((item) => (
                <article key={item.num} className="border-t border-white/15 pt-5">
                  <p className="rb-display text-5xl text-[var(--rb-teal)]">{item.num}</p>
                  <p className="rb-mono mt-2 text-[10px] text-white/40">{item.who}</p>
                  <h4 className="mt-2 font-[var(--rb-sans)] text-xl font-bold">{item.ask}</h4>
                  <p className="rb-prose mt-3 text-[16px] text-white/75">{item.text}</p>
                </article>
              ))}
            </div>

            <figure className="rb-scene mt-12 aspect-[16/8]" data-clip>
              <Image src={issue.tema.oficioImage} alt={issue.tema.oficioAlt} fill data-parallax className="object-cover" sizes="100vw" />
            </figure>

            <div className="mt-16 max-w-[820px]" data-reveal>
              <p className="rb-kicker">Grok Bot · cierre del tema</p>
              <h3 className="rb-display mt-4 text-[clamp(2.2rem,5vw,4rem)]">
                {issue.tema.closeTitle} <em className="rb-em">{issue.tema.closeTitleEm}</em>
              </h3>
              <div className="rb-prose mt-6 text-white/84">
                {issue.tema.closeParagraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p className="rb-em mt-8 text-4xl">{issue.tema.closeSign}</p>
            </div>
          </div>
        </section>

        <section id="mas" className="rb-paper rb-grain">
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
            <p className="rb-kicker" data-reveal>
              {issue.mas.kicker}
            </p>
            <h2 className="rb-display mt-4 text-5xl sm:text-7xl" data-reveal>
              {issue.mas.title}
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-3" data-stagger>
              {issue.mas.items.map((item) => (
                <article key={item.who} className="border-t-2 border-[var(--rb-ink)] pt-5">
                  <p className="flex items-center gap-2.5">
                    <Mark src={item.mark} ink />
                    <span className="rb-mono text-[10px] text-[var(--rb-pap-45)]">{item.who}</span>
                  </p>
                  <h3 className="mt-3 font-[var(--rb-sans)] text-2xl font-extrabold leading-[1.1]">{item.title}</h3>
                  <p className="rb-prose mt-4 text-[16px] text-[var(--rb-pap-70)]">{item.body}</p>
                  <Why>{item.why}</Why>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ranking">
          <div className="mx-auto max-w-[820px] px-5 py-16 sm:px-8 lg:py-20">
            <p className="rb-kicker" data-reveal>
              {issue.ranking.kicker}
            </p>
            <h2 className="rb-display mt-4 text-[clamp(2.4rem,6vw,4.8rem)]" data-reveal>
              {issue.ranking.title} <em className="rb-em text-[var(--rb-teal)]">{issue.ranking.titleEm}</em>
            </h2>
            <div className="rb-why mt-8" data-reveal>
              <b>Línea Wavys</b>
              {issue.ranking.line}
            </div>
            <ol className="mt-10">
              {issue.ranking.rows.map((row) => (
                <li
                  key={row.pos}
                  data-rank-row
                  className="grid grid-cols-[48px_28px_1fr_auto] items-center gap-3 border-t border-white/12 py-4 font-[var(--rb-sans)]"
                >
                  <span className="rb-mono text-[12px] text-white/35">{row.pos}</span>
                  <Mark src={row.mark} />
                  <div>
                    <b className="text-xl font-bold sm:text-2xl">{row.name}</b>
                    <span className="rb-rank-track">
                      <i
                        className="rb-rank-bar"
                        data-rank-bar
                        style={{ width: `${(Number(row.score) / maxScore) * 100}%` }}
                      />
                    </span>
                  </div>
                  <em
                    className="rb-mono text-[18px] not-italic text-[var(--rb-teal)]"
                    data-rank-score
                    data-score={row.score}
                  >
                    {row.score}
                  </em>
                </li>
              ))}
            </ol>
            <p className="rb-mono mt-3 text-[11px] text-white/40">
              Índice de terceros, no de Wavys. Gemini 3.7 Flash no tiene puesto acá: aparece en los gráficos de costo y velocidad.
            </p>
          </div>

          <div className="bg-white text-[#111]">
            <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              {issue.ranking.charts.map((chart) => (
                <figure key={chart.src} className="mb-14 last:mb-0" data-chart>
                  <p className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-[var(--rb-sans)] text-[15px] font-extrabold tracking-[-0.02em]">
                      {chart.label}
                    </span>
                    <em className="rb-mono text-[10px] not-italic text-black/40">{chart.em}</em>
                  </p>
                  <Image
                    src={chart.src}
                    alt={chart.alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                    sizes="(min-width: 1360px) 1360px, 100vw"
                    quality={95}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="cierre" className="relative min-h-[70vh] overflow-hidden">
          <Image src={issue.cierre.image} alt={issue.cierre.imageAlt} fill data-parallax className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[#070604]/72" />
          <div className="relative mx-auto flex min-h-[70vh] max-w-[820px] flex-col justify-end px-5 py-16 sm:px-8">
            <p className="rb-kicker" data-reveal>
              {issue.cierre.kicker}
            </p>
            <h2 className="rb-display mt-4 text-[clamp(2.8rem,7vw,5.6rem)]" data-reveal>
              {issue.cierre.title} <em className="rb-em">{issue.cierre.titleEm}</em>
            </h2>
            <div className="rb-prose mt-6 text-white/84" data-stagger>
              {issue.cierre.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="rb-mono mt-10 text-[11px] text-white/45" data-reveal>
              {issue.cierre.ctaLabel}
            </p>
            <a href={issue.cierre.ctaUrl} data-reveal className="rb-btn mt-3">
              Agendar 30 minutos
            </a>
            <p className="rb-em mt-10 text-4xl">{issue.cierre.sign}</p>
          </div>
        </section>

        <section id="paginas" className="border-t border-white/10 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="rb-kicker" data-reveal>
                  La revista impresa
                </p>
                <h2 className="rb-display mt-3 text-4xl sm:text-5xl" data-reveal>
                  Las 11 <em className="rb-em">páginas</em>
                </h2>
              </div>
              <a href={issue.pdf} className="rb-btn-ghost">
                Descargar PDF
              </a>
            </div>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {issue.pages.map((page) => (
                <figure key={page.file} className="w-[min(72vw,420px)] shrink-0 snap-start" data-page>
                  <Image
                    src={page.file}
                    alt={`${page.label} · página ${page.folio}`}
                    width={1240}
                    height={1754}
                    className="h-auto w-full border border-white/10 bg-[#111]"
                  />
                  <figcaption className="rb-mono mt-3 flex justify-between text-[10px] text-white/40">
                    <span>{page.label}</span>
                    <span>{page.folio}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <div className="px-5 pb-16 text-center sm:px-8">
          <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.18em] no-underline">
            ← Volver al blog
          </Link>
        </div>
      </article>
    </BlogChrome>
  );
}

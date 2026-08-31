"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomeRadarSection } from "@/components/blog/home-radar-section";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { LogoMarquees } from "@/components/logo-marquees";
import { PageThread, ThreadNode } from "@/components/page-thread";
import { WorkHoverCase } from "@/components/work-hover-case";
import { CARTA_OFERTA } from "@/lib/carta-oferta";
import { CASES, PAINS, PROCESS, SERVICES } from "@/lib/content";
import { BOOKING_HREF } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-hero-mark], [data-clip]", { autoAlpha: 1, y: 0, clearProps: "clipPath" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-hero-kicker]", { autoAlpha: 0, y: 16, duration: 0.45 })
          .from("[data-hero-sub], [data-hero-cta]", { autoAlpha: 0, y: 20, duration: 0.65, stagger: 0.08 }, "-=0.15")
          .from("[data-hero-mark]", { autoAlpha: 0, y: 48, scale: 0.94, duration: 1.15, ease: "expo.out" }, 0.12);

        gsap.to("[data-hero-float]", {
          y: -8,
          duration: 4.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to("[data-float]", {
          y: -16,
          duration: 3.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.15,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            },
          );
        });
      });

      const magnetics = pageRef.current?.querySelectorAll<HTMLElement>("[data-magnetic]") ?? [];
      const cleanups: Array<() => void> = [];
      magnetics.forEach((el) => {
        const onMag = contextSafe!((event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          gsap.to(el, {
            x: ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 14,
            y: ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 14,
            duration: 0.45,
            ease: "power3.out",
          });
        });
        const onLeave = contextSafe!(() => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        });
        el.addEventListener("pointermove", onMag);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMag);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        mm.revert();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: pageRef },
  );

  const featured = CASES[0];
  const rest = CASES.slice(1);

  return (
    <div ref={pageRef} className="relative">
      <PageThread />
      <div className="relative z-[1]">
      <section id="top" className="relative min-h-[100dvh] overflow-hidden">
        <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1440px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4 lg:px-12 lg:pb-8 lg:pt-20">
          <div>
            <p data-hero-kicker className="section-label">
              Estudio · Lima · LatAm
            </p>
            <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(2.2rem,5.2vw,4.6rem)] font-bold leading-[1.08] tracking-[-0.05em]">
              <span className="line-mask">
                <span>Software y diseño</span>
              </span>
              <span className="line-mask">
                <span>
                  para quien <span className="text-[var(--accent)]">ya opera.</span>
                </span>
              </span>
            </h1>
            <p
              data-hero-sub
              className="mt-6 max-w-[32rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/85"
            >
              Webs, apps y sistemas internos para negocios con tracción en Perú y
              LatAm. Dirección visual e ingeniería con la misma mano. IA solo
              cuando aporta.
            </p>
            <div data-hero-cta className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <a
                data-magnetic
                href={BOOKING_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-cal-click
              >
                <span>Agendar llamada 30 min</span>
                <ArrowIcon className="h-4 w-4" />
              </a>
              <Link href="/trabajo" className="btn-ghost">
                Ver el trabajo
              </Link>
            </div>
          </div>
          <div data-hero-mark className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:-mr-8 lg:max-w-none lg:translate-x-[8%] lg:scale-[1.18]">
            <div className="hero-ribbon-bloom" aria-hidden />
            <div data-hero-float className="relative z-[1]">
              <Image
                src="/images/studio/hero-ribbon-cutout.png"
                alt=""
                width={850}
                height={1124}
                priority
                className="cutout mx-auto h-auto w-full"
              />
            </div>
            <ThreadNode className="right-[36%] bottom-[6%]" />
          </div>
        </div>
      </section>

      <div className="relative">
        <ThreadNode className="right-[12%] top-1/2" />
        <LogoMarquees />
      </div>

      <section id="trabajo" className="relative py-24 sm:py-28">
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <ThreadNode className="left-[10%] top-36 lg:left-[58%]" />
          <ThreadNode className="left-[10%] top-[62%] lg:left-[58%]" />
          <div data-reveal className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="section-label">Trabajo seleccionado</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.04em]">
                Piezas en producción.
              </h2>
            </div>
            <Link
              href="/trabajo"
              className="hidden min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)] sm:inline-flex"
            >
              Índice de casos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-8">
            {featured ? <WorkHoverCase item={featured} variant="featured" priority /> : null}
            <div className="grid gap-5 md:grid-cols-3">
              {rest.map((item) => (
                <WorkHoverCase key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
        <ThreadNode className="bottom-8 left-8" />
      </section>

      <section id="carta-digital" className="relative py-20 sm:py-24">
        <ThreadNode className="right-[14%] top-10 hidden lg:block" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div
            data-reveal
            className="flex flex-col gap-8 border-t border-[var(--line-strong)] pt-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[36rem]">
              <p className="section-label">{CARTA_OFERTA.label}</p>
              <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold tracking-[-0.04em]">
                {CARTA_OFERTA.headline}
              </h2>
              <p className="mt-4 text-[1rem] leading-7 text-[var(--cream-soft)]/70">
                {CARTA_OFERTA.deck}
              </p>
            </div>
            <Link href={CARTA_OFERTA.path} className="btn-ghost">
              Ver carta digital <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="inversion" className="relative py-20 sm:py-24">
        <ThreadNode className="right-[14%] top-10 hidden lg:block" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div
            data-reveal
            className="flex flex-col gap-8 border-t border-[var(--line-strong)] pt-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[36rem]">
              <p className="section-label">Inversión</p>
              <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold tracking-[-0.04em]">
                Cotizamos después de entender el cuello de botella.
              </h2>
              <p className="mt-4 text-[1rem] leading-7 text-[var(--cream-soft)]/70">
                Alcance, plazos y modelo se cierran en la llamada. Sin cifras en
                vitrina: cada operación pide un tramo distinto.
              </p>
            </div>
            <Link href="/inversion" className="btn-ghost">
              Cómo invertimos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="problema" className="relative py-24 sm:py-28">
        <ThreadNode className="left-10 top-[72%]" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="max-w-[36rem]">
            <p className="section-label">El cuello de botella</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.045em]">
              Tres dolores. Un outcome: que el digital deje de frenar el negocio.
            </h2>
          </div>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            {PAINS.map((pain, index) => (
              <article key={pain.title} data-reveal className="relative border-t border-[var(--line-strong)] pt-6">
                <ThreadNode className="left-0 top-0 lg:left-1/2" />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-[1.3rem] font-semibold tracking-[-0.03em]">
                  {pain.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">
                  {pain.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="relative py-24 sm:py-28">
        <ThreadNode className="right-8 top-6 hidden lg:block" />
        <ThreadNode className="left-6 top-6 lg:left-10" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label">Servicios</p>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.045em]">
                Cuatro territorios. Un solo estudio.
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
            >
              Ver oferta <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10">
            {SERVICES.map((item, index) => (
              <Link key={item.slug} href={item.href} data-reveal className="service-row group relative">
                <ThreadNode className="left-[2.6rem] top-1/2" />
                {index === SERVICES.length - 1 ? (
                  <ThreadNode className="right-[18%] top-1/2 hidden lg:block" />
                ) : null}
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {item.code}
                </p>
                <div className="relative z-[1]">
                  <h3 className="font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--cream)] transition-colors group-hover:text-[var(--accent)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/70">
                    {item.outcome}
                  </p>
                </div>
                <Image
                  src={item.cutout}
                  alt=""
                  width={220}
                  height={160}
                  className="cutout hidden h-[4.8rem] w-auto justify-self-end lg:block"
                />
                <ArrowUpRight className="hidden h-4 w-4 text-[var(--muted)] transition group-hover:text-[var(--accent)] lg:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="sistemas" className="relative py-24 sm:py-28">
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.9fr] lg:px-12">
          <ThreadNode className="left-[10%] top-1/2 lg:hidden" />
          <ThreadNode className="right-[18%] top-1/2 hidden lg:block" />
          <ThreadNode className="right-[8%] bottom-4 hidden lg:block" />
          <div data-reveal>
            <p className="section-label">Sistemas internos</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.3rem)] font-bold leading-[1.08] tracking-[-0.045em]">
              El diferenciador no es una landing. Es el software que sostiene la operación.
            </h2>
            <p className="mt-6 max-w-[36rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
              Construimos paneles, integraciones y flujos para equipos que ya
              venden. En seguros, el mismo estudio que firma el portal público
              también entrega sistemas operativos en producción — sin filtrar el
              backoffice del cliente.
            </p>
            <Link href="/servicios/sistemas" className="btn-ghost mt-8">
              Cómo trabajamos sistemas
            </Link>
          </div>
          <div data-reveal className="relative">
            <div data-float>
              <Image
                src="/images/studio/mark-system-cutout.png"
                alt="Paneles de un sistema interno en producción"
                width={880}
                height={660}
                className="cutout mx-auto w-full max-w-[34rem]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" data-process className="relative py-24 sm:py-28">
        <ThreadNode className="right-8 top-6 hidden lg:block" />
        <ThreadNode className="left-6 top-6 lg:left-10" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label">Proceso</p>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold tracking-[-0.04em]">
                Cuatro movimientos.
              </h2>
            </div>
            <Link
              href="/proceso"
              className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
            >
              Ver proceso <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <li key={step.id} data-reveal className="relative border-t border-[var(--line-strong)] pt-6">
                <ThreadNode
                  className={`left-0 lg:left-1/2 ${
                    ["top-0", "top-12", "top-2", "top-10"][index] ?? "top-0"
                  }`}
                />
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {step.id} · {step.kicker}
                </p>
                <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-6 text-[var(--cream-soft)]/55">
                  {step.time}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="equipo" className="relative py-24 sm:py-32">
        <ThreadNode className="left-8 top-1/2 lg:hidden" />
        <ThreadNode className="right-8 top-12 hidden lg:block" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-12">
          <div data-reveal>
            <p className="section-label">Equipo</p>
            <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.045em]">
              El estudio trabaja para tu resultado.
            </h2>
            <p className="mt-6 max-w-[32rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
              Lima. Diseño e ingeniería en un solo ciclo, hasta que el digital
              deje de frenar el negocio. Sin intermediarios. Presencial cuando
              hace falta; LatAm en remoto.
            </p>
            <Link
              href="/equipo"
              className="mt-10 inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
            >
              Cómo trabajamos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div data-reveal className="relative">
            <ThreadNode className="left-1/2 top-[38%] hidden lg:block" />
            <ThreadNode className="left-1/2 bottom-6 hidden lg:block" />
            <div data-float>
              <Image
                src="/images/studio/mark-equipo-cutout.png"
                alt=""
                width={1088}
                height={650}
                className="cutout mx-auto w-full max-w-[38rem]"
              />
            </div>
          </div>
        </div>
        <ThreadNode className="right-8 bottom-10 hidden lg:block" />
      </section>

      <HomeRadarSection />

      <section id="faq" className="relative py-24 sm:py-28">
        <ThreadNode className="right-8 top-10 hidden lg:block" />
        <ThreadNode className="left-8 top-1/2 lg:hidden" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:gap-24 lg:px-12">
          <div data-reveal>
            <p className="section-label">Dudas frecuentes</p>
            <h2 className="mt-5 font-display text-[clamp(1.85rem,4vw,3.2rem)] font-bold tracking-[-0.04em]">
              Antes de escribir.
            </h2>
            <p className="mt-5 max-w-[22rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">
              Si tu pregunta no está aquí, escríbenos. Respondemos en menos de 24 h hábiles.
            </p>
          </div>
          <div data-reveal>
            <FaqList />
          </div>
        </div>
        <ThreadNode className="right-8 bottom-8 hidden lg:block" />
      </section>

      <CtaBand />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { HeroFlow } from "@/components/hero-flow";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { CASES, PAINS, PROCESS, SERVICES } from "@/lib/content";
import { BOOKING_HREF, STACK } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROOF = ["La Alcoba", "Inmobiliaria Fabre", "JLH Corredores"] as const;

export function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".line-mask > span", { y: 0 });
        gsap.set("[data-reveal], [data-hero-mark]", { autoAlpha: 1, y: 0, x: 0 });
        return;
      }

      gsap.from("[data-hero-kicker]", { autoAlpha: 0, y: 16, duration: 0.6, delay: 0.15 });
      gsap.to(".line-mask > span", {
        y: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from("[data-hero-sub], [data-hero-cta], [data-hero-proof]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.85,
      });
      gsap.from("[data-hero-mark]", {
        autoAlpha: 0,
        x: 36,
        scale: 0.96,
        duration: 1.15,
        delay: 0.28,
        ease: "expo.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      const workSection = pageRef.current?.querySelector<HTMLElement>("[data-work-pin]");
      const clips = pageRef.current?.querySelectorAll<HTMLElement>(".work-clip:not([data-first])");
      if (workSection && clips && clips.length && window.innerWidth >= 1024) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: workSection,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${window.innerHeight * clips.length}`,
          },
        });
        clips.forEach((clip) => {
          tl.fromTo(
            clip,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
          );
        });
      } else {
        gsap.set(".work-clip", { clipPath: "inset(0 0 0 0)" });
      }

      const path = pageRef.current?.querySelector<SVGPathElement>("[data-wave-path]");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process]",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
      }

      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const dot = { x: mouse.x, y: mouse.y };
      const ring = { x: mouse.x, y: mouse.y };
      const onMove = (event: PointerEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };
      window.addEventListener("pointermove", onMove);
      const ticker = gsap.ticker.add(() => {
        dot.x += (mouse.x - dot.x) * 0.35;
        dot.y += (mouse.y - dot.y) * 0.35;
        ring.x += (mouse.x - ring.x) * 0.12;
        ring.y += (mouse.y - ring.y) * 0.12;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
        }
      });

      const magnetics = pageRef.current?.querySelectorAll<HTMLElement>("[data-magnetic]") ?? [];
      const cleanups: Array<() => void> = [];
      magnetics.forEach((el) => {
        const onMag = contextSafe!((event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          gsap.to(el, {
            x: ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 18,
            y: ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 18,
            duration: 0.45,
            ease: "power3.out",
          });
        });
        const onLeave = contextSafe!(() => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
          if (ringRef.current) ringRef.current.dataset.active = "false";
        });
        const onEnter = () => {
          if (ringRef.current) ringRef.current.dataset.active = "true";
        };
        el.addEventListener("pointermove", onMag);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("pointerenter", onEnter);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMag);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("pointerenter", onEnter);
        });
      });

      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(ticker);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className="relative">
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} data-active="false" className="cursor-ring" aria-hidden />

      <section id="top" className="relative min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -bottom-24 left-[8%] h-72 w-[36rem] rounded-full bg-[var(--accent)]/18 blur-[110px]" />
          <div className="absolute -bottom-10 right-[12%] h-64 w-[28rem] rounded-full bg-[var(--accent-soft)]/14 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:px-12 lg:pb-10 lg:pt-24">
          <div>
            <p data-hero-kicker className="section-label">
              Estudio · Lima · LatAm
            </p>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.15rem,5.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.055em]">
              <span className="line-mask">
                <span>Software y diseño</span>
              </span>
              <span className="line-mask">
                <span>a medida para</span>
              </span>
              <span className="line-mask">
                <span className="text-[var(--accent)]">quien ya opera.</span>
              </span>
            </h1>
            <p
              data-hero-sub
              className="mt-6 max-w-[32rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/85 sm:text-[1.12rem]"
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
              >
                <span>Agendar llamada 30 min</span>
                <ArrowIcon className="h-4 w-4" />
              </a>
              <Link href="/trabajo" className="btn-ghost">
                Ver el trabajo
              </Link>
            </div>
            <p
              data-hero-proof
              className="mt-8 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
            >
              {PROOF.join(" · ")}
            </p>
          </div>
          <HeroFlow />
        </div>
      </section>

      <section aria-label="Clientes" className="border-y border-[var(--line)] py-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            En producción
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem] text-[var(--cream-soft)]/80">
            {PROOF.map((name) => (
              <li key={name} className="font-display font-semibold tracking-[-0.02em]">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="problema" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="max-w-[36rem]">
            <p className="section-label">El cuello de botella</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.045em]">
              Tres dolores. Un outcome: que el digital deje de frenar el negocio.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PAINS.map((pain, index) => (
              <article
                key={pain.title}
                data-reveal
                className="border-t border-[var(--line-strong)] pt-6"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-[1.35rem] font-semibold tracking-[-0.03em]">
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
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label">Servicios</p>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.045em]">
                Cuatro territorios. Una sola ola.
              </h2>
            </div>
            <Link
              href="/servicios"
              className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
            >
              Ver oferta <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {SERVICES.map((item, index) => (
              <Link
                key={item.slug}
                href={item.href}
                data-reveal
                className={`group relative overflow-hidden rounded-[1.4rem] border border-[var(--line)] ${
                  index === 0 ? "lg:col-span-2 min-h-[22rem]" : "min-h-[18rem]"
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes={index === 0 ? "100vw" : "50vw"}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000908] via-[#000908]/55 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {item.code}
                  </span>
                  <h3 className="mt-3 font-display text-[1.7rem] font-bold tracking-[-0.03em] sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[36rem] text-[0.98rem] leading-7 text-[var(--cream-soft)]/80">
                    {item.outcome}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="sistemas" className="relative border-y border-[var(--line)] bg-[var(--surface)] py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div data-reveal>
            <p className="section-label">Sistemas internos</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.3rem)] font-bold leading-[1.06] tracking-[-0.045em]">
              El diferenciador no es una landing. Es el software que sostiene la operación.
            </h2>
            <p className="mt-6 max-w-[36rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
              Construimos paneles, integraciones y flujos para equipos que ya
              venden. En seguros, por ejemplo, el mismo estudio que firma el
              portal público también entrega sistemas operativos en producción —
              sin filtrar el backoffice del cliente.
            </p>
            <p className="mt-4 max-w-[36rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/60">
              IA como capa: captura, calificación y seguimiento cuando hay ROI.
              No es un producto self-serve ni la promesa de este sitio.
            </p>
            <Link href="/servicios/sistemas" className="btn-ghost mt-8">
              Cómo trabajamos sistemas
            </Link>
          </div>
          <div data-reveal className="relative min-h-[22rem] overflow-hidden rounded-[1.4rem] border border-[var(--line)]">
            <Image
              src="/images/studio/n8n-canvas-itops.jpg"
              alt="Canvas de automatización: agentes, webhooks y ramales condicionales"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-left"
            />
          </div>
        </div>
      </section>

      <section
        id="proceso"
        data-process
        className="relative overflow-hidden py-24 sm:py-28"
      >
        <svg
          className="pointer-events-none absolute inset-x-0 top-24 hidden h-40 w-full opacity-70 lg:block"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            data-wave-path
            className="wave-stroke"
            d="M0 90 C 180 20, 320 140, 480 80 S 780 20, 960 95 S 1260 150, 1440 70"
          />
        </svg>
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-label">Proceso</p>
              <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold tracking-[-0.04em]">
                Cuatro movimientos. Nada al azar.
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
            {PROCESS.map((step) => (
              <li key={step.id} data-reveal className="border-t border-[var(--line-strong)] pt-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                  {step.id} · {step.kicker}
                </p>
                <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">
                  {step.body}
                </p>
                <dl className="mt-5 space-y-2 text-[0.8rem] leading-6 text-[var(--cream-soft)]/55">
                  <div>
                    <dt className="inline font-semibold text-[var(--cream-soft)]/80">Entregable. </dt>
                    <dd className="inline">{step.deliverable}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-[var(--cream-soft)]/80">Tiempo. </dt>
                    <dd className="inline">{step.time}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-[var(--cream-soft)]/80">Decisión. </dt>
                    <dd className="inline">{step.decision}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="trabajo"
        data-work-pin
        className="relative bg-[var(--background)] lg:h-screen"
      >
        <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 py-16 sm:px-8 lg:px-12 lg:py-10">
          <div data-reveal className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="section-label">Trabajo seleccionado</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.04em]">
                Piezas con peso.
              </h2>
            </div>
            <Link
              href="/trabajo"
              className="hidden min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)] sm:inline-flex"
            >
              Índice de casos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative min-h-[28rem] flex-1 overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] lg:min-h-0">
            {CASES.map((item, index) => (
              <Link
                key={item.slug}
                href={`/trabajo/${item.slug}`}
                data-first={index === 0 ? "true" : undefined}
                className="work-clip group absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={`Captura del sitio de ${item.client}`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {item.client}
                    </p>
                    <p className="mt-2 max-w-[28rem] font-display text-[1.25rem] font-semibold leading-snug sm:text-[1.6rem]">
                      {item.title}
                    </p>
                  </div>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/70">
                    {item.type} · {item.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 hidden text-[0.72rem] uppercase tracking-[0.22em] text-[var(--muted)] lg:block">
            Scroll para pasar de pieza
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <p className="max-w-[28rem] font-display text-[1.35rem] font-semibold tracking-[-0.03em]">
            Si esto se parece a lo que necesitas, hablemos 30 minutos.
          </p>
          <a
            data-magnetic
            href={BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Agendar llamada 30 min
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="inversion" className="relative py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div data-reveal>
            <p className="section-label">Inversión</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.3rem)] font-bold tracking-[-0.04em]">
              Cotización tras el diagnóstico. Sin cifras en vitrina.
            </h2>
            <p className="mt-5 max-w-[32rem] text-[0.98rem] leading-7 text-[var(--cream-soft)]/70">
              Alcance, plazos e integraciones se cierran en la llamada de 30
              minutos. Proyecto por fases o retainer — según lo que el negocio
              necesite sostener.
            </p>
            <Link href="/inversion" className="btn-ghost mt-8">
              Cómo cotizamos
            </Link>
          </div>
          <div data-reveal className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Web
              </p>
              <p className="mt-4 font-display text-[1.45rem] font-semibold tracking-[-0.03em]">
                Dirección visual, copy y un camino claro a contacto.
              </p>
              <p className="mt-5 text-[0.92rem] leading-7 text-[var(--cream-soft)]/70">
                Landing o site. El alcance se define después de leer el cuello de botella.
              </p>
            </article>
            <article className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-7">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Sistemas
              </p>
              <p className="mt-4 font-display text-[1.45rem] font-semibold tracking-[-0.03em]">
                Paneles, integraciones y software operativo.
              </p>
              <p className="mt-5 text-[0.92rem] leading-7 text-[var(--cream-soft)]/70">
                Para equipos que ya operan. La cotización cubre lo que hay que construir, no un paquete genérico.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="equipo" className="relative border-y border-[var(--line)] bg-[var(--surface)] py-24 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="max-w-[40rem]">
            <p className="section-label">Equipo</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.3rem)] font-bold tracking-[-0.04em]">
              Phil Taboada y tres developers. Un solo punto de contacto.
            </h2>
            <p className="mt-6 text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
              Dirección de producto y diseño en Lima. Ingeniería en Next.js,
              React Native, NestJS, Django, PostgreSQL y Supabase. Presencial
              cuando el proyecto lo pide; remoto para LatAm.
            </p>
          </div>
          <ul data-reveal className="mt-10 flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-[0.85rem] text-[var(--cream-soft)]/80"
              >
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/equipo"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
          >
            Cómo trabajamos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section id="faq" className="relative py-24 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:gap-24 lg:px-12">
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
      </section>

      <CtaBand />
    </div>
  );
}

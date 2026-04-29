"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "wavys-theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

const CONTACT_EMAIL_HREF =
  "mailto:hola@wavystechnologies.com?subject=Quiero%20una%20propuesta%20para%20mi%20proyecto";

const SCHEDULE_MEET_HREF = "https://cal.com/wavys-call/30min" as const;

const NAV_LINKS = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
] as const;

const MARQUEE_ITEMS = [
  "Webs con presencia",
  "Apps que se usan",
  "Software a medida",
  "Dirección visual",
  "Base técnica",
  "Sistemas internos",
  "Automatización",
  "Performance real",
] as const;

const CAPABILITIES = [
  {
    code: "01",
    title: "Webs con narrativa",
    body: "Landings, sites corporativos y páginas de venta con dirección visual firme y copy que entra rápido.",
    tag: "web",
    accent: "accent",
  },
  {
    code: "02",
    title: "Apps que se usan",
    body: "Flujos móviles claros, sobrios y medibles. Productos que se sienten cómodos desde la primera sesión.",
    tag: "mobile",
    accent: "lime",
  },
  {
    code: "03",
    title: "Sistemas que ordenan",
    body: "Paneles, automatizaciones y software interno para equipos que ya no pueden operar sobre mensajes sueltos.",
    tag: "systems",
    accent: "teal",
  },
  {
    code: "04",
    title: "Identidad digital",
    body: "Tipografía, color, ritmo y atmósfera traducidos a una interfaz coherente y escalable.",
    tag: "brand",
    accent: "accent",
  },
] as const;

const PROCESS_STEPS = [
  {
    id: "01",
    kicker: "diagnóstico",
    title: "Leemos el cuello de botella",
    body: "Antes de diseñar nada aterrizamos qué está frenando el avance: claridad comercial, experiencia o fricción operativa.",
  },
  {
    id: "02",
    kicker: "dirección",
    title: "Definimos una dirección que aguante",
    body: "Estructuramos mensaje, atmósfera y sistema para que la primera versión ya nazca con peso y continuidad.",
  },
  {
    id: "03",
    kicker: "construcción",
    title: "Construimos con detalle y control",
    body: "Diseño, desarrollo, interacción y performance resueltos con una misma mano para que todo se sienta coherente.",
  },
  {
    id: "04",
    kicker: "entrega",
    title: "Entregamos base y siguiente jugada",
    body: "No solo lanzamos. Dejamos claro qué conviene hacer después para que la siguiente fase no llegue a ciegas.",
  },
] as const;

const NUMBERS = [
  { value: 120, suffix: "+", label: "proyectos entregados" },
  { value: 98, suffix: "%", label: "ratio de satisfacción" },
  { value: 3, suffix: "x", label: "conversión promedio" },
  { value: 7, suffix: "", label: "industrias activas" },
] as const;

const WORK_ITEMS = [
  {
    slug: "la-alcoba",
    client: "La Alcoba",
    title: "Primera web: experiencia gastronómica, carta y reservas en una sola narrativa",
    year: "2024",
    tag: "web",
    image: "/images/portfolio-la-alcoba.png",
    demoHref: "https://restaurant-code.vercel.app/",
  },
  {
    slug: "inmobiliaria-fabre",
    client: "Inmobiliaria Fabre",
    title: "Sitio inmobiliario con foco en propiedades y contacto directo con el cliente",
    year: "2025",
    tag: "web",
    image: "/images/portfolio-inmobiliaria-fabre.png",
    demoHref: "https://www.inmobiliariafabre.com/",
  },
  {
    slug: "wavys-technologies",
    client: "Wavys Technologies",
    title: "Web corporativa del estudio: mensaje, servicios y conversión en un solo flujo",
    year: "2025",
    tag: "web · brand",
    image: "/images/portfolio-wavys-technologies.png",
    demoHref: "https://wavys-technologies.com/",
  },
  {
    slug: "jlh-seguros",
    client: "JLH Corredores de Seguros",
    title: "Portal de correduría: seguros, cotización y confianza para empresas y familias",
    year: "2025",
    tag: "web",
    image: "/images/portfolio-jlh-seguros.png",
    demoHref: "https://www.jlhcorredoresdeseguros.com/",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Transformaron nuestra presencia digital por completo. La web que entregaron no solo se ve bien, convierte. Empezamos a recibir consultas de calidad desde el primer mes.",
    author: "Nombre Apellido",
    role: "CEO",
    company: "Empresa S.A.",
    initials: "NA",
    result: "+60% consultas calificadas",
  },
  {
    quote:
      "El nivel de criterio que aplican al diseño y al copy es diferente. No hubo un solo entregable sin intención detrás. Recomendaría a Wavys sin dudarlo.",
    author: "Nombre Apellido",
    role: "Directora Comercial",
    company: "Empresa S.L.",
    initials: "NA",
    result: "3x tasa de conversión",
  },
  {
    quote:
      "Construyeron el sistema interno que necesitábamos para escalar operaciones. Limpio, rápido y adoptado por el equipo desde el primer día.",
    author: "Nombre Apellido",
    role: "COO",
    company: "Empresa Corp.",
    initials: "NA",
    result: "−50% fricción operativa",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "¿En cuánto tiempo entregáis un proyecto?",
    a: "Depende del alcance: una landing estratégica entre 3 y 5 semanas, una web corporativa entre 5 y 8, un producto o sistema a medida arranca desde 8 semanas. Antes de arrancar siempre hay una fase de encuadre con tiempos claros.",
  },
  {
    q: "¿Trabajáis con stacks ya existentes?",
    a: "Sí. Entramos sobre Next.js, React Native, NestJS, Django, PostgreSQL, Supabase o lo que sostenga tu stack. Si hay deuda técnica pesada proponemos un plan progresivo, no un reinicio brusco.",
  },
  {
    q: "¿Solo diseñáis o también desarrolláis?",
    a: "Ambas cosas con la misma mano. La dirección visual, el copy, la interacción y la ingeniería salen del mismo equipo para que la ejecución no pierda intención por el camino.",
  },
  {
    q: "¿Cómo es el modelo de colaboración?",
    a: "Proyecto cerrado por fases o retainer mensual para producto continuo. Siempre con un punto de contacto directo, entregas semanales y un tablero compartido donde ves el avance real.",
  },
  {
    q: "¿Dónde están basados?",
    a: "España y Latinoamérica. Trabajamos en remoto con equipos de toda Iberolatam y hacemos presencial en Lima cuando el proyecto lo pide.",
  },
] as const;

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="icon-moon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="icon-sun"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function WordMask({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`word-mask ${className}`} data-word-mask>
      <span data-word-inner>{children}</span>
    </span>
  );
}

type AccentTone = "accent" | "lime" | "teal";

function accentClass(tone: AccentTone): string {
  if (tone === "lime") return "text-[var(--lime)]";
  if (tone === "teal") return "text-[var(--teal)]";
  return "text-[var(--accent)]";
}

export function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

  const toggleTheme = (): void => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore storage errors */
    }
    ScrollTrigger.refresh();
  };

  useGSAP(
    (_context, contextSafe) => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set("[data-word-inner]", { y: 0 });
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
        gsap.set(
          "[data-hero-eyebrow], [data-hero-sub], [data-hero-cta], [data-hero-card]",
          { autoAlpha: 1, y: 0 },
        );
        gsap.set("[data-process-step]", { autoAlpha: 1 });
        return;
      }

      // ── Hero intro ──────────────────────────────────────────────────────────
      gsap.set("[data-hero-line] [data-word-inner]", { y: "110%" });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
      });

      intro
        .from("[data-nav-item]", {
          autoAlpha: 0,
          y: -12,
          stagger: 0.045,
          duration: 0.45,
        })
        .from(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 16, duration: 0.45 },
          "-=0.2",
        )
        .to(
          "[data-hero-line] [data-word-inner]",
          {
            y: 0,
            duration: 0.95,
            stagger: 0.055,
            ease: "expo.out",
          },
          "-=0.15",
        )
        .from(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 18, duration: 0.55 },
          "-=0.65",
        )
        .from(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 12, stagger: 0.07, duration: 0.45 },
          "-=0.3",
        )
        .from(
          "[data-hero-card]",
          {
            autoAlpha: 0,
            y: 20,
            scale: 0.97,
            stagger: 0.07,
            duration: 0.65,
            ease: "power2.out",
          },
          "-=0.35",
        );

      // ── Generic scroll reveals ───────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // ── Word-mask scroll reveals ─────────────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-words] [data-word-inner]")
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: "110%" },
            {
              y: 0,
              duration: 0.85,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el.closest("[data-reveal-words]") as HTMLElement,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

      // ── Process — horizontal pin ─────────────────────────────────────────────
      const horizontalSection = pageRef.current?.querySelector<HTMLElement>(
        "[data-process-section]",
      );
      const horizontalTrack = pageRef.current?.querySelector<HTMLElement>(
        "[data-process-track]",
      );

      if (horizontalSection && horizontalTrack && window.innerWidth >= 1024) {
        const steps =
          horizontalTrack.querySelectorAll<HTMLElement>("[data-process-step]");

        const getDistance = (): number =>
          horizontalTrack.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(horizontalTrack, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        steps.forEach((step) => {
          const number = step.querySelector<HTMLElement>("[data-process-number]");
          const rest = step.querySelectorAll<HTMLElement>("[data-process-reveal]");

          if (number) {
            gsap.from(number, {
              autoAlpha: 0,
              scale: 0.75,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: {
                trigger: step,
                containerAnimation: horizontalTween,
                start: "left 90%",
                once: true,
              },
            });
          }

          if (rest.length) {
            gsap.from(rest, {
              autoAlpha: 0,
              y: 22,
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                containerAnimation: horizontalTween,
                start: "left 75%",
                once: true,
              },
            });
          }
        });
      }

      // ── Counters ─────────────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });

      // ── Parallax images ──────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6, scale: 1.06 },
          {
            yPercent: 6,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });

      // ── Nav scroll state ─────────────────────────────────────────────────────
      const onScroll = () => {
        if (!navRef.current) return;
        navRef.current.dataset.scrolled = window.scrollY > 40 ? "true" : "false";
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Custom cursor ────────────────────────────────────────────────────────
      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const dotPos = { x: mouse.x, y: mouse.y };
      const ringPos = { x: mouse.x, y: mouse.y };

      const onPointerMove = (event: PointerEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };
      window.addEventListener("pointermove", onPointerMove);

      const ticker = gsap.ticker.add(() => {
        dotPos.x += (mouse.x - dotPos.x) * 0.35;
        dotPos.y += (mouse.y - dotPos.y) * 0.35;
        ringPos.x += (mouse.x - ringPos.x) * 0.1;
        ringPos.y += (mouse.y - ringPos.y) * 0.1;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
        }
      });

      // ── Magnetic buttons ─────────────────────────────────────────────────────
      const magneticEls =
        pageRef.current?.querySelectorAll<HTMLElement>("[data-magnetic]") ?? [];
      const magneticHandlers: Array<() => void> = [];

      magneticEls.forEach((el) => {
        const strength = Number(el.dataset.magneticStrength ?? "24");

        const onMove = contextSafe!((event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const relX = event.clientX - (rect.left + rect.width / 2);
          const relY = event.clientY - (rect.top + rect.height / 2);
          gsap.to(el, {
            x: (relX / rect.width) * strength,
            y: (relY / rect.height) * strength,
            duration: 0.45,
            ease: "power3.out",
          });
        });

        const onLeave = contextSafe!(() => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.4)",
          });
        });

        const onEnter = () => {
          if (ringRef.current) ringRef.current.dataset.active = "true";
        };
        const onRingLeave = () => {
          if (ringRef.current) ringRef.current.dataset.active = "false";
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onRingLeave);

        magneticHandlers.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onRingLeave);
        });
      });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointerMove);
        gsap.ticker.remove(ticker);
        magneticHandlers.forEach((cleanup) => cleanup());
      };
    },
    { scope: pageRef },
  );

  const toggleFaq = (index: number): void => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  return (
    <main
      ref={pageRef}
      className="relative overflow-x-clip bg-[var(--background)] text-[var(--cream)]"
    >
      {/* ── CURSOR ── */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        data-active="false"
        className="cursor-ring"
        aria-hidden="true"
      />

      {/* ── NAV ── */}
      <header
        ref={navRef}
        data-scrolled="false"
        className="nav-root fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-5 py-5 sm:px-8 lg:px-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-6">
          <a
            href="#top"
            data-nav-item
            className="group inline-flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5 justify-self-start text-[0.72rem] font-bold uppercase tracking-[0.36em]"
          >
            <Image
              src="/logo.png"
              alt="Wavys Technologies"
              width={36}
              height={36}
              className="h-9 w-auto shrink-0"
              priority
            />
            <span className="min-w-0 truncate sm:whitespace-normal">
              <span className="md:hidden">Wavys</span>
              <span className="hidden md:inline">Wavys Technologies</span>
            </span>
            <sup className="shrink-0 text-[0.55rem] font-normal tracking-[0.2em] text-[var(--muted)]">
              ES/LATAM
            </sup>
          </a>

          <nav
            aria-label="Navegación principal"
            className="nav-pill hidden shrink-0 items-center justify-center gap-1 rounded-full p-1 md:flex md:justify-self-center"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-nav-item
                className="rounded-full px-4 py-1.5 text-[0.82rem] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end justify-self-end gap-2 md:min-w-0 md:gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
              }
              data-nav-item
              className="theme-toggle inline-flex h-10 w-10 shrink-0 aspect-square items-center justify-center"
            >
              <MoonIcon />
              <SunIcon />
            </button>
            <a
              href={SCHEDULE_MEET_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-nav-item
              data-magnetic
              data-magnetic-strength="16"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 text-[0.78rem] font-semibold leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--accent-bright)] sm:px-5 sm:text-[0.82rem]"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-[var(--ink)] opacity-60 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              </span>
              <span className="whitespace-nowrap">Agendar llamada</span>
            </a>
          </div>
        </div>
      </header>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        id="top"
        className="relative min-h-[100dvh] overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40"
      >
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="noise absolute inset-0" />

        <div className="pointer-events-none absolute inset-x-5 top-24 flex items-center justify-between text-[0.62rem] font-mono uppercase tracking-[0.3em] text-[var(--muted-dim)] sm:inset-x-8 lg:inset-x-12">
          <span>[ N 40.4168° / W 3.7038° ]</span>
          <span className="hidden sm:block">estudio digital · est. 2020</span>
        </div>

        <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
          <div className="max-w-[28rem]">
            <p data-hero-eyebrow className="section-label">
              Estudio · Diseño · Software
            </p>
          </div>

          <h1
            data-hero-line
            className="relative mt-10 font-display font-medium uppercase leading-[0.82] tracking-[-0.055em] text-[clamp(3rem,14vw,12rem)] sm:mt-14 lg:mt-16"
          >
            <span className="block">
              <WordMask>Diseño</WordMask> <WordMask>que</WordMask>
            </span>
            <span className="block pl-[4vw] sm:pl-[8vw] lg:pl-[12vw]">
              <span className="word-mask" data-word-mask>
                <span
                  data-word-inner
                  className="font-serif italic text-[var(--accent)] font-normal lowercase"
                >
                  vende.
                </span>
              </span>
            </span>
            <span className="block">
              <WordMask>Software</WordMask> <WordMask>que</WordMask>
            </span>
            <span className="block pl-[4vw] sm:pl-[8vw] lg:pl-[12vw]">
              <span className="word-mask" data-word-mask>
                <span
                  data-word-inner
                  className="font-serif italic text-[var(--cream-soft)] font-normal lowercase"
                >
                  sostiene.
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <p
              data-hero-sub
              className="max-w-[36rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/75 sm:text-[1.15rem]"
            >
              Somos un estudio para negocios de España y Latinoamérica que ya
              no quieren parecer improvisados. Diseñamos webs, apps y sistemas
              con dirección visual firme y una base técnica que aguanta la
              siguiente fase.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row lg:justify-end">
              <a
                data-hero-cta
                data-magnetic
                href={SCHEDULE_MEET_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Agendar llamada</span>
                <ArrowIcon className="h-4 w-4" />
              </a>
              <a data-hero-cta href="#trabajo" className="btn-ghost">
                <span>ver trabajo</span>
              </a>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 lg:mt-28">
            <div data-hero-card className="card-outline rounded-2xl p-6">
              <p className="eyebrow text-[var(--accent-soft)]">filosofía</p>
              <p className="mt-4 font-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em]">
                Menos adorno. Más intención{" "}
                <span className="font-serif italic text-[var(--cream-soft)]">
                  en cada
                </span>{" "}
                decisión.
              </p>
            </div>
            <div data-hero-card className="card-outline rounded-2xl p-6">
              <p className="eyebrow text-[var(--accent-soft)]">
                perfil cliente
              </p>
              <p className="mt-4 font-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em]">
                Negocios que crecen y{" "}
                <span className="font-serif italic text-[var(--cream-soft)]">
                  no
                </span>{" "}
                pueden seguir operando sobre parches.
              </p>
            </div>
            <div data-hero-card className="card-outline rounded-2xl p-6">
              <p className="eyebrow text-[var(--accent-soft)]">entregable</p>
              <p className="mt-4 font-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em]">
                Identidad, interfaz y sistema{" "}
                <span className="font-serif italic text-[var(--cream-soft)]">
                  de una
                </span>{" "}
                misma mano.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-[var(--muted)] lg:flex">
          <span>scroll</span>
          <span className="h-8 w-px bg-[var(--muted-dim)]" />
        </div>
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <section className="relative border-y border-[var(--line)] bg-[var(--surface)] py-7 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
            ...MARQUEE_ITEMS,
          ].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-10 font-display text-[2rem] font-medium tracking-[-0.03em] sm:text-[2.5rem] lg:text-[3rem]"
            >
              <span className="text-[var(--cream)]">{item}</span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ MANIFESTO ═══════════════════ */}
      <section className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.3fr_1fr] lg:gap-20 lg:px-12">
          <div data-reveal className="flex items-start gap-4">
            <span className="section-label">Manifiesto</span>
          </div>
          <div>
            <h2
              data-reveal-words
              className="font-display text-[clamp(2rem,5.5vw,4.8rem)] font-medium leading-[1.04] tracking-[-0.035em] text-balance"
            >
              <WordMask>No</WordMask> <WordMask>vendemos</WordMask>{" "}
              <span className="word-mask" data-word-mask>
                <span
                  data-word-inner
                  className="font-serif italic text-[var(--accent)] font-normal lowercase"
                >
                  estética.
                </span>
              </span>{" "}
              <WordMask>Vendemos</WordMask> <WordMask>criterio</WordMask>{" "}
              <WordMask>para</WordMask> <WordMask>que</WordMask>{" "}
              <WordMask>tu</WordMask> <WordMask>pieza</WordMask>{" "}
              <WordMask>digital</WordMask> <WordMask>deje</WordMask>{" "}
              <WordMask>de</WordMask> <WordMask>competir</WordMask>{" "}
              <WordMask>con</WordMask>{" "}
              <span className="word-mask" data-word-mask>
                <span
                  data-word-inner
                  className="font-serif italic text-[var(--lime)] font-normal lowercase"
                >
                  plantillas.
                </span>
              </span>
            </h2>
            <div
              data-reveal
              className="mt-14 grid max-w-[48rem] gap-10 lg:grid-cols-2"
            >
              <p className="text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/70">
                Mezclamos dirección visual, escritura clara e ingeniería sobria
                en un mismo entregable. Un solo equipo, un solo tono, un solo
                resultado. Nada de handoffs rotos entre agencia, copy y
                desarrollador freelance.
              </p>
              <p className="text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/70">
                Trabajamos para negocios que ya tienen tracción y necesitan
                dejar de improvisar. Si es tu primer experimento, no somos
                nosotros. Si ya facturas y necesitas verte al nivel, sí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CAPABILITIES ═══════════════════ */}
      <section id="servicios" className="relative py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div data-reveal>
              <p className="section-label">Capacidades</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance max-w-[20ch]">
                Un equipo, cuatro{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  territorios.
                </span>
              </h2>
            </div>
            <p
              data-reveal
              className="max-w-[28rem] text-pretty text-[1rem] leading-7 text-[var(--cream-soft)]/60"
            >
              Webs, apps y software interno salen con la misma dirección visual
              y la misma lógica de sistema. Sin saltos entre pieza y pieza.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CAPABILITIES.map((item) => (
              <article
                key={item.code}
                data-reveal
                className="card-outline group relative flex min-h-[22rem] flex-col justify-between rounded-[1.5rem] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--muted)]">
                    [{item.code}]
                  </span>
                  <span
                    className={`font-mono text-[0.72rem] uppercase tracking-[0.24em] ${accentClass(item.accent as AccentTone)}`}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="mt-12">
                  <h3 className="font-display text-[1.7rem] font-medium leading-[1.1] tracking-[-0.03em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-7 text-[var(--cream-soft)]/60">
                    {item.body}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[0.8rem] font-medium text-[var(--cream)]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS — HORIZONTAL PIN ═══════════════════ */}
      <section
        id="proceso"
        data-process-section
        className="relative min-h-[60vh] overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] lg:h-screen"
      >
        <div className="flex h-full flex-col">
          <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-6 px-5 pt-12 sm:px-8 lg:px-12 lg:pt-16">
            <div data-reveal>
              <p className="section-label">Proceso</p>
              <h2 className="mt-6 font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.035em] max-w-[20ch]">
                Cuatro movimientos para que nada quede al{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  azar.
                </span>
              </h2>
            </div>
            <p
              data-reveal
              className="hidden max-w-[18rem] text-[0.9rem] leading-6 text-[var(--cream-soft)]/55 lg:block"
            >
              Cada fase tiene un entregable definido y un punto de decisión
              claro. Sabes qué recibes y cuándo.
            </p>
          </div>

          <div
            data-process-track
            className="mt-12 flex flex-1 items-center gap-6 px-5 pb-16 sm:px-8 lg:mt-20 lg:gap-8 lg:px-12 lg:pb-0"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <article
                key={step.id}
                data-process-step
                className="card-outline relative flex min-h-[22rem] w-[86vw] shrink-0 flex-col justify-between rounded-[1.75rem] p-8 sm:w-[60vw] lg:w-[30rem] lg:min-h-[28rem] lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <span
                    data-process-number
                    className="font-display text-[5rem] font-medium leading-none tracking-[-0.06em] text-[var(--cream-soft)]/15 lg:text-[7rem]"
                  >
                    {step.id}
                  </span>
                  <span
                    data-process-reveal
                    className="dot-accent shrink-0"
                    style={{
                      background:
                        idx % 2 === 0 ? "var(--accent)" : "var(--lime)",
                    }}
                  >
                    →
                  </span>
                </div>
                <div>
                  <p
                    data-process-reveal
                    className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[var(--muted)]"
                  >
                    / {step.kicker}
                  </p>
                  <h3
                    data-process-reveal
                    className="mt-4 font-display text-[1.8rem] font-medium leading-[1.1] tracking-[-0.03em] lg:text-[2.2rem]"
                  >
                    {step.title}
                  </h3>
                  <p
                    data-process-reveal
                    className="mt-5 text-[0.95rem] leading-7 text-[var(--cream-soft)]/60"
                  >
                    {step.body}
                  </p>
                </div>
              </article>
            ))}

            <div className="w-[12vw] shrink-0 lg:w-[20vw]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ═══════════════════ NUMBERS ═══════════════════ */}
      <section className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div data-reveal className="mx-auto mb-16 max-w-[36rem] text-center">
            <p className="section-label">En cifras</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance">
              Un track record{" "}
              <span className="font-serif italic text-[var(--accent)] font-normal">
                sin ruido.
              </span>
            </h2>
          </div>

          <div className="grid gap-0 divide-y divide-[var(--line)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {NUMBERS.map((item) => (
              <div
                key={item.label}
                data-reveal
                className="flex flex-col items-start gap-3 py-10 sm:px-8 sm:py-14"
              >
                <span
                  data-counter
                  data-target={item.value}
                  data-suffix={item.suffix}
                  className="font-display text-[clamp(3.5rem,9vw,6.5rem)] font-medium leading-none tracking-[-0.05em] text-[var(--cream)]"
                >
                  0{item.suffix}
                </span>
                <span className="text-[0.95rem] text-[var(--cream-soft)]/60">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="relative border-t border-[var(--line)] py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div data-reveal>
              <p className="section-label">Clientes</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance max-w-[22ch]">
                Lo que dicen quienes{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  ya confían.
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.author + item.company}
                data-reveal
                className="card-outline flex flex-col justify-between gap-10 rounded-[1.5rem] p-8"
              >
                <div>
                  <span className="font-serif text-[4rem] leading-[0.8] text-[var(--accent)]/25 select-none">
                    &ldquo;
                  </span>
                  <p className="mt-3 text-[1.02rem] leading-7 text-[var(--cream-soft)]/80">
                    {item.quote}
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                      {item.result}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 border-t border-[var(--line)] pt-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[0.72rem] font-semibold uppercase tracking-wider text-[var(--cream-soft)]">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-[0.9rem] font-semibold text-[var(--cream)]">
                        {item.author}
                      </p>
                      <p className="text-[0.78rem] text-[var(--muted)]">
                        {item.role} · {item.company}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WORK ═══════════════════ */}
      <section
        id="trabajo"
        className="relative border-t border-[var(--line)] py-24 sm:py-32 lg:py-36"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div data-reveal>
              <p className="section-label">Trabajo seleccionado</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance max-w-[20ch]">
                Piezas que salieron con{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  intención.
                </span>
              </h2>
            </div>
            <a
              data-reveal
              href={CONTACT_EMAIL_HREF}
              className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
            >
              <span>pedir portfolio completo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-10">
            {WORK_ITEMS.map((item, idx) => (
              <a
                key={item.slug}
                data-reveal
                href={item.demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col gap-5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[1.25rem] ${
                  idx % 2 === 1 ? "md:mt-16" : ""
                }`}
              >
                <div className="relative aspect-[8/5] overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[var(--surface)]">
                  <div
                    data-parallax-img
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  >
                    <Image
                      src={item.image}
                      alt={item.client}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-contain object-top"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[0.72rem] font-mono uppercase tracking-[0.26em] text-[var(--cream-soft)]/80">
                    <span>{item.tag}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-soft)]">
                      {item.client}
                    </p>
                    <h3 className="mt-3 font-display text-[1.5rem] font-medium leading-[1.2] tracking-[-0.025em] text-[var(--cream)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.72rem] font-mono uppercase tracking-[0.2em] text-[var(--muted)]">
                      ver demo en vivo
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-[var(--cream)] opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="relative py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-24">
            <div data-reveal>
              <p className="section-label">Dudas frecuentes</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance">
                Antes de{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  escribir.
                </span>
              </h2>
              <p className="mt-6 max-w-[22rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/60">
                Si tu pregunta no está aquí, escríbenos. Respondemos en menos
                de 24h hábiles con una propuesta preliminar.
              </p>
            </div>

            <div data-reveal>
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.q} className="faq-item">
                    <button
                      type="button"
                      className="faq-trigger"
                      data-open={isOpen}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-plus" aria-hidden="true" />
                    </button>
                    <div className="faq-panel" data-open={isOpen}>
                      <p className="pb-7 max-w-[42rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[var(--surface)]">
          <div className="relative px-8 py-20 sm:px-14 sm:py-28 lg:px-20 lg:py-36">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,44,0.22)_0%,transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(197,255,61,0.12)_0%,transparent_70%)] blur-3xl" />

            <div className="relative max-w-[52rem]">
              <p data-reveal className="section-label">
                Siguiente paso
              </p>
              <h2
                data-reveal
                className="mt-8 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance"
              >
                Cuéntanos qué estás{" "}
                <span className="font-serif italic text-[var(--accent)] font-normal">
                  intentando
                </span>{" "}
                construir.
              </h2>
              <p
                data-reveal
                className="mt-8 max-w-[36rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/70"
              >
                Reserva una videollamada de 30 minutos o escríbenos con el tipo
                de proyecto, contexto comercial y qué parte quieres resolver
                primero. Te decimos cómo lo aterrizaríamos con un alcance claro
                y tiempos reales.
              </p>
              <div
                data-reveal
                className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
              >
                <a
                  data-magnetic
                  href={SCHEDULE_MEET_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Agendar llamada</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <a href={CONTACT_EMAIL_HREF} className="btn-ghost">
                  <span>Escribir por email</span>
                </a>
              </div>
              <a
                data-reveal
                href="#top"
                className="mt-6 inline-flex items-center gap-1.5 text-[0.8rem] text-[var(--muted)] transition-colors hover:text-[var(--cream)]"
              >
                <span>↑</span>
                <span>volver arriba</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative border-t border-[var(--line)] bg-[var(--background)]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr]">
            <div>
              <a
                href="#top"
                className="inline-flex min-w-0 items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.36em]"
              >
                <Image
                  src="/logo.png"
                  alt="Wavys Technologies"
                  width={36}
                  height={36}
                  className="h-9 w-auto shrink-0"
                />
                <span className="min-w-0">
                  <span className="md:hidden">Wavys</span>
                  <span className="hidden md:inline">Wavys Technologies</span>
                </span>
              </a>
              <p className="mt-6 max-w-[22rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]/55">
                Estudio de diseño digital y software a medida. Presencial en
                Lima; remoto para toda Iberolatam.
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Navegar
              </p>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-[var(--cream-soft)]/70">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-[var(--cream)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Contacto
              </p>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-[var(--cream-soft)]/70">
                <li>
                  <a
                    href={CONTACT_EMAIL_HREF}
                    className="transition-colors hover:text-[var(--cream)]"
                  >
                    hola@wavystechnologies.com
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-[var(--cream)]"
                  >
                    linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-[var(--cream)]"
                  >
                    instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Estado
              </p>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-[var(--cream-soft)]/70">
                <li className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-60 animate-ping" />
                    <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  aceptando proyectos
                </li>
                <li>próximo slot: Q3 2026</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-center">
            <p className="text-[0.78rem] text-[var(--muted)]">
              © {new Date().getFullYear()} Wavys Technologies — Todos los
              derechos reservados.
            </p>
            <p className="text-[0.78rem] text-[var(--muted)]">
              Hecho con intención desde Lima
            </p>
          </div>
        </div>

        <div className="overflow-hidden pb-4 sm:pb-8">
          <p className="font-display text-center text-[18vw] font-bold leading-none tracking-[-0.07em] text-[var(--cream)]/[0.04] select-none">
            WAVYS
          </p>
        </div>
      </footer>
    </main>
  );
}

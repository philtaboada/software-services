"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { ThreadNode } from "@/components/page-thread";
import { CARTA_CASOS, CARTA_OFERTA, type CartaCaso } from "@/lib/carta-oferta";
import { FUMANCHU_BLUR } from "@/lib/fumanchu-blur";
import { BOOKING_HREF } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHONE_ROWS = [
  {
    name: "Chaufa especial",
    price: "S/ 35",
    image: "/carta/fumanchu/plato-chaufa-especial.webp",
  },
  {
    name: "Tipakay",
    price: "S/ 35",
    image: "/carta/fumanchu/plato-tipakay.webp",
  },
] as const;

function BookingCta({ className }: { className?: string }) {
  return (
    <a
      data-magnetic
      href={BOOKING_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "btn-primary"}
      data-cal-click
    >
      <span>{CARTA_OFERTA.ctaLabel}</span>
      <ArrowIcon className="h-4 w-4" />
    </a>
  );
}

function casoHref(caso: CartaCaso) {
  return caso.localHref ?? caso.href;
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function QrTent() {
  return (
    <div className="carta-hero__qr" aria-hidden>
      <div className="carta-hero__qr-card">
        {/* SVG QR — plain img avoids next/image SVG config */}
        <img
          src="/carta/qr-fumanchu.svg"
          alt=""
          width={120}
          height={120}
          className="carta-hero__qr-code"
        />
        <p className="carta-hero__qr-label">Escanea la carta</p>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="carta-phone" aria-hidden>
      <div className="carta-phone__glow" />
      <div className="carta-phone__bezel">
        <div className="carta-phone__notch" />
        <div className="carta-phone__screen carta-phone__screen--menu">
          <div className="carta-phone__hero">
            <Image
              src="/carta/fumanchu/hero-wok.webp"
              alt=""
              fill
              sizes="280px"
              className="object-cover object-[center_40%]"
              priority
              placeholder="blur"
              blurDataURL={FUMANCHU_BLUR["/carta/fumanchu/hero-wok.webp"]}
            />
            <div className="carta-phone__hero-veil" />
            <div className="carta-phone__brand">
              <Image
                src="/carta/fumanchu/logo.webp"
                alt=""
                width={88}
                height={88}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="carta-phone__menu">
            {PHONE_ROWS.map((row) => (
              <div key={row.name} className="carta-phone__dish">
                <span className="carta-phone__thumb">
                  <Image src={row.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <div className="carta-phone__dish-meta">
                  <p className="carta-phone__dish-name">{row.name}</p>
                  <p className="carta-phone__dish-price">{row.price}</p>
                </div>
                <span className="carta-phone__pedir">Pedir · {row.price}</span>
              </div>
            ))}
          </div>

          <div className="carta-phone__wa">Pedir por WhatsApp</div>
        </div>
      </div>
    </div>
  );
}

function CasoCard({ caso, featured = false }: { caso: CartaCaso; featured?: boolean }) {
  const href = casoHref(caso);
  const external = isExternal(href);
  const className = `carta-caso group ${featured ? "carta-caso--featured" : ""}`;

  const inner = (
    <>
      <div className="carta-caso__media">
        <Image
          src={caso.hero}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="carta-caso__veil"
          style={{ background: `linear-gradient(180deg, transparent 18%, ${caso.wash} 94%)` }}
        />
        <div className="carta-caso__logo">
          <Image
            src={caso.logo}
            alt={caso.logoAlt}
            width={80}
            height={80}
            className={`carta-caso__logo-img ${caso.logoOnDark ? "" : "carta-caso__logo-img--light"}`}
          />
        </div>
        <div className="carta-caso__dish">
          <span className="carta-caso__dish-thumb">
            <Image src={caso.plate} alt="" fill sizes="64px" className="object-cover" />
          </span>
          <div>
            <p className="carta-caso__dish-name">{caso.plateName}</p>
            <p className="carta-caso__dish-price" style={{ color: caso.accent }}>
              {caso.platePrice}
            </p>
          </div>
        </div>
      </div>
      <div className="carta-caso__body">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className="font-mono text-[0.68rem] uppercase tracking-[0.22em]"
            style={{ color: caso.accent }}
          >
            {caso.cuisine}
          </p>
          <span className="text-[var(--cream-soft)]/35">·</span>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--cream-soft)]/55">
            {caso.place}
          </p>
        </div>
        <h3 className="mt-3 font-display text-[1.55rem] font-bold leading-tight tracking-[-0.03em] sm:text-[1.75rem]">
          {caso.name}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-7 text-[var(--cream-soft)]/72">{caso.hook}</p>
        <p className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-medium text-[var(--cream)] transition-colors group-hover:text-[var(--accent)]">
          Abrir carta
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-carta-card
        className={className}
        style={{ "--caso-accent": caso.accent } as CSSProperties}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      data-carta-card
      className={className}
      style={{ "--caso-accent": caso.accent } as CSSProperties}
    >
      {inner}
    </Link>
  );
}

export function CartaDigitalLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = CARTA_CASOS;

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-carta-hero], [data-carta-reveal], [data-carta-phone], [data-carta-card]", {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          clearProps: "clipPath",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-carta-hero]", {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            stagger: 0.09,
          })
          .from(
            "[data-carta-phone]",
            { autoAlpha: 0, y: 48, scale: 0.94, duration: 1.05, ease: "expo.out" },
            0.18,
          );

        gsap.to("[data-carta-float]", {
          y: -10,
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.utils.toArray<HTMLElement>("[data-carta-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-carta-card]").forEach((el, index) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });

      const magnetics = pageRef.current?.querySelectorAll<HTMLElement>("[data-magnetic]") ?? [];
      const cleanups: Array<() => void> = [];
      magnetics.forEach((el) => {
        const onMag = contextSafe!((event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          gsap.to(el, {
            x: ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 12,
            y: ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 12,
            duration: 0.4,
            ease: "power3.out",
          });
        });
        const onLeave = contextSafe!(() => {
          gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power3.out" });
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

  return (
    <div ref={pageRef} className="carta-digital relative">
      <section className="carta-hero relative min-h-[100svh] overflow-hidden">
        <Image
          src="/carta/fumanchu/hero-wok.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={FUMANCHU_BLUR["/carta/fumanchu/hero-wok.webp"]}
          className="carta-hero__bg object-cover object-[72%_45%]"
        />
        <div className="carta-hero__veil absolute inset-0" />
        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1440px] items-end gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8 lg:px-12 lg:pb-20 lg:pt-24">
          <div className="max-w-[38rem] pb-2 lg:pb-0">
            <p data-carta-hero className="section-label">
              {CARTA_OFERTA.label}
            </p>
            <h1
              data-carta-hero
              className="mt-5 max-w-[19ch] text-balance font-display text-[clamp(2.35rem,6.2vw,5.2rem)] font-bold leading-[0.96] tracking-[-0.05em]"
            >
              <span className="line-mask">
                <span>El plato se ve.</span>
              </span>
              <span className="line-mask">
                <span>
                  El precio está <span className="text-[var(--accent)]">al día.</span>
                </span>
              </span>
            </h1>
            <p
              data-carta-hero
              className="mt-6 max-w-[34rem] text-pretty text-[1.08rem] leading-8 text-[var(--cream-soft)]/85"
            >
              {CARTA_OFERTA.deck}
            </p>
            <p
              data-carta-hero
              className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--cream-soft)]/55"
            >
              {CARTA_OFERTA.proof}
            </p>
            <div data-carta-hero className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <BookingCta />
              <a href="#cartas-hechas" className="btn-ghost">
                Ver cartas hechas <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <p data-carta-hero className="mt-3 text-[0.9rem] text-[var(--cream-soft)]/60">
              {CARTA_OFERTA.ctaHint}
            </p>
          </div>

          <div
            data-carta-phone
            className="relative mx-auto flex w-full max-w-[20rem] justify-center pb-4 lg:max-w-none lg:justify-end lg:pb-0 lg:pr-4 xl:pr-10"
          >
            <ThreadNode className="left-[18%] top-[22%] hidden lg:block" />
            <ThreadNode className="right-[12%] bottom-[18%] hidden lg:block" />
            <QrTent />
            <div data-carta-float className="relative z-[1]">
              <PhoneMock />
            </div>
          </div>
        </div>
      </section>

      <section
        id="cartas-hechas"
        className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <ThreadNode className="right-[8%] top-10 hidden lg:block" />
        <div data-carta-reveal className="max-w-[46rem]">
          <p className="section-label">{CARTA_OFERTA.casos.label}</p>
          <h2 className="mt-5 max-w-[46rem] text-balance font-display text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.045em]">
            {CARTA_OFERTA.casos.title}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-8 text-[var(--cream-soft)]/72">
            {CARTA_OFERTA.casos.deck}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <CasoCard caso={featured} featured />
          </div>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((caso) => (
              <CasoCard key={caso.slug} caso={caso} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <ThreadNode className="right-[10%] top-16 hidden lg:block" />
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <article data-carta-reveal className="carta-split">
            <p className="carta-split__kicker">{CARTA_OFERTA.queEs.title}</p>
            <p className="mt-6 text-[1.12rem] leading-8 text-[var(--cream-soft)]/85 sm:text-[1.2rem] sm:leading-9">
              {CARTA_OFERTA.queEs.body}
            </p>
          </article>
          <article data-carta-reveal className="carta-split carta-split--muted">
            <p className="carta-split__kicker">{CARTA_OFERTA.queNoEs.title}</p>
            <p className="mt-6 text-[1.12rem] leading-8 text-[var(--cream-soft)]/75 sm:text-[1.2rem] sm:leading-9">
              {CARTA_OFERTA.queNoEs.body}
            </p>
          </article>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div data-carta-reveal>
          <p className="section-label">Tres cosas</p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {CARTA_OFERTA.points.map((item, index) => (
            <li key={item.title} data-carta-card className="carta-point group">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-[1.45rem] font-bold leading-snug tracking-[-0.03em] transition-colors group-hover:text-[var(--accent)]">
                {item.title}
              </h3>
              <p className="mt-4 text-[1.02rem] leading-7 text-[var(--cream-soft)]/75">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative px-5 pb-8 sm:px-8 lg:px-12">
        <div
          data-carta-reveal
          className="carta-piloto mx-auto max-w-[1440px] overflow-hidden rounded-[1.5rem] border border-[var(--line)]"
        >
          <div className="carta-piloto__grid absolute inset-0" aria-hidden />
          <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
            <p className="section-label">Piloto</p>
            <p className="mt-5 max-w-[36rem] font-display text-[clamp(1.45rem,3vw,2.15rem)] font-semibold leading-snug tracking-[-0.03em]">
              {CARTA_OFERTA.piloto}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-14">
        <div
          data-carta-reveal
          className="relative mx-auto min-h-[22rem] max-w-[1440px] overflow-hidden rounded-[1.5rem] border border-[var(--line)]"
        >
          <Image
            src="/images/studio/studio-circuit-wave.jpg"
            alt=""
            fill
            sizes="1440px"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[#000908]/55" />
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
            <ThreadNode className="right-[8%] top-8" />
            <ThreadNode className="left-[12%] top-[62%]" />
            <p className="section-label">Siguiente paso</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(1.85rem,4.6vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.05em]">
              {CARTA_OFERTA.cierre}
            </h2>
            <div className="mt-10 flex flex-col items-start gap-3">
              <BookingCta />
              <p className="text-[0.9rem] text-[var(--cream-soft)]/60">{CARTA_OFERTA.ctaHint}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

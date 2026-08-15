"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_HREF, NAV_LINKS } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="nav-root fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex min-h-11 min-w-0 items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.28em]"
        >
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-auto shrink-0"
                priority
              />
          <span className="truncate">
            <span className="sm:hidden">Wavys</span>
            <span className="hidden sm:inline">Wavys Technologies</span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.88rem] text-[var(--cream-soft)]/80 transition-colors hover:text-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden min-h-11 px-4 py-2 text-[0.8rem] md:inline-flex"
            data-cal-click
          >
            Agendar llamada 30 min
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              aria-hidden
              className="flex h-3.5 w-4 flex-col justify-between"
            >
              <span
                className={`h-px w-full bg-[var(--foreground)] transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-[var(--foreground)] transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-[var(--foreground)] transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--background)] px-5 py-6 md:hidden"
        >
          <nav aria-label="Móvil" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 py-3 text-[1.15rem] font-medium tracking-[-0.02em]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full"
            data-cal-click
          >
            Agendar llamada 30 min
          </a>
        </div>
      ) : null}
    </header>
  );
}

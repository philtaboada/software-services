"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CHROME, EN_NAV, localeFromPath } from "@/lib/i18n/chrome";
import { BOOKING_HREF, NAV_LINKS } from "@/lib/site";
import { usePathname } from "next/navigation";

function LanguageSwitch({ locale, label }: { locale: "es" | "en"; label: string }) {
  return (
    <nav className="lang-switch" aria-label={label}>
      <Link href="/" hrefLang="es" aria-current={locale === "es" ? "page" : undefined} className="lang-switch-link">
        ES
      </Link>
      <Link href="/en" hrefLang="en" aria-current={locale === "en" ? "page" : undefined} className="lang-switch-link">
        EN
      </Link>
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = CHROME[locale];
  const home = locale === "en" ? "/en" : "/";
  const links =
    locale === "en"
      ? EN_NAV
      : NAV_LINKS.map((item) => ({ href: item.href, label: item.label, hrefLang: undefined }));
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

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
    <header data-scrolled={scrolled ? "true" : "false"} className="nav-root fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-12">
        <Link
          href={home}
          aria-label={copy.homeAria}
          className="inline-flex min-h-11 min-w-0 items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.22em] sm:tracking-[0.28em]"
        >
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto shrink-0" />
          <span className="truncate">
            <span className="sm:hidden">Wavys</span>
            <span className="hidden sm:inline">Wavys Technologies</span>
          </span>
        </Link>

        <nav aria-label={copy.navLabel} className="hidden items-center gap-5 xl:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              hrefLang={"hrefLang" in item ? item.hrefLang : undefined}
              className="text-[0.84rem] text-[var(--cream-soft)] transition-colors hover:text-[var(--accent)]"
            >
              {item.label}
              {"hrefLang" in item && item.hrefLang === "es" ? (
                <span className="es-mark">
                  ES<span className="sr-only">, in Spanish</span>
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageSwitch locale={locale} label={copy.langLabel} />
          </div>
          <a
            href={BOOKING_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden min-h-11 whitespace-nowrap px-4 py-2 text-[0.8rem] xl:inline-flex"
            data-cal-click
          >
            {copy.book}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span aria-hidden className="flex h-3.5 w-4 flex-col justify-between">
              <span className={`h-px w-full bg-[var(--foreground)] transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-[var(--foreground)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-[var(--foreground)] transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[var(--line)] bg-[var(--background)] px-5 py-6 xl:hidden">
          <LanguageSwitch locale={locale} label={copy.langLabel} />
          <nav aria-label={copy.mobileNavLabel} className="mt-4 flex flex-col gap-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                hrefLang={"hrefLang" in item ? item.hrefLang : undefined}
                className="inline-flex min-h-11 items-center gap-2 py-2 text-[1.15rem] font-medium tracking-[-0.02em]"
                onClick={() => setOpenPath(null)}
              >
                {item.label}
                {"hrefLang" in item && item.hrefLang === "es" ? (
                  <span className="es-mark">
                    ES<span className="sr-only">, in Spanish</span>
                  </span>
                ) : null}
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
            {copy.book}
          </a>
        </div>
      ) : null}
    </header>
  );
}

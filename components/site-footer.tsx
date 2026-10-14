"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TikTokIcon,
} from "@/components/icons";
import { CHROME, EN_FOOTER_LINKS, localeFromPath } from "@/lib/i18n/chrome";
import { BOOKING_HREF, CONTACT_EMAIL, FOOTER_LINKS, SOCIALS } from "@/lib/site";

const SOCIAL_LINKS = [
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SOCIALS.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIALS.tiktok, label: "TikTok", Icon: TikTokIcon },
] as const;

export function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const copy = CHROME[locale];
  const home = locale === "en" ? "/en" : "/";
  const links = locale === "en" ? EN_FOOTER_LINKS : FOOTER_LINKS;

  return (
    <footer className="relative border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.9fr_0.7fr]">
          <div>
            <Link
              href={home}
              className="inline-flex min-h-11 items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.28em]"
            >
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
              Wavys Technologies
            </Link>
            <p className="mt-5 max-w-[22rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]">{copy.footer.blurb}</p>
            <p className="mt-3 text-[0.9rem] text-[var(--muted)]">{copy.footer.reply}</p>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              {copy.footer.navigate}
            </p>
            {copy.footer.esNote ? (
              <p className="mt-3 text-[0.78rem] text-[var(--cream-soft)]">{copy.footer.esNote}</p>
            ) : null}
            <ul className="mt-4 space-y-1 text-[0.95rem] text-[var(--cream-soft)]">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    hrefLang={locale === "en" ? "es" : undefined}
                    className="inline-flex min-h-11 items-center hover:text-[var(--cream)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              {copy.footer.contact}
            </p>
            <ul className="mt-5 space-y-1">
              <li>
                <a href={copy.emailHref} className="footer-link">
                  <MailIcon className="h-4 w-4" />
                  <span className="footer-link__meta">
                    <span className="footer-link__kicker">{copy.footer.emailKicker}</span>
                    <span className="break-all text-[0.92rem]">{CONTACT_EMAIL}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={BOOKING_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  data-cal-click
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="footer-link__meta">
                    <span className="footer-link__kicker">{copy.footer.bookKicker}</span>
                    <span className="text-[0.92rem]">{copy.footer.bookLabel}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              {copy.footer.social}
            </p>
            <ul className="mt-5 space-y-1">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
                    <Icon className="h-4 w-4" />
                    <span className="text-[0.92rem]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-14 text-[0.78rem] text-[var(--muted)]">
          © {new Date().getFullYear()} Wavys Technologies — {copy.footer.made}
        </p>
      </div>
    </footer>
  );
}

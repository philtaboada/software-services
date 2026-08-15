"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function StudioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const isBlogIndex = pathname === "/blog";

  return (
    <div
      className={`relative bg-[var(--background)] text-[var(--cream)] ${
        isBlogIndex ? "h-dvh overflow-hidden" : "min-h-dvh overflow-x-clip"
      }`}
    >
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main" className={isBlogIndex ? "h-dvh overflow-hidden" : undefined}>
        {children}
      </main>
      {isBlog ? null : <SiteFooter />}
    </div>
  );
}

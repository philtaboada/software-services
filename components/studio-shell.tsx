import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function StudioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-[var(--background)] text-[var(--cream)]">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

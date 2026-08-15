import Image from "next/image";

export function HeroWork() {
  return (
    <figure
      data-hero-mark
      className="hero-stage mx-auto w-full max-w-[42rem] lg:max-w-none"
    >
      <div data-hero-float>
        <div className="hero-stage__bloom" aria-hidden />
        <div className="relative overflow-hidden rounded-[1.35rem] border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_48px_color-mix(in_srgb,var(--accent)_18%,transparent)]">
          <div className="flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--accent)_22%,transparent)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <p className="ml-2 truncate font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">
              inmobiliariafabre.com · en producción
            </p>
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/portfolio-inmobiliaria-fabre.png"
              alt="Sitio en producción de Inmobiliaria Fabre"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </figure>
  );
}

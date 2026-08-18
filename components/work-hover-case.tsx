import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { CASE_BRIEFS } from "@/lib/content";

type CaseItem = {
  slug: keyof typeof CASE_BRIEFS;
  client: string;
  industry: string;
  year: string;
  title: string;
  result: string;
  image: string;
  demoHref: string;
};

export function WorkHoverCase({
  item,
  variant = "compact",
  priority = false,
}: {
  item: CaseItem;
  variant?: "featured" | "compact";
  priority?: boolean;
}) {
  const brief = CASE_BRIEFS[item.slug];
  const featured = variant === "featured";

  return (
    <article
      data-reveal
      tabIndex={0}
      className={`work-brief group ${featured ? "work-brief--featured" : "work-brief--compact"}`}
      aria-label={`${item.client}. Enfoca o pasa el cursor para ver cómo se planeó y se construyó.`}
    >
      <div data-clip className="work-brief-stage">
        <Link href={`/trabajo/${item.slug}`} className="work-brief-shot" aria-label={`Ver cómo se planeó ${item.client}`}>
          <Image
            src={item.image}
            alt={`Captura del sitio de ${item.client}`}
            fill
            sizes={featured ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover object-top"
            priority={priority}
          />
        </Link>
        <div className="work-brief-sketch">
          <p className="work-brief-sketch-label">Boceto · dirección</p>
          <Image
            src={brief.sketch}
            alt={brief.sketchAlt}
            fill
            sizes={featured ? "40vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover"
          />
        </div>
        <p className="work-brief-hint">
          <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
          Pasa el cursor · plan y boceto
        </p>
        <div className="work-brief-panel">
          <div>
            <p className="section-label">{brief.kicker}</p>
            <h3 className="work-brief-title">{brief.headline}</h3>
            {featured ? (
              <p className="mt-3 max-w-[38rem] text-[0.88rem] leading-6 text-[var(--cream-soft)]/75">
                {brief.lede}
              </p>
            ) : null}
          </div>
          <div className={`grid gap-4 ${featured ? "sm:grid-cols-2" : ""}`}>
            {featured ? (
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                  La pieza
                </p>
                <ul className="mt-3 space-y-2">
                  {brief.product.map((entry) => (
                    <li key={entry.label}>
                      <p className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[var(--cream)]">
                        {entry.label}
                      </p>
                      <p className="mt-0.5 text-[0.78rem] leading-5 text-[var(--cream-soft)]/60">
                        {entry.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                El plan
              </p>
              <ol className="mt-3 space-y-2">
                {brief.plan.map((step) => (
                  <li key={step.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                    <span className="font-mono text-[0.66rem] text-[var(--accent)]">{step.id}</span>
                    <div>
                      <p className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[var(--cream)]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[0.76rem] leading-5 text-[var(--cream-soft)]/60">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden>
            {brief.system.colors.slice(0, 5).map((token) => (
              <span
                key={token.hex}
                title={`${token.name} ${token.hex}`}
                className="size-3.5 rounded-full border border-white/20"
                style={{ background: token.hex }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {brief.craft.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line-strong)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--cream-soft)]/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="work-brief-closer">{brief.closer}</p>
          <div className="flex flex-col items-start gap-2 sm:flex-row">
            <Link href={`/trabajo/${item.slug}`} className="btn-primary">
              <span>Ver el proceso</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a
              href={item.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Ver en producción
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      <div className="work-brief-meta">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            {item.industry} · {item.year}
          </p>
          <h3
            className={
              featured
                ? "mt-1.5 font-display text-[1.45rem] font-semibold tracking-[-0.03em]"
                : "mt-1.5 font-display text-[1.2rem] font-semibold tracking-[-0.03em]"
            }
          >
            {item.client}
          </h3>
          <p className="mt-1 text-[0.88rem] text-[var(--cream-soft)]/70">{item.title}</p>
          {featured ? (
            <p className="mt-2 max-w-[36rem] text-[0.88rem] leading-6 text-[var(--cream-soft)]/55">
              {item.result}
            </p>
          ) : (
            <p className="mt-1 text-[0.88rem] text-[var(--cream-soft)]/55">{item.result}</p>
          )}
        </div>
        <Link
          href={`/trabajo/${item.slug}`}
          className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)]/70 hover:text-[var(--cream)]"
        >
          Ver cómo se planeó <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

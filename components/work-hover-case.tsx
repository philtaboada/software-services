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

const ES_LABELS = {
  aria: "Enfoca o pasa el cursor para ver cómo se planeó y se construyó.",
  shotAlt: "Captura del sitio de",
  shotLink: "Ver cómo se planeó",
  sketch: "Boceto · dirección",
  hint: "Pasa el cursor · plan y boceto",
  piece: "La pieza",
  plan: "El plan",
  processCta: "Ver el proceso",
  liveCta: "Ver en producción",
  seePlan: "Ver cómo se planeó",
  planToggle: "Ver plan y boceto",
};

export type WorkLabels = typeof ES_LABELS;

export function WorkHoverCase({
  item,
  variant = "compact",
  brief,
  labels = ES_LABELS,
  hrefLang,
  markSpanish = false,
}: {
  item: CaseItem;
  variant?: "featured" | "compact";
  brief?: {
    kicker: string;
    headline: string;
    lede: string;
    product: readonly { label: string; body: string }[];
    plan: readonly { id: string; title: string; body: string }[];
    closer: string;
    sketch: string;
    sketchAlt: string;
    craft: readonly string[];
    system: { colors: readonly { name: string; hex: string }[] };
  };
  labels?: WorkLabels;
  hrefLang?: "es";
  markSpanish?: boolean;
}) {
  const story = brief ?? CASE_BRIEFS[item.slug];
  const featured = variant === "featured";
  const esMark = () =>
    markSpanish ? (
      <span className="es-mark">
        ES<span className="sr-only">, in Spanish</span>
      </span>
    ) : null;

  return (
    <article
      data-reveal
      tabIndex={0}
      className={`work-brief group ${featured ? "work-brief--featured" : "work-brief--compact"}`}
      aria-label={`${item.client}. ${labels.aria}`}
    >
      <div data-clip className="work-brief-stage">
        <Link
          href={`/trabajo/${item.slug}`}
          hrefLang={hrefLang}
          className="work-brief-shot"
          aria-label={`${labels.shotLink} ${item.client}`}
        >
          <Image
            src={item.image}
            alt={`${labels.shotAlt} ${item.client}`}
            fill
            sizes={featured ? "(min-width: 1024px) 72vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover object-top"
          />
        </Link>
        <details className="work-plan">
          <summary className="work-plan-summary">{labels.planToggle}</summary>
          <div className="work-brief-sketch">
            <p className="work-brief-sketch-label">{labels.sketch}</p>
            <Image
              src={story.sketch}
              alt={story.sketchAlt}
              fill
              sizes={featured ? "40vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover"
            />
          </div>
          <p className="work-brief-hint">
            <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            {labels.hint}
          </p>
          <div className="work-brief-panel">
          <div>
            <p className="section-label">{story.kicker}</p>
            <h3 className="work-brief-title">{story.headline}</h3>
            {featured ? (
              <p className="mt-3 max-w-[38rem] text-[0.88rem] leading-6 text-[var(--cream-soft)]">
                {story.lede}
              </p>
            ) : null}
          </div>
          <div className={`grid gap-4 ${featured ? "sm:grid-cols-2" : ""}`}>
            {featured ? (
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                  {labels.piece}
                </p>
                <ul className="mt-3 space-y-2">
                  {story.product.map((entry) => (
                    <li key={entry.label}>
                      <p className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[var(--cream)]">
                        {entry.label}
                      </p>
                      <p className="mt-0.5 text-[0.78rem] leading-5 text-[var(--muted)]">
                        {entry.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                {labels.plan}
              </p>
              <ol className="mt-3 space-y-2">
                {story.plan.map((step) => (
                  <li key={step.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                    <span className="font-mono text-[0.66rem] text-[var(--accent)]">{step.id}</span>
                    <div>
                      <p className="text-[0.88rem] font-semibold tracking-[-0.02em] text-[var(--cream)]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[0.76rem] leading-5 text-[var(--muted)]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden>
            {story.system.colors.slice(0, 5).map((token) => (
              <span
                key={token.hex}
                title={`${token.name} ${token.hex}`}
                className="size-3.5 rounded-full border border-white/20"
                style={{ background: token.hex }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {story.craft.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line-strong)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--cream-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="work-brief-closer">{story.closer}</p>
          <div className="flex flex-col items-start gap-2 sm:flex-row">
            <Link href={`/trabajo/${item.slug}`} hrefLang={hrefLang} className="btn-primary">
              <span>
                {labels.processCta}
                {esMark()}
              </span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a
              href={item.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {labels.liveCta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          </div>
        </details>
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
          <p className="mt-1 text-[0.88rem] text-[var(--cream-soft)]">{item.title}</p>
          <p className="mt-2 max-w-[36rem] text-[0.88rem] leading-6 text-[var(--muted)]">
            {item.result}
          </p>
        </div>
        <Link
          href={`/trabajo/${item.slug}`}
          hrefLang={hrefLang}
          className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)] hover:text-[var(--cream)]"
        >
          {labels.seePlan}
          {esMark()}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

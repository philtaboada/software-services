import Image from "next/image";
import Link from "next/link";
import { HomeRadarSection } from "@/components/blog/home-radar-section";
import { CtaBand } from "@/components/cta-band";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { FaqList } from "@/components/faq-list";
import { ArrowIcon, ArrowUpRight } from "@/components/icons";
import { GlobalClock } from "@/components/landing/global-clock";
import { MagneticRoot } from "@/components/landing/magnetic";
import { WorkPlanOpen } from "@/components/landing/work-plan-open";
import { PageThreadLoader } from "@/components/landing/page-thread-loader";
import { SpotlightGrid } from "@/components/landing/spotlight";
import { StickyCta } from "@/components/landing/sticky-cta";
import { WorldMap } from "@/components/landing/world-map";
import { LogoMarquees } from "@/components/logo-marquees";
import { ThreadNode } from "@/components/thread-node";
import { WorkHoverCase, type WorkLabels } from "@/components/work-hover-case";
import { CARTA_CASOS, CARTA_OFERTA } from "@/lib/carta-oferta";
import { CASES, CASE_BRIEFS, CLIENT_LOGOS, PAINS, PROCESS, SERVICES } from "@/lib/content";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  EN_BRIEFS,
  EN_CASES,
  EN_PAINS,
  EN_PROCESS,
  EN_SERVICES,
  LANDING_COPY,
  PAIN_SERVICES,
  type LandingLocale,
} from "@/lib/i18n/landing";
import { CHROME } from "@/lib/i18n/chrome";
import { BOOKING_HREF, CONTACT_EMAIL } from "@/lib/site";

const wrap = "relative mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-8 lg:px-12";
const h2 =
  "mt-4 font-display text-[clamp(1.8rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em] text-balance";

function EsMark({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="es-mark">
      ES<span className="sr-only">, in Spanish</span>
    </span>
  );
}

export function LandingPage({ locale }: { locale: LandingLocale }) {
  const copy = LANDING_COPY[locale];
  const chrome = CHROME[locale];
  const spanishPage = locale === "en";
  const hrefLang = spanishPage ? "es" : undefined;
  const pains = locale === "en" ? EN_PAINS : PAINS;
  const faqItems = locale === "en" && copy.faq.items ? copy.faq.items : FAQ_ITEMS;
  const services = SERVICES.map((item) => {
    const overlay = EN_SERVICES[item.slug];
    return {
      ...item,
      title: locale === "en" ? overlay.title : item.title,
      outcome: locale === "en" ? overlay.outcome : item.outcome,
    };
  });
  const steps = PROCESS.map((step) => {
    if (locale === "es") return step;
    const overlay = EN_PROCESS[step.id];
    return { ...step, kicker: overlay.kicker, title: overlay.title, time: overlay.time };
  });
  const first = steps[0];
  const firstBody = locale === "en" ? EN_PROCESS["01"].body : PROCESS[0].body;
  const featured = CASES[0];
  const rest = CASES.slice(1);
  const labels: WorkLabels = {
    aria: copy.work.aria,
    shotAlt: copy.work.shotAlt,
    shotLink: copy.work.shotLink,
    sketch: copy.work.sketch,
    hint: copy.work.hint,
    piece: copy.work.piece,
    plan: copy.work.plan,
    processCta: copy.work.processCta,
    liveCta: copy.work.liveCta,
    seePlan: copy.work.seePlan,
    planToggle: copy.work.planToggle,
  };
  const stats = [
    { value: String(CASES.length), label: copy.stats.products },
    { value: String(CLIENT_LOGOS.length), label: copy.stats.brands },
    { value: "3", label: copy.stats.countries },
    { value: "< 24 h", label: copy.stats.reply },
    { value: "1", label: copy.stats.team },
  ];
  const cartaTitle = locale === "es" ? CARTA_OFERTA.headline : copy.offers.cartaTitle;
  const cartaDeck = locale === "es" ? CARTA_OFERTA.deck : copy.offers.cartaDeck;
  const cartaLabel = locale === "es" ? CARTA_OFERTA.label : copy.offers.cartaLabel;

  return (
    <div className="landing-root relative">
      <PageThreadLoader />
      <MagneticRoot />
      <WorkPlanOpen />
      <FaqJsonLd items={faqItems} />
      <div className="relative z-[1]">
        <section id="top" className="landing-hero relative overflow-hidden" aria-labelledby="hero-title">
          <div className="hero-aurora" aria-hidden="true">
            <span className="aurora-blob aurora-a" />
            <span className="aurora-blob aurora-b" />
            <span className="aurora-blob aurora-c" />
          </div>
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="hero-grid relative mx-auto grid w-full min-w-0 max-w-[1440px] items-end gap-2 px-5 pb-6 pt-24 sm:px-8 lg:min-h-[100dvh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:px-12 lg:pb-10 lg:pt-20">
            <div className="hero-copy relative z-[2] min-w-0 max-w-[40rem]">
              <p className="section-label">{copy.hero.kicker}</p>
              <h1
                id="hero-title"
                className="mt-5 max-w-[16ch] font-display text-[clamp(2.15rem,8.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.05em] sm:max-w-[18ch]"
              >
                <span className="block">{copy.hero.line1}</span>
                <span className="mt-1 block">{copy.hero.line2Before.trim()}</span>
                <span className="mt-1 block text-[var(--accent)]">{copy.hero.line2Accent}</span>
              </h1>
              <p className="word-line">
                <span>{copy.hero.rotateLabel}</span>
                <span className="word-window" aria-hidden="true">
                  <span className="word-track">
                    {copy.hero.words.map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                    <span data-clone>{copy.hero.words[0]}</span>
                  </span>
                </span>
                <span className="sr-only">{copy.hero.wordsLabel}</span>
              </p>
              <div className="hero-sub mt-4 space-y-1 text-[0.98rem] leading-6 text-[var(--cream-soft)] sm:text-[1.02rem]">
                {copy.hero.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a
                  data-magnetic
                  href={BOOKING_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto"
                  data-cal-click
                >
                  <span>{copy.hero.primary}</span>
                  <ArrowIcon className="h-4 w-4" />
                </a>
                <Link href="/trabajo" hrefLang={hrefLang} className="btn-ghost w-full sm:w-auto">
                  {copy.hero.secondary}
                  <EsMark show={spanishPage} />
                </Link>
              </div>
              <ul className="trust-row">
                {copy.hero.trust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div data-hero-mark className="hero-visual relative z-[1]">
              <div className="hero-ribbon-bloom" aria-hidden="true" />
              <Image
                src="/images/studio/hero-ribbon-cutout.png"
                alt=""
                width={850}
                height={1124}
                preload
                sizes="(max-width: 767px) 64vw, (max-width: 1023px) 42vw, 40vw"
                className="hero-ribbon cutout"
              />
              <ThreadNode className="right-[34%] bottom-[10%]" />
            </div>
          </div>
        </section>

        <div className="relative">
          <ThreadNode className="right-[12%] top-1/2" />
          <LogoMarquees label={copy.logos.label} ariaLabel={copy.logos.aria} />
        </div>

        <section className="relative py-14 sm:py-16" aria-labelledby="stats-title">
          <div className={wrap}>
            <p className="section-label">{copy.stats.label}</p>
            <h2 id="stats-title" className={`${h2} max-w-[16ch]`}>
              {copy.stats.title}
            </h2>
            <dl className="stats-band">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <dt className="order-2">{stat.label}</dt>
                  <dd className="stat-value order-1">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ThreadNode className="left-8 bottom-6 hidden lg:block" />
        </section>

        <section id={copy.anchors.work} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="work-title">
          <div className={wrap}>
            <ThreadNode className="left-[8%] top-28 lg:left-[54%]" />
            <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label">{copy.work.label}</p>
                <h2 id="work-title" className={h2}>
                  {copy.work.title}
                </h2>
              </div>
              <Link
                href="/trabajo"
                hrefLang={hrefLang}
                className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)] hover:text-[var(--cream)]"
              >
                {copy.work.index}
                <EsMark show={spanishPage} />
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-8">
              {featured ? (
                <WorkHoverCase
                  item={caseView(featured, locale)}
                  variant="featured"
                  brief={locale === "en" ? { ...CASE_BRIEFS[featured.slug], ...EN_BRIEFS[featured.slug] } : undefined}
                  labels={labels}
                  hrefLang={hrefLang}
                  markSpanish={spanishPage}
                />
              ) : null}
              <div className="grid gap-5 md:grid-cols-2">
                {rest.map((item) => (
                  <WorkHoverCase
                    key={item.slug}
                    item={caseView(item, locale)}
                    brief={locale === "en" ? { ...CASE_BRIEFS[item.slug], ...EN_BRIEFS[item.slug] } : undefined}
                    labels={labels}
                    hrefLang={hrefLang}
                    markSpanish={spanishPage}
                  />
                ))}
              </div>
            </div>
          </div>
          <ThreadNode className="bottom-8 left-8" />
        </section>

        <section
          id={copy.anchors.diagnostic}
          className="relative scroll-mt-28 py-16 sm:py-24"
          aria-labelledby="diag-title"
        >
          <ThreadNode className="left-8 top-[70%]" />
          <div className={wrap}>
            <p className="section-label">{copy.diagnostic.label}</p>
            <h2 id="diag-title" className={`${h2} max-w-[16ch]`}>
              {copy.diagnostic.title}
            </h2>
            <p className="mt-4 max-w-[36rem] text-[1.02rem] leading-7 text-[var(--cream-soft)]">{copy.diagnostic.lede}</p>
            <fieldset className="diag">
              <legend className="sr-only">{copy.diagnostic.legend}</legend>
              <div className="diag-options">
                {pains.map((pain, index) => (
                  <label key={pain.title} className="diag-card">
                    <input type="radio" name="bottleneck" id={`pain-${index}`} defaultChecked={index === 0} />
                    <span className="diag-index">0{index + 1}</span>
                    <span className="diag-title">{pain.title}</span>
                    <span className="diag-body">{pain.body}</span>
                  </label>
                ))}
              </div>
              <div className="diag-results" aria-live="polite">
                {pains.map((pain, index) => (
                  <div key={pain.title} className="diag-panel" data-panel={index}>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                      {copy.diagnostic.servicesLabel}
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {PAIN_SERVICES[index].map((slug) => {
                        const service = services.find((item) => item.slug === slug);
                        if (!service) return null;
                        return (
                          <li key={slug}>
                            <Link href={service.href} hrefLang={hrefLang} className="diag-service">
                              <span className="font-display text-[1.15rem] font-semibold tracking-[-0.03em]">
                                {service.title}
                                <EsMark show={spanishPage} />
                              </span>
                              <span className="mt-1 block text-[0.9rem] leading-6 text-[var(--cream-soft)]">
                                {service.outcome}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    {first ? (
                      <div className="diag-step">
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                          {copy.diagnostic.stepLabel}
                        </p>
                        <p className="mt-2 font-display text-[1.2rem] font-semibold tracking-[-0.03em]">
                          {first.id} · {first.kicker}
                          <span className="mt-1 block text-[0.95rem] font-medium text-[var(--cream-soft)]">
                            {first.title} · {first.time}
                          </span>
                        </p>
                        <p className="mt-2 max-w-[40rem] text-[0.92rem] leading-6 text-[var(--muted)]">{firstBody}</p>
                      </div>
                    ) : null}
                    <a
                      href={BOOKING_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary mt-6 w-full sm:w-auto"
                      data-cal-click
                    >
                      <span>{copy.diagnostic.cta}</span>
                      <ArrowIcon className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        <section id={copy.anchors.services} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="services-title">
          <ThreadNode className="right-8 top-8 hidden lg:block" />
          <ThreadNode className="left-6 top-8 lg:left-10" />
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label">{copy.services.label}</p>
                <h2 id="services-title" className={`${h2} max-w-[16ch]`}>
                  {copy.services.title}
                </h2>
              </div>
              <Link
                href="/servicios"
                hrefLang={hrefLang}
                className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)] hover:text-[var(--cream)]"
              >
                {copy.services.index}
                <EsMark show={spanishPage} />
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <SpotlightGrid className="bento">
              {services.map((item, index) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  hrefLang={hrefLang}
                  data-spot
                  className={`bento-card bento-card-${index}`}
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--accent)]">{item.code}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.35rem,2vw,1.8rem)] font-semibold tracking-[-0.03em]">
                    {item.title}
                    <EsMark show={spanishPage} />
                  </h3>
                  <p className="mt-3 max-w-[36rem] text-[0.95rem] leading-7 text-[var(--cream-soft)]">{item.outcome}</p>
                  <Image
                    src={item.cutout}
                    alt=""
                    width={280}
                    height={200}
                    sizes="(min-width: 1024px) 440px, 88vw"
                    className="bento-cutout"
                  />
                </Link>
              ))}
            </SpotlightGrid>
          </div>
        </section>

        <section id={copy.anchors.global} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="global-title">
          <ThreadNode className="left-2 top-10 sm:left-3 lg:left-4" />
          <div className={wrap}>
            <p className="section-label">{copy.global.label}</p>
            <h2 id="global-title" className={`${h2} max-w-[18ch]`}>
              {copy.global.title}
            </h2>
            <p className="mt-4 max-w-[38rem] text-[1.02rem] leading-7 text-[var(--cream-soft)]">{copy.global.caption}</p>
            <div className="signal-stage">
              <div className="signal-panel">
                <WorldMap label={copy.global.mapAria} />
                <ul className="signal-legend">
                  {copy.global.places.map((place) => (
                    <li key={place.id}>
                      <span className="signal-legend-dot" aria-hidden="true" />
                      <span>
                        {place.name}
                        <span className="text-[var(--muted)]"> · {place.place}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <GlobalClock locale={locale} copy={copy.global.clock} />
            </div>
          </div>
          <ThreadNode className="bottom-6 left-2 sm:left-3 lg:left-4" />
          <ThreadNode className="bottom-6 right-6 hidden lg:block" />
        </section>

        <section id={copy.anchors.process} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="process-title">
          <ThreadNode className="right-8 top-8 hidden lg:block" />
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="section-label">{copy.process.label}</p>
                <h2 id="process-title" className={h2}>
                  {copy.process.title}
                </h2>
              </div>
              <Link
                href="/proceso"
                hrefLang={hrefLang}
                className="inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)] hover:text-[var(--cream)]"
              >
                {copy.process.index}
                <EsMark show={spanishPage} />
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.id} className="reveal relative border-t border-[var(--line-strong)] pt-6">
                  <ThreadNode className={`left-0 lg:left-1/2 ${["top-0", "top-10", "top-2", "top-8"][index] ?? "top-0"}`} />
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {step.id} · {step.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-6 text-[var(--muted)]">{step.time}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="carta-digital" className="relative scroll-mt-28 py-8 sm:py-12">
          <div className={wrap}>
            <div className="offer-band">
              <article className="offer-card" aria-labelledby="carta-title">
                <p className="section-label">{cartaLabel}</p>
                <h2 id="carta-title" className="mt-4 font-display text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.04em]">
                  {cartaTitle}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-7 text-[var(--cream-soft)]">{cartaDeck}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {CARTA_CASOS.map((caso) => (
                    <li
                      key={caso.slug}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-3 text-[0.78rem] text-[var(--cream-soft)]"
                    >
                      <Image
                        src={caso.logo}
                        alt=""
                        width={22}
                        height={22}
                        className={`h-[1.15rem] w-[1.15rem] object-contain ${caso.logoOnDark ? "" : "rounded-sm bg-white p-px"}`}
                      />
                      {caso.name}
                      <span className="text-[var(--muted)]">{caso.place}</span>
                    </li>
                  ))}
                </ul>
                <Link href={CARTA_OFERTA.path} hrefLang={hrefLang} className="btn-ghost mt-6 w-full sm:w-auto">
                  {copy.offers.cartaCta}
                  <EsMark show={spanishPage} />
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </article>
              <article id="inversion" className="offer-card" aria-labelledby="invest-title">
                <p className="section-label">{copy.offers.inversionLabel}</p>
                <h2 id="invest-title" className="mt-4 font-display text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.04em]">
                  {copy.offers.inversionTitle}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-7 text-[var(--cream-soft)]">{copy.offers.inversionDeck}</p>
                <Link href="/inversion" hrefLang={hrefLang} className="btn-ghost mt-6 w-full sm:w-auto">
                  {copy.offers.inversionCta}
                  <EsMark show={spanishPage} />
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            </div>
          </div>
          <ThreadNode className="right-[16%] top-8 hidden lg:block" />
        </section>

        <section id={copy.anchors.team} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="team-title">
          <ThreadNode className="left-8 top-1/2 lg:hidden" />
          <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
            <div>
              <p className="section-label">{copy.team.label}</p>
              <h2 id="team-title" className={`${h2} max-w-[14ch]`}>
                {copy.team.title}
              </h2>
              <p className="mt-5 max-w-[34rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]">{copy.team.body}</p>
              <Link
                href="/equipo"
                hrefLang={hrefLang}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.85rem] text-[var(--cream-soft)] hover:text-[var(--cream)]"
              >
                {copy.team.cta}
                <EsMark show={spanishPage} />
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative">
              <ThreadNode className="left-1/2 top-[40%] hidden lg:block" />
              <Image
                src="/images/studio/mark-equipo-cutout.png"
                alt={copy.team.imageAlt}
                width={1088}
                height={650}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="cutout mx-auto w-full max-w-[38rem]"
              />
            </div>
          </div>
        </section>

        <HomeRadarSection
          kicker={copy.radar.kicker}
          title={copy.radar.title}
          note={copy.radar.note || undefined}
          readLabel={copy.radar.read}
          indexLabel={copy.radar.index}
          coverAlt={copy.radar.coverAlt}
          hrefLang={hrefLang}
        />

        <section id={copy.anchors.faq} className="relative scroll-mt-28 py-16 sm:py-24" aria-labelledby="faq-title">
          <ThreadNode className="right-8 top-10 hidden lg:block" />
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20`}>
            <div>
              <p className="section-label">{copy.faq.label}</p>
              <h2 id="faq-title" className={h2}>
                {copy.faq.title}
              </h2>
              <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-7 text-[var(--cream-soft)]">{copy.faq.lede}</p>
            </div>
            <FaqList items={faqItems} />
          </div>
          <ThreadNode className="bottom-8 left-8" />
        </section>

        <CtaBand
          id="cierre"
          kicker={copy.cta.kicker}
          title={copy.cta.title}
          primaryLabel={copy.cta.primary}
          emailLabel={`${copy.cta.email} ${CONTACT_EMAIL}`}
          emailHref={chrome.emailHref}
          reply={copy.cta.reply}
        />
      </div>
      <StickyCta
        bookLabel={copy.sticky.book}
        bookHref={BOOKING_HREF}
        emailHref={chrome.emailHref}
        emailLabel={copy.sticky.email}
      />
    </div>
  );
}

function caseView(
  item: (typeof CASES)[number],
  locale: LandingLocale,
) {
  if (locale === "es") return item;
  const overlay = EN_CASES[item.slug];
  return {
    ...item,
    industry: overlay.industry,
    title: overlay.title,
    result: overlay.result,
  };
}

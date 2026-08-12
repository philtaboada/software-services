export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-[1440px] px-5 pb-10 pt-32 sm:px-8 lg:px-12">
      <p className="section-label">{kicker}</p>
      <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.05em]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-6 max-w-[38rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">
          {lede}
        </p>
      ) : null}
    </header>
  );
}

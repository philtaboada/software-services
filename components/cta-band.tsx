import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { BOOKING_HREF, CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";

export function CtaBand({
  kicker = "Siguiente paso",
  title = "Cuéntanos qué estás intentando construir.",
}: {
  kicker?: string;
  title?: string;
}) {
  return (
    <section className="relative px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
      <div className="relative mx-auto min-h-[22rem] max-w-[1440px] overflow-hidden rounded-[1.5rem] border border-[var(--line)]">
        <Image
          src="/images/studio/studio-circuit-wave.jpg"
          alt=""
          fill
          sizes="1440px"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#000908]/55" />
        <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <span
            data-thread-node
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-8 h-px w-px"
          />
          <span
            data-thread-node
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-[62%] h-px w-px"
          />
          <p className="section-label">{kicker}</p>
          <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,5.5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.05em]">
            {title}
          </h2>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <a
              data-magnetic
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Agendar llamada 30 min</span>
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a href={CONTACT_EMAIL_HREF} className="btn-ghost">
              Escribir a {CONTACT_EMAIL}
            </a>
          </div>
          <p className="mt-6 text-[0.9rem] text-[var(--cream-soft)]/60">
            Respondemos en menos de 24 h hábiles.
          </p>
        </div>
      </div>
    </section>
  );
}

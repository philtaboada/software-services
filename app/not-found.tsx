import Link from "next/link";
import { BOOKING_HREF } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1440px] flex-col justify-center px-5 py-32 sm:px-8 lg:px-12">
      <p className="section-label">404</p>
      <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.05em]">
        Esta página no está en el mapa.
      </h1>
      <p className="mt-6 max-w-[32rem] text-[1.05rem] leading-8 text-[var(--cream-soft)]/75">
        El trabajo sí. Agenda 30 minutos o mira los casos en producción.
      </p>
      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
        <a
          href={BOOKING_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Agendar llamada 30 min
        </a>
        <Link href="/trabajo" className="btn-ghost">
          Ver trabajo
        </Link>
      </div>
    </section>
  );
}

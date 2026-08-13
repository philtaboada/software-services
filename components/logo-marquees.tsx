import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/content";

type ClientLogo = (typeof CLIENT_LOGOS)[number];

const LOOPS = 4;

function Track({
  items,
  direction,
}: {
  items: readonly ClientLogo[];
  direction: "left" | "right";
}) {
  const sequence = Array.from({ length: LOOPS }, () => items).flat();

  return (
    <div className="logo-marquee" data-direction={direction}>
      <ul className="logo-track">
        {sequence.map((logo, index) => {
          const mark = logo.src.endsWith(".svg") ? (
            <img src={logo.src} alt={logo.name} className="logo-mark" />
          ) : (
            <Image
              src={logo.src}
              alt={logo.name}
              width={220}
              height={64}
              className="logo-mark"
            />
          );
          const href = "href" in logo ? logo.href : undefined;
          return (
            <li key={`${logo.name}-${index}`} className="logo-slot">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-link"
                >
                  {mark}
                </a>
              ) : (
                mark
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function LogoMarquees() {
  return (
    <section aria-label="Empresas con las que hemos trabajado" className="logo-section">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="section-label">En producción</p>
      </div>
      <div className="logo-rows mt-8">
        <Track items={CLIENT_LOGOS} direction="left" />
      </div>
    </section>
  );
}


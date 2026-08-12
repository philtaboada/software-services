"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const STEPS = [
  { id: "wa", title: "WhatsApp", sub: "mensaje nuevo" },
  { id: "ai", title: "Agente IA", sub: "califica el lead" },
  { id: "if", title: "¿Listo?", sub: "router" },
  { id: "crm", title: "CRM", sub: "crea ficha" },
] as const;

function NodeIcon({ id }: { id: (typeof STEPS)[number]["id"] }) {
  if (id === "wa") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4 3.2V15H7.5A2.5 2.5 0 0 1 5 12.5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "ai") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <rect x="7" y="8" width="10" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="10.2" cy="12.2" r="0.9" fill="currentColor" />
        <circle cx="13.8" cy="12.2" r="0.9" fill="currentColor" />
        <path d="M9 6.5 12 4l3 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "if") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d="M12 5v5M8 19v-5h8v5M12 10l6-2M12 10 6 8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <ellipse cx="12" cy="7" rx="6" ry="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 7v10c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 12c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function HeroFlow() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to("[data-hero-float]", {
        y: -8,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: rootRef },
  );

  return (
    <figure
      ref={rootRef}
      data-hero-mark
      tabIndex={0}
      aria-label="Flujo de captura: WhatsApp, agente IA, router y CRM"
      className="hero-stage mx-auto w-full max-w-[42rem] outline-none lg:max-w-none"
    >
      <div data-hero-float>
        <div className="hero-stage__bloom" aria-hidden />
        <div className="hero-stage__window">
          <div className="hero-stage__chrome">
            <span className="hero-stage__dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <p>n8n · captura, califica, seguimiento</p>
          </div>

          <div className="hero-stage__canvas">
            <div className="hero-stage__row">
              {STEPS.map((step, index) => (
                <div key={step.id} className="hero-stage__step">
                  <article
                    className={`hero-stage__node${step.id === "ai" ? " hero-stage__node--accent" : ""}`}
                  >
                    <span className="hero-stage__icon">
                      <NodeIcon id={step.id} />
                    </span>
                    <div>
                      <p>{step.title}</p>
                      <small>{step.sub}</small>
                    </div>
                  </article>
                  {index < STEPS.length - 1 ? (
                    <span className="hero-stage__wire" aria-hidden>
                      <i />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="hero-stage__tool">
              <span className="hero-stage__tool-line" aria-hidden />
              <article className="hero-stage__node hero-stage__node--tool">
                <div>
                  <p>Modelo + memoria</p>
                  <small>contexto del chat en el CRM</small>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

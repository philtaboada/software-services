"use client";

import type { ReactElement } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Variantes de ilustración animada para la sección Proceso (pipeline de trabajo).
 */
export type ProcessVisualVariant =
  | "web-scraping"
  | "ai-automation"
  | "discovery-design"
  | "deploy"
  | "create";

type ProcessPipelineVisualProps = {
  readonly variant: ProcessVisualVariant;
};

/**
 * Mini escenas SVG/CSS animadas con GSAP: se pausan fuera de viewport y respetan prefers-reduced-motion.
 */
export function ProcessPipelineVisual({
  variant,
}: ProcessPipelineVisualProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        if (variant === "web-scraping") {
          const scan = root.querySelector("[data-scan]");
          const rows = root.querySelectorAll("[data-scrape-row]");
          if (scan) {
            tl.fromTo(
              scan,
              { top: "-10%" },
              { top: "105%", duration: 2.4, ease: "none" },
              0,
            );
          }
          if (rows.length) {
            tl.to(
              rows,
              {
                opacity: 0.85,
                duration: 0.45,
                stagger: { each: 0.1, repeat: 1, yoyo: true },
                ease: "sine.inOut",
              },
              0,
            );
          }
        } else if (variant === "ai-automation") {
          const flows = root.querySelectorAll("[data-flow]");
          const core = root.querySelector("[data-core]");
          if (flows.length) {
            tl.to(
              flows,
              {
                strokeOpacity: 0.95,
                duration: 0.45,
                stagger: 0.12,
                repeat: 1,
                yoyo: true,
                ease: "power2.inOut",
              },
              0,
            );
          }
          if (core) {
            tl.to(
              core,
              {
                scale: 1.06,
                duration: 0.55,
                ease: "elastic.out(1,0.6)",
                repeat: 1,
                yoyo: true,
              },
              0,
            );
          }
        } else if (variant === "discovery-design") {
          const frames = root.querySelectorAll("[data-frame]");
          gsap.set(frames, { opacity: 0.35, y: 8 });
          tl.to(frames, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.14,
            ease: "power2.out",
            repeat: 1,
            yoyo: true,
          });
        } else if (variant === "deploy") {
          const upload = root.querySelector("[data-upload]");
          const ring = root.querySelector("[data-ring]");
          if (upload) {
            tl.to(
              upload,
              {
                y: -14,
                duration: 0.75,
                ease: "power2.inOut",
                repeat: 1,
                yoyo: true,
              },
              0,
            );
          }
          if (ring) {
            tl.to(
              ring,
              {
                scale: 1.05,
                opacity: 0.55,
                duration: 0.75,
                ease: "sine.inOut",
                repeat: 1,
                yoyo: true,
                transformOrigin: "160px 100px",
              },
              0,
            );
          }
        } else {
          const sparks = root.querySelectorAll("[data-spark]");
          gsap.set(sparks, { scale: 0.35, opacity: 0.35 });
          tl.to(sparks, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(1.8)",
            repeat: 1,
            yoyo: true,
          });
        }
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            tl.play();
          },
          onLeave: () => {
            tl.pause();
          },
          onEnterBack: () => {
            tl.play();
          },
          onLeaveBack: () => {
            tl.pause();
          },
        });
      }, root);
      return () => {
        ctx.revert();
      };
    },
    { scope: rootRef, dependencies: [variant] },
  );

  const base = "absolute inset-0 h-full w-full";

  if (variant === "web-scraping") {
    return (
      <div
        ref={rootRef}
        className="relative h-36 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-40"
        aria-hidden="true"
      >
        <div className="absolute inset-3 rounded-lg border border-[var(--line-strong)]/40 bg-[var(--background)]/80">
          <div className="absolute left-3 right-3 top-3 h-2 rounded bg-[var(--line)]" />
          <div className="absolute left-3 top-7 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                data-scrape-row
                className="h-1.5 rounded-full bg-[var(--muted-dim)]"
                style={{ width: `${68 + i * 8}%` }}
              />
            ))}
          </div>
          <div
            data-scan
            className="pointer-events-none absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-[var(--accent)]/25 to-transparent"
            style={{ top: "-8%" }}
          />
        </div>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          extracción
        </p>
      </div>
    );
  }

  if (variant === "ai-automation") {
    return (
      <div
        ref={rootRef}
        className="relative h-36 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-40"
        aria-hidden="true"
      >
        <svg className={base} viewBox="0 0 320 160" fill="none">
          <path
            data-flow
            d="M40 80 H120"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <path
            data-flow
            d="M200 80 H280"
            stroke="var(--lime)"
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <path
            data-flow
            d="M160 40 V64"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <path
            data-flow
            d="M160 96 V120"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <rect
            data-core
            x="132"
            y="68"
            width="56"
            height="24"
            rx="6"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="var(--background)"
            style={{ transformOrigin: "160px 80px" }}
          />
          <text
            x="160"
            y="84"
            textAnchor="middle"
            fill="var(--cream-soft)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            AI
          </text>
          <circle cx="40" cy="80" r="5" fill="var(--muted-dim)" />
          <circle cx="280" cy="80" r="5" fill="var(--muted-dim)" />
        </svg>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          orquestación
        </p>
      </div>
    );
  }

  if (variant === "discovery-design") {
    return (
      <div
        ref={rootRef}
        className="relative h-36 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-40"
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center gap-3 px-6">
          <div
            data-frame
            className="h-20 w-14 rounded-md border border-dashed border-[var(--accent)]/50 bg-[var(--background)]/50 opacity-40"
            style={{ transform: "translateY(6px)" }}
          />
          <div
            data-frame
            className="h-24 w-20 rounded-md border border-[var(--line-strong)] bg-[var(--background)]/70 opacity-40"
            style={{ transform: "translateY(6px)" }}
          />
          <div
            data-frame
            className="h-20 w-14 rounded-md border border-dashed border-[var(--lime)]/45 bg-[var(--background)]/50 opacity-40"
            style={{ transform: "translateY(6px)" }}
          />
        </div>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          exploración
        </p>
      </div>
    );
  }

  if (variant === "deploy") {
    return (
      <div
        ref={rootRef}
        className="relative h-36 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-40"
        aria-hidden="true"
      >
        <svg className={base} viewBox="0 0 320 160" fill="none">
          <ellipse
            data-ring
            cx="160"
            cy="100"
            rx="72"
            ry="22"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            style={{ transformOrigin: "160px 100px" }}
          />
          <path
            d="M88 102 Q160 52 232 102"
            stroke="var(--line-strong)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
          />
          <g data-upload>
            <path
              d="M160 118 V62 M140 78 L160 58 L180 78"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          release
        </p>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative h-36 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-40"
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-16 w-16 rounded-2xl border border-[var(--line-strong)] bg-[var(--background)]/90 shadow-[0_0_40px_rgba(46,232,154,0.12)]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              data-spark
              className="absolute h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              style={{
                left: `${50 + 38 * Math.cos((i / 5) * Math.PI * 2)}%`,
                top: `${50 + 38 * Math.sin((i / 5) * Math.PI * 2)}%`,
                transform: "translate(-50%, -50%) scale(0.3)",
                opacity: 0.2,
              }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.65rem] font-mono text-[var(--cream-soft)]">
            OK
          </span>
        </div>
      </div>
      <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
        entrega
      </p>
    </div>
  );
}

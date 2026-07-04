"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DELIVERABLES = [
  { label: "Dominio + SSL", x: "8%", y: "12%", depth: 1.2 },
  { label: "Fotos incluidas", x: "72%", y: "8%", depth: -1.4 },
  { label: "WhatsApp", x: "78%", y: "58%", depth: 1.6 },
  { label: "SEO técnico", x: "4%", y: "72%", depth: -1.1 },
] as const;

export function PresenciaHeroPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const tilt = tiltRef.current;
      const browser = browserRef.current;
      const phone = phoneRef.current;
      const canvas = canvasRef.current;
      const glow = glowRef.current;
      if (!root || !tilt || !browser || !phone || !canvas || !glow) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.set([tilt, browser, phone, canvas, ...gsap.utils.toArray<HTMLElement>(".presencia-hero-chip", root)], {
        force3D: true,
      });
      gsap.set(tilt, { transformPerspective: 1100, transformOrigin: "50% 50%" });
      gsap.set(browser, { transformPerspective: 1100, transformOrigin: "50% 50%" });
      gsap.set(phone, {
        transformPerspective: 900,
        transformOrigin: "85% 90%",
        z: 48,
      });

      const chips = gsap.utils.toArray<HTMLElement>(".presencia-hero-chip", root);
      const state = { nx: 0, ny: 0, active: 0 };
      let raf = 0;

      const idlePhone = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
      idlePhone
        .to(phone, { rotateZ: 2.5, duration: 2.8 })
        .to(phone, { rotateY: -3, duration: 2.4 }, 0)
        .to(phone, { rotateX: 1.5, duration: 3.1 }, 0);

      const apply = () => {
        raf = 0;
        const { nx, ny, active } = state;
        const strength = active;

        gsap.to(tilt, {
          rotateX: ny * -10 * strength,
          rotateY: nx * 10 * strength,
          y: ny * -6 * strength,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(browser, {
          z: 24 * strength,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (strength > 0) {
          idlePhone.pause();
          gsap.to(phone, {
            x: 0,
            y: 0,
            z: 48,
            rotateX: ny * -7 * strength,
            rotateY: nx * 9 * strength,
            rotateZ: nx * 5 * strength,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          idlePhone.resume();
          gsap.to(phone, {
            x: 0,
            y: 0,
            z: 48,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.75,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: () => {
              if (state.active === 0) idlePhone.restart();
            },
          });
        }

        gsap.to(canvas, {
          x: nx * -8 * strength,
          y: ny * -6 * strength,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        chips.forEach((chip, i) => {
          const depth = DELIVERABLES[i]?.depth ?? 1;
          gsap.to(chip, {
            x: nx * 16 * depth * strength,
            y: ny * 14 * depth * strength,
            duration: 0.6 + i * 0.04,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        root.style.setProperty("--hero-mx", String(nx * 12 * strength));
        root.style.setProperty("--hero-my", String(ny * 12 * strength));
      };

      const queueApply = () => {
        if (!raf) raf = window.requestAnimationFrame(apply);
      };

      const onMove = (e: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        state.nx = gsap.utils.clamp(-1, 1, nx);
        state.ny = gsap.utils.clamp(-1, 1, ny);
        state.active = 1;
        root.dataset.active = "true";

        gsap.to(glow, {
          x: e.clientX - rect.left - 130,
          y: e.clientY - rect.top - 130,
          opacity: 0.95,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

        queueApply();
      };

      const onLeave = () => {
        state.nx = 0;
        state.ny = 0;
        state.active = 0;
        root.dataset.active = "false";

        gsap.to(glow, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
        queueApply();
      };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);

      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        idlePhone.kill();
        if (raf) window.cancelAnimationFrame(raf);
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-hero-preview
      className="presencia-hero-preview group relative mx-auto w-full max-w-md cursor-default lg:max-w-none"
    >
      {DELIVERABLES.map((item) => (
        <span
          key={item.label}
          className="presencia-hero-chip pointer-events-none absolute z-20 hidden font-mono text-[0.58rem] uppercase tracking-[0.14em] sm:inline-flex"
          style={{ left: item.x, top: item.y }}
        >
          {item.label}
        </span>
      ))}

      <div ref={tiltRef} className="presencia-hero-tilt presencia-float relative z-10 pb-10 sm:pb-12">
        <div
          ref={browserRef}
          className="presencia-hero-browser relative overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.55)]"
        >
          <div
            ref={glowRef}
            className="presencia-hero-glow pointer-events-none absolute z-0 opacity-0"
            aria-hidden="true"
          />

          <div className="relative z-[1] flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_18%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_12%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)]" />
            </div>
            <div className="mx-auto flex h-7 min-w-0 flex-1 items-center justify-center rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] px-3">
              <span className="truncate font-mono text-[0.62rem] tracking-[0.08em] text-[var(--muted)]">
                tunegocio.com
              </span>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          </div>

          <div ref={canvasRef} className="presencia-hero-canvas relative z-[1] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-[var(--accent)]/90" aria-hidden="true" />
                <span className="h-2 w-14 rounded-full bg-[color-mix(in_srgb,var(--foreground)_14%,transparent)]" />
              </div>
              <div className="hidden items-center gap-2 sm:flex" aria-hidden="true">
                <span className="h-2 w-10 rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
                <span className="h-2 w-10 rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
                <span className="h-2 w-10 rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
              </div>
              <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]">
                WhatsApp
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <div className="h-3 w-[88%] rounded-full bg-[color-mix(in_srgb,var(--foreground)_16%,transparent)]" />
              <div className="h-3 w-[72%] rounded-full bg-[color-mix(in_srgb,var(--accent)_35%,transparent)]" />
              <div className="h-3 w-[56%] rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)]" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg border border-[var(--line)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)]" />
              <div className="h-16 rounded-xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)]" />
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-2.5">
              <div className="space-y-1.5" aria-hidden="true">
                <div className="h-2 w-20 rounded-full bg-[color-mix(in_srgb,var(--foreground)_18%,transparent)]" />
                <div className="h-2 w-28 rounded-full bg-[color-mix(in_srgb,var(--accent)_40%,transparent)]" />
              </div>
              <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                CTA
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={phoneRef}
        className="presencia-hero-phone pointer-events-none absolute bottom-2 right-0 z-30 w-[38%] max-w-[140px] sm:bottom-4 sm:right-2"
      >
        <div className="overflow-hidden rounded-[1.35rem] border-2 border-[var(--line-strong)] bg-[var(--ink)] p-1 shadow-xl">
          <div className="rounded-[1.1rem] bg-[var(--surface)] p-2">
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[color-mix(in_srgb,var(--foreground)_20%,transparent)]" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-[color-mix(in_srgb,var(--accent)_30%,transparent)]" />
              <div className="aspect-square rounded-md bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))]" />
              <div className="h-5 rounded-md bg-[var(--accent)]" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-center font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          Mobile ready
        </p>
      </div>

      <p className="presencia-hero-caption mt-8 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--muted)] lg:text-left">
        Lo que entregamos · no stock · tu marca real
      </p>
    </div>
  );
}

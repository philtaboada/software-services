"use client";

import type { ReactElement } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  computeEffectivePlaybackRate,
  DEFAULT_PROCESS_TUNE,
  processEffectRepeat,
  type ProcessAnimationTune,
} from "@/lib/demo-animation-tuning";

gsap.registerPlugin(ScrollTrigger);

/** Duración de un ciclo completo por escena (lectura cómoda). */
const PROCESS_VIS_CYCLE_SEC = 5;

/** Rellena la timeline hasta `targetSec` sin animar nada visible. */
function padTimelineToTarget(master: gsap.core.Timeline, targetSec: number): void {
  const tail: number = master.duration();
  const gap: number = targetSec - tail;
  if (gap > 0.02) {
    const holder = { n: 0 };
    master.to(holder, { n: 1, duration: gap, ease: "none" });
  }
}

/** Posiciones fijas (sin Math en render → hidratación estable). */
const CREATE_SPARK_POSITIONS: readonly { left: string; top: string }[] = [
  { left: "88%", top: "50%" },
  { left: "61.74%", top: "86.14%" },
  { left: "19.26%", top: "72.34%" },
  { left: "19.26%", top: "27.66%" },
  { left: "61.74%", top: "13.86%" },
];

/** Partículas sutiles solo sobre el “viewport” de la página (coords % del panel izquierdo). */
const WEB_BROWSER_DUST: readonly { left: string; top: string; size: string }[] = [
  { left: "8%", top: "18%", size: "3px" },
  { left: "72%", top: "22%", size: "4px" },
  { left: "55%", top: "55%", size: "3px" },
  { left: "20%", top: "72%", size: "4px" },
];

/**
 * Trayectoria de cada “paquete” de datos: origen → punto medio (arco) → panel de salida.
 * Coordenadas % del contenedor total de la escena (hidratación estable).
 */
const WEB_DATA_PACKETS: readonly {
  startLeft: string;
  startTop: string;
  midLeft: string;
  midTop: string;
  endLeft: string;
  endTop: string;
}[] = [
  { startLeft: "22%", startTop: "38%", midLeft: "48%", midTop: "26%", endLeft: "78%", endTop: "34%" },
  { startLeft: "18%", startTop: "48%", midLeft: "44%", midTop: "34%", endLeft: "78%", endTop: "46%" },
  { startLeft: "24%", startTop: "56%", midLeft: "50%", midTop: "38%", endLeft: "78%", endTop: "56%" },
  { startLeft: "16%", startTop: "64%", midLeft: "42%", midTop: "40%", endLeft: "78%", endTop: "66%" },
];

const WEB_OUTPUT_FIELDS: readonly { key: string; value: string }[] = [
  { key: "titulo", value: '"Plan Pro CRM"' },
  { key: "precio", value: '"S/. 2.450"' },
  { key: "stock", value: "true" },
  { key: "url", value: '"/p/plan-pro"' },
];

export type ProcessVisualVariant =
  | "web-scraping"
  | "ai-automation"
  | "discovery-design"
  | "deploy"
  | "create";

type ProcessPipelineVisualProps = {
  readonly variant: ProcessVisualVariant;
  readonly tune?: Partial<ProcessAnimationTune>;
};

const shell =
  "relative h-56 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-[15.5rem]";

/**
 * Ilustraciones de proceso inspiradas en el kit «Animación Wavys»: chat + contexto,
 * vuelo tipo handoff, rejilla y glows — compactas para la landing.
 */
export function ProcessPipelineVisual({
  variant,
  tune,
}: ProcessPipelineVisualProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const T: ProcessAnimationTune = { ...DEFAULT_PROCESS_TUNE, ...tune };
      const pr = (n: number): number => processEffectRepeat(n, T.heavyEffects);
      const rate: number = computeEffectivePlaybackRate(T.playbackRate, T.smoothMotion);
      const cycleTarget: number = PROCESS_VIS_CYCLE_SEC + T.extraEndPauseSec;
      const ctx = gsap.context(() => {
        const master = gsap.timeline({ repeat: -1, paused: true });
        if (variant === "web-scraping") {
          const scanWrap = root.querySelector("[data-web-scan-wrap]");
          const rows = root.querySelectorAll("[data-web-row]");
          const packets = root.querySelectorAll("[data-web-packet]");
          const outLines = root.querySelectorAll("[data-web-out-line]");
          const outPanel = root.querySelector("[data-web-output-panel]");
          const dust = root.querySelectorAll("[data-browser-dust]");
          const flowArrow = root.querySelector("[data-web-flow-arrow]");
          const hero = root.querySelector("[data-web-hero]");
          const panelDot = root.querySelector("[data-web-panel-dot]");
          const panelBloom = root.querySelector("[data-web-panel-bloom]");
          const statusLine = root.querySelector("[data-web-status]");
          const decoCard = root.querySelector("[data-web-deco-card]");
          if (scanWrap) {
            master.set(scanWrap, { top: "-20%" }, 0);
          }
          if (rows.length) {
            master.set(rows, { clearProps: "backgroundColor,boxShadow,borderLeftColor" }, 0);
          }
          if (outLines.length) {
            master.set(outLines, { opacity: 0.12, x: 10, borderLeftColor: "transparent" }, 0);
          }
          packets.forEach((el, i) => {
            const seg = WEB_DATA_PACKETS[i];
            if (seg) {
              master.set(
                el,
                {
                  left: seg.startLeft,
                  top: seg.startTop,
                  opacity: 0,
                  scale: 0.32,
                  rotation: -16,
                },
                0,
              );
            }
          });
          if (hero) {
            master.set(hero, { borderColor: "var(--line)", boxShadow: "none", scale: 1 }, 0);
          }
          if (panelBloom) {
            master.set(panelBloom, { opacity: 0 }, 0);
          }
          if (panelDot) {
            master.set(panelDot, { scale: 1, opacity: 0.35 }, 0);
          }
          if (statusLine) {
            master.set(statusLine, { opacity: 0.45, color: "var(--muted)" }, 0);
          }
          if (decoCard) {
            master.set(decoCard, { opacity: 0.55, scale: 1 }, 0);
          }
          if (scanWrap) {
            master.fromTo(
              scanWrap,
              { top: "-20%" },
              { top: "122%", duration: 2.75, ease: "none" },
              0,
            );
          }
          if (rows.length) {
            master.to(
              rows,
              {
                backgroundColor: "color-mix(in srgb, var(--accent) 42%, var(--muted-dim))",
                boxShadow: "0 0 14px color-mix(in srgb, var(--accent) 50%, transparent)",
                borderLeftColor: "var(--accent)",
                duration: 0.4,
                stagger: { each: 0.34, repeat: pr(1), yoyo: true },
                ease: "sine.inOut",
              },
              0.1,
            );
          }
          if (hero) {
            master.fromTo(
              hero,
              { borderColor: "var(--line)", boxShadow: "none", scale: 1 },
              {
                borderColor: "color-mix(in srgb, var(--accent) 55%, var(--line))",
                boxShadow: "0 0 20px color-mix(in srgb, var(--accent) 28%, transparent)",
                scale: 1.02,
                duration: 0.38,
                yoyo: true,
                repeat: pr(3),
                ease: "sine.inOut",
              },
              0.45,
            );
          }
          if (decoCard) {
            master.to(
              decoCard,
              {
                opacity: 1,
                scale: 1.03,
                duration: 0.35,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut",
              },
              1.15,
            );
          }
          packets.forEach((el, i) => {
            const seg = WEB_DATA_PACKETS[i];
            if (!seg) {
              return;
            }
            const tStart = 0.68 + i * 0.34;
            master.fromTo(
              el,
              {
                left: seg.startLeft,
                top: seg.startTop,
                opacity: 0,
                scale: 0.32,
                rotation: -16,
              },
              {
                left: seg.midLeft,
                top: seg.midTop,
                opacity: 1,
                scale: 0.9,
                rotation: 6,
                duration: 0.34,
                ease: "power2.out",
              },
              tStart,
            );
            master.to(
              el,
              {
                left: seg.endLeft,
                top: seg.endTop,
                scale: 1,
                rotation: 0,
                duration: 0.38,
                ease: "power2.inOut",
              },
              tStart + 0.34,
            );
            master.to(
              el,
              { opacity: 0, scale: 0.2, duration: 0.22, ease: "power2.in" },
              tStart + 0.68,
            );
          });
          if (statusLine) {
            master.to(
              statusLine,
              { opacity: 1, duration: 0.55, ease: "power2.out" },
              0.18,
            );
            master.to(
              statusLine,
              { color: "var(--accent)", duration: 0.35, yoyo: true, repeat: pr(2), ease: "sine.inOut" },
              0.85,
            );
          }
          if (outLines.length) {
            master.fromTo(
              outLines,
              { opacity: 0.12, x: 10, borderLeftColor: "transparent" },
              {
                opacity: 1,
                x: 0,
                borderLeftColor: "var(--accent)",
                duration: 0.5,
                stagger: 0.32,
                ease: "power2.out",
              },
              0.92,
            );
          }
          if (panelBloom) {
            master.fromTo(
              panelBloom,
              { opacity: 0 },
              {
                opacity: 0.85,
                duration: 0.28,
                yoyo: true,
                repeat: pr(2),
                ease: "sine.inOut",
              },
              1.95,
            );
          }
          if (outPanel) {
            master.fromTo(
              outPanel,
              { scale: 1 },
              {
                scale: 1.035,
                duration: 0.4,
                repeat: pr(3),
                yoyo: true,
                ease: "sine.inOut",
                transformOrigin: "right center",
              },
              0.58,
            );
          }
          if (panelDot) {
            master.fromTo(
              panelDot,
              { scale: 0.75, opacity: 0.35 },
              {
                scale: 1.15,
                opacity: 1,
                duration: 0.45,
                repeat: pr(5),
                yoyo: true,
                ease: "sine.inOut",
              },
              0.15,
            );
          }
          if (flowArrow) {
            master.fromTo(
              flowArrow,
              { opacity: 0.22, x: -5 },
              {
                opacity: 0.92,
                x: 0,
                duration: 0.48,
                repeat: pr(5),
                yoyo: true,
                ease: "sine.inOut",
              },
              0.2,
            );
          }
          if (dust.length) {
            master.to(
              dust,
              {
                opacity: 0.9,
                y: -5,
                duration: 0.52,
                stagger: { each: 0.11, repeat: pr(2), yoyo: true },
                ease: "sine.inOut",
              },
              0,
            );
          }
          master.timeScale(rate);
          padTimelineToTarget(master, cycleTarget);
        } else if (variant === "ai-automation") {
          const dots = root.querySelectorAll("[data-typing-dot]");
          const userB = root.querySelector("[data-bubble-user]");
          const typingWrap = root.querySelector("[data-typing-wrap]");
          const botB = root.querySelector("[data-bubble-bot]");
          const ctxCard = root.querySelector("[data-context-card]");
          const pulse = root.querySelector("[data-wa-pulse]");
          const railSteps = root.querySelectorAll("[data-rail-step]");
          const toolChips = root.querySelectorAll("[data-tool-chip]");
          const latencyEl = root.querySelector("[data-ia-latency]");
          const queueBar = root.querySelector("[data-ia-queue-fill]");
          master.fromTo(
            userB,
            { x: 22, opacity: 0, scale: 0.94 },
            { x: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out" },
            0,
          );
          if (railSteps.length) {
            master.fromTo(
              railSteps,
              {
                backgroundColor: "transparent",
                color: "var(--muted)",
                borderColor: "transparent",
              },
              {
                backgroundColor: "color-mix(in srgb, var(--accent) 16%, transparent)",
                color: "var(--accent)",
                borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)",
                duration: 0.38,
                stagger: 0.48,
                ease: "power2.out",
              },
              0.35,
            );
          }
          if (queueBar) {
            master.fromTo(
              queueBar,
              { scaleX: 0.08, opacity: 0.5 },
              { scaleX: 1, opacity: 1, duration: 1.65, ease: "power1.inOut" },
              0.45,
            );
          }
          if (typingWrap) {
            master.fromTo(
              typingWrap,
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" },
              0.78,
            );
            master.to(
              typingWrap,
              { autoAlpha: 0, y: -8, scale: 0.96, duration: 0.28, ease: "power2.in" },
              1.88,
            );
          }
          master.to(
            dots,
            {
              y: -5,
              duration: 0.34,
              stagger: { each: 0.14, repeat: pr(3), yoyo: true },
              ease: "sine.inOut",
            },
            0.92,
          );
          master.fromTo(
            botB,
            { autoAlpha: 0, y: 14, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "back.out(1.35)" },
            2.02,
          );
          if (toolChips.length) {
            master.fromTo(
              toolChips,
              { autoAlpha: 0, y: 6 },
              { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
              2.35,
            );
          }
          if (latencyEl) {
            master.fromTo(
              latencyEl,
              { autoAlpha: 0, scale: 0.9 },
              { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)" },
              2.55,
            );
          }
          master.fromTo(
            ctxCard,
            { x: 18, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.72, ease: "power2.out" },
            3.05,
          );
          master.to(
            ctxCard,
            {
              scale: 1.03,
              duration: 0.5,
              repeat: pr(1),
              yoyo: true,
              ease: "sine.inOut",
              transformOrigin: "100% 50%",
            },
            3.95,
          );
          if (pulse) {
            master.fromTo(
              pulse,
              { scale: 0.35, opacity: 0.55 },
              { scale: 2.2, opacity: 0, duration: 1.15, ease: "power2.out" },
              0.55,
            );
            master.fromTo(
              pulse,
              { scale: 0.35, opacity: 0.45 },
              { scale: 2.5, opacity: 0, duration: 1.2, ease: "power2.out" },
              1.95,
            );
          }
          master.timeScale(rate);
          padTimelineToTarget(master, cycleTarget);
        } else if (variant === "discovery-design") {
          const grid = root.querySelector("[data-disc-grid]");
          const brief = root.querySelector("[data-disc-brief]");
          const insights = root.querySelector("[data-disc-insights]");
          const notes = root.querySelectorAll("[data-disc-note]");
          const artboard = root.querySelector("[data-disc-artboard]");
          const wire = root.querySelector("[data-disc-wire]");
          const hifi = root.querySelector("[data-disc-hifi]");
          const cursor = root.querySelector("[data-disc-cursor]");
          if (brief) {
            master.set(brief, { autoAlpha: 0, x: -14 }, 0);
          }
          if (insights) {
            master.set(insights, { autoAlpha: 0, y: 12 }, 0);
          }
          if (notes.length) {
            master.set(notes, { autoAlpha: 0, scale: 0.9 }, 0);
          }
          if (artboard) {
            master.set(artboard, { autoAlpha: 0, scale: 0.94 }, 0);
          }
          if (wire) {
            master.set(wire, { autoAlpha: 0, filter: "none" }, 0);
          }
          if (hifi) {
            master.set(hifi, { autoAlpha: 0, y: 0, boxShadow: "none" }, 0);
          }
          if (cursor) {
            master.set(cursor, { autoAlpha: 0, left: "6%", top: "74%" }, 0);
          }
          master.fromTo(
            grid,
            { opacity: 0.08 },
            {
              opacity: 0.36,
              duration: 2.2,
              repeat: pr(1),
              yoyo: true,
              ease: "sine.inOut",
            },
            0,
          );
          if (brief) {
            master.fromTo(
              brief,
              { autoAlpha: 0, x: -14 },
              { autoAlpha: 1, x: 0, duration: 0.55, ease: "power2.out" },
              0.12,
            );
          }
          if (insights) {
            master.fromTo(
              insights,
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
              0.42,
            );
          }
          if (notes.length) {
            master.fromTo(
              notes,
              { autoAlpha: 0, scale: 0.9 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.42,
                stagger: 0.14,
                ease: "back.out(1.25)",
              },
              0.52,
            );
          }
          if (artboard) {
            master.fromTo(
              artboard,
              { autoAlpha: 0, scale: 0.94 },
              { autoAlpha: 1, scale: 1, duration: 0.68, ease: "power3.out" },
              0.32,
            );
          }
          if (wire) {
            master.fromTo(
              wire,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.48, ease: "power2.out" },
              1.02,
            );
          }
          if (cursor) {
            master.fromTo(
              cursor,
              { left: "6%", top: "74%", autoAlpha: 0 },
              { left: "12%", top: "46%", autoAlpha: 1, duration: 0.42, ease: "power2.out" },
              0.18,
            );
            master.to(
              cursor,
              { left: "34%", top: "42%", duration: 0.62, ease: "power1.inOut" },
              0.88,
            );
            master.to(
              cursor,
              { left: "58%", top: "40%", duration: 0.78, ease: "power1.inOut" },
              1.68,
            );
            master.to(cursor, { autoAlpha: 0, duration: 0.28, ease: "power2.in" }, 3.35);
          }
          if (wire && hifi) {
            master.to(
              wire,
              { autoAlpha: 0.2, filter: "blur(1px)", duration: 0.52, ease: "power2.in" },
              2.28,
            );
            master.fromTo(
              hifi,
              { autoAlpha: 0, y: 8 },
              { autoAlpha: 1, y: 0, duration: 0.78, ease: "power2.out" },
              2.38,
            );
            master.to(
              hifi,
              {
                boxShadow: "0 0 24px color-mix(in srgb, var(--accent) 28%, transparent)",
                duration: 0.45,
                yoyo: true,
                repeat: pr(1),
                ease: "sine.inOut",
              },
              3.12,
            );
          }
          master.timeScale(rate);
          padTimelineToTarget(master, cycleTarget);
        } else if (variant === "deploy") {
          const card = root.querySelector("[data-deploy-card]");
          const trail = root.querySelectorAll("[data-deploy-trail]");
          const ring = root.querySelector("[data-deploy-ring]");
          const ring2 = root.querySelector("[data-deploy-ring-2]");
          const cloud = root.querySelector("[data-deploy-cloud]");
          const cloudCore = root.querySelector("[data-deploy-cloud-core]");
          const particles = root.querySelectorAll("[data-deploy-particle]");
          const arc = root.querySelector("[data-deploy-arc]");
          const live = root.querySelector("[data-deploy-live]");
          const steps = root.querySelectorAll("[data-deploy-step]");
          if (card) {
            master.set(card, { left: "7%", top: "76%", scale: 0.58, opacity: 0, rotation: -10 }, 0);
          }
          if (cloud) {
            master.set(cloud, { y: 0, scale: 1 }, 0);
          }
          if (cloudCore) {
            master.set(cloudCore, { scale: 1 }, 0);
          }
          if (live) {
            master.set(live, { autoAlpha: 0, scale: 0.82 }, 0);
          }
          if (arc) {
            master.set(arc, { strokeDashoffset: 360 }, 0);
          }
          if (steps.length) {
            master.set(steps, { color: "var(--muted)", borderColor: "color-mix(in srgb, var(--line) 100%, transparent)" }, 0);
          }
          if (steps.length) {
            master.to(
              steps,
              {
                color: "var(--cream-soft)",
                borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))",
                duration: 0.35,
                stagger: 0.38,
                ease: "power2.out",
              },
              0.08,
            );
          }
          if (arc) {
            master.to(
              arc,
              { strokeDashoffset: 0, opacity: 0.55, duration: 1.55, ease: "power1.inOut" },
              0.12,
            );
            master.to(arc, { opacity: 0.22, duration: 0.45, ease: "power2.in" }, 1.85);
          }
          if (card) {
            master.fromTo(
              card,
              { left: "7%", top: "76%", scale: 0.58, opacity: 0, rotation: -10 },
              {
                left: "22%",
                top: "58%",
                scale: 0.82,
                opacity: 1,
                rotation: -4,
                duration: 0.55,
                ease: "power2.out",
              },
              0.05,
            );
            master.to(
              card,
              {
                left: "40%",
                top: "38%",
                scale: 0.95,
                rotation: 2,
                duration: 0.65,
                ease: "power1.inOut",
              },
              0.55,
            );
            master.to(
              card,
              {
                left: "54%",
                top: "26%",
                scale: 0.88,
                rotation: 0,
                duration: 0.55,
                ease: "power2.inOut",
              },
              1.12,
            );
            master.to(
              card,
              {
                left: "62%",
                top: "22%",
                scale: 0.28,
                opacity: 0,
                duration: 0.48,
                ease: "power2.in",
              },
              1.62,
            );
            master.set(
              card,
              { left: "7%", top: "76%", scale: 0.58, opacity: 0, rotation: -10 },
              2.35,
            );
          }
          if (particles.length) {
            master.fromTo(
              particles,
              { attr: { cx: 48, cy: 172 }, opacity: 0.65 },
              {
                attr: { cx: 232, cy: 54 },
                opacity: 0,
                duration: 1.05,
                stagger: 0.09,
                ease: "power2.in",
              },
              0.42,
            );
          }
          if (trail.length) {
            master.fromTo(
              trail,
              { opacity: 0.6, scale: 0.45 },
              {
                opacity: 0,
                scale: 2.1,
                duration: 1.25,
                stagger: 0.18,
                ease: "power2.out",
              },
              0.18,
            );
          }
          if (ring) {
            master.fromTo(
              ring,
              { scale: 0.65, opacity: 0.6 },
              { scale: 1.55, opacity: 0, duration: 1.45, ease: "power2.out" },
              0.35,
            );
            master.fromTo(
              ring,
              { scale: 0.5, opacity: 0.75 },
              { scale: 1.35, opacity: 0, duration: 1.1, ease: "power2.out" },
              1.68,
            );
          }
          if (ring2) {
            master.fromTo(
              ring2,
              { scale: 0.55, opacity: 0.45 },
              { scale: 1.85, opacity: 0, duration: 1.65, ease: "power3.out" },
              1.58,
            );
          }
          if (cloudCore) {
            master.to(
              cloudCore,
              { scale: 1.08, duration: 0.32, ease: "power2.out", transformOrigin: "50% 55%" },
              1.62,
            );
            master.to(
              cloudCore,
              { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)", transformOrigin: "50% 55%" },
              1.9,
            );
          }
          if (cloud) {
            master.to(
              cloud,
              { y: -4, duration: 2.35, ease: "sine.inOut", yoyo: true, repeat: 1 },
              0,
            );
          }
          if (live) {
            master.fromTo(
              live,
              { autoAlpha: 0, scale: 0.75, y: 8 },
              { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" },
              1.78,
            );
            master.to(
              live,
              { autoAlpha: 0.92, duration: 0.35, yoyo: true, repeat: pr(3), ease: "sine.inOut" },
              2.45,
            );
          }
          master.timeScale(rate);
          padTimelineToTarget(master, cycleTarget);
        } else {
          const sparks = root.querySelectorAll("[data-spark]");
          const check = root.querySelector("[data-create-check]");
          const burst = root.querySelectorAll("[data-create-burst]");
          master.fromTo(
            burst,
            { scale: 0.42, opacity: 0.55 },
            {
              scale: 1.45,
              opacity: 0,
              duration: 1.4,
              stagger: 0.22,
              ease: "power2.out",
            },
            0,
          );
          gsap.set(sparks, { scale: 0.35, opacity: "0.35" });
          master.to(
            sparks,
            {
              scale: 1,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "back.out(1.8)",
              repeat: pr(2),
              yoyo: true,
            },
            0.1,
          );
          if (check && check instanceof SVGPathElement) {
            const len = check.getTotalLength();
            gsap.set(check, { strokeDasharray: len, strokeDashoffset: len });
            master.to(
              check,
              { strokeDashoffset: 0, duration: 1.25, ease: "power2.out" },
              0.25,
            );
            master.to(
              check,
              { strokeDashoffset: len, duration: 0.85, ease: "power2.in" },
              3.05,
            );
          }
          master.timeScale(rate);
          padTimelineToTarget(master, cycleTarget);
        }
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            master.play();
          },
          onLeave: () => {
            master.pause();
          },
          onEnterBack: () => {
            master.play();
          },
          onLeaveBack: () => {
            master.pause();
          },
        });
      }, root);
      return () => {
        ctx.revert();
      };
    },
    { scope: rootRef, dependencies: [variant, tune] },
  );

  if (variant === "web-scraping") {
    return (
      <div ref={rootRef} className={shell} aria-hidden="true">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_35%_45%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]" />
        <div className="absolute inset-2 flex min-h-0 gap-1 sm:gap-1.5 md:inset-2.5 md:gap-2">
          <div className="relative flex min-h-0 min-w-0 flex-[1.12] flex-col overflow-hidden rounded-lg border border-[var(--line-strong)]/60 bg-[var(--background)]/95 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--line)_60%,transparent)]">
            <div className="flex shrink-0 items-center gap-1 border-b border-[var(--line)] px-2 py-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f57]/85" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#febc2e]/85" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#28c840]/85" />
              <div className="ml-1.5 min-w-0 flex-1 truncate rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[0.48rem] text-[var(--muted)]">
                https://tienda.ejemplo.com/plan-pro
              </div>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden px-2 pb-2 pt-2">
              {WEB_BROWSER_DUST.map((d, i) => (
                <span
                  key={i}
                  data-browser-dust
                  className="pointer-events-none absolute z-[1] rounded-full bg-[var(--accent)] opacity-35 shadow-[0_0_8px_var(--accent)]"
                  style={{
                    left: d.left,
                    top: d.top,
                    width: d.size,
                    height: d.size,
                  }}
                />
              ))}
              <p className="relative z-[2] mb-0.5 font-mono text-[0.45rem] uppercase tracking-[0.2em] text-[var(--muted-dim)]">
                DOM · vista lectura
              </p>
              <p
                data-web-status
                className="relative z-[2] mb-2 font-mono text-[0.38rem] text-[var(--muted)]"
              >
                Extrayendo nodos · selectores activos
              </p>
              <div
                data-web-hero
                className="relative z-[2] mb-2 rounded-lg border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_88%,var(--background))] p-1.5 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--line)_50%,transparent)]"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="h-1.5 flex-1 rounded bg-[var(--cream-soft)]/18" />
                  <span className="shrink-0 rounded bg-[var(--accent)]/25 px-1 py-px font-mono text-[0.32rem] uppercase tracking-wider text-[var(--accent)]">
                    card
                  </span>
                </div>
                <div className="mt-1.5 flex items-end justify-between gap-1">
                  <div className="space-y-0.5">
                    <div className="h-1 w-14 rounded bg-[var(--muted-dim)]/65" />
                    <div className="h-0.5 w-10 rounded bg-[var(--muted-dim)]/45" />
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="rounded px-1 py-px font-mono text-[0.42rem] font-semibold text-[var(--accent)]">
                      S/. 2.450
                    </span>
                    <span className="h-1 w-7 rounded bg-[var(--lime)]/35" />
                  </div>
                </div>
              </div>
              <div className="relative z-[2] flex min-h-0 gap-2 pr-1">
                <div className="min-w-0 flex-1 space-y-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      data-web-row
                      className="h-2 rounded-md border-l-2 border-transparent bg-[var(--muted-dim)]/55"
                      style={{ width: `${48 + i * 8}%` }}
                    />
                  ))}
                </div>
                <div
                  data-web-deco-card
                  className="pointer-events-none mt-0.5 w-[30%] max-w-[4.25rem] shrink-0 rounded-md border border-[var(--line)] bg-[var(--surface-2)]/95 p-1 shadow-sm sm:w-[26%]"
                >
                  <div className="font-mono text-[0.3rem] uppercase tracking-wider text-[var(--muted)]">
                    aside
                  </div>
                  <div className="mt-0.5 h-1.5 w-[75%] rounded bg-[var(--muted-dim)]/70" />
                  <div className="mt-1 h-1 w-[50%] rounded bg-[var(--muted-dim)]/50" />
                  <div className="mt-1 flex gap-0.5">
                    <div className="h-1.5 flex-1 rounded-sm bg-[var(--accent)]/20" />
                    <div className="h-1.5 w-3 rounded-sm bg-[var(--teal)]/25" />
                  </div>
                </div>
              </div>
              <div
                data-web-scan-wrap
                className="pointer-events-none absolute inset-x-0 z-[18]"
                style={{ top: "-20%" }}
              >
                <div className="relative h-14 w-full">
                  <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] shadow-[0_0_14px_var(--accent),0_0_28px_color-mix(in_srgb,var(--accent)_40%,transparent)]" />
                  <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--accent)]/50 via-[var(--accent)]/14 to-transparent" />
                  <div className="absolute left-[12%] top-1 h-1 w-1 rounded-full bg-[var(--cream-soft)]/90 shadow-[0_0_6px_var(--accent)]" />
                  <div className="absolute right-[18%] top-2 h-0.5 w-0.5 rounded-full bg-[var(--lime)]/90" />
                </div>
              </div>
            </div>
          </div>
          <div
            data-web-flow-arrow
            className="pointer-events-none flex w-5 shrink-0 items-center justify-center self-center text-[var(--accent)] md:w-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 md:h-7 md:w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 7 6-7 6" />
            </svg>
          </div>
          <div
            data-web-output-panel
            className="relative flex w-[34%] shrink-0 flex-col overflow-hidden rounded-lg border border-[var(--accent)]/50 bg-[var(--ink)] p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] md:w-[32%]"
          >
            <div
              data-web-panel-bloom
              className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_90%_70%_at_70%_20%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_65%)] opacity-0"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_80%_0%,color-mix(in_srgb,var(--accent)_12%,transparent),transparent)] opacity-80" />
            <div className="relative flex items-center gap-1.5">
              <span
                data-web-panel-dot
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lime)] opacity-35 shadow-[0_0_8px_var(--lime)]"
              />
              <span className="font-mono text-[0.38rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                stream · json
              </span>
            </div>
            <div className="relative mt-1 font-mono text-[0.48rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Datos extraídos
            </div>
            <div className="relative mt-1.5 text-[0.4rem] leading-relaxed text-[var(--muted)]">
              {`{`}
            </div>
            <div className="relative mt-1 flex flex-1 flex-col gap-1.5 overflow-hidden pl-0.5">
              {WEB_OUTPUT_FIELDS.map((field, i) => (
                <div
                  key={field.key}
                  data-web-out-line
                  className="border-l-2 border-transparent pl-1.5 font-mono text-[0.42rem] leading-snug text-[var(--cream-soft)] opacity-[0.12]"
                >
                  <span className="text-[var(--teal)]">{field.key}</span>
                  <span className="text-[var(--muted)]">: </span>
                  <span className="text-[var(--accent-soft)]">{field.value}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-1 text-[0.4rem] leading-relaxed text-[var(--muted)]">
              {`}`}
            </div>
            <div className="relative mt-1.5 border-t border-[var(--line)] pt-1.5 font-mono text-[0.4rem] text-[var(--muted)]">
              → normalizado · listo para pipeline
            </div>
          </div>
        </div>
        {WEB_DATA_PACKETS.map((pkt, i) => (
          <div
            key={i}
            data-web-packet
            className="pointer-events-none absolute z-20 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_18%,var(--background))] opacity-0 shadow-[0_0_16px_color-mix(in_srgb,var(--accent)_55%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--cream)_25%,transparent)]"
            style={{ left: pkt.startLeft, top: pkt.startTop }}
          >
            <span className="font-mono text-[0.34rem] font-bold leading-none text-[var(--accent)]">
              {`{ }`}
            </span>
          </div>
        ))}
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          extracción
        </p>
      </div>
    );
  }

  if (variant === "ai-automation") {
    return (
      <div ref={rootRef} className={shell} aria-hidden="true">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--teal)_14%,transparent),transparent)]" />
        <div
          data-wa-pulse
          className="pointer-events-none absolute left-[22%] top-[56%] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent)] opacity-0 sm:left-[20%] sm:top-[54%]"
        />
        <div className="absolute inset-2.5 flex flex-col gap-2 sm:flex-row md:gap-3">
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--background)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--line)_80%,transparent)]">
            <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-2">
              <div className="h-7 w-7 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--teal),var(--accent))]" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.62rem] font-semibold text-[var(--cream)]">
                  Wavys Agent
                </div>
                <div className="text-[0.5rem] text-[var(--muted)]">
                  <span className="text-[var(--accent)]">●</span> en línea · automatización
                </div>
              </div>
            </div>
            <div
              data-ia-rail
              className="flex shrink-0 flex-wrap items-center gap-x-1.5 gap-y-1 border-b border-[var(--line)] bg-[var(--surface)] px-2 py-1.5"
            >
              {[
                ["Entrada", "msg"],
                ["Razonamiento", "ia"],
                ["Acción", "out"],
              ].map(([label, key]) => (
                <span key={key} className="flex items-center gap-1.5">
                  <span
                    data-rail-step
                    className="rounded-md border border-transparent px-1.5 py-0.5 font-mono text-[0.38rem] uppercase tracking-[0.12em] text-[var(--muted)]"
                  >
                    {label}
                  </span>
                  {key !== "out" && (
                    <span className="text-[0.5rem] text-[var(--muted-dim)]" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="relative h-1 w-full shrink-0 overflow-hidden bg-[var(--surface-2)]">
              <div
                data-ia-queue-fill
                className="h-full w-full origin-left scale-x-[0.08] bg-[linear-gradient(90deg,var(--teal),var(--accent))] opacity-50"
              />
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden bg-[var(--surface)] p-2">
              <div
                data-bubble-user
                className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1.5 text-[0.58rem] leading-snug text-[var(--cream-soft)]"
              >
                Cotización 5 licencias…
              </div>
              <div
                data-typing-wrap
                className="invisible max-w-[90%] self-start"
              >
                <p className="mb-1 pl-0.5 font-mono text-[0.42rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  Agente escribiendo
                </p>
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      data-typing-dot
                      className="h-2 w-2 rounded-full bg-[var(--muted)]"
                    />
                  ))}
                </div>
              </div>
              <div
                data-bubble-bot
                className="invisible max-w-[94%] self-start rounded-2xl rounded-tl-md bg-[linear-gradient(135deg,var(--accent),var(--lime))] px-2.5 py-1.5 text-[0.58rem] font-semibold leading-snug text-[var(--ink)] shadow-[0_4px_20px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
              >
                Listo: S/. 2.450/mes + propuesta base.
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span
                    data-tool-chip
                    className="invisible rounded-md border border-[var(--ink)]/25 bg-[var(--ink)]/10 px-1.5 py-0.5 text-[0.4rem] font-mono font-normal text-[var(--ink)]/90"
                  >
                    tool · cotizar
                  </span>
                  <span
                    data-tool-chip
                    className="invisible rounded-md border border-[var(--ink)]/25 bg-[var(--ink)]/10 px-1.5 py-0.5 text-[0.4rem] font-mono font-normal text-[var(--ink)]/90"
                  >
                    sync · CRM
                  </span>
                </div>
              </div>
              <div
                data-ia-latency
                className="pointer-events-none invisible absolute bottom-2 right-2 z-10 rounded-full border border-[var(--accent)]/50 bg-[var(--background)]/95 px-2 py-0.5 font-mono text-[0.42rem] text-[var(--accent)] shadow-[0_0_16px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
              >
                IA · ~4.2s
              </div>
            </div>
          </div>
          <div
            data-context-card
            className="flex w-full shrink-0 flex-col rounded-xl border border-[var(--accent)]/35 bg-[var(--background)]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:w-[38%]"
          >
            <div className="font-mono text-[0.45rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Contexto inferido
            </div>
            {[
              ["Plan", "Pro"],
              ["Urgencia", "Alta"],
              ["Canal", "Chat"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="mt-1.5 flex justify-between gap-2 border-b border-[var(--line)] pb-1 text-[0.55rem] last:border-0"
              >
                <span className="text-[var(--muted)]">{k}</span>
                <span className="font-medium text-[var(--cream)]">{v}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-1 rounded-md border border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-1.5 py-1 text-[0.5rem] font-semibold text-[var(--accent)]">
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Lead listo → pipeline
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          orquestación
        </p>
      </div>
    );
  }

  if (variant === "discovery-design") {
    return (
      <div ref={rootRef} className={shell} aria-hidden="true">
        <div
          data-disc-grid
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, var(--line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--line) 1px, transparent 1px)`,
            backgroundSize: "14px 14px",
            maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          }}
        />
        <div className="absolute inset-2 flex min-h-0 flex-col gap-1.5 sm:flex-row sm:gap-2">
          <div
            data-disc-brief
            className="invisible flex max-h-full w-full shrink-0 flex-col rounded-lg border border-[var(--line)] bg-[var(--background)]/92 p-2 shadow-sm sm:w-[30%]"
          >
            <span className="font-mono text-[0.4rem] uppercase tracking-[0.16em] text-[var(--accent)]">
              Brief
            </span>
            <p className="mt-1 text-[0.52rem] font-medium leading-snug text-[var(--cream-soft)]">
              Landing SaaS: pricing claro, FAQ y captación de leads.
            </p>
            <ul className="mt-1.5 space-y-0.5 border-t border-[var(--line)] pt-1.5 text-[0.45rem] leading-tight text-[var(--muted)]">
              <li>Hero con propuesta de valor</li>
              <li>Tabla de planes (3 columnas)</li>
              <li>FAQ + CTA contacto</li>
            </ul>
          </div>
          <div
            data-disc-insights
            className="invisible flex max-h-full w-full shrink-0 flex-col gap-1 rounded-lg border border-[var(--lime)]/35 bg-[color-mix(in_srgb,var(--lime)_6%,var(--background))] p-2 sm:w-[26%]"
          >
            <span className="font-mono text-[0.4rem] uppercase tracking-[0.16em] text-[var(--lime)]">
              Discovery
            </span>
            <div
              data-disc-note
              className="invisible rounded-md border border-[var(--line)] bg-[var(--surface)] px-1.5 py-1 text-[0.42rem] leading-snug text-[var(--cream-soft)]"
            >
              <span className="font-mono text-[0.35rem] text-[var(--muted)]">Pain · </span>
              comparar precios sin fricción
            </div>
            <div
              data-disc-note
              className="invisible rounded-md border border-[var(--line)] bg-[var(--surface)] px-1.5 py-1 text-[0.42rem] leading-snug text-[var(--cream-soft)]"
            >
              <span className="font-mono text-[0.35rem] text-[var(--muted)]">Decisión · </span>
              3 planes + un solo CTA primario
            </div>
          </div>
          <div
            data-disc-artboard
            className="invisible relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--background)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--line)_70%,transparent)]"
          >
            <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-[var(--line)] bg-[var(--surface-2)] px-2">
              <span className="h-2 w-2 rounded-full bg-[var(--muted-dim)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--muted-dim)]" />
              <span className="ml-1 font-mono text-[0.38rem] text-[var(--muted)]">
                Artboard · landing v2
              </span>
            </div>
            <div className="relative min-h-0 flex-1 p-1.5 sm:p-2">
              <div
                data-disc-wire
                className="invisible absolute inset-1.5 z-0 flex flex-col gap-1 sm:inset-2 sm:gap-1.5"
              >
                <div className="h-3 w-[62%] rounded border border-dashed border-[var(--muted)] bg-transparent sm:h-3.5" />
                <div className="h-2 w-[48%] rounded border border-dashed border-[var(--muted-dim)] bg-transparent" />
                <div className="mt-0.5 flex gap-1 sm:gap-1.5">
                  <div className="h-11 flex-1 rounded border border-dashed border-[var(--muted)] sm:h-12" />
                  <div className="h-11 flex-1 rounded border border-dashed border-[var(--muted)] sm:h-12" />
                  <div className="h-11 flex-1 rounded border border-dashed border-[var(--muted)] sm:h-12" />
                </div>
                <div className="mt-0.5 h-6 rounded border border-dashed border-[var(--muted-dim)]" />
              </div>
              <div
                data-disc-hifi
                className="invisible absolute inset-1.5 z-[1] flex flex-col gap-1 rounded-md sm:inset-2 sm:gap-1.5"
              >
                <div className="h-7 shrink-0 rounded-md bg-[linear-gradient(100deg,var(--teal),var(--accent)_45%,var(--lime)_95%)] opacity-95 shadow-sm sm:h-8">
                  <div className="flex h-full items-end px-2 pb-1">
                    <div className="h-1.5 w-[40%] rounded-sm bg-[var(--ink)]/35" />
                  </div>
                </div>
                <div className="flex min-h-0 flex-1 gap-1 sm:gap-1.5">
                  {[
                    { border: "var(--line)", accent: "var(--muted)" },
                    { border: "var(--accent)", accent: "var(--accent)" },
                    { border: "var(--lime)", accent: "var(--lime)" },
                  ].map((tier, i) => (
                    <div
                      key={i}
                      className="flex min-w-0 flex-1 flex-col rounded-md border bg-[var(--surface)] p-1 shadow-sm"
                      style={{ borderColor: tier.border }}
                    >
                      <div
                        className="mx-auto h-1 w-[55%] rounded-full"
                        style={{ backgroundColor: tier.accent }}
                      />
                      <div className="mt-1 space-y-0.5 px-0.5">
                        <div className="h-0.5 w-full rounded bg-[var(--line)]" />
                        <div className="h-0.5 w-[85%] rounded bg-[var(--muted-dim)]" />
                        <div className="h-0.5 w-[70%] rounded bg-[var(--muted-dim)]" />
                      </div>
                      <div
                        className="mx-auto mt-auto h-2 w-[70%] rounded-sm"
                        style={{ backgroundColor: tier.accent, opacity: 0.45 }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex h-5 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--accent)_18%,var(--surface))] sm:h-6">
                  <span className="font-mono text-[0.38rem] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Solicitar demo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-disc-cursor
          className="pointer-events-none absolute z-10 h-4 w-4 rounded-sm border-2 border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
          style={{ left: "6%", top: "74%" }}
        />
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          brief → discovery → UI
        </p>
      </div>
    );
  }

  if (variant === "deploy") {
    return (
      <div ref={rootRef} className={shell} aria-hidden="true">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_72%_28%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_55%),radial-gradient(circle_at_18%_88%,color-mix(in_srgb,var(--teal)_10%,transparent),transparent_50%)]" />
        <div className="pointer-events-none absolute right-[8%] top-[9%] flex flex-col items-end gap-0.5">
          <div
            data-deploy-live
            className="invisible rounded-full border border-[var(--lime)]/60 bg-[color-mix(in_srgb,var(--lime)_12%,var(--background))] px-2 py-0.5 font-mono text-[0.48rem] font-bold uppercase tracking-[0.2em] text-[var(--lime)] shadow-[0_0_20px_color-mix(in_srgb,var(--lime)_35%,transparent)]"
          >
            Live
          </div>
          <span className="font-mono text-[0.38rem] text-[var(--muted)]">edge · prod</span>
        </div>
        <div className="absolute left-2 top-2 z-[1] w-[34%] max-w-[7.5rem] rounded-lg border border-[var(--line)] bg-[var(--background)]/92 p-1.5 shadow-sm backdrop-blur-[2px]">
          <div className="font-mono text-[0.38rem] uppercase tracking-[0.18em] text-[var(--accent)]">
            Pipeline
          </div>
          <div className="mt-1 space-y-1">
            {["git push", "build · next", "deploy edge"].map((label) => (
              <div
                key={label}
                data-deploy-step
                className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-1.5 py-1 font-mono text-[0.42rem] text-[var(--muted)]"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 208" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="deploy-cloud-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--surface-2)" />
              <stop offset="45%" stopColor="color-mix(in srgb, var(--teal) 28%, var(--surface))" />
              <stop offset="100%" stopColor="var(--background)" />
            </linearGradient>
            <linearGradient id="deploy-cloud-hi" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 40%, transparent)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <radialGradient id="deploy-cloud-glow" cx="45%" cy="42%" r="68%">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 32%, transparent)" />
              <stop offset="55%" stopColor="color-mix(in srgb, var(--teal) 12%, transparent)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="deploy-arc-beam" x1="0%" y1="100%" x2="96%" y2="4%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="42%" stopColor="var(--teal)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            data-deploy-arc
            d="M 42 176 Q 118 18 232 54"
            stroke="url(#deploy-arc-beam)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.35"
            strokeDasharray="360"
            strokeDashoffset="360"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              data-deploy-particle
              cx="48"
              cy="172"
              r={2.2 - i * 0.15}
              fill={i % 2 === 0 ? "var(--accent)" : "var(--teal)"}
              opacity="0.65"
            />
          ))}
          {[0, 1].map((i) => (
            <circle
              key={i}
              data-deploy-trail
              cx="48"
              cy="168"
              r={5.5 - i * 1.6}
              fill="var(--accent)"
              opacity="0.55"
              style={{ transformOrigin: "48px 168px" }}
            />
          ))}
          <g data-deploy-cloud>
            <g transform="translate(232 54)">
              <g data-deploy-cloud-core>
                <ellipse cx="2" cy="10" rx="62" ry="40" fill="url(#deploy-cloud-glow)" opacity="0.7" />
                <path
                  d="M-38 8c0-16 13-29 29-29 4 0 8 1 12 3 7-14 22-23 38-23 24 0 43 19 43 43h6c15 0 28 12 28 28s-12 28-28 28H-24c-16 0-28-13-28-28 0-12 8-23 19-27z"
                  fill="url(#deploy-cloud-body)"
                  stroke="var(--line-strong)"
                  strokeWidth="1.15"
                />
                <ellipse cx="-18" cy="-2" rx="26" ry="20" fill="url(#deploy-cloud-body)" stroke="var(--accent)" strokeOpacity="0.22" strokeWidth="0.9" />
                <ellipse cx="22" cy="2" rx="30" ry="22" fill="url(#deploy-cloud-body)" opacity="0.94" />
                <ellipse cx="6" cy="-14" rx="20" ry="14" fill="url(#deploy-cloud-hi)" opacity="0.55" />
                <g opacity="0.85">
                  <rect x="-8" y="16" width="11" height="7" rx="1.5" fill="var(--accent)" opacity="0.55" />
                  <rect x="6" y="18" width="9" height="5" rx="1" fill="var(--lime)" opacity="0.5" />
                  <rect x="18" y="17" width="8" height="5" rx="1" fill="var(--teal)" opacity="0.45" />
                </g>
                <text
                  x="8"
                  y="-22"
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize="10"
                  fontFamily="ui-monospace, SFMono-Regular, monospace"
                  letterSpacing="0.14em"
                >
                  PROD
                </text>
              </g>
              <circle
                data-deploy-ring
                cx="0"
                cy="0"
                r="40"
                stroke="var(--accent)"
                strokeWidth="1.6"
                fill="none"
                opacity="0.5"
                style={{ transformOrigin: "0px 0px" }}
              />
              <circle
                data-deploy-ring-2
                cx="0"
                cy="0"
                r="40"
                stroke="var(--teal)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.35"
                style={{ transformOrigin: "0px 0px" }}
              />
            </g>
          </g>
        </svg>
        <div
          data-deploy-card
          className="pointer-events-none absolute z-[2] w-[40%] max-w-[9rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--accent)] bg-[var(--background)] p-2 shadow-[0_14px_36px_color-mix(in_srgb,var(--accent)_42%,transparent)]"
          style={{ left: "7%", top: "76%" }}
        >
          <div className="flex items-center gap-1 border-b border-[var(--line)] pb-1">
            <span className="text-[var(--accent)]">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span className="font-mono text-[0.42rem] font-bold uppercase tracking-wider text-[var(--accent)]">
              artifact → nube
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[0.55rem] font-semibold text-[var(--cream)]">v1.4.0</span>
            <span className="font-mono text-[0.38rem] text-[var(--lime)]">ready</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div className="h-full w-[88%] rounded-full bg-[linear-gradient(90deg,var(--teal),var(--accent))]" />
          </div>
          <div className="mt-0.5 text-[0.48rem] text-[var(--muted)]">CI verde · preview</div>
        </div>
        <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
          build → edge → prod
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={shell} aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          data-create-burst
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] opacity-40"
          style={{ width: `${5.5 + i * 2.25}rem`, height: `${5.5 + i * 2.25}rem` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--background)]/95 shadow-[0_0_48px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="20" stroke="var(--line)" strokeWidth="1.2" />
            <path
              data-create-check
              d="M14 24.5l7 7 14-14"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          {CREATE_SPARK_POSITIONS.map((pos, i) => (
            <span
              key={i}
              data-spark
              className="absolute h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]"
              style={{
                left: pos.left,
                top: pos.top,
                transform: "translate(-50%, -50%) scale(0.35)",
                opacity: "0.35",
              }}
            />
          ))}
        </div>
      </div>
      <p className="absolute bottom-2 left-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[var(--muted)]">
        entrega
      </p>
    </div>
  );
}

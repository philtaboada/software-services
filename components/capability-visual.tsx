"use client";

import type { ReactElement } from "react";
import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  computeEffectivePlaybackRate,
  DEFAULT_CAPABILITY_TUNE,
  type CapabilityAnimationTune,
  type CapMobileHandDesignId,
} from "@/lib/demo-animation-tuning";

const CAP_VIS_CYCLE_SEC = 5;

/** Ciclo narrativo WEB (hook → problema → transición → solución → cierre). */
const CAP_WEB_STORY_SEC = 24;

/** Ciclo narrativo MOBILE (hook → flujo UX → sensación → medición → cierre). */
const CAP_MOBILE_STORY_SEC = 27;

/** Ciclo narrativo SYSTEMS (caos → quiebre → estructura → automatización → control). */
const CAP_SYSTEMS_STORY_SEC = 40;

/** Ciclo narrativo BRAND (inconsistencia → sistema visual → kit → escala). */
const CAP_BRAND_STORY_SEC = 36;

/** Imagen de referencia en el hero del demo WEB (asset local, sin dominios remotos). */
const CAP_WEB_HERO_REFERENCE_SRC = "/images/service-web-gemini.png";

function padCapTimeline(master: gsap.core.Timeline): void {
  padCapTimelineTo(master, CAP_VIS_CYCLE_SEC);
}

function padCapTimelineTo(master: gsap.core.Timeline, targetSec: number): void {
  const tail: number = master.duration();
  const gap: number = targetSec - tail;
  if (gap > 0.02) {
    const holder = { n: 0 };
    master.to(holder, { n: 1, duration: gap, ease: "none" });
  }
}

export type CapabilityVisualVariant = "cap-web" | "cap-mobile" | "cap-systems" | "cap-brand";

type CapabilityVisualProps = {
  readonly variant: CapabilityVisualVariant;
  readonly tune?: Partial<CapabilityAnimationTune>;
  /**
   * Si es false, la animación corre aunque `prefers-reduced-motion: reduce` (útil en /demos).
   */
  readonly respectReducedMotion?: boolean;
};

type CapMobileHandSilhouetteProps = {
  readonly design: CapMobileHandDesignId;
};

/**
 * Tres artes manuales distintas: palmada orgánica, trazo lineal, bloques (misma posición, GSAP en el contenedor `data-cap-mob-hand`).
 */
function CapMobileHandSilhouette({ design }: CapMobileHandSilhouetteProps): ReactElement {
  if (design === "soft-palm") {
    return (
      <div className="relative -rotate-6">
        <div className="h-[4.2rem] rounded-[1.55rem] border border-[color-mix(in_srgb,var(--line)_55%,transparent)] bg-[linear-gradient(168deg,color-mix(in_srgb,var(--cream)_70%,var(--background))_0%,color-mix(in_srgb,var(--surface-2)_85%,var(--muted-dim))_100%)] shadow-[0_6px_18px_rgba(0,0,0,0.14)] md:h-[4.45rem]" />
        <div className="absolute -right-0.5 top-[28%] h-[1.85rem] w-[1.05rem] rounded-full border border-[color-mix(in_srgb,var(--line)_45%,transparent)] bg-[linear-gradient(100deg,color-mix(in_srgb,var(--cream)_58%,var(--background)),color-mix(in_srgb,var(--surface-2)_78%,var(--muted-dim)))] shadow-sm" />
      </div>
    );
  }
  if (design === "line-art") {
    return (
      <div className="relative h-[4.15rem] w-[4.2rem] -rotate-6 md:h-[4.4rem] md:w-[4.35rem]">
        <svg
          className="h-full w-full"
          viewBox="0 0 80 100"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M10 88c-2-2-2-5 0-8l6-20c2-6 6-10 12-10h8c4 0 7 2 9 5l4 6c1 2 1 4 0 6l-4 8c-2 4-5 6-9 5l-24-4z"
            stroke="color-mix(in srgb, var(--line) 75%, var(--muted))"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="color-mix(in srgb, var(--cream) 12%, transparent)"
          />
          <path
            d="M50 20c8-2 16 0 20 8s2 20-4 24"
            stroke="color-mix(in srgb, var(--accent) 45%, var(--teal))"
            strokeWidth="1.35"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M22 50h18"
            stroke="color-mix(in srgb, var(--line) 55%, var(--teal))"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative -rotate-[5deg]">
      <div className="flex items-end justify-center gap-0.5">
        <div className="h-[3.4rem] w-2.5 rounded-full border border-[color-mix(in_srgb,var(--line)_48%,var(--accent)_20%)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface-2)_95%,var(--background)),color-mix(in_srgb,var(--muted-dim)_25%,var(--surface-2)))] shadow-md md:h-[3.6rem] md:w-2.5" />
        <div className="mb-0.5 h-2.5 w-[3.1rem] -rotate-11 rounded-sm border-2 border-[color-mix(in_srgb,var(--line)_50%,transparent)] bg-[color-mix(in_srgb,var(--cream)_16%,var(--surface-2))] shadow-sm md:mb-1 md:w-[3.4rem]" />
        <div className="h-1.5 w-1.5 rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_12%,var(--background))] opacity-80" />
      </div>
    </div>
  );
}

export function CapabilityVisual({
  variant,
  tune,
  respectReducedMotion = true,
}: CapabilityVisualProps): ReactElement {
  const rootRef = useRef<HTMLDivElement>(null);
  const resolvedTune: CapabilityAnimationTune = { ...DEFAULT_CAPABILITY_TUNE, ...tune };
  useGSAP(
    () => {
      const root = rootRef.current;
      const prefersReduced: boolean = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!root || (prefersReduced && respectReducedMotion)) {
        return;
      }
      const T: CapabilityAnimationTune = { ...DEFAULT_CAPABILITY_TUNE, ...tune };
      const rate: number = computeEffectivePlaybackRate(T.playbackRate, T.smoothMotion);
      const endPad: number = T.extraEndPauseSec;
      const master = gsap.timeline({ repeat: -1, paused: true });
      if (variant === "cap-web") {
        const viewport = root.querySelector("[data-cap-web-viewport]");
        const chaos = root.querySelector("[data-cap-web-chaos]");
        const shake = root.querySelector("[data-cap-web-shake]");
        const scroll = root.querySelector("[data-cap-web-scroll]");
        const noise = root.querySelectorAll("[data-cap-web-noise]");
        const deadBtns = root.querySelectorAll("[data-cap-web-dead-btn]");
        const clean = root.querySelector("[data-cap-web-clean]");
        const words = root.querySelectorAll("[data-cap-web-word]");
        const cta = root.querySelector("[data-cap-web-cta]");
        const sub = root.querySelector("[data-cap-web-sub]");
        const copyHook = root.querySelector("[data-cap-web-copy-hook]");
        const copyProblem = root.querySelector("[data-cap-web-copy-problem]");
        const copyWow = root.querySelector("[data-cap-web-copy-wow]");
        const copyClose = root.querySelector("[data-cap-web-copy-close]");
        const glitch = root.querySelector("[data-cap-web-glitch]");
        const chaosFloat = root.querySelectorAll("[data-cap-web-float]");
        const chaosBanner = root.querySelector("[data-cap-web-chaos-banner]");
        const chaosSticker = root.querySelectorAll("[data-cap-web-chaos-sticker]");
        const cleanGlow = root.querySelector("[data-cap-web-clean-glow]");
        const urlMessy = root.querySelector("[data-cap-web-url-messy]");
        const urlClean = root.querySelector("[data-cap-web-url-clean]");
        const solveShell = root.querySelector("[data-cap-web-solve-shell]");
        const solveOrb = root.querySelector("[data-cap-web-solve-orb]");
        const navSegs = root.querySelectorAll("[data-cap-web-nav-seg]");
        const heroMedia = root.querySelector("[data-cap-web-hero-media]");
        const heroPhoto = root.querySelector("[data-cap-web-hero-photo]");
        const landingTrack = root.querySelector("[data-cap-web-landing-track]");
        if (copyHook) {
          master.set(copyHook, { autoAlpha: 1 }, 0);
        }
        if (copyProblem) {
          master.set(copyProblem, { autoAlpha: 0 }, 0);
        }
        if (copyWow) {
          master.set(copyWow, { autoAlpha: 0 }, 0);
        }
        if (copyClose) {
          master.set(copyClose, { autoAlpha: 0 }, 0);
        }
        if (viewport) {
          master.set(viewport, { scale: 1, transformOrigin: "50% 45%" }, 0);
        }
        if (chaos) {
          master.set(chaos, { autoAlpha: 1, scale: 1, filter: "none", rotation: 0 }, 0);
        }
        if (shake) {
          master.set(shake, { x: 0, rotation: 0 }, 0);
        }
        if (chaosFloat.length) {
          master.set(chaosFloat, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 }, 0);
        }
        if (chaosBanner) {
          master.set(chaosBanner, { y: 0, scaleX: 1, skewX: 0, opacity: 1 }, 0);
        }
        if (chaosSticker.length) {
          master.set(chaosSticker, { y: 0, rotation: 0, opacity: 0.92 }, 0);
        }
        if (cleanGlow) {
          master.set(cleanGlow, { autoAlpha: 0, scale: 1.15 }, 0);
        }
        if (scroll) {
          master.set(scroll, { y: 0 }, 0);
        }
        if (noise.length) {
          master.set(noise, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }, 0);
        }
        if (deadBtns.length) {
          master.set(deadBtns, { opacity: 0.85, scale: 1 }, 0);
        }
        if (clean) {
          master.set(clean, { autoAlpha: 0, scale: 0.96, y: 10, clipPath: "inset(0% 0% 100% 0%)" }, 0);
        }
        if (urlMessy) {
          master.set(urlMessy, { autoAlpha: 1, y: 0 }, 0);
        }
        if (urlClean) {
          master.set(urlClean, { autoAlpha: 0, y: 5 }, 0);
        }
        if (solveShell) {
          master.set(solveShell, { autoAlpha: 0, y: 14, scale: 0.94 }, 0);
        }
        if (solveOrb) {
          master.set(solveOrb, { autoAlpha: 0, scale: 0.5 }, 0);
        }
        if (navSegs.length) {
          master.set(navSegs, { autoAlpha: 0, y: -5 }, 0);
        }
        if (heroMedia) {
          master.set(heroMedia, { autoAlpha: 0, scale: 1.06, y: 6 }, 0);
        }
        if (heroPhoto) {
          master.set(heroPhoto, { autoAlpha: 0, scale: 1.06, y: 5, rotation: -1.2 }, 0);
        }
        if (landingTrack) {
          master.set(landingTrack, { y: 0 }, 0);
        }
        if (words.length) {
          master.set(words, { y: 14, opacity: 0 }, 0);
        }
        if (sub) {
          master.set(sub, { y: 8, opacity: 0 }, 0);
        }
        if (cta) {
          master.set(cta, { scale: 0.88, opacity: 0 }, 0);
        }
        if (glitch) {
          master.set(glitch, { x: 0, opacity: 0.15 }, 0);
        }
        if (shake) {
          master.to(
            shake,
            {
              x: T.webHeavyChaos ? 5.5 : 3,
              rotation: T.webHeavyChaos ? 1.1 : 0.55,
              duration: 0.1,
              yoyo: true,
              repeat: T.webHeavyChaos ? 34 : 10,
              ease: "sine.inOut",
            },
            0,
          );
        }
        if (chaosFloat.length && T.webHeavyChaos) {
          master.to(
            chaosFloat,
            {
              y: -5,
              x: 3,
              rotation: 6,
              duration: 0.55,
              yoyo: true,
              repeat: 10,
              stagger: 0.18,
              ease: "sine.inOut",
            },
            0.35,
          );
        }
        if (chaosBanner && T.webHeavyChaos) {
          master.to(
            chaosBanner,
            {
              skewX: -4,
              scaleX: 1.04,
              y: 2,
              duration: 0.45,
              yoyo: true,
              repeat: 5,
              ease: "sine.inOut",
            },
            0.5,
          );
        }
        if (chaosSticker.length && T.webHeavyChaos) {
          master.to(
            chaosSticker,
            {
              y: -3,
              rotation: 4,
              duration: 0.4,
              yoyo: true,
              repeat: 8,
              stagger: 0.12,
              ease: "sine.inOut",
            },
            0.85,
          );
        }
        if (noise.length) {
          master.to(
            noise,
            {
              opacity: 0.32,
              duration: 0.05,
              stagger: 0.035,
              yoyo: true,
              repeat: T.webHeavyChaos ? 10 : 3,
              ease: "none",
            },
            0.15,
          );
        }
        if (glitch) {
          master.to(
            glitch,
            {
              x: 3,
              opacity: 0.35,
              duration: 0.05,
              yoyo: true,
              repeat: T.webHeavyChaos ? 15 : 4,
              ease: "none",
            },
            0,
          );
        }
        if (copyHook) {
          master.to(copyHook, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 2.95);
        }
        if (copyProblem) {
          master.to(copyProblem, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 3.05);
        }
        if (scroll) {
          master.to(
            scroll,
            { y: -32, duration: 2.2, ease: "none", yoyo: true, repeat: T.webHeavyChaos ? 3 : 1 },
            3.15,
          );
        }
        if (deadBtns.length) {
          master.to(
            deadBtns,
            {
              opacity: 0.32,
              scale: 0.96,
              duration: 0.5,
              yoyo: true,
              repeat: T.webHeavyChaos ? 6 : 2,
              ease: "sine.inOut",
            },
            3.35,
          );
        }
        if (noise.length) {
          master.to(
            noise,
            {
              opacity: 0.72,
              scale: 0.94,
              y: -3,
              rotation: (index: number) => (index % 2 === 0 ? 1.2 : -1.2),
              duration: 0.55,
              stagger: 0.05,
              ease: "sine.inOut",
            },
            5.45,
          );
        }
        if (copyProblem) {
          master.to(copyProblem, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 8.05);
        }
        if (copyWow) {
          master.to(copyWow, { autoAlpha: 1, duration: 0.45, ease: "back.out(1.2)" }, 8.25);
        }
        if (T.webHeavyChaos && chaos) {
          master.to(
            chaos,
            { scale: 1.08, rotation: 2, filter: "blur(0px) brightness(1.08)", duration: 0.18, ease: "power2.out" },
            8.08,
          );
          master.to(
            chaos,
            { scale: 0.92, rotation: -4, filter: "blur(1.5px) brightness(1.12)", duration: 0.22, ease: "power2.in" },
            8.24,
          );
        }
        if (noise.length && T.webHeavyChaos) {
          master.to(
            noise,
            {
              rotation: (index: number) => (index % 2 === 0 ? 11 : -9),
              x: (index: number) => (index % 3 === 0 ? 10 : -8),
              y: 14,
              scale: 0.75,
              opacity: 0.55,
              duration: 0.28,
              stagger: 0.04,
              ease: "power2.in",
            },
            8.18,
          );
        }
        if (chaosFloat.length) {
          master.to(
            chaosFloat,
            {
              y: 22,
              x: (index: number) => (index % 2 === 0 ? 18 : -16),
              rotation: (index: number) => (index % 2 === 0 ? 22 : -18),
              scale: 0.72,
              opacity: 0,
              duration: 0.42,
              stagger: 0.05,
              ease: "power3.in",
            },
            8.28,
          );
        }
        if (chaosBanner) {
          master.to(
            chaosBanner,
            { y: 28, skewX: -12, scaleX: 1.15, opacity: 0, duration: 0.38, ease: "power3.in" },
            8.32,
          );
        }
        if (chaosSticker.length) {
          master.to(
            chaosSticker,
            { scale: 0.4, rotation: 25, opacity: 0, duration: 0.35, stagger: 0.06, ease: "power3.in" },
            8.34,
          );
        }
        if (chaos) {
          master.to(
            chaos,
            {
              scale: 0.22,
              autoAlpha: 0,
              rotation: T.webHeavyChaos ? -14 : -2.5,
              filter: T.webHeavyChaos ? "blur(10px) brightness(0.75)" : "none",
              duration: T.webHeavyChaos ? 0.58 : 0.7,
              ease: "power4.in",
            },
            8.42,
          );
        }
        if (viewport) {
          master.to(
            viewport,
            {
              scale: T.webHeavyChaos ? 0.72 : 0.78,
              duration: 0.52,
              ease: "power2.inOut",
              transformOrigin: "50% 45%",
              filter: T.webHeavyChaos ? "brightness(0.92)" : "none",
            },
            8.32,
          );
          master.to(
            viewport,
            { scale: 1, duration: 0.72, ease: "power3.out", filter: "none" },
            8.88,
          );
        }
        if (glitch) {
          master.to(glitch, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 8.82);
        }
        if (urlMessy && urlClean) {
          master.to(urlMessy, { autoAlpha: 0, y: -4, duration: 0.32, ease: "power2.in" }, 9.02);
          master.to(urlClean, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 9.12);
        }
        if (copyWow) {
          master.to(copyWow, { autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 11.35);
        }
        if (cleanGlow) {
          master.fromTo(
            cleanGlow,
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 0.55, scale: 1, duration: 0.9, ease: "power2.out" },
            9.02,
          );
          master.to(cleanGlow, { autoAlpha: 0.18, duration: 0.85, ease: "sine.inOut" }, 10);
        }
        if (clean) {
          master.fromTo(
            clean,
            { autoAlpha: 0, scale: 0.98, y: 10, clipPath: "inset(0% 0% 100% 0%)" },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.78,
              ease: "power3.out",
            },
            9.12,
          );
        }
        if (solveShell) {
          master.to(
            solveShell,
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out" },
            9.22,
          );
        }
        if (solveOrb) {
          master.to(
            solveOrb,
            { autoAlpha: 0.42, scale: 1, duration: 1.05, ease: "power2.out" },
            9.28,
          );
        }
        if (navSegs.length) {
          master.to(
            navSegs,
            { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.065, ease: "power3.out" },
            9.4,
          );
        }
        if (heroMedia) {
          master.to(
            heroMedia,
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.72, ease: "power3.out" },
            9.58,
          );
        }
        if (words.length) {
          master.fromTo(
            words,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.36, stagger: 0.07, ease: "power3.out" },
            10.02,
          );
        }
        if (sub) {
          master.to(sub, { y: 0, opacity: 1, duration: 0.46, ease: "power2.out" }, 10.62);
        }
        if (cta) {
          master.fromTo(
            cta,
            { scale: 0.9, opacity: 0, y: 5 },
            { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.35)" },
            11.18,
          );
          master.to(
            cta,
            {
              boxShadow: "0 6px 26px color-mix(in srgb, var(--accent) 32%, transparent)",
              duration: 0.42,
              ease: "power2.out",
            },
            11.72,
          );
        }
        if (landingTrack) {
          master.to(
            landingTrack,
            { y: -76, duration: 2.35, ease: "power1.inOut" },
            12.02,
          );
          master.to(landingTrack, { y: -36, duration: 0.92, ease: "power2.out" }, 14.52);
          master.to(landingTrack, { y: 0, duration: 1.45, ease: "power1.inOut" }, 15.55);
        }
        if (copyClose) {
          master.to(copyClose, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 18.6);
        }
        if (clean) {
          master.to(clean, { opacity: 0.86, duration: 0.42, ease: "none" }, 18.45);
          master.to(clean, { opacity: 1, duration: 0.48, ease: "none" }, 21.45);
        }
        if (copyClose) {
          master.to(copyClose, { autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 21.85);
        }
        padCapTimelineTo(master, CAP_WEB_STORY_SEC + endPad);
        master.timeScale(rate);
      } else if (variant === "cap-mobile") {
        const device = root.querySelector("[data-cap-mob-device]");
        const hand = root.querySelector("[data-cap-mob-hand]");
        const splash = root.querySelector("[data-cap-mob-splash]");
        const flow = root.querySelector("[data-cap-mob-flow]");
        const list = root.querySelector("[data-cap-mob-list]");
        const tapZone = root.querySelector("[data-cap-mob-tapzone]");
        const sheet = root.querySelector("[data-cap-mob-sheet]");
        const success = root.querySelector("[data-cap-mob-success]");
        const checkWrap = root.querySelector("[data-cap-mob-checkwrap]");
        const dash = root.querySelector("[data-cap-mob-dash]");
        const barConv = root.querySelector("[data-cap-mob-bar-conv]");
        const barRet = root.querySelector("[data-cap-mob-bar-ret]");
        const spark = root.querySelector("[data-cap-mob-spark]");
        const copyHook = root.querySelector("[data-cap-mob-copy-hook]");
        const copyFlow = root.querySelector("[data-cap-mob-copy-flow]");
        const copyFeel = root.querySelector("[data-cap-mob-copy-feel]");
        const copyMeasure = root.querySelector("[data-cap-mob-copy-measure]");
        const copyClose = root.querySelector("[data-cap-mob-copy-close]");
        const copyCta = root.querySelector("[data-cap-mob-copy-cta]");
        master.set(copyHook, { autoAlpha: 1 }, 0);
        master.set(copyFlow, { autoAlpha: 0 }, 0);
        master.set(copyFeel, { autoAlpha: 0 }, 0);
        master.set(copyMeasure, { autoAlpha: 0 }, 0);
        master.set(copyClose, { autoAlpha: 0 }, 0);
        master.set(copyCta, { autoAlpha: 0 }, 0);
        if (device) {
          master.set(device, { scale: 0.88, opacity: 0.72, transformOrigin: "50% 55%" }, 0);
        }
        if (hand) {
          master.set(
            hand,
            { x: -16, y: 10, rotation: -7, scale: 0.94, autoAlpha: 1, transformOrigin: "55% 88%" },
            0,
          );
        }
        if (splash) {
          master.set(splash, { autoAlpha: 1, scale: 0.9, transformOrigin: "50% 45%" }, 0);
        }
        if (flow) {
          master.set(flow, { autoAlpha: 0 }, 0);
        }
        if (list) {
          master.set(list, { y: 0 }, 0);
        }
        if (tapZone) {
          master.set(tapZone, { scale: 1, opacity: 0.55 }, 0);
        }
        if (sheet) {
          master.set(sheet, { yPercent: 108, autoAlpha: 1 }, 0);
        }
        if (success) {
          master.set(success, { autoAlpha: 0 }, 0);
        }
        if (checkWrap) {
          master.set(checkWrap, { scale: 0.35, opacity: 0, boxShadow: "0 0 0 0px transparent" }, 0);
        }
        if (dash) {
          master.set(dash, { autoAlpha: 0 }, 0);
        }
        if (barConv) {
          master.set(barConv, { scaleX: 0.12, transformOrigin: "0% 50%" }, 0);
        }
        if (barRet) {
          master.set(barRet, { scaleX: 0.12, transformOrigin: "0% 50%" }, 0);
        }
        if (spark) {
          master.set(spark, { opacity: 0.25, scaleX: 0.15, transformOrigin: "0% 50%" }, 0);
        }
        if (hand) {
          master.to(
            hand,
            { x: 0, y: 0, rotation: -4.5, scale: 1, duration: 0.6, ease: "power2.out" },
            0.08,
          );
        }
        if (device) {
          master.to(
            device,
            { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
            0.12,
          );
        }
        if (splash) {
          master.to(
            splash,
            { scale: 1, duration: 0.65, ease: "power2.out" },
            0.18,
          );
        }
        if (hand) {
          master.to(
            hand,
            {
              x: 28,
              y: 36,
              rotation: 8,
              scale: 0.9,
              autoAlpha: 0,
              duration: 0.85,
              ease: "power2.inOut",
            },
            1.7,
          );
        }
        master.to(copyHook, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 2.78);
        master.to(copyFlow, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 2.95);
        if (splash) {
          master.to(splash, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 3.15);
        }
        if (flow) {
          master.to(flow, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 3.25);
        }
        if (tapZone) {
          master.to(
            tapZone,
            {
              scale: 1.12,
              opacity: 1,
              duration: 0.32,
              yoyo: true,
              repeat: T.mobileStrongFeedback ? 3 : 1,
              ease: "sine.inOut",
            },
            4.05,
          );
        }
        if (list) {
          master.to(list, { y: -16, duration: 0.58, ease: "power1.inOut" }, 5.15);
        }
        if (sheet) {
          master.to(sheet, { yPercent: 0, duration: 0.48, ease: "power3.out" }, 6.35);
          master.to(
            sheet,
            { boxShadow: "0 -8px 28px rgba(0,0,0,0.2)", duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" },
            6.85,
          );
          master.to(sheet, { yPercent: 112, duration: 0.42, ease: "power2.in" }, 8.05);
        }
        master.to(copyFlow, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 9.55);
        master.to(copyFeel, { autoAlpha: 1, duration: 0.48, ease: "power2.out" }, 9.72);
        if (flow) {
          master.to(flow, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 9.95);
        }
        if (success) {
          master.to(success, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 10.05);
        }
        if (checkWrap) {
          master.to(
            checkWrap,
            { scale: 1, opacity: 1, duration: 0.62, ease: "back.out(1.75)" },
            10.2,
          );
          master.to(
            checkWrap,
            {
              boxShadow: "0 0 0 5px color-mix(in srgb, var(--lime) 35%, transparent)",
              duration: 0.55,
              yoyo: true,
              repeat: T.mobileStrongFeedback ? 1 : 0,
              ease: "sine.inOut",
            },
            11.05,
          );
        }
        master.to(copyFeel, { autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 15.45);
        master.to(copyMeasure, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 15.62);
        if (success) {
          master.to(success, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 15.75);
        }
        if (dash) {
          master.to(dash, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 15.85);
        }
        if (barConv) {
          master.to(barConv, { scaleX: 0.82, duration: 1.35, ease: "power1.out" }, 16.1);
        }
        if (barRet) {
          master.to(barRet, { scaleX: 0.68, duration: 1.42, ease: "power1.out" }, 16.35);
        }
        if (spark) {
          master.to(spark, { opacity: 0.75, scaleX: 1, duration: 1.1, ease: "power1.inOut" }, 16.55);
          master.to(
            spark,
            {
              opacity: 0.45,
              duration: 0.6,
              yoyo: true,
              repeat: T.mobileStrongFeedback ? 2 : 0,
              ease: "sine.inOut",
            },
            17.9,
          );
        }
        master.to(copyMeasure, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 21.35);
        master.to(copyClose, { autoAlpha: 1, duration: 0.48, ease: "power2.out" }, 21.52);
        master.to(copyCta, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 22.05);
        master.to(copyClose, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 25.95);
        master.to(copyCta, { autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 26.05);
        padCapTimelineTo(master, CAP_MOBILE_STORY_SEC + endPad);
        master.timeScale(rate);
      } else if (variant === "cap-systems") {
        const chaos = root.querySelector("[data-cap-sys-chaos]");
        const notifs = root.querySelectorAll("[data-cap-sys-notif]");
        const quotes = root.querySelectorAll("[data-cap-sys-quote]");
        const lost = root.querySelectorAll("[data-cap-sys-lost]");
        const veil = root.querySelector("[data-cap-sys-veil]");
        const board = root.querySelector("[data-cap-sys-board]");
        const links = root.querySelectorAll("[data-cap-sys-link]");
        const cols = root.querySelectorAll("[data-cap-sys-col]");
        const orb = root.querySelector("[data-cap-sys-orb]");
        const nodes = root.querySelectorAll("[data-cap-sys-node]");
        const kpiBars = root.querySelectorAll("[data-cap-sys-kpi-bar]");
        const c1 = root.querySelector("[data-cap-sys-c1]");
        const c2 = root.querySelector("[data-cap-sys-c2]");
        const c3 = root.querySelector("[data-cap-sys-c3]");
        const c4 = root.querySelector("[data-cap-sys-c4]");
        const c5 = root.querySelector("[data-cap-sys-c5]");
        const c6 = root.querySelector("[data-cap-sys-c6]");
        const c7 = root.querySelector("[data-cap-sys-c7]");
        const copies = [c1, c2, c3, c4, c5, c6, c7].filter(Boolean);
        copies.forEach((el, i) => {
          master.set(el, { autoAlpha: i === 0 ? 1 : 0 }, 0);
        });
        if (chaos) {
          master.set(chaos, { autoAlpha: 1, scale: 1, filter: "none" }, 0);
        }
        if (notifs.length) {
          master.set(notifs, { scale: 0, opacity: 0, rotation: 0, x: 0 }, 0);
        }
        if (quotes.length) {
          master.set(quotes, { y: 6, opacity: 0 }, 0);
        }
        if (lost.length) {
          master.set(lost, { opacity: 0.75, y: 0, rotation: 0 }, 0);
        }
        if (veil) {
          master.set(veil, { autoAlpha: 0 }, 0);
        }
        if (board) {
          master.set(board, { autoAlpha: 0, y: 10, scale: 1 }, 0);
        }
        if (links.length) {
          master.set(links, { scaleX: 0.04, opacity: 0.2, transformOrigin: "50% 50%" }, 0);
        }
        if (cols.length) {
          master.set(cols, { opacity: 0, y: 8 }, 0);
        }
        if (orb) {
          master.set(orb, { left: "6%", autoAlpha: 0, scale: 0.5 }, 0);
        }
        if (nodes.length) {
          master.set(nodes, { scale: 0.85, opacity: 0.4 }, 0);
        }
        if (kpiBars.length) {
          master.set(kpiBars, { scaleX: 0.18, transformOrigin: "0% 50%", filter: "none" }, 0);
        }
        if (notifs.length) {
          notifs.forEach((n, i) => {
            master.fromTo(
              n,
              { scale: 0, opacity: 0, rotation: i % 2 === 0 ? -10 : 8 },
              {
                scale: 1,
                opacity: 1,
                rotation: i % 3 === 0 ? -3 : i % 3 === 1 ? 4 : 0,
                duration: 0.38,
                ease: "back.out(1.4)",
              },
              0.15 + i * 0.22,
            );
          });
          master.to(
            notifs,
            {
              x: 2,
              duration: 0.08,
              yoyo: true,
              repeat: T.systemsHeavyChaos ? 5 : 2,
              stagger: 0.05,
              ease: "sine.inOut",
            },
            2.2,
          );
        }
        master.to(c1, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 3.35);
        master.to(c2, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 3.5);
        if (quotes.length) {
          master.to(
            quotes,
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.35, ease: "power2.out" },
            3.65,
          );
        }
        if (lost.length) {
          master.to(
            lost,
            {
              rotation: 3,
              y: -3,
              duration: 0.45,
              yoyo: true,
              repeat: T.systemsHeavyChaos ? 7 : 2,
              stagger: 0.12,
              ease: "sine.inOut",
            },
            4.8,
          );
        }
        if (chaos) {
          master.to(
            chaos,
            {
              filter: "blur(0.5px)",
              duration: 0.35,
              yoyo: true,
              repeat: T.systemsHeavyChaos ? 4 : 1,
              ease: "sine.inOut",
            },
            6.2,
          );
        }
        master.to(c2, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 9.55);
        master.to(c3, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 9.72);
        if (chaos) {
          master.to(chaos, { scale: 0.97, filter: "brightness(0.55)", duration: 0.5, ease: "power2.in" }, 10.05);
        }
        if (veil) {
          master.to(veil, { autoAlpha: 0.88, duration: 0.55, ease: "power1.inOut" }, 10.25);
        }
        master.to(c3, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 12.85);
        if (veil) {
          master.to(veil, { autoAlpha: 0, duration: 0.65, ease: "power2.out" }, 13.05);
        }
        if (chaos) {
          master.to(chaos, { filter: "none", scale: 1, duration: 0.3 }, 13.05);
        }
        master.to(c4, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 13.25);
        if (chaos) {
          master.to(chaos, { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 13.45);
        }
        if (board) {
          master.to(board, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, 13.55);
        }
        if (cols.length) {
          master.to(
            cols,
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.18, ease: "power2.out" },
            14.15,
          );
        }
        if (links.length) {
          master.to(
            links,
            { scaleX: 1, opacity: 0.55, duration: 0.65, stagger: 0.12, ease: "power2.out" },
            14.45,
          );
        }
        if (nodes.length) {
          master.to(
            nodes,
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.2)" },
            15.2,
          );
        }
        master.to(c4, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 21.55);
        master.to(c5, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 21.72);
        if (orb) {
          master.to(orb, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, 22.05);
          master.to(orb, { left: "28%", duration: 0.5, ease: "power1.inOut" }, 22.35);
          master.to(orb, { left: "50%", duration: 0.48, ease: "power1.inOut" }, 22.95);
          master.to(orb, { left: "72%", duration: 0.5, ease: "power1.inOut" }, 23.55);
          master.to(orb, { left: "92%", scale: 0.85, autoAlpha: 0.35, duration: 0.45, ease: "power2.in" }, 24.2);
        }
        master.to(c5, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 27.55);
        master.to(c6, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 27.72);
        if (kpiBars.length) {
          master.to(
            kpiBars,
            { scaleX: 0.88, duration: 1.25, stagger: 0.15, ease: "power1.out" },
            28.05,
          );
          master.to(
            kpiBars,
            {
              filter: "brightness(1.15)",
              duration: 0.4,
              yoyo: true,
              repeat: T.systemsHeavyChaos ? 2 : 0,
              stagger: 0.1,
              ease: "sine.inOut",
            },
            29.5,
          );
        }
        if (board) {
          master.to(
            board,
            {
              scale: 1.01,
              duration: 0.45,
              yoyo: true,
              repeat: T.systemsHeavyChaos ? 1 : 0,
              ease: "sine.inOut",
            },
            29.8,
          );
        }
        master.to(c6, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 31.95);
        master.to(c7, { autoAlpha: 1, duration: 0.48, ease: "power2.out" }, 32.12);
        master.to(c7, { autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 35.45);
        padCapTimelineTo(master, CAP_SYSTEMS_STORY_SEC + endPad);
        master.timeScale(rate);
      } else if (variant === "cap-brand") {
        const chaos = root.querySelector("[data-cap-brand-chaos]");
        const chaoticLetters = root.querySelectorAll("[data-cap-brand-chaotic-letter]");
        const chaosBlobs = root.querySelectorAll("[data-cap-brand-chaos-blob]");
        const messy = root.querySelector("[data-cap-brand-messy]");
        const messyBits = root.querySelectorAll("[data-cap-brand-messy-bit]");
        const order = root.querySelector("[data-cap-brand-order]");
        const gridLines = root.querySelectorAll("[data-cap-brand-grid]");
        const swatchesOrder = root.querySelectorAll("[data-cap-brand-swatch-order]");
        const typeMessy = root.querySelector("[data-cap-brand-type-messy]");
        const typeClean = root.querySelector("[data-cap-brand-type-clean]");
        const kit = root.querySelector("[data-cap-brand-kit]");
        const kitBits = root.querySelectorAll("[data-cap-brand-kit-bit]");
        const kitDup = root.querySelector("[data-cap-brand-kit-dup]");
        const kitDupBits = root.querySelectorAll("[data-cap-brand-kit-dup-bit]");
        const scale = root.querySelector("[data-cap-brand-scale]");
        const scaleFrames = root.querySelectorAll("[data-cap-brand-scale-frame]");
        const c1 = root.querySelector("[data-cap-brand-c1]");
        const c2 = root.querySelector("[data-cap-brand-c2]");
        const c3 = root.querySelector("[data-cap-brand-c3]");
        const c4 = root.querySelector("[data-cap-brand-c4]");
        const c5 = root.querySelector("[data-cap-brand-c5]");
        const c6 = root.querySelector("[data-cap-brand-c6]");
        const copies = [c1, c2, c3, c4, c5, c6].filter(Boolean);
        copies.forEach((el, i) => {
          master.set(el, { autoAlpha: i === 0 ? 1 : 0 }, 0);
        });
        if (chaos) {
          master.set(chaos, { autoAlpha: 1 }, 0);
        }
        if (chaoticLetters.length) {
          chaoticLetters.forEach((el, i) => {
            master.set(el, { opacity: 0, scale: 0, rotation: i % 2 === 0 ? -18 : 14, y: 6 }, 0);
          });
        }
        if (chaosBlobs.length) {
          master.set(chaosBlobs, { opacity: 0, scale: 0.4 }, 0);
        }
        if (messy) {
          master.set(messy, { autoAlpha: 0 }, 0);
        }
        if (messyBits.length) {
          master.set(messyBits, { y: 0, rotation: 0, x: 0 }, 0);
        }
        if (order) {
          master.set(order, { autoAlpha: 0 }, 0);
        }
        if (gridLines.length) {
          master.set(gridLines, { scaleX: 0.06, opacity: 0.12, transformOrigin: "0% 50%" }, 0);
        }
        if (swatchesOrder.length) {
          master.set(swatchesOrder, { scale: 0.35, opacity: 0 }, 0);
        }
        if (typeMessy) {
          master.set(typeMessy, { autoAlpha: 1, y: 0 }, 0);
        }
        if (typeClean) {
          master.set(typeClean, { autoAlpha: 0, y: 8 }, 0);
        }
        if (kit) {
          master.set(kit, { autoAlpha: 0, y: 6 }, 0);
        }
        if (kitBits.length) {
          master.set(kitBits, { opacity: 0, y: 5, scale: 0.92 }, 0);
        }
        if (kitDup) {
          master.set(kitDup, { autoAlpha: 0, scale: 0.94 }, 0);
        }
        if (kitDupBits.length) {
          master.set(kitDupBits, { opacity: 0 }, 0);
        }
        if (scale) {
          master.set(scale, { autoAlpha: 0 }, 0);
        }
        if (scaleFrames.length) {
          master.set(scaleFrames, { opacity: 0, scale: 0.82, y: 10, boxShadow: "none" }, 0);
        }
        if (chaoticLetters.length) {
          chaoticLetters.forEach((el, i) => {
            master.to(
              el,
              {
                opacity: 1,
                scale: 1,
                rotation: i % 3 === 0 ? -4 : i % 3 === 1 ? 5 : 2,
                y: 0,
                duration: 0.42,
                ease: "back.out(1.35)",
              },
              0.12 + i * 0.14,
            );
          });
          master.to(
            chaoticLetters,
            {
              rotation: "+=6",
              x: 2,
              duration: 0.12,
              yoyo: true,
              repeat: T.brandErraticLetters ? 5 : 1,
              stagger: 0.04,
              ease: "sine.inOut",
            },
            1.85,
          );
        }
        if (chaosBlobs.length) {
          master.to(
            chaosBlobs,
            { opacity: 0.9, scale: 1, duration: 0.38, stagger: 0.1, ease: "back.out(1.2)" },
            0.35,
          );
          master.to(
            chaosBlobs,
            {
              x: 3,
              duration: 0.14,
              yoyo: true,
              repeat: T.brandErraticLetters ? 4 : 1,
              stagger: 0.06,
              ease: "sine.inOut",
            },
            2.1,
          );
        }
        master.to(c1, { autoAlpha: 0, duration: 0.32, ease: "power2.in" }, 3.55);
        master.to(c2, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 3.72);
        if (chaos) {
          master.to(chaos, { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 4.05);
        }
        if (messy) {
          master.to(messy, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 4.25);
        }
        if (messyBits.length) {
          master.fromTo(
            messyBits,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" },
            4.45,
          );
          master.to(
            messyBits,
            {
              rotation: 4,
              x: 4,
              duration: 0.35,
              yoyo: true,
              repeat: T.brandErraticLetters ? 9 : 2,
              stagger: 0.08,
              ease: "sine.inOut",
            },
            5.35,
          );
        }
        master.to(c2, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 10.45);
        master.to(c3, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 10.62);
        if (messy) {
          master.to(messy, { autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 10.85);
        }
        if (order) {
          master.to(order, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 11.05);
        }
        if (gridLines.length) {
          master.to(
            gridLines,
            { scaleX: 1, opacity: 0.42, duration: 0.75, stagger: 0.07, ease: "power2.out" },
            11.2,
          );
        }
        if (swatchesOrder.length) {
          master.to(
            swatchesOrder,
            { scale: 1, opacity: 1, duration: 0.55, stagger: 0.16, ease: "back.out(1.25)" },
            11.45,
          );
        }
        if (typeMessy && typeClean) {
          master.to(typeMessy, { autoAlpha: 0, y: -6, duration: 0.4, ease: "power2.in" }, 11.35);
          master.to(typeClean, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, 11.55);
        }
        master.to(c3, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 16.55);
        master.to(c4, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 16.72);
        if (order) {
          master.to(order, { autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 16.95);
        }
        if (kit) {
          master.to(kit, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 17.15);
        }
        if (kitBits.length) {
          master.to(
            kitBits,
            { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.14, ease: "back.out(1.15)" },
            17.35,
          );
        }
        if (kitDup) {
          master.to(kitDup, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 18.55);
        }
        if (kitDupBits.length) {
          master.to(kitDupBits, { opacity: 1, duration: 0.45, stagger: 0.1, ease: "power2.out" }, 18.75);
        }
        master.to(c4, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 23.35);
        master.to(c5, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 23.52);
        if (kit) {
          master.to(kit, { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 23.65);
        }
        if (kitDup) {
          master.to(kitDup, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 23.72);
        }
        if (scale) {
          master.to(scale, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 23.95);
        }
        if (scaleFrames.length) {
          master.to(
            scaleFrames,
            { opacity: 1, scale: 1, y: 0, duration: 0.38, stagger: 0.12, ease: "back.out(1.2)" },
            24.1,
          );
          master.to(
            scaleFrames,
            {
              y: -2,
              duration: 0.35,
              yoyo: true,
              repeat: T.brandErraticLetters ? 1 : 0,
              stagger: 0.05,
              ease: "sine.inOut",
            },
            25.35,
          );
        }
        master.to(c5, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 29.15);
        master.to(c6, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, 29.32);
        if (scaleFrames.length) {
          master.to(
            scaleFrames,
            {
              boxShadow: "0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent)",
              duration: 0.45,
              yoyo: true,
              repeat: T.brandErraticLetters ? 1 : 0,
              stagger: 0.06,
              ease: "sine.inOut",
            },
            29.55,
          );
        }
        master.to(c6, { autoAlpha: 0, duration: 0.38, ease: "power2.in" }, 33.65);
        padCapTimelineTo(master, CAP_BRAND_STORY_SEC + endPad);
        master.timeScale(rate);
      }
      master.seek(0, false);
      master.play(0);
    },
    {
      scope: rootRef,
      dependencies: [variant, tune, respectReducedMotion],
      revertOnUpdate: true,
    },
  );

  if (variant === "cap-web") {
    const chaosNoise = [
      { w: "92%", h: "h-1.5", bg: "bg-[var(--plum)]/50" },
      { w: "76%", h: "h-1", bg: "bg-[var(--accent)]/40" },
      { w: "100%", h: "h-2", bg: "bg-[var(--lime)]/35" },
      { w: "48%", h: "h-1", bg: "bg-[var(--teal)]/45" },
      { w: "88%", h: "h-1.5", bg: "bg-[var(--muted-dim)]/70" },
      { w: "64%", h: "h-1", bg: "bg-[var(--accent)]/55" },
      { w: "82%", h: "h-2", bg: "bg-[var(--surface)]" },
      { w: "40%", h: "h-1", bg: "bg-[var(--lime)]/50" },
      { w: "96%", h: "h-1", bg: "bg-[var(--plum)]/40" },
      { w: "58%", h: "h-1.5", bg: "bg-[var(--accent)]/30" },
      { w: "72%", h: "h-1", bg: "bg-[var(--muted-dim)]/55" },
      { w: "85%", h: "h-1", bg: "bg-[var(--teal)]/30" },
    ] as const;
    const headlineWords = ["Foco", "absoluto.", "Conversión", "real."] as const;
    return (
      <div
        ref={rootRef}
        className="relative h-[15.5rem] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-[18.5rem]"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]" />
        <div className="pointer-events-none absolute left-2 right-2 top-2 z-40 min-h-[2.75rem] px-1 text-center sm:left-3 sm:right-3">
          <p
            data-cap-web-copy-hook
            className="relative font-display text-[0.58rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.68rem]"
          >
            ¿Tu web se ve así…?
          </p>
          <p
            data-cap-web-copy-problem
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.58rem] font-medium leading-snug text-[var(--cream-soft)] sm:text-[0.68rem]"
          >
            Mucho ruido. Cero conversión.
          </p>
          <p
            data-cap-web-copy-wow
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.58rem] font-semibold leading-snug text-[var(--accent)] sm:text-[0.68rem]"
          >
            De caos a una experiencia que vende.
          </p>
          <p
            data-cap-web-copy-close
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.58rem] font-medium leading-snug text-[var(--lime)] sm:text-[0.68rem]"
          >
            Landings con intención — listas para medir.
          </p>
        </div>
        <div
          data-cap-web-viewport
          className="absolute inset-x-2 bottom-2 top-[3.35rem] flex flex-col overflow-hidden rounded-lg border border-[var(--line-strong)]/70 bg-[var(--background)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--line)_55%,transparent)] sm:inset-x-3 sm:top-[3.5rem]"
        >
          <div className="flex shrink-0 items-center gap-1 border-b border-[var(--line)] px-2 py-1">
            <span className="h-1 w-1 rounded-full bg-[#ff5f57]/80" />
            <span className="h-1 w-1 rounded-full bg-[#febc2e]/80" />
            <span className="h-1 w-1 rounded-full bg-[#28c840]/80" />
            <span className="relative ml-1 min-w-0 flex-1 font-mono text-[0.35rem] leading-tight text-[var(--muted)]">
              <span
                data-cap-web-url-messy
                className="flex w-full min-w-0 items-center gap-0.5"
              >
                <Icon icon="tabler:file-type-html" className="shrink-0 text-[var(--plum)]" width={9} height={9} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">promo-todo-a-la-vez.html</span>
              </span>
              <span
                data-cap-web-url-clean
                className="invisible absolute left-0 top-0 flex w-full min-w-0 items-center gap-0.5 text-[var(--teal)]"
              >
                <Icon icon="tabler:lock" className="shrink-0" width={9} height={9} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate">tumarca.com/oferta-clara</span>
              </span>
            </span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div
              data-cap-web-glitch
              className="pointer-events-none absolute inset-0 z-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,color-mix(in_srgb,var(--accent)_12%,transparent)_2px,color-mix(in_srgb,var(--accent)_12%,transparent)_3px)] opacity-15 mix-blend-overlay"
            />
            <div data-cap-web-chaos className="absolute inset-0 z-[5] overflow-hidden">
              <div
                data-cap-web-chaos-banner
                className="pointer-events-none absolute left-0 right-0 top-0 z-[3] flex origin-center items-center justify-center gap-0.5 border-y border-[var(--accent)]/35 bg-[color-mix(in_srgb,var(--accent)_22%,var(--ink))] py-0.5 text-center font-mono text-[0.28rem] font-bold uppercase tracking-[0.18em] text-[var(--cream)] shadow-sm"
              >
                <Icon icon="tabler:flame" className="text-[var(--lime)]" width={9} height={9} aria-hidden="true" />
                últimas horas · no cerrar · oferta flash
              </div>
              <div data-cap-web-shake className="relative flex h-full min-h-[7.5rem] flex-col pt-4">
                <div
                  data-cap-web-scroll
                  className="relative flex flex-col gap-1 overflow-visible p-1.5 sm:gap-1.5 sm:p-2"
                >
                  <div
                    data-cap-web-chaos-sticker
                    className="pointer-events-none absolute -right-0.5 top-[12%] z-[2] max-w-[46%] rotate-6 rounded border border-[var(--lime)]/50 bg-[color-mix(in_srgb,var(--lime)_12%,var(--surface))] px-1 py-px font-mono text-[0.26rem] leading-tight text-[var(--lime)] shadow-md"
                  >
                    <span className="inline-flex items-center gap-0.5">
                      <Icon icon="tabler:gift" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      +2 gratis HOY
                    </span>
                  </div>
                  <div
                    data-cap-web-chaos-sticker
                    className="pointer-events-none absolute left-0 top-[48%] z-[2] -rotate-3 rounded-md border border-dashed border-[var(--plum)]/60 bg-[var(--surface)]/95 px-1 py-px font-mono text-[0.26rem] text-[var(--plum)]"
                  >
                    <span className="inline-flex items-center gap-0.5">
                      <Icon icon="tabler:bell-ringing" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      ¿Permitir notifs?
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-0.5">
                    <span className="inline-flex items-center gap-0.5 rounded bg-[var(--accent)]/25 px-1 py-px font-mono text-[0.3rem] text-[var(--accent)]">
                      <Icon icon="tabler:tag" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      OFERTA
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded bg-[var(--lime)]/25 px-1 py-px font-mono text-[0.3rem] text-[var(--lime)]">
                      <Icon icon="tabler:star" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      NUEVO
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded bg-[var(--plum)]/35 px-1 py-px font-mono text-[0.3rem] text-[var(--cream)]">
                      <Icon icon="tabler:discount-2" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      50% OFF
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded border border-[var(--line)] bg-[var(--surface-2)] px-1 py-px font-mono text-[0.28rem] text-[var(--muted)] line-through decoration-[var(--accent)]/60">
                      <Icon icon="tabler:package" width={8} height={8} className="shrink-0 opacity-80" aria-hidden="true" />
                      stock
                    </span>
                  </div>
                  {chaosNoise.map((n, i) => (
                    <div
                      key={i}
                      data-cap-web-noise
                      className={`shrink-0 rounded-sm ${n.h} ${n.bg}`}
                      style={{ width: n.w }}
                    />
                  ))}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <div
                      data-cap-web-dead-btn
                      className="flex h-4 min-w-[40%] flex-1 items-center justify-center gap-0.5 rounded border border-[var(--line)] bg-[var(--surface)] font-mono text-[0.32rem] leading-4 text-[var(--muted)]"
                    >
                      <Icon icon="tabler:shopping-cart" width={9} height={9} className="shrink-0 opacity-80" aria-hidden="true" />
                      <span className="px-0.5">Comprar ya</span>
                    </div>
                    <div
                      data-cap-web-dead-btn
                      className="inline-flex h-3.5 items-center justify-center gap-0.5 rounded-sm border border-[var(--teal)]/45 bg-[var(--teal)]/10 px-1.5 font-mono text-[0.28rem] leading-[0.9rem] text-[var(--teal)]"
                    >
                      <Icon icon="tabler:help" width={8} height={8} className="shrink-0" aria-hidden="true" />
                      ???
                    </div>
                    <div
                      data-cap-web-dead-btn
                      className="flex h-4 w-10 items-center justify-center gap-0.5 rounded border border-[var(--accent)]/40 bg-[var(--accent)]/15 font-mono text-[0.3rem] leading-4 text-[var(--accent)]"
                    >
                      <Icon icon="tabler:check" width={9} height={9} className="shrink-0" aria-hidden="true" />
                      <span className="pr-0.5">OK</span>
                    </div>
                    <div
                      data-cap-web-dead-btn
                      className="flex h-4 min-w-[35%] flex-1 items-center justify-center gap-0.5 rounded border border-[var(--line)] bg-[var(--surface-2)] font-mono text-[0.32rem] leading-4 text-[var(--muted)]"
                    >
                      <Icon icon="tabler:info-square" width={9} height={9} className="shrink-0 opacity-90" aria-hidden="true" />
                      <span className="px-0.5">Más info</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded bg-[var(--muted-dim)]/40" />
                  <div className="h-1 w-[80%] rounded bg-[var(--muted-dim)]/35" />
                  <div className="flex justify-between gap-1 pt-0.5">
                    <div
                      data-cap-web-float
                      className="inline-flex items-center gap-0.5 rounded border border-[var(--accent)]/30 bg-[var(--surface)]/95 px-1 py-px font-mono text-[0.26rem] text-[var(--accent)] shadow-sm"
                    >
                      <Icon icon="tabler:messages" width={7} height={7} className="shrink-0" aria-hidden="true" />
                      chat · 9
                    </div>
                    <div
                      data-cap-web-float
                      className="-mt-1 inline-flex items-center gap-0.5 rounded border border-[var(--plum)]/40 bg-[var(--plum)]/15 px-1 py-px font-mono text-[0.26rem] text-[var(--cream-soft)] shadow-sm"
                    >
                      <Icon icon="tabler:shopping-cart" width={7} height={7} className="shrink-0" aria-hidden="true" />
                      (0)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-cap-web-clean-glow
              className="pointer-events-none absolute inset-0 z-[18] bg-[radial-gradient(ellipse_85%_55%_at_50%_28%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_62%)] opacity-0"
            />
            <div
              data-cap-web-clean
              className="absolute inset-0 z-20 flex flex-col bg-[var(--background)] p-1.5 opacity-0 sm:p-2"
            >
              <div
                data-cap-web-solve-shell
                className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[11px] border border-[color-mix(in_srgb,var(--cream)_14%,var(--line))] bg-[color-mix(in_srgb,var(--surface)_82%,var(--ink)_18%)] p-2 shadow-[0_20px_56px_rgba(0,0,0,0.5)] backdrop-blur-[10px] sm:rounded-[12px] sm:p-2.5"
              >
                <div
                  data-cap-web-solve-orb
                  className="pointer-events-none absolute -right-6 -top-8 h-[4.5rem] w-[4.5rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,color-mix(in_srgb,var(--accent)_55%,transparent),color-mix(in_srgb,var(--teal)_25%,transparent)_45%,transparent_72%)] opacity-0 blur-[2px]"
                  aria-hidden="true"
                />
                <nav
                  data-cap-web-nav
                  className="relative z-[2] mb-1.5 flex shrink-0 items-center justify-between gap-1 rounded-[10px] border border-[color-mix(in_srgb,var(--cream)_12%,var(--line))] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-1.5 py-1 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--cream)_8%,transparent)] backdrop-blur-[8px] sm:mb-2 sm:rounded-[11px] sm:px-2 sm:py-1.5"
                  aria-label="Navegación demo"
                >
                  <div
                    data-cap-web-nav-seg
                    className="flex min-w-0 items-center gap-1 sm:gap-1.5"
                  >
                    <span className="relative flex h-2 w-2 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(145deg,var(--teal),var(--accent)_55%,var(--lime))] shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_40%,transparent)] sm:h-2.5 sm:w-2.5 sm:rounded-lg">
                      <Icon
                        icon="tabler:hexagon"
                        className="text-[var(--ink)]"
                        width={7}
                        height={7}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="truncate font-display text-[0.42rem] font-semibold tracking-tight text-[var(--cream)] sm:text-[0.48rem]">
                      Theros
                    </span>
                  </div>
                  <div
                    data-cap-web-nav-seg
                    className="hidden min-w-0 items-center gap-2 font-mono text-[0.3rem] text-[var(--muted)] min-[400px]:flex sm:gap-2.5 sm:text-[0.34rem]"
                  >
                    <span className="inline-flex shrink-0 items-center gap-0.5">
                      <Icon icon="tabler:home" width={8} height={8} className="text-[var(--teal)]" aria-hidden="true" />
                      Inicio
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-0.5 text-[var(--cream-soft)]">
                      <Icon icon="tabler:briefcase" width={8} height={8} className="opacity-90" aria-hidden="true" />
                      Servicios
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-0.5">
                      <Icon icon="tabler:layout-grid" width={8} height={8} aria-hidden="true" />
                      Casos
                    </span>
                  </div>
                  <div data-cap-web-nav-seg className="shrink-0">
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-[color-mix(in_srgb,var(--accent)_45%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] px-1.5 py-px font-mono text-[0.28rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] sm:px-2 sm:py-0.5 sm:text-[0.3rem]">
                      <Icon icon="tabler:calendar" width={9} height={9} className="shrink-0" aria-hidden="true" />
                      Agendar
                    </span>
                  </div>
                </nav>
                <div
                  data-cap-web-landing-scroll
                  className="relative z-[1] min-h-0 flex-1 overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,var(--line)_70%,transparent)] bg-[color-mix(in_srgb,var(--background)_55%,var(--surface)_45%)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--cream)_6%,transparent)] sm:rounded-[11px]"
                >
                  <div
                    data-cap-web-landing-track
                    className="will-change-transform"
                  >
                    <div className="relative overflow-hidden rounded-b-[9px] border-b border-[color-mix(in_srgb,var(--cream)_8%,transparent)] px-1.5 pb-2 pt-1.5 sm:px-2 sm:pb-2.5 sm:pt-2">
                      <div
                        data-cap-web-hero-media
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_18%_0%,color-mix(in_srgb,var(--teal)_22%,transparent),transparent_58%),radial-gradient(ellipse_70%_70%_at_92%_18%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%),linear-gradient(168deg,color-mix(in_srgb,var(--ink)_40%,transparent)_0%,transparent_48%)] opacity-0"
                        aria-hidden="true"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--cream)_6%,transparent),transparent)]" />
                      <div className="relative z-[1] flex items-end gap-1.5 sm:gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 inline-flex items-center gap-0.5 font-mono text-[0.28rem] font-medium uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--accent)_85%,var(--muted))] sm:text-[0.3rem]">
                            <Icon icon="tabler:sparkles" width={9} height={9} className="text-[var(--accent)]" aria-hidden="true" />
                            Experiencia enfocada
                          </p>
                          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                            {headlineWords.map((w, i) => (
                              <span
                                key={`${w}-${i}`}
                                data-cap-web-word
                                className={`font-display font-medium leading-[1.06] tracking-[-0.03em] text-[var(--cream)] ${
                                  i === 0 || i === 2
                                    ? "text-[0.7rem] sm:text-[0.82rem]"
                                    : "text-[0.6rem] text-[var(--cream-soft)] sm:text-[0.7rem]"
                                }`}
                              >
                                {w}
                              </span>
                            ))}
                          </div>
                          <p
                            data-cap-web-sub
                            className="mt-1.5 max-w-[98%] font-mono text-[0.34rem] leading-relaxed text-[var(--muted)] sm:mt-2 sm:max-w-[94%] sm:text-[0.38rem]"
                          >
                            <span className="mr-0.5 inline-block align-middle">
                              <Icon icon="tabler:layout-align-left" width={10} height={10} className="text-[var(--teal)] opacity-90" aria-hidden="true" />
                            </span>
                            Una jerarquía que guía. Un solo movimiento que cierra.
                          </p>
                          <div className="mt-2 flex justify-start sm:mt-2.5">
                            <div
                              data-cap-web-cta
                              className="relative inline-flex items-center gap-0.5 rounded-full bg-[linear-gradient(92deg,var(--teal),var(--accent)_52%,var(--lime)_98%)] px-3 py-1.5 font-mono text-[0.36rem] font-bold uppercase tracking-[0.14em] text-[var(--ink)] opacity-0 shadow-[0_4px_22px_color-mix(in_srgb,var(--accent)_34%,transparent)] sm:px-3.5 sm:text-[0.4rem]"
                            >
                              Pedir propuesta
                              <Icon icon="tabler:arrow-narrow-right" width={11} height={11} className="shrink-0" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <div
                          data-cap-web-hero-photo
                          className="relative z-[2] h-[3.35rem] w-[2.9rem] shrink-0 overflow-hidden rounded-[10px] border border-[color-mix(in_srgb,var(--cream)_20%,var(--line))] bg-[var(--surface)] shadow-[0_14px_32px_rgba(0,0,0,0.48),0_0_0_1px_color-mix(in_srgb,var(--accent)_12%,transparent)] sm:h-[3.9rem] sm:w-[3.25rem]"
                        >
                          <Image
                            alt="Referencia: interfaz web nítida, jerarquía visual y acabado de producto"
                            src={CAP_WEB_HERO_REFERENCE_SRC}
                            fill
                            className="object-cover object-[center_25%]"
                            sizes="130px"
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,color-mix(in_srgb,var(--teal)_12%,transparent)_0%,transparent_42%,color-mix(in_srgb,var(--ink)_50%,transparent)_100%)]"
                            aria-hidden="true"
                          />
                          <span className="pointer-events-none absolute bottom-0.5 left-0.5 rounded px-0.5 font-mono text-[0.2rem] font-semibold uppercase tracking-[0.14em] text-[var(--cream)] shadow-[0_1px_6px_rgba(0,0,0,0.55)] sm:bottom-1 sm:left-1 sm:text-[0.22rem]">
                            Ref.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5 px-1.5 pb-2 pt-1 sm:space-y-2 sm:px-2 sm:pb-2.5 sm:pt-1.5">
                      <p className="inline-flex items-center gap-0.5 font-mono text-[0.3rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] sm:text-[0.32rem]">
                        <Icon icon="tabler:bulb" width={9} height={9} className="text-[var(--lime)]" aria-hidden="true" />
                        Por qué ahora
                      </p>
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        <div className="rounded-lg border border-[color-mix(in_srgb,var(--line)_80%,transparent)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-1 sm:p-1.5">
                          <div className="flex items-center gap-0.5">
                            <Icon icon="tabler:chart-line" width={8} height={8} className="shrink-0 text-[var(--teal)]" aria-hidden="true" />
                            <div className="h-1 min-w-0 flex-1 rounded bg-[var(--line)]/85 sm:h-1.5" />
                          </div>
                          <div className="mt-1 space-y-0.5">
                            <div className="h-0.5 w-full rounded bg-[var(--muted-dim)]/45" />
                            <div className="h-0.5 w-[88%] rounded bg-[var(--muted-dim)]/35" />
                          </div>
                          <div className="mt-1 inline-flex items-center gap-0.5 font-mono text-[0.26rem] text-[var(--teal)] sm:text-[0.28rem]">
                            <Icon icon="tabler:trending-up" width={8} height={8} className="shrink-0" aria-hidden="true" />
                            +34% conv.
                          </div>
                        </div>
                        <div className="rounded-lg border border-[color-mix(in_srgb,var(--line)_80%,transparent)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-1 sm:p-1.5">
                          <div className="flex items-center gap-0.5">
                            <Icon icon="tabler:route" width={8} height={8} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
                            <div className="h-1 min-w-0 flex-1 rounded bg-[var(--line)]/85 sm:h-1.5" />
                          </div>
                          <div className="mt-1 space-y-0.5">
                            <div className="h-0.5 w-full rounded bg-[var(--muted-dim)]/45" />
                            <div className="h-0.5 w-[72%] rounded bg-[var(--muted-dim)]/35" />
                          </div>
                          <div className="mt-1 inline-flex items-center gap-0.5 font-mono text-[0.26rem] text-[var(--accent)] sm:text-[0.28rem]">
                            <Icon icon="tabler:run" width={8} height={8} className="shrink-0" aria-hidden="true" />
                            Menos fricción
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-[color-mix(in_srgb,var(--cream)_10%,var(--line))] bg-[color-mix(in_srgb,var(--surface-2)_75%,transparent)] p-1 sm:p-1.5">
                        <div className="flex items-center gap-1">
                          <div className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--teal),var(--accent))] sm:h-3 sm:w-3">
                            <Icon icon="tabler:quote" width={7} height={7} className="text-[var(--ink)]" aria-hidden="true" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="h-0.5 w-[40%] rounded bg-[var(--cream-soft)]/35" />
                            <div className="h-0.5 w-full rounded bg-[var(--muted-dim)]/40" />
                            <div className="h-0.5 w-[92%] rounded bg-[var(--muted-dim)]/35" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-1.5 left-2 inline-flex items-center gap-0.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-[var(--muted)] sm:left-3 sm:text-[0.58rem]">
          <Icon icon="tabler:browser" width={12} height={12} className="text-[var(--accent)] opacity-90" aria-hidden="true" />
          web · narrativa
        </p>
      </div>
    );
  }

  if (variant === "cap-mobile") {
    return (
      <div
        ref={rootRef}
        className="relative h-[15.5rem] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-[18.5rem]"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_38%,color-mix(in_srgb,var(--lime)_9%,transparent),transparent_65%)]" />
        <div className="pointer-events-none absolute left-2 right-2 top-2 z-40 min-h-[2.65rem] px-1 text-center sm:left-3 sm:right-3">
          <p
            data-cap-mob-copy-hook
            className="relative font-display text-[0.56rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.66rem]"
          >
            Un producto se juzga en segundos.
          </p>
          <p
            data-cap-mob-copy-flow
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.56rem] font-medium leading-snug text-[var(--cream-soft)] sm:text-[0.66rem]"
          >
            Flujos móviles claros.
          </p>
          <p
            data-cap-mob-copy-feel
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.56rem] font-medium leading-snug text-[var(--teal)] sm:text-[0.66rem]"
          >
            Se siente bien desde la primera sesión.
          </p>
          <p
            data-cap-mob-copy-measure
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.56rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.66rem]"
          >
            Todo es medible.
          </p>
          <p
            data-cap-mob-copy-close
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.56rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.66rem]"
          >
            Diseñamos productos que funcionan desde el primer toque.
          </p>
          <p
            data-cap-mob-copy-cta
            className="invisible absolute left-0 right-0 top-[1.35rem] font-mono text-[0.48rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent)] sm:top-[1.45rem] sm:text-[0.52rem]"
          >
            UX que convierte.
          </p>
        </div>
        <div className="absolute inset-x-2 bottom-2 top-[3.15rem] flex items-center justify-center sm:inset-x-3 sm:top-[3.35rem]">
          <div className="relative isolate flex items-center justify-center">
            <div
              data-cap-mob-hand
              className={
                resolvedTune.capMobileHandDesign === "geometric-cradle"
                  ? "pointer-events-none absolute bottom-[4.5%] left-1/2 z-[1] w-[5rem] -translate-x-[5.3rem] md:bottom-[5%] md:w-[5.2rem] md:-translate-x-[5.8rem]"
                  : "pointer-events-none absolute bottom-[4.5%] left-1/2 z-[1] w-[4.5rem] -translate-x-[5.4rem] md:bottom-[5%] md:w-[4.75rem] md:-translate-x-[5.55rem]"
              }
            >
              <CapMobileHandSilhouette design={resolvedTune.capMobileHandDesign} />
            </div>
            <div
              className="pointer-events-none absolute -bottom-1 left-1/2 z-0 h-4 w-[6.5rem] -translate-x-1/2 rounded-[100%] bg-[color-mix(in_srgb,var(--ink)_18%,transparent)] opacity-20 blur-md md:bottom-0 md:h-5 md:w-[7rem] md:opacity-[0.22]"
              aria-hidden="true"
            />
            <div
              data-cap-mob-device
              className="relative z-20 h-[11.6rem] w-[5.85rem] rounded-[1.32rem] border-2 border-[var(--line-strong)] bg-[var(--ink)] p-[3px] shadow-[0_16px_48px_rgba(0,0,0,0.45)] md:h-[12.6rem] md:w-[6.2rem] md:p-1"
            >
            <div
              data-cap-mob-notch
              className="absolute left-1/2 top-1.5 z-20 h-1 w-7 -translate-x-1/2 rounded-full bg-[var(--surface-2)]"
            />
            <div className="relative h-full w-full min-h-0 overflow-hidden rounded-[0.9rem] bg-[var(--background)] md:rounded-[0.95rem]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[25] flex h-[1.1rem] shrink-0 items-center justify-between border-b border-[var(--line)]/35 bg-[var(--background)]/98 px-1.5 pt-0.5 font-mono text-[0.24rem] text-[var(--muted)]">
                <span className="inline-flex items-center gap-0.5">
                  <Icon icon="tabler:clock" width={8} height={8} className="opacity-80" aria-hidden="true" />
                  9:41
                </span>
                <span className="flex items-center gap-0.5 text-[var(--muted-dim)]" aria-hidden="true">
                  <Icon icon="tabler:wifi" width={9} height={9} />
                  <Icon icon="tabler:battery-3" width={10} height={8} />
                </span>
              </div>
              <div
                data-cap-mob-splash
                className="absolute inset-0 z-[5] flex flex-col items-center justify-center bg-[var(--background)] p-2 pt-[1.6rem]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[1rem] bg-[linear-gradient(155deg,var(--teal),var(--accent)_45%,var(--lime)_90%)] shadow-[0_6px_16px_color-mix(in_srgb,var(--accent)_25%,transparent)] md:h-9 md:w-9 md:rounded-[1.1rem]">
                  <Icon
                    icon="tabler:sparkles"
                    className="text-[var(--ink)]"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-center font-display text-[0.4rem] font-semibold tracking-tight text-[var(--cream)]">
                  Wavys
                </p>
                <div className="mt-1.5 flex w-9 items-center gap-0.5">
                  <Icon icon="tabler:activity" className="text-[var(--accent)]" width={9} height={9} aria-hidden="true" />
                  <div className="h-0.5 min-w-0 flex-1 rounded-full bg-[var(--line)]" />
                </div>
                <div className="mt-1 h-0.5 w-7 rounded-full bg-[var(--muted-dim)]/50" />
              </div>
              <div
                data-cap-mob-flow
                className="absolute inset-0 z-[6] flex min-h-0 flex-col bg-[var(--background)] p-1.5 pt-[1.45rem]"
              >
                <div className="mb-0.5 inline-flex shrink-0 items-center gap-0.5 font-mono text-[0.28rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                  <Icon icon="tabler:list-check" className="text-[var(--teal)]" width={9} height={9} aria-hidden="true" />
                  Acciones
                </div>
                <div data-cap-mob-list className="flex min-h-0 flex-col gap-0.5 overflow-hidden pb-[4.5rem]">
                  <div className="flex w-full shrink-0 items-center gap-0.5">
                    <Icon icon="tabler:user" className="shrink-0 text-[var(--muted)]" width={8} height={8} aria-hidden="true" />
                    <div className="h-1.5 min-w-0 flex-1 rounded-md bg-[var(--surface-2)]" />
                    <Icon icon="tabler:chevron-right" className="shrink-0 text-[var(--muted-dim)]" width={7} height={7} aria-hidden="true" />
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-0.5">
                    <Icon icon="tabler:bell" className="shrink-0 text-[var(--muted)]" width={8} height={8} aria-hidden="true" />
                    <div className="relative h-1.5 min-w-0 flex-1 rounded-md bg-[var(--surface-2)]">
                      <div
                        data-cap-mob-tapzone
                        className="absolute inset-0 rounded-md ring-1 ring-[var(--accent)]/40"
                      />
                    </div>
                    <Icon icon="tabler:chevron-right" className="shrink-0 text-[var(--muted-dim)]" width={7} height={7} aria-hidden="true" />
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-0.5">
                    <Icon icon="tabler:calendar" className="shrink-0 text-[var(--muted)]" width={8} height={8} aria-hidden="true" />
                    <div className="h-1.5 min-w-0 flex-1 rounded-md bg-[var(--surface-2)]" />
                    <Icon icon="tabler:chevron-right" className="shrink-0 text-[var(--muted-dim)]" width={7} height={7} aria-hidden="true" />
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-0.5">
                    <Icon icon="tabler:credit-card" className="shrink-0 text-[var(--muted)]" width={8} height={8} aria-hidden="true" />
                    <div className="h-1.5 w-[88%] min-w-0 rounded-md bg-[var(--surface-2)]" />
                    <Icon icon="tabler:chevron-right" className="shrink-0 text-[var(--muted-dim)]" width={7} height={7} aria-hidden="true" />
                  </div>
                </div>
                <div
                  data-cap-mob-sheet
                  className="absolute bottom-0 left-0 right-0 z-10 max-h-[45%] rounded-t-[0.8rem] border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_98%,var(--background))] px-1.5 pb-1.5 pt-1 shadow-[0_-6px_22px_rgba(0,0,0,0.18)]"
                >
                  <div className="mx-auto mb-1 h-0.5 w-4 rounded-full bg-[var(--muted-dim)]/65" />
                  <p className="flex items-center justify-center gap-0.5 text-center font-display text-[0.44rem] font-medium leading-tight text-[var(--cream)]">
                    <Icon icon="tabler:hand-finger" className="text-[var(--accent)]" width={11} height={11} aria-hidden="true" />
                    Confirmar
                  </p>
                  <p className="mt-0.5 flex items-center justify-center gap-0.5 text-center font-mono text-[0.26rem] leading-tight text-[var(--muted)]">
                    <Icon icon="tabler:arrows-vertical" width={7} height={7} className="shrink-0 opacity-90" aria-hidden="true" />
                    Tap
                    <span className="text-[var(--line)]" aria-hidden="true">
                      ·
                    </span>
                    <Icon icon="tabler:arrows-move-vertical" width={7} height={7} className="shrink-0 opacity-90" aria-hidden="true" />
                    scroll
                    <span className="text-[var(--line)]" aria-hidden="true">
                      ·
                    </span>
                    <Icon icon="tabler:check" width={7} height={7} className="shrink-0 text-[var(--lime)]" aria-hidden="true" />
                    listo
                  </p>
                </div>
              </div>
              <div
                data-cap-mob-success
                className="absolute inset-0 z-[15] flex items-center justify-center bg-[color-mix(in_srgb,var(--ink)_40%,transparent)] pt-[0.4rem] backdrop-blur-[1.5px]"
              >
                <div
                  data-cap-mob-checkwrap
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--lime)] bg-[color-mix(in_srgb,var(--lime)_16%,var(--surface))] shadow-[0_0_20px_color-mix(in_srgb,var(--lime)_32%,transparent)]"
                >
                  <Icon icon="tabler:check" className="text-[var(--lime)]" width={22} height={22} strokeWidth={2.5} aria-hidden="true" />
                </div>
              </div>
              <div
                data-cap-mob-dash
                className="absolute inset-0 z-[16] flex min-h-0 flex-col gap-0.5 overflow-hidden bg-[var(--background)] p-1.5 pt-[1.45rem]"
              >
                <span className="inline-flex shrink-0 items-center gap-0.5 font-mono text-[0.3rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  <Icon icon="tabler:chart-dots" className="text-[var(--accent)]" width={9} height={9} aria-hidden="true" />
                  Resumen
                </span>
                <div className="shrink-0 rounded-md border border-[var(--line)]/80 bg-[var(--surface)]/90 p-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="inline-flex items-center gap-0.5 font-mono text-[0.28rem] text-[var(--cream-soft)]">
                      <Icon icon="tabler:target" width={8} height={8} className="text-[var(--accent)]" aria-hidden="true" />
                      Conversión
                    </span>
                    <Icon icon="tabler:trending-up" className="text-[var(--accent)]" width={9} height={9} aria-hidden="true" />
                  </div>
                  <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                    <div
                      data-cap-mob-bar-conv
                      className="h-full w-full origin-left scale-x-[0.12] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--teal))]"
                    />
                  </div>
                </div>
                <div className="shrink-0 rounded-md border border-[var(--line)]/80 bg-[var(--surface)]/90 p-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="inline-flex items-center gap-0.5 font-mono text-[0.28rem] text-[var(--cream-soft)]">
                      <Icon icon="tabler:users" width={8} height={8} className="text-[var(--teal)]" aria-hidden="true" />
                      Retención
                    </span>
                    <Icon icon="tabler:trending-up" className="text-[var(--lime)]" width={9} height={9} aria-hidden="true" />
                  </div>
                  <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                    <div
                      data-cap-mob-bar-ret
                      className="h-full w-full origin-left scale-x-[0.12] rounded-full bg-[linear-gradient(90deg,var(--teal),var(--lime))]"
                    />
                  </div>
                </div>
                <div className="mt-0.5 flex h-[2.15rem] shrink-0 flex-col justify-center rounded border border-[var(--line)]/50 bg-[var(--surface-2)]/45 p-1">
                  <span className="mb-0.5 inline-flex items-center gap-0.5 font-mono text-[0.24rem] text-[var(--muted)]">
                    <Icon icon="tabler:chart-line" width={8} height={8} className="text-[var(--teal)]" aria-hidden="true" />
                    Tendencia
                  </span>
                  <div
                    data-cap-mob-spark
                    className="h-px w-full origin-left scale-x-[0.15] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--teal),var(--lime))] opacity-25"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <p className="absolute bottom-1.5 left-2 inline-flex items-center gap-0.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-[var(--muted)] sm:left-3 sm:text-[0.58rem]">
          <Icon icon="tabler:device-mobile" width={12} height={12} className="text-[var(--lime)] opacity-90" aria-hidden="true" />
          mobile · ux
        </p>
      </div>
    );
  }

  if (variant === "cap-systems") {
    const notifChaosLayout = [
      { left: "2%", top: "3%" },
      { left: "32%", top: "1%" },
      { left: "61%", top: "5%" },
      { left: "5%", top: "30%" },
      { left: "35%", top: "28%" },
      { left: "63%", top: "32%" },
      { left: "10%", top: "54%" },
      { left: "44%", top: "56%" },
    ] as const;
    const notifMeta = [
      {
        name: "WhatsApp",
        icon: "simple-icons:whatsapp" as const,
        iconClass: "text-[#25d366]",
        sub: "3 grupos · 12 no leídos",
        tone: "bg-[#25d366]/20 border-[#25d366]/40 text-[var(--cream-soft)]",
      },
      {
        name: "Gmail",
        icon: "simple-icons:gmail" as const,
        iconClass: "text-[#ea4335]",
        sub: "Fwd: Fwd: URGENTE",
        tone: "bg-[color-mix(in_srgb,#ea4335_12%,var(--background))] border-[#ea4335]/35 text-[var(--cream-soft)]",
      },
      {
        name: "Slack",
        icon: "simple-icons:slack" as const,
        iconClass: "text-[#4a154b]",
        sub: "@channel ¿alguien?",
        tone: "bg-[#5b5fc7]/20 border-[#5b5fc7]/40 text-[var(--cream-soft)]",
      },
      {
        name: "Teams",
        icon: "simple-icons:microsoftteams" as const,
        iconClass: "text-[#6264a7]",
        sub: "3 reuniones hoy + grabación",
        tone: "bg-[#6264a7]/16 border-[#6264a7]/35 text-[var(--cream-soft)]",
      },
      {
        name: "Notion",
        icon: "simple-icons:notion" as const,
        iconClass: "text-[var(--cream)]",
        sub: "Comentó en «Roadmap Q3»",
        tone: "bg-[var(--surface)]/90 border-[var(--line)] text-[var(--cream-soft)]",
      },
      {
        name: "Discord",
        icon: "simple-icons:discord" as const,
        iconClass: "text-[#5865f2]",
        sub: "74 mensajes en #soporte",
        tone: "bg-[#5865f2]/16 border-[#5865f2]/38 text-[var(--cream-soft)]",
      },
      {
        name: "Calendar",
        icon: "simple-icons:googlecalendar" as const,
        iconClass: "text-[#4285f4]",
        sub: "Invitación: «¿reagendamos?»",
        tone: "bg-[#4285f4]/14 border-[#4285f4]/32 text-[var(--cream-soft)]",
      },
      {
        name: "Outlook",
        icon: "simple-icons:microsoftoutlook" as const,
        iconClass: "text-[#0078d4]",
        sub: "Re: Re: Re: presupuesto",
        tone: "bg-[var(--muted-dim)]/30 border-[#0078d4]/30 text-[var(--cream-soft)]",
      },
    ] as const;
    const leadFlow = [
      { label: "Entra", icon: "tabler:inbox" as const },
      { label: "Asigna", icon: "tabler:user-check" as const },
      { label: "Avisa", icon: "tabler:bell-ringing" as const },
      { label: "Agenda", icon: "tabler:calendar-event" as const },
    ] as const;
    const boardCols = [
      { title: "Pendiente", tone: "border-[var(--muted-dim)]/60", headIcon: "tabler:clock" as const },
      { title: "En proceso", tone: "border-[var(--accent)]/45", headIcon: "tabler:player-play" as const },
      { title: "Listo", tone: "border-[var(--lime)]/45", headIcon: "tabler:circle-check" as const },
    ] as const;
    return (
      <div
        ref={rootRef}
        className="relative h-[15.5rem] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-[18.5rem]"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_55%_at_50%_40%,color-mix(in_srgb,var(--teal)_10%,transparent),transparent_62%)]" />
        <div className="pointer-events-none absolute left-2 right-2 top-2 z-40 min-h-[2.5rem] px-0.5 text-center sm:left-3 sm:right-3">
          <p
            data-cap-sys-c1
            className="relative font-display text-[0.52rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.62rem]"
          >
            Tu equipo no tiene un problema de trabajo…
          </p>
          <p
            data-cap-sys-c2
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--cream-soft)] sm:text-[0.62rem]"
          >
            Tiene un problema de sistema.
          </p>
          <p
            data-cap-sys-c3
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-semibold leading-snug text-[var(--accent)] sm:text-[0.62rem]"
          >
            Los mensajes no son un sistema.
          </p>
          <p
            data-cap-sys-c4
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--teal)] sm:text-[0.62rem]"
          >
            Necesitas estructura.
          </p>
          <p
            data-cap-sys-c5
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.62rem]"
          >
            Automatizaciones que hacen el trabajo.
          </p>
          <p
            data-cap-sys-c6
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--lime)] sm:text-[0.62rem]"
          >
            Menos ruido. Más control.
          </p>
          <p
            data-cap-sys-c7
            className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.62rem]"
          >
            Construimos software interno que escala contigo.
          </p>
        </div>
        <div className="absolute inset-x-2 bottom-2 top-[3rem] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--background)]/95 sm:inset-x-3 sm:top-[3.15rem]">
          <div
            data-cap-sys-chaos
            className="absolute inset-0 z-[8] overflow-hidden p-1.5 sm:p-2"
          >
            <div className="relative h-full min-h-[8rem]">
              {notifMeta.map((n, i) => (
                <div
                  key={i}
                  data-cap-sys-notif
                  className={`absolute max-w-[48%] rounded-md border px-1.5 py-1 shadow-sm sm:max-w-[44%] ${n.tone}`}
                  style={{
                    left: notifChaosLayout[i]?.left ?? "4%",
                    top: notifChaosLayout[i]?.top ?? "4%",
                  }}
                >
                  <div className="flex items-start gap-1 sm:gap-1.5">
                    <span className={`mt-0.5 shrink-0 ${n.iconClass}`} aria-hidden="true">
                      <Icon icon={n.icon} width={18} height={18} className="sm:h-[1.1rem] sm:w-[1.1rem]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[0.4rem] font-bold leading-tight sm:text-[0.44rem]">
                        {n.name}
                      </div>
                      <div className="mt-0.5 font-mono text-[0.3rem] leading-tight opacity-90 sm:text-[0.32rem]">
                        {n.sub}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div
                data-cap-sys-quote
                className="absolute bottom-[18%] left-[6%] max-w-[78%] rounded-lg border border-[var(--line)] bg-[var(--surface)]/95 px-1.5 py-1 font-mono text-[0.38rem] text-[var(--cream-soft)] opacity-0 shadow-sm"
              >
                ¿Quién vio esto?
              </div>
              <div
                data-cap-sys-quote
                className="absolute bottom-[38%] right-[8%] max-w-[72%] rounded-lg border border-[var(--accent)]/30 bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] px-1.5 py-1 text-right font-mono text-[0.38rem] text-[var(--cream-soft)] opacity-0 shadow-sm"
              >
                ¿Ya se hizo?
              </div>
              <div
                data-cap-sys-quote
                className="absolute bottom-[52%] left-[12%] max-w-[70%] rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-1.5 py-1 font-mono text-[0.38rem] text-[var(--muted)] opacity-0 shadow-sm"
              >
                Se me pasó.
              </div>
              <div className="absolute bottom-[4%] left-[10%] flex flex-wrap gap-0.5">
                {["Tarea A", "¿versión?", "duplicado"].map((t, i) => (
                  <span
                    key={t}
                    data-cap-sys-lost
                    className="rounded border border-dashed border-[var(--muted-dim)]/70 bg-[var(--surface)]/80 px-1 py-px font-mono text-[0.32rem] text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            data-cap-sys-veil
            className="pointer-events-none absolute inset-0 z-[18] bg-[var(--ink)] opacity-0"
          />
          <div
            data-cap-sys-board
            className="absolute inset-0 z-[12] flex flex-col gap-1 overflow-hidden p-1.5 opacity-0 sm:gap-1.5 sm:p-2"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="inline-flex items-center gap-0.5 font-mono text-[0.38rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                <Icon icon="tabler:layout-kanban" className="text-[var(--teal)]" width={10} height={10} aria-hidden="true" />
                Operación
              </span>
              <span className="inline-flex items-center gap-0.5 rounded bg-[var(--teal)]/15 px-1 py-px font-mono text-[0.32rem] text-[var(--teal)]">
                <Icon icon="tabler:activity" width={9} height={9} aria-hidden="true" />
                en vivo
              </span>
            </div>
            <div className="relative flex min-h-0 flex-1 gap-1">
              {boardCols.map((col) => (
                <div
                  key={col.title}
                  data-cap-sys-col
                  className={`flex min-w-0 flex-1 flex-col gap-0.5 rounded-md border bg-[var(--surface)]/90 p-1 ${col.tone}`}
                >
                  <span className="inline-flex items-center justify-center gap-0.5 text-center font-mono text-[0.32rem] uppercase tracking-wider text-[var(--muted)]">
                    <Icon
                      icon={col.headIcon}
                      className="shrink-0 text-[var(--accent)] opacity-90"
                      width={9}
                      height={9}
                      aria-hidden="true"
                    />
                    {col.title}
                  </span>
                  <div className="h-2 rounded-sm bg-[var(--line)]/70" />
                  <div className="h-2 rounded-sm bg-[var(--line)]/50" />
                </div>
              ))}
              <div
                data-cap-sys-link
                className="pointer-events-none absolute left-[31%] top-[42%] h-px w-[10%] -translate-y-1/2 rounded-full bg-[var(--accent)]/45 opacity-20"
              />
              <div
                data-cap-sys-link
                className="pointer-events-none absolute left-[64%] top-[42%] h-px w-[10%] -translate-y-1/2 rounded-full bg-[var(--teal)]/45 opacity-20"
              />
            </div>
            <div className="shrink-0 rounded-md border border-[var(--line)]/80 bg-[var(--surface-2)]/60 p-1">
              <div className="mb-0.5 inline-flex items-center gap-0.5 font-mono text-[0.32rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                <Icon icon="tabler:arrow-narrow-right" className="text-[var(--accent)]" width={9} height={9} aria-hidden="true" />
                Lead → acción
              </div>
              <div className="relative flex items-center justify-between px-0.5 pt-0.5">
                {leadFlow.map((step) => (
                  <div key={step.label} className="flex flex-col items-center gap-0.5">
                    <div
                      data-cap-sys-node
                      className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] shadow-sm sm:h-[1.1rem] sm:w-[1.1rem]"
                    >
                      <Icon
                        icon={step.icon}
                        className="text-[var(--accent)]"
                        width={12}
                        height={12}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="max-w-[2.6rem] text-center font-mono text-[0.28rem] leading-none text-[var(--muted)]">
                      {step.label}
                    </span>
                  </div>
                ))}
                <div
                  data-cap-sys-orb
                  className="pointer-events-none absolute top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_35%,var(--background))] shadow-[0_0_10px_var(--accent)]"
                  style={{ left: "6%" }}
                />
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-1">
              <div className="rounded border border-[var(--line)]/70 bg-[var(--surface)]/90 p-1">
                <span className="inline-flex items-center gap-0.5 font-mono text-[0.3rem] text-[var(--muted)]">
                  <Icon icon="tabler:chart-line" width={9} height={9} className="text-[var(--accent)]" aria-hidden="true" />
                  Throughput
                </span>
                <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div
                    data-cap-sys-kpi-bar
                    className="h-full w-full origin-left scale-x-[0.18] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--teal))]"
                  />
                </div>
              </div>
              <div className="rounded border border-[var(--line)]/70 bg-[var(--surface)]/90 p-1">
                <span className="inline-flex items-center gap-0.5 font-mono text-[0.3rem] text-[var(--muted)]">
                  <Icon icon="tabler:clock-hour-4" width={9} height={9} className="text-[var(--teal)]" aria-hidden="true" />
                  SLA equipo
                </span>
                <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div
                    data-cap-sys-kpi-bar
                    className="h-full w-full origin-left scale-x-[0.18] rounded-full bg-[linear-gradient(90deg,var(--teal),var(--lime))]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-1.5 left-2 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-[var(--muted)] sm:left-3 sm:text-[0.58rem]">
          systems · orden
        </p>
      </div>
    );
  }

  const brandHookChars = [
    { ch: "N", cls: "font-serif text-[var(--accent)]" },
    { ch: "o", cls: "font-mono text-[var(--lime)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "e", cls: "font-display text-[var(--teal)]" },
    { ch: "s", cls: "font-sans text-[var(--plum)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "s", cls: "font-mono text-[var(--cream-soft)]" },
    { ch: "o", cls: "font-serif text-[var(--muted-dim)]" },
    { ch: "l", cls: "font-display text-[var(--accent)]" },
    { ch: "o", cls: "font-mono text-[var(--lime)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "·", cls: "font-serif text-[var(--muted)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "c", cls: "font-mono text-[var(--teal)]" },
    { ch: "ó", cls: "font-sans text-[var(--accent)]" },
    { ch: "m", cls: "font-display text-[var(--cream)]" },
    { ch: "o", cls: "font-serif text-[var(--lime)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "s", cls: "font-mono text-[var(--plum)]" },
    { ch: "e", cls: "font-sans text-[var(--teal)]" },
    { ch: " ", cls: "w-1 shrink-0" },
    { ch: "v", cls: "font-display text-[var(--accent)]" },
    { ch: "e", cls: "font-mono text-[var(--cream-soft)]" },
  ] as const;
  const brandChaosBlobs = [
    { bg: "bg-[var(--accent)]", left: "8%", top: "62%", size: "h-2.5 w-2.5 rounded-sm" },
    { bg: "bg-[var(--lime)]", left: "72%", top: "58%", size: "h-3 w-4 rounded-full" },
    { bg: "bg-[var(--teal)]", left: "22%", top: "70%", size: "h-2 w-5 rounded-none" },
    { bg: "bg-[var(--plum)]", left: "55%", top: "68%", size: "h-3.5 w-3 rounded-md" },
    { bg: "bg-[var(--muted-dim)]", left: "88%", top: "72%", size: "h-2 w-2 rotate-12 rounded-sm" },
  ] as const;
  const brandChaosFloatIcons = [
    { icon: "simple-icons:figma" as const, left: "4%", top: "8%", rot: -14, className: "text-[#0acf83]" },
    { icon: "tabler:typography" as const, left: "34%", top: "0%", rot: 8, className: "text-[var(--accent)]" },
    { icon: "simple-icons:adobe" as const, left: "54%", top: "20%", rot: 10, className: "text-[#ff0000]" },
    { icon: "tabler:color-swatch" as const, left: "76%", top: "2%", rot: -9, className: "text-[var(--teal)]" },
    { icon: "tabler:brush" as const, left: "18%", top: "58%", rot: 16, className: "text-[var(--plum)]" },
    { icon: "tabler:vector" as const, left: "88%", top: "48%", rot: -11, className: "text-[var(--lime)]" },
  ] as const;
  const brandScaleViewIcons = [
    "tabler:device-mobile",
    "tabler:device-tablet",
    "tabler:device-laptop",
    "tabler:device-desktop",
  ] as const;
  return (
    <div
      ref={rootRef}
      className="relative h-[15.5rem] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)] md:h-[18.5rem]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_48%_38%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_60%)]" />
      <div className="pointer-events-none absolute left-2 right-2 top-2 z-40 min-h-[2.5rem] px-0.5 text-center sm:left-3 sm:right-3">
        <p
          data-cap-brand-c1
          className="relative font-display text-[0.52rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.62rem]"
        >
          No es solo cómo se ve…
        </p>
        <p
          data-cap-brand-c2
          className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--cream-soft)] sm:text-[0.62rem]"
        >
          Es cómo se conecta todo.
        </p>
        <p
          data-cap-brand-c3
          className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-semibold leading-snug text-[var(--accent)] sm:text-[0.62rem]"
        >
          Tipografía. Color. Ritmo. Atmósfera.
        </p>
        <p
          data-cap-brand-c4
          className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--teal)] sm:text-[0.62rem]"
        >
          Traducido en una interfaz coherente.
        </p>
        <p
          data-cap-brand-c5
          className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--cream)] sm:text-[0.62rem]"
        >
          Lista para escalar.
        </p>
        <p
          data-cap-brand-c6
          className="invisible absolute left-0 right-0 top-0 font-display text-[0.52rem] font-medium leading-snug text-[var(--lime)] sm:text-[0.62rem]"
        >
          Diseño que no se rompe al crecer.
        </p>
      </div>
      <div className="absolute inset-x-2 bottom-2 top-[3rem] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--background)]/95 sm:inset-x-3 sm:top-[3.15rem]">
        <div
          data-cap-brand-chaos
          className="absolute inset-0 z-[8] flex flex-col items-center justify-center gap-3 p-2 sm:p-3"
        >
          <div className="flex max-w-[98%] flex-wrap items-center justify-center gap-y-1">
            {brandHookChars.map((item, i) =>
              item.ch === " " ? (
                <span key={`s-${i}`} className={item.cls} aria-hidden="true" />
              ) : (
                <span
                  key={`c-${i}`}
                  data-cap-brand-chaotic-letter
                  className={`inline-block text-[0.62rem] leading-none sm:text-[0.72rem] ${item.cls}`}
                >
                  {item.ch}
                </span>
              ),
            )}
          </div>
          <div className="relative h-16 w-full sm:h-[4.5rem]">
            {brandChaosBlobs.map((b, i) => (
              <div
                key={i}
                data-cap-brand-chaos-blob
                className={`absolute ${b.size} ${b.bg} opacity-90 shadow-sm`}
                style={{ left: b.left, top: b.top }}
              />
            ))}
            {brandChaosFloatIcons.map((fi, i) => (
              <div
                key={`float-${i}`}
                className="pointer-events-none absolute opacity-90 drop-shadow-sm"
                style={{ left: fi.left, top: fi.top, transform: `rotate(${fi.rot}deg)` }}
                aria-hidden="true"
              >
                <Icon icon={fi.icon} className={fi.className} width={18} height={18} />
              </div>
            ))}
          </div>
        </div>
        <div
          data-cap-brand-messy
          className="absolute inset-0 z-[10] flex flex-col justify-center gap-2 p-2 opacity-0 sm:p-3"
        >
          <div className="flex flex-wrap items-end gap-1.5 sm:gap-2">
            <div
              data-cap-brand-messy-bit
              className="inline-flex items-center gap-0.5 rounded-sm bg-[var(--accent)]/35 px-2 py-1 font-mono text-[0.38rem] text-[var(--cream)]"
            >
              <Icon icon="tabler:circle-check" width={11} height={11} className="shrink-0" aria-hidden="true" />
              OK
            </div>
            <div
              data-cap-brand-messy-bit
              className="inline-flex items-center gap-0.5 rounded-full border-2 border-[var(--lime)] bg-transparent px-3 py-0.5 font-serif text-[0.42rem] text-[var(--lime)]"
            >
              <Icon icon="tabler:send" width={10} height={10} className="shrink-0" aria-hidden="true" />
              enviar
            </div>
            <div
              data-cap-brand-messy-bit
              className="inline-flex items-center justify-center gap-0.5 rounded-none bg-[var(--surface-2)] px-1.5 py-1.5 font-sans text-[0.5rem] font-bold text-[var(--teal)]"
            >
              <Icon icon="tabler:plus" width={12} height={12} className="shrink-0" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-1 flex flex-col gap-1.5">
            <div
              data-cap-brand-messy-bit
              className="flex w-[88%] items-center gap-0.5"
            >
              <Icon
                icon="tabler:layout-align-left"
                width={9}
                height={9}
                className="shrink-0 text-[var(--muted)]"
                aria-hidden="true"
              />
              <div className="h-2 min-w-0 flex-1 rounded-md bg-[var(--line)]/80" />
            </div>
            <div
              data-cap-brand-messy-bit
              className="flex w-[62%] items-center gap-0.5"
            >
              <Icon
                icon="tabler:line-height"
                width={9}
                height={9}
                className="shrink-0 text-[var(--muted)]"
                aria-hidden="true"
              />
              <div className="h-3 min-w-0 flex-1 rounded-sm bg-[var(--surface-2)]" />
            </div>
            <div
              data-cap-brand-messy-bit
              className="ml-3 flex w-[72%] items-center gap-0.5"
            >
              <Icon
                icon="tabler:layout-distribute-horizontal"
                width={9}
                height={9}
                className="shrink-0 text-[var(--muted)]"
                aria-hidden="true"
              />
              <div className="h-2 min-w-0 flex-1 rounded-lg bg-[var(--muted-dim)]/40" />
            </div>
          </div>
        </div>
        <div
          data-cap-brand-order
          className="absolute inset-0 z-[12] flex flex-col justify-center gap-2 p-2 opacity-0 sm:p-3"
        >
          <div className="inline-flex items-center gap-0.5 font-mono text-[0.28rem] uppercase tracking-[0.12em] text-[var(--muted)]">
            <Icon icon="tabler:components" width={9} height={9} className="text-[var(--teal)]" aria-hidden="true" />
            Orden visual
          </div>
          <div
            data-cap-brand-type-messy
            className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-dashed border-[var(--line)]/60 pb-2"
          >
            <span className="inline-flex items-end gap-0.5">
              <Icon icon="tabler:bold" width={10} height={10} className="text-[var(--accent)]" aria-hidden="true" />
              <span className="font-serif text-[0.55rem] text-[var(--accent)]">Aa</span>
            </span>
            <span className="inline-flex items-end gap-0.5">
              <Icon icon="tabler:italic" width={10} height={10} className="text-[var(--lime)]" aria-hidden="true" />
              <span className="font-mono text-[0.48rem] text-[var(--lime)]">Bb</span>
            </span>
            <span className="inline-flex items-end gap-0.5">
              <Icon icon="tabler:underline" width={10} height={10} className="text-[var(--teal)]" aria-hidden="true" />
              <span className="font-sans text-[0.52rem] text-[var(--teal)]">Cc</span>
            </span>
          </div>
          <div
            data-cap-brand-type-clean
            className="inline-flex items-center gap-0.5 font-mono text-[0.48rem] font-medium tracking-tight text-[var(--cream)] opacity-0 sm:text-[0.52rem]"
          >
            <Icon icon="tabler:letter-case" width={11} height={11} className="shrink-0 text-[var(--teal)]" aria-hidden="true" />
            Aa · voz única · interlineado fijo
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Icon icon="tabler:palette" width={10} height={10} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />
            {[
              { fill: "var(--accent)" },
              { fill: "var(--teal)" },
              { fill: "var(--lime)" },
            ].map((s, i) => (
              <div
                key={i}
                data-cap-brand-swatch-order
                className="h-6 w-6 rounded-md border border-[var(--line)] shadow-sm sm:h-7 sm:w-7"
                style={{ backgroundColor: s.fill }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <div className="mb-0.5 inline-flex items-center gap-0.5 font-mono text-[0.26rem] text-[var(--muted)]">
              <Icon icon="tabler:layout" width={9} height={9} className="text-[var(--accent)]" aria-hidden="true" />
              Grilla
            </div>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                data-cap-brand-grid
                className="h-px w-full origin-left bg-[var(--line)]"
              />
            ))}
          </div>
        </div>
        <div
          data-cap-brand-kit
          className="absolute inset-0 z-[14] flex flex-col justify-center gap-2 p-2 opacity-0 sm:p-3"
        >
          <span className="inline-flex items-center gap-0.5 font-mono text-[0.32rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            <Icon icon="tabler:puzzle" width={10} height={10} className="text-[var(--accent)]" aria-hidden="true" />
            UI kit
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div
              data-cap-brand-kit-bit
              className="inline-flex items-center gap-0.5 rounded-md bg-[var(--accent)] px-2.5 py-1 font-mono text-[0.36rem] font-medium text-[var(--ink)]"
            >
              <Icon icon="tabler:cursor-text" width={11} height={11} className="shrink-0 text-[var(--ink)]" aria-hidden="true" />
              Acción
            </div>
            <div
              data-cap-brand-kit-bit
              className="inline-flex h-5 min-w-[4.5rem] items-center gap-0.5 rounded-md border border-[var(--line)] bg-[var(--surface)] px-1.5 font-mono text-[0.32rem] text-[var(--muted)]"
            >
              <Icon icon="tabler:input" width={10} height={10} className="shrink-0 opacity-80" aria-hidden="true" />
              input
            </div>
            <div
              data-cap-brand-kit-bit
              className="rounded-lg border border-[var(--line)]/80 bg-[var(--surface-2)]/90 px-2 py-1.5"
            >
              <div className="mb-0.5 inline-flex items-center gap-0.5 font-mono text-[0.24rem] text-[var(--muted)]">
                <Icon icon="tabler:layout-cards" width={8} height={8} aria-hidden="true" />
                card
              </div>
              <div className="h-1 w-8 rounded-sm bg-[var(--line)]/70" />
              <div className="mt-1 h-1 w-6 rounded-sm bg-[var(--line)]/50" />
            </div>
          </div>
          <div
            data-cap-brand-kit-dup
            className="mt-1 rounded-lg border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--surface)_92%,var(--background))] p-1.5 opacity-0"
          >
            <span className="mb-1 flex items-center gap-0.5 font-mono text-[0.28rem] uppercase tracking-wider text-[var(--muted)]">
              <Icon icon="tabler:copy" width={9} height={9} className="text-[var(--teal)]" aria-hidden="true" />
              misma pieza · otra pantalla
            </span>
            <div className="flex items-center gap-1">
              <div
                data-cap-brand-kit-dup-bit
                className="inline-flex items-center gap-0.5 rounded-md bg-[var(--accent)] px-2 py-0.5 font-mono text-[0.28rem] font-medium text-[var(--ink)]"
              >
                <Icon icon="tabler:cursor-text" width={9} height={9} className="shrink-0 text-[var(--ink)]" aria-hidden="true" />
                Acción
              </div>
              <div
                data-cap-brand-kit-dup-bit
                className="inline-flex h-4 min-w-[3.2rem] items-center gap-0.5 rounded-md border border-[var(--line)] bg-[var(--surface)] px-1 font-mono text-[0.26rem] text-[var(--muted)]"
              >
                <Icon icon="tabler:input" width={8} height={8} className="shrink-0 opacity-80" aria-hidden="true" />
                input
              </div>
              <div
                data-cap-brand-kit-dup-bit
                className="rounded-md border border-[var(--line)]/80 bg-[var(--surface-2)]/90 px-1.5 py-1"
              >
                <div className="h-0.5 w-5 rounded-sm bg-[var(--line)]/70" />
              </div>
            </div>
          </div>
        </div>
        <div
          data-cap-brand-scale
          className="absolute inset-0 z-[16] flex items-center justify-center gap-1 p-1.5 opacity-0 sm:gap-1.5 sm:p-2"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              data-cap-brand-scale-frame
              className="flex h-[4.2rem] w-[22%] max-w-[4.5rem] flex-col gap-0.5 rounded-md border border-[var(--line)]/80 bg-[var(--surface)]/95 p-1 shadow-sm sm:h-[4.8rem]"
            >
              <div className="flex items-center justify-between gap-0.5">
                <div className="flex gap-px">
                  <span className="h-0.5 w-0.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-0.5 w-0.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-0.5 w-0.5 rounded-full bg-[#28c840]/80" />
                </div>
                <Icon
                  icon={brandScaleViewIcons[i] ?? "tabler:app-window"}
                  className="text-[var(--teal)]"
                  width={9}
                  height={9}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-0.5 h-1 flex-1 rounded-sm bg-[var(--surface-2)]/80" />
              <div className="mt-auto h-1.5 w-[70%] rounded-sm bg-[var(--accent)]/85" />
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-1.5 left-2 inline-flex items-center gap-0.5 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-[var(--muted)] sm:left-3 sm:text-[0.58rem]">
        <Icon icon="tabler:palette" width={11} height={11} className="text-[var(--accent)] opacity-90" aria-hidden="true" />
        brand · sistema
      </p>
    </div>
  );
}

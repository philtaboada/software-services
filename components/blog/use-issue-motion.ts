"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useIssueMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-reveal], [data-hero], [data-clip], [data-rank-row], [data-rank-bar], [data-chart], [data-page], .rb-sign-letter",
          { autoAlpha: 1, y: 0, x: 0, scale: 1, clearProps: "clipPath" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-hero-cover]", { scale: 1.16, duration: 1.8, ease: "power2.out" }, 0)
          .from("[data-hero]", { autoAlpha: 0, y: 28, duration: 0.7, stagger: 0.08 }, 0.2)
          .add(() => {
            gsap.to("[data-hero-cover]", {
              scale: 1.07,
              duration: 16,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 36,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>(":scope > *");
          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 0 12% 0)", scale: 1.06 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-chip]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            scale: 0.6,
            duration: 0.45,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        const rankRows = gsap.utils.toArray<HTMLElement>("[data-rank-row]");
        if (rankRows.length) {
          gsap.from(rankRows, {
            autoAlpha: 0,
            x: -24,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: rankRows[0], start: "top 86%", once: true },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-rank-bar]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              transformOrigin: "left center",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-rank-score]").forEach((el) => {
          const end = Number(el.dataset.score || "0");
          const obj = { n: 0 };
          gsap.to(obj, {
            n: end,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.n));
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-chart]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-page]").forEach((el, i) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            rotate: i % 2 === 0 ? -2 : 2,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        const sign = root.querySelector<HTMLElement>("[data-write-sign]");
        const signLetters = gsap.utils.toArray<HTMLElement>(".rb-sign-letter");

        if (sign && signLetters.length) {
          gsap.set(signLetters, { autoAlpha: 0, y: 14, rotate: -12 });
          gsap.to(signLetters, {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 0.22,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: { trigger: sign, start: "top 88%", once: true, toggleActions: "play none none none" },
          });
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope },
  );
}

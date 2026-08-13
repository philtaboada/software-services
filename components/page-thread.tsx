"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pt = { x: number; y: number };

export function ThreadNode({ className }: { className?: string }) {
  return (
    <span
      data-thread-node
      aria-hidden
      className={`pointer-events-none absolute h-px w-px ${className ?? ""}`}
    />
  );
}

function rel(el: Element, page: DOMRect): Pt {
  const r = el.getBoundingClientRect();
  return {
    x: r.left - page.left + r.width / 2,
    y: r.top - page.top + r.height / 2,
  };
}

function poly(pts: Pt[]): string {
  if (!pts.length) return "";
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

function catmull(start: Pt, rest: Pt[]): string {
  const pts = [start, ...rest];
  if (pts.length < 2) return "";
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 8;
    const c1y = p1.y + (p2.y - p0.y) / 8;
    const c2x = p2.x - (p3.x - p1.x) / 8;
    const c2y = p2.y - (p3.y - p1.y) / 8;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function collectNodes(page: HTMLElement, pageRect: DOMRect): Pt[] {
  const nodes = page.querySelectorAll<HTMLElement>("[data-thread-node]");
  const pts: Pt[] = [];
  nodes.forEach((node) => {
    const r = node.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const p = rel(node, pageRect);
    const prev = pts[pts.length - 1];
    if (prev && Math.hypot(p.x - prev.x, p.y - prev.y) < 28) return;
    pts.push(p);
  });
  return pts;
}

export function PageThread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const main = mainRef.current;
      const head = headRef.current;
      const grad = gradRef.current;
      const page = wrap?.parentElement;
      if (!wrap || !main || !head || !page) return;

      const state = {
        total: 0,
        intro: 0,
        progress: 0,
        introDone: false,
        introStarted: false,
        samples: [] as Array<{ len: number; yMax: number }>,
      };

      const lengthAtY = (targetY: number, floor = 0) => {
        const { samples, total } = state;
        if (!samples.length || !total) return floor;
        let lo = 0;
        let hi = samples.length - 1;
        let best = floor;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          const item = samples[mid];
          if (!item) break;
          if (item.yMax <= targetY) {
            best = item.len;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }
        return Math.max(floor, Math.min(best, total));
      };

      const apply = () => {
        const { total } = state;
        if (!total) return;

        const pageTop = page.getBoundingClientRect().top + window.scrollY;
        const targetY = window.scrollY + window.innerHeight * 0.58 - pageTop;
        const drawn = lengthAtY(targetY, state.intro);
        gsap.set(main, { strokeDashoffset: Math.max(total - drawn, 0) });
        const tip = main.getPointAtLength(Math.max(drawn - 0.8, 0));
        head.setAttribute("cx", String(tip.x));
        head.setAttribute("cy", String(tip.y));
      };

      const layout = () => {
        const w = page.offsetWidth;
        const h = page.offsetHeight;
        if (w < 8 || h < 8) return;

        wrap.style.width = `${w}px`;
        wrap.style.height = `${h}px`;
        const svg = wrap.querySelector("svg");
        svg?.setAttribute("viewBox", `0 0 ${w} ${h}`);
        if (grad) grad.setAttribute("y2", String(h));

        const pageRect = page.getBoundingClientRect();
        const rest = collectNodes(page, pageRect);
        const d = rest.length
          ? `${poly([rest[0]])}${catmull(rest[0], rest.slice(1))}`
          : "";

        main.setAttribute("d", d);

        const total = d ? main.getTotalLength() : 0;
        const samples: Array<{ len: number; yMax: number }> = [];
        if (total > 0) {
          const steps = 160;
          let yMax = 0;
          for (let i = 0; i <= steps; i++) {
            const len = (i / steps) * total;
            yMax = Math.max(yMax, main.getPointAtLength(len).y);
            samples.push({ len, yMax });
          }
        }
        state.total = total;
        state.samples = samples;

        const mark = page.querySelector("[data-hero-mark]");
        const introY = mark
          ? mark.getBoundingClientRect().bottom - pageRect.top + 48
          : (rest[1]?.y ?? 0);
        state.intro = total ? lengthAtY(introY, 0) : 0;

        gsap.set(main, { strokeDasharray: total });

        if (state.introDone) {
          apply();
        } else if (!state.introStarted) {
          gsap.set(main, { strokeDashoffset: total });
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        layout();
        gsap.set(main, { strokeDashoffset: 0, opacity: 0.35 });
        gsap.set(head, { opacity: 0 });
        const onRefresh = () => {
          state.introDone = true;
          layout();
          gsap.set(main, { strokeDashoffset: 0 });
        };
        ScrollTrigger.addEventListener("refreshInit", onRefresh);
        return () => ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        layout();
        state.introStarted = true;

        const intro = gsap.timeline({ delay: 0.42 });
        intro.to(main, {
          strokeDashoffset: () => Math.max(state.total - state.intro, 0),
          duration: 1.35,
          ease: "expo.out",
          onUpdate: () => {
            const total = state.total;
            if (!total) return;
            const offset = Number(gsap.getProperty(main, "strokeDashoffset"));
            const drawn = Math.max(total - offset, 0);
            const tip = main.getPointAtLength(Math.min(drawn, total));
            head.setAttribute("cx", String(tip.x));
            head.setAttribute("cy", String(tip.y));
          },
          onComplete: () => {
            state.introDone = true;
          },
        });

        const st = ScrollTrigger.create({
          trigger: page,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress === 0 && !state.introDone) return;
            if (self.progress > 0.01) {
              intro.kill();
              state.introDone = true;
            }
            apply();
          },
          onRefresh: (self) => {
            layout();
            if (self.progress > 0.02) {
              intro.kill();
              state.introDone = true;
              apply();
            } else if (state.introDone) {
              apply();
            }
          },
        });

        const onRefreshInit = () => layout();
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

        return () => {
          intro.kill();
          st.kill();
          ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
        };
      });

      let timer = 0;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 90);
      });
      ro.observe(page);
      page.querySelectorAll("img").forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        }
      });
      void document.fonts?.ready?.then(() => ScrollTrigger.refresh());

      return () => {
        window.clearTimeout(timer);
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="page-thread pointer-events-none absolute left-0 top-0 overflow-visible"
      aria-hidden
    >
      <svg className="block h-full w-full overflow-visible">
        <defs>
          <linearGradient
            ref={gradRef}
            id="page-thread-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="4000"
          >
            <stop offset="0%" stopColor="#01fd91" />
            <stop offset="45%" stopColor="#5ad2d0" />
            <stop offset="100%" stopColor="#01fd91" />
          </linearGradient>
        </defs>
        <path ref={mainRef} className="page-thread-path" />
        <circle ref={headRef} r="4.5" className="page-thread-head" />
      </svg>
    </div>
  );
}

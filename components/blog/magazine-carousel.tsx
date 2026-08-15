"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { RadarIssue } from "@/lib/radar-issues";

type ShelfCard = {
  id: string;
  number: number;
  weekLabel: string;
  title: string;
  dek: string;
  color: string;
  cover?: string;
  href?: string;
};

const UPCOMING: Omit<ShelfCard, "id">[] = [
  { number: 2, weekLabel: "N°2 · próximo viernes", title: "Pronto", dek: "Se cierra el viernes.", color: "#6d5cff" },
  { number: 3, weekLabel: "N°3", title: "Pronto", dek: "Ya se va a ver.", color: "#ff7b6b" },
  { number: 4, weekLabel: "N°4", title: "Pronto", dek: "Ya se va a ver.", color: "#14c4b4" },
  { number: 5, weekLabel: "N°5", title: "Pronto", dek: "Ya se va a ver.", color: "#c8f04d" },
  { number: 6, weekLabel: "N°6", title: "Pronto", dek: "Ya se va a ver.", color: "#3b6bff" },
  { number: 7, weekLabel: "N°7", title: "Pronto", dek: "Ya se va a ver.", color: "#ff6b3b" },
  { number: 8, weekLabel: "N°8", title: "Pronto", dek: "Ya se va a ver.", color: "#c084fc" },
  { number: 9, weekLabel: "N°9", title: "Pronto", dek: "Ya se va a ver.", color: "#f472b6" },
];

const FAN: Record<number, { x: number; y: number; rz: number; ry: number; s: number }> = {
  [-2]: { x: -28, y: 7, rz: -14, ry: 22, s: 0.9 },
  [-1]: { x: -14, y: 2, rz: -7, ry: 12, s: 0.96 },
  [0]: { x: 0, y: -1.5, rz: 0, ry: 0, s: 1.08 },
  [1]: { x: 14, y: 2, rz: 7, ry: -12, s: 0.96 },
  [2]: { x: 28, y: 7, rz: 14, ry: -22, s: 0.9 },
};

const MOBILE_FAN: Record<number, { x: number; y: number; rz: number; ry: number; s: number }> = {
  [-2]: { x: -22, y: 14, rz: -16, ry: 26, s: 0.72 },
  [-1]: { x: -12, y: 6, rz: -9, ry: 16, s: 0.86 },
  [0]: { x: 0, y: -2, rz: 0, ry: 0, s: 1.12 },
  [1]: { x: 12, y: 6, rz: 9, ry: -16, s: 0.86 },
  [2]: { x: 22, y: 14, rz: 16, ry: -26, s: 0.72 },
};

const SLOTS = [-2, -1, 0, 1, 2] as const;

function buildCards(issues: RadarIssue[]): ShelfCard[] {
  const first = issues[0];
  const live: ShelfCard[] = first
    ? [
        {
          id: first.slug,
          number: first.number,
          weekLabel: first.weekLabel,
          title: first.title,
          dek: first.dek,
          color: "#0c1410",
          cover: first.cover,
          href: `/blog/${first.slug}`,
        },
      ]
    : [];

  return [...live, ...UPCOMING.map((item) => ({ ...item, id: `soon-${item.number}` }))];
}

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function circularOffset(index: number, active: number, total: number) {
  let offset = index - active;
  const half = Math.floor(total / 2);
  if (offset > half) offset -= total;
  if (offset < -half) offset += total;
  return offset;
}

export function MagazineCarousel({ issues }: { issues: RadarIssue[] }) {
  const cards = buildCards(issues);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const activeRef = useRef(active);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  activeRef.current = active;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % cards.length);
    }, mobile ? 2800 : 3400);
    return () => window.clearInterval(timer);
  }, [paused, cards.length, mobile]);

  const poses = mobile ? MOBILE_FAN : FAN;

  function go(delta: number) {
    setActive(wrapIndex(activeRef.current + delta, cards.length));
  }

  function focusSlot(slot: number) {
    setPaused(true);
    if (slot === 0) return;
    go(slot);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!mobile) return;
    drag.current = { x: event.clientX, y: event.clientY };
    setPaused(true);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!mobile || !drag.current) return;
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    if (Math.abs(dx) > 36) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    if (ratio < 0.28) go(-1);
    else if (ratio > 0.72) go(1);
  }

  return (
    <div
      className={`rb-shelf${mobile ? " rb-shelf--mobile" : ""}`}
      onPointerLeave={() => {
        drag.current = null;
        setPaused(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {cards.map((card, index) => {
        const offset = circularOffset(index, active, cards.length);
        const pose = poses[offset];
        const hidden = !pose;
        const isCenter = offset === 0;
        const style = pose ?? poses[offset > 0 ? 2 : -2];

        return (
          <article
            key={card.id}
            className={`rb-shelf-card${isCenter ? " is-center" : ""}`}
            style={{
              transform: `translateX(calc(-50% + ${style.x}vmin)) translateY(${style.y}vmin) rotate(${style.rz}deg) rotateY(${style.ry}deg) scale(${style.s})`,
              zIndex: isCenter ? 12 : 10 - Math.abs(offset),
              opacity: hidden ? 0 : 1,
              pointerEvents: isCenter && card.href ? "auto" : "none",
            }}
          >
            <MagazineFace
              card={card}
              featured={isCenter && Boolean(card.href)}
              onOpen={(event) => {
                if (swiped.current) {
                  event.preventDefault();
                  swiped.current = false;
                }
              }}
            />
          </article>
        );
      })}

      {!mobile &&
        SLOTS.filter((slot) => slot !== 0).map((slot) => (
          <button
            key={slot}
            type="button"
            aria-label={`Ver tapa ${slot < 0 ? "izquierda" : "derecha"}`}
            className="rb-shelf-hit"
            style={{
              left: `calc(50% + ${FAN[slot].x}vmin)`,
              transform: `translateX(-50%) translateY(${FAN[slot].y}vmin)`,
              zIndex: 11,
            }}
            onPointerEnter={() => focusSlot(slot)}
          />
        ))}

      {mobile ? <p className="rb-shelf-hint">Deslizá para ver las tapas</p> : null}
    </div>
  );
}

function MagazineFace({
  card,
  featured,
  onOpen,
}: {
  card: ShelfCard;
  featured: boolean;
  onOpen?: (event: React.MouseEvent) => void;
}) {
  const inner = (
    <div className="rb-shelf-face" style={{ background: card.color }}>
      {card.cover ? (
        <Image src={card.cover} alt="" fill sizes="320px" className="object-cover" priority={card.number === 1} />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_78%,rgba(255,255,255,0.32),transparent_48%)]" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: card.cover
            ? "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.18))"
            : "linear-gradient(to top, rgba(0,0,0,0.22), transparent 45%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <div>
          <p className="font-[var(--rb-sans)] text-[1.55rem] font-extrabold leading-none tracking-[-0.045em] text-white">
            Radar
          </p>
          <p className="mt-1 text-[12px] text-white/80">{card.weekLabel}</p>
        </div>
        {featured ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4e27a] px-3.5 py-1.5 text-[12px] font-bold text-black shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
            Leer
            <span aria-hidden className="grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] text-[#f4e27a]">
              →
            </span>
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-[var(--rb-sans)] text-[1.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
          {card.title}
        </p>
        <p className="mt-1 text-sm text-white/75">{card.dek}</p>
      </div>
    </div>
  );

  if (card.href) {
    return (
      <Link href={card.href} className="block h-full w-full no-underline" onClick={onOpen}>
        {inner}
      </Link>
    );
  }

  return <div className="h-full w-full">{inner}</div>;
}

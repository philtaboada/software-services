"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

type Pose = { x: number; y: number; rz: number; ry: number; s: number; o: number };

const UPCOMING: Omit<ShelfCard, "id">[] = [
  { number: 2, weekLabel: "N°2", title: "Pronto", dek: "Se cierra el viernes.", color: "#6d5cff" },
  { number: 3, weekLabel: "N°3", title: "Pronto", dek: "Ya se va a ver.", color: "#ff7b6b" },
  { number: 4, weekLabel: "N°4", title: "Pronto", dek: "Ya se va a ver.", color: "#14c4b4" },
  { number: 5, weekLabel: "N°5", title: "Pronto", dek: "Ya se va a ver.", color: "#c8f04d" },
  { number: 6, weekLabel: "N°6", title: "Pronto", dek: "Ya se va a ver.", color: "#3b6bff" },
  { number: 7, weekLabel: "N°7", title: "Pronto", dek: "Ya se va a ver.", color: "#ff6b3b" },
  { number: 8, weekLabel: "N°8", title: "Pronto", dek: "Ya se va a ver.", color: "#c084fc" },
  { number: 9, weekLabel: "N°9", title: "Pronto", dek: "Ya se va a ver.", color: "#f472b6" },
];

// x / y se expresan en porcentaje del propio tamaño de la tapa: el abanico
// escala solo cuando cambia el tamaño de las cards.
const FAN: Record<number, Pose> = {
  [-3]: { x: -132, y: 9, rz: -20, ry: 30, s: 0.72, o: 0 },
  [-2]: { x: -98, y: 5, rz: -13, ry: 22, s: 0.83, o: 1 },
  [-1]: { x: -51, y: 1.5, rz: -6.5, ry: 12, s: 0.92, o: 1 },
  [0]: { x: 0, y: -2, rz: 0, ry: 0, s: 1, o: 1 },
  [1]: { x: 51, y: 1.5, rz: 6.5, ry: -12, s: 0.92, o: 1 },
  [2]: { x: 98, y: 5, rz: 13, ry: -22, s: 0.83, o: 1 },
  [3]: { x: 132, y: 9, rz: 20, ry: -30, s: 0.72, o: 0 },
};

const MOBILE_FAN: Record<number, Pose> = {
  [-3]: { x: -104, y: 12, rz: -24, ry: 32, s: 0.58, o: 0 },
  [-2]: { x: -72, y: 7, rz: -16, ry: 25, s: 0.7, o: 1 },
  [-1]: { x: -38, y: 2.5, rz: -8.5, ry: 15, s: 0.85, o: 1 },
  [0]: { x: 0, y: -2, rz: 0, ry: 0, s: 1, o: 1 },
  [1]: { x: 38, y: 2.5, rz: 8.5, ry: -15, s: 0.85, o: 1 },
  [2]: { x: 72, y: 7, rz: 16, ry: -25, s: 0.7, o: 1 },
  [3]: { x: 104, y: 12, rz: 24, ry: -32, s: 0.58, o: 0 },
};

const RESUME_DELAY = 7000;
const SWIPE_THRESHOLD = 56;

function buildCards(issues: RadarIssue[]): ShelfCard[] {
  const live: ShelfCard[] = issues.map((issue) => ({
    id: issue.slug,
    number: issue.number,
    weekLabel: issue.weekLabel,
    title: issue.title,
    dek: issue.dek,
    color: "#0c1410",
    cover: issue.cover,
    href: `/blog/${issue.slug}`,
  }));

  const pending = UPCOMING.filter((item) => !live.some((card) => card.number === item.number));

  return [...live, ...pending.map((item) => ({ ...item, id: `soon-${item.number}` }))];
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
  const cards = useMemo(() => buildCards(issues), [issues]);
  const total = cards.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const shelfRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);
  const swiped = useRef(false);

  const holdPause = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
    setPaused(true);
  }, []);

  const pauseFor = useCallback((ms: number) => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    setPaused(true);
    resumeTimer.current = window.setTimeout(() => setPaused(false), ms);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActive(wrapIndex(index, total));
      pauseFor(RESUME_DELAY);
    },
    [total, pauseFor],
  );

  const go = useCallback(
    (delta: number) => {
      setActive((current) => wrapIndex(current + delta, total));
      pauseFor(RESUME_DELAY);
    },
    [total, pauseFor],
  );

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, total));
    }, mobile ? 3600 : 4200);
    return () => window.clearInterval(timer);
  }, [paused, total, mobile, active]);

  // Trackpad y rueda: la página del índice no scrollea, así que el gesto
  // horizontal o vertical mueve el abanico.
  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    let locked = false;

    function onWheel(event: WheelEvent) {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 14) return;
      event.preventDefault();
      if (locked) return;
      locked = true;
      go(delta > 0 ? 1 : -1);
      window.setTimeout(() => {
        locked = false;
      }, 420);
    }

    shelf.addEventListener("wheel", onWheel, { passive: false });
    return () => shelf.removeEventListener("wheel", onWheel);
  }, [go]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const startX = event.clientX;
    const startY = event.clientY;
    let moved = false;

    holdPause();

    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setDragging(false);
      setDragX(0);
    };

    function onMove(moveEvent: PointerEvent) {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!moved) {
        if (Math.abs(dx) < 8) return;
        if (Math.abs(dx) < Math.abs(dy)) {
          stop();
          pauseFor(1200);
          return;
        }
        moved = true;
        setDragging(true);
      }
      setDragX(Math.max(-320, Math.min(320, dx)));
    }

    function onUp(upEvent: PointerEvent) {
      const dx = upEvent.clientX - startX;
      stop();
      if (!moved) {
        pauseFor(RESUME_DELAY);
        return;
      }
      swiped.current = true;
      window.setTimeout(() => {
        swiped.current = false;
      }, 0);
      if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
      else pauseFor(RESUME_DELAY);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(total - 1);
    }
  }

  const poses = mobile ? MOBILE_FAN : FAN;

  return (
    <>
      <div
        ref={shelfRef}
        className={`rb-shelf${dragging ? " is-dragging" : ""}`}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Tapas de Radar"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") holdPause();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") pauseFor(600);
        }}
        onFocus={holdPause}
        onBlur={() => pauseFor(RESUME_DELAY)}
      >
        {cards.map((card, index) => {
          const offset = circularOffset(index, active, total);
          const slot = Math.max(-3, Math.min(3, offset));
          const pose = poses[slot];
          const isCenter = offset === 0;
          const visible = Math.abs(offset) <= 2;
          const parallax = dragX * (1 - Math.abs(slot) * 0.12);

          return (
            <article
              key={card.id}
              className={`rb-shelf-card${isCenter ? " is-center" : ""}`}
              aria-hidden={!visible}
              style={{
                transform: `translateX(calc(-50% + ${pose.x}% + ${parallax}px)) translateY(${pose.y}%) rotate(${pose.rz}deg) rotateY(${pose.ry}deg) scale(${pose.s})`,
                zIndex: 20 - Math.abs(offset),
                opacity: pose.o,
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <MagazineFace
                card={card}
                featured={isCenter && Boolean(card.href)}
                center={isCenter}
                onSelect={() => goTo(index)}
                guardClick={(event) => {
                  if (swiped.current) event.preventDefault();
                }}
              />
            </article>
          );
        })}
      </div>

      <nav className="rb-shelf-nav" aria-label="Navegación de tapas">
        <button type="button" className="rb-shelf-arrow" aria-label="Tapa anterior" onClick={() => go(-1)}>
          <span aria-hidden>←</span>
        </button>

        <div className="rb-shelf-dots">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`rb-shelf-dot${index === active ? " is-on" : ""}`}
              aria-label={`Ver tapa N°${card.number}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
            >
              <span aria-hidden />
            </button>
          ))}
        </div>

        <button type="button" className="rb-shelf-arrow" aria-label="Tapa siguiente" onClick={() => go(1)}>
          <span aria-hidden>→</span>
        </button>
      </nav>
    </>
  );
}

function MagazineFace({
  card,
  featured,
  center,
  onSelect,
  guardClick,
}: {
  card: ShelfCard;
  featured: boolean;
  center: boolean;
  onSelect: () => void;
  guardClick: (event: React.MouseEvent) => void;
}) {
  // La tapa real ya es una portada compuesta: se muestra limpia y solo lleva
  // el botón de lectura. Los números pendientes sí necesitan rótulo.
  const inner = card.cover ? (
    <div className="rb-shelf-face" style={{ background: card.color }}>
      <Image
        src={card.cover}
        alt={`Tapa de Radar ${card.weekLabel}`}
        fill
        sizes="(max-width: 768px) 64vw, 440px"
        className="rb-face-cover"
        priority={card.number === 1}
      />
      <div className="rb-face-veil is-cover" />
      {featured ? (
        <span className="rb-face-cta">
          Leer
          <span aria-hidden>→</span>
        </span>
      ) : null}
    </div>
  ) : (
    <div className="rb-shelf-face" style={{ background: card.color }}>
      <div className="rb-face-tint" />
      <p className="rb-face-num" aria-hidden>
        {card.number}
      </p>
      <div className="rb-face-veil" />
      <div className="rb-face-top">
        <p className="rb-face-brand">Radar</p>
        <p className="rb-face-week">{card.weekLabel}</p>
      </div>
      <div className="rb-face-bottom">
        <p className="rb-face-title">{card.title}</p>
        <p className="rb-face-dek">{card.dek}</p>
      </div>
    </div>
  );

  if (center && card.href) {
    return (
      <Link href={card.href} className="rb-shelf-link" onClick={guardClick}>
        {inner}
      </Link>
    );
  }

  if (center) {
    return <div className="rb-shelf-link">{inner}</div>;
  }

  return (
    <button
      type="button"
      className="rb-shelf-link rb-shelf-pick"
      tabIndex={-1}
      aria-label={`Ver tapa N°${card.number}`}
      onClick={(event) => {
        guardClick(event);
        if (event.defaultPrevented) return;
        onSelect();
      }}
    >
      {inner}
    </button>
  );
}

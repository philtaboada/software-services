"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SpotlightGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest?.("[data-spot]") as HTMLElement | null;
      if (!card || !root.contains(card)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--sx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--sy", `${event.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

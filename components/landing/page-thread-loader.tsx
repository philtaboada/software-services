"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PageThread = dynamic(
  () => import("@/components/page-thread").then((mod) => mod.PageThread),
  { ssr: false },
);

export function PageThreadLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 4500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 4000);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return <PageThread />;
}

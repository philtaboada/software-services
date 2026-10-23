"use client";

import { useEffect } from "react";

export function WorkPlanOpen() {
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      document.querySelectorAll<HTMLDetailsElement>(".work-plan").forEach((details) => {
        details.open = query.matches;
      });
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return null;
}

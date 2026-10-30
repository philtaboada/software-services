"use client";

import { useEffect, useState } from "react";
import type { LandingLocale } from "@/lib/i18n/landing";

type ClockCopy = {
  lima: string;
  local: string;
  zone: string;
  note: string;
  same: string;
  apart: string;
};

function formatTime(date: Date, timeZone: string, locale: LandingLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  }).format(date);
}

function zoneLabel(date: Date, timeZone: string, locale: LandingLocale) {
  const loc = locale === "en" ? "en-GB" : "es-PE";
  try {
    const parts = new Intl.DateTimeFormat(loc, {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    const offset = parts.find((part) => part.type === "timeZoneName")?.value;
    const city = timeZone.split("/").pop()?.replaceAll("_", " ");
    if (city && offset) return `${city} · ${offset}`;
  } catch {
    /* shortOffset is missing in some engines */
  }
  return timeZone.replaceAll("_", " ");
}

function hoursApart(date: Date) {
  const visitor = -date.getTimezoneOffset() / 60;
  const delta = Math.abs(visitor - -5);
  const rounded = Math.round(delta * 2) / 2;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function GlobalClock({
  locale,
  copy,
}: {
  locale: LandingLocale;
  copy: ClockCopy;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [timeZone, setTimeZone] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setNow(new Date());
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || null);
    };
    tick();
    const wait = 60_000 - (Date.now() % 60_000);
    let interval = 0;
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, wait);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  const apart = now ? hoursApart(now) : null;
  const message = apart == null ? copy.note : apart === "0" ? copy.same : copy.apart.replace("{n}", apart);

  return (
    <div className="clock-card">
      <p className="clock-row">
        <span>{copy.lima}</span>
        <time className="clock-time" dateTime={now ? now.toISOString() : undefined}>
          {now ? formatTime(now, "America/Lima", locale) : "—"}
        </time>
        <span className="clock-zone">{copy.zone}</span>
      </p>
      <p className="clock-row">
        <span>{copy.local}</span>
        <time className="clock-time">
          {now && timeZone ? formatTime(now, timeZone, locale) : "—"}
        </time>
        <span className="clock-zone">{now && timeZone ? zoneLabel(now, timeZone, locale) : "—"}</span>
      </p>
      <p className="clock-note" aria-live="polite">
        {message}
      </p>
    </div>
  );
}

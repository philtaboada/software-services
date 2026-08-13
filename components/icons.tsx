export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01" strokeLinecap="round" />
      <path d="M12 17v-4.2c0-1.2.8-2.3 2.2-2.3 1.4 0 1.8.9 1.8 2.3V17" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v9.2a3.8 3.8 0 1 1-3.2-3.75" />
      <path d="M14 8.2c1.4 1.3 3.2 2.1 5.2 2.3" />
    </svg>
  );
}

export function ServiceMark({
  kind,
  className = "h-10 w-10",
}: {
  kind: "webs" | "apps" | "sistemas" | "identidad";
  className?: string;
}) {
  if (kind === "webs") {
    return (
      <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
        <rect x="4" y="8" width="32" height="22" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="9" cy="11" r="1.1" fill="currentColor" />
        <circle cx="13" cy="11" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "apps") {
    return (
      <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
        <rect x="12" y="4" width="16" height="32" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M18 8h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="20" cy="31" r="1.3" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "sistemas") {
    return (
      <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
        <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <rect x="22" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <rect x="14" y="24" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 20v4h16v-4" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 8v24M8 20h24" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11.5 12.5 28.5 27.5M28.5 12.5 11.5 27.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

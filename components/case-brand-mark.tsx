import type { CASE_BRIEFS } from "@/lib/content";

type Slug = keyof typeof CASE_BRIEFS;
type MarkVariant = "lockup" | "icon";

function JunnoLockup() {
  return (
    <>
      <rect x="4" y="16" width="32" height="32" rx="12" fill="currentColor" opacity="0.22" />
      <rect x="15" y="27" width="17" height="17" rx="7" fill="currentColor" opacity="0.65" />
      <rect x="8" y="20" width="17" height="17" rx="7" fill="currentColor" />
      <text x="46" y="42" fill="currentColor" fontSize="26" fontWeight="700" letterSpacing="-0.8">
        Junno
      </text>
    </>
  );
}

function JunnoIcon() {
  return (
    <>
      <rect x="8" y="8" width="48" height="48" rx="16" fill="currentColor" opacity="0.2" />
      <rect x="24" y="24" width="26" height="26" rx="10" fill="currentColor" opacity="0.65" />
      <rect x="14" y="14" width="26" height="26" rx="10" fill="currentColor" />
    </>
  );
}

function AgendaMesaLockup() {
  return (
    <>
      <path
        d="M20 20c0-6 5-10 12-10s12 4 12 10c5 1 8 5 8 10 0 4-2 8-6 10v10H18V40c-4-2-6-6-6-10 0-5 3-9 8-10z"
        fill="currentColor"
      />
      <text x="62" y="42" fill="currentColor" fontSize="22" fontWeight="800" letterSpacing="-0.3">
        AgendaMesa
      </text>
    </>
  );
}

function AgendaMesaIcon() {
  return (
    <path
      d="M18 22c0-8 7-14 14-14s14 6 14 14c7 2 12 8 12 15 0 6-3 11-8 14v13H14V51c-5-3-8-8-8-14 0-7 5-13 12-15z"
      fill="currentColor"
    />
  );
}

function FabreLockup() {
  return (
    <>
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round">
        <path d="M8 46V22l10-8 10 8v24" />
        <path d="M18 46V28h8v18" />
        <path d="M36 46V32h10v14" />
      </g>
      <text x="56" y="30" fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="1.8">
        INMOBILIARIA
      </text>
      <text x="56" y="48" fill="currentColor" fontSize="22" fontWeight="800" letterSpacing="-0.6">
        FABRE
      </text>
    </>
  );
}

function FabreIcon() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round">
      <path d="M10 54V22l14-12 14 12v32" />
      <path d="M24 54V32h12v22" />
      <path d="M42 54V36h14v18" />
    </g>
  );
}

function JlhLockup() {
  return (
    <>
      <path d="M10 38v-16h12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M38 26v16H26" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <text x="52" y="34" fill="currentColor" fontSize="24" fontWeight="800" letterSpacing="-0.8">
        JLH
      </text>
      <text x="52" y="48" fill="currentColor" fontSize="7.5" fontWeight="600" letterSpacing="1.4">
        CORREDORES DE SEGUROS
      </text>
    </>
  );
}

function JlhIcon() {
  return (
    <>
      <path d="M14 46V18h20" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M50 18v28H30" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
    </>
  );
}

function AlcobaLockup() {
  return (
    <text
      x="8"
      y="42"
      fill="currentColor"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="30"
      fontStyle="italic"
      letterSpacing="-0.4"
    >
      la Alcoba
    </text>
  );
}

function AlcobaIcon() {
  return (
    <text
      x="32"
      y="44"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="42"
      fontStyle="italic"
    >
      A
    </text>
  );
}

const LOCKUPS = {
  junno: JunnoLockup,
  "agenda-mesa": AgendaMesaLockup,
  "inmobiliaria-fabre": FabreLockup,
  "jlh-corredores": JlhLockup,
  "la-alcoba": AlcobaLockup,
} as const;

const ICONS = {
  junno: JunnoIcon,
  "agenda-mesa": AgendaMesaIcon,
  "inmobiliaria-fabre": FabreIcon,
  "jlh-corredores": JlhIcon,
  "la-alcoba": AlcobaIcon,
} as const;

export function CaseBrandMark({
  slug,
  name,
  variant = "lockup",
  className,
}: {
  slug: Slug;
  name: string;
  variant?: MarkVariant;
  className?: string;
}) {
  const Mark = variant === "icon" ? ICONS[slug] : LOCKUPS[slug];
  return (
    <svg
      viewBox={variant === "icon" ? "0 0 64 64" : "0 0 220 64"}
      className={className}
      role="img"
      aria-label={name}
      style={{ fontFamily: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif" }}
    >
      <Mark />
    </svg>
  );
}

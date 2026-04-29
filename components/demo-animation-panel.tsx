"use client";

import type { ReactElement } from "react";
import type { CapabilityVisualVariant } from "@/components/capability-visual";
import type { ProcessVisualVariant } from "@/components/process-pipeline-visual";
import {
  CAP_MOBILE_HAND_DESIGN_OPTIONS,
  DEFAULT_CAPABILITY_TUNE,
  DEFAULT_PROCESS_TUNE,
  DEMO_ANIM_MAX_RATE,
  DEMO_ANIM_MIN_RATE,
  type CapabilityAnimationTune,
  type ProcessAnimationTune,
} from "@/lib/demo-animation-tuning";

const panelBase =
  "rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm";

const labelCls = "font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]";

const PROCESS_LABELS: Record<ProcessVisualVariant, string> = {
  "web-scraping": "Extracción web",
  "ai-automation": "IA / automatización",
  "discovery-design": "Discovery / diseño",
  deploy: "Deploy",
  create: "Create",
};

type CapabilityPanelProps = {
  readonly scope: "capability";
  readonly variant: CapabilityVisualVariant;
  readonly value: CapabilityAnimationTune;
  readonly onChange: (next: CapabilityAnimationTune) => void;
  readonly className?: string;
};

type ProcessPanelProps = {
  readonly scope: "process";
  readonly variant: ProcessVisualVariant;
  readonly value: ProcessAnimationTune;
  readonly onChange: (next: ProcessAnimationTune) => void;
  readonly className?: string;
};

export type DemoAnimationPanelProps = CapabilityPanelProps | ProcessPanelProps;

function variantIntensityLabel(scope: "capability" | "process", v: CapabilityVisualVariant | ProcessVisualVariant): string {
  if (scope === "process") {
    return PROCESS_LABELS[v as ProcessVisualVariant] ?? "Proceso";
  }
  switch (v as CapabilityVisualVariant) {
    case "cap-web":
      return "WEB · caos y glitch";
    case "cap-mobile":
      return "MOBILE · feedback fuerte";
    case "cap-systems":
      return "SYSTEMS · tormenta / vibración";
    case "cap-brand":
      return "BRAND · letras erráticas";
    default:
      return "Capacidad";
  }
}

/**
 * Panel lateral para ajustar velocidad, pausa final y opciones por demo (rutas /demos/*).
 */
export function DemoAnimationPanel(props: DemoAnimationPanelProps): ReactElement {
  const { scope, className = "" } = props;
  const variantLabel = variantIntensityLabel(scope, props.variant);
  return (
    <aside
      className={`${panelBase} ${className} lg:sticky lg:top-24`}
      aria-label="Ajustes de animación de la demo"
    >
      <p className={`${labelCls} mb-3`}>Animación</p>
      <h2 className="font-display text-[0.95rem] font-medium leading-snug text-[var(--cream)]">
        Ajustes en vivo
      </h2>
      <p className="mt-1.5 text-[0.72rem] leading-relaxed text-[var(--cream-soft)]/75">
        Velocidad global, pausa al terminar el ciclo y un interruptor por el tipo de demo activa.
      </p>
      {scope === "capability" ? (
        <CapabilityControls value={props.value} onChange={props.onChange} variant={props.variant} variantLabel={variantLabel} />
      ) : (
        <ProcessControls value={props.value} onChange={props.onChange} variantLabel={variantLabel} />
      )}
    </aside>
  );
}

type CapabilityControlsProps = {
  readonly value: CapabilityAnimationTune;
  readonly onChange: (next: CapabilityAnimationTune) => void;
  readonly variant: CapabilityVisualVariant;
  readonly variantLabel: string;
};

function CapabilityControls({
  value,
  onChange,
  variant,
  variantLabel,
}: CapabilityControlsProps): ReactElement {
  return (
    <div className="mt-4 space-y-4">
      <RateSlider value={value.playbackRate} onChange={(playbackRate) => onChange({ ...value, playbackRate })} />
      <PauseSlider value={value.extraEndPauseSec} onChange={(extraEndPauseSec) => onChange({ ...value, extraEndPauseSec })} />
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={value.smoothMotion}
          onChange={(e) => onChange({ ...value, smoothMotion: e.target.checked })}
          className="mt-0.5 h-3.5 w-3.5 rounded border-[var(--line)] bg-[var(--background)] text-[var(--accent)] focus:ring-[var(--accent)]/40"
        />
        <span>
          <span className="block font-mono text-[0.65rem] text-[var(--cream-soft)]">Movimiento suave</span>
          <span className="mt-0.5 block text-[0.65rem] leading-relaxed text-[var(--muted)]">
            Reduce un poco la velocidad efectiva para lectura más calmada.
          </span>
        </span>
      </label>
      <div className="border-t border-[var(--line)]/80 pt-4">
        <p className={labelCls}>Esta demo</p>
        <p className="mt-1 font-mono text-[0.68rem] text-[var(--teal)]">{variantLabel}</p>
        {variant === "cap-web" && (
          <ToggleRow
            checked={value.webHeavyChaos}
            onChange={(webHeavyChaos) => onChange({ ...value, webHeavyChaos })}
            title="Caos fuerte (vibración, glitch, scroll)"
          />
        )}
        {variant === "cap-mobile" && (
          <>
            <fieldset className="mt-3 space-y-2.5">
              <legend className="mb-0.5 block font-mono text-[0.58rem] text-[var(--cream-soft)]">
                Silueta (tres artes)
              </legend>
              {CAP_MOBILE_HAND_DESIGN_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-transparent p-1.5 transition-colors hover:border-[var(--line)]/60 hover:bg-[var(--surface-2)]/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--accent)]/40"
                >
                  <input
                    type="radio"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 border-[var(--line)] bg-[var(--background)] text-[var(--accent)] focus:ring-[var(--accent)]/40"
                    name="cap-mobile-hand-art"
                    checked={value.capMobileHandDesign === opt.id}
                    onChange={() => onChange({ ...value, capMobileHandDesign: opt.id })}
                  />
                  <span>
                    <span className="block font-mono text-[0.65rem] text-[var(--cream)]">{opt.label}</span>
                    <span className="mt-0.5 block text-[0.62rem] leading-relaxed text-[var(--muted)]">
                      {opt.hint}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>
            <ToggleRow
              checked={value.mobileStrongFeedback}
              onChange={(mobileStrongFeedback) => onChange({ ...value, mobileStrongFeedback })}
              title="Feedback fuerte (tap, celebración, spark)"
            />
          </>
        )}
        {variant === "cap-systems" && (
          <ToggleRow
            checked={value.systemsHeavyChaos}
            onChange={(systemsHeavyChaos) => onChange({ ...value, systemsHeavyChaos })}
            title="Tormenta de notificaciones y vibración"
          />
        )}
        {variant === "cap-brand" && (
          <ToggleRow
            checked={value.brandErraticLetters}
            onChange={(brandErraticLetters) => onChange({ ...value, brandErraticLetters })}
            title="Letras y blobs erráticos"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange({ ...DEFAULT_CAPABILITY_TUNE })}
        className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--cream-soft)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--cream)]"
      >
        Restablecer
      </button>
    </div>
  );
}

type ProcessControlsProps = {
  readonly value: ProcessAnimationTune;
  readonly onChange: (next: ProcessAnimationTune) => void;
  readonly variantLabel: string;
};

function ProcessControls({ value, onChange, variantLabel }: ProcessControlsProps): ReactElement {
  return (
    <div className="mt-4 space-y-4">
      <RateSlider value={value.playbackRate} onChange={(playbackRate) => onChange({ ...value, playbackRate })} />
      <PauseSlider value={value.extraEndPauseSec} onChange={(extraEndPauseSec) => onChange({ ...value, extraEndPauseSec })} />
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={value.smoothMotion}
          onChange={(e) => onChange({ ...value, smoothMotion: e.target.checked })}
          className="mt-0.5 h-3.5 w-3.5 rounded border-[var(--line)] bg-[var(--background)] text-[var(--accent)] focus:ring-[var(--accent)]/40"
        />
        <span>
          <span className="block font-mono text-[0.65rem] text-[var(--cream-soft)]">Movimiento suave</span>
          <span className="mt-0.5 block text-[0.65rem] leading-relaxed text-[var(--muted)]">
            Velocidad efectiva algo más lenta.
          </span>
        </span>
      </label>
      <div className="border-t border-[var(--line)]/80 pt-4">
        <p className={labelCls}>Esta demo</p>
        <p className="mt-1 font-mono text-[0.68rem] text-[var(--teal)]">{variantLabel}</p>
        <ToggleRow
          checked={value.heavyEffects}
          onChange={(heavyEffects) => onChange({ ...value, heavyEffects })}
          title="Efectos intensos (pulsos, repeticiones, glows)"
        />
      </div>
      <button
        type="button"
        onClick={() => onChange({ ...DEFAULT_PROCESS_TUNE })}
        className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--cream-soft)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--cream)]"
      >
        Restablecer
      </button>
    </div>
  );
}

type RateSliderProps = {
  readonly value: number;
  readonly onChange: (rate: number) => void;
};

function RateSlider({ value, onChange }: RateSliderProps): ReactElement {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className={labelCls}>Velocidad</span>
        <span className="font-mono text-[0.72rem] tabular-nums text-[var(--accent)]">{value.toFixed(2)}×</span>
      </div>
      <input
        type="range"
        min={DEMO_ANIM_MIN_RATE}
        max={DEMO_ANIM_MAX_RATE}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--surface-2)] accent-[var(--accent)]"
      />
      <p className="mt-1 text-[0.62rem] text-[var(--muted)]">0,25× más lento · 2,5× más rápido</p>
    </div>
  );
}

type PauseSliderProps = {
  readonly value: number;
  readonly onChange: (sec: number) => void;
};

function PauseSlider({ value, onChange }: PauseSliderProps): ReactElement {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className={labelCls}>Pausa al cerrar ciclo</span>
        <span className="font-mono text-[0.72rem] tabular-nums text-[var(--cream-soft)]">{value.toFixed(1)}s</span>
      </div>
      <input
        type="range"
        min={0}
        max={4}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--surface-2)] accent-[var(--teal)]"
      />
      <p className="mt-1 text-[0.62rem] text-[var(--muted)]">Silencio extra antes de que el loop reinicie</p>
    </div>
  );
}

type ToggleRowProps = {
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
  readonly title: string;
};

function ToggleRow({ checked, onChange, title }: ToggleRowProps): ReactElement {
  return (
    <label className="mt-3 flex cursor-pointer items-start gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-3.5 w-3.5 rounded border-[var(--line)] bg-[var(--background)] text-[var(--accent)] focus:ring-[var(--accent)]/40"
      />
      <span className="font-mono text-[0.65rem] leading-snug text-[var(--cream-soft)]">{title}</span>
    </label>
  );
}

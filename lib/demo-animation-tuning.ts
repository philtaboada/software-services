/** Factor aplicado a `playbackRate` cuando «movimiento suave» está activo. */
const SMOOTH_MOTION_FACTOR = 0.82;

/** Límite inferior/superior de velocidad de reproducción (GSAP timeScale). */
export const DEMO_ANIM_MIN_RATE = 0.25;
export const DEMO_ANIM_MAX_RATE = 2.5;

/** Estética de la silueta «mano / soporte» en la demo MOBILE (solo visual, misma animación). */
export type CapMobileHandDesignId = "soft-palm" | "line-art" | "geometric-cradle";

export const CAP_MOBILE_HAND_DESIGN_OPTIONS: readonly {
  readonly id: CapMobileHandDesignId;
  readonly label: string;
  readonly hint: string;
}[] = [
  { id: "soft-palm", label: "Palma suave", hint: "Volumen orgánico + pulgar" },
  { id: "line-art", label: "Contorno", hint: "Trazo lineal, relleno suave" },
  { id: "geometric-cradle", label: "Cuna geométrica", hint: "Bloques L que sostienen" },
];

export type CapabilityAnimationTune = {
  readonly playbackRate: number;
  readonly extraEndPauseSec: number;
  readonly smoothMotion: boolean;
  readonly webHeavyChaos: boolean;
  readonly mobileStrongFeedback: boolean;
  readonly capMobileHandDesign: CapMobileHandDesignId;
  readonly systemsHeavyChaos: boolean;
  readonly brandErraticLetters: boolean;
};

export const DEFAULT_CAPABILITY_TUNE: CapabilityAnimationTune = {
  playbackRate: 1,
  extraEndPauseSec: 0,
  smoothMotion: false,
  webHeavyChaos: true,
  mobileStrongFeedback: true,
  capMobileHandDesign: "soft-palm",
  systemsHeavyChaos: true,
  brandErraticLetters: true,
};

export type ProcessAnimationTune = {
  readonly playbackRate: number;
  readonly extraEndPauseSec: number;
  readonly smoothMotion: boolean;
  readonly heavyEffects: boolean;
};

export const DEFAULT_PROCESS_TUNE: ProcessAnimationTune = {
  playbackRate: 1,
  extraEndPauseSec: 0,
  smoothMotion: false,
  heavyEffects: true,
};

/**
 * Velocidad efectiva de la timeline (clamp + opción suave).
 */
export function computeEffectivePlaybackRate(playbackRate: number, smoothMotion: boolean): number {
  const clamped: number = Math.min(DEMO_ANIM_MAX_RATE, Math.max(DEMO_ANIM_MIN_RATE, playbackRate));
  return smoothMotion ? clamped * SMOOTH_MOTION_FACTOR : clamped;
}

/**
 * Reduce repeticiones de yoyo en demos de proceso cuando los efectos fuertes están apagados.
 */
export function processEffectRepeat(baseRepeat: number, heavyEffects: boolean): number {
  if (heavyEffects) {
    return baseRepeat;
  }
  return Math.max(0, Math.round(baseRepeat * 0.45));
}

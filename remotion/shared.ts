export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;
export const DURATION = 240;

export function mix(hex: string, amount: number) {
  const raw = hex.replace("#", "");
  const n = Number.parseInt(raw.length === 3 ? [...raw].map((c) => c + c).join("") : raw, 16);
  const r = Math.round((((n >> 16) & 255) * amount + 10 * (1 - amount)));
  const g = Math.round((((n >> 8) & 255) * amount + 9 * (1 - amount)));
  const b = Math.round(((n & 255) * amount + 8 * (1 - amount)));
  return `rgb(${r} ${g} ${b})`;
}

export function smoothPath(coords: readonly (readonly [number, number])[]) {
  if (coords.length < 2) return "";
  let d = `M ${coords[0][0]} ${coords[0][1]}`;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] ?? coords[i];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

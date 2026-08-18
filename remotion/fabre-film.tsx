import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FilmChrome, FilmPlate } from "./chrome";
import { mix } from "./shared";

const COLOR = "#008554";
const BARS = [
  { label: "Cero", value: 8 },
  { label: "Dirección", value: 34 },
  { label: "Fotos", value: 62 },
  { label: "SEO", value: 84 },
  { label: "Aire", value: 100 },
];

export function FabreFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#070604" }}>
      <FilmPlate src="/images/remotion/fabre-plate.png" accent={COLOR} />
      <FilmChrome kicker="Mono pill pillars" title="De no existir a encontrarse" metric="0 → 1 web" accent={COLOR} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 196,
          bottom: 56,
          display: "flex",
          alignItems: "flex-end",
          gap: 22,
          padding: "28px 32px 22px",
          borderRadius: 28,
          background: "rgba(7,6,4,0.42)",
          border: "1px solid rgba(253,253,253,0.08)",
        }}
      >
        {BARS.map((bar, index) => {
          const grow = spring({
            frame: frame - 12 - index * 8,
            fps,
            config: { damping: 14, stiffness: 90, mass: 0.7 },
          });
          const height = Math.max(8, bar.value * grow);
          const labelIn = interpolate(frame, [20 + index * 8, 36 + index * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={bar.label} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
              <p
                style={{
                  margin: 0,
                  color: "#fdfdfd",
                  fontSize: 20,
                  fontWeight: 600,
                  opacity: labelIn,
                }}
              >
                {bar.value}
              </p>
              <div
                style={{
                  width: "100%",
                  height: `${height}%`,
                  borderRadius: 999,
                  background: `linear-gradient(180deg, ${mix(COLOR, 1)} 0%, ${mix(COLOR, 0.4)} 100%)`,
                  boxShadow: `0 12px 40px ${COLOR}55`,
                }}
              />
              <p
                style={{
                  margin: 0,
                  color: "#c8d4ce",
                  fontSize: 14,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: labelIn,
                }}
              >
                {bar.label}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

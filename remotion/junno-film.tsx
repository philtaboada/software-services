import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FilmChrome, FilmPlate } from "./chrome";
import { mix } from "./shared";

const COLOR = "#F05A4E";
const WEEKS = 16;
const DAYS = 7;

export function JunnoFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => {
    const wave = Math.sin(i / 5.2) * 0.45 + Math.cos(i / 9.1) * 0.25 + 0.42;
    return Math.max(0.12, Math.min(1, wave + ((i * 17) % 7) / 18));
  });

  return (
    <AbsoluteFill style={{ background: "#070604" }}>
      <FilmPlate src="/images/remotion/junno-plate.png" accent={COLOR} />
      <FilmChrome kicker="Activity heatmap" title="Mapa de uso del equipo" metric="4 vistas · 1 workspace" accent={COLOR} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 196,
          bottom: 56,
          display: "flex",
          gap: 28,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 5,
            padding: 22,
            borderRadius: 28,
            background: "rgba(7,6,4,0.42)",
            border: "1px solid rgba(253,253,253,0.08)",
          }}
        >
          {Array.from({ length: WEEKS }, (_, week) => (
            <div key={week} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              {Array.from({ length: DAYS }, (_, day) => {
                const i = week * DAYS + day;
                const appear = spring({
                  frame: frame - i * 0.55,
                  fps,
                  config: { damping: 16, stiffness: 140, mass: 0.6 },
                });
                const v = cells[i] ?? 0;
                return (
                  <div
                    key={day}
                    style={{
                      flex: 1,
                      borderRadius: 5,
                      background: mix(COLOR, 0.2 + v * 0.8),
                      transform: `scale(${0.35 + appear * 0.65})`,
                      opacity: 0.25 + appear * 0.75,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ width: 220, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 18 }}>
          {[
            ["El equipo", "4", "vistas"],
            ["El lead", "1", "workspace"],
            ["Operación", "0", "refresh"],
          ].map(([label, value, unit], index) => {
            const enter = interpolate(frame, [24 + index * 10, 44 + index * 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={label}
                style={{
                  padding: "16px 18px",
                  borderRadius: 20,
                  background: "rgba(7,6,4,0.5)",
                  border: "1px solid rgba(253,253,253,0.08)",
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 18}px)`,
                }}
              >
                <p style={{ margin: 0, color: COLOR, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  {label}
                </p>
                <p style={{ margin: "8px 0 0", color: "#fdfdfd", fontSize: 36, fontWeight: 700, letterSpacing: "-0.05em" }}>
                  {value}
                  <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 500, color: "#c8d4ce" }}>{unit}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

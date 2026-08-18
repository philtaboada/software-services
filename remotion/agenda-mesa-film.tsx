import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FilmChrome, FilmPlate } from "./chrome";
import { mix } from "./shared";

const COLOR = "#FF6A00";
const STAGES = [
  { label: "Foto WA", value: 100 },
  { label: "Link", value: 74 },
  { label: "Pedido", value: 48 },
  { label: "Panel", value: 28 },
];

export function AgendaMesaFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#070604" }}>
      <FilmPlate src="/images/remotion/agenda-mesa-plate.png" accent={COLOR} />
      <FilmChrome
        kicker="Stage funnel"
        title="Del chat al pedido, sin comisión"
        metric="3 pasos · 0% fee"
        accent={COLOR}
      />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 196,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
          padding: "28px 36px",
          borderRadius: 28,
          background: "rgba(7,6,4,0.42)",
          border: "1px solid rgba(253,253,253,0.08)",
        }}
      >
        {STAGES.map((stage, index) => {
          const grow = spring({
            frame: frame - 10 - index * 9,
            fps,
            config: { damping: 16, stiffness: 110, mass: 0.65 },
          });
          const labelIn = interpolate(frame, [16 + index * 8, 32 + index * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={stage.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <p
                style={{
                  width: 92,
                  margin: 0,
                  color: "#c8d4ce",
                  fontSize: 16,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: labelIn,
                }}
              >
                {stage.label}
              </p>
              <div
                style={{
                  height: 42,
                  width: `${Math.max(18, stage.value * grow)}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${mix(COLOR, 1)} 0%, ${mix(COLOR, 0.45)} 100%)`,
                  boxShadow: `0 10px 28px ${COLOR}44`,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

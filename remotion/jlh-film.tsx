import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FilmChrome, FilmPlate } from "./chrome";

const COLORS = ["#F5C518", "#7EB6FF", "#9B7BFF", "#0B1C3D", "#c8d4ce"];
const SLICES = [
  { label: "Empresas", value: 26 },
  { label: "Salud", value: 22 },
  { label: "Vehicular", value: 20 },
  { label: "Ingeniería", value: 18 },
  { label: "Más buscados", value: 14 },
];

export function JlhFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = 170;
  const cy = 170;
  const r = 112;
  const stroke = 28;
  const circ = 2 * Math.PI * r;
  const draw = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 70 } });
  let offset = 0;

  return (
    <AbsoluteFill style={{ background: "#070604" }}>
      <FilmPlate src="/images/remotion/jlh-plate.png" accent="#F5C518" />
      <FilmChrome kicker="Radial arcs" title="El portafolio, en un anillo" metric="5 rubros · 1 asesor" accent="#F5C518" />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 196,
          bottom: 56,
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 36,
          alignItems: "center",
          padding: 28,
          borderRadius: 28,
          background: "rgba(7,6,4,0.42)",
          border: "1px solid rgba(253,253,253,0.08)",
        }}
      >
        <svg viewBox="0 0 340 340" width="100%" height="100%">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(253,253,253,0.08)" strokeWidth={stroke} />
          {SLICES.map((slice, index) => {
            const len = Math.max(0, (slice.value / 100) * circ - 12) * draw;
            const dash = `${len} ${circ}`;
            const current = offset;
            offset += (slice.value / 100) * circ;
            return (
              <circle
                key={slice.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={COLORS[index]}
                strokeWidth={stroke}
                strokeDasharray={dash}
                strokeDashoffset={-current}
                strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            );
          })}
          <text x={cx} y={cy - 8} textAnchor="middle" fill="#fdfdfd" fontSize="48" fontWeight="700">
            5
          </text>
          <text x={cx} y={cy + 22} textAnchor="middle" fill="#c8d4ce" fontSize="14" letterSpacing="3">
            RUBROS
          </text>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SLICES.map((slice, index) => {
            const enter = interpolate(frame, [18 + index * 8, 34 + index * 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div key={slice.label} style={{ opacity: enter, transform: `translateX(${(1 - enter) * 20}px)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#fdfdfd", fontSize: 22 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <i style={{ width: 10, height: 10, borderRadius: 99, background: COLORS[index] }} />
                    {slice.label}
                  </span>
                  <span style={{ color: "#c8d4ce", fontSize: 16 }}>{slice.value}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "rgba(253,253,253,0.08)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${slice.value * 3.2 * enter}%`,
                      height: "100%",
                      borderRadius: 99,
                      background: COLORS[index],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

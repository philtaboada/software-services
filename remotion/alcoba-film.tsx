import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FilmChrome, FilmPlate } from "./chrome";
import { smoothPath } from "./shared";

const COLOR = "#E8DCC8";
const POINTS = [18, 28, 24, 42, 38, 58, 52, 70, 64, 82, 76, 92];

export function AlcobaFilm() {
  const frame = useCurrentFrame();
  const w = 980;
  const h = 280;
  const step = w / (POINTS.length - 1);
  const coords = POINTS.map((p, i) => [i * step, h - (p / 100) * (h - 24)] as const);
  const line = smoothPath(coords);
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  const draw = interpolate(frame, [12, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const length = 1400;

  return (
    <AbsoluteFill style={{ background: "#070604" }}>
      <FilmPlate src="/images/remotion/alcoba-plate.png" accent={COLOR} />
      <FilmChrome kicker="Curved wave" title="El arco del comensal" metric="Carta + reserva" accent={COLOR} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 196,
          bottom: 56,
          padding: "28px 36px 24px",
          borderRadius: 28,
          background: "rgba(7,6,4,0.42)",
          border: "1px solid rgba(253,253,253,0.08)",
        }}
      >
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="78%">
          <defs>
            <linearGradient id="alcoba-remotion-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={COLOR} stopOpacity="0.5" />
              <stop offset="100%" stopColor={COLOR} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[70, 140, 210].map((y) => (
            <line key={y} x1="0" x2={w} y1={y} y2={y} stroke="rgba(253,253,253,0.08)" />
          ))}
          <path d={area} fill="url(#alcoba-remotion-fill)" opacity={draw} />
          <path
            d={line}
            fill="none"
            stroke={COLOR}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={length}
            strokeDashoffset={length * (1 - draw)}
          />
          {coords
            .filter((_, i) => i % 3 === 0)
            .map(([x, y], i) => {
              const appear = interpolate(frame, [28 + i * 8, 44 + i * 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={7 * appear}
                  fill={COLOR}
                  stroke="#070604"
                  strokeWidth="3"
                />
              );
            })}
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            color: "#c8d4ce",
            fontSize: 15,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>Llegada</span>
          <span>Carta</span>
          <span>Reserva</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

export function FilmPlate({ src, accent }: { src: string; accent: string }) {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1.04, 1.12], { extrapolateRight: "clamp" });
  const wash = interpolate(frame, [0, 20], [0.2, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom})`,
          opacity: 0.42 * wash,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 88% 8%, ${accent}33, transparent 42%), linear-gradient(180deg, rgba(7,6,4,0.28), rgba(7,6,4,0.78))`,
        }}
      />
    </AbsoluteFill>
  );
}

export function FilmChrome({
  kicker,
  title,
  metric,
  accent,
}: {
  kicker: string;
  title: string;
  metric: string;
  accent: string;
}) {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 48,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 16}px)`,
        fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: accent,
              boxShadow: `0 0 16px ${accent}`,
            }}
          />
          <p
            style={{
              margin: 0,
              color: "#c8d4ce",
              fontSize: 16,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </p>
        </div>
        <h2
          style={{
            margin: "16px 0 0",
            maxWidth: 520,
            color: "#fdfdfd",
            fontSize: 42,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
      </div>
      <p
        style={{
          margin: 0,
          color: "#fdfdfd",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        {metric}
      </p>
    </div>
  );
}

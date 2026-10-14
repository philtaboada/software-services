const COLS = 220;
const ROWS = 80;
const LAT0 = 75;
const LAT1 = -56;

/** Natural Earth 110m land, equirectangular 75°N–56°S. Each run is M{col} {row}h{len-1}; a 0 1 dash draws one dot per cell. */
const LAND =
  "M34 0h3M75 0h21M143 0h2M163 0h13M33 1h3M38 1h4M44 1h1M47 1h5M55 1h5M62 1h0M77 1h18M142 1h1M152 1h1M159 1h29M195 1h3M0 2h0M14 2h0M38 2h7M51 2h2M55 2h11M78 2h18M125 2h2M143 2h1M151 2h2M155 2h47M204 2h2M219 2h0M10 3h14M27 3h9M39 3h7M49 3h1M52 3h2M58 3h1M63 3h5M79 3h15M121 3h9M147 3h2M152 3h1M155 3h57M214 3h4M0 4h1M9 4h33M44 4h11M57 4h2M63 4h0M65 4h5M77 4h12M119 4h15M137 4h0M140 4h14M156 4h63M1 5h4M8 5h48M65 5h2M70 5h1M77 5h10M95 5h1M98 5h2M118 5h12M135 5h84M10 6h45M57 6h2M62 6h1M65 6h4M78 6h6M97 6h3M116 6h6M124 6h7M133 6h85M9 7h44M59 7h0M67 7h1M79 7h4M114 7h6M123 7h96M9 8h43M62 8h4M80 8h3M113 8h7M123 8h81M208 8h0M210 8h4M11 9h4M17 9h0M25 9h26M62 9h5M70 9h0M113 9h7M125 9h75M202 9h2M208 9h1M14 10h0M16 10h0M28 10h24M63 10h8M106 10h1M117 10h2M125 10h70M206 10h2M12 11h0M29 11h26M63 11h8M107 11h0M115 11h1M118 11h1M123 11h70M205 11h4M9 12h0M30 12h29M61 12h13M105 12h1M108 12h1M115 12h0M120 12h0M122 12h71M205 12h2M31 13h28M62 13h13M104 13h1M107 13h2M113 13h82M197 13h0M205 13h1M32 14h43M107 14h3M112 14h83M197 14h0M32 15h36M71 15h0M75 15h0M110 15h85M197 15h0M34 16h32M68 16h1M74 16h3M107 16h87M34 17h37M109 17h21M133 17h6M143 17h50M34 18h34M70 18h0M109 18h8M119 18h8M130 18h0M133 18h5M141 18h51M34 19h32M104 19h7M116 19h1M120 19h6M135 19h3M142 19h49M196 19h1M34 20h31M105 20h5M118 20h1M122 20h5M129 20h2M135 20h4M143 20h45M34 21h30M104 21h5M115 21h0M122 21h1M126 21h13M143 21h39M184 21h3M196 21h0M35 22h27M105 22h4M123 22h1M126 22h13M143 22h38M186 22h2M195 22h0M35 23h28M106 23h0M111 23h5M128 23h2M132 23h51M187 23h1M193 23h2M36 24h26M106 24h10M130 24h0M132 24h50M187 24h0M191 24h3M38 25h23M105 25h11M132 25h51M189 25h1M39 26h20M104 26h15M122 26h2M131 26h52M39 27h0M41 27h13M59 27h0M104 27h35M141 27h42M40 28h0M42 28h8M59 28h1M103 28h36M141 28h42M41 29h0M43 29h6M60 29h0M102 29h28M132 29h8M143 29h0M145 29h37M41 30h0M44 30h5M101 30h29M133 30h8M151 30h31M45 31h4M100 31h31M134 31h11M152 31h28M183 31h0M46 32h3M61 32h1M100 32h32M134 32h11M152 32h11M166 32h12M45 33h5M55 33h1M63 33h1M100 33h32M135 33h9M155 33h7M167 33h7M47 34h4M53 34h2M62 34h0M66 34h1M69 34h0M100 34h32M135 34h9M155 34h5M168 34h6M176 34h0M49 35h6M100 35h33M136 35h6M155 35h4M168 35h7M184 35h0M53 36h5M100 36h34M136 36h4M155 36h3M170 36h6M183 36h0M55 37h3M100 37h38M156 37h2M170 37h6M185 37h0M57 38h1M100 38h35M156 38h2M170 38h0M173 38h3M186 38h0M58 39h0M64 39h5M71 39h1M101 39h39M157 39h1M170 39h0M174 39h0M185 39h1M59 40h1M62 40h10M102 40h38M157 40h0M159 40h0M170 40h0M186 40h0M62 41h11M103 41h36M159 41h0M171 41h0M186 41h0M63 42h14M104 42h5M113 42h26M168 42h0M171 42h1M181 42h1M63 43h15M116 43h22M169 43h0M172 43h0M179 43h2M62 44h16M116 44h21M170 44h0M173 44h0M178 44h3M61 45h17M116 45h20M171 45h1M177 45h4M183 45h2M188 45h0M61 46h20M115 46h20M171 46h2M177 46h4M183 46h1M190 46h1M61 47h22M116 47h18M172 47h2M177 47h3M183 47h1M191 47h0M193 47h2M202 47h0M60 48h26M117 48h16M173 48h1M183 48h1M193 48h5M203 48h0M60 49h28M118 49h15M175 49h0M195 49h4M201 49h0M61 50h27M118 50h15M177 50h2M194 50h3M199 50h0M62 51h25M118 51h15M186 51h0M200 51h0M208 51h0M62 52h24M118 52h16M63 53h23M118 53h16M190 53h3M197 53h0M63 54h22M117 54h17M139 54h1M187 54h0M189 54h3M197 54h0M65 55h20M117 55h17M138 55h1M186 55h7M196 55h2M66 56h19M117 56h15M137 56h2M185 56h9M196 56h2M218 56h0M67 57h18M118 57h13M137 57h2M184 57h15M67 58h17M118 58h12M137 58h2M181 58h19M67 59h16M119 59h12M136 59h2M180 59h21M67 60h14M119 60h12M137 60h1M179 60h23M67 61h12M119 61h10M180 61h23M67 62h12M119 62h10M180 62h23M66 63h13M120 63h8M180 63h23M66 64h12M121 64h7M180 64h23M66 65h11M121 65h6M181 65h6M192 65h10M66 66h10M121 66h2M180 66h4M193 66h8M66 67h8M194 67h7M216 67h0M65 68h9M196 68h5M65 69h7M199 69h0M217 69h1M65 70h6M217 70h0M65 71h4M199 71h1M215 71h0M65 72h4M213 72h2M64 73h4M212 73h1M65 74h3M64 75h4M64 76h3M64 77h3M73 77h1M65 78h2M67 79h2";

const CITIES = [
  { id: "lima", name: "Lima", lon: -77.04, lat: -12.05, anchor: "end" as const, dx: -3.2, dy: 0.55 },
  { id: "colombia", name: "Colombia", lon: -74.07, lat: 4.71, anchor: "middle" as const, dx: -7.2, dy: -3.6 },
  { id: "barcelona", name: "Barcelona", lon: 2.17, lat: 41.39, anchor: "start" as const, dx: 3.6, dy: 2.5 },
];

function project(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * COLS,
    y: ((LAT0 - lat) / (LAT0 - LAT1)) * ROWS,
  };
}

function arc(a: { x: number; y: number }, b: { x: number; y: number }, cx: number, cy: number) {
  return `M${a.x.toFixed(2)} ${a.y.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export function WorldMap({ label }: { label: string }) {
  const placed = CITIES.map((city) => ({ ...city, ...project(city.lon, city.lat) }));
  const lima = placed[0];
  const colombia = placed[1];
  const barcelona = placed[2];
  const toBarcelona = arc(
    lima,
    barcelona,
    (lima.x + barcelona.x) / 2,
    Math.min(lima.y, barcelona.y) - 11,
  );
  const toColombia = arc(lima, colombia, Math.min(lima.x, colombia.x) - 5.5, (lima.y + colombia.y) / 2);

  return (
    <div className="signal-map-clip">
    <svg viewBox={`0 0 ${COLS} ${ROWS}`} className="signal-map" role="img" aria-label={label}>
      <defs>
        <linearGradient id="signal-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#5ad2d0" />
          <stop offset="100%" stopColor="#01fd91" />
        </linearGradient>
      </defs>
      <path
        className="signal-land"
        d={LAND}
        fill="none"
        stroke="rgba(226,242,234,0.86)"
        strokeWidth="0.72"
        strokeLinecap="round"
        strokeDasharray="0 1"
      />
      <path className="map-arc-glow" d={toBarcelona} />
      <path className="map-arc" d={toBarcelona} />
      <path className="map-arc-glow" d={toColombia} />
      <path className="map-arc map-arc-short" d={toColombia} />
      {placed.map((city) => (
        <g key={city.id}>
          <circle cx={city.x} cy={city.y} r="2.2" className="map-ring map-ring-late" />
          <circle cx={city.x} cy={city.y} r="1.35" className="map-ring" />
          <circle cx={city.x} cy={city.y} r="0.46" className="map-node" />
          <text
            x={city.x + city.dx}
            y={city.y + city.dy}
            textAnchor={city.anchor}
            className="map-label"
            fontSize="2.85"
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
    </div>
  );
}

const ROWS = [
  "................................................................",
  "...................#########....................................",
  "....###############...######.......##.............##########....",
  "..##################....#.........##...........#############....",
  ".........#############.........#####........#############.......",
  "..........##########..........###..##....################.......",
  "...........#######............###..###.##################.......",
  "............###.##............########################..........",
  "..............#..............###########.....##.####............",
  ".............................###########.....#...#..............",
  "..................#####..........#######...........#............",
  "..................#######.........######...........#............",
  "..................#######.........#####.................#.......",
  "...................######.........####...............#####......",
  "...................####............###..............#######.....",
  "...................###...................................##.....",
  "...................##.........................................#.",
  "...................#............................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
];

const CELL = 10;
const NODES = {
  lima: { c: 18, r: 12 },
  barcelona: { c: 32, r: 5 },
  colombia: { c: 18, r: 10 },
} as const;

function at(node: { c: number; r: number }) {
  return { x: (node.c + 0.5) * CELL, y: (node.r + 0.5) * CELL };
}

export function WorldMap({ label }: { label: string }) {
  const width = ROWS[0].length * CELL;
  const height = ROWS.length * CELL;
  const lima = at(NODES.lima);
  const barcelona = at(NODES.barcelona);
  const colombia = at(NODES.colombia);
  const dots: { x: number; y: number }[] = [];

  ROWS.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (row[c] === "#") dots.push({ x: (c + 0.5) * CELL, y: (r + 0.5) * CELL });
    }
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="signal-map"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="signal-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#5ad2d0" />
          <stop offset="100%" stopColor="#01fd91" />
        </linearGradient>
      </defs>
      {dots.map((dot) => (
        <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="1.35" className="signal-dot" />
      ))}
      <path
        className="map-arc"
        d={`M ${lima.x} ${lima.y} Q ${(lima.x + barcelona.x) / 2} ${Math.min(lima.y, barcelona.y) - 36}, ${barcelona.x} ${barcelona.y}`}
      />
      <path
        className="map-arc map-arc-short"
        d={`M ${lima.x} ${lima.y} Q ${lima.x - 18} ${(lima.y + colombia.y) / 2}, ${colombia.x} ${colombia.y}`}
      />
      {([lima, barcelona, colombia] as const).map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <circle cx={node.x} cy={node.y} r="7.5" className="map-ring" />
          <circle cx={node.x} cy={node.y} r="2.6" className="map-node" />
        </g>
      ))}
    </svg>
  );
}

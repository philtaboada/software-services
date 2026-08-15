"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_pointer;
varying vec2 v_uv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// Red de luz de la superficie del agua.
float caustic(vec2 uv, float t) {
  vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;
  vec2 i = p;
  float c = 1.0;
  const float inten = 0.0045;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.0);
}

// Haces que bajan desde la superficie y se mecen.
float beams(vec2 uv, float t) {
  float a = uv.x * 3.1 + uv.y * 1.5 + sin(t * 0.09) * 0.35;
  float r = 0.0;
  r += pow(max(sin(a * 1.7 + t * 0.13), 0.0), 24.0);
  r += pow(max(sin(a * 1.1 - t * 0.08 + 1.7), 0.0), 30.0) * 0.75;
  r += pow(max(sin(a * 2.6 + t * 0.05 + 3.1), 0.0), 38.0) * 0.55;
  r *= 0.85 + 0.15 * sin(t * 1.7 + uv.y * 6.0);
  return r * smoothstep(-0.25, 0.95, uv.y);
}

// Plancton eléctrico subiendo.
float motes(vec2 p, float t) {
  float sum = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 g = p * (7.0 + fi * 5.5);
    g.y -= t * (0.055 + fi * 0.028);
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    vec2 rnd = hash2(id + fi * 31.7);
    if (rnd.x < 0.55) continue;
    vec2 off = (rnd - 0.5) * 0.72;
    off.x += sin(t * 0.5 + rnd.y * 12.0) * 0.06;
    float d = length(f - off);
    float pulse = 0.55 + 0.45 * sin(t * 1.4 + rnd.y * 20.0);
    sum += smoothstep(0.055, 0.0, d) * pulse * (1.0 - fi * 0.26);
  }
  return sum;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float light = smoothstep(-0.15, 1.1, uv.y);

  // Agua fría a un lado, más verde al otro: el fondo no es un plano liso.
  vec3 deep = mix(vec3(0.006, 0.020, 0.028), vec3(0.005, 0.024, 0.024), uv.x);
  vec3 shallow = mix(vec3(0.010, 0.062, 0.098), vec3(0.008, 0.074, 0.076), uv.x);
  vec3 col = mix(deep, shallow, light);

  // Dos capas de cáusticas a distinta escala dan sensación de profundidad. El
  // exponente recorta la parte baja y deja solo las venas de luz.
  float c1 = pow(caustic(p * 2.05 + vec2(0.0, u_time * 0.015), u_time * 0.34), 1.7);
  float c2 = pow(caustic(p * 0.78 - vec2(u_time * 0.01, 0.0), u_time * 0.2 + 4.0), 1.5);
  col += vec3(0.30, 1.0, 0.92) * c1 * 0.80 * pow(light, 0.85);
  col += vec3(0.14, 0.52, 1.0) * c2 * 0.30 * pow(light, 1.5);

  col += vec3(0.30, 0.92, 0.88) * beams(uv, u_time) * 0.30;

  col += vec3(0.55, 1.0, 0.94) * motes(p, u_time) * 0.55;

  vec2 pointer = vec2(u_pointer.x * aspect, u_pointer.y);
  col += vec3(0.10, 0.44, 0.46) * smoothstep(0.85, 0.0, length(p - pointer)) * 0.40;

  // El centro se apaga para que las tapas recorten contra el fondo.
  float centre = length((uv - vec2(0.5, 0.44)) * vec2(aspect * 0.58, 1.0));
  col *= mix(0.34, 1.0, smoothstep(0.14, 0.88, centre));

  col *= smoothstep(1.5, 0.32, length(uv - vec2(0.5, 0.5)));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function RadarAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uPointer = gl.getUniformLocation(program, "u_pointer");

    // El efecto es difuso: se renderiza por debajo de la resolución real y la
    // pantalla lo estira sin que se note.
    const SCALE = 0.62;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.floor(canvas.clientHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const pointer = { x: 0.5, y: 0.62, tx: 0.5, ty: 0.62 };
    const onMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / window.innerWidth;
      pointer.ty = 1 - event.clientY / window.innerHeight;
    };
    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div aria-hidden className="rb-ambient">
      <canvas ref={canvasRef} className="rb-ambient-canvas" />
      <div className="rb-ambient-grid" />
      <div className="rb-ambient-floor" />
    </div>
  );
}

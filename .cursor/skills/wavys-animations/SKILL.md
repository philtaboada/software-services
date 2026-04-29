---
name: wavys-animations
description: >-
  Sistema de animación Wavys en theros-website: GSAP + ScrollTrigger en
  ProcessPipelineVisual (proceso) y CapabilityVisual (capacidades web/mobile/
  systems/brand), hooks data-*, ciclos con padding, demo routes, tunings, Iconify.
  Usar al editar process-pipeline-visual, capability-visual, landings con cards
  de proceso, demos en /demos/proceso o /demos/capacidades, o si el usuario
  dice Wavys, Animación Wavys, proceso pipeline, capacidades, CapabilityVisual.
---

# Wavys animations (referencia para agentes)

Documento para **consumo por IA**: vocabulario fijo, invariantes y registro de selectores. Las mismas reglas valen para humanos.

## Mapa del repo

| Ámbito | Archivo principal | Registro de copy | Rutas |
|--------|-------------------|------------------|--------|
| **Proceso** | `components/process-pipeline-visual.tsx` | `lib/process-demos.ts` | `/demos/proceso`, `/demos/proceso/[slug]` |
| **Capacidades** | `components/capability-visual.tsx` (un solo componente, cuatro variantes) | `lib/capability-demos.ts` | `/demos/capacidades`, `/demos/capacidades/[slug]` |
| **Wrapper demo capacidades** | `components/capability-demo-view.tsx` | — | aplica `respectReducedMotion={false}` + panel de tuning |
| **Tunings compartidos** | `lib/demo-animation-tuning.ts` | — | `CapabilityAnimationTune`, `ProcessAnimationTune`, `computeEffectivePlaybackRate` |
| **Panel UI demos** | `components/demo-animation-panel.tsx` | — | `scope: "process"` \| `"capability"` |

**Proceso** — tipos: `ProcessVisualVariant` exportado desde `process-pipeline-visual.tsx`.

**Capacidades** — tipos: `CapabilityVisualVariant` = `cap-web` \| `cap-mobile` \| `cap-systems` \| `cap-brand`.

---

## 1. Qué es el sistema

| Término | Significado |
|---------|-------------|
| **Wavys** | Nombre de marca para ilustraciones de **proceso** y **capacidad** en bucle, no loaders de página completos. |
| **Variante** | Proceso: `web-scraping`, `ai-automation`, `discovery-design`, `deploy`, `create`. Capacidades: `cap-*` (ver arriba). |
| **Shell** | Contenedor fijo: altura `h-[15.5rem] md:h-[18.5rem]`, `rounded-xl`, `border`, `bg-[var(--surface-2)]`, `overflow-hidden`. |
| **Ciclo** | Un giro completo de la timeline; se **rellena** hasta una duración objetivo (segundos de reloj) para ritmo estable. |

---

## 2. Stack técnico (hechos fijos)

- **GSAP 3** con **`@gsap/react`** `useGSAP` y `dependencies` / `revertOnUpdate` según el archivo.
- **ScrollTrigger** solo en **`process-pipeline-visual.tsx`**: play/pause según visibilidad del `root`. **`capability-visual.tsx`** no usa ScrollTrigger: la timeline hace `repeat: -1` y `play(0)` al montar.
- **Accessibility:** si `prefers-reduced-motion: reduce`, en **producción** las timelines pueden no construirse; en **rutas `/demos/*`** el wrapper fuerza `respectReducedMotion={false}` donde aplique.
- **Iconify (solo capacidades actuales):** `@iconify/react` / `<Icon icon="set:name" />` — iconos **decorativos**; los hooks GSAP van en **contenedores** con `data-cap-*`, no en el nodo del icono salvo excepción.

---

## 3. Reglas estrictas (MUST / MUST NOT)

**MUST**

1. **Scope:** todas las queries desde `rootRef.current`, nunca `document` global, para no cruzar instancias.
2. **Hooks estables:** animar con **`data-*`**; prefijos por familia: proceso `data-web-*`, `data-deploy-*`, etc.; capacidades `data-cap-web-*`, `data-cap-mob-*`, `data-cap-sys-*`, `data-cap-brand-*`.
3. **Padding de ciclo:**  
   - Proceso: `padTimelineToTarget(master, cycleTarget)` con `cycleTarget = PROCESS_VIS_CYCLE_SEC` (**5s**) + `extraEndPauseSec` del tuning.  
   - Capacidades: `padCapTimelineTo(master, CAP_*_STORY_SEC + endPad)` por variante (ver §4).
4. **Hidratación:** sin `Math.random()` ni layout dependiente del tiempo en render; posiciones con `%` literales, constantes, o arrays fijos.
5. **Frame 0:** usar `master.set(..., 0)` o `fromTo` con estado inicial explícito para que cada repetición no arrastre estilos inline.
6. **Visibilidad animada:** preferir `autoAlpha` a combinar `opacity` + `visibility` a mano de forma incoherente.

**MUST NOT**

1. No multiplicar animaciones de layout caras (muchos `width`/`height`) si `transform` / `scale` basta.
2. No dejar `querySelector` huérfanos: si se borra un hook en JSX, eliminar o acotar el tween.
3. No confiar solo en `invisible` de Tailwind para el estado final si GSAP gobierna el acto; alinear con `autoAlpha`.
4. **Iconos:** no sustituir un nodo con `data-cap-*` por un `<Icon />` suelto sin mover el atributo al contenedor padre que GSAP muta.

---

## 4. Capacidades — duración narrativa y padding

En `capability-visual.tsx` cada variante acaba con `padCapTimelineTo(master, …)`:

| Variante | Segundos objetivo (historia) | Notas |
|----------|-----------------------------|--------|
| `cap-web` | 24 | Caos → solución landing |
| `cap-mobile` | 27 | Mano, splash, flujo, sheet, métricas |
| `cap-systems` | 40 | Notificaciones → tablero → orbe en pipeline |
| `cap-brand` | 36 | Letras caos → kit → escala |

`extraEndPauseSec` del tuning se suma al final. `computeEffectivePlaybackRate` + `timeScale` ajustan la reproducción.

---

## 5. Tuning (capacidades y proceso)

**Archivo:** `lib/demo-animation-tuning.ts`

- **Capacidades:** `playbackRate`, `extraEndPauseSec`, `smoothMotion`, `webHeavyChaos`, `mobileStrongFeedback`, `capMobileHandDesign` (`soft-palm` \| `line-art` \| `geometric-cradle`), `systemsHeavyChaos`, `brandErraticLetters`.
- **Proceso:** `playbackRate`, `extraEndPauseSec`, `smoothMotion`, `heavyEffects` (influye repeticiones de algunos yoyo vía `processEffectRepeat` en proceso).

`DemoAnimationPanel` expone controles según `scope` y `variant`.

---

## 6. Iconify en `CapabilityVisual`

- Dependencia: `@iconify/react`.
- Uso típico: **Tabler** (`tabler:…`) para UI; **Simple Icons** (`simple-icons:…`) para logotipos de producto (p. ej. caos de SYSTEMS).
- **Regla:** el elemento que GSAP selecciona (p. ej. `data-cap-web-dead-btn`) debe seguir envolviendo el contenido; los iconos van **dentro** como `flex` + hijos, salvo que el `data-*` esté en un wrapper `span` intencionado.
- Crossfade de URL (`data-cap-web-url-messy` / `data-cap-web-url-clean`): **ambos** tramos deben incluir sus propios iconos; no un icono hermano externo a los nodos con crossfade.
- Carga: Iconify resuelve SVG en cliente; si hace falta empaquetar sin red, documentar en PR (p. ej. `@iconify-json/*` + `addCollection` — no obligatorio hoy).

---

## 7. Registro de selectores — Proceso

*(Sin cambios de fondo; lista de referencia para escenas existentes.)*

- **web-scraping:** `data-web-scan-wrap`, `data-web-row`, `data-web-packet`, `data-web-out-line`, `data-web-output-panel`, `data-browser-dust`, `data-web-flow-arrow`, `data-web-hero`, `data-web-panel-dot`, `data-web-panel-bloom`, `data-web-status`, `data-web-deco-card`
- **ai-automation:** `data-typing-dot`, `data-bubble-user`, `data-typing-wrap`, `data-bubble-bot`, `data-context-card`, `data-wa-pulse`, `data-rail-step`, `data-tool-chip`, `data-ia-latency`, `data-ia-queue-fill`, `data-ia-rail` (contenedor)
- **discovery-design:** `data-disc-grid`, `data-disc-brief`, `data-disc-insights`, `data-disc-note`, `data-disc-artboard`, `data-disc-wire`, `data-disc-hifi`, `data-disc-cursor`
- **deploy:** `data-deploy-card`, `data-deploy-trail`, `data-deploy-ring`, `data-deploy-ring-2`, `data-deploy-cloud`, `data-deploy-cloud-core`, `data-deploy-particle`, `data-deploy-arc`, `data-deploy-live`, `data-deploy-step`
- **create:** `data-spark`, `data-create-check`, `data-create-burst`

Añadir filas a esta tabla al introducir nuevos hooks en `process-pipeline-visual.tsx`.

---

## 8. Registro de selectores — Capacidades (`capability-visual.tsx`)

### `cap-web` — prefijo `data-cap-web-`

- **Copy (overlay):** `data-cap-web-copy-hook`, `copy-problem`, `copy-wow`, `copy-close`
- **Cromo / caos / limpio:** `data-cap-web-viewport`, `data-cap-web-url-messy`, `data-cap-web-url-clean`, `data-cap-web-glitch`, `data-cap-web-chaos`, `data-cap-web-chaos-banner`, `data-cap-web-shake`, `data-cap-web-scroll`, `data-cap-web-chaos-sticker`, `data-cap-web-noise`, `data-cap-web-dead-btn`, `data-cap-web-float`, `data-cap-web-clean-glow`, `data-cap-web-clean`
- **Landing limpia:** `data-cap-web-solve-shell`, `data-cap-web-solve-orb`, `data-cap-web-nav`, `data-cap-web-nav-seg`, `data-cap-web-landing-scroll`, `data-cap-web-landing-track`, `data-cap-web-hero-media`, `data-cap-web-word`, `data-cap-web-sub`, `data-cap-web-cta`, `data-cap-web-hero-photo` (+ asset local `CAP_WEB_HERO_REFERENCE_SRC`)

### `cap-mobile` — prefijo `data-cap-mob-`

- **Copy:** `data-cap-mob-copy-hook`, `copy-flow`, `copy-feel`, `copy-measure`, `copy-close`, `copy-cta`
- **Escena:** `data-cap-mob-hand` (contenedor de `CapMobileHandSilhouette`), `data-cap-mob-device`, `data-cap-mob-notch`, `data-cap-mob-splash`, `data-cap-mob-flow`, `data-cap-mob-list`, `data-cap-mob-tapzone`, `data-cap-mob-sheet`, `data-cap-mob-success`, `data-cap-mob-checkwrap`, `data-cap-mob-dash`, `data-cap-mob-bar-conv`, `data-cap-mob-bar-ret`, `data-cap-mob-spark`

### `cap-systems` — prefijo `data-cap-sys-`

- **Copy:** `data-cap-sys-c1` … `data-cap-sys-c7`
- **Escena:** `data-cap-sys-chaos`, `data-cap-sys-notif`, `data-cap-sys-quote`, `data-cap-sys-lost`, `data-cap-sys-veil`, `data-cap-sys-board`, `data-cap-sys-link`, `data-cap-sys-col`, `data-cap-sys-node`, `data-cap-sys-kpi-bar`, `data-cap-sys-orb`

### `cap-brand` — prefijo `data-cap-brand-`

- **Copy:** `data-cap-brand-c1` … `data-cap-brand-c6`
- **Escena:** `data-cap-brand-chaos`, `data-cap-brand-chaotic-letter`, `data-cap-brand-chaos-blob`, `data-cap-brand-messy`, `data-cap-brand-messy-bit`, `data-cap-brand-order`, `data-cap-brand-grid`, `data-cap-brand-swatch-order`, `data-cap-brand-type-messy`, `data-cap-brand-type-clean`, `data-cap-brand-kit`, `data-cap-brand-kit-bit`, `data-cap-brand-kit-dup`, `data-cap-brand-kit-dup-bit`, `data-cap-brand-scale`, `data-cap-brand-scale-frame`

Añadir entradas al editar el JSX: **primero** el hook, **después** el tween en `useGSAP`.

---

## 9. Patrón de historia (intención)

**Proceso** — fila por variante (detalle en código):

| Variante | Idea en una frase |
|----------|-------------------|
| `web-scraping` | Producto + filas DOM → barrido → paquetes `{ }` al panel JSON. |
| `ai-automation` | Mensaje → typing → respuesta + chips + contexto. |
| `discovery-design` | Brief → notas → wire → hi-fi. |
| `deploy` | Pasos → arco → artefacto → nube + LIVE. |
| `create` | Chispas → check path → cierre. |

**Capacidades** — alineado con títulos en `lib/capability-demos.ts` (ganchos, problema, quiebre, solución, cierre). Al reordenar tweens, actualizar descripción allí.

---

## 10. Algoritmo: añadir o tocar escena

**Proceso**

1. Ampliar `ProcessVisualVariant` + `PROCESS_DEMO_ENTRIES` + `generateStaticParams` si hay slug nuevo.
2. Rama JSX con `ref={rootRef}` en el shell externo.
3. Rama `useGSAP` con `else if (variant === …)` y `padTimelineToTarget(master, cycleTarget)`.
4. `bun run build` + comprobar `/demos/proceso/<slug>`.

**Capacidades**

1. Ajustar `lib/capability-demos.ts` si cambia el guion o el título.
2. Misma estructura: rama `if (variant === "cap-…")` + timeline + `padCapTimelineTo(…)`.
3. Probar `/demos/capacidades/<web|mobile|systems|brand>` y landing si hay tarjeta enlazada.

---

## 11. Design tokens

Usar variables CSS existentes: `--line`, `--line-strong`, `--surface`, `--surface-2`, `--background`, `--cream`, `--cream-soft`, `--muted`, `--muted-dim`, `--accent`, `--teal`, `--lime`, `--ink`, etc. Excepciones de hex mínimas y ya acordes al tema.

---

## 12. SVG (proceso)

- `id` de gradientes **únicos** por instancia o pestaña; colisiones rompen el fill.
- Stroke-draw: `strokeDasharray` + `strokeDashoffset` coherentes con la longitud del path.
- Partículas: GSAP acepta `{ attr: { cx, cy } }` en círculos SVG.

---

## 13. Modelo mental (flujo)

```text
variant
  → JSX con data-* y shell
  → useGSAP: timeline + set estado inicial
  → proceso: ScrollTrigger play/pause; capacidades: master.play(0), repeat: -1
  → padding a duración objetivo (5s proceso / CAP_*_STORY_SEC capacidades)
```

---

## 14. Cadenas de usuario y copy

- **Proceso:** `lib/process-demos.ts` — títulos/descripciones visibles en el índice de demos.
- **Capacidades:** `lib/capability-demos.ts` — misma regla: texto alineado con lo que muestra el loop.

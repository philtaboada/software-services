---
name: wavys-animations
description: >-
  Documents the Wavys process-pipeline animation system in theros-website: GSAP +
  ScrollTrigger, data-* element hooks, fixed-duration cycles, hydration-safe
  coordinates, and demo routes. Use when editing ProcessPipelineVisual, proceso
  demos, landing process cards, or when the user mentions Wavys animations,
  Animación Wavys, proceso pipeline, or GSAP process scenes.
---

# Wavys process animations (AI reference)

This skill is written for **machine consumption**: precise vocabulary, explicit invariants, and a selector registry. Human readers can follow the same structure.

## 1. What this system is

| Term | Meaning |
|------|---------|
| **Wavys animations** | Branded name for compact, narrative **process illustrations** (not full-page loaders). |
| **Scene / variant** | One of five visual stories: `web-scraping`, `ai-automation`, `discovery-design`, `deploy`, `create`. |
| **Shell** | Shared container: fixed height classes, border, `bg-[var(--surface-2)]`, `overflow-hidden`, `rounded-xl`. |
| **Cycle** | One full loop of the main timeline; padded to a constant wall-clock length for readable pacing. |

**Primary implementation file:** `components/process-pipeline-visual.tsx`  
**Public type:** `ProcessVisualVariant` (exported from that file)  
**Demo registry:** `lib/process-demos.ts`  
**Routes:** `app/demos/proceso/page.tsx`, `app/demos/proceso/[slug]/page.tsx`  
**Scaled wrapper (demos):** `components/process-demo-view.tsx`

## 2. Tech stack (non-negotiable facts)

- **GSAP 3** with **`@gsap/react`** `useGSAP` hook.
- **`ScrollTrigger`** is registered globally in the same module.
- Timeline: `gsap.timeline({ repeat: -1, paused: true })`.
- **Playback:** `ScrollTrigger.create` on `root` — `play` on enter / enterBack, `pause` on leave / leaveBack (saves CPU when off-screen).
- **Cleanup:** `gsap.context` callback + `ctx.revert()` in the `useGSAP` return.
- **Accessibility:** If `prefers-reduced-motion: reduce`, **skip** building the timeline (early `return`).

## 3. Hard constraints (MUST / MUST NOT)

**MUST**

1. Scope all DOM queries with `root` (`rootRef.current`), never `document`, so multiple instances do not cross-talk.
2. Target animated nodes with **`data-*` attributes** (stable hooks). Prefer semantic prefixes per variant: `data-web-*`, `data-disc-*`, `data-deploy-*`, etc.
3. End every variant branch with **`padTimelineToCycle(master)`** so the visible loop length matches `PROCESS_VIS_CYCLE_SEC` (currently **5 seconds**). The helper appends a dummy tween for the remaining time (`ease: "none"`).
4. Keep **hydration-safe** initial layout: use **literal** `left`/`top` **percent strings**, SVG `viewBox` coords, or predeclared constant arrays — **no** `Math.random()`, **no** time-based layout in render.
5. For repeating loops, use **`master.set(..., 0)`** (or explicit `fromTo` “from” states) so frame 0 resets inline styles from the previous iteration (opacity, filter, positions).
6. Use `useGSAP(..., { scope: rootRef, dependencies: [variant] })` so teardown/rebuild happens when `variant` changes.

**MUST NOT**

1. Do not animate layout thrash–heavy properties at high frequency (avoid animating `width`/`height` of many nodes when `scale` or `transform` suffices).
2. Do not leave orphan `querySelector` targets: if JSX removes a hook, remove or guard the corresponding tween (`if (el)`).
3. Do not rely on Tailwind `invisible` alone for final state — GSAP **`autoAlpha`** should own visibility for elements that tween in/out.

## 4. Narrative pattern per variant (intent)

Use this table when adding copy or reordering tweens; each scene tells a **linear story**.

| Variant | Story (one sentence) |
|---------|----------------------|
| `web-scraping` | Page → scan/highlight → rows → packets fly to JSON-like output panel. |
| `ai-automation` | User message → typing → bot reply + tool chips + latency; context card; optional pulse. |
| `discovery-design` | Brief → discovery notes → wireframe on artboard → crossfade to hi-fi mockup. |
| `deploy` | Pipeline steps light up → arc “beam” draws → artifact travels → particles → cloud impact → rings + LIVE badge. |
| `create` | Bursts/sparks → check path draw → celebration read as “done”. |

## 5. Selector registry (GSAP hooks)

Only elements that the timeline reads are listed. **Add new rows** when you add hooks.

### `web-scraping`

- `data-web-scan`, `data-web-row`, `data-web-packet`, `data-web-out-line`, `data-web-output-panel`, `data-browser-dust`, `data-web-flow-arrow`

### `ai-automation`

- `data-typing-dot`, `data-bubble-user`, `data-typing-wrap`, `data-bubble-bot`, `data-context-card`, `data-wa-pulse`, `data-rail-step`, `data-tool-chip`, `data-ia-latency`, `data-ia-queue-fill`  
- Layout: `data-ia-rail` (container; optional for future tweens)

### `discovery-design`

- `data-disc-grid`, `data-disc-brief`, `data-disc-insights`, `data-disc-note`, `data-disc-artboard`, `data-disc-wire`, `data-disc-hifi`, `data-disc-cursor`

### `deploy`

- `data-deploy-card`, `data-deploy-trail`, `data-deploy-ring`, `data-deploy-ring-2`, `data-deploy-cloud`, `data-deploy-cloud-core`, `data-deploy-particle`, `data-deploy-arc`, `data-deploy-live`, `data-deploy-step`

### `create`

- `data-spark`, `data-create-check`, `data-create-burst`

## 6. Algorithm: add or change a scene

1. Extend `ProcessVisualVariant` + `PROCESS_DEMO_ENTRIES` + `generateStaticParams` consumers if adding a slug.
2. Add JSX branch `if (variant === "…")` with `ref={rootRef}` on the **outer** shell `div` (same pattern as siblings).
3. Inside `useGSAP`, add `else if (variant === "…") { … padTimelineToCycle(master); }`.
4. Query elements once; prefer `if (node) { … }` for optional nodes.
5. Order tweens on a **labeled mental timeline** (seconds): intro → main motion → payoff → idle (padding handles idle).
6. Run `bun run build` and visually check `/demos/proceso/<slug>`.

## 7. Design tokens

Animations assume CSS variables exist on the page: `--line`, `--line-strong`, `--surface`, `--surface-2`, `--background`, `--cream`, `--cream-soft`, `--muted`, `--muted-dim`, `--accent`, `--teal`, `--lime`, `--ink`. Do not hardcode hex unless matching an existing exception.

## 8. SVG-specific notes

- **Gradient `id`s** in inline SVG must stay **unique per page**. Multiple `ProcessPipelineVisual` instances with clashing ids cause wrong fills; namespace ids if duplicating (e.g. `id="deploy-cloud-body-v2"`).
- For **stroke-draw** effects, set `strokeDasharray` + initial `strokeDashoffset` to match path length (constant chosen empirically if `getTotalLength` is not used at runtime).
- For **particle `attr` tweens**, GSAP accepts `{ attr: { cx, cy } }` on `SVGCircleElement`.

## 9. Quick mental model (flowchart)

```text
variant prop
    → JSX supplies DOM + data-* hooks
    → useGSAP builds timeline (paused)
    → ScrollTrigger plays/pauses by visibility
    → repeat: -1 + padTimelineToCycle → stable 5s read rhythm
```

## 10. Related user-facing strings

When changing stories, update **demo titles/descriptions** in `lib/process-demos.ts` so the index page matches what the animation shows.

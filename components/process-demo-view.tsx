"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import {
  ProcessPipelineVisual,
  type ProcessVisualVariant,
} from "./process-pipeline-visual";
import { DemoAnimationPanel } from "./demo-animation-panel";
import {
  DEFAULT_PROCESS_TUNE,
  type ProcessAnimationTune,
} from "@/lib/demo-animation-tuning";

type ProcessDemoViewProps = {
  readonly variant: ProcessVisualVariant;
};

/**
 * Contenedor de preview para rutas /demos/proceso/* — escala la escena para revisión.
 */
export function ProcessDemoView({
  variant,
}: ProcessDemoViewProps): ReactElement {
  const [tune, setTune] = useState<ProcessAnimationTune>(DEFAULT_PROCESS_TUNE);
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="origin-top scale-[1.08] md:scale-[1.18]">
            <ProcessPipelineVisual variant={variant} tune={tune} />
          </div>
        </div>
      </div>
      <DemoAnimationPanel
        scope="process"
        variant={variant}
        value={tune}
        onChange={setTune}
        className="w-full shrink-0 lg:w-[17.5rem]"
      />
    </div>
  );
}

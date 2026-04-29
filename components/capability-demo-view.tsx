"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import {
  CapabilityVisual,
  type CapabilityVisualVariant,
} from "./capability-visual";
import { DemoAnimationPanel } from "./demo-animation-panel";
import {
  DEFAULT_CAPABILITY_TUNE,
  type CapabilityAnimationTune,
} from "@/lib/demo-animation-tuning";

type CapabilityDemoViewProps = {
  readonly variant: CapabilityVisualVariant;
};

/**
 * Contenedor para rutas /demos/capacidades/* — misma escala que proceso.
 */
export function CapabilityDemoView({
  variant,
}: CapabilityDemoViewProps): ReactElement {
  const [tune, setTune] = useState<CapabilityAnimationTune>(DEFAULT_CAPABILITY_TUNE);
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="mx-auto flex w-full min-w-[17.5rem] max-w-full justify-center">
            <div className="origin-center w-full max-w-[28rem] scale-[1.05] md:scale-[1.12]">
              <CapabilityVisual variant={variant} tune={tune} respectReducedMotion={false} />
            </div>
          </div>
        </div>
      </div>
      <DemoAnimationPanel
        scope="capability"
        variant={variant}
        value={tune}
        onChange={setTune}
        className="w-full shrink-0 lg:w-[17.5rem]"
      />
    </div>
  );
}

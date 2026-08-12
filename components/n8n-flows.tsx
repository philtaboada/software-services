"use client";

import Image from "next/image";
import { useState } from "react";

const FLOWS = [
  {
    id: "itops",
    role: "IT Ops",
    can: "On-board new employees",
    image: "/images/studio/n8n-canvas-itops.jpg",
    alt: "Flujo n8n: onboarding de empleados con AI Agent, Entra ID, Jira y Slack",
    width: 2752,
    height: 1536,
  },
  {
    id: "secops",
    role: "Sec Ops",
    can: "Enrich security incident tickets",
    image: "/images/studio/n8n-canvas-secops.jpg",
    alt: "Flujo n8n: enriquecer tickets de seguridad con VirusTotal y urlscan.io",
    width: 2752,
    height: 1536,
  },
  {
    id: "devops",
    role: "Dev Ops",
    can: "Convert natural language into API calls",
    image: "/images/studio/n8n-canvas-devops.jpg",
    alt: "Flujo n8n: agente IA que convierte lenguaje natural en llamadas API",
    width: 2752,
    height: 1536,
  },
  {
    id: "sales",
    role: "Sales",
    can: "Generate customer insights from reviews",
    image: "/images/studio/n8n-canvas-sales.jpg",
    alt: "Flujo n8n: insights de clientes desde reviews con OpenAI y Google Sheets",
    width: 2752,
    height: 1536,
  },
] as const;

export function N8nFlows() {
  const [active, setActive] = useState(0);
  const flow = FLOWS[active];

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#141414] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="grid lg:grid-cols-[minmax(15.5rem,22%)_1fr]">
        <nav
          className="flex gap-1 overflow-x-auto border-b border-white/8 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
          aria-label="Casos de automatización"
        >
          {FLOWS.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className={`relative min-h-11 min-w-[13.5rem] shrink-0 cursor-pointer rounded-lg px-4 py-3.5 text-left transition lg:min-w-0 ${
                  isActive
                    ? "bg-white/[0.07]"
                    : "hover:bg-white/[0.04]"
                }`}
              >
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-[#ff4d4d]"
                  />
                ) : null}
                <p className="text-[0.95rem] font-semibold leading-none text-white">
                  {item.role}{" "}
                  <span className="font-normal text-white/45">can</span>
                </p>
                <p className="mt-1.5 text-[0.82rem] leading-snug text-white/55">
                  {item.can}
                </p>
              </button>
            );
          })}
        </nav>

        <div
          className="relative min-h-[18rem] overflow-hidden lg:min-h-[32rem]"
          style={{
            backgroundColor: "#1a1a1a",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <Image
            key={flow.id}
            src={flow.image}
            alt={flow.alt}
            width={flow.width}
            height={flow.height}
            className="h-full w-full object-contain object-center"
            sizes="(max-width:1024px) 100vw, 78vw"
            quality={92}
            priority={active === 0}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Player } from "@remotion/player";
import { AgendaMesaFilm } from "@/remotion/agenda-mesa-film";
import { AlcobaFilm } from "@/remotion/alcoba-film";
import { FabreFilm } from "@/remotion/fabre-film";
import { JlhFilm } from "@/remotion/jlh-film";
import { JunnoFilm } from "@/remotion/junno-film";
import { DURATION, FPS, HEIGHT, WIDTH } from "@/remotion/shared";
import type { CASE_BRIEFS } from "@/lib/content";

type Slug = keyof typeof CASE_BRIEFS;

const FILMS = {
  junno: JunnoFilm,
  "agenda-mesa": AgendaMesaFilm,
  "inmobiliaria-fabre": FabreFilm,
  "jlh-corredores": JlhFilm,
  "la-alcoba": AlcobaFilm,
} as const;

export function CasePlayer({ slug }: { slug: Slug }) {
  return (
    <div className="case-player">
      <Player
        component={FILMS[slug]}
        durationInFrames={DURATION}
        fps={FPS}
        compositionWidth={WIDTH}
        compositionHeight={HEIGHT}
        autoPlay
        loop
        clickToPlay
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
      <p className="case-player-hint">Remotion · clic para pausar</p>
    </div>
  );
}

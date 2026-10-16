"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, MailIcon } from "@/components/icons";

export function StickyCta({
  bookLabel,
  bookHref,
  emailHref,
  emailLabel,
}: {
  bookLabel: string;
  bookHref: string;
  emailHref: string;
  emailLabel: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      const end = document.getElementById("cierre");
      const past = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 480;
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setOn(past && !nearEnd);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`sticky-cta md:hidden ${on ? "is-on" : ""}`} inert={on ? undefined : true}>
      <a
        href={bookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary min-h-11 flex-1 px-4"
        data-cal-click
      >
        <span>{bookLabel}</span>
        <ArrowIcon className="h-4 w-4" />
      </a>
      <a href={emailHref} className="sticky-mail" aria-label={emailLabel}>
        <MailIcon className="h-5 w-5" />
      </a>
    </div>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  FUMANCHU,
  FUMANCHU_SECTIONS,
  dishKey,
  featuredDishes,
  formatSoles,
  unitPrice,
  type FumanchuDish,
} from "@/lib/fumanchu";

gsap.registerPlugin(useGSAP);

const HITS = featuredDishes();

type CartLine = {
  key: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
  image?: string;
};

function DishCard({
  dish,
  accent,
  onAdd,
}: {
  dish: FumanchuDish;
  accent: string;
  onAdd: (dish: FumanchuDish, variant?: string) => void;
}) {
  return (
    <article
      className="fmc-card"
      data-has-image={dish.image ? "true" : undefined}
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <div className="fmc-card-media">
        {dish.image ? (
          <Image src={dish.image} alt="" fill sizes="90px" className="object-cover" />
        ) : null}
      </div>
      {dish.image ? (
        <div className="fmc-card-solo" aria-hidden>
          <Image src={dish.image} alt="" fill sizes="420px" className="object-cover" />
        </div>
      ) : null}
      <h3 className="fmc-card-name">{dish.name}</h3>
      {dish.price != null ? <p className="fmc-card-price">{formatSoles(dish.price)}</p> : <span />}
      {dish.description ? <p className="fmc-card-desc">{dish.description}</p> : null}
      {dish.tag ? <p className="fmc-tag">{dish.tag}</p> : null}
      {dish.variants ? (
        <div className="fmc-variants">
          {dish.variants.map((variant) => (
            <button
              key={variant.name}
              type="button"
              className="fmc-variant"
              onClick={() => onAdd(dish, variant.name)}
            >
              <span>{variant.name}</span>
              <span>{formatSoles(variant.price)}</span>
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="fmc-add" onClick={() => onAdd(dish)}>
          Pedir
        </button>
      )}
    </article>
  );
}

export function FumanchuCarta() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FUMANCHU_SECTIONS.map((section) => ({
      ...section,
      dishes: section.dishes.filter((dish) => {
        const inSection = filter === "todos" || filter === section.id;
        const hay = `${dish.name} ${dish.description ?? ""} ${dish.tag ?? ""}`.toLowerCase();
        return inSection && (!q || hay.includes(q));
      }),
    })).filter((section) => section.dishes.length > 0);
  }, [filter, query]);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-hero-kicker]", { autoAlpha: 0, y: 16, duration: 0.4 })
        .from("[data-hero-word]", { autoAlpha: 0, y: 28, duration: 0.7 }, "-=0.1")
        .from("[data-hero-lead], [data-hero-logo]", { autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.35");
    },
    { scope: rootRef },
  );

  useEffect(() => {
    document.body.style.overflow = openCart ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openCart]);

  function add(dish: FumanchuDish, variant?: string) {
    const key = dishKey(dish.name, variant);
    const price = unitPrice(dish, variant);
    setCart((current) => {
      const found = current.find((line) => line.key === key);
      if (found) {
        return current.map((line) => (line.key === key ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...current, { key, name: dish.name, variant, price, qty: 1, image: dish.image }];
    });
    setSent(null);
  }

  function setQty(key: string, next: number) {
    setCart((current) =>
      next <= 0 ? current.filter((line) => line.key !== key) : current.map((line) => (line.key === key ? { ...line, qty: next } : line)),
    );
  }

  function sendFakeOrder() {
    const code = `FMC-${String(17 + count).padStart(3, "0")}`;
    setSent(code);
    setCart([]);
  }

  return (
    <div ref={rootRef} className="fmc">
      <header className="fmc-hero">
        <div className="fmc-hero-media">
          <Image src="/carta/fumanchu/hero-wok.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="fmc-hero-shade" />
        <Image
          data-hero-logo
          src="/carta/fumanchu/logo.webp"
          alt="Fu-Man-Chu Chifita"
          width={420}
          height={420}
          className="fmc-logo"
          priority
        />
        <div className="fmc-hero-copy">
          <p data-hero-kicker className="fmc-badge">
            Carta digital · no es un PDF
          </p>
          <h1 data-hero-word className="fmc-word">
            FU-MAN
            <br />
            <em>CHU</em>
          </h1>
          <p data-hero-lead className="fmc-lead">
            Chifa de barrio, en el celular. Armás el pedido con el pulgar. El archivo se queda en Drive.
          </p>
        </div>
      </header>

      <nav className="fmc-rail" aria-label="Filtrar la carta">
        <div className="fmc-rail-inner">
          <button type="button" className="fmc-chip" data-active={filter === "todos"} onClick={() => setFilter("todos")}>
            Todo
          </button>
          {FUMANCHU_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className="fmc-chip"
              data-active={filter === section.id}
              onClick={() => setFilter(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      <div className="fmc-wrap">
        <label className="sr-only" htmlFor="fmc-search">
          Buscar plato
        </label>
        <input
          id="fmc-search"
          className="fmc-search"
          type="search"
          placeholder="Buscar: cholón, aeropuerto, wantan…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {filter === "todos" && !query ? (
          <div className="fmc-featured" aria-label="Firmas de la casa">
            {HITS.map((dish) => (
              <button
                key={dish.name}
                type="button"
                className="fmc-hit text-left"
                data-has-image={dish.image ? "true" : undefined}
                style={{ "--hit-accent": dish.accent } as CSSProperties}
                onClick={() => add(dish)}
              >
                {dish.image ? (
                  <span className="fmc-hit-media">
                    <Image src={dish.image} alt="" fill sizes="280px" className="object-cover" />
                  </span>
                ) : null}
                <p className="fmc-hit-kicker">{dish.sectionTitle} · pedir</p>
                <p className="fmc-hit-name">{dish.name}</p>
                {dish.price != null ? <p className="fmc-hit-price">{formatSoles(dish.price)}</p> : null}
              </button>
            ))}
          </div>
        ) : null}

        {sections.length === 0 ? (
          <p className="fmc-empty">Nada con esa búsqueda. Probá “chaufa” o “wantan”.</p>
        ) : (
          sections.map((section) => (
            <section key={section.id} id={section.id} className="fmc-section">
              <div className="fmc-section-head">
                <h2 className="fmc-section-title">{section.title}</h2>
                <p className="fmc-section-hook">{section.hook}</p>
              </div>
              <div className="fmc-grid">
                {section.dishes.map((dish) => (
                  <DishCard key={dish.name} dish={dish} accent={section.accent} onAdd={add} />
                ))}
              </div>
            </section>
          ))
        )}

        <footer className="fmc-foot">
          <a href={FUMANCHU.instagram} target="_blank" rel="noopener noreferrer">
            {FUMANCHU.instagramHandle}
          </a>
          <p className="mt-2">
            Pedido demo: se arma y se “envía”, no se cobra. Así se ve pedir sin el mozo explicando el PDF.
          </p>
        </footer>
      </div>

      <div className="fmc-bar">
        <div className="fmc-bar-inner">
          <button type="button" className="fmc-btn fmc-btn-gold" onClick={() => setOpenCart(true)}>
            {count ? `Pedido · ${count} · ${formatSoles(total)}` : "Ver pedido demo"}
          </button>
          <a
            href={FUMANCHU.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="fmc-btn fmc-btn-ghost"
          >
            Instagram
          </a>
        </div>
      </div>

      {openCart ? (
        <div className="fmc-sheet" role="dialog" aria-modal="true" aria-label="Pedido demo">
          <button type="button" className="absolute inset-0" aria-label="Cerrar" onClick={() => setOpenCart(false)} />
          <div className="fmc-sheet-panel relative">
            <div className="fmc-sheet-head">
              <div>
                <p className="fmc-badge">Pedido demo · no se cobra</p>
                <h2 className="fmc-sheet-title mt-2">Tu mesa</h2>
              </div>
              <button type="button" className="fmc-btn fmc-btn-ghost" onClick={() => setOpenCart(false)}>
                Cerrar
              </button>
            </div>

            {sent ? (
              <div className="fmc-ok">
                Pedido {sent} “enviado” a cocina. Es fake: nadie recibe esto. Así se ve el flujo.
              </div>
            ) : null}

            {cart.length === 0 && !sent ? (
              <p className="fmc-empty">Todavía no hay platos. Tocá Pedir en la carta.</p>
            ) : null}

            <ul>
              {cart.map((line) => (
                <li key={line.key} className="fmc-line">
                  <span className="relative h-14 overflow-hidden rounded-lg bg-[#1a0c0c]">
                    {line.image ? (
                      <Image src={line.image} alt="" fill sizes="56px" className="object-cover" />
                    ) : null}
                  </span>
                  <span>
                    <span className="block font-semibold">{line.name}</span>
                    {line.variant ? <span className="text-[0.8rem] text-[var(--fmc-mute)]">{line.variant}</span> : null}
                    <span className="block text-[var(--fmc-gold)]">{formatSoles(line.price)}</span>
                  </span>
                  <span className="fmc-qty">
                    <button type="button" onClick={() => setQty(line.key, line.qty - 1)} aria-label="Quitar">
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.key, line.qty + 1)} aria-label="Sumar">
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            {cart.length ? (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-right font-[family-name:var(--font-fmc-display)] text-[1.4rem] font-extrabold">
                  Total {formatSoles(total)}
                </p>
                <button type="button" className="fmc-btn fmc-btn-gold" onClick={sendFakeOrder}>
                  Enviar pedido demo
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

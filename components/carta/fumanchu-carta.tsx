"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { FUMANCHU_BLUR } from "@/lib/fumanchu-blur";
import {
  FUMANCHU,
  FUMANCHU_SECTIONS,
  dishKey,
  featuredDishes,
  formatSoles,
  unitPrice,
  type FumanchuDish,
} from "@/lib/fumanchu";

const HITS = featuredDishes();

function blurProps(src?: string) {
  const blurDataURL = src ? FUMANCHU_BLUR[src] : undefined;
  return blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};
}

type CartLine = {
  key: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
  image?: string;
};

function isActionTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("button"));
}

const HERO_VIDEO = {
  hd: "/carta/fumanchu/hero-wok-hd.mp4",
  lite: "/carta/fumanchu/hero-wok.mp4",
} as const;

type HeroTier = keyof typeof HERO_VIDEO | null;

// El video del hero pesa más que toda la carta junta. Elegimos versión según la
// conexión: buena baja el original, intermedia la comprimida, mala se queda con
// la foto. Sin Network Information API (Safari) asumimos intermedia.
function pickHeroTier(): HeroTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
    }
  ).connection;

  if (connection?.saveData) return null;
  if (!connection?.effectiveType) return "lite";
  if (!connection.effectiveType.includes("4g")) {
    return connection.effectiveType === "3g" ? "lite" : null;
  }

  return connection.downlink !== undefined && connection.downlink < 5 ? "lite" : "hd";
}

function useHeroVideo() {
  const [tier, setTier] = useState<HeroTier>(null);

  useEffect(() => {
    let idle = 0;
    const start = () => {
      idle = window.setTimeout(() => setTier(pickHeroTier()), 600);
    };

    if (document.readyState === "complete") {
      start();
      return () => window.clearTimeout(idle);
    }

    window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(idle);
    };
  }, []);

  return tier;
}

function DishCard({
  dish,
  accent,
  open,
  onToggle,
  onAdd,
}: {
  dish: FumanchuDish;
  accent: string;
  open: boolean;
  onToggle: () => void;
  onAdd: (dish: FumanchuDish, variant?: string) => void;
}) {
  const [warm, setWarm] = useState(false);

  return (
    <article
      className="fmc-card"
      data-has-image={dish.image ? "true" : undefined}
      data-open={open ? "true" : undefined}
      style={{ "--card-accent": accent } as CSSProperties}
      onMouseEnter={() => setWarm(true)}
      onClick={(event) => {
        if (!dish.image || isActionTarget(event.target)) return;
        onToggle();
      }}
    >
      <div className="fmc-card-media">
        {dish.image ? (
          <Image
            src={dish.image}
            alt=""
            fill
            sizes="96px"
            loading="lazy"
            className="object-cover"
            {...blurProps(dish.image)}
          />
        ) : null}
      </div>
      {dish.image && (open || warm) ? (
        <div className="fmc-card-solo" aria-hidden>
          <Image
            src={dish.image}
            alt=""
            fill
            sizes="(min-width: 720px) 44vw, 92vw"
            className="object-cover"
            {...blurProps(dish.image)}
          />
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
  const heroTier = useHeroVideo();
  const [filter, setFilter] = useState("todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    setPreview(null);
  }, [filter, query]);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

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
    <div className="fmc">
      <header className="fmc-hero">
        <div className="fmc-hero-media">
          <Image
            src="/carta/fumanchu/hero-wok.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            {...blurProps("/carta/fumanchu/hero-wok.webp")}
          />
          {heroTier ? (
            <video
              key={heroTier}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            >
              <source src={HERO_VIDEO[heroTier]} type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="fmc-hero-shade" />
        <Image
          data-hero-logo
          src="/carta/fumanchu/logo.webp"
          alt="Fu-Man-Chu Chifita"
          width={420}
          height={420}
          sizes="(min-width: 768px) 216px, 40vw"
          className="fmc-logo"
          priority
          {...blurProps("/carta/fumanchu/logo.webp")}
        />
        <div className="fmc-hero-copy">
          <p data-hero-kicker className="fmc-badge">
            {FUMANCHU.hours.openLabel} {FUMANCHU.hours.today}
          </p>
          <h1 data-hero-word className="fmc-word">
            FU-MAN
            <br />
            <em>CHU</em>
          </h1>
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
              <article
                key={dish.name}
                className="fmc-hit text-left"
                data-has-image={dish.image ? "true" : undefined}
                data-open={preview === dish.name ? "true" : undefined}
                style={{ "--hit-accent": dish.accent } as CSSProperties}
                onClick={(event) => {
                  if (!dish.image || isActionTarget(event.target)) return;
                  setPreview((current) => (current === dish.name ? null : dish.name));
                }}
              >
                {dish.image ? (
                  <span className="fmc-hit-media">
                    <Image
                      src={dish.image}
                      alt=""
                      fill
                      sizes="(min-width: 1100px) 25vw, (min-width: 720px) 46vw, 92vw"
                      loading="lazy"
                      className="object-cover"
                      {...blurProps(dish.image)}
                    />
                  </span>
                ) : null}
                <p className="fmc-hit-kicker">{dish.sectionTitle}</p>
                <p className="fmc-hit-name">{dish.name}</p>
                <button type="button" className="fmc-hit-price" onClick={() => add(dish)}>
                  {dish.price != null ? `Pedir · ${formatSoles(dish.price)}` : "Pedir"}
                </button>
              </article>
            ))}
          </div>
        ) : null}

        {sections.length === 0 ? (
          <p className="fmc-empty">No hay un plato con eso.</p>
        ) : (
          sections.map((section) => (
            <section key={section.id} id={section.id} className="fmc-section">
              <div className="fmc-section-head">
                <h2 className="fmc-section-title">{section.title}</h2>
              </div>
              <div className="fmc-grid">
                {section.dishes.map((dish) => (
                  <DishCard
                    key={dish.name}
                    dish={dish}
                    accent={section.accent}
                    open={preview === dish.name}
                    onToggle={() => setPreview((current) => (current === dish.name ? null : dish.name))}
                    onAdd={add}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        <footer className="fmc-foot">
          <a href={FUMANCHU.instagram} target="_blank" rel="noopener noreferrer">
            {FUMANCHU.instagramHandle}
          </a>
        </footer>
      </div>

      <div className="fmc-bar">
        <div className="fmc-bar-inner">
          <button type="button" className="fmc-btn fmc-btn-gold" onClick={() => setOpenCart(true)}>
            {count ? `Pedido · ${count} · ${formatSoles(total)}` : "Ver pedido"}
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
        <div className="fmc-sheet" role="dialog" aria-modal="true" aria-label="Pedido">
          <button type="button" className="absolute inset-0" aria-label="Cerrar" onClick={() => setOpenCart(false)} />
          <div className="fmc-sheet-panel relative">
            <div className="fmc-sheet-head">
              <div>
                <p className="fmc-badge">{FUMANCHU.name}</p>
                <h2 className="fmc-sheet-title mt-2">Tu pedido</h2>
              </div>
              <button type="button" className="fmc-btn fmc-btn-ghost" onClick={() => setOpenCart(false)}>
                Cerrar
              </button>
            </div>

            {sent ? (
              <div className="fmc-ok">
                Pedido {sent}. Ya está en cocina.
              </div>
            ) : null}

            {cart.length === 0 && !sent ? (
              <p className="fmc-empty">Aún no hay nada. Toca Pedir.</p>
            ) : null}

            <ul>
              {cart.map((line) => (
                <li key={line.key} className="fmc-line">
                  <span className="relative h-14 overflow-hidden rounded-lg bg-[#1a0c0c]">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                        {...blurProps(line.image)}
                      />
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
                  Enviar pedido
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

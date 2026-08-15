"use client";

import { useEffect, useId, useRef, useState } from "react";
import { collectClientContext } from "@/lib/feedback-context";

const SCALE = [
  { value: 1, label: "Nada" },
  { value: 2, label: "Poco" },
  { value: 3, label: "Va" },
  { value: 4, label: "Bueno" },
  { value: 5, label: "Excelente" },
];

type Status = "idle" | "loading" | "ok" | "error";

function storageKey(slug: string) {
  return `radar-feedback:${slug}`;
}

export function PostFeedback({
  slug,
  title,
  source = "blog_article",
  noun = "este artículo",
  askNewsletter = true,
}: {
  slug: string;
  title?: string;
  source?: string;
  noun?: string;
  /** Se apaga donde ya hay otro bloque de suscripción, para no pedir el correo dos veces. */
  askNewsletter?: boolean;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [wantsNewsletter, setWantsNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const groupId = useId();

  useEffect(() => {
    try {
      if (window.localStorage.getItem(storageKey(slug))) setAlreadySent(true);
    } catch {
      // Modo incógnito o storage bloqueado: se pregunta igual.
    }
  }, [slug]);

  useEffect(() => {
    if (wantsNewsletter) emailRef.current?.focus();
  }, [wantsNewsletter]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating) {
      setStatus("error");
      setMessage("Elige una calificación.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title,
          rating,
          comment,
          wantsNewsletter,
          email,
          source,
          context: collectClientContext(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "No se pudo enviar.");

      setStatus("ok");
      setMessage(
        data.subscribed
          ? "Gracias. Anotado, y el viernes te llega el próximo número."
          : "Gracias. Lo leo yo, no un robot.",
      );
      try {
        window.localStorage.setItem(storageKey(slug), String(Date.now()));
      } catch {
        // Sin storage el único costo es que vuelva a preguntar.
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Inténtalo de nuevo.");
    }
  }

  if (alreadySent && status !== "ok") {
    return null;
  }

  return (
    <section className="rb-paper px-5 py-12 sm:px-10" data-reveal>
      <div className="mx-auto max-w-[720px]">
        <p className="rb-kicker">Antes de irte</p>
        <h2 className="rb-display mt-3 text-4xl text-[var(--rb-ink)] sm:text-5xl">
          ¿Te sirvió <em className="rb-em">{noun}</em>?
        </h2>

        {status === "ok" ? (
          <p className="rb-prose mt-5 text-[var(--rb-pap-70)]" role="status">
            {message}
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <p className="rb-prose mt-4 text-[var(--rb-pap-70)]">
              Un toque y listo. Si quieres, cuéntame por qué.
            </p>

            <fieldset className="rb-fb-scale mt-7">
              <legend className="sr-only">Calificación del 1 al 5</legend>
              {SCALE.map((step) => (
                <label key={step.value} className="rb-fb-step">
                  <input
                    type="radio"
                    name={`rating-${groupId}`}
                    value={step.value}
                    checked={rating === step.value}
                    onChange={() => setRating(step.value)}
                  />
                  <span className="rb-fb-dot">{step.value}</span>
                  <span className="rb-fb-label">{step.label}</span>
                </label>
              ))}
            </fieldset>

            {rating ? (
              <div className="rb-fb-more">
                <label htmlFor={`comment-${groupId}`} className="rb-fb-field-label">
                  ¿Algo que quieras contarme? (opcional)
                </label>
                <textarea
                  id={`comment-${groupId}`}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={3}
                  maxLength={2000}
                  placeholder="Lo que te sirvió, lo que sobró, lo que falta."
                  className="rb-fb-input mt-2 resize-y"
                />

                {askNewsletter ? (
                  <label className="rb-fb-check mt-5">
                    <input
                      type="checkbox"
                      checked={wantsNewsletter}
                      onChange={(event) => setWantsNewsletter(event.target.checked)}
                    />
                    <span>Mándame la revista cada viernes por correo.</span>
                  </label>
                ) : null}

                {askNewsletter && wantsNewsletter ? (
                  <>
                    <label htmlFor={`email-${groupId}`} className="sr-only">
                      Correo
                    </label>
                    <input
                      ref={emailRef}
                      id={`email-${groupId}`}
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="tu@correo.com"
                      className="rb-fb-input mt-3 h-12"
                    />
                  </>
                ) : null}

                <button type="submit" disabled={status === "loading"} className="rb-fb-submit mt-6">
                  {status === "loading" ? "Enviando…" : "Enviar"}
                </button>
              </div>
            ) : null}

            {status === "error" && message ? (
              <p className="rb-fb-error mt-4" role="alert">
                {message}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}

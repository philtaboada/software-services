"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

export const PRESENCIA_PHOTO_REFERENCES = [
  {
    src: "/images/presencia/ref-01-ceviche.jpg",
    alt: "Fotografía hero gastronómica — ceviche en plato editorial",
    tag: "Hero",
  },
  {
    src: "/images/presencia/ref-02-textiles.jpg",
    alt: "Interior de tienda de textiles — producción visual para web",
    tag: "Local",
  },
  {
    src: "/images/presencia/ref-03-bakery.jpg",
    alt: "Producto de panadería artesanal — fotografía comercial",
    tag: "Producto",
  },
  {
    src: "/images/presencia/ref-04-portrait.jpg",
    alt: "Retrato de emprendedora — sección nosotros o confianza",
    tag: "Retrato",
  },
  {
    src: "/images/presencia/ref-05-ferreteria.jpg",
    alt: "Detalle de ferretería — catálogo y servicios",
    tag: "Catálogo",
  },
  {
    src: "/images/presencia/ref-06-ropa.jpg",
    alt: "Moda en perchero — fotografía para boutique o tienda de ropa",
    tag: "Moda",
  },
  {
    src: "/images/presencia/ref-07-tecnologia.jpg",
    alt: "Productos tecnológicos — laptop y smartphone para tienda de electrónica",
    tag: "Tech",
  },
  {
    src: "/images/presencia/ref-08-servicios.jpg",
    alt: "Salón de belleza — fotografía de servicios premium",
    tag: "Belleza",
  },
] as const;

const PHOTO_COUNT = PRESENCIA_PHOTO_REFERENCES.length;
const VISIBLE_STACK_DEPTH = 5;

/** Pila horizontal: 0 = frente, 4 = asoman; 5+ = ocultas en el mazo */
const STACK_SLOTS = [
  { offsetX: 0, offsetY: 0, rotate: -1.25, scale: 1, zIndex: 8 },
  { offsetX: -34, offsetY: -3, rotate: -4.5, scale: 0.96, zIndex: 6 },
  { offsetX: -64, offsetY: 4, rotate: -6.5, scale: 0.93, zIndex: 4 },
  { offsetX: 34, offsetY: 3, rotate: 4, scale: 0.96, zIndex: 6 },
  { offsetX: 64, offsetY: -4, rotate: 5.5, scale: 0.93, zIndex: 5 },
  { offsetX: 0, offsetY: 0, rotate: 0, scale: 0.82, zIndex: 1 },
  { offsetX: 0, offsetY: 0, rotate: 0, scale: 0.8, zIndex: 1 },
  { offsetX: 0, offsetY: 0, rotate: 0, scale: 0.78, zIndex: 1 },
] as const;

function buildInitialOrder(featuredIndex: number): number[] {
  return Array.from({ length: PHOTO_COUNT }, (_, slot) => (featuredIndex + slot) % PHOTO_COUNT);
}

type PresenciaPhotoStackProps = {
  featuredIndex?: number;
  className?: string;
};

export function PresenciaPhotoStack({ featuredIndex = 0, className = "" }: PresenciaPhotoStackProps) {
  const [order, setOrder] = useState<number[]>(() => buildInitialOrder(featuredIndex));

  const cycleToBack = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const front = next.shift();
      if (front === undefined) return prev;
      next.push(front);
      return next;
    });
  }, []);

  const frontPhotoIndex = order[0];
  const frontPhoto = PRESENCIA_PHOTO_REFERENCES[frontPhotoIndex];

  return (
    <figure
      className={`presencia-photo-stack ${className}`.trim()}
      aria-label="Referencias de fotografía profesional incluidas en Presencia Digital"
    >
      <button
        type="button"
        className="presencia-photo-stack__trigger"
        onClick={cycleToBack}
        aria-label={`Ver siguiente referencia. Actual: ${frontPhoto.tag}. ${frontPhoto.alt}`}
      >
        <span className="sr-only">Pasar foto al fondo de la pila</span>
        <div className="presencia-photo-stack__deck">
          {PRESENCIA_PHOTO_REFERENCES.map((photo, photoIndex) => {
            const slot = order.indexOf(photoIndex);
            const style = STACK_SLOTS[slot];
            const isFront = slot === 0;
            const isHidden = slot >= VISIBLE_STACK_DEPTH;

            return (
              <div
                key={photo.src}
                className="presencia-photo-stack__card"
                style={{
                  zIndex: style.zIndex,
                  transform: `translate3d(${style.offsetX}px, ${style.offsetY}px, 0) rotate(${style.rotate}deg) scale(${style.scale})`,
                }}
                data-featured={isFront ? "true" : undefined}
                data-slot={slot}
                data-hidden={isHidden ? "true" : undefined}
                aria-hidden={!isFront}
              >
                <div className="presencia-photo-stack__frame">
                  <Image
                    src={photo.src}
                    alt={isFront ? photo.alt : ""}
                    fill
                    sizes="(max-width: 1024px) 140px, 168px"
                    className="presencia-photo-stack__image"
                    draggable={false}
                    priority={isFront}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </button>

      <figcaption className="presencia-photo-stack__caption">
        <span className="presencia-photo-stack__caption-tag">{frontPhoto.tag}</span>
        <span className="presencia-photo-stack__caption-note">
          Clic para ver más · {order.length} referencias
        </span>
      </figcaption>
    </figure>
  );
}

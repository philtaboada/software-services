import { FAQ_ITEMS } from "@/lib/faq";

export function FaqList() {
  return (
    <div>
      {FAQ_ITEMS.map((item) => (
        <details key={item.q} className="faq-item">
          <summary className="faq-trigger">
            <span>{item.q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p className="max-w-[42rem] pb-7 text-[0.95rem] leading-7 text-[var(--cream-soft)]/70">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

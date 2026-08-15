'use client';

import { FormEvent, useState } from 'react';

export function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'blog_section',
          csrfToken: crypto.randomUUID(),
          metadata: { page: 'radar-blog' },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'No se pudo suscribir.');
      setStatus('ok');
      setMessage('Listo. El viernes te llega.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="rb-paper mt-16 px-5 py-12 sm:px-10">
      <div className="mx-auto max-w-[720px]">
        <p className="rb-kicker">Cada viernes</p>
        <h2 className="rb-display mt-3 text-4xl text-[var(--rb-ink)] sm:text-5xl">
          El número siguiente <em className="rb-em">en tu correo</em>
        </h2>
        <p className="rb-prose mt-4 text-[var(--rb-pap-70)]">
          Sin lista de features. La misma revista que sale el viernes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="radar-email" className="sr-only">
            Correo
          </label>
          <input
            id="radar-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@correo.com"
            disabled={status === 'loading' || status === 'ok'}
            className="h-12 flex-1 border border-[rgba(12,11,9,0.22)] bg-white/80 px-4 font-[var(--rb-read)] text-[var(--rb-ink)] outline-none focus:border-[#0f6b6a]"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'ok'}
            className="h-12 bg-[var(--rb-ink)] px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--rb-paper)] disabled:opacity-60"
          >
            {status === 'loading' ? 'Enviando…' : 'Recibir Radar'}
          </button>
        </div>
        {message && (
          <p className="mt-4 font-[var(--rb-sans)] text-sm text-[var(--rb-ink)]" role="status">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

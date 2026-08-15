import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildFeedbackMetadata } from "@/lib/feedback-context";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_COMMENT = 2000;

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ message: "Falta configurar Supabase." }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ message: "Elige una calificación." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim().slice(0, 200) : "";
  if (!slug) {
    return NextResponse.json({ message: "Falta el artículo." }, { status: 400 });
  }

  const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, MAX_COMMENT) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const wantsNewsletter = body.wantsNewsletter === true;

  if (wantsNewsletter && !EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Correo inválido." }, { status: 400 });
  }

  const source = typeof body.source === "string" ? body.source.slice(0, 60) : "blog_article";
  const metadata = buildFeedbackMetadata({
    request,
    client: body.context,
    slug,
    source,
    rating,
    hasComment: Boolean(comment),
    wantsNewsletter,
  });

  const supabase = createClient(url, key);

  const { error } = await supabase.from("post_feedback").insert({
    post_slug: slug,
    post_title: typeof body.title === "string" ? body.title.slice(0, 300) : null,
    rating,
    comment: comment || null,
    email: wantsNewsletter ? email : null,
    wants_newsletter: wantsNewsletter,
    source,
    metadata,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  // La suscripción vive en su propia tabla; que falle no invalida el feedback.
  let subscribed = false;
  if (wantsNewsletter) {
    const { error: subError } = await supabase.from("newsletter_subscribers").insert({
      email,
      source: "blog_feedback",
      metadata,
    });
    subscribed = !subError || subError.message.toLowerCase().includes("duplicate");
  }

  return NextResponse.json({ ok: true, subscribed });
}

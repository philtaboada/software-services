import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ message: "Falta configurar Supabase." }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Correo inválido." }, { status: 400 });
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("newsletter_subscribers").insert({
    email,
    source: "blog_section",
    metadata: { page: "theros-radar-blog" },
  });

  if (error && !error.message.toLowerCase().includes("duplicate")) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

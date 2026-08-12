import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BOOKING_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agendar",
  description: "Agenda una llamada de 30 minutos con Wavys Technologies.",
  alternates: { canonical: "/agendar" },
  robots: { index: false, follow: true },
};

export default function AgendarPage() {
  redirect(BOOKING_HREF);
}

import { LandingPage } from "@/components/landing-page";
import { landingMetadata } from "@/lib/i18n/seo";

export const metadata = landingMetadata("es");

export default function Home() {
  return <LandingPage locale="es" />;
}

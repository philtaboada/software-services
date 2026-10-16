import { LandingPage } from "@/components/landing-page";
import { landingMetadata } from "@/lib/i18n/seo";

export const metadata = landingMetadata("en");

export default function EnglishHome() {
  return (
    <div lang="en">
      <LandingPage locale="en" />
    </div>
  );
}

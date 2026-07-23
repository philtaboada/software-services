import { redirect } from "next/navigation";

/** Legacy path — Presencia Digital retirada; home Wavys Software. */
export default function LandingPageRedirect() {
  redirect("/");
}

import type { Metadata } from "next";
import { IssueIndex } from "@/components/blog/issue-index";
import { radarIssues } from "@/lib/radar-issues";

export const metadata: Metadata = {
  title: "Radar · Revistas",
  description: "Las revistas semanales de Wavys. Un número cada viernes.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Radar · Revistas",
    description: "Las revistas semanales de Wavys. Empieza con el último número.",
    images: ["/radar/n3/tapa.png"],
  },
};

export default function BlogPage() {
  return <IssueIndex issues={radarIssues} />;
}

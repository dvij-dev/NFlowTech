import type { Metadata } from "next";
import { CaseStudiesContent } from "./CaseStudiesContent";

export const metadata: Metadata = {
  title: "Case Studies — Proof, Not Promises",
  description: "Real results from real clients. See how NFlow Tech drives revenue growth across 27+ industries.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}

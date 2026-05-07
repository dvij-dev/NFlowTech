import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — Full-Stack Digital Marketing",
  description: "PPC, SEO, Social Media, and Web Design services engineered for maximum ROI. Data-driven strategies across 27+ industries.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}

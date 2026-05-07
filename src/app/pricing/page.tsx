import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Transparent, No Contracts",
  description: "Flexible pricing for every stage of growth. No contracts, no hidden fees. Start with a free audit.",
};

export default function PricingPage() {
  return <PricingContent />;
}

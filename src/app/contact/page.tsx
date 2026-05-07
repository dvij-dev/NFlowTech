import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Get Your Free Audit",
  description: "Ready to scale? Get a free digital marketing audit from NFlow Tech. No contracts, no obligation.",
};

export default function ContactPage() {
  return <ContactContent />;
}

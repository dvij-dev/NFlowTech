import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind NFlow Tech. Founded in 2020 with a mission to make data-driven marketing accessible to every brand.",
};

export default function AboutPage() {
  return <AboutContent />;
}

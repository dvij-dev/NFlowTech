import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ProblemSection />
      <ServicesOverview />
      <ResultsShowcase />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </>
  );
}

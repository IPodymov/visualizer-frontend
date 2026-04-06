import { HeroSection } from "./hero-section/hero-section";
import { HowItWorksSection } from "./how-it-works-section/how-it-works-section";
import { BenefitsSection } from "./benefits-section/benefits-section";
import { CtaSection } from "./cta-section/cta-section";
import "./landing-page.css";

export const LandingPage = () => {
  return (
    <div className="landing">
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
    </div>
  );
};

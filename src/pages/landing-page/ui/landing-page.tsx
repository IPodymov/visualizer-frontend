import { HeroSection } from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
import { BenefitsSection } from './benefits-section';
import { CtaSection } from './cta-section';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
    </div>
  );
};

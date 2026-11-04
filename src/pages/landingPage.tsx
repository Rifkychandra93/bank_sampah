import { LandingNavbar } from '../components/landing/navbar';
import { HeroSection } from '../components/landing/heroSection';
import { FeaturesSection } from '../components/landing/featuresSection';
import { PricingSection } from '../components/landing/pricingSection';
import { BenefitsSection } from '../components/landing/benefitsSection';
import { FaqSection } from '../components/landing/faqSection';
import { Footer } from '../components/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <BenefitsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

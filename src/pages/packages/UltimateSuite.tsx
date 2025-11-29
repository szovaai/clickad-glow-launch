import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SuiteHero } from "@/components/packages/SuiteHero";
import { CoreOfferSection } from "@/components/packages/CoreOfferSection";
import { ValueAddsGrid } from "@/components/packages/ValueAddsGrid";
import { PremiumSupportSection } from "@/components/packages/PremiumSupportSection";
import { SuiteProcessTimeline } from "@/components/packages/SuiteProcessTimeline";
import { SuiteTestimonials } from "@/components/packages/SuiteTestimonials";
import { SuitePricingCard } from "@/components/packages/SuitePricingCard";
import { GuaranteeSection } from "@/components/packages/GuaranteeSection";
import { SuiteFAQ } from "@/components/packages/SuiteFAQ";
import { CTA } from "@/components/CTA";

const UltimateSuite = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <SuiteHero />
        <CoreOfferSection />
        <ValueAddsGrid />
        <PremiumSupportSection />
        <SuiteProcessTimeline />
        <SuiteTestimonials />
        <SuitePricingCard />
        <GuaranteeSection />
        <SuiteFAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default UltimateSuite;

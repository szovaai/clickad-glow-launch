import { useEffect } from "react";
import PremiumHeader from "@/components/PremiumHeader";
import { Footer } from "@/components/Footer";
import { PackageHero } from "@/components/packages/PackageHero";
import { PainPointsSection } from "@/components/packages/PainPointsSection";
import { ValueStack } from "@/components/packages/ValueStack";
import { PremiumSupportSection } from "@/components/packages/PremiumSupportSection";
import { ProcessSection } from "@/components/packages/ProcessSection";
import { TestimonialCarousel } from "@/components/packages/TestimonialCarousel";
import { PricingCard } from "@/components/packages/PricingCard";
import { GuaranteeSection } from "@/components/packages/GuaranteeSection";
import { PackageFAQ } from "@/components/packages/PackageFAQ";
import { FinalCTA } from "@/components/packages/FinalCTA";

export default function UltimateSuite() {
  useEffect(() => {
    // Track page view
    if (window.Trakrly) {
      window.Trakrly.pv();
    }
  }, []);

  return (
    <div className="min-h-screen">
        <PremiumHeader />
        
        <main>
          <PackageHero />
          <PainPointsSection />
          <ValueStack />
          <PremiumSupportSection />
          <ProcessSection />
          <TestimonialCarousel />
          <PricingCard />
          <GuaranteeSection />
          <PackageFAQ />
          <FinalCTA />
        </main>

        <Footer />
      </div>
  );
}

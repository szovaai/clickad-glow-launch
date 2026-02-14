import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SuiteHero } from "@/components/packages/SuiteHero";
import { PainSection } from "@/components/ai-sales/PainSection";
import { CoreOfferSection } from "@/components/packages/CoreOfferSection";
import { ValueAddsGrid } from "@/components/packages/ValueAddsGrid";
import { PremiumSupportSection } from "@/components/packages/PremiumSupportSection";
import { SuiteProcessTimeline, suiteProcessSteps } from "@/components/packages/SuiteProcessTimeline";
import { SuiteTestimonials } from "@/components/packages/SuiteTestimonials";
import { SuitePricingCard } from "@/components/packages/SuitePricingCard";
import { GuaranteeSection } from "@/components/packages/GuaranteeSection";
import { SuiteFAQ, suiteFAQs } from "@/components/packages/SuiteFAQ";
import { CTA } from "@/components/CTA";
import { SEOHead } from "@/components/SEOHead";
import {
  generateServiceSchema,
  generateFAQPageSchema,
  generateHowToSchema,
  generateOfferSchema,
} from "@/lib/schema";

const UltimateSuite = () => {
  const schemas = [
    generateServiceSchema(
      "AI Sales Infrastructure",
      "AI receptionist, website chat qualifier, follow-up automation, and CRM for Calgary service businesses. Never miss a call or lead again.",
      "Calgary, AB"
    ),
    generateFAQPageSchema(suiteFAQs),
    generateHowToSchema(
      "How to Install Your AI Sales System",
      "A proven 3-step process: Install, Train, Optimize",
      suiteProcessSteps.map(step => ({
        title: step.title,
        description: step.description,
        duration: step.duration
      }))
    ),
    generateOfferSchema(
      "AI Sales Infrastructure",
      "Complete AI receptionist and sales automation system for service businesses",
      "1497-5000",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Sales System for Service Businesses | ClickAd Media"
        description="Install an AI receptionist, chat qualifier, and automated follow-up that answers, qualifies, and books customers 24/7. Live in 7 days. Starting at $1,497."
        canonical="https://www.clickadmedia.com/"
        keywords="AI receptionist, AI sales system, automated booking, lead capture, missed call text back, Calgary"
        schemas={schemas}
      />
      <Navigation />
      <main>
        <SuiteHero />
        <PainSection />
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

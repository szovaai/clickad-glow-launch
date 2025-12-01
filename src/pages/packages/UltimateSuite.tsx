import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SuiteHero } from "@/components/packages/SuiteHero";
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
      "Ultimate Business Website Suite",
      "Premium website package for Calgary service businesses. Includes custom design, SEO optimization, copywriting, branding package, and 3 months of priority support. Everything your business needs to dominate online.",
      "Calgary, AB"
    ),
    generateFAQPageSchema(suiteFAQs),
    generateHowToSchema(
      "How to Launch Your Business Website",
      "A proven 5-step process from discovery to launch and ongoing support",
      suiteProcessSteps.map(step => ({
        title: step.title,
        description: step.description,
        duration: step.duration
      }))
    ),
    generateOfferSchema(
      "Ultimate Business Website Suite",
      "Complete website solution with custom design, SEO, copywriting, branding, and 3 months support",
      "997-2500",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Ultimate Business Website Suite | Calgary's Premier Website Package"
        description="Get everything your Calgary business needs to dominate online. Custom design, SEO optimization, professional copywriting, branding package, and 3 months of priority support. Starting at $997."
        canonical="https://www.clickadmedia.com/"
        keywords="Calgary website design, business website package, custom website Calgary, website design suite"
        schemas={schemas}
      />
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

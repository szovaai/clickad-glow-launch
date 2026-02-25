import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SuiteHero } from "@/components/packages/SuiteHero";
import { PainSection } from "@/components/ai-sales/PainSection";
import { AIDifferentiator } from "@/components/sections/AIDifferentiator";
import { CoreOfferSection } from "@/components/packages/CoreOfferSection";
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
      "AI-Powered Websites & Growth Systems",
      "AI websites, SEO growth engines, chatbot lead capture, and automated follow-up for service businesses in Calgary and beyond.",
      "Calgary, AB"
    ),
    generateFAQPageSchema(suiteFAQs),
    generateHowToSchema(
      "How to Get Your AI-Powered Growth System",
      "A proven 3-step process: Audit, Build, Scale",
      suiteProcessSteps.map(step => ({
        title: step.title,
        description: step.description,
        duration: step.duration
      }))
    ),
    generateOfferSchema(
      "AI-Powered Website & Growth System",
      "Complete AI website, SEO, chatbot, and automation system for service businesses",
      "997-4997",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI-Powered Websites & Growth Systems for Service Businesses | ClickAd Media"
        description="AI websites, smart chatbots, SEO systems, and automated follow-up that generate leads and book appointments 24/7. Live in 7 days. Starting at $997."
        canonical="https://www.clickadmedia.com/"
        keywords="AI website, AI chatbot, SEO growth, lead capture, automated booking, Calgary web design"
        schemas={schemas}
      />
      <Navigation />
      <main>
        <SuiteHero />
        <PainSection />
        <AIDifferentiator />
        <CoreOfferSection />
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

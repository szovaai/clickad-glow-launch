import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { IndustryPainPoints } from "@/components/services/IndustryPainPoints";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { MicroCaseStudy } from "@/components/services/MicroCaseStudy";
import { IndustryFAQ } from "@/components/services/IndustryFAQ";
import { ServicePageCTA } from "@/components/services/ServicePageCTA";
import { renovationContent } from "@/data/services/renovation";
import { useEffect } from "react";

declare global {
  interface Window {
    trakrly?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export default function CalgaryRenovationWebsites() {
  useEffect(() => {
    // Track page view
    if (window.trakrly) {
      window.trakrly.track("service_page_view", {
        industry: "renovation",
        page: "/services/calgary-renovation-contractor-websites",
      });
    }
  }, []);

  return (
    <ServicePageLayout
      industry="Calgary Renovation Contractor Websites"
      heroTitle={renovationContent.hero.title}
      heroSubtitle={renovationContent.hero.subtitle}
      heroImage={renovationContent.hero.image}
      metaTitle={renovationContent.meta.title}
      metaDescription={renovationContent.meta.description}
      schema={renovationContent.schema}
    >
      <IndustryPainPoints painPoints={renovationContent.painPoints} />
      <ServiceGrid services={renovationContent.services} />
      <MicroCaseStudy
        companyName={renovationContent.caseStudy.companyName}
        results={renovationContent.caseStudy.results}
      />
      <IndustryFAQ faqs={renovationContent.faqs} />
      <ServicePageCTA
        ctaText="Ready to Win More Renovation Projects?"
        buttonText="Get a Free 5-Minute Audit"
        link="/audit?utm_source=service-page&utm_campaign=renovation&utm_medium=website"
      />
    </ServicePageLayout>
  );
}

import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { IndustryPainPoints } from "@/components/services/IndustryPainPoints";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { MicroCaseStudy } from "@/components/services/MicroCaseStudy";
import { IndustryFAQ } from "@/components/services/IndustryFAQ";
import { ServicePageCTA } from "@/components/services/ServicePageCTA";
import { industrialContent } from "@/data/services/industrial";
import { useEffect } from "react";

declare global {
  interface Window {
    trakrly?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export default function CalgaryIndustrialWebsites() {
  useEffect(() => {
    // Track page view
    if (window.trakrly) {
      window.trakrly.track("service_page_view", {
        industry: "industrial",
        page: "/services/calgary-industrial-manufacturing-websites",
      });
    }
  }, []);

  return (
    <ServicePageLayout
      industry="Calgary Industrial & Manufacturing Websites"
      heroTitle={industrialContent.hero.title}
      heroSubtitle={industrialContent.hero.subtitle}
      heroImage={industrialContent.hero.image}
      metaTitle={industrialContent.meta.title}
      metaDescription={industrialContent.meta.description}
      schema={industrialContent.schema}
    >
      <IndustryPainPoints painPoints={industrialContent.painPoints} />
      <ServiceGrid services={industrialContent.services} />
      <MicroCaseStudy
        companyName={industrialContent.caseStudy.companyName}
        results={industrialContent.caseStudy.results}
      />
      <IndustryFAQ faqs={industrialContent.faqs} />
      <ServicePageCTA
        ctaText="Ready to Win More Industrial Contracts?"
        buttonText="Get a Free 5-Minute Audit"
        link="/audit?utm_source=service-page&utm_campaign=industrial&utm_medium=website"
      />
    </ServicePageLayout>
  );
}

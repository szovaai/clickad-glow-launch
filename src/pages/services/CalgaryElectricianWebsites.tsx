import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { IndustryPainPoints } from "@/components/services/IndustryPainPoints";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { MicroCaseStudy } from "@/components/services/MicroCaseStudy";
import { IndustryFAQ } from "@/components/services/IndustryFAQ";
import { ServicePageCTA } from "@/components/services/ServicePageCTA";
import { electricianContent } from "@/data/services/electrician";
import { useEffect } from "react";

declare global {
  interface Window {
    trakrly?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export default function CalgaryElectricianWebsites() {
  useEffect(() => {
    // Track page view
    if (window.trakrly) {
      window.trakrly.track("service_page_view", {
        industry: "electrician",
        page: "/services/calgary-electrician-websites",
      });
    }
  }, []);

  return (
    <ServicePageLayout
      industry="Calgary Electrician Websites"
      heroTitle={electricianContent.hero.title}
      heroSubtitle={electricianContent.hero.subtitle}
      heroImage={electricianContent.hero.image}
      metaTitle={electricianContent.meta.title}
      metaDescription={electricianContent.meta.description}
      schema={electricianContent.schema}
    >
      <IndustryPainPoints painPoints={electricianContent.painPoints} />
      <ServiceGrid services={electricianContent.services} />
      <MicroCaseStudy
        companyName={electricianContent.caseStudy.companyName}
        results={electricianContent.caseStudy.results}
      />
      <IndustryFAQ faqs={electricianContent.faqs} />
      <ServicePageCTA
        ctaText="Ready to Get More Emergency Calls?"
        buttonText="Get a Free 5-Minute Audit"
        link="/audit?utm_source=service-page&utm_campaign=electrician&utm_medium=website"
      />
    </ServicePageLayout>
  );
}

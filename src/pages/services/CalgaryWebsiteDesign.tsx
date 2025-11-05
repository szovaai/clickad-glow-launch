import { useEffect } from "react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { BenefitsList } from "@/components/services/BenefitsList";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { IndustriesGrid } from "@/components/services/IndustriesGrid";
import { PricingTiers } from "@/components/services/PricingTiers";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { RankingFactors } from "@/components/services/RankingFactors";
import { IndustryFAQ } from "@/components/services/IndustryFAQ";
import { ServicePageCTA } from "@/components/services/ServicePageCTA";
import { calgaryWebsiteDesignContent } from "@/data/services/calgary-website-design";

export default function CalgaryWebsiteDesign() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Trakrly) {
      (window as any).Trakrly("event", "page_view", {
        page: "calgary-website-design",
      });
    }
  }, []);

  return (
    <ServicePageLayout
      industry="Calgary Website Design"
      heroTitle={calgaryWebsiteDesignContent.hero.title}
      heroSubtitle={calgaryWebsiteDesignContent.hero.subtitle}
      heroImage=""
      metaTitle={calgaryWebsiteDesignContent.meta.title}
      metaDescription={calgaryWebsiteDesignContent.meta.description}
      schema={calgaryWebsiteDesignContent.schema}
    >
      <BenefitsList benefits={calgaryWebsiteDesignContent.benefits} />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Your Project Includes</h2>
            <div className="space-y-4 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-2">Discovery & Strategy</h3>
                <p className="text-muted-foreground">Positioning, audiences, messaging, sitemap.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">UX & Wireframes</h3>
                <p className="text-muted-foreground">Layouts that make decisions easy.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Design System</h3>
                <p className="text-muted-foreground">Color, type, components for a consistent brand.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">High-Performance Build</h3>
                <p className="text-muted-foreground">Mobile-first, SEO-ready, ultra-fast.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Launch & Tracking</h3>
                <p className="text-muted-foreground">Analytics, event tracking, and conversions wired in.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">90-Day Optimization</h3>
                <p className="text-muted-foreground">Post-launch tweaks to maximize ROI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid services={calgaryWebsiteDesignContent.services} />
      
      <IndustriesGrid industries={calgaryWebsiteDesignContent.industries} />
      
      <PricingTiers tiers={calgaryWebsiteDesignContent.pricing} />
      
      <ProcessTimeline steps={calgaryWebsiteDesignContent.process} />
      
      <RankingFactors factors={calgaryWebsiteDesignContent.rankingFactors} />
      
      <IndustryFAQ faqs={calgaryWebsiteDesignContent.faqs} />
      
      <ServicePageCTA
        ctaText="Ready to Grow With a Better Calgary Website?"
        buttonText="Get Your Free Audit"
        link="/audit"
      />
    </ServicePageLayout>
  );
}

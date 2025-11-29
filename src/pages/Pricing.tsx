import PremiumHeader from "@/components/PremiumHeader";
import { Pricing as PricingComponent } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { generateOfferSchema } from "@/lib/schema";

const Pricing = () => {
  const schemas = [
    generateOfferSchema(
      "Calgary Website Design Services",
      "Transparent pricing for professional Calgary website design. From starter sites to custom solutions.",
      "2500-12000",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Calgary Website Design Pricing | Transparent Packages & Quotes"
        description="Clear, upfront pricing for Calgary website design. Starter sites from $2.5k, Growth sites from $6k, custom solutions available. No hidden fees, just results."
        canonical="https://www.clickadmedia.com/pricing"
        keywords="Calgary website design pricing, web design cost Calgary, website packages Calgary"
        schemas={schemas}
      />
      <PremiumHeader />
      <main>
        <PricingComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

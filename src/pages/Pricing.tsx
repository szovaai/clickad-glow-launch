import PremiumHeader from "@/components/PremiumHeader";
import { Pricing as PricingComponent } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { generateOfferSchema } from "@/lib/schema";

const Pricing = () => {
  const schemas = [
    generateOfferSchema(
      "AI Website in 48 Hours — $997",
      "Get a custom AI-designed website delivered in 48 hours for $997. Mobile-responsive, SEO-ready, built to convert. No monthly fees.",
      "997",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Website in 48 Hours — $997 | ClickAd Media"
        description="Get a custom AI-designed website delivered in 48 hours for $997. Mobile-responsive, SEO-ready, built to convert visitors into leads. No monthly fees, no lock-in."
        canonical="https://www.clickadmedia.com/pricing"
        keywords="AI website 48 hours, $997 website, fast web design, Calgary website pricing"
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

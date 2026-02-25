import PremiumHeader from "@/components/PremiumHeader";
import { Pricing as PricingComponent } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { generateOfferSchema } from "@/lib/schema";

const Pricing = () => {
  const schemas = [
    generateOfferSchema(
      "AI Website & Growth System Pricing",
      "Transparent pricing for AI-powered websites and growth systems. Starter from $997, Growth Engine from $1,997, Domination from $4,997.",
      "997-4997",
      "CAD"
    )
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Website & Growth System Pricing | ClickAd Media"
        description="Transparent pricing for AI-powered websites and growth systems. Starter AI Site from $997, Growth Engine from $1,997, Domination Package from $4,997. No hidden fees."
        canonical="https://www.clickadmedia.com/pricing"
        keywords="AI website pricing, growth system cost, web design packages, Calgary website pricing"
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

import PremiumHeader from "@/components/PremiumHeader";
import { Pricing as PricingComponent } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <PremiumHeader />
      <main>
        <PricingComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

import { Navigation } from "@/components/Navigation";
import { Pricing as PricingComponent } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24">
        <PricingComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

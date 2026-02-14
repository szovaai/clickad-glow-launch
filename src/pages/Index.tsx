import PremiumHeader from "@/components/PremiumHeader";
import { PainSection } from "@/components/ai-sales/PainSection";
import { Benefits } from "@/components/Benefits";
import { Timeline } from "@/components/Timeline";
import { Work } from "@/components/Work";
import { Pricing } from "@/components/Pricing";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { PreFooterCTA } from "@/components/PreFooterCTA";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/hero/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PremiumHeader />
      <main>
        <PainSection />
        <section id="services">
          <Benefits />
        </section>
        <Timeline />
        <Work />
        <Results />
        <Pricing />
        <FAQ />
        <PreFooterCTA />
        <CTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;

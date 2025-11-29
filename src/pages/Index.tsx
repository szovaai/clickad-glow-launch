import PremiumHeader from "@/components/PremiumHeader";
import { Benefits } from "@/components/Benefits";
import { Work } from "@/components/Work";
import { Templates } from "@/components/Templates";
import { Timeline } from "@/components/Timeline";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { BeforeAfterSlider } from "@/components/hero/BeforeAfterSlider";
import { PreFooterCTA } from "@/components/PreFooterCTA";
import { StickyMobileCTA } from "@/components/hero/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PremiumHeader />
      <main>
        <section id="services">
          <Benefits />
        </section>
        <Work />
        <BeforeAfterSlider />
        <Templates />
        <Timeline />
        <Results />
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

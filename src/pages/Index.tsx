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
import { TestimonialRotator } from "@/components/hero/TestimonialRotator";

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
        
        {/* Testimonials Section */}
        <section className="py-24 bg-background">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <TestimonialRotator />
            </div>
          </div>
        </section>
        
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

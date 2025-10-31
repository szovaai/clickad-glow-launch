import PremiumHeader from "@/components/PremiumHeader";
import { Benefits } from "@/components/Benefits";
import { Work } from "@/components/Work";
import { Templates } from "@/components/Templates";
import { Timeline } from "@/components/Timeline";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PremiumHeader />
      <main>
        <Benefits />
        <Work />
        <Templates />
        <Timeline />
        <Results />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

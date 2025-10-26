import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Work } from "@/components/Work";
import { Templates } from "@/components/Templates";
import { Timeline } from "@/components/Timeline";
import { Pricing } from "@/components/Pricing";

import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Work />
        <Templates />
        <Timeline />
        <Pricing />
        
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

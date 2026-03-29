import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Search, CalendarCheck } from "lucide-react";
import { HeroLeadForm } from "@/components/HeroLeadForm";

export const SuiteHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 md:pt-8">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(224_100%_65%/0.08),_transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='white' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left — Editorial text */}
          <div className="text-left">
            <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
              Revenue-focused websites for service brands
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] font-heading font-bold leading-[0.96] tracking-[-0.03em] mb-6">
              Your Website Should Feel Like Your Best{" "}
              <span className="glow-text">Salesperson</span>
              <span className="text-muted-foreground"> — Not a Placeholder.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed prose-body">
              High-conversion, fast-launch websites designed to increase trust, qualify leads, and turn attention into booked calls.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button asChild size="lg">
                <a href="/audit">Book a Strategy Call</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#process">See How It Works</a>
              </Button>
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-3 items-center">
              {[
                { icon: Bot, label: "Built for service brands" },
                { icon: Search, label: "Conversion-first UX" },
                { icon: CalendarCheck, label: "Fast launch process" },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[hsl(0_0%_100%/0.06)] bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <chip.icon className="w-3.5 h-3.5 text-primary" />
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Strategy Intake Card */}
          <div className="lg:sticky lg:top-28">
            <HeroLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface PricingTier {
  name: string;
  pages: string;
  price: string;
  timeline: string;
  featured: boolean;
}

interface PricingTiersProps {
  tiers: PricingTier[];
}

export function PricingTiers({ tiers }: PricingTiersProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Pricing & Timelines
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Typical Ranges
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`p-8 bg-card rounded-lg border ${
                tier.featured
                  ? "ring-2 ring-primary shadow-xl scale-105"
                  : "hover:shadow-lg"
              } transition-all`}
            >
              {tier.featured && (
                <div className="text-sm font-semibold text-primary mb-4 text-center">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-center">{tier.name}</h3>
              <p className="text-muted-foreground text-center mb-4">{tier.pages}</p>
              <div className="text-3xl font-bold text-center mb-2">{tier.price}</div>
              <p className="text-muted-foreground text-center mb-6">{tier.timeline}</p>
              <Button asChild className="w-full" variant={tier.featured ? "default" : "outline"}>
                <Link to="/audit">
                  Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8">
          Want a fixed quote? Share your goals and 2–3 competitor sites.
        </p>
      </div>
    </section>
  );
}

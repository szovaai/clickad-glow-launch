import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const packages = [
  {
    name: "Starter",
    price: "$997",
    pages: "5 pages",
    priceId: "price_1Sb4IEGuihElNnYIZvb1iCM9",
    description: "Perfect for small businesses getting started online",
    features: [
      "Custom responsive design",
      "Mobile-first approach",
      "Basic on-page SEO (titles, meta)",
      "Contact form with email notifications",
      "SSL & hosting setup",
      "Google Analytics integration",
      "30-day post-launch support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,497",
    pages: "10 pages",
    priceId: "price_1Sb4IUGuihElNnYIXX4tOwSb",
    description: "Most popular choice for growing service businesses",
    features: [
      "Everything in Starter",
      "Professional copywriting (all pages)",
      "Advanced SEO (schema, local SEO, sitemap)",
      "Google Business Profile setup",
      "Lead capture forms with automations",
      "Speed & Core Web Vitals optimization",
      "60-day priority support",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$2,500",
    pages: "Unlimited pages",
    priceId: "price_1Sb4IhGuihElNnYILPHGfbnS",
    description: "Complete solution for businesses ready to dominate",
    features: [
      "Everything in Growth",
      "Unlimited custom pages",
      "Branding package (logo, colors, fonts)",
      "1-on-1 strategy session (60 min)",
      "Custom functionality/integrations",
      "Training video library access",
      "3 months priority support",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoadingPriceId(priceId);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Choose Your Path
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparent pricing. No hidden fees. Start booking more jobs today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`p-8 relative ${
                pkg.popular 
                  ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)] bg-card/80' 
                  : 'border-primary/20 bg-card/50'
              } backdrop-blur-sm`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{pkg.pages}</p>
                  <div className="text-4xl font-heading font-bold text-primary mb-3">{pkg.price}</div>
                  <p className="text-muted-foreground">{pkg.description}</p>
                </div>
                
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.popular ? "glow" : "outline"} 
                  className="w-full"
                  size="lg"
                  onClick={() => handleCheckout(pkg.priceId)}
                  disabled={loadingPriceId === pkg.priceId}
                >
                  {loadingPriceId === pkg.priceId ? "Processing..." : "Get Started"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

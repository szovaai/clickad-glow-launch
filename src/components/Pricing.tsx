import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const packages = [
  {
    name: "7-Day Launch",
    price: "$2,997",
    description: "Perfect for trades ready to start booking jobs fast",
    features: [
      "5-page conversion-optimized site",
      "Mobile-first responsive design",
      "Contact forms with CRM integration",
      "Basic SEO setup",
      "7-day guaranteed timeline",
      "30-day post-launch support",
    ],
    popular: true,
  },
  {
    name: "Custom Build",
    price: "Custom",
    description: "For businesses needing advanced features and integrations",
    features: [
      "Unlimited pages & sections",
      "Advanced booking systems",
      "Payment processing",
      "Custom CMS setup",
      "Advanced SEO & analytics",
      "3 months premium support",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Choose Your Path
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparent pricing. No hidden fees. Start booking more jobs today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

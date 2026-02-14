import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PRICE_IDS = {
  capture: "price_1T0myvGuihElNnYIexKFSGEr",
  receptionist: "price_1T0mzEGuihElNnYIOI5p3qAm",
  salesteam: "price_1T0mzTGuihElNnYIveLy8xdw",
};

export const SuitePricingCard = () => {
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);

  const handleCheckout = async (packageKey: string) => {
    setLoadingPackage(packageKey);
    try {
      const priceId = PRICE_IDS[packageKey as keyof typeof PRICE_IDS];
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoadingPackage(null);
    }
  };

  const packages = [
    {
      key: "capture",
      name: "Lead Capture System",
      price: "$1,497",
      setup: "One-time setup",
      monthly: "$297/mo management",
      description: "Start capturing and converting leads automatically",
      features: [
        "Conversion-focused website or landing page",
        "Chat lead capture + booking widget",
        "Missed-call text back",
        "CRM pipeline basics",
        "Google Analytics + tracking setup",
        "30-day post-launch support",
      ],
      popular: false,
    },
    {
      key: "receptionist",
      name: "AI Receptionist System",
      price: "$2,997",
      setup: "One-time setup",
      monthly: "$497/mo management",
      description: "Full AI voice + chat answering and booking",
      features: [
        "Everything in Lead Capture",
        "AI voice receptionist (24/7 call answering)",
        "Custom qualification scripts",
        "Follow-up automation (SMS + email)",
        "Calendar integration + reminders",
        "60-day priority support",
      ],
      popular: true,
    },
    {
      key: "salesteam",
      name: "AI Sales Team + Optimization",
      price: "$5,000+",
      setup: "Custom setup",
      monthly: "$997/mo management",
      description: "Enterprise-level AI sales infrastructure",
      features: [
        "Everything in AI Receptionist",
        "Multi-step qualification flows",
        "Review generation automation",
        "Lead reactivation campaigns",
        "Monthly optimization + reporting",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="glow-text">System</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent pricing. Setup + monthly management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card 
                className={`glass p-8 h-full flex flex-col relative overflow-hidden ${
                  pkg.popular 
                    ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)] scale-105' 
                    : 'border-primary/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className={`${pkg.popular ? 'pt-10' : 'pt-2'}`}>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-1">{pkg.price}</div>
                  <p className="text-sm text-primary/80 mb-1">{pkg.setup}</p>
                  <p className="text-xs text-muted-foreground mb-4">+ {pkg.monthly}</p>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleCheckout(pkg.key)}
                  disabled={loadingPackage !== null}
                  variant={pkg.popular ? "glow" : "outline"} 
                  size="lg" 
                  className="w-full"
                >
                  {loadingPackage === pkg.key ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Payment plans available • Cancel management anytime • You own everything
        </p>
      </div>
    </section>
  );
};

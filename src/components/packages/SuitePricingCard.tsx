import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Clock, Shield, Sparkles, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PRICE_ID = "price_1T0myvGuihElNnYIexKFSGEr";

const features = [
  "Custom AI-designed website (up to 5 pages)",
  "Mobile-responsive, speed-optimized",
  "Basic on-page SEO (meta tags, Google indexing, sitemap)",
  "Contact form + click-to-call setup",
  "1 round of revisions",
  "You own everything — no lock-in",
];

const differentiators = [
  { icon: Clock, text: "Delivered in 48 hours (not 4–6 weeks)" },
  { icon: Sparkles, text: "AI-powered design = agency quality at a fraction of the cost" },
  { icon: Zap, text: "Built to convert visitors into leads, not just \"look pretty\"" },
];

const addOns = [
  { name: "AI Chatbot Setup", price: "$297", type: "one-time" },
  { name: "SEO Growth Package", price: "$497/mo", type: "monthly" },
  { name: "Full Automation Stack", price: "$197/mo", type: "monthly" },
];

export const SuitePricingCard = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: PRICE_ID },
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
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            Investment
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Fast-Launch <span className="text-gradient-warm">Growth Site</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for service businesses that need results, not a six-month timeline.
          </p>
        </div>

        {/* Main offer card */}
        <div className="max-w-2xl mx-auto">
          <div className="premium-card p-10 md:p-12 relative overflow-hidden border-primary/10">
            {/* Delivery badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-xs font-medium tracking-wide rounded-bl-xl flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> 48-Hour Delivery
            </div>

            {/* Best fit */}
            <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-6">
              Best fit for service businesses doing $10k–$100k+/mo
            </p>

            {/* Price — premium, not aggressive */}
            <div className="mb-8">
              <div className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">$997</div>
              <p className="text-sm text-muted-foreground">One-time investment · No monthly fees · You own everything</p>
            </div>

            <div className="border-t border-[hsl(0_0%_100%/0.06)] pt-8 mb-8">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wide text-muted-foreground mb-4">What's Included</h3>
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[hsl(0_0%_100%/0.06)] pt-8 mb-8">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wide text-muted-foreground mb-4">What Makes This Different</h3>
              <ul className="space-y-3">
                {differentiators.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Get Your New Site in 48 Hours"
              )}
            </Button>
          </div>
        </div>

        {/* Optional Add-Ons */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wide text-center text-muted-foreground mb-8">
            Optional Add-Ons
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {addOns.map((addon, idx) => (
              <div key={idx} className="premium-card p-6 text-center">
                <h4 className="font-heading font-bold text-sm mb-2">{addon.name}</h4>
                <div className="text-xl font-heading font-bold text-primary">{addon.price}</div>
                <p className="text-[11px] text-muted-foreground mt-1">{addon.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

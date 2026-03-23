import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Zap, Clock, Shield, Sparkles } from "lucide-react";
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
            AI Website in <span className="glow-text">48 Hours</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            One clear offer. No decision fatigue. Get a conversion-ready website fast.
          </p>
        </motion.div>

        {/* Main offer card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glass p-10 relative overflow-hidden border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" /> 48-Hour Delivery
            </div>

            <div className="pt-8 text-center mb-8">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">$997</div>
              <p className="text-muted-foreground">One-time payment · No monthly fees · You own everything</p>
            </div>

            <h3 className="text-xl font-bold mb-4">What You Get:</h3>
            <ul className="space-y-3 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-4">What Makes This Different:</h3>
            <ul className="space-y-3 mb-8">
              {differentiators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item.text}</span>
                  </li>
                );
              })}
            </ul>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              variant="glow"
              size="lg"
              className="w-full text-lg"
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
          </Card>
        </motion.div>

        {/* Optional Add-Ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Optional <span className="glow-text">Add-Ons</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {addOns.map((addon, idx) => (
              <Card key={idx} className="glass p-6 border-primary/20 text-center">
                <h4 className="font-bold mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-primary">{addon.price}</div>
                <p className="text-xs text-muted-foreground mt-1">{addon.type}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-xl border border-primary/20 bg-card/30"
        >
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> 60-Day Risk-Free Guarantee
          </h3>
          <p className="text-muted-foreground">
            If your new AI website doesn't generate more leads within 60 days, I'll optimize it for free until it does — or refund your full investment. No hoops. You get results or you get your money back.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export const SuitePricingCard = () => {
  const features = [
    "Bespoke Website Design",
    "SEO & Performance Optimization",
    "Professional Copywriting (4 pages)",
    "Branding Package (logo refresh, colors, fonts)",
    "Technical Setup (SSL, hosting, analytics)",
    "1-on-1 Launch Strategy Session (60 min)",
    "3 Months Priority Support",
    "Training Video Library Access",
    "Mobile-First Responsive Design",
    "Core Web Vitals Optimization",
    "Google Analytics Integration",
    "Minor Updates During Support Period"
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
            Investment in Your <span className="glow-text">Business</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium website design with everything you need to succeed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glass p-10 border-primary/30 shadow-premium relative overflow-hidden">
            {/* Premium Badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Most Popular
            </div>

            <div className="text-center mb-8 pt-6">
              <h3 className="text-3xl font-bold mb-2">The Ultimate Business Website Suite</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-primary">$2,500</span>
                <span className="text-2xl text-muted-foreground">– $5,000</span>
              </div>
              <p className="text-muted-foreground">Based on complexity and add-ons</p>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button asChild variant="glow" size="lg" className="w-full">
              <Link to="/audit">Schedule Your Strategy Call</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Payment plans available • No long-term contracts
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

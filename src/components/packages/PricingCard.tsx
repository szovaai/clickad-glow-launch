import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Fully custom website design",
  "Responsive on all devices",
  "SEO & performance optimization",
  "Professional copywriting for main pages",
  "Branding package (logo, colors, fonts)",
  "SSL certificate & hosting setup",
  "Analytics integration",
  "Form & email configuration",
  "1-on-1 launch strategy session (60 min)",
  "3 months of priority support",
  "Training video library access",
  "Monthly check-in calls"
];

export function PricingCard() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Investment & <span className="text-primary glow-text">Timeline</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Premium quality at a fair price
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 md:p-10 bg-card border-2 border-primary/20 rounded-lg shadow-premium relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            {/* Most Popular Badge */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                MOST POPULAR
              </div>
            </div>
            
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2">The Ultimate Suite</h3>
              <p className="text-muted-foreground">Everything you need to succeed online</p>
            </div>
            
            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-bold text-primary glow-text">$2,500</span>
                <span className="text-2xl text-muted-foreground">– $5,000</span>
              </div>
              <p className="text-muted-foreground">Based on complexity and add-ons</p>
              <p className="text-sm text-primary mt-1">Payment plans available</p>
            </div>
            
            {/* Features list */}
            <div className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <Button size="lg" className="w-full text-lg glow-hover" asChild>
              <Link to="/audit">
                Schedule Your Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              Want a fixed quote? Share your goals and 2–3 competitor sites during your strategy call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

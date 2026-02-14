import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Lead Capture System",
    setupPrice: "$1,497",
    monthlyPrice: "$297/mo",
    description: "Start capturing every lead that contacts your business",
    features: [
      "AI-powered website or funnel",
      "Smart chat qualifier widget",
      "Missed-call text back",
      "Basic CRM + lead pipeline",
      "Contact form automations",
      "Mobile app notifications",
      "30-day onboarding support",
    ],
    popular: false,
  },
  {
    name: "AI Receptionist System",
    setupPrice: "$2,997",
    monthlyPrice: "$597/mo",
    description: "Full AI answering, qualifying, and booking on autopilot",
    features: [
      "Everything in Lead Capture",
      "AI voice receptionist (24/7)",
      "Custom call scripts + training",
      "Appointment booking automation",
      "Follow-up sequences (SMS + email)",
      "Google Review collection agent",
      "Post-job satisfaction checks",
      "Weekly optimization reports",
      "Calendar + CRM integrations",
    ],
    popular: true,
  },
  {
    name: "AI Sales Team + Optimization",
    setupPrice: "$5,000+",
    monthlyPrice: "$997/mo",
    description: "Enterprise-grade AI sales infrastructure with ongoing optimization",
    features: [
      "Everything in AI Receptionist",
      "Advanced lead qualification AI",
      "Lead reactivation campaigns",
      "Multi-location support",
      "Custom integrations (GHL, etc.)",
      "Dedicated account manager",
      "Monthly strategy sessions",
      "Priority support + SLA",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Choose Your AI Sales System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            One-time setup + monthly management. Cancel anytime. Performance guaranteed.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-8 relative h-full flex flex-col ${
                  pkg.popular 
                    ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)] bg-card/80' 
                    : 'border-primary/20 bg-card/50'
                } backdrop-blur-sm`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Most Popular
                  </div>
                )}
                
                <div className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-heading font-bold text-primary mb-1">{pkg.setupPrice}</div>
                    <div className="text-sm text-muted-foreground mb-3">setup + {pkg.monthlyPrice} management</div>
                    <p className="text-muted-foreground text-sm">{pkg.description}</p>
                  </div>
                  
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={pkg.popular ? "glow" : "outline"} 
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/audit">Book a Demo</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-xl border border-primary/20 bg-card/30"
        >
          <h3 className="text-xl font-bold mb-2">🛡️ Performance Guarantee</h3>
          <p className="text-muted-foreground">
            If your AI system doesn't book more appointments in the first 60 days, we'll optimize it for free until it does—or refund your setup fee. No risk.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

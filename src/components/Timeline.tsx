import { motion } from "framer-motion";
import { Wrench, Brain, Rocket } from "lucide-react";

const steps = [
  {
    icon: Wrench,
    step: "Step 1",
    title: "Install",
    description: "We set up your AI receptionist, chat qualifier, missed-call text back, and CRM pipeline. You provide your business info—we handle everything else.",
    timeline: "Done in 48 hours",
  },
  {
    icon: Brain,
    step: "Step 2",
    title: "Train",
    description: "We train your AI on your services, pricing, FAQs, and booking rules. It learns your voice, your processes, and your qualifying criteria.",
    timeline: "Days 3–5",
  },
  {
    icon: Rocket,
    step: "Step 3",
    title: "Optimize",
    description: "We monitor calls, chats, and conversions weekly. Scripts get refined, follow-ups get tuned, and your booking rate climbs month over month.",
    timeline: "Ongoing",
  },
];

export const Timeline = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Live in <span className="text-primary glow-text">5 Days</span>. Three Simple Steps.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            No tech skills needed. We build it, train it, and optimize it for you.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="text-center space-y-4 p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-primary font-bold text-sm uppercase tracking-wider">{step.step}</div>
                  <h3 className="text-2xl font-heading font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {step.timeline}
                  </div>
                </div>
                {/* Connector arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30 text-2xl z-10">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

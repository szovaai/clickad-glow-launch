import { motion } from "framer-motion";
import { PlugZap, Brain, TrendingUp } from "lucide-react";

export const suiteProcessSteps = [
  {
    icon: PlugZap,
    title: "Install",
    duration: "Day 1–3",
    description: "We connect your phone system, calendar, and CRM. Your AI receptionist and chat system go live.",
  },
  {
    icon: Brain,
    title: "Train",
    duration: "Day 4–7",
    description: "We program your business rules, FAQs, qualification flow, and custom call scripts so the AI sounds like your best employee.",
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    duration: "Ongoing",
    description: "We review call transcripts, tweak scripts, and improve your booking rate every month.",
  },
];

export const SuiteProcessTimeline = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="glow-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Live in 7 days. Optimized forever.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {suiteProcessSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {index !== suiteProcessSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10" />
                )}

                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="flex-1 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <span className="text-sm text-primary font-semibold">{step.duration}</span>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

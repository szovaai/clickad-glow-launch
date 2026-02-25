import { motion } from "framer-motion";
import { ClipboardCheck, Wrench, Rocket } from "lucide-react";

export const suiteProcessSteps = [
  {
    icon: ClipboardCheck,
    title: "Audit & Strategy",
    duration: "Day 1–2",
    description: "We analyze your business, current website, and lead flow. You get a clear roadmap for growth.",
  },
  {
    icon: Wrench,
    title: "Build & Optimize",
    duration: "Day 3–7",
    description: "We build your AI-powered website, implement SEO foundations, and set up your chatbot and lead capture system.",
  },
  {
    icon: Rocket,
    title: "Automate & Scale",
    duration: "Ongoing",
    description: "Your system captures and nurtures leads 24/7. We optimize monthly for better rankings and more conversions.",
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
            From audit to autopilot in 7 days.
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

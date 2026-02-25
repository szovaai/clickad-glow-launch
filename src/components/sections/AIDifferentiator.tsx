import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const traditional = [
  "Static pages that sit there",
  "No lead capture system",
  "Invisible on Google",
  "No follow-up automation",
  "You chase every lead manually",
];

const aiPowered = [
  "AI chatbot captures leads 24/7",
  "Instant response to every visitor",
  "SEO built into the foundation",
  "Automated follow-up sequences",
  "Appointments booked on autopilot",
];

export const AIDifferentiator = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Not Just Another <span className="glow-text">Website</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            More booked jobs. Faster response. Better conversion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8 h-full border-destructive/20">
              <h3 className="text-xl font-bold mb-6 text-destructive">Traditional Website</h3>
              <ul className="space-y-4">
                {traditional.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass p-8 h-full border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
              <h3 className="text-xl font-bold mb-6 text-primary">AI-Powered Website</h3>
              <ul className="space-y-4">
                {aiPowered.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

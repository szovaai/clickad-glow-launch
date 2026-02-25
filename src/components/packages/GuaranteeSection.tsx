import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const GuaranteeSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass p-10 md:p-12 border-primary/30 shadow-premium text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-6"
            >
              <ShieldCheck className="w-10 h-10 text-primary" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              60-Day <span className="glow-text">Performance Guarantee</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              If your new AI website doesn't generate more leads within 60 days of going live, 
              we'll keep optimizing for free until it does. No excuses.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm pt-6 border-t border-border/50">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">You approve before launch</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">60-day results window</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Free optimization if needed</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const painPoints = [
  "Your website loads slowly and loses potential customers",
  "No leads coming through despite having a website",
  "Outdated design that doesn't reflect your brand quality",
  "Poor mobile experience driving users away",
  "Low search engine rankings keeping you invisible",
  "No clear call-to-action leaving visitors confused"
];

export function PainPointsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Website Should Be Your <span className="text-primary glow-text">Best Salesperson</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            But if you're experiencing any of these issues, it's actually costing you business
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-card rounded-lg border hover:border-destructive/40 transition-colors"
            >
              <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-1" />
              <p className="text-lg">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

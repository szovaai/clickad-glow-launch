import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const guarantees = [
  "100% satisfaction or we'll make it right",
  "Unlimited revisions during design phase",
  "No hidden fees or surprise charges",
  "You own everything - code, design, content"
];

export function GuaranteeSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary glow-text">Guarantee</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your investment is protected. If you're not completely satisfied within 30 days, 
            we'll make it right—or refund your deposit. No questions asked.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-card rounded-lg border"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-left">{guarantee}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

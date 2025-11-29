import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Paintbrush, Check } from "lucide-react";

export const CoreOfferSection = () => {
  const features = [
    "Fully responsive design across all devices",
    "Brand-aligned colors, fonts, and visual elements",
    "Conversion-optimized layouts and user flows",
    "Modern, clean aesthetic that stands out",
    "Mobile-first approach for maximum reach"
  ];

  return (
    <section id="included" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What's Included in Your <span className="glow-text">Suite</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive website solution designed to elevate your business
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass p-8 md:p-12 max-w-4xl mx-auto border-primary/30 shadow-premium">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Paintbrush className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Bespoke Website Design</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  A fully custom, modern design aligned with ClickAdMedia's professional aesthetic. 
                  Every element is crafted to reflect your unique brand identity and business goals.
                </p>
                
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Video, HeadphonesIcon } from "lucide-react";

export const PremiumSupportSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-text">White Glove</span> Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're with you every step of the way—and beyond
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass p-8 h-full border-primary/30 shadow-premium">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                <Video className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">1-on-1 Launch Strategy Session</h3>
              <p className="text-lg text-primary font-semibold mb-4">60-Minute Call</p>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Complete walkthrough of your new site</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Lead generation strategy tailored to your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Growth planning and optimization tips</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Q&A to ensure you're confident</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass p-8 h-full border-primary/30 shadow-premium">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">3 Months Post-Launch Support</h3>
              <p className="text-lg text-primary font-semibold mb-4">Ongoing Partnership</p>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Priority support queue for fast responses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Minor updates and tweaks included</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Access to training video library</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Performance monitoring and recommendations</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

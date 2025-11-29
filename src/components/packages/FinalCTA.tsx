import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const trustBadges = [
  "7-Day Guarantee",
  "No Long-Term Contracts",
  "You Own Everything"
];

export function FinalCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Invest in a Website <span className="text-primary glow-text">That Works?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book your free strategy call and let's discuss how we can transform your online presence 
            into a powerful business growth tool.
          </p>
          
          <Button size="lg" className="text-lg px-10 py-6 glow-hover mb-8" asChild>
            <Link to="/audit">
              Book Your Free Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

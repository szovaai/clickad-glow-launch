import { motion } from "framer-motion";
import { PhoneOff, Clock, UserX, DollarSign } from "lucide-react";

const painPoints = [
  {
    icon: PhoneOff,
    title: "Missed calls go to competitors",
    description: "Every unanswered call is a booked job for someone else.",
  },
  {
    icon: Clock,
    title: "Slow replies kill conversions",
    description: "If you don't respond in 5 minutes, your odds of winning the lead drop 80%.",
  },
  {
    icon: UserX,
    title: "Leads don't follow up themselves",
    description: "Without automated follow-up, 50%+ of warm leads go cold.",
  },
  {
    icon: DollarSign,
    title: "Admin time gets expensive",
    description: "Hiring a receptionist costs $3,500+/mo. AI costs a fraction.",
  },
];

export const PainSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Most Leads Are Lost in the{" "}
            <span className="glow-text">First 5 Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your competitors are answering faster. Here's what's costing you jobs right now.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

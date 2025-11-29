import { motion } from "framer-motion";
import { Video, HeadphonesIcon } from "lucide-react";

const supportItems = [
  {
    icon: Video,
    title: "1-on-1 Launch Strategy Session",
    duration: "60 Minutes",
    features: [
      "Walk through your new website",
      "Lead generation strategy discussion",
      "Growth planning and recommendations",
      "Q&A with your dedicated specialist"
    ]
  },
  {
    icon: HeadphonesIcon,
    title: "3 Months Post-Launch Support",
    duration: "Ongoing",
    features: [
      "Priority support queue access",
      "Minor updates and tweaks included",
      "Training video library access",
      "Monthly check-in calls"
    ]
  }
];

export function PremiumSupportSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary glow-text">Premium Support</span> Included
          </h2>
          <p className="text-xl text-muted-foreground">
            We're with you every step of the way
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {supportItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 bg-card border border-primary/20 rounded-lg shadow-premium relative overflow-hidden group hover:border-primary/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <span className="text-sm text-primary font-semibold">{item.duration}</span>
              </div>
              
              <ul className="space-y-3 mt-6">
                {item.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

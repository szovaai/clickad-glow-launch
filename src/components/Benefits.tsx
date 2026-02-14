import { Phone, MessageSquare, CalendarCheck, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const coreOffer = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Answers every call in under 2 rings. Qualifies the lead, captures details, and books or transfers—no hold music, no voicemail.",
  },
  {
    icon: MessageSquare,
    title: "Smart Chat Qualifier",
    description: "Engages website visitors instantly. Asks the right questions, captures contact info, and routes hot leads straight to your calendar.",
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up Automation",
    description: "Missed-call text back, post-job satisfaction checks, review requests, and lead reactivation—all running on autopilot 24/7.",
  },
  {
    icon: BarChart3,
    title: "CRM + Pipeline",
    description: "Every lead, call, and appointment tracked in one dashboard. See exactly where revenue is coming from and what's converting.",
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Your AI Sales Team—
            <span className="text-primary glow-text">Always On</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Four systems working together to capture, qualify, and convert every lead that touches your business.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {coreOffer.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group h-full"
              >
                <div className="mb-5 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, MailCheck, Database } from "lucide-react";

const offers = [
  {
    icon: Phone,
    title: "AI Receptionist (Voice)",
    features: [
      "Answers calls instantly, 24/7",
      "Qualifies leads with your questions",
      "Books appointments into your calendar",
      "Transfers hot leads to you live",
    ],
  },
  {
    icon: MessageSquare,
    title: "Smart Website Chat Qualifier",
    features: [
      "Captures lead details automatically",
      "Filters out tire-kickers",
      "Books qualified leads into calendar",
      "Works on any website or landing page",
    ],
  },
  {
    icon: MailCheck,
    title: "Follow-Up Automation",
    features: [
      "Missed-call text back (instant)",
      "SMS + email nurture sequences",
      "Appointment reminders",
      "No-show reduction workflows",
    ],
  },
  {
    icon: Database,
    title: "CRM + Pipeline",
    features: [
      "Every lead stored and organized",
      "Tags, notes, and status tracking",
      "Full conversation history",
      "Reporting and analytics",
    ],
  },
];

export const CoreOfferSection = () => {
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
            Your Complete <span className="glow-text">AI Sales Infrastructure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything your business needs to capture, qualify, and book leads automatically
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="glass p-8 h-full border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
                  
                  <ul className="space-y-3">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

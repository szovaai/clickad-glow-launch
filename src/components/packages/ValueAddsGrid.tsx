import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap, FileText, Calendar, RefreshCw } from "lucide-react";

export const ValueAddsGrid = () => {
  const valueAdds = [
    {
      icon: Zap,
      title: "Speed-to-Lead Metrics",
      features: [
        "Average response time under 60 seconds",
        "Real-time lead notification dashboard",
        "Competitor response benchmarking",
        "Monthly performance reports",
      ],
    },
    {
      icon: FileText,
      title: "Custom Call Scripts",
      features: [
        "Industry-specific qualification questions",
        "Objection handling workflows",
        "After-hours messaging customization",
        "Multi-language support available",
      ],
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      features: [
        "Google Calendar + Outlook sync",
        "Automatic appointment scheduling",
        "Buffer time between bookings",
        "Team calendar management",
      ],
    },
    {
      icon: RefreshCw,
      title: "Lead Reactivation",
      features: [
        "Re-engage cold leads automatically",
        "Win-back SMS + email campaigns",
        "Seasonal promotion blasts",
        "Past-customer follow-up sequences",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium <span className="glow-text">Add-Ons</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tools that make your AI sales system even more powerful
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {valueAdds.map((item, index) => {
            const Icon = item.icon;
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
                  
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  
                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
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

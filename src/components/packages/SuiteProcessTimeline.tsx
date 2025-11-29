import { motion } from "framer-motion";
import { Phone, Lightbulb, Code, Rocket, HeadphonesIcon } from "lucide-react";

// Export steps data for schema generation
export const suiteProcessSteps = [
  {
    icon: Phone,
    title: "Discovery Call",
    duration: "30 Minutes",
    description: "We learn about your business, goals, and ideal customers to create a tailored strategy."
  },
    {
      icon: Lightbulb,
      title: "Strategy & Design",
      duration: "Week 1",
      description: "Custom mockups and brand alignment. We create a design that perfectly reflects your vision."
    },
    {
      icon: Code,
      title: "Development",
      duration: "Weeks 2-3",
      description: "Building, testing, and refining your site. Every detail is crafted for performance and conversions."
    },
    {
      icon: Rocket,
      title: "Launch & Training",
      duration: "Week 4",
      description: "Your site goes live with confidence. We provide training and a launch strategy session."
    },
    {
      icon: HeadphonesIcon,
      title: "Ongoing Support",
      duration: "3 Months",
      description: "We're here when you need us with priority support and minor updates included."
    }
];

export const SuiteProcessTimeline = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="glow-text">Journey</span> to Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven process from discovery to launch and beyond
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {suiteProcessSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline Line */}
                {index !== suiteProcessSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10" />
                )}

                {/* Icon */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <span className="text-sm text-primary font-semibold">{step.duration}</span>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

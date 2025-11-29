import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery Call",
    duration: "30 minutes",
    description: "We learn about your business, goals, and target audience to create a tailored strategy"
  },
  {
    title: "Strategy & Design",
    duration: "Week 1",
    description: "Custom mockups, brand alignment, and design approval with unlimited revisions"
  },
  {
    title: "Development",
    duration: "Weeks 2-3",
    description: "Build, test, and refine your website with modern technologies and best practices"
  },
  {
    title: "Launch & Training",
    duration: "Week 4",
    description: "Go live with confidence and receive comprehensive training on managing your site"
  },
  {
    title: "Ongoing Support",
    duration: "3 months",
    description: "Priority support, minor updates, and monthly check-ins to ensure your success"
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary glow-text">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Fast, collaborative, and transparent
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-6 p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow relative overflow-hidden group"
            >
              {/* Number badge */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl shrink-0 relative z-10">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  {step.duration && (
                    <span className="text-sm text-muted-foreground">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {/* Connecting line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[38px] top-[72px] w-0.5 h-6 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

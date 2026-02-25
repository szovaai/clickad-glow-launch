import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Globe, Search, Bot, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const offers = [
  {
    icon: Globe,
    title: "AI Website Build",
    description: "Conversion-optimized websites with built-in lead capture",
    features: [
      "Conversion-optimized design",
      "AI chatbot integration",
      "Lead capture automation",
      "Mobile-first responsive",
      "Speed optimized",
    ],
  },
  {
    icon: Search,
    title: "SEO Growth Engine",
    description: "Get found on Google and dominate local search",
    features: [
      "On-page SEO foundations",
      "Google Business optimization",
      "Local ranking strategy",
      "Keyword targeting",
      "Authority building",
    ],
  },
  {
    icon: Bot,
    title: "AI Lead Automation",
    description: "Capture, qualify, and follow up with leads automatically",
    features: [
      "AI chatbot setup",
      "SMS follow-up sequences",
      "Email automation",
      "Missed-call text back",
      "Appointment booking system",
    ],
  },
  {
    icon: Megaphone,
    title: "Paid Ads",
    description: "Accelerate growth with targeted advertising",
    features: [
      "Google Ads management",
      "Retargeting campaigns",
      "AI-optimized landing pages",
      "Conversion tracking",
      "Monthly performance reports",
    ],
    optional: true,
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
            Your Complete <span className="glow-text">Growth System</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Website + SEO + AI automation — everything your business needs to generate leads on autopilot
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {offer.optional && (
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Optional Add-On</span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4">{offer.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

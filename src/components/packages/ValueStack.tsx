import { motion } from "framer-motion";
import { 
  Paintbrush, 
  Zap, 
  FileText, 
  Palette,
  Shield,
  Smartphone
} from "lucide-react";

const coreOffer = {
  icon: Paintbrush,
  title: "Bespoke Website Design",
  description: "Fully custom, modern design aligned with ClickAdMedia's aesthetic",
  features: [
    "Responsive design for all devices",
    "Brand-aligned colors and typography",
    "Conversion-optimized layouts",
    "Modern UI/UX best practices"
  ]
};

const valueAdds = [
  {
    icon: Zap,
    title: "SEO & Performance Optimization",
    features: [
      "On-page SEO setup",
      "Core Web Vitals optimization",
      "Fast loading speeds",
      "Mobile-first indexing ready"
    ]
  },
  {
    icon: FileText,
    title: "Copywriting & Content Bundle",
    features: [
      "Professional copy for all main pages",
      "Conversion-focused headlines",
      "Clear calls-to-action",
      "Brand voice alignment"
    ]
  },
  {
    icon: Palette,
    title: "Branding Package",
    features: [
      "Logo refresh or light redesign",
      "Color palette selection",
      "Typography system",
      "Brand guidelines document"
    ]
  },
  {
    icon: Shield,
    title: "Technical Setup",
    features: [
      "SSL certificate included",
      "Hosting configuration",
      "Analytics integration",
      "Form & email setup"
    ]
  }
];

export function ValueStack() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What's Included in <span className="text-primary glow-text">Your Suite</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for a high-converting online presence
          </p>
        </motion.div>
        
        {/* Core Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 bg-card border border-primary/20 rounded-lg shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <coreOffer.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{coreOffer.title}</h3>
              <p className="text-muted-foreground mb-4">{coreOffer.description}</p>
              <ul className="grid md:grid-cols-2 gap-3">
                {coreOffer.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Value Adds Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {valueAdds.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <ul className="space-y-2">
                {item.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                    <span>{feature}</span>
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

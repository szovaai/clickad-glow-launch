import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Search, FileText, Palette, Settings } from "lucide-react";

export const ValueAddsGrid = () => {
  const valueAdds = [
    {
      icon: Search,
      title: "SEO & Performance Optimization",
      features: [
        "On-page SEO setup for better rankings",
        "Core Web Vitals optimization",
        "Fast loading speeds (under 2 seconds)",
        "Mobile-optimized for all devices"
      ]
    },
    {
      icon: FileText,
      title: "Copywriting & Content Bundle",
      features: [
        "Professional copy for Home, About, Services, Contact",
        "Conversion-focused headlines",
        "Clear, compelling calls-to-action",
        "SEO-optimized content structure"
      ]
    },
    {
      icon: Palette,
      title: "Branding Package",
      features: [
        "Logo refresh or light redesign",
        "Custom color palette selection",
        "Typography system setup",
        "Brand guidelines document"
      ]
    },
    {
      icon: Settings,
      title: "Technical Setup",
      features: [
        "SSL certificate installation",
        "Hosting configuration",
        "Google Analytics integration",
        "Performance monitoring setup"
      ]
    }
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
            Premium <span className="glow-text">Value Adds</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for a successful online presence
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

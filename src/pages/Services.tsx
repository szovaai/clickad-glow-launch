import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Globe, Search, Bot, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    title: "AI Website Build",
    description: "We don't build brochure websites. We build conversion machines with AI chatbots baked in — so every visitor gets engaged, qualified, and moved toward booking.",
    features: [
      "Conversion-optimized design tailored to your industry",
      "AI chatbot integration for 24/7 lead capture",
      "Lead capture forms with smart qualification",
      "Mobile-first responsive design",
      "Speed optimized (sub-3s load times)",
      "Google Analytics + conversion tracking",
    ],
  },
  {
    icon: Search,
    title: "SEO Growth Engine",
    description: "Get found on Google when customers search for your services. We build SEO into the DNA of your site and optimize continuously so you rank higher every month.",
    features: [
      "On-page SEO foundations (meta, schema, structure)",
      "Google Business Profile optimization",
      "Local ranking strategy for your service area",
      "Keyword research + content targeting",
      "Authority building through backlinks",
      "Monthly ranking reports + adjustments",
    ],
  },
  {
    icon: Bot,
    title: "AI Lead Automation",
    description: "Your AI chatbot captures leads. Missed-call text back responds instantly. Follow-up sequences nurture automatically. Appointments book themselves.",
    features: [
      "AI chatbot setup + training on your business",
      "SMS follow-up sequences",
      "Email automation workflows",
      "Missed-call text back (instant)",
      "Appointment booking + calendar sync",
      "Lead qualification + scoring",
    ],
  },
  {
    icon: Megaphone,
    title: "Paid Ads",
    description: "Accelerate your growth with Google Ads and retargeting. We build AI-optimized landing pages that convert paid traffic into booked jobs.",
    features: [
      "Google Ads campaign setup + management",
      "Retargeting campaigns across platforms",
      "AI-optimized landing pages",
      "Conversion tracking + attribution",
      "Monthly performance reports",
      "Budget optimization for maximum ROI",
    ],
    optional: true,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="AI Website & Growth Services | ClickAd Media"
        description="AI-powered websites, SEO growth engines, lead automation, and paid ads for service businesses. Get a complete growth system that generates leads on autopilot."
        canonical="https://www.clickadmedia.com/services"
        keywords="AI website, SEO services, lead automation, chatbot, Calgary web design, growth system"
      />
      <Navigation />
      <main>
        <section className="pt-32 pb-20 md:pb-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Our <span className="glow-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything your service business needs to generate leads and book jobs on autopilot.
              </p>
            </motion.div>

            <div className="space-y-16 max-w-5xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="glass p-8 md:p-12 border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{service.title}</h2>
                          {service.optional && (
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">Optional Add-On</span>
                          )}
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                        {service.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-20"
            >
              <Button variant="glow" size="lg" asChild>
                <Link to="/audit">
                  Book a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Search, CalendarCheck, Sparkles } from "lucide-react";
import { HeroLeadForm } from "@/components/HeroLeadForm";

export const SuiteHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 md:pt-8">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <Badge className="px-4 py-2 text-sm bg-primary/10 border-primary/30 text-primary backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Growth Systems • Calgary
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 mt-0"
            >
              Your Website Should Work Like a
              <br />
              <span className="glow-text">Sales Rep</span>
              <br />
              — Not a Brochure.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl leading-relaxed"
            >
              AI-powered websites, smart chatbots, and SEO systems that bring you consistent leads — automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button asChild variant="glow" size="lg">
                <a href="/audit">Book Strategy Call</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#included">Get Free AI Website Audit</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center text-sm"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">AI Chatbot Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">SEO Built-In</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Books Appointments 24/7</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <HeroLeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

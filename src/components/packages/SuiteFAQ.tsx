import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const suiteFAQs = [
  {
    question: "What's included in an AI website?",
    answer: "Every AI website includes a conversion-optimized design, built-in AI chatbot for 24/7 lead capture, automated follow-up sequences, appointment booking, mobile-first responsive design, speed optimization, and on-page SEO foundations. It's a complete lead generation system, not just a pretty page."
  },
  {
    question: "How does SEO work with my new site?",
    answer: "We build SEO into the foundation of your website — proper site structure, meta tags, schema markup, speed optimization, and keyword-targeted content. For Growth Engine and Domination packages, we also handle Google Business optimization, local ranking strategy, authority building, and ongoing keyword targeting."
  },
  {
    question: "How long does it take to see results?",
    answer: "Your website and chatbot go live within 7 days and start capturing leads immediately. SEO results typically start showing within 60–90 days as Google indexes and ranks your new site. Paid ads (Domination Package) can generate leads within the first week of launch."
  },
  {
    question: "Do you work with businesses outside Calgary?",
    answer: "Yes. While we're based in Calgary, our AI website and growth systems work for service businesses anywhere in North America. We've helped electricians, contractors, clinics, and home service companies across Canada and the US."
  },
  {
    question: "What if I already have a website?",
    answer: "We'll audit your current site and determine the best path forward. Sometimes we can upgrade your existing site with our AI chatbot and SEO systems. Other times, a fresh build delivers better results. Either way, we'll give you an honest recommendation."
  },
  {
    question: "Is there a contract?",
    answer: "Setup is a one-time fee. Monthly management is month-to-month — cancel anytime. We keep clients because we deliver results, not because of contracts. You own your website, content, and data."
  },
  {
    question: "What industries does this work best for?",
    answer: "Our systems work best for service businesses that book appointments and rely on local leads: electricians, HVAC, plumbing, roofing, renovation contractors, dental offices, med spas, clinics, and home service companies. If you get inbound calls and need to book jobs, this is built for you."
  },
];

export const SuiteFAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="glow-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about our AI website and growth systems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {suiteFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass border border-primary/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

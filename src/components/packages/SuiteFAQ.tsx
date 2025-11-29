import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SuiteFAQ = () => {
  const faqs = [
    {
      question: "What's the typical timeline from start to launch?",
      answer: "Most projects are completed within 4 weeks. This includes discovery (30 minutes), strategy & design (Week 1), development (Weeks 2-3), and launch & training (Week 4). Complex projects may take longer, which we'll discuss during the discovery call."
    },
    {
      question: "Can I see examples of your work?",
      answer: "Absolutely! We have a portfolio showcasing our work for Calgary businesses across various industries including electricians, renovation contractors, and industrial companies. You can view our work in the portfolio section or request specific examples during your strategy call."
    },
    {
      question: "What if I need more pages than what's included?",
      answer: "The base package includes 4 professionally written pages (Home, About, Services, Contact). Additional pages can be added for a fee, which we'll discuss during your discovery call based on your specific needs."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes! We understand that quality websites are an investment. We offer flexible payment plans to make the Ultimate Business Website Suite accessible. Discuss payment options during your strategy call to find what works best for your business."
    },
    {
      question: "What happens after the 3-month support period?",
      answer: "After your 3-month priority support period, you can choose to continue with a monthly maintenance plan for ongoing updates, support, and optimization. Alternatively, you'll have full ownership of your site and can manage it yourself or hire another provider."
    },
    {
      question: "Will I be able to update the website myself?",
      answer: "Yes! Your website will be built on a user-friendly platform. During your launch strategy session, we'll train you on how to make basic updates. Plus, you'll have access to our training video library covering common tasks."
    },
    {
      question: "What makes this package different from template websites?",
      answer: "Unlike template websites, every aspect of your site is custom-designed to reflect your unique brand and business goals. You get professional copywriting, a branding package, strategic design, and 3 months of hands-on support—not just a one-size-fits-all template."
    }
  ];

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
            Everything you need to know about the Ultimate Business Website Suite
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
            {faqs.map((faq, index) => (
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

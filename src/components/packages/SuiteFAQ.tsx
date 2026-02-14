import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const suiteFAQs = [
  {
    question: "How does the AI receptionist work?",
    answer: "Our AI receptionist answers calls using a natural-sounding voice trained on your business rules, FAQs, and services. It qualifies leads by asking your custom questions, books appointments directly into your calendar, and can even transfer hot leads to you live. It works 24/7—nights, weekends, and holidays."
  },
  {
    question: "Does it sound human?",
    answer: "Yes. Modern voice AI is virtually indistinguishable from a human receptionist. We customize the voice, tone, and conversation style to match your brand. Most callers won't realize they're speaking with AI."
  },
  {
    question: "What happens if AI can't answer a question?",
    answer: "If the AI encounters a question outside its training, it gracefully handles it by taking a message, offering to have someone call back, or transferring the call to you or your team directly. No lead is ever lost."
  },
  {
    question: "Can it transfer calls to me?",
    answer: "Absolutely. You can set rules for when calls should be transferred—for example, high-value leads, urgent requests, or specific topics. The AI qualifies first, then transfers with context so you're never going in blind."
  },
  {
    question: "Can it collect deposits or payments?",
    answer: "Yes. We can integrate payment collection into the booking flow so customers can pay deposits or full amounts when scheduling. This works via secure payment links sent by SMS after the call."
  },
  {
    question: "What CRM do you use?",
    answer: "We work with GoHighLevel, HubSpot, or can set up a lightweight custom CRM depending on your needs. Every lead, call transcript, and booking is stored and organized automatically."
  },
  {
    question: "How long does setup take?",
    answer: "Most systems are live within 7 days. Day 1-3: We connect your phone, calendar, and CRM. Day 4-7: We train the AI on your business rules, scripts, and qualification flow. Then we go live and start optimizing."
  },
  {
    question: "What industries does this work best for?",
    answer: "This works exceptionally well for contractors (HVAC, plumbing, electrical, roofing), home services, clinics, med spas, dental offices, and any service business that books appointments and gets inbound calls."
  },
  {
    question: "Can you use my existing phone number and website?",
    answer: "Yes. We can port your existing number or set up call forwarding so nothing changes for your customers. For your website, we add the chat widget and booking system without rebuilding anything."
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
            Everything you need to know about your AI Sales System
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

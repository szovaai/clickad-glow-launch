import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's the typical timeline for completion?",
    answer: "Most projects are completed within 4 weeks from the initial discovery call to launch. This includes design, development, content creation, and training. Rush timelines are available for an additional fee."
  },
  {
    question: "Can I see examples of your work?",
    answer: "Absolutely! During your strategy call, we'll show you relevant portfolio examples from our work with Calgary businesses. We can also provide case studies that match your industry and goals."
  },
  {
    question: "What if I need more pages than what's included?",
    answer: "No problem! Additional pages can be added for $250-500 each, depending on complexity. We'll discuss your full site structure during the discovery call and provide a detailed quote."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible payment plans. Typically, we require 50% upfront and 50% upon launch, but we can create a custom payment schedule that works for your budget."
  },
  {
    question: "What happens after the 3-month support period?",
    answer: "After your initial 3 months, you can choose to continue with our maintenance plan ($297/month) for ongoing support, updates, and optimizations, or manage the site yourself using the training we've provided."
  },
  {
    question: "Will I be able to update the website myself?",
    answer: "Yes! We'll provide comprehensive training and access to a user-friendly content management system. You'll also receive video tutorials and documentation for common updates."
  },
  {
    question: "What if I already have a website?",
    answer: "Perfect! We can redesign and rebuild your existing site, migrating all your content while modernizing the design and improving performance. We'll ensure no SEO value is lost during the transition."
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "Yes, hosting setup is included in the package. We'll help you choose the right hosting provider and handle all the technical configuration. Domain registration is separate but we can assist with that as well."
  }
];

export function PackageFAQ() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary glow-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about The Ultimate Suite
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

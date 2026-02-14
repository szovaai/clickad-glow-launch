import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI receptionist actually work?",
    answer: "When a customer calls your business number, the AI answers within 2 rings. It greets them naturally, asks qualifying questions (service needed, timeline, budget range), captures their contact info, and either books an appointment directly or transfers to your team. It sounds natural—not robotic—and is trained on your specific services and processes.",
  },
  {
    question: "What happens to calls after hours?",
    answer: "That's exactly where AI shines. Your AI receptionist works 24/7/365—nights, weekends, holidays. Every after-hours caller gets a professional greeting, has their inquiry captured, and either gets booked instantly or receives a follow-up text confirming you'll call back. No more lost leads to voicemail.",
  },
  {
    question: "Will the AI sound like a robot?",
    answer: "No. Modern AI voice is remarkably natural. We customize the tone, vocabulary, and pace to match your brand. Most callers won't realize they're speaking with AI—and the ones who do are usually impressed by how fast and helpful it is.",
  },
  {
    question: "How long does setup take?",
    answer: "Your system is fully operational within 5 business days. Day 1–2 is infrastructure setup. Day 3–5 is training the AI on your services, FAQs, and booking rules. After that, we optimize continuously based on real call data.",
  },
  {
    question: "What if I already use a CRM or booking system?",
    answer: "We integrate with most major platforms—GoHighLevel, Jobber, ServiceTitan, Housecall Pro, Google Calendar, and more. If you have something custom, we'll build the integration. The goal is to plug into your existing workflow, not replace it.",
  },
  {
    question: "Is there a contract or can I cancel?",
    answer: "No long-term contracts. The setup fee is one-time, and management is month-to-month. Cancel anytime with 30 days notice. Plus, our 60-day performance guarantee means if it's not booking more jobs, we optimize for free or refund your setup fee.",
  },
  {
    question: "How is this different from hiring a receptionist?",
    answer: "A human receptionist costs $3,500–$5,000/mo, works limited hours, takes breaks, and calls in sick. AI costs a fraction, works 24/7, handles unlimited simultaneous calls, never forgets to follow up, and improves over time. It's not a replacement for your team—it's an always-on first responder that frees your team to close deals.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Questions? We've Got Answers.
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-primary/20 rounded-lg px-6 bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

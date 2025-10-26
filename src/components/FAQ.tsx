import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to run ads to get results?",
    answer: "No. We build sites that convert whatever traffic you're already getting—whether that's from Google searches, referrals, or your truck driving around town. That said, a good site makes ads way more profitable if you choose to run them later.",
  },
  {
    question: "What if I already have a domain?",
    answer: "Perfect! We'll use your existing domain and preserve any SEO equity you've already built. If you don't have one, we'll help you secure the right domain as part of the process.",
  },
  {
    question: "What tools and platforms do you use?",
    answer: "We use best-in-class tools including modern web frameworks, enterprise CMS systems, and professional hosting. Everything is built for speed, security, and scalability. You'll own all your assets and data.",
  },
  {
    question: "Can you integrate with my current booking system?",
    answer: "Absolutely. We integrate with most major booking and CRM platforms. If you have something custom, we'll build the integration during your project. Our goal is to make your workflow smoother, not add extra steps.",
  },
  {
    question: "What happens after the 7 days?",
    answer: "Your site goes live and starts working for you. We provide 30 days of included support to handle any tweaks or questions. After that, you can choose ongoing support packages or manage it yourself—it's totally up to you.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 md:py-32">
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

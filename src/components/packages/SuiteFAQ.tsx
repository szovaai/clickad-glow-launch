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
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            Common questions
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-gradient-warm">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {suiteFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-[hsl(0_0%_100%/0.06)] bg-secondary/30 px-6 py-1 data-[state=open]:bg-card transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-sm font-heading font-semibold hover:text-foreground transition-colors py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
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

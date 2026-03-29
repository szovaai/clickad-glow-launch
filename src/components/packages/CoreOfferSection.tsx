import { Globe, Search, Bot, Megaphone } from "lucide-react";

const offers = [
  {
    icon: Globe,
    category: "Strategy",
    title: "AI Website Build",
    description: "Conversion-optimized websites with built-in lead capture",
    outcomes: [
      "Conversion-optimized design",
      "AI chatbot integration",
      "Lead capture automation",
      "Mobile-first responsive",
      "Speed optimized",
    ],
    featured: true,
  },
  {
    icon: Search,
    category: "Visibility",
    title: "SEO Growth Engine",
    description: "Get found on Google and dominate local search",
    outcomes: [
      "On-page SEO foundations",
      "Google Business optimization",
      "Local ranking strategy",
      "Keyword targeting",
      "Authority building",
    ],
  },
  {
    icon: Bot,
    category: "Conversion",
    title: "AI Lead Automation",
    description: "Capture, qualify, and follow up with leads automatically",
    outcomes: [
      "AI chatbot setup",
      "SMS follow-up sequences",
      "Missed-call text back",
      "Appointment booking system",
    ],
  },
  {
    icon: Megaphone,
    category: "Scale",
    title: "Paid Ads",
    description: "Accelerate growth with targeted advertising",
    outcomes: [
      "Google Ads management",
      "Retargeting campaigns",
      "Conversion tracking",
      "Monthly performance reports",
    ],
    optional: true,
  },
];

export const CoreOfferSection = () => {
  return (
    <section id="included" className="section-padding relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            What's included
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Your Complete <span className="text-gradient-warm">Growth System</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Website + SEO + AI automation — everything your business needs to generate leads on autopilot.
          </p>
        </div>

        {/* 1 featured + 3 secondary grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            const isFeatured = offer.featured;
            return (
              <div
                key={index}
                className={`premium-card p-8 ${isFeatured ? 'md:row-span-2 border-primary/10' : ''}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--cobalt-soft))] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
                      {offer.category}
                    </span>
                    {offer.optional && (
                      <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        Add-On
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold mb-2">{offer.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{offer.description}</p>

                <ul className="space-y-2.5">
                  {offer.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

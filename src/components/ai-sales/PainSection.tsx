import { Globe, SearchX, UserX, DollarSign } from "lucide-react";

const painPoints = [
  {
    icon: Globe,
    label: "No Lead Generation",
    title: "Your website doesn't generate leads",
    description: "It looks fine, but visitors leave without ever contacting you. A beautiful site without conversion intent is an expensive placeholder.",
  },
  {
    icon: SearchX,
    label: "Invisible Online",
    title: "Invisible on Google",
    description: "Your competitors rank above you while you wait for referrals. Without SEO foundations, you're paying for invisibility.",
  },
  {
    icon: UserX,
    label: "No Instant Response",
    title: "Leads leave without contacting you",
    description: "No chatbot, no instant response — they bounce to the next option. Speed to lead is the #1 factor in conversion.",
  },
  {
    icon: DollarSign,
    label: "Wasted Ad Spend",
    title: "Paying for ads that don't convert",
    description: "Traffic without a conversion system is just wasted budget. Every click costs money with no return.",
  },
];

export const PainSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            The hidden cost
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 max-w-3xl mx-auto">
            Most Websites Look Fine.{" "}
            <span className="text-muted-foreground">They Just Don't Perform.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="premium-card p-6 group"
              >
                <div className="border-b border-[hsl(0_0%_100%/0.06)] pb-4 mb-4">
                  <Icon className="w-5 h-5 text-muted-foreground mb-3" />
                  <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    {point.label}
                  </span>
                </div>
                <h3 className="text-base font-heading font-bold mb-2 leading-snug">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

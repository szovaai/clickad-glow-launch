import { X, Check } from "lucide-react";

const traditional = [
  { point: "Static pages that sit there", detail: "No engagement, no conversion strategy" },
  { point: "No lead capture system", detail: "Visitors leave without a trace" },
  { point: "Invisible on Google", detail: "Zero organic traffic or local ranking" },
  { point: "No follow-up automation", detail: "Leads go cold within hours" },
  { point: "You chase every lead manually", detail: "Time-consuming and inconsistent" },
];

const aiPowered = [
  { point: "AI chatbot captures leads 24/7", detail: "Instant engagement with every visitor" },
  { point: "Instant response to every visitor", detail: "Speed-to-lead under 30 seconds" },
  { point: "SEO built into the foundation", detail: "Organic traffic from day one" },
  { point: "Automated follow-up sequences", detail: "No lead left behind" },
  { point: "Appointments booked on autopilot", detail: "Calendar fills while you work" },
];

export const AIDifferentiator = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            The difference
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Not Just Another <span className="text-gradient-warm">Website</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More booked jobs. Faster response. Better conversion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Traditional — dark matte panel */}
          <div className="rounded-[var(--radius)] bg-secondary/60 border border-[hsl(0_0%_100%/0.04)] p-8 md:p-10">
            <h3 className="text-lg font-heading font-bold mb-8 text-muted-foreground">Traditional Website</h3>
            <ul className="space-y-5">
              {traditional.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-muted-foreground text-sm">{item.point}</span>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* AI-Powered — elevated cobalt-tinted panel */}
          <div className="premium-card p-8 md:p-10 border-primary/10 shadow-[0_0_60px_hsl(var(--cobalt)/0.06)]">
            <h3 className="text-lg font-heading font-bold mb-8 text-primary">AI-Powered Website</h3>
            <ul className="space-y-5">
              {aiPowered.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-foreground text-sm">{item.point}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

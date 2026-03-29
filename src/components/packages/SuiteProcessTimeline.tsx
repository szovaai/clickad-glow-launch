import { ClipboardCheck, Wrench, Rocket } from "lucide-react";

export const suiteProcessSteps = [
  {
    icon: ClipboardCheck,
    title: "Audit & Strategy",
    duration: "Day 1–2",
    description: "We analyze your business, current website, and lead flow. You get a clear roadmap for growth.",
    deliverables: ["Website audit report", "Competitive analysis", "Conversion roadmap"],
  },
  {
    icon: Wrench,
    title: "Build & Optimize",
    duration: "Day 3–7",
    description: "We build your AI-powered website, implement SEO foundations, and set up your chatbot and lead capture system.",
    deliverables: ["Custom website (up to 5 pages)", "SEO setup", "AI chatbot integration"],
  },
  {
    icon: Rocket,
    title: "Automate & Scale",
    duration: "Ongoing",
    description: "Your system captures and nurtures leads 24/7. We optimize monthly for better rankings and more conversions.",
    deliverables: ["Follow-up automation", "Monthly optimization", "Performance reporting"],
  },
];

export const SuiteProcessTimeline = () => {
  return (
    <section id="process" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            From Audit to <span className="text-gradient-warm">Autopilot</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven three-step process that delivers results, not excuses.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {suiteProcessSteps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-8 pb-16 last:pb-0"
            >
              {/* Vertical spine */}
              {index !== suiteProcessSteps.length - 1 && (
                <div className="absolute left-[27px] top-[60px] bottom-0 w-px bg-[hsl(0_0%_100%/0.06)]" />
              )}

              {/* Step numeral */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-[54px] h-[54px] rounded-2xl bg-secondary border border-[hsl(0_0%_100%/0.06)] flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-muted-foreground/40">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                  <h3 className="text-xl font-heading font-bold">{step.title}</h3>
                  <span className="text-xs font-medium tracking-wide uppercase text-primary">{step.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="text-xs text-muted-foreground bg-secondary/80 border border-[hsl(0_0%_100%/0.04)] rounded-full px-3 py-1"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

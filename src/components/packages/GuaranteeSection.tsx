import { ShieldCheck } from "lucide-react";

export const GuaranteeSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="premium-card p-10 md:p-14 text-center border-[hsl(0_0%_100%/0.06)]">
            {/* Shield motif */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary border border-[hsl(0_0%_100%/0.06)] mb-8">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              60-Day Performance Confidence Guarantee
            </h2>

            <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              If your new website doesn't generate more leads within 60 days, 
              we'll optimize it for free until it does — or refund your full investment. 
              No awkward conversations. No hoops.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm pt-6 border-t border-[hsl(0_0%_100%/0.06)]">
              {["60-day results window", "Free optimization included", "Full refund if no results"].map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

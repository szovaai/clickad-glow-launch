import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      {/* Soft background bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(224_100%_65%/0.06),_transparent_60%)]" />

      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-[0.96] tracking-tight">
            Ready to Replace Your Website With a{" "}
            <span className="text-gradient-warm">Growth System</span>?
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Book a free strategy call and see exactly how a conversion-focused website will work for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" className="group" asChild>
              <Link to="/audit">
                <Calendar className="mr-2 h-4 w-4" />
                Book Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            {["Live in 48 Hours", "No Monthly Fees", "Satisfaction Guaranteed"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-30 blur-3xl pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-4">
            Limited Setup Slots Available
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
            Ready to Never Miss a Lead{" "}
            <span className="text-primary glow-text">Again</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book a 10-minute demo and see exactly how an AI sales system will work for your business. 
            No fluff. No pressure. Just a clear plan to book more jobs automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="glow" size="lg" className="group" asChild>
              <Link to="/audit">
                <Calendar className="mr-2" />
                Book a Demo
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            {["Live in 5 Days", "Cancel Anytime", "60-Day Guarantee"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

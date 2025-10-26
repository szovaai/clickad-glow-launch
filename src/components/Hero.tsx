import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-core-grid.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-26 md:pt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Abstract neon-green core with connection lines over a dark grid" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      
      {/* Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow opacity-60 blur-3xl pointer-events-none" />
      
      {/* Content */}
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            Launch a Job-Booking Website That{" "}
            <span className="text-primary glow-text">Works as Hard as You Do</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            We build conversion machines that turn traffic into paying clients. 7-Day Launch guarantee. 
            Big-agency quality without the agency fluff.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="glow" size="lg" className="group">
              Book a 10-Min Demo
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Case Studies
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>7-Day Launch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>300% Avg Increase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Guaranteed Timeline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

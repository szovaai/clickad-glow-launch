import { Zap, Target, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Zap,
    title: "Conversion Site",
    description: "Every pixel optimized to turn visitors into booked jobs. Mobile-first design that works flawlessly across all devices.",
  },
  {
    icon: Target,
    title: "AI Follow-Up Stack",
    description: "Automated client communication that nurtures leads 24/7. Never miss a potential customer again.",
  },
  {
    icon: BarChart3,
    title: "Performance Dashboard",
    description: "Track bookings, traffic, and ROI in real-time. Know exactly what's working and what isn't.",
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            What You Get
          </h2>
          <p className="text-xl text-muted-foreground">
            A complete system designed to convert traffic into revenue
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] group"
            >
              <div className="mb-6 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Target, Layers, TrendingUp, Brain, Wrench } from "lucide-react";

const beliefs = [
  {
    icon: Zap,
    title: "Performance > Pretty",
    description: "Beautiful websites are table stakes. We build conversion machines that drive real business results.",
  },
  {
    icon: Target,
    title: "Automation > Manual Grind",
    description: "Systems that work 24/7. Your website should be your best salesperson, working around the clock.",
  },
  {
    icon: Layers,
    title: "Simplicity > Complexity",
    description: "Complex problems need elegant solutions. We cut through the noise to deliver what actually works.",
  },
  {
    icon: TrendingUp,
    title: "Every Click Should Convert",
    description: "We optimize every interaction. From first visit to closed deal, nothing is left to chance.",
  },
  {
    icon: Brain,
    title: "Intelligence Drives Everything",
    description: "AI isn't a feature, it's the foundation. Smart automation and data-driven decisions power growth.",
  },
  {
    icon: Wrench,
    title: "Custom > Cookie-Cutter",
    description: "No templates, no shortcuts. Every solution is tailored to your business, industry, and goals.",
  },
];

const metrics = [
  { value: "10+", label: "Years Industry Experience" },
  { value: "50+", label: "Happy Clients" },
  { value: "100%", label: "Custom Solutions" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8 md:pt-12">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-heading font-bold glow-text">
                WE BUILD CONVERSION MACHINES
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Not just websites. We architect AI-powered digital ecosystems that turn clicks into customers and visitors into revenue.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                {metrics.map((metric, index) => (
                  <Card key={index} className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
                    <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                      {metric.value}
                    </div>
                    <div className="text-muted-foreground uppercase text-sm tracking-wider">
                      {metric.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 md:py-32 bg-card/30">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold">
                  Our Story
                </h2>
                <p className="text-xl text-primary">
                  Architects of the AI-Powered Web
                </p>
              </div>
              
              <div className="prose prose-invert max-w-none space-y-6 text-lg text-foreground/90">
                <p>
                  We started ClickAd Media because we were tired of seeing businesses throw money at "pretty" websites that didn't convert. We saw service-based businesses—from healthcare to home services, insurance to professional trades—struggling with agencies that didn't understand their world.
                </p>
                <p>
                  The traditional agency model is broken. Months of back-and-forth, bloated budgets, and websites that look good but don't convert. We knew there had to be a better way.
                </p>
                <p>
                  So we built it. A system that combines rapid deployment, conversion-focused design, and intelligent automation. We don't just build websites—we engineer digital systems that work as hard as you do.
                </p>
                <p>
                  Today, we're laser-focused on one thing: helping service-based businesses dominate their markets with websites that actually drive revenue. From orthodontists to insurance agencies, pet services to contractors—no fluff, no wasted time, just results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-20 md:py-32">
          <div className="container px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                What We Believe
              </h2>
              <p className="text-xl text-muted-foreground">
                Our principles drive everything we build
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {beliefs.map((belief, index) => {
                const Icon = belief.icon;
                return (
                  <Card 
                    key={index}
                    className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3">
                      {belief.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {belief.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet The Makers */}
        <section className="py-20 md:py-32 bg-card/30">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Meet The Makers
              </h2>
              <p className="text-xl text-muted-foreground">
                A lean, focused team obsessed with results
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 pt-8">
                <Card className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-heading font-bold text-primary mb-3">
                    Engineered for Scale
                  </div>
                  <p className="text-foreground/80">
                    Built on robust frameworks that grow with your business
                  </p>
                </Card>
                
                <Card className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-heading font-bold text-primary mb-3">
                    Strategic Thinking
                  </div>
                  <p className="text-foreground/80">
                    Data-driven decisions backed by years of market expertise
                  </p>
                </Card>
                
                <Card className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm">
                  <div className="text-3xl font-heading font-bold text-primary mb-3">
                    Results Focused
                  </div>
                  <p className="text-foreground/80">
                    Every decision optimized for conversions and ROI
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Let's Build Your Growth Machine
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to stop throwing money at websites that don't convert? Let's talk strategy.
              </p>
              <Button variant="glow" size="lg" className="text-lg px-8">
                Book Strategy Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

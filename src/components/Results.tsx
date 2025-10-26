import tradeProfessional from "@/assets/trade-professional.jpg";

const stats = [
  { value: "300%", label: "Avg Increase in Bookings" },
  { value: "7 Days", label: "From Start to Launch" },
  { value: "98%", label: "Customer Satisfaction Rate" },
  { value: "24/7", label: "Lead Capture System" },
];

export const Results = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-glow opacity-20 blur-3xl pointer-events-none" />
      
      <div className="container px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <img 
                src={tradeProfessional} 
                alt="Professional tradesperson in PPE with cinematic lighting" 
                className="w-full h-auto"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-lg p-6 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              <div className="text-4xl font-heading font-bold text-primary">300%</div>
              <div className="text-sm text-muted-foreground">More Bookings</div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Real Results for Real Businesses
              </h2>
              <p className="text-xl text-muted-foreground">
                We don't just build websites. We build conversion machines that deliver measurable ROI.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl font-heading font-bold text-primary glow-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

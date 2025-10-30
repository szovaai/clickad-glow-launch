import timelineImage from "@/assets/timeline-visual.jpg";

const steps = [
  { day: "Day 1", title: "Discovery", desc: "Strategy call & content gathering" },
  { day: "Day 2", title: "Design", desc: "Wireframes & visual direction" },
  { day: "Day 3", title: "Build", desc: "Development begins" },
  { day: "Day 4", title: "Content", desc: "Copy & media integration" },
  { day: "Day 5", title: "Review", desc: "Client feedback round" },
  { day: "Day 6", title: "Polish", desc: "Final refinements" },
  { day: "Day 7", title: "Launch", desc: "Go live & celebrate" },
];

export const Timeline = () => {
  return (
    <section id="process" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            The <span className="text-primary glow-text">7-Day Launch</span> Process
          </h2>
          <p className="text-xl text-muted-foreground">
            From first call to fully operational website in one week flat
          </p>
        </div>
        
        {/* Timeline Visual */}
        <div className="mb-12 rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
          <img 
            src={timelineImage} 
            alt="Seven glowing milestones in a straight line illustrating a one-week website launch" 
            className="w-full h-auto"
          />
        </div>
        
        {/* Timeline Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center space-y-2 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="text-primary font-bold text-sm">{step.day}</div>
              <div className="font-heading font-semibold">{step.title}</div>
              <div className="text-xs text-muted-foreground">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

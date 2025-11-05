import { CheckCircle } from "lucide-react";

interface ProcessStep {
  title: string;
  duration: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Our Process
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Fast & Collaborative
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    {step.duration && (
                      <span className="text-sm text-muted-foreground">
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

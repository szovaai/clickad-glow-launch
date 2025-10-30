import { AlertCircle } from "lucide-react";

interface IndustryPainPointsProps {
  painPoints: string[];
}

export function IndustryPainPoints({ painPoints }: IndustryPainPointsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Common Website Problems We Fix
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-background rounded-lg border">
              <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-1" />
              <p className="text-lg">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface Industry {
  icon: string;
  title: string;
  description: string;
}

interface IndustriesGridProps {
  industries: Industry[];
}

export function IndustriesGrid({ industries }: IndustriesGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Industries We Serve in Calgary
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const Icon = (Icons as any)[industry.icon] as LucideIcon;
            return (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow text-center"
              >
                {Icon && <Icon className="h-12 w-12 text-primary mb-4 mx-auto" />}
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-muted-foreground">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

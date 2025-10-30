import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServiceGridProps {
  services: Service[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What We'll Optimize For You
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = (Icons as any)[service.icon] as LucideIcon;
            return (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
              >
                {Icon && <Icon className="h-12 w-12 text-primary mb-4" />}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

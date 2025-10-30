import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServicePageCTAProps {
  ctaText: string;
  buttonText: string;
  link: string;
}

export function ServicePageCTA({ ctaText, buttonText, link }: ServicePageCTAProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaText}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            60-second Loom video showing 3 quick wins to boost conversions
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            ⚡ Only 3 spots available per month
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to={link}>
              {buttonText} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

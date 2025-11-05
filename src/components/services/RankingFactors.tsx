import { Target } from "lucide-react";

interface RankingFactor {
  title: string;
  description: string;
}

interface RankingFactorsProps {
  factors: RankingFactor[];
}

export function RankingFactors({ factors }: RankingFactorsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What Makes a Calgary Website Rank & Convert
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {factors.map((factor, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-lg border">
              <Target className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

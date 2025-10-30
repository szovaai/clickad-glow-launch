import { CheckCircle } from "lucide-react";

interface MicroCaseStudyProps {
  companyName: string;
  results: string[];
}

export function MicroCaseStudy({ companyName, results }: MicroCaseStudyProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Real Results</h2>
          <div className="bg-card rounded-lg border p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">{companyName}</h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <p className="text-lg">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

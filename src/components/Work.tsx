import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import kwikKerb from "@/assets/portfolio/kwik-kerb.png";
import truecanPower from "@/assets/portfolio/truecan-power.png";
import westlights from "@/assets/portfolio/westlights.png";
import caminoChemicals from "@/assets/portfolio/camino-chemicals.png";
import kiDevelopment from "@/assets/portfolio/ki-development.png";

const projects = [
  {
    name: "Kwik Kerb Fort McMurray",
    industry: "Landscaping & Concrete Edging",
    image: kwikKerb,
    url: "https://kwikkerbfortmcmurray.com",
    metrics: "300% increase in quote requests"
  },
  {
    name: "Truecan Power",
    industry: "Electrical Services",
    image: truecanPower,
    url: "https://truecanpower.com",
    metrics: "Professional online presence established"
  },
  {
    name: "Westlights",
    industry: "Christmas Lighting Installation",
    image: westlights,
    url: "https://westlights.ca",
    metrics: "Seasonal booking system launched"
  },
  {
    name: "Camino Chemicals",
    industry: "Industrial Chemicals & Detergents",
    image: caminoChemicals,
    url: "https://caminochemicals.com",
    metrics: "Industrial-grade web platform delivered"
  },
  {
    name: "KI Development Solutions",
    industry: "Home Renovation & Interior Design",
    image: kiDevelopment,
    url: "https://kidevelopmentsolutions.com",
    metrics: "Premium renovation showcase delivered"
  }
];

export const Work = () => {
  return (
    <section id="work" className="py-24 relative">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      
      <div className="container px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Real Results for Calgary & Alberta Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we've transformed Calgary and Alberta service websites into conversion machines
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 glow-hover"
            >
              <div className="relative overflow-hidden bg-muted" style={{ minHeight: '300px', maxHeight: '400px' }}>
                <img
                  src={project.image}
                  alt={`${project.name} website screenshot`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.industry}</p>
                <p className="text-sm text-primary mb-4">{project.metrics}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:border-primary/50"
                  asChild
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    View Live Site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="glow" size="lg" asChild>
            <Link to="/audit">See How We Can Transform Your Business</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

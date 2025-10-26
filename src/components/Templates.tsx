import { Button } from "@/components/ui/button";
import commercialCleaning from "@/assets/templates/commercial-cleaning.png";
import airDuctCleaning from "@/assets/templates/air-duct-cleaning.png";
import windshieldRepair from "@/assets/templates/windshield-repair.png";
import hotTubInstallation from "@/assets/templates/hot-tub-installation.png";
import sprinklerIrrigation from "@/assets/templates/sprinkler-irrigation.png";
import orthodontist from "@/assets/templates/orthodontist.png";
import drywallContractor from "@/assets/templates/drywall-contractor.png";
import asbestosRemoval from "@/assets/templates/asbestos-removal.png";
import windowTinting from "@/assets/templates/window-tinting.png";
import petInsurance from "@/assets/templates/pet-insurance.png";

const templates = [
  {
    name: "Commercial Cleaning",
    image: commercialCleaning,
    industry: "Cleaning Services"
  },
  {
    name: "Air Duct Cleaning",
    image: airDuctCleaning,
    industry: "HVAC & Duct Services"
  },
  {
    name: "Windshield Repair",
    image: windshieldRepair,
    industry: "Auto Services"
  },
  {
    name: "Hot Tub Installation",
    image: hotTubInstallation,
    industry: "Home Services"
  },
  {
    name: "Sprinkler & Irrigation",
    image: sprinklerIrrigation,
    industry: "Lawn Care & Irrigation"
  },
  {
    name: "Orthodontist",
    image: orthodontist,
    industry: "Dental & Healthcare"
  },
  {
    name: "Drywall Contractor",
    image: drywallContractor,
    industry: "Construction Services"
  },
  {
    name: "Asbestos Removal",
    image: asbestosRemoval,
    industry: "Environmental Services"
  },
  {
    name: "Window Tinting",
    image: windowTinting,
    industry: "Auto & Home Services"
  },
  {
    name: "Pet Insurance",
    image: petInsurance,
    industry: "Insurance Services"
  }
];

export const Templates = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Template Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            And much more—we can fit any service-based industry website
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {templates.map((template, index) => (
            <div
              key={index}
              className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 glow-hover"
            >
              <div className="aspect-[9/16] overflow-hidden bg-muted">
                <img
                  src={template.image}
                  alt={`${template.name} template example`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.industry}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="glow" size="lg">
            Request Your Custom Template
          </Button>
        </div>
      </div>
    </section>
  );
};

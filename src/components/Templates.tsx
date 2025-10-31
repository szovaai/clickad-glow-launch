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

const templateCategories = [
  {
    category: "Construction & Trades",
    templates: [
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
        name: "Hot Tub Installation",
        image: hotTubInstallation,
        industry: "Home Services"
      },
      {
        name: "Sprinkler & Irrigation",
        image: sprinklerIrrigation,
        industry: "Lawn Care & Irrigation"
      }
    ]
  },
  {
    category: "Cleaning & Maintenance",
    templates: [
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
        name: "Window Tinting",
        image: windowTinting,
        industry: "Auto & Home Services"
      }
    ]
  },
  {
    category: "Health & Professional Services",
    templates: [
      {
        name: "Orthodontist",
        image: orthodontist,
        industry: "Dental & Healthcare"
      },
      {
        name: "Pet Insurance",
        image: petInsurance,
        industry: "Insurance Services"
      },
      {
        name: "Windshield Repair",
        image: windshieldRepair,
        industry: "Auto Services"
      }
    ]
  }
];

export const Templates = () => {
  return (
    <section id="templates" className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Template Examples
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            And much more—we can fit any service-based industry website
          </p>
        </div>

        <div className="space-y-16">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
                {category.category}
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.templates.map((template, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-premium hover:-translate-y-1"
                  >
                    <div className="aspect-[9/16] overflow-hidden bg-muted relative">
                      <img
                        src={template.image}
                        alt={`${template.name} template example`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="text-sm font-semibold text-primary mb-2">
                            View Demo
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Click to explore
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="glow" size="lg">
            Request Your Custom Template
          </Button>
        </div>
      </div>
    </section>
  );
};

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Printer } from "lucide-react";

const OnboardingChecklist = () => {
  const handlePrint = () => {
    window.print();
  };

  const checklistItems = [
    {
      category: "Brand Assets",
      items: [
        "Logo files (PNG, SVG, or AI format)",
        "Brand colors (hex codes if known)",
        "Brand fonts (if specific fonts are required)",
        "Tagline or slogan",
      ],
    },
    {
      category: "Content",
      items: [
        "Company description (1-2 paragraphs about your business)",
        "Services/products list with descriptions",
        "Team member photos and bios (if applicable)",
        "Customer testimonials or reviews",
        "Any existing marketing copy you'd like to use",
      ],
    },
    {
      category: "Images & Media",
      items: [
        "High-quality photos of your work/products",
        "Team photos or headshots",
        "Office/location photos",
        "Any videos you'd like to include",
      ],
    },
    {
      category: "Business Information",
      items: [
        "Business name and legal entity",
        "Physical address",
        "Phone number(s)",
        "Email address(es)",
        "Business hours",
        "Social media links",
      ],
    },
    {
      category: "Website Preferences",
      items: [
        "3-5 websites you like (for design inspiration)",
        "Features you need (booking, contact forms, etc.)",
        "Pages you want (Home, About, Services, Contact, etc.)",
        "Any specific functionality requirements",
      ],
    },
    {
      category: "Technical Access",
      items: [
        "Domain registrar login (GoDaddy, Namecheap, etc.)",
        "Current hosting login (if transferring)",
        "Google Analytics access (if existing)",
        "Google Business Profile access",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 print:mb-8">
            <h1 className="text-4xl font-bold mb-4">Website Onboarding Checklist</h1>
            <p className="text-muted-foreground mb-6">
              Gather these items before your kickoff call to make the process smooth and efficient.
            </p>
            <div className="flex gap-4 justify-center print:hidden">
              <Button onClick={handlePrint} variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Print Checklist
              </Button>
              <Button onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" />
                Save as PDF
              </Button>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-8">
            {checklistItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-card rounded-lg border p-6 print:border-gray-300 print:break-inside-avoid">
                <h2 className="text-xl font-semibold mb-4 text-primary">{section.category}</h2>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <Checkbox id={`item-${sectionIndex}-${itemIndex}`} className="mt-1 print:border-gray-400" />
                      <label
                        htmlFor={`item-${sectionIndex}-${itemIndex}`}
                        className="text-sm cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20 print:bg-gray-50 print:border-gray-300">
            <h3 className="font-semibold mb-2">Don't have everything?</h3>
            <p className="text-sm text-muted-foreground">
              No worries! We can work with what you have. Bring what you can to our kickoff call, 
              and we'll discuss solutions for any missing items. We're here to help!
            </p>
          </div>

          {/* Contact */}
          <div className="text-center mt-8 print:mt-4">
            <p className="text-muted-foreground text-sm">
              Questions? Email{" "}
              <a href="mailto:support@jasonrszova.com" className="text-primary hover:underline">
                support@jasonrszova.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Print Styles */}
      <style>{`
        @media print {
          nav, footer, .print\\:hidden { display: none !important; }
          body { background: white !important; }
          main { padding-top: 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default OnboardingChecklist;

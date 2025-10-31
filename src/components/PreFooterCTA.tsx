import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import tradeProfessional from "@/assets/trade-professional.jpg";
import { QuoteCta } from "@/components/PremiumHeader";

export const PreFooterCTA = () => {
  const handleCallClick = () => {
    window.open("tel:+14036999044", "_self");
    
    if (window.Trakrly) {
      window.Trakrly.click({
        event: "prefooter_cta_call_clicked",
        location: "prefooter_cta",
      });
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-card border border-border rounded-2xl overflow-hidden shadow-premium">
            {/* Image Side */}
            <div className="hidden md:block">
              <img
                src={tradeProfessional}
                alt="Calgary trade professional"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Still have questions?<br />
                Let's chat.
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                We'll give you real answers and real options—no sales pitch, no pressure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCallClick}
                  size="lg"
                  variant="glow"
                  className="flex-1"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                
                <QuoteCta>
                  <Button size="lg" variant="outline" className="flex-1">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send a Message
                  </Button>
                </QuoteCta>
              </div>

              <p className="text-sm text-muted-foreground mt-6 text-center sm:text-left">
                📞 <span className="font-semibold">(403) 699-9044</span> • Response within 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

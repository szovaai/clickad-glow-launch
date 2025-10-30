import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Your Audit is On The Way! 🎯</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm analyzing your website right now. Within 24 hours, you'll receive a personalized Loom video with actionable insights.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-card rounded-lg border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">What Happens Next</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 1: Get Your Loom (24 hours)</h3>
                  <p className="text-muted-foreground">
                    I'll send you a 60-second Loom video highlighting 3 quick wins to boost your conversions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 2: Book a 15-Minute Call (Optional)</h3>
                  <p className="text-muted-foreground">
                    If you like what you see, we'll jump on a quick call to discuss a One-Day Website Makeover.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Step 3: One-Day Makeover (If You Want It)</h3>
                  <p className="text-muted-foreground">
                    We'll implement the fixes and launch your improved website—only 3 spots available per month.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendly Embed */}
          <div className="bg-card rounded-lg border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Ready to Talk Now?</h2>
            <p className="text-muted-foreground text-center mb-8">
              Book a 15-minute discovery call to discuss how we can help your business.
            </p>
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
              {/* Calendly embed would go here */}
              <div className="text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Calendly widget will be embedded here</p>
                <Button asChild>
                  <a 
                    href="https://calendly.com/your-calendly-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Schedule a Call
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Wins Download */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">While You Wait...</h2>
            <p className="text-muted-foreground mb-6">
              Download our Website Quick-Wins Checklist to start improving your site today.
            </p>
            <Button size="lg" variant="default">
              Download Quick-Wins Checklist (PDF)
            </Button>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-2">Questions? Need to change something?</p>
            <p className="font-semibold">
              Call <a href="tel:587-575-9416" className="text-primary hover:underline">587-575-9416</a> or email{" "}
              <a href="mailto:szovajason@gmail.com" className="text-primary hover:underline">szovajason@gmail.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

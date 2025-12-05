import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Mail, Calendar, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [packageName, setPackageName] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) throw error;

        if (data?.success) {
          setVerified(true);
          setPackageName(data.packageName);
          
          // Track conversion events
          if (window.Trakrly) {
            window.Trakrly.click({
              event: 'payment_conversion',
              page: 'payment-success',
              package: data.packageName
            });
          }

          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'purchase', {
              event_category: 'conversion',
              event_label: data.packageName
            });
          }
        }
      } catch (error) {
        console.error('Payment verification error:', error);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Verifying your payment...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
            {packageName && (
              <p className="text-lg text-primary font-semibold mb-2">{packageName}</p>
            )}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thank you for choosing ClickAdMedia. Your website project is officially underway!
            </p>
          </div>

          {/* Confirmation Card */}
          <Card className="p-8 mb-12 border-green-500/20 bg-green-500/5">
            <div className="flex items-center gap-4 mb-6">
              <Mail className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Check Your Inbox</h2>
                <p className="text-muted-foreground">
                  A confirmation email with your receipt and next steps has been sent to you.
                </p>
              </div>
            </div>
          </Card>

          {/* What Happens Next */}
          <div className="bg-card rounded-lg border p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">What Happens Next</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Welcome Call (Within 24 Hours)</h3>
                  <p className="text-muted-foreground">
                    I'll reach out to schedule a 30-minute kickoff call to discuss your vision, goals, and brand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Strategy & Design Phase (Days 2-5)</h3>
                  <p className="text-muted-foreground">
                    We'll create your sitemap, wireframes, and initial design concepts for your review.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Development & Launch (Days 6-14)</h3>
                  <p className="text-muted-foreground">
                    Your website is built, tested, and launched. You'll receive training videos and documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <Calendar className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Skip the Wait</h3>
              <p className="text-muted-foreground mb-4">
                Want to get started right away? Book your kickoff call now.
              </p>
              <Button asChild className="w-full">
                <a 
                  href="https://koalendar.com/e/meet-with-jason-szova" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book Kickoff Call <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </Card>

            <Card className="p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Get Prepared</h3>
              <p className="text-muted-foreground mb-4">
                Download our onboarding checklist to gather everything we'll need.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/onboarding-checklist" target="_blank" rel="noopener noreferrer">
                  Download Checklist <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Questions about your order?</p>
            <p className="font-semibold">
              Email{" "}
              <a href="mailto:support@jasonrszova.com" className="text-primary hover:underline">
                support@jasonrszova.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;

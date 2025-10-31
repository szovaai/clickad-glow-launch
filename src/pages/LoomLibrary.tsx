import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LoomLibraryGrid } from "@/components/loom/LoomLibraryGrid";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    trakrly?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export default function LoomLibrary() {
  useEffect(() => {
    // Set meta tags
    document.title = "Free Calgary Website Audits | 60-Second Video Reviews | ClickAd Media";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Watch free 60-second website audits of Calgary trade businesses. See real improvements we\'d make to electrician, renovation, and industrial websites.'
    );

    // Track page view
    if (window.trakrly) {
      window.trakrly.track("loom_library_viewed", {
        page: "/loom-library",
      });
    }

    // Add Schema.org markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoGallery",
      "name": "Calgary Website Audit Videos",
      "description": "Free 60-second website audits for Calgary trade businesses",
      "provider": {
        "@type": "Organization",
        "name": "ClickAd Media",
        "url": "https://clickad.media"
      }
    };

    const scriptId = 'schema-org-jsonld';
    let schemaScript = document.getElementById(scriptId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = scriptId;
      document.head.appendChild(schemaScript);
    }
    (schemaScript as HTMLScriptElement).type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(schema);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              60-Second Website Audits
            </h1>
            <p className="text-xl text-muted-foreground">
              Watch real audits of Calgary trade websites—see what I'd fix on yours
            </p>
            <p className="text-muted-foreground">
              Every video shows 3+ quick wins that could increase your conversions immediately. 
              No fluff, just actionable improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Library Grid */}
      <main className="container mx-auto px-4 py-16">
        <LoomLibraryGrid />
      </main>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Want Your Free Audit?
            </h2>
            <p className="text-xl text-muted-foreground">
              I'll record a personalized 60-second Loom video showing exactly what to fix on your website. 
              No cost, no commitment—just clear, actionable advice.
            </p>
            <Button 
              asChild 
              variant="glow" 
              size="lg"
              onClick={() => {
                if (window.trakrly) {
                  window.trakrly.track("loom_cta_clicked", {
                    source: "loom_library_bottom",
                  });
                }
              }}
            >
              <Link to="/audit?utm_source=loom-library&utm_medium=cta-bottom&utm_campaign=audit">
                Get Your Free Audit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

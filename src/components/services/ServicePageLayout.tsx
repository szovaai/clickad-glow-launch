import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface ServicePageLayoutProps {
  children: ReactNode;
  industry: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  schema?: object | object[];
  breadcrumbs?: { name: string; url: string }[];
}

export function ServicePageLayout({
  children,
  industry,
  heroTitle,
  heroSubtitle,
  heroImage,
  metaTitle,
  metaDescription,
  schema,
  breadcrumbs,
}: ServicePageLayoutProps) {
  useEffect(() => {
    document.title = metaTitle;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metaDescription);

    // Add Schema.org JSON-LD
    if (schema) {
      // Remove old schema scripts
      const oldSchemas = document.querySelectorAll('script[type="application/ld+json"].service-page-schema');
      oldSchemas.forEach((script) => script.remove());

      const schemasArray = Array.isArray(schema) ? schema : [schema];
      
      schemasArray.forEach((schemaItem, index) => {
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.className = 'service-page-schema';
        schemaScript.id = `service-schema-${index}`;
        schemaScript.textContent = JSON.stringify(schemaItem);
        document.head.appendChild(schemaScript);
      });
    }
  }, [metaTitle, metaDescription, schema]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumbs */}
      <nav className="bg-background border-b pt-24" aria-label="breadcrumb">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="h-4 w-4" />
            <li><span className="text-foreground">{industry}</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-muted-foreground">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}

import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ServicePageLayoutProps {
  children: ReactNode;
  industry: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  schema?: object;
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
      const scriptId = 'schema-org-jsonld';
      let schemaScript = document.getElementById(scriptId);
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = scriptId;
        (schemaScript as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }
  }, [metaTitle, metaDescription, schema]);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumbs */}
      <nav className="bg-background border-b" aria-label="breadcrumb">
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

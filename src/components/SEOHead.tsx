import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  schemas?: object[];
  keywords?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://www.clickadmedia.com/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  schemas = [],
  keywords,
}: SEOHeadProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Set keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // Set canonical
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    }

    // Open Graph tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateOrCreateMeta("og:title", title);
    updateOrCreateMeta("og:description", description);
    updateOrCreateMeta("og:image", ogImage);
    updateOrCreateMeta("og:type", ogType);
    updateOrCreateMeta("og:locale", "en_CA");
    if (canonical) {
      updateOrCreateMeta("og:url", canonical);
    }

    // Twitter Card tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateOrCreateTwitterMeta("twitter:card", twitterCard);
    updateOrCreateTwitterMeta("twitter:title", title);
    updateOrCreateTwitterMeta("twitter:description", description);
    updateOrCreateTwitterMeta("twitter:image", ogImage);

    // Inject JSON-LD schemas
    if (schemas.length > 0) {
      // Remove old schema scripts
      const oldSchemas = document.querySelectorAll('script[type="application/ld+json"].seo-head-schema');
      oldSchemas.forEach((script) => script.remove());

      // Add new schemas
      schemas.forEach((schema, index) => {
        const schemaScript = document.createElement("script");
        schemaScript.type = "application/ld+json";
        schemaScript.className = "seo-head-schema";
        schemaScript.id = `schema-${index}`;
        schemaScript.textContent = JSON.stringify(schema);
        document.head.appendChild(schemaScript);
      });
    }
  }, [title, description, canonical, ogImage, ogType, twitterCard, schemas, keywords]);

  return null;
}

// Centralized Schema.org structured data generators

interface FAQ {
  question: string;
  answer: string;
}

interface Step {
  title: string;
  description: string;
  duration?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ClickAd Media",
    "legalName": "ClickAd Media",
    "url": "https://www.clickadmedia.com",
    "logo": "https://www.clickadmedia.com/logo.png",
    "foundingDate": "2014",
    "description": "Calgary website design agency specializing in conversion-focused websites for service-based businesses",
    "areaServed": {
      "@type": "Place",
      "name": "Calgary",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Calgary",
        "addressRegion": "AB",
        "addressCountry": "CA"
      }
    },
    "knowsAbout": [
      "Website Design",
      "Web Development",
      "SEO",
      "Conversion Optimization",
      "Local SEO",
      "Digital Marketing"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "addressCountry": "CA"
    }
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ClickAd Media",
    "url": "https://www.clickadmedia.com",
    "description": "Calgary website design for service-based businesses",
    "publisher": {
      "@type": "Organization",
      "name": "ClickAd Media"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.clickadmedia.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  areaServed: string = "Calgary, AB"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "ClickAd Media",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Calgary",
        "addressRegion": "AB",
        "addressCountry": "CA"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": areaServed
    }
  };
}

export function generateFAQPageSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: Step[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "itemListElement": {
        "@type": "HowToDirection",
        "text": step.description
      }
    }))
  };
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClickAd Media",
    "description": "Calgary website design for service-based businesses",
    "url": "https://www.clickadmedia.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0447",
      "longitude": "-114.0719"
    },
    "areaServed": {
      "@type": "City",
      "name": "Calgary"
    }
  };
}

export function generateSpeakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    }
  };
}

export function generateOfferSchema(
  name: string,
  description: string,
  price: string,
  priceCurrency: string = "CAD"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": name,
    "description": description,
    "price": price,
    "priceCurrency": priceCurrency,
    "seller": {
      "@type": "Organization",
      "name": "ClickAd Media"
    }
  };
}

export function generateAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ClickAd Media",
    "description": "Learn about ClickAd Media, a Calgary-based website design agency building conversion machines for service businesses",
    "url": "https://www.clickadmedia.com/about",
    "mainEntity": generateOrganizationSchema()
  };
}

export function generateCollectionPageSchema(
  name: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "ClickAd Media"
    }
  };
}

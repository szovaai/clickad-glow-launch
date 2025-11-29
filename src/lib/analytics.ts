/**
 * Google Analytics 4 tracking utilities
 * Centralized analytics functions for consistent event tracking
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a page view
 * Automatically called on route changes in App.tsx
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track form submissions as conversions
 * @param formName - Name of the form (e.g., 'audit_form', 'hero_lead_form')
 * @param data - Form data to include in the event
 */
export const trackFormSubmission = (formName: string, data?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      ...data,
    });

    // Also track as a conversion event
    window.gtag('event', 'conversion', {
      send_to: 'G-ZBJ867HCVE',
      event_category: 'lead_generation',
      event_label: formName,
      ...data,
    });
  }
};

/**
 * Track CTA button clicks
 * @param ctaName - Name/label of the CTA button
 * @param location - Where on the page the CTA was clicked
 */
export const trackCTAClick = (ctaName: string, location?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_location: location || 'unknown',
    });
  }
};

/**
 * Generic event tracking
 * @param eventName - Name of the event
 * @param params - Additional event parameters
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track external link clicks
 */
export const trackOutboundLink = (url: string, label?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'outbound_link_click', {
      link_url: url,
      link_label: label,
    });
  }
};

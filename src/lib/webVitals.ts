/**
 * Core Web Vitals tracking for Google Analytics 4
 * Measures and reports key performance metrics
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Send Web Vitals metric to Google Analytics
 */
const sendToGA = (metric: Metric) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
};

/**
 * Initialize Core Web Vitals tracking
 * Call this once when the app starts (in main.tsx)
 */
export const initWebVitals = () => {
  try {
    // Largest Contentful Paint - Loading performance
    onLCP(sendToGA);
    
    // Interaction to Next Paint - Interactivity
    onINP(sendToGA);
    
    // Cumulative Layout Shift - Visual stability
    onCLS(sendToGA);
    
    // Time to First Byte - Server response time
    onTTFB(sendToGA);
    
    // First Contentful Paint - Initial render
    onFCP(sendToGA);
  } catch (error) {
    console.error('Failed to initialize Web Vitals tracking:', error);
  }
};

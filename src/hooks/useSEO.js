import { useEffect } from 'react';
import { updateSEOTags } from '../utils/seoUtils';

// Custom hook for managing SEO
export const useSEO = (title, description, keywords) => {
  useEffect(() => {
    updateSEOTags(title, description, keywords);
  }, [title, description, keywords]);
};

// Custom hook for adding structured data
export const useStructuredData = (structuredData) => {
  useEffect(() => {
    if (!structuredData) return;
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [structuredData]);
};

// Custom hook for managing page analytics
export const usePageView = (pageName) => {
  useEffect(() => {
    // Track page view (can be extended with Google Analytics)
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
    
    // Console log for development
    console.log(`Page view: ${pageName} - ${window.location.href}`);
  }, [pageName]);
};


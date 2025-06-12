import React, { useEffect } from 'react';

const AdvancedSEO: React.FC = () => {
  useEffect(() => {
    // Add JSON-LD for HowTo schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Convert Unix Timestamp to Date",
      "description": "Step-by-step guide to convert Unix timestamps to human-readable dates",
      "totalTime": "PT2M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Unix timestamp"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Epoch Time Converter"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter timestamp",
          "text": "Enter your Unix timestamp in the input field",
          "url": "https://www.epochtimeconverter.org/#converter"
        },
        {
          "@type": "HowToStep",
          "name": "Click convert",
          "text": "Click the 'Convert to Date' button",
          "url": "https://www.epochtimeconverter.org/#converter"
        },
        {
          "@type": "HowToStep",
          "name": "View result",
          "text": "View the converted date in multiple formats",
          "url": "https://www.epochtimeconverter.org/#converter"
        }
      ]
    };

    // Add Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Epoch Time Converter",
      "url": "https://www.epochtimeconverter.org",
      "logo": "https://www.epochtimeconverter.org/favicon.svg",
      "sameAs": [
        "https://github.com/saurabhsiroya/epoch-converter"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "technical support",
        "email": "saurabhs619@gmail.com"
      }
    };

    // Add Review schema
    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "WebApplication",
        "name": "Epoch Time Converter"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Developer Community"
      },
      "reviewBody": "The most comprehensive and user-friendly epoch time converter available. Features include batch conversion, timezone support, and API access."
    };

    const addSchema = (schema: any, id: string) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(howToSchema, 'howto-schema');
    addSchema(organizationSchema, 'organization-schema');
    addSchema(reviewSchema, 'review-schema');

    // Add meta tags for better social sharing
    const addMetaTag = (property: string, content: string) => {
      const existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Enhanced Open Graph tags
    addMetaTag('og:type', 'website');
    addMetaTag('og:site_name', 'Epoch Time Converter');
    addMetaTag('article:author', 'https://github.com/saurabhsiroya');
    addMetaTag('article:publisher', 'https://www.epochtimeconverter.org');

    // Twitter Card enhancements
    const addTwitterMeta = (name: string, content: string) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    addTwitterMeta('twitter:card', 'summary_large_image');
    addTwitterMeta('twitter:domain', 'epochtimeconverter.org');

    return () => {
      // Cleanup function to remove added schemas
      ['howto-schema', 'organization-schema', 'review-schema'].forEach(id => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default AdvancedSEO;
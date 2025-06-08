// SEO utilities for meta tags and structured data
export const seoConfig = {
  siteName: 'Epoch Converter',
  siteUrl: 'https://epochtimeconverter.org',
  title: 'Epoch Converter - Unix Timestamp Converter | Free Online Tool',
  description: 'Free online epoch timestamp converter with ISO week calculations. Convert Unix timestamps to dates and vice versa. Includes programming examples for 12+ languages and real-time current timestamp display.',
  keywords: 'epoch converter, unix timestamp, timestamp converter, epoch time, unix time, date converter, ISO week, programming examples, developer tools',
  author: 'Saurabh Siroya',
  image: 'https://epochtimeconverter.org/og-image.png',
  twitterHandle: '@epochconverter'
};

// Generate structured data for the application
export const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoConfig.siteName,
    "description": seoConfig.description,
    "url": seoConfig.siteUrl,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": seoConfig.author
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName,
      "url": seoConfig.siteUrl
    },
    "featureList": [
      "Unix timestamp to date conversion",
      "Date to Unix timestamp conversion", 
      "ISO week number calculations",
      "Programming examples for 12+ languages",
      "Real-time current timestamp display",
      "Dark/light theme support",
      "Mobile responsive design",
      "Copy-to-clipboard functionality",
      "Multiple date format support",
      "Timezone aware conversions"
    ],
    "screenshot": seoConfig.image,
    "softwareVersion": "1.0.0",
    "datePublished": "2025-06-07",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "usageInfo": "Free to use for personal and commercial purposes"
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an epoch timestamp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An epoch timestamp (also called Unix timestamp) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It's a standard way to represent time in computer systems."
        }
      },
      {
        "@type": "Question", 
        "name": "How do I convert epoch time to a readable date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter your epoch timestamp in the converter field and click 'Convert to Date'. The tool supports 10-digit (seconds), 13-digit (milliseconds), and 16-digit (microseconds) timestamps."
        }
      },
      {
        "@type": "Question",
        "name": "What are ISO week numbers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ISO week numbers follow the ISO-8601 standard where Week 1 is the first week containing at least 4 days of the new year. This means some dates in early January may belong to the previous year's final week."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool for programming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The tool includes code examples for 12+ programming languages including JavaScript, Python, PHP, Java, C#, Ruby, Go, Rust, Swift, Kotlin, C++, and Excel formulas."
        }
      }
    ]
  };
};

// Update document head with SEO meta tags
export const updateSEOTags = (title, description, keywords) => {
  // Update title
  document.title = title || seoConfig.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description || seoConfig.description);
  }
  
  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords || seoConfig.keywords);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title || seoConfig.title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description || seoConfig.description);
  }
  
  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[property="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title || seoConfig.title);
  }
  
  const twitterDescription = document.querySelector('meta[property="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description || seoConfig.description);
  }
};

// Generate sitemap data
export const generateSitemapData = () => {
  const baseUrl = seoConfig.siteUrl;
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    urls: [
      {
        loc: baseUrl,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '1.0'
      }
    ]
  };
};


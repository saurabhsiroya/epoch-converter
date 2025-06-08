#!/usr/bin/env node

// Generate sitemap.xml for the epoch converter website
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://epochtimeconverter.org';
const currentDate = new Date().toISOString().split('T')[0];

const urls = [
  {
    loc: siteUrl,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0'
  }
];

const generateSitemap = () => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${url.loc}</loc>\n`;
    sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${url.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
};

// Write sitemap to public directory
const sitemapContent = generateSitemap();
const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('✅ Sitemap generated successfully at:', sitemapPath);

// Also update robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
const robotsContent = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Allow all search engines to crawl
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Allow crawling of important files
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.ico
`;

fs.writeFileSync(robotsPath, robotsContent, 'utf8');
console.log('✅ Robots.txt updated successfully at:', robotsPath);


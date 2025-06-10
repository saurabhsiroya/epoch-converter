# Manus Deployment Guide - Epoch Time Converter

## Project Overview
This is a professional Unix timestamp converter built with React, TypeScript, and Tailwind CSS. It includes advanced features like API access, batch processing, timezone conversion, and payment integration.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: Stripe (optional)
- **State Management**: React Context
- **Build Tool**: Vite

## Deployment Instructions for Manus

### 1. Upload Files
Upload all the project files to Manus, maintaining the folder structure:

```
epoch-converter/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

### 2. Environment Variables (Optional)
If you want to enable Stripe payments, set these environment variables in Manus:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
VITE_API_BASE_URL=https://api.epochtimeconverter.org
```

### 3. Build Commands
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. Framework Detection
Manus should automatically detect this as a **Vite** project.

## Features Included

### Core Functionality
✅ Real-time timestamp display with live updates
✅ Bidirectional conversion (timestamp ↔ date)
✅ Timezone support (500+ timezones)
✅ Week number calculator (ISO 8601)
✅ Batch processing for multiple timestamps
✅ Multiple format support (seconds/milliseconds)

### Advanced Features
✅ Professional API with authentication
✅ User authentication system
✅ Payment integration (Stripe)
✅ Usage analytics dashboard
✅ Dark/light theme support
✅ Mobile responsive design
✅ SEO optimized with structured data

### Developer Tools
✅ API testing dashboard
✅ Programming examples (6+ languages)
✅ Export functionality (CSV)
✅ Comprehensive documentation

## Post-Deployment Steps

1. **Test the deployment** - Verify all converters work
2. **Check mobile responsiveness**
3. **Test dark/light mode toggle**
4. **Verify API endpoints** (if backend is set up)
5. **Configure custom domain** (optional)

## Support
For any deployment issues, contact: saurabhs619@gmail.com

---

**This is a production-ready application with enterprise-grade features! 🚀**
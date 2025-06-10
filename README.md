# Epoch Time Converter - Professional Unix Timestamp Tool

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/saurabhsiroya/epoch-converter)

A comprehensive, production-ready Unix timestamp conversion tool with advanced features including API access, batch processing, timezone conversion, and week number calculations.

## 🚀 Live Demo

Visit the live application: [https://www.epochtimeconverter.org](https://www.epochtimeconverter.org)

## ✨ Features

### Core Functionality
- **Real-time Timestamp Display** - Live updating current Unix timestamp
- **Bidirectional Conversion** - Convert timestamps to dates and dates to timestamps
- **Timezone Support** - Convert across 500+ timezones with DST handling
- **Week Number Calculator** - ISO 8601 week number calculations
- **Batch Processing** - Convert thousands of timestamps at once
- **Multiple Formats** - Support for seconds, milliseconds, and microseconds

### Premium Features
- **API Access** - Programmatic access to all conversion features
- **User Dashboard** - Manage account and API usage
- **Subscription Plans** - Pro and Enterprise tiers with different limits
- **Payment Processing** - Secure payment integration for subscriptions

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm 8+

### Installation
```bash
# Clone the repository
git clone https://github.com/saurabhsiroya/epoch-converter.git

# Navigate to the project directory
cd epoch-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📚 API Documentation

The Epoch Converter API provides programmatic access to all conversion features:

- **GET /api/convert** - Convert between timestamps and human-readable dates
- **GET /api/week** - Get ISO week number for a date
- **POST /api/batch** - Convert multiple timestamps at once
- **GET /api/timezone** - Convert timestamps across timezones

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


# Epoch Time Converter - Professional Unix Timestamp Tool

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/saurabhsiroya/epoch-converter)

A comprehensive, production-ready Unix timestamp conversion tool with advanced features including API access, batch processing, timezone conversion, and week number calculations.

## 🚀 Live Demo 🚀 

Visit the live application: [https://www.epochtimeconverter.org](https://www.epochtimeconverter.org)

## ✨ Features

### Core Functionality
- **Real-time Timestamp Display** - Live updating current Unix timestamp
- **Bidirectional Conversion** - Convert timestamps to dates and dates to timestamps
- **Timezone Support** - Convert across 500+ timezones with DST handling
- **Week Number Calculator** - ISO 8601 week number calculations
- **Batch Processing** - Convert thousands of timestamps at once
- **Multiple Formats** - Support for seconds, milliseconds, and microseconds

### Advanced Features
- **Professional API** - RESTful API with authentication and rate limiting
- **User Authentication** - Secure login system with API key management
- **Payment Integration** - Stripe-powered subscription plans
- **Usage Analytics** - Real-time conversion statistics
- **Dark Mode** - Full dark/light theme support
- **Mobile Responsive** - Perfect experience on all devices
- **SEO Optimized** - Comprehensive meta tags and structured data

### Developer Tools
- **API Testing Dashboard** - Built-in API endpoint testing
- **Programming Examples** - Code snippets for 6+ languages
- **Comprehensive Documentation** - Detailed API and usage guides
- **Export Functionality** - Download results as CSV

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: Stripe
- **State Management**: React Context
- **Build Tool**: Vite
- **Deployment**: Netlify with GitHub Actions

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saurabhsiroya/epoch-converter.git
   cd epoch-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
   VITE_API_BASE_URL=https://api.epochtimeconverter.org
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Automated Deployment with GitHub Actions

This project includes automated deployment to Netlify via GitHub Actions:

1. **Fork this repository**
2. **Set up Netlify account** and create a new site
3. **Add GitHub Secrets**:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `VITE_API_BASE_URL`: Your API base URL

4. **Push to main branch** - Deployment happens automatically!

### Manual Deployment

#### Deploy to Netlify
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

#### Deploy to Vercel
```bash
npm run build
npx vercel --prod
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payments | No |
| `VITE_API_BASE_URL` | Base URL for API endpoints | No |
| `API_SECRET_KEY` | Secret key for API authentication | No |
| `DATABASE_URL` | Database connection string | No |
| `JWT_SECRET` | JWT signing secret | No |

### Stripe Setup (Optional)

1. Create a [Stripe account](https://stripe.com)
2. Get your publishable key from the dashboard
3. Update the environment variable
4. Configure webhook endpoints for subscription management

## 🔌 API Usage

### Authentication
```bash
curl -X GET "https://api.epochtimeconverter.org/convert" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"timestamp": 1672531200}'
```

### Response Format
```json
{
  "timestamp": 1672531200,
  "date": "2023-01-01T00:00:00.000Z",
  "formatted": "January 1, 2023 12:00:00 AM UTC",
  "weekNumber": 52,
  "dayOfYear": 1,
  "timezone": "UTC"
}
```

## 💳 Subscription Plans

### Free Plan
- 1,000 API requests/month
- Basic support
- All web features

### Pro Plan ($15/month)
- 50,000 API requests/month
- Priority support
- Advanced analytics
- Custom rate limits

### Enterprise Plan ($99/month)
- 500,000 API requests/month
- Dedicated support
- Custom integrations
- SLA guarantee

## 🔒 Security Features

- **API Key Authentication** - Secure API access
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Secure data handling
- **HTTPS Only** - Secure data transmission
- **Privacy First** - No data collection or tracking

## 📊 Performance

- **Lightning Fast** - Conversions in under 10ms
- **Optimized Bundle** - Minimal JavaScript payload
- **CDN Delivery** - Global content delivery
- **Mobile Optimized** - Perfect mobile experience

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.epochtimeconverter.org](https://docs.epochtimeconverter.org)
- **Issues**: [GitHub Issues](https://github.com/saurabhsiroya/epoch-converter/issues)
- **Email**: saurabhs619@gmail.com

## 🎯 Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced API analytics dashboard
- [ ] Custom timezone creation
- [ ] Webhook notifications
- [ ] Enterprise SSO integration
- [ ] Mobile app development

## 🏆 Why Choose This Converter?

- **Most Comprehensive** - More features than any other online converter
- **Developer Friendly** - Built by developers, for developers
- **Always Free** - Core features will always be free
- **Open Source** - Transparent and community-driven
- **Production Ready** - Enterprise-grade reliability

---

**Built with ❤️ for the developer community**

[![GitHub stars](https://img.shields.io/github/stars/saurabhsiroya/epoch-converter?style=social)](https://github.com/saurabhsiroya/epoch-converter)
[![GitHub forks](https://img.shields.io/github/forks/saurabhsiroya/epoch-converter?style=social)](https://github.com/saurabhsiroya/epoch-converter)
[![GitHub issues](https://img.shields.io/github/issues/saurabhsiroya/epoch-converter)](https://github.com/saurabhsiroya/epoch-converter/issues)
[![GitHub license](https://img.shields.io/github/license/saurabhsiroya/epoch-converter)](https://github.com/saurabhsiroya/epoch-converter/blob/main/LICENSE)

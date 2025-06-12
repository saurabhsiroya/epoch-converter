# Production Setup Guide - Epoch Time Converter

## Overview
This guide will help you set up the Epoch Time Converter for production use with real Stripe payments, user authentication, and API functionality.

## 🚀 Quick Start

### 1. Frontend Deployment
The frontend is already production-ready and can be deployed to any static hosting service:

- **Netlify**: Automatic deployment from GitHub
- **Vercel**: Zero-config deployment
- **AWS S3 + CloudFront**: Enterprise-grade hosting
- **Any CDN**: Build and upload `dist` folder

### 2. Backend Setup (Required for Real Payments)

#### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account
- Domain with SSL certificate

#### Database Setup
```sql
-- Run the migration script
psql -d your_database < backend/migrations/001_initial_schema.sql
```

#### Environment Variables
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/epoch_converter
JWT_SECRET=your_super_secure_jwt_secret_here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
PORT=3001
NODE_ENV=production
CORS_ORIGINS=https://www.epochtimeconverter.org

# Frontend (.env)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
VITE_API_BASE_URL=https://api.epochtimeconverter.org
```

#### Deploy Backend
```bash
# Install dependencies
cd backend
npm install

# Start production server
npm start
```

### 3. Stripe Configuration

#### Create Products
1. **Pro Plan**: $15/month recurring
   - Product ID: `prod_pro`
   - Price ID: `price_pro_monthly`

2. **Enterprise Plan**: $99/month recurring
   - Product ID: `prod_enterprise`
   - Price ID: `price_enterprise_monthly`

#### Webhook Setup
1. Add webhook endpoint: `https://api.epochtimeconverter.org/webhooks/stripe`
2. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 🔧 Architecture

### Frontend (React + TypeScript)
- **Authentication**: JWT-based with localStorage
- **Payments**: Stripe Checkout integration
- **API**: RESTful API client with rate limiting
- **State**: React Context for user management

### Backend (Node.js + Express)
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT tokens with bcrypt password hashing
- **Payments**: Stripe webhooks for subscription management
- **API**: Rate-limited endpoints with usage tracking

### Database Schema
```sql
users (
  id, email, password_hash, plan, api_key,
  stripe_customer_id, subscription_id, requests_count
)

subscriptions (
  id, user_id, stripe_subscription_id, status,
  current_period_start, current_period_end
)

api_usage (
  id, user_id, endpoint, requests_count,
  period_start, period_end
)
```

## 🛡️ Security Features

### Authentication
- ✅ Secure password hashing (bcrypt)
- ✅ JWT tokens with expiration
- ✅ API key authentication
- ✅ Rate limiting per user plan

### Payment Security
- ✅ Stripe PCI compliance
- ✅ Webhook signature verification
- ✅ Secure customer data handling
- ✅ Subscription status validation

### API Security
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection headers

## 📊 Features

### User Management
- ✅ Registration and login
- ✅ Email/password authentication
- ✅ API key generation
- ✅ Usage tracking and limits

### Payment Processing
- ✅ Stripe Checkout integration
- ✅ Subscription management
- ✅ Automatic plan upgrades/downgrades
- ✅ Webhook event processing

### API Functionality
- ✅ Timestamp conversion endpoints
- ✅ Batch processing
- ✅ Rate limiting by plan
- ✅ Usage analytics

### Frontend Features
- ✅ Real-time timestamp display
- ✅ Multiple conversion tools
- ✅ Dark/light theme
- ✅ Mobile responsive
- ✅ SEO optimized

## 🚦 Deployment Checklist

### Pre-Deployment
- [ ] Set up PostgreSQL database
- [ ] Configure Stripe products and webhooks
- [ ] Set all environment variables
- [ ] Test payment flow in Stripe test mode
- [ ] Verify API endpoints work correctly

### Production Deployment
- [ ] Deploy backend to production server
- [ ] Deploy frontend to CDN/hosting service
- [ ] Configure DNS and SSL certificates
- [ ] Switch Stripe to live mode
- [ ] Test complete user flow
- [ ] Monitor error logs and metrics

### Post-Deployment
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy
- [ ] Document API for users
- [ ] Set up customer support system

## 🔍 Testing

### Payment Testing
```bash
# Test cards (use in Stripe test mode)
4242 4242 4242 4242  # Successful payment
4000 0000 0000 0002  # Declined payment
4000 0025 0000 3155  # Requires authentication
```

### API Testing
```bash
# Register user
curl -X POST https://api.epochtimeconverter.org/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Convert timestamp
curl -X POST https://api.epochtimeconverter.org/convert/timestamp \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"timestamp":1672531200}'
```

## 📈 Monitoring

### Key Metrics
- User registrations and conversions
- API usage by plan
- Payment success/failure rates
- Server response times
- Error rates and types

### Recommended Tools
- **Application**: New Relic, DataDog
- **Infrastructure**: AWS CloudWatch, Grafana
- **Payments**: Stripe Dashboard
- **Uptime**: Pingdom, UptimeRobot

## 🆘 Support

### Documentation
- API documentation: Auto-generated from OpenAPI spec
- User guides: Built into the application
- Developer examples: Multiple programming languages

### Contact
- Technical support: saurabhs619@gmail.com
- GitHub issues: For bug reports and feature requests
- Stripe support: For payment-related issues

## 🎯 Next Steps

1. **Deploy to production** following this guide
2. **Test thoroughly** with real payments in test mode
3. **Go live** by switching to Stripe live mode
4. **Monitor and optimize** based on user feedback
5. **Scale infrastructure** as usage grows

---

**Your production-ready epoch converter with real payments is ready to launch! 🚀**
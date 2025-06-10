# Stripe Integration Setup Guide

## Overview
The Epoch Converter includes Stripe payment integration for API subscription plans. Here's how to set it up properly.

## ⚠️ Important: Demo vs Production

### Current State (Demo Mode)
- The application currently runs in **demo mode**
- No real payments are processed
- Users can "upgrade" plans but no actual charges occur
- Perfect for testing and demonstration

### For Production Use
You'll need to set up a real Stripe account and configure the integration.

## 🔧 Setting Up Stripe (For Production)

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" to create an account
3. Complete the registration process
4. Verify your business information

### Step 2: Get Your API Keys
1. Log into your Stripe Dashboard
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

### Step 3: Configure Environment Variables
Update your `.env` file with your actual Stripe keys:

```env
# Stripe Configuration (REQUIRED for real payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# Other optional configurations
VITE_API_BASE_URL=https://api.epochtimeconverter.org
API_SECRET_KEY=your_api_secret_key_here
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

### Step 4: Set Up Products in Stripe
1. In Stripe Dashboard, go to **Products**
2. Create products for each plan:

#### Pro Plan Product
- **Name**: "Epoch Converter Pro"
- **Price**: $15.00 USD
- **Billing**: Monthly recurring
- **Product ID**: Save this for your backend

#### Enterprise Plan Product
- **Name**: "Epoch Converter Enterprise"
- **Price**: $99.00 USD
- **Billing**: Monthly recurring
- **Product ID**: Save this for your backend

### Step 5: Configure Webhooks (For Backend)
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://your-api-domain.com/webhooks/stripe`
3. Select events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 🔄 Current Implementation Status

### What's Already Built
✅ **Frontend Payment UI** - Complete payment modals and user interface
✅ **Stripe Context** - React context for Stripe integration
✅ **User Authentication** - Login/register system with plan management
✅ **Plan Management** - Free, Pro, and Enterprise tiers
✅ **Usage Tracking** - API request limits and analytics
✅ **Payment Flow** - Complete checkout process (demo mode)

### What Needs Backend Implementation
❌ **Real Payment Processing** - Actual Stripe Checkout sessions
❌ **Webhook Handling** - Process subscription events
❌ **Database Integration** - Store user subscriptions and usage
❌ **API Authentication** - Validate API keys and rate limiting

## 🚀 Quick Start Options

### Option 1: Keep Demo Mode (Recommended for Testing)
- No Stripe account needed
- All features work except real payments
- Perfect for showcasing the application
- Users can test the complete flow

### Option 2: Enable Real Payments
1. Set up Stripe account (steps above)
2. Update environment variables
3. Implement backend API (see Backend Setup below)
4. Test with Stripe test cards

## 🛠 Backend Implementation (Required for Real Payments)

### API Endpoints Needed
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
GET  /api/user/profile      - Get user profile
POST /api/payments/checkout - Create Stripe checkout session
POST /api/webhooks/stripe   - Handle Stripe webhooks
GET  /api/convert          - Convert timestamps (with auth)
```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  plan VARCHAR DEFAULT 'free',
  stripe_customer_id VARCHAR,
  api_key VARCHAR UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  stripe_subscription_id VARCHAR UNIQUE,
  status VARCHAR NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- API Usage table
CREATE TABLE api_usage (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  requests_count INTEGER DEFAULT 0,
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🧪 Testing Stripe Integration

### Test Cards (Use in Test Mode)
```
# Successful payment
4242 4242 4242 4242

# Declined payment
4000 0000 0000 0002

# Requires authentication
4000 0025 0000 3155
```

### Test Flow
1. Create test products in Stripe
2. Use test API keys
3. Test subscription creation
4. Test webhook delivery
5. Verify user plan updates

## 💡 Deployment Considerations

### Environment Variables for Production
```env
# Production Stripe keys (live mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key

# Webhook endpoint secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database and API configuration
DATABASE_URL=your_production_database_url
API_SECRET_KEY=your_production_api_secret
JWT_SECRET=your_production_jwt_secret
```

### Security Checklist
- [ ] Use HTTPS for all payment pages
- [ ] Validate webhook signatures
- [ ] Store sensitive data securely
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable Stripe's fraud protection

## 📞 Support

### Stripe Support
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

### Project Support
- Email: saurabhs619@gmail.com
- GitHub Issues: [Create an issue](https://github.com/saurabhsiroya/epoch-converter/issues)

## 🎯 Next Steps

1. **For Demo/Testing**: Deploy as-is with demo mode
2. **For Production**: 
   - Set up Stripe account
   - Implement backend API
   - Configure webhooks
   - Test thoroughly before going live

---

**Note**: The current implementation provides a complete frontend experience. For real payments, you'll need to implement the backend components described above.
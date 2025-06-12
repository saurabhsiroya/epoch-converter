const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Rate limiting middleware
const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Get user's current usage
    const usageResult = await pool.query(
      'SELECT requests_count, plan FROM users WHERE id = $1',
      [userId]
    );
    
    if (usageResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { requests_count, plan } = usageResult.rows[0];
    const limits = { free: 1000, pro: 50000, enterprise: 500000 };
    
    if (requests_count >= limits[plan]) {
      return res.status(429).json({ 
        message: 'API limit exceeded',
        limit: limits[plan],
        current: requests_count
      });
    }
    
    // Increment usage
    await pool.query(
      'UPDATE users SET requests_count = requests_count + 1 WHERE id = $1',
      [userId]
    );
    
    next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Auth routes
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate API key
    const apiKey = 'ek_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, api_key, plan, requests_count, created_at) 
       VALUES ($1, $2, $3, 'free', 0, NOW()) 
       RETURNING id, email, plan, api_key, requests_count, created_at`,
      [email, hashedPassword, apiKey]
    );
    
    const user = result.rows[0];
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        apiKey: user.api_key,
        usage: {
          current: user.requests_count,
          limit: 1000,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, plan, api_key, requests_count, stripe_customer_id, created_at FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const limits = { free: 1000, pro: 50000, enterprise: 500000 };
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        plan: user.plan,
        apiKey: user.api_key,
        stripeCustomerId: user.stripe_customer_id,
        usage: {
          current: user.requests_count,
          limit: limits[user.plan],
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, plan, api_key, requests_count, stripe_customer_id, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = result.rows[0];
    const limits = { free: 1000, pro: 50000, enterprise: 500000 };
    
    res.json({
      id: user.id,
      email: user.email,
      plan: user.plan,
      apiKey: user.api_key,
      stripeCustomerId: user.stripe_customer_id,
      usage: {
        current: user.requests_count,
        limit: limits[user.plan],
        resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Conversion routes
app.post('/convert/timestamp', authenticateToken, rateLimiter, (req, res) => {
  try {
    const { timestamp } = req.body;
    const num = parseInt(timestamp);
    
    if (isNaN(num)) {
      return res.status(400).json({ message: 'Invalid timestamp' });
    }
    
    const date = num.toString().length > 10 ? new Date(num) : new Date(num * 1000);
    
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid timestamp' });
    }
    
    res.json({
      timestamp: num,
      date: date.toISOString(),
      formatted: date.toLocaleString(),
      utc: date.toUTCString(),
      relative: getRelativeTime(date)
    });
  } catch (error) {
    console.error('Timestamp conversion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/convert/date', authenticateToken, rateLimiter, (req, res) => {
  try {
    const { date: dateString, timezone } = req.body;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date' });
    }
    
    res.json({
      date: dateString,
      timestamp: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
      iso: date.toISOString()
    });
  } catch (error) {
    console.error('Date conversion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/convert/batch', authenticateToken, rateLimiter, (req, res) => {
  try {
    const { timestamps } = req.body;
    
    if (!Array.isArray(timestamps)) {
      return res.status(400).json({ message: 'Timestamps must be an array' });
    }
    
    const results = timestamps.map(timestamp => {
      try {
        const num = parseInt(timestamp);
        if (isNaN(num)) {
          return { input: timestamp, error: 'Invalid number' };
        }
        
        const date = num.toString().length > 10 ? new Date(num) : new Date(num * 1000);
        if (isNaN(date.getTime())) {
          return { input: timestamp, error: 'Invalid timestamp' };
        }
        
        return {
          input: timestamp,
          timestamp: num,
          date: date.toISOString(),
          formatted: date.toLocaleString()
        };
      } catch (err) {
        return { input: timestamp, error: 'Processing error' };
      }
    });
    
    res.json({ results });
  } catch (error) {
    console.error('Batch conversion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/convert/current', authenticateToken, rateLimiter, (req, res) => {
  try {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    
    res.json({
      timestamp,
      milliseconds: now.getTime(),
      iso: now.toISOString(),
      formatted: now.toLocaleString()
    });
  } catch (error) {
    console.error('Current timestamp error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Payment routes
app.post('/payments/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    const userId = req.user.id;
    
    // Get or create Stripe customer
    let customerId;
    const userResult = await pool.query(
      'SELECT stripe_customer_id FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows[0].stripe_customer_id) {
      customerId = userResult.rows[0].stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: req.user.email,
        metadata: { userId }
      });
      
      customerId = customer.id;
      await pool.query(
        'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
        [customerId, userId]
      );
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId }
    });
    
    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
});

// Stripe webhook
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Get price to determine plan
        const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
        let plan = 'free';
        
        if (price.id === 'price_pro_monthly') plan = 'pro';
        if (price.id === 'price_enterprise_monthly') plan = 'enterprise';
        
        // Update user plan
        await pool.query(
          'UPDATE users SET plan = $1, subscription_id = $2, subscription_status = $3 WHERE stripe_customer_id = $4',
          [plan, subscription.id, subscription.status, customerId]
        );
        break;
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        await pool.query(
          'UPDATE users SET plan = $1, subscription_status = $2 WHERE stripe_customer_id = $3',
          ['free', 'canceled', deletedSubscription.customer]
        );
        break;
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// Utility functions
function getRelativeTime(date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffMins) < 1) return 'Just now';
  if (Math.abs(diffMins) < 60) return `${Math.abs(diffMins)} minutes ${diffMs > 0 ? 'ago' : 'from now'}`;
  if (Math.abs(diffHours) < 24) return `${Math.abs(diffHours)} hours ${diffMs > 0 ? 'ago' : 'from now'}`;
  return `${Math.abs(diffDays)} days ${diffMs > 0 ? 'ago' : 'from now'}`;
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// Get subscription status for a customer
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId } = req.query;
    
    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }
    
    // Get all subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.plan'],
    });

    if (subscriptions.data.length === 0) {
      return res.status(200).json({ 
        active: false,
        plan: 'free',
        message: 'No active subscription found'
      });
    }

    // Get the most recent active subscription
    const subscription = subscriptions.data[0];
    
    res.status(200).json({
      active: true,
      subscriptionId: subscription.id,
      plan: subscription.metadata.plan || 'pro', // Default to 'pro' if not specified
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: error.message });
  }
}


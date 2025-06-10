// Stripe webhook handler
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  try {
    // Verify the webhook signature
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } else {
      // For development without webhook signature verification
      event = req.body;
    }
    
    // Handle specific webhook events
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful checkout
        console.log('Checkout completed:', session.id);
        // Here you would update your database to record the subscription
        break;
        
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        // Handle subscription changes
        console.log('Subscription updated:', subscription.id);
        // Here you would update your database with subscription status
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
}


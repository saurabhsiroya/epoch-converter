// Stripe customer portal session creation
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId, returnUrl } = req.body;
    
    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || 'https://epochtimeconverter.org/account',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Customer portal error:', error);
    res.status(500).json({ error: error.message });
  }
}


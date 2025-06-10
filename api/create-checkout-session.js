// Stripe checkout session creation endpoint
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const { priceId, plan, successUrl, cancelUrl } = req.body;
    
    // Set default URLs if not provided
    const success = successUrl || 'https://epochtimeconverter.org/success';
    const cancel = cancelUrl || 'https://epochtimeconverter.org/cancel';
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Epoch Converter ${plan} Plan`,
              description: plan === 'Pro' ? 
                'Advanced features and API access' : 
                'Unlimited access and priority support',
            },
            unit_amount: plan === 'Pro' ? 1500 : 9900, // $15 or $99
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${success}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel,
      metadata: {
        plan: plan,
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
}


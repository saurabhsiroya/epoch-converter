import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key_not_configured';

// Load Stripe with the publishable key
const stripePromise = loadStripe(stripePublishableKey);

interface StripeContextType {
  stripe: Promise<Stripe | null>;
  isConfigured: boolean;
  customerPortal: (customerId: string) => Promise<string | null>;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

export const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if Stripe is properly configured
  const isConfigured = stripePublishableKey !== 'pk_test_demo_key_not_configured' && 
                      stripePublishableKey.startsWith('pk_');
  
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize Stripe
    if (isConfigured) {
      stripePromise.then(() => {
        setInitialized(true);
        console.log('Stripe initialized successfully');
      }).catch(err => {
        console.error('Failed to initialize Stripe:', err);
      });
    } else {
      console.warn('Stripe is not configured. Running in demo mode.');
      setInitialized(true);
    }
  }, [isConfigured]);

  // Function to redirect to customer portal
  const customerPortal = async (customerId: string): Promise<string | null> => {
    if (!isConfigured) {
      console.warn('Stripe is not configured. Cannot access customer portal.');
      return null;
    }

    try {
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl: window.location.origin + '/account',
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      return url;
    } catch (err) {
      console.error('Customer portal error:', err);
      return null;
    }
  };

  return (
    <StripeContext.Provider value={{ stripe: stripePromise, isConfigured, customerPortal }}>
      {children}
    </StripeContext.Provider>
  );
};

export default StripeContext;


import React, { createContext, useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
// If not provided, use a demo key that won't process real payments
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key_not_configured';

// Load Stripe with the publishable key
const stripePromise = loadStripe(stripePublishableKey);

interface StripeContextType {
  stripe: Promise<Stripe | null>;
  isConfigured: boolean;
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

  return (
    <StripeContext.Provider value={{ 
      stripe: stripePromise, 
      isConfigured 
    }}>
      {children}
    </StripeContext.Provider>
  );
};
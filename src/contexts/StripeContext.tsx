import React, { createContext, useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Use environment variable for Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key');

interface StripeContextType {
  stripe: Promise<Stripe | null>;
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
  return (
    <StripeContext.Provider value={{ stripe: stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
};
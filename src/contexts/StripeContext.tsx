import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StripeContextType {
  isLoading: boolean;
  createCheckoutSession: (priceId: string) => Promise<string | null>;
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export const StripeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createCheckoutSession = async (priceId: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }
      
      setIsLoading(false);
      return data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setIsLoading(false);
      return null;
    }
  };

  return (
    <StripeContext.Provider value={{ isLoading, createCheckoutSession, isSuccess, setIsSuccess }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = (): StripeContextType => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { useStripe } from '../contexts/StripeContext';
import { X, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'Pro' | 'Enterprise';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const { stripe, isConfigured } = useStripe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call our backend API to create a Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel',
        }),
      });

      const { url, sessionId, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else if (sessionId && stripe) {
        // Alternative: Use Stripe.js to redirect
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  // Demo mode fallback if Stripe is not configured
  const handleDemoCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onClose();
        // Reset after closing
        setTimeout(() => setSuccess(false), 500);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {success ? 'Success!' : `Upgrade to ${plan}`}
          </h2>
          
          {success ? (
            <p className="text-green-600 dark:text-green-400">
              Your subscription has been activated!
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {plan === 'Pro' 
                ? 'Get advanced features and API access' 
                : 'Unlimited access and priority support'}
            </p>
          )}
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Thank you for your subscription!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              You now have access to all {plan} features.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">Plan</span>
                <span className="font-medium text-gray-900 dark:text-white">{plan}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">Price</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${plan === 'Pro' ? '15' : '99'}/month
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">Billing</span>
                <span className="font-medium text-gray-900 dark:text-white">Monthly</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={isConfigured ? handleCheckout : handleDemoCheckout}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium ${
                loading 
                  ? 'bg-blue-400 dark:bg-blue-700 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  {isConfigured ? 'Proceed to Payment' : 'Simulate Payment (Demo)'}
                </span>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Secure payment processing by Stripe. You can cancel anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;


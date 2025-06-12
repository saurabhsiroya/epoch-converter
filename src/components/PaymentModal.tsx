import React, { useState } from 'react';
import { X, Check, Zap, Building, AlertCircle, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: 'pro' | 'enterprise';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, selectedPlan = 'pro' }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const plans = {
    pro: {
      name: 'Pro',
      price: 15,
      priceId: 'price_pro_monthly',
      requests: '50,000',
      icon: Zap,
      features: [
        '50,000 API requests/month',
        'Priority support',
        'Advanced analytics',
        'Custom rate limits',
        'Webhook notifications'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 99,
      priceId: 'price_enterprise_monthly',
      requests: '500,000',
      icon: Building,
      features: [
        '500,000 API requests/month',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'White-label options',
        'Custom endpoints'
      ]
    }
  };

  const plan = plans[selectedPlan];
  const Icon = plan.icon;

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Demo mode - simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Upgrade Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to {plan.name}! Your account has been upgraded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Upgrade to {plan.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Configuration Status */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Demo Mode</h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                This is a demonstration - no real payment will be processed. 
                See documentation for configuration instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name} Plan</h3>
              <p className="text-gray-600 dark:text-gray-400">{plan.requests} requests/month</p>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ${plan.price}<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span>
          </div>

          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Billing Summary */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Billing Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{plan.name} Plan (Monthly)</span>
              <span className="text-gray-900 dark:text-white">${plan.price}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-white">Calculated at checkout</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-gray-900 dark:text-white">${plan.price}.00/month</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            {loading ? 'Processing...' : `Demo: Upgrade to ${plan.name}`}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Demo mode - no real charges will be made
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          This is a demonstration. In production, payments would be processed securely through Stripe.
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
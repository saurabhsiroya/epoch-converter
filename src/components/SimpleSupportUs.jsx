import React, { useState } from 'react';
import { Heart, Coffee, CreditCard } from 'lucide-react';

// Simplified payment modal that doesn't rely on Stripe context
const SimplePaymentModal = ({ isOpen, onClose, plan }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDemoPayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      // Close modal after showing success
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
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

            <button
              onClick={handleDemoPayment}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Complete Payment (Demo)
                </span>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Secure payment processing. You can cancel anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const SupportUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 rounded-xl my-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Support Epoch Converter</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Help us keep this tool free, up-to-date, and ad-light by supporting our work through subscriptions or donations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Pro Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro Plan</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$15</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  API access (10,000 requests/day)
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Batch conversion (up to 10,000 timestamps)
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced timezone features
                </li>
              </ul>
              <button
                onClick={() => handleOpenModal('Pro')}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-blue-500 dark:border-blue-400 transition-transform hover:scale-105">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/30">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Enterprise Plan</h3>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">Popular</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$99</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Everything in Pro plan
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited API requests
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integration assistance
                </li>
              </ul>
              <button
                onClick={() => handleOpenModal('Enterprise')}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Get Enterprise
              </button>
            </div>
          </div>
        </div>

        {/* One-time donation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <Coffee className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Buy us a coffee</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Prefer a one-time donation? Support our work with any amount you choose.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => handleOpenModal('Donation')}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $5
            </button>
            <button 
              onClick={() => handleOpenModal('Donation')}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $10
            </button>
            <button 
              onClick={() => handleOpenModal('Donation')}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $25
            </button>
            <button 
              onClick={() => handleOpenModal('Donation')}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              Custom
            </button>
          </div>
        </div>
      </div>

      {/* Simplified Payment Modal */}
      <SimplePaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        plan={selectedPlan} 
      />
    </section>
  );
};

export default SupportUs;


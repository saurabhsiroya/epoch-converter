import React, { useState } from 'react';
import { Heart, Coffee, CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';

const SupportUs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Pro' | 'Enterprise'>('Pro');

  const handleOpenModal = (plan: 'Pro' | 'Enterprise') => {
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
            <button className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $5
            </button>
            <button className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $10
            </button>
            <button className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              $25
            </button>
            <button className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              Custom
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        plan={selectedPlan} 
      />
    </section>
  );
};

export default SupportUs;


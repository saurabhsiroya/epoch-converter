import React, { useState } from 'react';
import { Heart, Coffee, Star, Gift, Check, X } from 'lucide-react';

const SupportUs: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);

  const predefinedAmounts = [
    { amount: 5, label: 'Buy us a coffee', icon: Coffee, description: 'Support our hosting costs' },
    { amount: 15, label: 'Sponsor a feature', icon: Star, description: 'Help us add new tools' },
    { amount: 50, label: 'Premium supporter', icon: Gift, description: 'Become a premium supporter' },
  ];

  const handleDonation = async (amount: number) => {
    setLoading(true);
    
    try {
      // In a real implementation, this would create a Stripe Checkout session
      // For demo purposes, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setSelectedAmount(null);
        setCustomAmount('');
      }, 3000);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomDonation = () => {
    const amount = parseFloat(customAmount);
    if (amount && amount >= 1) {
      handleDonation(amount);
    }
  };

  if (showThankYou) {
    return (
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-8 mb-12 transition-colors">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-2">
            Thank You! 🎉
          </h2>
          <p className="text-green-700 dark:text-green-400 text-lg">
            Your support means the world to us and helps keep this tool free for everyone!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 p-8 mb-12 transition-colors">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-red-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Support Our Work</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          This epoch converter is completely free and always will be. If you find it useful, 
          consider supporting us to help cover hosting costs and fund new features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {predefinedAmounts.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.amount}
              className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedAmount === option.amount
                  ? 'border-purple-500 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-800'
                  : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600'
              }`}
              onClick={() => setSelectedAmount(option.amount)}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  ${option.amount}
                </h3>
                <p className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                  {option.label}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
              {selectedAmount === option.amount && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Custom Amount</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleCustomDonation}
            disabled={!customAmount || parseFloat(customAmount) < 1 || loading}
            className="px-6 py-3 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </div>
      </div>

      {selectedAmount && (
        <div className="text-center">
          <button
            onClick={() => handleDonation(selectedAmount)}
            disabled={loading}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="h-5 w-5 mr-2" />
            {loading ? 'Processing Payment...' : `Support with $${selectedAmount}`}
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Payments are processed securely through Stripe. We never store your payment information.
        </p>
      </div>
    </section>
  );
};

export default SupportUs;
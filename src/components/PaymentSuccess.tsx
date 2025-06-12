import React from 'react';
import { Check, ArrowRight, Crown } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Welcome to Pro! Your subscription is now active and you have access to all premium features.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Pro Plan Active
            </h3>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• 50,000 API requests per month</p>
            <p>• Priority support</p>
            <p>• Advanced analytics</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Start Using Your API
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can manage your subscription anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
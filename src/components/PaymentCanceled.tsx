import React from 'react';
import { X, ArrowLeft, CreditCard } from 'lucide-react';

const PaymentCanceled: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Canceled
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your payment was canceled. No charges were made to your account. You can try again anytime.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Still want to upgrade?
          </h3>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            You can upgrade your plan anytime from your dashboard to unlock premium features and higher API limits.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Converter
          </button>
          
          <button
            onClick={() => window.location.href = '/#api'}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-medium"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Try Payment Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
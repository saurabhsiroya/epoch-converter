import React from 'react';
import { useStripe } from '../contexts/StripeContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId: string;
  planName: string;
  planPrice: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  priceId,
  planName,
  planPrice
}) => {
  const { isLoading, createCheckoutSession, isSuccess, setIsSuccess } = useStripe();

  const handleCheckout = async () => {
    const checkoutUrl = await createCheckoutSession(priceId);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upgrade to {planName}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="mb-6">Thank you for your support!</p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="mb-4">Upgrade to our {planName} plan and get access to:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Advanced time conversion features</li>
                <li>API access with higher rate limits</li>
                <li>Priority support</li>
                <li>No advertisements</li>
              </ul>
              <p className="font-bold">{planPrice}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="mr-4 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                 ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;

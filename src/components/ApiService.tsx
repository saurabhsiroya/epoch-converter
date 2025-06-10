import React, { useState } from 'react';
import { Key, Zap, Crown, Building, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import PaymentModal from './PaymentModal';
import UserDashboard from './UserDashboard';

const ApiService: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      requests: '1K',
      icon: Users,
      features: ['1,000 requests/month', 'Basic support', 'Community access'],
      buttonText: 'Current Plan',
      buttonAction: () => {},
      disabled: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 15,
      requests: '50K',
      icon: Zap,
      features: ['50,000 requests/month', 'Priority support', 'Advanced analytics'],
      buttonText: 'Upgrade to Pro',
      buttonAction: () => {
        setSelectedPlan('pro');
        if (isAuthenticated) {
          setShowPaymentModal(true);
        } else {
          setShowAuthModal(true);
        }
      },
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      requests: '500K',
      icon: Building,
      features: ['500,000 requests/month', 'Dedicated support', 'SLA guarantee'],
      buttonText: 'Contact Sales',
      buttonAction: () => {
        setSelectedPlan('enterprise');
        if (isAuthenticated) {
          setShowPaymentModal(true);
        } else {
          setShowAuthModal(true);
        }
      }
    }
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mr-4">
              <Key className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Access</h2>
              <p className="text-gray-600 dark:text-gray-400">Integrate epoch conversion into your apps</p>
            </div>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowDashboard(true)}
              className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.plan === plan.id;
            
            return (
              <div 
                key={plan.id}
                className={`relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                  plan.popular 
                    ? 'border-purple-500 dark:border-purple-400 shadow-lg transform scale-105' 
                    : 'border-gray-200 dark:border-gray-600'
                } ${isCurrentPlan ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-600 dark:bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  
                  <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-6">
                    {plan.requests} requests
                  </div>

                  <ul className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={plan.buttonAction}
                    disabled={plan.disabled || isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      isCurrentPlan
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 cursor-default'
                        : plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    } ${plan.disabled && !isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isCurrentPlan ? 'Current Plan' : plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* API Example */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Quick Start Example
          </h4>
          <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-600 overflow-x-auto">
{`curl -X GET "https://api.epochtimeconverter.org/convert" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"timestamp": 1672531200}'`}
          </pre>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <Key className="h-5 w-5 mr-2" />
              Get Started with API Access
            </button>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
      
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
      />

      <UserDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)}
      />
    </>
  );
};

export default ApiService;
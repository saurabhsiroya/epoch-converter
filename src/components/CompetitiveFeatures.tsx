import React, { useState } from 'react';
import { Zap, Database, Globe, Code, Smartphone, Shield } from 'lucide-react';

const CompetitiveFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Optimized algorithms for instant conversions',
      details: 'Our converter processes timestamps in under 10ms, making it the fastest online tool available.',
      color: 'yellow'
    },
    {
      icon: Database,
      title: 'Bulk Processing',
      description: 'Convert thousands of timestamps at once',
      details: 'Upload CSV files or paste large datasets for batch conversion with progress tracking.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Global Timezone Support',
      description: '500+ timezones with DST handling',
      details: 'Comprehensive timezone database with automatic daylight saving time adjustments.',
      color: 'green'
    },
    {
      icon: Code,
      title: 'Developer API',
      description: 'RESTful API with authentication',
      details: 'Professional API with rate limiting, usage analytics, and comprehensive documentation.',
      color: 'purple'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on all devices',
      details: 'Responsive design that works flawlessly on phones, tablets, and desktops.',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No data collection or tracking',
      details: 'All conversions happen client-side. We never store or track your data.',
      color: 'indigo'
    }
  ];

  const colorClasses = {
    yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20',
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/20',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/20'
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-12 transition-colors">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Our Epoch Converter?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          We've built the most comprehensive and user-friendly epoch time converter available online.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = activeFeature === index;
          
          return (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                isActive
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <div className="flex items-start">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClasses[features[activeFeature].color as keyof typeof colorClasses]}`}>
            {React.createElement(features[activeFeature].icon, { className: "h-6 w-6" })}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {features[activeFeature].title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {features[activeFeature].details}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg shadow-lg">
          <span className="font-medium">100% Free • No Registration Required • Always Available</span>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveFeatures;
import React, { useState } from 'react';
import { Clock, Calendar, Globe, CalendarDays } from 'lucide-react';
import TimestampConverter from './TimestampConverter';
import DateConverter from './DateConverter';
import WeekConverter from './WeekConverter';
import TimezoneConverter from './TimezoneConverter';

type ConverterTab = 'timestamp' | 'date' | 'week' | 'timezone';

const MainConverters: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConverterTab>('timestamp');

  const tabs = [
    {
      id: 'timestamp' as ConverterTab,
      name: 'Timestamp to Date',
      icon: Clock,
      description: 'Convert Unix timestamps to human-readable dates'
    },
    {
      id: 'date' as ConverterTab,
      name: 'Date to Timestamp',
      icon: Calendar,
      description: 'Convert dates to Unix timestamps'
    },
    {
      id: 'week' as ConverterTab,
      name: 'Week Numbers',
      icon: CalendarDays,
      description: 'Find ISO week numbers for dates'
    },
    {
      id: 'timezone' as ConverterTab,
      name: 'Timezone Converter',
      icon: Globe,
      description: 'Convert timestamps across timezones'
    }
  ];

  const renderConverter = () => {
    switch (activeTab) {
      case 'timestamp':
        return <TimestampConverter />;
      case 'date':
        return <DateConverter />;
      case 'week':
        return <WeekConverter />;
      case 'timezone':
        return <TimezoneConverter />;
      default:
        return <TimestampConverter />;
    }
  };

  return (
    <div className="mb-12">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Conversion Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  activeTab === tab.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Icon className={`h-5 w-5 mr-2 ${
                    activeTab === tab.id 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    activeTab === tab.id 
                      ? 'text-blue-900 dark:text-blue-300' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {tab.name}
                  </span>
                </div>
                <p className={`text-sm ${
                  activeTab === tab.id 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Converter */}
      <div id="converter">
        {renderConverter()}
      </div>
    </div>
  );
};

export default MainConverters;
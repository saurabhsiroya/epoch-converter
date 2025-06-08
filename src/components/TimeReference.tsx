import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

const TimeReference: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const timeIntervals = [
    { name: '1 second', value: '1 sec', seconds: 1 },
    { name: '1 minute', value: '60 sec', seconds: 60 },
    { name: '1 hour', value: '3,600 sec', seconds: 3600 },
    { name: '1 day', value: '86,400 sec', seconds: 86400 },
    { name: '1 week', value: '604,800 sec', seconds: 604800 },
    { name: '1 month (30.44 days)', value: '2,629,743 sec', seconds: 2629743 },
    { name: '1 year (365.24 days)', value: '31,556,926 sec', seconds: 31556926 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
      >
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Time Reference</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Common time intervals in seconds</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeIntervals.map((interval, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{interval.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{interval.value}</div>
                  </div>
                  <div className="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
                    {interval.seconds.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeReference;
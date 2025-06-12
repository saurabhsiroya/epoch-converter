import React, { useState, useEffect } from 'react';
import { Calendar, Copy, CheckCircle } from 'lucide-react';

const EpochDates: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getEpochDates = () => {
    const now = currentTime;
    
    // Start of day
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    // End of day
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Start of month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // End of month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    
    // Start of year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    
    // End of year
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    return [
      {
        name: 'Start of Day',
        timestamp: Math.floor(startOfDay.getTime() / 1000),
        id: 'start-day'
      },
      {
        name: 'End of Day',
        timestamp: Math.floor(endOfDay.getTime() / 1000),
        id: 'end-day'
      },
      {
        name: 'Start of Month',
        timestamp: Math.floor(startOfMonth.getTime() / 1000),
        id: 'start-month'
      },
      {
        name: 'End of Month',
        timestamp: Math.floor(endOfMonth.getTime() / 1000),
        id: 'end-month'
      },
      {
        name: 'Start of Year',
        timestamp: Math.floor(startOfYear.getTime() / 1000),
        id: 'start-year'
      },
      {
        name: 'End of Year',
        timestamp: Math.floor(endOfYear.getTime() / 1000),
        id: 'end-year'
      }
    ];
  };

  const epochDates = getEpochDates();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Epoch Dates for Today</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Start and end timestamps for current periods</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {epochDates.map((item) => (
            <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                  <div className="text-lg font-mono font-bold text-teal-600 dark:text-teal-400">
                    {item.timestamp}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.timestamp.toString(), item.id)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all"
                  title="Copy timestamp"
                >
                  {copied === item.id ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpochDates;
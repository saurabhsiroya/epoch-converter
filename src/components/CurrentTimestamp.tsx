import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const CurrentTimestamp: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState<'timestamp' | 'iso' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async (text: string, type: 'timestamp' | 'iso') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const timestamp = Math.floor(currentTime.getTime() / 1000);
  const isoString = currentTime.toISOString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8 max-w-4xl mx-auto transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Current Unix Epoch
      </h2>
      
      <div className="text-center mb-6">
        <div className="text-6xl md:text-8xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-4">
          {timestamp}
        </div>
        <button
          onClick={() => copyToClipboard(timestamp.toString(), 'timestamp')}
          className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          {copied === 'timestamp' ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          Copy Timestamp
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Live timestamp updating every second • Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-200">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} at {currentTime.toLocaleTimeString('en-US')}
        </p>
      </div>
    </div>
  );
};

export default CurrentTimestamp;
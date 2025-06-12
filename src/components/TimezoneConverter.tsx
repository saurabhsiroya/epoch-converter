import React, { useState } from 'react';
import { Globe, Copy, CheckCircle } from 'lucide-react';

const TimezoneConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState('');

  const popularTimezones = [
    { name: 'UTC', offset: 'UTC+0', zone: 'UTC' },
    { name: 'Eastern Time', offset: 'UTC-5/-4', zone: 'America/New_York' },
    { name: 'Central Time', offset: 'UTC-6/-5', zone: 'America/Chicago' },
    { name: 'Mountain Time', offset: 'UTC-7/-6', zone: 'America/Denver' },
    { name: 'Pacific Time', offset: 'UTC-8/-7', zone: 'America/Los_Angeles' },
    { name: 'London', offset: 'UTC+0/+1', zone: 'Europe/London' },
    { name: 'Paris', offset: 'UTC+1/+2', zone: 'Europe/Paris' },
    { name: 'Tokyo', offset: 'UTC+9', zone: 'Asia/Tokyo' },
    { name: 'Sydney', offset: 'UTC+10/+11', zone: 'Australia/Sydney' },
    { name: 'Mumbai', offset: 'UTC+5:30', zone: 'Asia/Kolkata' },
    { name: 'Dubai', offset: 'UTC+4', zone: 'Asia/Dubai' },
    { name: 'Singapore', offset: 'UTC+8', zone: 'Asia/Singapore' }
  ];

  const convertToTimezones = () => {
    try {
      setError('');
      const num = parseInt(timestamp);
      
      if (isNaN(num)) {
        setError('Please enter a valid timestamp');
        setResults([]);
        return;
      }

      const date = num.toString().length > 10 ? new Date(num) : new Date(num * 1000);
      
      if (isNaN(date.getTime())) {
        setError('Invalid timestamp');
        setResults([]);
        return;
      }

      const timezoneResults = popularTimezones.map(tz => {
        try {
          const formatted = date.toLocaleString('en-US', {
            timeZone: tz.zone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });
          
          return {
            name: tz.name,
            offset: tz.offset,
            zone: tz.zone,
            formatted,
            iso: date.toLocaleString('sv-SE', { timeZone: tz.zone }).replace(' ', 'T')
          };
        } catch (err) {
          return {
            name: tz.name,
            offset: tz.offset,
            zone: tz.zone,
            formatted: 'Error',
            iso: 'Error'
          };
        }
      });

      setResults(timezoneResults);
    } catch (err) {
      setError('Error converting timestamp');
      setResults([]);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const setCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Timezone Converter</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="timezone-timestamp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Unix Timestamp
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="timezone-timestamp"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="e.g., 1672531200"
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={setCurrentTimestamp}
              className="px-4 py-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors whitespace-nowrap"
            >
              Current
            </button>
          </div>
        </div>

        <button
          onClick={convertToTimezones}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium"
        >
          Convert to All Timezones
        </button>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Timezone Conversions
            </h3>
            <div className="grid gap-3">
              {results.map((result, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{result.name}</h4>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          {result.offset}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">{result.formatted}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{result.zone}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(result.formatted, `${index}-formatted`)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                      title="Copy formatted time"
                    >
                      {copied === `${index}-formatted` ? (
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
        )}
      </div>
    </div>
  );
};

export default TimezoneConverter;
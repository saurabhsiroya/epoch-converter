import React, { useState } from 'react';
import { Copy, CheckCircle, Clock } from 'lucide-react';

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convertTimestamp = () => {
    try {
      setError('');
      const num = parseInt(timestamp);
      
      if (isNaN(num)) {
        setError('Please enter a valid number');
        setResult('');
        return;
      }

      // Handle both seconds and milliseconds
      const date = num.toString().length > 10 ? new Date(num) : new Date(num * 1000);
      
      if (isNaN(date.getTime())) {
        setError('Invalid timestamp');
        setResult('');
        return;
      }

      const formatted = {
        local: date.toLocaleString(),
        utc: date.toUTCString(),
        iso: date.toISOString(),
        relative: getRelativeTime(date)
      };

      setResult(JSON.stringify(formatted, null, 2));
    } catch (err) {
      setError('Error converting timestamp');
      setResult('');
    }
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (Math.abs(diffMins) < 1) return 'Just now';
    if (Math.abs(diffMins) < 60) return `${Math.abs(diffMins)} minutes ${diffMs > 0 ? 'ago' : 'from now'}`;
    if (Math.abs(diffHours) < 24) return `${Math.abs(diffHours)} hours ${diffMs > 0 ? 'ago' : 'from now'}`;
    return `${Math.abs(diffDays)} days ${diffMs > 0 ? 'ago' : 'from now'}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePresetTimestamp = (preset: string) => {
    setTimestamp(preset);
    setError('');
  };

  return (
    <div id="converter" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Epoch to Human Date</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter timestamp (e.g., 1704067200)
          </label>
          <input
            type="text"
            id="timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g., 1672531200 or 1672531200000"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports: 10-digit (seconds), 13-digit (milliseconds), 16-digit (microseconds)
          </p>
        </div>

        {/* Preset Timestamps */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePresetTimestamp(Math.floor(Date.now() / 1000).toString())}
            className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Now (seconds)
          </button>
          <button
            onClick={() => handlePresetTimestamp(Date.now().toString())}
            className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Now (milliseconds)
          </button>
          <button
            onClick={() => handlePresetTimestamp('0')}
            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Epoch Start (0)
          </button>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Auto-detect</option>
            </select>
          </div>
          <button
            onClick={convertTimestamp}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
          >
            Convert to Date
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Converted Date</h3>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                title="Copy result"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600 overflow-x-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimestampConverter;
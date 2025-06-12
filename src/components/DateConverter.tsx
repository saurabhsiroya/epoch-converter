import React, { useState } from 'react';
import { Copy, CheckCircle, Calendar } from 'lucide-react';

const DateConverter: React.FC = () => {
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [timezone, setTimezone] = useState('local');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convertDate = () => {
    try {
      setError('');
      
      if (!dateInput) {
        setError('Please enter a date');
        setResult('');
        return;
      }

      const dateTimeString = timeInput ? `${dateInput}T${timeInput}` : dateInput;
      let date: Date;

      if (timezone === 'utc') {
        date = new Date(dateTimeString + 'Z');
      } else {
        date = new Date(dateTimeString);
      }

      if (isNaN(date.getTime())) {
        setError('Invalid date format');
        setResult('');
        return;
      }

      const timestamps = {
        seconds: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
        iso: date.toISOString(),
        utc: date.toUTCString()
      };

      setResult(JSON.stringify(timestamps, null, 2));
    } catch (err) {
      setError('Error converting date');
      setResult('');
    }
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

  const setCurrentDateTime = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    setDateInput(dateStr);
    setTimeInput(timeStr);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Date to Epoch</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter date (e.g., 2024-01-01 or Jan 1, 2024)
          </label>
          <input
            type="date"
            id="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Formats: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, Jan 1 2024, January 1, 2024
          </p>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time (optional)
          </label>
          <input
            type="time"
            id="time"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="local">Local Time</option>
            <option value="utc">UTC</option>
          </select>
        </div>

        <button
          onClick={setCurrentDateTime}
          className="text-sm px-3 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
        >
          Use Current Date & Time
        </button>

        <div className="flex space-x-2">
          <div className="flex-1">
            <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Seconds</option>
            </select>
          </div>
          <button
            onClick={convertDate}
            className="px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors font-medium"
          >
            Convert to Epoch
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
              <h3 className="font-medium text-gray-900 dark:text-white">Generated Timestamps</h3>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
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

export default DateConverter;
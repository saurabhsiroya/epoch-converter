import React, { useState } from 'react';
import { Calendar, Copy, CheckCircle } from 'lucide-react';

const WeekConverter: React.FC = () => {
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const getISOWeek = (date: Date) => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  };

  const getWeekDateRange = (date: Date) => {
    const dayOfWeek = (date.getDay() + 6) % 7;
    const monday = new Date(date);
    monday.setDate(date.getDate() - dayOfWeek);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return {
      start: monday,
      end: sunday
    };
  };

  const convertToWeek = () => {
    try {
      setError('');
      
      if (!dateInput) {
        setError('Please enter a date');
        setResult('');
        return;
      }

      const date = new Date(dateInput);
      
      if (isNaN(date.getTime())) {
        setError('Invalid date format');
        setResult('');
        return;
      }

      const weekNumber = getISOWeek(date);
      const weekRange = getWeekDateRange(date);
      
      const weekInfo = {
        date: date.toISOString().split('T')[0],
        weekNumber,
        year: date.getFullYear(),
        weekRange: {
          start: weekRange.start.toISOString().split('T')[0],
          end: weekRange.end.toISOString().split('T')[0]
        },
        formatted: `Week ${weekNumber} of ${date.getFullYear()}`
      };

      setResult(JSON.stringify(weekInfo, null, 2));
    } catch (err) {
      setError('Error converting date to week');
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

  const setCurrentDate = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    setDateInput(dateStr);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Date to Week Number</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="week-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter date (e.g., 2024-06-07)
          </label>
          <input
            type="date"
            id="week-date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Formats: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, Jan 1 2024, January 1, 2024
          </p>
        </div>

        <button
          onClick={setCurrentDate}
          className="text-sm px-3 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
        >
          Use Current Date
        </button>

        <button
          onClick={convertToWeek}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium"
        >
          Get Week Number
        </button>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Week Information</h3>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
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

export default WeekConverter;
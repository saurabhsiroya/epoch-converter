import React, { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const CurrentDateDetails: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    const dayOfWeek = (date.getDay() + 6) % 7; // Monday = 0
    const monday = new Date(date);
    monday.setDate(date.getDate() - dayOfWeek);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return {
      start: monday,
      end: sunday
    };
  };

  const getDayOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const weekNumber = getISOWeek(currentTime);
  const weekRange = getWeekDateRange(currentTime);
  const dayOfYear = getDayOfYear(currentTime);
  const year = currentTime.getFullYear();
  const totalDays = isLeapYear(year) ? 366 : 365;
  const yearProgress = Math.round((dayOfYear / totalDays) * 100);

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {/* Current Week */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center mb-4">
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Week</h3>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">ISO week number and date range</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Week {weekNumber}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">of {year}</div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-3">
            {weekRange.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekRange.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {year}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {weekRange.start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} to {weekRange.end.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Day of Year */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day of Year</h3>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current day number in the year</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{dayOfYear}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">of {totalDays} days</div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-3">
            {yearProgress}% of the year completed
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div 
              className="bg-emerald-600 dark:bg-emerald-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${yearProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Year Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Year {year}</h3>
        </div>
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">Year statistics and information</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Total Days</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{totalDays}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Total Weeks</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">52</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Leap Year</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{isLeapYear(year) ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDateDetails;
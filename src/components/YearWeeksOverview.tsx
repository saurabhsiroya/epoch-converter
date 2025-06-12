import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const YearWeeksOverview: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getWeeksInYear = (year: number) => {
    const weeks = [];
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    
    // Find the first Monday of the year or the Monday of the first week
    let currentDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0
    currentDate.setDate(firstDay.getDate() - dayOfWeek);
    
    let weekNumber = 1;
    
    while (currentDate <= lastDay || weekNumber <= 53) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      // Check if this week belongs to the current year
      if (weekEnd.getFullYear() === year || weekStart.getFullYear() === year) {
        weeks.push({
          number: weekNumber,
          start: new Date(weekStart),
          end: new Date(weekEnd)
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 7);
      weekNumber++;
      
      if (weekNumber > 53) break;
    }
    
    return weeks;
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const weeks = getWeeksInYear(selectedYear);
  const totalDays = isLeapYear(selectedYear) ? 366 : 365;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weeks in Year</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            View all ISO weeks for a specific year
          </label>
          <input
            type="number"
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            min="1970"
            max="2100"
            className="w-32 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {weeks.length} weeks in {selectedYear}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLeapYear(selectedYear) ? 'Leap year' : 'Regular year'} • {totalDays} days
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {weeks.map((week) => (
              <div key={week.number} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div className="font-semibold text-purple-600 dark:text-purple-400 text-sm">
                  Week {week.number}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {week.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {week.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {selectedYear}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearWeeksOverview;
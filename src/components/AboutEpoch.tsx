import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const AboutEpoch: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
        >
          <div className="flex items-center">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              What is Unix Epoch?
            </h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
                The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since 
                <strong> January 1, 1970 (midnight UTC/GMT)</strong>, not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                Year 2038 Problem (Y2038)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                Some systems store epoch dates as a signed 32-bit integer, which might cause problems on January 19, 2038 
                (known as the Year 2038 problem or Y2038). The maximum value for a signed 32-bit integer is 2,147,483,647, 
                which corresponds to 03:14:07 UTC on 19 January 2038.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                Limitations
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2 mb-8">
                <li>• JavaScript does not support leap seconds</li>
                <li>• Some browsers use current DST rules for all dates in history</li>
                <li>• The converter relies on the user's computer date and time settings</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
                ISO Week Numbers
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-lg">
                ISO-8601 standard: Weeks start on Monday, and the first week of the year is the one that contains the first Thursday of the year.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Week Definition</h4>
                  <p className="text-gray-700 dark:text-gray-300">A week is defined as a seven-day period starting on Monday and ending on Sunday.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">First Week Rule</h4>
                  <p className="text-gray-700 dark:text-gray-300">The first week of the year is the week that contains January 4th, or equivalently, the week that contains the first Thursday of January.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Week Numbering</h4>
                  <p className="text-gray-700 dark:text-gray-300">Week numbers range from 1 to 52 or 53, depending on the year. Years with 53 weeks occur when January 1st falls on a Thursday, or when it's a leap year and January 1st falls on a Wednesday.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">A modern epoch converter with week number functionality</h4>
                <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
                  Our comprehensive timestamp conversion tool supports all common scenarios including current timestamp generation, 
                  historical date conversion, future date planning, timezone conversions, batch processing, week number calculations,
                  and multiple output formats. Whether you're a developer, data analyst, system administrator, 
                  or DevOps engineer, this tool helps you work efficiently with time data across different 
                  systems and programming languages.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutEpoch;
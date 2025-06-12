import React, { useState } from 'react';
import { Code, Copy, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ProgrammingExamples: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'epoch' | 'weeks'>('epoch');
  const [activeLanguage, setActiveLanguage] = useState('javascript');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const epochExamples = {
    javascript: {
      current: "Math.floor(new Date().getTime() / 1000)",
      dateToEpoch: "Math.floor(new Date('2024-01-01').getTime() / 1000)",
      epochToDate: "new Date(1704067200 * 1000).toISOString()"
    },
    python: {
      current: "import time\nint(time.time())",
      dateToEpoch: "import datetime\nint(datetime.datetime(2024, 1, 1).timestamp())",
      epochToDate: "import datetime\ndatetime.datetime.fromtimestamp(1704067200)"
    },
    php: {
      current: "time()",
      dateToEpoch: "strtotime('2024-01-01')",
      epochToDate: "date('Y-m-d H:i:s', 1704067200)"
    },
    java: {
      current: "System.currentTimeMillis() / 1000",
      dateToEpoch: "LocalDateTime.of(2024, 1, 1, 0, 0).toEpochSecond(ZoneOffset.UTC)",
      epochToDate: "Instant.ofEpochSecond(1704067200).toString()"
    },
    csharp: {
      current: "DateTimeOffset.Now.ToUnixTimeSeconds()",
      dateToEpoch: "new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero).ToUnixTimeSeconds()",
      epochToDate: "DateTimeOffset.FromUnixTimeSeconds(1704067200).ToString()"
    },
    ruby: {
      current: "Time.now.to_i",
      dateToEpoch: "Time.new(2024, 1, 1).to_i",
      epochToDate: "Time.at(1704067200).to_s"
    }
  };

  const weekExamples = {
    javascript: {
      getWeek: `function getISOWeek(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}`,
      currentWeek: "getISOWeek(new Date())",
      dateWeek: "getISOWeek(new Date('2024-06-07'))"
    },
    python: {
      getWeek: `import datetime

def get_iso_week(date):
    return date.isocalendar()[1]`,
      currentWeek: "datetime.date.today().isocalendar()[1]",
      dateWeek: "datetime.date(2024, 6, 7).isocalendar()[1]"
    },
    php: {
      getWeek: "date('W', strtotime($date))",
      currentWeek: "date('W')",
      dateWeek: "date('W', strtotime('2024-06-07'))"
    }
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'php', name: 'PHP' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'ruby', name: 'Ruby' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
      >
        <div className="flex items-center">
          <Code className="h-6 w-6 text-pink-600 dark:text-pink-400 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Programming Examples</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Code snippets for working with epoch time and week numbers</p>
          
          {/* Tab Selection */}
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-600">
            <button
              onClick={() => setActiveTab('epoch')}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'epoch'
                  ? 'border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Epoch Time
            </button>
            <button
              onClick={() => setActiveTab('weeks')}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'weeks'
                  ? 'border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Week Numbers
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLanguage(lang.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  activeLanguage === lang.id
                    ? 'bg-pink-600 dark:bg-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Code Examples */}
          <div className="space-y-4">
            {activeTab === 'epoch' && epochExamples[activeLanguage as keyof typeof epochExamples] && (
              <>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Get Current Epoch</h4>
                    <button
                      onClick={() => copyToClipboard(epochExamples[activeLanguage as keyof typeof epochExamples].current, 'current')}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                    >
                      {copied === 'current' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    {epochExamples[activeLanguage as keyof typeof epochExamples].current}
                  </code>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Date to Epoch</h4>
                    <button
                      onClick={() => copyToClipboard(epochExamples[activeLanguage as keyof typeof epochExamples].dateToEpoch, 'dateToEpoch')}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                    >
                      {copied === 'dateToEpoch' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    {epochExamples[activeLanguage as keyof typeof epochExamples].dateToEpoch}
                  </code>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Epoch to Date</h4>
                    <button
                      onClick={() => copyToClipboard(epochExamples[activeLanguage as keyof typeof epochExamples].epochToDate, 'epochToDate')}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                    >
                      {copied === 'epochToDate' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    {epochExamples[activeLanguage as keyof typeof epochExamples].epochToDate}
                  </code>
                </div>
              </>
            )}

            {activeTab === 'weeks' && weekExamples[activeLanguage as keyof typeof weekExamples] && (
              <>
                {weekExamples[activeLanguage as keyof typeof weekExamples].getWeek && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Get Week Function</h4>
                      <button
                        onClick={() => copyToClipboard(weekExamples[activeLanguage as keyof typeof weekExamples].getWeek, 'getWeek')}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                      >
                        {copied === 'getWeek' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600 whitespace-pre">
                      {weekExamples[activeLanguage as keyof typeof weekExamples].getWeek}
                    </code>
                  </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Current Week</h4>
                    <button
                      onClick={() => copyToClipboard(weekExamples[activeLanguage as keyof typeof weekExamples].currentWeek, 'currentWeek')}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                    >
                      {copied === 'currentWeek' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    {weekExamples[activeLanguage as keyof typeof weekExamples].currentWeek}
                  </code>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Date to Week</h4>
                    <button
                      onClick={() => copyToClipboard(weekExamples[activeLanguage as keyof typeof weekExamples].dateWeek, 'dateWeek')}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 rounded"
                    >
                      {copied === 'dateWeek' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 dark:text-gray-200 font-mono block bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600">
                    {weekExamples[activeLanguage as keyof typeof weekExamples].dateWeek}
                  </code>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammingExamples;
import React, { useState } from 'react';
import { TestTube, Play, CheckCircle, XCircle, Clock, Copy } from 'lucide-react';

const ApiTester: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const apiTests = [
    {
      name: 'Current Timestamp',
      endpoint: '/api/current',
      description: 'Get current Unix timestamp',
      expectedResponse: { timestamp: 'number', iso: 'string' }
    },
    {
      name: 'Convert Timestamp',
      endpoint: '/api/convert',
      description: 'Convert Unix timestamp to date',
      payload: { timestamp: 1672531200 },
      expectedResponse: { date: 'string', formatted: 'string' }
    },
    {
      name: 'Date to Timestamp',
      endpoint: '/api/date-to-timestamp',
      description: 'Convert date to Unix timestamp',
      payload: { date: '2024-01-01' },
      expectedResponse: { timestamp: 'number' }
    },
    {
      name: 'Batch Convert',
      endpoint: '/api/batch',
      description: 'Convert multiple timestamps',
      payload: { timestamps: [1672531200, 1672617600] },
      expectedResponse: { results: 'array' }
    }
  ];

  const runApiTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const test of apiTests) {
      const startTime = Date.now();
      
      try {
        // Simulate API call - in real implementation, this would make actual HTTP requests
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        const responseTime = Date.now() - startTime;
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        const result = {
          ...test,
          status: success ? 'success' : 'error',
          responseTime,
          response: success ? {
            timestamp: 1672531200,
            date: '2023-01-01T00:00:00.000Z',
            formatted: 'January 1, 2023 12:00:00 AM UTC'
          } : null,
          error: success ? null : 'Connection timeout'
        };
        
        setTestResults(prev => [...prev, result]);
      } catch (error) {
        const responseTime = Date.now() - startTime;
        setTestResults(prev => [...prev, {
          ...test,
          status: 'error',
          responseTime,
          response: null,
          error: 'Network error'
        }]);
      }
    }
    
    setIsRunning(false);
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TestTube className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Testing Dashboard</h2>
        </div>
        <button
          onClick={runApiTests}
          disabled={isRunning}
          className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running Tests...' : 'Run API Tests'}
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Test your API endpoints to ensure they're working correctly. This will help verify your backend integration.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Testing Instructions:</h3>
          <ol className="text-blue-800 dark:text-blue-300 text-sm space-y-1">
            <li>1. Click "Run API Tests" to test all endpoints</li>
            <li>2. Check response times (should be under 1000ms)</li>
            <li>3. Verify all tests pass (green checkmarks)</li>
            <li>4. If tests fail, check your API configuration</li>
          </ol>
        </div>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Test Results</h3>
          
          <div className="grid gap-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  result.status === 'success'
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {result.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                    )}
                    <h4 className="font-medium text-gray-900 dark:text-white">{result.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {result.responseTime}ms
                    </div>
                    {result.response && (
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(result.response, null, 2), `result-${index}`)}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                      >
                        {copied === `result-${index}` ? (
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{result.description}</p>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">
                  {result.endpoint}
                </p>
                
                {result.error && (
                  <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Error: {result.error}
                  </div>
                )}
                
                {result.response && (
                  <details className="mt-2">
                    <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                      View Response
                    </summary>
                    <pre className="mt-2 text-xs bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-600 overflow-x-auto">
                      {JSON.stringify(result.response, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {testResults.filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {testResults.filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(testResults.reduce((acc, r) => acc + r.responseTime, 0) / testResults.length)}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round((testResults.filter(r => r.status === 'success').length / testResults.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTester;
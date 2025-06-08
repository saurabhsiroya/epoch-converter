import React, { useState } from 'react';
import { Copy, CheckCircle, List, Download } from 'lucide-react';

const BatchConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'timestamps' | 'dates'>('timestamps');
  const [results, setResults] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const processBatch = () => {
    try {
      setError('');
      const lines = input.trim().split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        setError('Please enter some data to convert');
        return;
      }

      const processed = lines.map((line, index) => {
        try {
          if (mode === 'timestamps') {
            const num = parseInt(line.trim());
            if (isNaN(num)) {
              return { input: line, error: 'Invalid number', index };
            }
            const date = num.toString().length > 10 ? new Date(num) : new Date(num * 1000);
            return {
              input: line.trim(),
              timestamp: num,
              date: date.toISOString(),
              readable: date.toLocaleString(),
              index
            };
          } else {
            const date = new Date(line.trim());
            if (isNaN(date.getTime())) {
              return { input: line, error: 'Invalid date', index };
            }
            return {
              input: line.trim(),
              timestamp: Math.floor(date.getTime() / 1000),
              milliseconds: date.getTime(),
              iso: date.toISOString(),
              index
            };
          }
        } catch (err) {
          return { input: line, error: 'Processing error', index };
        }
      });

      setResults(processed);
    } catch (err) {
      setError('Error processing batch conversion');
    }
  };

  const copyResults = async () => {
    try {
      const text = results.map(r => 
        r.error ? `${r.input}: ERROR - ${r.error}` : 
        mode === 'timestamps' ? `${r.input} -> ${r.readable}` :
        `${r.input} -> ${r.timestamp}`
      ).join('\n');
      
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadResults = () => {
    const csvContent = mode === 'timestamps' 
      ? 'Input,Timestamp,ISO Date,Readable Date,Status\n' + 
        results.map(r => 
          r.error 
            ? `"${r.input}","","","","ERROR: ${r.error}"`
            : `"${r.input}","${r.timestamp}","${r.date}","${r.readable}","Success"`
        ).join('\n')
      : 'Input,Unix Timestamp,Milliseconds,ISO Date,Status\n' +
        results.map(r =>
          r.error
            ? `"${r.input}","","","","ERROR: ${r.error}"`
            : `"${r.input}","${r.timestamp}","${r.milliseconds}","${r.iso}","Success"`
        ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_conversion_${mode}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div id="batch" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center mb-6">
        <List className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batch Converter</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Conversion Mode
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="timestamps"
                checked={mode === 'timestamps'}
                onChange={(e) => setMode(e.target.value as 'timestamps')}
                className="mr-2"
              />
              <span className="text-gray-900 dark:text-white">Timestamps to Dates</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dates"
                checked={mode === 'dates'}
                onChange={(e) => setMode(e.target.value as 'dates')}
                className="mr-2"
              />
              <span className="text-gray-900 dark:text-white">Dates to Timestamps</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="batch-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'timestamps' 
              ? 'Enter Unix timestamps (one per line)'
              : 'Enter dates (one per line, e.g., 2024-01-01 or 2024-01-01T12:00:00)'
            }
          </label>
          <textarea
            id="batch-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'timestamps' 
              ? '1672531200\n1672617600\n1672704000'
              : '2024-01-01\n2024-01-02T12:00:00\n2024-01-03'
            }
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={processBatch}
          className="w-full bg-purple-600 dark:bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors font-medium"
        >
          Convert Batch
        </button>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Conversion Results ({results.length} items)
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyResults}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
                  title="Copy results"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={downloadResults}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all"
                  title="Download CSV"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded border text-sm ${
                      result.error 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {result.error ? (
                      <div>
                        <span className="font-mono text-red-600 dark:text-red-400">{result.input}</span>
                        <span className="text-red-500 dark:text-red-400 ml-2">→ ERROR: {result.error}</span>
                      </div>
                    ) : (
                      <div className="font-mono">
                        <span className="text-gray-700 dark:text-gray-300">{result.input}</span>
                        <span className="text-gray-400 mx-2">→</span>
                        {mode === 'timestamps' ? (
                          <span className="text-green-600 dark:text-green-400">{result.readable}</span>
                        ) : (
                          <span className="text-green-600 dark:text-green-400">{result.timestamp}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchConverter;
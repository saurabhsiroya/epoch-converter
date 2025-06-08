import React from 'react';
import { Clock, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-12 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Epoch Converter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unix Timestamp & Week Number Converter</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Professional Unix timestamp converter and epoch time tool. Convert timestamps to dates, 
              dates to timestamps, with timezone support and batch processing capabilities.
            </p>
          </div>

          {/* Converters */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Conversion Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Unix Timestamp to Date</a></li>
              <li><a href="#converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Date to Unix Timestamp</a></li>
              <li><a href="#converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Timezone Converter</a></li>
              <li><a href="#batch" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Batch Converter</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Current Timestamp</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><span className="text-gray-600 dark:text-gray-400">API Documentation</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Programming Examples</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Timezone Reference</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Date Format Guide</span></li>
            </ul>
          </div>

          {/* Popular Keywords */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Searches</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-600 dark:text-gray-400">Epoch Converter</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Unix Time Converter</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Timestamp Calculator</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">POSIX Time Converter</span></li>
              <li><span className="text-gray-600 dark:text-gray-400">Milliseconds Converter</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © 2024 Epoch Converter. Free Unix timestamp conversion tool for developers.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Convert epoch time, unix timestamps, dates, and timezones with our professional tools.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-500 text-xs">
                Built with React, Tailwind CSS, and shadcn/ui
              </span>
              <div className="flex space-x-2">
                <a 
                  href="https://github.com" 
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Footer Content */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-6 pt-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed max-w-4xl mx-auto">
              A modern epoch converter with week number functionality. Professional epoch time converter supporting Unix timestamp conversion, date formatting, timezone conversion, 
              batch processing, and real-time timestamp generation. Perfect for developers, system administrators, 
              data analysts, and DevOps professionals working with time-based data across JavaScript, Python, PHP, 
              Java, and other programming languages. Free online tool with no registration required.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
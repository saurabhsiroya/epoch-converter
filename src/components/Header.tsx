import React, { useState } from 'react';
import { Clock, LogIn } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-lg p-2">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Epoch Converter</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unix Timestamp & Week Number Converter</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#converter" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Converter
                </a>
                <a href="#batch" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Batch Convert
                </a>
                <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  FAQ
                </a>
              </nav>
              
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;
import React, { useState } from 'react';
import { User, Key, BarChart3, Settings, LogOut, Copy, CheckCircle, RefreshCw, X } from 'lucide-react';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'api' | 'usage' | 'settings'>('overview');

  if (!isOpen) return null;

  const mockUser = {
    email: 'user@example.com',
    plan: 'free',
    apiKey: 'ek_demo_1234567890abcdef',
    usage: {
      current: 0,
      limit: 1000,
      resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  };

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(mockUser.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy API key');
    }
  };

  const usagePercentage = (mockUser.usage.current / mockUser.usage.limit) * 100;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'usage', name: 'Usage', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-900 p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{mockUser.email}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{mockUser.plan} Plan</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tabs.find(t => t.id === activeTab)?.name}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Current Plan</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 capitalize">{mockUser.plan}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">API Requests</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {mockUser.usage.current.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Monthly Limit</h3>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {mockUser.usage.limit.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Usage Overview</h3>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">API Requests This Month</span>
                      <span className="text-gray-900 dark:text-white">
                        {mockUser.usage.current} / {mockUser.usage.limit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Resets on {new Date(mockUser.usage.resetDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">API Key</h3>
                    <button className="flex items-center px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={mockUser.apiKey}
                      readOnly
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm"
                    />
                    <button
                      onClick={copyApiKey}
                      className="px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Keep your API key secure. Don't share it in publicly accessible areas.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Example Usage</h3>
                  <pre className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 p-4 rounded border dark:border-gray-600 overflow-x-auto">
{`curl -X GET "https://api.epochtimeconverter.org/convert" \\
  -H "Authorization: Bearer ${mockUser.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"timestamp": 1672531200}'`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">This Month</h3>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {mockUser.usage.current.toLocaleString()}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">API requests used</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Remaining</h3>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {(mockUser.usage.limit - mockUser.usage.current).toLocaleString()}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">API requests left</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Usage History</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No usage data available yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Start using the API to see your usage statistics</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={mockUser.email}
                        readOnly
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Plan
                      </label>
                      <input
                        type="text"
                        value={mockUser.plan.charAt(0).toUpperCase() + mockUser.plan.slice(1)}
                        readOnly
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">Danger Zone</h3>
                  <p className="text-red-700 dark:text-red-400 text-sm mb-4">
                    These actions cannot be undone. Please be careful.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
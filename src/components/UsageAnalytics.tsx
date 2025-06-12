import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Activity, Globe } from 'lucide-react';

const UsageAnalytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalConversions: 0,
    todayConversions: 0,
    activeUsers: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    // Simulate real-time stats
    const interval = setInterval(() => {
      setStats(prev => ({
        totalConversions: prev.totalConversions + Math.floor(Math.random() * 3),
        todayConversions: prev.todayConversions + Math.floor(Math.random() * 2),
        activeUsers: 150 + Math.floor(Math.random() * 50),
        avgResponseTime: 45 + Math.floor(Math.random() * 20)
      }));
    }, 5000);

    // Initialize with base values
    setStats({
      totalConversions: 1247892,
      todayConversions: 3421,
      activeUsers: 187,
      avgResponseTime: 52
    });

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Total Conversions',
      value: stats.totalConversions.toLocaleString(),
      change: '+12.5%',
      icon: TrendingUp,
      color: 'blue',
      description: 'All time'
    },
    {
      title: 'Today',
      value: stats.todayConversions.toLocaleString(),
      change: 'Live',
      icon: Activity,
      color: 'green',
      description: 'Conversions today'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toString(),
      change: 'Now',
      icon: Users,
      color: 'purple',
      description: 'Currently online'
    },
    {
      title: 'Response Time',
      value: `${stats.avgResponseTime}ms`,
      change: 'Avg',
      icon: Clock,
      color: 'orange',
      description: 'Server response'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600',
    green: 'from-green-500 to-green-600 text-green-600',
    purple: 'from-purple-500 to-purple-600 text-purple-600',
    orange: 'from-orange-500 to-orange-600 text-orange-600'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 transition-colors">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mr-4">
          <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time usage statistics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1]} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[2]} dark:text-${stat.color}-400`}>
                  {stat.change}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Popular Conversion Types */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Popular Conversions</h3>
        </div>
        
        <div className="space-y-4">
          {[
            { name: 'Timestamp to Date', percentage: 68, color: 'blue' },
            { name: 'Date to Timestamp', percentage: 24, color: 'green' },
            { name: 'Batch Conversion', percentage: 8, color: 'purple' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-${item.color}-500 dark:bg-${item.color}-400 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white w-10 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;
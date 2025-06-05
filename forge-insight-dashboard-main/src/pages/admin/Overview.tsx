
import React from 'react';
import { Users, Activity, Database, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Overview: React.FC = () => {
  // Demo stats data
  const stats = {
    totalUsers: 156,
    activeSessions: 42,
    dataSources: 8,
    todayActivity: 23
  };

  const metrics = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Sessions',
      value: stats.activeSessions,
      icon: Activity,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Data Sources',
      value: stats.dataSources,
      icon: Database,
      color: 'bg-purple-500',
      change: '+2%'
    },
    {
      title: 'Today\'s Activity',
      value: stats.todayActivity,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+8%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600 mt-2">Welcome to the InsightForge admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className="ml-2 text-sm text-green-600">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">User john@example.com logged in</span>
                <span className="text-xs text-gray-500 ml-auto">2 mins ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Data source "Sales DB" updated</span>
                <span className="text-xs text-gray-500 ml-auto">5 mins ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">New user registration</span>
                <span className="text-xs text-gray-500 ml-auto">10 mins ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Connection</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Services</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Sync</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Warning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;

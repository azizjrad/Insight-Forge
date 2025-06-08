import React from "react";
import {
  Users,
  Activity,
  Database,
  TrendingUp,
  Shield,
  Server,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Overview: React.FC = () => {
  // Demo stats data
  const stats = {
    totalUsers: 156,
    activeSessions: 42,
    dataSources: 8,
    todayActivity: 23,
    systemUptime: "99.9%",
    serverLoad: "24%",
    memoryUsage: "68%",
    diskSpace: "45%",
  };

  const metrics = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      change: "+12%",
      changeType: "positive",
      description: "Registered users",
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions,
      icon: Activity,
      gradient: "from-green-500 to-green-600",
      change: "+5%",
      changeType: "positive",
      description: "Currently online",
    },
    {
      title: "Data Sources",
      value: stats.dataSources,
      icon: Database,
      gradient: "from-purple-500 to-purple-600",
      change: "+2%",
      changeType: "positive",
      description: "Connected sources",
    },
    {
      title: "Today's Activity",
      value: stats.todayActivity,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      change: "+8%",
      changeType: "positive",
      description: "Actions performed",
    },
  ];

  const systemMetrics = [
    {
      title: "System Uptime",
      value: stats.systemUptime,
      icon: Server,
      gradient: "from-cyan-500 to-cyan-600",
      status: "excellent",
      description: "Last 30 days",
    },
    {
      title: "Server Load",
      value: stats.serverLoad,
      icon: Cpu,
      gradient: "from-indigo-500 to-indigo-600",
      status: "good",
      description: "CPU usage",
    },
    {
      title: "Memory Usage",
      value: stats.memoryUsage,
      icon: Monitor,
      gradient: "from-teal-500 to-teal-600",
      status: "warning",
      description: "RAM consumption",
    },
    {
      title: "Disk Space",
      value: stats.diskSpace,
      icon: HardDrive,
      gradient: "from-pink-500 to-pink-600",
      status: "good",
      description: "Storage used",
    },
  ];

  const recentActivities = [
    {
      type: "login",
      user: "john@example.com",
      action: "User logged in",
      time: "2 mins ago",
      status: "success",
      icon: CheckCircle,
      severity: "low",
    },
    {
      type: "update",
      user: "system",
      action: 'Data source "Sales DB" updated',
      time: "5 mins ago",
      status: "info",
      icon: Database,
      severity: "low",
    },
    {
      type: "register",
      user: "sarah@company.com",
      action: "New user registration",
      time: "10 mins ago",
      status: "success",
      icon: Users,
      severity: "medium",
    },
    {
      type: "warning",
      user: "system",
      action: "High memory usage detected",
      time: "15 mins ago",
      status: "warning",
      icon: AlertTriangle,
      severity: "high",
    },
    {
      type: "security",
      user: "admin",
      action: "Security scan completed",
      time: "30 mins ago",
      status: "success",
      icon: Shield,
      severity: "medium",
    },
  ];

  const systemServices = [
    {
      name: "Database Connection",
      status: "healthy",
      icon: Database,
      uptime: "99.9%",
      responseTime: "12ms",
      description: "Primary database cluster",
    },
    {
      name: "API Services",
      status: "healthy",
      icon: Server,
      uptime: "99.8%",
      responseTime: "45ms",
      description: "REST API endpoints",
    },
    {
      name: "Data Sync",
      status: "warning",
      icon: Activity,
      uptime: "97.2%",
      responseTime: "156ms",
      description: "Real-time synchronization",
    },
    {
      name: "Security Services",
      status: "healthy",
      icon: Shield,
      uptime: "100%",
      responseTime: "8ms",
      description: "Authentication & encryption",
    },
    {
      name: "Network Services",
      status: "healthy",
      icon: Wifi,
      uptime: "99.7%",
      responseTime: "23ms",
      description: "Load balancer & CDN",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "online":
      case "success":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "error":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "info":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#0f172a_25%,transparent_25%),linear-gradient(-45deg,#0f172a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0f172a_75%),linear-gradient(-45deg,transparent_75%,#0f172a_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]"></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-cyan-500/20 rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-indigo-500/20 -rotate-12 animate-float"></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Enhanced Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
                    Mission Control
                  </h1>
                  <p className="text-xl text-slate-300">
                    Advanced system monitoring & administration
                  </p>
                </div>
              </div>

              {/* Real-time clock */}
              <div className="text-right">
                <div className="text-2xl font-mono text-white font-bold">
                  {new Date().toLocaleTimeString()}
                </div>
                <div className="text-sm text-slate-400">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Users",
                  value: stats.totalUsers,
                  color: "from-blue-400 to-blue-600",
                  icon: Users,
                },
                {
                  label: "Active Now",
                  value: stats.activeSessions,
                  color: "from-green-400 to-green-600",
                  icon: Activity,
                },
                {
                  label: "Uptime",
                  value: stats.systemUptime,
                  color: "from-cyan-400 to-cyan-600",
                  icon: Server,
                },
                {
                  label: "Data Sources",
                  value: stats.dataSources,
                  color: "from-purple-400 to-purple-600",
                  icon: Database,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}
                    >
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-slate-400">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-xl group-hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden`}
                  >
                    <metric.icon className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      metric.changeType === "positive"
                        ? "text-green-300 bg-green-500/20 border border-green-500/30"
                        : "text-red-300 bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    {metric.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">{metric.title}</p>
                  <p className="text-4xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs text-slate-500">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced System Health Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {metric.value}
                    </p>
                    <p className="text-xs text-slate-500">
                      {metric.description}
                    </p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full ${
                      metric.status === "excellent"
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : metric.status === "good"
                        ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                        : "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                    } animate-pulse`}
                  ></div>
                </div>

                {/* Progress bar for metrics that have percentage values */}
                {metric.value.includes("%") && (
                  <div className="w-full bg-slate-700/50 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${metric.gradient} transition-all duration-1000`}
                      style={{ width: metric.value }}
                    ></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Activity Monitoring & System Status */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Real-time Activity Feed */}
          <Card className="xl:col-span-2 bg-slate-800/40 backdrop-blur-xl border-slate-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                Live Activity Stream
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-700/40 hover:bg-slate-700/60 transition-all duration-300 border border-slate-600/30 group"
                >
                  <div
                    className={`p-2 rounded-lg ${getActivityColor(
                      activity.status
                    )} bg-opacity-20`}
                  >
                    <activity.icon
                      className={`w-5 h-5 ${getActivityColor(activity.status)}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-200">
                        {activity.action}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          activity.severity === "high"
                            ? "bg-red-500/20 text-red-300"
                            : activity.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {activity.severity}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {activity.user}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    {activity.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Services Status */}
          <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Server className="w-5 h-5 text-cyan-400" />
                </div>
                Service Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemServices.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <service.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-200">
                        {service.name}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full border font-medium ${getStatusColor(
                        service.status
                      )}`}
                    >
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500">Uptime:</span>
                      <span className="text-slate-300 ml-1 font-mono">
                        {service.uptime}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Response:</span>
                      <span className="text-slate-300 ml-1 font-mono">
                        {service.responseTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {service.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;

import React, { useState, useEffect } from "react";
import {
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  RefreshCw,
  Star,
  Bed,
  MapPin,
  Clock,
  CheckCircle,
  CreditCard,
  Activity,
  Plus,
  ClipboardList,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/PageHeader";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { toast } from "sonner";

interface DashboardMetrics {
  totalBookings: number;
  revenue: number;
  occupancyRate: number;
  avgRating: number;
}

interface ChartData {
  monthlyRevenue: number[];
  bookingsByMonth: number[];
  roomTypes: { name: string; bookings: number }[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBookings: 247,
    revenue: 89420,
    occupancyRate: 85.2,
    avgRating: 4.6,
  });
  const [chartData, setChartData] = useState<ChartData>({
    monthlyRevenue: [65000, 72000, 68000, 89420],
    bookingsByMonth: [98, 112, 105, 132],
    roomTypes: [
      { name: "Standard", bookings: 45 },
      { name: "Deluxe", bookings: 38 },
      { name: "Suite", bookings: 25 },
    ],
  });

  const updateDashboardData = () => {
    const newMetrics = {
      totalBookings: metrics.totalBookings + Math.floor(Math.random() * 10),
      revenue: metrics.revenue + Math.floor(Math.random() * 5000),
      occupancyRate: Math.min(100, metrics.occupancyRate + Math.random() * 5),
      avgRating: Math.min(5, metrics.avgRating + Math.random() * 0.1),
    };
    setMetrics(newMetrics);
    toast.success("Dashboard data refreshed successfully!");
  };

  // Quick Action Handlers
  const handleNewBooking = () => {
    // In a real app, this would open a booking modal or navigate to booking form
    toast.success("New booking form opened!");
  };

  const handleGuestList = () => {
    navigate("/dashboard/guests");
    toast.success("Navigating to guest management...");
  };

  const handleRoomStatus = () => {
    // In a real app, this would open room management
    toast.success("Room status overview opened!");
  };

  const handleReports = () => {
    navigate("/dashboard/reports");
    toast.success("Opening reports & analytics...");
  };

  // Prepare chart data in the correct format
  const revenueData = chartData.monthlyRevenue.map((value, index) => ({
    month: ["Jan", "Feb", "Mar", "Apr"][index],
    revenue: value,
  }));

  const bookingsData = chartData.bookingsByMonth.map((value, index) => ({
    month: ["Jan", "Feb", "Mar", "Apr"][index],
    bookings: value,
  }));

  const roomTypesData = chartData.roomTypes.map((room) => ({
    name: room.name,
    value: room.bookings,
    color:
      room.name === "Standard"
        ? "rgba(239, 68, 68, 0.8)"
        : room.name === "Deluxe"
        ? "rgba(245, 158, 11, 0.8)"
        : "rgba(139, 92, 246, 0.8)",
  }));

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-gray-800 to-primary bg-clip-text text-transparent mb-2">
                Hotel Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time insights and performance metrics for your hotel
                business
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <Button
              onClick={updateDashboardData}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.totalBookings}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <p className="text-xs text-green-600 font-medium">
                  +12% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue
              </CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${metrics.revenue.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <p className="text-xs text-green-600 font-medium">
                  +8% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Occupancy Rate
              </CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <Bed className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.occupancyRate.toFixed(1)}%
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <p className="text-xs text-green-600 font-medium">
                  +2% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Rating
              </CardTitle>
              <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.avgRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <p className="text-xs text-green-600 font-medium">
                  +0.1 from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Monthly Revenue Trends
              </CardTitle>
              <p className="text-sm text-gray-600">
                Track your hotel's revenue performance over time
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <LineChart
                data={revenueData}
                dataKey="revenue"
                xAxisKey="month"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Bookings by Month
              </CardTitle>
              <p className="text-sm text-gray-600">
                Monitor booking volume trends and patterns
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <BarChart
                data={bookingsData}
                dataKey="bookings"
                xAxisKey="month"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Bed className="w-5 h-5 text-purple-600" />
                Room Type Distribution
              </CardTitle>
              <p className="text-sm text-gray-600">
                Analyze which room types are most popular
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <PieChart data={roomTypesData} />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Recent Activity
              </CardTitle>
              <p className="text-sm text-gray-600">
                Latest updates and guest interactions
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New booking from John Doe
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Payment received - $450
                    </p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Guest checked in - Room 204
                    </p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Review submitted - 5 stars
                    </p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-white to-secondary/5 backdrop-blur-md border border-gray-200/50 shadow-xl">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <p className="text-sm text-gray-600">
              Frequently used tools and shortcuts for hotel management
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={handleNewBooking}
                variant="outline"
                className="h-20 flex-col gap-3 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group hover:scale-105 hover:shadow-lg"
              >
                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">New Booking</span>
              </Button>

              <Button
                onClick={handleGuestList}
                variant="outline"
                className="h-20 flex-col gap-3 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
              >
                <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Guest Management</span>
              </Button>

              <Button
                onClick={handleRoomStatus}
                variant="outline"
                className="h-20 flex-col gap-3 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
              >
                <Bed className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Room Status</span>
              </Button>

              <Button
                onClick={handleReports}
                variant="outline"
                className="h-20 flex-col gap-3 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group hover:scale-105 hover:shadow-lg"
              >
                <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-medium">Reports & Analytics</span>
              </Button>
            </div>

            {/* Additional Quick Access Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Quick Navigation
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/dashboard/bookings"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-xs rounded-lg transition-colors duration-300"
                >
                  <Calendar className="w-3 h-3" />
                  Booking Analytics
                </Link>
                <Link
                  to="/dashboard/financial"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 text-xs rounded-lg transition-colors duration-300"
                >
                  <DollarSign className="w-3 h-3" />
                  Financial Overview
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-600 hover:text-white text-gray-700 text-xs rounded-lg transition-colors duration-300"
                >
                  <Activity className="w-3 h-3" />
                  Settings
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

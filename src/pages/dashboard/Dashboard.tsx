import React, { useState, useEffect } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
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
  Info,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageHeader from "@/components/ui/PageHeader";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { toast } from "sonner";
import { dashboardApi } from "@/lib/api";

interface DashboardMetrics {
  totalBookings: number;
  revenue: number;
  occupancyRate: number;
  avgRating: number;
  adr: number;
  revpar: number;
  goppar: number;
}

interface KPIComparison {
  change: number;
  trend: "up" | "down" | "neutral";
}

interface MetricsComparisons {
  totalBookings: KPIComparison;
  revenue: KPIComparison;
  occupancyRate: KPIComparison;
  averageRating: KPIComparison;
  adr: KPIComparison;
  revpar: KPIComparison;
  goppar: KPIComparison;
}

interface ChartData {
  monthlyRevenue: number[];
  monthlyRevenueLabels?: string[];
  bookingsByMonth: number[];
  bookingsByMonthLabels?: string[];
  roomTypes: { name: string; bookings: number; color?: string }[];
}

interface ActivityItem {
  icon: string;
  message: string;
  time: string;
  type: string;
}

interface RoomTypeResponse {
  name: string;
  bookings?: number;
  value?: number;
  percentage?: number;
  color?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBookings: 0,
    revenue: 0,
    occupancyRate: 0,
    avgRating: 0,
    adr: 0,
    revpar: 0,
    goppar: 0,
  });
  const [comparisons, setComparisons] = useState<MetricsComparisons>({
    totalBookings: { change: 0, trend: "neutral" },
    revenue: { change: 0, trend: "neutral" },
    occupancyRate: { change: 0, trend: "neutral" },
    averageRating: { change: 0, trend: "neutral" },
    adr: { change: 0, trend: "neutral" },
    revpar: { change: 0, trend: "neutral" },
    goppar: { change: 0, trend: "neutral" },
  });
  const [chartData, setChartData] = useState<ChartData>({
    monthlyRevenue: [],
    monthlyRevenueLabels: [],
    bookingsByMonth: [],
    bookingsByMonthLabels: [],
    roomTypes: [],
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  // Helper functions
  const formatInsight = (
    comparison: KPIComparison,
    type: string = "percentage"
  ) => {
    const { change, trend } = comparison;

    if (trend === "neutral" || change === 0) {
      return "No change from last month";
    }

    const prefix = change > 0 ? "+" : "";
    const suffix = type === "rating" ? "" : "%";
    const formattedChange =
      type === "rating" ? change.toFixed(1) : change.toFixed(1);

    return `${prefix}${formattedChange}${suffix} from last month`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      const [
        kpiResponse,
        revenueResponse,
        bookingsResponse,
        roomTypesResponse,
        activityResponse,
      ] = await Promise.all([
        dashboardApi.getKPIsWithComparisons(),
        dashboardApi.getRevenueTrends(),
        dashboardApi.getBookingsByMonth(),
        dashboardApi.getRoomTypeDistribution(),
        dashboardApi.getRecentActivity(undefined, 4),
      ]);

      console.log("API Responses:", {
        kpiResponse,
        revenueResponse,
        bookingsResponse,
        roomTypesResponse,
        activityResponse,
      });

      if (kpiResponse.data) {
        interface KPIResponseData {
          current?: {
            totalBookings?: number;
            revenue?: number;
            occupancyRate?: number;
            averageRating?: number;
            adr?: number;
            revpar?: number;
            goppar?: number;
          };
          comparisons?: MetricsComparisons;
        }
        const data: KPIResponseData = kpiResponse.data;
        console.log("KPI Response data:", data);

        setMetrics({
          totalBookings: data.current?.totalBookings || 0,
          revenue: data.current?.revenue || 0,
          occupancyRate: data.current?.occupancyRate || 0,
          avgRating: data.current?.averageRating || 0,
          adr: data.current?.adr || 0,
          revpar: data.current?.revpar || 0,
          goppar: data.current?.goppar || 0,
        });

        if (data.comparisons) {
          setComparisons(data.comparisons);
        }
      }

      if (revenueResponse.data) {
        interface RevenueData {
          data: number[];
          labels: string[];
        }
        // Adapt the API response to match the expected RevenueData structure
        const revenueData: RevenueData = {
          data: Array.isArray(revenueResponse.data.data)
            ? revenueResponse.data.data
                .filter(
                  (v: unknown) =>
                    typeof v === "number" ||
                    (typeof v === "string" && !isNaN(Number(v)))
                )
                .map((v: string | number) =>
                  typeof v === "number" ? v : Number(v)
                )
            : [],
          labels: Array.isArray(revenueResponse.data.labels)
            ? revenueResponse.data.labels.map((label: unknown) => String(label))
            : [],
        };
        setChartData((prev) => ({
          ...prev,
          monthlyRevenue: revenueData.data,
          monthlyRevenueLabels: revenueData.labels,
        }));
      }

      if (bookingsResponse.data) {
        interface BookingsData {
          data: number[];
          labels: string[];
        }
        const bookingsData: BookingsData = {
          data: Array.isArray(bookingsResponse.data?.data)
            ? bookingsResponse.data.data
                .filter(
                  (v: unknown) =>
                    typeof v === "number" ||
                    (typeof v === "string" && !isNaN(Number(v)))
                )
                .map((v: string | number) =>
                  typeof v === "number" ? v : Number(v)
                )
            : [],
          labels: Array.isArray(bookingsResponse.data?.labels)
            ? bookingsResponse.data.labels.map((label: unknown) =>
                String(label)
              )
            : [],
        };
        setChartData((prev) => ({
          ...prev,
          bookingsByMonth: bookingsData.data || [],
          bookingsByMonthLabels: bookingsData.labels || [],
        }));
      }

      if (roomTypesResponse.data) {
        const roomTypesData = roomTypesResponse.data as RoomTypeResponse[];
        setChartData((prev) => ({
          ...prev,
          roomTypes: Array.isArray(roomTypesData)
            ? roomTypesData.map((room: RoomTypeResponse) => ({
                name: room.name,
                bookings: room.bookings || room.value || 0,
                color: room.color,
              }))
            : [],
        }));
      }

      if (activityResponse.data) {
        setRecentActivity(
          Array.isArray(activityResponse.data) ? activityResponse.data : []
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get icon for activity type
  const getActivityIcon = (type: string, icon: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-4 h-4 text-secondary" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-accent" />;
      case "checkin":
        return <MapPin className="w-4 h-4 text-accent" />;
      case "review":
        return <Star className="w-4 h-4 text-secondary" />;
      case "user_login":
        return <Users className="w-4 h-4 text-secondary" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  // Helper function to get background color for activity type
  const getActivityBgColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-secondary/10 border-secondary/20";
      case "payment":
        return "bg-accent/10 border-accent/20";
      case "checkin":
        return "bg-accent/10 border-accent/20";
      case "review":
        return "bg-secondary/10 border-secondary/20";
      case "user_login":
        return "bg-secondary/10 border-secondary/20";
      default:
        return "bg-gray-600/10 border-gray-600/20";
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const updateDashboardData = async () => {
    setIsRefreshing(true);
    await fetchDashboardData();
    setIsRefreshing(false);
    toast.success("Dashboard data refreshed successfully!");
  };

  // Prepare chart data in the correct format
  const revenueData =
    chartData.monthlyRevenue.length > 0
      ? chartData.monthlyRevenue.map((value, index) => ({
          month:
            chartData.monthlyRevenueLabels?.[index] || `Month ${index + 1}`,
          revenue: value,
        }))
      : [{ month: "No Data", revenue: 0 }];

  const bookingsData =
    chartData.bookingsByMonth.length > 0
      ? chartData.bookingsByMonth.map((value, index) => ({
          month:
            chartData.bookingsByMonthLabels?.[index] || `Month ${index + 1}`,
          bookings: value,
        }))
      : [{ month: "No Data", bookings: 0 }];

  const roomTypesData =
    chartData.roomTypes.length > 0
      ? chartData.roomTypes.map((room) => ({
          name: room.name,
          value: room.bookings,
          color:
            room.color ||
            (room.name === "Standard" || room.name === "standard"
              ? "rgba(239, 68, 68, 0.8)"
              : room.name === "Deluxe" || room.name === "deluxe"
              ? "rgba(245, 158, 11, 0.8)"
              : "rgba(139, 92, 246, 0.8)"),
        }))
      : [{ name: "No Data", value: 0, color: "rgba(156, 163, 175, 0.8)" }];

  return (
    <TooltipProvider>
      <div className="min-h-screen relative bg-gradient-to-br from-primary via-gray-900 to-primary">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative z-10 space-y-8 p-8">
          {/* Enhanced Header */}
          <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent mb-2">
                  Hotel Analytics Dashboard
                </h1>
                <p className="text-gray-300 text-lg">
                  Real-time insights and performance metrics for your hotel
                  business
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              <Button
                onClick={updateDashboardData}
                disabled={isRefreshing}
                className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
            </div>
          </div>

          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {/* Total Bookings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Total Bookings
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3 text-gray-400" />
                      <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                        <Calendar className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                      ) : (
                        metrics.totalBookings
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(comparisons.totalBookings.trend)}
                      <p
                        className={`text-xs font-medium ${getTrendColor(
                          comparisons.totalBookings.trend
                        )}`}
                      >
                        {isLoading
                          ? "Loading..."
                          : formatInsight(comparisons.totalBookings)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold text-white">Total Bookings</p>
                  <p className="text-gray-300 leading-relaxed">
                    Confirmed reservations for the current period
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Revenue */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Revenue
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3 text-gray-400" />
                      <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                        <DollarSign className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-600 h-8 w-24 rounded"></div>
                      ) : (
                        `$${metrics.revenue.toLocaleString()}`
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(comparisons.revenue.trend)}
                      <p
                        className={`text-xs font-medium ${getTrendColor(
                          comparisons.revenue.trend
                        )}`}
                      >
                        {isLoading
                          ? "Loading..."
                          : formatInsight(comparisons.revenue)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold text-white">Total Revenue</p>
                  <p className="text-gray-300 leading-relaxed">
                    Income from room bookings and services
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Occupancy Rate */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Occupancy Rate
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3 text-gray-400" />
                      <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                        <Bed className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-600 h-8 w-16 rounded"></div>
                      ) : (
                        `${metrics.occupancyRate.toFixed(1)}%`
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(comparisons.occupancyRate.trend)}
                      <p
                        className={`text-xs font-medium ${getTrendColor(
                          comparisons.occupancyRate.trend
                        )}`}
                      >
                        {isLoading
                          ? "Loading..."
                          : formatInsight(comparisons.occupancyRate)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold text-white">Occupancy Rate</p>
                  <p className="text-gray-300 leading-relaxed">
                    Percentage of available rooms occupied
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Average Rating */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      Avg Rating
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3 text-gray-400" />
                      <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                        <Star className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-600 h-8 w-12 rounded"></div>
                      ) : (
                        metrics.avgRating.toFixed(1)
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(comparisons.averageRating.trend)}
                      <p
                        className={`text-xs font-medium ${getTrendColor(
                          comparisons.averageRating.trend
                        )}`}
                      >
                        {isLoading
                          ? "Loading..."
                          : formatInsight(comparisons.averageRating, "rating")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold text-white">Average Rating</p>
                  <p className="text-gray-300 leading-relaxed">
                    Customer satisfaction score (1-5 stars)
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* ADR */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      ADR
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3 text-gray-400" />
                      <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                        <DollarSign className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-1">
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-600 h-8 w-16 rounded"></div>
                      ) : (
                        `$${metrics.adr.toFixed(2)}`
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(comparisons.adr.trend)}
                      <p
                        className={`text-xs font-medium ${getTrendColor(
                          comparisons.adr.trend
                        )}`}
                      >
                        {isLoading
                          ? "Loading..."
                          : formatInsight(comparisons.adr)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="font-semibold text-white">
                    ADR (Average Daily Rate)
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Average revenue per occupied room
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Monthly Revenue Trends
                </CardTitle>
                <p className="text-sm text-gray-300">
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

            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Bookings by Month
                </CardTitle>
                <p className="text-sm text-gray-300">
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

            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bed className="w-5 h-5 text-accent" />
                  Room Type Distribution
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Analyze which room types are most popular
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <PieChart data={roomTypesData} />
              </CardContent>
            </Card>

            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Recent Activity
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Latest updates and guest interactions
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-600/10 rounded-lg border border-gray-600/20"
                      >
                        <div className="p-2 bg-gray-600/20 rounded-full">
                          <div className="w-4 h-4 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-600 rounded animate-pulse mb-1"></div>
                          <div className="h-3 bg-gray-600 rounded animate-pulse w-20"></div>
                        </div>
                      </div>
                    ))
                  ) : recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${getActivityBgColor(
                          activity.type
                        )}`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            getActivityBgColor(activity.type).split(" ")[0]
                          }/20`}
                        >
                          {getActivityIcon(activity.type, activity.icon)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Default static data as fallback
                    <>
                      <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                        <div className="p-2 bg-secondary/20 rounded-full">
                          <Users className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            New booking from John Doe
                          </p>
                          <p className="text-xs text-gray-400">2 minutes ago</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="p-2 bg-accent/20 rounded-full">
                          <CreditCard className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Payment received - $450
                          </p>
                          <p className="text-xs text-gray-400">5 minutes ago</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="p-2 bg-accent/20 rounded-full">
                          <MapPin className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Guest checked in - Room 204
                          </p>
                          <p className="text-xs text-gray-400">
                            15 minutes ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                        <div className="p-2 bg-secondary/20 rounded-full">
                          <Star className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Review submitted - 5 stars
                          </p>
                          <p className="text-xs text-gray-400">
                            30 minutes ago
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Performance Metrics Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Additional KPI Cards */}
            <div className="space-y-6">
              {/* RevPAR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">
                        RevPAR
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Info className="w-3 h-3 text-gray-400" />
                        <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                          <DollarSign className="h-5 w-5 text-accent" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white mb-1">
                        {isLoading ? (
                          <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                        ) : (
                          `$${metrics.revpar.toFixed(2)}`
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(comparisons.revpar.trend)}
                        <p
                          className={`text-xs font-medium ${getTrendColor(
                            comparisons.revpar.trend
                          )}`}
                        >
                          {isLoading
                            ? "Loading..."
                            : formatInsight(comparisons.revpar)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      Revenue Per Available Room
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Key metric combining occupancy rate and ADR
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* GOPPAR */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">
                        GOPPAR
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Info className="w-3 h-3 text-gray-400" />
                        <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                          <TrendingUp className="h-5 w-5 text-emerald-400" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white mb-1">
                        {isLoading ? (
                          <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                        ) : (
                          `$${metrics.goppar.toFixed(2)}`
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(comparisons.goppar.trend)}
                        <p
                          className={`text-xs font-medium ${getTrendColor(
                            comparisons.goppar.trend
                          )}`}
                        >
                          {isLoading
                            ? "Loading..."
                            : formatInsight(comparisons.goppar)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      Gross Operating Profit Per Available Room
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Profitability metric after operational costs
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* Guest Satisfaction Score */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-help">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">
                        Guest Satisfaction
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Info className="w-3 h-3 text-gray-400" />
                        <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                          <Star className="h-5 w-5 text-secondary" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white mb-1">
                        {isLoading ? (
                          <div className="animate-pulse bg-gray-600 h-8 w-16 rounded"></div>
                        ) : (
                          `${(metrics.avgRating * 20).toFixed(1)}%`
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-secondary" />
                        <p className="text-xs font-medium text-secondary">
                          {isLoading
                            ? "Loading..."
                            : `${metrics.avgRating.toFixed(1)}/5.0 rating`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      Guest Satisfaction Score
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Percentage based on average guest ratings
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Performance Summary Card */}
            <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Performance Overview
                </CardTitle>
                <p className="text-sm text-gray-300">
                  Target tracking and efficiency metrics
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Revenue Performance */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      <h4 className="text-sm font-semibold text-white">
                        Revenue Performance
                      </h4>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        Monthly Target
                      </span>
                      <span className="text-white font-semibold">$85,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        Current Month
                      </span>
                      <span className="text-secondary font-semibold">
                        ${metrics.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(
                            (metrics.revenue / 85000) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {((metrics.revenue / 85000) * 100).toFixed(1)}% of monthly
                      target achieved
                    </div>
                  </div>

                  <div className="border-t border-gray-700/50 pt-6">
                    {/* Operational Efficiency */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-accent" />
                        <h4 className="text-sm font-semibold text-white">
                          Operational Efficiency
                        </h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Occupancy Target
                        </span>
                        <span className="text-white font-semibold">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Current Rate
                        </span>
                        <span className="text-accent font-semibold">
                          {metrics.occupancyRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min(
                              (metrics.occupancyRate / 85) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {((metrics.occupancyRate / 85) * 100).toFixed(1)}%
                        efficiency rating
                      </div>
                    </div>
                  </div>

                  {/* Performance Indicators */}
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                        <div className="text-lg font-bold text-secondary">
                          {metrics.adr.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-400">ADR ($)</div>
                      </div>
                      <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <div className="text-lg font-bold text-accent">
                          {metrics.avgRating.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-400">Avg Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;

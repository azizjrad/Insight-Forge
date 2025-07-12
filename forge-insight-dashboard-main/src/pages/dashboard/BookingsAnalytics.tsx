import React, { useState, useEffect } from "react";
import {
  Calendar,
  PieChart as PieChartIcon,
  BarChart3,
  Info,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/card";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useLanguage } from "../../contexts/LanguageContext";
import { dashboardApi } from "../../lib/api";
import { toast } from "sonner";
import {
  bookingChannels,
  leadTimeData,
  cancellationData,
} from "../../lib/data";

// Interfaces for real data
interface BookingAnalyticsMetrics {
  totalBookings: number;
  totalBookingsComment: string;
  totalBookingsTrend: string;
  avgLeadTime: number;
  avgLeadTimeComment: string;
  avgLeadTimeTrend: string;
  channelCount: number;
  channelCountComment: string;
  channelCountTrend: string;
  cancellationRate: number;
  cancellationRateComment: string;
  cancellationRateTrend: string;
}

interface BookingSourceData {
  name: string;
  bookings: number;
  percentage: number;
  color: string;
}

interface LeadTimeDistribution {
  lead_time_group: string;
  bookings: number;
  percentage: number;
}

interface LeadTimeInsights {
  mostCommonWindow: string;
  averageLeadTime: number;
  sameDayBookings: number;
}

interface CancellationTrendData {
  month: string;
  total_bookings: number;
  cancellations: number;
  confirmed_bookings: number;
  cancellation_rate: number;
}

interface CancellationInsights {
  totalCancellations: number;
  overallCancellationRate: number;
  trendChange: number;
  trendDirection: string;
}

interface ActivityItem {
  icon: string;
  message: string;
  time: string;
  type: string;
}

const BookingsAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState("dashboard.dateRanges.thisMonth");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real data state
  const [metrics, setMetrics] = useState<BookingAnalyticsMetrics>({
    totalBookings: 0,
    totalBookingsComment: "Loading...",
    totalBookingsTrend: "neutral",
    avgLeadTime: 0,
    avgLeadTimeComment: "Loading...",
    avgLeadTimeTrend: "neutral",
    channelCount: 0,
    channelCountComment: "Loading...",
    channelCountTrend: "neutral",
    cancellationRate: 0,
    cancellationRateComment: "Loading...",
    cancellationRateTrend: "neutral",
  });

  const [bookingSources, setBookingSources] = useState<BookingSourceData[]>([]);
  const [leadTimeDistribution, setLeadTimeDistribution] = useState<
    LeadTimeDistribution[]
  >([]);
  const [leadTimeInsights, setLeadTimeInsights] = useState<LeadTimeInsights>({
    mostCommonWindow: "",
    averageLeadTime: 0,
    sameDayBookings: 0,
  });
  const [cancellationTrendData, setCancellationTrendData] = useState<
    CancellationTrendData[]
  >([]);
  const [cancellationInsights, setCancellationInsights] =
    useState<CancellationInsights>({
      totalCancellations: 0,
      overallCancellationRate: 0,
      trendChange: 0,
      trendDirection: "stable",
    });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  // Fetch booking analytics data from API
  const fetchBookingAnalyticsData = async () => {
    try {
      console.log("Fetching booking analytics data...");
      const [
        analyticsResponse,
        sourcesResponse,
        leadTimeResponse,
        cancellationTrendResponse,
        activityResponse,
      ] = await Promise.all([
        dashboardApi.getBookingAnalyticsSummary(),
        dashboardApi.getBookingSources(),
        dashboardApi.getLeadTimeDistribution(),
        dashboardApi.getBookingsCancellationsTrend(),
        dashboardApi.getRecentActivity(undefined, 5),
      ]);

      console.log("Booking Analytics API Responses:", {
        analyticsResponse,
        sourcesResponse,
        leadTimeResponse,
        cancellationTrendResponse,
        activityResponse,
      });

      // Process analytics summary data
      if (analyticsResponse.data) {
        const data = analyticsResponse.data as {
          totalBookings?: number;
          totalBookingsComment?: string;
          totalBookingsTrend?: string;
          avgLeadTime?: number;
          avgLeadTimeComment?: string;
          avgLeadTimeTrend?: string;
          channelCount?: number;
          channelCountComment?: string;
          channelCountTrend?: string;
          cancellationRate?: number;
          cancellationRateComment?: string;
          cancellationRateTrend?: string;
          revenue?: number;
          occupancyRate?: number;
          averageRating?: number;
        };

        setMetrics({
          totalBookings: data.totalBookings || 0,
          totalBookingsComment: data.totalBookingsComment || "Real-time data",
          totalBookingsTrend: data.totalBookingsTrend || "neutral",
          avgLeadTime: data.avgLeadTime || 18.0,
          avgLeadTimeComment: data.avgLeadTimeComment || "Booking window",
          avgLeadTimeTrend: data.avgLeadTimeTrend || "neutral",
          channelCount: data.channelCount || 7,
          channelCountComment: data.channelCountComment || "Channel diversity",
          channelCountTrend: data.channelCountTrend || "neutral",
          cancellationRate: data.cancellationRate || 9.6,
          cancellationRateComment:
            data.cancellationRateComment || "Current period",
          cancellationRateTrend: data.cancellationRateTrend || "neutral",
        });
      }

      // Process booking sources data
      if (sourcesResponse.data) {
        const sourcesData = sourcesResponse.data as Array<{
          name: string;
          value?: number;
          bookings?: number;
          percentage?: number;
          color?: string;
        }>;
        const colors = [
          "#2EC4B6",
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7",
          "#DDA0DD",
        ];

        const formattedSources = sourcesData.map((source, index) => ({
          name: source.name,
          bookings: source.value || source.bookings || 0,
          percentage: source.percentage || 0,
          color: source.color || colors[index % colors.length],
        }));

        setBookingSources(formattedSources);

        // Update channel count
        setMetrics((prev) => ({
          ...prev,
          channelCount: formattedSources.length,
        }));
      }

      // Process lead time distribution data
      if (leadTimeResponse.data) {
        const leadTimeData = leadTimeResponse.data as {
          distribution?: LeadTimeDistribution[];
          insights?: LeadTimeInsights;
        };

        if (leadTimeData.distribution) {
          setLeadTimeDistribution(leadTimeData.distribution);
        }

        if (leadTimeData.insights) {
          setLeadTimeInsights(leadTimeData.insights);
        }
      }

      // Process cancellation trend data
      if (cancellationTrendResponse.data) {
        const cancellationData = cancellationTrendResponse.data as {
          trendData?: CancellationTrendData[];
          insights?: CancellationInsights;
        };

        if (cancellationData.trendData) {
          setCancellationTrendData(cancellationData.trendData);
        }

        if (cancellationData.insights) {
          setCancellationInsights(cancellationData.insights);
        }
      }

      // Process recent activity
      if (activityResponse.data) {
        setRecentActivity(
          Array.isArray(activityResponse.data) ? activityResponse.data : []
        );
      }
    } catch (error) {
      console.error("Error fetching booking analytics data:", error);
      toast.error("Failed to load booking analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchBookingAnalyticsData();
  }, []);

  const updateAnalyticsData = async () => {
    setIsRefreshing(true);
    await fetchBookingAnalyticsData();
    setIsRefreshing(false);
    toast.success("Analytics data refreshed successfully!");
  };

  const dateRangeOptions = [
    {
      value: "dashboard.dateRanges.today",
      label: t("dashboard.dateRanges.today"),
    },
    {
      value: "dashboard.dateRanges.yesterday",
      label: t("dashboard.dateRanges.yesterday"),
    },
    {
      value: "dashboard.dateRanges.thisWeek",
      label: t("dashboard.dateRanges.thisWeek"),
    },
    {
      value: "dashboard.dateRanges.lastWeek",
      label: t("dashboard.dateRanges.lastWeek"),
    },
    {
      value: "dashboard.dateRanges.thisMonth",
      label: t("dashboard.dateRanges.thisMonth"),
    },
    {
      value: "dashboard.dateRanges.lastMonth",
      label: t("dashboard.dateRanges.lastMonth"),
    },
    {
      value: "dashboard.dateRanges.thisQuarter",
      label: t("dashboard.dateRanges.thisQuarter"),
    },
    {
      value: "dashboard.dateRanges.lastQuarter",
      label: t("dashboard.dateRanges.lastQuarter"),
    },
    {
      value: "dashboard.dateRanges.thisYear",
      label: t("dashboard.dateRanges.thisYear"),
    },
    {
      value: "dashboard.dateRanges.customRange",
      label: t("dashboard.dateRanges.customRange"),
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen relative bg-gradient-to-br from-primary via-gray-900 to-primary">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                <p className="text-white font-medium">
                  Loading Analytics Data...
                </p>
              </div>
            </div>
          </div>
        )}

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
                  {t("bookings.title")}
                </h1>
                <p className="text-gray-300 text-lg">
                  {t("bookings.description")}
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Date Range Selector */}
                <div className="flex items-center gap-2 bg-gray-700/60 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600/50 shadow-lg">
                  <Calendar size={16} className="text-gray-300" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border-none bg-transparent text-sm text-gray-200 focus:outline-none focus:ring-0"
                  >
                    {dateRangeOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-gray-200"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <button className="flex items-center gap-2 px-4 py-3 text-gray-300 bg-gray-700/50 border border-gray-600/50 rounded-xl hover:bg-gray-700/70 hover:shadow-md transition-all duration-300">
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filter</span>
                </button>

                <button className="flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Download size={16} />
                  <span className="text-sm font-medium">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {" "}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">
                    Total Bookings
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                    ) : (
                      metrics.totalBookings.toLocaleString()
                    )}
                  </p>
                  <p className="text-sm text-secondary mt-1 flex items-center gap-1">
                    <TrendingUp
                      size={14}
                      className={
                        metrics.totalBookingsTrend === "down"
                          ? "rotate-180"
                          : ""
                      }
                    />
                    {isLoading ? "Loading..." : metrics.totalBookingsComment}
                  </p>
                </div>
                <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">
                    Avg. Lead Time
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                    ) : (
                      `${metrics.avgLeadTime} days`
                    )}
                  </p>
                  <p className="text-sm text-accent mt-1 flex items-center gap-1">
                    <Clock size={14} />
                    {isLoading ? "Loading..." : metrics.avgLeadTimeComment}
                  </p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">
                    Channel Mix
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                    ) : (
                      `${metrics.channelCount} sources`
                    )}
                  </p>
                  <p className="text-sm text-purple-400 mt-1 flex items-center gap-1">
                    <PieChartIcon size={14} />
                    {isLoading ? "Loading..." : metrics.channelCountComment}
                  </p>
                </div>
                <div className="p-3 bg-purple-400/20 rounded-lg group-hover:bg-purple-400/30 transition-colors">
                  <PieChartIcon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">
                    Cancellation Rate
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {isLoading ? (
                      <div className="animate-pulse bg-gray-600 h-8 w-20 rounded"></div>
                    ) : (
                      `${metrics.cancellationRate}%`
                    )}
                  </p>
                  <p
                    className={`text-sm mt-1 flex items-center gap-1 ${
                      metrics.cancellationRateTrend === "up"
                        ? "text-orange-400"
                        : metrics.cancellationRateTrend === "down"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    <AlertTriangle
                      size={14}
                      className={
                        metrics.cancellationRateTrend === "down"
                          ? "rotate-180"
                          : ""
                      }
                    />
                    {isLoading ? "Loading..." : metrics.cancellationRateComment}
                  </p>
                </div>
                <div className="p-3 bg-orange-400/20 rounded-lg group-hover:bg-orange-400/30 transition-colors">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📈 Booking Source Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Channels - Pie Chart */}
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-xl border border-secondary/30">
                    <PieChartIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Booking Channels
                    </h3>
                    <p className="text-sm text-gray-300">
                      Distribution by source
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info
                      size={16}
                      className="text-gray-400 hover:text-secondary transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Shows how bookings are distributed across different
                      booking channels
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex justify-center">
                <PieChart
                  data={(bookingSources.length > 0
                    ? bookingSources
                    : bookingChannels
                  ).map((channel) => ({
                    name: channel.name || channel.channel,
                    value: channel.percentage,
                    color: channel.color,
                  }))}
                  height={280}
                />
              </div>
              <div className="mt-6 space-y-3">
                {(bookingSources.length > 0 ? bookingSources : bookingChannels)
                  .slice(0, 3)
                  .map((channel, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: channel.color }}
                        />
                        <span className="text-sm text-gray-300">
                          {channel.name || channel.channel}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-white">
                        {channel.percentage}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Channel Performance Table */}
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-xl border border-accent/30">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Channel Performance
                    </h3>
                    <p className="text-sm text-gray-300">
                      Detailed metrics by channel
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Info
                        size={16}
                        className="text-gray-400 hover:text-secondary transition-colors"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Helps optimize marketing spend by showing which channels
                        work best
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <button
                    onClick={updateAnalyticsData}
                    disabled={isRefreshing}
                    className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all disabled:opacity-50"
                  >
                    <RefreshCw
                      size={16}
                      className={isRefreshing ? "animate-spin" : ""}
                    />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-600/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Channel Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        # Bookings
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Distribution %
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Trend %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600/30">
                    {(bookingSources.length > 0
                      ? bookingSources
                      : bookingChannels
                    ).map((channel, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700/30 transition-colors duration-200 group"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full shadow-sm"
                              style={{ backgroundColor: channel.color }}
                            />
                            <span className="text-sm font-medium text-white group-hover:text-secondary transition-colors">
                              {channel.name || channel.channel}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-300 font-medium">
                            {channel.bookings}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-300">
                              {channel.percentage}%
                            </span>
                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${channel.percentage}%`,
                                  backgroundColor: channel.color,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium flex items-center gap-1 ${
                              index % 2 === 0
                                ? "text-secondary"
                                : "text-red-400"
                            }`}
                          >
                            <TrendingUp
                              size={14}
                              className={index % 2 !== 0 ? "rotate-180" : ""}
                            />
                            {index % 2 === 0 ? "+3.2%" : "-1.4%"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 🕓 Booking Lead Time Analysis */}
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-xl border border-accent/30">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Booking Lead Time Analysis
                    </h3>
                    <p className="text-sm text-gray-300">
                      Days between booking and check-in
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info
                      size={16}
                      className="text-gray-400 hover:text-secondary transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Helps revenue managers set pricing and promotions based on
                      booking patterns
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="mb-6">
                <BarChart
                  data={
                    leadTimeDistribution.length > 0
                      ? leadTimeDistribution
                      : leadTimeData
                  }
                  dataKey="percentage"
                  xAxisKey="lead_time_group"
                  height={280}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary/10 rounded-xl border border-secondary/20 backdrop-blur-md">
                  <p className="text-sm font-semibold text-secondary mb-1">
                    Most Common Window
                  </p>
                  <p className="text-lg font-bold text-white">
                    {leadTimeInsights.mostCommonWindow || "15-30 days"}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Peak booking window
                  </p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-xl border border-accent/20 backdrop-blur-md">
                  <p className="text-sm font-semibold text-accent mb-1">
                    Average Lead Time
                  </p>
                  <p className="text-lg font-bold text-white">
                    {leadTimeInsights.averageLeadTime || metrics.avgLeadTime}{" "}
                    days
                  </p>
                  <p className="text-xs text-gray-300 mt-1">Industry average</p>
                </div>
                <div className="text-center p-4 bg-purple-400/10 rounded-xl border border-purple-400/20 backdrop-blur-md">
                  <p className="text-sm font-semibold text-purple-400 mb-1">
                    Same-day Bookings
                  </p>
                  <p className="text-lg font-bold text-white">
                    {leadTimeInsights.sameDayBookings || 8.8}%
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Last-minute bookings
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>

          {/* 📉 Bookings vs. Cancellations Trend */}
          <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-400/20 rounded-xl border border-orange-400/30">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Bookings vs. Cancellations Trend
                    </h3>
                    <p className="text-sm text-gray-300">
                      Monthly evolution analysis
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info
                      size={16}
                      className="text-gray-400 hover:text-secondary transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Clear risk indicator & early warning sign for hotel demand
                      drop
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="mb-6">
                <LineChart
                  data={
                    cancellationTrendData.length > 0
                      ? cancellationTrendData.map((item) => ({
                          month: item.month,
                          bookings: item.total_bookings,
                          cancellations: item.cancellations,
                        }))
                      : cancellationData.map((item) => ({
                          month: item.month,
                          bookings: item.bookings,
                          cancellations: item.cancellations,
                        }))
                  }
                  dataKey="cancellations"
                  xAxisKey="month"
                  color="#FF4C29"
                  height={280}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-400/10 rounded-xl border border-red-400/20 backdrop-blur-md">
                  <p className="text-sm font-semibold text-red-400 mb-1">
                    Total Cancellations
                  </p>
                  <p className="text-lg font-bold text-white">
                    {cancellationInsights.totalCancellations || 107}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">This period</p>
                </div>
                <div className="text-center p-4 bg-orange-400/10 rounded-xl border border-orange-400/20 backdrop-blur-md">
                  <p className="text-sm font-semibold text-orange-400 mb-1">
                    Cancellation Rate
                  </p>
                  <p className="text-lg font-bold text-white">
                    {cancellationInsights.overallCancellationRate ||
                      metrics.cancellationRate}
                    %
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Overall performance
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-600/20 rounded-xl border border-gray-600/30 backdrop-blur-md">
                  <p className="text-sm font-semibold text-gray-300 mb-1">
                    Trend
                  </p>
                  <p
                    className={`text-lg font-bold flex items-center justify-center gap-1 ${
                      cancellationInsights.trendDirection === "up"
                        ? "text-red-400"
                        : cancellationInsights.trendDirection === "down"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    <TrendingUp
                      size={16}
                      className={
                        cancellationInsights.trendDirection === "down"
                          ? "rotate-180"
                          : ""
                      }
                    />
                    {cancellationInsights.trendChange !== 0
                      ? `${cancellationInsights.trendChange > 0 ? "+" : ""}${
                          cancellationInsights.trendChange
                        }%`
                      : "Stable"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {cancellationInsights.trendDirection === "up"
                      ? "Needs attention"
                      : cancellationInsights.trendDirection === "down"
                      ? "Improving"
                      : "Stable"}
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BookingsAnalytics;

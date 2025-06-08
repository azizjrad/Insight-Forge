import React, { useState } from "react";
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
import LanguageSelector from "../../components/layout/LanguageSelector";
import { Card } from "../../components/ui/card";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import ScrollToTop from "../../components/ui/ScrollToTop";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  bookingChannels,
  leadTimeData,
  cancellationData,
} from "../../lib/data";

const BookingsAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState("dashboard.dateRanges.thisMonth");

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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title={t("bookings.title")}
        description={t("bookings.description")}
        actions={
          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <Calendar size={16} className="text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  {dateRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-primary to-primary/90 rounded-xl hover:from-primary/90 hover:to-primary/80 hover:shadow-md transition-all duration-200">
                <Download size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>

            <LanguageSelector variant="dashboard" />
          </div>
        }
      />

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-1">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-blue-900">2,847</p>
              <p className="text-sm text-blue-600 mt-1">
                <TrendingUp size={14} className="inline mr-1" />
                +12.5% from last period
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">
                Avg. Lead Time
              </p>
              <p className="text-2xl font-bold text-green-900">18 days</p>
              <p className="text-sm text-green-600 mt-1">
                <Clock size={14} className="inline mr-1" />
                Optimal booking window
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">
                Channel Mix
              </p>
              <p className="text-2xl font-bold text-purple-900">7 sources</p>
              <p className="text-sm text-purple-600 mt-1">
                <PieChartIcon size={14} className="inline mr-1" />
                Well diversified
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
              <PieChartIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-1">
                Cancellation Rate
              </p>
              <p className="text-2xl font-bold text-orange-900">9.6%</p>
              <p className="text-sm text-orange-600 mt-1">
                <AlertTriangle size={14} className="inline mr-1" />
                +1.2% vs last period
              </p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Booking Channels Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Card */}
        <Card className="bg-white border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("bookings.bookingChannels")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Distribution by source
                  </p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-primary transition-colors"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    {t("bookings.channelsDesc")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <PieChart
                data={bookingChannels.map((channel) => ({
                  name: channel.channel,
                  value: channel.percentage,
                  color: channel.color,
                }))}
                height={280}
              />
            </div>
            <div className="mt-6 space-y-3">
              {bookingChannels.slice(0, 3).map((channel, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="text-sm text-gray-700">
                      {channel.channel}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {channel.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Channel Performance Table */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-xl">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("bookings.channelPerformance")}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Detailed metrics by channel
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Info
                        size={16}
                        className="text-gray-400 hover:text-primary transition-colors"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        {t("bookings.performanceDesc")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {t("bookings.channel")}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {t("dashboard.bookings")}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {t("bookings.distribution")}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {t("bookings.trend")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {bookingChannels.map((channel, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors duration-200 group"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full shadow-sm"
                              style={{ backgroundColor: channel.color }}
                            />
                            <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                              {channel.channel}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-700 font-medium">
                            {channel.bookings}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">
                              {channel.percentage}%
                            </span>
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
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
                                ? "text-green-600"
                                : "text-red-600"
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
          </Card>
        </div>
      </div>

      {/* Lead Time & Cancellations Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Time Analysis */}
        <Card className="bg-white border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("bookings.bookingLeadTime")}
                  </h3>
                  <p className="text-sm text-gray-500">Days before check-in</p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-primary transition-colors"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    {t("bookings.leadTimeDesc")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="mb-6">
              <BarChart
                data={leadTimeData}
                dataKey="percentage"
                xAxisKey="range"
                height={280}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-700 mb-1">
                  {t("bookings.mostCommon")}
                </p>
                <p className="text-lg font-bold text-blue-900">15-30 days</p>
                <p className="text-xs text-blue-600 mt-1">
                  Peak booking window
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200/50">
                <p className="text-sm font-semibold text-green-700 mb-1">
                  {t("bookings.averageLeadTime")}
                </p>
                <p className="text-lg font-bold text-green-900">18 days</p>
                <p className="text-xs text-green-600 mt-1">Industry average</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50">
                <p className="text-sm font-semibold text-purple-700 mb-1">
                  {t("bookings.sameDayBookings")}
                </p>
                <p className="text-lg font-bold text-purple-900">8.8%</p>
                <p className="text-xs text-purple-600 mt-1">
                  Last-minute bookings
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Cancellations Analysis */}
        <Card className="bg-white border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500/10 to-red-500/20 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t("bookings.bookingsVsCancellations")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Monthly trend analysis
                  </p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-primary transition-colors"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    {t("bookings.cancellationsDesc")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="mb-6">
              <LineChart
                data={cancellationData.map((item) => ({
                  month: item.month,
                  bookings: item.bookings,
                  cancellations: item.cancellations,
                }))}
                dataKey="cancellations"
                xAxisKey="month"
                color="#FF4C29"
                height={280}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200/50">
                <p className="text-sm font-semibold text-red-700 mb-1">
                  {t("bookings.totalCancellations")}
                </p>
                <p className="text-lg font-bold text-red-900">107</p>
                <p className="text-xs text-red-600 mt-1">This period</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/50">
                <p className="text-sm font-semibold text-orange-700 mb-1">
                  {t("bookings.cancellationRate")}
                </p>
                <p className="text-lg font-bold text-orange-900">9.6%</p>
                <p className="text-xs text-orange-600 mt-1">
                  Below industry avg
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {t("bookings.trend")}
                </p>
                <p className="text-lg font-bold text-red-900 flex items-center justify-center gap-1">
                  <TrendingUp size={16} className="rotate-180" />
                  +1.2%
                </p>
                <p className="text-xs text-gray-600 mt-1">Needs attention</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default BookingsAnalytics;

import React, { useState } from "react";
import { Calendar, Users, Map, BarChart3, Info, Clock } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/card";
import WorldMap from "../../components/charts/WorldMap";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import ScrollToTop from "../../components/ui/ScrollToTop";
import { useLanguage } from "../../contexts/LanguageContext";
import { useData } from "../../contexts/DataContext";

const GuestSegments: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState("dashboard.dateRanges.thisMonth");
  const { isDataLoaded, getGuestDistribution } = useData();

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

  const generateHeatmapData = () => {
    const countries = [
      "USA",
      "Canada",
      "UK",
      "Germany",
      "France",
      "Japan",
      "China",
      "Australia",
      "Brazil",
      "India",
      "Italy",
      "Spain",
      "Mexico",
      "South Korea",
      "Netherlands",
      "Switzerland",
      "Sweden",
      "Norway",
      "Denmark",
      "Finland",
    ];

    const getColorBasedOnValue = (value: number): string => {
      if (value > 80) return "#2EC4B6";
      if (value > 60) return "#2EC4B6AA";
      if (value > 40) return "#2EC4B680";
      if (value > 20) return "#2EC4B650";
      return "#2EC4B630";
    };

    return countries.map((country) => ({
      name: country,
      value: Math.floor(Math.random() * 100),
      color: getColorBasedOnValue(Math.floor(Math.random() * 100)),
    }));
  };

  const nationalityData = isDataLoaded
    ? getGuestDistribution()
    : generateHeatmapData();

  const getColorBasedOnValue = (value: number): string => {
    if (value > 80) return "#2EC4B6";
    if (value > 60) return "#2EC4B6AA";
    if (value > 40) return "#2EC4B680";
    if (value > 20) return "#2EC4B650";
    return "#2EC4B630";
  };

  const chartData = nationalityData.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: getColorBasedOnValue(item.value),
  }));

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-primary via-gray-900 to-primary">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 animate-fade-in space-y-8 p-8">
        {/* Enhanced Header */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent mb-2">
                {t("guests.title")}
              </h1>
              <p className="text-gray-300 text-lg">{t("guests.description")}</p>
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
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Total Guests
                </p>
                <p className="text-2xl font-bold text-blue-400">1,247</p>
                <p className="text-sm text-blue-300 mt-1">
                  <Users size={14} className="inline mr-1" />
                  +8.2% from last period
                </p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Returning Guests
                </p>
                <p className="text-2xl font-bold text-green-400">342</p>
                <p className="text-sm text-green-300 mt-1">
                  <BarChart3 size={14} className="inline mr-1" />
                  27.4% retention rate
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Nationalities
                </p>
                <p className="text-2xl font-bold text-purple-400">42</p>
                <p className="text-sm text-purple-300 mt-1">
                  <Map size={14} className="inline mr-1" />
                  Global diversity
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                <Map className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Avg. Stay
                </p>
                <p className="text-2xl font-bold text-orange-400">3.4 days</p>
                <p className="text-sm text-orange-300 mt-1">
                  <Calendar size={14} className="inline mr-1" />
                  +0.3 days vs last month
                </p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nationality Heatmap */}
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-secondary/30 transition-all duration-300">
            <div className="border-b border-gray-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                    <Map className="w-5 h-5 text-secondary" />
                    {t("guests.nationalityHeatmap")}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Global distribution of guest origins
                  </p>
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
                      {t("guests.heatmapDesc")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="p-6">
              <WorldMap data={nationalityData} />
            </div>
          </Card>

          {/* Nationality Distribution */}
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-300">
            <div className="border-b border-gray-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    {t("guests.nationalityDistribution")}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Breakdown by guest nationality
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info
                      size={16}
                      className="text-gray-400 hover:text-accent transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      {t("guests.distributionDesc")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-center">
                <PieChart
                  data={chartData}
                  height={250}
                  innerRadius={60}
                  outerRadius={80}
                />
              </div>

              <div className="mt-6 space-y-3">
                {chartData.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl hover:bg-gray-600/40 border border-gray-600/30 hover:border-gray-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-gray-200 font-semibold">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Trends */}
        <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-300">
          <div className="border-b border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  {t("guests.bookingTrends")}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Monthly booking patterns and growth trends
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-accent transition-colors"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{t("guests.trendsDesc")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="p-6">
            <BarChart
              data={[
                { month: "Jan", bookings: 50 },
                { month: "Feb", bookings: 75 },
                { month: "Mar", bookings: 60 },
                { month: "Apr", bookings: 80 },
                { month: "May", bookings: 90 },
              ]}
              dataKey="bookings"
              xAxisKey="month"
              color="#E84855"
              height={250}
            />
          </div>
        </Card>

        {/* Guest Demographics Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Guest Age Distribution
                </h3>
                <p className="text-sm text-gray-400">
                  Demographics breakdown by age groups
                </p>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">18-25 years</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-600/60 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-indigo-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-200">18%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">26-35 years</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-600/60 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-indigo-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-200">32%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">36-50 years</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-600/60 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-indigo-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-200">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">50+ years</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-600/60 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-indigo-400 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-200">22%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  Stay Purpose
                </h3>
                <p className="text-sm text-gray-400">
                  Reasons for hotel visits
                </p>
              </div>
              <div className="p-3 bg-teal-500/10 rounded-xl">
                <Map className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/30">
                <span className="text-sm font-medium text-gray-300">
                  Business
                </span>
                <span className="text-lg font-bold text-teal-400">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/30">
                <span className="text-sm font-medium text-gray-300">
                  Leisure
                </span>
                <span className="text-lg font-bold text-teal-400">38%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/30">
                <span className="text-sm font-medium text-gray-300">
                  Events
                </span>
                <span className="text-lg font-bold text-teal-400">12%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/30">
                <span className="text-sm font-medium text-gray-300">Other</span>
                <span className="text-lg font-bold text-teal-400">5%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Scroll to top button */}
        <ScrollToTop />
      </div>
    </div>
  );
};

export default GuestSegments;

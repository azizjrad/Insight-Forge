import React, { useState } from "react";
import { Calendar, Users, Map, BarChart3, Info } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import LanguageSelector from "../../components/layout/LanguageSelector";
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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title={t("guests.title")}
        description={t("guests.description")}
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
                Total Guests
              </p>
              <p className="text-2xl font-bold text-blue-900">1,247</p>
              <p className="text-sm text-blue-600 mt-1">
                <Users size={14} className="inline mr-1" />
                +8.2% from last period
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">
                Returning Guests
              </p>
              <p className="text-2xl font-bold text-green-900">342</p>
              <p className="text-sm text-green-600 mt-1">
                <BarChart3 size={14} className="inline mr-1" />
                27.4% retention rate
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">
                Nationalities
              </p>
              <p className="text-2xl font-bold text-purple-900">42</p>
              <p className="text-sm text-purple-600 mt-1">
                <Map size={14} className="inline mr-1" />
                Global diversity
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
              <Map className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-1">
                Avg. Stay
              </p>
              <p className="text-2xl font-bold text-orange-900">3.4 days</p>
              <p className="text-sm text-orange-600 mt-1">
                <Calendar size={14} className="inline mr-1" />
                +0.3 days vs last month
              </p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nationality Heatmap */}
        <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  {t("guests.nationalityHeatmap")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Global distribution of guest origins
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{t("guests.heatmapDesc")}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="p-6">
            <WorldMap data={nationalityData} />
          </div>
        </Card>

        {/* Nationality Distribution */}
        <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  {t("guests.nationalityDistribution")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Breakdown by guest nationality
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info
                    size={16}
                    className="text-gray-400 hover:text-gray-600"
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
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-gray-900 font-semibold">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Booking Trends */}
      <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                {t("guests.bookingTrends")}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Monthly booking patterns and growth trends
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
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
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border-indigo-200/50 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                Guest Age Distribution
              </h3>
              <p className="text-sm text-indigo-700">
                Demographics breakdown by age groups
              </p>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">18-25 years</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-indigo-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-indigo-900">18%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">26-35 years</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-indigo-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-indigo-900">32%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">36-50 years</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-indigo-900">28%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-700">50+ years</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-indigo-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-indigo-900">22%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100/50 border-teal-200/50 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-teal-900 mb-2">
                Stay Purpose
              </h3>
              <p className="text-sm text-teal-700">Reasons for hotel visits</p>
            </div>
            <div className="p-3 bg-teal-500/10 rounded-xl">
              <Map className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-teal-100/50 rounded-lg">
              <span className="text-sm font-medium text-teal-800">
                Business
              </span>
              <span className="text-lg font-bold text-teal-900">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-100/50 rounded-lg">
              <span className="text-sm font-medium text-teal-800">Leisure</span>
              <span className="text-lg font-bold text-teal-900">38%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-100/50 rounded-lg">
              <span className="text-sm font-medium text-teal-800">Events</span>
              <span className="text-lg font-bold text-teal-900">12%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-teal-100/50 rounded-lg">
              <span className="text-sm font-medium text-teal-800">Other</span>
              <span className="text-lg font-bold text-teal-900">5%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default GuestSegments;

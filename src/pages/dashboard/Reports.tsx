import React, { useState, useMemo } from "react";
import {
  Calendar,
  Download,
  Filter,
  FileText,
  ChevronDown,
  Users as UsersIcon,
  BarChart3,
  TrendingUp,
  Eye,
  Settings,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { useData } from "../../contexts/DataContext";

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState("revenue");
  const [dateRange, setDateRange] = useState("This Month");
  const [isGenerating, setIsGenerating] = useState(false);

  const dateRangeOptions = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Quarter",
    "Last Quarter",
    "This Year",
    "Custom Range",
  ];

  const reportTypes = [
    {
      id: "revenue",
      name: "Revenue Report",
      description:
        "Detailed breakdown of revenue by source, room type, and time period",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-700/50",
    },
    {
      id: "occupancy",
      name: "Occupancy Report",
      description: "Room occupancy rates and trends over time",
      icon: BarChart3,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-700/50",
    },
    {
      id: "guests",
      name: "Guest Demographics",
      description:
        "Analysis of guest demographics, nationalities, and preferences",
      icon: UsersIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-700/50",
    },
    {
      id: "marketing",
      name: "Marketing Performance",
      description: "Effectiveness of marketing channels and campaigns",
      icon: Eye,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-700/50",
    },
    {
      id: "forecast",
      name: "Revenue Forecast",
      description:
        "Projected revenue based on current bookings and historical data",
      icon: TrendingUp,
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/20",
      borderColor: "border-indigo-700/50",
    },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
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
                Reports & Analytics
              </h1>
              <p className="text-gray-300 text-lg">
                Generate comprehensive reports and insights from your hotel data
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-700/60 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600/50 shadow-lg">
                <Calendar size={16} className="text-gray-300" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-none bg-transparent text-sm text-gray-200 focus:outline-none focus:ring-0"
                >
                  {dateRangeOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-gray-800 text-gray-200"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button className="flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Report Types */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden rounded-2xl">
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FileText size={18} className="text-secondary" />
                  Report Types
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Choose a report to generate
                </p>
              </div>
              <div className="p-2">
                {reportTypes.map((report) => {
                  const IconComponent = report.icon;
                  const isActive = activeReport === report.id;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setActiveReport(report.id)}
                      className={`w-full p-4 mb-2 rounded-xl transition-all duration-300 text-left group ${
                        isActive
                          ? `bg-gradient-to-r from-secondary/20 to-secondary/10 border-2 border-secondary/30 shadow-lg`
                          : "hover:bg-gray-700/30 border-2 border-transparent hover:border-gray-600/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-secondary/20 shadow-sm"
                              : "bg-gray-700/30 group-hover:bg-gray-600/40"
                          }`}
                        >
                          <IconComponent
                            size={18}
                            className={
                              isActive
                                ? "text-secondary"
                                : "text-gray-400 group-hover:text-gray-300"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-medium text-sm transition-colors ${
                              isActive ? "text-white" : "text-gray-300"
                            } group-hover:text-white`}
                          >
                            {report.name}
                          </h4>
                          <p
                            className={`text-xs mt-1 line-clamp-2 transition-colors ${
                              isActive ? "text-gray-300" : "text-gray-400"
                            } group-hover:text-gray-300`}
                          >
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Report Configuration */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header Card */}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {(() => {
                    const activeReportData = reportTypes.find(
                      (r) => r.id === activeReport
                    );
                    const IconComponent = activeReportData?.icon || FileText;
                    return (
                      <>
                        <div className="p-3 rounded-xl bg-secondary/20 border border-secondary/30">
                          <IconComponent size={24} className="text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {activeReportData?.name}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1 max-w-md">
                            {activeReportData?.description}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-6">
              <div className="space-y-6">
                {/* Format Options */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Export Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        format: "PDF",
                        desc: "Professional report",
                        icon: "📄",
                      },
                      {
                        format: "Excel",
                        desc: "Spreadsheet format",
                        icon: "📊",
                      },
                      { format: "CSV", desc: "Raw data export", icon: "📋" },
                    ].map((option) => (
                      <div key={option.format} className="relative">
                        <input
                          type="radio"
                          name="report-format"
                          id={`format-${option.format}`}
                          className="peer sr-only"
                          defaultChecked={option.format === "PDF"}
                        />
                        <label
                          htmlFor={`format-${option.format}`}
                          className="flex items-center p-4 bg-gray-700/50 backdrop-blur-md border-2 border-gray-600/50 rounded-xl cursor-pointer hover:border-secondary/50 hover:bg-gray-700/70 peer-checked:border-secondary peer-checked:bg-secondary/10 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <span className="text-2xl">{option.icon}</span>
                            <div>
                              <div className="font-medium text-white">
                                {option.format}
                              </div>
                              <div className="text-xs text-gray-300">
                                {option.desc}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Grouping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Time Period Grouping
                    </label>
                    <select className="block w-full px-4 py-3 border-2 border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300 bg-gray-700/50 backdrop-blur-md text-white">
                      <option className="bg-gray-800 text-white">Daily</option>
                      <option className="bg-gray-800 text-white">Weekly</option>
                      <option className="bg-gray-800 text-white">
                        Monthly
                      </option>
                      <option className="bg-gray-800 text-white">
                        Quarterly
                      </option>
                      <option className="bg-gray-800 text-white">Yearly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      Currency Display
                    </label>
                    <select className="block w-full px-4 py-3 border-2 border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300 bg-gray-700/50 backdrop-blur-md text-white">
                      <option className="bg-gray-800 text-white">
                        USD ($)
                      </option>
                      <option className="bg-gray-800 text-white">
                        EUR (€)
                      </option>
                      <option className="bg-gray-800 text-white">
                        GBP (£)
                      </option>
                      <option className="bg-gray-800 text-white">
                        TND (د.ت)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Report-specific Options */}
                {activeReport === "revenue" && (
                  <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-6 border border-secondary/20 backdrop-blur-md">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-secondary" />
                      Revenue Analysis Options
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Revenue Categories
                        </label>
                        <div className="space-y-3">
                          {[
                            "Room Revenue",
                            "F&B Revenue",
                            "Spa & Wellness",
                            "Additional Services",
                            "Taxes & Fees",
                          ].map((category) => (
                            <div key={category} className="flex items-center">
                              <input
                                id={`category-${category}`}
                                name={`category-${category}`}
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 text-secondary focus:ring-secondary/20 border-gray-500 rounded bg-gray-700"
                              />
                              <label
                                htmlFor={`category-${category}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Comparison Analysis
                        </label>
                        <div className="space-y-3">
                          {[
                            "Previous Period",
                            "Same Period Last Year",
                            "Budget vs Actual",
                            "Forecast Comparison",
                          ].map((comparison) => (
                            <div key={comparison} className="flex items-center">
                              <input
                                id={`comparison-${comparison}`}
                                name={`comparison-${comparison}`}
                                type="checkbox"
                                defaultChecked={
                                  comparison === "Previous Period"
                                }
                                className="h-4 w-4 text-secondary focus:ring-secondary/20 border-gray-500 rounded bg-gray-700"
                              />
                              <label
                                htmlFor={`comparison-${comparison}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {comparison}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeReport === "guests" && (
                  <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 border border-accent/20 backdrop-blur-md">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <UsersIcon size={18} className="text-accent" />
                      Guest Analysis Options
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Demographics & Attributes
                        </label>
                        <div className="space-y-3">
                          {[
                            "Nationality",
                            "Age Groups",
                            "Gender Distribution",
                            "Loyalty Status",
                            "Booking Channels",
                            "Average Stay Length",
                          ].map((attribute) => (
                            <div key={attribute} className="flex items-center">
                              <input
                                id={`attribute-${attribute}`}
                                name={`attribute-${attribute}`}
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 text-accent focus:ring-accent/20 border-gray-500 rounded bg-gray-700"
                              />
                              <label
                                htmlFor={`attribute-${attribute}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {attribute}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Visualization Style
                        </label>
                        <div className="space-y-3">
                          {[
                            "Interactive Charts",
                            "Geographic Heat Maps",
                            "Trend Analysis",
                            "Comparative Tables",
                            "Summary Dashboard",
                          ].map((vizType) => (
                            <div key={vizType} className="flex items-center">
                              <input
                                id={`viz-${vizType}`}
                                name="visualization"
                                type="radio"
                                defaultChecked={
                                  vizType === "Interactive Charts"
                                }
                                className="h-4 w-4 text-accent focus:ring-accent/20 border-gray-500 bg-gray-700"
                              />
                              <label
                                htmlFor={`viz-${vizType}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {vizType}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeReport === "occupancy" && (
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-400/20 backdrop-blur-md">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 size={18} className="text-blue-400" />
                      Occupancy Analysis Options
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Room Categories
                        </label>
                        <div className="space-y-3">
                          {[
                            "All Room Types",
                            "Standard Rooms",
                            "Deluxe Rooms",
                            "Suites & Villas",
                            "Accessible Rooms",
                          ].map((roomType) => (
                            <div key={roomType} className="flex items-center">
                              <input
                                id={`room-${roomType}`}
                                name={`room-${roomType}`}
                                type="checkbox"
                                defaultChecked={roomType === "All Room Types"}
                                className="h-4 w-4 text-blue-400 focus:ring-blue-400/20 border-gray-500 rounded bg-gray-700"
                              />
                              <label
                                htmlFor={`room-${roomType}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {roomType}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-3">
                          Key Performance Metrics
                        </label>
                        <div className="space-y-3">
                          {[
                            "Occupancy Rate %",
                            "Average Daily Rate (ADR)",
                            "Revenue Per Room (RevPAR)",
                            "Length of Stay",
                            "Booking Lead Time",
                          ].map((metric) => (
                            <div key={metric} className="flex items-center">
                              <input
                                id={`metric-${metric}`}
                                name={`metric-${metric}`}
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 text-blue-400 focus:ring-blue-400/20 border-gray-500 rounded bg-gray-700"
                              />
                              <label
                                htmlFor={`metric-${metric}`}
                                className="ml-3 block text-sm text-gray-200 font-medium"
                              >
                                {metric}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Advanced Options */}
                <div className="border-t border-gray-600/50 pt-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white font-medium transition-colors"
                      onClick={() =>
                        document
                          .getElementById("advanced-options")
                          ?.classList.toggle("hidden")
                      }
                    >
                      <Settings size={16} />
                      <span>Advanced Configuration</span>
                      <ChevronDown
                        size={16}
                        className="transform transition-transform duration-200"
                      />
                    </button>
                  </div>

                  <div
                    id="advanced-options"
                    className="hidden mt-6 space-y-6 bg-gray-700/30 backdrop-blur-md rounded-xl p-6 border border-gray-600/50"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        Report Notes & Comments
                      </label>
                      <textarea
                        rows={4}
                        className="block w-full px-4 py-3 border-2 border-gray-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300 bg-gray-700/50 backdrop-blur-md text-white placeholder-gray-400 resize-none"
                        placeholder="Add contextual notes, analysis insights, or custom comments to include in your report..."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h5 className="font-medium text-white">
                          Report Features
                        </h5>
                        {[
                          {
                            id: "include-charts",
                            label: "Include interactive visualizations",
                            checked: true,
                          },
                          {
                            id: "include-raw-data",
                            label: "Append raw data tables",
                            checked: false,
                          },
                          {
                            id: "include-summary",
                            label: "Executive summary page",
                            checked: true,
                          },
                          {
                            id: "include-recommendations",
                            label: "AI-powered insights",
                            checked: true,
                          },
                        ].map((feature) => (
                          <div key={feature.id} className="flex items-center">
                            <input
                              id={feature.id}
                              name={feature.id}
                              type="checkbox"
                              defaultChecked={feature.checked}
                              className="h-4 w-4 text-secondary focus:ring-secondary/20 border-gray-500 rounded bg-gray-700"
                            />
                            <label
                              htmlFor={feature.id}
                              className="ml-3 block text-sm text-gray-200 font-medium"
                            >
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h5 className="font-medium text-white">
                          Delivery Options
                        </h5>
                        {[
                          {
                            id: "auto-email",
                            label: "Email when ready",
                            checked: true,
                          },
                          {
                            id: "schedule-recurring",
                            label: "Schedule recurring reports",
                            checked: false,
                          },
                          {
                            id: "share-team",
                            label: "Share with team members",
                            checked: false,
                          },
                          {
                            id: "archive-reports",
                            label: "Auto-archive after 30 days",
                            checked: true,
                          },
                        ].map((option) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              id={option.id}
                              name={option.id}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 text-secondary focus:ring-secondary/20 border-gray-500 rounded bg-gray-700"
                            />
                            <label
                              htmlFor={option.id}
                              className="ml-3 block text-sm text-gray-200 font-medium"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Recent Reports */}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Clock size={20} className="text-secondary" />
                    Recent Reports
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Your previously generated reports and downloads
                  </p>
                </div>
                <button className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                  View All Reports
                </button>
              </div>

              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-600/50">
                        <th
                          scope="col"
                          className="px-0 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          Report Details
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          Generated
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          Format & Size
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600/30">
                      {[
                        {
                          name: "Monthly Revenue Report",
                          type: "Revenue Analysis",
                          date: "Dec 1, 2024",
                          time: "2:30 PM",
                          format: "PDF",
                          size: "2.4 MB",
                          status: "completed",
                          color: "text-secondary",
                          bgColor: "bg-secondary/20",
                          icon: TrendingUp,
                        },
                        {
                          name: "Guest Demographics Q4",
                          type: "Guest Analysis",
                          date: "Nov 28, 2024",
                          time: "11:15 AM",
                          format: "Excel",
                          size: "1.8 MB",
                          status: "completed",
                          color: "text-accent",
                          bgColor: "bg-accent/20",
                          icon: UsersIcon,
                        },
                        {
                          name: "Occupancy Analysis",
                          type: "Performance Report",
                          date: "Nov 25, 2024",
                          time: "4:45 PM",
                          format: "PDF",
                          size: "3.1 MB",
                          status: "completed",
                          color: "text-blue-400",
                          bgColor: "bg-blue-400/20",
                          icon: BarChart3,
                        },
                        {
                          name: "Marketing Channel Performance",
                          type: "Marketing Analysis",
                          date: "Nov 20, 2024",
                          time: "9:20 AM",
                          format: "CSV",
                          size: "0.9 MB",
                          status: "completed",
                          color: "text-orange-400",
                          bgColor: "bg-orange-400/20",
                          icon: Eye,
                        },
                      ].map((report, index) => {
                        const IconComponent = report.icon;
                        return (
                          <tr
                            key={index}
                            className="hover:bg-gray-700/30 transition-colors"
                          >
                            <td className="px-0 py-4">
                              <div className="flex items-center gap-4">
                                <div
                                  className={`p-2.5 rounded-xl ${report.bgColor} border border-gray-600/30`}
                                >
                                  <IconComponent
                                    size={18}
                                    className={report.color}
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-white">
                                    {report.name}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {report.type}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="text-sm font-medium text-white">
                                {report.date}
                              </div>
                              <div className="text-xs text-gray-400">
                                {report.time}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/30">
                                  {report.format}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {report.size}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle
                                  size={14}
                                  className="text-secondary"
                                />
                                <span className="text-sm font-medium text-secondary capitalize">
                                  {report.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="p-2 text-secondary hover:text-secondary/80 hover:bg-secondary/10 rounded-lg transition-all duration-200">
                                  <Download size={16} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                                  <Eye size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

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
import PageHeader from "../../components/ui/PageHeader";
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
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "occupancy",
      name: "Occupancy Report",
      description: "Room occupancy rates and trends over time",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "guests",
      name: "Guest Demographics",
      description:
        "Analysis of guest demographics, nationalities, and preferences",
      icon: UsersIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "marketing",
      name: "Marketing Performance",
      description: "Effectiveness of marketing channels and campaigns",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: "forecast",
      name: "Revenue Forecast",
      description:
        "Projected revenue based on current bookings and historical data",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Generate comprehensive reports and insights from your hotel data"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
              <Calendar size={16} className="text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Filter size={16} />
              Filters
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Report Types */}
        <div className="lg:col-span-1">
          <Card className="p-0 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Report Types
              </h3>
              <p className="text-sm text-gray-500 mt-1">
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
                    className={`w-full p-4 mb-2 rounded-xl transition-all duration-200 text-left group ${
                      isActive
                        ? `${report.bgColor} ${report.borderColor} border-2 shadow-sm`
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? "bg-white shadow-sm"
                            : "bg-gray-100 group-hover:bg-white"
                        } transition-all duration-200`}
                      >
                        <IconComponent
                          size={18}
                          className={
                            isActive
                              ? report.color
                              : "text-gray-500 group-hover:text-gray-700"
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium text-sm ${
                            isActive ? "text-gray-900" : "text-gray-700"
                          } group-hover:text-gray-900 transition-colors`}
                        >
                          {report.name}
                        </h4>
                        <p
                          className={`text-xs mt-1 ${
                            isActive ? "text-gray-600" : "text-gray-500"
                          } line-clamp-2`}
                        >
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Enhanced Report Configuration */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-white to-gray-50/50 rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {(() => {
                  const activeReportData = reportTypes.find(
                    (r) => r.id === activeReport
                  );
                  const IconComponent = activeReportData?.icon || FileText;
                  return (
                    <>
                      <div
                        className={`p-3 rounded-xl ${activeReportData?.bgColor} border ${activeReportData?.borderColor}`}
                      >
                        <IconComponent
                          size={24}
                          className={activeReportData?.color}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {activeReportData?.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 max-w-md">
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
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-medium hover:from-primary/90 hover:to-primary/80 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
          </Card>

          {/* Configuration Options */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              {/* Format Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { format: "PDF", desc: "Professional report", icon: "📄" },
                    { format: "Excel", desc: "Spreadsheet format", icon: "📊" },
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
                        className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary/30 hover:bg-gray-50/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {option.format}
                            </div>
                            <div className="text-xs text-gray-500">
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
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Time Period Grouping
                  </label>
                  <select className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Currency Display
                  </label>
                  <select className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>TND (د.ت)</option>
                  </select>
                </div>
              </div>

              {/* Report-specific Options */}
              {activeReport === "revenue" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-600" />
                    Revenue Analysis Options
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              defaultChecked={comparison === "Previous Period"}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`comparison-${comparison}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
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
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <UsersIcon size={18} className="text-purple-600" />
                    Guest Analysis Options
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`attribute-${attribute}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
                            >
                              {attribute}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              defaultChecked={vizType === "Interactive Charts"}
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                            />
                            <label
                              htmlFor={`viz-${vizType}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
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
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600" />
                    Occupancy Analysis Options
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`room-${roomType}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
                            >
                              {roomType}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
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
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`metric-${metric}`}
                              className="ml-3 block text-sm text-gray-700 font-medium"
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
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
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
                  className="hidden mt-6 space-y-6 bg-gray-50/50 rounded-xl p-6 border border-gray-100"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Report Notes & Comments
                    </label>
                    <textarea
                      rows={4}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-white resize-none"
                      placeholder="Add contextual notes, analysis insights, or custom comments to include in your report..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-900">
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
                            className="h-4 w-4 text-primary focus:ring-primary/20 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={feature.id}
                            className="ml-3 block text-sm text-gray-700 font-medium"
                          >
                            {feature.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-900">
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
                            className="h-4 w-4 text-primary focus:ring-primary/20 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={option.id}
                            className="ml-3 block text-sm text-gray-700 font-medium"
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
          </Card>

          {/* Enhanced Recent Reports */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Clock size={20} className="text-gray-600" />
                  Recent Reports
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your previously generated reports and downloads
                </p>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                View All Reports
              </button>
            </div>

            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th
                        scope="col"
                        className="px-0 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Report Details
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Generated
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Format & Size
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        name: "Monthly Revenue Report",
                        type: "Revenue Analysis",
                        date: "Dec 1, 2024",
                        time: "2:30 PM",
                        format: "PDF",
                        size: "2.4 MB",
                        status: "completed",
                        color: "text-green-600",
                        bgColor: "bg-green-50",
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
                        color: "text-purple-600",
                        bgColor: "bg-purple-50",
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
                        color: "text-blue-600",
                        bgColor: "bg-blue-50",
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
                        color: "text-orange-600",
                        bgColor: "bg-orange-50",
                        icon: Eye,
                      },
                    ].map((report, index) => {
                      const IconComponent = report.icon;
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-0 py-4">
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-2.5 rounded-xl ${report.bgColor} border border-gray-100`}
                              >
                                <IconComponent
                                  size={18}
                                  className={report.color}
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {report.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {report.type}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {report.date}
                            </div>
                            <div className="text-xs text-gray-500">
                              {report.time}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                {report.format}
                              </span>
                              <span className="text-xs text-gray-500">
                                {report.size}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle
                                size={14}
                                className="text-green-500"
                              />
                              <span className="text-sm font-medium text-green-700 capitalize">
                                {report.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-2 text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-all duration-200">
                                <Download size={16} />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;

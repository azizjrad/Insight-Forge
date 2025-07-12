import React, { useState } from "react";
import {
  Calendar,
  TrendingDown,
  Download,
  Filter,
  BarChart3,
  Calculator,
  Target,
  Wallet,
  Clock,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { revenueExpenses, expenseCategories } from "../../lib/data";

// Import separated components
import FinancialSummaryCard from "../../components/financial/FinancialSummaryCard";
import RevenueExpensesChart from "../../components/financial/RevenueExpensesChart";
import ExpenseCategoriesChart from "../../components/financial/ExpenseCategoriesChart";
import FinancialDetailsTable from "../../components/financial/FinancialDetailsTable";
import QuickActionCard from "../../components/financial/QuickActionCard";

// Type definitions
interface RevenueExpenseData {
  month: string;
  revenue: number;
  expenses: number;
}

interface ExpenseCategoryData {
  category: string;
  percentage: number;
  color: string;
}

interface TranslationFunction {
  (key: string): string;
}

// Utility function to format TND currency
const formatTND = (amount: number): string => {
  return `${amount.toLocaleString()} د.ت`;
};

const FinancialOverview: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState(
    "dashboard.dateRanges.thisQuarter"
  );

  const dateRangeOptions = [
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

  // Calculate total revenue, expenses and profit
  const totalRevenue = revenueExpenses.reduce(
    (sum, month) => sum + month.revenue,
    0
  );
  const totalExpenses = revenueExpenses.reduce(
    (sum, month) => sum + month.expenses,
    0
  );
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100);

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
                {t("financial.title")}
              </h1>
              <p className="text-gray-300 text-lg">
                {t("financial.description")}
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
              <button className="flex items-center gap-2 px-4 py-2 text-gray-300 bg-gray-700/60 backdrop-blur-md border border-gray-600/50 rounded-xl hover:bg-gray-600/60 hover:text-gray-200 hover:shadow-lg transition-all duration-200">
                <Filter size={16} />
                <span className="text-sm font-medium">Filter</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-secondary to-accent rounded-xl hover:from-secondary/90 hover:to-accent/90 hover:shadow-lg transition-all duration-200">
                <Download size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-green-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  {t("financial.totalRevenue")}
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {formatTND(totalRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown
                    size={14}
                    className="text-green-500 mr-1 rotate-180"
                  />
                  <span className="text-sm text-green-500 font-medium">
                    +4.3% vs previous
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                <Wallet className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-red-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  {t("financial.totalExpenses")}
                </p>
                <p className="text-2xl font-bold text-red-400">
                  {formatTND(totalExpenses)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown size={14} className="text-red-500 mr-1" />
                  <span className="text-sm text-red-500 font-medium">
                    +2.7% vs previous
                  </span>
                </div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors">
                <Calculator className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  Net Profit
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {formatTND(totalProfit)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown
                    size={14}
                    className="text-blue-500 mr-1 rotate-180"
                  />
                  <span className="text-sm text-blue-500 font-medium">
                    +1.5% vs previous
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-1">
                  {t("financial.profitMargin")}
                </p>
                <p className="text-2xl font-bold text-purple-400">
                  {profitMargin}%
                </p>
                <div className="flex items-center mt-2">
                  <TrendingDown size={14} className="text-orange-500 mr-1" />
                  <span className="text-sm text-orange-500 font-medium">
                    -0.8% vs previous
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue vs Expenses Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueExpensesChart t={t} revenueExpenses={revenueExpenses} />
          </div>

          {/* Expense Categories */}
          <ExpenseCategoriesChart t={t} expenseCategories={expenseCategories} />
        </div>

        {/* Financial Details Table */}
        <FinancialDetailsTable
          t={t}
          revenueExpenses={revenueExpenses}
          totalRevenue={totalRevenue}
          totalExpenses={totalExpenses}
          totalProfit={totalProfit}
          profitMargin={profitMargin}
          formatTND={formatTND}
        />

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors">
                <Download className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {t("financial.generateReport")}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {t("financial.generateReportDesc")}
              </p>
              <button className="w-full bg-gradient-to-r from-secondary to-secondary/90 text-white px-4 py-2 rounded-xl hover:from-secondary/90 hover:to-secondary/80 hover:shadow-lg transition-all duration-200">
                {t("financial.generate")}
              </button>
            </div>
          </Card>

          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                <Target className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {t("financial.reviewBudget")}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {t("financial.reviewBudgetDesc")}
              </p>
              <button className="w-full bg-gradient-to-r from-accent to-accent/90 text-white px-4 py-2 rounded-xl hover:from-accent/90 hover:to-accent/80 hover:shadow-lg transition-all duration-200">
                {t("financial.review")}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;

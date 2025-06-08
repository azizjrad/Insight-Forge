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
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import LanguageSelector from "../../components/layout/LanguageSelector";
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
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title={t("financial.title")}
        description={t("financial.description")}
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

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinancialSummaryCard
          title={t("financial.totalRevenue")}
          value={formatTND(totalRevenue)}
          trend="+4.3% vs previous"
          icon={<Wallet className="w-6 h-6 text-green-600" />}
          gradientClass="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50"
          textColorClass="text-green-700"
          bgColorClass="bg-green-500/10"
        />

        <FinancialSummaryCard
          title={t("financial.totalExpenses")}
          value={formatTND(totalExpenses)}
          trend="+2.7% vs previous"
          icon={<Calculator className="w-6 h-6 text-red-600" />}
          gradientClass="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200/50"
          textColorClass="text-red-700"
          bgColorClass="bg-red-500/10"
        />

        <FinancialSummaryCard
          title="Net Profit"
          value={formatTND(totalProfit)}
          trend="+1.5% vs previous"
          icon={<Target className="w-6 h-6 text-blue-600" />}
          gradientClass="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50"
          textColorClass="text-blue-700"
          bgColorClass="bg-blue-500/10"
        />

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">
                {t("financial.profitMargin")}
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {profitMargin}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown size={14} className="text-orange-600 mr-1" />
                <span className="text-sm text-orange-600 font-medium">
                  -0.8% vs previous
                </span>
              </div>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
              <BarChart3 className="w-6 h-6 text-purple-600" />
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
        <QuickActionCard
          title={t("financial.generateReport")}
          description={t("financial.generateReportDesc")}
          buttonText={t("financial.generate")}
          icon={
            <div className="p-2 bg-primary/20 rounded-xl">
              <Download className="w-5 h-5 text-primary" />
            </div>
          }
          gradientClass="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
          buttonClass="bg-primary text-white hover:bg-primary/90"
        />

        <QuickActionCard
          title={t("financial.reviewBudget")}
          description={t("financial.reviewBudgetDesc")}
          buttonText={t("financial.review")}
          icon={
            <div className="p-2 bg-secondary/20 rounded-xl">
              <Target className="w-5 h-5 text-secondary" />
            </div>
          }
          gradientClass="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20"
          buttonClass="bg-secondary text-white hover:bg-secondary/90"
        />
      </div>
    </div>
  );
};

const DollarIcon: React.FC<{ size: number; className?: string }> = ({
  size,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="2" y2="22"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default FinancialOverview;

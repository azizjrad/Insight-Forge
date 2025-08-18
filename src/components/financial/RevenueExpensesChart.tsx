import React from "react";
import { RefreshCw, Info, BarChart3 } from "lucide-react";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import BarChart from "../charts/BarChart";

interface RevenueExpenseData {
  month: string;
  revenue: number;
  expenses: number;
}

interface TranslationFunction {
  (key: string): string;
}

interface RevenueExpensesChartProps {
  t: TranslationFunction;
  revenueExpenses: RevenueExpenseData[];
}

const RevenueExpensesChart: React.FC<RevenueExpensesChartProps> = ({
  t,
  revenueExpenses,
}) => (
  <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-secondary/30 transition-all duration-300">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl">
            <BarChart3 className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-200">
              {t("financial.revenueVsExpenses")}
            </h3>
            <p className="text-sm text-gray-400">Monthly comparison analysis</p>
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
                Track revenue and expense trends over time
              </p>
            </TooltipContent>
          </Tooltip>
          <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/60 rounded-lg transition-all">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <BarChart
        data={revenueExpenses.map((month) => ({
          month: month.month,
          Revenue: month.revenue,
          Expenses: month.expenses,
        }))}
        dataKey="Revenue"
        xAxisKey="month"
        color="#2EC4B6"
        height={350}
      />
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-green-500/10 backdrop-blur-md rounded-xl border border-green-500/20">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-green-400">Revenue Trend</p>
            <p className="text-xs text-green-300">+4.3% growth rate</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/20">
          <div className="w-4 h-4 bg-red-400 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-red-400">Expense Trend</p>
            <p className="text-xs text-red-300">+2.7% increase</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default RevenueExpensesChart;

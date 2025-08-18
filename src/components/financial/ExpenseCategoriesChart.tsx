import React from "react";
import { Info, PieChart as PieChartIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import PieChart from "../charts/PieChart";

interface ExpenseCategoryData {
  category: string;
  percentage: number;
  color: string;
}

interface TranslationFunction {
  (key: string): string;
}

interface ExpenseCategoriesChartProps {
  t: TranslationFunction;
  expenseCategories: ExpenseCategoryData[];
}

const ExpenseCategoriesChart: React.FC<ExpenseCategoriesChartProps> = ({
  t,
  expenseCategories,
}) => (
  <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-300">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-xl">
            <PieChartIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-200">
              {t("financial.expenseCategories")}
            </h3>
            <p className="text-sm text-gray-400">Breakdown by category</p>
          </div>
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
              Expense distribution across different categories
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex justify-center mb-6">
        <PieChart
          data={expenseCategories.map((expense) => ({
            name: expense.category,
            value: expense.percentage,
            color: expense.color,
          }))}
          height={280}
        />
      </div>

      <div className="space-y-3">
        {expenseCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-700/40 backdrop-blur-md rounded-xl hover:bg-gray-600/40 border border-gray-600/30 hover:border-gray-500/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">
                {category.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-200">
                {category.percentage}%
              </span>
              <div className="w-12 h-2 bg-gray-600/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export default ExpenseCategoriesChart;

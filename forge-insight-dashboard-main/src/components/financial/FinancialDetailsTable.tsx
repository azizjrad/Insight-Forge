import React from "react";
import { Download, Calculator } from "lucide-react";
import { Card } from "../ui/card";

interface RevenueExpenseData {
  month: string;
  revenue: number;
  expenses: number;
}

interface TranslationFunction {
  (key: string): string;
}

interface FinancialDetailsTableProps {
  t: TranslationFunction;
  revenueExpenses: RevenueExpenseData[];
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  profitMargin: number;
  formatTND: (amount: number) => string;
}

const FinancialDetailsTable: React.FC<FinancialDetailsTableProps> = ({
  t,
  revenueExpenses,
  totalRevenue,
  totalExpenses,
  totalProfit,
  profitMargin,
  formatTND,
}) => (
  <Card className="bg-white border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-gray-500/10 to-gray-600/20 rounded-xl">
            <Calculator className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {t("financial.financialDetails")}
            </h3>
            <p className="text-sm text-gray-500">
              Monthly breakdown and analysis
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200">
          <Download size={16} />
          Export Table
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t("financial.month")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t("dashboard.revenue")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t("financial.expenses")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t("financial.profit")}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t("financial.margin")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {revenueExpenses.map((month, index) => {
              const profit = month.revenue - month.expenses;
              const margin = Math.round((profit / month.revenue) * 100);

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors duration-200 group"
                >
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {month.month}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-green-700">
                      {formatTND(month.revenue)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-red-700">
                      {formatTND(month.expenses)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        profit > 0 ? "text-blue-700" : "text-red-700"
                      }`}
                    >
                      {formatTND(profit)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          margin > 20
                            ? "text-green-700"
                            : margin > 10
                            ? "text-yellow-700"
                            : "text-red-700"
                        }`}
                      >
                        {margin}%
                      </span>
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            margin > 20
                              ? "bg-green-500"
                              : margin > 10
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(margin * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
              <td className="px-4 py-4">
                <span className="text-sm font-bold text-gray-900">
                  {t("financial.total")}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-bold text-green-800">
                  {formatTND(totalRevenue)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-bold text-red-800">
                  {formatTND(totalExpenses)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-bold text-blue-800">
                  {formatTND(totalProfit)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm font-bold text-gray-900">
                  {profitMargin}%
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </Card>
);

export default FinancialDetailsTable;


import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, DollarSign as DollarIconLucide, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import LanguageSelector from '../../components/layout/LanguageSelector';
import { Card } from '../../components/ui/card';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import { useLanguage } from '../../contexts/LanguageContext';
import { revenueExpenses, expenseCategories } from '../../lib/data';

const FinancialOverview: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('dashboard.dateRanges.thisQuarter');
  
  const dateRangeOptions = [
    { value: 'dashboard.dateRanges.thisMonth', label: t('dashboard.dateRanges.thisMonth') },
    { value: 'dashboard.dateRanges.lastMonth', label: t('dashboard.dateRanges.lastMonth') },
    { value: 'dashboard.dateRanges.thisQuarter', label: t('dashboard.dateRanges.thisQuarter') },
    { value: 'dashboard.dateRanges.lastQuarter', label: t('dashboard.dateRanges.lastQuarter') },
    { value: 'dashboard.dateRanges.thisYear', label: t('dashboard.dateRanges.thisYear') },
    { value: 'dashboard.dateRanges.customRange', label: t('dashboard.dateRanges.customRange') }
  ];
  
  // Calculate total revenue, expenses and profit
  const totalRevenue = revenueExpenses.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = revenueExpenses.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100);
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title={t('financial.title')}
        description={t('financial.description')}
        actions={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <LanguageSelector variant="dashboard" />
          </div>
        }
      />
      
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Revenue */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('financial.totalRevenue')}</p>
              <p className="text-2xl font-bold mt-1 text-primary">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp size={16} className="text-green-600 mr-1" />
                <span className="text-xs text-green-600">+4.3% vs previous period</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-primary bg-opacity-10">
              <DollarIcon size={20} className="text-primary" />
            </div>
          </div>
        </Card>
        
        {/* Total Expenses */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('financial.totalExpenses')}</p>
              <p className="text-2xl font-bold mt-1 text-secondary">${totalExpenses.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp size={16} className="text-red-600 mr-1" />
                <span className="text-xs text-red-600">+2.7% vs previous period</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-secondary bg-opacity-10">
              <DollarIcon size={20} className="text-secondary" />
            </div>
          </div>
        </Card>
        
        {/* Profit */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('financial.profitMargin')}</p>
              <p className="text-2xl font-bold mt-1 text-accent">{profitMargin}%</p>
              <div className="flex items-center mt-1">
                <TrendingDown size={16} className="text-red-600 mr-1" />
                <span className="text-xs text-red-600">-0.8% vs previous period</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-accent bg-opacity-10">
              <DollarIcon size={20} className="text-accent" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Revenue vs Expenses Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">{t('financial.revenueVsExpenses')}</h3>
            </div>
            <BarChart 
              data={revenueExpenses.map(month => ({
                month: month.month,
                Revenue: month.revenue,
                Expenses: month.expenses
              }))} 
              dataKey="Revenue" 
              xAxisKey="month" 
              color="#2EC4B6"
              height={300}
            />
          </Card>
        </div>
        
        {/* Expense Categories */}
        <div>
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">{t('financial.expenseCategories')}</h3>
            </div>
            <div className="flex justify-center">
              <PieChart 
                data={expenseCategories.map(expense => ({ 
                  name: expense.category, 
                  value: expense.percentage,
                  color: expense.color 
                }))} 
                height={300}
              />
            </div>
            
            <div className="mt-4 space-y-2">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.category}</span>
                  </div>
                  <div className="text-gray-700">{category.percentage}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Financial Details */}
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">{t('financial.financialDetails')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('financial.month')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('dashboard.revenue')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('financial.expenses')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('financial.profit')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('financial.margin')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenueExpenses.map((month, index) => {
                const profit = month.revenue - month.expenses;
                const margin = Math.round((profit / month.revenue) * 100);
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${month.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${month.expenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {margin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('financial.total')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${totalExpenses.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${totalProfit.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {profitMargin}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
      
      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('financial.generateReport')}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {t('financial.generateReportDesc')}
              </p>
            </div>
            <button className="btn-secondary flex items-center gap-1">
              {t('financial.generate')} <ArrowRight size={16} />
            </button>
          </div>
        </Card>
        
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('financial.reviewBudget')}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {t('financial.reviewBudgetDesc')}
              </p>
            </div>
            <button className="btn-secondary flex items-center gap-1">
              {t('financial.review')} <ArrowRight size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const DollarIcon = ({ size, className }) => (
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

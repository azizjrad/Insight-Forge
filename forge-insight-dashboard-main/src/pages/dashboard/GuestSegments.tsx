
import React, { useState } from 'react';
import { Calendar, Users, Map, BarChart3, Info } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import LanguageSelector from '../../components/layout/LanguageSelector';
import { Card } from '../../components/ui/card';
import WorldMap from '../../components/charts/WorldMap';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import ScrollToTop from '../../components/ui/ScrollToTop';
import { useLanguage } from '../../contexts/LanguageContext';
import { useData } from '../../contexts/DataContext';

const GuestSegments: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('dashboard.dateRanges.thisMonth');
  const { isDataLoaded, getGuestDistribution } = useData();

  const dateRangeOptions = [
    { value: 'dashboard.dateRanges.today', label: t('dashboard.dateRanges.today') },
    { value: 'dashboard.dateRanges.yesterday', label: t('dashboard.dateRanges.yesterday') },
    { value: 'dashboard.dateRanges.thisWeek', label: t('dashboard.dateRanges.thisWeek') },
    { value: 'dashboard.dateRanges.lastWeek', label: t('dashboard.dateRanges.lastWeek') },
    { value: 'dashboard.dateRanges.thisMonth', label: t('dashboard.dateRanges.thisMonth') },
    { value: 'dashboard.dateRanges.lastMonth', label: t('dashboard.dateRanges.lastMonth') },
    { value: 'dashboard.dateRanges.thisQuarter', label: t('dashboard.dateRanges.thisQuarter') },
    { value: 'dashboard.dateRanges.lastQuarter', label: t('dashboard.dateRanges.lastQuarter') },
    { value: 'dashboard.dateRanges.thisYear', label: t('dashboard.dateRanges.thisYear') },
    { value: 'dashboard.dateRanges.customRange', label: t('dashboard.dateRanges.customRange') }
  ];

  const generateHeatmapData = () => {
    const countries = [
      'USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'China', 'Australia',
      'Brazil', 'India', 'Italy', 'Spain', 'Mexico', 'South Korea', 'Netherlands',
      'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland'
    ];
    
    const getColorBasedOnValue = (value: number): string => {
      if (value > 80) return '#2EC4B6';
      if (value > 60) return '#2EC4B6AA';
      if (value > 40) return '#2EC4B680';
      if (value > 20) return '#2EC4B650';
      return '#2EC4B630';
    };

    return countries.map(country => ({
      name: country,
      value: Math.floor(Math.random() * 100),
      color: getColorBasedOnValue(Math.floor(Math.random() * 100))
    }));
  };

  const nationalityData = isDataLoaded ? getGuestDistribution() : generateHeatmapData();

  const getColorBasedOnValue = (value: number): string => {
    if (value > 80) return '#2EC4B6';
    if (value > 60) return '#2EC4B6AA';
    if (value > 40) return '#2EC4B680';
    if (value > 20) return '#2EC4B650';
    return '#2EC4B630';
  };

  const chartData = nationalityData.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: getColorBasedOnValue(item.value)
  }));

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={t('guests.title')}
        description={t('guests.description')}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nationality Heatmap */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{t('guests.nationalityHeatmap')}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{t('guests.heatmapDesc')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <WorldMap data={nationalityData} />
        </Card>

        {/* Nationality Distribution */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{t('guests.nationalityDistribution')}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{t('guests.distributionDesc')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <PieChart
              data={chartData}
              height={250}
              innerRadius={60}
              outerRadius={80}
            />
          </div>

          <div className="mt-4 space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <div className="text-gray-700">{item.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Booking Trends */}
      <div className="mt-6">
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{t('guests.bookingTrends')}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{t('guests.trendsDesc')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <BarChart
            data={[
              { month: 'Jan', bookings: 50 },
              { month: 'Feb', bookings: 75 },
              { month: 'Mar', bookings: 60 },
              { month: 'Apr', bookings: 80 },
              { month: 'May', bookings: 90 },
            ]}
            dataKey="bookings"
            xAxisKey="month"
            color="#E84855"
            height={250}
          />
        </Card>
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default GuestSegments;

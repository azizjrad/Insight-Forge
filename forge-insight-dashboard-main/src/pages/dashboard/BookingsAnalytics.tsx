
import React, { useState } from 'react';
import { Calendar, PieChart as PieChartIcon, BarChart3, Info } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import LanguageSelector from '../../components/layout/LanguageSelector';
import { Card } from '../../components/ui/card';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import LineChart from '../../components/charts/LineChart';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import ScrollToTop from '../../components/ui/ScrollToTop';
import { useLanguage } from '../../contexts/LanguageContext';
import { bookingChannels, leadTimeData, cancellationData } from '../../lib/data';

const BookingsAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('dashboard.dateRanges.thisMonth');
  
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
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title={t('bookings.title')}
        description={t('bookings.description')}
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
      
      {/* Booking Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pie Chart */}
        <div>
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">{t('bookings.bookingChannels')}</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{t('bookings.channelsDesc')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <PieChart 
                data={bookingChannels.map(channel => ({ 
                  name: channel.channel, 
                  value: channel.percentage,
                  color: channel.color
                }))} 
                height={250}
              />
            </div>
          </Card>
        </div>
        
        {/* Channel Details */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">{t('bookings.channelPerformance')}</h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{t('bookings.performanceDesc')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('bookings.channel')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('dashboard.bookings')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('bookings.distribution')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('bookings.trend')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookingChannels.map((channel, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: channel.color }}
                          />
                          <div className="text-sm font-medium text-gray-900">{channel.channel}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{channel.bookings}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{channel.percentage}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {index % 2 === 0 ? (
                            <span className="text-green-600">↑ 3.2%</span>
                          ) : (
                            <span className="text-red-600">↓ 1.4%</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Lead Time & Cancellations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Time */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{t('bookings.bookingLeadTime')}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{t('bookings.leadTimeDesc')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <BarChart 
            data={leadTimeData} 
            dataKey="percentage" 
            xAxisKey="range" 
            height={250}
          />
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-medium">{t('bookings.mostCommon')}</p>
              <p className="text-gray-500">15-30 days</p>
            </div>
            <div>
              <p className="font-medium">{t('bookings.averageLeadTime')}</p>
              <p className="text-gray-500">18 days</p>
            </div>
            <div>
              <p className="font-medium">{t('bookings.sameDayBookings')}</p>
              <p className="text-gray-500">8.8%</p>
            </div>
          </div>
        </Card>
        
        {/* Cancellations */}
        <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">{t('bookings.bookingsVsCancellations')}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{t('bookings.cancellationsDesc')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <LineChart 
            data={cancellationData.map((item) => ({ 
              month: item.month, 
              bookings: item.bookings,
              cancellations: item.cancellations
            }))}
            dataKey="cancellations" 
            xAxisKey="month" 
            color="#FF4C29"
            height={250}
          />
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-medium">{t('bookings.totalCancellations')}</p>
              <p className="text-gray-500">107</p>
            </div>
            <div>
              <p className="font-medium">{t('bookings.cancellationRate')}</p>
              <p className="text-gray-500">9.6%</p>
            </div>
            <div>
              <p className="font-medium">{t('bookings.trend')}</p>
              <p className="text-red-600">↑ 1.2%</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default BookingsAnalytics;

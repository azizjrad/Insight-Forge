import React, { useState, useMemo } from 'react';
import { Calendar, Download, Filter, FileText, ChevronDown, Users as UsersIcon } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/card';
import { useData } from '../../contexts/DataContext';

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('This Month');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const dateRangeOptions = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'This Quarter',
    'Last Quarter',
    'This Year',
    'Custom Range'
  ];
  
  const reportTypes = [
    { id: 'revenue', name: 'Revenue Report', description: 'Detailed breakdown of revenue by source, room type, and time period' },
    { id: 'occupancy', name: 'Occupancy Report', description: 'Room occupancy rates and trends over time' },
    { id: 'guests', name: 'Guest Demographics', description: 'Analysis of guest demographics, nationalities, and preferences' },
    { id: 'marketing', name: 'Marketing Performance', description: 'Effectiveness of marketing channels and campaigns' },
    { id: 'forecast', name: 'Revenue Forecast', description: 'Projected revenue based on current bookings and historical data' },
  ];
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Reports"
        description="Generate and download detailed reports"
        actions={
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0"
            >
              {dateRangeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Report Types */}
        <div className="md:col-span-1">
          <Card className="p-0 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Report Types</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {reportTypes.map((report) => (
                <li key={report.id}>
                  <button
                    onClick={() => setActiveReport(report.id)}
                    className={`w-full px-4 py-3 flex items-center text-left ${
                      activeReport === report.id ? 'bg-gray-50 border-l-2 border-accent' : ''
                    }`}
                  >
                    <FileText size={18} className={activeReport === report.id ? 'text-accent mr-2' : 'text-gray-500 mr-2'} />
                    <span className={activeReport === report.id ? 'font-medium' : 'text-gray-700'}>{report.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        
        {/* Report Configuration */}
        <div className="md:col-span-3">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">
                {reportTypes.find(r => r.id === activeReport)?.name}
              </h3>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="btn-primary flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Generate Report
                  </>
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              {reportTypes.find(r => r.id === activeReport)?.description}
            </p>
            
            {/* Report Options */}
            <div className="space-y-6">
              {/* Format Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <div key={format} className="relative">
                      <input
                        type="radio"
                        name="report-format"
                        id={`format-${format}`}
                        className="peer sr-only"
                        defaultChecked={format === 'PDF'}
                      />
                      <label
                        htmlFor={`format-${format}`}
                        className="flex p-3 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 peer-checked:border-accent peer-checked:bg-accent/5"
                      >
                        <div className="w-full text-sm font-medium">{format}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Data Grouping */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Grouping
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
              
              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeReport === 'revenue' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Revenue Categories
                      </label>
                      <div className="space-y-2">
                        {['Room Revenue', 'F&B Revenue', 'Spa & Wellness', 'Additional Services', 'Taxes & Fees'].map((category) => (
                          <div key={category} className="flex items-center">
                            <input
                              id={`category-${category}`}
                              name={`category-${category}`}
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                            />
                            <label htmlFor={`category-${category}`} className="ml-2 block text-sm text-gray-700">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comparison
                      </label>
                      <div className="space-y-2">
                        {['Previous Period', 'Same Period Last Year', 'Budget', 'Forecast'].map((comparison) => (
                          <div key={comparison} className="flex items-center">
                            <input
                              id={`comparison-${comparison}`}
                              name={`comparison-${comparison}`}
                              type="checkbox"
                              defaultChecked={comparison === 'Previous Period'}
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                            />
                            <label htmlFor={`comparison-${comparison}`} className="ml-2 block text-sm text-gray-700">
                              {comparison}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeReport === 'guests' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guest Attributes
                      </label>
                      <div className="space-y-2">
                        {['Nationality', 'Age Group', 'Gender', 'Loyalty Status', 'Booking Channel', 'Length of Stay'].map((attribute) => (
                          <div key={attribute} className="flex items-center">
                            <input
                              id={`attribute-${attribute}`}
                              name={`attribute-${attribute}`}
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                            />
                            <label htmlFor={`attribute-${attribute}`} className="ml-2 block text-sm text-gray-700">
                              {attribute}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visualization Type
                      </label>
                      <div className="space-y-2">
                        {['Bar Chart', 'Pie Chart', 'Line Chart', 'Heat Map', 'Data Table'].map((vizType) => (
                          <div key={vizType} className="flex items-center">
                            <input
                              id={`viz-${vizType}`}
                              name="visualization"
                              type="radio"
                              defaultChecked={vizType === 'Bar Chart'}
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300"
                            />
                            <label htmlFor={`viz-${vizType}`} className="ml-2 block text-sm text-gray-700">
                              {vizType}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {activeReport === 'occupancy' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Categories
                      </label>
                      <div className="space-y-2">
                        {['All Rooms', 'Standard Rooms', 'Deluxe Rooms', 'Suites', 'Villas'].map((roomType) => (
                          <div key={roomType} className="flex items-center">
                            <input
                              id={`room-${roomType}`}
                              name={`room-${roomType}`}
                              type="checkbox"
                              defaultChecked={roomType === 'All Rooms'}
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                            />
                            <label htmlFor={`room-${roomType}`} className="ml-2 block text-sm text-gray-700">
                              {roomType}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Metrics
                      </label>
                      <div className="space-y-2">
                        {['Occupancy Rate', 'ADR', 'RevPAR', 'Length of Stay', 'Booking Lead Time'].map((metric) => (
                          <div key={metric} className="flex items-center">
                            <input
                              id={`metric-${metric}`}
                              name={`metric-${metric}`}
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                            />
                            <label htmlFor={`metric-${metric}`} className="ml-2 block text-sm text-gray-700">
                              {metric}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Advanced Options */}
              <div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => document.getElementById('advanced-options')?.classList.toggle('hidden')}
                  >
                    <span>Advanced Options</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                
                <div id="advanced-options" className="hidden mt-3 space-y-4 border-t border-gray-200 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Include Notes
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      placeholder="Add any notes to include in the report..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="include-charts"
                      name="include-charts"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <label htmlFor="include-charts" className="ml-2 block text-sm text-gray-700">
                      Include visualizations and charts
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="include-raw-data"
                      name="include-raw-data"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <label htmlFor="include-raw-data" className="ml-2 block text-sm text-gray-700">
                      Include raw data tables
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Recent Reports */}
          <div className="mt-6">
            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
              <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Generated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Format
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Monthly Revenue Report', date: 'Oct 1, 2023', format: 'PDF' },
                      { name: 'Guest Demographics Q3', date: 'Sep 15, 2023', format: 'Excel' },
                      { name: 'Occupancy Analysis', date: 'Sep 5, 2023', format: 'PDF' },
                      { name: 'Marketing Channel Performance', date: 'Aug 28, 2023', format: 'CSV' },
                    ].map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-400 mr-2" />
                            <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {report.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <button className="text-accent hover:text-accent/80">
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

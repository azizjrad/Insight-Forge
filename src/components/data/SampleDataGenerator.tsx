
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateSampleCSV } from '../../utils/dataFormatters';

const SampleDataGenerator: React.FC = () => {
  const handleGenerateSampleCSV = () => {
    try {
      const csvContent = generateSampleCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'insightforge_sample_data.csv');
      document.body.appendChild(link);
      
      link.click();
      document.body.removeChild(link);
      
      toast.success('Sample CSV file has been generated and downloaded!');
    } catch (error: any) {
      console.error('Error generating sample data:', error);
      toast.error(`Failed to generate sample data: ${error.message}`);
    }
  };
  
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-md p-4 space-y-3">
      <div className="flex items-start space-x-3">
        <div className="bg-accent/10 p-2 rounded-md">
          <FileText size={20} className="text-accent" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">Need sample data?</h4>
          <p className="text-xs text-gray-500 mt-1">
            Download a sample CSV file with hotel data that you can use to test the dashboard functionality.
          </p>
          <button
            onClick={handleGenerateSampleCSV}
            className="mt-2 inline-flex items-center text-xs bg-accent/10 hover:bg-accent/20 text-accent py-1 px-2 rounded transition-colors"
          >
            <Download size={14} className="mr-1" />
            Generate Sample CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleDataGenerator;

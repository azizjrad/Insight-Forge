
import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Globe } from 'lucide-react';

interface WorldMapProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
}

const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className="relative">
      <div className="flex justify-center items-center text-gray-300 p-4">
        <Globe size={200} className="text-gray-200" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <p className="text-gray-500 mb-2">Interactive world map coming soon</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {sortedData.slice(0, 9).map((country, index) => (
          <div 
            key={index}
            className="flex items-center p-2 rounded-md"
            style={{ backgroundColor: `${country.color}20` }}
          >
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: country.color }}
            />
            <span className="text-xs font-medium">{country.name}</span>
            <span className="ml-auto text-xs font-bold">{country.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;

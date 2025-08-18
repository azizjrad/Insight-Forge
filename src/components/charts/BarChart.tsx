
import React from 'react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  tooltip?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  xAxisKey,
  color = '#2EC4B6',
  height = 300,
  showGrid = true,
  tooltip = true
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />}
        <XAxis 
          dataKey={xAxisKey} 
          axisLine={false} 
          tickLine={false} 
          tickMargin={10}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickMargin={10}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        {tooltip && <Tooltip />}
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;


import React from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  tooltip?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
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
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2} 
          dot={{ stroke: color, strokeWidth: 2, fill: 'white', r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;


import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  trend, 
  icon,
  color = 'primary' 
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      case 'accent':
        return 'text-accent';
      case 'neutral':
        return 'text-gray-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="card-dashboard">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className={`text-2xl font-bold mt-1 ${getColorClass()}`}>{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span 
                className={`text-xs font-medium ${
                  trend.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.positive ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-2 rounded-full bg-opacity-10 ${getColorClass()} bg-current`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;

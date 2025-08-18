
import React, { useState } from 'react';
import { Card } from './card';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Button } from './button';
import { Info, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';

interface KpiData {
  title: string;
  value: string;
  trend: string;
  color: 'primary' | 'secondary' | 'accent' | 'neutral';
  icon: React.ReactNode;
  description?: string;
  drillDown?: {
    label: string;
    data: Array<{ label: string; value: string; change: string }>;
  };
}

interface EnhancedKpiCardProps extends KpiData {}

const EnhancedKpiCard: React.FC<EnhancedKpiCardProps> = ({
  title,
  value,
  trend,
  color,
  icon,
  description,
  drillDown
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isPositiveTrend = trend.startsWith('+');
  
  const colorClasses = {
    primary: 'border-primary/20 bg-primary/5',
    secondary: 'border-secondary/20 bg-secondary/5',
    accent: 'border-accent/20 bg-accent/5',
    neutral: 'border-neutral/20 bg-neutral/5'
  };

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral'
  };

  return (
    <Card className={`p-6 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {description && (
              <Tooltip>
                <TooltipTrigger>
                  <Info size={14} className="text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${iconColorClasses[color]} bg-white/50`}>
              {icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <div className="flex items-center gap-1 mt-1">
                {isPositiveTrend ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                  {trend}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {drillDown && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="ml-2"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        )}
      </div>
      
      {/* Drill-down section */}
      {drillDown && isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          <h4 className="text-sm font-medium text-gray-700 mb-3">{drillDown.label}</h4>
          <div className="space-y-2">
            {drillDown.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.value}</span>
                  <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EnhancedKpiCard;

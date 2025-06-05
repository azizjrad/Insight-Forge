
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-primary';
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center">
        <BarChart3 className="h-6 w-6 text-secondary" />
        <div className="relative -ml-1">
          <div className="absolute -top-1 right-0 h-3 w-3">
            <div className="absolute inset-0 rounded-full bg-accent animate-pulse" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>
      </div>
      <span className={`font-bold text-xl ${textColor}`}>InsightForge</span>
    </Link>
  );
};

export default Logo;

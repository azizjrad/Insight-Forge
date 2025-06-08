import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/card";

interface QuickActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  gradientClass: string;
  buttonClass: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  buttonText,
  icon,
  gradientClass,
  buttonClass,
}) => (
  <Card
    className={`${gradientClass} p-6 hover:shadow-lg transition-all duration-300 group`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <button
          className={`flex items-center gap-2 px-4 py-2 ${buttonClass} rounded-xl transition-all duration-200 group-hover:shadow-md`}
        >
          <span className="text-sm font-medium">{buttonText}</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  </Card>
);

export default QuickActionCard;

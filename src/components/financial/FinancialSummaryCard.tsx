import React from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "../ui/card";

interface FinancialSummaryCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  gradientClass: string;
  textColorClass: string;
  bgColorClass: string;
}

const FinancialSummaryCard: React.FC<FinancialSummaryCardProps> = ({
  title,
  value,
  trend,
  icon,
  gradientClass,
  textColorClass,
  bgColorClass,
}) => (
  <Card
    className={`${gradientClass} p-6 hover:shadow-lg transition-all duration-300 group`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium ${textColorClass} mb-1`}>{title}</p>
        <p
          className={`text-2xl font-bold ${textColorClass.replace(
            "700",
            "900"
          )}`}
        >
          {value}
        </p>
        <div className="flex items-center mt-2">
          <TrendingUp
            size={14}
            className={`${textColorClass.replace("700", "600")} mr-1`}
          />
          <span
            className={`text-sm ${textColorClass.replace(
              "700",
              "600"
            )} font-medium`}
          >
            {trend}
          </span>
        </div>
      </div>
      <div
        className={`p-3 ${bgColorClass} rounded-xl group-hover:${bgColorClass.replace(
          "/10",
          "/20"
        )} transition-colors`}
      >
        {icon}
      </div>
    </div>
  </Card>
);

export default FinancialSummaryCard;

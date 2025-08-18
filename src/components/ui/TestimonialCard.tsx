import React from "react";
import { LucideIcon } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  icon: LucideIcon;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle,
  authorCompany,
  icon: Icon,
}) => {
  return (
    <div className="bg-gray-50 rounded-3xl p-16 pt-8 pb-8">
      {" "}
      <div className="flex flex-col items-start">
        {" "}
        {/* Profile Image */}
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-20">
          <Icon className="w-10 h-10 text-gray-500" />
        </div>{" "}
        {/* Testimonial Quote */}
        <div className="mb-20 max-w-4xl">
          <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed text-left select-none">
            "{quote}"
          </p>
        </div>{" "}
        {/* Author Info */}
        <div className="text-left">
          <h4 className="text-xl font-semibold text-gray-900 mb-1 select-none">
            {authorName}
          </h4>
          <p className="text-lg text-gray-600 select-none">
            {authorTitle} at {authorCompany}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

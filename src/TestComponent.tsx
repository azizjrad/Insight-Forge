// Simple test to check JSX validity
import React from "react";
// import { TooltipProvider } from "../../components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip"; // or the correct path/library for TooltipProvider

const TestComponent = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <div className="relative z-10">
          <div className="grid">
            <div className="bg-gray-800">Test content</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TestComponent;

import React from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = "",
  animationClass = "animate-fade-in-up",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? `opacity-100 translate-y-0 ${animationClass}`
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

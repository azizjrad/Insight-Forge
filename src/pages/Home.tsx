import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  ChartPie,
  Activity,
  Settings,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { testimonialData } from "../lib/data";
import { ScrollAnimation } from "../components/ui/ScrollAnimation";
import TestimonialCard from "../components/ui/TestimonialCard";
import { testimonials } from "../data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Animated Counter Component
const AnimatedCounter: React.FC<{
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}> = ({ target, prefix = "", suffix = "", decimals = 0, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = easeOutCubic * target;

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const Home: React.FC = () => {
  // State for dashboard metrics with real-time updates
  const [dashboardMetrics, setDashboardMetrics] = useState({
    revenue: 124751,
    occupancy: 78.3,
    revpar: 95.24,
    adr: 121.64,
    revenueChange: 8.2,
    occupancyChange: 2.1,
    revparChange: 5.7,
    adrChange: -1.2,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardMetrics((prev) => ({
        revenue: prev.revenue + Math.random() * 1000 - 500,
        occupancy: Math.max(
          0,
          Math.min(100, prev.occupancy + (Math.random() * 2 - 1))
        ),
        revpar: prev.revpar + Math.random() * 5 - 2.5,
        adr: prev.adr + Math.random() * 3 - 1.5,
        revenueChange: Math.random() * 10 - 2,
        occupancyChange: Math.random() * 5 - 1,
        revparChange: Math.random() * 8 - 2,
        adrChange: Math.random() * 4 - 2,
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Feature categories and data
  const featureCategories = [
    {
      id: "enterprise",
      label: "GROUPS, CHAINS, LARGE HOTELS",
      description: "Enterprise-level solutions for hotel groups and chains",
    },
    {
      id: "independent",
      label: "INDEPENDENT AND SMALLER HOTELS",
      description: "Tailored solutions for boutique and independent properties",
    },
    {
      id: "data-solutions",
      label: "DATA SOLUTIONS AND SERVICES",
      description: "Advanced analytics and business intelligence tools",
    },
  ];

  const featuresData = {
    enterprise: [
      {
        id: 1,
        title: "Accurately forecast demand",
        description:
          "Gain insights based on forward-looking demand data for your market.",
        icon: BarChart3,
        route: "/features/demand-forecasting",
      },
      {
        id: 2,
        title: "Track competitive pricing",
        description:
          "Leverage the most trusted pricing database to ensure you're pricing competitively.",
        icon: DollarSign,
        route: "/features/competitive-pricing",
      },
      {
        id: 3,
        title: "Simplify portfolio reporting",
        description:
          "Monitor, optimize and report on performance for your entire portfolio.",
        icon: ChartPie,
        route: "/features/portfolio-reporting",
      },
      {
        id: 4,
        title: "Solve parity issues",
        description:
          "Identify and solve parity issues across all of your distribution channels.",
        icon: Settings,
        route: "/features/parity-solutions",
      },
      {
        id: 5,
        title: "Revenue optimization",
        description:
          "Maximize your revenue potential with AI-powered pricing strategies and market analysis.",
        icon: TrendingUp,
        route: "/features/revenue-optimization",
      },
    ],
    independent: [
      {
        id: 1,
        title: "Real-time Analytics",
        description:
          "Monitor your hotel's performance with live data streams and instant alerts.",
        icon: Activity,
        route: "/features/real-time-analytics",
      },
      {
        id: 2,
        title: "Smart Reports",
        description:
          "Generate intelligent reports with AI-powered insights and automation.",
        icon: ChartPie,
        route: "/features/smart-reports",
      },
      {
        id: 3,
        title: "Guest Intelligence",
        description:
          "Understand your guests with advanced segmentation and behavioral analytics.",
        icon: Users,
        route: "/features/guest-intelligence",
      },
      {
        id: 4,
        title: "Revenue Optimization",
        description:
          "Maximize revenue with dynamic pricing and demand forecasting.",
        icon: TrendingUp,
        route: "/features/revenue-optimization",
      },
      {
        id: 5,
        title: "Performance Insights",
        description:
          "Get comprehensive performance insights with benchmarking and competitive analysis.",
        icon: BarChart3,
        route: "/features/performance-insights",
      },
    ],
    "data-solutions": [
      {
        id: 1,
        title: "KPI Monitoring",
        description:
          "Track critical metrics with customizable dashboards and automated alerts.",
        icon: BarChart3,
        route: "/features/kpi-monitoring",
      },
      {
        id: 2,
        title: "Easy Integration",
        description:
          "Seamlessly connect with existing PMS, booking engines, and third-party tools.",
        icon: Settings,
        route: "/features/integrations",
      },
      {
        id: 3,
        title: "Custom Analytics",
        description:
          "Build custom reports and analytics tailored to your specific business needs.",
        icon: Activity,
        route: "/features/custom-analytics",
      },
      {
        id: 4,
        title: "API Solutions",
        description:
          "Access powerful APIs to integrate data into your existing workflows.",
        icon: ChartPie,
        route: "/features/api-solutions",
      },
      {
        id: 5,
        title: "Data Intelligence",
        description:
          "Transform raw data into actionable insights with advanced machine learning algorithms.",
        icon: TrendingUp,
        route: "/features/data-intelligence",
      },
    ],
  };

  // State for features section
  const [activeCategory, setActiveCategory] = useState("enterprise");
  const [dragOffset, setDragOffset] = useState(0); // Current drag offset in pixels
  const [baseOffset, setBaseOffset] = useState(0); // Base offset when drag starts
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Responsive visible cards count
  const [visibleCards, setVisibleCards] = useState(4);

  // Testimonial carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        // Mobile (sm breakpoint)
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        // Tablet (lg breakpoint)
        setVisibleCards(2);
      } else {
        setVisibleCards(4); // Desktop
      }
    };

    // Set initial value
    updateVisibleCards();

    // Add event listener for window resize
    window.addEventListener("resize", updateVisibleCards);

    // Cleanup
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Handle testimonial carousel API and track current slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentFeatures =
    featuresData[activeCategory as keyof typeof featuresData];

  // Calculate container width and card width
  const cardWidth = 100 / visibleCards; // Percentage width of each card
  const maxOffset = -(currentFeatures.length - 1) * cardWidth; // Maximum drag offset - allow scrolling to the last card

  // Clamp the offset to valid bounds
  const clampOffset = (offset: number) => {
    return Math.max(maxOffset, Math.min(0, offset));
  };

  // Improved touchpad/trackpad support for smooth dragging
  const [lastWheelTime, setLastWheelTime] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (currentFeatures.length <= visibleCards) return;

    const deltaX = e.deltaX;

    // Only respond to horizontal scrolling, ignore vertical (deltaY)
    if (Math.abs(deltaX) > 5) {
      const now = Date.now();

      // Throttle wheel events to prevent excessive triggering
      if (now - lastWheelTime < 16) return; // ~60fps

      const scrollSpeed = 0.5;
      const newOffset = dragOffset - deltaX * scrollSpeed;
      const clampedOffset = clampOffset(newOffset);

      // Only prevent browser navigation if the carousel can actually move
      // Allow browser navigation when at boundaries and trying to scroll further
      const atLeftEnd = dragOffset >= -5 && deltaX < 0; // At start (with small tolerance), scrolling left
      const atRightEnd = dragOffset <= maxOffset + 5 && deltaX > 0; // At end (with small tolerance), scrolling right

      if (!atLeftEnd && !atRightEnd) {
        e.preventDefault();
        e.stopPropagation();
      }

      setLastWheelTime(now);
      setDragOffset(clampedOffset);
      setBaseOffset(clampedOffset);
    }
  };

  // Enhanced touch/mouse support for smooth dragging
  const [touchStart, setTouchStart] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const handleDragStart = (clientX: number) => {
    setIsTouching(true);
    setIsDragging(true);
    setTouchStart(clientX);
    setDragStartX(clientX);
    setBaseOffset(dragOffset);
  };

  const handleDragMove = (clientX: number) => {
    if (!isTouching || currentFeatures.length <= visibleCards) return;

    const deltaX = clientX - touchStart;
    const containerWidth = 100; // Using percentage
    const dragSensitivity = visibleCards === 1 ? 0.8 : 0.2; // Higher sensitivity on mobile

    const newOffset = clampOffset(baseOffset + deltaX * dragSensitivity);
    setDragOffset(newOffset);
  };

  const handleDragEnd = () => {
    setIsTouching(false);
    setIsDragging(false);
    setBaseOffset(dragOffset);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // Mouse events for desktop dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setDragOffset(0); // Reset drag position when changing category
    setBaseOffset(0);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20 md:py-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 text-sm font-medium">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                InsightForge: Stop Guessing, Start Growing
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Transform
                  <span className="block text-secondary">Hotel Data</span>
                  <span className="block">into Growth</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  Empower your hospitality business with real-time analytics,
                  guest insights, and revenue optimization tools that drive
                  measurable results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group relative bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">Start Free Trial</span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
                <Link
                  to="/contact-sales"
                  className="group relative border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:backdrop-blur-3xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10">Schedule Demo</span>

                  {/* Enhanced multi-layer glass reflection - same as language selector and login button */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

                  {/* Subtle shimmer effect on hover - same as language selector and login button */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    <AnimatedCounter target={500} suffix="+" duration={2500} />
                  </div>
                  <div className="text-sm text-gray-400">Hotels Trust Us</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    <AnimatedCounter
                      target={2.5}
                      suffix="M TND+"
                      decimals={1}
                      duration={2500}
                    />
                  </div>
                  <div className="text-sm text-gray-400">Revenue Optimized</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    <AnimatedCounter
                      target={99.9}
                      suffix="%"
                      decimals={1}
                      duration={2500}
                    />
                  </div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            {/* Enhanced Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                {/* Mini Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <BarChart3 size={16} className="text-white" />
                    </div>
                    <span className="font-semibold text-lg">
                      Live Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Real-time</span>
                  </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="text-xs text-gray-300 uppercase tracking-wide">
                        Revenue
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      <AnimatedCounter
                        target={dashboardMetrics.revenue}
                        suffix=" TND"
                        decimals={0}
                        duration={1500}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        size={12}
                        className={
                          dashboardMetrics.revenueChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      />
                      <span
                        className={`text-xs font-medium ${
                          dashboardMetrics.revenueChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <AnimatedCounter
                          target={dashboardMetrics.revenueChange}
                          prefix={
                            dashboardMetrics.revenueChange >= 0 ? "+" : ""
                          }
                          suffix="%"
                          decimals={1}
                          duration={1000}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-accent" />
                      <span className="text-xs text-gray-300 uppercase tracking-wide">
                        Occupancy
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      <AnimatedCounter
                        target={dashboardMetrics.occupancy}
                        suffix="%"
                        decimals={1}
                        duration={1500}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        size={12}
                        className={
                          dashboardMetrics.occupancyChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      />
                      <span
                        className={`text-xs font-medium ${
                          dashboardMetrics.occupancyChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <AnimatedCounter
                          target={dashboardMetrics.occupancyChange}
                          prefix={
                            dashboardMetrics.occupancyChange >= 0 ? "+" : ""
                          }
                          suffix="%"
                          decimals={1}
                          duration={1000}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 size={16} className="text-secondary" />
                      <span className="text-xs text-gray-300 uppercase tracking-wide">
                        RevPAR
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      <AnimatedCounter
                        target={dashboardMetrics.revpar}
                        suffix=" TND"
                        decimals={2}
                        duration={1500}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        size={12}
                        className={
                          dashboardMetrics.revparChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      />
                      <span
                        className={`text-xs font-medium ${
                          dashboardMetrics.revparChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <AnimatedCounter
                          target={dashboardMetrics.revparChange}
                          prefix={dashboardMetrics.revparChange >= 0 ? "+" : ""}
                          suffix="%"
                          decimals={1}
                          duration={1000}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-yellow-400" />
                      <span className="text-xs text-gray-300 uppercase tracking-wide">
                        ADR
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-1">
                      <AnimatedCounter
                        target={dashboardMetrics.adr}
                        suffix=" TND"
                        decimals={2}
                        duration={1500}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={
                          dashboardMetrics.adrChange >= 0
                            ? ""
                            : "w-3 h-3 rotate-180"
                        }
                      >
                        <TrendingUp
                          size={12}
                          className={
                            dashboardMetrics.adrChange >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          dashboardMetrics.adrChange >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <AnimatedCounter
                          target={dashboardMetrics.adrChange}
                          prefix={dashboardMetrics.adrChange >= 0 ? "+" : ""}
                          suffix="%"
                          decimals={1}
                          duration={1000}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chart Preview */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <ChartPie size={20} className="text-accent" />
                    <span className="font-medium">Revenue Trends</span>
                  </div>

                  {/* Simulated Chart with Animation */}
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 75, 60, 85, 70, 90, 75, 95].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-accent to-accent/60 rounded-t opacity-80 hover:opacity-100 transition-all duration-300 animate-pulse"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: "2s",
                          }}
                        ></div>
                      )
                    )}
                  </div>

                  {/* Real-time indicator */}
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-300">
                    <span>Last 12 hours</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Live data</span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary/30 blur-xl rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent/30 blur-xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <ScrollAnimation>
        <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-50/20 to-transparent rounded-full"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                One platform, unlimited
                <span className="block text-gray-900">revenue potential</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                All your critical data, all in one place.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {featureCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`group relative px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category.id
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-secondary/80"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Features Cards Container */}
            <div className="relative">
              {/* Cards Sliding Container */}
              <div className="overflow-hidden px-1 sm:px-1 md:px-1">
                <div
                  className={`flex gap-2 sm:gap-4 select-none transition-transform duration-200 ease-out ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{
                    transform: `translateX(${dragOffset}%)`,
                    width: `${(currentFeatures.length / visibleCards) * 100}%`,
                    touchAction: "none", // Prevent all default touch behaviors
                  }}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={isDragging ? handleMouseMove : undefined}
                  onMouseUp={isDragging ? handleMouseUp : undefined}
                  onMouseLeave={handleMouseLeave}
                >
                  {currentFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex-shrink-0"
                      style={{
                        width: `${100 / visibleCards}%`,
                      }}
                    >
                      <Link
                        to={feature.route}
                        className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 transition-all duration-500 w-full cursor-pointer block"
                        style={{
                          height: visibleCards === 1 ? "400px" : "509px",
                          minWidth: visibleCards === 1 ? "280px" : "295px",
                        }}
                      >
                        {/* Enhanced hover background effect - vibrant orange gradient like leadership team cards (reversed) */}
                        <div className="absolute inset-0 bg-gradient-to-tl from-orange-400 via-orange-300 to-orange-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 via-orange-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                        {/* Feature Content */}
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Top section with visual/chart area */}
                          <div className="space-y-6 sm:space-y-8">
                            {/* Visual Chart Area - simulating the charts from screenshot */}
                            <div
                              className={`${
                                visibleCards === 1 ? "h-24" : "h-32"
                              } bg-gradient-to-br from-orange-100/50 to-orange-50/30 rounded-xl flex items-center justify-center relative overflow-hidden`}
                            >
                              {/* Simulated chart based on feature type */}
                              {feature.icon === BarChart3 && (
                                <div className="flex items-end gap-1 h-16">
                                  {[60, 80, 45, 90, 70, 85, 55].map(
                                    (height, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-orange-400 rounded-t flex-1"
                                        style={{ height: `${height}%` }}
                                      />
                                    )
                                  )}
                                </div>
                              )}
                              {feature.icon === DollarSign && (
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-orange-600 mb-1">
                                    $105
                                  </div>
                                  <div className="text-sm text-orange-500">
                                    ↑ $118 +12%
                                  </div>
                                </div>
                              )}
                              {feature.icon === ChartPie && (
                                <div className="grid grid-cols-3 gap-2 w-full h-full p-4">
                                  <div className="bg-orange-400 rounded"></div>
                                  <div className="bg-blue-400 rounded"></div>
                                  <div className="bg-orange-300 rounded"></div>
                                  <div className="bg-blue-300 rounded"></div>
                                  <div className="bg-orange-500 rounded"></div>
                                  <div className="bg-blue-500 rounded"></div>
                                </div>
                              )}
                              {feature.icon === Settings && (
                                <div className="w-full h-full relative">
                                  <div className="absolute top-2 right-2 bg-orange-400 w-16 h-8 rounded flex items-center justify-center text-xs text-white">
                                    17
                                  </div>
                                  <div className="absolute bottom-2 left-2 bg-orange-500 w-20 h-6 rounded flex items-center justify-center text-xs text-white">
                                    -$21
                                  </div>
                                </div>
                              )}
                              {(feature.icon === Activity ||
                                feature.icon === Users ||
                                feature.icon === TrendingUp) && (
                                <div className="w-full h-full flex items-end justify-center">
                                  <svg
                                    className="w-24 h-16 text-orange-400"
                                    fill="currentColor"
                                    viewBox="0 0 100 40"
                                  >
                                    <path
                                      d="M0,30 Q25,10 50,20 T100,15"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      fill="none"
                                    />
                                    <path
                                      d="M0,40 Q25,25 50,30 T100,25 L100,40 Z"
                                      fill="currentColor"
                                      opacity="0.3"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Feature Text */}
                            <div>
                              <h4
                                className={`${
                                  visibleCards === 1 ? "text-xl" : "text-2xl"
                                } font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800`}
                              >
                                {feature.title}
                              </h4>
                              <p
                                className={`text-gray-700 leading-relaxed ${
                                  visibleCards === 1 ? "text-base" : "text-lg"
                                } group-hover:text-gray-600`}
                              >
                                {feature.description}
                              </p>
                            </div>
                          </div>

                          {/* Arrow button at bottom right corner, moved to absolute bottom edge with negative margin */}
                          <div className="absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-4">
                            <div
                              className={`${
                                visibleCards === 1 ? "w-12 h-12" : "w-14 h-14"
                              } bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg border border-gray-700 group-hover:border-white overflow-hidden`}
                            >
                              {/* Arrow Icon */}
                              <ArrowRight
                                size={visibleCards === 1 ? 16 : 20}
                                className="text-gray-700 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              {currentFeatures.length > visibleCards && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from(
                    { length: currentFeatures.length },
                    (_, index) => {
                      const targetOffset = -index * cardWidth;
                      const isActive =
                        Math.abs(dragOffset - targetOffset) < cardWidth / 2;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            const newOffset = clampOffset(targetOffset);
                            setDragOffset(newOffset);
                            setBaseOffset(newOffset);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-orange-500 w-6"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials Section */}
      <ScrollAnimation>
        <section className="py-16 bg-white">
          <div className="max-w-full mx-auto pl-20 pr-4">
            <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
              <div className="lg:col-span-4 lg:pl-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight whitespace-nowrap">
                  Trusted by <span className="text-secondary">70,000</span>{" "}
                  hospitality professionals
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-end lg:mr-16">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => api?.scrollPrev()}
                    disabled={current === 0}
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-secondary hover:border-secondary flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 18l-6-6 6-6"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => api?.scrollNext()}
                    disabled={!api?.canScrollNext()}
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-secondary hover:border-secondary flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 18l6-6-6-6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="overflow-hidden"
                style={{ marginLeft: "2rem", marginRight: "4rem" }}
              >
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: false,
                    slidesToScroll: 1,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-0">
                    {testimonials.map((testimonial) => (
                      <CarouselItem
                        key={testimonial.id}
                        className="basis-full pl-0"
                      >
                        <TestimonialCard
                          quote={testimonial.quote}
                          authorName={testimonial.authorName}
                          authorTitle={testimonial.authorTitle}
                          authorCompany={testimonial.authorCompany}
                          icon={testimonial.icon}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center relative pl-3">
                  <div className="absolute left-20 top-[-20px] bottom-[-20px] w-1 bg-secondary rounded-full"></div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter target={500} suffix="+" duration={3000} />
                  </div>
                  <div className="text-gray-600 font-medium">
                    Hotels & Resorts
                  </div>
                </div>
                <div className="text-center relative pl-3">
                  <div className="absolute left-20 top-[-20px] bottom-[-20px] w-1 bg-secondary rounded-full"></div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter target={50} suffix="M+" duration={3000} />
                  </div>
                  <div className="text-gray-600 font-medium">Guest Records</div>
                </div>
                <div className="text-center relative pl-3">
                  <div className="absolute left-20 top-[-20px] bottom-[-20px] w-1 bg-secondary rounded-full"></div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter
                      target={2.5}
                      suffix="B TND"
                      decimals={1}
                      duration={3000}
                    />
                  </div>
                  <div className="text-gray-600 font-medium">
                    Revenue Optimized
                  </div>
                </div>
                <div className="text-center relative pl-3">
                  <div className="absolute left-20 top-[-20px] bottom-[-20px] w-1 bg-secondary rounded-full"></div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter
                      target={99.9}
                      suffix="%"
                      decimals={1}
                      duration={3000}
                    />
                  </div>
                  <div className="text-gray-600 font-medium">
                    Uptime Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation>
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-primary text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 text-secondary font-semibold mb-8">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                Ready to Transform Your Hotel?
              </div>

              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                Start your journey to
                <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  data-driven growth
                </span>
              </h2>

              <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Join hundreds of hotels already using InsightForge to optimize
                operations, enhance guest experiences, and maximize revenue
                potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link
                  to="/register"
                  className="group relative bg-gradient-to-r from-secondary to-secondary/90 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-3 text-lg"
                >
                  <span className="relative z-10">Start Free Trial</span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>

                <Link
                  to="/contact-sales"
                  className="group relative border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-5 rounded-2xl hover:bg-gray-700/50 hover:backdrop-blur-3xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center text-lg overflow-hidden"
                >
                  <span className="relative z-10">Schedule Demo</span>

                  {/* Enhanced multi-layer glass reflection - same as language selector and login button */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 pointer-events-none"></div>

                  {/* Subtle shimmer effect on hover - same as language selector and login button */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-2xl pointer-events-none"></div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Setup in under 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default Home;

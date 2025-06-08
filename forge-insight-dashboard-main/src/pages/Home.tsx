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
  Sparkles,
} from "lucide-react";
import { testimonialData } from "../lib/data";

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
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </span>

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                >
                  Watch Demo
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
      <section className="py-20 bg-gradient-to-b from-white to-neutral/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-primary font-medium mb-6">
              <Settings size={16} />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Everything you need to
              <span className="block text-secondary">scale your hotel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your hospitality business with enterprise-grade
              analytics designed specifically for modern hotels and resorts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Monitor your hotel's performance with live data streams,
                  instant alerts, and comprehensive dashboards that update in
                  real-time.
                </p>
                <div className="flex items-center text-accent font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-secondary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ChartPie size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                  Smart Reports
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Generate intelligent reports with AI-powered insights,
                  automated scheduling, and customizable templates that fit your
                  business needs.
                </p>
                <div className="flex items-center text-secondary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  KPI Monitoring
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Track critical metrics with customizable dashboards, automated
                  alerts, and predictive analytics to stay ahead of trends.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature 4 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                  Easy Integration
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Seamlessly connect with your existing PMS, booking engines,
                  and third-party tools with our robust API and pre-built
                  integrations.
                </p>
                <div className="flex items-center text-accent font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature 5 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-secondary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                  Guest Intelligence
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Understand your guests deeply with advanced segmentation,
                  behavioral analytics, and personalization insights to enhance
                  satisfaction.
                </p>
                <div className="flex items-center text-secondary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature 6 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  Revenue Optimization
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Maximize revenue with dynamic pricing insights, demand
                  forecasting, and automated recommendations powered by machine
                  learning.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 text-accent font-medium mb-6">
              <Users size={16} />
              Client Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Trusted by industry
              <span className="block text-secondary">leaders worldwide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From boutique hotels to luxury resorts, see how InsightForge
              transforms hospitality businesses across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                  index === 1 ? "md:scale-105 border-accent/20" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">"</span>
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-accent font-semibold text-sm">
                        {testimonial.hotel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter target={500} suffix="+" duration={3000} />
                </div>
                <div className="text-gray-600 font-medium">
                  Hotels & Resorts
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter target={50} suffix="M+" duration={3000} />
                </div>
                <div className="text-gray-600 font-medium">
                  Guest Records Analyzed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter
                    target={2.5}
                    suffix="B TND+"
                    decimals={1}
                    duration={3000}
                  />
                </div>
                <div className="text-gray-600 font-medium">
                  Revenue Optimized
                </div>
              </div>
              <div className="text-center">
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

      {/* CTA Section */}
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
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Free Trial
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </Link>

              <Link
                to="/about"
                className="group border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-5 rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center text-lg"
              >
                Watch Demo
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
    </div>
  );
};

export default Home;

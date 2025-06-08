import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  BarChart,
  FileText,
  Mail,
  ChevronDown,
  Award,
  Target,
  Heart,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 md:py-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full -translate-x-32 -translate-y-32 blur-2xl"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <BarChart3 size={24} className="text-white/20" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <TrendingUp size={32} className="text-secondary/30" />
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce-slow">
            <Globe size={28} className="text-accent/30" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-up">
              <Award size={16} className="text-secondary" />
              <span className="text-sm font-medium">
                Industry Leading Analytics Platform
              </span>
            </div>
            <h1 className="heading-xl mb-6 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
              {t("about.title")}
            </h1>
            <p className="text-secondary font-semibold mb-6 text-lg animate-fade-in-up animation-delay-400">
              {t("about.subtitle")}
            </p>
            <p className="text-xl text-gray-200 leading-relaxed animate-fade-in-up animation-delay-600 max-w-3xl mx-auto">
              {t("about.description")}
            </p>

            {/* Scroll indicator */}
            <div className="mt-12 animate-fade-in-up animation-delay-800">
              <div
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => {
                  const ourJourneySection =
                    document.getElementById("our-journey");
                  ourJourneySection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="text-sm">Discover our story</span>
                <ChevronDown size={20} className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-journey" className="py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Heart size={16} />
                Our Journey
              </div>
              <h2 className="heading-lg text-gray-900 leading-tight">
                Transforming Data Into
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {" "}
                  Hotel Success Stories
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-gray-900">
                    InsightForge was born from necessity.
                  </strong>{" "}
                  Founded in 2019 by hotel industry veterans and data scientists
                  who witnessed the struggle of transforming vast amounts of
                  hotel data into meaningful, actionable insights.
                </p>
                <p>
                  Our founders experienced firsthand the frustration of managing
                  properties with outdated spreadsheets, obsolete reports, and
                  valuable insights buried in endless numbers. The hospitality
                  industry deserved better.
                </p>
                <p>
                  <strong className="text-gray-900">
                    Today, we're proud to serve 500+ properties worldwide,
                  </strong>{" "}
                  empowering hotels of all sizes to make data-driven decisions
                  that enhance guest satisfaction and maximize profitability.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Hotels Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              {/* Floating background elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>

              <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-primary/20 rounded rotate-45 animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-6 h-6 bg-secondary/20 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-8 w-10 h-10 bg-accent/20 rounded-lg rotate-12 animate-pulse"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
                      <BarChart3 size={40} className="text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">
                      Real-time Analytics Dashboard
                    </p>
                  </div>
                </div>

                {/* Interactive elements */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
                    <TrendingUp size={16} className="text-primary" />
                    <span className="text-sm font-medium text-gray-700">
                      Revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-colors">
                    <Users size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-gray-700">
                      Guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-accent/5 transition-colors">
                    <Globe size={16} className="text-accent" />
                    <span className="text-sm font-medium text-gray-700">
                      Global
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-20 relative">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target size={16} />
              Our Mission & Values
            </div>
            <h2 className="heading-lg mb-6 text-gray-900">
              Empowering Hotels Through
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                {" "}
                Data Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We believe in the transformative power of data to revolutionize
              the hospitality industry, making every guest experience
              exceptional and every business decision strategic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-primary/20">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                  Data-Driven Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Pioneering cutting-edge analytics solutions that transform raw
                  hotel data into strategic insights, driving continuous
                  innovation in the hospitality industry.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 gap-1 transition-all">
                  <span>Learn more</span>
                  <Zap
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Value 2 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-secondary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-secondary transition-colors">
                  Customer Success
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Your success is our mission. We provide exceptional support,
                  comprehensive training, and dedicated partnership to maximize
                  your platform value.
                </p>
                <div className="flex items-center text-secondary font-medium group-hover:gap-2 gap-1 transition-all">
                  <span>Our support</span>
                  <Heart
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Value 3 - Enhanced */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-accent/20 md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-accent transition-colors">
                  Elegant Simplicity
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Powerful analytics shouldn't be complex. Our intuitive
                  platform delivers sophisticated insights through beautifully
                  simple, user-friendly interfaces.
                </p>
                <div className="flex items-center text-accent font-medium group-hover:gap-2 gap-1 transition-all">
                  <span>Experience it</span>
                  <Globe
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional feature highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                <Award size={20} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Award</div>
              <div className="text-sm text-gray-600">Winning Platform</div>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-3 group-hover:bg-secondary/20 transition-colors">
                <Globe size={20} className="text-secondary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Global Support</div>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3 group-hover:bg-accent/20 transition-colors">
                <TrendingUp size={20} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Real-time</div>
              <div className="text-sm text-gray-600">Analytics</div>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                <Heart size={20} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users size={16} />
              Leadership Team
            </div>
            <h2 className="heading-lg mb-6 text-gray-900">
              Meet the Visionaries Behind
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-primary">
                {" "}
                InsightForge
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our leadership team combines decades of hospitality expertise with
              cutting-edge technology innovation, dedicated to transforming how
              hotels leverage their data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Team Member 1 - Enhanced */}
            <div className="group text-center">
              <div className="relative mb-8">
                {/* Static background ring - no animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>

                {/* Profile image placeholder with gradient */}
                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full max-w-[200px] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Users size={32} className="text-white" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="text-white text-sm font-medium">
                      CEO & Founder
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  Aziz Jrad
                </h3>
                <p className="text-lg font-medium text-secondary">
                  CEO & Co-Founder
                </p>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Business Computing student at ESEN Manouba. Passionate about
                  leveraging technology to transform hotel operations through
                  innovative data solutions.
                </p>

                {/* Skills badges */}
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Business Computing
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    Leadership
                  </span>
                </div>
              </div>
            </div>

            {/* Team Member 2 - Enhanced */}
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>

                <div className="relative aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full max-w-[200px] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <BarChart3 size={32} className="text-white" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="text-white text-sm font-medium">
                      CTO & Co-Founder
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-secondary transition-colors">
                  Fedi Riahi
                </h3>
                <p className="text-lg font-medium text-accent">
                  CTO & Co-Founder
                </p>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Business Computing student at ESEN Manouba. Technical
                  visionary focused on developing cutting-edge analytics
                  solutions for the hospitality industry.
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    Business Computing
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    Technical Innovation
                  </span>
                </div>
              </div>
            </div>

            {/* Team Member 3 - Enhanced */}
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute inset-2 bg-white rounded-full"></div>

                <div className="relative aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-full max-w-[200px] mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                    <Heart size={32} className="text-white" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="text-white text-sm font-medium">
                      Customer Success
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent transition-colors">
                  David Kim
                </h3>
                <p className="text-lg font-medium text-primary">
                  Head of Customer Success
                </p>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Customer success evangelist. Ensuring every hotel maximizes
                  their data potential and achieves measurable results.
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                    Customer Success
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Training
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">25+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">12</div>
              <div className="text-gray-600">Countries Represented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full translate-x-48 translate-y-48 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-float"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 animate-float">
            <BarChart3 size={24} className="text-white/20" />
          </div>
          <div className="absolute top-32 right-32 animate-float-delayed">
            <TrendingUp size={28} className="text-secondary/30" />
          </div>
          <div className="absolute bottom-32 left-32 animate-bounce-slow">
            <Globe size={32} className="text-accent/30" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap size={16} className="text-secondary" />
                Ready to Transform Your Hotel?
              </div>

              <h2 className="heading-md mb-6 text-white">
                Experience the Future of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                  {" "}
                  Hotel Analytics
                </span>
              </h2>

              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Join hundreds of successful hotels worldwide who have
                transformed their operations with InsightForge's powerful
                analytics platform. See the difference data-driven decisions can
                make for your property.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 bg-white text-primary hover:text-white hover:bg-transparent border-2 border-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <Mail size={20} />
                  <span>Schedule Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>

                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Users size={20} />
                  <span>{t("nav.register")}</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span className="text-sm">Industry Leading</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span className="text-sm">Global Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Enhanced info card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Join Our Community
                      </h3>
                      <p className="text-white/80">Growing worldwide network</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                          <span className="text-secondary text-lg">✓</span>
                        </div>
                        <span className="text-white font-medium">
                          500+ Hotels Worldwide
                        </span>
                      </div>
                      <div className="text-secondary font-bold">500+</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-accent text-lg">✓</span>
                        </div>
                        <span className="text-white font-medium">
                          15+ Countries
                        </span>
                      </div>
                      <div className="text-accent font-bold">15+</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                        <span className="text-white font-medium">
                          98% Customer Satisfaction
                        </span>
                      </div>
                      <div className="text-white font-bold">98%</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary text-lg">✓</span>
                        </div>
                        <span className="text-white font-medium">
                          24/7 Customer Support
                        </span>
                      </div>
                      <div className="text-primary font-bold">24/7</div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-xl border border-white/10">
                    <div className="text-center">
                      <p className="text-white/90 text-sm mb-2">
                        Ready to get started?
                      </p>
                      <p className="text-white font-semibold">
                        Free demo available today
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements around the card */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

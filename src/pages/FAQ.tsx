import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Search,
  MessageCircle,
  BookOpen,
  Users,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Star,
  Globe,
  Award,
  TrendingUp,
  BarChart3,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollToTop from "../components/ui/ScrollToTop";
import { ScrollAnimation } from "../components/ui/ScrollAnimation";

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim().length > 0) {
      // Scroll to results section when user presses Enter
      setTimeout(() => {
        const resultsSection = document.getElementById("faq-results");
        if (resultsSection) {
          resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Small delay to ensure state update
    }
  };

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is InsightForge?",
      answer:
        "InsightForge is a comprehensive hotel management platform that provides advanced analytics, booking management, and operational insights to help hotel owners and managers optimize their business performance.",
    },
    {
      question: "How do I get started with InsightForge?",
      answer:
        "Getting started is simple! Sign up for a free trial, complete the onboarding process, and our team will help you set up your hotel profile and integrate your existing systems.",
    },
    {
      question: "What features are included in the platform?",
      answer:
        "InsightForge includes revenue management, booking analytics, guest management, operational dashboards, reporting tools, and integration capabilities with major booking platforms and PMS systems.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    },
    {
      question: "How secure is my hotel data?",
      answer:
        "We take security seriously. All data is encrypted in transit and at rest, we comply with industry standards including GDPR, and our infrastructure is hosted on secure cloud platforms with regular security audits.",
    },
    {
      question: "Can I integrate with my existing PMS?",
      answer:
        "Yes, InsightForge integrates with most major Property Management Systems including Opera, Protel, RMS, and many others. Our team can help you set up the integration.",
    },
    {
      question: "What support options are available?",
      answer:
        "We offer 24/7 customer support via live chat, email support with response times under 2 hours, comprehensive documentation, video tutorials, and phone support for enterprise customers.",
    },
    {
      question: "How much does InsightForge cost?",
      answer:
        "We offer flexible pricing plans based on your hotel size and needs. Plans start from $49/month for small properties. Contact our sales team for custom enterprise pricing.",
    },
  ];

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 md:py-24 lg:py-28 overflow-hidden min-h-[80vh] flex items-center">
        {/* Enhanced Background decorations */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-float"></div>
        </div>

        {/* Enhanced Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 animate-float">
            <HelpCircle size={32} className="text-white/20" />
          </div>
          <div className="absolute top-1/4 right-24 animate-float-delayed">
            <BookOpen size={40} className="text-orange-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-24 animate-bounce-slow">
            <Search size={36} className="text-teal-500/30" />
          </div>
          <div className="absolute top-1/3 left-1/3 animate-float">
            <MessageCircle size={28} className="text-white/15" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float-delayed">
            <Users size={24} className="text-orange-400/25" />
          </div>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 px-6 py-3 rounded-full mb-8 animate-fade-in-up transition-all duration-300 shadow-lg">
              <HelpCircle size={20} className="text-secondary" />
              <span className="text-sm font-semibold text-white">
                Frequently Asked Questions
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent leading-tight">
              {t("faq.title") || "Need Help?"}
            </h1>

            <p className="text-lg md:text-xl font-medium mb-8 animate-fade-in-up animation-delay-400 text-secondary max-w-2xl mx-auto">
              {t("faq.subtitle") ||
                "Find answers to common questions about InsightForge"}
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in-up animation-delay-600 mb-12">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Search className="text-gray-400 h-5 w-5 group-focus-within:text-secondary group-focus-within:scale-110 transition-all duration-300 drop-shadow-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm rounded-2xl text-gray-800 placeholder-gray-500 border-2 border-white/50 hover:border-secondary/30 focus:border-secondary/50 focus:ring-4 focus:ring-secondary/20 focus:bg-white focus:outline-none transition-all duration-300 shadow-lg"
                />
              </div>
            </div>

            {/* Enhanced feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-800">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <Award size={24} className="text-black" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-300 font-medium">
                  FAQ Articles
                </div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <BarChart3 size={24} className="text-slate-600" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-300 font-medium">
                  Support Available
                </div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <TrendingUp size={24} className="text-secondary" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  &lt;2hrs
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  Response Time
                </div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <Globe size={24} className="text-teal-500" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-300 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Accordion Section */}
      <ScrollAnimation>
        <section className="py-24 relative overflow-hidden">
          {/* Enhanced Background with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-50/90 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-secondary to-teal-500"></div>

          {/* Enhanced Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-16 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-16 right-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <div className="container-custom max-w-5xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-secondary/20 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:bg-white/90 hover:border-secondary/40 hover:scale-105 transition-all duration-300">
                <BookOpen size={18} className="text-secondary" />
                <span className="text-gray-900">Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                {filteredFAQs.length}{" "}
                {filteredFAQs.length === 1 ? "Answer" : "Answers"} Found
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-teal-500 to-slate-600">
                  {" "}
                  For You
                </span>
              </h2>
              {searchTerm && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {filteredFAQs.length === 0
                    ? "No results found for"
                    : "Showing results for"}{" "}
                  "{searchTerm}"
                </p>
              )}
            </div>

            {/* FAQ Cards */}
            <div id="faq-results" className="space-y-6">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Search className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-500/30 rounded-full animate-bounce"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                    Try searching with different keywords or browse all
                    questions below.
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="group relative px-8 py-4 bg-secondary border-2 border-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 hover:border-secondary/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-2xl"
                  >
                    {/* Enhanced glass overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>

                    {/* Premium shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                    {/* Lighthouse-style inner glow */}
                    <div className="absolute inset-0 shadow-inner shadow-white/20 rounded-xl transition-all duration-500"></div>

                    <div className="relative">Show All Questions</div>
                  </button>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const colorScheme = index % 4;
                  return (
                    <div
                      key={index}
                      className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:bg-white/95 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                    >
                      {/* Color accent border */}
                      <div
                        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          colorScheme === 0
                            ? "bg-gradient-to-br from-gray-900/5 to-gray-900/10"
                            : colorScheme === 1
                            ? "bg-gradient-to-br from-slate-600/5 to-slate-600/10"
                            : colorScheme === 2
                            ? "bg-gradient-to-br from-secondary/5 to-secondary/10"
                            : "bg-gradient-to-br from-teal-500/5 to-teal-500/10"
                        }`}
                      ></div>

                      <button
                        onClick={() => toggleQuestion(index)}
                        className="relative z-10 w-full flex items-start justify-between p-8 text-left hover:bg-white/30 transition-colors duration-200"
                      >
                        <div className="flex items-start space-x-6 flex-1">
                          <div
                            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${
                              isOpen
                                ? colorScheme === 0
                                  ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                                  : colorScheme === 1
                                  ? "bg-gradient-to-br from-slate-600 to-slate-700 text-white"
                                  : colorScheme === 2
                                  ? "bg-gradient-to-br from-secondary to-secondary/80 text-white"
                                  : "bg-gradient-to-br from-teal-500 to-teal-600 text-white"
                                : colorScheme === 0
                                ? "bg-gray-900/10 text-gray-800 group-hover:bg-gray-900/20"
                                : colorScheme === 1
                                ? "bg-slate-600/10 text-slate-600 group-hover:bg-slate-600/20"
                                : colorScheme === 2
                                ? "bg-secondary/10 text-secondary group-hover:bg-secondary/20"
                                : "bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20"
                            }`}
                          >
                            <HelpCircle className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-bold text-gray-900 mb-2 pr-4 transition-colors ${
                                colorScheme === 0
                                  ? "group-hover:text-gray-800"
                                  : colorScheme === 1
                                  ? "group-hover:text-slate-600"
                                  : colorScheme === 2
                                  ? "group-hover:text-secondary"
                                  : "group-hover:text-teal-500"
                              }`}
                            >
                              {faq.question}
                            </h3>
                            {!isOpen && (
                              <p className="text-gray-500 text-base line-clamp-2 leading-relaxed">
                                {faq.answer.substring(0, 120)}...
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                            isOpen
                              ? colorScheme === 0
                                ? "bg-gray-900/10 text-gray-800 rotate-180"
                                : colorScheme === 1
                                ? "bg-slate-600/10 text-slate-600 rotate-180"
                                : colorScheme === 2
                                ? "bg-secondary/10 text-secondary rotate-180"
                                : "bg-teal-500/10 text-teal-500 rotate-180"
                              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                          }`}
                        >
                          <ChevronDown className="w-6 h-6" />
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="relative z-10 px-8 pb-8 pl-28">
                          <div className="prose text-gray-600 leading-relaxed text-lg">
                            {faq.answer}
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                                <span>Was this helpful?</span>
                                <button
                                  className={`ml-4 px-3 py-1 rounded-lg transition-colors ${
                                    colorScheme === 0
                                      ? "text-gray-800 hover:bg-gray-100"
                                      : colorScheme === 1
                                      ? "text-slate-600 hover:bg-slate-100"
                                      : colorScheme === 2
                                      ? "text-orange-500 hover:bg-orange-100"
                                      : "text-teal-500 hover:bg-teal-100"
                                  }`}
                                >
                                  Yes
                                </button>
                                <button className="ml-2 px-3 py-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                  No
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Updated recently</span>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    colorScheme === 0
                                      ? "bg-gray-800"
                                      : colorScheme === 1
                                      ? "bg-slate-600"
                                      : colorScheme === 2
                                      ? "bg-orange-500"
                                      : "bg-teal-500"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced Quick Help Section */}
      <ScrollAnimation>
        <section className="py-20 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-500/5 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-slate-500/5 rounded-full blur-xl animate-bounce-slow"></div>
          </div>

          <div className="container-custom max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-secondary/20 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:bg-white/90 hover:border-secondary/40 hover:scale-105 transition-all duration-300">
                <MessageCircle size={18} className="text-secondary" />
                <span className="text-gray-900">Get Support</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Need More Help?
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-teal-500 to-slate-600">
                  {" "}
                  We're Here For You
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Choose the best way to get support and connect with our expert
                team
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Live Chat - Black theme */}
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50 hover:bg-white/95 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">
                    Live Chat Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Get instant help from our support team. Available 24/7 for
                    urgent issues and quick questions.
                  </p>
                  <div className="flex items-center text-gray-800 font-semibold group-hover:gap-3 gap-2 transition-all mb-6">
                    <span>Start conversation</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                  <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <div className="relative">Start Chat</div>
                  </button>
                </div>
              </div>

              {/* Email Support - Steel theme */}
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50 hover:bg-white/95 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-slate-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-slate-600 transition-colors">
                    Email Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Send us detailed questions and we'll respond within 24 hours
                    with comprehensive solutions.
                  </p>
                  <div className="flex items-center text-slate-600 font-semibold group-hover:gap-3 gap-2 transition-all mb-6">
                    <span>Send us email</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                  <Link
                    to="/contact"
                    className="group/btn relative px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden inline-block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <div className="relative">Contact Us</div>
                  </Link>
                </div>
              </div>

              {/* Community - Teal theme */}
              <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50 hover:bg-white/95 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-teal-500 transition-colors">
                    Community Forum
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Join discussions with other hotel managers and learn best
                    practices from industry experts.
                  </p>
                  <div className="flex items-center text-teal-500 font-semibold group-hover:gap-3 gap-2 transition-all mb-6">
                    <span>Join community</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                  <button className="group/btn relative px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-xl"></div>
                    <div className="relative">Join Community</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced CTA Section */}
      <ScrollAnimation>
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-secondary text-white overflow-hidden">
          {/* Enhanced Background decorations */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-float"></div>
          </div>

          {/* Enhanced Floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-16 animate-float">
              <Sparkles size={32} className="text-white/20" />
            </div>
            <div className="absolute top-1/4 right-24 animate-float-delayed">
              <MessageCircle size={40} className="text-orange-400/30" />
            </div>
            <div className="absolute bottom-1/3 left-24 animate-bounce-slow">
              <Mail size={36} className="text-teal-500/30" />
            </div>
            <div className="absolute top-1/3 left-1/3 animate-float">
              <Users size={28} className="text-white/15" />
            </div>
            <div className="absolute bottom-1/4 right-1/3 animate-float-delayed">
              <ArrowRight size={24} className="text-orange-400/25" />
            </div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 px-6 py-3 rounded-full mb-8 transition-all duration-300 shadow-lg">
                <span className="text-sm font-semibold text-white">
                  Ready to Get Started?
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent leading-tight">
                {t("faq.stillHaveQuestions") || "Still Have Questions?"}
              </h2>

              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
                {t("faq.contactTeam") ||
                  "Our team is here to help you succeed with InsightForge. Get personalized support and expert guidance."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link
                  to="/register"
                  className="group relative px-8 py-4 bg-secondary border-2 border-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 hover:border-secondary/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-2xl"
                >
                  {/* Enhanced glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>

                  {/* Premium shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                  {/* Lighthouse-style inner glow */}
                  <div className="absolute inset-0 shadow-inner shadow-white/20 rounded-xl transition-all duration-500"></div>

                  <div className="relative flex items-center justify-center">
                    <span>{t("nav.register") || "Start Free Trial"}</span>
                  </div>
                </Link>

                <Link
                  to="/contact"
                  className="group relative border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-700/50 hover:backdrop-blur-3xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>

                  {/* Enhanced multi-layer glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 pointer-events-none"></div>

                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl pointer-events-none"></div>
                </Link>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                    <MessageCircle size={24} className="text-gray-900" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-gray-300 font-medium">
                    Support Available
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                    <TrendingUp size={24} className="text-slate-600" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    &lt;2hrs
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    Response Time
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                    <Star size={24} className="text-secondary" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-sm text-gray-300 font-medium">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                    <Users size={24} className="text-teal-500" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-sm text-gray-300 font-medium">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default FAQ;

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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqData } from "../lib/data";
import ScrollToTop from "../components/ui/ScrollToTop";

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary text-white py-20 md:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <HelpCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                Frequently Asked Questions
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              {t("faq.title") || "Need Help?"}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
              {t("faq.subtitle") ||
                "Find answers to common questions about InsightForge"}
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in-up animation-delay-600">
              <div className="relative group">
                {/* Enhanced Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Search className="text-gray-400 h-5 w-5 group-focus-within:text-accent group-focus-within:scale-110 transition-all duration-300 drop-shadow-sm" />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm rounded-2xl text-gray-800 placeholder-gray-500 border-2 border-white/50 hover:border-accent/30 focus:border-accent/50 focus:ring-4 focus:ring-accent/20 focus:bg-white focus:outline-none transition-all duration-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Accordion Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">
                Knowledge Base
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {filteredFAQs.length}{" "}
              {filteredFAQs.length === 1 ? "Answer" : "Answers"} Found
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                {filteredFAQs.length === 0
                  ? "No results found for"
                  : "Showing results for"}{" "}
                "{searchTerm}"
              </p>
            )}
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try searching with different keywords or browse all questions
                  below.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Show All Questions
                </button>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div
                          className={`p-2 rounded-xl transition-colors duration-200 ${
                            isOpen
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary group-hover:bg-primary/20"
                          }`}
                        >
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 pr-4">
                            {faq.question}
                          </h3>
                          {!isOpen && (
                            <p className="text-gray-500 text-sm line-clamp-2">
                              {faq.answer.substring(0, 100)}...
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isOpen
                            ? "bg-primary/10 text-primary rotate-180"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 pl-16">
                        <div className="prose text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            <span>Was this helpful?</span>
                            <button className="ml-4 text-primary hover:text-primary/80 transition-colors">
                              Yes
                            </button>
                            <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                              No
                            </button>
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

      {/* Quick Help Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need More Help?
            </h2>
            <p className="text-xl text-gray-600">
              Choose the best way to get support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Live Chat */}
            <div className="group bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Live Chat Support
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant help from our support team. Available 24/7 for
                urgent issues.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center group">
                Start Chat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Email Support */}
            <div className="group bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Email Support
              </h3>
              <p className="text-gray-600 mb-6">
                Send us detailed questions and we'll respond within 24 hours.
              </p>
              <Link
                to="/contact"
                className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center group"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Community */}
            <div className="group bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Forum
              </h3>
              <p className="text-gray-600 mb-6">
                Join discussions with other hotel managers and learn best
                practices.
              </p>
              <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors inline-flex items-center group">
                Join Community
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-primary to-gray-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t("faq.stillHaveQuestions") || "Still Have Questions?"}
            </h2>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {t("faq.contactTeam") ||
                "Our team is here to help you succeed with InsightForge"}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg"
              >
                <Mail className="w-5 h-5 mr-3" />
                {t("nav.contact") || "Contact Us"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("nav.register") || "Start Free Trial"}
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-gray-300">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  &lt;2hrs
                </div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default FAQ;

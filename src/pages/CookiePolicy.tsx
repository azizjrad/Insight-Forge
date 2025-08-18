import React from "react";
import { Link } from "react-router-dom";
import {
  Cookie,
  FileText,
  Shield,
  ArrowLeft,
  Settings,
  Eye,
  Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CookiePolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary/95 to-secondary text-white py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Navigation */}
            <div className="flex justify-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Link>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Cookie className="w-12 h-12 text-accent mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-fade-in">
              {t("cookie.title")}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
              Understanding how we use cookies to enhance your browsing
              experience
            </p>
            <p className="text-lg text-gray-300 animate-fade-in-delayed">
              {t("cookie.lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Cookie Types Overview */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-gray-200/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cookie className="w-6 h-6 text-secondary" />
                Cookie Types Overview
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Essential
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Required for basic functionality
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Performance
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Help us improve site performance
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Functionality
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enable enhanced features
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Targeting
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Personalized advertising
                  </p>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-gray-200/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                Table of Contents
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 1, title: "Introduction", icon: "👋" },
                  { id: 2, title: "What are Cookies?", icon: "🍪" },
                  { id: 3, title: "Types of Cookies We Use", icon: "📋" },
                  { id: 4, title: "Third-Party Cookies", icon: "🤝" },
                  { id: 5, title: "Managing Cookies", icon: "⚙️" },
                  { id: 6, title: "Our Cookie Policy", icon: "📜" },
                  { id: 7, title: "Contact Us", icon: "📧" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#section-${item.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/10 transition-colors duration-300 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700 group-hover:text-secondary transition-colors duration-300">
                      {item.id}. {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div
                id="section-1"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    1
                  </span>
                  Introduction
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    This Cookie Policy explains how InsightForge ("we", "our",
                    or "us") uses cookies and similar technologies on our
                    website and through our services. This policy is part of our
                    Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div
                id="section-2"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    2
                  </span>
                  What are Cookies?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
                    <Cookie className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                      Cookies are small text files that are placed on your
                      device when you visit a website. They are widely used to
                      make websites work more efficiently, provide a better user
                      experience, and give website owners information about how
                      their websites are used.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div
                id="section-3"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    3
                  </span>
                  Types of Cookies We Use
                </h2>
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use the following types of cookies:
                  </p>

                  <div className="grid gap-6">
                    <div className="bg-green-50/80 border border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Essential Cookies
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            These are necessary for the website to function
                            properly and cannot be switched off. They are
                            usually set in response to actions you take, such as
                            setting your privacy preferences, logging in, or
                            filling in forms.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Performance Cookies
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            These allow us to count visits and traffic sources
                            so we can measure and improve the performance of our
                            site. They help us know which pages are the most and
                            least popular and how visitors move around the site.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Settings className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Functionality Cookies
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            These enable enhanced functionality and
                            personalization, such as remembering your
                            preferences and settings.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50/80 border border-orange-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Targeting Cookies
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            These may be set through our site by our advertising
                            partners. They may be used to build a profile of
                            your interests and show you relevant ads on other
                            sites.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div
                id="section-4"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    4
                  </span>
                  Third-Party Cookies
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Some cookies are placed by third parties on our behalf.
                      Third-party cookies enable third-party features or
                      functionality to be provided on or through the website,
                      such as advertising, interactive content, and analytics.
                      The third parties that set these cookies can recognize
                      your device both when it visits our website and when it
                      visits certain other websites.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div
                id="section-5"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    5
                  </span>
                  Managing Cookies
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Most web browsers allow you to control cookies through
                      their settings preferences. However, if you limit the
                      ability of websites to set cookies, you may worsen your
                      overall user experience and/or lose the ability to access
                      certain features of our website.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      To find out more about cookies, including how to see what
                      cookies have been set and how to manage and delete them,
                      visit{" "}
                      <a
                        href="https://www.allaboutcookies.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium"
                      >
                        www.allaboutcookies.org
                      </a>{" "}
                      or{" "}
                      <a
                        href="https://www.aboutcookies.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium"
                      >
                        www.aboutcookies.org
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div
                id="section-6"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    6
                  </span>
                  Our Cookie Policy
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      We will occasionally update this Cookie Policy to reflect
                      changes in our practices and services. When we post
                      changes to this Cookie Policy, we will revise the "Last
                      updated" date at the top of this page.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div
                id="section-7"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    7
                  </span>
                  Contact Us
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about our use of cookies or this
                      Cookie Policy, please contact us at{" "}
                      <a
                        href="mailto:privacy@insightforge.com"
                        className="text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium"
                      >
                        privacy@insightforge.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-secondary/20 rounded-full p-4">
                  <Cookie className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                By continuing to use our website, you consent to the use of
                cookies as described in this Cookie Policy.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/terms"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200/50 text-secondary hover:text-secondary/80 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t("footer.termsOfService")}
                </Link>
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200/50 text-secondary hover:text-secondary/80 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;

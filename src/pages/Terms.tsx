import React from "react";
import { Link } from "react-router-dom";
import { Scale, FileText, Shield, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms: React.FC = () => {
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
                  <Scale className="w-12 h-12 text-accent mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-fade-in">
              {t("terms.title")}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
              Understanding our terms ensures a transparent and secure
              partnership
            </p>
            <p className="text-lg text-gray-300 animate-fade-in-delayed">
              {t("terms.lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Table of Contents */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-gray-200/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                Table of Contents
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 1, title: "Introduction", icon: "👋" },
                  { id: 2, title: "Using InsightForge", icon: "🔧" },
                  { id: 3, title: "Subscription and Payments", icon: "💳" },
                  { id: 4, title: "Content", icon: "📄" },
                  { id: 5, title: "Intellectual Property", icon: "💡" },
                  { id: 6, title: "Termination", icon: "⚠️" },
                  { id: 7, title: "Disclaimer of Warranties", icon: "📋" },
                  { id: 8, title: "Limitation of Liability", icon: "⚖️" },
                  { id: 9, title: "Changes to Terms", icon: "🔄" },
                  { id: 10, title: "Contact Information", icon: "📧" },
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
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These Terms of Service ("Terms") govern your access to and
                    use of InsightForge's website, products, and services
                    ("Services"). Please read these Terms carefully, and contact
                    us if you have any questions.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing or using our Services, you agree to be bound by
                    these Terms and our Privacy Policy.
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
                  Using InsightForge
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">
                        a. Account Registration.
                      </strong>{" "}
                      To use certain features of our Services, you may need to
                      register for an account. You must provide accurate
                      information during the registration process and keep your
                      account details updated.
                    </p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">
                        b. Account Security.
                      </strong>{" "}
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activities that occur
                      under your account. Notify us immediately of any
                      unauthorized use of your account.
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
                  Subscription and Payments
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">a. Fees.</strong> You
                      agree to pay all fees specified when you select a
                      subscription plan. All payments are non-refundable unless
                      stated otherwise in our refund policy.
                    </p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">
                        b. Subscription Term.
                      </strong>{" "}
                      Subscriptions automatically renew unless canceled at least
                      24 hours before the end of the current billing period.
                    </p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">c. Free Trial.</strong>{" "}
                      We may offer a free trial of our Services. At the end of
                      the trial, you will be automatically charged for a
                      subscription unless you cancel before the trial ends.
                    </p>
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
                  Content
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">
                        a. Your Content.
                      </strong>{" "}
                      You retain ownership of any content you submit to the
                      Services. By submitting content, you grant us a worldwide,
                      non-exclusive license to use, reproduce, and display your
                      content in connection with providing the Services.
                    </p>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-secondary">
                        b. Prohibited Content.
                      </strong>{" "}
                      You may not upload or share content that violates any
                      applicable law or these Terms.
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
                  Intellectual Property
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Our Services and all related intellectual property rights
                      belong to InsightForge or its licensors. Nothing in these
                      Terms grants you any right to use our intellectual
                      property except as expressly provided.
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
                  Termination
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      We may suspend or terminate your account if you violate
                      these Terms. You may terminate your account at any time by
                      following the instructions on our website.
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
                  Disclaimer of Warranties
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed font-medium">
                      OUR SERVICES ARE PROVIDED "AS IS" WITHOUT ANY WARRANTIES,
                      EXPRESS OR IMPLIED.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 8 */}
              <div
                id="section-8"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    8
                  </span>
                  Limitation of Liability
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-red-50/80 border border-red-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed font-medium">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, INSIGHTFORGE SHALL
                      NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                      CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE
                      OF OR INABILITY TO USE THE SERVICES.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div
                id="section-9"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    9
                  </span>
                  Changes to Terms
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      We may modify these Terms at any time. If we make material
                      changes to these Terms, we will provide notice through our
                      Services or by other means.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10 */}
              <div
                id="section-10"
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl animate-fade-in"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-full text-secondary font-bold">
                    10
                  </span>
                  Contact Information
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms, please
                      contact us at{" "}
                      <a
                        href="mailto:legal@insightforge.com"
                        className="text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium"
                      >
                        legal@insightforge.com
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
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                By using our Services, you acknowledge that you have read and
                understood these Terms and agree to be bound by them.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200/50 text-secondary hover:text-secondary/80 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t("footer.privacyPolicy")}
                </Link>
                <Link
                  to="/cookie-policy"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200/50 text-secondary hover:text-secondary/80 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t("footer.cookiePolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;

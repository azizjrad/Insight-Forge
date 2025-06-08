import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  FileText,
  Lock,
  ArrowLeft,
  Eye,
  Users,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy: React.FC = () => {
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
                  <Shield className="w-12 h-12 text-accent mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-fade-in">
              {t("privacy.title")}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
              Your privacy is our priority. We're committed to protecting your
              personal information
            </p>
            <p className="text-lg text-gray-300 animate-fade-in-delayed">
              {t("privacy.lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Privacy Principles */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-gray-200/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-secondary" />
                Our Privacy Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Transparency
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Clear about what data we collect and how we use it
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                  <p className="text-gray-600 text-sm">
                    Your data is protected with industry-standard security
                  </p>
                </div>
                <div className="text-center p-6 bg-gray-50/50 rounded-xl">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Control</h3>
                  <p className="text-gray-600 text-sm">
                    You have full control over your personal information
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
                  { id: 2, title: "Information We Collect", icon: "📊" },
                  { id: 3, title: "How We Use Your Information", icon: "🔧" },
                  { id: 4, title: "Sharing Your Information", icon: "🤝" },
                  { id: 5, title: "Your Choices", icon: "⚙️" },
                  { id: 6, title: "Data Security", icon: "🔒" },
                  { id: 7, title: "International Data Transfers", icon: "🌍" },
                  { id: 8, title: "Children's Privacy", icon: "👶" },
                  {
                    id: 9,
                    title: "Changes to This Privacy Policy",
                    icon: "🔄",
                  },
                  { id: 10, title: "Contact Us", icon: "📧" },
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
                <div className="prose prose-lg max-w-none space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    This Privacy Policy explains how InsightForge ("we", "our",
                    or "us") collects, uses, and shares your personal
                    information when you use our website, products, and services
                    ("Services").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We value your privacy and are committed to protecting your
                    personal information. By using our Services, you agree to
                    the collection and use of information in accordance with
                    this Privacy Policy.
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
                  Information We Collect
                </h2>
                <div className="prose prose-lg max-w-none space-y-4">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong className="text-secondary">
                        a. Information You Provide.
                      </strong>{" "}
                      We collect information you provide when you:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Create an account or register for our Services</li>
                      <li>• Fill out forms or surveys</li>
                      <li>• Contact our customer support</li>
                      <li>• Upload or submit content</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong className="text-secondary">
                        b. Automatically Collected Information.
                      </strong>{" "}
                      When you use our Services, we automatically collect
                      certain information, including:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>
                        • Device information (e.g., IP address, browser type,
                        operating system)
                      </li>
                      <li>
                        • Usage information (e.g., pages visited, time spent on
                        pages)
                      </li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
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
                  How We Use Your Information
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Provide, maintain, and improve our Services</li>
                      <li>
                        • Process transactions and send related information
                      </li>
                      <li>
                        • Send you technical notices, updates, and support
                        messages
                      </li>
                      <li>• Respond to your comments and questions</li>
                      <li>• Understand how users interact with our Services</li>
                      <li>
                        • Detect, investigate, and prevent fraudulent
                        transactions and other illegal activities
                      </li>
                      <li>• Protect our rights and the rights of others</li>
                    </ul>
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
                  Sharing Your Information
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We may share your personal information with:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>
                        • Service providers who perform services on our behalf
                      </li>
                      <li>• Business partners (with your consent)</li>
                      <li>
                        • Law enforcement or other third parties when required
                        by law
                      </li>
                      <li>
                        • In connection with a business transaction (e.g.,
                        merger, acquisition)
                      </li>
                    </ul>
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
                  Your Choices
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      You have several choices regarding your personal
                      information:
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>
                        • <strong>Account Information:</strong> You can update
                        or correct your account information at any time
                      </li>
                      <li>
                        • <strong>Marketing Communications:</strong> You can opt
                        out of marketing emails
                      </li>
                      <li>
                        • <strong>Cookies:</strong> You can modify your browser
                        settings to reject cookies
                      </li>
                      <li>
                        • <strong>Data Access and Portability:</strong> You can
                        request a copy of your data
                      </li>
                      <li>
                        • <strong>Deletion:</strong> You can request deletion of
                        your personal information
                      </li>
                    </ul>
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
                  Data Security
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-green-50/80 border border-green-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate security measures to protect your
                      personal information from unauthorized access, alteration,
                      disclosure, or destruction.
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
                  International Data Transfers
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-6 flex items-start gap-4">
                    <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                      Your personal information may be transferred to and
                      processed in countries other than your country of
                      residence, where privacy laws may be different.
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
                  Children's Privacy
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      Our Services are not intended for children under 16. We do
                      not knowingly collect personal information from children
                      under 16.
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
                  Changes to This Privacy Policy
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time. We
                      will notify you of any changes by posting the new Privacy
                      Policy on this page and updating the "Last updated" date.
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
                  Contact Us
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this Privacy Policy,
                      please contact us at{" "}
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
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                By using our Services, you consent to our Privacy Policy and our
                handling of your data as described.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/terms"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200/50 text-secondary hover:text-secondary/80 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {t("footer.termsOfService")}
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

export default Privacy;

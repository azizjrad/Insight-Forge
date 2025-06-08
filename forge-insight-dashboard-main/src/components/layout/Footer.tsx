import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-16 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: Logo and description */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo variant="white" />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Transforming hotel data into actionable insights. Make smarter
                decisions with InsightForge's cutting-edge analytics platform.
              </p>
              {/* Social links */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                  <span className="text-sm font-medium">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                  <span className="text-sm font-medium">in</span>
                </div>
                <div className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                  <span className="text-sm font-medium">tw</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="group flex items-center text-gray-300 hover:text-secondary transition-all duration-300"
                  >
                    <span>{t("nav.home")}</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="group flex items-center text-gray-300 hover:text-secondary transition-all duration-300"
                  >
                    <span>{t("nav.about")}</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="group flex items-center text-gray-300 hover:text-secondary transition-all duration-300"
                  >
                    <span>{t("nav.faq")}</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="group flex items-center text-gray-300 hover:text-secondary transition-all duration-300"
                  >
                    <span>{t("nav.contact")}</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Features */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">
                {t("footer.features")}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  <span className="text-gray-300">Real-time Analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-300">Custom Reports</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  <span className="text-gray-300">Interactive Dashboards</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-300">KPI Monitoring</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  <span className="text-gray-300">Booking Analytics</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">
                {t("footer.contactUs")}
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start group">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 mt-0.5 group-hover:bg-secondary/30 transition-colors duration-300">
                    <MapPin size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      123 Analytics St, Suite 200
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      San Francisco, CA 94103
                    </p>
                  </div>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent/30 transition-colors duration-300">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <span className="text-gray-300">(555) 123-4567</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-secondary/30 transition-colors duration-300">
                    <Mail size={18} className="text-secondary" />
                  </div>
                  <span className="text-gray-300">
                    contact@insightforge.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-secondary/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} InsightForge. {t("footer.copyright")}
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-secondary text-sm transition-colors duration-300 hover:underline"
                  >
                    {t("footer.privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-secondary text-sm transition-colors duration-300 hover:underline"
                  >
                    {t("footer.termsOfService")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-policy"
                    className="text-gray-400 hover:text-secondary text-sm transition-colors duration-300 hover:underline"
                  >
                    {t("footer.cookiePolicy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

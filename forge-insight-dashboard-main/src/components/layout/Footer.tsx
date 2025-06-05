
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and description */}
          <div>
            <Logo variant="white" />
            <p className="mt-4 text-gray-300">
              Transforming hotel data into actionable insights. Make smarter decisions with InsightForge.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-secondary transition duration-150">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-secondary transition duration-150">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-secondary transition duration-150">{t('nav.faq')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-secondary transition duration-150">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.features')}</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Real-time Analytics</span></li>
              <li><span className="text-gray-300">Custom Reports</span></li>
              <li><span className="text-gray-300">Interactive Dashboards</span></li>
              <li><span className="text-gray-300">KPI Monitoring</span></li>
              <li><span className="text-gray-300">Booking Analytics</span></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-secondary" />
                <span className="text-gray-300">123 Analytics St, Suite 200<br />San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-secondary" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-secondary" />
                <span className="text-gray-300">contact@insightforge.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} InsightForge. {t('footer.copyright')}
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><Link to="/privacy" className="text-gray-400 hover:text-secondary text-sm">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-secondary text-sm">{t('footer.termsOfService')}</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-secondary text-sm">{t('footer.cookiePolicy')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

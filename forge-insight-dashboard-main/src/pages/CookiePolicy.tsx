import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiePolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-4">{t('cookie.title')}</h1>
            <p className="text-lg text-gray-300">
              {t('cookie.lastUpdated')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>1. Introduction</h2>
              <p>
                This Cookie Policy explains how InsightForge ("we", "our", or "us") uses cookies and similar technologies on our website 
                and through our services. This policy is part of our Privacy Policy.
              </p>
              
              <h2>2. What are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work 
                more efficiently, provide a better user experience, and give website owners information about how their websites are used.
              </p>
              
              <h2>3. Types of Cookies We Use</h2>
              <p>
                We use the following types of cookies:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off. 
                  They are usually set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the 
                  performance of our site. They help us know which pages are the most and least popular and how visitors move around the site.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> These enable enhanced functionality and personalization, such as remembering your 
                  preferences and settings.
                </li>
                <li>
                  <strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners. They may be used to build a 
                  profile of your interests and show you relevant ads on other sites.
                </li>
              </ul>
              
              <h2>4. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third parties on our behalf. Third-party cookies enable third-party features or functionality to be 
                provided on or through the website, such as advertising, interactive content, and analytics. The third parties that set these cookies 
                can recognize your device both when it visits our website and when it visits certain other websites.
              </p>
              
              <h2>5. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites 
                to set cookies, you may worsen your overall user experience and/or lose the ability to access certain features of our website.
              </p>
              <p>
                To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, 
                visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.allaboutcookies.org</a> or
                <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.aboutcookies.org</a>.
              </p>
              
              <h2>6. Our Cookie Policy</h2>
              <p>
                We will occasionally update this Cookie Policy to reflect changes in our practices and services. When we post changes to this Cookie Policy, 
                we will revise the "Last updated" date at the top of this page.
              </p>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at 
                <a href="mailto:privacy@insightforge.com" className="text-accent hover:underline">privacy@insightforge.com</a>.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                By continuing to use our website, you consent to the use of cookies as described in this Cookie Policy.
              </p>
              <div className="flex justify-center mt-6">
                <Link to="/terms" className="text-accent hover:underline mx-4">{t('footer.termsOfService')}</Link>
                <Link to="/privacy" className="text-accent hover:underline mx-4">{t('footer.privacyPolicy')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;

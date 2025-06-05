import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-4">{t('privacy.title')}</h1>
            <p className="text-lg text-gray-300">
              {t('privacy.lastUpdated')}
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
                This Privacy Policy explains how InsightForge ("we", "our", or "us") collects, uses, and shares your personal information 
                when you use our website, products, and services ("Services").
              </p>
              <p>
                We value your privacy and are committed to protecting your personal information. By using our Services, you agree to the 
                collection and use of information in accordance with this Privacy Policy.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                <strong>a. Information You Provide.</strong> We collect information you provide when you:
              </p>
              <ul>
                <li>Create an account or register for our Services</li>
                <li>Fill out forms or surveys</li>
                <li>Contact our customer support</li>
                <li>Upload or submit content</li>
              </ul>
              <p>
                <strong>b. Automatically Collected Information.</strong> When you use our Services, we automatically collect certain information, 
                including:
              </p>
              <ul>
                <li>Device information (e.g., IP address, browser type, operating system)</li>
                <li>Usage information (e.g., pages visited, time spent on pages)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Understand how users interact with our Services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Protect our rights and the rights of others</li>
              </ul>
              
              <h2>4. Sharing Your Information</h2>
              <p>
                We may share your personal information with:
              </p>
              <ul>
                <li>Service providers who perform services on our behalf</li>
                <li>Business partners (with your consent)</li>
                <li>Law enforcement or other third parties when required by law</li>
                <li>In connection with a business transaction (e.g., merger, acquisition)</li>
              </ul>
              
              <h2>5. Your Choices</h2>
              <p>
                You have several choices regarding your personal information:
              </p>
              <ul>
                <li>Account Information: You can update or correct your account information at any time</li>
                <li>Marketing Communications: You can opt out of marketing emails</li>
                <li>Cookies: You can modify your browser settings to reject cookies</li>
                <li>Data Access and Portability: You can request a copy of your data</li>
                <li>Deletion: You can request deletion of your personal information</li>
              </ul>
              
              <h2>6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, 
                disclosure, or destruction.
              </p>
              
              <h2>7. International Data Transfers</h2>
              <p>
                Your personal information may be transferred to and processed in countries other than your country of residence, 
                where privacy laws may be different.
              </p>
              
              <h2>8. Children's Privacy</h2>
              <p>
                Our Services are not intended for children under 16. We do not knowingly collect personal information from children under 16.
              </p>
              
              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on 
                this page and updating the "Last updated" date.
              </p>
              
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@insightforge.com" className="text-accent hover:underline">privacy@insightforge.com</a>.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                By using our Services, you consent to our Privacy Policy and our handling of your data as described.
              </p>
              <div className="flex justify-center mt-6">
                <Link to="/terms" className="text-accent hover:underline mx-4">{t('footer.termsOfService')}</Link>
                <Link to="/cookie-policy" className="text-accent hover:underline mx-4">{t('footer.cookiePolicy')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;

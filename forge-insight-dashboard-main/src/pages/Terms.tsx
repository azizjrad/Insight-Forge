import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Terms: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-4">{t('terms.title')}</h1>
            <p className="text-lg text-gray-300">
              {t('terms.lastUpdated')}
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
                These Terms of Service ("Terms") govern your access to and use of InsightForge's website, products, and services ("Services"). 
                Please read these Terms carefully, and contact us if you have any questions.
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              
              <h2>2. Using InsightForge</h2>
              <p>
                <strong>a. Account Registration.</strong> To use certain features of our Services, you may need to register for an account. 
                You must provide accurate information during the registration process and keep your account details updated.
              </p>
              <p>
                <strong>b. Account Security.</strong> You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2>3. Subscription and Payments</h2>
              <p>
                <strong>a. Fees.</strong> You agree to pay all fees specified when you select a subscription plan. All payments are non-refundable 
                unless stated otherwise in our refund policy.
              </p>
              <p>
                <strong>b. Subscription Term.</strong> Subscriptions automatically renew unless canceled at least 24 hours before the end of the 
                current billing period.
              </p>
              <p>
                <strong>c. Free Trial.</strong> We may offer a free trial of our Services. At the end of the trial, you will be automatically 
                charged for a subscription unless you cancel before the trial ends.
              </p>
              
              <h2>4. Content</h2>
              <p>
                <strong>a. Your Content.</strong> You retain ownership of any content you submit to the Services. By submitting content, 
                you grant us a worldwide, non-exclusive license to use, reproduce, and display your content in connection with providing the Services.
              </p>
              <p>
                <strong>b. Prohibited Content.</strong> You may not upload or share content that violates any applicable law or these Terms.
              </p>
              
              <h2>5. Intellectual Property</h2>
              <p>
                Our Services and all related intellectual property rights belong to InsightForge or its licensors. Nothing in these Terms 
                grants you any right to use our intellectual property except as expressly provided.
              </p>
              
              <h2>6. Termination</h2>
              <p>
                We may suspend or terminate your account if you violate these Terms. You may terminate your account at any time by following 
                the instructions on our website.
              </p>
              
              <h2>7. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, INSIGHTFORGE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICES.
              </p>
              
              <h2>9. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make material changes to these Terms, we will provide notice through our 
                Services or by other means.
              </p>
              
              <h2>10. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@insightforge.com" className="text-accent hover:underline">legal@insightforge.com</a>.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                By using our Services, you acknowledge that you have read and understood these Terms and agree to be bound by them.
              </p>
              <div className="flex justify-center mt-6">
                <Link to="/privacy" className="text-accent hover:underline mx-4">{t('footer.privacyPolicy')}</Link>
                <Link to="/cookie-policy" className="text-accent hover:underline mx-4">{t('footer.cookiePolicy')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;

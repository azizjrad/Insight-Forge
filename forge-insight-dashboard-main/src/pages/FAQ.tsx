
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqData } from '../lib/data';
import ScrollToTop from '../components/ui/ScrollToTop';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">{t('faq.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Accordion Section */}
      <section className="py-16">
        <div className="container-custom max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-gray-500 flex-shrink-0" />
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="pb-5 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Additional Questions CTA */}
      <section className="py-12 bg-neutral">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="heading-md mb-6">{t('faq.stillHaveQuestions')}</h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('faq.contactTeam')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 justify-center">
              <Mail size={18} />
              {t('nav.contact')}
            </Link>
            <Link to="/register" className="btn-secondary">
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default FAQ;

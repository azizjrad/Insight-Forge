
import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-md mb-6">{t('contact.getInTouch')}</h2>
              <p className="text-gray-600 mb-8">
                {t('contact.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin size={24} className="text-secondary mr-4 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      123 Analytics St, Suite 200<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-secondary mr-4 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">
                      (555) 123-4567<br />
                      Monday - Friday, 9am - 6pm PST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="text-secondary mr-4 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">
                      contact@insightforge.com<br />
                      support@insightforge.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-dashboard">
                <h2 className="heading-md mb-6">{t('contact.sendMessage')}</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center mb-6">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t('contact.success')}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact.name')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contact.email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.subject')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="">Please select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sales Question">Sales Question</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-primary w-full flex items-center justify-center ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('contact.sending')}
                          </>
                        ) : (
                          <>{t('contact.send')}</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-neutral">
        <div className="container-custom">
          <h2 className="heading-md mb-6 text-center">Visit Our Office</h2>
          <div className="aspect-[21/9] max-h-[400px] bg-gray-200 rounded-lg">
            {/* This would be a map in a real implementation */}
            <div className="h-full w-full flex items-center justify-center">
              <MapPin size={48} className="text-secondary" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, BarChart, FileText, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">{t('about.title')}</h1>
            <p className="text-secondary font-semibold mb-4">{t('about.subtitle')}</p>
            <p className="text-xl text-gray-300">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                InsightForge was founded in 2019 by a team of hotel industry veterans and data scientists who recognized a critical gap in the market: hotels were collecting vast amounts of data but struggling to transform it into actionable insights.
              </p>
              <p className="text-gray-700 mb-4">
                Our founders had firsthand experience with the challenges of managing hotels without reliable data. Spreadsheets were cumbersome, reports were outdated as soon as they were created, and valuable insights were often buried in mountains of numbers.
              </p>
              <p className="text-gray-700">
                We set out to build a solution that would make powerful analytics accessible to hotels of all sizes. Today, InsightForge serves hundreds of properties worldwide, helping them make data-driven decisions that improve guest satisfaction and boost profitability.
              </p>
            </div>
            <div className="bg-neutral rounded-lg p-8">
              <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                <BarChart3 size={64} className="text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission and Values */}
      <section className="py-16 bg-neutral">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600">
              We believe in the power of data to transform the hospitality industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="card-dashboard p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-secondary/50">
              <div className="mb-4 text-secondary transition-all duration-300 hover:scale-110">
                <BarChart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Innovation</h3>
              <p className="text-gray-600">
                We're committed to continuous innovation, always looking for new ways to extract valuable insights from hotel data.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="card-dashboard p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-accent/50">
              <div className="mb-4 text-accent transition-all duration-300 hover:scale-110">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Success</h3>
              <p className="text-gray-600">
                Your success is our success. We provide exceptional support and training to ensure you get maximum value from our platform.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="card-dashboard p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary/50">
              <div className="mb-4 text-primary transition-all duration-300 hover:scale-110">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
              <p className="text-gray-600">
                We believe powerful analytics doesn't have to be complicated. Our platform is designed to be intuitive and easy to use.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">
              A dedicated team of hotel industry veterans and technology experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="aspect-square bg-gray-200 rounded-full max-w-[200px] mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Alex Thompson</h3>
              <p className="text-gray-600 mb-3">CEO & Co-Founder</p>
              <p className="text-gray-600 text-sm">Former hotel GM with 15+ years in the hospitality industry.</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="aspect-square bg-gray-200 rounded-full max-w-[200px] mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Maria Rodriguez</h3>
              <p className="text-gray-600 mb-3">CTO & Co-Founder</p>
              <p className="text-gray-600 text-sm">Data scientist with a background in analytics and AI.</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="aspect-square bg-gray-200 rounded-full max-w-[200px] mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">David Kim</h3>
              <p className="text-gray-600 mb-3">Head of Customer Success</p>
              <p className="text-gray-600 text-sm">Dedicated to helping hotels get the most from their data.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading-md mb-4">Ready to see InsightForge in action?</h2>
              <p className="text-gray-300 mb-6">
                Schedule a personalized demo with our team and see how we can help transform your hotel's data into actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  <Mail size={18} />
                  Request a Demo
                </Link>
                <Link to="/register" className="bg-transparent text-white border border-white hover:bg-white/10 font-medium py-2 px-4 rounded shadow transition duration-200">
                  {t('nav.register')}
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <h3 className="text-xl font-semibold mb-3">Join our growing community</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span>
                    <span>500+ hotels worldwide</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span>
                    <span>15+ countries</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span>
                    <span>98% customer satisfaction</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span>
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

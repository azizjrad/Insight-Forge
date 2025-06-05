
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ChartPie, Activity, Settings, ArrowRight } from 'lucide-react';
import { testimonialData } from '../lib/data';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-secondary font-semibold mb-3">InsightForge: Stop Guessing, Start Growing.</p>
              <h1 className="heading-xl mb-6">Turn your hotel data into actionable insights</h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                InsightForge helps you monitor key metrics, understand guest behavior, and make data-driven decisions to increase revenue and guest satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-secondary bg-secondary text-white hover:bg-opacity-90 border-none">
                  Start Free Trial
                </Link>
                <Link to="/about" className="bg-transparent text-white border border-white hover:bg-white/10 font-medium py-2 px-4 rounded shadow transition duration-200">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 flex flex-col">
                      <span className="text-sm text-gray-300">Revenue</span>
                      <span className="text-2xl font-bold">$124,751</span>
                      <span className="text-xs text-green-400">+8.2% ↑</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex flex-col">
                      <span className="text-sm text-gray-300">Occupancy</span>
                      <span className="text-2xl font-bold">78.3%</span>
                      <span className="text-xs text-green-400">+2.1% ↑</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex flex-col">
                      <span className="text-sm text-gray-300">RevPAR</span>
                      <span className="text-2xl font-bold">$95.24</span>
                      <span className="text-xs text-green-400">+5.7% ↑</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex flex-col">
                      <span className="text-sm text-gray-300">ADR</span>
                      <span className="text-2xl font-bold">$121.64</span>
                      <span className="text-xs text-red-400">-1.2% ↓</span>
                    </div>
                  </div>
                  <div className="mt-4 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="text-accent" />
                      <span className="text-sm">Interactive Chart Preview</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-accent/20 blur-2xl rounded-full"></div>
                <div className="absolute -top-4 -left-4 h-24 w-24 bg-secondary/20 blur-2xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Powerful features designed for hotels</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to analyze performance, understand your guests, and make better business decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-accent/50">
              <div className="bg-accent/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-accent/20 hover:scale-110">
                <BarChart3 size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Monitor your hotel's performance with real-time data on occupancy, revenue, and more.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-secondary/50">
              <div className="bg-secondary/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
                <ChartPie size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Reports</h3>
              <p className="text-gray-600">
                Create and export custom reports tailored to your specific business needs.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary/50">
              <div className="bg-primary/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                <Activity size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">KPI Monitoring</h3>
              <p className="text-gray-600">
                Track the metrics that matter most to your hotel with customizable KPI dashboards.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary/50">
              <div className="bg-primary/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                <Settings size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Setup</h3>
              <p className="text-gray-600">
                Get started quickly with simple integration and an intuitive user interface.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-secondary/50">
              <div className="bg-secondary/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-secondary/20 hover:scale-110">
                <ChartPie size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guest Insights</h3>
              <p className="text-gray-600">
                Understand your guests better with detailed demographic and behavioral analysis.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="card-dashboard flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-accent/50">
              <div className="bg-accent/10 p-4 rounded-full mb-4 transition-all duration-300 hover:bg-accent/20 hover:scale-110">
                <BarChart3 size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Revenue Optimization</h3>
              <p className="text-gray-600">
                Identify opportunities to increase revenue with advanced analytics and forecasting.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-neutral">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What our clients say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hotels of all sizes trust InsightForge to help them make better business decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="card-dashboard p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.hotel}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-secondary font-semibold mb-4">InsightForge: Stop Guessing, Start Growing.</p>
            <h2 className="heading-lg mb-6">Ready to transform your hotel's data into actionable insights?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join hundreds of hotels already using InsightForge to optimize their operations and increase revenue.
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3">
              Start Your Free Trial
              <ArrowRight size={20} />
            </Link>
            <p className="mt-4 text-sm text-gray-400">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

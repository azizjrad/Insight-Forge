import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Globe,
  Send,
  CheckCircle,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Users,
  HeadphonesIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollToTop from "../components/ui/ScrollToTop";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset submission status after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary text-white py-20 md:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              {t("contact.title") || "Contact Us"}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
              {t("contact.subtitle") ||
                "We're here to help you transform your data into insights"}
            </p>

            {/* Quick Contact Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  &lt;24hrs
                </div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-300">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-300">Satisfaction Goal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t("contact.getInTouch") || "Get in Touch"}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("contact.description") ||
                    "Ready to unlock the power of your data? Our team is here to help you every step of the way."}
                </p>
              </div>

              <div className="space-y-6">
                {/* Office Address */}
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Office Address
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        ESEN Manouba Campus
                        <br />
                        Manouba University
                        <br />
                        Tunisia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Phone Support
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        (+216) 71 123 456
                        <br />
                        Monday - Friday, 9am - 6pm CET
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl group-hover:from-secondary/20 group-hover:to-secondary/10 transition-all duration-300">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Email Support
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        contact@insightforge.com
                        <br />
                        support@insightforge.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl group-hover:from-purple-500/20 group-hover:to-purple-500/10 transition-all duration-300">
                      <Clock className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Weekend: Emergency support only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-4">
                      <Send className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Send Message
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {t("contact.sendMessage") || "Send us a Message"}
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-6 rounded-2xl flex items-center mb-6">
                      <div className="p-2 bg-green-100 rounded-full mr-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-sm text-green-700">
                          {t("contact.success") ||
                            "Thank you for your message. We'll respond within 24 hours."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-900 mb-2"
                          >
                            {t("contact.name") || "Full Name"} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-gray-300"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-900 mb-2"
                          >
                            {t("contact.email") || "Email Address"} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-gray-300"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.subject") || "Subject"} *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-gray-300 bg-white"
                        >
                          <option value="">Please select a subject</option>
                          <option value="General Inquiry">
                            General Inquiry
                          </option>
                          <option value="Sales Question">Sales Question</option>
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Partnership Opportunity">
                            Partnership Opportunity
                          </option>
                          <option value="Demo Request">Demo Request</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-gray-900 mb-2"
                        >
                          {t("contact.message") || "Message"} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-gray-300 resize-none"
                          placeholder="Tell us about your project or how we can help..."
                        ></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group w-full bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-lg inline-flex items-center justify-center ${
                            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("contact.sending") || "Sending Message..."}
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                              {t("contact.send") || "Send Message"}
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent/10 rounded-full px-4 py-2 mb-4">
              <HeadphonesIcon className="w-5 h-5 mr-2 text-accent" />
              <span className="text-sm font-medium text-accent">
                Quick Support
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600">
              Choose the best option for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Live Chat */}
            <div className="group bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Live Chat Support
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant help from our support team. Available during
                business hours for urgent issues.
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center group">
                Start Chat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Documentation */}
            <div className="group bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Documentation
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our comprehensive guides, tutorials, and API
                documentation.
              </p>
              <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center group">
                View Docs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Community */}
            <div className="group bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Forum
              </h3>
              <p className="text-gray-600 mb-6">
                Join discussions with other users and learn best practices from
                the community.
              </p>
              <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors inline-flex items-center group">
                Join Community
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-secondary/10 rounded-full px-4 py-2 mb-4">
              <MapPin className="w-5 h-5 mr-2 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Location
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Campus
            </h2>
            <p className="text-xl text-gray-600">
              Located at ESEN Manouba, Tunisia
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-[21/9] max-h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg overflow-hidden relative">
              {/* Enhanced Map Placeholder */}
              <div className="h-full w-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin size={40} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    ESEN Manouba
                  </h3>
                  <p className="text-gray-600">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-primary to-gray-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Let's Transform Your Data Together
            </h2>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join hundreds of businesses already using InsightForge to make
              data-driven decisions
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg">
                <MessageCircle className="w-5 h-5 mr-3" />
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center">
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>

                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Contact;

import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Award,
  TrendingUp,
  BarChart3,
  Zap,
  Building,
  Star,
  Target,
  Shield,
  Headphones,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollToTop from "../components/ui/ScrollToTop";
import { ScrollAnimation } from "../components/ui/ScrollAnimation";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    contactReason: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    businessType: "",
    propertyCount: "",
    roomCount: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [phoneCountry, setPhoneCountry] = useState("TN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Country codes mapping
  const countryCodes: { [key: string]: string } = {
    TN: "+216",
    US: "+1",
    CA: "+1",
    UK: "+44",
    FR: "+33",
    DE: "+49",
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target; // If business type changes, reset property count and room count
    if (name === "businessType") {
      setFormState({
        ...formState,
        [name]: value,
        propertyCount: "",
        roomCount: "",
      });
    } else {
      setFormState({ ...formState, [name]: value });
    } // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError("");
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
    validateField(fieldName, formState[fieldName as keyof typeof formState]);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      switch (fieldName) {
        case "contactReason":
          error = "Please complete this required field.";
          break;
        case "firstName":
          error = "Please complete this required field.";
          break;
        case "lastName":
          error = "Please complete this required field.";
          break;
        case "email":
          error = "Please complete this required field.";
          break;
        case "phone":
          error = "Please complete this required field.";
          break;
        case "company":
          error = "Please complete this required field.";
          break;
        case "country":
          error = "Please complete this required field.";
          break;
        case "businessType":
          error = "Please complete this required field.";
          break;
        case "message":
          error = "Please complete this required field.";
          break;
        default:
          error = "This field is required.";
      }
    } else if (fieldName === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (fieldName === "phone" && value.trim()) {
      const phoneRegex = /^\+?[\d\s\-()]{8,}$/;
      if (!phoneRegex.test(value)) {
        error = "Please enter a valid phone number.";
      }
    }

    setErrors({ ...errors, [fieldName]: error });
    return error === "";
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Validate all required fields
    const requiredFields = [
      "contactReason",
      "firstName",
      "lastName",
      "email",
      "phone",
      "company",
      "country",
      "businessType",
      "message",
    ];
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!validateField(field, formState[field as keyof typeof formState])) {
        isValid = false;
      }
    });
    if (!isValid) {
      setTouched(
        requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      setGeneralError("Please complete all required fields");

      // Scroll to top of form
      const formElement = document.getElementById("contact-form");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    // Clear general error if validation passes
    setGeneralError("");

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true); // Reset form
      setFormState({
        contactReason: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        businessType: "",
        propertyCount: "",
        roomCount: "",
        message: "",
      });
      setErrors({});
      setTouched({});

      // Reset submission status after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  return (
    <div className="animate-fade-in overflow-hidden relative">
      <LoadingOverlay
        isVisible={isSubmitting}
        message="Sending your message..."
        fullScreen={false}
      />
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 md:py-24 lg:py-28 overflow-hidden min-h-[80vh] flex items-center">
        {/* Enhanced Background decorations */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-float"></div>
        </div>
        {/* Enhanced Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 animate-float">
            <MessageCircle size={32} className="text-white/20" />
          </div>
          <div className="absolute top-1/4 right-24 animate-float-delayed">
            <Mail size={40} className="text-orange-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-24 animate-bounce-slow">
            <Phone size={36} className="text-teal-500/30" />
          </div>
          <div className="absolute top-1/3 left-1/3 animate-float">
            <Users size={28} className="text-white/15" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float-delayed">
            <Send size={24} className="text-orange-400/25" />
          </div>
        </div>
        <div className="container-custom relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            {" "}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 px-6 py-3 rounded-full mb-8 animate-fade-in-up transition-all duration-300 shadow-lg">
              <MessageCircle size={20} className="text-secondary" />
              <span className="text-sm font-semibold text-white">
                Get in Touch with Our Team
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-white via-white to-gray-100 bg-clip-text text-transparent leading-tight">
              Let's Build Something
              <span className="block bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>{" "}
            <p className="text-2xl md:text-3xl font-semibold mb-8 animate-fade-in-up animation-delay-400 text-secondary">
              Ready to transform your data into actionable insights?
            </p>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto">
              Our team of experts is here to help you succeed with custom
              solutions tailored to your business needs.
            </p>
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-800">
              {" "}
              <button
                onClick={() => {
                  const contactForm = document.getElementById("contact-form");
                  if (contactForm) {
                    contactForm.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  }
                }}
                className="group relative px-8 py-4 bg-secondary border-2 border-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 hover:border-secondary/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
              >
                {/* Enhanced glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                {/* Premium shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>{" "}
                <div className="relative flex items-center justify-center">
                  <span>Contact us</span>
                </div>
              </button>{" "}
              <a
                href="#quick-contact"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg"
              >
                {/* Enhanced glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                {/* Premium shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>{" "}
                <div className="relative flex items-center justify-center">
                  <span>Quick Call</span>
                </div>
              </a>
            </div>{" "}
            {/* Enhanced feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-1000">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <Award size={24} className="text-gray-900" />
                </div>
                <p className="text-white/90 font-medium text-sm">Expert Team</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <Clock size={24} className="text-gray-600" />
                </div>
                <p className="text-white/90 font-medium text-sm">
                  24/7 Support
                </p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <Globe size={24} className="text-secondary" />
                </div>
                <p className="text-white/90 font-medium text-sm">
                  Global Reach
                </p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl mb-4 group-hover:bg-white/80 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
                  <TrendingUp size={24} className="text-teal-500" />
                </div>
                <p className="text-white/90 font-medium text-sm">
                  Proven Results
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </section>

      {/* Professional Contact Form Section */}
      <ScrollAnimation>
        <section
          id="contact-form"
          className="py-20 bg-white relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary/3 to-primary/3 rounded-full blur-3xl"></div>
          </div>{" "}
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-orange-500 to-primary">
                    Contact us
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Get connected with the Lighthouse team by completing the form
                  below, and we'll be in touch soon.
                </p>
              </div>
              <div className="relative">
                {/* Subtle background decoration */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>{" "}
                <div className="relative bg-white rounded-2xl p-8 md:p-10">
                  {isSubmitted ? (
                    <div className="text-center py-16 animate-fade-in">
                      {" "}
                      <div className="relative inline-flex items-center justify-center w-24 h-24 bg-secondary/10 backdrop-blur-sm rounded-full mx-auto mb-8 overflow-hidden border border-secondary/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/30 animate-pulse"></div>
                        <CheckCircle className="w-12 h-12 text-secondary relative z-10" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-6">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
                        Thank you for reaching out. We'll get back to you within
                        24 hours with a personalized response.
                      </p>{" "}
                      <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
                        <div className="flex items-center gap-2 p-3 bg-secondary/10 backdrop-blur-sm rounded-xl border border-secondary/20 hover:bg-secondary/15 transition-all duration-300">
                          <Clock size={16} className="text-secondary" />
                          <span className="text-sm font-medium text-gray-700">
                            24h
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-secondary/10 backdrop-blur-sm rounded-xl border border-secondary/20 hover:bg-secondary/15 transition-all duration-300">
                          <Users size={16} className="text-secondary" />
                          <span className="text-sm font-medium text-gray-700">
                            Expert
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-secondary/10 backdrop-blur-sm rounded-xl border border-secondary/20 hover:bg-secondary/15 transition-all duration-300">
                          <Target size={16} className="text-secondary" />
                          <span className="text-sm font-medium text-gray-700">
                            Custom
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      {/* Contact Reason */}
                      <div className="relative">
                        {" "}
                        <select
                          name="contactReason"
                          value={formState.contactReason}
                          onChange={handleChange}
                          onBlur={() => handleBlur("contactReason")}
                          required
                          className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-gray-900 pr-12 focus:outline-none ${
                            errors.contactReason && touched.contactReason
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                        >
                          {" "}
                          <option value="" disabled>
                            What would you like to contact us about? *
                          </option>
                          <option value="General">General</option>
                          <option value="Finance">Finance</option>
                          <option value="Sales & pricing">
                            Sales & pricing
                          </option>
                          <option value="Marketing & PR">Marketing & PR</option>
                          <option value="Careers">Careers</option>
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Partnership">Partnership</option>
                        </select>
                        {formState.contactReason !== "" && (
                          <label className="absolute left-4 -top-2 text-secondary text-sm bg-white px-2 pointer-events-none">
                            What would you like to contact us about? *
                          </label>
                        )}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        {errors.contactReason && touched.contactReason && (
                          <p className="mt-2 text-sm text-secondary">
                            {errors.contactReason}
                          </p>
                        )}
                      </div>
                      {/* Name Fields */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative">
                          {" "}
                          <input
                            type="text"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            onBlur={() => handleBlur("firstName")}
                            required
                            className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer focus:outline-none ${
                              errors.firstName && touched.firstName
                                ? "border-secondary"
                                : "border-gray-300"
                            }`}
                            placeholder=" "
                          />
                          <label className="absolute left-6 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                            First Name *
                          </label>
                          {errors.firstName && touched.firstName && (
                            <p className="mt-2 text-sm text-secondary">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          {" "}
                          <input
                            type="text"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            onBlur={() => handleBlur("lastName")}
                            required
                            className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer focus:outline-none ${
                              errors.lastName && touched.lastName
                                ? "border-secondary"
                                : "border-gray-300"
                            }`}
                            placeholder=" "
                          />
                          <label className="absolute left-6 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                            Last Name *
                          </label>
                          {errors.lastName && touched.lastName && (
                            <p className="mt-2 text-sm text-secondary">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>{" "}
                      {/* Business Email and Company Name */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative">
                          {" "}
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur("email")}
                            required
                            className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer focus:outline-none ${
                              errors.email && touched.email
                                ? "border-secondary"
                                : "border-gray-300"
                            }`}
                            placeholder=" "
                          />
                          <label className="absolute left-6 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                            Business Email *
                          </label>
                          {errors.email && touched.email && (
                            <p className="mt-2 text-sm text-secondary">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          {" "}
                          <input
                            type="text"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            onBlur={() => handleBlur("company")}
                            required
                            className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer focus:outline-none ${
                              errors.company && touched.company
                                ? "border-secondary"
                                : "border-gray-300"
                            }`}
                            placeholder=" "
                          />
                          <label className="absolute left-6 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                            Company/Hotel Name *
                          </label>
                          {errors.company && touched.company && (
                            <p className="mt-2 text-sm text-secondary">
                              {errors.company}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* Country */}
                      <div className="relative">
                        {" "}
                        <select
                          name="country"
                          value={formState.country}
                          onChange={handleChange}
                          onBlur={() => handleBlur("country")}
                          required
                          className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 appearance-none pr-12 focus:outline-none ${
                            errors.country && touched.country
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="" disabled>
                            Country *
                          </option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="ES">Spain</option>
                          <option value="IT">Italy</option>
                          <option value="AU">Australia</option>
                          <option value="JP">Japan</option>
                          <option value="TN">Tunisia</option>
                          <option value="OTHER">Other</option>
                        </select>
                        {formState.country !== "" && (
                          <label className="absolute left-4 -top-2 text-secondary text-sm bg-white px-2 pointer-events-none">
                            Country *
                          </label>
                        )}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        {errors.country && touched.country && (
                          <p className="mt-2 text-sm text-secondary">
                            {errors.country}
                          </p>
                        )}
                      </div>
                      {/* Phone Number */}
                      <div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative">
                            {" "}
                            <select
                              value={phoneCountry}
                              onChange={(e) => setPhoneCountry(e.target.value)}
                              className="w-full px-4 py-5 border rounded-2xl focus:border-black bg-gray-50 focus:bg-gray-50 text-gray-900 appearance-none pr-10 border-gray-300 focus:outline-none"
                            >
                              <option value="TN">Tunisia</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="FR">France</option>
                              <option value="DE">Germany</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="col-span-2 relative">
                            <div className="absolute left-6 top-4 text-gray-700 z-10 pointer-events-none">
                              {countryCodes[phoneCountry]}
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              onBlur={() => handleBlur("phone")}
                              required
                              className={`w-full pl-20 pr-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer focus:outline-none ${
                                errors.phone && touched.phone
                                  ? "border-secondary"
                                  : "border-gray-300"
                              }`}
                              placeholder=" "
                            />
                            <label className="absolute left-20 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                              Phone number *
                            </label>
                          </div>
                        </div>
                        {errors.phone && touched.phone && (
                          <p className="mt-2 text-sm text-secondary">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      {/* Business Type */}
                      <div className="relative">
                        {" "}
                        <select
                          name="businessType"
                          value={formState.businessType}
                          onChange={handleChange}
                          onBlur={() => handleBlur("businessType")}
                          required
                          className={`w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-gray-900 pr-12 focus:outline-none ${
                            errors.businessType && touched.businessType
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="" disabled>
                            What's your business type? *
                          </option>
                          <option value="Hotel">Hotel</option>
                          <option value="Resort">Resort</option>
                          <option value="Boutique Hotel">Boutique Hotel</option>
                          <option value="Chain Hotel">Chain Hotel</option>
                          <option value="B&B">Bed & Breakfast</option>
                          <option value="Vacation Rental">
                            Vacation Rental
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        {formState.businessType !== "" && (
                          <label className="absolute left-4 -top-2 text-secondary text-sm bg-white px-2 pointer-events-none">
                            What's your business type? *
                          </label>
                        )}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        {errors.businessType && touched.businessType && (
                          <p className="mt-2 text-sm text-secondary">
                            {errors.businessType}
                          </p>
                        )}
                      </div>
                      {/* Property Count - Shows only when Chain Hotel is selected */}
                      {formState.businessType === "Chain Hotel" && (
                        <div className="animate-in slide-in-from-top-2 duration-300 relative">
                          {" "}
                          <select
                            name="propertyCount"
                            value={formState.propertyCount}
                            onChange={handleChange}
                            className="w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-gray-900 pr-12 border-gray-300 focus:outline-none"
                          >
                            <option value="" disabled>
                              How many properties do you have?
                            </option>
                            <option value="2-5">2-5 properties</option>
                            <option value="6-10">6-10 properties</option>
                            <option value="11-25">11-25 properties</option>
                            <option value="26-50">26-50 properties</option>
                            <option value="51-100">51-100 properties</option>
                            <option value="100+">100+ properties</option>
                          </select>
                          {formState.propertyCount !== "" && (
                            <label className="absolute left-4 -top-2 text-secondary text-sm bg-white px-2 pointer-events-none">
                              How many properties do you have?
                            </label>
                          )}
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}{" "}
                      {/* Room Count - Shows only when business type is selected */}
                      {formState.businessType && (
                        <div className="animate-in slide-in-from-top-2 duration-300 relative">
                          {" "}
                          <select
                            name="roomCount"
                            value={formState.roomCount}
                            onChange={handleChange}
                            className="w-full px-6 py-5 border rounded-2xl focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-gray-900 pr-12 border-gray-300 focus:outline-none"
                          >
                            <option value="" disabled>
                              How many rooms do you have?
                            </option>
                            <option value="1-10">1-10 rooms</option>
                            <option value="11-25">11-25 rooms</option>
                            <option value="26-50">26-50 rooms</option>
                            <option value="51-100">51-100 rooms</option>
                            <option value="101-250">101-250 rooms</option>
                            <option value="251-500">251-500 rooms</option>
                            <option value="500+">500+ rooms</option>
                          </select>
                          {formState.roomCount !== "" && (
                            <label className="absolute left-4 -top-2 text-secondary text-sm bg-white px-2 pointer-events-none">
                              How many rooms do you have?
                            </label>
                          )}
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}{" "}
                      {/* Message */}
                      <div className="relative">
                        {" "}
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          onBlur={() => handleBlur("message")}
                          required
                          rows={6}
                          className={`w-full px-6 py-4 border rounded-2xl focus:border-black transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-gray-50 peer resize-none focus:outline-none ${
                            errors.message && touched.message
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                        />
                        <label className="absolute left-6 top-4 text-gray-700 transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-secondary peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-secondary pointer-events-none">
                          Message *
                        </label>
                        {errors.message && touched.message && (
                          <p className="mt-2 text-sm text-secondary">
                            {errors.message}
                          </p>
                        )}
                      </div>{" "}
                      {/* Privacy Policy Notice */}
                      <div className="text-left">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          By submitting your details, you confirm that you would
                          like to receive marketing emails from InsightForge and
                          you agree to the storing and processing of your
                          personal data by Lighthouse as described in our{" "}
                          <Link
                            to="/privacy"
                            className="font-bold text-gray-800 underline hover:text-secondary transition-colors duration-300"
                          >
                            privacy policy
                          </Link>
                          .
                        </p>
                        {generalError && (
                          <p className="text-red-500 text-sm mt-3 font-medium text-left">
                            {generalError}
                          </p>
                        )}
                      </div>{" "}
                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full px-12 py-4 bg-gradient-to-r from-primary via-primary to-secondary text-white font-bold rounded-full shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden flex items-center justify-center gap-4 hover:scale-105 text-lg"
                        >
                          {" "}
                          <span className="relative z-10">
                            {isSubmitting ? (
                              <>
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                                Sending Message...
                              </>
                            ) : (
                              "Contact us"
                            )}
                          </span>
                          {/* Enhanced animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Premium shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </button>
                      </div>{" "}
                    </form>
                  )}{" "}
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced Office Information */}
      <ScrollAnimation>
        <section
          id="quick-contact"
          className="py-24 bg-white relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-5xl mx-auto">
              {" "}
              <div className="text-center mb-16">
                {" "}
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                  Visit Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-teal-500">
                    Modern Office
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Located in the heart of the business district, our office is
                  easily accessible and equipped with modern meeting facilities.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Office Address
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          123 Business Center Drive
                          <br />
                          Suite 456, Tech Tower
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-green-100 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Clock className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Business Hours
                        </h3>
                        <div className="space-y-2 text-gray-600 text-lg">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                          <p className="text-green-600 font-semibold mt-4 flex items-center gap-2">
                            <Shield size={16} />
                            24/7 Emergency Support Available
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>

                <div className="relative">
                  <div className="relative animate-float">
                    {/* Enhanced floating background elements */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>

                    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:bg-white/90 hover:shadow-3xl hover:scale-105 transition-all duration-500">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-teal-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        {/* Enhanced animated background pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute top-8 left-8 w-12 h-12 bg-orange-500/20 rounded rotate-45 animate-pulse"></div>
                          <div className="absolute top-16 right-16 w-10 h-10 bg-secondary/20 rounded-full animate-bounce"></div>
                          <div className="absolute bottom-16 left-16 w-14 h-14 bg-teal-500/20 rounded-lg rotate-12 animate-pulse"></div>
                          <div className="absolute bottom-8 right-8 w-8 h-8 bg-orange-500/20 rounded-full animate-bounce animation-delay-500"></div>
                        </div>

                        <div className="relative z-10 text-center">
                          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary to-secondary rounded-full mb-8 shadow-2xl hover:scale-110 transition-transform duration-300">
                            <MapPin size={56} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Interactive Map
                          </h3>
                          <p className="text-gray-600 mb-8 text-lg">
                            Click to view our location on Google Maps
                          </p>
                          <button className="group bg-primary text-white px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105">
                            <Globe className="w-6 h-6" />
                            <span className="font-semibold">View on Map</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>
      </ScrollAnimation>

      {/* Enhanced CTA Section */}
      <ScrollAnimation>
        <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
          {/* Enhanced background decorations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-float"></div>
          </div>

          <div className="container-custom relative z-10">
            {" "}
            <div className="max-w-5xl mx-auto text-center">
              {" "}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fade-in-up animation-delay-200 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
                Let's Transform Your Data Together
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed animate-fade-in-up animation-delay-400 max-w-4xl mx-auto">
                Join hundreds of businesses already using InsightForge to make
                data-driven decisions and unlock their full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in-up animation-delay-600">
                {" "}
                <Link
                  to="/register"
                  className="group relative px-10 py-5 bg-secondary border-2 border-secondary text-white font-bold rounded-2xl hover:bg-secondary/90 hover:border-secondary/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl text-lg"
                >
                  {/* Enhanced glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  {/* Premium shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>{" "}
                  <div className="relative flex items-center justify-center">
                    <span>Start Free Trial</span>
                  </div>
                </Link>{" "}
                <Link
                  to="/contact-sales"
                  className="group relative px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 overflow-hidden shadow-xl text-lg"
                >
                  {/* Enhanced glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  {/* Premium shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>{" "}
                  <div className="relative flex items-center justify-center">
                    <span>Schedule Demo</span>
                  </div>
                </Link>
              </div>
            </div>{" "}
          </div>
        </section>
      </ScrollAnimation>

      <ScrollToTop />
    </div>
  );
};

export default Contact;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  ChevronRight,
  Users,
  BarChart3,
  Building,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SimpleNavbar from "../components/layout/SimpleNavbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import TestimonialCard from "../components/ui/TestimonialCard";
import { testimonials } from "../data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const ContactSales: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    pms: "",
    businessType: "",
    roomCount: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [phoneCountry, setPhoneCountry] = useState("TN");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const scrollToForm = () => {
    const formElement = document.getElementById("demo-form");
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle carousel API and track current slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
    const { name, value } = e.target;

    // If business type changes, reset room count
    if (name === "businessType") {
      setFormState({ ...formState, [name]: value, roomCount: "" });
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
        case "firstName":
          error = "Please complete this required field.";
          break;
        case "lastName":
          error = "Please complete this required field.";
          break;
        case "email":
          error = "Please complete this required field.";
          break;
        case "company":
          error = "Please complete this required field.";
          break;
        case "country":
          error = "Please complete this required field.";
          break;
        case "phone":
          error = "Please complete this required field.";
          break;
        case "businessType":
          error = "Please complete this required field.";
          break;
        case "roomCount":
          error = "Please complete this required field.";
          break;
      }
    }

    setErrors({ ...errors, [fieldName]: error });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "company",
      "country",
      "phone",
      "businessType",
    ];
    if (formState.businessType) {
      requiredFields.push("roomCount");
    }

    const newErrors: { [key: string]: string } = {};
    const newTouched: { [key: string]: boolean } = {};

    requiredFields.forEach((field) => {
      newTouched[field] = true;
      if (!formState[field as keyof typeof formState].trim()) {
        newErrors[field] = "Please complete this required field.";
      }
    });
    setErrors(newErrors);
    setTouched(newTouched);

    if (Object.keys(newErrors).length > 0) {
      setGeneralError("Please complete all required fields");

      // Scroll to top of form
      const formElement = document.getElementById("demo-form");
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
      setIsSubmitted(true);
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        pms: "",
        businessType: "",
        roomCount: "",
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
    <div className="min-h-screen bg-white">
      {" "}
      {/* Simple Navbar */}
      <SimpleNavbar /> {/* Main Content Section */}
      <section className="pt-40 pb-16 bg-white">
        <div className="max-w-full mx-auto pl-20 pr-4">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {" "}
            {/* Left Column - Text Content */}{" "}
            <div className="lg:col-span-4 lg:pl-8 lg:pt-8">
              {" "}
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-black">Insight</span>
                <span className="text-teal-500">Forge</span>{" "}
                <span className="text-secondary">in action</span>
              </h1>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Let us introduce you to the InsightForge platform. Schedule a
                demo and we'll address any questions you have.
              </p>{" "}
              <div className="mb-8">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Here's what we'll cover:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Your goals and current challenges
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Use cases for your hotel
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      An overview of InsightForge and specific solutions for you
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">Q&A</span>
                  </li>{" "}
                </ul>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                Let's explore how InsightForge can help you bring new insights
                to light.
              </p>{" "}
            </div>{" "}
            {/* Right Column - Contact Form / Thank You Card */}
            <div
              id="demo-form"
              className="lg:col-span-7 lg:col-start-6 bg-white rounded-2xl p-8 lg:mr-8"
            >
              {isSubmitted ? (
                /* Thank You Card */
                <div className="bg-gray-100 rounded-2xl p-12 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Thank you for sending us your details.
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                    Our sales team has received your information and will be in
                    touch shortly to help you.
                  </p>
                </div>
              ) : (
                /* Contact Form */
                <>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {" "}
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      {" "}
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("firstName")}
                          required
                          className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 text-lg text-black peer focus:outline-none ${
                            errors.firstName && touched.firstName
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                        />{" "}
                        <label className="absolute left-4 top-4 text-black text-lg transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                          First Name*
                        </label>
                        {errors.firstName && touched.firstName && (
                          <p className="mt-1 text-sm text-secondary">
                            {errors.firstName}
                          </p>
                        )}
                      </div>{" "}
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("lastName")}
                          required
                          className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 text-lg text-black peer focus:outline-none ${
                            errors.lastName && touched.lastName
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                        />{" "}
                        <label className="absolute left-4 top-4 text-black text-lg transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                          Last Name*
                        </label>
                        {errors.lastName && touched.lastName && (
                          <p className="mt-1 text-sm text-secondary">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>{" "}
                    {/* Business Email */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        required
                        className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 text-lg text-black peer focus:outline-none ${
                          errors.email && touched.email
                            ? "border-secondary"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                      />{" "}
                      <label className="absolute left-4 top-4 text-black text-lg transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                        Business Email*{" "}
                      </label>
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-secondary">
                          {errors.email}
                        </p>
                      )}
                    </div>{" "}
                    {/* Company/Hotel Name */}
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        onBlur={() => handleBlur("company")}
                        required
                        className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 text-lg text-black peer focus:outline-none ${
                          errors.company && touched.company
                            ? "border-secondary"
                            : "border-gray-300"
                        }`}
                        placeholder=" "
                      />{" "}
                      <label className="absolute left-4 top-4 text-black text-lg transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                        Company/Hotel Name*
                      </label>
                      {errors.company && touched.company && (
                        <p className="mt-1 text-sm text-secondary">
                          {errors.company}
                        </p>
                      )}{" "}
                    </div>{" "}
                    {/* Country */}
                    <div className="relative">
                      <select
                        name="country"
                        value={formState.country}
                        onChange={handleChange}
                        onBlur={() => handleBlur("country")}
                        required
                        className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-lg text-black peer pr-10 focus:outline-none ${
                          errors.country && touched.country
                            ? "border-secondary"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="" disabled>
                          Country*
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
                        <option value="OTHER">Other</option>{" "}
                      </select>
                      {formState.country !== "" && (
                        <label className="absolute left-4 -top-2 text-black text-sm bg-white px-2 pointer-events-none">
                          Country*
                        </label>
                      )}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                        </svg>{" "}
                      </div>
                      {errors.country && touched.country && (
                        <p className="mt-1 text-sm text-secondary">
                          {errors.country}
                        </p>
                      )}
                    </div>{" "}
                    {/* Phone Number */}
                    <div>
                      <div className="grid grid-cols-3 gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <select
                            value={phoneCountry}
                            onChange={(e) => setPhoneCountry(e.target.value)}
                            className="w-full px-3 py-5 border border-gray-300 rounded-lg focus:border-black bg-gray-50 focus:bg-gray-50 text-lg text-black appearance-none pr-8 focus:outline-none"
                          >
                            <option value="TN">Tunisia</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                        </div>{" "}
                        <div className="col-span-2 relative">
                          {" "}
                          <div className="absolute left-4 top-4 text-black text-lg z-10 pointer-events-none">
                            {countryCodes[phoneCountry]}
                          </div>{" "}
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            onBlur={() => handleBlur("phone")}
                            required
                            className={`w-full pl-16 pr-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 text-lg text-black peer focus:outline-none ${
                              errors.phone && touched.phone
                                ? "border-secondary"
                                : "border-gray-300"
                            }`}
                            placeholder=" "
                          />{" "}
                          <label className="absolute left-16 top-4 text-black text-lg transition-all duration-300 peer-focus:text-sm peer-focus:-top-2 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-black peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-black pointer-events-none">
                            Phone number*
                          </label>
                        </div>
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="mt-1 text-sm text-secondary">
                          {errors.phone}
                        </p>
                      )}
                    </div>{" "}
                    {/* PMS */}{" "}
                    <div className="relative">
                      <select
                        name="pms"
                        value={formState.pms}
                        onChange={handleChange}
                        className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-lg text-black peer pr-10 focus:outline-none"
                      >
                        <option value="" disabled>
                          What's your current PMS?
                        </option>
                        <option value="Opera">Opera</option>
                        <option value="Protel">Protel</option>
                        <option value="RMS">RMS</option>
                        <option value="Fidelio">Fidelio</option>
                        <option value="Other">Other</option>
                        <option value="None">No PMS</option>
                      </select>
                      {formState.pms !== "" && (
                        <label className="absolute left-4 -top-2 text-black text-sm bg-white px-2 pointer-events-none">
                          What's your current PMS?
                        </label>
                      )}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                    </div>{" "}
                    {/* Business Type */}
                    <div className="relative">
                      {" "}
                      <select
                        name="businessType"
                        value={formState.businessType}
                        onChange={handleChange}
                        onBlur={() => handleBlur("businessType")}
                        required
                        className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-lg text-black peer pr-10 focus:outline-none ${
                          errors.businessType && touched.businessType
                            ? "border-secondary"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="" disabled>
                          What's your business type?*
                        </option>
                        <option value="Hotel">Hotel</option>
                        <option value="Resort">Resort</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                        <option value="Chain Hotel">Chain Hotel</option>
                        <option value="B&B">Bed & Breakfast</option>
                        <option value="Vacation Rental">Vacation Rental</option>
                        <option value="Other">Other</option>
                      </select>{" "}
                      {formState.businessType !== "" && (
                        <label className="absolute left-4 -top-2 text-black text-sm bg-white px-2 pointer-events-none">
                          What's your business type?*
                        </label>
                      )}
                      {errors.businessType && touched.businessType && (
                        <p className="mt-1 text-sm text-secondary">
                          {errors.businessType}
                        </p>
                      )}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                    </div>{" "}
                    {/* Room Count - Shows only when business type is selected */}
                    {formState.businessType && (
                      <div className="animate-in slide-in-from-top-2 duration-300 relative">
                        {" "}
                        <select
                          name="roomCount"
                          value={formState.roomCount}
                          onChange={handleChange}
                          onBlur={() => handleBlur("roomCount")}
                          required
                          className={`w-full px-4 py-5 border rounded-lg focus:border-black transition-all duration-300 bg-gray-50 focus:bg-gray-50 appearance-none text-lg text-black peer pr-10 focus:outline-none ${
                            errors.roomCount && touched.roomCount
                              ? "border-secondary"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="" disabled>
                            How many rooms do you have?*
                          </option>
                          <option value="1-10">1-10 rooms</option>
                          <option value="11-25">11-25 rooms</option>
                          <option value="26-50">26-50 rooms</option>
                          <option value="51-100">51-100 rooms</option>
                          <option value="101-200">101-200 rooms</option>
                          <option value="201-500">201-500 rooms</option>
                          <option value="500+">500+ rooms</option>
                        </select>{" "}
                        {formState.roomCount !== "" && (
                          <label className="absolute left-4 -top-2 text-black text-sm bg-white px-2 pointer-events-none">
                            How many rooms do you have?*
                          </label>
                        )}
                        {errors.roomCount && touched.roomCount && (
                          <p className="mt-1 text-sm text-secondary">
                            {errors.roomCount}
                          </p>
                        )}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
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
                    )}
                    {/* Privacy Notice */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                      By submitting your details, you can confirm that you would
                      like to receive marketing emails from InsightForge and you
                      agree to the storing and processing of your personal data
                      by InsightForge as described in our{" "}
                      <Link
                        to="/privacy"
                        className="text-gray-800 hover:text-secondary font-bold underline"
                      >
                        privacy policy
                      </Link>
                      .
                      {generalError && (
                        <p className="text-red-500 text-sm mt-3 font-medium">
                          {generalError}
                        </p>
                      )}
                    </div>
                    {/* Submit Button */}{" "}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gray-800 hover:bg-secondary text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        "Contact Sales"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>{" "}
      </section>{" "}
      {/* Testimonials Carousel Section */}
      <section className="py-16 bg-white">
        <div className="max-w-full mx-auto pl-20 pr-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
            {" "}
            <div className="lg:col-span-4 lg:pl-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                Trusted by <span className="text-teal-500">70,000</span>{" "}
                hospitality professionals
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-end lg:mr-16">
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <button
                  onClick={() => api?.scrollPrev()}
                  disabled={current === 0}
                  className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-teal-500 hover:border-teal-500 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 18l-6-6 6-6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => api?.scrollNext()}
                  disabled={!api?.canScrollNext()}
                  className="w-16 h-16 rounded-full border border-gray-200 bg-white hover:bg-teal-500 hover:border-teal-500 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 18l6-6-6-6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>{" "}
          <div className="relative">
            <div
              className="overflow-hidden"
              style={{ marginLeft: "2rem", marginRight: "4rem" }}
            >
              {" "}
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: false,
                  slidesToScroll: 1,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-0">
                  {testimonials.map((testimonial) => (
                    <CarouselItem
                      key={testimonial.id}
                      className="basis-full pl-0"
                    >
                      <TestimonialCard
                        quote={testimonial.quote}
                        authorName={testimonial.authorName}
                        authorTitle={testimonial.authorTitle}
                        authorCompany={testimonial.authorCompany}
                        icon={testimonial.icon}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-6">
              Ready to join these industry leaders?
            </p>{" "}
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Schedule Your Demo
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default ContactSales;

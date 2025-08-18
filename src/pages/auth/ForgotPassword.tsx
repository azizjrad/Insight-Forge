import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Shield, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../components/layout/Logo";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate password reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-6">
            <Logo variant="white" />
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Reset Your Password
            </h2>
            <p className="text-xl text-gray-200 mb-2">
              Enter your email address and we'll send you a secure link to reset
              your password.
            </p>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="px-8 py-10">
              {isSubmitted ? (
                <div className="text-center animate-fade-in">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Check Your Email
                  </h3>

                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-secondary mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">
                          Next Steps:
                        </p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                          <li>• Check your inbox (and spam folder)</li>
                          <li>• Click the reset link in the email</li>
                          <li>• Create a new secure password</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full h-12 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/login">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                      </Link>
                    </Button>

                    <p className="text-sm text-gray-500">
                      Didn't receive the email?{" "}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-accent hover:text-accent/90 font-medium transition-colors"
                      >
                        Try again
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary via-gray-800 to-primary bg-clip-text text-transparent">
                      Reset Password
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="pl-10 h-12 border-gray-200 focus:border-secondary focus:ring-secondary/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="group relative w-full h-12 bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    {isSubmitting ? (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending Reset Link...
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Reset Link
                      </span>
                    )}

                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </Button>

                  <div className="text-center pt-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <p className="text-gray-300 text-sm">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-secondary hover:text-secondary/90 font-medium transition-colors"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

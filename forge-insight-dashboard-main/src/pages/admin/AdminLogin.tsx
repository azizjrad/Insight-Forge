import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  LogIn,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Server,
  Database,
  ArrowLeft,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "../../components/layout/Logo";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  // Check if user is already logged in
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple demo authentication for admin
    if (email === "admin@demo.com" && password === "password") {
      try {
        // Use the auth context but set admin-specific data
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem(
          "admin_user",
          JSON.stringify({ email, name: "Admin User" })
        );

        const { error } = await signIn(email, password);
        if (!error) {
          toast.success("Successfully signed in");
          navigate("/admin");
        }
      } catch (error) {
        toast.error("An error occurred during login");
      }
    } else {
      toast.error("Invalid credentials. Try admin@demo.com / password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/10 rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/10 -rotate-12 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-500/10 rotate-45 animate-float-delayed"></div>
      </div>

      {/* Circuit board pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 0v20M0 10h20"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#circuit)"
            className="text-blue-400"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 group bg-slate-800/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/30 hover:border-slate-600/50"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-30 animate-pulse-glow"></div>
                <div className="relative bg-slate-800 p-4 rounded-full border border-slate-700">
                  <Logo variant="white" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Admin Control Center
              </h1>
              <p className="text-slate-400 text-sm">
                Secure access to system administration
              </p>
            </div>

            {/* Security indicators */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-3 h-3 text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Database className="w-3 h-3 text-blue-400" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Server className="w-3 h-3 text-cyan-400" />
                <span>Protected</span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">
                Administrator Access
              </CardTitle>
              <div className="bg-slate-700/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-slate-300 mb-1">Demo Credentials:</p>
                <p className="text-sm text-cyan-400 font-mono">
                  admin@demo.com
                </p>
                <p className="text-sm text-cyan-400 font-mono">password</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter administrator email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-11"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-slate-300 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-slate-600/50 text-slate-400 hover:text-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <LogIn className="w-4 h-4" />
                      Access Admin Panel
                    </span>
                  )}

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Button>
              </form>

              {/* Security footer */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3 h-3" />
                  <span>Protected by enterprise-grade security</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System status indicators */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-3 text-center border border-slate-700/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs text-slate-400">System Online</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-3 text-center border border-slate-700/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs text-slate-400">Database Active</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-3 text-center border border-slate-700/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs text-slate-400">Services Running</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

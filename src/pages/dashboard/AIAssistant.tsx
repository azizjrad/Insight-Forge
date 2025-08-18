import React from "react";
import {
  Bot,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AIAssistant: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-primary via-gray-900 to-primary">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 space-y-8 p-8">
        {/* Enhanced Header */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent mb-2">
                AI Assistant
              </h1>
              <p className="text-gray-300 text-lg">
                Your intelligent companion for data insights and recommendations
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Chat Interface Preview */}
          <Card className="lg:col-span-2 bg-gray-800/60 backdrop-blur-md border-2 border-dashed border-secondary/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-secondary to-accent rounded-xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-200">
                    Intelligent Chat Interface
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Ask questions about your dashboard data and get actionable
                    insights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample conversation */}
                <div className="bg-gray-700/40 backdrop-blur-md rounded-xl p-4 border border-gray-600/50">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-600/60 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-300">
                          You
                        </span>
                      </div>
                      <div className="bg-gray-600/60 rounded-lg px-3 py-2 flex-1">
                        <p className="text-sm text-gray-200">
                          "What are the trending booking patterns for this
                          month?"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg px-3 py-2 flex-1 border border-secondary/30">
                        <p className="text-sm text-gray-200">
                          "Based on your dashboard data, I've analyzed the
                          booking trends and found that weekend bookings
                          increased by 23% this month. Here are my
                          recommendations..."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Button
                    disabled
                    className="bg-gradient-to-r from-secondary to-accent text-white hover:from-secondary/90 hover:to-accent/90 transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Conversation (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-secondary/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-200">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                AI Capabilities
              </CardTitle>
              <CardDescription className="text-gray-400">
                What our AI assistant will be able to help you with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-green-500/30 transition-all">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">
                    Analyze booking trends and patterns
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    Guest behavior insights
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-all">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    Revenue optimization suggestions
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-orange-500/30 transition-all">
                  <Bot className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-300">
                    Automated report generation
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Planned Features */}
          <Card className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-200">
                <Bot className="h-5 w-5 text-blue-400" />
                Planned Features
              </CardTitle>
              <CardDescription className="text-gray-400">
                Advanced functionality in development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-blue-500/30 transition-all">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Natural language query processing
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-purple-500/30 transition-all">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Predictive analytics recommendations
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-green-500/30 transition-all">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Automated alert system
                  </span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-yellow-500/30 transition-all">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Custom dashboard suggestions
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-secondary to-accent shadow-2xl border border-secondary/30">
          <CardContent className="p-6">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 animate-pulse text-white" />
              <h3 className="text-xl font-bold mb-2 text-white">
                AI Assistant is Coming Soon!
              </h3>
              <p className="text-gray-100 mb-4">
                We're working hard to bring you an intelligent assistant that
                will revolutionize how you interact with your dashboard data.
              </p>
              <Button
                variant="secondary"
                disabled
                className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get Notified When Ready
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;

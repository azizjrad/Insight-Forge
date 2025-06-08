import React from "react";
import {
  Bot,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            AI Assistant
          </h1>
          <p className="text-gray-600 mt-1">
            Your intelligent companion for data insights and recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Coming Soon</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Chat Interface Preview */}
        <Card className="lg:col-span-2 border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Intelligent Chat Interface
                </CardTitle>
                <CardDescription>
                  Ask questions about your dashboard data and get actionable
                  insights
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample conversation */}
              <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">You</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                      <p className="text-sm text-gray-700">
                        "What are the trending booking patterns for this month?"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-3 py-2 flex-1 border border-blue-200">
                      <p className="text-sm text-gray-700">
                        "Based on your dashboard data, I've analyzed the booking
                        trends and found that weekend bookings increased by 23%
                        this month. Here are my recommendations..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center py-4">
                <Button
                  disabled
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Conversation (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI Capabilities
            </CardTitle>
            <CardDescription>
              What our AI assistant will be able to help you with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Analyze booking trends and patterns
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Guest behavior insights</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="text-sm">
                  Revenue optimization suggestions
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Bot className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Automated report generation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Planned Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              Planned Features
            </CardTitle>
            <CardDescription>
              Advanced functionality in development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">
                  Natural language query processing
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">
                  Predictive analytics recommendations
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Automated alert system</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Custom dashboard suggestions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold mb-2">
              AI Assistant is Coming Soon!
            </h3>
            <p className="text-blue-100 mb-4">
              We're working hard to bring you an intelligent assistant that will
              revolutionize how you interact with your dashboard data.
            </p>
            <Button variant="secondary" disabled>
              <Sparkles className="h-4 w-4 mr-2" />
              Get Notified When Ready
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;

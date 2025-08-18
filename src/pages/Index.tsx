
import { Link } from 'react-router-dom';
import { Shield, BarChart3, Users, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary">InsightForge</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive Business Intelligence platform that transforms your data into actionable insights. 
            Monitor users, manage data sources, and track activity with powerful admin tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/admin/login">
                <Shield className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                User Dashboard
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Comprehensive user administration with role-based access control, 
                account suspension, and detailed user analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor and manage all connected data sources with real-time status 
                updates, error tracking, and manual refresh capabilities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complete audit trail of all system activities including user logins, 
                data uploads, and administrative actions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Access the admin dashboard to manage your InsightForge platform
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-gray-600">Email: admin@insightforge.com</p>
            <p className="text-sm text-gray-600">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

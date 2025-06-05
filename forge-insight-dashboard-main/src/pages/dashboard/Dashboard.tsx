
import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/PageHeader';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

interface DashboardMetrics {
  totalBookings: number;
  revenue: number;
  occupancyRate: number;
  avgRating: number;
}

interface ChartData {
  monthlyRevenue: number[];
  bookingsByMonth: number[];
  roomTypes: { name: string; bookings: number }[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBookings: 247,
    revenue: 89420,
    occupancyRate: 85.2,
    avgRating: 4.6
  });
  const [chartData, setChartData] = useState<ChartData>({
    monthlyRevenue: [65000, 72000, 68000, 89420],
    bookingsByMonth: [98, 112, 105, 132],
    roomTypes: [
      { name: "Standard", bookings: 45 },
      { name: "Deluxe", bookings: 38 },
      { name: "Suite", bookings: 25 }
    ]
  });

  const updateDashboardData = () => {
    const newMetrics = {
      totalBookings: metrics.totalBookings + Math.floor(Math.random() * 10),
      revenue: metrics.revenue + Math.floor(Math.random() * 5000),
      occupancyRate: Math.min(100, metrics.occupancyRate + Math.random() * 5),
      avgRating: Math.min(5, metrics.avgRating + Math.random() * 0.1)
    };
    setMetrics(newMetrics);
  };

  // Prepare chart data in the correct format
  const revenueData = chartData.monthlyRevenue.map((value, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr'][index],
    revenue: value
  }));

  const bookingsData = chartData.bookingsByMonth.map((value, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr'][index],
    bookings: value
  }));

  const roomTypesData = chartData.roomTypes.map(room => ({
    name: room.name,
    value: room.bookings,
    color: room.name === 'Standard' ? 'rgba(239, 68, 68, 0.8)' : 
           room.name === 'Deluxe' ? 'rgba(245, 158, 11, 0.8)' : 
           'rgba(139, 92, 246, 0.8)'
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your hotel analytics"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.occupancyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">+0.1 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={updateDashboardData}>
          Refresh Data
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={revenueData} dataKey="revenue" xAxisKey="month" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={bookingsData} dataKey="bookings" xAxisKey="month" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={roomTypesData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">New booking from John Doe</div>
              <div className="text-sm">Payment received - $450</div>
              <div className="text-sm">Guest checked in - Room 204</div>
              <div className="text-sm">Review submitted - 5 stars</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

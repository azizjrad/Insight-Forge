
import React, { createContext, useContext, useState } from 'react';

interface DataContextType {
  isDataLoaded: boolean;
  processDataForDashboard: (data: any[]) => void;
  getRevenueData: () => Array<{ month: string; revenue: number }>;
  getBookingData: () => Array<{ name: string; value: number; color: string }>;
  getTopRooms: () => Array<{ id: number; name: string; bookings: number; revenue: number; occupancy: string }>;
  getGuestDistribution: () => Array<{ name: string; value: number; color: string }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<{
    revenue: Array<{ month: string; revenue: number }>;
    bookings: Array<{ name: string; value: number; color: string }>;
    topRooms: Array<{ id: number; name: string; bookings: number; revenue: number; occupancy: string }>;
    guests: Array<{ name: string; value: number; color: string }>;
  }>({
    revenue: [],
    bookings: [],
    topRooms: [],
    guests: []
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const processDataForDashboard = (data: any[]) => {
    try {
      // Process revenue data
      const revenueByMonth = processRevenueData(data);
      
      // Process booking sources
      const bookingSources = processBookingSources(data);
      
      // Process top rooms
      const topRooms = processTopRooms(data);
      
      // Process guest nationality
      const guestDistribution = processGuestData(data);
      
      setDashboardData({
        revenue: revenueByMonth,
        bookings: bookingSources,
        topRooms,
        guests: guestDistribution
      });
      
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  // Helper function to generate random color
  const generateRandomColor = (): string => {
    const colors = [
      '#2EC4B6', '#E84855', '#5E60CE', '#FFB703', 
      '#FB8500', '#023047', '#219EBC', '#8ECAE6',
      '#6A994E', '#386641', '#BC4749', '#A1C181'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Process revenue data from imported data
  const processRevenueData = (data: any[]): Array<{ month: string; revenue: number }> => {
    try {
      // This is a simplified example - in reality you would process the actual data
      // based on its structure
      
      // For demonstration, we'll create some sample revenue data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Try to extract revenue information if it exists in the data
      let revenueData = months.map(month => ({
        month,
        revenue: Math.floor(Math.random() * 50000) + 10000 // Random revenue between 10k and 60k
      }));
      
      return revenueData;
    } catch (error) {
      console.error('Error processing revenue data:', error);
      return [];
    }
  };

  // Process booking sources from imported data
  const processBookingSources = (data: any[]): Array<{ name: string; value: number; color: string }> => {
    try {
      // Sample booking sources
      const sources = [
        { name: 'Direct', value: 35, color: '#2EC4B6' },
        { name: 'Booking.com', value: 25, color: '#E84855' },
        { name: 'Expedia', value: 20, color: '#5E60CE' },
        { name: 'Airbnb', value: 15, color: '#FFB703' },
        { name: 'Other', value: 5, color: '#023047' }
      ];
      
      return sources;
    } catch (error) {
      console.error('Error processing booking sources:', error);
      return [];
    }
  };

  // Process top rooms data from imported data
  const processTopRooms = (data: any[]): Array<{ id: number; name: string; bookings: number; revenue: number; occupancy: string }> => {
    try {
      // Sample top rooms data
      const rooms = [
        { id: 1, name: 'Ocean Suite', bookings: 124, revenue: 56000, occupancy: '87%' },
        { id: 2, name: 'Deluxe King', bookings: 98, revenue: 42000, occupancy: '82%' },
        { id: 3, name: 'Garden View', bookings: 156, revenue: 38000, occupancy: '91%' },
        { id: 4, name: 'Family Room', bookings: 86, revenue: 37000, occupancy: '76%' },
        { id: 5, name: 'Executive Suite', bookings: 62, revenue: 48000, occupancy: '68%' }
      ];
      
      return rooms;
    } catch (error) {
      console.error('Error processing top rooms:', error);
      return [];
    }
  };

  // Process guest nationality data from imported data
  const processGuestData = (data: any[]): Array<{ name: string; value: number; color: string }> => {
    try {
      // Sample guest nationality data
      const nationalities = [
        { name: 'USA', value: 35, color: generateRandomColor() },
        { name: 'UK', value: 20, color: generateRandomColor() },
        { name: 'Germany', value: 15, color: generateRandomColor() },
        { name: 'France', value: 12, color: generateRandomColor() },
        { name: 'Canada', value: 8, color: generateRandomColor() },
        { name: 'Australia', value: 5, color: generateRandomColor() },
        { name: 'Japan', value: 3, color: generateRandomColor() },
        { name: 'Other', value: 2, color: generateRandomColor() }
      ];
      
      return nationalities;
    } catch (error) {
      console.error('Error processing guest data:', error);
      return [];
    }
  };

  const getRevenueData = () => dashboardData.revenue;
  const getBookingData = () => dashboardData.bookings;
  const getTopRooms = () => dashboardData.topRooms;
  const getGuestDistribution = () => dashboardData.guests;

  return (
    <DataContext.Provider value={{ 
      isDataLoaded, 
      processDataForDashboard,
      getRevenueData,
      getBookingData,
      getTopRooms,
      getGuestDistribution
    }}>
      {children}
    </DataContext.Provider>
  );
};

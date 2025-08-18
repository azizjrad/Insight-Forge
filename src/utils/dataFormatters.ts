
/**
 * Format number as currency
 * @param value Number to format
 * @param currency Currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = '$'): string => {
  return `${currency}${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/**
 * Format number as percentage
 * @param value Number to format (0-100)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Format date string to readable format
 * @param dateString Date string
 * @param format Format type
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    switch (format) {
      case 'short':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'long':
        return date.toLocaleDateString('en-US', { 
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
      case 'medium':
      default:
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', month: 'short', day: 'numeric'
        });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Generate random color
 * @returns Random hex color string
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Get color based on value
 * @param value Number between 0-100
 * @param baseColor Optional base color
 * @returns Color string with opacity based on value
 */
export const getColorByValue = (value: number, baseColor: string = '#2EC4B6'): string => {
  // Calculate opacity based on value (0-100)
  const normalized = Math.max(0, Math.min(100, value)) / 100;
  const opacity = (normalized * 0.8 + 0.2).toFixed(2); // Min opacity of 0.2
  
  // Extract RGB components from hex color
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Convert raw data from CSV/Excel to standardized format
 * @param rawData Raw data from import
 * @returns Standardized data object
 */
export const standardizeImportedData = (rawData: any[]): any[] => {
  if (!rawData || !rawData.length) return [];
  
  return rawData.map(row => {
    const standardized: any = {};
    
    // Find and standardize date field
    const dateField = Object.keys(row).find(key => 
      key.toLowerCase().includes('date') || 
      key.toLowerCase().includes('time')
    );
    
    if (dateField) {
      standardized.date = new Date(row[dateField]).toISOString();
    }
    
    // Find and standardize revenue field
    const revenueField = Object.keys(row).find(key => 
      key.toLowerCase().includes('revenue') || 
      key.toLowerCase().includes('amount') ||
      key.toLowerCase().includes('price')
    );
    
    if (revenueField) {
      const rawValue = row[revenueField];
      standardized.revenue = typeof rawValue === 'string' 
        ? parseFloat(rawValue.replace(/[^0-9.-]+/g, ""))
        : rawValue;
    }
    
    // Copy all other fields
    Object.keys(row).forEach(key => {
      if (!standardized[key.toLowerCase()]) {
        standardized[key.toLowerCase()] = row[key];
      }
    });
    
    return standardized;
  });
};

/**
 * Generate sample CSV data for testing
 * @returns CSV string
 */
export const generateSampleCSV = (): string => {
  const headers = "Date,Room Type,Revenue,Booking Source,Guests,Nationality,Length of Stay\n";
  const rows: string[] = [];
  
  const roomTypes = ['Ocean Suite', 'Deluxe King', 'Garden View', 'Family Room', 'Executive Suite'];
  const sources = ['Booking.com', 'Expedia', 'Direct Website', 'Phone', 'Travel Agent'];
  const nationalities = ['USA', 'UK', 'Germany', 'France', 'China', 'Australia', 'Canada', 'Japan'];
  
  // Generate 100 rows of sample data
  for (let i = 0; i < 100; i++) {
    const date = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const revenue = (Math.random() * 500 + 100).toFixed(2);
    const source = sources[Math.floor(Math.random() * sources.length)];
    const guests = Math.floor(Math.random() * 4) + 1;
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const los = Math.floor(Math.random() * 7) + 1;
    
    rows.push(`${date.toISOString().split('T')[0]},${roomType},${revenue},${source},${guests},${nationality},${los}`);
  }
  
  return headers + rows.join('\n');
};

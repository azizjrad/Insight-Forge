
// Dashboard data
export const kpiData = [
  {
    title: 'Revenue',
    value: '$124,751',
    trend: { value: '8.2%', positive: true },
    color: 'primary'
  },
  {
    title: 'Occupancy Rate',
    value: '78.3%',
    trend: { value: '2.1%', positive: true },
    color: 'accent'
  },
  {
    title: 'RevPAR',
    value: '$95.24',
    trend: { value: '5.7%', positive: true },
    color: 'secondary'
  },
  {
    title: 'ADR',
    value: '$121.64',
    trend: { value: '1.2%', positive: false },
    color: 'neutral'
  }
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 67000 },
  { month: 'Feb', revenue: 72000 },
  { month: 'Mar', revenue: 86000 },
  { month: 'Apr', revenue: 93000 },
  { month: 'May', revenue: 105000 },
  { month: 'Jun', revenue: 112000 },
  { month: 'Jul', revenue: 120000 },
  { month: 'Aug', revenue: 124000 },
  { month: 'Sep', revenue: 118000 },
  { month: 'Oct', revenue: 109000 },
  { month: 'Nov', revenue: 96000 },
  { month: 'Dec', revenue: 84000 }
];

export const bookingSources = [
  { name: 'Direct', value: 32, color: '#2EC4B6' },
  { name: 'Booking.com', value: 28, color: '#FF4C29' },
  { name: 'Expedia', value: 18, color: '#1A1C2C' },
  { name: 'Airbnb', value: 12, color: '#90BE6D' },
  { name: 'TripAdvisor', value: 6, color: '#F9C74F' },
  { name: 'Other', value: 4, color: '#577590' }
];

export const topRooms = [
  { id: 1, name: 'Ocean Suite', bookings: 43, revenue: 24680, occupancy: '92%' },
  { id: 2, name: 'Deluxe King', bookings: 38, revenue: 19240, occupancy: '86%' },
  { id: 3, name: 'Garden View', bookings: 31, revenue: 15810, occupancy: '78%' },
  { id: 4, name: 'Family Room', bookings: 27, revenue: 14580, occupancy: '72%' },
  { id: 5, name: 'Executive Suite', bookings: 22, revenue: 18700, occupancy: '67%' }
];

// Reports data
export const reportFilters = {
  dateRanges: [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'this_week' },
    { label: 'Last Week', value: 'last_week' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'This Quarter', value: 'this_quarter' },
    { label: 'Custom Range', value: 'custom' }
  ],
  roomTypes: [
    { label: 'All Rooms', value: 'all' },
    { label: 'Ocean Suite', value: 'ocean_suite' },
    { label: 'Deluxe King', value: 'deluxe_king' },
    { label: 'Garden View', value: 'garden_view' },
    { label: 'Family Room', value: 'family_room' },
    { label: 'Executive Suite', value: 'executive_suite' }
  ],
  nationalities: [
    { label: 'All Countries', value: 'all' },
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'China', value: 'cn' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
    { label: 'Canada', value: 'ca' }
  ]
};

export const reportData = [
  { date: '2023-01-05', roomType: 'Ocean Suite', nationality: 'us', revenue: 1245, guests: 2, nights: 3 },
  { date: '2023-01-06', roomType: 'Deluxe King', nationality: 'uk', revenue: 950, guests: 2, nights: 2 },
  { date: '2023-01-06', roomType: 'Garden View', nationality: 'de', revenue: 780, guests: 3, nights: 4 },
  { date: '2023-01-07', roomType: 'Family Room', nationality: 'fr', revenue: 1120, guests: 4, nights: 3 },
  { date: '2023-01-08', roomType: 'Executive Suite', nationality: 'cn', revenue: 1680, guests: 2, nights: 4 },
  { date: '2023-01-08', roomType: 'Ocean Suite', nationality: 'jp', revenue: 1245, guests: 1, nights: 3 },
  { date: '2023-01-09', roomType: 'Deluxe King', nationality: 'us', revenue: 950, guests: 2, nights: 2 },
  { date: '2023-01-10', roomType: 'Garden View', nationality: 'uk', revenue: 780, guests: 2, nights: 3 },
  { date: '2023-01-11', roomType: 'Family Room', nationality: 'au', revenue: 1120, guests: 5, nights: 4 },
  { date: '2023-01-12', roomType: 'Executive Suite', nationality: 'ca', revenue: 1680, guests: 2, nights: 5 }
];

// Bookings data
export const bookingChannels = [
  { channel: 'Direct Website', bookings: 157, percentage: 32, color: '#2EC4B6' },
  { channel: 'Booking.com', bookings: 138, percentage: 28, color: '#FF4C29' },
  { channel: 'Expedia', bookings: 88, percentage: 18, color: '#1A1C2C' },
  { channel: 'Airbnb', bookings: 59, percentage: 12, color: '#90BE6D' },
  { channel: 'TripAdvisor', bookings: 30, percentage: 6, color: '#F9C74F' },
  { channel: 'Other', bookings: 20, percentage: 4, color: '#577590' }
];

export const leadTimeData = [
  { range: 'Same day', bookings: 43, percentage: 8.8 },
  { range: '1-7 days', bookings: 98, percentage: 20.0 },
  { range: '8-14 days', bookings: 124, percentage: 25.3 },
  { range: '15-30 days', bookings: 156, percentage: 31.8 },
  { range: '31-60 days', bookings: 54, percentage: 11.0 },
  { range: '61+ days', bookings: 15, percentage: 3.1 }
];

export const cancellationData = [
  { month: 'Jan', bookings: 145, cancellations: 12 },
  { month: 'Feb', bookings: 152, cancellations: 15 },
  { month: 'Mar', bookings: 187, cancellations: 18 },
  { month: 'Apr', bookings: 198, cancellations: 16 },
  { month: 'May', bookings: 214, cancellations: 22 },
  { month: 'Jun', bookings: 226, cancellations: 24 }
];

// Financial data
export const revenueExpenses = [
  { month: 'Jan', revenue: 67000, expenses: 48600 },
  { month: 'Feb', revenue: 72000, expenses: 50400 },
  { month: 'Mar', revenue: 86000, expenses: 57500 },
  { month: 'Apr', revenue: 93000, expenses: 59200 },
  { month: 'May', revenue: 105000, expenses: 65300 },
  { month: 'Jun', revenue: 112000, expenses: 69400 }
];

export const expenseCategories = [
  { category: 'Staff Salaries', amount: 28750, percentage: 42, color: '#2EC4B6' },
  { category: 'Utilities', amount: 12600, percentage: 18.5, color: '#FF4C29' },
  { category: 'Supplies', amount: 9500, percentage: 14, color: '#1A1C2C' },
  { category: 'Maintenance', amount: 7200, percentage: 10.5, color: '#90BE6D' },
  { category: 'Marketing', amount: 5100, percentage: 7.5, color: '#F9C74F' },
  { category: 'Other', amount: 5100, percentage: 7.5, color: '#577590' }
];

// Guest data
export const guestNationalities = [
  { country: 'United States', guests: 267, percentage: 29 },
  { country: 'United Kingdom', guests: 156, percentage: 17 },
  { country: 'Germany', guests: 94, percentage: 10 },
  { country: 'France', guests: 83, percentage: 9 },
  { country: 'China', guests: 72, percentage: 8 },
  { country: 'Japan', guests: 63, percentage: 7 },
  { country: 'Australia', guests: 58, percentage: 6 },
  { country: 'Canada', guests: 47, percentage: 5 },
  { country: 'Other', guests: 84, percentage: 9 }
];

export const guestTravelType = [
  { type: 'Leisure', guests: 554, percentage: 60 },
  { type: 'Business', guests: 277, percentage: 30 },
  { type: 'Other', guests: 92, percentage: 10 }
];

export const stayDuration = [
  { nights: '1 night', guests: 92, percentage: 10 },
  { nights: '2 nights', guests: 212, percentage: 23 },
  { nights: '3-4 nights', guests: 341, percentage: 37 },
  { nights: '5-7 nights', guests: 184, percentage: 20 },
  { nights: '8+ nights', guests: 92, percentage: 10 }
];

// FAQ data
export const faqData = [
  {
    question: "What is InsightForge?",
    answer: "InsightForge is a comprehensive hotel business intelligence platform that helps hotel managers make data-driven decisions. Our platform provides real-time analytics, custom reports, KPI monitoring, and visualization tools specifically designed for the hospitality industry."
  },
  {
    question: "How does InsightForge help my hotel business?",
    answer: "Our platform aggregates data from various sources to provide a complete picture of your hotel's performance. By analyzing key metrics like occupancy rates, RevPAR, booking sources, and guest demographics, we help you identify trends, optimize pricing strategies, and make informed operational decisions."
  },
  {
    question: "Is my hotel data secure with InsightForge?",
    answer: "Absolutely. Data security is our top priority. We use industry-leading encryption standards, regular security audits, and strict access controls to keep your data safe. Our platform is compliant with relevant data protection regulations, and we never share your information with third parties without explicit permission."
  },
  {
    question: "How difficult is it to set up InsightForge?",
    answer: "Setting up InsightForge is simple. Our onboarding team will guide you through the process, which typically takes just a few hours. We offer pre-built integrations with popular hotel management systems, and our team can help with custom integrations if needed."
  },
  {
    question: "Can I customize the reports and dashboards?",
    answer: "Yes, InsightForge offers extensive customization options. You can create custom reports based on specific metrics that matter to your business, design personalized dashboards, and set up alerts for important KPIs. Our platform is designed to adapt to your unique needs."
  },
  {
    question: "Do you offer training and support?",
    answer: "We provide comprehensive training resources including video tutorials, documentation, and live webinars. Our customer support team is available via chat, email, and phone to help with any questions or issues you may encounter."
  },
  {
    question: "How much does InsightForge cost?",
    answer: "InsightForge offers flexible pricing plans starting from $99/month, based on the size of your property and the features you need. We also offer custom enterprise plans for hotel groups. All plans include a 14-day free trial so you can experience the benefits before committing."
  }
];

// Testimonial data
export const testimonialData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "General Manager",
    hotel: "Grand Pacific Resort",
    image: "/placeholder.svg",
    quote: "InsightForge transformed how we make decisions. The real-time analytics have helped us optimize pricing and increase our RevPAR by 15% in just six months."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Revenue Manager",
    hotel: "City Lights Hotel",
    image: "/placeholder.svg",
    quote: "The custom reporting capabilities are incredible. I can now analyze any aspect of our performance in minutes instead of spending days creating spreadsheets."
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    role: "Operations Director",
    hotel: "Sunset Bay Hotel Group",
    image: "/placeholder.svg",
    quote: "Managing multiple properties was a data nightmare before InsightForge. Now we have a unified dashboard that gives us clear insights across our entire portfolio."
  }
];

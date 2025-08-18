-- InsightForge SQLite Seed Data
-- Comprehensive sample data for hotel analytics dashboard testing

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Insert booking sources first
INSERT INTO booking_sources (name, commission_rate, is_active) VALUES
('Direct Website', 0.00, 1),
('Phone', 0.00, 1),
('Walk-in', 0.00, 1),
('Booking.com', 15.00, 1),
('Expedia', 18.00, 1),
('Airbnb', 12.00, 1),
('TripAdvisor', 16.00, 1),
('Hotels.com', 17.00, 1),
('Agoda', 14.00, 1),
('Travel Agent', 10.00, 1);

-- Insert hotels
INSERT INTO hotels (name, address, city, country, phone, email, website, star_rating, total_rooms) VALUES
('Grand Pacific Resort', '123 Ocean Drive', 'Miami Beach', 'USA', '+1-305-555-0123', 'info@grandpacific.com', 'www.grandpacific.com', 5, 150),
('City Lights Hotel', '456 Downtown Ave', 'New York', 'USA', '+1-212-555-0456', 'reservations@citylights.com', 'www.citylights.com', 4, 200);

-- Insert users
INSERT INTO users (hotel_id, name, email, password_hash, role, phone) VALUES
(1, 'Sarah Johnson', 'sarah@grandpacific.com', 'hashed_password_1', 'admin', '+1-305-555-0124'),
(1, 'Mike Chen', 'mike@grandpacific.com', 'hashed_password_2', 'manager', '+1-305-555-0125'),
(2, 'Lisa Rodriguez', 'lisa@citylights.com', 'hashed_password_3', 'admin', '+1-212-555-0457'),
(2, 'James Wilson', 'james@citylights.com', 'hashed_password_4', 'staff', '+1-212-555-0458');

-- Insert room types
INSERT INTO room_types (hotel_id, name, description, base_price, max_occupancy, amenities) VALUES
-- Grand Pacific Resort room types
(1, 'Standard', 'Comfortable room with city view', 120.00, 2, '["WiFi", "TV", "AC", "Mini-fridge"]'),
(1, 'Deluxe', 'Spacious room with partial ocean view', 180.00, 2, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony"]'),
(1, 'Ocean Suite', 'Luxury suite with full ocean view', 350.00, 4, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony", "Separate living area", "Coffee machine"]'),
(1, 'Family Room', 'Large room perfect for families', 220.00, 6, '["WiFi", "TV", "AC", "Mini-fridge", "Sofa bed", "Microwave"]'),
(1, 'Executive Suite', 'Premium suite with all amenities', 450.00, 4, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony", "Separate living area", "Coffee machine", "Jacuzzi"]'),

-- City Lights Hotel room types
(2, 'Standard', 'Modern room in the heart of the city', 150.00, 2, '["WiFi", "TV", "AC", "Coffee machine"]'),
(2, 'Deluxe King', 'Spacious room with king bed', 200.00, 2, '["WiFi", "TV", "AC", "Coffee machine", "Work desk"]'),
(2, 'Business Suite', 'Perfect for business travelers', 280.00, 2, '["WiFi", "TV", "AC", "Coffee machine", "Work desk", "Meeting area"]'),
(2, 'Penthouse', 'Luxury penthouse with city views', 500.00, 6, '["WiFi", "TV", "AC", "Coffee machine", "Full kitchen", "Terrace", "Hot tub"]');

-- Insert rooms
INSERT INTO rooms (hotel_id, room_type_id, room_number, floor, status) VALUES
-- Grand Pacific Resort rooms (150 rooms)
-- Standard rooms (floors 1-5, 60 rooms)
(1, 1, '101', 1, 'available'), (1, 1, '102', 1, 'occupied'), (1, 1, '103', 1, 'available'), (1, 1, '104', 1, 'available'), (1, 1, '105', 1, 'occupied'),
(1, 1, '201', 2, 'available'), (1, 1, '202', 2, 'available'), (1, 1, '203', 2, 'maintenance'), (1, 1, '204', 2, 'available'), (1, 1, '205', 2, 'occupied'),
-- Add more standard rooms...
(1, 1, '301', 3, 'available'), (1, 1, '302', 3, 'occupied'), (1, 1, '303', 3, 'available'),

-- Deluxe rooms (floors 6-8, 45 rooms)
(1, 2, '601', 6, 'occupied'), (1, 2, '602', 6, 'available'), (1, 2, '603', 6, 'available'), (1, 2, '604', 6, 'occupied'),
(1, 2, '701', 7, 'available'), (1, 2, '702', 7, 'occupied'), (1, 2, '703', 7, 'available'),

-- Ocean Suites (floors 9-10, 20 rooms)
(1, 3, '901', 9, 'occupied'), (1, 3, '902', 9, 'available'), (1, 3, '903', 9, 'occupied'),
(1, 3, '1001', 10, 'available'), (1, 3, '1002', 10, 'occupied'),

-- Family rooms (15 rooms)
(1, 4, '401', 4, 'available'), (1, 4, '402', 4, 'occupied'), (1, 4, '403', 4, 'available'),

-- Executive Suites (10 rooms)
(1, 5, '1101', 11, 'occupied'), (1, 5, '1102', 11, 'available');

-- Insert sample guests with diverse nationalities
INSERT INTO guests (first_name, last_name, email, phone, nationality, date_of_birth, gender, city, country, vip_status, loyalty_tier) VALUES
('John', 'Doe', 'john.doe@email.com', '+1-555-0001', 'US', '1985-03-15', 'Male', 'Los Angeles', 'USA', 0, 'silver'),
('Emma', 'Smith', 'emma.smith@email.com', '+44-20-7946-0001', 'GB', '1990-07-22', 'Female', 'London', 'UK', 1, 'gold'),
('Hans', 'Mueller', 'hans.mueller@email.com', '+49-30-12345678', 'DE', '1978-11-08', 'Male', 'Berlin', 'Germany', 0, 'bronze'),
('Marie', 'Dubois', 'marie.dubois@email.com', '+33-1-42-00-0001', 'FR', '1988-05-12', 'Female', 'Paris', 'France', 0, 'silver'),
('Hiroshi', 'Tanaka', 'hiroshi.tanaka@email.com', '+81-3-1234-5678', 'JP', '1982-09-30', 'Male', 'Tokyo', 'Japan', 1, 'platinum'),
('Sofia', 'Rodriguez', 'sofia.rodriguez@email.com', '+34-91-123-4567', 'ES', '1995-02-18', 'Female', 'Madrid', 'Spain', 0, 'bronze'),
('Wang', 'Li', 'wang.li@email.com', '+86-10-1234-5678', 'CN', '1987-12-05', 'Male', 'Beijing', 'China', 0, 'silver'),
('Priya', 'Sharma', 'priya.sharma@email.com', '+91-11-2345-6789', 'IN', '1992-08-14', 'Female', 'Mumbai', 'India', 0, 'bronze'),
('Marco', 'Rossi', 'marco.rossi@email.com', '+39-06-1234-5678', 'IT', '1980-04-25', 'Male', 'Rome', 'Italy', 0, 'silver'),
('Emily', 'Johnson', 'emily.johnson@email.com', '+1-416-555-0002', 'CA', '1986-10-03', 'Female', 'Toronto', 'Canada', 1, 'gold');

-- Insert bookings for the last 6 months with realistic data
INSERT INTO bookings (hotel_id, room_id, room_type_id, guest_id, booking_reference, check_in, check_out, source_id, status, adults, children, room_rate, total_amount, paid_amount) VALUES
-- January 2025 bookings
('1', 2, 1, 1, 'GPR-2025-001', '2025-01-15', '2025-01-18', 1, 'checked_out', 2, 0, 120.00, 360.00, 360.00),
('1', 13, 2, 2, 'GPR-2025-002', '2025-01-20', '2025-01-23', 4, 'checked_out', 2, 1, 180.00, 540.00, 540.00),
('1', 17, 3, 3, 'GPR-2025-003', '2025-01-25', '2025-01-29', 1, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- February 2025 bookings
('1', 5, 1, 4, 'GPR-2025-004', '2025-02-10', '2025-02-14', 5, 'checked_out', 1, 0, 120.00, 480.00, 480.00),
('1', 14, 2, 5, 'GPR-2025-005', '2025-02-15', '2025-02-17', 1, 'checked_out', 2, 0, 180.00, 360.00, 360.00),
('1', 19, 3, 6, 'GPR-2025-006', '2025-02-20', '2025-02-25', 6, 'checked_out', 2, 2, 350.00, 1750.00, 1750.00),

-- March 2025 bookings
('1', 10, 1, 7, 'GPR-2025-007', '2025-03-05', '2025-03-08', 4, 'checked_out', 2, 0, 120.00, 360.00, 360.00),
('1', 15, 2, 8, 'GPR-2025-008', '2025-03-12', '2025-03-15', 1, 'checked_out', 1, 0, 180.00, 540.00, 540.00),
('1', 18, 3, 9, 'GPR-2025-009', '2025-03-18', '2025-03-22', 5, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- April 2025 bookings
('1', 6, 1, 10, 'GPR-2025-010', '2025-04-08', '2025-04-12', 1, 'checked_out', 2, 1, 120.00, 480.00, 480.00),
('1', 13, 2, 1, 'GPR-2025-011', '2025-04-15', '2025-04-18', 4, 'checked_out', 2, 0, 180.00, 540.00, 540.00),
('1', 17, 3, 2, 'GPR-2025-012', '2025-04-22', '2025-04-26', 6, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- May 2025 bookings
('1', 11, 1, 3, 'GPR-2025-013', '2025-05-10', '2025-05-13', 1, 'checked_out', 1, 0, 120.00, 360.00, 360.00),
('1', 14, 2, 4, 'GPR-2025-014', '2025-05-15', '2025-05-19', 5, 'checked_out', 2, 0, 180.00, 720.00, 720.00),
('1', 19, 3, 5, 'GPR-2025-015', '2025-05-20', '2025-05-24', 1, 'checked_out', 2, 1, 350.00, 1400.00, 1400.00),

-- June 2025 bookings (current/recent)
('1', 2, 1, 6, 'GPR-2025-016', '2025-06-01', '2025-06-04', 4, 'checked_out', 2, 0, 120.00, 360.00, 360.00),
('1', 13, 2, 7, 'GPR-2025-017', '2025-06-10', '2025-06-13', 1, 'checked_out', 2, 0, 180.00, 540.00, 540.00),
('1', 17, 3, 8, 'GPR-2025-018', '2025-06-15', '2025-06-19', 6, 'checked_in', 2, 0, 350.00, 1400.00, 700.00),
('1', 5, 1, 9, 'GPR-2025-019', '2025-06-20', '2025-06-22', 1, 'confirmed', 1, 0, 120.00, 240.00, 0.00),
('1', 24, 5, 10, 'GPR-2025-020', '2025-06-25', '2025-06-28', 1, 'confirmed', 2, 0, 450.00, 1350.00, 675.00);

-- Insert payments
INSERT INTO payments (booking_id, amount, payment_method, payment_status, transaction_id, payment_date) VALUES
(1, 360.00, 'credit_card', 'completed', 'txn_001', '2025-01-14 14:30:00'),
(2, 540.00, 'credit_card', 'completed', 'txn_002', '2025-01-19 09:15:00'),
(3, 1400.00, 'bank_transfer', 'completed', 'txn_003', '2025-01-24 16:45:00'),
(4, 480.00, 'credit_card', 'completed', 'txn_004', '2025-02-09 11:20:00'),
(5, 360.00, 'debit_card', 'completed', 'txn_005', '2025-02-14 13:10:00'),
(18, 700.00, 'credit_card', 'completed', 'txn_018', '2025-06-14 15:30:00'),
(20, 675.00, 'credit_card', 'completed', 'txn_020', '2025-06-24 10:15:00');

-- Insert revenue records
INSERT INTO revenue (hotel_id, booking_id, date, amount, revenue_type, category) VALUES
-- Room revenue from bookings
(1, 1, '2025-01-15', 120.00, 'room', 'accommodation'),
(1, 1, '2025-01-16', 120.00, 'room', 'accommodation'),
(1, 1, '2025-01-17', 120.00, 'room', 'accommodation'),
(1, 2, '2025-01-20', 180.00, 'room', 'accommodation'),
(1, 2, '2025-01-21', 180.00, 'room', 'accommodation'),
(1, 2, '2025-01-22', 180.00, 'room', 'accommodation'),

-- Additional revenue (F&B, spa, etc.)
(1, NULL, '2025-01-15', 45.00, 'food_beverage', 'restaurant'),
(1, NULL, '2025-01-16', 125.00, 'spa', 'treatments'),
(1, NULL, '2025-01-20', 85.00, 'food_beverage', 'room_service'),
(1, NULL, '2025-02-10', 65.00, 'other', 'parking'),
(1, NULL, '2025-02-15', 95.00, 'food_beverage', 'bar'),

-- Continue with more revenue entries for recent months
(1, 16, '2025-06-01', 120.00, 'room', 'accommodation'),
(1, 17, '2025-06-10', 180.00, 'room', 'accommodation'),
(1, 18, '2025-06-15', 350.00, 'room', 'accommodation');

-- Insert expenses
INSERT INTO expenses (hotel_id, date, amount, category, subcategory, description, vendor) VALUES
(1, '2025-01-01', 25000.00, 'staff_salaries', 'front_desk', 'January front desk staff salaries', 'Internal'),
(1, '2025-01-01', 15000.00, 'staff_salaries', 'housekeeping', 'January housekeeping staff salaries', 'Internal'),
(1, '2025-01-05', 3200.00, 'utilities', 'electricity', 'Monthly electricity bill', 'Miami Electric Co'),
(1, '2025-01-10', 1800.00, 'utilities', 'water', 'Monthly water bill', 'Miami Water Dept'),
(1, '2025-01-15', 2500.00, 'supplies', 'housekeeping', 'Cleaning supplies and linens', 'Hotel Supply Co'),
(1, '2025-01-20', 1200.00, 'maintenance', 'hvac', 'AC system maintenance', 'Cool Air Services'),
(1, '2025-01-25', 800.00, 'marketing', 'online_ads', 'Google Ads campaign', 'Google'),

-- February expenses
(1, '2025-02-01', 26000.00, 'staff_salaries', 'all_departments', 'February staff salaries', 'Internal'),
(1, '2025-02-05', 3100.00, 'utilities', 'electricity', 'Monthly electricity bill', 'Miami Electric Co'),
(1, '2025-02-10', 1750.00, 'utilities', 'water', 'Monthly water bill', 'Miami Water Dept'),
(1, '2025-02-15', 2200.00, 'supplies', 'food_beverage', 'Restaurant supplies', 'Food Distributors Inc'),
(1, '2025-02-20', 1500.00, 'maintenance', 'plumbing', 'Bathroom fixtures repair', 'Fix-It Plumbing'),

-- Continue with more recent expenses
(1, '2025-06-01', 28000.00, 'staff_salaries', 'all_departments', 'June staff salaries', 'Internal'),
(1, '2025-06-05', 3400.00, 'utilities', 'electricity', 'Monthly electricity bill', 'Miami Electric Co'),
(1, '2025-06-10', 1900.00, 'utilities', 'water', 'Monthly water bill', 'Miami Water Dept');

-- Insert reviews
INSERT INTO reviews (hotel_id, guest_id, booking_id, platform, rating, title, comment, review_date, is_verified) VALUES
(1, 1, 1, 'google', 5, 'Excellent stay!', 'Beautiful ocean views and exceptional service. Will definitely return!', '2025-01-19', 1),
(1, 2, 2, 'tripadvisor', 4, 'Great family vacation', 'Kids loved the pool area. Room was spacious and clean.', '2025-01-25', 1),
(1, 3, 3, 'booking_com', 5, 'Perfect business trip', 'Professional staff, great location, excellent amenities.', '2025-01-30', 1),
(1, 4, 4, 'direct', 4, 'Lovely hotel', 'Enjoyed our romantic getaway. Sunset views were spectacular.', '2025-02-16', 1),
(1, 5, 5, 'google', 5, 'Outstanding service', 'Every detail was perfect. The concierge went above and beyond.', '2025-02-19', 1),
(1, 6, 6, 'tripadvisor', 3, 'Good but room maintenance needed', 'Overall nice stay but AC was too loud and shower had low pressure.', '2025-02-27', 1),
(1, 7, 7, 'booking_com', 5, 'Amazing ocean suite', 'The suite exceeded expectations. Perfect for special occasions.', '2025-03-10', 1),
(1, 8, 8, 'google', 4, 'Comfortable stay', 'Clean rooms, friendly staff, great breakfast buffet.', '2025-03-17', 1);

-- Insert KPI snapshots for the last 6 months
INSERT INTO kpi_snapshots (hotel_id, date, total_bookings, revenue, occupancy_rate, adr, revpar, goppar, alos, average_rating, total_rooms_available, rooms_occupied) VALUES
(1, '2025-01-31', 42, 18450.00, 78.5, 165.50, 130.00, 98.50, 3.2, 4.6, 150, 118),
(1, '2025-02-28', 38, 16800.00, 72.3, 172.00, 124.35, 89.20, 3.1, 4.5, 150, 108),
(1, '2025-03-31', 45, 21200.00, 82.1, 168.75, 138.50, 105.30, 3.4, 4.7, 150, 123),
(1, '2025-04-30', 51, 24650.00, 85.8, 175.20, 150.25, 112.80, 3.3, 4.8, 150, 129),
(1, '2025-05-31', 48, 23100.00, 84.2, 178.90, 150.70, 115.45, 3.5, 4.6, 150, 126),
(1, '2025-06-19', 35, 18950.00, 81.5, 182.50, 148.75, 118.60, 3.4, 4.7, 150, 122);

-- Insert activity logs
INSERT INTO activity_logs (hotel_id, user_id, activity_type, entity_type, entity_id, description) VALUES
(1, 1, 'booking', 'booking', 20, 'New booking created for Executive Suite'),
(1, 2, 'check_in', 'booking', 18, 'Guest checked in to Ocean Suite'),
(1, 1, 'payment', 'payment', 18, 'Payment received - $700.00'),
(1, 2, 'cancellation', 'booking', NULL, 'Booking cancelled due to weather'),
(1, 1, 'review_response', 'review', 6, 'Responded to guest review about room maintenance'),
(1, 2, 'room_status', 'room', 8, 'Room 203 status changed to maintenance'),
(1, 1, 'user_login', 'user', 1, 'Admin user logged in'),
(1, 2, 'report_generation', 'report', NULL, 'Generated monthly revenue report');

-- Insert hotel settings
INSERT INTO settings (hotel_id, setting_key, setting_value, setting_type, description) VALUES
(1, 'currency', 'USD', 'string', 'Default currency for the hotel'),
(1, 'timezone', 'America/New_York', 'string', 'Hotel timezone'),
(1, 'check_in_time', '15:00', 'string', 'Standard check-in time'),
(1, 'check_out_time', '11:00', 'string', 'Standard check-out time'),
(1, 'tax_rate', '10.5', 'number', 'Local tax rate percentage'),
(1, 'booking_confirmation_email', '1', 'boolean', 'Send booking confirmation emails'),
(1, 'loyalty_program_enabled', '1', 'boolean', 'Enable loyalty program features'),
(1, 'review_response_enabled', '1', 'boolean', 'Allow staff to respond to reviews');

-- Update room counts for hotels
UPDATE hotels SET total_rooms = 150 WHERE id = 1;
UPDATE hotels SET total_rooms = 200 WHERE id = 2;
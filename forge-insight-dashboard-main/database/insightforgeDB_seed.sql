-- InsightForge PostgreSQL Seed Data
-- Comprehensive sample data for hotel analytics dashboard testing

-- Insert booking sources first
INSERT INTO booking_sources (name, commission_rate, is_active) VALUES
('Direct Website', 0.00, TRUE),
('Phone', 0.00, TRUE),
('Walk-in', 0.00, TRUE),
('Booking.com', 15.00, TRUE),
('Expedia', 18.00, TRUE),
('Airbnb', 12.00, TRUE),
('TripAdvisor', 16.00, TRUE),
('Hotels.com', 17.00, TRUE),
('Agoda', 14.00, TRUE),
('Travel Agent', 10.00, TRUE);

-- Insert hotels
INSERT INTO hotels (name, address, city, country, phone, email, website, star_rating, total_rooms) VALUES
('Grand Pacific Resort', '123 Ocean Drive', 'Miami Beach', 'USA', '+1-305-555-0123', 'info@grandpacific.com', 'www.grandpacific.com', 5, 150),
('City Lights Hotel', '456 Downtown Ave', 'New York', 'USA', '+1-212-555-0456', 'reservations@citylights.com', 'www.citylights.com', 4, 200);

-- Insert users
INSERT INTO users (hotel_id, name, email, password_hash, role, phone) VALUES
(1, 'Sarah Johnson', 'sarah@grandpacific.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOmU5XOHBtdN6mYm', 'admin', '+1-305-555-0124'),
(1, 'Mike Chen', 'mike@grandpacific.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOmU5XOHBtdN6mYm', 'manager', '+1-305-555-0125'),
(2, 'Lisa Rodriguez', 'lisa@citylights.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOmU5XOHBtdN6mYm', 'admin', '+1-212-555-0457'),
(2, 'James Wilson', 'james@citylights.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOmU5XOHBtdN6mYm', 'staff', '+1-212-555-0458');

-- Insert room types
INSERT INTO room_types (hotel_id, name, description, base_price, max_occupancy, amenities) VALUES
-- Grand Pacific Resort room types
(1, 'Standard', 'Comfortable room with city view', 120.00, 2, '["WiFi", "TV", "AC", "Mini-fridge"]'::jsonb),
(1, 'Deluxe', 'Spacious room with partial ocean view', 180.00, 2, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony"]'::jsonb),
(1, 'Ocean Suite', 'Luxury suite with full ocean view', 350.00, 4, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony", "Separate living area", "Coffee machine"]'::jsonb),
(1, 'Family Room', 'Large room perfect for families', 220.00, 6, '["WiFi", "TV", "AC", "Mini-fridge", "Sofa bed", "Microwave"]'::jsonb),
(1, 'Executive Suite', 'Premium suite with all amenities', 450.00, 4, '["WiFi", "TV", "AC", "Mini-fridge", "Balcony", "Separate living area", "Coffee machine", "Jacuzzi"]'::jsonb),

-- City Lights Hotel room types
(2, 'Standard', 'Modern room in the heart of the city', 150.00, 2, '["WiFi", "TV", "AC", "Coffee machine"]'::jsonb),
(2, 'Deluxe King', 'Spacious room with king bed', 200.00, 2, '["WiFi", "TV", "AC", "Coffee machine", "Work desk"]'::jsonb),
(2, 'Business Suite', 'Perfect for business travelers', 280.00, 2, '["WiFi", "TV", "AC", "Coffee machine", "Work desk", "Meeting area"]'::jsonb),
(2, 'Penthouse', 'Luxury penthouse with city views', 500.00, 6, '["WiFi", "TV", "AC", "Coffee machine", "Full kitchen", "Terrace", "Hot tub"]'::jsonb);

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
(1, 5, '1101', 11, 'occupied'), (1, 5, '1102', 11, 'available'),

-- City Lights Hotel rooms (sample)
(2, 6, '101', 1, 'available'), (2, 6, '102', 1, 'occupied'), (2, 6, '103', 1, 'available'),
(2, 7, '201', 2, 'available'), (2, 7, '202', 2, 'occupied'),
(2, 8, '301', 3, 'available'), (2, 8, '302', 3, 'occupied'),
(2, 9, '401', 4, 'available');

-- Insert sample guests with diverse nationalities
INSERT INTO guests (first_name, last_name, email, phone, nationality, date_of_birth, gender, city, country, vip_status, loyalty_tier) VALUES
('John', 'Doe', 'john.doe@email.com', '+1-555-0001', 'US', '1985-03-15', 'Male', 'Los Angeles', 'USA', FALSE, 'silver'),
('Emma', 'Smith', 'emma.smith@email.com', '+44-20-7946-0001', 'GB', '1990-07-22', 'Female', 'London', 'UK', TRUE, 'gold'),
('Hans', 'Mueller', 'hans.mueller@email.com', '+49-30-12345678', 'DE', '1978-11-08', 'Male', 'Berlin', 'Germany', FALSE, 'bronze'),
('Marie', 'Dubois', 'marie.dubois@email.com', '+33-1-42-00-0001', 'FR', '1988-05-12', 'Female', 'Paris', 'France', FALSE, 'silver'),
('Hiroshi', 'Tanaka', 'hiroshi.tanaka@email.com', '+81-3-1234-5678', 'JP', '1982-09-30', 'Male', 'Tokyo', 'Japan', TRUE, 'platinum'),
('Sofia', 'Rodriguez', 'sofia.rodriguez@email.com', '+34-91-123-4567', 'ES', '1995-02-18', 'Female', 'Madrid', 'Spain', FALSE, 'bronze'),
('Wang', 'Li', 'wang.li@email.com', '+86-10-1234-5678', 'CN', '1987-12-05', 'Male', 'Beijing', 'China', FALSE, 'silver'),
('Priya', 'Sharma', 'priya.sharma@email.com', '+91-11-2345-6789', 'IN', '1992-08-14', 'Female', 'Mumbai', 'India', FALSE, 'bronze'),
('Marco', 'Rossi', 'marco.rossi@email.com', '+39-06-1234-5678', 'IT', '1980-04-25', 'Male', 'Rome', 'Italy', FALSE, 'silver'),
('Emily', 'Johnson', 'emily.johnson@email.com', '+1-416-555-0002', 'CA', '1986-10-03', 'Female', 'Toronto', 'Canada', TRUE, 'gold');

-- Insert bookings for the last 6 months with realistic data
INSERT INTO bookings (hotel_id, room_id, room_type_id, guest_id, booking_reference, check_in, check_out, source_id, status, adults, children, room_rate, total_amount, paid_amount) VALUES
-- January 2025 bookings
(1, 2, 1, 1, 'GPR-2025-001', '2025-01-15', '2025-01-18', 1, 'checked_out', 2, 0, 120.00, 360.00, 360.00),
(1, 13, 2, 2, 'GPR-2025-002', '2025-01-20', '2025-01-23', 4, 'checked_out', 2, 1, 180.00, 540.00, 540.00),
(1, 17, 3, 3, 'GPR-2025-003', '2025-01-25', '2025-01-29', 1, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- February 2025 bookings
(1, 5, 1, 4, 'GPR-2025-004', '2025-02-10', '2025-02-14', 5, 'checked_out', 1, 0, 120.00, 480.00, 480.00),
(1, 14, 2, 5, 'GPR-2025-005', '2025-02-15', '2025-02-17', 1, 'checked_out', 2, 0, 180.00, 360.00, 360.00),
(1, 19, 3, 6, 'GPR-2025-006', '2025-02-20', '2025-02-25', 6, 'checked_out', 2, 2, 350.00, 1750.00, 1750.00),

-- March 2025 bookings
(1, 10, 1, 7, 'GPR-2025-007', '2025-03-05', '2025-03-08', 4, 'checked_out', 2, 0, 120.00, 360.00, 360.00),
(1, 15, 2, 8, 'GPR-2025-008', '2025-03-12', '2025-03-15', 1, 'checked_out', 1, 0, 180.00, 540.00, 540.00),
(1, 18, 3, 9, 'GPR-2025-009', '2025-03-18', '2025-03-22', 5, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- April 2025 bookings
(1, 6, 1, 10, 'GPR-2025-010', '2025-04-08', '2025-04-12', 1, 'checked_out', 2, 1, 120.00, 480.00, 480.00),
(1, 13, 2, 1, 'GPR-2025-011', '2025-04-15', '2025-04-18', 4, 'checked_out', 2, 0, 180.00, 540.00, 540.00),
(1, 17, 3, 2, 'GPR-2025-012', '2025-04-22', '2025-04-26', 6, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- May 2025 bookings
(1, 8, 1, 3, 'GPR-2025-013', '2025-05-05', '2025-05-09', 1, 'checked_out', 2, 0, 120.00, 480.00, 480.00),
(1, 16, 2, 4, 'GPR-2025-014', '2025-05-15', '2025-05-18', 5, 'checked_out', 2, 0, 180.00, 540.00, 540.00),
(1, 20, 3, 5, 'GPR-2025-015', '2025-05-22', '2025-05-26', 1, 'checked_out', 2, 1, 350.00, 1400.00, 1400.00),

-- June 2025 bookings
(1, 11, 1, 6, 'GPR-2025-016', '2025-06-08', '2025-06-12', 4, 'checked_out', 2, 0, 120.00, 480.00, 480.00),
(1, 14, 2, 7, 'GPR-2025-017', '2025-06-15', '2025-06-18', 1, 'checked_out', 1, 0, 180.00, 540.00, 540.00),
(1, 18, 3, 8, 'GPR-2025-018', '2025-06-22', '2025-06-26', 6, 'checked_out', 2, 0, 350.00, 1400.00, 1400.00),

-- July 2025 bookings (current month)
(1, 2, 1, 9, 'GPR-2025-019', '2025-07-01', '2025-07-05', 1, 'checked_in', 2, 0, 120.00, 480.00, 240.00),
(1, 13, 2, 10, 'GPR-2025-020', '2025-07-03', '2025-07-07', 4, 'checked_in', 2, 1, 180.00, 720.00, 360.00);

-- Insert payments for bookings
INSERT INTO payments (booking_id, amount, currency, payment_method, payment_status, payment_date) VALUES
(1, 360.00, 'USD', 'credit_card', 'completed', '2025-01-15 14:30:00'),
(2, 540.00, 'USD', 'credit_card', 'completed', '2025-01-20 10:15:00'),
(3, 1400.00, 'USD', 'bank_transfer', 'completed', '2025-01-25 09:00:00'),
(4, 480.00, 'USD', 'credit_card', 'completed', '2025-02-10 16:45:00'),
(5, 360.00, 'USD', 'debit_card', 'completed', '2025-02-15 11:30:00'),
(6, 1750.00, 'USD', 'credit_card', 'completed', '2025-02-20 13:20:00'),
(7, 360.00, 'USD', 'cash', 'completed', '2025-03-05 15:10:00'),
(8, 540.00, 'USD', 'credit_card', 'completed', '2025-03-12 12:00:00'),
(9, 1400.00, 'USD', 'bank_transfer', 'completed', '2025-03-18 08:30:00'),
(10, 480.00, 'USD', 'credit_card', 'completed', '2025-04-08 17:15:00'),
(11, 540.00, 'USD', 'debit_card', 'completed', '2025-04-15 14:45:00'),
(12, 1400.00, 'USD', 'credit_card', 'completed', '2025-04-22 10:30:00'),
(13, 480.00, 'USD', 'credit_card', 'completed', '2025-05-05 16:20:00'),
(14, 540.00, 'USD', 'bank_transfer', 'completed', '2025-05-15 09:45:00'),
(15, 1400.00, 'USD', 'credit_card', 'completed', '2025-05-22 11:15:00'),
(16, 480.00, 'USD', 'cash', 'completed', '2025-06-08 15:30:00'),
(17, 540.00, 'USD', 'credit_card', 'completed', '2025-06-15 13:00:00'),
(18, 1400.00, 'USD', 'debit_card', 'completed', '2025-06-22 12:45:00'),
(19, 240.00, 'USD', 'credit_card', 'completed', '2025-07-01 14:00:00'),
(20, 360.00, 'USD', 'credit_card', 'completed', '2025-07-03 10:30:00');

-- Insert revenue data
INSERT INTO revenue (hotel_id, booking_id, date, amount, currency, revenue_type, category) VALUES
-- January 2025
(1, 1, '2025-01-15', 360.00, 'USD', 'room', 'accommodation'),
(1, 2, '2025-01-20', 540.00, 'USD', 'room', 'accommodation'),
(1, 3, '2025-01-25', 1400.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-01-28', 150.00, 'USD', 'food_beverage', 'restaurant'),
-- February 2025
(1, 4, '2025-02-10', 480.00, 'USD', 'room', 'accommodation'),
(1, 5, '2025-02-15', 360.00, 'USD', 'room', 'accommodation'),
(1, 6, '2025-02-20', 1750.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-02-25', 200.00, 'USD', 'spa', 'treatments'),
-- March 2025
(1, 7, '2025-03-05', 360.00, 'USD', 'room', 'accommodation'),
(1, 8, '2025-03-12', 540.00, 'USD', 'room', 'accommodation'),
(1, 9, '2025-03-18', 1400.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-03-20', 120.00, 'USD', 'parking', 'valet'),
-- April 2025
(1, 10, '2025-04-08', 480.00, 'USD', 'room', 'accommodation'),
(1, 11, '2025-04-15', 540.00, 'USD', 'room', 'accommodation'),
(1, 12, '2025-04-22', 1400.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-04-25', 180.00, 'USD', 'food_beverage', 'room_service'),
-- May 2025
(1, 13, '2025-05-05', 480.00, 'USD', 'room', 'accommodation'),
(1, 14, '2025-05-15', 540.00, 'USD', 'room', 'accommodation'),
(1, 15, '2025-05-22', 1400.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-05-28', 250.00, 'USD', 'spa', 'packages'),
-- June 2025
(1, 16, '2025-06-08', 480.00, 'USD', 'room', 'accommodation'),
(1, 17, '2025-06-15', 540.00, 'USD', 'room', 'accommodation'),
(1, 18, '2025-06-22', 1400.00, 'USD', 'room', 'accommodation'),
(1, NULL, '2025-06-30', 300.00, 'USD', 'food_beverage', 'events'),
-- July 2025 (current month)
(1, 19, '2025-07-01', 240.00, 'USD', 'room', 'accommodation'),
(1, 20, '2025-07-03', 360.00, 'USD', 'room', 'accommodation');

-- Insert sample expenses
INSERT INTO expenses (hotel_id, date, amount, currency, category, subcategory, description, vendor) VALUES
(1, '2025-01-15', 5000.00, 'USD', 'staff_salaries', 'housekeeping', 'Monthly housekeeping staff salaries', 'Payroll'),
(1, '2025-01-20', 1200.00, 'USD', 'utilities', 'electricity', 'Monthly electricity bill', 'Miami Electric Co'),
(1, '2025-01-25', 800.00, 'USD', 'supplies', 'cleaning', 'Cleaning supplies and amenities', 'Hotel Supply Pro'),
(1, '2025-02-10', 2500.00, 'USD', 'maintenance', 'hvac', 'HVAC system maintenance', 'Cool Air Services'),
(1, '2025-02-15', 1500.00, 'USD', 'marketing', 'online_ads', 'Google and Facebook advertising', 'Digital Marketing Agency'),
(1, '2025-03-05', 3000.00, 'USD', 'staff_salaries', 'front_desk', 'Front desk staff salaries', 'Payroll'),
(1, '2025-03-12', 900.00, 'USD', 'utilities', 'water', 'Monthly water bill', 'Miami Water Dept'),
(1, '2025-04-08', 1800.00, 'USD', 'supplies', 'linens', 'New bed linens and towels', 'Hotel Linens Plus'),
(1, '2025-04-15', 2200.00, 'USD', 'maintenance', 'plumbing', 'Plumbing repairs and upgrades', 'Miami Plumbing Co'),
(1, '2025-05-10', 1000.00, 'USD', 'marketing', 'print_ads', 'Magazine and brochure advertising', 'Print Marketing Co'),
(1, '2025-05-20', 4000.00, 'USD', 'staff_salaries', 'management', 'Management staff salaries', 'Payroll'),
(1, '2025-06-05', 1300.00, 'USD', 'utilities', 'gas', 'Monthly gas bill', 'Miami Gas Company'),
(1, '2025-06-15', 700.00, 'USD', 'supplies', 'food_beverage', 'Restaurant inventory', 'Food Distributors Inc'),
(1, '2025-07-01', 2800.00, 'USD', 'maintenance', 'exterior', 'Building exterior maintenance', 'Building Services LLC');

-- Insert sample reviews
INSERT INTO reviews (hotel_id, guest_id, booking_id, platform, rating, title, comment, review_date, is_verified) VALUES
(1, 1, 1, 'tripadvisor', 5, 'Excellent Stay!', 'Beautiful ocean views and excellent service. Will definitely return!', '2025-01-19', TRUE),
(1, 2, 2, 'google', 4, 'Great Location', 'Perfect location near the beach. Room was clean and comfortable.', '2025-01-24', TRUE),
(1, 3, 3, 'booking_com', 5, 'Luxury Experience', 'The Ocean Suite was absolutely perfect. Staff was very attentive.', '2025-01-30', TRUE),
(1, 4, 4, 'direct', 4, 'Good Value', 'Nice hotel with good amenities. Breakfast could be better.', '2025-02-15', TRUE),
(1, 5, 5, 'tripadvisor', 5, 'Romantic Getaway', 'Perfect for our anniversary. The view from our room was amazing!', '2025-02-18', TRUE),
(1, 6, 6, 'google', 4, 'Family Friendly', 'Great for families. Kids loved the pool area.', '2025-02-26', TRUE),
(1, 7, 7, 'booking_com', 5, 'Business Trip', 'Excellent facilities for business travelers. Fast WiFi and good workspace.', '2025-03-09', TRUE),
(1, 8, 8, 'direct', 4, 'Comfortable Stay', 'Clean rooms and friendly staff. Would recommend to others.', '2025-03-16', TRUE),
(1, 9, 9, 'tripadvisor', 5, 'Outstanding Service', 'The staff went above and beyond to make our stay memorable.', '2025-03-23', TRUE),
(1, 10, 10, 'google', 4, 'Nice Resort', 'Good location and amenities. The spa was fantastic.', '2025-04-13', TRUE);

-- Insert KPI snapshots for the last 6 months
INSERT INTO kpi_snapshots (hotel_id, date, total_bookings, revenue, occupancy_rate, adr, revpar, alos, average_rating, total_rooms_available, rooms_occupied) VALUES
-- January 2025
(1, '2025-01-15', 1, 360.00, 65.5, 120.00, 78.60, 3.0, 4.8, 150, 98),
(1, '2025-01-20', 1, 540.00, 70.2, 180.00, 126.36, 3.0, 4.8, 150, 105),
(1, '2025-01-25', 1, 1400.00, 68.8, 350.00, 240.80, 4.0, 4.8, 150, 103),
-- February 2025
(1, '2025-02-10', 1, 480.00, 72.1, 120.00, 86.52, 4.0, 4.7, 150, 108),
(1, '2025-02-15', 1, 360.00, 69.3, 180.00, 124.74, 2.0, 4.7, 150, 104),
(1, '2025-02-20', 1, 1750.00, 75.4, 350.00, 263.90, 5.0, 4.7, 150, 113),
-- March 2025
(1, '2025-03-05', 1, 360.00, 68.9, 120.00, 82.68, 3.0, 4.9, 150, 103),
(1, '2025-03-12', 1, 540.00, 71.2, 180.00, 128.16, 3.0, 4.9, 150, 107),
(1, '2025-03-18', 1, 1400.00, 73.8, 350.00, 258.30, 4.0, 4.9, 150, 111),
-- April 2025
(1, '2025-04-08', 1, 480.00, 70.5, 120.00, 84.60, 4.0, 4.8, 150, 106),
(1, '2025-04-15', 1, 540.00, 72.8, 180.00, 131.04, 3.0, 4.8, 150, 109),
(1, '2025-04-22', 1, 1400.00, 74.1, 350.00, 259.35, 4.0, 4.8, 150, 111),
-- May 2025
(1, '2025-05-05', 1, 480.00, 76.2, 120.00, 91.44, 4.0, 4.9, 150, 114),
(1, '2025-05-15', 1, 540.00, 78.5, 180.00, 141.30, 3.0, 4.9, 150, 118),
(1, '2025-05-22', 1, 1400.00, 77.8, 350.00, 272.30, 4.0, 4.9, 150, 117),
-- June 2025
(1, '2025-06-08', 1, 480.00, 79.1, 120.00, 94.92, 4.0, 4.8, 150, 119),
(1, '2025-06-15', 1, 540.00, 81.2, 180.00, 146.16, 3.0, 4.8, 150, 122),
(1, '2025-06-22', 1, 1400.00, 80.5, 350.00, 281.75, 4.0, 4.8, 150, 121),
-- July 2025 (current month)
(1, '2025-07-01', 1, 240.00, 82.3, 120.00, 98.76, 4.0, 4.9, 150, 123),
(1, '2025-07-03', 1, 360.00, 83.1, 180.00, 149.58, 4.0, 4.9, 150, 125);

-- Insert activity logs
INSERT INTO activity_logs (hotel_id, user_id, activity_type, entity_type, entity_id, description, metadata, ip_address) VALUES
(1, 1, 'booking', 'booking', 1, 'New booking created for John Doe', '{"booking_reference": "GPR-2025-001", "room_type": "Standard", "nights": 3}'::jsonb, '192.168.1.100'),
(1, 2, 'check_in', 'booking', 1, 'Guest checked in to room 102', '{"room_number": "102", "check_in_time": "14:30"}'::jsonb, '192.168.1.101'),
(1, 1, 'payment', 'payment', 1, 'Payment received for booking GPR-2025-001', '{"amount": 360.00, "method": "credit_card"}'::jsonb, '192.168.1.100'),
(1, 3, 'check_out', 'booking', 1, 'Guest checked out from room 102', '{"room_number": "102", "check_out_time": "11:00"}'::jsonb, '192.168.1.102'),
(1, 1, 'booking', 'booking', 2, 'New booking created for Emma Smith', '{"booking_reference": "GPR-2025-002", "room_type": "Deluxe", "nights": 3}'::jsonb, '192.168.1.100'),
(1, 2, 'maintenance', 'room', 8, 'Room 203 scheduled for maintenance', '{"issue": "AC repair", "priority": "high"}'::jsonb, '192.168.1.101'),
(1, 1, 'review', 'review', 1, 'New review received from John Doe', '{"rating": 5, "platform": "tripadvisor"}'::jsonb, '192.168.1.100'),
(1, 3, 'expense', 'expense', 1, 'New expense recorded for housekeeping salaries', '{"category": "staff_salaries", "amount": 5000.00}'::jsonb, '192.168.1.102'),
(1, 1, 'booking', 'booking', 19, 'New booking created for Marco Rossi', '{"booking_reference": "GPR-2025-019", "room_type": "Standard", "nights": 4}'::jsonb, '192.168.1.100'),
(1, 2, 'check_in', 'booking', 19, 'Guest checked in to room 102', '{"room_number": "102", "check_in_time": "15:00"}'::jsonb, '192.168.1.101');

-- Insert settings
INSERT INTO settings (hotel_id, setting_key, setting_value, setting_type, description) VALUES
(1, 'hotel_timezone', 'America/New_York', 'string', 'Hotel timezone for bookings and reports'),
(1, 'default_currency', 'USD', 'string', 'Default currency for pricing and reports'),
(1, 'check_in_time', '15:00', 'string', 'Standard check-in time'),
(1, 'check_out_time', '11:00', 'string', 'Standard check-out time'),
(1, 'cancellation_policy', '24', 'number', 'Cancellation policy in hours'),
(1, 'enable_notifications', 'true', 'boolean', 'Enable email notifications'),
(1, 'max_occupancy_override', 'false', 'boolean', 'Allow overriding max occupancy'),
(1, 'loyalty_program_enabled', 'true', 'boolean', 'Enable loyalty program features'),
(1, 'automatic_pricing', 'false', 'boolean', 'Enable automatic pricing adjustments'),
(1, 'social_media_integration', '{"facebook": true, "instagram": true, "twitter": false}', 'json', 'Social media integration settings'),
(2, 'hotel_timezone', 'America/New_York', 'string', 'Hotel timezone for bookings and reports'),
(2, 'default_currency', 'USD', 'string', 'Default currency for pricing and reports'),
(2, 'check_in_time', '16:00', 'string', 'Standard check-in time'),
(2, 'check_out_time', '12:00', 'string', 'Standard check-out time'),
(2, 'cancellation_policy', '48', 'number', 'Cancellation policy in hours'),
(2, 'enable_notifications', 'true', 'boolean', 'Enable email notifications'),
(2, 'loyalty_program_enabled', 'false', 'boolean', 'Enable loyalty program features'),
(2, 'automatic_pricing', 'true', 'boolean', 'Enable automatic pricing adjustments');

-- Update hotel total rooms to match actual room count
UPDATE hotels SET total_rooms = 150 WHERE id = 1;
UPDATE hotels SET total_rooms = 200 WHERE id = 2;

-- Final verification queries (can be removed in production)
SELECT 'Hotels' as table_name, COUNT(*) as record_count FROM hotels
UNION ALL
SELECT 'Users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'Room Types' as table_name, COUNT(*) as record_count FROM room_types
UNION ALL
SELECT 'Rooms' as table_name, COUNT(*) as record_count FROM rooms
UNION ALL
SELECT 'Guests' as table_name, COUNT(*) as record_count FROM guests
UNION ALL
SELECT 'Booking Sources' as table_name, COUNT(*) as record_count FROM booking_sources
UNION ALL
SELECT 'Bookings' as table_name, COUNT(*) as record_count FROM bookings
UNION ALL
SELECT 'Payments' as table_name, COUNT(*) as record_count FROM payments
UNION ALL
SELECT 'Revenue' as table_name, COUNT(*) as record_count FROM revenue
UNION ALL
SELECT 'Expenses' as table_name, COUNT(*) as record_count FROM expenses
UNION ALL
SELECT 'Reviews' as table_name, COUNT(*) as record_count FROM reviews
UNION ALL
SELECT 'KPI Snapshots' as table_name, COUNT(*) as record_count FROM kpi_snapshots
UNION ALL
SELECT 'Activity Logs' as table_name, COUNT(*) as record_count FROM activity_logs
UNION ALL
SELECT 'Settings' as table_name, COUNT(*) as record_count FROM settings;

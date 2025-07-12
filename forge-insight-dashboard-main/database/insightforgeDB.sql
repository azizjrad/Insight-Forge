-- InsightForge PostgreSQL Schema
-- Comprehensive database schema for hotel analytics dashboard
-- Supports all dashboard features including KPIs, bookings, financial analytics, and guest segments

-- Create database (uncomment if needed)
-- CREATE DATABASE insightforgeDB;

-- Connect to the database (uncomment if needed)
-- \c insightforgeDB;

-- Create extensions for additional functionality
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    total_rooms INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, city, country)
);

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'staff', -- admin, manager, staff, viewer
    is_active BOOLEAN DEFAULT TRUE,
    avatar_url TEXT,
    phone VARCHAR(50),
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);

-- 3. Room types table
CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL, -- Standard, Deluxe, Suite, Family, Executive
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    max_occupancy INTEGER DEFAULT 2,
    amenities JSONB, -- JSON format with indexing support
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    UNIQUE(hotel_id, name)
);

-- 4. Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    room_type_id INTEGER NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    floor INTEGER,
    status VARCHAR(50) DEFAULT 'available', -- available, occupied, maintenance, out_of_order
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
    UNIQUE(hotel_id, room_number)
);

-- 5. Guests table
CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    nationality VARCHAR(50), -- ISO country code
    date_of_birth DATE,
    gender VARCHAR(10),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    id_type VARCHAR(50), -- passport, driver_license, national_id
    id_number VARCHAR(100),
    vip_status BOOLEAN DEFAULT FALSE,
    loyalty_tier VARCHAR(50), -- bronze, silver, gold, platinum
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Booking sources table
CREATE TABLE IF NOT EXISTS booking_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Direct, Booking.com, Expedia, Airbnb, etc.
    commission_rate DECIMAL(5,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    room_id INTEGER,
    room_type_id INTEGER NOT NULL,
    guest_id INTEGER,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_id INTEGER,
    status VARCHAR(50) DEFAULT 'confirmed', -- confirmed, checked_in, checked_out, cancelled, no_show
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    nights INTEGER GENERATED ALWAYS AS (check_out - check_in) STORED,
    room_rate DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    special_requests TEXT,
    notes TEXT,
    cancellation_date TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
    FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE SET NULL,
    FOREIGN KEY (source_id) REFERENCES booking_sources(id) ON DELETE SET NULL,
    CONSTRAINT chk_dates CHECK (check_out > check_in),
    CONSTRAINT chk_amounts CHECK (total_amount >= 0 AND paid_amount >= 0)
);

-- 8. Payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50), -- cash, credit_card, debit_card, bank_transfer, online
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- 9. Revenue table
CREATE TABLE IF NOT EXISTS revenue (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    booking_id INTEGER,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    revenue_type VARCHAR(100) NOT NULL, -- room, food_beverage, spa, parking, other
    category VARCHAR(100), -- subcategory for detailed analysis
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- 10. Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    category VARCHAR(100) NOT NULL, -- staff_salaries, utilities, supplies, maintenance, marketing, other
    subcategory VARCHAR(100),
    description TEXT,
    vendor VARCHAR(255),
    receipt_url TEXT,
    approved_by INTEGER,
    approval_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 11. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    guest_id INTEGER,
    booking_id INTEGER,
    platform VARCHAR(100), -- tripadvisor, google, booking_com, direct, etc.
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    response TEXT,
    response_date TIMESTAMP,
    review_date DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE SET NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- 12. KPI snapshots table
CREATE TABLE IF NOT EXISTS kpi_snapshots (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    date DATE NOT NULL,
    total_bookings INTEGER DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    occupancy_rate DECIMAL(5,2) DEFAULT 0, -- percentage
    adr DECIMAL(10,2) DEFAULT 0, -- Average Daily Rate
    revpar DECIMAL(10,2) DEFAULT 0, -- Revenue per Available Room
    goppar DECIMAL(10,2) DEFAULT 0, -- Gross Operating Profit per Available Room
    alos DECIMAL(5,2) DEFAULT 0, -- Average Length of Stay
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_rooms_available INTEGER DEFAULT 0,
    rooms_occupied INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    UNIQUE(hotel_id, date)
);

-- 13. Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    user_id INTEGER,
    activity_type VARCHAR(100) NOT NULL, -- booking, payment, check_in, check_out, cancellation, etc.
    entity_type VARCHAR(100), -- booking, guest, room, payment
    entity_id INTEGER,
    description TEXT NOT NULL,
    metadata JSONB, -- JSON format for additional data with indexing support
    ip_address INET, -- PostgreSQL native IP address type
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 14. Settings table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    setting_key VARCHAR(255) NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
    UNIQUE(hotel_id, setting_key)
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_hotel_id ON bookings(hotel_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_source ON bookings(source_id);

CREATE INDEX IF NOT EXISTS idx_revenue_hotel_date ON revenue(hotel_id, date);
CREATE INDEX IF NOT EXISTS idx_revenue_type ON revenue(revenue_type);

CREATE INDEX IF NOT EXISTS idx_expenses_hotel_date ON expenses(hotel_id, date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

CREATE INDEX IF NOT EXISTS idx_kpi_hotel_date ON kpi_snapshots(hotel_id, date);

CREATE INDEX IF NOT EXISTS idx_reviews_hotel_rating ON reviews(hotel_id, rating);
CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(review_date);

CREATE INDEX IF NOT EXISTS idx_guests_nationality ON guests(nationality);
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);

CREATE INDEX IF NOT EXISTS idx_activity_logs_hotel_date ON activity_logs(hotel_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON activity_logs(activity_type);

-- Additional PostgreSQL-specific indexes for JSONB columns
CREATE INDEX IF NOT EXISTS idx_room_types_amenities ON room_types USING GIN (amenities);
CREATE INDEX IF NOT EXISTS idx_activity_logs_metadata ON activity_logs USING GIN (metadata);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic updates
CREATE TRIGGER update_hotels_timestamp 
    BEFORE UPDATE ON hotels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_timestamp 
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_timestamp 
    BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_timestamp 
    BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_timestamp 
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_timestamp 
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries
CREATE OR REPLACE VIEW booking_summary AS
SELECT 
    b.id,
    b.booking_reference,
    h.name as hotel_name,
    CONCAT(g.first_name, ' ', g.last_name) as guest_name,
    rt.name as room_type,
    r.room_number,
    b.check_in,
    b.check_out,
    b.nights,
    b.status,
    b.total_amount,
    bs.name as booking_source
FROM bookings b
JOIN hotels h ON b.hotel_id = h.id
LEFT JOIN guests g ON b.guest_id = g.id
LEFT JOIN room_types rt ON b.room_type_id = rt.id
LEFT JOIN rooms r ON b.room_id = r.id
LEFT JOIN booking_sources bs ON b.source_id = bs.id;

CREATE OR REPLACE VIEW occupancy_summary AS
SELECT 
    h.id as hotel_id,
    h.name as hotel_name,
    COUNT(DISTINCT r.id) as total_rooms,
    COUNT(DISTINCT CASE WHEN r.status = 'occupied' THEN r.id END) as occupied_rooms,
    ROUND(
        (COUNT(DISTINCT CASE WHEN r.status = 'occupied' THEN r.id END) * 100.0 / 
         NULLIF(COUNT(DISTINCT r.id), 0)), 2
    ) as occupancy_rate
FROM hotels h
LEFT JOIN rooms r ON h.id = r.hotel_id
GROUP BY h.id, h.name;

CREATE OR REPLACE VIEW revenue_summary AS
SELECT 
    h.id as hotel_id,
    h.name as hotel_name,
    DATE_TRUNC('month', r.date) as month,
    SUM(r.amount) as monthly_revenue,
    AVG(r.amount) as avg_daily_revenue
FROM hotels h
LEFT JOIN revenue r ON h.id = r.hotel_id
GROUP BY h.id, h.name, DATE_TRUNC('month', r.date)
ORDER BY h.id, month;

-- Comments for documentation
COMMENT ON DATABASE insightforgedb IS 'InsightForge Hotel Analytics Dashboard Database';
COMMENT ON TABLE hotels IS 'Hotel properties and their basic information';
COMMENT ON TABLE users IS 'System users with role-based access';
COMMENT ON TABLE bookings IS 'Hotel room bookings and reservations';
COMMENT ON TABLE guests IS 'Guest information and profiles';
COMMENT ON TABLE revenue IS 'Revenue tracking by date and category';
COMMENT ON TABLE expenses IS 'Expense tracking and management';
COMMENT ON TABLE kpi_snapshots IS 'Daily KPI calculations and metrics';

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO insightforge_app;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO insightforge_app;
-- GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO insightforge_app;

#!/usr/bin/env python3
"""
Initialize InsightForge authentication system
Set up database schema and create initial users with proper roles
"""

import os
import sys
from datetime import datetime

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

from utils.database import init_database, test_connection
from models.user import User, UserRole
from models.hotel import Hotel

def create_demo_hotels():
    """Create demo hotels for testing"""
    hotels_data = [
        {
            'name': 'Grand Pacific Resort',
            'location': 'San Francisco, CA',
            'contact_email': 'info@grandpacific.com',
            'contact_phone': '+1-555-0101',
            'description': 'Luxury beachfront resort with premium amenities'
        },
        {
            'name': 'City Lights Hotel',
            'location': 'New York, NY',
            'contact_email': 'info@citylights.com',
            'contact_phone': '+1-555-0102',
            'description': 'Modern boutique hotel in the heart of Manhattan'
        },
        {
            'name': 'Mountain View Lodge',
            'location': 'Denver, CO',
            'contact_email': 'info@mountainview.com',
            'contact_phone': '+1-555-0103',
            'description': 'Cozy mountain retreat with stunning views'
        }
    ]
    
    created_hotels = []
    for hotel_data in hotels_data:
        try:
            # Check if hotel already exists
            existing_hotel = Hotel.get_by_name(hotel_data['name'])
            if existing_hotel:
                print(f"✅ Hotel '{hotel_data['name']}' already exists")
                created_hotels.append(existing_hotel)
            else:
                hotel = Hotel.create(**hotel_data)
                print(f"✅ Created hotel: {hotel.name} (ID: {hotel.id})")
                created_hotels.append(hotel)
        except Exception as e:
            print(f"❌ Failed to create hotel '{hotel_data['name']}': {e}")
    
    return created_hotels

def create_demo_users(hotels):
    """Create demo users with different roles"""
    users_data = [
        {
            'full_name': 'Platform Admin',
            'email': 'superadmin@insightforge.com',
            'password': 'superadmin123',
            'role': UserRole.SUPERADMIN,
            'hotel_id': None,  # Superadmin has no hotel
            'phone': '+1-555-ADMIN'
        },
        {
            'full_name': 'Sarah Johnson',
            'email': 'sarah@grandpacific.com',
            'password': 'admin123',
            'role': UserRole.ADMIN,
            'hotel_id': hotels[0].id,  # Grand Pacific Resort
            'phone': '+1-555-0201'
        },
        {
            'full_name': 'Mike Chen',
            'email': 'mike@grandpacific.com',
            'password': 'manager123',
            'role': UserRole.MANAGER,
            'hotel_id': hotels[0].id,  # Grand Pacific Resort
            'phone': '+1-555-0202'
        },
        {
            'full_name': 'Lisa Rodriguez',
            'email': 'lisa@citylights.com',
            'password': 'admin123',
            'role': UserRole.ADMIN,
            'hotel_id': hotels[1].id,  # City Lights Hotel
            'phone': '+1-555-0301'
        },
        {
            'full_name': 'James Wilson',
            'email': 'james@citylights.com',
            'password': 'staff123',
            'role': UserRole.STAFF,
            'hotel_id': hotels[1].id,  # City Lights Hotel
            'phone': '+1-555-0302'
        },
        {
            'full_name': 'Emma Davis',
            'email': 'emma@mountainview.com',
            'password': 'manager123',
            'role': UserRole.MANAGER,
            'hotel_id': hotels[2].id,  # Mountain View Lodge
            'phone': '+1-555-0401'
        },
        {
            'full_name': 'Demo User',
            'email': 'demo@insightforge.com',
            'password': 'demo123',
            'role': UserRole.DEMO,
            'hotel_id': None,  # Demo user can access demo data
            'phone': '+1-555-DEMO'
        }
    ]
    
    created_users = []
    for user_data in users_data:
        try:
            # Check if user already exists
            existing_user = User.get_by_email(user_data['email'])
            if existing_user:
                print(f"✅ User '{user_data['email']}' already exists")
                created_users.append(existing_user)
            else:
                user = User.create(**user_data)
                print(f"✅ Created user: {user.full_name} ({user.email}) - Role: {user.role}")
                created_users.append(user)
        except Exception as e:
            print(f"❌ Failed to create user '{user_data['email']}': {e}")
    
    return created_users

def main():
    """Main initialization function"""
    print("🚀 Initializing InsightForge Authentication System")
    print("=" * 50)
    
    try:
        # Test database connection first
        print("📋 Testing database connection...")
        db_status = test_connection()
        if db_status['status'] != 'connected':
            print(f"❌ Database connection failed: {db_status.get('error', 'Unknown error')}")
            return False
        print("✅ Database connection successful")
        
        # Initialize database schema
        print("\n📋 Initializing database schema...")
        init_database()
        
        # Create demo hotels
        print("\n🏨 Creating demo hotels...")
        hotels = create_demo_hotels()
        
        if len(hotels) < 3:
            print("❌ Failed to create required hotels")
            return False
        
        # Create demo users
        print("\n👥 Creating demo users...")
        users = create_demo_users(hotels)
        
        if len(users) < 7:
            print("❌ Failed to create required users")
            return False
        
        # Display summary
        print("\n" + "=" * 50)
        print("✅ InsightForge Authentication System Initialized Successfully!")
        print("\n🏨 Hotels Created:")
        for hotel in hotels:
            print(f"   • {hotel.name} (ID: {hotel.id}) - {hotel.location}")
        
        print("\n👥 Users Created:")
        for user in users:
            hotel_name = "Platform Admin" if not user.hotel_id else next(
                (h.name for h in hotels if h.id == user.hotel_id), "Unknown"
            )
            print(f"   • {user.full_name} ({user.email}) - {user.role.title()} at {hotel_name}")
        
        print("\n🔐 Login Credentials:")
        print("   • Superadmin: superadmin@insightforge.com / superadmin123")
        print("   • Hotel Admin: sarah@grandpacific.com / admin123")
        print("   • Manager: mike@grandpacific.com / manager123")
        print("   • Staff: james@citylights.com / staff123")
        print("   • Demo: demo@insightforge.com / demo123")
        
        print("\n🎯 Next Steps:")
        print("   1. Start the Flask backend server: python run.py")
        print("   2. Update frontend to use JWT authentication")
        print("   3. Test role-based access control")
        
        return True
        
    except Exception as e:
        print(f"❌ Initialization failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)

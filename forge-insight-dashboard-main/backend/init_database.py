#!/usr/bin/env python3
"""
InsightForge PostgreSQL Database Initialization Script
Creates PostgreSQL database with schema and seed data for hotel analytics dashboard
"""

import psycopg2
import psycopg2.extras
import os
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the directory where this script is located
SCRIPT_DIR = Path(__file__).parent
DATABASE_DIR = SCRIPT_DIR.parent / "database"
SCHEMA_FILE = DATABASE_DIR / "insightforgeDB.sql"
SEED_FILE = DATABASE_DIR / "insightforgeDB_seed.sql"

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'database': os.getenv('DB_NAME', 'insightforgedb'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'jradz123'),
    'sslmode': os.getenv('DB_SSLMODE', 'prefer'),
}

def create_database():
    """Create and initialize the PostgreSQL database"""
    try:
        print(f"� Connecting to PostgreSQL database: {DB_CONFIG['database']}")
        
        # Create database connection
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = True
        
        print("📋 Loading database schema...")
        if not SCHEMA_FILE.exists():
            raise FileNotFoundError(f"Schema file not found: {SCHEMA_FILE}")
        
        with open(SCHEMA_FILE, 'r', encoding='utf-8') as f:
            schema_sql = f.read()
        
        # Execute schema in parts (split by semicolon and filter empty statements)
        schema_statements = [stmt.strip() for stmt in schema_sql.split(';') if stmt.strip()]
        
        with conn.cursor() as cursor:
            for i, statement in enumerate(schema_statements, 1):
                try:
                    cursor.execute(statement)
                    print(f"✅ Executed schema statement {i}/{len(schema_statements)}")
                except psycopg2.Error as e:
                    print(f"❌ Error in schema statement {i}: {e}")
                    print(f"Statement: {statement[:100]}...")
                    
        print("✅ Schema created successfully!")
        
        # Read and execute seed data
        print("🌱 Loading seed data...")
        if not SEED_FILE.exists():
            raise FileNotFoundError(f"Seed file not found: {SEED_FILE}")
        
        with open(SEED_FILE, 'r', encoding='utf-8') as f:
            seed_sql = f.read()
        
        # Execute seed data in parts
        seed_statements = [stmt.strip() for stmt in seed_sql.split(';') if stmt.strip()]
        
        with conn.cursor() as cursor:
            for i, statement in enumerate(seed_statements, 1):
                try:
                    cursor.execute(statement)
                    print(f"✅ Executed seed statement {i}/{len(seed_statements)}")
                except psycopg2.Error as e:
                    print(f"❌ Error in seed statement {i}: {e}")
                    print(f"Statement: {statement[:100]}...")
        
        print("✅ Seed data loaded successfully!")
        
        # Verify database creation
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            tables = cursor.fetchall()
            
            print(f"📊 Database created with {len(tables)} tables:")
            for table in tables:
                cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
                count = cursor.fetchone()[0]
                print(f"   • {table[0]}: {count} records")
        
        # Close connection
        conn.close()
        
        print(f"\n🎉 Database initialization completed successfully!")
        print(f"📍 Database: {DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        return False

def verify_database():
    """Verify database integrity and show sample data"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        
        print("\n🔍 Database Verification:")
        
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            # Check KPI data
            cursor.execute("""
                SELECT date, total_bookings, revenue, occupancy_rate, adr, average_rating 
                FROM kpi_snapshots 
                ORDER BY date DESC 
                LIMIT 3
            """)
            kpis = cursor.fetchall()
            print(f"📈 Recent KPI snapshots: {len(kpis)} records")
            for kpi in kpis:
                print(f"   • {kpi['date']}: {kpi['total_bookings']} bookings, ${kpi['revenue']:.2f} revenue, {kpi['occupancy_rate']:.1f}% occupancy")
            
            # Check bookings by source
            cursor.execute("""
                SELECT bs.name, COUNT(b.id) as bookings, SUM(b.total_amount) as revenue
                FROM bookings b
                JOIN booking_sources bs ON b.source_id = bs.id
                GROUP BY bs.name
                ORDER BY bookings DESC
            """)
            sources = cursor.fetchall()
            print(f"🏪 Booking sources: {len(sources)} channels")
            for source in sources:
                print(f"   • {source['name']}: {source['bookings']} bookings, ${source['revenue']:.2f} revenue")
            
            # Check guest nationalities
            cursor.execute("""
                SELECT nationality, COUNT(*) as guests
                FROM guests
                WHERE nationality IS NOT NULL
                GROUP BY nationality
                ORDER BY guests DESC
                LIMIT 5
            """)
            nationalities = cursor.fetchall()
            print(f"🌍 Top guest nationalities:")
            for nat in nationalities:
                print(f"   • {nat['nationality']}: {nat['guests']} guests")
            
            # Check recent activity
            cursor.execute("""
                SELECT activity_type, description, created_at
                FROM activity_logs
                ORDER BY created_at DESC
                LIMIT 5
            """)
            activities = cursor.fetchall()
            print(f"📝 Recent activities: {len(activities)} logs")
            for activity in activities:
                print(f"   • {activity['activity_type']}: {activity['description']}")
        
        conn.close()
        print("✅ Database verification completed!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error verifying database: {e}")
        return False

if __name__ == "__main__":
    print("🏨 InsightForge PostgreSQL Database Initialization")
    print("=" * 50)
    
    # Create database
    if create_database():
        # Verify database
        verify_database()
        
        print("\n" + "=" * 50)
        print("🎯 Next Steps:")
        print("1. Update your Flask app to use the PostgreSQL database")
        print("2. Install required packages: pip install -r requirements.txt")
        print("3. Test the API endpoints with real data")
        print("4. Make sure PostgreSQL server is running")
        
        # Show connection example
        print(f"\n💡 PostgreSQL connection details:")
        print(f"Host: {DB_CONFIG['host']}")
        print(f"Port: {DB_CONFIG['port']}")
        print(f"Database: {DB_CONFIG['database']}")
        print(f"User: {DB_CONFIG['user']}")
        
    else:
        print("❌ Database initialization failed!")
        print("\n💡 Troubleshooting tips:")
        print("1. Make sure PostgreSQL is installed and running")
        print("2. Verify database credentials in .env file")
        print("3. Check if the database exists (create it manually if needed)")
        print("4. Ensure the user has proper permissions")
        exit(1)

#!/usr/bin/env python3
"""
Create PostgreSQL database for InsightForge
Run this script first to create the database before running init_database.py
"""

import psycopg2
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_database():
    """Create the PostgreSQL database"""
    
    # Database configuration
    admin_config = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': os.getenv('DB_PORT', '5432'),
        'database': 'postgres',  # Connect to default postgres database
        'user': os.getenv('DB_USER', 'postgres'),
        'password': os.getenv('DB_PASSWORD', 'jradz123'),
        'sslmode': os.getenv('DB_SSLMODE', 'prefer'),
    }
    
    database_name = os.getenv('DB_NAME', 'insightforgedb')
    
    try:
        print(f"🚀 Connecting to PostgreSQL server...")
        conn = psycopg2.connect(**admin_config)
        conn.autocommit = True
        
        with conn.cursor() as cursor:
            # Check if database exists
            cursor.execute(
                "SELECT 1 FROM pg_database WHERE datname = %s",
                (database_name,)
            )
            
            if cursor.fetchone():
                print(f"📊 Database '{database_name}' already exists!")
                
                # Ask user if they want to drop and recreate
                response = input("Do you want to drop and recreate it? (y/N): ").lower()
                if response == 'y':
                    # Terminate existing connections
                    cursor.execute(f"""
                        SELECT pg_terminate_backend(pg_stat_activity.pid)
                        FROM pg_stat_activity
                        WHERE pg_stat_activity.datname = '{database_name}'
                          AND pid <> pg_backend_pid()
                    """)
                    
                    # Drop database
                    cursor.execute(f'DROP DATABASE "{database_name}"')
                    print(f"🗑️  Dropped existing database '{database_name}'")
                else:
                    print("✅ Using existing database")
                    conn.close()
                    return True
            
            # Create database
            cursor.execute(f'CREATE DATABASE "{database_name}"')
            print(f"✅ Created database '{database_name}'")
            
        conn.close()
        
        # Test connection to new database
        test_config = admin_config.copy()
        test_config['database'] = database_name
        
        test_conn = psycopg2.connect(**test_config)
        test_conn.close()
        
        print(f"✅ Database '{database_name}' is ready!")
        print(f"\n🎯 Next step: Run 'python init_database.py' to create tables and seed data")
        
        return True
        
    except psycopg2.Error as e:
        print(f"❌ PostgreSQL error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🏨 InsightForge PostgreSQL Database Creation")
    print("=" * 50)
    
    if create_database():
        print("\n✅ Database creation completed successfully!")
    else:
        print("\n❌ Database creation failed!")
        print("\n💡 Troubleshooting tips:")
        print("1. Make sure PostgreSQL is installed and running")
        print("2. Check your database credentials in .env file")
        print("3. Ensure the PostgreSQL user has CREATE DATABASE permissions")
        print("4. Try connecting manually: psql -h localhost -U postgres")
        sys.exit(1)

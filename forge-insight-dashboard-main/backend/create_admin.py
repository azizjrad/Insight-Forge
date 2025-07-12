#!/usr/bin/env python3
"""
Create a new admin user with known credentials
"""

from connection import execute_insert
import bcrypt
from datetime import datetime

def create_admin_user():
    """Create admin@demo.com with password 'password'"""
    try:
        # Hash the password
        password = 'password'
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Insert the user
        user_data = {
            'hotel_id': None,
            'name': 'Demo Admin',
            'email': 'admin@demo.com',
            'password_hash': password_hash,
            'role': 'admin',
            'is_active': True,
            'phone': '+1-555-ADMIN',
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        
        query = """
        INSERT INTO users (hotel_id, name, email, password_hash, role, is_active, phone, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        execute_insert(query, (
            user_data['hotel_id'],
            user_data['name'], 
            user_data['email'],
            user_data['password_hash'],
            user_data['role'],
            user_data['is_active'],
            user_data['phone'],
            user_data['created_at'],
            user_data['updated_at']
        ))
        
        print(f"✅ Created user: {user_data['email']} with password: {password}")
        print(f"   Role: {user_data['role']}")
        
        # Verify the password works
        test_result = bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
        print(f"   Password verification test: {test_result}")
        
    except Exception as e:
        print(f"❌ Error creating user: {e}")

if __name__ == "__main__":
    create_admin_user()

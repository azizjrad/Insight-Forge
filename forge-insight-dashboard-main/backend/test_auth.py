#!/usr/bin/env python3
"""
Test authentication system
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from connection import execute_query
import bcrypt

def test_auth():
    print("=== Testing Authentication System ===")
    
    # Test 1: Check database connection
    print("1. Testing database connection...")
    try:
        users = execute_query("SELECT COUNT(*) as count FROM users")
        print(f"✅ Database connected. Found {users[0]['count']} users")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return
    
    # Test 2: Get admin user
    print("\n2. Testing user retrieval...")
    try:
        users = execute_query(
            "SELECT id, email, password_hash FROM users WHERE email = %s", 
            ('admin@demo.com',)
        )
        if users:
            user = users[0]
            print(f"✅ User found: {user['email']}")
            print(f"   Password hash: {user['password_hash'][:50]}...")
        else:
            print("❌ Admin user not found")
            return
    except Exception as e:
        print(f"❌ User retrieval failed: {e}")
        return
    
    # Test 3: Test password verification
    print("\n3. Testing password verification...")
    password = 'password'
    hash_from_db = user['password_hash']
    
    try:
        result = bcrypt.checkpw(password.encode('utf-8'), hash_from_db.encode('utf-8'))
        print(f"✅ Password verification: {result}")
    except Exception as e:
        print(f"❌ Password verification failed: {e}")
        return
    
    # Test 4: Test auth function
    print("\n4. Testing auth function...")
    try:
        from routes.auth import get_user_by_email, verify_password
        
        user = get_user_by_email('admin@demo.com')
        if user:
            print(f"✅ get_user_by_email works: {user['email']}")
            
            verified = verify_password('password', user['password_hash'])
            print(f"✅ verify_password result: {verified}")
        else:
            print("❌ get_user_by_email failed")
    except Exception as e:
        print(f"❌ Auth function test failed: {e}")
    
    print("\n=== Test Complete ===")

if __name__ == "__main__":
    test_auth()

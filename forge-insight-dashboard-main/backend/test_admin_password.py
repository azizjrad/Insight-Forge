#!/usr/bin/env python3
"""
Test admin@demo.com password
"""

from connection import execute_query
import bcrypt

try:
    # Get admin@demo.com user
    admin_users = execute_query("SELECT email, password_hash FROM users WHERE email = 'admin@demo.com'")
    if admin_users:
        admin = admin_users[0]
        password_hash = admin['password_hash']
        print(f'Testing admin@demo.com password:')
        print(f'  Hash: {password_hash[:20]}...')
        
        # Test with "password"
        test_password = 'password'
        if password_hash.startswith('$2b$'):
            result = bcrypt.checkpw(test_password.encode('utf-8'), password_hash.encode('utf-8'))
            print(f'  Password "{test_password}": {"✅ WORKS!" if result else "❌ Failed"}')
        
        # Test other common passwords
        test_passwords = ['admin123', 'demo123', 'admin', '123456']
        for pwd in test_passwords:
            if password_hash.startswith('$2b$'):
                result = bcrypt.checkpw(pwd.encode('utf-8'), password_hash.encode('utf-8'))
                if result:
                    print(f'  Password "{pwd}": ✅ WORKS!')
                    break
        else:
            print('  No other passwords worked')
            
    else:
        print('admin@demo.com not found')
        
except Exception as e:
    print(f'Error: {e}')

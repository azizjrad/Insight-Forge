#!/usr/bin/env python3
"""
Check users in the database
"""

from connection import execute_query

try:
    users = execute_query('SELECT email, role, is_active, password_hash FROM users')
    print('All users in database:')
    for user in users:
        email = user['email']
        role = user['role']
        active = user['is_active']
        password_hash = user['password_hash']
        print(f'  Email: {email}, Role: {role}, Active: {active}')
        print(f'    Password hash: {password_hash[:50]}...')
        
    print('\nTesting password verification for sarah@grandpacific.com:')
    sarah_users = execute_query("SELECT email, password_hash FROM users WHERE email = 'sarah@grandpacific.com'")
    if sarah_users:
        sarah = sarah_users[0]
        password_hash = sarah['password_hash']
        print(f'  Hash format: {password_hash[:10]}...')
        print(f'  Hash length: {len(password_hash)}')
        
        # Test password verification
        import bcrypt
        import hashlib
        
        test_passwords = ['admin123', 'password', 'admin', '123456', 'demo123', 'manager123', 'staff123']
        print(f'  Testing multiple passwords:')
        for test_password in test_passwords:
            try:
                if password_hash.startswith('$2b$'):
                    bcrypt_result = bcrypt.checkpw(test_password.encode('utf-8'), password_hash.encode('utf-8'))
                    if bcrypt_result:
                        print(f'  ✅ FOUND: Password "{test_password}" works!')
                        break
                    else:
                        print(f'  ❌ Password "{test_password}" failed')
                else:
                    sha256_hash = hashlib.sha256(test_password.encode('utf-8')).hexdigest()
                    if sha256_hash == password_hash:
                        print(f'  ✅ FOUND: Password "{test_password}" works!')
                        break
                    else:
                        print(f'  ❌ Password "{test_password}" failed')
            except Exception as e:
                print(f'  Error testing "{test_password}": {e}')
    else:
        print('  sarah@grandpacific.com not found')
        
    print('\nLooking for admin@demo.com specifically:')
    admin_users = execute_query("SELECT email, role, is_active FROM users WHERE email = 'admin@demo.com'")
    if admin_users:
        for user in admin_users:
            print(f'  Found: {user["email"]}, Role: {user["role"]}, Active: {user["is_active"]}')
    else:
        print('  admin@demo.com not found in database')
        
    print('\nLooking for demo@example.com specifically:')
    demo_users = execute_query("SELECT email, role, is_active FROM users WHERE email = 'demo@example.com'")
    if demo_users:
        for user in demo_users:
            print(f'  Found: {user["email"]}, Role: {user["role"]}, Active: {user["is_active"]}')
    else:
        print('  demo@example.com not found in database')
        
except Exception as e:
    print(f'Error: {e}')

#!/usr/bin/env python3
"""
Test login for admin@demo.com
"""

import requests
import json

def test_login():
    """Test login with admin@demo.com"""
    try:
        # Assuming the backend is running on localhost:5000
        url = "http://localhost:5000/api/auth/login"
        
        # Test data
        login_data = {
            "email": "admin@demo.com",
            "password": "password"
        }
        
        print(f"Testing login for: {login_data['email']}")
        print(f"URL: {url}")
        
        # Make the request
        response = requests.post(url, json=login_data)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if 'access_token' in data:
                print("✅ Login successful!")
                print(f"Token received: {data['access_token'][:50]}...")
            else:
                print("❌ Login failed - no token in response")
        else:
            print(f"❌ Login failed with status {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection error - is the backend server running?")
        print("   Try running: python app.py or python run.py")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_login()

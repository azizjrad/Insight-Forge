#!/usr/bin/env python3
"""
Test complete login API response
"""
import requests
import json

def test_login_api():
    print("=== Testing Complete Login API ===")
    
    url = "http://localhost:5000/api/auth/login"
    payload = {
        "email": "admin@demo.com",
        "password": "password"
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Login successful!")
            print(f"Response keys: {list(data.keys())}")
            print(f"Success: {data.get('success')}")
            print(f"Access Token (first 50 chars): {data.get('access_token', 'N/A')[:50]}")
            if 'user' in data:
                print(f"User data: {data['user']}")
            else:
                print("❌ No user data in response")
        else:
            print(f"❌ Login failed: {response.text}")
    
    except Exception as e:
        print(f"❌ Request failed: {e}")

if __name__ == "__main__":
    test_login_api()

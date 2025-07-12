#!/usr/bin/env python3
"""
Check users table schema
"""

from connection import execute_query

try:
    result = execute_query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position")
    print('Users table columns:')
    for row in result:
        print(f'  {row["column_name"]}: {row["data_type"]}')
        
except Exception as e:
    print(f'Error: {e}')

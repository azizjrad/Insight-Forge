import sys
sys.path.append('.')
from database import execute_query

print('Checking bookings table structure...')
try:
    result = execute_query('SELECT column_name FROM information_schema.columns WHERE table_name = %s ORDER BY ordinal_position', ('bookings',))
    print('Columns in bookings table:')
    for row in result:
        print(f'  - {row["column_name"]}')
except Exception as e:
    print(f'Error: {e}')
    
print('\nSample booking data:')
try:
    sample = execute_query('SELECT * FROM bookings LIMIT 2')
    for i, row in enumerate(sample):
        print(f'Row {i+1}: {dict(row)}')
except Exception as e:
    print(f'Error: {e}')

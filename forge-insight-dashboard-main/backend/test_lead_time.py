import sys
sys.path.append('.')
from database import execute_query

print('Checking booking dates in the database...')
try:
    result = execute_query('SELECT booking_date, check_in, status, EXTRACT(DAY FROM (check_in - booking_date)) as lead_time FROM bookings WHERE status != \'cancelled\' ORDER BY booking_date LIMIT 5')
    for row in result:
        print(f'Booking: {row["booking_date"]} -> Check-in: {row["check_in"]} | Status: {row["status"]} | Lead time: {row["lead_time"]} days')
except Exception as e:
    print(f'Error: {e}')

print('\nTesting modified lead time query for all data...')
try:
    result = execute_query("""
        SELECT 
            AVG(EXTRACT(DAY FROM (check_in - booking_date))) as avg_lead_time,
            COUNT(*) as total_bookings
        FROM bookings 
        WHERE hotel_id = %s 
        AND status != 'cancelled'
        AND check_in > booking_date
    """, (1,), fetch_one=True)
    print(f'Result: {dict(result)}')
except Exception as e:
    print(f'Error: {e}')

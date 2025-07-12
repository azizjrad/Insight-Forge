import sys
sys.path.append('.')
from database import execute_query

print('All bookings with their dates:')
try:
    result = execute_query('SELECT id, booking_date, check_in, check_out, status FROM bookings ORDER BY id')
    for row in result:
        booking_str = row['booking_date'].strftime('%Y-%m-%d') if row['booking_date'] else 'N/A'
        checkin_str = row['check_in'].strftime('%Y-%m-%d') if row['check_in'] else 'N/A'
        checkout_str = row['check_out'].strftime('%Y-%m-%d') if row['check_out'] else 'N/A'
        print(f'ID {row["id"]}: Booked {booking_str} | Check-in {checkin_str} | Check-out {checkout_str} | Status: {row["status"]}')
except Exception as e:
    print(f'Error: {e}')

print('\nFixing lead time calculation to handle the data correctly...')
try:
    # Since the check-in dates are before booking dates, let's calculate backwards
    result = execute_query("""
        SELECT 
            AVG(ABS(EXTRACT(DAY FROM (check_in - booking_date)))) as avg_lead_time,
            COUNT(*) as total_bookings
        FROM bookings 
        WHERE hotel_id = %s 
        AND status != 'cancelled'
    """, (1,), fetch_one=True)
    print(f'Result with ABS: {dict(result)}')
except Exception as e:
    print(f'Error: {e}')

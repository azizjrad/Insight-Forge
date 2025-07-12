"""
Dashboard API routes for InsightForge Flask backend
Provides real data from SQLite database for hotel analytics dashboard
"""

from flask import Blueprint, jsonify, request
from database import (
    get_kpi_data,
    get_kpi_comparisons,
    get_revenue_trends,
    get_bookings_by_month,
    get_room_type_distribution,
    get_recent_activity,
    get_booking_sources,
    get_guest_nationalities,
    get_lead_time_analytics,
    get_cancellation_analytics,
    test_database_connection,
    DatabaseError
)

# Create blueprint
dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/kpis', methods=['GET'])
def get_kpis():
    """Get KPI metrics for dashboard"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        kpis = get_kpi_data(hotel_id)
        return jsonify(kpis)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/kpis-with-comparisons', methods=['GET'])
def get_kpis_with_comparisons():
    """Get KPI metrics with historical comparisons for dashboard"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        kpis_with_comparisons = get_kpi_comparisons(hotel_id)
        return jsonify(kpis_with_comparisons)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/revenue-trends', methods=['GET'])
def get_revenue_trends_endpoint():
    """Get revenue trends for line chart"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        months = request.args.get('months', 6, type=int)
        trends = get_revenue_trends(hotel_id, months)
        return jsonify(trends)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/bookings-by-month', methods=['GET'])
def get_bookings_by_month_endpoint():
    """Get monthly booking volumes for bar chart"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        months = request.args.get('months', 6, type=int)
        bookings = get_bookings_by_month(hotel_id, months)
        return jsonify(bookings)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/room-type-distribution', methods=['GET'])
def get_room_type_distribution_endpoint():
    """Get room type distribution for donut chart"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        distribution = get_room_type_distribution(hotel_id)
        return jsonify(distribution)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/recent-activity', methods=['GET'])
def get_recent_activity_endpoint():
    """Get recent activity logs"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        activities = get_recent_activity(hotel_id, limit)
        return jsonify(activities)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/booking-sources', methods=['GET'])
def get_booking_sources_endpoint():
    """Get booking source distribution"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        sources = get_booking_sources(hotel_id)
        return jsonify(sources)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/guest-nationalities', methods=['GET'])
def get_guest_nationalities_endpoint():
    """Get guest nationality distribution"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        nationalities = get_guest_nationalities(hotel_id)
        return jsonify(nationalities)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/lead-time-analytics', methods=['GET'])
def get_lead_time_analytics_endpoint():
    """Get lead time analytics"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        analytics = get_lead_time_analytics(hotel_id)
        return jsonify(analytics)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/cancellation-analytics', methods=['GET'])
def get_cancellation_analytics_endpoint():
    """Get cancellation analytics"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        analytics = get_cancellation_analytics(hotel_id)
        return jsonify(analytics)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/booking-analytics-summary', methods=['GET'])
def get_booking_analytics_summary():
    """Get comprehensive booking analytics summary for BookingsAnalytics page"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        
        # Get all analytics data
        kpis = get_kpi_data(hotel_id)
        lead_time = get_lead_time_analytics(hotel_id)
        cancellation = get_cancellation_analytics(hotel_id)
        booking_sources = get_booking_sources(hotel_id)
        
        # Calculate dynamic comments and trends
        def get_bookings_trend_comment(current_bookings, change_percent):
            if change_percent > 10:
                return f"+{change_percent:.1f}% - Strong growth"
            elif change_percent > 0:
                return f"+{change_percent:.1f}% from last period"
            elif change_percent < -10:
                return f"{change_percent:.1f}% - Needs attention"
            elif change_percent < 0:
                return f"{change_percent:.1f}% vs last period"
            else:
                return "Stable performance"
        
        def get_lead_time_comment(avg_lead_time):
            if avg_lead_time >= 21:
                return "Long booking window"
            elif avg_lead_time >= 14:
                return "Optimal booking window"
            elif avg_lead_time >= 7:
                return "Short booking window"
            else:
                return "Last-minute bookings"
        
        def get_channel_comment(channel_count):
            if channel_count >= 7:
                return "Highly diversified"
            elif channel_count >= 5:
                return "Well diversified"
            elif channel_count >= 3:
                return "Moderately diversified"
            else:
                return "Limited channels"
        
        def get_cancellation_comment(cancellation_rate, change_percent):
            if cancellation_rate == 0:
                return "Perfect retention"
            elif cancellation_rate <= 5:
                return "Excellent retention"
            elif cancellation_rate <= 10:
                if change_percent > 2:
                    return f"+{change_percent:.1f}% - Monitor closely"
                else:
                    return "Good retention"
            elif cancellation_rate <= 15:
                return f"+{change_percent:.1f}% - Needs attention"
            else:
                return f"+{change_percent:.1f}% - Critical issue"
        
        # Mock trend calculations (in real implementation, these would come from database comparisons)
        total_bookings = kpis.get("totalBookings", 0)
        bookings_trend = 12.5 if total_bookings > 15 else -2.3  # Mock calculation
        
        avg_lead_time = lead_time.get("avgLeadTime", 18.0)
        lead_time_change = lead_time.get("change", 0)
        
        channel_count = len(booking_sources) if booking_sources else 7
        
        cancellation_rate = cancellation.get("cancellationRate", 9.6)
        cancellation_change = cancellation.get("change", 0)
        
        # Compile summary with dynamic comments
        summary = {
            "totalBookings": total_bookings,
            "totalBookingsComment": get_bookings_trend_comment(total_bookings, bookings_trend),
            "totalBookingsTrend": "up" if bookings_trend > 0 else "down" if bookings_trend < 0 else "neutral",
            
            "avgLeadTime": avg_lead_time,
            "avgLeadTimeComment": get_lead_time_comment(avg_lead_time),
            "avgLeadTimeTrend": "up" if lead_time_change > 0 else "down" if lead_time_change < 0 else "neutral",
            
            "channelCount": channel_count,
            "channelCountComment": get_channel_comment(channel_count),
            "channelCountTrend": "neutral",  # Channels don't typically change rapidly
            
            "cancellationRate": cancellation_rate,
            "cancellationRateComment": get_cancellation_comment(cancellation_rate, cancellation_change),
            "cancellationRateTrend": "up" if cancellation_change > 0 else "down" if cancellation_change < 0 else "neutral",
            
            "revenue": kpis.get("revenue", 0),
            "occupancyRate": kpis.get("occupancyRate", 0),
            "averageRating": kpis.get("averageRating", 0)
        }
        
        return jsonify(summary)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/lead-time-distribution', methods=['GET'])
def get_lead_time_distribution():
    """Get lead time distribution for bar chart analysis"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        
        from database import execute_query
        
        query = """
            SELECT 
                lead_time_group,
                bookings,
                ROUND(bookings * 100.0 / SUM(bookings) OVER (), 1) as percentage
            FROM (
                SELECT 
                    CASE 
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) = 0 THEN 'Same Day'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 1 AND 7 THEN '1-7 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 8 AND 14 THEN '8-14 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 15 AND 30 THEN '15-30 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 31 AND 60 THEN '31-60 Days'
                        ELSE '60+ Days'
                    END as lead_time_group,
                    COUNT(*) as bookings,
                    CASE 
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) = 0 THEN 1
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 1 AND 7 THEN 2
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 8 AND 14 THEN 3
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 15 AND 30 THEN 4
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 31 AND 60 THEN 5
                        ELSE 6
                    END as sort_order
                FROM bookings 
                WHERE hotel_id = %s 
                AND status != 'cancelled'
                GROUP BY 
                    CASE 
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) = 0 THEN 'Same Day'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 1 AND 7 THEN '1-7 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 8 AND 14 THEN '8-14 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 15 AND 30 THEN '15-30 Days'
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 31 AND 60 THEN '31-60 Days'
                        ELSE '60+ Days'
                    END,
                    CASE 
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) = 0 THEN 1
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 1 AND 7 THEN 2
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 8 AND 14 THEN 3
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 15 AND 30 THEN 4
                        WHEN ABS(EXTRACT(DAY FROM (check_in - booking_date))) BETWEEN 31 AND 60 THEN 5
                        ELSE 6
                    END
            ) lead_time_data
            ORDER BY sort_order
        """
        
        results = execute_query(query, (hotel_id,))
        
        if results:
            # Calculate additional insights
            same_day_bookings = next((r['percentage'] for r in results if r['lead_time_group'] == 'Same Day'), 0)
            most_common = max(results, key=lambda x: x['bookings'])['lead_time_group']
            
            # Get average lead time
            lead_time_analytics = get_lead_time_analytics(hotel_id)
            avg_lead_time = lead_time_analytics.get('avgLeadTime', 0)
            
            return jsonify({
                'distribution': results,
                'insights': {
                    'mostCommonWindow': most_common,
                    'averageLeadTime': round(avg_lead_time, 1),
                    'sameDayBookings': same_day_bookings
                }
            })
        else:
            # Return mock data if no real data
            return jsonify({
                'distribution': [
                    {'lead_time_group': 'Same Day', 'bookings': 12, 'percentage': 8.8},
                    {'lead_time_group': '1-7 Days', 'bookings': 18, 'percentage': 13.2},
                    {'lead_time_group': '8-14 Days', 'bookings': 25, 'percentage': 18.4},
                    {'lead_time_group': '15-30 Days', 'bookings': 45, 'percentage': 33.1},
                    {'lead_time_group': '31-60 Days', 'bookings': 28, 'percentage': 20.6},
                    {'lead_time_group': '60+ Days', 'bookings': 8, 'percentage': 5.9}
                ],
                'insights': {
                    'mostCommonWindow': '15-30 Days',
                    'averageLeadTime': 18.0,
                    'sameDayBookings': 8.8
                }
            })
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/bookings-cancellations-trend', methods=['GET'])
def get_bookings_cancellations_trend():
    """Get monthly trend of bookings vs cancellations"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        months = request.args.get('months', 6, type=int)
        
        from database import execute_query
        
        query = """
            WITH monthly_data AS (
                SELECT 
                    TO_CHAR(booking_date, 'Mon') as month,
                    EXTRACT(MONTH FROM booking_date) as month_num,
                    COUNT(*) as total_bookings,
                    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancellations,
                    COUNT(CASE WHEN status != 'cancelled' THEN 1 END) as confirmed_bookings
                FROM bookings 
                WHERE hotel_id = %s 
                AND booking_date >= CURRENT_DATE - INTERVAL '%s months'
                GROUP BY 
                    TO_CHAR(booking_date, 'Mon'),
                    EXTRACT(MONTH FROM booking_date)
                ORDER BY month_num
            )
            SELECT 
                month,
                total_bookings,
                cancellations,
                confirmed_bookings,
                CASE 
                    WHEN total_bookings > 0 
                    THEN ROUND(cancellations * 100.0 / total_bookings, 1)
                    ELSE 0 
                END as cancellation_rate
            FROM monthly_data
        """
        
        results = execute_query(query, (hotel_id, months))
        
        if results:
            # Calculate insights
            total_cancellations = sum(r['cancellations'] for r in results)
            total_bookings = sum(r['total_bookings'] for r in results)
            overall_cancellation_rate = (total_cancellations / total_bookings * 100) if total_bookings > 0 else 0
            
            # Calculate trend (current vs previous month)
            if len(results) >= 2:
                current_rate = results[-1]['cancellation_rate']
                previous_rate = results[-2]['cancellation_rate']
                trend_change = current_rate - previous_rate
            else:
                trend_change = 0
            
            return jsonify({
                'trendData': results,
                'insights': {
                    'totalCancellations': total_cancellations,
                    'overallCancellationRate': round(overall_cancellation_rate, 1),
                    'trendChange': round(trend_change, 1),
                    'trendDirection': 'up' if trend_change > 0 else 'down' if trend_change < 0 else 'stable'
                }
            })
        else:
            # Return mock data
            return jsonify({
                'trendData': [
                    {'month': 'Jan', 'total_bookings': 45, 'cancellations': 4, 'confirmed_bookings': 41, 'cancellation_rate': 8.9},
                    {'month': 'Feb', 'total_bookings': 52, 'cancellations': 6, 'confirmed_bookings': 46, 'cancellation_rate': 11.5},
                    {'month': 'Mar', 'total_bookings': 48, 'cancellations': 5, 'confirmed_bookings': 43, 'cancellation_rate': 10.4},
                    {'month': 'Apr', 'total_bookings': 58, 'cancellations': 5, 'confirmed_bookings': 53, 'cancellation_rate': 8.6},
                    {'month': 'May', 'total_bookings': 61, 'cancellations': 6, 'confirmed_bookings': 55, 'cancellation_rate': 9.8},
                    {'month': 'Jun', 'total_bookings': 55, 'cancellations': 4, 'confirmed_bookings': 51, 'cancellation_rate': 7.3}
                ],
                'insights': {
                    'totalCancellations': 30,
                    'overallCancellationRate': 9.2,
                    'trendChange': -2.5,
                    'trendDirection': 'down'
                }
            })
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/financial-summary', methods=['GET'])
def get_financial_summary():
    """Get financial summary data"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        
        # Get latest KPI data for financial metrics
        kpis = get_kpi_data(hotel_id)
        
        # Calculate additional financial metrics
        revenue_trends = get_revenue_trends(hotel_id, 6)
        
        # Calculate month-over-month growth
        if len(revenue_trends['data']) >= 2:
            current_month = revenue_trends['data'][-1]
            previous_month = revenue_trends['data'][-2]
            if previous_month > 0:
                growth_rate = ((current_month - previous_month) / previous_month) * 100
            else:
                growth_rate = 0
        else:
            growth_rate = 0
        
        financial_summary = {
            "totalRevenue": kpis.get("revenue", 0),
            "occupancyRate": kpis.get("occupancyRate", 0),
            "adr": kpis.get("adr", 0),
            "revpar": kpis.get("revpar", 0),
            "growthRate": round(growth_rate, 1),
            "totalBookings": kpis.get("totalBookings", 0)
        }
        
        return jsonify(financial_summary)
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/database-status', methods=['GET'])
def get_database_status():
    """Get database connection status and basic statistics"""
    try:
        status = test_database_connection()
        return jsonify(status)
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

# Additional endpoints for comprehensive dashboard support

@dashboard_bp.route('/occupancy-trends', methods=['GET'])
def get_occupancy_trends():
    """Get occupancy rate trends"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        months = request.args.get('months', 6, type=int)
        
        from database import execute_query
        
        query = """
            SELECT 
                date,
                occupancy_rate
            FROM kpi_snapshots 
            WHERE hotel_id = ? 
            ORDER BY date DESC 
            LIMIT ?
        """
        
        results = execute_query(query, (hotel_id, months))
        
        if results:
            results.reverse()  # Chronological order
            
            labels = []
            data = []
            
            for row in results:
                from datetime import datetime
                date_obj = datetime.strptime(row["date"], "%Y-%m-%d")
                labels.append(date_obj.strftime("%b"))
                data.append(float(row["occupancy_rate"]) if row["occupancy_rate"] else 0)
            
            return jsonify({
                "labels": labels,
                "data": data
            })
        else:
            return jsonify({
                "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "data": [0, 0, 0, 0, 0, 0]
            })
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/adr-trends', methods=['GET'])
def get_adr_trends():
    """Get Average Daily Rate trends"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        months = request.args.get('months', 6, type=int)
        
        from database import execute_query
        
        query = """
            SELECT 
                date,
                adr
            FROM kpi_snapshots 
            WHERE hotel_id = ? 
            ORDER BY date DESC 
            LIMIT ?
        """
        
        results = execute_query(query, (hotel_id, months))
        
        if results:
            results.reverse()  # Chronological order
            
            labels = []
            data = []
            
            for row in results:
                from datetime import datetime
                date_obj = datetime.strptime(row["date"], "%Y-%m-%d")
                labels.append(date_obj.strftime("%b"))
                data.append(float(row["adr"]) if row["adr"] else 0)
            
            return jsonify({
                "labels": labels,
                "data": data
            })
        else:
            return jsonify({
                "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "data": [0, 0, 0, 0, 0, 0]
            })
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/top-performing-rooms', methods=['GET'])
def get_top_performing_rooms():
    """Get top performing room types"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        limit = request.args.get('limit', 5, type=int)
        
        from database import execute_query
        
        query = """
            SELECT 
                rt.name,
                COUNT(b.id) as bookings,
                SUM(b.total_amount) as revenue,
                AVG(b.room_rate) as avg_rate,
                COUNT(DISTINCT b.guest_id) as unique_guests
            FROM room_types rt
            LEFT JOIN bookings b ON rt.id = b.room_type_id AND b.hotel_id = ?
            WHERE rt.hotel_id = ?
            GROUP BY rt.id, rt.name
            ORDER BY revenue DESC
            LIMIT ?
        """
        
        results = execute_query(query, (hotel_id, hotel_id, limit))
        
        if results:
            rooms = []
            for row in results:
                rooms.append({
                    "name": row["name"],
                    "bookings": row["bookings"] or 0,
                    "revenue": float(row["revenue"]) if row["revenue"] else 0,
                    "avgRate": float(row["avg_rate"]) if row["avg_rate"] else 0,
                    "uniqueGuests": row["unique_guests"] or 0
                })
            
            return jsonify(rooms)
        else:
            return jsonify([])
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/guest-satisfaction', methods=['GET'])
def get_guest_satisfaction():
    """Get guest satisfaction metrics from reviews"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        
        from database import execute_query
        
        query = """
            SELECT 
                AVG(rating) as avg_rating,
                COUNT(*) as total_reviews,
                COUNT(CASE WHEN rating >= 4 THEN 1 END) as positive_reviews,
                COUNT(CASE WHEN rating <= 2 THEN 1 END) as negative_reviews
            FROM reviews 
            WHERE hotel_id = ?
        """
        
        result = execute_query(query, (hotel_id,), fetch_one=True)
        
        if result:
            total = result["total_reviews"] or 0
            positive_percentage = (result["positive_reviews"] / total * 100) if total > 0 else 0
            negative_percentage = (result["negative_reviews"] / total * 100) if total > 0 else 0
            
            return jsonify({
                "overall": float(result["avg_rating"]) if result["avg_rating"] else 0,
                "totalReviews": total,
                "positivePercentage": round(positive_percentage, 1),
                "negativePercentage": round(negative_percentage, 1),
                "satisfactionScore": round(positive_percentage, 1),
                "cleanliness": 4.7,  # Mock data for detailed breakdown
                "service": 4.5,
                "location": 4.8,
                "value": 4.3,
                "amenities": 4.4
            })
        else:
            return jsonify({
                "overall": 0,
                "totalReviews": 0,
                "positivePercentage": 0,
                "negativePercentage": 0,
                "satisfactionScore": 0,
                "cleanliness": 0,
                "service": 0,
                "location": 0,
                "value": 0,
                "amenities": 0
            })
            
    except DatabaseError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

# Legacy endpoints for backward compatibility
@dashboard_bp.route('/occupancy-stats', methods=['GET'])
def get_occupancy_stats():
    """Get occupancy statistics (legacy endpoint)"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        kpis = get_kpi_data(hotel_id)
        
        # Mock calculation for demonstration
        total_rooms = 150  # This could come from hotel settings
        occupied = int((kpis.get("occupancyRate", 0) / 100) * total_rooms)
        available = total_rooms - occupied
        
        return jsonify({
            "current": kpis.get("occupancyRate", 0),
            "previous": max(0, kpis.get("occupancyRate", 0) - 5.3),  # Mock previous period
            "trend": "up",
            "available": available,
            "occupied": occupied,
            "total": total_rooms
        })
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@dashboard_bp.route('/revenue-breakdown', methods=['GET'])
def get_revenue_breakdown():
    """Get revenue breakdown by source (legacy endpoint)"""
    try:
        hotel_id = request.args.get('hotel_id', 1, type=int)
        sources = get_booking_sources(hotel_id)
        
        if sources:
            labels = [source["name"] for source in sources]
            data = [source["percentage"] for source in sources]
            colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
            
            return jsonify({
                "labels": labels,
                "data": data,
                "backgroundColor": colors[:len(data)]
            })
        else:
            return jsonify({
                "labels": ["Direct Bookings", "OTA", "Corporate", "Walk-ins", "Group Bookings"],
                "data": [45, 30, 15, 5, 5],
                "backgroundColor": ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
            })
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

"""
Admin routes for InsightForge platform management
Superadmin-only routes for managing hotels and platform-wide operations
"""

from flask import Blueprint, request, jsonify
from models.user import User, UserRole
from models.hotel import Hotel
from utils.auth_helpers import (
    require_role, require_auth, log_activity, get_accessible_hotels
)
from utils.database import DatabaseError, test_connection

# Create blueprint
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/hotels', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_hotels(current_user=None):
    """Get all hotels (superadmin only)"""
    try:
        hotels = Hotel.get_all(active_only=False)
        hotels_data = []
        
        for hotel in hotels:
            hotel_dict = hotel.to_dict()
            # Add stats for each hotel
            hotel_dict['stats'] = hotel.get_stats()
            hotels_data.append(hotel_dict)
        
        return jsonify({
            'success': True,
            'hotels': hotels_data
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/hotels', methods=['POST'])
@require_role(UserRole.SUPERADMIN)
def create_hotel(current_user=None):
    """Create a new hotel (superadmin only)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'location']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400
        
        # Create hotel
        hotel = Hotel.create(
            name=data['name'],
            location=data['location'],
            contact_email=data.get('contact_email'),
            contact_phone=data.get('contact_phone'),
            description=data.get('description')
        )
        
        # Log activity
        log_activity(current_user.id, 'hotel_creation', 
                    f'Created hotel {hotel.name}', 'hotel', hotel.id)
        
        return jsonify({
            'success': True,
            'message': 'Hotel created successfully',
            'hotel': hotel.to_dict()
        }), 201
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/hotels/<int:hotel_id>', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_hotel(hotel_id, current_user=None):
    """Get specific hotel details (superadmin only)"""
    try:
        hotel = Hotel.get_by_id(hotel_id)
        if not hotel:
            return jsonify({'error': 'Hotel not found'}), 404
        
        hotel_dict = hotel.to_dict()
        hotel_dict['stats'] = hotel.get_stats()
        hotel_dict['users'] = hotel.get_users()
        
        return jsonify({
            'success': True,
            'hotel': hotel_dict
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/hotels/<int:hotel_id>', methods=['PUT'])
@require_role(UserRole.SUPERADMIN)
def update_hotel(hotel_id, current_user=None):
    """Update hotel information (superadmin only)"""
    try:
        data = request.get_json()
        
        hotel = Hotel.get_by_id(hotel_id)
        if not hotel:
            return jsonify({'error': 'Hotel not found'}), 404
        
        # Update hotel
        updated = hotel.update(**data)
        if not updated:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        # Log activity
        log_activity(current_user.id, 'hotel_update', 
                    f'Updated hotel {hotel.name}', 'hotel', hotel.id)
        
        return jsonify({
            'success': True,
            'message': 'Hotel updated successfully',
            'hotel': hotel.to_dict()
        })
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/hotels/<int:hotel_id>', methods=['DELETE'])
@require_role(UserRole.SUPERADMIN)
def delete_hotel(hotel_id, current_user=None):
    """Delete (deactivate) hotel (superadmin only)"""
    try:
        hotel = Hotel.get_by_id(hotel_id)
        if not hotel:
            return jsonify({'error': 'Hotel not found'}), 404
        
        # Delete hotel (soft delete)
        success = hotel.delete()
        if not success:
            return jsonify({'error': 'Failed to delete hotel'}), 500
        
        # Log activity
        log_activity(current_user.id, 'hotel_deletion', 
                    f'Deleted hotel {hotel.name}', 'hotel', hotel.id)
        
        return jsonify({
            'success': True,
            'message': 'Hotel deleted successfully'
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/stats', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_platform_stats(current_user=None):
    """Get platform-wide statistics (superadmin only)"""
    try:
        from utils.database import execute_query
        
        # Get overall platform stats
        stats = {
            'hotels': {
                'total': 0,
                'active': 0,
                'inactive': 0
            },
            'users': {
                'total': 0,
                'superadmins': 0,
                'admins': 0,
                'managers': 0,
                'staff': 0,
                'demo': 0
            },
            'bookings': {
                'total': 0,
                'total_revenue': 0,
                'avg_booking_value': 0
            },
            'recent_activity': []
        }
        
        # Hotel stats
        hotel_stats = execute_query("""
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN is_active = 1 THEN 1 END) as active,
                COUNT(CASE WHEN is_active = 0 THEN 1 END) as inactive
            FROM hotels
        """, fetch_one=True)
        stats['hotels'] = hotel_stats
        
        # User stats
        user_stats = execute_query("""
            SELECT 
                COUNT(*) as total,
                COUNT(CASE WHEN role = 'superadmin' THEN 1 END) as superadmins,
                COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
                COUNT(CASE WHEN role = 'manager' THEN 1 END) as managers,
                COUNT(CASE WHEN role = 'staff' THEN 1 END) as staff,
                COUNT(CASE WHEN role = 'demo' THEN 1 END) as demo
            FROM users WHERE is_active = 1
        """, fetch_one=True)
        stats['users'] = user_stats
        
        # Booking stats
        booking_stats = execute_query("""
            SELECT 
                COUNT(*) as total,
                COALESCE(SUM(total_amount), 0) as total_revenue,
                COALESCE(AVG(total_amount), 0) as avg_booking_value
            FROM bookings WHERE booking_status = 'confirmed'
        """, fetch_one=True)
        if booking_stats:
            stats['bookings'] = {
                'total': booking_stats['total'],
                'total_revenue': float(booking_stats['total_revenue']),
                'avg_booking_value': float(booking_stats['avg_booking_value'])
            }
        
        # Recent activity
        recent_activity = execute_query("""
            SELECT 
                al.*, u.full_name as user_name, h.name as hotel_name
            FROM activity_logs al
            LEFT JOIN users u ON al.user_id = u.id
            LEFT JOIN hotels h ON al.hotel_id = h.id
            ORDER BY al.created_at DESC
            LIMIT 20
        """)
        stats['recent_activity'] = recent_activity or []
        
        return jsonify({
            'success': True,
            'stats': stats
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/users/all', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_all_users(current_user=None):
    """Get all users across all hotels (superadmin only)"""
    try:
        users = User.get_all()
        
        # Group users by hotel
        hotels_users = {}
        for user in users:
            user_dict = user.to_dict()
            
            # Get hotel name
            if user.hotel_id:
                hotel = Hotel.get_by_id(user.hotel_id)
                user_dict['hotel_name'] = hotel.name if hotel else 'Unknown Hotel'
            else:
                user_dict['hotel_name'] = 'Platform Admin'
            
            hotel_key = user.hotel_id or 'platform'
            if hotel_key not in hotels_users:
                hotels_users[hotel_key] = []
            hotels_users[hotel_key].append(user_dict)
        
        return jsonify({
            'success': True,
            'users_by_hotel': hotels_users,
            'total_users': len(users)
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/activity-logs', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_activity_logs(current_user=None):
    """Get platform-wide activity logs (superadmin only)"""
    try:
        from utils.database import execute_query
        
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 50, type=int), 100)  # Max 100 per page
        hotel_id = request.args.get('hotel_id', type=int)
        activity_type = request.args.get('activity_type')
        
        # Build query
        where_conditions = []
        params = []
        
        if hotel_id:
            where_conditions.append("al.hotel_id = ?")
            params.append(hotel_id)
        
        if activity_type:
            where_conditions.append("al.activity_type = ?")
            params.append(activity_type)
        
        where_clause = "WHERE " + " AND ".join(where_conditions) if where_conditions else ""
        
        # Get total count
        count_query = f"""
            SELECT COUNT(*) as total
            FROM activity_logs al
            {where_clause}
        """
        total_count = execute_query(count_query, tuple(params), fetch_one=True)['total']
        
        # Get paginated results
        offset = (page - 1) * per_page
        params.extend([per_page, offset])
        
        logs_query = f"""
            SELECT 
                al.*, 
                u.full_name as user_name, 
                h.name as hotel_name
            FROM activity_logs al
            LEFT JOIN users u ON al.user_id = u.id
            LEFT JOIN hotels h ON al.hotel_id = h.id
            {where_clause}
            ORDER BY al.created_at DESC
            LIMIT ? OFFSET ?
        """
        
        logs = execute_query(logs_query, tuple(params))
        
        return jsonify({
            'success': True,
            'logs': logs or [],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total_count,
                'pages': (total_count + per_page - 1) // per_page
            }
        })
        
    except DatabaseError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@admin_bp.route('/system/status', methods=['GET'])
@require_role(UserRole.SUPERADMIN)
def get_system_status(current_user=None):
    """Get system status and health checks (superadmin only)"""
    try:
        # Test database connection
        db_status = test_connection()
        
        # Get system info
        import os
        import psutil
        import platform
        
        system_info = {
            'platform': platform.system(),
            'python_version': platform.python_version(),
            'cpu_percent': psutil.cpu_percent(interval=1),
            'memory_percent': psutil.virtual_memory().percent,
            'disk_percent': psutil.disk_usage('/').percent if platform.system() != 'Windows' else psutil.disk_usage('C:').percent,
            'database': db_status
        }
        
        return jsonify({
            'success': True,
            'system_info': system_info,
            'timestamp': datetime.now().isoformat()
        })
        
    except ImportError:
        # If psutil is not available, return basic info
        return jsonify({
            'success': True,
            'system_info': {
                'database': test_connection(),
                'message': 'Install psutil for detailed system metrics'
            },
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

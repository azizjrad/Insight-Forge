"""
Authentication helper utilities for InsightForge
JWT token handling, decorators, and permission checking
"""

import jwt
import functools
from datetime import datetime, timedelta
from flask import request, jsonify, current_app
from typing import Dict, Any, Optional, Callable
from models.user import User, UserRole
from utils.database import get_db_connection, execute_update

def generate_jwt_token(user: User) -> str:
    """Generate JWT token for authenticated user"""
    payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'hotel_id': user.hotel_id,
        'exp': datetime.utcnow() + timedelta(hours=24),  # Token expires in 24 hours
        'iat': datetime.utcnow(),
        'jti': f"{user.id}_{int(datetime.utcnow().timestamp())}"  # Unique token identifier
    }
    
    secret_key = current_app.config.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    return jwt.encode(payload, secret_key, algorithm='HS256')

def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify JWT token and return payload"""
    try:
        secret_key = current_app.config.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        
        # Check if token is revoked (optional - can implement token blacklist)
        # For now, we'll just verify the user still exists and is active
        user = User.get_by_id(payload['user_id'])
        if not user or not user.is_active:
            return None
            
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_current_user() -> Optional[User]:
    """Get current user from JWT token in request headers"""
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    
    try:
        # Expected format: "Bearer <token>"
        token_type, token = auth_header.split(' ', 1)
        if token_type.lower() != 'bearer':
            return None
    except ValueError:
        return None
    
    payload = verify_jwt_token(token)
    if not payload:
        return None
    
    return User.get_by_id(payload['user_id'])

def log_activity(user_id: Optional[int], activity_type: str, description: str, 
                entity_type: Optional[str] = None, entity_id: Optional[int] = None,
                hotel_id: Optional[int] = None):
    """Log user activity for audit trail"""
    try:
        # Get user's hotel_id if not provided
        if not hotel_id and user_id:
            user = User.get_by_id(user_id)
            if user:
                hotel_id = user.hotel_id
        
        # Get request info
        ip_address = request.remote_addr if request else None
        user_agent = request.headers.get('User-Agent') if request else None
        
        execute_update("""
            INSERT INTO activity_logs 
            (hotel_id, user_id, activity_type, entity_type, entity_id, description, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (hotel_id, user_id, activity_type, entity_type, entity_id, description, ip_address, user_agent))
        
    except Exception as e:
        # Don't fail the main operation if logging fails
        print(f"Failed to log activity: {e}")

# Decorators for route protection

def require_auth(f: Callable) -> Callable:
    """Decorator to require authentication for a route"""
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        
        # Add user to kwargs for easy access in route handler
        kwargs['current_user'] = user
        return f(*args, **kwargs)
    
    return decorated

def require_role(*allowed_roles: str) -> Callable:
    """Decorator to require specific role(s) for a route"""
    def decorator(f: Callable) -> Callable:
        @functools.wraps(f)
        @require_auth
        def decorated(*args, **kwargs):
            current_user = kwargs['current_user']
            
            if current_user.role not in allowed_roles:
                log_activity(current_user.id, 'access_denied', 
                           f"Attempted to access {request.endpoint} without proper role")
                return jsonify({'error': 'Insufficient permissions'}), 403
            
            return f(*args, **kwargs)
        
        return decorated
    return decorator

def require_hotel_access(f: Callable) -> Callable:
    """Decorator to ensure user can only access their hotel's data"""
    @functools.wraps(f)
    @require_auth
    def decorated(*args, **kwargs):
        current_user = kwargs['current_user']
        
        # Superadmin can access any hotel
        if current_user.role == UserRole.SUPERADMIN:
            return f(*args, **kwargs)
        
        # Get hotel_id from request (URL parameter, query parameter, or JSON body)
        hotel_id = None
        
        # Try to get from URL parameters
        if 'hotel_id' in kwargs:
            hotel_id = kwargs['hotel_id']
        
        # Try to get from query parameters
        if not hotel_id:
            hotel_id = request.args.get('hotel_id', type=int)
        
        # Try to get from JSON body
        if not hotel_id and request.is_json:
            hotel_id = request.json.get('hotel_id')
        
        # If no hotel_id specified, use user's hotel
        if not hotel_id:
            hotel_id = current_user.hotel_id
        
        # Check access
        if not current_user.can_access_hotel(hotel_id):
            log_activity(current_user.id, 'access_denied', 
                        f"Attempted to access hotel {hotel_id} data without permission")
            return jsonify({'error': 'Access denied for this hotel'}), 403
        
        # Add hotel_id to kwargs for convenience
        kwargs['hotel_id'] = hotel_id
        return f(*args, **kwargs)
    
    return decorated

def require_permission(permission_check: str) -> Callable:
    """Decorator to require specific permission for a route"""
    def decorator(f: Callable) -> Callable:
        @functools.wraps(f)
        @require_auth
        def decorated(*args, **kwargs):
            current_user = kwargs['current_user']
            
            # Check permission
            has_permission = False
            if permission_check == 'manage_users':
                has_permission = current_user.can_manage_users()
            elif permission_check == 'view_analytics':
                has_permission = current_user.can_view_analytics()
            elif permission_check == 'manage_bookings':
                has_permission = current_user.can_manage_bookings()
            elif permission_check == 'write_access':
                has_permission = not current_user.is_read_only()
            
            if not has_permission:
                log_activity(current_user.id, 'access_denied', 
                           f"Attempted to access {request.endpoint} without {permission_check} permission")
                return jsonify({'error': f'Permission denied: {permission_check}'}), 403
            
            return f(*args, **kwargs)
        
        return decorated
    return decorator

# Utility functions for permission checking

def can_user_access_hotel(user: User, hotel_id: int) -> bool:
    """Check if user can access specific hotel data"""
    return user.can_access_hotel(hotel_id)

def is_superadmin(user: User) -> bool:
    """Check if user is superadmin"""
    return user.role == UserRole.SUPERADMIN

def get_accessible_hotels(user: User) -> list:
    """Get list of hotels user can access"""
    from models.hotel import Hotel
    
    if user.role == UserRole.SUPERADMIN:
        return Hotel.get_all()
    elif user.hotel_id:
        hotel = Hotel.get_by_id(user.hotel_id)
        return [hotel] if hotel else []
    else:
        return []

"""
Authentication routes for InsightForge
Uses the new Database connection class for JWT-based authentication
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from datetime import timedelta
import bcrypt
import hashlib
from connection import execute_query, execute_update, execute_insert, Database

# Create blueprint
auth_bp = Blueprint('auth', __name__)

# User roles
class UserRole:
    SUPERADMIN = 'superadmin'
    ADMIN = 'admin'
    MANAGER = 'manager'
    STAFF = 'staff'
    DEMO = 'demo'

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, password_hash: str) -> bool:
    """Verify password against hash (supports both bcrypt and legacy SHA256)"""
    # Try bcrypt first (new format)
    try:
        if password_hash.startswith('$2b$'):
            return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    except:
        pass
    
    # Fall back to SHA256 (legacy format)
    try:
        sha256_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
        return sha256_hash == password_hash
    except:
        return False

def get_user_by_email(email: str):
    """Get user by email from database"""
    try:
        users = execute_query(
            "SELECT id, hotel_id, name, email, password_hash, role, is_active, phone, last_login, created_at, updated_at FROM users WHERE email = %s AND is_active = true",
            (email,)
        )
        return users[0] if users else None
    except Exception as e:
        print(f"Error getting user by email: {e}")
        return None

def get_user_by_id(user_id: int):
    """Get user by ID from database"""
    try:
        users = execute_query(
            "SELECT id, hotel_id, name, email, password_hash, role, is_active, phone, last_login, created_at, updated_at FROM users WHERE id = %s AND is_active = true",
            (user_id,)
        )
        return users[0] if users else None
    except Exception as e:
        print(f"Error getting user by ID: {e}")
        return None

def update_last_login(user_id: int):
    """Update user's last login timestamp"""
    try:
        from datetime import datetime
        execute_update(
            "UPDATE users SET last_login = %s WHERE id = %s",
            (datetime.now().isoformat(), user_id)
        )
    except Exception as e:
        print(f"Error updating last login: {e}")

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Email and password required'}), 400
        
        email = data['email']
        password = data['password']
        
        # Get user from database
        user = get_user_by_email(email)
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verify password
        if not verify_password(password, user['password_hash']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Update last login
        update_last_login(user['id'])
          # Create JWT token
        access_token = create_access_token(
            identity=str(user['id']),  # Convert to string for JWT
            expires_delta=timedelta(hours=24)
        )
        
        # Return success response
        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'hotel_id': user['hotel_id'],
                'phone': user['phone'],
                'last_login': user['last_login'],
                'created_at': user['created_at']
            }
        })
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    """Verify JWT token and return user info"""
    try:
        current_user_id = int(get_jwt_identity())  # Convert back to int
        user = get_user_by_id(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'valid': True,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'hotel_id': user['hotel_id'],
                'phone': user['phone'],
                'last_login': user['last_login'],
                'created_at': user['created_at']
            }
        })
        
    except Exception as e:
        print(f"Token verification error: {e}")
        return jsonify({'error': 'Token verification failed'}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout endpoint"""
    try:
        # In a production system, you would blacklist the token here
        return jsonify({
            'success': True,
            'message': 'Logged out successfully'
        })
        
    except Exception as e:
        print(f"Logout error: {e}")
        return jsonify({'error': 'Logout failed'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user_id = int(get_jwt_identity())  # Convert back to int
        user = get_user_by_id(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'hotel_id': user['hotel_id'],
                'phone': user['phone'],
                'last_login': user['last_login'],
                'created_at': user['created_at']
            }
        })
        
    except Exception as e:
        print(f"Get profile error: {e}")
        return jsonify({'error': 'Failed to get profile'}), 500

@auth_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    """Get users (admin and superadmin only)"""
    try:
        current_user_id = int(get_jwt_identity())  # Convert back to int
        current_user = get_user_by_id(current_user_id)
        
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Only admin and superadmin can view users
        if current_user['role'] not in [UserRole.SUPERADMIN, UserRole.ADMIN]:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        # Get users based on role
        if current_user['role'] == UserRole.SUPERADMIN:
            # Superadmin can see all users
            users = execute_query(
                "SELECT id, hotel_id, name, email, role, is_active, phone, last_login, created_at FROM users WHERE is_active = true ORDER BY created_at DESC"
            )
        else:
            # Admin can only see users from their hotel
            users = execute_query(
                "SELECT id, hotel_id, name, email, role, is_active, phone, last_login, created_at FROM users WHERE hotel_id = %s AND is_active = true ORDER BY created_at DESC",
                (current_user['hotel_id'],)
            )
        
        return jsonify({
            'success': True,
            'users': users
        })
        
    except Exception as e:
        print(f"Get users error: {e}")
        return jsonify({'error': 'Failed to get users'}), 500

@auth_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    """Register a new user (requires admin or superadmin)"""
    try:
        current_user_id = int(get_jwt_identity())  # Convert back to int
        current_user = get_user_by_id(current_user_id)
        
        if not current_user:
            return jsonify({'error': 'User not found'}), 404
        
        # Only superadmin and admin can create users
        if current_user['role'] not in [UserRole.SUPERADMIN, UserRole.ADMIN]:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        data = request.get_json()
        required_fields = ['name', 'email', 'password', 'role']
        
        if not data or not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        name = data['name']
        email = data['email']
        password = data['password']
        role = data['role']
        hotel_id = data.get('hotel_id')
        phone = data.get('phone')
        
        # Validate role
        valid_roles = [UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.DEMO]
        if role not in valid_roles:
            return jsonify({'error': 'Invalid role'}), 400
        
        # Permission checks
        if current_user['role'] == UserRole.ADMIN:
            # Admin can only create users for their hotel and cannot create superadmin
            if role == UserRole.SUPERADMIN:
                return jsonify({'error': 'Cannot create superadmin users'}), 403
            if hotel_id and hotel_id != current_user['hotel_id']:
                return jsonify({'error': 'Cannot create users for other hotels'}), 403
            # Set hotel_id to admin's hotel if not specified
            hotel_id = current_user['hotel_id']
        
        # Check if email already exists
        existing_user = get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'Email already exists'}), 400
        
        # Hash password
        password_hash = hash_password(password)
        
        # Create user
        user_id = execute_insert(
            "INSERT INTO users (hotel_id, name, email, password_hash, role, phone, is_active, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, true, NOW(), NOW())",
            (hotel_id, name, email, password_hash, role, phone)
        )
        
        # Get the created user
        new_user = get_user_by_id(user_id)
        
        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'user': {
                'id': new_user['id'],
                'name': new_user['name'],
                'email': new_user['email'],
                'role': new_user['role'],
                'hotel_id': new_user['hotel_id'],
                'phone': new_user['phone'],
                'created_at': new_user['created_at']
            }
        }), 201
        
    except Exception as e:
        print(f"Register error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@auth_bp.route('/signup', methods=['POST'])
def public_signup():
    """Public signup endpoint for creating demo accounts"""
    try:
        data = request.get_json()
        required_fields = ['name', 'email', 'password']
        
        if not data or not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        name = data['name']
        email = data['email']
        password = data['password']
        phone = data.get('phone')
        
        # Check if email already exists
        existing_user = get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'Email already exists'}), 400
        
        # Hash password
        password_hash = hash_password(password)
        
        # Create user with demo role and no hotel (public signup)
        user_id = execute_insert(
            "INSERT INTO users (hotel_id, name, email, password_hash, role, phone, is_active, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, true, NOW(), NOW())",
            (None, name, email, password_hash, UserRole.DEMO, phone)
        )
        
        # Get the created user
        new_user = get_user_by_id(user_id)
        
        # Generate JWT token for the new user
        access_token = create_access_token(identity=str(new_user['id']))
        
        return jsonify({
            'success': True,
            'message': 'Account created successfully',
            'access_token': access_token,
            'user': {
                'id': new_user['id'],
                'name': new_user['name'],
                'email': new_user['email'],
                'role': new_user['role'],
                'hotel_id': new_user['hotel_id'],
                'hotel_name': new_user.get('hotel_name'),
                'phone': new_user['phone']
            }
        }), 201
        
    except Exception as e:
        print(f"Public signup error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

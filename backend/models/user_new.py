"""
User model for InsightForge authentication system (compatible with existing schema)
Handles user CRUD operations with role-based permissions
"""

import sqlite3
import bcrypt
from datetime import datetime
from typing import Dict, List, Optional, Any
from utils.database import get_db_connection, DatabaseError

class UserRole:
    """User role constants"""
    SUPERADMIN = 'superadmin'
    ADMIN = 'admin'
    MANAGER = 'manager'
    STAFF = 'staff'
    DEMO = 'demo'
    
    @classmethod
    def get_all_roles(cls):
        return [cls.SUPERADMIN, cls.ADMIN, cls.MANAGER, cls.STAFF, cls.DEMO]
    
    @classmethod
    def is_valid_role(cls, role: str) -> bool:
        return role in cls.get_all_roles()

class User:
    """User model for authentication and authorization"""
    
    def __init__(self, id=None, hotel_id=None, name=None, email=None, password_hash=None,
                 role=None, is_active=True, avatar_url=None, phone=None, 
                 last_login=None, created_at=None, updated_at=None):
        self.id = id
        self.hotel_id = hotel_id
        self.name = name  # This is the existing column name
        self.full_name = name  # Alias for compatibility with new code
        self.email = email
        self.password_hash = password_hash
        self.role = role
        self.is_active = is_active
        self.avatar_url = avatar_url
        self.phone = phone
        self.last_login = last_login
        self.created_at = created_at
        self.updated_at = updated_at
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    @staticmethod
    def verify_password(password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        try:
            return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
        except:
            # Fallback for existing SHA256 hashes
            import hashlib
            sha256_hash = hashlib.sha256(password.encode()).hexdigest()
            return sha256_hash == password_hash
    
    @classmethod
    def create(cls, full_name: str, email: str, password: str, role: str, hotel_id: Optional[int] = None, phone: Optional[str] = None) -> 'User':
        """Create a new user"""
        if not UserRole.is_valid_role(role):
            raise ValueError(f"Invalid role: {role}")
        
        # Superadmin should not have hotel_id
        if role == UserRole.SUPERADMIN:
            hotel_id = None
        elif role != UserRole.DEMO and hotel_id is None:
            raise ValueError(f"Role {role} requires a hotel_id")
        
        password_hash = cls.hash_password(password)
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Check if email already exists
            cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
            if cursor.fetchone():
                raise ValueError("Email already exists")
            
            # Insert new user (using existing schema column names)
            cursor.execute("""
                INSERT INTO users (hotel_id, name, email, password_hash, role, phone)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (hotel_id, full_name, email, password_hash, role, phone))
            
            user_id = cursor.lastrowid
            conn.commit()
            
            return cls.get_by_id(user_id)
    
    @classmethod
    def get_by_id(cls, user_id: int) -> Optional['User']:
        """Get user by ID"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, hotel_id, name, email, password_hash, role, is_active, 
                       avatar_url, phone, last_login, created_at, updated_at
                FROM users WHERE id = ?
            """, (user_id,))
            
            row = cursor.fetchone()
            if row:
                return cls(*row)
            return None
    
    @classmethod
    def get_by_email(cls, email: str) -> Optional['User']:
        """Get user by email"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, hotel_id, name, email, password_hash, role, is_active, 
                       avatar_url, phone, last_login, created_at, updated_at
                FROM users WHERE email = ? AND is_active = 1
            """, (email,))
            
            row = cursor.fetchone()
            if row:
                return cls(*row)
            return None
    
    @classmethod
    def authenticate(cls, email: str, password: str) -> Optional['User']:
        """Authenticate user with email and password"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, hotel_id, name, email, password_hash, role, is_active, 
                       avatar_url, phone, last_login, created_at, updated_at
                FROM users WHERE email = ? AND is_active = 1
            """, (email,))
            
            row = cursor.fetchone()
            if row:
                user = cls(*row)
                if cls.verify_password(password, user.password_hash):
                    # Update last login
                    cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", 
                                 (datetime.now().isoformat(), user.id))
                    conn.commit()
                    user.last_login = datetime.now().isoformat()
                    return user
            return None
    
    @classmethod
    def get_all(cls, hotel_id: Optional[int] = None) -> List['User']:
        """Get all users, optionally filtered by hotel_id"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            if hotel_id is not None:
                cursor.execute("""
                    SELECT id, hotel_id, name, email, password_hash, role, is_active, 
                           avatar_url, phone, last_login, created_at, updated_at
                    FROM users WHERE hotel_id = ? OR role = 'superadmin'
                    ORDER BY created_at DESC
                """, (hotel_id,))
            else:
                cursor.execute("""
                    SELECT id, hotel_id, name, email, password_hash, role, is_active, 
                           avatar_url, phone, last_login, created_at, updated_at
                    FROM users ORDER BY created_at DESC
                """)
            
            users = []
            for row in cursor.fetchall():
                users.append(cls(*row))
            return users
    
    def update(self, **kwargs) -> bool:
        """Update user fields"""
        if not self.id:
            return False
        
        # Map new field names to existing schema
        field_mapping = {
            'full_name': 'name',
            'name': 'name',
            'email': 'email',
            'role': 'role',
            'hotel_id': 'hotel_id',
            'is_active': 'is_active',
            'phone': 'phone',
            'avatar_url': 'avatar_url'
        }
        
        update_fields = []
        values = []
        
        for field, value in kwargs.items():
            db_field = field_mapping.get(field)
            if db_field:
                update_fields.append(f"{db_field} = ?")
                values.append(value)
        
        if not update_fields:
            return False
        
        # Add updated_at
        update_fields.append("updated_at = ?")
        values.append(datetime.now().isoformat())
        values.append(self.id)
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
                UPDATE users SET {', '.join(update_fields)}
                WHERE id = ?
            """, values)
            conn.commit()
            
            # Refresh object data
            updated_user = self.get_by_id(self.id)
            if updated_user:
                self.__dict__.update(updated_user.__dict__)
            return True
    
    def change_password(self, new_password: str) -> bool:
        """Change user password"""
        if not self.id:
            return False
        
        password_hash = self.hash_password(new_password)
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?", 
                         (password_hash, datetime.now().isoformat(), self.id))
            conn.commit()
            self.password_hash = password_hash
            return True
    
    def delete(self) -> bool:
        """Soft delete user (set is_active = 0)"""
        if not self.id:
            return False
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE users SET is_active = 0, updated_at = ? WHERE id = ?", 
                         (datetime.now().isoformat(), self.id))
            conn.commit()
            self.is_active = False
            return True
    
    def can_access_hotel(self, hotel_id: int) -> bool:
        """Check if user can access specific hotel data"""
        if self.role == UserRole.SUPERADMIN:
            return True
        return self.hotel_id == hotel_id
    
    def can_manage_users(self) -> bool:
        """Check if user can manage other users"""
        return self.role in [UserRole.SUPERADMIN, UserRole.ADMIN]
    
    def can_view_analytics(self) -> bool:
        """Check if user can view analytics"""
        return self.role in [UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.MANAGER]
    
    def can_manage_bookings(self) -> bool:
        """Check if user can manage bookings"""
        return self.role in [UserRole.SUPERADMIN, UserRole.ADMIN]
    
    def is_read_only(self) -> bool:
        """Check if user has read-only access"""
        return self.role in [UserRole.STAFF, UserRole.DEMO]
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert user to dictionary (safe for JSON serialization)"""
        return {
            'id': self.id,
            'full_name': self.name,  # Map to expected field name
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'hotel_id': self.hotel_id,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'last_login': self.last_login,
            'phone': self.phone,
            'avatar_url': self.avatar_url
        }

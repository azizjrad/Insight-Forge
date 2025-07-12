"""
User model for InsightForge authentication system
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
      def __init__(self, id=None, name=None, email=None, role=None, hotel_id=None, 
                 is_active=True, created_at=None, last_login=None, phone=None, 
                 password_hash=None, avatar_url=None, updated_at=None):
        self.id = id
        self.name = name  # full_name in new schema
        self.full_name = name  # Alias for compatibility
        self.email = email
        self.role = role
        self.hotel_id = hotel_id
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
        self.last_login = last_login
        self.phone = phone
        self.password_hash = password_hash
        self.avatar_url = avatar_url
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    @staticmethod
    def verify_password(password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
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
            
            # Insert new user
            cursor.execute("""
                INSERT INTO users (full_name, email, password_hash, role, hotel_id, phone)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (full_name, email, password_hash, role, hotel_id, phone))
            
            user_id = cursor.lastrowid
            conn.commit()
            
            return cls.get_by_id(user_id)
    
    @classmethod
    def get_by_id(cls, user_id: int) -> Optional['User']:
        """Get user by ID"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, full_name, email, role, hotel_id, is_active, created_at, last_login, phone
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
                SELECT id, full_name, email, role, hotel_id, is_active, created_at, last_login, phone
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
                SELECT id, full_name, email, password_hash, role, hotel_id, is_active, created_at, last_login, phone
                FROM users WHERE email = ? AND is_active = 1
            """, (email,))
            
            row = cursor.fetchone()
            if row and cls.verify_password(password, row[3]):  # row[3] is password_hash
                # Update last login
                cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", 
                             (datetime.now().isoformat(), row[0]))
                conn.commit()
                
                # Return user without password_hash
                return cls(row[0], row[1], row[2], row[4], row[5], row[6], row[7], row[8], row[9])
            return None
    
    @classmethod
    def get_all(cls, hotel_id: Optional[int] = None) -> List['User']:
        """Get all users, optionally filtered by hotel_id"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            if hotel_id is not None:
                cursor.execute("""
                    SELECT id, full_name, email, role, hotel_id, is_active, created_at, last_login, phone
                    FROM users WHERE hotel_id = ? OR role = 'superadmin'
                    ORDER BY created_at DESC
                """, (hotel_id,))
            else:
                cursor.execute("""
                    SELECT id, full_name, email, role, hotel_id, is_active, created_at, last_login, phone
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
        
        allowed_fields = ['full_name', 'email', 'role', 'hotel_id', 'is_active', 'phone']
        update_fields = []
        values = []
        
        for field, value in kwargs.items():
            if field in allowed_fields:
                update_fields.append(f"{field} = ?")
                values.append(value)
        
        if not update_fields:
            return False
        
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
            cursor.execute("UPDATE users SET password_hash = ? WHERE id = ?", 
                         (password_hash, self.id))
            conn.commit()
            return True
    
    def delete(self) -> bool:
        """Soft delete user (set is_active = 0)"""
        if not self.id:
            return False
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE users SET is_active = 0 WHERE id = ?", (self.id,))
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
            'full_name': self.full_name,
            'email': self.email,
            'role': self.role,
            'hotel_id': self.hotel_id,
            'is_active': self.is_active,
            'created_at': self.created_at,
            'last_login': self.last_login,
            'phone': self.phone
        }

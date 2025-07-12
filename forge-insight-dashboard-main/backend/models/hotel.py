"""
Hotel model for InsightForge platform (compatible with existing schema)
Handles hotel CRUD operations and management
"""

import sqlite3
from datetime import datetime
from typing import Dict, List, Optional, Any
from utils.database import get_db_connection, DatabaseError

class Hotel:
    """Hotel model for multi-tenant architecture"""
    
    def __init__(self, id=None, name=None, address=None, city=None, country=None,
                 created_at=None, email=None, phone=None, website=None, 
                 star_rating=None, total_rooms=None, updated_at=None):
        self.id = id
        self.name = name
        self.address = address
        self.city = city
        self.country = country
        self.created_at = created_at
        self.updated_at = updated_at
        self.email = email
        self.phone = phone
        self.website = website
        self.star_rating = star_rating
        self.total_rooms = total_rooms
        # Create a combined location field for compatibility
        self.location = f"{city}, {country}" if city and country else (address or "Unknown Location")
        # Assume all existing hotels are active
        self.is_active = True
    
    @classmethod
    def create(cls, name: str, address: str, city: str, country: str, 
               email: Optional[str] = None, phone: Optional[str] = None, 
               website: Optional[str] = None, star_rating: Optional[int] = None) -> 'Hotel':
        """Create a new hotel"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Check if hotel name already exists
            cursor.execute("SELECT id FROM hotels WHERE name = ?", (name,))
            if cursor.fetchone():
                raise ValueError("Hotel name already exists")
            
            # Insert new hotel
            cursor.execute("""
                INSERT INTO hotels (name, address, city, country, email, phone, website, star_rating, total_rooms)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, address, city, country, email, phone, website, star_rating, 0))
            
            hotel_id = cursor.lastrowid
            conn.commit()
            
            return cls.get_by_id(hotel_id)
    
    @classmethod
    def get_by_id(cls, hotel_id: int) -> Optional['Hotel']:
        """Get hotel by ID"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, address, city, country, created_at, email, phone, 
                       website, star_rating, total_rooms, updated_at
                FROM hotels WHERE id = ?
            """, (hotel_id,))
            
            row = cursor.fetchone()
            if row:
                return cls(*row)
            return None
    
    @classmethod
    def get_by_name(cls, name: str) -> Optional['Hotel']:
        """Get hotel by name"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, name, address, city, country, created_at, email, phone, 
                       website, star_rating, total_rooms, updated_at
                FROM hotels WHERE name = ?
            """, (name,))
            
            row = cursor.fetchone()
            if row:
                return cls(*row)
            return None
    
    @classmethod
    def get_all(cls, active_only: bool = True) -> List['Hotel']:
        """Get all hotels"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Since existing schema doesn't have is_active, return all hotels
            cursor.execute("""
                SELECT id, name, address, city, country, created_at, email, phone, 
                       website, star_rating, total_rooms, updated_at
                FROM hotels ORDER BY name
            """)
            
            hotels = []
            for row in cursor.fetchall():
                hotels.append(cls(*row))
            return hotels
    
    def update(self, **kwargs) -> bool:
        """Update hotel fields"""
        if not self.id:
            return False
        
        allowed_fields = ['name', 'address', 'city', 'country', 'email', 'phone', 'website', 'star_rating']
        update_fields = []
        values = []
        
        for field, value in kwargs.items():
            if field in allowed_fields:
                update_fields.append(f"{field} = ?")
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
                UPDATE hotels SET {', '.join(update_fields)}
                WHERE id = ?
            """, values)
            conn.commit()
            
            # Refresh object data
            updated_hotel = self.get_by_id(self.id)
            if updated_hotel:
                self.__dict__.update(updated_hotel.__dict__)
            return True
    
    def delete(self) -> bool:
        """Since schema doesn't have is_active, we'll use a different approach"""
        # For now, we'll just mark it with a special flag in the name or skip deletion
        # In a real implementation, you'd add an is_active column or use a separate approach
        return True  # Placeholder - actual deletion logic depends on requirements
    
    def get_stats(self) -> Dict[str, Any]:
        """Get hotel statistics"""
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Get booking stats
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_bookings,
                    COUNT(DISTINCT guest_id) as total_guests,
                    SUM(total_amount) as total_revenue,
                    AVG(total_amount) as avg_booking_value
                FROM bookings 
                WHERE hotel_id = ?
            """, (self.id,))
            booking_stats = cursor.fetchone()
            
            # Get room stats
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_rooms,
                    COUNT(CASE WHEN is_available = 1 THEN 1 END) as available_rooms
                FROM rooms 
                WHERE hotel_id = ?
            """, (self.id,))
            room_stats = cursor.fetchone()
            
            # Get user stats
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_users,
                    COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
                    COUNT(CASE WHEN role = 'manager' THEN 1 END) as manager_users,
                    COUNT(CASE WHEN role = 'staff' THEN 1 END) as staff_users
                FROM users 
                WHERE hotel_id = ? AND is_active = 1
            """, (self.id,))
            user_stats = cursor.fetchone()
            
            return {
                'hotel_id': self.id,
                'hotel_name': self.name,
                'bookings': {
                    'total': booking_stats[0] if booking_stats else 0,
                    'total_guests': booking_stats[1] if booking_stats else 0,
                    'total_revenue': float(booking_stats[2] or 0) if booking_stats else 0,
                    'avg_booking_value': float(booking_stats[3] or 0) if booking_stats else 0
                },
                'rooms': {
                    'total': room_stats[0] if room_stats else 0,
                    'available': room_stats[1] if room_stats else 0,
                    'occupancy_rate': ((room_stats[0] - room_stats[1]) / room_stats[0] * 100) if room_stats and room_stats[0] > 0 else 0
                },
                'users': {
                    'total': user_stats[0] if user_stats else 0,
                    'admins': user_stats[1] if user_stats else 0,
                    'managers': user_stats[2] if user_stats else 0,
                    'staff': user_stats[3] if user_stats else 0
                }
            }
    
    def get_users(self) -> List[Dict[str, Any]]:
        """Get all users for this hotel"""
        from models.user import User
        users = User.get_all(hotel_id=self.id)
        return [user.to_dict() for user in users]
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert hotel to dictionary (safe for JSON serialization)"""
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'country': self.country,
            'location': self.location,  # Combined field for compatibility
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'is_active': self.is_active,
            'email': self.email,
            'phone': self.phone,
            'website': self.website,
            'star_rating': self.star_rating,
            'total_rooms': self.total_rooms
        }

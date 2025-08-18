"""
Database utility functions for InsightForge authentication system
Handles SQLite database connections and common operations
"""

import sqlite3
import os
from contextlib import contextmanager
from typing import Any, Dict, List, Optional

# Database configuration
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'insightforge.db')

class DatabaseError(Exception):
    """Custom exception for database operations"""
    pass

@contextmanager
def get_db_connection():
    """Context manager for database connections with proper error handling"""
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # Enable dict-like access to rows
        # Enable foreign key constraints
        conn.execute("PRAGMA foreign_keys = ON")
        yield conn
    except sqlite3.Error as e:
        if conn:
            conn.rollback()
        raise DatabaseError(f"Database error: {str(e)}")
    except Exception as e:
        if conn:
            conn.rollback()
        raise DatabaseError(f"Unexpected error: {str(e)}")
    finally:
        if conn:
            conn.close()

def init_database():
    """Initialize database with schema"""
    schema_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'schema.sql')
    
    try:
        with open(schema_path, 'r') as f:
            schema_sql = f.read()
        
        with get_db_connection() as conn:
            conn.executescript(schema_sql)
            conn.commit()
            print("✅ Database schema initialized successfully")
            
    except FileNotFoundError:
        raise DatabaseError(f"Schema file not found: {schema_path}")
    except Exception as e:
        raise DatabaseError(f"Failed to initialize database: {str(e)}")

def execute_query(query: str, params: tuple = None, fetch_one: bool = False) -> Any:
    """Execute a SELECT query and return results"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        
        if fetch_one:
            row = cursor.fetchone()
            return dict(row) if row else None
        else:
            rows = cursor.fetchall()
            return [dict(row) for row in rows] if rows else []

def execute_update(query: str, params: tuple = None) -> int:
    """Execute an INSERT, UPDATE, or DELETE query and return affected row count"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        
        affected_rows = cursor.rowcount
        conn.commit()
        return affected_rows

def execute_insert(query: str, params: tuple = None) -> int:
    """Execute an INSERT query and return the last inserted row ID"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        
        last_id = cursor.lastrowid
        conn.commit()
        return last_id

def test_connection() -> Dict[str, Any]:
    """Test database connection and return status"""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Test basic query
            cursor.execute("SELECT COUNT(*) as count FROM sqlite_master WHERE type='table'")
            table_count = cursor.fetchone()[0]
            
            # Get database stats
            cursor.execute("SELECT COUNT(*) FROM users")
            user_count = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM hotels")
            hotel_count = cursor.fetchone()[0]
            
            return {
                'status': 'connected',
                'database_path': DB_PATH,
                'table_count': table_count,
                'user_count': user_count,
                'hotel_count': hotel_count,
                'message': 'Database connection successful'
            }
            
    except Exception as e:
        return {
            'status': 'error',
            'database_path': DB_PATH,
            'error': str(e),
            'message': 'Database connection failed'
        }

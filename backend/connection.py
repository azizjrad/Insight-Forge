"""
Database connection module for InsightForge
Provides singleton pattern for PostgreSQL database connections
Similar to the PHP PDO singleton pattern but adapted for Python and PostgreSQL
"""

import psycopg2
import psycopg2.extras
import os
import threading
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Database:
    """
    Singleton database connection class for PostgreSQL
    Provides thread-safe database connections with proper error handling
    """
    
    _instance = None
    _lock = threading.Lock()
    
    def __init__(self):
        """Private constructor - use getInstance() instead"""
        if Database._instance is not None:
            raise Exception("This class is a singleton! Use getInstance() method.")
        
        # Database configuration
        self._db_config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'port': os.getenv('DB_PORT', '5432'),
            'database': os.getenv('DB_NAME', 'insightforgedb'),
            'user': os.getenv('DB_USER', 'postgres'),
            'password': os.getenv('DB_PASSWORD', 'jradz123'),
            'sslmode': os.getenv('DB_SSLMODE', 'prefer'),
        }
        
        # Initialize connection
        self._conn = None
        self._connect()
    
    def _connect(self):
        """Establish database connection with proper configuration"""
        try:
            self._conn = psycopg2.connect(
                **self._db_config,
                connect_timeout=30,  # 30 seconds timeout
                application_name='InsightForge'
            )
            
            # Configure connection
            self._conn.autocommit = False  # Explicit transaction control
            
            print(f"✅ Database connected successfully: {self._db_config['host']}:{self._db_config['port']}/{self._db_config['database']}")
            
        except psycopg2.Error as e:
            print(f"❌ Database connection failed: {e}")
            raise Exception(f"Database connection failed: {e}")
    
    @classmethod
    def getInstance(cls):
        """
        Get singleton instance of database connection
        Thread-safe implementation
        """
        if cls._instance is None:
            with cls._lock:
                # Double-check locking pattern
                if cls._instance is None:
                    cls._instance = cls()
        
        # Verify connection is still alive
        if not cls._instance._is_connection_alive():
            cls._instance._reconnect()
        
        return cls._instance._conn
    
    def _is_connection_alive(self) -> bool:
        """Check if database connection is still alive"""
        try:
            with self._conn.cursor() as cursor:
                cursor.execute("SELECT 1")
            return True
        except:
            return False
    
    def _reconnect(self):
        """Reconnect to database if connection is lost"""
        try:
            if self._conn:
                self._conn.close()
        except:
            pass
        
        self._connect()
    
    @classmethod
    def get_connection(cls):
        """Alias for getInstance() for better readability"""
        return cls.getInstance()
    
    @classmethod
    def close_connection(cls):
        """Close the database connection"""
        if cls._instance and cls._instance._conn:
            try:
                cls._instance._conn.close()
                print("✅ Database connection closed")
            except psycopg2.Error as e:
                print(f"❌ Error closing database: {e}")
            finally:
                cls._instance = None
    
    @classmethod
    def execute_query(cls, query: str, params: tuple = ()) -> list:
        """
        Execute a SELECT query and return results
        
        Args:
            query: SQL SELECT query
            params: Query parameters tuple
            
        Returns:
            List of rows as dictionaries
        """
        conn = cls.getInstance()
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()
                
                # Convert RealDictRow to regular dict
                return [dict(row) for row in rows]
                
        except psycopg2.Error as e:
            print(f"❌ Query execution failed: {e}")
            print(f"Query: {query}")
            print(f"Params: {params}")
            raise Exception(f"Query execution failed: {e}")
    
    @classmethod
    def execute_update(cls, query: str, params: tuple = ()) -> int:
        """
        Execute an INSERT, UPDATE, or DELETE query
        
        Args:
            query: SQL query
            params: Query parameters tuple
            
        Returns:
            Number of affected rows
        """
        conn = cls.getInstance()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                conn.commit()
                
                return cursor.rowcount
                
        except psycopg2.Error as e:
            conn.rollback()
            print(f"❌ Update execution failed: {e}")
            print(f"Query: {query}")
            print(f"Params: {params}")
            raise Exception(f"Update execution failed: {e}")
    
    @classmethod
    def execute_insert(cls, query: str, params: tuple = ()) -> int:
        """
        Execute an INSERT query and return the last inserted row ID
        
        Args:
            query: SQL INSERT query
            params: Query parameters tuple
            
        Returns:
            Last inserted row ID
        """
        conn = cls.getInstance()
        try:
            with conn.cursor() as cursor:
                # For PostgreSQL, we need to add RETURNING id clause if not present
                if 'RETURNING' not in query.upper():
                    query += ' RETURNING id'
                
                cursor.execute(query, params)
                result = cursor.fetchone()
                conn.commit()
                
                return result[0] if result else None
                
        except psycopg2.Error as e:
            conn.rollback()
            print(f"❌ Insert execution failed: {e}")
            print(f"Query: {query}")
            print(f"Params: {params}")
            raise Exception(f"Insert execution failed: {e}")
    
    @classmethod
    def begin_transaction(cls):
        """Begin a database transaction"""
        conn = cls.getInstance()
        conn.autocommit = False
    
    @classmethod
    def commit_transaction(cls):
        """Commit the current transaction"""
        conn = cls.getInstance()
        conn.commit()
    
    @classmethod
    def rollback_transaction(cls):
        """Rollback the current transaction"""
        conn = cls.getInstance()
        conn.rollback()
    
    @classmethod
    def test_connection(cls) -> bool:
        """Test database connection and return status"""
        try:
            conn = cls.getInstance()
            with conn.cursor() as cursor:
                cursor.execute("SELECT version()")
                version = cursor.fetchone()
                print(f"✅ Database test successful - PostgreSQL version: {version[0]}")
                return True
        except Exception as e:
            print(f"❌ Database test failed: {e}")
            return False


# Convenience functions for easier usage
def get_db_connection():
    """Get database connection instance"""
    return Database.getInstance()

def execute_query(query: str, params: tuple = ()) -> list:
    """Execute SELECT query"""
    return Database.execute_query(query, params)

def execute_update(query: str, params: tuple = ()) -> int:
    """Execute UPDATE/DELETE query"""
    return Database.execute_update(query, params)

def execute_insert(query: str, params: tuple = ()) -> int:
    """Execute INSERT query"""
    return Database.execute_insert(query, params)

def test_db_connection() -> bool:
    """Test database connection"""
    return Database.test_connection()


# Example usage and testing
if __name__ == "__main__":
    print("Testing PostgreSQL Database Connection...")
    
    # Test connection
    if test_db_connection():
        print("✅ Connection test passed")
        
        # Test query execution
        try:
            # Get table list
            tables = execute_query("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            print(f"Tables in database: {[table['table_name'] for table in tables]}")
            
            # Test a simple query
            result = execute_query("SELECT COUNT(*) as count FROM hotels")
            print(f"Hotel count: {result[0]['count'] if result else 0}")
            
        except Exception as e:
            print(f"❌ Query test failed: {e}")
    
    else:
        print("❌ Connection test failed")
        print("Please ensure PostgreSQL is running and database credentials are correct")
        print("Check your .env file or environment variables for database configuration")

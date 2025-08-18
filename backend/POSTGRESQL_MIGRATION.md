# InsightForge PostgreSQL Migration Guide

This guide will help you migrate from SQLite to PostgreSQL for the InsightForge hotel analytics dashboard.

## Prerequisites

1. **PostgreSQL Server**: Install PostgreSQL 12 or higher
2. **Python Packages**: Install required dependencies
3. **Database Access**: Ensure you have PostgreSQL user with database creation privileges

## Installation Steps

### 1. Install PostgreSQL Dependencies

```bash
cd backend
pip install -r requirements.txt
```

The requirements.txt now includes:

- `psycopg2-binary` - PostgreSQL adapter for Python
- `SQLAlchemy` - Optional ORM support

### 2. Configure Database Connection

Update the `.env` file in the backend directory with your PostgreSQL credentials:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=insightforgedb
DB_USER=postgres
DB_PASSWORD=jradz123
DB_SSLMODE=prefer
```

### 3. Create PostgreSQL Database

Run the database creation script:

```bash
python create_database.py
```

This will:

- Connect to PostgreSQL server
- Create the `insightforgedb` database
- Handle existing database conflicts

### 4. Initialize Database Schema and Data

Run the initialization script:

```bash
python init_database.py
```

This will:

- Create all tables using the PostgreSQL schema
- Insert sample seed data
- Verify the database setup

## Key Changes Made

### Database Schema (`insightforgeDB.sql`)

- **Auto-increment**: `SERIAL PRIMARY KEY` instead of `INTEGER PRIMARY KEY AUTOINCREMENT`
- **Timestamps**: `TIMESTAMP` instead of `DATETIME`
- **Boolean values**: `TRUE/FALSE` instead of `1/0`
- **JSON support**: `JSONB` for better performance and indexing
- **IP addresses**: `INET` type for proper IP storage
- **Generated columns**: Native PostgreSQL date arithmetic
- **Extensions**: Added `uuid-ossp` and `pgcrypto`

### Connection Module (`connection.py`)

- **Driver**: `psycopg2` instead of `sqlite3`
- **Connection pooling**: Thread-safe singleton pattern
- **Parameter binding**: `%s` placeholders instead of `?`
- **Cursor handling**: Context managers for better resource management
- **Error handling**: PostgreSQL-specific error types

### Database Module (`database.py`)

- **Query syntax**: Updated all SQL queries for PostgreSQL compatibility
- **Parameter binding**: Changed from `?` to `%s` placeholders
- **Result handling**: RealDictCursor for dictionary-like access
- **Date handling**: Improved date parsing for PostgreSQL date types

### Environment Configuration

- **Database URL**: PostgreSQL connection string
- **SSL Mode**: Configurable SSL connection mode
- **Connection parameters**: Host, port, database, user, password

## Database Features

### New PostgreSQL-Specific Features

1. **JSONB Columns**: Better performance for JSON data in `amenities` and `metadata`
2. **GIN Indexes**: Optimized indexing for JSONB columns
3. **Views**: Pre-built views for common queries
4. **Comments**: Table and column documentation
5. **Advanced Functions**: PostgreSQL-specific functions for data processing

### Performance Improvements

- **Connection pooling**: Singleton pattern for efficient connections
- **Prepared statements**: Better query performance
- **Indexing**: Optimized indexes for common queries
- **Transaction handling**: Explicit transaction control

## Testing the Migration

### 1. Test Database Connection

```bash
python connection.py
```

### 2. Test Database Queries

```bash
python database.py
```

### 3. Start the Flask Application

```bash
python app.py
```

### 4. Verify API Endpoints

- `GET /api/dashboard/kpis` - Dashboard metrics
- `GET /api/dashboard/revenue-trends` - Revenue charts
- `GET /api/dashboard/bookings` - Booking data

## Troubleshooting

### Common Issues

1. **Connection Refused**

   - Ensure PostgreSQL server is running
   - Check host and port configuration
   - Verify firewall settings

2. **Authentication Failed**

   - Check username and password in `.env`
   - Verify user exists in PostgreSQL
   - Check pg_hba.conf for authentication method

3. **Database Does Not Exist**

   - Run `python create_database.py` first
   - Ensure user has CREATE DATABASE privilege

4. **Missing Dependencies**
   - Install: `pip install psycopg2-binary`
   - On some systems: `apt-get install python3-dev libpq-dev`

### PostgreSQL Commands

Connect to PostgreSQL:

```bash
psql -h localhost -U postgres -d insightforgedb
```

List databases:

```sql
\l
```

List tables:

```sql
\dt
```

Check table structure:

```sql
\d table_name
```

## Migration Benefits

1. **Scalability**: PostgreSQL handles larger datasets better
2. **Concurrency**: Better support for multiple concurrent users
3. **Data Types**: Rich set of native data types (JSONB, INET, etc.)
4. **Performance**: Advanced indexing and query optimization
5. **Reliability**: ACID compliance and data integrity
6. **Features**: Advanced SQL features and extensions

## Rollback Plan

If you need to rollback to SQLite:

1. Keep the original SQLite files
2. Restore the original `connection.py` and `database.py`
3. Update `.env` to use SQLite configuration
4. Restart the application

## Support

For issues or questions:

1. Check PostgreSQL logs: `/var/log/postgresql/`
2. Review Flask application logs
3. Verify network connectivity
4. Check PostgreSQL documentation: https://postgresql.org/docs/

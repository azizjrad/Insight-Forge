# InsightForge Database

This folder contains all database-related files for the InsightForge hospitality analytics platform.

## Structure
- `schema.sql` — Main PostgreSQL schema for all core entities and relationships.
- `seed.sql` — Example seed data for development and testing.
- `migrations/` — (Optional) Folder for incremental migration scripts.

## Usage
- Use `schema.sql` to initialize a new PostgreSQL database.
- Use `seed.sql` to populate the database with sample data.
- For production, manage changes using migration scripts in the `migrations/` folder.

---

**This database is designed for scalability, security, and analytics performance, supporting all core features and KPIs of the InsightForge platform.** 
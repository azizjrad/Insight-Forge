# InsightForge Dashboard

A comprehensive hotel analytics dashboard with real-time data visualization, user management, and advanced authentication system.

## 🚀 Recent Updates

### ✅ **Authentication System - FULLY IMPLEMENTED**

- **Database-Connected User Registration**: Public signup endpoint creates demo accounts
- **JWT-Based Authentication**: Secure token-based login system
- **Password Security**: bcrypt hashing for secure password storage
- **Role-Based Access**: Demo, Staff, Manager, Admin, and Superadmin roles
- **Working Credentials**: `/`

### ✅ **Enhanced UI Components**

- **Glass Morphism Design**: Modern navbar with backdrop blur effects
- **Performance Metrics Dashboard**: RevPAR, GOPPAR, Guest Satisfaction KPIs
- **Loading System**: Beautiful loading screens with progress indicators
- **Responsive Testimonials**: Carousel-based testimonials section

### ✅ **Backend Infrastructure**

- **PostgreSQL Database**: Production-ready database with proper schema
- **API Endpoints**: Complete REST API with authentication routes
- **Error Handling**: Comprehensive error management and validation
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize database** (if not already done):

   ```bash
   python init_database.py
   ```

4. **Start Flask backend**:
   ```bash
   python app.py
   ```
   Backend will run at `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment** (important!):

   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Edit .env.local and set your API URL:
   VITE_API_BASE_URL=http://localhost:5000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:5173`

## 🔐 Authentication & User Management

### Default Admin Credentials

- **Email**: ``
- **Password**: ``

### User Registration

Users can now create accounts through:

- **Public Signup**: `/register` page for creating demo accounts
- **Admin Registration**: Admin-only user creation with role assignment
- **Database Integration**: All users stored in PostgreSQL with proper validation

### Supported Roles

- **Demo**: Public users with limited access
- **Staff**: Basic hotel staff access
- **Manager**: Department-level management access
- **Admin**: Hotel-level administrative access
- **Superadmin**: System-wide administrative access

## 📊 Features

### Dashboard & Analytics

- **Real-time KPIs**: Occupancy rates, ADR, RevPAR, GOPPAR
- **Performance Metrics**: Guest satisfaction, revenue trends
- **Booking Analytics**: Channel distribution, lead time analysis
- **Guest Insights**: Demographics and behavior analysis

### User Experience

- **Modern UI**: Glass morphism design with responsive layouts
- **Loading States**: Smooth loading animations and progress indicators
- **Navigation**: Intuitive sidebar navigation with role-based menus
- **Notifications**: Admin notification center with real-time updates

### Backend Capabilities

- **Database Management**: PostgreSQL with comprehensive schema
- **API Security**: JWT authentication with bcrypt password hashing
- **Error Handling**: Detailed error responses and logging
- **CORS Support**: Configured for development and production

## 🏗️ Architecture

```
Frontend (React/Vite)     Backend (Flask)           Database (PostgreSQL)
http://localhost:5173 ←→ http://localhost:5000 ←→ PostgreSQL Database
      ↓                        ↓                       ↓
- Glass Morphism UI       - JWT Authentication     - User Management
- Loading Components      - Public Signup API      - Role-Based Access
- Dashboard Analytics     - Admin Routes           - Secure Password Storage
- Registration System     - CORS Configuration     - Comprehensive Schema
```

## 🔧 Environment Configuration

### Development (.env.local)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Production (.env.production)

```env
VITE_API_BASE_URL=https://your-production-api.com
```

## 📁 Project Structure

```
├── backend/
│   ├── app.py              # Flask application
│   ├── routes/
│   │   ├── auth.py         # Authentication routes (login, signup)
│   │   ├── dashboard.py    # Dashboard data endpoints
│   │   └── admin.py        # Admin management routes
│   ├── models/
│   │   ├── user.py         # User model and database operations
│   │   └── hotel.py        # Hotel model and schema
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard widgets and charts
│   │   ├── admin/          # Admin panel components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/
│   │   ├── AuthContext.tsx # Authentication state management
│   │   └── LoadingContext.tsx # Loading state management
│   ├── pages/
│   │   ├── auth/           # Login and registration pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── admin/          # Admin panel pages
│   └── lib/
│       ├── api.ts          # API service layer
│       └── utils.ts        # Utility functions
```

## 🔨 Development Commands

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # TypeScript type checking
```

### Backend

```bash
python app.py                # Start Flask server
python init_database.py      # Initialize database
python init_auth_system.py   # Setup authentication
```

## 🚀 Deployment

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production

### Backend Deployment

1. Install Python dependencies in production environment
2. Configure PostgreSQL database connection
3. Set up proper environment variables
4. Deploy Flask application using WSGI server

## 🛠️ Technologies Used

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **React Router** for navigation

### Backend

- **Flask** web framework
- **PostgreSQL** database
- **psycopg2** database adapter
- **bcrypt** for password hashing
- **Flask-JWT-Extended** for authentication
- **Flask-CORS** for cross-origin requests

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - Public user registration
- `POST /api/auth/register` - Admin user creation
- `POST /api/auth/verify` - Token verification
- `POST /api/auth/logout` - User logout

### Dashboard Endpoints

- `GET /api/kpis` - Key performance indicators
- `GET /api/revenue-trends` - Revenue trend data
- `GET /api/bookings-by-month` - Booking analytics
- `GET /api/recent-activity` - Recent activity logs

### Admin Endpoints

- `GET /api/admin/users` - User management
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Errors**

   - Verify database connection
   - Check if admin user exists
   - Confirm JWT configuration

2. **API Connection Issues**

   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify environment variables

3. **Database Issues**
   - Run `python init_database.py` to recreate schema
   - Check PostgreSQL connection string
   - Verify database permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React and Flask technologies
- UI components from shadcn/ui
- Authentication system with JWT and bcrypt
- Database integration with PostgreSQL

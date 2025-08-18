"""
Flask application factory for InsightForge Backend
"""
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.dashboard import dashboard_bp
from routes.auth import auth_bp
from routes.admin import admin_bp

def create_app():
    """Create and configure the Flask app"""
    app = Flask(__name__)
    
    # Configure JWT
    app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-in-production'  # Change this in production
    jwt = JWTManager(app)
    
    # Configure CORS
    CORS(app, origins=[
        'http://localhost:5173', 
        'http://127.0.0.1:5173',
        'http://localhost:8082',
        'http://127.0.0.1:8082'
    ])
    
    # Register blueprints
    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    @app.route('/')
    def index():
        return {
            'message': 'InsightForge Backend API',
            'version': '1.0.0',
            'endpoints': [
                '/api/kpis',
                '/api/revenue-trends',
                '/api/bookings-by-month',
                '/api/room-type-distribution',
                '/api/recent-activity',
                '/api/auth/login',
                '/api/auth/verify',
                '/api/admin/users'
            ]
        }
    
    @app.route('/api/database-status')
    def database_status():
        """Check database connectivity"""
        try:
            from database import test_database_connection
            status = test_database_connection()
            return status
        except Exception as e:
            return {'error': str(e), 'status': 'error'}, 500
    
    return app

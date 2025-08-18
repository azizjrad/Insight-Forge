"""
Run script for InsightForge Flask Backend
"""
from app import create_app
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == '__main__':
    app = create_app()
    
    # Get configuration from environment
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"Starting InsightForge Backend on http://{host}:{port}")
    print(f"Debug mode: {'ON' if debug else 'OFF'}")
    print(f"API endpoints available at: http://{host}:{port}/api")
    
    app.run(
        host=host,
        port=port,
        debug=debug
    )

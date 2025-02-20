from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import logging
from db.db import DBManager
from routes.user_routes import user_bp
from routes.ride_routes import ride_bp


class FlaskApp:
    def __init__(self):
        load_dotenv()  # Load environment variables
        self.app = Flask(__name__)
        self.configure_app()
        DBManager.initialize_db(self.app)
        self.register_blueprints()
        self.is_development = os.environ.get('FLASK_ENV') == 'DEVELOPMENT'

    def configure_app(self):
        self.app.config['MONGODB_SETTINGS'] = {
            'db': 'truest-ride',
            'host': os.environ.get('MONGODB_URI'),
        }

        CORS(self.app)  # Enable CORS for all routes

        if os.environ.get('FLASK_ENV') == 'PRODUCTION':
            logging.baseConfig(
                format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}', level=logging.INFO)

    def register_blueprints(self):
        self.app.register_blueprint(user_bp, url_prefix='/api/v1/users')
        self.app.register_blueprint(ride_bp, url_prefix='/api/v1/rides')

    def run(self):
        # Get PORT from .env or use 5000 as default
        PORT = int(os.environ.get('PORT', 5000))
        self.app.run(host='0.0.0.0', port=PORT, debug=self.is_development)


# Create an instance of FlaskApp
flask_app = FlaskApp()

# Get the Flask app instance
app = flask_app.app

# Main Execution
if __name__ == '__main__':
    flask_app.run()

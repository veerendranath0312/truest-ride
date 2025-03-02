from flask import Flask
from flask_cors import CORS
from flask_security import Security, MongoEngineUserDatastore
from dotenv import load_dotenv
import os
import logging
from utils.config import Config
from services.mail_service import MailService
from db.db import DBManager
from models.user import User
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.ride_routes import ride_bp

# TODO: Implement the rate limiter
class FlaskApp:
    def __init__(self):
        load_dotenv()  # Load environment variables
        self.app = Flask(__name__)
        self.configure_app()
        self.db = DBManager.initialize_db(self.app)
        self.mail_service = MailService()
        self.mail_service.init_app(self.app)
        self.configure_security()
        self.register_blueprints()
        self.is_development = os.environ.get('FLASK_ENV') == 'DEVELOPMENT'

    def configure_app(self):
        self.app.config.from_object(Config)

        CORS(self.app)  # Enable CORS for all routes

        if os.environ.get('FLASK_ENV') == 'PRODUCTION':
            logging.baseConfig(
                format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}', level=logging.INFO)

    def configure_security(self):
        user_datastore = MongoEngineUserDatastore(self.db, User, None)
        security = Security(self.app, user_datastore)

    def register_blueprints(self):
        self.app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
        self.app.register_blueprint(user_bp, url_prefix='/api/v1/users')
        self.app.register_blueprint(ride_bp, url_prefix='/api/v1/rides')

    def run(self):
        # Get PORT from .env or use 5000 as default
        port = int(os.environ.get('PORT', 5000))
        self.app.run(host='0.0.0.0', port=port, debug=self.is_development)


# Create an instance of FlaskApp
flask_app = FlaskApp()

# Get the Flask app instance
app = flask_app.app

# Main Execution
if __name__ == '__main__':
    flask_app.run()

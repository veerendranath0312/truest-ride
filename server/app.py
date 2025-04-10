import os
import logging

from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt_identity, get_current_user
from flask_socketio import SocketIO, disconnect
from apscheduler.schedulers.background import BackgroundScheduler

from db.db import DBManager
from models.user import User
from utils.config import Config
from controllers.chat_controllers import ChatController
from services.mail_service import MailService
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.ride_routes import ride_bp

# TODO: Implement the rate limiter
class FlaskApp:
    def __init__(self):
        load_dotenv()  # Load environment variables
        self.app = Flask(__name__)

        # Configure app before initializing extensions
        self.configure_app()

        # Initialize Socket.IO with explicit CORS settings
        self.socketio = SocketIO(self.app, cors_allowed_origins=self.app.config['CORS_ORIGINS'])

        self.db = DBManager.initialize_db(self.app)
        self.jwt = JWTManager(self.app)
        self.mail_service = MailService()
        self.mail_service.init_app(self.app)
        self.register_blueprints()
        self.is_development = os.environ.get('FLASK_ENV') == 'DEVELOPMENT'
        self.setup_jwt_callbacks()
        self.register_socketio_events()
        self.setup_scheduler()
        self.app.user_socket_map = {}  # Map user_ids to socket_ids

    def configure_app(self):
        self.app.config.from_object(Config)

        # Configure CORS for REST endpoints
        CORS(self.app, origins=self.app.config['CORS_ORIGINS'])

        if os.environ.get('FLASK_ENV') == 'PRODUCTION':
            logging.baseConfig(
                format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}', level=logging.INFO)

    def register_blueprints(self):
        self.app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
        self.app.register_blueprint(user_bp, url_prefix='/api/v1/users')
        self.app.register_blueprint(ride_bp, url_prefix='/api/v1/rides')

    def register_socketio_events(self):
        @self.socketio.on('connect')
        def handle_connect():
            try:
                token = request.args.get('token')
                if not token:
                    print("No token provided")
                    disconnect()
                    return False

                request.headers = {'Authorization': f'Bearer {token}'}
                verify_jwt_in_request()
                user_id = get_jwt_identity()
                user = User.objects(id=user_id).first()

                if not user:
                    print("User not found")
                    disconnect()
                    return False

                # Store the user's socket connection
                self.app.user_socket_map[str(user.id)] = request.sid
                print(f"User {user.id} connected with socket ID: {request.sid}")
                return True
            except Exception as e:
                print(f"Connection authentication failed: {str(e)}")
                disconnect()
                return False

        @self.socketio.on('disconnect')
        def handle_disconnect():
            try:
                sid = request.sid
                # Find and remove the user from the socket map
                user_id = None
                for uid, socket_sid in self.app.user_socket_map.items():
                    if socket_sid == sid:
                        user_id = uid
                        del self.app.user_socket_map[uid]
                        break
                print(f"Client disconnected: {sid} (User ID: {user_id})")
            except Exception as e:
                print(f"Error in handle_disconnect: {str(e)}")

        @self.socketio.on('join_chat')
        def handle_join_chat(data):
            ChatController.join_chat(data['chat_id'])

        @self.socketio.on('leave_chat')
        def handle_leave_chat(data):
            ChatController.leave_chat(data['chat_id'])

        def authenticate_socket(data=None):
            try:
                # First try to get token from data if provided
                token = data.get('token') if data else None
                # If not in data, try to get from connection query
                if not token:
                    token = request.args.get('token')
                if not token:
                    return False

                # Set token in request context
                request.headers = {'Authorization': f'Bearer {token}'}
                verify_jwt_in_request()
                return True
            except Exception as e:
                return False

        @self.socketio.on('send_message')
        def handle_send_message(data):
            try:
                if not authenticate_socket(data):
                    return {'status': 'fail', 'message': 'Authentication required'}, 401

                result = ChatController.send_message(data)
                return result
            except Exception as e:
                return {'status': 'fail', 'message': str(e)}

        @self.socketio.on('delete_chat')
        def handle_delete_chat(data):
            ChatController.delete_chat(data['chat_id'])

    def run(self):
        # Get PORT from .env or use 5000 as default
        port = int(os.environ.get('PORT', 5000))
        self.socketio.run(self.app, host='0.0.0.0', port=port, debug=self.is_development)

    def setup_jwt_callbacks(self):
        @self.jwt.user_lookup_loader
        def user_lookup_callback(_jwt_header, jwt_data):
            identity = jwt_data["sub"]
            user = User.objects(id=identity).first()
            return user if user else None

        @self.jwt.expired_token_loader
        def expired_token_callback(jwt_header, jwt_data):
            return {
                'status' : "fail",
                'data': {
                    'token': 'The token has expired'
                },
            }, 401

        @self.jwt.invalid_token_loader
        def invalid_token_callback(error):
            return {
                'status': "fail",
                'data': {
                    'token': 'Invalid token'
                },
            }, 401

        @self.jwt.unauthorized_loader
        def unauthorized_callback(error):
            return {
                "status": "error",
                'data': {
                    'token': 'Authorization token is missing'
                },
            }, 401


    @staticmethod
    def setup_scheduler():
        scheduler = BackgroundScheduler()
        scheduler.add_job(
            func=ChatController.disable_expired_chats,
            trigger="interval",
            hours=24,
            id='disable_expired_chats',
            replace_existing=True
        )
        scheduler.start()

# Create an instance of FlaskApp
flask_app = FlaskApp()

# Get the Flask app instance
app = flask_app.app

# Main Execution
if __name__ == '__main__':
    flask_app.run()

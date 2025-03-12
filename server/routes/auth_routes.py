import os
from datetime import datetime, timezone, timedelta
from flask import Blueprint, request
from flask_jwt_extended import get_jwt, get_jwt_identity, create_access_token, set_access_cookies
from controllers.auth_controllers import AuthController

auth_bp = Blueprint('auth', __name__)

# Using an `after_request` callback, it refreshes any
# token that is within 10 minutes of expiring.
@auth_bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=int(os.environ.get('JWT_COOKIE_REFRESH_TIME'))))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    return AuthController.signup(data)


@auth_bp.route('/verify-signup', methods=['POST'])
def verify_signup():
    data = request.get_json()
    return AuthController.verify_signup(data)


@auth_bp.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    return AuthController.signin(data)


@auth_bp.route('/verify-signin', methods=['POST'])
def verify_signin():
    data = request.get_json()
    return AuthController.verify_signin(data)

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return AuthController.logout()

# TODO: Test the routes with the cookies later
# TODO: Both the frontend and backend need to be tested
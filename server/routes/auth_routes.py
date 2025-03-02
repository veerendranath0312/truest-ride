from flask import Blueprint, request
from controllers.auth_controllers import AuthController

auth_bp = Blueprint('auth', __name__)


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

from flask import Blueprint, request
from controllers.user_controllers import UserController

user_bp = Blueprint('users', __name__)


@user_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        return UserController.register_user(data)
    else:
        return {"message": "Invalid request method"}, 405


@user_bp.route('/signin', methods=['POST'])
def sign_in():
    credentials = request.get_json()
    return UserController.authenticate_user(credentials)

from flask import Blueprint, request
from controllers.user_controllers import UserController

user_bp = Blueprint('users', __name__)

# Follow JSend speficication for response format


@user_bp.route('/<id>', methods=['GET', 'DELETE'])
def user(id):
    if request.method == 'GET':
        return UserController.get_user_by_id(id)
    elif request.method == 'DELETE':
        return UserController.delete_user_by_id(id)
    else:
        return {
            "status": "error",
            "message": "Invalid request method"
        }, 405

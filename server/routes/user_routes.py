from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.user_controllers import UserController

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    return UserController.get_all_users()

@user_bp.route('/<string:user_id>', methods=['GET', 'PUT'])
@jwt_required()
def user(user_id):
    if request.method == 'GET':
        return UserController.get_user(user_id)
    elif request.method == 'PUT':
        data = request.get_json()
        return UserController.update_user(user_id, data)
    elif request.method == 'DELETE':
        data = request.get_json()
        return UserController.delete_user(user_id, data)
    else:
        return {
            "status": "error",
            "message": "Invalid request method"
        }, 405

@user_bp.route('/<string:user_id>/initiate-delete', methods=['DELETE'])
@jwt_required()
def initiate_delete_user(user_id):
    return UserController.initiate_delete_user(user_id)

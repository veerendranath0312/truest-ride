from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.user_controllers import UserController
from controllers.chat_controllers import ChatController
user_bp = Blueprint('users', __name__)

@user_bp.route('', methods=['GET', 'DELETE'])
@jwt_required()
def users():
    if request.method == 'GET':
        return UserController.get_all_users()
    elif request.method == 'DELETE':
        data = request.get_json()
        return UserController.delete_user(data)

@user_bp.route('/initiate-delete', methods=['POST'])
@jwt_required()
def initiate_delete_user():
    data = request.get_json()
    return UserController.initiate_delete_user(data)

@user_bp.route('/<string:user_id>', methods=['GET', 'PATCH'])
@jwt_required()
def user(user_id):
    if request.method == 'GET':
        return UserController.get_user(user_id)
    elif request.method == 'PATCH':
        data = request.get_json()
        return UserController.update_user(user_id, data)
    else:
        return {
            "status": "error",
            "message": "Invalid request method"
        }, 405

@user_bp.route('/chats', methods=['GET'])
@jwt_required()
def get_user_chats():
    return ChatController.get_user_chats()

@user_bp.route('/chats/<string:chat_id>', methods=['GET'])
@jwt_required()
def get_chat_messages(chat_id):
    return ChatController.get_chat_messages(chat_id)



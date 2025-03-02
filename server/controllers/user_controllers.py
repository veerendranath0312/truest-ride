from models.user import User


class UserController:
    @staticmethod
    def get_user_by_id():
        return {
            "status": "success",
            "message": "User retrieved successfully",
            # "data": User.get_user(data)
        }, 200

    @staticmethod
    def delete_user_by_id(data):
        return {
            "status": "success",
            "message": "User deleted successfully",
        }, 204

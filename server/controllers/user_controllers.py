from models.user import User


class UserController:
    @staticmethod
    def get_all_users():
        return {
            "status": "success",
            "data": {
                "users": [user.to_json() for user in User.objects.all()]
            }
        }, 200

    @staticmethod
    def get_user(user_id):
        return {
            "status": "success",
            "data": {
                "user": User.objects(id=user_id).first().to_json()
            }
        }, 200

    @staticmethod
    def update_user(user_id, data):
        # Check if the user_id and data exists
        # Check if the user_id exists in the database
        # Check if the data is valid
        # Update the user details
        # Return appropriate response with status code
        pass

    # This is used to delete a user account
    @staticmethod
    def initiate_delete_user(user_id):
        # When the user clicks on the delete account button,
        # Check if the user is authorized to perform this action
        # A secure 6 digit OTP will be generated
        # The OTP will be hashed and stored in the database ()
        # The OTP will be sent to the user's email
        # Return appropriate response with status code
        pass

    @staticmethod
    def delete_user(user_id, data):
        # Check if the user_id and data exists
        # Check if the user_id exists in the database
        # Check if the OTP is valid
        # If the OTP is expired or invalid, return appropriate response with status code
            # Return appropriate response with status code
        # If the OTP is not expired and valid, delete the user account
            # Return appropriate response with status code
        pass
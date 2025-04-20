from datetime import datetime, timezone
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
        try:
            # Find the user
            user = User.objects(id=user_id).first()
            if not user:
                return {"status": "error", "message": "User not found"}, 404

            # Map incoming keys to database fields
            key_mapping = {
                "fullname": "full_name",
                "place": "place",
                "university": "university",
                "universityStartDate": "university_start_date",
                "universityEndDate": "university_end_date",
                "gender": "gender",
                "age": "age",
                "imageUrl": "image_url"
            }

            # Filter and transform data
            update_data = {}
            for key, value in data.items():
                if key in key_mapping:
                    field = key_mapping[key]
                    if field == "age":
                        try:
                            value = int(value)
                            if not (18 <= value <= 100):
                                return {"status": "error", "message": "Age must be between 18 and 100"}, 400
                        except ValueError:
                            return {"status": "error", "message": "Age must be a valid number"}, 400
                    elif field in ["university_start_date", "university_end_date"] and value:
                        try:
                            value = datetime.fromisoformat(value.replace("Z", "+00:00"))
                        except ValueError:
                            return {"status": "error", "message": f"Invalid date format for {field}"}, 400
                    update_data[field] = value

            # Perform atomic update
            updated_user = User.objects(id=user_id).modify(
                new=True,
                **{f"set__{k}": v for k, v in update_data.items()}
            )

            if not updated_user:
                return {"status": "error", "message": "User not found"}, 404

            return {
                "status": "success",
                "data": {"user": updated_user.to_json()}
            }, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

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
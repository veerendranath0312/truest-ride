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
        if not user_id or not data:
            return {"status": "error", "message": "User ID and update data required"}, 400
        # Check if the user_id exists in the database
        user = User.objects(id=user_id).first()
        if not user:
            return {"status": "error", "message": "User not found"}, 404
        
        # Check if the data is valid
        valid_fields = {"name", "email", "phone"}  # Add more fields as necessary
        update_data = {key: value for key, value in data.items() if key in valid_fields}
        
        if not update_data:
            return {"status": "error", "message": "No valid fields provided for update"}, 400
        # Update the user details
        user.update(**update_data)
        return {"status": "success", "message": "User updated successfully"}, 200
        # Return appropriate response with status code
        pass

    # This is used to delete a user account
    @staticmethod
    def initiate_delete_user(user_id):
        # When the user clicks on the delete account button,
        # Check if the user is authorized to perform this action
        user = User.objects(id=user_id).first()
        if not user:
            return {"status": "error", "message": "User not found"}, 404
        # A secure 6 digit OTP will be generated
        otp = random.randit(100000, 999999)
        hashed_otp = hashlib.sha256(str(otp).encode()).hexdigest()
        otp_store[user_id] = {"otp": hashed_otp, "expires_at": datetime.datetime.utcnow() + datetime.timedelta(minutes=5)}
        
        # The OTP will be hashed and stored in the database ()
        # The OTP will be sent to the user's email
        #TODO: user
        # Return appropriate response with status code
        return {"status": "success", "message": "OTP sent to registered email"}, 200
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
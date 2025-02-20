from models.user import User


class UserController:
    @staticmethod
    def register_user(data):
        # Check if the email is a valid educational email
        # Check if the user is already registered
        # Genenerate a secure 6-digit OTP
        # Store the OTP in the database: OTPRecord
        # Send the OTP to the user's email
        # Validate the OTP entered by the user with the OTP stored in the database
        # If the OTP is valid, create a new user
        # -- return a success messge
        # else return an error message
        return {"message": "User registered successfully"}

    @staticmethod
    def authenticate_user(data):
        # Check if the email is a valid educational email
        # Generate a secure 6-digit OTP
        # Store the OTP in the database: OTPRecord
        # Send the OTP to the user's email
        # validate the OTP entered by the user with the OTP stored in the database
        # If the OTP is valid, sign in the user
        # -- return a JWT token and a success message
        # else return an error message
        return {"message": "User signed in successfully"}

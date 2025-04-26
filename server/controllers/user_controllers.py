from datetime import datetime, timezone

from flask_jwt_extended import get_current_user

from models.user import User
from models.ride import Ride
from models.chat import Chat, Message
from services.auth_service import AuthService


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
                    elif field == "image_url" and value:  # Add validation for image URL
                        if not value.startswith(('http://', 'https://')):
                            return {"status": "error", "message": "Invalid image URL format"}, 400
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
    def initiate_delete_user(data):
        try:
            email = data.get("email")
            if not email:
                return {"status": "error", "message": "Email is required"}, 400

            # FInd the user by email
            user = User.objects(email=email).first()
            if not user:
                return {"status": "error", "message": "User not found"}, 404

            # Verify the requesting user is the same as the user to be deleted
            current_user = get_current_user()
            if current_user.email != email:
                return {"status": "error", "message": "Unauthorized to delete this account"}, 403

            # Generate OTP and send it user's email
            if AuthService.generate_otp_and_email(email):
                return {
                    "status": "success",
                    "message": "Verification code sent to your email to confirm account deletion."
                }, 200
            else:
                return {
                    "status": "error",
                    "message": "Failed to send verification code."
                }, 500
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500


    @staticmethod
    def delete_user(data):
        try:
            email = data.get("email")
            otp = data.get("otp")

            if not email or not otp:
                return {"status": "error", "message": "Email and OTP are required"}, 400

            # Find the user by email
            user = User.objects(email=email).first()
            if not user:
                return {"status": "error", "message": "User not found"}, 404

            # Verify the requesting user is the same as the user to be deleted
            current_user = get_current_user()
            if current_user.email != email:
                return {"status": "error", "message": "Unauthorized to delete this account"}, 403

            # Verify OTP
            otp_verification = AuthService.verify_otp(user.email, otp)
            if otp_verification[0]["status"] == "fail":
                return otp_verification

            # Get all offered rides by the user
            offered_rides = Ride.objects(provider=user)

            # Get all booked rides by the user
            booked_rides = Ride.objects(bookers=user)

            # For each offered ride, delete associated chats and the ride itself
            for ride in offered_rides:
                # Get associated chat
                chat = Chat.objects(ride=ride).first()
                if chat:
                    # Delete all messages in the chat
                    Message.objects(chat=chat).delete()
                    # Delete the chat
                    chat.delete()

                # Delete the ride
                ride.delete()

            # For each booked ride, remove user from bookers and update available seats
            for ride in booked_rides:
                if user in ride.bookers:
                    ride.bookers.remove(user)
                    ride.available_seats += 1
                    ride.save()

                # Remove user from any chats associated with the ride
                chat = Chat.objects(ride=ride).first()
                if chat and user in chat.users:
                    chat.users.remove(user)
                    chat.save()

                    # Add system message about user leaving
                    system_message = Message(
                        chat=chat,
                        content=f"{user.full_name} has left the chat (account deleted).",
                        message_type="system",
                        timestamp=datetime.now(timezone.utc)
                    )
                    system_message.save()

            # Remove user from any remaining chats (cleanup)
            for chat in Chat.objects(users=user):
                chat.users.remove(user)
                chat.save()

                # Add system message about user leaving
                system_message = Message(
                    chat=chat,
                    content=f"{user.full_name} has left the chat (account deleted).",
                    message_type="system",
                    timestamp=datetime.now(timezone.utc)
                )

            # Finally delete the user
            user.delete()

            return {
                "status": "success",
                "message": "Account deleted successfully."
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500

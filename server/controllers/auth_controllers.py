from flask import jsonify
from models.user import User
from services.auth_service import AuthService


class AuthController:

    @staticmethod
    def signup(data):
        try:
            full_name = data.get('full_name')
            email = data.get('email')
            # Check email in the data
            if not email or not full_name:
                return {'status': 'fail', 'message': 'Email and Fullname are required'}, 400

            # Check if email is valid
            if not AuthService.validate_educational_email(email):
                return {'status': 'fail', 'message': 'Invalid educational email'}, 400

            # Check if email is already registered
            if User.objects(email=email).first():
                return {'status': 'fail', 'message': 'Email already registered'}, 400

            if AuthService.generate_otp_and_email(email):
                return {
                    'status': 'success',
                    'message': 'OTP sent to email'
                }, 200
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to send OTP'
                }, 500
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500


    @staticmethod
    def verify_signup(data):
        try:
            full_name = data.get('full_name')
            email = data.get('email')
            otp = data.get('otp')

            # Check email and OTP in the data
            if not email or not otp or not full_name:
                return {'status': 'fail', 'message': 'Email, Fullname, and OTP are required'}, 400

            otp_verification_result = AuthService.verify_otp(email, otp)
            print(otp_verification_result)
            if otp_verification_result[0]['status'] == 'fail':
                return otp_verification_result

            # Once the OTP is verified, create the user
            user = User(email=email, full_name=full_name)
            user.save()

            # Create a secure JWT token and store it in the cookies
            response = jsonify({
                'status': 'success',
                'data': {
                    'user': {
                        'name': user.full_name,
                        'email': user.email
                    }
                }
            })

            AuthService.set_auth_cookies(response, user.id)
            return response, 200

        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500


    @staticmethod
    def signin(data):
        try:
            email = data.get('email')
            if not email:
                return {'status': 'fail', 'message': 'Email is required'}, 400

            if not AuthService.validate_educational_email(email, False, False):
                return {'status': 'fail', 'message': 'Invalid educational email'}, 400

            user = User.objects(email=email).first()
            if not user:
                return {'status': 'fail', 'message': 'User not found'}, 404

            if AuthService.generate_otp_and_email(email):
                return {
                    'status': 'success',
                    'message': 'OTP sent to email'
                }, 200
            else:
                return {
                    'status': 'fail',
                    'message': 'Failed to send OTP'
                }, 500
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500


    @staticmethod
    def verify_signin(data):
        try:
            email = data.get('email')
            otp = data.get('otp')

            if not email or not otp:
                return {'status': 'fail', 'message': 'Email and OTP are required'}, 400

            otp_verification_result = AuthService.verify_otp(email, otp)
            if otp_verification_result[0]['status'] == 'fail':
                return otp_verification_result


            user = User.objects(email=email).first()
            if not user:
                return {'status': 'fail', 'message': 'User not found'}, 404

            # Create a secure JWT token and store it in the cookies
            response = jsonify({
                'status': 'success',
                'data': {
                    'user': {
                        'name': user.full_name,
                        'email': user.email
                    }
                }
            })

            AuthService.set_auth_cookies(response, user.id)
            return response, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def logout():
        response = {
            'status': 'success',
            'message': 'Logged out successfully'
        }
        AuthService.clear_auth_cookies(response)
        return response, 200
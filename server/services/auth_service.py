import re
import secrets

from flask import current_app
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token
from email_validator import validate_email, EmailNotValidError

from models.otp_record import OTPRecord
from services.mail_service import MailService
from utils.security import otp_context


class AuthService:
    @staticmethod
    def validate_educational_email(email, return_details=False, check_deliverability=True):
        # Primary regex pattern for common educational Top-Level-Domains (TLDs)
        base_pattern = r"^[a-zA-Z0-9_.+-]+@(?:\w+\.)+(edu|ac\.[a-z]{2,}|sch\.[a-z]{2,}|uni\.[a-z]{2,})$"

        if not re.match(base_pattern, email, re.IGNORECASE):
            return False

        # Secondary verification against approved educational domains list
        approved_domains = current_app.config['APPROVED_EDU_DOMAINS']
        domain = email.split('@')[-1].lower()
        if domain not in approved_domains:
            return False

        # Tertiary DNS MX record verification
        try:
            result = validate_email(
                email, check_deliverability=check_deliverability)
            if return_details:
                return {
                    "valid": True,
                    "normalized": result['email'],
                    "local": result.get('local'),
                    "domain": result.get('domain'),
                    "domain_info": result.get('domain_info')
                }
            return True
        except EmailNotValidError as e:
            return False
        except Exception as e:
            return False

    @staticmethod
    def generate_secure_otp():
        otp = str(secrets.randbelow(999999)).zfill(6)
        return {
            'raw': otp,
            'hash': otp_context.hash(otp),
            'expires': datetime.now(timezone.utc) + timedelta(seconds=int(current_app.config['OTP_MAX_AGE']))
        }

    @staticmethod
    def generate_otp_and_email(email):
        # Generate secure OTP
        otp_obj = AuthService.generate_secure_otp()

        # Store OTPRecord in database
        # Check if the OTPRecord already exists
        # -- If it does, update the existing record
        # -- If it doesn't, create a new record
        otp_record = OTPRecord.objects(email=email).first()
        if otp_record:
            otp_record.update(
                otp_hash=otp_obj['hash'],
                expires=otp_obj['expires']
            )
        else:
            OTPRecord(
                email=email,
                otp_hash=otp_obj['hash'],
                expires=otp_obj['expires']
            ).save()

        # Send OTP to user's email
        mail_service = MailService()

        return mail_service.send_otp_email(email, otp_obj['raw'])

    @staticmethod
    def is_otp_expired(expires):
        current_time = datetime.now(timezone.utc)
        return current_time > expires.replace(tzinfo=timezone.utc)

    @staticmethod
    def verify_otp(email, otp):
        otp_record = OTPRecord.objects(email=email).first()
        if not otp_record:
            return {'status': 'fail', 'message': 'OTP not found'}, 404

        if otp_context.verify(otp, otp_record.otp_hash) is False:
            return {'status': 'fail', 'message': 'Invalid OTP'}, 400

        if AuthService.is_otp_expired(otp_record.expires):
            return {'status': 'fail', 'message': 'OTP expired'}, 400

        # Delete the OTP record after successful verification
        otp_record.delete()

        return {'status': 'success', 'message': 'OTP verified successfully'}, 200

    @staticmethod
    def get_auth_token(user_id):
        payload = { 'user_id': str(user_id) }
        token = create_access_token(identity=payload)
        return token

import os


class Config:
    # Database configuration
    MONGODB_SETTINGS = {
        'db': 'truest-ride',
        'host': os.environ.get('MONGODB_URI'),
    }

    # JWT configuration
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SECURITY_TOKEN_MAX_AGE = os.environ.get(
        'SECURITY_TOKEN_MAX_AGE'
    )  # 1 hour

    # Flask-Security configuration
    SECURITY_PASSWORD_SALT = os.environ.get('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORDLESS = True
    SECURITY_EMAIL_SENDER = os.environ.get(
        'MAIL_USERNAME', 'noreply.truestride@gmail.com'
    )
    SECURITY_EMAIL_SUBJECT_PASSWORDLESS = 'Your OTP Code'
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'

    # OTP configuration
    OTP_MAX_AGE = os.environ.get('OTP_MAX_AGE')  # 5 minutes

    # Mail configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = os.environ.get('MAIL_PORT', 587)
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

    # Approved educational domains
    # Need to maintain proper list of educational domains
    APPROVED_EDU_DOMAINS = [
        'kent.edu', 'mits.ac.in', 'harvard.edu', 'stanford.edu', 'mit.edu'
    ]

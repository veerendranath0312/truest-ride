import os


class Config:
    MONGODB_SETTINGS = {
        'db': 'truest-ride',
        'host': os.environ.get('MONGODB_URI'),
    }
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.environ.get('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORDLESS = True
    SECURITY_EMAIL_SENDER = os.environ.get(
        'MAIL_USERNAME', 'noreply.truestride@gmail.com'
    )
    SECURITY_EMAIL_SUBJECT_PASSWORDLESS = 'Your OTP Code'
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
    SECURITY_TOKEN_MAX_AGE = os.environ.get(
        'SECURITY_TOKEN_MAX_AGE'
    )  # 5 minutes

    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = os.environ.get('MAIL_PORT', 587)
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

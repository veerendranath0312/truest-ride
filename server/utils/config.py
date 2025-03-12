import os


class Config:
    # Database configuration
    MONGODB_SETTINGS = {
        'db': 'truest-ride',
        'host': os.environ.get('MONGODB_URI'),
    }

    # JWT configuration
    JWT_COOKIE_SECURE = True if os.environ.get('FLASK_ENV') == 'PRODUCTION' else False   # Set to True in production for HTTPS
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_COOKIE_PATH = '/api/v1'
    JWT_ACCESS_CSRF_COOKIE_PATH = '/api/v1'
    JWT_SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get('ACCESS_TOKEN_EXPIRES', 3600))  # Default to 1 hour
    JWT_COOKIE_SAMESITE = "None" if os.environ.get('FLASK_ENV') == 'PRODUCTION' else 'Lax'  # Set to None in production for CSRF
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_REFRESH_SHORT_LIVED = True
    JWT_COOKIE_REFRESH_TIME = int(os.environ.get('REFRESH_TIME', 5))  # Default to 5 minutes
    SECRET_SALT = os.environ.get('SECRET_SALT')

    # OTP configuration
    OTP_MAX_AGE = os.environ.get('OTP_MAX_AGE', 300)  # Default to 5 minutes

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

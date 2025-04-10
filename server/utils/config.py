import os


class Config:
    CORS_ORIGINS = [origin.strip() for origin in os.environ.get('CORS_ORIGINS', '').split(',')]
    # Database configuration
    MONGODB_SETTINGS = {
        'db': 'truest-ride',
        'host': os.environ.get('MONGODB_URI'),
    }

    # JWT configuration
    JWT_SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get('ACCESS_TOKEN_EXPIRES', 3600)) # Default to 1 hour
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

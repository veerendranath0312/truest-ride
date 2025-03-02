from datetime import datetime, timezone
from mongoengine import *


class OTPRecord(Document):
    email = EmailField(required=True, unique=True)
    otp_hash = StringField(required=True)
    expires = DateTimeField(required=True)
    attempts = IntField(default=0)
    created_at = DateTimeField(default=datetime.now(timezone.utc))

    meta = {
        'collection': 'otp_records',
        'indexes': [
            # 'expireAfterSeconds' creates a Time-To-Live (TTL) index
            # that automatically deletes documents after a specified number of seconds
            {'fields': ['email'], 'unique': True},
            {'fields': ['expires'], 'expireAfterSeconds': 86400},
        ]
    }

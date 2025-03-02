import uuid
import jwt
from mongoengine import *
from flask import current_app
from flask_security import UserMixin
from datetime import datetime, timezone, timedelta
from utils.config import Config


class User(Document, UserMixin):
    full_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    fs_uniquifier = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    rides = ListField(ReferenceField('Ride'))
    place = StringField(default='')
    university = StringField(default='')
    university_start_date = DateTimeField()
    university_end_date = DateTimeField()
    gender = StringField(choices=['Male', 'Female', 'Other'])
    age = IntField(min_value=18, max_value=100)
    created_at = DateTimeField(default=datetime.now(timezone.utc))
    image_url = StringField(default='')

    meta = {
        'collection': 'users',
        'indexes': [
            {'fields': ['email'], 'unique': True},
            {'fields': ['university']}
        ]
    }

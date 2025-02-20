from datetime import datetime, timezone
from mongoengine import *


class User(Document):
    full_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    rides = ListField(ReferenceField('Ride'))
    place = StringField(default='')
    university = StringField(default='')
    university_start_date = DateTimeField()
    university_end_date = DateTimeField()
    gender = StringField(choices=['Male', 'Female', 'Other'])
    age = IntField(min_value=18, max_value=100)
    created_at = DateTimeField(default=datetime.now(timezone.utc))

    meta = {
        'collection': 'users',
        'indexes': [
            {'fields': ['email'], 'unique': True},
            {'fields': ['university']}
        ]
    }

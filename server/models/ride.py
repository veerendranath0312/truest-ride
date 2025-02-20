from datetime import datetime, timezone
from mongoengine import *


class Ride(Document):
    from_location = StringField(required=True)
    to_location = StringField(required=True)
    ride_date = DateTimeField(required=True)
    created_on = DateTimeField(default=datetime.now(timezone.utc))
    user = ReferenceField('User', required=True)

    meta = {
        'collection': 'rides',
        'indexes': [
            {'fields': ['ride_date']},
            {'fields': ['user']}
        ]
    }

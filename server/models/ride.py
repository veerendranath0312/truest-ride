from datetime import datetime, timezone
from mongoengine import *


class Ride(Document):
    from_location = StringField(required=True)
    to_location = StringField(required=True)
    ride_date = DateTimeField(required=True)
    created_on = DateTimeField(default=datetime.now(timezone.utc))
    # User who is offering the ride
    provider = ReferenceField('User', required=True)
    # Users who have booked the ride
    bookers = ListField(ReferenceField('User'))
    total_seats = IntField(required=True)
    available_seats = IntField(required=True)
    car_model = StringField(required=True)

    meta = {
        'collection': 'rides',
        # Indexes to optimize queries on ride_date, provider, and bookers fields
        'indexes': [
            {'fields': ['ride_date']},
            {'fields': ['provider']},
            {'fields': ['bookers']}
        ]
    }

    # TODO: ADD the TTL index for the ride document to expire after 30 days
    # HINT: Use the 'expires' key in the meta dictionary

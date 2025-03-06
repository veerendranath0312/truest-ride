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
    total_seats = IntField(required=True, default=1)
    available_seats = IntField(required=True, default=1)
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

    def to_json(self):
        return {
            "id": str(self.id),
            "from_location": self.from_location,
            "to_location": self.to_location,
            "ride_date": self.ride_date.isoformat() if self.ride_date else None,
            "created_on": self.created_on.isoformat() if self.created_on else None,
            "provider": str(self.provider.id) if self.provider else None,
            "bookers": [str(booker.id) for booker in self.bookers],
            "total_seats": self.total_seats,
            "available_seats": self.available_seats,
            "car_model": self.car_model
        }

    # TODO: ADD the TTL index for the ride document to expire after 30 days
    # HINT: Use the 'created_on' key in the meta dictionary
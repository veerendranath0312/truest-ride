from mongoengine import *
from datetime import datetime, timezone


class User(Document):
    full_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    offered_rides = ListField(ReferenceField('Ride'))
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

    def to_json(self):
        return {
            "id": str(self.id),
            "full_name": self.full_name,
            "email": self.email,
            "offered_rides": [str(ride.id) for ride in self.offered_rides],
            "place": self.place,
            "university": self.university,
            "university_start_date": self.university_start_date.isoformat() if self.university_start_date else None,
            "university_end_date": self.university_end_date.isoformat() if self.university_end_date else None,
            "gender": self.gender,
            "age": self.age,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "image_url": self.image_url
        }

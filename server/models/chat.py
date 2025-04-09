from datetime import datetime, timezone
from mongoengine import *

class Chat(Document):
    ride = ReferenceField('Ride', required=True)
    created_at = DateTimeField(default=datetime.now(timezone.utc))
    is_active = BooleanField(default=True)
    users = ListField(ReferenceField('User'))

    meta = {
        'collection': 'chats',
        'indexes': [
            {'fields': ['ride']},
            {'fields': ['created_at']},
            {'fields': ['is_active']}
        ]
    }

    def to_json(self):
        return {
            "id": str(self.id),
            "ride": {
                "id": str(self.ride.id),
                "from_location": self.ride.from_location,
                "to_location": self.ride.to_location,
                "ride_date": self.ride.ride_date.isoformat() if self.ride.ride_date else None,
            },
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "is_active": self.is_active,
            "users": [{"id": str(user.id), "full_name": user.full_name} for user in self.users]
        }

    def get_participant_ids(self):
        """Return list of user IDs who are participants in this chat"""
        return [str(user.id) for user in self.users]

class Message(Document):
    chat = ReferenceField('Chat', required=True)
    sender = ReferenceField('User', required=False) # Optional for system messages
    content = StringField(required=True)
    timestamp = DateTimeField(default=datetime.now(timezone.utc))
    message_type = StringField(choices=['user', 'system'], default='user')

    meta = {
        'collection': 'messages',
        'indexes': [
            {'fields': ['chat']},
            {'fields': ['sender']},
            {'fields': ['timestamp']}
        ]
    }

    def to_json(self):
        json_data = {
            "id": str(self.id),
            "chat": str(self.chat.id),
            "content": self.content,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            "type": self.message_type
        }

        # Only include sender for user messages
        if self.message_type == 'user' and self.sender:
            json_data["sender"] = {
                "id": str(self.sender.id),
                "full_name": self.sender.full_name,
            }

        return json_data

class ChatUser(Document):
    chat = ReferenceField('Chat', required=True)
    user = ReferenceField('User', required=True)
    joined_at = DateTimeField(default=datetime.now(timezone.utc))
    is_active = BooleanField(default=True)

    meta = {
        'collection': 'chat_users',
        'indexes': [
            {'fields': ['chat']},
            {'fields': ['user']},
            {'fields': ['joined_at']}
        ]
    }
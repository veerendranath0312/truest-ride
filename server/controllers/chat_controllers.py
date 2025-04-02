from flask_socketio import emit, join_room, leave_room
from datetime import datetime, timezone
from flask_jwt_extended import get_current_user
from models.chat import Chat, Message, ChatUser
from models.ride import Ride

class ChatController:
    @staticmethod
    def get_user_chats():
        try:
            user = get_current_user()
            if not user:
                return {"status": "fail", "message": "User not authenticated"}, 401

            # Fetch all active chats for the user
            chats = Chat.objects(users=user, is_active=True)

            return {
                'status': 'success',
                'data': {
                    'chats': [chat.to_json() for chat in chats],
                }
            }, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def get_chat_messages(chat_id):
        try:
            user = get_current_user()
            if not user:
                return {"status": "fail", "message": "User not authenticated"}, 401

            chat = Chat.objects(id=chat_id, users=user, is_active=True).first()
            if not chat:
                return {"status": "fail", "message": "Chat not found or user not in chat"}, 404

            messages = Message.objects(chat=chat).order_by('timestamp')
            message_history = [message.to_json() for message in messages]

            return {
                'status': 'success',
                'data': {
                    'messages': message_history,
                }
            }, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500


    @staticmethod
    def create_chat(ride_id):
        try:
            if not ride_id:
                return {"status": "fail", "message": "Ride ID is required"}, 400

            ride = Ride.objects(id=ride_id).first()
            if not ride:
                return {"status": "fail", "message": "Ride not found"}, 404

            # Create chat
            chat = Chat(ride=ride)
            chat.save()

            # Add system message for the chat creation
            system_message = Message(
                chat=chat,
                content=f"Chat created for ride from {ride.from_location} to {ride.to_location}",
                message_type="system",
            )
            system_message.save()

            return {
                'status': 'success',
                'data': {'chat_id': str(chat.id)}
            }, 201
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def join_chat(chat_id):
        try:
            user = get_current_user()
            chat = Chat.objects(id=chat_id).first()
            if not chat or not chat.is_active:
                return {'status': 'fail', 'message': 'Chat not found or inactive'}, 404

            if user not in chat.users:
                chat.users.append(user)
                chat.save()

                # Add system message for user joining
                join_message = Message(
                    chat=chat,
                    content=f"{user.full_name} joined the chat",
                    message_type="system"
                )
                join_message.save()

            join_room(str(chat.id))

            # Fetch message history
            messages = Message.objects(chat=chat).order_by('timestamp')
            message_history = [message.to_json() for message in messages]

            emit('message_history', message_history, to=str(chat.id))
            emit('user_joined', {'user': str(user.full_name)}, to=str(chat.id))
            return {'status': 'success'}, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def leave_chat(chat_id):
        try:
            user = get_current_user()
            chat = Chat.objects(id=chat_id).first()
            if not chat or not chat.is_active:
                return {'status': 'fail', 'message': 'Chat not found or inactive'}, 404

            if user in chat.users:
                chat.users.remove(user)
                chat.save()

                # Add system message for user leaving
                leave_message = Message(
                    chat=chat,
                    content=f"{user.full_name} left the chat",
                    message_type="system"
                )
                leave_message.save()

                leave_room(str(chat.id))
                emit('user_left', {'user': str(user.full_name)}, to=str(chat.id))
            return {'status': 'success'}, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def send_message(data):
        try:
            user = get_current_user()
            chat_id = data.get('chat_id')
            message_content = data.get('message')

            if not chat_id or not message_content:
                return {'status': 'fail', 'message': 'Chat ID and message are required'}, 400

            chat = Chat.objects(id=chat_id).first()
            if not chat or not chat.is_active:
                return {'status': 'fail', 'message': 'Chat not found or inactive'}, 404

            if user not in chat.users:
                return {'status': 'fail', 'message': 'User not in chat'}, 403

            message = Message(
                chat=chat,
                sender=user,
                content=message_content,
                message_type="user"
            )
            message.save()

            emit('new_message', message.to_json(), to=str(chat.id))
            return {'status': 'success'}, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def delete_chat(chat_id):
        try:
            user = get_current_user()
            chat = Chat.objects(id=chat_id).first()
            if not chat or not chat.is_active:
                return {'status': 'fail', 'message': 'Chat not found or inactive'}, 404

            if user not in chat.users:
                return {'status': 'fail', 'message': 'User not in chat'}, 403

            # Delete all messages in the chat
            Message.objects(chat=chat).delete()

            # Delete the chat
            chat.delete()

            # Notify all users in the chat
            emit('chat_deleted', {'chat_id': str(chat.id)}, to=str(chat.id))

        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def disable_expired_chats():
        # TODO: I think it's better to remove the users from the chat once it is expired
        try:
            now = datetime.now(timezone.utc)
            expired_chats = Chat.objects(ride__ride_date__lt=now, is_active=True)

            for chat in expired_chats:
                chat.is_active = False
                chat.save()

                system_message = Message(
                    chat=chat,
                    content="This chat has been automatically closed as the ride date has passed",
                    message_type="system"
                )
                system_message.save()

                emit('chat_deleted', {'chat_id': str(chat.id)}, to=str(chat.id))
        except Exception as e:
            print(f"Error in disable_expired_chats: {str(e)}")


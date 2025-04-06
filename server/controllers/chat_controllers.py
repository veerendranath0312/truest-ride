from flask import current_app
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

            # Fetch all active chats for the user, sorted by ride date
            chats = Chat.objects(users=user, is_active=True)
            sorted_chats = sorted(chats, key=lambda chat: chat.ride.ride_date, reverse=False)  # reverse=True for newest first

            return {
                'status': 'success',
                'data': {
                    'chats': [chat.to_json() for chat in sorted_chats],
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

            # Create chat and add the ride provider to users list
            chat = Chat(ride=ride, users=[ride.provider])
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

            # Add user to chat if not already present
            if user not in chat.users:
                chat.users.append(user)
                chat.save()

                join_message = Message(
                    chat=chat,
                    content=f"{user.full_name} joined the chat",
                    message_type="system"
                )
                join_message.save()

            # Fetch message history
            messages = Message.objects(chat=chat).order_by('timestamp')
            message_history = [message.to_json() for message in messages]

            # Get the application context and socketio instance
            app = current_app._get_current_object()
            socketio = app.extensions['socketio']

            # Get all participant socket IDs
            participant_ids = chat.get_participant_ids()
            recipient_socket_ids = [
                sid for uid, sid in app.user_socket_map.items()
                if uid in participant_ids
            ]

            # Send message history to the joining user
            user_socket_id = app.user_socket_map.get(str(user.id))
            if user_socket_id:
                print(f"Sending message history to user socket: {user_socket_id}")
                socketio.emit('message_history', message_history, room=user_socket_id)

            # Notify other participants about the new user
            join_notification = {'user': str(user.full_name)}
            for socket_id in recipient_socket_ids:
                if socket_id != user_socket_id:  # Don't send to the joining user
                    socketio.emit('user_joined', join_notification, room=socket_id)
            return {'status': 'success'}, 200
        except Exception as e:
            print(f"Join chat error: {str(e)}")
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
            if not user:
                return {'status': 'fail', 'message': 'User not authenticated'}, 401

            chat_id = data.get('chat_id')
            message_content = data.get('message')

            if not chat_id or not message_content:
                return {'status': 'fail', 'message': 'Chat ID and message are required'}, 400

            chat = Chat.objects(id=chat_id).first()
            if not chat or not chat.is_active:
                return {'status': 'fail', 'message': 'Chat not found or inactive'}, 404

            message = Message(
                chat=chat,
                sender=user,
                content=message_content,
                message_type="user",
                timestamp = datetime.now(timezone.utc)
            )
            message.save()

            message_data = message.to_json()

            # Get the application context
            app = current_app._get_current_object()
            socketio = app.extensions['socketio']

            # Get all participant socket IDs
            participant_ids = chat.get_participant_ids()
            recipient_socket_ids = [
                sid for uid, sid in app.user_socket_map.items()
                if uid in participant_ids
            ]


            # Emit message only to chat participants
            for socket_id in recipient_socket_ids:
                socketio.emit('new_message', message_data, room=socket_id)

            return {'status': 'success', 'data': message_data}, 200

        except Exception as e:
            print("ChatController send message error:", str(e))
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


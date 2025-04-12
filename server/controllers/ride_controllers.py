from datetime import datetime, timezone
from models.user import User
from models.ride import Ride
from models.chat import Chat, Message
from flask_jwt_extended import get_current_user

from controllers.chat_controllers import ChatController

class RideController:

    @staticmethod
    def get_all_rides():
        rides = Ride.objects.all()
        return {
            "status": "success",
            "data": {
                "rides": [ride.to_json() for ride in rides]
            }
        }, 200

    @staticmethod
    def offer_ride(data):
        try:
            if not data:
                return {"status": "fail", "message": "Ride data is required"}, 400

            user = get_current_user()

            # Convert the ride_date to UTC
            ride_date = datetime.fromisoformat(data['rideDate']).astimezone(timezone.utc)

            ride_obj = Ride(
                from_location=data['from'],
                to_location=data['to'],
                ride_date=ride_date,
                total_seats=data['totalSeats'],
                available_seats=data['totalSeats'],
                car_model=data['carModel'],
                provider=user['id']
            )
            ride_obj.save()

            # After creating the ride, attach the ride to the user object as well
            user.offered_rides.append(ride_obj)
            user.save()

            # Create chat and add provider to it
            ChatController.create_chat(str(ride_obj.id))

            return {
                'status': 'success',
                'data': { 'ride': ride_obj.to_json() }
            }, 200
        except Exception as e:
            return {'status': 'fail', 'message': str(e)}, 500

    @staticmethod
    def book_ride(ride_id):
        try:
            if not ride_id:
                return {"status": "fail", "message": "Ride ID is required"}, 400

            ride = Ride.objects(id=ride_id).first()

            if not ride:
                return {"status": "fail", "message": "Ride not found"}, 404

            user = get_current_user()
            if user.to_json()['id'] == ride.to_json()['provider']:
                return {"status": "fail", "message": "You can't book your own ride"}, 400

            if ride.to_json()['available_seats'] == 0:
                return {"status": "fail", "message": "No available seats in the ride"}, 400

            if user.to_json()['id'] in ride.to_json()['bookers']:
                return {"status": "fail", "message": "You have already booked this ride"}, 400

            # Book the ride
            ride.bookers.append(user)
            ride.available_seats -= 1
            ride.save()

            # Add booker to chat associated with the ride
            chat = Chat.objects(ride=ride).first()
            if chat:
                ChatController.join_chat(str(chat.id))

            return {
                'status': 'success',
                'data': { 'ride': ride.to_json() }
            }
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500

    @staticmethod
    def cancel_ride(ride_id):
        try:
            if not ride_id:
                return {"status": "fail", "message": "Ride ID is required"}, 400

            ride = Ride.objects(id=ride_id).first()

            if not ride:
                return {"status": "fail", "message": "Ride not found"}, 404

            user = get_current_user()

            if user.to_json()['id'] != ride.to_json()['provider']:
                return {"status": "fail", "message": "You are not authorized to cancel this ride"}, 403

            # Delete the chat associated with the ride
            chat = Chat.objects(ride=ride).first()
            if chat:
                ChatController.delete_chat(str(chat.id))

            # Update the offered_rides array in the user object
            user.offered_rides.remove(ride)
            user.save()

            # Delete the ride
            ride.delete()

            return {
                'status': 'success',
                'data': {
                    'message': 'Ride cancelled successfully'
                }
            }, 204
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500

    @staticmethod
    def cancel_booking(ride_id):
        try:
            if not ride_id:
                return {"status": "fail", "message": "Ride ID is required"}, 400

            ride = Ride.objects(id=ride_id).first()

            if not ride:
                return {"status": "fail", "message": "Ride not found"}, 404

            user = get_current_user()
            if user.to_json()['id'] not in ride.to_json()['bookers']:
                return {"status": "fail", "message": "You have not booked this ride"}, 400

            ride.bookers.remove(user)
            ride.available_seats += 1
            ride.save()

            # Remove booker from the ride's chat
            # Remove booker from chat
            chat = Chat.objects(ride=ride).first()
            if chat:
                ChatController.leave_chat(str(chat.id))

            return {
                'status': 'success',
                'data': {
                    'ride': ride.to_json()
                }
            }, 200
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500


    @staticmethod
    def get_ride(ride_id):
        try:
            if not ride_id:
                return {"status": "fail", "message": "Ride ID is required"}, 400

            ride = Ride.objects(id=ride_id).first()

            if not ride:
                return {"status": "fail", "message": "Ride not found"}, 404

            return {
                "status": "success",
                "data": {
                    "ride": ride.to_json()
                }
            }
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500


    @staticmethod
    def search_rides(data):
        try:
            # Convert the ride_date to UTC
            from_location = data.get('from')
            to_location = data.get('to')
            start_date = datetime.fromisoformat(data.get('startDate')).astimezone(timezone.utc)
            end_date = datetime.fromisoformat(data.get('endDate')).astimezone(timezone.utc)

            match_stage = {
                'available_seats': {'$gt': 0}  # Filter out rides with zero available seats
            }

            if from_location:
                match_stage['from_location'] = {'$regex': from_location, '$options': 'i'}

            if to_location:
                match_stage['to_location'] = {'$regex': to_location, '$options': 'i'}

            if start_date and end_date:
                if start_date == end_date:
                    match_stage['ride_date'] = {'$eq': start_date}
                else:
                    match_stage['ride_date'] = {'$gte': start_date, '$lte': end_date}


            # Get the current_user
            user = get_current_user()
            match_stage['provider'] = {'$ne': user.id} # Exclude rides offered by the current_user

            rides = Ride.objects.aggregate([
                {'$match': match_stage},
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'provider',
                        'foreignField': '_id',
                        'as': 'provider_info'
                    }
                },
                {'$unwind': '$provider_info'},
                {
                    '$project': {
                        '_id': 0,
                        'id': {'$toString': '$_id'},
                        'from_location': 1,
                        'to_location': 1,
                        'ride_date': 1,
                        'total_seats': 1,
                        'available_seats': 1,
                        'car_model': 1,
                        'provider': {
                            'id': {'$toString': '$provider_info._id'},
                            'full_name': '$provider_info.full_name'
                        },
                        'bookers': '$bookerStringIds'
                    }
                }
            ])

            rides = list(rides)

            return {
                "status": "success",
                "data": {
                    "rides": rides,
                }
            }
        except Exception as e:
            print("Error from search controller: ", e)
            return {"status": "fail", "message": str(e)}, 500

    # Search rides to include pagination
    # @staticmethod
    # def search_rides(data):
    #     try:
    #         from_location = data.get('from_location')
    #         to_location = data.get('to_location')
    #         start_date = data.get('start_date')
    #         end_date = data.get('end_date')
    #         page = int(data.get('page', 1))
    #         limit = int(data.get('limit', 10))
    #
    #         query = {}
    #
    #         if from_location:
    #             query['from_location__icontains'] = from_location
    #
    #         if to_location:
    #             query['to_location__icontains'] = to_location
    #
    #         if start_date and end_date:
    #             query['ride_date__gte'] = start_date
    #             query['ride_date__lte'] = end_date
    #
    #         rides = Ride.objects(**query).skip((page - 1) * limit).limit(limit)
    #
    #         return {
    #             "status": "success",
    #             "data": {
    #                 "rides": [ride.to_json() for ride in rides],
    #                 "page": page,
    #                 "limit": limit,
    #                 "total": Ride.objects(**query).count()
    #             }
    #         }
    #     except Exception as e:
    #         return {"status": "fail", "message": str(e)}, 500

    @staticmethod
    def get_offered_rides():
        try:
            user = get_current_user()
            rides = Ride.objects(provider=user.id)
            return {
                "status": "success",
                "data": {
                    "rides": [ride.to_json() for ride in rides]
                }
            }
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500

    @staticmethod
    def get_booked_rides():
        try:
            user = get_current_user()
            rides = Ride.objects(bookers=user.id)
            return {
                "status": "success",
                "data": {
                    "rides": [ride.to_json() for ride in rides]
                }
            }
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500
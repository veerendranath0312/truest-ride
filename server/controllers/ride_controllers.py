from datetime import datetime, timezone
from models.user import User
from models.ride import Ride
from flask_jwt_extended import get_current_user

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

            # Parse the ride_date from the input data and convert it to UTC
            ride_date = datetime.strptime(data['ride_date'], '%m-%d-%Y').replace(tzinfo=timezone.utc)

            ride_obj = Ride(
                from_location=data['from_location'],
                to_location=data['to_location'],
                ride_date=ride_date,
                total_seats=data['total_seats'],
                available_seats=data['total_seats'],
                car_model=data['car_model'],
                provider=user['id']
            )
            ride_obj.save()

            # After creating the ride, attach the ride to the user object as well
            user = User.objects(id=user['id']).first()
            user.offered_rides.append(ride_obj)
            user.save()

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

            return {
                'status': 'success',
                'data': {
                    'ride': ride.to_json()
                }
            }
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
            from_location = data.get('from_location')
            to_location = data.get('to_location')
            start_date = data.get('start_date')
            end_date = data.get('end_date')

            query = {}

            if from_location:
                query['from_location__icontains'] = from_location

            if to_location:
                query['to_location__icontains'] = to_location

            if start_date and end_date:
                query['ride_date__gte'] = start_date
                query['ride_date__lte'] = end_date

            rides = Ride.objects(**query)

            return {
                "status": "success",
                "data": {
                    "rides": [ride.to_json() for ride in rides]
                }
            }
        except Exception as e:
            return {"status": "fail", "message": str(e)}, 500

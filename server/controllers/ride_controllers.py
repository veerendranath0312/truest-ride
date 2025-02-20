from models.ride import Ride


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
    def create_ride(data):
        ride = Ride(
            from_location=data['from_location'],
            to_location=data['to_location'],
            ride_date=data['ride_date'],
            user=data['user']
        )

        ride.save()

        return {"status": "success", "data": {
            "ride": ride.to_json()
        }}, 201

    @staticmethod
    def book_ride(data):
        return {"message": "Ride booked successfully"}

    @staticmethod
    def offer_ride(data):
        return {"message": "Ride offered successfully"}

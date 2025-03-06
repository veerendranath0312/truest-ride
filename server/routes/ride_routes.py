from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.ride_controllers import RideController

ride_bp = Blueprint('rides', __name__)

@ride_bp.route("/", methods=['GET', 'POST'])
@jwt_required()
def rides():
    if request.method == 'GET':
        return RideController.get_all_rides()
    if request.method == 'POST':
        data = request.get_json()
        return RideController.offer_ride(data)
    else:
        return {"message": "Invalid request method"}, 405


@ride_bp.route('/<string:ride_id>', methods=['GET', 'POST','PUT', 'DELETE'])
@jwt_required()
def ride(ride_id):
    if request.method == 'GET':
        return RideController.get_ride(ride_id)
    if request.method == 'POST':
        return RideController.book_ride(ride_id)
    if request.method == 'DELETE':
        return RideController.cancel_ride(ride_id)
    if request.method == 'PUT':
        return RideController.cancel_booking(ride_id)
    else:
        return {"message": "Invalid request method"}, 405



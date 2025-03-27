from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.ride_controllers import RideController

ride_bp = Blueprint('rides', __name__)


@ride_bp.route("", methods=['GET', 'POST'])
@jwt_required()
def rides():
    if request.method == 'GET':
        return RideController.get_all_rides()
    if request.method == 'POST':
        data = request.get_json()
        return RideController.offer_ride(data)
    else:
        return {"message": "Invalid request method"}, 405


@ride_bp.route('/<string:ride_id>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
@jwt_required()
def ride(ride_id):
    if request.method == 'GET':
        return RideController.get_ride(ride_id)
    if request.method == 'POST':
        return RideController.book_ride(ride_id)
    if request.method == 'DELETE':
        return RideController.cancel_ride(ride_id)
    if request.method == 'PATCH':
        return RideController.cancel_booking(ride_id)
    else:
        return {"message": "Invalid request method"}, 405


@ride_bp.route('/search', methods=['GET'])
@jwt_required(optional=True)
def search_rides():
    data = request.args
    return RideController.search_rides(data)

@ride_bp.route('/offered', methods=['GET'])
@jwt_required()
def offered_rides():
    return RideController.get_offered_rides()

@ride_bp.route('/booked', methods=['GET'])
@jwt_required()
def booked_rides():
    return RideController.get_booked_rides()

# TODO: Need to implements routes for the following:
# - Fetch the rides offered by the user with pagination
# - Fetch the rides booked by the user with pagination
# TODO: Need to update the routes for the following:
# - Search rides to include pagination

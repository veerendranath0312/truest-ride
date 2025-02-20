from flask import Blueprint, request
from controllers.ride_controllers import RideController

ride_bp = Blueprint('rides', __name__)


@ride_bp.route("/", methods=['GET'])
def get_all_rides():
    return RideController.get_all_rides()


@ride_bp.route('/create', methods=['POST'])
def create_ride():
    if request.method == 'POST':
        data = request.get_json()
        return RideController.create_ride(data)
    else:
        return {"message": "Invalid request method"}, 405


@ride_bp.route('/book', methods=['POST'])
def book_ride():
    if request.method == 'POST':
        data = request.get_json()
        return RideController.book_ride(data)
    else:
        return {"message": "Invalid request method"}, 405


@ride_bp.route('/offer', methods=['POST'])
def offer_ride():
    if request.method == 'POST':
        data = request.get_json()
        return RideController.offer_ride(data)
    else:
        return {"message": "Invalid request method"}, 405

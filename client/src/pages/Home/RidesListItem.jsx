import { useState } from "react";
import { Link } from "react-router";
import { Loader } from "lucide-react";

import useRideStore from "../../store/useRideStore";
import { formattedRideDate, capitalize } from "../../utils/helpers";

function RidesListItem({ ride, setNotification }) {
  const { bookRide, bookedRides } = useRideStore();
  const [isBooking, setIsBooking] = useState(false);

  // Check if the ride is already booked
  const isBooked = bookedRides.some((bookedRide) => bookedRide.id === ride.id);

  const handleBookSeat = async (id) => {
    if (isBooked) return; // Prevent booking a ride more than once

    setIsBooking(true);
    try {
      await bookRide(id);
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="ride__search__results__item">
      <div className="ride__search__results__item__details">
        <h4 className="ride__search__results__item__title">
          <ion-icon name="location-outline"></ion-icon>
          {capitalize(ride.from_location)}{" "}
          <ion-icon name="arrow-forward-outline"></ion-icon>{" "}
          {capitalize(ride.to_location)}
        </h4>
        {/* TODO: Implement navigation to the user profile */}
        <p className="ride__search__results__item__description">
          Ride offered by{" "}
          <Link to="/username" className="username">
            John Doe
          </Link>{" "}
        </p>
        <div className="ride_search__ressults__item__info">
          <p>
            <ion-icon name="calendar-outline"></ion-icon>
            {formattedRideDate(ride.ride_date)}
          </p>
          <p>
            <ion-icon name="people-outline"></ion-icon>
            {ride.available_seats} seats available
          </p>
          <p>
            <ion-icon name="car-sport-outline"></ion-icon>
            {ride.car_model}
          </p>
        </div>{" "}
      </div>
      <button
        className="ride__search__results__item__button"
        onClick={() => handleBookSeat(ride.id)}
        disabled={isBooking || isBooked}
      >
        {isBooked ? (
          "Booked"
        ) : isBooking ? (
          <>
            <Loader size={18} />
            &nbsp; Booking...{" "}
          </>
        ) : (
          "Book seat"
        )}
      </button>
    </div>
  );
}

export default RidesListItem;

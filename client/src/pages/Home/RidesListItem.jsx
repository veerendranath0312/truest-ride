import { useState } from "react";
import { Link } from "react-router";
import {
  Loader,
  MessageCircleMore,
  MapPin,
  ArrowRight,
  Calendar,
  Users,
  Car,
} from "lucide-react";
import { toast } from "sonner";

import useRideStore from "../../store/useRideStore";
import { formattedRideDate, capitalize } from "../../utils/helpers";

function RidesListItem({ ride }) {
  const { bookRide, bookedRides } = useRideStore();
  const [isBooking, setIsBooking] = useState(false);

  // Check if the ride is already booked
  const isBooked = bookedRides.some((bookedRide) => bookedRide.id === ride.id);

  const handleBookSeat = async (id) => {
    if (isBooked) return; // Prevent booking a ride more than once

    setIsBooking(true);
    try {
      await bookRide(id);
      toast.success("Ride booked successfully!");
      setTimeout(() => {
        toast("Chat room joined!", {
          action: {
            label: "Open",
            onClick: () => {
              window.location.href = `/chats`;
            },
          },
          icon: <MessageCircleMore size={16} />,
        });
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="ride__search__results__item">
      <div className="ride__search__results__item__details">
        <h4 className="ride__search__results__item__title">
          <MapPin size={16} strokeWidth={2} />
          {ride.from_location} <ArrowRight size={16} strokeWidth={2} /> {ride.to_location}
        </h4>
        <p className="ride__search__results__item__description">
          Ride offered by{" "}
          <Link
            to={`/user/${ride.provider.full_name.split(" ")[0].toLowerCase()}`}
            state={{ userId: ride.provider.id }}
            className="username"
          >
            {capitalize(ride.provider.full_name)}
          </Link>
        </p>
        <div className="ride_search__results__item__info">
          <p>
            <Calendar size={16} />
            {formattedRideDate(ride.ride_date)}
          </p>
          <p>
            <Users size={16} />
            {ride.available_seats} seats available
          </p>
          <p>
            <Car size={16} />
            {ride.car_model}
          </p>
        </div>
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

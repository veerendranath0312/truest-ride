import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import useRideStore from "../../store/useRideStore";
import LibraryListItem from "./LibraryListItem";
import { formattedRideDate } from "../../utils/helpers";

const Content = () => {
  const {
    bookedRides,
    offeredRides,
    fetchOfferedRides,
    fetchBookedRides,
    isLoadingBookings,
    isLoadingOfferings,
    cancelRide,
    cancelBooking,
  } = useRideStore();
  const [searchParams] = useSearchParams();

  // Flags to track whether rides have been fetched
  const [hasFetchedBookings, setHasFetchedBookings] = useState(false);
  const [hasFetchedOfferings, setHasFetchedOfferings] = useState(false);

  const section = searchParams.get("section");

  useEffect(() => {
    const fetchRides = async () => {
      try {
        if (section === "bookings" && !hasFetchedBookings) {
          await fetchBookedRides();
          setHasFetchedBookings(true);
        } else if (section === "offerings" && !hasFetchedOfferings) {
          await fetchOfferedRides();
          setHasFetchedOfferings(true);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchRides();
  }, [
    section,
    fetchBookedRides,
    fetchOfferedRides,
    hasFetchedBookings,
    hasFetchedOfferings,
  ]);

  return (
    <div className="library__content">
      {section === "bookings" ? (
        <>
          {/* Bookings */}
          {isLoadingBookings ? (
            <p className="library__content--description">
              <Loader size={18} className="loader-spin" /> &nbsp; Fetching your
              bookings...
            </p>
          ) : bookedRides.length === 0 ? (
            <p className="library__content--description">You have no bookings yet.</p>
          ) : (
            <div className="list">
              {bookedRides.map((ride) => (
                <LibraryListItem
                  key={ride.id}
                  date={formattedRideDate(ride.ride_date)}
                  from={ride.from_location}
                  to={ride.to_location}
                  provider={ride.provider}
                  section="bookings"
                  onCancel={() => cancelBooking(ride.id)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Offerings */}
          {isLoadingOfferings ? (
            <p className="library__content--description">
              <Loader size={18} className="loader-spin" /> &nbsp; Fetching your
              offerings...
            </p>
          ) : offeredRides.length === 0 ? (
            <p className="library__content--description">
              You have not offered any rides yet.
            </p>
          ) : (
            <div className="list">
              {offeredRides.map((ride) => (
                <LibraryListItem
                  key={ride.id}
                  date={formattedRideDate(ride.ride_date)}
                  from={ride.from_location}
                  to={ride.to_location}
                  totalSeats={ride.total_seats}
                  section="offerings"
                  onCancel={() => cancelRide(ride.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Content;

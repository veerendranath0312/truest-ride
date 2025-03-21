import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Loader } from "lucide-react";

import useRideStore from "../../store/useRideStore";
import LibraryListItem from "./LibraryListItem";
import Notification from "../../components/Notification";
import { capitalize, formattedRideDate } from "../../utils/helpers";

const Content = () => {
  const {
    bookedRides,
    offeredRides,
    fetchOfferedRides,
    fetchBookedRides,
    isLoadingBookings,
    isLoadingOfferings,
  } = useRideStore();
  const [searchParams] = useSearchParams();

  // Flags to track whether rides have been fetched
  const [hasFetchedBookings, setHasFetchedBookings] = useState(false);
  const [hasFetchedOfferings, setHasFetchedOfferings] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

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
        setNotification({ message: err.message, type: "error" });
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
          {isLoadingBookings ? (
            <p className="library__content--description">
              <Loader size={18} className="loader-spin" /> &nbsp; Fetching your
              bookings...
            </p>
          ) : notification.message ? (
            <Notification type="error" message={notification.message} />
          ) : bookedRides.length === 0 ? (
            <p className="library__content--description">You have no bookings yet.</p>
          ) : (
            <div className="list">
              {bookedRides.map((ride) => (
                <LibraryListItem
                  key={ride.id}
                  date={formattedRideDate(ride.ride_date)}
                  from={capitalize(ride.from_location)}
                  to={capitalize(ride.to_location)}
                  section="bookings"
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {isLoadingOfferings ? (
            <p className="library__content--description">
              <Loader size={18} className="loader-spin" /> &nbsp; Fetching your
              offerings...
            </p>
          ) : notification.message ? (
            <Notification type="error" message={notification.message} />
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
                  from={capitalize(ride.from_location)}
                  to={capitalize(ride.to_location)}
                  totalSeats={ride.total_seats}
                  section="offerings"
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

import { useState } from "react";
import { Link } from "react-router";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { capitalize } from "../../utils/helpers";

const LibraryListItem = ({
  date,
  from,
  to,
  provider,
  totalSeats = 1,
  section,
  onCancel,
}) => {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      if (section === "bookings") {
        await onCancel();
        toast.success("Booking cancelled successfully!");
      }
      if (section === "offerings") {
        await onCancel();
        toast.success("Ride cancelled successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="list__item">
      <div className="list__item__info">
        {section === "bookings" ? (
          <h2>
            You booked a ride with&nbsp;
            <Link to="/username" className="username">
              {capitalize(provider.full_name)}
            </Link>
          </h2>
        ) : (
          <h2>
            You offered a ride for {totalSeats} {totalSeats > 1 ? `persons` : `person`}
          </h2>
        )}

        <p className="list__item__date">
          <ion-icon name="calendar-outline"></ion-icon> The journey is on <b>{date}</b>
        </p>
        <p className="list__item__route">
          <ion-icon name="location-outline"></ion-icon>
          {from} <ion-icon name="arrow-forward-outline"></ion-icon> {to}
        </p>
      </div>
      <button
        className="list__item__button"
        onClick={handleCancel}
        disabled={isCancelling}
      >
        {isCancelling ? (
          <>
            <Loader size={18} className="loader-spin" /> &nbsp; Cancelling...
          </>
        ) : (
          `Cancel ${section === "bookings" ? `booking` : `ride`}`
        )}
      </button>
    </div>
  );
};

export default LibraryListItem;

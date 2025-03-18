import { Link } from "react-router";
import Button from "../../components/Button";

const LibraryListItem = ({
  date,
  from,
  to,
  username,
  totalSeats = 1,
  section,
  onCancel,
}) => {
  return (
    <div className="list__item">
      <div className="list__item__info">
        {section === "bookings" ? (
          <h2>
            You booked a ride with{" "}
            <Link to="/username" className="username">
              John Doe
            </Link>{" "}
          </h2>
        ) : (
          <h2>
            You offered a ride for {totalSeats} {totalSeats > 1 ? `persons` : `person`}
          </h2>
        )}

        <p className="list__item__date">
          <ion-icon name="calendar-outline"></ion-icon> The jouney is on <b>{date}</b>
        </p>
        <p className="list__item__route">
          <ion-icon name="location-outline"></ion-icon>
          {from} <ion-icon name="arrow-forward-outline"></ion-icon> {to}
        </p>
      </div>
      <Button className="list__item__button">
        {section === "bookings" ? `Cancel booking` : `Cancel ride`}
      </Button>
    </div>
  );
};

export default LibraryListItem;

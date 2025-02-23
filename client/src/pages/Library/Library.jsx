import { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import "./library.css";

const Section = ({ title, value }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set("section", value);
    setSearchParams(searchParams);
  };

  const isActive = searchParams.get("section") === value;

  return (
    <button
      className={`library__section ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

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
            You offered a ride for {totalSeats}{" "}
            {totalSeats > 1 ? `persons` : `person`}
          </h2>
        )}

        <p className="list__item__date">
          <ion-icon name="calendar-outline"></ion-icon> The jouney is on{" "}
          <b>{date}</b>
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

const Content = () => {
  const [searchParams] = useSearchParams();

  /* Need to display a message when there are no bookings or offerings */
  return (
    <div className="library__content">
      {searchParams.get("section") === "bookings" ? (
        <div className="list">
          <LibraryListItem
            date="28 Feb, 2025"
            from="Kent"
            to="Cleveland"
            section="bookings"
          />
          <LibraryListItem
            date="28 Feb, 2025"
            from="Kent"
            to="Cleveland"
            section="bookings"
          />
        </div>
      ) : (
        <div className="list">
          <LibraryListItem
            date="28 Feb, 2025"
            from="Kent"
            to="Cleveland"
            section="offerings"
            totalSeats={3}
          />
          <LibraryListItem
            date="28 Feb, 2025"
            from="Kent"
            to="Cleveland"
            section="offerings"
            totalSeats={1}
          />
          <LibraryListItem
            date="28 Feb, 2025"
            from="Kent"
            to="Cleveland"
            section="offerings"
            totalSeats={2}
          />
        </div>
      )}
    </div>
  );
};

const Sections = () => {
  return (
    <div className="library__sections">
      <div className="library__sections__tabs">
        <Section title="Bookings" value="bookings" />
        <Section title="Offerings" value="offerings" />
      </div>

      <Content />
    </div>
  );
};

function Library() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("section")) {
      setSearchParams({ section: "bookings" });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="library">
      <Navbar isAuthenticated={true} />
      <div className="container">
        <section className="library__hero">
          <Sections />
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Library;

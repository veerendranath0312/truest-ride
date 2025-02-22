import React from "react";
import { Link } from "react-router";
import Button from "../../components/Button";

function RidesListItem() {
  return (
    <div className="ride__search__results__item">
      <div className="ride__search__results__item__details">
        <h4 className="ride__search__results__item__title">
          <ion-icon name="location-outline"></ion-icon>Lagos{" "}
          <ion-icon name="arrow-forward-outline"></ion-icon> Abuja
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
            28 Feb, 2025
          </p>
          <p>
            <ion-icon name="people-outline"></ion-icon>3 seats available
          </p>
          <p>
            <ion-icon name="car-sport-outline"></ion-icon>
            Hyundai Elantra
          </p>
        </div>
      </div>
      <Button className="ride__search__results__item__button">
        Book a seat
      </Button>
    </div>
  );
}

export default RidesListItem;

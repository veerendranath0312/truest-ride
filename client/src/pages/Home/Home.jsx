import React from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import RidesList from "./RidesList";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar isAuthenticated={true} />
      <div className="container">
        <section className="home__hero">
          <div className="home__options">
            <div className="home__offer">
              <h3 className="home__title">Offer a ride</h3>
              <p>
                Share your journey, help others reach their destination, and
                make new friends.
              </p>
              <div className="home__offer__button__container">
                <Button className="home__offer__button">Offer a ride</Button>
              </div>
            </div>

            <div className="home__find">
              <h3 className="home__title">Find a ride</h3>
              <p>Search for available rides that matches your route.</p>
              <form className="home__find__form">
                <FormGroup
                  labelText="From"
                  inputType="text"
                  placeholderText="Enter pickup location"
                />
                <FormGroup
                  labelText="To"
                  inputType="text"
                  placeholderText="Enter drop-off location"
                />
                {/* TODO: Use react-datepicker module here */}
                <FormGroup
                  labelText="Date"
                  inputType="date"
                  placeholderText="Select travel date"
                />
                <Button className="home__find__button">Find rides</Button>
              </form>
            </div>
            <div className="home__current__bookings"></div>
            <div className="home__"></div>
          </div>

          <div className="ride__search__results">
            <h3 className="home__title">Search results</h3>
            <p>
              Please enter your departure and destination locations along with
              your travel date to view available rides.
            </p>

            <RidesList />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;

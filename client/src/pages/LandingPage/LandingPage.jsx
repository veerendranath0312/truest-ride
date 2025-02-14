import React from "react";
import { NavLink } from "react-router";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <section className="landing-page__hero">
        <div className="container">
          <div className="landing-page__hero__text">
            <h1 className="landing-page__hero__text__title">
              The Smart Way To Travel For Students
            </h1>
            <p className="landing-page__hero__text__description">
              Join our trusted community of students travellers. <br /> Share
              rides, Split costs, and make new friends.
            </p>
          </div>

          <form action="" className="landing-page__search__form">
            <div className="landing-page__search__form__group">
              <ion-icon name="location-outline"></ion-icon>
              <input
                type="text"
                className="landing-page__search__form__input landing-page__search__form__input--departure"
                placeholder="Departure"
              />
            </div>
            <div className="landing-page__search__form__group ">
              <ion-icon name="location-outline"></ion-icon>
              <input
                type="text"
                className="landing-page__search__form__input landing-page__search__form__input--destination"
                placeholder="Destination"
              />
            </div>

            <Button className="landing-page__search__form__button">
              Search
            </Button>
          </form>
        </div>
      </section>

      <div className="container">
        <section className="landing-page__features">
          <div className="container">
            <div className="landing-page__features__text">
              <h2 className="landing-page__features__title">
                Why choose Truest Ride?
              </h2>
              <p className="landing-page__features__description">
                Truest ride is the best way to travel for students. We offer an
                affordable and convenient way to travel. Here are some of the
                reasons why you should choose us.
              </p>
            </div>

            <div className="landing-page__features__flex">
              <div className="landing-page__features__flex__item">
                <span>
                  <ion-icon name="receipt"></ion-icon>
                </span>
                <h3 className="landing-page__features__flex__item__title">
                  Our mission
                </h3>
                <p className="landing-page__features__flex__item__description">
                  To provide a platform for students to share rides ensuring
                  safety and convenience.
                </p>
              </div>
              <div className="landing-page__features__flex__item">
                <ion-icon name="checkmark-circle"></ion-icon>
                <h3 className="landing-page__features__flex__item__title">
                  Reliability
                </h3>
                <p className="landing-page__features__flex__item__description">
                  Count on us for timely pickups and dependable service every
                  time you ride.
                </p>
              </div>

              <div className="landing-page__features__flex__item">
                <ion-icon name="shield-checkmark"></ion-icon>
                <h3 className="landing-page__features__flex__item__title">
                  User safety
                </h3>
                <p className="landing-page__features__flex__item__description">
                  Your safety is our top priority with trusted drivers and
                  real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <JoinUs />
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

import React from "react";
import { NavLink } from "react-router";

function JoinUs() {
  return (
    <section className="landing-page__joinus">
      <div className="container">
        <h2 className="landing-page__joinus__title">Join the community</h2>
        <p className="landing-page__joinus__description">
          Join our community of students travellers and enjoy a safe and
          convenient way to travel. Share rides, save money, and make new
          friends.
        </p>
        <NavLink to="/register" className="landing-page__joinus__link">
          Get started
        </NavLink>
      </div>
    </section>
  );
}

export default JoinUs;

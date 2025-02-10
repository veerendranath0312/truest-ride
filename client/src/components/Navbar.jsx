import React from "react";
import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbar__logo">
        Truest Ride
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/about" className="navbar__link" href="/about">
          About
        </NavLink>
        <NavLink to="/signin" className="navbar__link" href="/login">
          Sign in
        </NavLink>
        <NavLink
          to="/register"
          className="navbar__link navbar__link__join"
          href="/register"
        >
          Join now
        </NavLink>

        {/* <NavLink to="/about" className={({ isActive }) =>
            isActive ? "navbar__link--active" : "navbar__link"
          } href="/about">
          About
        </NavLink> */}
      </div>
    </div>
  );
}

export default Navbar;

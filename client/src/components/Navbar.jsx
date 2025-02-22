import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";

function Navbar({ isAuthenticated = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropDownOpen) => !prevIsDropDownOpen);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".navbar__link")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="navbar">
      <NavLink to="/" className="navbar__logo">
        TruestRide
      </NavLink>
      {isAuthenticated ? (
        <div className="navbar__links">
          <NavLink to="/home" className="navbar__link" href="/home">
            Home
          </NavLink>
          <NavLink to="/chats" className="navbar__link" href="/chats">
            Chats
          </NavLink>
          <NavLink to="/library" className="navbar__link" href="/library">
            Library
          </NavLink>
          <div className="navbar__link" onClick={toggleDropdown}>
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <div
            className={
              isDropdownOpen
                ? "navbar__link__profile__dropdown active"
                : "navbar__link__profile__dropdown"
            }
          >
            <Link
              to="/profile"
              className="navbar__link__profile__dropdown__item"
            >
              <ion-icon name="person-outline"></ion-icon>
              Profile
            </Link>
            <Link
              to="/settings"
              className="navbar__link__profile__dropdown__item"
            >
              <ion-icon name="settings-outline"></ion-icon>
              Settings
            </Link>
            <Link
              to="/logout"
              className="navbar__link__profile__dropdown__item"
            >
              <ion-icon name="log-out-outline"></ion-icon>
              Logout
            </Link>
          </div>
        </div>
      ) : (
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
        </div>
      )}

      {/* <NavLink to="/about" className={({ isActive }) =>
            isActive ? "navbar__link--active" : "navbar__link"
          } href="/about">
          About
        </NavLink> */}
    </div>
  );
}

export default Navbar;

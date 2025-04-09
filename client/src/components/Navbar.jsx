import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { NavLink } from "react-router";
import { capitalize } from "../utils/helpers";

function Navbar() {
  const { isAuthenticated, user, signOut } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropDownOpen) => !prevIsDropDownOpen);
  };

  // Handler to close dropdown when user clicks outside the dropdown
  const handleClickOutside = (e) => {
    if (!e.target.closest(".navbar__link")) {
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when user clicks outside the dropdown
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
          <NavLink to="/" className="navbar__link" href="/">
            Home
          </NavLink>
          <NavLink to="/chats" className="navbar__link" href="/chats">
            Chats
          </NavLink>
          <NavLink to="/library" className="navbar__link" href="/library">
            Library
          </NavLink>
          <div className="navbar__link navbar__profile" onClick={toggleDropdown}>
            <span className="navbar__profile__name">
              {capitalize(user?.full_name?.split(" ")[0] || "")}
            </span>
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <div
            className={
              isDropdownOpen
                ? "navbar__link__profile__dropdown active"
                : "navbar__link__profile__dropdown"
            }
          >
            {/* <Link to="/profile" className="navbar__link__profile__dropdown__item">
              <ion-icon name="person-outline"></ion-icon>
              Profile
            </Link> */}
            <div to="/settings" className="navbar__link__profile__dropdown__item">
              <ion-icon name="settings-outline"></ion-icon>
              Settings
            </div>
            <div
              to="/logout"
              className="navbar__link__profile__dropdown__item"
              onClick={signOut}
            >
              <ion-icon name="log-out-outline"></ion-icon>
              Logout
            </div>
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
    </div>
  );
}

export default Navbar;

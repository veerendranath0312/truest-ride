import { useState, useEffect } from "react";
import { Home, MessagesSquare, Library, User, LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { NavLink, Link } from "react-router";
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
            <span className="navbar__link-text">Home</span>
            <Home className="navbar__link-icon" size={16} strokeWidth={2} />
          </NavLink>
          <NavLink to="/chats" className="navbar__link" href="/chats">
            <span className="navbar__link-text">Chats</span>
            <MessagesSquare className="navbar__link-icon" size={16} strokeWidth={2} />
          </NavLink>
          <NavLink to="/library" className="navbar__link" href="/library">
            <span className="navbar__link-text">Library</span>
            <Library className="navbar__link-icon" size={16} strokeWidth={2} />
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
            <Link to="/profile" className="navbar__link__profile__dropdown__item">
              <User size={14} color="var(--text-secondary)" />
              Profile
            </Link>

            <div
              to="/logout"
              className="navbar__link__profile__dropdown__item"
              onClick={signOut}
            >
              <LogOut size={14} color="var(--text-secondary)" />
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

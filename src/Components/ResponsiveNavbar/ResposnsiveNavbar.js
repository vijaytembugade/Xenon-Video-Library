import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import "./ResposnsiveNavbar.css";
import { useAuth } from "../../Contexts";

function ResposnsiveNavbar({ setShowResponsiveNavbar }) {
  const {
    state: { isLoggedIn },
  } = useAuth();

  const responsiveNavbarRef = useRef();

  useOnClickOutside(responsiveNavbarRef, () => setShowResponsiveNavbar(false));

  return (
    <div className="responsive-navbar-container" ref={responsiveNavbarRef}>
      <div className="title responsive-nav-link-menu">Menu</div>
      {isLoggedIn && (
        <div>
          <NavLink
            to="/videos"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Videos
          </NavLink>
          <NavLink
            to="/my-playlist"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Playlists
          </NavLink>
          <NavLink
            to="/likes"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Likes Videos
          </NavLink>
          <NavLink
            to="/watchlater"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Watch Later
          </NavLink>
          <NavLink
            to="/history"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            History
          </NavLink>
          <NavLink
            to="/user-details"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            User Details
          </NavLink>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <NavLink
            to="/videos"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Videos
          </NavLink>
          <NavLink
            to="/login"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ResposnsiveNavbar;

import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import useLockBodyScroll from "../../Hooks/useLockBodyScroll";
import "./ResposnsiveNavbar.css";
import { useAuth } from "../../Contexts";

function ResposnsiveNavbar({ setShowResponsiveNavbar }) {
  const {
    state: { isLoggedIn },
  } = useAuth();

  const responsiveNavbarRef = useRef();

  useOnClickOutside(responsiveNavbarRef, () => setShowResponsiveNavbar(false));
  useLockBodyScroll();

  return (
    <div className="responsive-navbar-container" ref={responsiveNavbarRef}>
      <div className="title responsive-nav-link-menu">
        <span>Menu</span>
        <span
          class="material-icons danger-text"
          onClick={() => setShowResponsiveNavbar(false)}
        >
          cancel
        </span>
      </div>
      <NavLink
        to="/"
        className="responsive-nav-link"
        onClick={() => setShowResponsiveNavbar(false)}
      >
        <span class="material-icons">home</span>
        Home
      </NavLink>
      <NavLink
        to="/videos"
        className="responsive-nav-link"
        onClick={() => setShowResponsiveNavbar(false)}
      >
        <span class="material-icons">smart_display</span>
        Videos
      </NavLink>
      {isLoggedIn && (
        <div>
          <NavLink
            to="/my-playlist"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">playlist_add</span>
            Playlists
          </NavLink>
          <NavLink
            to="/likes"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">thumb_up</span>
            Liked Videos
          </NavLink>
          <NavLink
            to="/watchlater"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">watch_later</span>
            Watch Later
          </NavLink>
          <NavLink
            to="/history"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">history</span>
            History
          </NavLink>
          <NavLink
            to="/user-details"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">account_circle</span>
            User Details
          </NavLink>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <NavLink
            to="/login"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">login</span>
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="responsive-nav-link"
            onClick={() => setShowResponsiveNavbar(false)}
          >
            <span class="material-icons">person_add</span>
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ResposnsiveNavbar;

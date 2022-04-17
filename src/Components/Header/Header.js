import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useAuth } from "../../Contexts";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const {
    state: { isLoggedIn, user },
  } = useAuth();

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  return (
    <nav>
      <div className="nav-brand" onClick={() => navigate("/")}>
        <img src="logo.png" alt="aayat" />
        <img className="aayat-logo" src="assets/logo.png" alt="Xenon" />
      </div>

      <section className="middle-nav-content">
        {isLoggedIn && (
          <>
            <NavLink to="/videos" className="middle-nav">
              <span className="material-icons">smart_display</span>
              <span>Videos</span>
            </NavLink>
            <NavLink to="/my-playlist" className="middle-nav">
              <span className="material-icons">queue</span>
              <span>My playlist</span>
            </NavLink>
          </>
        )}
      </section>

      {isLoggedIn && (
        <div className="end-nav">
          <span
            className="material-icons md-36"
            onClick={() => setShowDropDownMenu(!showDropDownMenu)}
          >
            expand_circle_down
          </span>
          <span
            onMouseEnter={() => setShowDropDownMenu(true)}
            onMouseLeave={() => setShowDropDownMenu(false)}
          >
            {showDropDownMenu && (
              <div className="dropdownmenu">
                <DropdownMenu />
              </div>
            )}
          </span>

          <Link to="/user-details">
            <span className="material-icons md-36">account_circle</span>
          </Link>
        </div>
      )}

      {!isLoggedIn && (
        <div className="end-nav">
          <Link to="/login">
            <button className="btn btn-small btn-primary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-small btn-secondary">Signup</button>
          </Link>
        </div>
      )}

      <div id="hamburger">
        <span>
          <span className="material-icons md-36">menu</span>
        </span>
      </div>
    </nav>
  );
};

export default Header;

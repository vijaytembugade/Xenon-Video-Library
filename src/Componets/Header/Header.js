import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

import "./Header.css";

const Header = () => {
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  return (
    <nav>
      <div className="nav-brand">
        <img src="logo.png" alt="aayat" />
        <img className="aayat-logo" src="assets/logo.png" alt="Xenon" />
      </div>

      <section className="middle-nav-content">
        <NavLink to="/videos" className="middle-nav">
          <span className="material-icons">smart_display</span>
          <span>Videos</span>
        </NavLink>

        <NavLink to="/my-playlis" className="middle-nav">
          <span className="material-icons">queue</span>
          <span>My playlist</span>
        </NavLink>
      </section>

      <div className="end-nav">
        <span
          class="material-icons md-36"
          onClick={() => setShowDropDownMenu(!showDropDownMenu)}
        >
          expand_circle_down
        </span>
        <span>
          {showDropDownMenu && (
            <div className="dropdownmenu">
              <DropdownMenu />
            </div>
          )}
        </span>

        <Link to="/user-details">
          <span class="material-icons md-36">account_circle</span>
        </Link>
      </div>

      <div id="hamburger">
        <span>
          <span class="material-icons md-36">menu</span>
        </span>
      </div>
    </nav>
  );
};

export default Header;

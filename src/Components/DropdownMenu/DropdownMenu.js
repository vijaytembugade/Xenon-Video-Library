import React from "react";
import { Link } from "react-router-dom";
import "./DropdownMenu.css";

function DropdownMenu() {
  return (
    <div className="dropdownmenu-container">
      <span>
        <Link to="/likes">Liked Videos</Link>
      </span>
      <span>
        <Link to="/watchlater">Watch Later</Link>
      </span>
      <span>
        <Link to="/history">History</Link>
      </span>
    </div>
  );
}

export default DropdownMenu;

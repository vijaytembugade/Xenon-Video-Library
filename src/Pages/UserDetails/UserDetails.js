import React from "react";
import "./UserDetails.css";
import { useAuth } from "../../Contexts";
import { LOGOUT } from "../../Constants";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { state, dispatch } = useAuth();

  const user = JSON.parse(localStorage.getItem("AUTH_USER"));

  function handleLogout() {
    localStorage.removeItem("AUTH_USER");
    localStorage.removeItem("AUTH_TOKEN");
    dispatch({ type: LOGOUT });

    toast.success("Logout Successfully!", { icon: "👋" });
  }
  const { firstname, lastName, email } = user;
  return (
    <div className="userdetails-container">
      <h2>User Details </h2>
      <span>
        First Name : <strong>{firstname}</strong>
      </span>
      <span>
        Last Name : <strong>{lastName}</strong>
      </span>
      <span>
        Email : <strong>{email}</strong>
      </span>
      <div className="logout-btn">
        <button className="btn btn-danger-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;

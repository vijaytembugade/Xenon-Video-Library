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
      <span>FirstName : {firstname}</span>
      <span>LastName : {lastName}</span>
      <span>Email : {email}</span>
      <div>
        <button className="btn btn-danger-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;

import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../Components/SignupForm/SignupForm";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-background">
      <div className="signup-container">
        <SignupForm />
        <p>
          Already have an account?{" "}
          <Link className="danger-text" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

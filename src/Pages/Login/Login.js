import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../Componets/LoginForm/LoginForm";
import "./Login.css";
const Login = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <LoginForm />
        <p>
          Dont have an Account ?{" "}
          <Link to="/signup" className="primary-text">
            Create new
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

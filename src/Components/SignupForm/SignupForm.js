import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SIGNUP_FAILED, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../../Constants";
import { useAuth } from "../../Contexts";
import { signupService } from "../../Services";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    state: { token },
    dispatch: authDispatch,
  } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Password does not match!");
      }
      if (email && password && firstName && lastName && confirmPassword) {
        authDispatch({ type: SIGNUP_REQUEST });
        const response = await signupService(
          email,
          password,
          firstName,
          lastName,
          confirmPassword,
          token
        );

        if (response !== undefined && response.status === 201) {
          localStorage.setItem("AUTH_TOKEN", response.data.encodedToken);
          localStorage.setItem(
            "AUTH_USER",
            JSON.stringify({
              firstname: response.data.createdUser.firstName,
              lastName: response.data.createdUser.lastName,
              email: response.data.createdUser.email,
            })
          );
          authDispatch({ type: SIGNUP_SUCCESS });
          toast.success("Account Created!");
          navigate(from, { replace: true });
        } else {
          throw new Error("Something went wrong!");
        }
      } else {
        throw new Error("All fields should be filled!");
      }
    } catch (error) {
      authDispatch({ type: SIGNUP_FAILED });
      toast.error(error.message);
    }
  }
  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <label>
          <span className="input-label">First Name</span>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          <span className="input-label">Last Name</span>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <span className="input-label">Email</span>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span className="input-label">Password</span>
          <input
            minLength="5"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span className="input-label">Confirm Password</span>
          <input
            minLength="5"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btn btn-danger-outline">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

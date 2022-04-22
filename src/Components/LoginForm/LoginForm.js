import React, { useState } from "react";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../Constants";
import { useAuth } from "../../Contexts";
import { loginService } from "../../Services";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { dispatch: authDispatch } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    authDispatch({ type: LOGIN_REQUEST });
    const response = await loginService(email, password);

    if (response !== undefined && response.status === 200) {
      localStorage.setItem("AUTH_TOKEN", response.data.encodedToken);
      localStorage.setItem(
        "AUTH_USER",
        JSON.stringify({
          firstname: response.data.foundUser.firstName,
          lastName: response.data.foundUser.lastName,
          email: response.data.foundUser.email,
        })
      );
      authDispatch({ type: LOGIN_SUCCESS });
      toast.success("Logged In Successfully!");
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid Credentials");
      authDispatch({ type: LOGIN_FAILED, payload: "Invalid Credentials" });
    }
  }
  function handleGuestLogin() {
    setEmail("adarshbalika@gmail.com");
    setPassword("Vijay@123");
  }
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <button className="btn btn-secondary" onClick={handleGuestLogin}>
          Guest Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts";

const PrivateRoutes = ({ children }) => {
  const { pathname } = useLocation();
  const {
    state: { isLoggedIn },
  } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: pathname }} replace />
      )}
    </>
  );
};

export default PrivateRoutes;

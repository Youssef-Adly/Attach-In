import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.Auth.user); // Replace with your user selector

  // Handle potential missing user state (optional)
  if (user?.is_active === 0) {
    // Or redirect to otp if user is active === 0
    return <Navigate to="/otp" />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

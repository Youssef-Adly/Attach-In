import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRouteLogged = ({ children }) => {
  const user = useSelector((state) => state.Auth.user); // Replace with your user selector

  // Handle potential missing user state (optional)
  if (user) {
    // Or redirect to login if user state is not yet available
    return <Navigate to="/home" />;
  }

  return user ? <Navigate to="/home" /> : children;
};

export default PrivateRouteLogged;

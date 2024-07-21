import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRouteActive = ({ children }) => {
  const user = useSelector((state) => state.Auth.user); // Replace with your user selector
  // console.log("user: ", user);

  // Handle potential missing user state (optional)
  if (user?.is_active !== 0) {
    // Or redirect to login if user state is not yet available
    return <Navigate to="/home" />;
  }

  return user?.is_active !== 0 ? <Navigate to="/home" /> : children;
};

export default PrivateRouteActive;

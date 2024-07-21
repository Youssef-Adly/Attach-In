import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import React from "react";

const PrivateRouteActive = ({ children }) => {
  const user = useSelector((state) => state.Auth.user); // Replace with your user selector

  // Handle potential missing user state (optional)
  if (user?.is_Active !== 0) {
    // Or redirect to login if user state is not yet available
    return <Navigate to="/home" />;
  } else {
    return children;
  }

  // return user?.token ? <Navigate to="/home" /> : children;
};

export default PrivateRouteActive;

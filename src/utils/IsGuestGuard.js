import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import React from "react";
import { toastError } from "./ToastsFunctions";

const PrivateGuestRoute = ({ children }) => {
  const user = useSelector((state) => state.Auth.user); // Replace with your user selector

  // Handle potential missing user state (optional)
  if (user.user_type === "guest") {
    setTimeout(() => {
      toastError("Guest, Please Login First");
    }, 100);
    // Or redirect to login if user state is not yet available
    return <Navigate to="/login" />;
  } else {
    return children;
  }

  // return user.user_type === "guest" ? <Navigate to="/login" /> : children;
};

export default PrivateGuestRoute;

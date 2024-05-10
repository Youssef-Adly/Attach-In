import React from "react";

const Loading = () => {
  return (
    <div
      className="col-12 d-flex justify-content-center align-items-center position-relative "
      style={{ backgroundColor: "#E2E1DB", height: "100vh" }}
    >
      <img src="AttachInLogo.png" className="img-fluid" alt="logo" />
      <div
        className="spinner-grow position-absolute"
        style={{
          width: "10rem",
          height: "10rem",
          color: "#ffffff6b",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;

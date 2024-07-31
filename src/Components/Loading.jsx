import React from "react";
import LoadingSuspese from "./LoadingSuspense";

const Loading = () => {
  return (
    <div
      className="col-12 d-flex flex-column  justify-content-center align-items-center position-relative "
      style={{ backgroundColor: "#E2E1DB", height: "100vh" }}
    >
      <img src="AttachInLogo.svg" className="img-fluid p-3" alt="logo" />
      <div
        // className="position-absolute"
        style={{
          maxWidth: "400px",
          // height: "10rem",
          color: "#ffffff6b",
        }}
        role="status"
      >
        <LoadingSuspese />
      </div>

      {/* <div
        className="spinner-grow position-absolute"
        style={{
          width: "10rem",
          height: "10rem",
          color: "#ffffff6b",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div> */}
    </div>
  );
};

export default Loading;

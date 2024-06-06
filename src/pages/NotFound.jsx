import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--sec-color)",
        minHeight: "100vh",
      }}
      className="position-relative d-flex flex-column justify-content-center align-items-center "
    >
      <div className="position-absolute top-0 start-0 mt-4 d-flex align-items-center gap-3 ms-4">
        <Link to={"/home"}>
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginBottom: "5px",
            }}
          />
        </Link>
        <h4 style={{ color: "var(--text-main-color)" }}>
          Back To Home
          {/* McDonalds <br /> */}
          {/* <small className="small">Marketing</small> */}
          {/* {i18n.language === "ar" ? Course.name_ar : Course.name_en} */}
        </h4>
      </div>
      <h1 className="text-light">404 Page Not Found</h1>
      <img src="/Opener Loading.gif" className="col-3" alt="Loading" />
    </div>
  );
};

export default NotFound;

import {
  faFacebook,
  faLinkedin,
  faSquareInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="d-flex flex-column-reverse flex-lg-row p-3 text-center">
        <div className="col-lg-6 col-12 d-flex flex-column flex-sm-row justify-content-center justify-content-lg-around">
          <img
            src="logowithmaincolor.svg"
            alt="logowithmaincolor.svg"
            className="col-lg-5 img-fluid"
          />
          <div
            className="col-12 col-sm-6 d-flex justify-content-around align-items-center"
            style={{ color: "var(--main-color)" }}
          >
            <FontAwesomeIcon icon={faSquareInstagram} fontSize={30} />
            <FontAwesomeIcon icon={faFacebook} fontSize={30} />
            <FontAwesomeIcon icon={faTiktok} fontSize={30} />
            <FontAwesomeIcon icon={faLinkedin} fontSize={30} />
          </div>
        </div>
        <div className="col-lg-6 col-12 p-3" role="group">
          <Link to={"/about"} className="btn">
            About Us
          </Link>
          <Link to={"/FAQ"} className="btn">
            FAQ
          </Link>
          <Link to={"/terms"} className="btn">
            Terms &amp; Conditions
          </Link>
          <Link to={"/contact"} className="btn">
            Contact US
          </Link>
          <Link to={"/partners"} className="btn">
            Our Partners
          </Link>
        </div>
      </div>
      {/*  */}
      <div>
        <h6 className="text-center text-lg-start p-4 pt-0">
          Attach in Copyright &copy; 2024. All rights reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;

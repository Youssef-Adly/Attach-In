import {
  faFacebook,
  faLinkedin,
  faSquareInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const [t] = useTranslation();

  return (
    <footer>
      <div className="d-flex flex-column-reverse flex-lg-row p-3 text-center">
        <div className="gap-3 col-lg-6 col-12 d-flex flex-column flex-sm-row justify-content-center justify-content-lg-around">
          <img
            src="logowithmaincolor.svg"
            alt="logowithmaincolor.svg"
            className="col-lg-5 img-fluid logoBrand"
          />
          <div
            className="col-12 col-sm-6 d-flex justify-content-around align-items-center"
            style={{ color: "var(--text-main-color)" }}
          >
            <FontAwesomeIcon icon={faSquareInstagram} fontSize={30} />
            <Link
              to={"https://www.facebook.com/profile.php?id=61560351413610"}
              target="_blank"
            >
              <FontAwesomeIcon icon={faFacebook} fontSize={30} color="#eee" />
            </Link>
            <FontAwesomeIcon icon={faTiktok} fontSize={30} color="#eee" />
            <FontAwesomeIcon icon={faLinkedin} fontSize={30} color="#eee" />
          </div>
        </div>
        <div className="col-lg-6 col-12 p-3" role="group">
          <Link to={"/about"} className="btn">
            {t("About")}
          </Link>
          <Link to={"/FAQ"} className="btn">
            {t("FAQ")}
          </Link>
          <Link to={"/terms"} className="btn">
            {t("Terms & Conditions")}
          </Link>
          <Link to={"/contactus"} className="btn">
            {t("Contact Us")}
          </Link>
          <Link to={"/partners"} className="btn">
            {t("Our Partners")}
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

export default memo(Footer);

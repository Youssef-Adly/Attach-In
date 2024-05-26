import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faAddressCard,
  faCircleQuestion,
  faGear,
  faHandshakeSimple,
  faMagnifyingGlass,
  faMoneyBill,
  faPeopleGroup,
  faPlay,
  faQuestionCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AsideRight = () => {
  const [t] = useTranslation();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 pb-1 px-2 px-lg-3 position-relative "
      style={{
        backgroundColor: "#var(--main-color)",
        color: "var(--text-main-color)",
      }}
    >
      <Link
        to=""
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none"
      >
        {/* Avatar */}
        <div className="avatar avatar-story me-2">
          <img
            className="avatar-img rounded-circle"
            src="https://github.com/mdo.png"
            alt=""
          />
        </div>
      </Link>
      <span className="fs-4 text-light">Christina Waguih</span>
      <Link to="" className="text-decoration-none text-light listItem">
        {t("View Profile")}
      </Link>
      <form className="d-flex my-3 position-relative" role="search">
        <input
          className="form-control me-1 rounded-5 "
          type="search"
          placeholder={t("Search Attach-In")}
          aria-label="Search"
        />
        <button
          className="btn-sm btn"
          type="submit"
          style={{
            position: "absolute",
            right: "10px",
            top: "3px",
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} color="var(--sec-white)" />
        </button>
      </form>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="">
          <Link
            to="/setting"
            className="nav-link listItem text-light"
            aria-current="page"
          >
            {/* <svg className="bi pe-none me-2" width={16} height={16}>
              <use xlinkHref="#home" />
            </svg> */}
            <FontAwesomeIcon icon={faGear} className="me-2 pe-0 " />
            {t("Setting")}
          </Link>
        </li>
        <li>
          <Link to="/courses" className="nav-link listItem text-light">
            {/* <img
              src="CoursesIcon.svg"
              alt="CoursesIcon.svg"
              className="me-2 pe-0"
              width={25}
            /> */}
            <FontAwesomeIcon icon={faPlay} className="me-2 pe-0" />
            {t("Courses")}
          </Link>
        </li>
        <li>
          <Link to="/messages" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faComment} className="me-2 pe-0" />
            {t("Messages")}
          </Link>
        </li>
        {/*  */}
        <hr />
        {/*  */}
        <li>
          <Link to="/about" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faPeopleGroup} className="me-2 pe-0" />
            {t("About")}
          </Link>
        </li>
        <li>
          <Link to="/FAQ" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faCircleQuestion} className="me-2 pe-0" />
            {t("FAQ")}
          </Link>
        </li>
        <li>
          <Link to="" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faMoneyBill} className="me-2 pe-0" />
            {t("Subscription")}
          </Link>
        </li>
        <li>
          <Link to="/partners" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faHandshakeSimple} className="me-2 pe-0" />
            {t("Our Partners")}
          </Link>
        </li>
        <li>
          <Link to="/terms" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2 pe-0" />
            {t("Terms & Conditions")}
          </Link>
        </li>
        <li>
          <Link to="" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faAddressCard} className="me-2 pe-0" />
            {t("Contact Us")}
          </Link>
        </li>
        <li>
          <Link to="" className="nav-link listItem text-light">
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2 pe-0" />
            {t("Log Out")}
          </Link>
        </li>
      </ul>
      <hr />
      {/* <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center listItem text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt
            width={32}
            height={32}
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div> */}
      <small>
        Attach in Copyright © 2024.
        <br /> All rights reserved.
      </small>
    </div>
  );
};

export default AsideRight;

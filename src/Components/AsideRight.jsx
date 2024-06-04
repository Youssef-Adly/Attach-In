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
import { Link, NavLink } from "react-router-dom";

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
      <div data-bs-dismiss="offcanvas">
        <Link
          to="/profile"
          className="text-decoration-none text-light listItem"
        >
          {t("View Profile")}
        </Link>
      </div>
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
        <li className="" data-bs-dismiss="offcanvas">
          <NavLink
            to="/setting"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faGear} className="me-2 pe-0 " />
            {t("Setting")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/courses"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            {/* <img
              src="CoursesIcon.svg"
              alt="CoursesIcon.svg"
              className="me-2 pe-0"
              width={25}
            /> */}
            <FontAwesomeIcon icon={faPlay} className="me-2 pe-0" />
            {t("Courses")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/messages"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faComment} className="me-2 pe-0" />
            {t("Messages")}
          </NavLink>
        </li>
        {/*  */}
        <hr />
        {/*  */}
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/about"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faPeopleGroup} className="me-2 pe-0" />
            {t("About")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/FAQ"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="me-2 pe-0" />
            {t("FAQ")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to=""
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="me-2 pe-0" />
            {t("Subscription")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/partners"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faHandshakeSimple} className="me-2 pe-0" />
            {t("Our Partners")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/terms"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2 pe-0" />
            {t("Terms & Conditions")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to="/contactus"
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faAddressCard} className="me-2 pe-0" />
            {t("Contact Us")}
          </NavLink>
        </li>
        <li data-bs-dismiss="offcanvas">
          <NavLink
            to=""
            className="nav-link listItem text-light"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2 pe-0" />
            {t("Log Out")}
          </NavLink>
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
        <br />
        All rights reserved.
      </small>
    </div>
  );
};

export default AsideRight;

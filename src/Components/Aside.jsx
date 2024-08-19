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
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "../Redux/slices/AuthSlice";

const Aside = () => {
  const baseURL = "https://attachin.com/";
  const [t] = useTranslation();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let [search, setSearch] = useState("");

  const searchWithQuery = () => {
    if (search) {
      navigate(`/search?name=${search}`);
      setSearch("");
    }
    if (location.pathname === "/search") {
      window.location.reload();
    }
  };

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const logout = (e) => {
    navigate("/");
    dispatch(setAuth(null));
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 py-3 px-2 px-lg-3 bg-body-tertiary aside-scroll"
      style={{
        position: "sticky",
        top: "0",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Link
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        to="/profile"
      >
        {/* Avatar */}
        <div className="avatar avatar-story me-2">
          <img
            className="avatar-img rounded-circle"
            src={
              user.profile_photo ? baseURL + user.profile_photo : "/profile.png"
            }
            // src="https://github.com/mdo.png"
            alt=""
          />
        </div>
      </Link>
      <span
        className="fs-4"
        style={{
          color: "var(--text-main-color)",
          fontFamily: "Arial Rounded MT",
        }}
      >
        {user.full_name}
      </span>
      <Link
        to="/profile"
        className="linkList text-decoration-none"
        style={{ width: "fit-content" }}
      >
        {t("View Profile")}
      </Link>
      <div className="d-flex my-3 position-relative" role="search">
        <input
          className="form-control me-1 rounded-5 "
          type="text"
          placeholder={t("Search Attach-In")}
          value={search}
          onChange={(e) => handleSearchChange(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchWithQuery();
            }
          }}
        />
        <button
          className="btn-sm btn"
          // type="submit"
          style={{
            position: "absolute",
            right: "10px",
            top: "3px",
          }}
          onClick={searchWithQuery}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/setting"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            {/* <svg className="bi pe-none me-2" width={16} height={16}>
              <use xlinkHref="#home" />
            </svg> */}
            <FontAwesomeIcon icon={faGear} className="me-2 pe-0 txtColor" />
            {t("Setting")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className="nav-link link-body-emphasis txtColor"
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
            <FontAwesomeIcon icon={faPlay} className="me-2 pe-0 txtColor" />
            {t("Courses")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messages"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
                transform: isTransitioning ? "scale(.80)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon icon={faComment} className="me-2 pe-0 txtColor" />
            {t("Messages")}
          </NavLink>
        </li>
        {/*  */}
        <hr />
        {/*  */}
        <li>
          <NavLink
            to="/about"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              className="me-2 pe-0 txtColor"
            />
            {t("About")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/FAQ"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="me-2 pe-0 txtColor"
            />
            {t("FAQ")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Subscription"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="me-2 pe-0 txtColor"
            />
            {t("Subscription")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/partners"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faHandshakeSimple}
              className="me-2 pe-0 txtColor"
            />
            {t("Our Partners")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/terms"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="me-2 pe-0 txtColor"
            />
            {t("Terms & Conditions")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contactus"
            className="nav-link link-body-emphasis txtColor"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faAddressCard}
              className="me-2 pe-0 txtColor"
            />
            {t("Contact Us")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to=""
            className="nav-link link-body-emphasis txtColor"
            onClick={(e) => logout(e)}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "var(--sec-color)" : "unset",
              };
            }}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="me-2 pe-0 txtColor"
            />
            {t("Log Out")}
          </NavLink>
        </li>
      </ul>
      <hr />
      {/* <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
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

export default memo(Aside);

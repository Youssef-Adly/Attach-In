import React from "react";
import "./Setting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Setting = () => {
  return (
    <main className="px-3">
      {/* Header Title */}
      <h1 style={{ color: "var(--main-color)" }}>Settings</h1>
      <hr />
      {/* Edit Profile */}
      <Link to={"/edit"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="edit.svg" alt="edit" />
        <div style={{ color: "var(--main-color)" }}>Edit Profile</div>
      </Link>
      <hr />
      {/* Terms & Conditions */}
      <Link to={"/reset"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="lock.svg" alt="lock" />
        <div style={{ color: "var(--main-color)" }}>Change Password</div>
      </Link>
      <hr />
      {/*  */}
      {/* Dark Mode Btn */}
      <div className="d-flex gap-4 align-items-center ">
        <div style={{ color: "var(--main-color)" }}>Light Mode</div>
        <div className="checkbox-wrapper-5 mt-2">
          <div className="check">
            <input id="check-5" type="checkbox" />
            <label htmlFor="check-5" />
          </div>
        </div>
        <div style={{ color: "var(--main-color)" }}>Dark Mode</div>
      </div>
      <hr />
      {/* Localization */}
      <div className="d-flex gap-4 align-items-center">
        <div style={{ color: "var(--main-color)" }}>Localization</div>
        <div className="checkbox-wrapper-55">
          <label className="rocker rocker-small">
            <input type="checkbox" />
            <span className="switch-left">AR</span>
            <span className="switch-right">EN</span>
          </label>
        </div>
      </div>
      <hr />
      {/* Contact Us */}
      <Link
        to={"/contact"}
        className="nav-link d-flex gap-3 align-items-center "
      >
        <img src="contactUS.svg" alt="contact" />
        <div style={{ color: "var(--main-color)" }}>Contact Us</div>
      </Link>
      <hr />
      {/*  */}
      {/* Terms & Conditions */}
      <Link to={"/terms"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="terms.svg" alt="terms" />
        <div style={{ color: "var(--main-color)" }}>Terms & Conditions</div>
      </Link>
      <hr />
      {/*  */}
    </main>
  );
};

export default Setting;

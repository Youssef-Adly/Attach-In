import React from "react";
import "./Setting.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/slices/themeSlice";

const Setting = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const switchMode = (e) => {
    // console.log(e);
    // let root = document.documentElement;
    // e.target.checked
    //   ? (root.dataset.bsTheme = "dark")
    //   : (root.dataset.bsTheme = "light");
    dispatch(toggleTheme());
    // console.log(theme);
  };

  return (
    <main className="px-3">
      {/* Header Title */}
      <h1 style={{ color: "var(--text-main-color)" }}>Settings</h1>
      <hr />
      {/* Edit Profile */}
      <Link to={"/edit"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="edit.svg" alt="edit" />
        <div style={{ color: "var(--text-main-color)" }}>Edit Profile</div>
      </Link>
      <hr />
      {/* Terms & Conditions */}
      <Link to={"/reset"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="lock.svg" alt="lock" />
        <div style={{ color: "var(--text-main-color)" }}>Change Password</div>
      </Link>
      <hr />
      {/*  */}
      {/* Dark Mode Btn */}
      <div className="d-flex gap-4 align-items-center ">
        <div style={{ color: "var(--text-main-color)" }}>Light Mode</div>
        <div className="checkbox-wrapper-5 mt-2">
          <div className="check">
            {/* checked === Dark */}
            <input
              id="check-5"
              type="checkbox"
              checked={theme}
              onChange={(e) => switchMode(e)}
            />
            <label htmlFor="check-5" />
          </div>
        </div>
        <div style={{ color: "var(--text-main-color)" }}>Dark Mode</div>
      </div>
      <hr />
      {/* Localization */}
      <div className="d-flex gap-4 align-items-center">
        <div style={{ color: "var(--text-main-color)" }}>Localization</div>
        <div className="checkbox-wrapper-55">
          <label className="rocker rocker-small">
            {/* checked === AR */}
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
        <div style={{ color: "var(--text-main-color)" }}>Contact Us</div>
      </Link>
      <hr />
      {/*  */}
      {/* Terms & Conditions */}
      <Link to={"/terms"} className="nav-link d-flex gap-3 align-items-center ">
        <img src="terms.svg" alt="terms" />
        <div style={{ color: "var(--text-main-color)" }}>
          Terms & Conditions
        </div>
      </Link>
      <hr />
      {/*  */}
    </main>
  );
};

export default Setting;

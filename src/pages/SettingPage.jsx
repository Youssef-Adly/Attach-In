import React, { memo, useEffect, useState } from "react";
import "./SettingPage.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/slices/themeSlice";
import { toggleLanguage } from "../Redux/slices/langSlice";
import { useTranslation } from "react-i18next";
import { toastInfo } from "../utils/ToastsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const SettingPage = () => {
  const theme = useSelector((state) => state.theme.value);
  const lang = useSelector((state) => state.lang.value);

  const dispatch = useDispatch();

  const [t] = useTranslation();

  const switchDarkMode = (e) => {
    dispatch(toggleTheme());
  };

  const switchLanguage = (e) => {
    e.target.checked
      ? dispatch(toggleLanguage("ar"))
      : dispatch(toggleLanguage("en"));
  };

  //#region [PWA Install Button]
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the default mini-infobar
      event.preventDefault();
      setDeferredPrompt(event);
    });

    return () => {
      // Cleanup function to remove the event listener on unmount
      window.removeEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
      });
    };
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      console.log("deferredPrompt: ", deferredPrompt);
      // Trigger the native installation prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null); // Reset for future prompts

      console.log(`User response to install prompt: ${outcome}`);
      // toastInfo("App installation prompt not available.")
    } else {
      console.log("App installation prompt not available.");
      toastInfo("App installation not available, try changing your browser");
    }
  };
  //#endregion

  return (
    <main className="px-3 dir">
      {/* Header Title */}
      <h1 style={{ color: "var(--text-main-color)" }}>{t("Settings")}</h1>
      <hr />
      {/* Edit Profile */}
      <Link
        to={"/editprofile"}
        className="nav-link d-flex gap-3 align-items-center"
        style={{
          width: "fit-content",
        }}
      >
        <img src="/edit.svg" alt="edit" />
        <div style={{ color: "var(--text-main-color)" }}>
          {t("Edit Profile")}
        </div>
      </Link>
      <hr />
      {/* Rest Password */}
      <Link
        to={"/reset"}
        className="nav-link d-flex gap-3 align-items-center"
        style={{
          width: "fit-content",
        }}
      >
        <img src="/lock.svg" alt="lock" />
        <div style={{ color: "var(--text-main-color)" }}>
          {t("Reset Password")}
        </div>
      </Link>
      <hr />
      {/*  */}
      {/* Dark Mode Btn */}
      <div className="d-flex gap-4 align-items-center ">
        <div style={{ color: "var(--text-main-color)" }}>
          {lang === "ar" ? t("Dark Mode") : t("Light Mode")}
        </div>
        <div className="checkbox-wrapper-5 mt-2">
          <div className="check">
            {/* checked === Dark */}
            <input
              id="check-5"
              type="checkbox"
              checked={theme}
              onChange={(e) => switchDarkMode(e)}
            />
            <label htmlFor="check-5" />
          </div>
        </div>
        <div style={{ color: "var(--text-main-color)" }}>
          {lang === "ar" ? t("Light Mode") : t("Dark Mode")}
        </div>
      </div>
      <hr />
      {/* Localization */}
      <div className="d-flex gap-4 align-items-center">
        <div style={{ color: "var(--text-main-color)" }}>
          {t("Localization")}
        </div>
        <div className="checkbox-wrapper-55">
          <label className="rocker rocker-small">
            {/* checked === AR */}
            <input
              type="checkbox"
              checked={lang === "ar"}
              onChange={(e) => switchLanguage(e)}
            />
            <span className="switch-left">AR</span>
            <span className="switch-right">EN</span>
          </label>
        </div>
      </div>
      <hr />
      {/* Contact Us */}
      <Link
        to={"/contactus"}
        className="nav-link d-flex gap-3 align-items-center"
        style={{
          width: "fit-content",
        }}
      >
        <img src="/contacts.svg" alt="contact" />
        <div style={{ color: "var(--text-main-color)" }}>{t("Contact Us")}</div>
      </Link>
      <hr />
      {/*  */}
      {/* Terms & Conditions */}
      <Link
        to={"/terms"}
        className="nav-link d-flex gap-3 align-items-center"
        style={{
          width: "fit-content",
        }}
      >
        <img src="/terms.svg" alt="terms" />
        <div style={{ color: "var(--text-main-color)" }}>
          {t("Terms & Conditions")}
        </div>
      </Link>
      <hr />
      <div
        className="nav-item pwaBtn p-2 text-light border rounded"
        style={{
          backgroundColor: "var(--main-color)",
          width: "fit-content",
          zIndex: "999",
        }}
      >
        <Link
          onClick={handleClick}
          className="nav-link fs-6 py-1 fw-bold col-12 px-3"
          // to="https://play.google.com/store/apps/details?id=com.social.attachin"
          // target="_blank"
        >
          <FontAwesomeIcon icon={faGooglePlay} className="mx-3" />
          {t("Install Web App As a PWA")}
        </Link>
      </div>
      <hr />
      {/*  */}
    </main>
  );
};

export default memo(SettingPage);

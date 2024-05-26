import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import InternshipsPage from "./pages/InternshipsPage";
import About from "./pages/About";
import FQAPage from "./pages/FQAPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import OurPartnersPage from "./pages/OurPartnersPage";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import SettingPage from "./pages/SettingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import MessagesPage from "./pages/MessagesPage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./i18n";

function App() {
  const root = document.documentElement;
  const theme = useSelector((state) => state.theme.value);
  const lang = useSelector((state) => state.lang.value);

  const x = useTranslation();

  useEffect(() => {
    // Set Theme on site init
    theme ? (root.dataset.bsTheme = "dark") : (root.dataset.bsTheme = "light");
    // Set Language on site init
    lang === "ar" ? x.i18n.changeLanguage("ar") : x.i18n.changeLanguage("en");
    lang === "ar" ? (root.lang = "ar") : (root.lang = "en");
    // console.log("lang=> ", lang);
    // console.log("i18nlang=> ", x.i18n.language);
  }, [lang, root, theme, x.i18n]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQ" element={<FQAPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/partners" element={<OurPartnersPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

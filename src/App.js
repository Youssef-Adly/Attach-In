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
import { useDispatch, useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.value);
  // const dispatch = useDispatch();

  useEffect(() => {
    console.log(theme);
    if (theme) {
      document.documentElement.dataset.bsTheme = "dark";
    } else {
      document.documentElement.dataset.bsTheme = "light";
    }
  }, [theme]);

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

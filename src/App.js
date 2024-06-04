import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, useLocation } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
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
import HomeLayout from "./Components/HomeLayout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./i18n";
import ProfilePage from "./pages/ProfilePage";
import ContactUs from "./pages/ContactUs";
import EditProfile from "./pages/EditProfile";

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

  // const { pathname } = useLocation();
  // let { pathname } = 1;
  // console.log(pathname);
  // useEffect(() => {
  //   document.documentElement.scrollTo(0, 0);
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "network", element: <NetworkPage /> },
        { path: "notifications", element: <NotificationsPage /> },
        { path: "internships", element: <InternshipsPage /> },
        { path: "about", element: <About /> },
        { path: "FAQ", element: <FQAPage /> },
        { path: "about", element: <About /> },
        { path: "terms", element: <TermsAndConditionsPage /> },
        { path: "partners", element: <OurPartnersPage /> },
        { path: "messages", element: <MessagesPage /> },
        { path: "contactus", element: <ContactUs /> },
        { path: "setting", element: <SettingPage /> },
        { path: "reset", element: <ResetPasswordPage /> },
        { path: "courses", element: <CoursesPage /> },
        { path: "courses/:id", element: <CourseDetailsPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "editprofile", element: <EditProfile /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import {
  RouterProvider,
  createBrowserRouter,
  // useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Suspention from "./Components/Suspention";
// import LoadingSuspese from "./Components/LoadingSuspense";
// import Loading from "./Components/Loading";
// Lazy Loadin Routes
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const UniversitySchedule = lazy(() => import("./pages/UniversitySchedule"));
const UniversityNews = lazy(() => import("./pages/UniversityNews"));
const UniversityPage = lazy(() => import("./pages/UniversityPage"));
const InternshipDetails = lazy(() => import("./pages/InternshipDetails"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const HomeLayout = lazy(() => import("./Components/HomeLayout"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const SettingPage = lazy(() => import("./pages/SettingPage"));
const NetworkPage = lazy(() => import("./pages/NetworkPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const OurPartnersPage = lazy(() => import("./pages/OurPartnersPage"));
const TermsAndConditionsPage = lazy(() =>
  import("./pages/TermsAndConditionsPage")
);
const FQAPage = lazy(() => import("./pages/FQAPage"));
const About = lazy(() => import("./pages/About"));
const InternshipsPage = lazy(() => import("./pages/InternshipsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));

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
  // }, [window.location.pathname]);

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
        { path: "internships/:id", element: <InternshipDetails /> },
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
        { path: "companyProfile", element: <CompanyPage /> },
        { path: "universityProfile", element: <UniversityPage /> },
        { path: "university/posts", element: <UniversityNews /> },
        { path: "university/schedule", element: <UniversitySchedule /> },
        { path: "Subscription", element: <PricingPage /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <div className="App">
      <Suspense fallback={<Suspention />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </div>
  );
}

export default App;

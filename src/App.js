import React, { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRouteLogged from "./utils/isNotLoggedGuard";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Suspention from "./Components/Suspention";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./i18n";

// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

// Import the plugin code
import PrivateRoute from "./utils/IsLoggedGuard";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// Register the plugins
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import SearchAttachInNetwork from "./pages/SearchAttachInNetwork";
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
);
// import LoadingSuspese from "./Components/LoadingSuspense";
// import Loading from "./Components/Loading";
/////////////////////////////////
// Lazy Loadin Routes
//#region
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
const UserSkills = lazy(() => import("./pages/UserSkills"));
const UserPosts = lazy(() => import("./pages/UserPosts"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
//#endregion
/////////////////////////////////

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
    {
      path: "/login",
      element: (
        <PrivateRouteLogged>
          <Login />
        </PrivateRouteLogged>
      ),
    },
    {
      path: "/register",
      element: (
        <PrivateRouteLogged>
          <Register />
        </PrivateRouteLogged>
      ),
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <HomeLayout />
        </PrivateRoute>
      ),
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
        { path: "companyProfile/:id", element: <CompanyPage /> },
        { path: "universityProfile/:id", element: <UniversityPage /> },
        { path: "university/posts/:id", element: <UniversityNews /> },
        { path: "university/schedule/:id", element: <UniversitySchedule /> },
        { path: "Subscription", element: <PricingPage /> },
        { path: "userExp/:id", element: <UserSkills /> },
        { path: "userPosts/:id", element: <UserPosts /> },
        { path: "profile/:id", element: <UserProfile /> },
        { path: "search/*", element: <SearchAttachInNetwork /> },
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

import React, { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Suspention from "./Components/Suspention";
import PrivateRouteLogged from "./utils/isNotLoggedGuard";
import PrivateRoute from "./utils/IsLoggedGuard";
import PrivateGuestRoute from "./utils/IsGuestGuard";
import PrivateRouteActive from "./utils/isActive";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./i18n";

/////////////////////////////////
//#region
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
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// Register the plugins
import FilePondPluginImageResize from "filepond-plugin-image-resize";
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageEdit,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
);
/////////////////////////////////
//#endregion

// Lazy Loadin Routes
//#region
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const UniversitySchedule = lazy(() => import("./pages/UniversitySchedule"));
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
const SearchAttachInNetwork = lazy(() =>
  import("./pages/SearchAttachInNetwork")
);
const CompanyInternships = lazy(() => import("./pages/CompanyInternships"));
const Chat = lazy(() => import("./pages/Chat"));
const OtpAuth = lazy(() => import("./pages/OtpAuth"));

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
      path: "/otp",
      element: (
        <PrivateRouteActive>
          <OtpAuth />
        </PrivateRouteActive>
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
        {
          path: "network",
          element: (
            <PrivateGuestRoute>
              <NetworkPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "notifications",
          element: (
            <PrivateGuestRoute>
              <NotificationsPage />
            </PrivateGuestRoute>
          ),
        },
        { path: "internships", element: <InternshipsPage /> },
        {
          path: "internships/:id",
          element: (
            <PrivateGuestRoute>
              <InternshipDetails />
            </PrivateGuestRoute>
          ),
        },
        { path: "about", element: <About /> },
        { path: "FAQ", element: <FQAPage /> },
        { path: "terms", element: <TermsAndConditionsPage /> },
        { path: "partners", element: <OurPartnersPage /> },
        {
          path: "messages",
          element: (
            <PrivateGuestRoute>
              <MessagesPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "chat/:id",
          element: (
            <PrivateGuestRoute>
              <Chat />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "contactus",
          element: (
            <PrivateGuestRoute>
              <ContactUs />
            </PrivateGuestRoute>
          ),
        },
        { path: "setting", element: <SettingPage /> },
        {
          path: "reset",
          element: (
            <PrivateGuestRoute>
              <ResetPasswordPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "courses",
          element: (
            <PrivateGuestRoute>
              <CoursesPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "courses/:id",
          element: (
            <PrivateGuestRoute>
              <CourseDetailsPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <PrivateGuestRoute>
              <ProfilePage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "editprofile",
          element: (
            <PrivateGuestRoute>
              <EditProfile />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "companyProfile/:id",
          element: (
            <PrivateGuestRoute>
              <CompanyPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "universityProfile/:id",
          element: (
            <PrivateGuestRoute>
              <UniversityPage />
            </PrivateGuestRoute>
          ),
        },
        {
          path: "university/schedule/:id",
          element: (
            <PrivateGuestRoute>
              <UniversitySchedule />
            </PrivateGuestRoute>
          ),
        },
        { path: "Subscription", element: <PricingPage /> },
        {
          path: "userExp/:id",
          element: (
            <PrivateGuestRoute>
              <UserSkills />
            </PrivateGuestRoute>
          ),
        },
        { path: "userPosts/:id", element: <UserPosts /> },
        {
          path: "profile/:id",
          element: (
            <PrivateGuestRoute>
              <UserProfile />
            </PrivateGuestRoute>
          ),
        },
        { path: "search/*", element: <SearchAttachInNetwork /> },
        {
          path: "companyProfile/internships/:id",
          element: (
            <PrivateGuestRoute>
              <CompanyInternships />
            </PrivateGuestRoute>
          ),
        },
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

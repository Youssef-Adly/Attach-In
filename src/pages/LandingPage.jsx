import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import "./Landingpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";
import PWAPrompt from "react-ios-pwa-prompt";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/actions/authActions";
import ErrorMessage from "../Components/ErrorMessage";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getGreeting } from "../Components/formatDateForPost";
import { setAuth } from "../Redux/slices/AuthSlice";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { toastError } from "../utils/ToastsFunctions";

// yup Schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email can't be empty"),
    password: yup
      .string()
      .min(6, "Password should be more than 6 characters")
      .required("Password can't be empty"),
  })
  .required();

const LandingPage = () => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const darkTheme = useSelector((state) => state.theme.value);

  const user = useSelector((state) => state.Auth.user);
  const [loading, setLoading] = useState(false);
  const [FormErrors, setFormErrors] = useState(null);
  const [partners, setPartners] = useState(null);
  const [universities, setUniversities] = useState(null);

  useEffect(() => {
    //Set Partners
    axios
      .get(baseURL + "getOurPartners")
      .then((res) => {
        setPartners(res.data.data.partners.reverse());
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
    //Set Universities
    axios
      .get("https://attachin.com/api/getUsersWithSearch?name=university", {
        search: "university",
      })
      .then((res) => {
        setUniversities(() =>
          res.data.data.filter(
            (user) =>
              (user.user_type === "university") & (user.full_name !== "dffddf")
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting /* , isValid, isLoading, isValidating */,
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    // console.log("data: ", data);
    setLoading(true);
    setFormErrors(null);

    dispatch(login(data)).then((res) => {
      // console.log(res);
      if (res.error?.message !== "Rejected") {
        navigate("/home");
      } else {
        setFormErrors(res.payload);
        // console.log("res.payload: ", res.payload);
        getErrorsFromAPI(res.payload);
      }
      setLoading(false);
    });
    // console.log(data);
  };

  // To Show Api Errors In View
  const getErrorsFromAPI = (err) => {
    let errorsArr = [];
    for (let i = 0; i < Object.entries(err).length; i++) {
      if (Object.entries(err)[i][1].isError) {
        // console.log({
        //   [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        // });
        errorsArr.push({
          [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        });
      }
    }
    console.log("errorsArr: ", errorsArr);
    setFormErrors([...errorsArr]);
  };

  const logout = (e) => {
    dispatch(setAuth(null));
    // window.location.reload();
    // navigate("/");
  };

  //#region [Loading Screen Timer]
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);
  //#endregion

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header
            className="landingHeader bgGradiant3"
            style={
              {
                // minHeight: "80vh",
                // backgroundColor: "var(--offWhite-color)",
              }
            }
          >
            <nav className="p-4 d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center ">
              <img
                src="AttachInLogo.png"
                alt="brand"
                className="logoBrand img-fluid"
                // style={{ height: "70px" }}
                // className="img-fluid"
              />
              <div className="d-none d-md-flex align-items-center ">
                <div className="navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav align-items-center flex-row gap-5 me-auto mb-2 mb-lg-0">
                    <li
                      className="nav-item"
                      style={{
                        borderTop: "5px solid var(--text-main-color)",
                      }}
                    >
                      <Link className="nav-link fs-5" to="/home">
                        {t("Community")}
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      style={{
                        borderTop: "5px solid var(--text-main-color)",
                      }}
                    >
                      <Link className="nav-link fs-5" to="/courses">
                        {t("Learning")}
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      style={{
                        borderTop: "5px solid var(--text-main-color)",
                      }}
                    >
                      <Link className="nav-link fs-5" to="/internships">
                        {t("Internships")}
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      style={{
                        borderTop: "5px solid var(--text-main-color)",
                      }}
                    >
                      <Link className="nav-link fs-5" to="/about">
                        {t("About")}
                      </Link>
                    </li>
                    <li
                      className="nav-item px-4 border rounded"
                      style={{
                        backgroundColor: "var(--pink-color)",
                        color: "var(--text-main-color)",
                      }}
                    >
                      {!(user && user?.user_type !== "guest") ? (
                        <Link className="nav-link fs-5 col-12" to="/login">
                          {t("Sign in")}
                        </Link>
                      ) : (
                        <Link
                          className="nav-link fs-5 col-12"
                          onClick={(e) => logout(e)}
                        >
                          {t("Log Out")}
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div
              className="d-flex flex-column flex-lg-row"
              style={{ minHeight: "390px", overflowX: "clip" }}
            >
              <div className="col-12 col-lg-5 ps-4 mb-0 mb-lg-5 d-flex gap-4 flex-column justify-content-center ">
                <div className="mb-0">
                  <h1
                    style={{
                      color: "var(--text-main-color)",
                      fontWeight: "800",
                    }}
                  >
                    {t("Welcome")} <br />
                  </h1>
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                      fontWeight: "800",
                    }}
                  >
                    {t("to your professional gate")}
                  </h4>
                </div>

                <div
                  className="nav-item p-2 pe-3 border rounded"
                  style={{
                    backgroundColor: "var(--pink-color)",
                    color: "var(--gray-color)",
                    // width: "180px",
                    width: "fit-content",
                    // paddingRight: "1rem",
                    zIndex: "999",
                  }}
                >
                  <Link
                    className="nav-link fs-5 fw-bold col-12 text-light"
                    to="/home"
                  >
                    {t("Get Started")}
                    <FontAwesomeIcon
                      className="ms-3 text-light"
                      icon={faCircleArrowRight}
                    />
                  </Link>
                </div>
                <div
                  className="nav-item pwaBtn p-2 pe-3 text-light border rounded"
                  style={{
                    backgroundColor: "var(--main-color)",
                    width: "fit-content",
                    zIndex: "999",
                  }}
                >
                  <Link
                    // onClick={handleClick}
                    className="nav-link fs-5 fw-bold col-12"
                    to="https://play.google.com/store/apps/details?id=com.social.attachin"
                    target="_blank"
                  >
                    {t("Download The App")}
                    <FontAwesomeIcon icon={faGooglePlay} className="ms-3" />
                  </Link>
                </div>
              </div>
              <div className="pencil-container col-12 col-lg-7 d-flex justify-content-end align-items-center position-relative ">
                <img
                  src={darkTheme ? "Group 100 pink.svg" : "Group 100.svg"}
                  // src="Group 100.svg"
                  className="img-fluid pencil"
                  // className="img-fluid pencil d-none d-sm-block"
                  style={{
                    height: "500px",
                    position: "absolute",
                    zIndex: "111",
                    right: "0",
                    bottom: "-91px",
                  }}
                  alt=""
                />
                {/* <img
                  src="Group 100.svg"
                  // src="Group 100 pink.svg"
                  className="img-fluid pencil d-block d-sm-none"
                  style={{
                    height: "500px",
                    position: "absolute",
                    zIndex: "111",
                    right: "0",
                    bottom: "-100px",
                    // height: "350px",
                  }}
                  alt=""
                /> */}
              </div>
            </div>
            <div
              style={{
                // backgroundColor: "var(--main-color)",
                minHeight: "100px",
                width: "100%",
                position: "relative",
                // overflow:"clip"
              }}
              className="smallbluething"
            >
              <img
                src="smallbluething.png"
                alt="smallbluething"
                style={{
                  position: "absolute",
                  top: "-94px",
                  left: "10vw",
                  zIndex: "999",
                }}
                className="seperator"
              />
            </div>
          </header>
          {/* extra nav */}
          <nav className="p-2 d-flex d-md-none flex-column-reverse flex-lg-row justify-content-between align-items-center ">
            <div
              className="col-12 navbar-collapse d-flex align-items-center gap-4 flex-column-reverse"
              id="navbarSupportedContent"
            >
              <ul className="col-12 navbar-nav align-items-center justify-content-around flex-row mb-2 mb-lg-0">
                <li
                  className="nav-item"
                  style={{
                    borderTop: "5px solid var(--text-main-color)",
                  }}
                >
                  <Link className="nav-link fs-6" to="/community">
                    {t("Community")}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{
                    borderTop: "5px solid var(--text-main-color)",
                  }}
                >
                  <Link className="nav-link fs-6" to="/learning">
                    {t("Learning")}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{
                    borderTop: "5px solid var(--text-main-color)",
                  }}
                >
                  <Link className="nav-link fs-6" to="/internships">
                    {t("Internships")}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{
                    borderTop: "5px solid var(--text-main-color)",
                  }}
                >
                  <Link className="nav-link fs-6" to="/aboutus">
                    {t("About")}
                  </Link>
                </li>
              </ul>
              <button
                className="nav-item px-4 py-2 border rounded"
                style={{
                  backgroundColor: "var(--pink-color)",
                  color: "var(--text-main-color)",
                }}
              >
                {/* <Link className="nav-link fs-6 col-12" to="/login">
                  {t("Sign in")}
                </Link> */}
                {!(user && user?.user_type !== "guest") ? (
                  <Link className="nav-link fs-6 col-12" to="/login">
                    {t("Sign in")}
                  </Link>
                ) : (
                  <Link
                    className="nav-link fs-6 col-12"
                    onClick={(e) => logout(e)}
                  >
                    {t("Log Out")}
                  </Link>
                )}
              </button>
            </div>
          </nav>
          {/* Section 2 */}
          <section
            style={{
              background:
                "linear-gradient(0deg, var(--sec-color), transparent)",
              color: "var(--text-main-color)",
              minHeight: "400px",
            }}
            className="d-none d-sm-flex flex-column justify-content-center align-items-center gap-2"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid icons" />
            <h1>{t("Step")}</h1>
            <h4>
              {t("Step2")}
              <FontAwesomeIcon
                className="ms-3"
                icon={faCircleArrowRight}
                style={{
                  color: "var(--text-main-color)",
                }}
              />
            </h4>
          </section>
          {/* Section 3 */}
          <section
            style={{
              background: "var(--main-color)",
              minHeight: "400px",
              // color: "var(--text-main-color)",
            }}
            className="d-none link-light d-sm-flex flex-column justify-content-center align-items-center gap-2 position-relative"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid icons" />
            <h1>{t("Motivated")}</h1>
            <h4>{t("Motivated2")}</h4>
            <img
              src="glasses.svg"
              alt=""
              className="position-absolute bottom-0 start-0 glasses"
            />
          </section>
          {/* Section 4 */}
          <section
            style={{
              minHeight: "400px",
              color: "var(--text-main-color)",
            }}
            className="bgGradiant d-none d-sm-flex flex-column justify-content-center align-items-center gap-2"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid icons" />
            <h1>{t("Learn")}</h1>
            <h1>{t("Learn2")}</h1>
          </section>
          {/*  */}
          <div
            className="d-none d-sm-block smallpurplething"
            style={{
              // backgroundColor: "var(--main-color)",
              minHeight: "100px",
              width: "100%",
              position: "relative",
              // overflow:"clip"
            }}
          >
            <img
              src="smallpurplething.svg"
              alt="smallpurplething"
              className=""
              style={{
                position: "absolute",
                top: "-76px",
                right: "10vw",
                zIndex: "999",
                width: "310px",
              }}
            />
          </div>
          {/*  */}
          <section
            className="p-5 bgGradiant2"
            style={
              {
                // backgroundColor: "var(--main-color)",
              }
            }
          >
            <div className="d-flex flex-column p-3 gap-3 justify-content-center align-items-center">
              <img
                src="partners.svg"
                alt="partners.svg"
                className="img-fluid icons"
              />
              <h1 style={{ color: "var(--text-main-color)" }}>
                {t("Our Partners")}
              </h1>
            </div>
            {/* carousel */}
            <div id="carouselExampleIndicators" className="carousel slide">
              {partners?.length > 1 && (
                <div
                  className="carousel-indicators"
                  style={{ marginBottom: "-40px" }}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className="active bg-black"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  {partners.length > 3 && (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={1}
                      aria-label="Slide 2"
                      className=" bg-black"
                    />
                  )}
                </div>
              )}
              <div className="carousel-inner">
                {partners?.length > 1 && (
                  <div className="carousel-item active">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-5">
                      {partners?.slice(0, 3).map((p, idx) => (
                        <img
                          key={uuid()}
                          src={baseImgURL + p.profile_photo}
                          className="d-block rounded-circle"
                          style={{
                            objectFit: "cover",
                            maxWidth: "180px",
                            aspectRatio: 1,
                          }}
                          alt="companylogo.svg"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {partners?.length > 3 && (
                  <div className="carousel-item">
                    <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-5">
                      {partners?.slice(3, 6).map((p, idx) => (
                        <img
                          key={uuid()}
                          src={baseImgURL + p.profile_photo}
                          className="d-block rounded-circle"
                          style={{
                            objectFit: "cover",
                            maxWidth: "180px",
                            aspectRatio: 1,
                          }}
                          alt="companylogo.svg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
                style={{
                  left: "-15px",
                }}
              >
                <span
                  className="carousel-control-prev-icon bg-danger p-sm-4 rounded-circle"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
                style={{
                  right: "-15px",
                }}
              >
                <span
                  className="carousel-control-next-icon bg-danger p-sm-4 rounded-circle"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
          {/* sep */}
          <div
            className="d-none d-sm-block smallpurplething"
            style={{
              // backgroundColor: "var(--main-color)",
              minHeight: "70px",
              width: "100%",
            }}
          ></div>
          {/*  */}
          <section className="p-5 bgGradiant2">
            <div className="d-flex flex-column p-3 gap-3 justify-content-center align-items-center">
              <img
                src="graduationCap.svg"
                alt="graduationCap.svg"
                className="img-fluid icons"
              />
              <h1
                className="text-center"
                style={{ color: "var(--text-main-color)" }}
              >
                {t("uc")}
              </h1>
            </div>
            {/* carousel2 */}
            <div id="carouselExampleIndicators2" className="carousel slide">
              {universities?.length > 1 && (
                <div
                  className="carousel-indicators"
                  style={{ marginBottom: "-40px" }}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators2"
                    data-bs-slide-to={0}
                    className="active bg-black"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  {universities?.length > 3 && (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide-to={1}
                      aria-label="Slide 2"
                      className=" bg-black"
                    />
                  )}
                </div>
              )}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-5">
                    {universities?.slice(0, 3).map((university, idx) => (
                      <img
                        key={uuid()}
                        src={baseImgURL + university.profile_photo}
                        className="d-block rounded-circle"
                        style={{
                          objectFit: "cover",
                          maxWidth: "200px",
                          aspectRatio: 1,
                        }}
                        alt="UniversityLogo.svg"
                      />
                    ))}
                  </div>
                </div>
                {universities?.length > 3 && (
                  <div className="carousel-item">
                    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-5">
                      {universities?.slice(3, 6).map((university, idx) => (
                        <img
                          key={uuid()}
                          src={baseImgURL + university.profile_photo}
                          className="d-block rounded-circle"
                          style={{
                            objectFit: "cover",
                            maxWidth: "200px",
                            aspectRatio: 1,
                          }}
                          alt="UniversityLogo.svg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide="prev"
                style={{
                  left: "-15px",
                }}
              >
                <span
                  className="carousel-control-prev-icon bg-danger p-sm-4 rounded-circle"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide="next"
                style={{
                  right: "-15px",
                }}
              >
                <span
                  className="carousel-control-next-icon bg-danger p-sm-4 rounded-circle"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section>
          {/* sep */}
          <div
            className="d-none d-sm-block smallpurplething"
            style={{
              // backgroundColor: "var(--main-color)",
              minHeight: "70px",
              width: "100%",
            }}
          ></div>
          {/* Section */}
          <section
            className="position-relative p-3 p-sm-5 bgGradiant2"
            style={{
              background:
                "linear-gradient(0deg, rgb(151, 173, 217), transparent)",
              // minHeight: "700px",
              zIndex: "10",
            }}
          >
            <img
              src="Group.svg"
              alt="Group.svg"
              className="col-4 position-absolute bottom-0 end-0"
              // className="col-4 col-sm-5 position-absolute bottom-0 end-0"
              style={{
                // height: "500px",
                zIndex: "-15",
              }}
            />
            <img
              src="whofor.svg"
              alt="whofor.svg"
              className="img-fluid icons"
              style={{
                height: "150px",
                boxSizing: "border-box",
              }}
            />
            <div
              className="d-flex flex-column gap-3 mt-5"
              style={{
                color: "var(--text-main-color)",
              }}
            >
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                {t("Students")}
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                {t("Undergraduates")}
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                {t("Institutions")}
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                {t("Companies")}
              </h2>
            </div>
          </section>
          {/* sec */}
          <section
            className="col-12 text-light p-4 p-md-5"
            style={{
              // minHeight: "300px",
              backgroundColor: "var(--main-color)",
              // color:"white"
            }}
          >
            {!(user && user?.user_type !== "guest") ? (
              <>
                <h1>{t("firstTime")}</h1>
                <form
                  className={`d-flex flex-column flex-sm-row m-3 mt-5 gap-3 gap-md-5 align-items-center`}
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="mb-3 col-12 col-sm-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      {t("Email")}
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      className={
                        errors.email
                          ? "border border-1 border-danger form-control rounded-5"
                          : "form-control rounded-5"
                      }
                      {...register("email")}
                      id="exampleInputEmail1"
                      name="email"
                      style={{
                        backgroundColor: "var(--sec-color)",
                      }}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    {FormErrors
                      ? FormErrors.map((err, idx) => {
                          // console.log(Object.entries(err)[0][0]);
                          return Object.entries(err)[0][0] === "email" ? (
                            <ErrorMessage key={idx}>
                              {Object.entries(err)[0][1]?.message}
                            </ErrorMessage>
                          ) : (
                            ""
                          );
                        })
                      : ""}
                  </div>
                  <div className="mb-3 col-12 col-sm-4">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      {t("Password")}
                    </label>
                    <input
                      {...register("password")}
                      disabled={isSubmitting}
                      type="password"
                      className={
                        errors.password
                          ? "border border-1 border-danger form-control rounded-5"
                          : "form-control rounded-5"
                      }
                      id="exampleInputPassword1"
                      style={{
                        backgroundColor: "var(--sec-color)",
                      }}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    {FormErrors
                      ? FormErrors.map((err, idx) => {
                          // console.log(Object.entries(err)[0][0]);
                          return Object.entries(err)[0][0] === "password" ? (
                            <ErrorMessage key={idx}>
                              {Object.entries(err)[0][1]?.message}
                            </ErrorMessage>
                          ) : (
                            ""
                          );
                        })
                      : ""}
                  </div>
                  {!loading ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn text-light"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCircleArrowRight}
                        fontSize={40}
                      />
                    </button>
                  ) : (
                    <img
                      src="/Opener Loading.gif"
                      // className="m-auto"
                      style={{ width: "50px" }}
                      alt="Loading"
                    />
                  )}
                </form>
              </>
            ) : (
              <h1>
                {getGreeting()}, {user.full_name}
              </h1>
            )}
          </section>
          {/* Footer */}
          <Footer />
          <PWAPrompt
            promptOnVisit={1}
            timesToShow={3}
            copyClosePrompt="Close"
            permanentlyHideOnDismiss={false}
          />
        </>
      )}
    </>
  );
};

export default memo(LandingPage);

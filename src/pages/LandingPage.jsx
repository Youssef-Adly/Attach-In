import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import "./Landingpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";
import PWAPrompt from "react-ios-pwa-prompt";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const [t] = useTranslation();
  const darkTheme = useSelector((state) => state.theme.value);
  // console.log("theme: ", darkTheme);

  //#region [Loading Screen Timer]
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);
  //#endregion

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
      // Trigger the native installation prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null); // Reset for future prompts

      console.log(`User response to install prompt: ${outcome}`);
    } else {
      console.log("App installation prompt not available.");
    }
  };
  //#endregion

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header
            className="landingHeader bgGradiant3"
            style={{
              minHeight: "80vh",
              // backgroundColor: "var(--offWhite-color)",
            }}
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
                      <Link className="nav-link fs-5 col-12" to="/login">
                        {t("Sign in")}
                      </Link>
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
                    onClick={handleClick}
                    className="nav-link fs-5 fw-bold col-12"
                    to=""
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
                <Link className="nav-link fs-6 col-12" to="/login">
                  {t("Sign in")}
                </Link>
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
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                  className=" bg-black"
                />
                {/* <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                  className=" bg-black"
                /> */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-flex justify-content-center">
                    <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    />
                    <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    />
                    <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="d-flex justify-content-center">
                    <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    />
                    <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    />
                    {/* <img
                      src="companylogo.svg"
                      className="d-block w-25"
                      alt="companylogo.svg"
                    /> */}
                  </div>
                </div>
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
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators2"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                  className=" bg-black"
                />
                {/* <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators2"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                  className=" bg-black"
                /> */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-flex justify-content-center">
                    <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    />
                    <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    />
                    <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    />
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="d-flex justify-content-center">
                    <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    />
                    <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    />
                    {/* <img
                      src="UniversityLogo.svg"
                      className="d-block w-25"
                      alt="UniversityLogo.svg"
                    /> */}
                  </div>
                </div>
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
            <h1>{t("firstTime")}</h1>
            <form
              className="d-flex flex-column flex-sm-row m-3 mt-5 gap-3 gap-md-5 align-items-center"
              onSubmit={(e) => {
                e.nativeEvent.preventDefault();
              }}
            >
              <div className="mb-3 col-12 col-sm-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  className="form-control rounded-5"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  style={{
                    backgroundColor: "var(--sec-color)",
                  }}
                />
                {/* <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              <div className="mb-3 col-12 col-sm-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  {t("Password")}
                </label>
                <input
                  type="password"
                  className="form-control rounded-5"
                  id="exampleInputPassword1"
                  style={{
                    backgroundColor: "var(--sec-color)",
                  }}
                />
              </div>
              <button type="submit" className="btn text-light">
                <FontAwesomeIcon icon={faCircleArrowRight} fontSize={40} />
              </button>
            </form>
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

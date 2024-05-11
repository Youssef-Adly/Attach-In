import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import "./Landingpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Footer from "../Components/Footer";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header
            // className="container-fluid"
            style={{
              minHeight: "80vh",
              backgroundColor: "var(--offWhite-color)",
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
                    <li className="nav-item">
                      <Link
                        className="nav-link fs-5 border-top border-5  border-black"
                        // style={{ borderColor: "var(--main-color) !important" }}
                        to="/community"
                      >
                        Community
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link fs-5  border-top border-5  border-black"
                        // style={{ borderColor: "var(--main-color) !important" }}
                        to="/learning"
                      >
                        Learning
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link fs-5  border-top border-5  border-black"
                        // style={{ borderColor: "var(--main-color) !important" }}
                        to="/internships"
                      >
                        Internships
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link fs-5  border-top border-5 border-black"
                        // style={{ borderColor: "var(--main-color) !important" }}
                        to="/aboutus"
                      >
                        About us
                      </Link>
                    </li>
                    <li
                      className="nav-item px-4 border rounded"
                      style={{
                        backgroundColor: "var(--pink-color)",
                        color: "var(--gray-color)",
                      }}
                    >
                      <Link className="nav-link fs-5 col-12" to="/login">
                        Sign in
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div
              className="d-flex flex-column flex-lg-row "
              style={{ minHeight: "390px", overflowX: "clip" }}
            >
              <div className="col-12 col-lg-5 ps-4 mb-0 mb-lg-5 d-flex gap-4 flex-column justify-content-center ">
                <div className="mb-0">
                  <h1 style={{ color: "var(--main-color)" }}>
                    Welcome <br />
                  </h1>
                  <h4 style={{ color: "var(--main-color)" }}>
                    to your professional gate
                  </h4>
                </div>

                <div
                  className="nav-item p-2 border rounded"
                  style={{
                    backgroundColor: "var(--pink-color)",
                    color: "var(--gray-color)",
                    width: "180px",
                    zIndex: "999",
                  }}
                >
                  <Link className="nav-link fs-5 fw-bold col-12" to="/home">
                    Get Started
                    <FontAwesomeIcon
                      className="ms-3"
                      icon={faCircleArrowRight}
                    />
                  </Link>
                </div>
                <div
                  className="nav-item p-2 border rounded"
                  style={{
                    backgroundColor: "var(--main-color)",
                    color: "var(--gray-color)",
                    width: "250px",
                    zIndex: "999",
                  }}
                >
                  <Link
                    onClick={handleClick}
                    className="nav-link fs-5 fw-bold col-12"
                    to=""
                  >
                    Download The App
                    <FontAwesomeIcon icon={faGooglePlay} className="ms-3" />
                  </Link>
                </div>
              </div>
              <div className="pencil-container col-12 col-lg-7 d-flex justify-content-end align-items-center position-relative ">
                <img
                  src="Group 100.svg"
                  className="img-fluid pencil d-none d-sm-block"
                  style={{
                    height: "500px",
                    position: "absolute",
                    zIndex: "111",
                    right: "0",
                    bottom: "-100px",
                  }}
                  alt=""
                />
                <img
                  src="Group 100 pink.svg"
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
                />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "var(--main-color)",
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
                <li className="nav-item">
                  <Link
                    className="nav-link fs-6 border-top border-5  border-black"
                    // style={{ borderColor: "var(--main-color) !important" }}
                    to="/community"
                  >
                    Community
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fs-6 border-top border-5  border-black"
                    // style={{ borderColor: "var(--main-color) !important" }}
                    to="/learning"
                  >
                    Learning
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fs-6 border-top border-5  border-black"
                    // style={{ borderColor: "var(--main-color) !important" }}
                    to="/internships"
                  >
                    Internships
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fs-6 border-top border-5 border-black"
                    // style={{ borderColor: "var(--main-color) !important" }}
                    to="/aboutus"
                  >
                    About us
                  </Link>
                </li>
              </ul>
              <button
                className="nav-item px-4 py-2 border rounded"
                style={{
                  backgroundColor: "var(--pink-color)",
                  color: "var(--gray-color)",
                }}
              >
                <Link className="nav-link fs-6 col-12" to="/login">
                  Sign in
                </Link>
              </button>
            </div>
          </nav>
          {/* Section 2 */}
          <section
            style={{
              background:
                "linear-gradient(0deg, var(--sec-color), transparent)",
              color: "var(--main-color)",
              minHeight: "400px",
            }}
            className="d-none d-sm-flex flex-column justify-content-center align-items-center gap-2"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid" />
            <h1>First Step In Your Carrer</h1>
            <h4>
              Find The Right Job Or Internship
              <FontAwesomeIcon
                className="ms-3 text-dark"
                icon={faCircleArrowRight}
              />
            </h4>
          </section>
          {/* Section 3 */}
          <section
            style={{
              background: "var(--main-color)",
              minHeight: "400px",
              color: "var(--offWhite-color)",
            }}
            className="d-none d-sm-flex flex-column justify-content-center align-items-center gap-2 position-relative"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid" style={{}} />
            <h1>Get Motivated!</h1>
            <h4>You Can Find Supportive Community With Us</h4>
            <img
              src="glasses.svg"
              alt=""
              className="position-absolute bottom-0 start-0 glasses"
            />
          </section>
          {/* Section 4 */}
          <section
            style={{
              background:
                "linear-gradient(0deg, var(--sec-color), transparent)",
              minHeight: "400px",
              color: "var(--main-color)",
            }}
            className="d-none d-sm-flex flex-column justify-content-center align-items-center gap-2"
          >
            <img src="cheerIcon.svg" alt="" className="img-fluid" style={{}} />
            <h1>Learn The Skills</h1>
            <h1>You Need To Succeed</h1>
          </section>
          {/*  */}
          <div
            className="d-none d-sm-block"
            style={{
              backgroundColor: "var(--main-color)",
              minHeight: "100px",
              width: "100%",
              position: "relative",
              // overflow:"clip"
            }}
          >
            <img
              src="smallpurplething.svg"
              alt="smallpurplething"
              style={{
                position: "absolute",
                top: "-76px",
                right: "10vw",
                zIndex: "999",
                width: "310px",
              }}
              className="seperator"
            />
          </div>
          {/*  */}
          <section className="container p-5">
            <div className="d-flex flex-column p-3 gap-3 justify-content-center align-items-center">
              <img
                src="partners.svg"
                alt="partners.svg"
                className="img-fluid"
              />
              <h1 style={{ color: "var(--main-color)" }}>Our Partners</h1>
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
            className="d-none d-sm-block"
            style={{
              backgroundColor: "var(--main-color)",
              minHeight: "70px",
              width: "100%",
            }}
          ></div>
          {/*  */}
          <section className="container p-5">
            <div className="d-flex flex-column p-3 gap-3 justify-content-center align-items-center">
              <img
                src="graduationCap.svg"
                alt="graduationCap.svg"
                className="img-fluid"
              />
              <h1
                className="text-center"
                style={{ color: "var(--main-color)" }}
              >
                Universities and Colleges
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
            className="d-none d-sm-block"
            style={{
              backgroundColor: "var(--main-color)",
              minHeight: "70px",
              width: "100%",
            }}
          ></div>
          {/* Section */}
          <section
            className="position-relative p-3 p-sm-5"
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
              className="img-fluid"
              style={{
                height: "150px",
              }}
            />
            <div
              className="d-flex flex-column gap-3 mt-5"
              style={{
                color: "var(--main-color)",
              }}
            >
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                Students
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                Undergraduates
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                Institutions
              </h2>
              <h2>
                <FontAwesomeIcon icon={faUser} className="px-3" />
                Companies
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
            <h1>Not your first time here?</h1>
            <form
              className="d-flex flex-column flex-sm-row m-3 mt-5 gap-3 gap-md-5 align-items-center"
              onSubmit={(e) => {
                e.nativeEvent.preventDefault();
              }}
            >
              <div className="mb-3 col-12 col-sm-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
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
                  Password
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
        </>
      )}
    </>
  );
};

export default LandingPage;

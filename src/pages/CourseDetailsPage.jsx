import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSuspese from "../Components/LoadingSuspense";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toastError } from "../utils/ToastsFunctions";

const CourseDetailsPage = () => {
  const token = useSelector((state) => state.Auth.user.token);
  const [Course, setCourse] = useState(null);
  const [t, i18n] = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://attachin.com/api/getAllCourseData?course_id=" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourse(res.data.data);
        // console.log("res.data.data: ", res.data.data);
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, [id, token]);

  return (
    <>
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Courses")}
      </h1>
      <hr />
      {/* <!-- Nav tabs --> */}
      <ul
        className="nav nav-tabs row-cols-auto pt-2 mb-5 rounded-top-4 courses"
        style={{
          backgroundcolor: "var(--main-color)",
          color: "var(--bs-gray-100)",
          // gap: "50px",
          justifyContent: "space-around",
        }}
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4 active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            <h4>{t("About")}</h4>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            <h4>{t("Lessons")}</h4>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4"
            id="messages-tab"
            data-bs-toggle="tab"
            data-bs-target="#messages"
            type="button"
            role="tab"
            aria-controls="messages"
            aria-selected="false"
          >
            <h4 className="">{t("Exams")}</h4>
          </button>
        </li>
      </ul>

      {/* <!-- Tab panes --> */}
      {Course ? (
        <div
          className="tab-content"
          style={{
            marginBottom: "65px",
          }}
        >
          <div className="d-flex align-items-center gap-3 ms-4 dir">
            <Link to={"/courses"}>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                fontSize={27}
                style={{
                  color: "var(--text-main-color)",
                  marginBottom: "5px",
                }}
              />
            </Link>
            <h4 style={{ color: "var(--text-main-color)" }}>
              {i18n.language === "ar" ? Course.name_ar : Course.name_en}
            </h4>
          </div>
          <hr />
          {/* About */}
          <div
            className="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <p
              className="px-2 px-sm-5 mb-5"
              style={{ color: "var(--text-main-color)" }}
            >
              {i18n.language === "ar"
                ? Course.description_ar
                : Course.description_en}
            </p>
          </div>
          {/* Lessons */}
          <div
            className="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="d-flex gap-4 flex-wrap justify-content-around mb-5">
              {Course?.Videos &&
                Course?.Videos.map((vid, idx) => (
                  <Link
                    className="nav-link flex-wrap d-flex flex-column justify-content-around align-items-center "
                    to={vid.link}
                    target="_blank"
                    key={idx}
                  >
                    <img src="/lesson.svg" alt="lesson" className="img-fluid" />
                    <h5 className="mt-2 text-center" style={{ width: "230px" }}>
                      {i18n.language === "ar" ? vid.name_ar : vid.name_en}
                    </h5>
                  </Link>
                ))}
            </div>
          </div>
          {/* Exams */}
          <div
            className="tab-pane"
            id="messages"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            <div className="d-flex flex-wrap mb-5 gap-3 justify-content-around align-items-center">
              {Course.Exams?.length > 0 ? (
                <>
                  <div className="col-10 col-sm-5">
                    <span
                      className="badge rounded-pill text-black p-3 py-2 text-wrap "
                      style={{
                        backgroundColor: "var(--offWhite-color)",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Exercitationem, est.
                    </span>
                    <p
                      className="px-3"
                      style={{
                        color: "var(--text-main-color)",
                      }}
                    >
                      <svg
                        width={17}
                        height={17}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
                      >
                        <circle
                          cx="8.51151"
                          cy="8.34818"
                          r="7.6912"
                          fill="#99B0DC"
                        />
                      </svg>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, facilis minima voluptatibus dolor consequatur
                      exercitationem perspiciatis eos nam aliquid adipisci.
                    </p>
                  </div>
                  <div className="col-10 col-sm-5">
                    <span
                      className="badge rounded-pill text-black p-3 py-2  text-wrap "
                      style={{
                        backgroundColor: "var(--offWhite-color)",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Exercitationem, est.
                    </span>
                    <p
                      className="px-3"
                      style={{
                        color: "var(--text-main-color)",
                      }}
                    >
                      <svg
                        width={17}
                        height={17}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
                      >
                        <circle
                          cx="8.51151"
                          cy="8.34818"
                          r="7.6912"
                          fill="#99B0DC"
                        />
                      </svg>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, facilis minima voluptatibus dolor consequatur
                      exercitationem perspiciatis eos nam aliquid adipisci.
                    </p>
                  </div>
                  <div className="col-10 col-sm-5">
                    <span
                      className="badge rounded-pill text-black p-3 py-2 text-wrap "
                      style={{
                        backgroundColor: "var(--offWhite-color)",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Exercitationem, est.
                    </span>
                    <p
                      className="px-3"
                      style={{
                        color: "var(--text-main-color)",
                      }}
                    >
                      <svg
                        width={17}
                        height={17}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
                      >
                        <circle
                          cx="8.51151"
                          cy="8.34818"
                          r="7.6912"
                          fill="#99B0DC"
                        />
                      </svg>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, facilis minima voluptatibus dolor consequatur
                      exercitationem perspiciatis eos nam aliquid adipisci.
                    </p>
                  </div>
                  <div className="col-10 col-sm-5">
                    <span
                      className="badge rounded-pill text-black p-3 py-2  text-wrap "
                      style={{
                        backgroundColor: "var(--offWhite-color)",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Exercitationem, est.
                    </span>
                    <p
                      className="px-3"
                      style={{
                        color: "var(--text-main-color)",
                      }}
                    >
                      <svg
                        width={17}
                        height={17}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
                      >
                        <circle
                          cx="8.51151"
                          cy="8.34818"
                          r="7.6912"
                          fill="#99B0DC"
                        />
                      </svg>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, facilis minima voluptatibus dolor consequatur
                      exercitationem perspiciatis eos nam aliquid adipisci.
                    </p>
                  </div>
                </>
              ) : (
                <h1
                  className="display-1"
                  style={{ color: "var(--text-main-color)" }}
                >
                  Soon
                </h1>
              )}
            </div>
            {Course.Exams?.length > 0 && (
              <Link
                // to={"/login"}
                onClick={(e) => {
                  // handleSubmit(e);
                }}
                style={{
                  backgroundColor: "var(--main-color)",
                  height: "100px",
                  width: "100px",
                }}
                className="mx-auto my-3 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
              >
                Submit
              </Link>
            )}
          </div>
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default memo(CourseDetailsPage);

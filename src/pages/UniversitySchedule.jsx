import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HomeLayout from "../Components/HomeLayout";
// import axios from "axios";
import LoadingSuspese from "../Components/LoadingSuspense";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const UniversitySchedule = () => {
  const { id } = useParams();
  const [t, i18n] = useTranslation();

  return (
    <>
      <h1 style={{ color: "var(--text-main-color)" }}>{t("Schedule Page")}</h1>
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
            <h4>{t("Lectures")}</h4>
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
            <h4>{t("Sections")}</h4>
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
      {true ? (
        <div
          className="tab-content"
          style={{
            marginBottom: "65px",
          }}
        >
          <div className="d-flex align-items-center gap-3 ms-4">
            <Link to={"/universityProfile"}>
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
              Back To University Page
              {/* {i18n.language === "ar" ? Course.name_ar : Course.name_en} */}
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
            <div
              className="d-flex gap-2 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
              style={{ color: "var(--text-main-color)" }}
            >
              {/* {i18n.language === "ar"
                ? Course.description_ar
                : Course.description_en} */}
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nCommerce"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Commerce")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nPharmacy"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Pharmacy")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nMedicine"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Medicine")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={"https://placehold.co/600x400?text=Facuilty+Of\\nLaw"}
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Law")}
                </h6>
              </Link>
            </div>
          </div>
          {/* Lessons */}
          <div
            className="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div
              className="d-flex gap-2 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
              style={{ color: "var(--text-main-color)" }}
            >
              {/* {i18n.language === "ar"
                ? Course.description_ar
                : Course.description_en} */}
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nCommerce"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Commerce")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nPharmacy"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Pharmacy")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nMedicine"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Medicine")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={"https://placehold.co/600x400?text=Facuilty+Of\\nLaw"}
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Law")}
                </h6>
              </Link>
            </div>
          </div>
          {/* Exams */}
          <div
            className="tab-pane"
            id="messages"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            <div
              className="d-flex gap-2 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
              style={{ color: "var(--text-main-color)" }}
            >
              {/* {i18n.language === "ar"
                ? Course.description_ar
                : Course.description_en} */}
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nCommerce"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Commerce")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nPharmacy"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Pharmacy")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={
                    "https://placehold.co/600x400?text=Facuilty+Of\\nMedicine"
                  }
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Medicine")}
                </h6>
              </Link>
              <Link
                // to={"/courses/" + id}
                className="mx-auto nav-link d-flex flex-column justify-content-between align-items-center gap-2"
                style={{ width: "200px", height: "200px" }}
              >
                <img
                  src={"https://placehold.co/600x400?text=Facuilty+Of\\nLaw"}
                  // src={"/CourseCard.svg"}
                  alt="CourseCard"
                  className="img-fluid rounded-pill"
                />
                <h6
                  className="text-center"
                  style={{ color: "var(--text-main-color)" }}
                >
                  {/* {i18n.language === "ar" ? name_ar : name_en} */}
                  {t("Law")}
                </h6>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default UniversitySchedule;

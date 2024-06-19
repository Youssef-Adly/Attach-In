import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";

const UniversitySchedule = () => {
  const [t, i18n] = useTranslation();
  const { id } = useParams();
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const user = useSelector((state) => state.Auth.user);
  const language = useSelector((state) => state.lang.value);
  const [colleges, setColleges] = useState(null);
  const [levels, setLevels] = useState(null);
  // Lectures
  const [lectures, setLectures] = useState(null);
  // Sections
  const [sections, setSections] = useState(null);
  // Exams
  const [exams, setExams] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getColleges?university_id=" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res.data.data.colleges);
        setColleges(res.data.data.colleges);
      });
  }, []);

  const resetPill = () => {
    setLevels(null);
    setLectures(null);
    setSections(null);
    setExams(null);
  };

  const getCollegeLevels = async (id) => {
    await axios
      .get(baseURL + "getCollegeLevels?college_id=" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res.data.data.levels);
        setLevels(res.data.data.levels);
      });
  };
  const getCollegeLevelLectures = async (id) => {
    await axios
      .get(baseURL + "getCollegeLevelLectures", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        let data = res.data.data;
        let filteredData = data.filter((sec) => sec.college_level_id === id);
        // console.log("filteredData: ", filteredData);
        // console.log("getCollegeLevelLectures", res.data.data);
        setLectures(filteredData);
      });
  };
  const getCollegeLevelSections = async (id) => {
    await axios
      .get(baseURL + "getCollegeLevelSections", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        let data = res.data.data;
        let filteredData = data.filter((sec) => sec.college_level_id === id);
        // console.log("filteredData: ", filteredData);
        // console.log("getCollegeLevelSections", res.data.data);
        setSections(filteredData);
      });
  };
  const getCollegeLevelExams = async (id) => {
    await axios
      .get(baseURL + "getCollegeLevelExams", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        let data = res.data.data;
        let filteredData = data.filter((exam) => exam.college_level_id === id);
        // console.log("filteredData: ", filteredData);
        // console.log("getCollegeLevelExams", res.data.data);
        setExams(filteredData);
      });
  };

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
          justifyContent: "space-around",
        }}
        id="myTab"
        role="tablist"
      >
        <li
          className="nav-item"
          role="presentation"
          onClick={() => resetPill()}
        >
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
        <li
          className="nav-item"
          role="presentation"
          onClick={() => resetPill()}
        >
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
        <li
          className="nav-item"
          role="presentation"
          onClick={() => resetPill()}
        >
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

          {/* ============================================================= */}
          {/* Lectures */}
          <div
            className="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {/* colleges */}
            {!levels && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {colleges ? (
                  colleges.map((college, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevels(college.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          college.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          college.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? college.name_ar : college.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? college.name_ar : college.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {colleges?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Colleges Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* levels */}
            {levels && !lectures && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {levels ? (
                  levels.map((level, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevelLectures(level.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          level.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          level.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? level.name_ar : level.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? level.name_ar : level.name_en}
                        {/* {t("Commerce")} */}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {levels?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Levels Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* Lectures */}
            {lectures && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {lectures ? (
                  lectures.map((lecture, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      // onClick={() => getCollegeLevelLectures(lecture.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          lecture.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          lecture.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? lecture.name_ar : lecture.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? lecture.name_ar : lecture.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {Object.keys(lectures).length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Lectures Added Yet
                  </h4>
                )}
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* Sections */}
          <div
            className="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* Colleges */}
            {!levels && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {colleges ? (
                  colleges.map((college, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevels(college.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          college.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          college.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? college.name_ar : college.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? college.name_ar : college.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {colleges?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Colleges Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* Levels */}
            {levels && !sections && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {levels ? (
                  levels.map((level, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevelSections(level.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          level.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          level.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? level.name_ar : level.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? level.name_ar : level.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {levels?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Levels Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* Sections */}
            {sections && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {sections ? (
                  sections.map((section, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      // onClick={() => getCollegeLevelsections(section.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          section.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          section.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? section.name_ar : section.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? section.name_ar : section.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {Object.keys(sections).length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Sections Added Yet
                  </h4>
                )}
              </div>
            )}
          </div>

          {/* ============================================================= */}
          {/* Exams */}
          <div
            className="tab-pane"
            id="messages"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            {/* Colleges */}
            {!levels && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {colleges ? (
                  colleges.map((college, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevels(college.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          college.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          college.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? college.name_ar : college.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? college.name_ar : college.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {colleges?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Colleges Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* Levels */}
            {levels && !exams && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {levels ? (
                  levels.map((level, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      onClick={() => getCollegeLevelExams(level.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          level.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          level.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={
                          language === "ar" ? level.name_ar : level.name_en
                        }
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? level.name_ar : level.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {levels?.length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Levels Added Yet
                  </h4>
                )}
              </div>
            )}

            {/* Exams */}
            {exams && (
              <div
                className="d-flex gap-5 flex-wrap align-items-center justify-content-between px-2 px-sm-5 mb-5"
                style={{ color: "var(--text-main-color)" }}
              >
                {exams ? (
                  exams.map((exam, idx) => (
                    <Link
                      key={idx}
                      // to={"/courses/" + id}
                      // onClick={() => getCollegeLevelexams(exam.id)}
                      className="mx-auto nav-link d-flex flex-column justify-content-evenly align-items-center gap-2"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <img
                        src={
                          "https://placehold.co/600x400?text=" +
                          exam.name_en.split(" ").slice(0, -1).join("+") +
                          "\\n" +
                          exam.name_en.split(" ").slice(-1)
                        }
                        // src={"/CourseCard.svg"}
                        alt="CourseCard"
                        className="img-fluid rounded-pill"
                        title={language === "ar" ? exam.name_ar : exam.name_en}
                      />
                      <h6
                        className="text-center"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {language === "ar" ? exam.name_ar : exam.name_en}
                      </h6>
                    </Link>
                  ))
                ) : (
                  <LoadingSuspese />
                )}
                {Object.keys(exams).length === 0 && (
                  <h4
                    style={{
                      color: "var(--text-main-color)",
                    }}
                    className="w-100 text-center"
                  >
                    No Exams Added Yet
                  </h4>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default UniversitySchedule;

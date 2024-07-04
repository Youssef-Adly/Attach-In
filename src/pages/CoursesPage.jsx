import React, { memo, useEffect, useState } from "react";
// import HomeLayout from "../Components/HomeLayout";
import CourseCard from "../Components/CourseCard";
import axios from "axios";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toastError } from "../utils/ToastsFunctions";

const CoursesPage = () => {
  const [AllCourses, setCourses] = useState(null);
  const [t] = useTranslation();
  const token = useSelector((state) => state.Auth.user.token);

  useEffect(() => {
    axios
      .get("https://attachin.com/api/getAllCourses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, [token]);

  return (
    <>
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Courses")}
      </h1>
      <hr />
      <div className="row gy-4 justify-content-around align-items-center ">
        {AllCourses ? (
          AllCourses.map((crs) => <CourseCard {...crs} key={uuid()} />)
        ) : (
          <LoadingSuspese />
        )}
      </div>
    </>
  );
};

export default memo(CoursesPage);

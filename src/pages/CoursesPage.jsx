import React, { useEffect, useState } from "react";
// import HomeLayout from "../Components/HomeLayout";
import CourseCard from "../Components/CourseCard";
import axios from "axios";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";

const CoursesPage = () => {
  const [AllCourses, setCourses] = useState(null);
  const [t] = useTranslation();

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F0dGFjaGluLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3MTc1Mzk1NzUsImV4cCI6MTcyMDEzMTU3NSwibmJmIjoxNzE3NTM5NTc1LCJqdGkiOiJBYTJ3aWlCTEloSXVSWTB3Iiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eoO7JxCg1_aVD1RVPM5BubWnU3r7Vr2bhi7bOj23YyI";

  useEffect(() => {
    axios
      .get("https://attachin.com/api/getAllCourses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data.data);
        console.log(res.data.data);
      });
  }, []);

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

export default CoursesPage;

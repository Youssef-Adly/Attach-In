import React, { useEffect, useState } from "react";
import HomeLayout from "../Components/HomeLayout";
import CourseCard from "../Components/CourseCard";
import axios from "axios";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";

const CoursesPage = () => {
  const [AllCourses, setCourses] = useState(null);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F0dGFjaGluLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3MTQwNzEwMTYsImV4cCI6MTcxNjY2MzAxNiwibmJmIjoxNzE0MDcxMDE2LCJqdGkiOiJwbE1xdXdmNUtzV01vMmRmIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.aynzXgU1RDbbHiO-jeLs3kiXLYid-p0WzEuw-Bgs08w";

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
    <HomeLayout>
      <h1 style={{ color: "var(--main-color)" }}>Courses</h1>
      <hr />
      <div className="row gy-4 justify-content-around align-items-center ">
        {AllCourses ? (
          AllCourses.map((crs) => <CourseCard {...crs} key={uuid()} />)
        ) : (
          <LoadingSuspese />
        )}
      </div>
    </HomeLayout>
  );
};

export default CoursesPage;

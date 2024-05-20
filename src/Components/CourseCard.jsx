import React from "react";
import { Link } from "react-router-dom";

// const CourseCard = ( {course_id, description_ar, description_en, id, link, name_ar, name_en} ) => {
const CourseCard = ({
  id,
  image,
  description_ar,
  description_en,
  name_ar,
  name_en,
}) => {
  // console.log(id, image, description_ar, description_en, name_ar, name_en);
  return (
    <Link
      to={"/courses/" + id}
      className="nav-link d-flex flex-column justify-content-between align-items-center gap-2"
      style={{ width: "200px", height: "200px" }}
    >
      <img
        src={image || "/CourseCard.svg"}
        alt="CourseCard"
        className="img-fluid"
      />
      <h6 className="text-center" style={{ color: "var(--main-color)" }}>
        {name_en}
      </h6>
    </Link>
  );
};

export default CourseCard;

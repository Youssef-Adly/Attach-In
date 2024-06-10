import React from "react";
import { useTranslation } from "react-i18next";
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
  const [i18n] = useTranslation();
  const baseURL = "https://attachin.com/";

  // console.log(id, image, description_ar, description_en, name_ar, name_en);
  return (
    <Link
      to={"/courses/" + id}
      className="nav-link d-flex flex-column justify-content-between align-items-center gap-2"
      style={{ width: "200px" }}
    >
      <img
        src={image ? `${baseURL + image}` : "/CourseCard.svg"}
        alt="CourseCard"
        className="img-fluid rounded-pill"
      />
      <h6 className="text-center" style={{ color: "var(--text-main-color)" }}>
        {i18n.language === "ar" ? name_ar : name_en}
      </h6>
    </Link>
  );
};

export default CourseCard;

import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./CourseCard.css";

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

  return (
    <Link
      to={"/courses/" + id}
      className="course-card nav-link d-flex flex-column justify-content-between align-items-center gap-2"
      style={{ width: "200px", height: "150px" }}
    >
      <img
        src={image ? `${baseURL + image}` : "/CourseCard.svg"}
        alt="CourseCard"
        className="img-fluid rounded-pill"
        style={{
          height: "110px",
        }}
      />
      <h6 className="text-center" style={{ color: "var(--text-main-color)" }}>
        {i18n.language === "ar" ? name_ar : name_en}
      </h6>
    </Link>
  );
};

export default memo(CourseCard);

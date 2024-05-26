import React from "react";
import HomeLayout from "../Components/HomeLayout";
import Internships from "../Components/Internships";
import { useTranslation } from "react-i18next";

const InternshipsPage = () => {
  const [t, i18n] = useTranslation();

  return (
    <HomeLayout>
      {/* Header Title */}
      <h1
        className="mt-3 mt-md-0 mb-0 dir"
        style={{ color: "var(--text-main-color)" }}
      >
        {t("Internships")}
      </h1>
      <hr />
      {/* Internships Posts */}
      <Internships />
      <Internships />
      <Internships />
    </HomeLayout>
  );
};

export default InternshipsPage;

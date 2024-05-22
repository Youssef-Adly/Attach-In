import React from "react";
import HomeLayout from "../Components/HomeLayout";
import Internships from "../Components/Internships";

const InternshipsPage = () => {
  return (
    <HomeLayout>
      {/* Header Title */}
      <h1 className="mt-3 mt-md-0 mb-0" style={{ color: "var(--text-main-color)" }}>Internships</h1>
      <hr />
      {/* Internships Posts */}
      <Internships />
      <Internships />
      <Internships />
    </HomeLayout>
  );
};

export default InternshipsPage;

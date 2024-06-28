import React, { useEffect, useState } from "react";
import Internships from "../Components/Internships";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import axios from "axios";
import LoadingSuspese from "../Components/LoadingSuspense";

const InternshipsPage = () => {
  const baseURL = "https://attachin.com/api/";
  const [t] = useTranslation();
  let [internships, setInterships] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getAllInternships")
      .then((res) => {
        setInterships(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* Header Title */}
      <h1
        className="mt-3 mt-md-0 mb-0 dir"
        style={{ color: "var(--text-main-color)" }}
      >
        {t("Internships")}
      </h1>
      <hr />
      {/* Internships Posts */}
      {internships ? (
        internships.map((i, idx) => (
          <Internships key={uuid()} {...i} postState={[idx, setInterships]} />
        ))
      ) : (
        <LoadingSuspese />
      )}
      {internships?.length === 0 && (
        <div
          className="text-center display-3 pt-5"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          {t("No Internships Yet")}
        </div>
      )}
    </>
  );
};

export default InternshipsPage;

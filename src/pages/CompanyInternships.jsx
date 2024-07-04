import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Internships from "../Components/Internships";
import LoadingSuspese from "../Components/LoadingSuspense";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { toastError } from "../utils/ToastsFunctions";

const CompanyInternships = () => {
  const baseURL = "https://attachin.com/api/";
  const [t] = useTranslation();
  const { id } = useParams();
  let [internships, setInterships] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getAllInternships?user_id=" + id)
      .then((res) => {
        // console.log(res);
        setInterships(res.data.data);
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, [id]);

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
          {t("No Internships For This Company Yet")}
        </div>
      )}
    </>
  );
};

export default CompanyInternships;

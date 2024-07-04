import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Internships from "../Components/Internships";
import LoadingSuspese from "../Components/LoadingSuspense";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { toastError } from "../utils/ToastsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CompanyInternships = () => {
  const baseURL = "https://attachin.com/api/";
  const [t] = useTranslation();
  const navigate = useNavigate();
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
      <div className="d-flex align-items-center gap-4">
        <Link
          onClick={(e) => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginTop: "4px",
            }}
          />
        </Link>
        <h1
          className="mt-3 mt-md-0 mb-0 dir"
          style={{ color: "var(--text-main-color)" }}
        >
          {t("Internships")}
        </h1>
      </div>

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

export default memo(CompanyInternships);
